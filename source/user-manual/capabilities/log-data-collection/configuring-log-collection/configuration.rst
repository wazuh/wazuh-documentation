.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh collects and consolidates log data from endpoints, applications, and cloud integrations. Learn how to collect logs from Windows, Linux, and macOS operating systems.

Collecting logs from operating systems
========================================

.. _how-to-collect-windowslogs:

Windows
--------

Windows logs record events occurring on Windows systems. Windows Event Viewer displays these events and identifies the software, applications, or system components that generated them. The Wazuh manager normalizes collected events into JSON format, making their fields easier to query, filter, and analyze.

.. _windows_event_channel_log_collection:

Windows log sources
^^^^^^^^^^^^^^^^^^^^^

The Event Channel is a Windows logging format supported on Windows Vista and later versions. It provides access to Applications and Services logs, as well as standard Windows logs such as Application, Security, and System. You can also use :ref:`queries <reference_ossec_localfile_query>` to filter the events collected from these channels. By default, the Wazuh agent monitors the System, Application, and Security event channels. You can configure the agent to monitor additional event channels based on your monitoring requirements. To add a channel, see :ref:`Monitoring Sysmon events on a Windows endpoint <use_case_monitoring_sysmon_windows>`.

The table below lists the channels and providers supported by the Wazuh agent.

+-------------------+------------------------------------------------------------------------+------------------------------------------------------------+---------------------------------------------------------+
| Source            | Channel name                                                           | Provider name                                              | Description                                             |
+===================+========================================================================+============================================================+=========================================================+
| Application       | Application                                                            | Any                                                        | This channel collects events related to system          |
|                   |                                                                        |                                                            | application management and is one of the main Windows   |
|                   |                                                                        |                                                            | administrative channels, along with Security and        |
|                   |                                                                        |                                                            | System.                                                 |
+-------------------+------------------------------------------------------------------------+------------------------------------------------------------+---------------------------------------------------------+
| Security          | Security                                                               | Any                                                        | This channel gathers information related to user and    |
|                   |                                                                        |                                                            | group creation, login, logoff, and audit policy         |
|                   |                                                                        |                                                            | modifications.                                          |
+-------------------+------------------------------------------------------------------------+------------------------------------------------------------+---------------------------------------------------------+
| System            | System                                                                 | Any                                                        | The System channel collects events associated with      |
|                   |                                                                        |                                                            | kernel and service control.                             |
+-------------------+------------------------------------------------------------------------+------------------------------------------------------------+---------------------------------------------------------+
| Sysmon            | Microsoft-Windows-Sysmon/Operational                                   | Microsoft-Windows-Sysmon                                   | Sysmon monitors system activity, including process      |
|                   |                                                                        |                                                            | creation and termination, network connections, and file |
|                   |                                                                        |                                                            | changes.                                                |
+-------------------+------------------------------------------------------------------------+------------------------------------------------------------+---------------------------------------------------------+
| Windows Defender  | Microsoft-Windows-Windows Defender/Operational                         | Microsoft-Windows-Windows Defender                         | The Windows Defender log shows information about scans  |
|                   |                                                                        |                                                            | that passed, malware detections, and actions taken      |
|                   |                                                                        |                                                            | against them.                                           |
+-------------------+------------------------------------------------------------------------+------------------------------------------------------------+---------------------------------------------------------+
| McAfee            | Application                                                            | McLogEvent                                                 | This source shows McAfee scan results, virus            |
|                   |                                                                        |                                                            | detections, and actions taken against them.             |
+-------------------+------------------------------------------------------------------------+------------------------------------------------------------+---------------------------------------------------------+
| Event log         | System                                                                 | Eventlog                                                   | This source retrieves information about audit and       |
|                   |                                                                        |                                                            | Windows logs.                                           |
+-------------------+------------------------------------------------------------------------+------------------------------------------------------------+---------------------------------------------------------+
| PowerShell        | Microsoft-Windows-PowerShell/Operational                               | Microsoft-Windows-PowerShell                               | This channel collects and audits PowerShell activity.   |
+-------------------+------------------------------------------------------------------------+------------------------------------------------------------+---------------------------------------------------------+
| Terminal Services | Microsoft-Windows-TerminalServices-RemoteConnectionManager/Operational | Microsoft-Windows-TerminalServices-RemoteConnectionManager | The Terminal Services channel captures Remote Desktop   |
|                   |                                                                        |                                                            | Protocol (RDP) connection events and user               |
|                   |                                                                        |                                                            | authentications. Wazuh classifies these events, and a   |
|                   |                                                                        |                                                            | successful RDP authentication raises the Successful     |
|                   |                                                                        |                                                            | user authentication finding.                            |
+-------------------+------------------------------------------------------------------------+------------------------------------------------------------+---------------------------------------------------------+

Available channels and providers

.. note::

   The Wazuh agent for Windows endpoints monitors log files on local file systems only. In the ``<localfile>`` block, use a local path. The agent ignores UNC paths, such as ``\\server\share\file.log``, and mapped network drives, such as ``Z:\logs\file.log``.

.. _how-to-collect-linuxlogs:

Linux
------

Linux logs record the activity of the kernel, system services, and applications on Linux systems. Depending on the distribution, they go to the systemd journal, to text files under ``/var/log``, or to both. The Wazuh agent collects journal entries with the ``journald`` log format and reads each text file listed in a ``<localfile>`` block.

Linux log sources
^^^^^^^^^^^^^^^^^^^

The table below lists common Linux log sources and whether the Wazuh agent monitors them by default. To collect syslog from network devices, see :ref:`Configuring rsyslog on a Linux endpoint <configuring_rsyslog_relay>`.

+---------------------+----------------------------------------------+------------------------+------------------------+--------------------------------------------------------+
| Source              | Log file/location                            | Collected by default?  | Format                 | Description                                            |
+=====================+==============================================+========================+========================+========================================================+
| systemd journal     | Collected via the ``journald``               | Yes, when              | ``journald``           | Logs from systemd-managed services on distributions    |
|                     | ``log_format`` instead of a flat file        | ``journalctl`` is      |                        | that route logging through systemd-journald.           |
|                     |                                              | present at             |                        |                                                        |
|                     |                                              | installation           |                        |                                                        |
+---------------------+----------------------------------------------+------------------------+------------------------+--------------------------------------------------------+
| Package management  | ``/var/log/dpkg.log`` (Debian/Ubuntu)        | Yes, when the file     | ``syslog``             | Records package installs, upgrades, and removals.      |
|                     |                                              | exists at installation |                        |                                                        |
+---------------------+----------------------------------------------+------------------------+------------------------+--------------------------------------------------------+
| APT history         | ``/var/log/apt/history.log`` (Debian/Ubuntu) | Yes, when the file     | ``multi-line-regex``   | Records APT transactions, one event for each           |
|                     |                                              | exists at installation |                        | transaction.                                           |
+---------------------+----------------------------------------------+------------------------+------------------------+--------------------------------------------------------+
| DNF package         | ``/var/log/dnf.log`` and                     | Yes, when the file     | ``syslog``             | Records DNF commands, warnings, errors, and package    |
| management          | ``/var/log/dnf.rpm.log`` (DNF-based          | exists at installation |                        | changes.                                               |
|                     | distributions, such as RHEL 8 and later, and |                        |                        |                                                        |
|                     | Amazon Linux 2023)                           |                        |                        |                                                        |
+---------------------+----------------------------------------------+------------------------+------------------------+--------------------------------------------------------+
| Active response     | ``/var/ossec/logs/active-responses.log``     | Yes                    | ``syslog``             | Logs Wazuh agent active response messages.             |
+---------------------+----------------------------------------------+------------------------+------------------------+--------------------------------------------------------+
| System,             | ``/var/log/syslog`` and                      | Yes, on hosts without  | ``syslog``             | General system daemon, authentication, and kernel      |
| authentication, and | ``/var/log/auth.log`` (Debian/Ubuntu) or     | journald, when the     |                        | messages, service start/stop events, and hardware      |
| kernel              | ``/var/log/messages`` and                    | file exists at         |                        | warnings.                                              |
|                     | ``/var/log/secure`` (RHEL/CentOS)            | installation           |                        |                                                        |
+---------------------+----------------------------------------------+------------------------+------------------------+--------------------------------------------------------+
| Kernel ring buffer  | ``/var/log/kern.log`` (Debian/Ubuntu only)   | Yes, on hosts without  | ``syslog``             | Kernel-specific messages split out from the general    |
|                     |                                              | journald, when the     |                        | syslog file.                                           |
|                     |                                              | file exists at         |                        |                                                        |
|                     |                                              | installation           |                        |                                                        |
+---------------------+----------------------------------------------+------------------------+------------------------+--------------------------------------------------------+
| Scheduled tasks     | ``CRON``-tagged entries in syslog, or        | No                     | ``syslog``             | Records cron job execution.                            |
|                     | ``/var/log/cron`` on RHEL/CentOS             |                        |                        |                                                        |
+---------------------+----------------------------------------------+------------------------+------------------------+--------------------------------------------------------+
| Audit subsystem     | ``/var/log/audit/audit.log``                 | Yes, when the file     | ``audit``              | Security-relevant events captured by the Linux Audit   |
|                     |                                              | exists at installation |                        | daemon (auditd): system calls, file access, and        |
|                     |                                              |                        |                        | privilege escalation attempts.                         |
+---------------------+----------------------------------------------+------------------------+------------------------+--------------------------------------------------------+

Common Linux log sources the Wazuh agent monitors

The Wazuh agent adds a default ``<localfile>`` block only for the files that exist when the agent is installed. To monitor a file created later, add a ``<localfile>`` block for it. To collect the output of a command, such as ``df -P``, ``netstat -tulpn``, or ``last -n 20``, add a ``<localfile>`` block with ``log_format`` set to ``command`` or ``full_command``. No integration classifies command output, so Wazuh indexes it only when **Index unclassified events** is on. The output then appears in ``wazuh-events-v5-unclassified``, and ``wazuh.protocol.location`` holds the ``<alias>`` value of the block.

Refer to the :ref:`local configuration <reference_ossec_localfile_log_format>` documentation for the full list of supported ``log_format`` values.

.. _how-to-collect-macoslogs:

macOS
------

The macOS unified logging system (ULS) centralizes log management and storage across all system levels. macOS ULS does not write data to text-based log files, so Wazuh uses the log CLI tool to collect logs from macOS endpoints.

The Wazuh agent ships with the following default ``<localfile>`` block for macOS:

.. code-block:: xml

   <localfile>
     <location>macos</location>
     <log_format>macos</log_format>
     <query type="trace,log,activity" level="info">(process == "sudo" and sender == "sudo" and not (eventMessage contains "Using original path")) or (process == "sessionlogoutd" and (eventMessage contains "logout is complete." or eventMessage contains "lastUserName")) or ((process == "sshd" or process == "sshd-session" or process == "sshd-auth") and (sender == "sshd" or sender == "sshd-session" or sender == "sshd-auth")) or ((process == "sudo" or process == "sshd" or process == "sshd-session" or process == "sshd-auth") and sender == "libpam.2.dylib" and not (eventMessage contains "doesn't have a" or eventMessage contains "Unable to retrieve")) or (process == "tccd" and eventMessage contains "Update Access Record") or (eventMessage contains "SessionAgentNotificationCenter") or (process == "screensharingd" and eventMessage contains "Authentication") or (process == "securityd" and eventMessage contains "Session" and subsystem == "com.apple.securityd") or (process == "authd" and subsystem == "com.apple.Authorization" and (eventMessage contains "system.login.console" or eventMessage contains "builtin:login-success" or eventMessage contains "Failed authorizing")) or (process == "authorizationhost" and (eventMessage contains "authtok is incorrect" or eventMessage contains "Failed to authenticate")) or (process == "loginwindow" and (eventMessage contains "attempting login for user" or eventMessage contains "is logged in" or eventMessage contains "loginwindow.loginInitiated" or eventMessage contains "loginwindow.logoutInitiated" or eventMessage contains "loginwindow.logoutNoReturn"))</query>
   </localfile>

On macOS 15 and later, ``/etc/sudoers`` contains ``Defaults !log_allowed``, so macOS records no entry for a successful sudo command. To record successful sudo commands for the Wazuh agent to collect, add ``Defaults log_allowed`` in a file under ``/etc/sudoers.d/``, then check the file:

.. code-block:: console

   # echo "Defaults log_allowed" > /etc/sudoers.d/log_allowed
   # chmod 440 /etc/sudoers.d/log_allowed
   # visudo -cf /etc/sudoers.d/log_allowed

You can have only one configuration block with ``log_format`` set to ``macos``. If you add more blocks, the Wazuh agent uses only the last one.

.. note::

   When launchd starts the Wazuh agent, macOS applies light resource limits to it by default, which throttle its CPU usage and I/O bandwidth. On endpoints under sustained high CPU load, the ``log`` tool that the Wazuh agent runs might not keep up, and macOS might discard ULS events before the Wazuh agent reads them. To remove these limits, set the ``ProcessType`` key of the Wazuh agent service to ``Interactive`` and check the file:

   .. code-block:: console

      # /usr/libexec/PlistBuddy -c "Add :ProcessType string Interactive" /Library/LaunchDaemons/com.wazuh.agent.plist
      # plutil -lint /Library/LaunchDaemons/com.wazuh.agent.plist

   Then stop the Wazuh agent service:

   .. code-block:: console

      # launchctl bootout system/com.wazuh.agent

   Wait a few seconds for it to stop, and start it again:

   .. code-block:: console

      # launchctl bootstrap system /Library/LaunchDaemons/com.wazuh.agent.plist

   This setting applies to the whole Wazuh agent service, including FIM, SCA, and rootcheck scans. Installing or upgrading the Wazuh agent, including remote upgrades, overwrites this file, so you need to set the key again after each upgrade.

Filtering the system logs is optional. To filter them, use the ``<query>`` tag and its attributes:

-  ``type`` attribute: Specifies the type of logs collected. The allowed values are ``activity``, ``log``, and ``trace``. You can combine several values.
-  ``level`` attribute: Indicates the verbosity level. It includes the event at and below the set value. The possible values for ``level`` are ``default``, ``debug``, and ``info``. Check the :ref:`macOS log levels <macos_uls_log_levels>` section to learn more about the different ``levels``.
-  Content of the ``<query>`` tag: The ULS predicate that filters the macOS logs. Check the :ref:`macOS ULS predicates <macos_uls_predicates>` section to learn more about the predicates.

Be as restrictive as possible when filtering the logs. macOS ULS produces a large volume of log data, and logs of interest can get lost in the noise.

macOS log sources
^^^^^^^^^^^^^^^^^^^

The ``<query>`` predicate of the default block covers the following sources, and the Wazuh agent collects them all by default:

+------------------------+-----------------------------------------------------------+----------------+-------------------------------------------------+
| Source                 | Process/predicate condition                               | Collected by   | Description                                     |
|                        |                                                           | default?       |                                                 |
+========================+===========================================================+================+=================================================+
| Privilege escalation   | ``process == "sudo" and sender == "sudo" and not          | Yes            | Logs sudo invocations. On macOS 15 and later,   |
|                        | (eventMessage contains "Using original path")``           |                | successful sudo commands are logged only when   |
|                        |                                                           |                | ``log_allowed`` is set. See the note above.     |
+------------------------+-----------------------------------------------------------+----------------+-------------------------------------------------+
| PAM authentication     | ``(process == "sudo" or process == "sshd" or process ==   | Yes            | Records PAM authentication results for sudo and |
|                        | "sshd-session" or process == "sshd-auth") and sender ==   |                | SSH.                                            |
|                        | "libpam.2.dylib" and not (eventMessage contains "doesn't  |                |                                                 |
|                        | have a" or eventMessage contains "Unable to retrieve")``  |                |                                                 |
+------------------------+-----------------------------------------------------------+----------------+-------------------------------------------------+
| Session logout         | ``process == "sessionlogoutd" and (eventMessage contains  | Yes            | Confirms a user session has fully logged out.   |
|                        | "logout is complete." or eventMessage contains            |                | Produces no events until a logout actually      |
|                        | "lastUserName")``                                         |                | occurs.                                         |
+------------------------+-----------------------------------------------------------+----------------+-------------------------------------------------+
| Remote login (SSH)     | ``(process == "sshd" or process == "sshd-session" or      | Yes            | Collects authentication and session activity    |
|                        | process == "sshd-auth") and (sender == "sshd" or sender   |                | generated by the macOS OpenSSH service.         |
|                        | == "sshd-session" or sender == "sshd-auth")``             |                | Depending on the macOS version and connection   |
|                        |                                                           |                | state, events can be emitted by ``sshd``,       |
|                        |                                                           |                | ``sshd-session``, or ``sshd-auth``.             |
+------------------------+-----------------------------------------------------------+----------------+-------------------------------------------------+
| Privacy permissions    | ``process == "tccd" and eventMessage contains "Update     | Yes            | Records changes to app privacy/permission       |
| (TCC)                  | Access Record"``                                          |                | grants, camera, microphone, full disk access,   |
|                        |                                                           |                | and similar Transparency, Consent, and Control  |
|                        |                                                           |                | (TCC) prompts.                                  |
+------------------------+-----------------------------------------------------------+----------------+-------------------------------------------------+
| Session agent          | ``eventMessage contains                                   | Yes            | Captures ``session-agent-level`` notification   |
| notifications          | "SessionAgentNotificationCenter"``                        |                | events.                                         |
+------------------------+-----------------------------------------------------------+----------------+-------------------------------------------------+
| Screen sharing         | ``process == "screensharingd" and eventMessage contains   | Yes            | Records authentication attempts over Screen     |
|                        | "Authentication"``                                        |                | Sharing (VNC/ARD). Produces no events unless    |
|                        |                                                           |                | Screen Sharing is enabled on the endpoint.      |
+------------------------+-----------------------------------------------------------+----------------+-------------------------------------------------+
| Security daemon        | ``process == "securityd" and eventMessage contains        | Yes            | Session-related events from the macOS security  |
| sessions               | "Session" and subsystem == "com.apple.securityd"``        |                | daemon.                                         |
+------------------------+-----------------------------------------------------------+----------------+-------------------------------------------------+
| Authorization          | ``process == "authd" and subsystem ==                     | Yes            | Records authorization results for console       |
|                        | "com.apple.Authorization" and (eventMessage contains      |                | logins.                                         |
|                        | "system.login.console" or eventMessage contains           |                |                                                 |
|                        | "builtin:login-success" or eventMessage contains "Failed  |                |                                                 |
|                        | authorizing")``                                           |                |                                                 |
+------------------------+-----------------------------------------------------------+----------------+-------------------------------------------------+
| Authorization host     | ``process == "authorizationhost" and (eventMessage        | Yes            | Records failed password prompts.                |
|                        | contains "authtok is incorrect" or eventMessage contains  |                |                                                 |
|                        | "Failed to authenticate")``                               |                |                                                 |
+------------------------+-----------------------------------------------------------+----------------+-------------------------------------------------+
| Login window           | ``process == "loginwindow" and (eventMessage contains     | Yes            | Records console logins and logouts.             |
|                        | "attempting login for user" or eventMessage contains "is  |                |                                                 |
|                        | logged in" or eventMessage contains                       |                |                                                 |
|                        | "loginwindow.loginInitiated" or eventMessage contains     |                |                                                 |
|                        | "loginwindow.logoutInitiated" or eventMessage contains    |                |                                                 |
|                        | "loginwindow.logoutNoReturn")``                           |                |                                                 |
+------------------------+-----------------------------------------------------------+----------------+-------------------------------------------------+

.. _macos_uls_log_levels:

macOS ULS log levels
^^^^^^^^^^^^^^^^^^^^^^

macOS ULS logs are tagged with one of the following levels:

-  ``fault``: These are very descriptive messages and are always stored on the disk. These logs are always displayed regardless of the ``level`` configured.
-  ``error``: Similar to ``fault``. These logs are always displayed regardless of the ``level`` configured.
-  ``default``: Logs at this level are stored on disk. These logs are always displayed regardless of the ``level`` configured.
-  ``info``: Logs at this level are only stored in memory. You can configure these logs to be stored on disk. These logs are displayed when ``info`` or ``debug`` level is set.
-  ``debug``: These messages are not stored by default, but they can be useful for developers. These logs are displayed when the ``debug`` level is set.

When you filter with the ``level`` attribute, you can set only one value: ``default``, ``info``, or ``debug``. If you don't set it, the agent uses ``default``.

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

For more information about predicates, see the `Predicate Programming Guide <https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Predicates/Articles/pSyntax.html>`__.
