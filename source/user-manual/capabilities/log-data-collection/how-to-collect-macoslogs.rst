.. Copyright (C) 2021 Wazuh, Inc.

.. _how-to-collect-macoslogs:

How to collect macOS ULS logs
=============================

MacOS unified logging system (ULS) events can be gathered and forwarded to the manager.

The ULS centralizes the management and storage of the logs across all the system levels, from Apps to the Kernel itself, rather than writing the data to text-based log files. Because of this, it is necessary to use specific methods to retrieve logs from this particular system.

In order to gather the logs, Wazuh uses the CLI `log` tool which provides an interesting interface for log collection in a filtered way, since all the ULS logs pass through this single system. This parameters let the user configure the ``level`` of messages to be gathered, filter by the log ``type`` and even use a very specific ``predicate`` to filter the logs given its more specific charasteristics.


Monitor the macOS ULS Logs with Wazuh
-------------------------------------

Wazuh interfaces with the ``log stream`` tool to acquire the logs from the macOS Unified Logging System (**ULS**).

  .. code-block:: xml

    <localfile>
      <location>oslog</location>
      <log_format>oslog</log_format>
      <query type="log,trace" level="debug">process == "sshd" OR message CONTAINS "invalid"</query>
    </localfile>

In order to filter the system logs, it is necessesary, but not mandatory, to use the ``query`` label. This label allows to set different filtering aspects such as:

- ``type`` : Limits the type of logs that are intended to be acquired (``activity`` ; ``log`` **and/or** ``trace``). Multiple values are allowed.
- ``level`` : Indicates the level of verbosity. Includes events at, and below, the given level value (``default`` ; ``info`` **or** ``debug``). For more information about the predicates, see `ULS Logs Levels`_.
- ``<query>process == "sshd" OR message CONTAINS "invalid"</query>`` : The query is used directly as the ULS predicate, which is used to filter the logs. Notice that these are not exactly SQL queries since they have specific operators. For more information about the predicates, see `ULS Predicates`_.

.. warning::
    Be sure to be as restrictive as possible when filtering the logs. MacOS ULS produces a lot of data that might exceed the processing capacity and some logs of interest could be lost.


ULS Logs Levels
---------------

Any log in the ULS is tagged with one of the following levels:

- ``Fault`` : These are very descriptive messages and are always stored on the disk. These logs are always displayed (included at any ``level``).
- ``Error`` : Similar to ``Fault``. These logs are always displayed (included at any ``level``).
- ``Default`` : These logs are stored on the disk. These logs are always displayed (included at any ``level``).
- ``Info`` : These logs are only stored on the RAM, unless they are configured to be saved to disk. These logs are displayed when ``info`` or ``debug`` level is set.
- ``Debug`` : These messages are usually useful for developers and are not stored by default. These logs are only displayed when the ``debug`` level is set.

When filtering with the ``level`` label, **only one** of the options (``default`` ; ``info`` **or** ``debug``) can be set. If this option is omited, then the ``default`` value is used.


ULS Predicates
--------------

Using predicate-based filters allows users to focus on messages based on the provided filter criteria.  The filter argument defines one or more pattern clauses following NSPredicate rules.

Useful Filtering Keys
^^^^^^^^^^^^^^^^^^^^^

- ``eventType`` :  The type of event: activityCreateEvent, activityTransitionEvent, logEvent, signpostEvent, stateEvent, timesyncEvent, traceEvent and userActionEvent.

- ``eventMessage`` : The pattern within the message text, or activity name of a log/trace entry.

- ``messageType`` : For logEvent and traceEvent, the type of the message itself: default, info, debug, error or fault.

- ``process`` : The name of the process the originated the event.

- ``processImagePath`` : The full path of the process that originated the event.

- ``sender`` : The name of the library, framework, kernel extension, or mach-o image, that originated the event.

- ``senderImagePath`` : The full path of the library, framework, kernel extension, or mach-o image, that originated the event.

- ``subsystem`` : The subsystem used to log an event. Only works with log messages generated with os_log(3) APIs.

- ``category`` : The category used to log an event. Only works with log messages generated with os_log(3) APIs. When category is used, the subsystem filter should also be provided.


Basic Comparisons
^^^^^^^^^^^^^^^^^

- ``=``, ``==`` : The left-hand expression is equal to the right-hand expression.
- ``>=``, ``=>`` : The left-hand expression is greater than or equal to the right-hand expression.
- ``<=``, ``=<`` : The left-hand expression is less than or equal to the right-hand expression.
- ``>`` : The left-hand expression is greater than the right-hand expression.
- ``<`` : The left-hand expression is less than the right-hand expression.
- ``!=``, ``<>`` : The left-hand expression is not equal to the right-hand expression.
- ``BETWEEN`` : The left-hand expression is between, or equal to either of, the values specified in the right-hand side. The right-hand side is a two value array (an array is required to specify order) giving upper and lower bounds. For example, ``1 BETWEEN { 0 , 33 }``, or ``processID BETWEEN { 15320, 16000 }``.


Basic Compound Predicates
^^^^^^^^^^^^^^^^^^^^^^^^^

- ``AND``, ``&&`` : Logical AND.
- ``OR``, ``||`` : Logical OR.
- ``NOT``, ``!`` : Logical NOT.


String Comparisons
^^^^^^^^^^^^^^^^^^

String comparisons are by default case and diacritic sensitive. You can modify an operator using the key characters c and d within square braces to specify case and diacritic insensitivity respectively, for example ``processImagePath BEGINSWITH[cd] "/usr/libexec"``.

- ``BEGINSWITH`` : The left-hand expression begins with the right-hand expression.
- ``CONTAINS`` : The left-hand expression contains the right-hand expression.
- ``ENDSWITH`` : The left-hand expression ends with the right-hand expression.
- ``LIKE`` : The left hand expression equals the right-hand expression: ? and * are allowed as wildcard characters, where ? matches 1 character and * matches 0 or more characters.
- ``MATCHES`` : The left hand expression equals the right hand expression using a regex-style comparison according to ICU v3 (for more details see the `ICU User Guide for Regular Expressions <https://presstige.io/p/Regular-Expressions-ICU-User-Guide-0eff0feb3f9f4cceb4428c00c5662e97/>`_).
- ``IN`` : Equivalent to an SQL IN operation, the left-hand side must appear in the collection specified by the right-hand side. For example, ``category IN { 'APBonjourCache', 'cas', 'client' }``.

.. note::
    For more information about predicates, see Apple's Developers: `Predicate Programming Guide <https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Predicates/Articles/pSyntax.html>`_. 

