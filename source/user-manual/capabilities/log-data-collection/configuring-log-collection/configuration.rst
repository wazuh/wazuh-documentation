.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh collects and consolidates log data from endpoints, applications, and cloud integrations. Learn how to collect logs from Windows, Linux, and macOS operating systems.

Collecting logs from operating systems
========================================

Wazuh collects and consolidates log data from endpoints, applications, and cloud integrations to support security monitoring within your environment.

.. _how-to-collect-windowslogs:

Windows
--------

Windows logs are records that provide information about events occurring on Windows systems. Windows Event Viewer displays these events and identifies the software, applications, or system components that generated them. The Wazuh manager normalizes collected events into JSON format, making their fields easier to query, filter, and analyze.

.. _windows_event_channel_log_collection:

Windows log sources
^^^^^^^^^^^^^^^^^^^^^

The Event Channel is a Windows logging format supported on Windows Vista and later versions. It provides access to Applications and Services logs, as well as standard Windows logs such as Application, Security, and System. You can also use queries to filter the events collected from these channels. By default, the Wazuh agent monitors the System, Application, and Security event channels. You can configure the agent to monitor additional event channels based on your monitoring requirements.

The table below lists the channels and providers supported by the Wazuh agent.

+-------------------+------------------------------------------------------------+----------------------------------+---------------------------------------------------------+
| Source            | Channel name                                               | Provider name                    | Description                                             |
+===================+============================================================+==================================+=========================================================+
| Application       | Application                                                | Any                              | This channel collects events related to system          |
|                   |                                                            |                                  | application management and is one of the main Windows   |
|                   |                                                            |                                  | administrative channels, along with Security and        |
|                   |                                                            |                                  | System.                                                 |
+-------------------+------------------------------------------------------------+----------------------------------+---------------------------------------------------------+
| Security          | Security                                                   | Any                              | This channel gathers information related to user and    |
|                   |                                                            |                                  | group creation, login, logoff, and audit policy         |
|                   |                                                            |                                  | modifications.                                          |
+-------------------+------------------------------------------------------------+----------------------------------+---------------------------------------------------------+
| System            | System                                                     | Any                              | The System channel collects events associated with      |
|                   |                                                            |                                  | kernel and service control.                             |
+-------------------+------------------------------------------------------------+----------------------------------+---------------------------------------------------------+
| Sysmon            | Microsoft-Windows-Sysmon/Operational                       | Microsoft-Windows-Sysmon         | Sysmon monitors system activity, including process      |
|                   |                                                            |                                  | creation and termination, network connections, and file |
|                   |                                                            |                                  | changes.                                                |
+-------------------+------------------------------------------------------------+----------------------------------+---------------------------------------------------------+
| Windows Defender  | Microsoft-Windows-Windows Defender/Operational             | Microsoft-Windows-Windows        | The Windows Defender log shows information about scans  |
|                   |                                                            | Defender                         | that passed, malware detections, and actions taken      |
|                   |                                                            |                                  | against them.                                           |
+-------------------+------------------------------------------------------------+----------------------------------+---------------------------------------------------------+
| McAfee            | Application                                                | McLogEvent                       | This source shows McAfee scan results, virus            |
|                   |                                                            |                                  | detections, and actions taken against them.             |
+-------------------+------------------------------------------------------------+----------------------------------+---------------------------------------------------------+
| Event log         | System                                                     | Eventlog                         | This source retrieves information about audit and       |
|                   |                                                            |                                  | Windows logs.                                           |
+-------------------+------------------------------------------------------------+----------------------------------+---------------------------------------------------------+
| PowerShell        | Microsoft-Windows-PowerShell/Operational                   | Microsoft-Windows-PowerShell     | This channel collects and audits PowerShell activity.   |
+-------------------+------------------------------------------------------------+----------------------------------+---------------------------------------------------------+
| Terminal Services | Microsoft-Windows-TerminalServices-RemoteConnectionManager | Any                              | The Terminal Services channel captures Remote Desktop   |
|                   |                                                            |                                  | Protocol (RDP) connection events, and Wazuh groups it   |
|                   |                                                            |                                  | under a generic Windows rule.                           |
+-------------------+------------------------------------------------------------+----------------------------------+---------------------------------------------------------+

Table 2: Available channels and providers.

.. note::

   The Wazuh agent for Windows endpoints does not support monitoring log files on UNC paths, such as ``\\server\share\file.log``, or on mapped network drives, such as ``Z:\logs\file.log``. It supports only log files on local file systems. If you specify a UNC path or mapped drive in the ``<localfile>`` block of your Windows agent configuration, the agent ignores it, and it does not monitor or alert on those locations.

.. _how-to-collect-linuxlogs:

Linux
------

The Wazuh agent on Linux is a lightweight, persistent daemon that collects system and application logs from the local host and securely forwards them to the Wazuh manager for analysis. Using its Logcollector module, the Wazuh agent reads these log sources monitored by default:

Linux log sources
^^^^^^^^^^^^^^^^^^^

The table below lists the most common sources you can monitor with the Wazuh agent ``<localfile>`` block, in addition to the rsyslog relay approach described later in this section.

+-------------------+--------------------------------------------+--------------+------------------+------------------------------------------------------+
| Source            | Log file/location                          | Collected by | Format           | Description                                          |
|                   |                                            | default?     |                  |                                                      |
+===================+============================================+==============+==================+======================================================+
| Disk space usage  | ``df -P``                                  | Yes          | ``command``      | Reports mounted file systems and their available     |
|                   |                                            |              |                  | disk space in a portable, one-filesystem-per-line    |
|                   |                                            |              |                  | format.                                              |
+-------------------+--------------------------------------------+--------------+------------------+------------------------------------------------------+
| Listening network | ``netstat -tulpn``                         | Yes          | ``full_command`` | Lists listening TCP and UDP sockets together with    |
| services          |                                            |              |                  | the associated process and program information.      |
+-------------------+--------------------------------------------+--------------+------------------+------------------------------------------------------+
| Recent login      | ``last -n 20``                             | Yes          | ``full_command`` | Reports the 20 most recent login and logout records. |
| history           |                                            |              |                  |                                                      |
+-------------------+--------------------------------------------+--------------+------------------+------------------------------------------------------+
| systemd journal   | Collected via the ``journald``             | Yes          | ``journald``     | Logs from systemd-managed services on distributions  |
|                   | ``log_format`` instead of a flat file      |              |                  | that route logging through systemd-journald.         |
+-------------------+--------------------------------------------+--------------+------------------+------------------------------------------------------+
| Package           | ``/var/log/dpkg.log`` (Debian/Ubuntu) or   | Yes          | ``syslog``       | Records package installs, upgrades, and removals.    |
| management        | ``/var/log/yum.log`` (RHEL/CentOS)         |              |                  |                                                      |
+-------------------+--------------------------------------------+--------------+------------------+------------------------------------------------------+
| Active response   | ``/var/ossec/logs/active-responses.log``   | Yes          | ``syslog``       | Logs Wazuh agent active response messages.           |
+-------------------+--------------------------------------------+--------------+------------------+------------------------------------------------------+
| System and kernel | ``/var/log/syslog`` (Debian/Ubuntu) or     | No           | ``syslog``       | General system daemon and kernel messages, service   |
|                   | ``/var/log/messages`` (RHEL/CentOS)        |              |                  | start/stop events, and hardware warnings.            |
+-------------------+--------------------------------------------+--------------+------------------+------------------------------------------------------+
| Kernel ring       | ``/var/log/kern.log`` (Debian/Ubuntu only) | No           | ``syslog``       | Kernel-specific messages split out from the general  |
| buffer            |                                            |              |                  | syslog file.                                         |
+-------------------+--------------------------------------------+--------------+------------------+------------------------------------------------------+
| Scheduled tasks   | ``CRON``-tagged entries in syslog, or      | No           | ``syslog``       | Records cron job execution.                          |
|                   | ``/var/log/cron`` on RHEL/CentOS           |              |                  |                                                      |
+-------------------+--------------------------------------------+--------------+------------------+------------------------------------------------------+
| Audit subsystem   | ``/var/log/audit/audit.log``               | No           | ``audit``        | Security-relevant events captured by the Linux Audit |
|                   |                                            |              |                  | daemon (auditd): system calls, file access, and      |
|                   |                                            |              |                  | privilege escalation attempts.                       |
+-------------------+--------------------------------------------+--------------+------------------+------------------------------------------------------+

Table 3: Common Linux log sources the Wazuh agent monitors.

Refer to the local configuration documentation for the full list of supported ``log_format`` values.

.. _how-to-collect-macoslogs:

macOS
------

The macOS unified logging system (ULS) centralizes log management and storage across all system levels. macOS ULS does not write data to text-based log files, so Wazuh uses the log CLI tool to collect logs from macOS endpoints. The log CLI tool provides an interface for filtering and collecting logs. The ``query`` parameters in the Wazuh configuration allow you to:

-  Set the message ``level`` you want to collect.
-  Filter by the log ``type``.
-  Use a precise ``predicate`` to filter logs based on their specific characteristics.

Wazuh interfaces with the log CLI tool using the ``–style syslog`` format to collect logs from macOS ULS:

.. code-block:: xml

   <localfile>
     <location>macos</location>
     <log_format>macos</log_format>
     <query type="trace,log,activity" level="info">(process == "sudo") or (process == "sessionlogoutd" and message contains "logout is complete.") or (process == "sshd") or (process == "tccd" and message contains "Update Access Record") or (message contains "SessionAgentNotificationCenter") or (process == "screensharingd" and message contains "Authentication") or (process == "securityd" and eventMessage contains "Session" and subsystem == "com.apple.securityd")</query>
   </localfile>

You can have only one configuration block with ``log_format`` set to ``macos``. If you add more blocks, only the last one will be used.

Filtering the system logs is optional; use the ``<query>`` label. This label allows setting different filtering options such as:

-  ``type``: Specifies the type of logs collected. The values of ``types`` are ``activity``, ``log``, and ``trace``. You can combine multiple values.
-  ``level``: Indicates the verbosity level. It includes the event at and below the set value. The possible values for ``level`` are ``default``, ``debug``, and ``info``. Check the :ref:`macOS log levels <macos_uls_log_levels>` section to learn more about the different ``levels``.
-  ``<query>``: Filters the macOS logs. It is used as the ULS predicate. Check the :ref:`macOS ULS predicates <macos_uls_predicates>` section to learn more about the predicates.

Be as restrictive as possible when filtering the logs. macOS ULS produces a large volume of log data, and logs of interest can get lost in the noise.

macOS log sources
^^^^^^^^^^^^^^^^^^^

The Wazuh agent ships a default macOS ``<localfile>`` block, using ``log_format=macos``, whose ``<query>`` predicate already covers the sources below. Unlike Linux, where most sources need a ``<localfile>`` block added manually, every source here is collected by default:

+----------------------+---------------------------------------------------------+--------------+-----------------------------------------------+
| Source               | Process/predicate condition                             | Collected by | Description                                   |
|                      |                                                         | default?     |                                               |
+======================+=========================================================+==============+===============================================+
| Privilege escalation | ``process == "sudo"``                                   | Yes          | Logs sudo invocations.                        |
+----------------------+---------------------------------------------------------+--------------+-----------------------------------------------+
| Session logout       | ``process == "sessionlogoutd" and message contains      | Yes          | Confirms a user session has fully logged out. |
|                      | "logout is complete."``                                 |              | Produces no events until a logout actually    |
|                      |                                                         |              | occurs.                                       |
+----------------------+---------------------------------------------------------+--------------+-----------------------------------------------+
| Remote login (SSH)   | ``process == "sshd", "sshd-session", "sshd-auth"``      | Yes          | Collects authentication and session activity  |
|                      |                                                         |              | generated by the macOS OpenSSH service.       |
|                      |                                                         |              | Depending on the macOS version and connection |
|                      |                                                         |              | state, events can be emitted by ``sshd``,     |
|                      |                                                         |              | ``sshd-session``, or ``sshd-auth``.           |
+----------------------+---------------------------------------------------------+--------------+-----------------------------------------------+
| Privacy permissions  | ``process == "tccd" and message contains "Update Access | Yes          | Records changes to app privacy/permission     |
| (TCC)                | Record"``                                               |              | grants, camera, microphone, full disk access, |
|                      |                                                         |              | and similar Transparency, Consent, and        |
|                      |                                                         |              | Control (TCC) prompts.                        |
+----------------------+---------------------------------------------------------+--------------+-----------------------------------------------+
| Session agent        | ``message contains "SessionAgentNotificationCenter"``   | Yes          | Captures ``session-agent-level`` notification |
| notifications        |                                                         |              | events.                                       |
+----------------------+---------------------------------------------------------+--------------+-----------------------------------------------+
| Screen sharing       | ``process == "screensharingd" and message contains      | Yes          | Records authentication attempts over Screen   |
|                      | "Authentication"``                                      |              | Sharing (VNC/ARD). Produces no events unless  |
|                      |                                                         |              | Screen Sharing is enabled on the endpoint.    |
+----------------------+---------------------------------------------------------+--------------+-----------------------------------------------+
| Security daemon      | ``process == "securityd" and eventMessage contains      | Yes          | Session-related events from the macOS         |
| sessions             | "Session" and subsystem == "com.apple.securityd"``      |              | security daemon.                              |
+----------------------+---------------------------------------------------------+--------------+-----------------------------------------------+

Table 4: Sources covered by the default macOS ULS query.

.. _macos_uls_log_levels:

macOS ULS log levels
^^^^^^^^^^^^^^^^^^^^^^

macOS ULS logs are tagged with one of the following levels:

-  ``fault``: These are very descriptive messages and are always stored on the disk. These logs are always displayed regardless of the ``level`` configured.
-  ``error``: Similar to ``fault``. These logs are always displayed regardless of the ``level`` configured.
-  ``default``: Logs at this level are stored on disk. These logs are always displayed regardless of the ``level`` configured.
-  ``info``: Logs at this level are only stored in memory. You can configure these logs to be stored on disk. These logs are displayed when ``info`` or ``debug`` level is set.
-  ``debug``: These messages are not stored by default, but they can be useful for developers. These logs are displayed when the ``debug`` level is set.

When filtering with the ``level`` label, you can set only one of the options ``default``, ``info``, or ``debug``. If you don't set any of these options, then the agent uses the ``default`` option.

.. _macos_uls_predicates:

macOS ULS predicates
^^^^^^^^^^^^^^^^^^^^^^

You can use predicate-based filters to collect logs that match the provided criteria. The filter argument defines one or more pattern clauses based on NSPredicate rules:

Useful filtering keys
~~~~~~~~~~~~~~~~~~~~~~~

-  ``eventType``: Specifies the type of event. These events are ``activityCreateEvent``, ``activityTransitionEvent``, ``logEvent``, ``signpostEvent``, ``stateEvent``, ``timesyncEvent``, ``traceEvent``, and ``userActionEvent``.
-  ``eventMessage``: Specifies the pattern within the message text or activity name of a log/trace entry.
-  ``messageType``: Filters logs by verbosity level; applies only to ``logEvent`` and ``traceEvent``. Possible values include: ``default``, ``info``, ``debug``, ``error``, or ``fault``.
-  ``process``: Specifies the name of the process that generated the event.
-  ``processImagePath``: Specifies the full path of the process that generated the event.
-  ``sender``: Represents the name of the library, framework, kernel extension, or Mach-O image that originated the event.
-  ``senderImagePath``: Represents the full path of the library, framework, kernel extension, or Mach-O image that originated the event.
-  ``subsystem``: Specifies the subsystem used to log an event. It only works with log messages generated with os_log(3) APIs.
-  ``category``: The category used to log an event. Only works with log messages generated with os_log(3) APIs. Provide the subsystem filter when you use the category filter.

Basic comparison operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  ``=``, ``==``: The left-hand expression equals the right-hand expression.
-  ``>=``, ``=>``: The left-hand expression is greater than or equal to the right-hand expression.
-  ``<=``, ``=<``: The left-hand expression is less than or equal to the right-hand expression.
-  ``>``: The left-hand expression is greater than the right-hand expression.
-  ``<``: The left-hand expression is less than the right-hand expression.
-  ``!=``, ``<>``: The left-hand expression is not equal to the right-hand expression.
-  ``BETWEEN``: The left-hand expression is between, or equal to either of, the values specified on the right-hand side. The right-hand side is a two-value array. An array is required to specify the order, giving upper and lower bounds. For example, ``1 BETWEEN { 0, 33 }``, or ``processID BETWEEN { 15320, 16000 }``.

Basic compound predicates
~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  ``AND``, ``&&``: Represents a logical AND.
-  ``OR``, ``||``: Represents a logical OR.
-  ``NOT``, ``!``: Represents a logical NOT.

String comparison operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

By default, string comparison operators are case-sensitive and diacritic-sensitive. You can modify an operator using the key characters ``c`` and ``d`` within square brackets to specify case and diacritic insensitivity, respectively. For example, ``processImagePath BEGINSWITH[cd] "/usr/libexec"`` matches any process whose full path starts with either ``/usr/libexec``, or ``/USR/LIBEXEC``.

-  ``BEGINSWITH``: The left-hand expression begins with the right-hand expression.
-  ``CONTAINS``: The left-hand expression contains the right-hand expression.
-  ``ENDSWITH``: The left-hand expression ends with the right-hand expression.
-  ``LIKE``: The left-hand expression equals the right-hand expression. You can use ``?`` and ``*`` as wildcard characters. ``?`` matches 1 character and ``*`` matches 0 or more characters.
-  ``MATCHES``: The left-hand expression equals the right-hand expression using a regex-style comparison according to ICU v3. For more information, see the `ICU User Guide for Regular Expressions <https://unicode-org.github.io/icu/userguide/strings/regexp.html>`__.
-  ``IN``: Equivalent to an SQL IN operation, the left-hand side must appear in the collection specified by the right-hand side. For example, ``category IN { 'APBonjourCache', 'cas', 'client' }``.

For more information about predicates, see the `Predicate Programming Guide <https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Predicates/Articles/pSyntax.html>`__.
