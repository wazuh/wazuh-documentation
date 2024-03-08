.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Log data collection helps security teams to meet regulatory compliance, detect and remediate threats. Learn how to configure log collection on Windows, Linux, and macOS endpoints.

Configuring log collection for different operating systems
==========================================================

.. _how-to-collect-windowslogs:

Windows
-------

Windows logs are descriptive messages that provide information about events that occur in Windows systems. The Windows Event Viewer shows events, as well as the software, applications, or components that generate them. The Wazuh agent captures  essential information from events, such as their descriptions, standard ``system`` fields, and ``eventdata`` specifics. The Wazuh server analyzes and translates the collected events to JSON format. This format makes it easier for users to query and filter the various event fields.

.. _windows_event_channel_log_collection:

Windows event channel
^^^^^^^^^^^^^^^^^^^^^

Event channel is a log format that supports Windows Vista and recent versions. It captures Applications and Services logs, as well as basic Windows logs, including Application, Security, and System logs. This log format also supports the use of queries to monitor specific Windows events. By default, the Wazuh agent monitors the System, Application, and Security Windows event channels. You can configure the Wazuh agent to monitor other Windows event channels of interest.

The table below shows the channels and providers that the Wazuh agent supports.

+-------------------------------+--------------------------------------------------------------+------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Source                        | Channel name                                                 | Provider name                      | Description                                                                                                                                                    |
+===============================+==============================================================+====================================+================================================================================================================================================================+
| Application                   | Application                                                  | Any                                | This channel collects events related to system application management and is one of the main Windows administrative channels along with Security, and System.  |
+-------------------------------+--------------------------------------------------------------+------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Security                      | Security                                                     | Any                                | This channel gathers information related to user and group creation, login, logoff, and audit policy modifications.                                            |
+-------------------------------+--------------------------------------------------------------+------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| System                        | System                                                       | Any                                | The System channel collects events associated with kernel and service control.                                                                                 |
+-------------------------------+--------------------------------------------------------------+------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Sysmon                        | Microsoft-Windows-Sysmon/Operational                         | Microsoft-Windows-Sysmon           | Sysmon monitors system activity such as process creation and termination, network connections, and file changes.                                               |
+-------------------------------+--------------------------------------------------------------+------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Windows Defender              | Microsoft-Windows-Windows Defender/Operational               | Microsoft-Windows-Windows Defender | The Windows Defender log shows information about the scans passed, malware detection, and actions taken against them.                                          |
+-------------------------------+--------------------------------------------------------------+------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| McAfee                        | Application                                                  | McLogEvent                         | This source shows McAfee scan results, virus detection, and actions taken against them.                                                                        |
+-------------------------------+--------------------------------------------------------------+------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| EventLog                      | System                                                       | Eventlog                           | This source retrieves information about audit and Windows logs.                                                                                                |
+-------------------------------+--------------------------------------------------------------+------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Microsoft Security Essentials | System                                                       | Microsoft Antimalware              | This source gives information about real-time protection for the system, malware detection scans, and changes in antivirus settings.                           |
+-------------------------------+--------------------------------------------------------------+------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Remote Access                 | File Replication Service                                     | Any                                | Other channels (they are grouped in a generic Windows rule file).                                                                                              |
+-------------------------------+--------------------------------------------------------------+                                    |                                                                                                                                                                |
| Terminal Services             | Microsoft-Windows-TerminalServices-RemoteConnectionManager   |                                    |                                                                                                                                                                |
+-------------------------------+--------------------------------------------------------------+------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Powershell                    | Microsoft-Windows-PowerShell/Operational                     | Microsoft-Windows-PowerShell       | This channel collects and audits PowerShell activity.                                                                                                          |
+-------------------------------+--------------------------------------------------------------+------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+

Monitoring the Windows event channel with Wazuh
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To monitor specific Windows event channels using the Wazuh agent, simply include the channel name in the ``location`` field and set the log format as ``eventchannel`` within the ``localfile`` block in the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` file. For example, perform the following steps to monitor the ``Microsoft-Windows-PrintService/Operational`` channel:

#. Add the following configuration in between the ``<ossec_config>`` tags of the Wazuh agent ``C:\Program Files (x86)\ossec-agent\ossec.conf`` file:

   .. code-block:: xml

      <localfile>
        <location>Microsoft-Windows-PrintService/Operational</location>
        <log_format>eventchannel</log_format>
      </localfile>

#.  Restart the Wazuh agent via PowerShell with administrator privileges to apply the configuration change:

   .. code-block:: Powershell

      > Restart-Service -Name wazuh

Monitoring specific events from Windows event channel
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can configure Wazuh agent to collect specific Windows events from the Windows event channel using queries. For example, the following configuration collects Windows events from the ``System`` channel whose levels are equal to or less than 3 (warning):

   .. code-block:: xml

      <localfile>
        <location>System</location>
        <log_format>eventchannel</log_format>
         <query>
           \<QueryList>
             \<Query Id="0" Path="System">
               \<Select Path="System">*[System[(Level&lt;=3)]]\</Select>
                \</Query>
              \</QueryList>
        </query>
      </localfile>


Wazuh uses the following configuration to collect Windows events whose event ID is ``7040``:

   .. code-block:: xml

      <localfile>
        <location>System</location>
        <log_format>eventchannel</log_format>
        <query>Event/System[EventID=7040]</query>
      </localfile>


.. note:: When using the ``<QueryList>`` syntax, remember to escape the XML labels inside the query as shown above. Refer to the :ref:`query <query>` documentation to learn the different options of ``query`` you can configure.

Windows event channel ruleset
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Wazuh provides a comprehensive ruleset designed for different Windows event channels. The rules are categorized based on the event channels to which they belong. This classification enables Wazuh to efficiently maintain the ruleset. Additionally, users can add custom rules specific to their desired event channel. The Windows event channel ruleset has the following characteristics:

- By default, the monitored event channels are System, Security, and Application.

- Each event channel has one or more rule files specific to it. For example, you can find the rules specific to the ``System`` event channel in the ``/var/ossec/ruleset/rules/0590-win-system_rules.xml`` file.

- A base file ``/var/ossec/ruleset/rules/0575-win-base_rules.xml`` includes every parent rule for the specific event channels the Wazuh agent monitors.

- Every rule file has a specific rule ID range. Wazuh has reserved 100 rule IDs for the base rules and 500 rule IDs have been reserved for each of the other rule files.

- A generic rule file ``/var/ossec/ruleset/rules/0620-win-generic_rules.xml`` contains rules that cannot be easily classified into specific event channels.

The table below shows the rule ID range and rule filenames reserved for rules from the various Windows event channel sources.

+---------------------+-----------------------------+---------------------------------+
| Source              | Rule IDs                    |   Rule file                     |
+=====================+=============================+=================================+
| Base rules          |   60000 - 60099             | 0575-win-base_rules.xml         |
+---------------------+-----------------------------+---------------------------------+
| Security            |   60100 - 60599             | 0580-win-security_rules.xml     |
+---------------------+-----------------------------+---------------------------------+
| Application         |   60600 - 61099             | 0585-win-application_rules.xml  |
+---------------------+-----------------------------+---------------------------------+
| System              |   61100 - 61599             | 0590-win-system_rules.xml       |
+---------------------+-----------------------------+---------------------------------+
| Sysmon              |   61600 - 62099             | 0595-win-sysmon_rules.xml       |
+---------------------+-----------------------------+---------------------------------+
| Windows Defender    |   62100 - 62599             | 0600-win-wdefender_rules.xml    |
+---------------------+-----------------------------+---------------------------------+
| McAfee              |   62600 - 63099             | 0605-win-mcafee_rules.xml       |
+---------------------+-----------------------------+---------------------------------+
| Eventlog            |   63100 - 63599             | 0610-win-ms_logs_rules.xml      |
+---------------------+-----------------------------+---------------------------------+
| Microsoft Security  |   63600 - 64099             | 0615-win-ms-se_rules.xml        |
| Essentials          |                             |                                 |
+---------------------+-----------------------------+---------------------------------+
| Others              |   64100 - 64599             | 0620-win-generic_rules.xml      |
+---------------------+-----------------------------+---------------------------------+
| Powershell          |   91801 - 92000             | 0915-win-powershell_rules.xml   |
+---------------------+-----------------------------+---------------------------------+

Windows event log
^^^^^^^^^^^^^^^^^

The Windows event log format is compatible with all Windows versions and monitors all logs except for particular Applications and Services logs. This format allows monitoring of logs such as Application, System, and Security. By default, the Wazuh agent is configured to monitor only event channels, but you can configure it to also utilize the Windows event log format.

Monitoring the Windows event log with Wazuh
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can configure Wazuh agent to monitor Windows event logs by placing the name of the event log in the ``location`` field and ``eventlog`` as the log format within the ``localfile`` block in the ``ossec.conf`` file.

For example, perform the following steps to monitor Application logs from Windows event log:

#. Add the following configuration in between the ``<ossec_config>`` tags of the Wazuh agent ``C:\Program Files (x86)\ossec-agent\ossec.conf`` file:

   .. code-block:: xml

      <localfile>
        <location>Application</location>
        <log_format>eventlog</log_format>
      </localfile>

#. Restart the Wazuh agent via PowerShell with administrator privileges to apply the configuration change:

   .. code-block:: Powershell

      > Restart-Service -Name wazuh

.. _how-to-collect-linuxlogs:

Linux
-----

The Wazuh agent collects and forwards Linux events to the Wazuh server for analysis. You can also configure a Linux endpoint to forward events via syslog directly to the Wazuh server for analysis. The Wazuh server has out-of-the-box decoders and rules to extract and analyze relevant fields from Linux events. You can create custom decoders and rules to parse and analyze unsupported Linux events.

Monitoring Linux endpoint using rsyslog
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps to configure a Linux endpoint to forward events using rsyslog to the Wazuh server for analysis:

#. Add the following configuration to the ``/etc/rsyslog.conf`` file on the Linux endpoint:

   .. code-block:: none

      *.info@@<WAZUH_SERVER_IP_ADDRESS>:514

   .. note:: ``@@`` indicates a TCP connection, while ``@`` indicates a UDP connection.

   Where:

      - ``<WAZUH_SERVER_IP_ADDRESS>`` represents the IP address of the Wazuh server.

#. Restart the rsyslog service to apply the configuration change:

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl restart rsyslog

      .. group-tab:: SysV init

         .. code-block:: console

            # service rsyslog restart

#. Add the configuration below in between the ``<ossec_config>`` tags of the ``/var/ossec/etc/ossec.conf`` file on the Wazuh server. This configuration allows the Wazuh  server to listen for remote syslog messages from the Linux endpoint:

   .. code-block:: xml

      <remote>
        <connection>syslog</connection>
        <port>514</port>
        <protocol>tcp</protocol>
        <allowed-ips>192.168.2.15</allowed-ips>
        <local_ip>192.168.2.5</local_ip>
      </remote>

   Where:

   - ``<connection>`` specifies the type of connection to accept. This value can either be ``secure`` or ``syslog``.

   - ``<port>`` is the port used to listen for incoming events from the Linux endpoint. The default port for syslog is 514.

   - ``<protocol>`` is the protocol used to listen for incoming events from the Linux endpoint. This value is either ``tcp`` or ``udp``.

   - ``<allowed-ips>`` is the IP address of the Linux endpoint forwarding events to the Wazuh server.

   - ``<local_ip>`` is the IP address of the Wazuh server listening for the incoming Linux events.

   For more information on remote options, refer to :doc:`remote - local configuration </user-manual/reference/ossec-conf/remote>`.

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: xml

      # systemctl restart wazuh-manager

.. _how-to-collect-macoslogs:

macOS
------

.. versionadded:: 4.3.0

The macOS unified logging system (ULS) centralizes the management and storage of logs across all the system levels. macOS ULS does not write data to text-based log files, requiring Wazuh to use the CLI log tool to collect logs from macOS endpoints. The CLI log tool provides an interface for filtering and collecting logs. The ``query`` parameters in the Wazuh configuration allow users to:

- Set the ``level`` of the messages to collect.

- Filter by the log ``type``.

- Use a precise ``predicate`` to filter logs, given their specific characteristics.

Collecting macOS ULS logs with the Wazuh agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh interfaces with the CLI log tool using the ``–style syslog`` format to collect logs from macOS ULS:

   .. code-block:: xml

      <localfile>
        <location>macos</location>
        <log_format>macos</log_format>
        <query type="trace,log,activity" level="info">(process == "sudo") or (process == "sessionlogoutd" and message contains "logout is complete.") or (process == "sshd") or (process == "tccd" and message contains "Update Access Record") or (message contains "SessionAgentNotificationCenter") or (process == "screensharingd" and message contains "Authentication") or (process == "securityd" and eventMessage contains "Session" and subsystem == "com.apple.securityd")</query>
      </localfile>

.. warning:: You can only have one configuration block with ``log_format`` set as ``macos``. If you add more blocks, only the last one will be used.

To filter the system logs, it's necessary, but not mandatory, to use the ``<query>`` label. This label allows setting different filtering options such as:

- ``type``: Specifies the type of logs collected. The values of ``types`` are ``activity``, ``log``, and ``trace``. You can combine multiple values.

- ``level``: Indicates the level of verbosity. It includes the event at and below the set value. The possible values for ``level`` are ``default``, ``debug``, and ``info``. Check the :ref:`macOS log levels <macos_uls_log_levels>` section to learn more about the different levels.

- ``<query>``: Filters the macOS logs. It is used as the ULS predicate. Check the :ref:`macOS ULS predicates <macos_uls_predicates>` section to learn more about the predicates.

.. warning:: Be sure to be as restrictive as possible when filtering the logs. macOS ULS produces a lot of log data that may be overwhelming, and some logs of interest could be lost in the noise.

.. _macos_uls_log_levels:

macOS ULS log levels
^^^^^^^^^^^^^^^^^^^^

macOS ULS logs are tagged with one of the following levels:

- ``fault``: These are very descriptive messages and are always stored on the disk. These logs are always displayed regardless of the ``level`` configured.

- ``error``: This is similar to ``fault``. These logs are always displayed regardless of the ``level`` configured.

- ``default``: Logs at this level are stored on disk. These logs are always displayed regardless of the ``level`` configured.

- ``info``:  Logs at this level are only stored in memory. You can configure these logs to be stored on disk. These logs are displayed when ``info`` or ``debug`` level is set.

- ``debug``: These messages are not stored by default, but they can be useful for developers. These logs are displayed when the ``debug`` level is set. 

When filtering with the ``level`` label, you can set only one of the options ``default``, ``info``, or ``debug``. If you don’t set any of these options, then the agent uses the ``default`` option.

.. _macos_uls_predicates:

macOS ULS predicates
^^^^^^^^^^^^^^^^^^^^

You can use predicate-based filters to collect logs based on the provided filter criteria. The filter argument defines one or more pattern clauses based on NSPredicate rules:

Useful filtering keys
~~~~~~~~~~~~~~~~~~~~~

- ``eventType``: This specifies the type of event. These events are ``activityCreateEvent``, ``activityTransitionEvent``, ``logEvent``, ``signpostEvent``, ``stateEvent``, ``timesyncEvent``, ``traceEvent`` and ``userActionEvent``.

- ``eventMessage``: Specifies the pattern within the message text or activity name of a log/trace entry.

- ``messageType``: This is used to filter the logs by their level of verbosity, and it works only for ``logEvent`` and ``traceEvent``. The possible values you can filter by are: ``default``, ``info``, ``debug``, ``error``, or ``fault``.

- ``process``: This specifies the name of the process that generated the event.

- ``processImagePath``: This specifies the full path of the process that generated the event.

- ``sender``: This represents the name of the library, framework, kernel extension, or mach-o image that originated the event.

- ``senderImagePath``: This represents the full path of the library, framework, kernel extension, or mach-o image that originated the event.

- ``subsystem``: This specifies the subsystem used to log an event. It only works with log messages generated with os_log(3) APIs.

- ``category``: This is the category used to log an event. Only works with log messages generated with os_log(3) APIs. The subsystem filter should also be provided when the category filter is used.

Basic comparison operators
~~~~~~~~~~~~~~~~~~~~~~~~~~

- ``=, ==``: The left-hand expression equals the right-hand expression.

- ``>=, =>``: The left-hand expression is greater than or equal to the right-hand expression.

- ``<=, =<``: The left-hand expression is less than or equal to the right-hand expression.

- ``>``: The left-hand expression is greater than the right-hand expression.

- ``<``: The left-hand expression is less than the right-hand expression.

- ``!=, <>``: The left-hand expression is not equal to the right-hand expression.

- ``BETWEEN``: The left-hand expression is between, or equal to either of, the values specified on the right-hand side. The right-hand side is a two-value array. An array is required to specify the order, giving upper and lower bounds. For example, ``1 BETWEEN { 0, 33 }, or processID BETWEEN { 15320, 16000 }``.

Basic compound predicates
~~~~~~~~~~~~~~~~~~~~~~~~~

- ``AND, &&``: represents a logical AND.

- ``OR, ||``: represents a logical OR.

- ``NOT, !``:  represents a logical NOT.

String comparison operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~

String comparison operators are by default case and diacritic-sensitive. You can modify an operator using the key characters ``c`` and ``d`` within square braces to specify case and diacritic insensitivity respectively. For example, ``processImagePath BEGINSWITH[cd] "/usr/libexec"`` matches any process whose full path starts with either ``/usr/libexec``, or ``/USR/LIBEXEC``. 

- ``BEGINSWITH``: The left-hand expression begins with the right-hand expression.

- ``CONTAINS``: The left-hand expression contains the right-hand expression.

- ``ENDSWITH``: The left-hand expression ends with the right-hand expression.

- ``LIKE``: The left-hand expression equals the right-hand expression. You can use ``?`` and ``*`` as wildcard characters. ``?`` matches 1 character and ``*`` matches 0 or more characters.

- ``MATCHES``: The left-hand expression equals the right-hand expression using a regex-style comparison according to ICU v3. For more information, see the `ICU User Guide for Regular Expressions <https://unicode-org.github.io/icu/userguide/strings/regexp.html>`_.

- ``IN``: Equivalent to an SQL IN operation, the left-hand side must appear in the collection specified by the right-hand side. For example, ``category IN { 'APBonjourCache', 'cas', 'client' }``.

.. note:: For more information about predicates, see the `Predicate Programming Guide <https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Predicates/Articles/pSyntax.html>`_.

macOS decoders and rules
^^^^^^^^^^^^^^^^^^^^^^^^

.. versionadded:: 4.4.2

The Wazuh server has default decoders and rules to analyze macOS events. These decoders and rules are in the files ``/var/ossec/ruleset/decoders/0580-macos_decoders.xml`` and ``/var/ossec/ruleset/rules/0960-macos_rules.xml`` respectively.

