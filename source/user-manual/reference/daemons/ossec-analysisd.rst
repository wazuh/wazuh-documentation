.. Copyright (C) 2018 Wazuh, Inc.

.. _ossec-analysisd:

ossec-analysisd
===============

The ``ossec-analysisd`` program receives the log messages and compares them to the rules.  It then creates an alert when a log message matches an applicable rule.

+-----------------+-------------------------------------------------------------------------------------------------+
| **-c <config>** | Run using <config> as the configuration file.                                                   |
+-----------------+-------------------------------------------------------------------------------------------------+
| **-D <dir>**    | Chroot to <dir>.                                                                                |
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
| **-V**          | Display the version and license information.                                                    |
+-----------------+-------------------------------------------------------------------------------------------------+

Daemon multithreaded internal structure
---------------------------------------

.. thumbnail:: ../../../images/manual/analysisd-structure.png
    :title: Analysisd architecture
    :align: center
    :width: 100%

Steps involucrated

1. The socket receives the message and sends it to the respective decoder queue. They can be one of the following:
    a. Syscheck event decoder queue.
    b. Syscollector event decoder queue.
    c. Rootcheck event decoder queue.
    d. Hostinfo event decoder queue.
    e. Event decoder queue.

    If the selected queue is full, the event is dropped.

2. Each decoder thread:
    a. Takes out the event from it's queue.
    b. Cleans the event.
    c. Decodes the event.
    d. Sends the event to the rule matching queue.

3. Each rule matching thread:
    a. Takes the event from the queue.
    b. Runs rule matching.
    c. If the event is a firewall event, it is sended to the firewall queue.
    d. If the event has statistical flag, it is sended to the statistical queue.
    e. If the event has the FTS flag, it is sended to the FTS queue.
    f. If an alert is generated, it is sended to the alert queue.
    g. If logall is activated, the event is sended to the archives queue.

4. Each writer thread:
    a. Takes the event from the queue.
    b. Stores the element in memory to be written on it's own log file.

4. Logging:
    a. Every 1 second, all the log files are writted to the HDD.
    b. Every 5 seconds (by default, if not overrided), the status file for Analysisd is generated.


Flow example of an event
------------------------

The image below shows the flow for a Rootcheck event that generates an alert.

.. thumbnail:: ../../../images/manual/analysisd-flow-example.png
    :title: Flow example
    :align: center
    :width: 100%

As you can see, every part of the Analsysd multithreaded engine is independent from one another, except for the rule matching threads that shares the same queue.

Automatic leveling of the threads
----------------------------------

By the default when Analysisd starts, it will spawn the number of threads based on the number of CPU cores of the machine it runs on.
For example if the machine has 4 physiscal cores, the threads created will be:

    - 4 threads for decoders (4 for Syscheck,4 for Syscollector,4 for Rootcheck, 4 for Hostinfo,4 for others).
    - 4 threads for rule matching.

This default configuration can be changed on the ``internal_options.conf`` file by changing the following fields:

+----------------------------------------------+---------------+---------------------------------------------------------------------+
|        **analysisd.event_threads**           | Description   | Number of event decoder threads.                                    |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Default value | 0                                                                   |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Allowed value | 0: Sets the number of threads according to the number of cpu cores. |
+                                              +               +---------------------------------------------------------------------+
|                                              |               | Any integer between 0 and 32.                                       |
+----------------------------------------------+---------------+---------------------------------------------------------------------+
|       **analysisd.syscheck_threads**         | Description   | Number of Syscheck event decoder threads.                           |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Default value | 0                                                                   |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Allowed value | 0: Sets the number of threads according to the number of cpu cores. |
+                                              +               +---------------------------------------------------------------------+
|                                              |               | Any integer between 0 and 32.                                       |
+----------------------------------------------+---------------+---------------------------------------------------------------------+
|     **analysisd.syscollector_threads**       | Description   | Number of Syscollector event decoder threads.                       |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Default value | 0                                                                   |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Allowed value | 0: Sets the number of threads according to the number of cpu cores. |
+                                              +               +---------------------------------------------------------------------+
|                                              |               | Any integer between 0 and 32.                                       |
+----------------------------------------------+---------------+---------------------------------------------------------------------+
|        **analysisd.rootcheck_threads**       | Description   | Number of Rootcheck event decoder threads.                          |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Default value | 0                                                                   |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Allowed value | 0: Sets the number of threads according to the number of cpu cores. |
+                                              +               +---------------------------------------------------------------------+
|                                              |               | Any integer between 0 and 32.                                       |
+----------------------------------------------+---------------+---------------------------------------------------------------------+
|       **analysisd.hostinfo_threads**         | Description   | Number of hostinfo event decoder threads.                           |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Default value | 0                                                                   |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Allowed value | 0: Sets the number of threads according to the number of cpu cores. |
+                                              +               +---------------------------------------------------------------------+
|                                              |               | Any integer between 0 and 32.                                       |
+----------------------------------------------+---------------+---------------------------------------------------------------------+
|     **analysisd.rule_matching_threads**      | Description   | Number of rule matching threads.                                    |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Default value | 0                                                                   |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Allowed value | 0: Sets the number of threads according to the number of cpu cores. |
+                                              +               +---------------------------------------------------------------------+
|                                              |               | Any integer between 0 and 32.                                       |
+----------------------------------------------+---------------+---------------------------------------------------------------------+

For example if our mananger receives few Rootcheck events, we can lower the number of Rootcheck decoder threads. 
Take a look at the next sections below to learn how tune **Analysisd**.

Status file
-----------

This file shows the information relative to the status of the **Analysisd daemon**, displaying realtime data. It can help to analyse situations where you need to troubleshoot problems related on getting less events or alerts as expected.

The format of the file is bash. You can see the information of the **Analysisd daemon** at ``/var/ossec/var/run/ossec-analysisd.state``.

In the table below, are the fields of the file:

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

Use cases of the Analysisd status file
--------------------------------------

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