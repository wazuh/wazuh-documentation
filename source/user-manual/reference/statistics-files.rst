.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_statistics_files:

Statistics files
================

Currently, Wazuh provides two statistical files. One for :doc:`ossec-agentd <daemons/ossec-agentd>` and another for :doc:`ossec-remoted <daemons/ossec-remoted>`.

ossec-agentd state file
-----------------------

The name of the statistical file for **ossec-agentd** is ``ossec-agentd.state`` and it's located under the Wazuh installation directory in ``var/run/ossec-agentd.state``.

This file provides information about the agent, like the current status or the number of generated events among others. By default, this file is updated every 5 seconds 
but this interval can be changed with the ``agent.state_interval`` variable in the ``internal_options.conf`` file.

.. note:: ``ossec-agentd.state`` is **only** available in agents.

Below you can see an example file:

.. code-block:: bash

    # State file for ossec-agentd

    # Agent status:
    # - pending:      waiting for get connected.
    # - connected:    connection established with manager in the last 10 seconds.
    # - disconnected: connection lost or no ACK received in the last 10 seconds.
    status='connected'

    # Last time a keepalive was sent
    last_keepalive='2018-08-21 12:11:21'

    # Last time a control message was received
    last_ack='2018-08-21 12:11:21'

    # Number of generated events
    msg_count='5619'

    # Number of messages (events + control messages) sent to the manager
    msg_sent='5801'

ossec-remoted state file
------------------------

The name of the statistical file for **ossec-remoted** is ``ossec-remoted.state`` and it's located under the Wazuh installation directory in ``var/run/ossec-remoted.state``.

This file provides information about the **ossec-remoted** daemon, like the queue size, discarded messages or the number of TCP sessions among others. By default, this file is updated every 5 seconds 
but this interval can be changed with the ``remoted.state_interval`` variable in the ``internal_options.conf`` file.

.. note:: ``ossec-remoted.state`` is **only** available in managers.

Below you can see an example file:

.. code-block:: bash

    # State file for ossec-remoted
    # Updated every 5 seconds.

    # Queue size
    queue_size='0'

    # Total queue size
    total_queue_size='131072'

    # TCP sessions
    tcp_sessions='0'

    # Events sent to Analysisd
    evt_count='7383'

    # Control messages received
    ctrl_msg_count='270'

    # Discarded messages
    discarded_count='0'

    # Messages sent
    msg_sent='1267'

.. _analysisd_statistics_file:

ossec-analysisd state file
--------------------------

The name of the statistical file for **ossec-analysisd** is ``ossec-analysisd.state`` and it's located under the Wazuh installation directory in ``var/run/ossec-analysisd.state``.

This file shows the information relative to the status of the **Analysisd daemon**, displaying realtime data. It can help to analyse situations where you need to troubleshoot problems related on getting less events or alerts as expected.

The following table shows the fields of the file:

+------------------------------------+------------------------------------------------------------------------------+
| **total_events_decoded**           | Total events decoded by the decoder threads.                                 |
+------------------------------------+------------------------------------------------------------------------------+
| **syscheck_events_decoded**        | Syscheck events decoded.                                                     |
+------------------------------------+------------------------------------------------------------------------------+
| **syscheck_edps**                  | Syscheck events decoded per second.                                          |
+------------------------------------+------------------------------------------------------------------------------+
| **syscollector_events_decoded**    | Syscollector events decoded.                                                 |
+------------------------------------+------------------------------------------------------------------------------+
| **syscollector_edps**              | Syscollector events decoded per second.                                      |
+------------------------------------+------------------------------------------------------------------------------+
| **rootcheck_events_decoded**       | Rootcheck events decoded.                                                    |
+------------------------------------+------------------------------------------------------------------------------+
| **rootcheck_edps**                 | Rootcheck events decoded per second.                                         |
+------------------------------------+------------------------------------------------------------------------------+
| **hostinfo_events_decoded**        | Hostinfo events decoded.                                                     |
+------------------------------------+------------------------------------------------------------------------------+
| **hostinfo_edps**                  | Hostinfo events decoded per second.                                          |
+------------------------------------+------------------------------------------------------------------------------+
| **other_events_decoded**           | Other events decoded.                                                        |
+------------------------------------+------------------------------------------------------------------------------+
| **other_events_edps**              | Other events per second.                                                     |
+------------------------------------+------------------------------------------------------------------------------+
| **events_processed**               | Total events processed by the rule matching threads.                         |
+------------------------------------+------------------------------------------------------------------------------+
| **events_edps**                    | Events processed by the rule matching threads per second.                    |
+------------------------------------+------------------------------------------------------------------------------+
| **events_received**                | Total events received by the socket.                                         |
+------------------------------------+------------------------------------------------------------------------------+
| **events_dropped**                 | Events dropped by the receiver thread.                                       |
+------------------------------------+------------------------------------------------------------------------------+
| **alerts_written**                 | Alerts written to the HDD.                                                   |
+------------------------------------+------------------------------------------------------------------------------+
| **firewall_written**               | Firewall alerts written to the HDD.                                          |
+------------------------------------+------------------------------------------------------------------------------+
| **syscheck_queue_usage**           | Shows the percentage [0..1] of the Syscheck queue usage.                     |
+------------------------------------+------------------------------------------------------------------------------+
| **syscheck_queue_size**            | Syscheck queue size.                                                         |
+------------------------------------+------------------------------------------------------------------------------+
| **syscollector_queue_usage**       | Shows the percentage [0..1] of the Syscollector queue usage.                 |
+------------------------------------+------------------------------------------------------------------------------+
| **syscollector_queue_size**        | Syscollector queue size.                                                     |
+------------------------------------+------------------------------------------------------------------------------+
| **rootcheck_queue_usage**          | Shows the percentage [0..1] of the Rootcheck queue usage.                    |
+------------------------------------+------------------------------------------------------------------------------+
| **rootcheck_queue_size**           | Rootcheck queue size.                                                        |
+------------------------------------+------------------------------------------------------------------------------+
| **hostinfo_queue_usage**           | Shows the percentage [0..1] of the hostinfo queue usage.                     |
+------------------------------------+------------------------------------------------------------------------------+
| **hostinfo_queue_size**            | Hostinfo queue size.                                                         |
+------------------------------------+------------------------------------------------------------------------------+
| **event_queue_usage**              | Shows the percentage [0..1] of the event queue usage.                        |
+------------------------------------+------------------------------------------------------------------------------+
| **event_queue_size**               | Event queue size.                                                            |
+------------------------------------+------------------------------------------------------------------------------+
| **rule_matching_queue_usage**      | Shows the percentage [0..1] of the rule queue usage.                         |
+------------------------------------+------------------------------------------------------------------------------+
| **rule_matching_queue_size**       | Rule matching queue size.                                                    |
+------------------------------------+------------------------------------------------------------------------------+
| **alerts_queue_usage**             | Shows the percentage [0..1] of the alerts queue usage.                       |
+------------------------------------+------------------------------------------------------------------------------+
| **alerts_queue_size**              | Alerts log queue size.                                                       |
+------------------------------------+------------------------------------------------------------------------------+
| **firewall_queue_usage**           | Shows the percentage [0..1] of the firewall queue usage.                     |
+------------------------------------+------------------------------------------------------------------------------+
| **firewall_queue_size**            | Firewall log queue size.                                                     |
+------------------------------------+------------------------------------------------------------------------------+
| **statistical_queue_usage**        | Shows the percentage [0..1] of the statistical queue usage.                  |
+------------------------------------+------------------------------------------------------------------------------+
| **statistical_queue_size**         | Statistical log queue size.                                                  |
+------------------------------------+------------------------------------------------------------------------------+
| **archives_queue_usage**           | Shows the percentage [0..1] of the archives queue usage.                     |
+------------------------------------+------------------------------------------------------------------------------+
| **archives_queue_size**            | Archives log queue size.                                                     |
+------------------------------------+------------------------------------------------------------------------------+

Use cases of the *ossec-analysisd.state* file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Example of troubleshooting on the next use case scenario:

First we get the content of the file ``/var/ossec/var/run/ossec-analysisd.state`` (only relevant fields are shown):


.. code-block:: bash

    # State file for ossec-analysisd

    # Total events decoded
    events_decoded='10000'

    # Event queue
    event_queue_usage='1.00'

    # Rule matching queue
    rule_matching_queue_usage='1.00'

    # Alerts log queue
    alerts_queue_usage='1.00'

.. thumbnail:: ../../images/manual/analysisd-alerts-queue-full.png
    :title: Alerts queue full
    :align: center
    :width: 100%

As we can see the ``alerts_queue_usage='1.00'`` is full. This indicates that **our hard drive** is creating a **bottleneck** causing the ``rule_matching_queue_usage='1.00'``
to be full waiting for the alerts_queue and the ``event_queue_usage='1.00'`` to be waiting for the **rule_matching_queue**.

To overcome this issue we have a few options:

    1. Get a faster hard drive so the ``alerts_queue`` can get emptier faster.
    2. Increment the ``alerts_queue_size`` in the ``internal_options.conf`` file.
    3. Decrease the number of alerts generated by our agents.

Example of troubleshooting on the next use case scenario:

First we get the content of the file ``/var/ossec/var/run/ossec-analysisd.state`` (only relevant fields are shown):


.. code-block:: bash

    # State file for ossec-analysisd

    # Syscheck queue
    syscheck_queue_usage='1.00'

    # Rule matching queue
    rule_matching_queue_usage='0.81'

    # Alerts log queue
    alerts_queue_usage='0.10'

.. thumbnail:: ../../images/manual/analysisd-syscheck-full.png
    :title: Syscheck queue full
    :align: center
    :width: 100%

As we can see the ``syscheck_queue_usage='1.00'`` is full. This indicates that the manager is getting too many syscheck events per second.
Our CPU is becoming a bottleneck right now.

To overcome this issue we have a few options:

    1. Increase the ``syscheck_queue_size`` in the ``internal_options.conf`` file.
    2. Increase the number of syscheck decoder threads and the rule matching threads in the ``internal_options.conf`` file.
    3. Decrease the number of syscheck events generated by our agents.

.. note:: ``ossec-analysisd.state`` is **only** available in managers.
