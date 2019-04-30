.. Copyright (C) 2019 Wazuh, Inc.

.. _ossec_analysisd_state_file:

ossec-analysisd.state
=====================

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