.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh queue ensures continuous data flow from Wazuh agents to the Wazuh server thereby preventing logs from flooding the Wazuh server. Learn more in this section of the documentation.
  
Wazuh queue
===========

The Wazuh queue is a component within the Wazuh architecture designed to streamline the collection of logs from multiple endpoints. It ensures continuous data flow from Wazuh agents to the Wazuh server thereby preventing logs from flooding the Wazuh server. Wazuh queue utilizes the First In, First Out (FIFO) methodology; therefore, the first queued event is the first to be removed from the queue and processed. It is based on distributed processing, allowing for the parallelization of log analysis tasks. This improves the scalability and performance of the log processing pipeline enabling Wazuh to handle large volumes of log data effectively.

Wazuh has three native queues for managing event flow.

-  ``queue_ad``: This queue resides in the :doc:`wazuh-agentd </user-manual/reference/daemons/wazuh-agentd>` program and manages event forwarding from the Wazuh agent. The queue collects logs like system events and security configuration assessment outputs before forwarding them to the Wazuh server. It also includes an anti-flooding mechanism that throttles event forwarding based on configurable parameters, mitigating the risk of overwhelming the processing capacity of the Wazuh server.
-  ``queue_rd``: This queue resides in the :doc:`wazuh-remoted </user-manual/reference/daemons/wazuh-remoted>` program on the Wazuh server. ``queue_rd`` receives all the events from all remote agents, decodes them, and sends them to ``wazuh-analysisd`` for rule matching. 
-  ``queue_and``: This queue resides in the :doc:`wazuh-analysisd </user-manual/reference/daemons/wazuh-analysisd>` program. ``queue_and`` streamlines the reception of logs into the ``wazuh-analysisd`` program. The ``wazuh-analysisd`` program then matches the received logs against the rules on the Wazuh server.

Configuration
-------------

This section shows how to configure the queue on the Wazuh agent and the Wazuh server.

-  The Wazuh agent prevents event flooding using ``queue_ad``.
-  The Wazuh server prevents event flooding using ``queue_rd`` and ``queue_and``.

Queue configuration on the Wazuh agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The queue_ad`` manages the flow of log information, command monitoring outputs, SCA, FIM modules on the Wazuh agent. The queue is responsible for managing the flow of events in the ``wazuh-agentd``.

Without an anti-flooding mechanism, Wazuh agents might send events faster than the Wazuh server can process, which could be hundreds or thousands of events per second. Below are some events that could flood the Wazuh agent: 

-  Realtime FIM events from a directory with files that keep changing.
-  Windows Filtering Platform packet drop events.
-  Applications that retry on errors with no rate limiting.

Therefore, an insufficient configuration of the Wazuh queue could lead to the saturation of normal event processing on the Wazuh server.

The Wazuh ``queue_ad`` collects events generated at a default rate of 5000 events and sends them to the Wazuh server at 500 events per second (EPS). 

How to configure the Wazuh agent queue
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Modify the ``queue_size`` and ``events_per_second`` to allowable values in the ``client_buffer`` block in the Wazuh agent configuration file ``C:\Program Files (x86)\ossec-agent\ossec.conf`` on Windows endpoint, and ``/var/ossec/etc/ossec.conf`` on Linux/Unix endpoint.

   .. code-block:: xml
      :emphasize-lines: 4,5

      <client_buffer>
        <!-- Agent buffer options -->
        <disabled>no</disabled>
        <queue_size>5000</queue_size>
        <events_per_second>500</events_per_second>
      </client_buffer>

   The table below shows the allowable configuration options for the ``queue_ad`` on the Wazuh agent.

   +------------------+---------------+-----------------------------------+----------------------------------------------------------------------------------+---------------------------------------------------------+
   | Options          | Default value | Allowed values                    | Description                                                                      | Note                                                    |
   +==================+===============+===================================+==================================================================================+=========================================================+
   | disabled         | no            | yes, no                           | Toggles the agent buffer on and off. The agent will send events to the Wazuh     | Disabling this functionality in large environments may  |
   |                  |               |                                   | server without congestion control when set to yes.                               | overwhelm the Wazuh server, causing it to fail.         |
   +------------------+---------------+-----------------------------------+----------------------------------------------------------------------------------+---------------------------------------------------------+
   | queue_size       | 5000          | Any number between 1 and 100000.  | Sets the capacity of the agent buffer in the number of events.                   |                                                         |
   +------------------+---------------+-----------------------------------+----------------------------------------------------------------------------------+---------------------------------------------------------+
   |events_per_second | 500           | Any number between 1 and 1000.    | Specifies the number of events that can be sent to the Wazuh server per second.  |                                                         |
   +------------------+---------------+-----------------------------------+----------------------------------------------------------------------------------+---------------------------------------------------------+

#. Restart the Wazuh agent with administrative privilege.

   .. tabs::

      .. group-tab:: Linux

         .. code-block:: console

            # systemctl restart wazuh-agent

      .. group-tab:: Windows

         .. code-block:: powershell

            > Restart-Service -Name wazuh

You can adjust the queue configuration on the Wazuh agent when an agent on the Wazuh dashboard triggers an *Agent event queue is full* alert with rule ID ``202``. If the Wazuh agent continues to experience excessive flooding during the 15-second tolerance period, a follow-up event flooding alert with rule ID 203`` is triggered on the Wazuh dashboard.

Below is the screenshot of sample flooding event alerts:

.. thumbnail:: /images/manual/internal-capabilities/sample-flooding-event-alerts.png
   :title: Agent event queue alert on the Wazuh dashboard
   :alt: Agent event queue alert on the Wazuh dashboard
   :align: center
   :width: 80%

Queue configuration on the Wazuh server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh ``queue_rd`` and ``queue_and`` components function respectively within two daemons: 

-  The ``wazuh-remoted``.
-  The  ``wazuh-analysisd``.

How to configure ``queue_rd``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Configure ``queue_rd`` by editing the ``<queue_size>`` in the remote section of the ``/var/ossec/etc/ossec.conf`` file on the Wazuh server:

   .. code-block:: xml
      :emphasize-lines: 5

      <remote>
        <connection>secure</connection>
        <port>1514</port>
        <protocol>tcp,udp</protocol>
        <queue_size>131072</queue_size>
        <rids_closing_time>5m</rids_closing_time>
        <connection_overtake_time>600</connection_overtake_time>
        <agents>
          <allow_higher_versions>no</allow_higher_versions>
        </agents>
      </remote>

   The ``<queue_size>`` variable sets the queue capacity of ``queue_rd``. The table below shows the configuration for the ``<queue_size>`` variable.

   =============== ================================
   Default value   Allowed values
   =============== ================================
   131072          Any number between 1 and 262144.
   =============== ================================

   .. note::

      ``queue_rd`` is only available for agent events, not remote syslog events. This option only works when the connection is set to ``secure``.

#. Restart the Wazuh manager service to apply the changes

   .. code-block:: console

      # systemctl restart wazuh-manager

When event drops are observed you can increase the value of the ``queue_size`` in the ``<remote>`` block of the ``/var/ossec/etc/ossec.conf`` file, and the ``worker_pool`` size in the ``/var/ossec/etc/internal_options.conf``.

The table below shows the configuration of the ``worker_pool`` size on the Wazuh server.

+----------------------+----------------+--------------------------------------------------------+
| remoted.worker_pool  | Description    | Number of threads that process the payload reception   |
|                      +----------------+--------------------------------------------------------+
|                      | Default value  | 4                                                      |
|                      +----------------+--------------------------------------------------------+
|                      | Allowed value  | Any integer between 1 and 16                           |
+----------------------+----------------+--------------------------------------------------------+

You can monitor for event drops in the ``wazuh-remoted`` by querying the :doc:`Wazuh server API </user-manual/api/reference>` or reading the daemon statistical state file.

Querying the Wazuh server API
'''''''''''''''''''''''''''''

You can query the statistical information of the ``wazuh-remoted`` by following the steps below:

#. On the Wazuh dashboard, navigate to **Tools**, then **API Console**.
#. Add the following to the API console and click the green arrow to send the request to query the Wazuh server API:

   .. code-block:: none

      GET /manager/daemons/stats

#. The query result is shown on the left hand side in the screenshot below.

   .. thumbnail:: /images/manual/internal-capabilities/wazuh-remoted-query-results.png
      :title: Statistical query of the Wazuh daemons showing wazuh-remoted stats.
      :alt: Statistical query of the Wazuh daemons showing wazuh-remoted stats.
      :align: center
      :width: 80%

The query returns the queue size value, the number of events processed by the ``wazuh-remoted``, and the number of events discarded.

``wazuh-remoted`` statistical state file
''''''''''''''''''''''''''''''''''''''''

This statistical file for ``wazuh-remoted`` offers data regarding the remote daemon, such as queue size, discarded messages, the count of remote connections, and other important information.

Run the command below on the Wazuh server to read the file:

.. code-block:: console

   # cat /var/ossec/var/run/wazuh-remoted.state

Below is an example of the content of the ``wazuh-remoted.state`` file:

.. code-block:: ini

   # State file for wazuh-remoted
   # THIS FILE WILL BE DEPRECATED IN FUTURE VERSIONS
   # Updated every 5 seconds.

   # Queue size
   queue_size='0'

   # Total queue size
   total_queue_size='131072'

   # TCP sessions
   tcp_sessions='1'

   # Events sent to Analysisd
   evt_count='126714'

   # Control messages received
   ctrl_msg_count='2637'

   # Discarded messages
   discarded_count='0'

   # Total number of bytes sent
   sent_bytes='4434745'

   # Total number of bytes received
   recv_bytes='93866086'

   # Messages dequeued after the agent closes the connection
   dequeued_after_close='0'

How to configure ``queue_and``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``wazuh-analysisd`` queue receives logs from Wazuh agents for analysis using ``queue_and``. All incoming log messages are categorized and queued in the following categories:

-  Syscheck event decoder queue.
-  Syscollector event decoder queue.
-  Root check event decoder queue.
-  Host info event decoder queue.
-  Event decoder queue.
-  Windows event decoder queue.

Each queue category has a set of threads responsible for their First In, First Out (FIFO) event management. The number of threads is individually configurable per event type through the ``/var/ossec/etc/internal_options.conf`` file on the Wazuh server.

.. note::
   
   To ensure that upgrades do not overwrite queue configurations, use the ``/var/ossec/etc/local_internal_options.conf`` file instead of the ``/var/ossec/etc/internal_options.conf`` file.

The table below shows the configuration options available for ``queue_and``.

+--------------------------------+------------------------------------------+---------+-----+---------+
| Queues (wazuh-analysisd.state) | Setting (local_internal_options.conf)    | Default | Min | Max     |
+================================+==========================================+=========+=====+=========+
| syscheck_queue_usage           | analysisd.decode_syscheck_queue_size     | 16384   | 128 | 2000000 |
+--------------------------------+------------------------------------------+---------+-----+---------+
| syscollector_queue_usage       | analysisd.decode_syscollector_queue_size | 16384   | 128 | 2000000 |
+--------------------------------+------------------------------------------+---------+-----+---------+
| rootcheck_queue_usage          | analysisd.decode_rootcheck_queue_size    | 16384   | 128 | 2000000 |
+--------------------------------+------------------------------------------+---------+-----+---------+
| sca_queue_usage                | analysisd.decode_sca_queue_size          | 16384   | 128 | 2000000 |
+--------------------------------+------------------------------------------+---------+-----+---------+
| hostinfo_queue_usage           | analysisd.decode_hostinfo_queue_size     | 16384   | 128 | 2000000 |
+--------------------------------+------------------------------------------+---------+-----+---------+
| winevt_queue_usage             | analysisd.decode_winevt_queue_size       | 16384   | 128 | 2000000 |
+--------------------------------+------------------------------------------+---------+-----+---------+
| dbsync_queue_usage             | analysisd.dbsync_queue_size              | 16384   | 128 | 2000000 |
+--------------------------------+------------------------------------------+---------+-----+---------+
| upgrade_queue_usage            | analysisd.upgrade_queue_size             | 16384   | 128 | 2000000 |
+--------------------------------+------------------------------------------+---------+-----+---------+
| event_queue_usage              | analysisd.decode_event_queue_size        | 16384   | 128 | 2000000 |
+--------------------------------+------------------------------------------+---------+-----+---------+
| rule_matching_queue_usage      | analysisd.decode_output_queue_size       | 16384   | 128 | 2000000 |
+--------------------------------+------------------------------------------+---------+-----+---------+
| alerts_queue_usage             | analysisd.alerts_queue_size              | 16384   | 128 | 2000000 |
+--------------------------------+------------------------------------------+---------+-----+---------+
| firewall_queue_usage           | analysisd.firewall_queue_size            | 16384   | 128 | 2000000 |
+--------------------------------+------------------------------------------+---------+-----+---------+
| statistical_queue_usage        | analysisd.statistical_queue_size         | 16384   | 128 | 2000000 |
+--------------------------------+------------------------------------------+---------+-----+---------+
| archives_queue_usage           | analysisd.archives_queue_size            | 16384   | 128 | 2000000 |
|                                +------------------------------------------+---------+-----+---------+
|                                | analysisd.fts_queue_size                 | 16384   | 128 | 2000000 |
|                                +------------------------------------------+---------+-----+---------+
|                                | analysisd.fts_list_size                  | 32      | 12  | 512     |
|                                +------------------------------------------+---------+-----+---------+
|                                | analysisd.fts_min_size_for_str           | 14      | 6   | 128     |
|                                +------------------------------------------+---------+-----+---------+
|                                | analysisd.decoder_order_size             | 256     | 32  | 1024    |
+--------------------------------+------------------------------------------+---------+-----+---------+

The queue settings should be adjusted when “event drops” are observed on the ``wazuh-analysisd``. You can monitor for event drops in the wazuh-analysisd by querying the :doc:`Wazuh server API </user-manual/api/reference>` or reading the daemon statistical state file.

Querying the Wazuh server API
'''''''''''''''''''''''''''''

The log category state can be queried using the Wazuh server API to check the statistical information from ``wazuh-analysisd``. The new statistics show a breakdown of received or dropped events by event type. This is vital to adjust only the queue sizes that show dropping.

You can query the statistical information of the ``wazuh-analysisd`` by following the steps below:

#. On the Wazuh dashboard, navigate to **Tools**, then **API Console**.
#. Add the following to the Console and click the green arrow to send the request to query the Wazuh server API:

   .. code-block:: none

      GET /manager/daemons/stats

#. Scroll down to the ``wazuh-analysisd`` section of the query result shown on the right-hand side in the screenshot below.

   .. thumbnail:: /images/manual/internal-capabilities/wazuh-analysisd-query-results.png
      :title: Statistical query of the Wazuh daemons showing wazuh-analysisd stats
      :alt: Statistical query of the Wazuh daemons showing wazuh-analysisd stats
      :align: center
      :width: 80%

The query returns the queue size value, the number of events processed by the ``wazuh-analysisd``, and the number of events discarded.

The ``queue_and`` can be configured per the event type through the ``/var/ossec/etc/internal_options.conf`` file on the Wazuh server.

.. note::
   
   To ensure that upgrades do not overwrite queue configurations, use the ``/var/ossec/etc/local_internal_options.conf`` file instead of the ``/var/ossec/etc/internal_options.conf`` file.

``wazuh-analysisd`` statistical state file
''''''''''''''''''''''''''''''''''''''''''

The statistical file for ``wazuh-analysisd`` is located at ``/var/ossec/var/run/wazuh-analysisd.state``. The file can be useful when investigating event processing problems on the Wazuh server.

Run the command below on the Wazuh server to read the file:

.. code-block:: console

   # cat /var/ossec/var/run/wazuh-analysisd.state

Below is an example of the content of the wazuh-remoted.state file:

.. code-block:: ini

   # State file for wazuh-analysisd
   # THIS FILE WILL BE DEPRECATED IN FUTURE VERSIONS

   # Total events decoded
   total_events_decoded='137726'

   # Syscheck events decoded
   syscheck_events_decoded='3935'

   # Syscollector events decoded
   syscollector_events_decoded='2590'

   # Rootcheck events decoded
   rootcheck_events_decoded='37'

   # Security configuration assessment events decoded
   sca_events_decoded='8991'

   # Winevt events decoded
   winevt_events_decoded='87993'

   # Database synchronization messages dispatched
   dbsync_messages_dispatched='26004'

   # Other events decoded
   other_events_decoded='8176'

   # Events processed (Rule matching)
   events_processed='112252'

   # Events received
   events_received='138283'

   # Events dropped
   events_dropped='0'

   # Alerts written to disk
   alerts_written='6707'

   # Firewall alerts written to disk
   firewall_written='0'

   # FTS alerts written to disk
   fts_written='0'

   # Syscheck queue
   syscheck_queue_usage='0.00'

   # Syscheck queue size
   syscheck_queue_size='16384'

   # Syscollector queue
   syscollector_queue_usage='0.00'

   # Syscollector queue size
   syscollector_queue_size='16384'

   # Rootcheck queue
   rootcheck_queue_usage='0.00'

   # Rootcheck queue size
   rootcheck_queue_size='16384'

   # Security configuration assessment queue
   sca_queue_usage='0.00'

   # Security configuration assessment queue size
   sca_queue_size='16384'

   # Hostinfo queue
   hostinfo_queue_usage='0.00'

   # Hostinfo queue size
   hostinfo_queue_size='16384'

   # Winevt queue
   winevt_queue_usage='0.00'

   # Winevt queue size
   winevt_queue_size='16384'

   # Database synchronization message queue
   dbsync_queue_usage='0.00'

   # Database synchronization message queue size
   dbsync_queue_size='16384'

   # Upgrade module message queue
   upgrade_queue_usage='0.00'

   # Upgrade module message queue size
   upgrade_queue_size='16384'

   # Event queue
   event_queue_usage='0.00'

   # Event queue size
   event_queue_size='16384'

   # Rule matching queue
   rule_matching_queue_usage='0.00'

   # Rule matching queue size
   rule_matching_queue_size='16384'

   # Alerts log queue
   alerts_queue_usage='0.00'

   # Alerts log queue size
   alerts_queue_size='16384'

   # Firewall log queue
   firewall_queue_usage='0.00'

   # Firewall log queue size
   firewall_queue_size='16384'

   # Statistical log queue
   statistical_queue_usage='0.00'

   # Statistical log queue size
   statistical_queue_size='16384'

   # Archives log queue
   archives_queue_usage='0.00'

   # Archives log queue size
   archives_queue_size='16384'

Wazuh queue decoder and rules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Wazuh provides an out-of-the-box decoder and rules to analyze the event flooding output and generate alerts on the Wazuh dashboard. 

Decoder
'''''''

The decoder is available in the ``/var/ossec/ruleset/decoders/0005-wazuh_decoders.xml`` file on the Wazuh server. The decoder is responsible for analyzing flooding events on the Wazuh server.

.. code-block:: xml

   <decoder name="agent-buffer">
     <parent>wazuh</parent>
     <prematch offset="after_parent">^Agent buffer:</prematch>
     <regex offset="after_prematch">^ '(\S+)'.</regex>
     <order>level</order>
   </decoder>

Rules
'''''

As shown below, the rules are defined with IDs from ``201`` to ``205`` and are available in the ``/var/ossec/ruleset/rules/0016-wazuh_rules.xml`` file on the Wazuh server.

.. code-block:: xml

   <!-- Agent buffer rules -->
   <rule id="201" level="0">
     <if_sid>200</if_sid>
     <match>^wazuh: Agent buffer: </match>
     <description>Agent event queue rule</description>
     <group>agent_flooding,</group>
   </rule>
 
   <rule id="202" level="7">
     <if_sid>201</if_sid>
     <field name="level">%</field>
     <description>Agent event queue is $(level) full.</description>
     <group>agent_flooding,pci_dss_10.6.1,gdpr_IV_35.7.d,</group>
   </rule>
 
   <rule id="203" level="9">
     <if_sid>201</if_sid>
     <field name="level">full</field>
     <description>Agent event queue is full. Events may be lost.</description>
     <group>agent_flooding,pci_dss_10.6.1,gdpr_IV_35.7.d,</group>
   </rule>
 
   <rule id="204" level="12">
     <if_sid>201</if_sid>
     <field name="level">flooded</field>
     <description>Agent event queue is flooded. Check the agent configuration.</description>
     <group>agent_flooding,pci_dss_10.6.1,gdpr_IV_35.7.d,</group>
   </rule>
 
   <rule id="205" level="3">
     <if_sid>201</if_sid>
     <field name="level">normal</field>
     <description>Agent event queue is back to normal load.</description>
     <group>agent_flooding,</group>
   </rule>


Where: 

-  Rule ID ``201`` is the base rule for the event queue.
-  Rule ID ``202`` is triggered when the event queue level reaches 90%.
-  Rule ID ``203`` is triggered when the event queue is full.
-  Rule ID ``204`` is triggered when the event queue is flooded.
-  Rule ID ``205`` is triggered when the event queue becomes normal after a flooding event.
