.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn what the event, message, and connection counts in the wazuh-remoted.state file mean and how to calculate an event rate.

wazuh-remoted.state
===================

The statistical file for **wazuh-remoted** is located at ``/var/ossec/var/run/wazuh-remoted.state``.

This file provides information about the remote daemon as the queue size, discarded messages, number of remote connections, and other useful information.

By default, this file is updated every 5 seconds. This interval can be changed by modifying the ``remoted.state_interval`` value from the :ref:`internal configuration <reference_internal_options>` file.

The file shows statistics for one manager. ``evt_count`` counts events sent by remoted to analysisd. ``ctrl_msg_count`` counts control messages, while ``discarded_count`` counts messages remoted discarded. ``recv_bytes`` and ``sent_bytes`` count bytes received and sent. These counters grow while the daemon runs. ``tcp_sessions`` and the queue fields show their current state.

To estimate the rate of events sent by remoted, take two readings of ``evt_count``. Subtract the first value from the second, then divide by the number of seconds between readings. This does not count events that reach analysisd through other paths. For a cluster, calculate the rate on each manager and add the results.

Below there is an example of the content of the file:

.. code-block:: ini

    # State file for wazuh-remoted
    # Updated every 5 seconds.

    # Queue size
    queue_size='0'

    # Total queue size
    total_queue_size='131072'

    # TCP sessions
    tcp_sessions='130'

    # TCP sessions not yet associated with an agent
    tcp_sessions_unassociated='2'

    # Events sent to Analysisd
    evt_count='19097'

    # Control messages received
    ctrl_msg_count='3444'

    # Discarded messages
    discarded_count='23'

    # Total number of bytes sent
    sent_bytes='3460'

    # Total number of bytes received
    recv_bytes='435879'

    # Messages dequeued after the agent closes the connection
    dequeued_after_close='487'

    # Control messages queue usage
    ctrl_msg_queue_usage='0'

    # Control messages queue breakdown
    ctrl_msg_queue_inserted='5587'
    ctrl_msg_queue_replaced='13'
    ctrl_msg_queue_processed='5587'
