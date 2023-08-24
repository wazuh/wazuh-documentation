.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how the ``wazuh-analysisd`` program receives the log messages and compares them to the rules in this section of the documentation.

.. _wazuh-analysisd:

wazuh-analysisd
===============

The ``wazuh-analysisd`` program receives the log messages and compares them to the rules. It then creates an alert when a log message matches an applicable rule.

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

.. _wazuh-analysisd-structure:

Daemon multithreaded internal structure
---------------------------------------

.. thumbnail:: ../../../images/manual/analysisd-diagram/analysisd-structure.png
    :title: Analysisd architecture
    :align: center
    :width: 100%

**How this works**
^^^^^^^^^^^^^^^^^^

1. The socket receives the message and sends it to the respective decoder queue. They can be one of the following:
    a. Syscheck event decoder queue.
    b. Syscollector event decoder queue.
    c. Rootcheck event decoder queue.
    d. Hostinfo event decoder queue.
    e. Event decoder queue.
    f. Windows event decoder queue.

    If the selected queue is full, the event is dropped.

2. Each decoder thread:
    a. Takes out the event from it's queue.
    b. Cleans the event.
    c. Decodes the event.
    d. Sends the event to the rule matching queue.

3. Each rule matching thread:
    a. Takes the event from the queue.
    b. Runs rule matching.
    c. If the event is a firewall event, it is sent to the firewall queue.
    d. If the event has statistical flag, it is sent to the statistical queue.
    e. If the event has the FTS flag, it is sent to the FTS queue.
    f. If an alert is generated, it is sent to the alert queue.
    g. If logall is activated, the event is sent to the archives queue.

4. Each writer thread:
    a. Takes the event from the queue.
    b. Stores the element in memory to be written on its own log file.

5. Logging:
    a. Every 1 second, all the log files are written to the HDD.
    b. Every 5 seconds (by default, if not overridden), the status file for Analysisd is generated.

Flow example of an event
------------------------

The image below shows the flow for a Rootcheck event that generates an alert.

.. thumbnail:: ../../../images/manual/analysisd-diagram/analysisd-flow-example.png
    :title: Flow example
    :align: center
    :width: 100%

As you can see, every part of the Analysisd multithreaded engine is independent of one another, except for the rule-matching threads that share the same queue.

Automatic leveling of the threads
----------------------------------

By default, when Analysisd starts it will spawn the number of threads based on the number of CPU cores of the machine where it's running. For example, if the machine has 4 physical cores, the following threads will be created:

    - 4 threads for **decoders** (4 for Syscheck, 4 for Syscollector, 4 for Rootcheck, 4 for Hostinfo, and 4 for others).
    - 4 threads for **rule matching**.

This default configuration can be changed on the ``internal_options.conf`` file by changing the fields from the table below:

+----------------------------------------------+---------------+---------------------------------------------------------------------+
|        **analysisd.event_threads**           | Description   | Number of event decoder threads.                                    |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Default value | 0                                                                   |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Allowed value | 0: Sets the number of threads according to the number of CPU cores. |
+                                              +               +---------------------------------------------------------------------+
|                                              |               | Any integer between 0 and 32.                                       |
+----------------------------------------------+---------------+---------------------------------------------------------------------+
|       **analysisd.syscheck_threads**         | Description   | Number of Syscheck event decoder threads.                           |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Default value | 0                                                                   |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Allowed value | 0: Sets the number of threads according to the number of CPU cores. |
+                                              +               +---------------------------------------------------------------------+
|                                              |               | Any integer between 0 and 32.                                       |
+----------------------------------------------+---------------+---------------------------------------------------------------------+
|     **analysisd.syscollector_threads**       | Description   | Number of Syscollector event decoder threads.                       |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Default value | 0                                                                   |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Allowed value | 0: Sets the number of threads according to the number of CPU cores. |
+                                              +               +---------------------------------------------------------------------+
|                                              |               | Any integer between 0 and 32.                                       |
+----------------------------------------------+---------------+---------------------------------------------------------------------+
|        **analysisd.rootcheck_threads**       | Description   | Number of Rootcheck event decoder threads.                          |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Default value | 0                                                                   |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Allowed value | 0: Sets the number of threads according to the number of CPU cores. |
+                                              +               +---------------------------------------------------------------------+
|                                              |               | Any integer between 0 and 32.                                       |
+----------------------------------------------+---------------+---------------------------------------------------------------------+
|       **analysisd.hostinfo_threads**         | Description   | Number of hostinfo event decoder threads.                           |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Default value | 0                                                                   |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Allowed value | 0: Sets the number of threads according to the number of CPU cores. |
+                                              +               +---------------------------------------------------------------------+
|                                              |               | Any integer between 0 and 32.                                       |
+----------------------------------------------+---------------+---------------------------------------------------------------------+
|     **analysisd.rule_matching_threads**      | Description   | Number of rule matching threads.                                    |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Default value | 0                                                                   |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Allowed value | 0: Sets the number of threads according to the number of CPU cores. |
+                                              +               +---------------------------------------------------------------------+
|                                              |               | Any integer between 0 and 32.                                       |
+----------------------------------------------+---------------+---------------------------------------------------------------------+
|     **analysisd.winevt_threads**             | Description   | Number of rule matching threads.                                    |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Default value | 0                                                                   |
+                                              +---------------+---------------------------------------------------------------------+
|                                              | Allowed value | 0: Sets the number of threads according to the number of CPU cores. |
+                                              +               +---------------------------------------------------------------------+
|                                              |               | Any integer between 0 and 32.                                       |
+----------------------------------------------+---------------+---------------------------------------------------------------------+

For example, if the manager receives a few Rootcheck events, we can decrease the number of threads for the Rootcheck decoder.
