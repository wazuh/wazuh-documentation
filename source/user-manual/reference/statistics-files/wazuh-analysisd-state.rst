.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn what the counters and queues in the wazuh-analysisd.state file mean and how to calculate an event rate.

.. _wazuh_analysisd_state_file:

wazuh-analysisd.state
=====================

The statistical file for **wazuh-analysisd** is located at ``/var/ossec/var/run/wazuh-analysisd.state``.

It can be useful when benchmarking our Wazuh manager analysis engine in highly loaded environments.

By default, this file is updated every 5 seconds. This interval can be changed by modifying the ``analysisd.state_interval`` value from the :ref:`internal configuration <reference_internal_options>` file.

The file shows statistics for one manager. ``events_received`` counts valid messages read by analysisd. ``total_events_decoded`` adds the decoded event groups, and ``events_processed`` counts events that reach rule matching. ``alerts_written`` counts alerts written to disk. These counters measure different steps, so their values need not match. The queue usage and size fields show the current state of each queue.

To estimate events per second, take two readings of the same event counter. Subtract the first value from the second, then divide by the number of seconds between readings. For a cluster, calculate the rate on each manager and add the results.

Below there is an example of the content of the file:

.. code-block:: pkgconfig

    # State file for wazuh-analysisd

    # Total events decoded
    total_events_decoded='184'

    # Syscheck events decoded
    syscheck_events_decoded='49'

    # Syscollector events decoded
    syscollector_events_decoded='11'

    # Rootcheck events decoded
    rootcheck_events_decoded='48'

    # Security configuration assessment events decoded
    sca_events_decoded='0'

    # Winevt events decoded
    winevt_events_decoded='3'

    # Database synchronization messages dispatched
    dbsync_messages_dispatched='0'

    # Other events decoded
    other_events_decoded='73'

    # Events processed (Rule matching)
    events_processed='180'

    # Events received
    events_received='200'

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

    # Winevt queue
    winevt_queue_usage='0.03'

    # Winevt queue size
    winevt_queue_size='16384'

    # Database synchronization message queue
    dbsync_queue_usage='0.02'

    # Database synchronization message queue size
    dbsync_queue_size='16384'

    # Upgrade module message queue
    upgrade_queue_usage='0.01'

    # Upgrade module message queue size
    upgrade_queue_size='16384'

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
