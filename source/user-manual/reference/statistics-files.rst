.. Copyright (C) 2019 Wazuh, Inc.

.. _reference_statistics_files:

Statistics files
================

The **statistics files** are documents that show real-time information about the Wazuh environment as the processed events, received messages and the state of the remote connections.

Agents statistical files:

  *  `ossec-agentd.state`_ - It shows number of generated events, last connection, agent status and some other useful information about the agent.

Manager statistical files:

  * `ossec-remoted.state`_ - It shows information about the `remote daemon. <https://documentation.wazuh.com/current/user-manual/reference/daemons/ossec-remoted.html>`_
  * `ossec-analysisd.state`_ - It shows information about the `analysis daemon <https://documentation.wazuh.com/current/user-manual/reference/daemons/ossec-analysisd.html>`_.

.. _ossec_agentd_state_file:

ossec-agentd.state
------------------

The statistical file for **ossec-agentd** is located at ``/var/ossec/var/run/ossec-agentd.state``.

This file provides information about the agent as the number of generated events, last connection, agent status and some other useful information.

By default, this file is updated every 5 seconds. This interval can be changed by modifying the ``agent.state_interval`` value from the :ref:`internal configuration <reference_internal_options>` file.

.. note::

    This file is created the first time the agent connects to the manager.

Below there is an example of the content of the file:

.. code-block:: bash

    # State file for ossec-agentd

    # Agent status:
    # - pending:      waiting for get connected.
    # - connected:    connection established with manager in the last 5 seconds.
    # - disconnected: connection lost or no ACK received in the last 5 seconds.
    status='connected'

    # Last time a keepalive was sent
    last_keepalive='2019-02-05 12:18:37'

    # Last time a control message was received
    last_ack='2019-02-05 12:18:37'

    # Number of generated events
    msg_count='12579'

    # Number of messages (events + control messages) sent to the manager
    msg_sent='12928'

.. _ossec_remoted_state_file:

ossec-remoted.state
-------------------

The statistical file for **ossec-remoted** is located at ``/var/ossec/var/run/ossec-remoted.state``.

This file provides information about the remote daemon as the queue size, discarded messages, number of remote connections and other useful information.

By default, this file is updated every 5 seconds. This interval can be changed by modifying the ``remoted.state_interval`` value from the :ref:`internal configuration <reference_internal_options>` file.

Below there is an example of the content of the file:

.. code-block:: bash

    # State file for ossec-remoted
    # Updated every 5 seconds.

    # Queue size
    queue_size='0'

    # Total queue size
    total_queue_size='131072'

    # TCP sessions
    tcp_sessions='130'

    # Events sent to Analysisd
    evt_count='19097'

    # Control messages received
    ctrl_msg_count='3444'

    # Discarded messages
    discarded_count='23'

    # Messages sent
    msg_sent='3460'

    # Total number of bytes received
    recv_bytes='435879'

.. _ossec_analysisd_state_file:

ossec-analysisd.state
---------------------

The statistical file for **ossec-analysisd** is located at ``/var/ossec/var/run/ossec-analysisd.state``.

It can be useful when benchmarking our Wazuh manager analysis engine in high loaded environments.

By default, this file is updated every 5 seconds. This interval can be changed by modifying the ``analysisd.state_interval`` value from the :ref:`internal configuration <reference_internal_options>` file.

Below there is an example of the content of the file:

.. code-block:: bash

    # State file for ossec-analysisd

    # Total events decoded
    total_events_decoded='184'

    # Syscheck events decoded
    syscheck_events_decoded='49'
    syscheck_edps='6'

    # Syscollector events decoded
    syscollector_events_decoded='11'
    syscollector_edps='7'

    # Rootcheck events decoded
    rootcheck_events_decoded='48'
    rootcheck_edps='3'

    # Security configuration assessment events decoded
    sca_events_decoded='0'
    sca_edps='0'

    # Hostinfo events decoded
    hostinfo_events_decoded='3'
    hostinfo_edps='0'

    # Other events decoded
    other_events_decoded='23'
    other_events_edps='2'

    # Events processed (Rule matching)
    events_processed='19'
    events_edps='2'

    # Events received
    events_received='10'

    # Events dropped
    events_dropped='1'

    # Alerts written to disk
    alerts_written='179'

    # Firewall alerts written to disk
    firewall_written='8'

    # FTS alerts written to disk
    fts_written='1'

    # Syscheck queue
    syscheck_queue_usage='0.12'

    # Syscheck queue size
    syscheck_queue_size='16384'

    # Syscollector queue
    syscollector_queue_usage='0.10'

    # Syscollector queue size
    syscollector_queue_size='16384'

    # Rootcheck queue
    rootcheck_queue_usage='0.73'

    # Rootcheck queue size
    rootcheck_queue_size='16384'

    # Security configuration assessment queue
    sca_queue_usage='0.00'

    # Security configuration assessment queue size
    sca_queue_size='16384'

    # Hostinfo queue
    hostinfo_queue_usage='0.05'

    # Hostinfo queue size
    hostinfo_queue_size='16384'

    # Event queue
    event_queue_usage='0.53'

    # Event queue size
    event_queue_size='16384'

    # Rule matching queue
    rule_matching_queue_usage='0.42'

    # Rule matching queue size
    rule_matching_queue_size='16384'

    # Alerts log queue
    alerts_queue_usage='0.04'

    # Alerts log queue size
    alerts_queue_size='16384'

    # Firewall log queue
    firewall_queue_usage='0.18'

    # Firewall log queue size
    firewall_queue_size='16384'

    # Statistical log queue
    statistical_queue_usage='0.10'

    # Statistical log queue size
    statistical_queue_size='16384'

    # Archives log queue
    archives_queue_usage='0.09'

    # Archives log queue size
    archives_queue_size='16384'
