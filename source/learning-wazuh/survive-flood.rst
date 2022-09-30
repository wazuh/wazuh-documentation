.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to survive a log flood using Wazuh. We create a small log flood and observe how the Wazuh agent works. Learn to get the most out of Wazuh. 
    
.. _learning_wazuh_survive_flood:

Survive a log flood
===================

A centralized logging system needs to be able to process many events per second (EPS) from many different log sources at the same time, but sometimes things just get completely out of hand.
A variety of problems like infinite loop conditions, poorly written software, misconfigured applications or even malicious actors can cause one or a few individual devices to suddenly start producing an unstopping stream of log messages rushing at your logging system at a rate of hundreds or even thousands of events per second.  When such a device or devices suddenly take up vastly more than their fair share of network and log processing resources, it can become widely disruptive.

Log flooding can saturate your network bandwidth and/or overtax your Wazuh central components while one gigabyte after another of (often repetitive) log messages are being reanalyzed and churned to disk.

Thankfully the Wazuh agent has a flood protection mechanism to prevent one system from creating disruptions to your network or your Wazuh services.
In this lab, we will create a small log flood and observe how it is gracefully contained by the Wazuh agent before it departs the system where the logs are produced.  We will also take a look at the leaky bucket queue that Wazuh uses to accomplish this.  Lastly, we will note the alerts that are produced to keep us informed about the onset of, escalation of, and recovery from log flooding events.


Configure the Wazuh agent client buffer on the Linux agent
----------------------------------------------------------

#. In this lab, we will limit agent log production to 50 events per second (EPS) to easily simulate a flooding event. Open ``/var/ossec/etc/ossec.conf`` and find the ``<client_buffer>`` section, and edit within it the  ``<events_per_second>`` value:

    .. code-block:: xml
       :emphasize-lines: 5

        <client_buffer>
            <!-- Agent buffer options -->
            <disabled>no</disabled>
            <queue_size>5000</queue_size>
            <events_per_second>50</events_per_second>
        </client_buffer>

    .. warning::
        These settings are small for simulation purposes.  You would not want to make them this low in production.


    .. note::

        By default, this limit is prevented from being set to lower than 50, you may override
        that by changing the ``agent.min_eps`` internal options setting.  This does not actually set an EPS limit.
        Rather, it is a strictly agent-side setting that protects the agent from being inadvertently subjected
        to overly restrictive EPS limits pushed to it via Wazuh manager centralized configuration.
        Here we make it possible to enforce an EPS as low as 10.:
        ``# echo "agent.min_eps=10" >> /var/ossec/etc/local_internal_options.conf``


#. Restart the Wazuh agent so the configuration may take effect:

   .. include:: /_templates/common/restart_agent.rst

   .. note::
        The client buffer is explained in detail in the Wazuh user manual :ref:`antiflooding` section.
        In brief, it allows a Wazuh agent to limit the rate at which it sends log events to the Wazuh manager.
        If events are produced at a rate over the configured EPS limit, then they are stored in a leaky
        bucket queue until the EPS rate slows down enough that the queue contents can be sent along to the
        Wazuh manager.  If the queue gets full, then any new events are dropped, i.e the bucket leaks.
        Various alerts are sent to the Wazuh manager about all of this.


   .. thumbnail:: ../images/manual/internal-capabilities/bucket.png                              
      :title: Wazuh agent client buffer                                                                     
      :align: center                                                                            
      :width: 80%                                                                              




Decrease minimum log alert level
--------------------------------

We will generate a flood of messages with the word "fatal" so they will trigger the generic Wazuh rule ``1002`` which has a low severity level (2).  By default,
the Wazuh manager does not record alerts on rules of severity levels less than 3, so for this lab we will lower the threshold:

#. Edit ``/var/ossec/etc/ossec.conf`` on your Wazuh manager and change ``<log_alert_level>`` from 3 to 1 so that the ``<alerts>`` section looks like the one below.  Now alerts of all severity levels except level 0 will show up in the Wazuh dashboard.

    .. code-block:: xml
       :emphasize-lines: 2

        <alerts>
            <log_alert_level>1</log_alert_level>
            <email_alert_level>12</email_alert_level>
        </alerts>

#. Restart the Wazuh manager.

   .. include:: /_templates/common/restart_manager.rst

Generate a log flood on linux-agent
-----------------------------------

#. If you do not have it already, install netcat:

   .. code-block:: console

      #  yum install nmap-ncat

#. Create a script called ``/usr/local/bin/makeflood``, with this content:

    .. code-block:: console

        #!/bin/bash
        for i in {1..15000}
        do
          echo -n "1:floodtest:Feb  3 03:08:47 linux-agent centos: fatal firehose $i" | ncat -Uu /var/ossec/queue/sockets/queue
          echo -n "."
        done

    .. note::
        While we could write records to a log file monitored by Wazuh agent, this script takes an even faster approach of writing records directly to the Wazuh agent internal socket. This is where components like **wazuh-logcollector** stream new log lines from log files.

        The script uses netcat to do this, but any tool that can write datagrams to a Unix socket will do the job. Sometimes it is desirable to have a script on a Wazuh agent send results directly back to the Wazuh manager while completely bypassing the agent filesystem.

        The quoted log line that is piped to netcat consists of three colon-separated parts.  First, the "1" corresponds to the syslog log type. The second field causes the location metadata value to be set to "floodtest". After that is a log line just like you might see in ``/var/log/messages``.

#. Make the script executable and then run it to generate a rapid flood of **15,000** log entries.

    .. code-block:: console

        # chmod 700 /usr/local/bin/makeflood
        # /usr/local/bin/makeflood

#. Notice that the periods representing log messages are scrolling across the screen at a rate well above our 50 EPS limit.


See what happened according to the Wazuh dashboard
--------------------------------------------------

#. Query the Wazuh dashboard for "firehose".  Click on **Add** next to **full_log** for readability. Change the scale from **Auto** to **Second**.

   .. thumbnail:: ../images/learning-wazuh/labs/flood-1.png
    :title: Flooding event
    :align: center
    :width: 80%


#. Notice that the flooding events only arrived at the Wazuh manager at a rate of 50 EPS, our intended limit.  The client buffer EPS limit worked!

#. Notice that only 12553 hits are reported for a flood.  It appears some of the flooded events were lost.

#. Expand one of the "firehose" records and compare the field values to the script you used to produce these records.

   .. thumbnail:: ../images/learning-wazuh/labs/flood-1a.png
    :title: Flooding event - alert details 
    :align: center
    :width: 80%


#. Query the Wazuh dashboard for "agent_flooding". 

   .. thumbnail:: ../images/learning-wazuh/labs/flood-2.png
    :title: Various stages of a flooding event
    :align: center
    :width: 80%


#. Observe how Wazuh alerts us at various stages of a flooding event so that we can know when we need to intervene with an over-logging system that is not recovering to a normal state on its own.

Return settings back to normal
------------------------------

#. In the Wazuh agent, edit the ``<client_buffer>`` section of ``/var/ossec/etc/ossec.conf`` file back to this:

    .. code-block:: xml
       :emphasize-lines: 5

        <client_buffer>
            <!-- Agent buffer options -->
            <disabled>no</disabled>
            <queue_size>5000</queue_size>
            <events_per_second>500</events_per_second>
        </client_buffer>

#. Restart the Wazuh agent:

   .. include:: /_templates/common/restart_agent.rst

#. In the Wazuh manager, edit the ``<alerts>`` section of ``/var/ossec/etc/ossec.conf`` file back to this:

   .. code-block:: xml
      :emphasize-lines: 2

      <alerts>
          <log_alert_level>3</log_alert_level>
          <email_alert_level>12</email_alert_level>
      </alerts>

#. Restart the Wazuh manager:

   .. include:: /_templates/common/restart_manager.rst


Congratulations on completing this lab. You survived the log flood!
