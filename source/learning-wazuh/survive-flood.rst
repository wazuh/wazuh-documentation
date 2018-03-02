.. _learning_wazuh_survive_flood:

Survive a log flood
===================

A centralized logging system needs to be able to process many events per second (eps) from many different log sources at the 
same time, but sometimes things just get completely out of hand.  A variety of problems like infinite loop conditions, poorly 
written software, and misconfigured applications can cause one or a few individual devices to suddenly start producing a huge 
and unstopping stream of log messages rushing at your logging system at a rate of hundreds or even thousands of events per 
second.  When such a device or devices suddenly take up vastly more than their fair share of network and log processing 
resources, it can become widely disruptive.  Log flooding can saturate your network bandwidth and/or overtax your Wazuh and 
Elastic system components while one gigabyte after another of likely the same repeated log messages are being reanalyzed and 
churned to disk.  

Thankfully the Wazuh agent has a flood protection mechanism to prevent out of control log production on one system from 
creating disruptions to your network or to your Wazuh/Elastic services.  In this lab we will create a small log flood and 
observe how it is gracefully contained by the Wazuh agent before it departs the system where the logs are produced.  We 
will also take a look at the leaky bucket queue that Wazuh uses to accomplish this.  Lastly we will note the alerts that are
produced to keep us informed about the onset of, escalation of, and recovery from log flooding events.


Configure the Wazuh agent client buffer on linux-agent
------------------------------------------------------

1. In this lab, we will limit agent log production to 20 events per second (eps).  By default, this limit is prevented from being set to lower than 50, so we will override that by changing the relevant internal options setting.  This does not  actually set an eps limit.  Rather, it is a strictly agent-side setting that protects the agent from being inadvertently subjected to overly restrictive eps limits pushed to it via Wazuh manager centralized configuration.  Here we make it possible to enforce an eps as low as 10.

    .. code-block:: console
 
        # echo "agent.min_eps=10" >> /var/ossec/etc/local_internal_options.conf

2. Open /var/ossec/etc/ossec.conf and find the **<client_buffer>** section, which looks like this:

    .. code-block:: xml

        <client_buffer>
            <!-- Agent buffer options -->
            <disabled>no</disabled>
            <queue_size>5000</queue_size>
            <events_per_second>500</events_per_second>
        </client_buffer>

3. Restart the Wazuh agent

    .. code-block:: console

        # ossec-control restart

    .. note::
        The client buffer is explained in detail in the Wazuh User manual.  Search for "Anti-flooding mechanism".  In brief, it 
        allows a Wazuh agent to limit the rate at which it sends log events to the Wazuh Manager.  If events are produced at
        a rate in excess of the configured eps limit, then they are stored in a leaky bucket queue until the eps rate slows 
        down enough that the queue contents can be sent along to the Wazuh Manager.  If the queue gets full, then any new 
        events are droped, i.e the bucket leaks.  Various alerts are sent to the Wazuh Manager about all of this.

    +-----------------------------------------------------------------------------------------------+
    | **Wazuh Agent Client Buffer**                                                                 |
    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/manual/internal-capabilities/bucket.png                              |
    |     :title: leaky bucket                                                                      |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

3. To ensure our flood simulation causes queueing and ultimately overflows the queue, change **<queue_size>** to 500 and **<events_per_second>** to 20.  Save and close ossec.conf.  The new section should look like this:

    .. code-block:: xml

        <client_buffer>
            <!-- Agent buffer options -->
            <disabled>no</disabled>
            <queue_size>500</queue_size>
            <events_per_second>20</events_per_second>
        </client_buffer>

    .. warning::
        These settings are small for simulation purposes.  You would not want to make them this low in production.

Make Wazuh manager record alerts for each flooded event record
--------------------------------------------------------------

Because we will intentionally include the word "fatal" in the flooding log records we generate, they each will trigger generic 
Wazuh rule 1002 which has a low severity level of 2.  By default, Wazuh Manager does not record alerts on rules of severity 
levels less than 3, so for this lab we will lower the threshold.

1. Edit /var/ossec/etc/ossec.conf and change <log_alert_level> from 3 to 1 so that the <alerts> section looks like below.  Now alerts of all severity levels will show up in Kibana.

    .. code-block:: xml

        <alerts>
            <log_alert_level>1</log_alert_level>
            <email_alert_level>12</email_alert_level>
        </alerts>

2. Restart Wazuh Manager.

    .. code-block:: console

        # ossec-control restart


Generate a log flood on linux-agent
-----------------------------------

1. Create a script called /usr/local/bin/makeflood, with this content:

    .. code-block:: console

        #!/bin/bash
        for i in {1..10000}
        do
                echo -n "1:floodtest:Feb  3 03:08:47 linux-agent centos: fatal firehose $i" | ncat -Uu /var/ossec/queue/ossec/queue
                echo -n "."
        done

    .. note::
        While we could write records to a log file monitored by Wazuh agent, this script takes an even faster approach of
        writing records directly to the Wazuh agent's internal socket where, for example, ossec-logcollector streams new 
        log lines from log files.  The script uses netcat to do this, but any tool that can
        write datagrams to a Unix socket will do the job.  Sometimes it is desirable to have a script on a Wazuh agent 
        send results directly back to the Wazuh manager while completely bypassing the agent's filesystem.  The quoted log
        line that is piped to netcat consists of three colon-separated parts.  First, the "1" corresponds to the syslog log 
        type.  The second field causes the location metadata value to be set to "floodtest".  After that is a log line just
        like you might see in /var/log/messages.

2. Make the script executable and then run it to generate a rapid flood of 10,000 log entries.

    .. code-block:: console

        # chmod 700 /usr/local/bin/makeflood
        # makeflood

3. Notice that the periods representing log messages are scrolling acrosss the screen at a rate well above our 20 eps limit.


See what happened according to Kibana
-------------------------------------

1. Query Kibana for "firehose".  Click **[Add]** next to "full_log" for readability. Change the scale from "Auto" to "Second".

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/flood-1.png                                      |
    |     :title: flood                                                                             |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+
    
2. Notice that the flooding events only arrived at the Wazuh Manager at a rate of 20 eps, our intended limit.  The client buffer eps limit worked!

3. Notice that only 1,269 hits are reported for a flood.  It appears many of the flooded events were lost.

4. Expand one of the "firehose" records and compare the field values to the script you used to produce these records.

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/flood-1a.png                                     |
    |     :title: flood2                                                                            |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

5. Query Kibana for "agent_flooding".  Click **[Add]** additionally next to "rule.description" and "data.level" for readability.

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/flood-2.png                                      |
    |     :title: flood3                                                                            |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

6. Observe how Wazuh alerts us at various stages of a flooding event so that we can know when we need to intervene with an over-logging system that is not recovering to a normal state on its own.

Return linux-agent to normal client buffer settings
---------------------------------------------------

1. In the <client_buffer> section of /var/ossec/etc/ossec.conf file, change it back to this:

    .. code-block:: xml

        <client_buffer>
            <!-- Agent buffer options -->
            <disabled>no</disabled>
            <queue_size>5000</queue_size>
            <events_per_second>500</events_per_second>
        </client_buffer>

2. Restart the Wazuh agent

    .. code-block:: console

        # ossec-control restart

Congratulations on completing this lab.  You survived the log flood!