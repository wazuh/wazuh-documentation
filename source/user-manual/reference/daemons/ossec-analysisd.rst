.. Copyright (C) 2018 Wazuh, Inc.

.. _ossec-analysisd:

ossec-analysisd
===============

The ossec-analysisd program receives the log messages and compares them to the rules.  It then creates an alert when a log message matches an applicable rule.

+-----------------+-------------------------------------------------------------------------------------------------+
| **-c <config>** | Run using <config> as the configuration file.                                                   |
+-----------------+-------------------------------------------------------------------------------------------------+
| **-D <dir>**    | Chroot to <dir>                                                                                 |
+-----------------+-------------------------------------------------------------------------------------------------+
| **-d**          | Run in debug mode. This option may be repeated to increase the verbosity of the debug messages. |
+-----------------+-------------------------------------------------------------------------------------------------+
| **-f**          | Run in the foreground.                                                                          |
+-----------------+-------------------------------------------------------------------------------------------------+
| **-g <group>**  | Run as a group.                                                                                 |
+-----------------+-------------------------------------------------------------------------------------------------+
| **-h**          | Display the help message.                                                                       |
+-----------------+-------------------------------------------------------------------------------------------------+
| **-t**          | Test configuration.                                                                             |
+-----------------+-------------------------------------------------------------------------------------------------+
| **-u**          | Run as a specific user.                                                                         |
+-----------------+-------------------------------------------------------------------------------------------------+
| **-V**          | Display the version and license information                                                     |
+-----------------+-------------------------------------------------------------------------------------------------+

The internal structure of the multithreaded ossec-analysisd daemon is as follows:
---------------------------------------------------------------------------------

.. thumbnail:: ../../../images/manual/analysisd-structure.png
    :title: Ossec-analysisd architecture
    :align: center
    :width: 100%

Steps

1. The socket receives the message and sends it to the respective decoder queue. They can be one of the following:
    a. Syscheck event decoder queue.
    b. Syscollector event decoder queue.
    c. Rootcheck event decoder queue.
    d. Hostinfo event decoder queue.
    e. Event decoder queue.

    If the selected queue is full, the event is dropped.

2. Each decoder thread:
    a. Takes out the event from it's queue
    b. Cleans the event
    c. Decodes the event
    d. Sends the event to the rule matching queue

3. Each rule matching thread:
    a. Takes the event from the queue
    b. Runs rule matching
    c. If the event is a firewall event, it is sended to the firewall queue
    d. If the event has statistical flag, it is sended to the statistical queue
    e. If the event has the FTS flag, it is sended to the FTS queue
    f. If an alert is generated, it is sended to the alert queue
    g. If logall is activated, the event is sended to the archives queue

4. Each writer thread:
    a. Takes the event from the queue.
    b. Stores the element in memory to be written on the it's own log file.

5. Every 1 second, all the log files are writted to the HDD.

6. Every 5 seconds (by default, if not overrided), the status file for analysisd is generated.

Status file
-----------

This file shows information relative to the status of the **analysisd daemon**. It can help to analyse situations where you need to troubleshoot problems related on getting less events or alerts as expected. 

The format of the file is bash. You see the information of the **analysisd daemon** at ``/var/ossec/var/run/ossec-analysisd.state``.

In the table below, are the fields of the file:

+------------------------------------+------------------------------------------------------------------------------+
| **total_events_decoded**           | Total events decoded by the decoder threads                                  |
+------------------------------------+------------------------------------------------------------------------------+
| **syscheck_events_decoded**        | Syscheck events decoded                                                      |
+------------------------------------+------------------------------------------------------------------------------+
| **syscheck_edps**                  | Syscheck events decoded per second                                           |
+------------------------------------+------------------------------------------------------------------------------+
| **syscollector_events_decoded**    | Syscollector events decoded                                                  |
+------------------------------------+------------------------------------------------------------------------------+
| **syscollector_edps**              | Syscollector events decoded per second                                       |
+------------------------------------+------------------------------------------------------------------------------+
| **rootcheck_events_decoded**       | Rootcheck events decoded                                                     |
+------------------------------------+------------------------------------------------------------------------------+
| **rootcheck_edps**                 | Rootcheck events decoded per second                                          |
+------------------------------------+------------------------------------------------------------------------------+
| **hostinfo_events_decoded**        | Hostinfo events decoded                                                      |
+------------------------------------+------------------------------------------------------------------------------+
| **hostinfo_edps**                  | Hostinfo events decoded per second                                           |
+------------------------------------+------------------------------------------------------------------------------+
| **other_events_decoded**           | Other events decoded                                                         |
+------------------------------------+------------------------------------------------------------------------------+
| **other_events_edps**              | Other events per second                                                      |
+------------------------------------+------------------------------------------------------------------------------+
| **events_processed**               | Total events processed by the rule matching threads                          |
+------------------------------------+------------------------------------------------------------------------------+
| **events_edps**                    | Events processed by the rule matching threads per second                     |
+------------------------------------+------------------------------------------------------------------------------+
| **events_dropped**                 | Events dropped by the receiver thread                                        |
+------------------------------------+------------------------------------------------------------------------------+
| **alerts_written**                 | Alerts written to the HDD                                                    |
+------------------------------------+------------------------------------------------------------------------------+
| **firewall_written**               | Firewall alerts written to the HDD                                           |
+------------------------------------+------------------------------------------------------------------------------+
| **syscheck_queue_usage**           | Shows the percentage [0..1] of the syscheck queue usage                      |
+------------------------------------+------------------------------------------------------------------------------+
| **syscheck_queue_size**            | Syscheck queue size                                                          |
+------------------------------------+------------------------------------------------------------------------------+
| **syscollector_queue_usage**       | Shows the percentage [0..1] of the syscollector queue usage                  |
+------------------------------------+------------------------------------------------------------------------------+
| **syscollector_queue_size**        | Syscollector queue size                                                      |
+------------------------------------+------------------------------------------------------------------------------+
| **rootcheck_queue_usage**          | Shows the percentage [0..1] of the rootcheck queue usage                     |
+------------------------------------+------------------------------------------------------------------------------+
| **rootcheck_queue_size**           | Rootcheck queue size                                                         |
+------------------------------------+------------------------------------------------------------------------------+
| **hostinfo_queue_usage**           | Shows the percentage [0..1] of the hostinfo queue usage                      |
+------------------------------------+------------------------------------------------------------------------------+
| **hostinfo_queue_size**            | Hostinfo queue size                                                          |
+------------------------------------+------------------------------------------------------------------------------+
| **event_queue_usage**              | Shows the percentage [0..1] of the event queue usage                         |
+------------------------------------+------------------------------------------------------------------------------+
| **event_queue_size**               | Event queue size                                                             |
+------------------------------------+------------------------------------------------------------------------------+
| **rule_matching_queue_usage**      | Shows the percentage [0..1] of the rule queue usage                          |
+------------------------------------+------------------------------------------------------------------------------+
| **rule_matching_queue_size**       | Rule matching queue size                                                     |
+------------------------------------+------------------------------------------------------------------------------+
| **alerts_queue_usage**             | Shows the percentage [0..1] of the alerts queue usage                        |
+------------------------------------+------------------------------------------------------------------------------+
| **alerts_queue_size**              | Alerts log queue size                                                        |
+------------------------------------+------------------------------------------------------------------------------+
| **firewall_queue_usage**           | Shows the percentage [0..1] of the firewall queue usage                      |
+------------------------------------+------------------------------------------------------------------------------+
| **firewall_queue_size**            | Firewall log queue size                                                      |
+------------------------------------+------------------------------------------------------------------------------+
| **statistical_queue_usage**        | Shows the percentage [0..1] of the statistical queue usage                   |
+------------------------------------+------------------------------------------------------------------------------+
| **statistical_queue_size**         | Statistical log queue size                                                   |
+------------------------------------+------------------------------------------------------------------------------+
| **archives_queue_usage**           | Shows the percentage [0..1] of the archives queue usage                      |
+------------------------------------+------------------------------------------------------------------------------+
| **archives_queue_size**            | Archives log queue size                                                      |
+------------------------------------+------------------------------------------------------------------------------+

Use cases of the status file
----------------------------

1. Example of troubleshooting on the next use case scenario:

First we get the content of the file ``/var/ossec/var/run/ossec-analysisd.state``:


.. code-block:: bash

    # State file for ossec-analysisd

    # Total events decoded
    events_decoded='10000'

    # Syscheck events decoded
    syscheck_events_decoded='0'
    syscheck_edps='0'

    # Syscollector events decoded
    syscollector_events_decoded='0'
    syscollector_edps='0'

    # Rootcheck events decoded
    rootcheck_events_decoded='0'
    rootcheck_edps='0'

    # Hostinfo events decoded
    hostinfo_events_decoded='0'
    hostinfo_edps='0'

    # Other events decoded
    other_events_decoded='10000'
    other_events_edps='2000'

    # Events processed (Rule matching)
    events_processed='10000'
    events_edps='2000'

    # Events dropped
    events_dropped='20000'

    # Alerts written to disk
    alerts_written='245'

    # Firewall alerts written to disk
    firewall_written='0'

    # FTS alerts written to disk
    fts_written='0'

    # Syscheck queue
    syscheck_queue_usage='0'

    # Syscheck queue size
    syscheck_queue_size='1280'

    # Syscollector queue
    syscollector_queue_usage='0'

    # Syscollector queue size
    syscollector_queue_size='1280'

    # Rootcheck queue
    rootcheck_queue_usage='0'

    # Rootcheck queue size
    rootcheck_queue_size='1280'

    # Hostinfo queue
    hostinfo_queue_usage='0'

    # Hostinfo queue size
    hostinfo_queue_size='1280'

    # Event queue
    event_queue_usage='0.99'

    # Event queue size
    event_queue_size='1280'

    # Rule matching queue
    rule_matching_queue_usage='0.99'

    # Rule matching queue size
    rule_matching_queue_size='1280'

    # Alerts log queue
    alerts_queue_usage='0.99'

    # Alerts log queue size
    alerts_queue_size='1280'

    # Firewall log queue
    firewall_queue_usage='0'

    # Firewall log queue size
    firewall_queue_size='1280'

    # Statistical log queue
    statistical_queue_usage='0'

    # Statistical log queue size
    statistical_queue_size='1280'

    # Archives log queue
    archives_queue_usage='0'

    # Archives log queue size
    archives_queue_size='1280'

As we can see the ``alerts_queue_usage='0.99'`` is full. This indicates that our hard drive is creating a bottleneck causing the ``rule_matching_queue_usage='0.99'`` 
to be full waiting for the alerts_queue and the ``event_queue_usage='0.99'`` to be waiting for the rule_matching_queue.

To overcome this issue we have a few options:

1. Get a faster HDD so the ``alerts_queue`` can get emptier faster.
2. Increment the ``alerts_queue_size`` in the ``internal_options.conf`` file.
3. Decrease the number of alerts generated by our agents.

2. Example of troubleshooting on the next use case scenario:

First we get the content of the file ``/var/ossec/var/run/ossec-analysisd.state``:


.. code-block:: bash

    # State file for ossec-analysisd

    # Total events decoded
    events_decoded='10500'

    # Syscheck events decoded
    syscheck_events_decoded='10000'
    syscheck_edps='2000'

    # Syscollector events decoded
    syscollector_events_decoded='0'
    syscollector_edps='0'

    # Rootcheck events decoded
    rootcheck_events_decoded='0'
    rootcheck_edps='0'

    # Hostinfo events decoded
    hostinfo_events_decoded='0'
    hostinfo_edps='0'

    # Other events decoded
    other_events_decoded='500'
    other_events_edps='100'

    # Events processed (Rule matching)
    events_processed='10000'
    events_edps='2000'

    # Events dropped
    events_dropped='20000'

    # Alerts written to disk
    alerts_written='28'

    # Firewall alerts written to disk
    firewall_written='0'

    # FTS alerts written to disk
    fts_written='0'

    # Syscheck queue
    syscheck_queue_usage='0.99'

    # Syscheck queue size
    syscheck_queue_size='1280'

    # Syscollector queue
    syscollector_queue_usage='0'

    # Syscollector queue size
    syscollector_queue_size='1280'

    # Rootcheck queue
    rootcheck_queue_usage='0'

    # Rootcheck queue size
    rootcheck_queue_size='1280'

    # Hostinfo queue
    hostinfo_queue_usage='0'

    # Hostinfo queue size
    hostinfo_queue_size='1280'

    # Event queue
    event_queue_usage='0.29'

    # Event queue size
    event_queue_size='1280'

    # Rule matching queue
    rule_matching_queue_usage='0.81'

    # Rule matching queue size
    rule_matching_queue_size='1280'

    # Alerts log queue
    alerts_queue_usage='0.1'

    # Alerts log queue size
    alerts_queue_size='1280'

    # Firewall log queue
    firewall_queue_usage='0'

    # Firewall log queue size
    firewall_queue_size='1280'

    # Statistical log queue
    statistical_queue_usage='0'

    # Statistical log queue size
    statistical_queue_size='1280'

    # Archives log queue
    archives_queue_usage='0'

    # Archives log queue size
    archives_queue_size='1280'

As we can see the ``syscheck_queue_usage='0.99'`` is full. This indicates that the manager is getting too many syscheck events per second.

To overcome this issue we have a few options:

1. Increase the ``syscheck_queue_size`` in the ``internal_options.conf`` file.
2. Decrease the number of syscheck events generated by our agents.

