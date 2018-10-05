.. Copyright (C) 2018 Wazuh, Inc.

.. _ossec_analysisd_state_file:

ossec-analysisd state file
==========================

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

.. thumbnail:: ../../../images/manual/analysisd-alerts-queue-full.png
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

.. thumbnail:: ../../../images/manual/analysisd-syscheck-full.png
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
