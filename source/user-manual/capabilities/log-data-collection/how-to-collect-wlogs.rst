.. Copyright (C) 2018 Wazuh, Inc.

How to collect Windows logs
===========================

Windows events can be gathered and forwarded to the manager, where they are processed and alerted if they match any rule. There are two formats to collect Windows logs. One of them is eventlog, which is supported on every Windows since the oldest to the newest one. The other one is eventchannel, which also supports querying and is available on Windows Vista and later versions.

#. `Reading logs from Windows Event Log`_
#. `Reading events from Windows Event Channel`_
#. `Filtering events from Windows Event Channel with queries`_
#. `Filtering events from Windows Event Channel based on severity and queries`_

Reading logs from Windows Event Log
-----------------------------------

To monitor a Windows event log, you need to provide the format as "eventlog" and the location as the name of the event log::

  <localfile>
      <location>Security</location>
      <log_format>eventlog</log_format>
  </localfile>

Reading events from Windows Event Channel
-----------------------------------------

You can additionally monitor specific Windows event channels. The location is the name of the event channel. This is the only way to monitor the Applications and Services logs. If the file name contains a "%", replace it with "/"::

    <localfile>
        <location>Microsoft-Windows-PrintService/Operational</location>
        <log_format>eventchannel</log_format>
    </localfile>

The ``eventchannel`` log format has been enhanced for Wazuh v3.8.0 with a new event data processing, keeping the old functionality and configuration. It allows to monitor every event generated at any Windows agent, returning every channel’s information in JSON format. As the old eventchannel, with this log_format the channels can be queried, filtering by event ID, process, logon type, or any other field contained in the generated event, giving the possibility to retrieve only the desired events.

This new option uses the JSON decoder to draw the event fields, ensuring a new way to add rules easier than before.

Some sample events from Windows eventchannel are shown in the next images:

.. thumbnail:: ../../../images/manual/log_analysis/windows_events.png
    :title: Windows events
    :align: center
    :width: 100%

The following image represents the number of events of each channel, filtered by provider name along the time.

.. thumbnail:: ../../../images/manual/log_analysis/windows_alerts.png
    :title: Number of events by provider name along the time
    :align: center
    :width: 100%


The default channels included at the ruleset are described below:

- Application. This log retrieves every event related to system applications management and is one of the main Windows administrative channels along with Security and System.
- Security. This channel gathers information related to user and group creation, login, logoff and audit policy modifications.
- System. The System channel collects events associated to kernel and service control.
- Sysmon. Sysmon monitors system activity as process creation and termination, network connection and file changes.
- Windows Defender. The Windows Defender log file shows information about the scans passed, malware detection and actions taken against them.
- McAfee. This source shows McAfee scan results, virus detection and actions taken against them.
- Eventlog. This source retrieves information about audit and Windows logs.
- Microsoft Security Essentials. This software gives information about real time protection for the system, malware-detection scans and antivirus settings.
- Other channel rules which are not that common are stored in a different file, 0615-win-generic_rules.xml. At the time the channels monitored for the rules contained in that file are File Replication Service and every sub-channel related to Microsoft-Windows-TerminalServices.

The different channels contemplated at the ruleset can be filtered at the configuration localfile block as the table from below shows in the 'channel location' column:

+-------------------------------+--------------------------------------------------------------------+
| Source                        | Channel location                                                   |
+-------------------------------+--------------------------------------------------------------------+
| Application                   | Application                                                        |
+-------------------------------+--------------------------------------------------------------------+
| Security                      | Security                                                           |
+-------------------------------+--------------------------------------------------------------------+
| System                        | System                                                             |
+-------------------------------+--------------------------------------------------------------------+
| Sysmon                        | Microsoft-Windows-Sysmon/Operational                               |
+-------------------------------+--------------------------------------------------------------------+
| Windows Defender              | Microsoft-Windows-Windows Defender/Operational                     |
+-------------------------------+--------------------------------------------------------------------+
| McAfee                        | McLogEvent                                                         |
+-------------------------------+--------------------------------------------------------------------+
| EventLog                      | Microsoft-Windows-Eventlog                                         |
+-------------------------------+--------------------------------------------------------------------+
| Microsoft Security Essentials | Microsoft Antimalware                                              |
+-------------------------------+--------------------------------------------------------------------+
| Remote Access                 | File Replication Service                                           |
+-------------------------------+--------------------------------------------------------------------+
| Terminal Services             | Service Microsoft-Windows-TerminalServices-RemoteConnectionManager |
+-------------------------------+--------------------------------------------------------------------+

To have a complete view of which events are equivalent to the old ones, this table classifies events depending on the source where they are logged, including their rule ID range.

+----------------+---------------------------------------------------------------+--------------------------------------------------------------------+
| Source         | Eventchannel                                                  | Eventlog                                                           |
+                +-----------------------------+---------------------------------+-------------------------------------+------------------------------+
|                |  Rule IDs                   |   Rule file                     |  Rule IDs                           |   Rule file                  |
+----------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| Base rules     |   60000 - 60099             | 0575-win-base_rules.xml         |  18100 - 18103, 7704, 7500          | | 0220-msauth_rules.xml,     |
|                |                             |                                 |                                     | | 0230-ms-se_rules.xml,      |
|                |                             |                                 |                                     | | 0225-mcafee_av_rules.xml   |
+----------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| Security       |   60100 - 60599             | 0580-win-security_rules.xml     | | 18100 - 18124, 18127 - 18128,     | 0220-msauth_rules.xml        |
|                |                             |                                 | | 18130 - 18144, 18146 - 18149,     |                              |
|                |                             |                                 | | 18151 - 18155, 18170 - 18181,     |                              |
|                |                             |                                 | | 18200 - 18256, 18260 - 18261      |                              |
+----------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| Application    |   60600 - 61099             | 0585-win-application_rules.xml  |  18158 - 18160, 18146 - 18147       | 0220-msauth_rules.xml        |
+----------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| System         |   61100 - 61599             | 0590-win-system_rules.xml       |  18145                              | 0220-msauth_rules.xml        |
+----------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| Sysmon         |   61600 - 62099             | 0595-win-sysmon_rules.xml       | | 184665 - 184776, 184676 - 184678, | 0330-sysmon_rules.xml        |
|                |                             |                                 | | 184686 - 184687, 184696 - 184698, |                              |
|                |                             |                                 | | 184706 - 184707, 184716 - 184717, |                              |
|                |                             |                                 | | 184726 - 184727, 184736 - 184737, |                              |
|                |                             |                                 | | 184746 - 184747, 184766 - 184767, |                              |
|                |                             |                                 | | 184776 - 184777, 185000 - 185013  |                              |
+----------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
|Windows Defender|   62100 - 62599             | 0600-win-wdefender_rules.xml    |   83000 - 83002                     | 0430-ms_wdefender_rules.xml  |
+----------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| McAfee         |   62600 - 63099             | 0605-win-mcafee_rules.xml       |   7500 - 7514, 7550                 | 0225-mcafee_av_rules.xml     |
+----------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| Eventlog       |   63100 - 63599             | 0610-win-ms_logs_rules.xml      |   83200 - 83202                     | 0435-ms_logs_rules.xml       |
+----------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| Microsoft      |   63600 - 64099             | 0620-win-ms-se_rules.xml        |   7701 - 7720                       | 0230-ms-se_rules.xml         |
| Security       |                             |                                 |                                     |                              |
| Essentials     |                             |                                 |                                     |                              |
+----------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| Others         |   64100 - 64599             | 0615-win-generic_rules.xml      | | 18125 - 18126, 18129,             | 0220-msauth_rules.xml        |
|                |                             |                                 | | 18257 - 18259, 18156 - 18157      |                              |
+----------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+


Filtering events from Windows Event Channel with queries
--------------------------------------------------------

Events from the Windows Event channel can be filtered as below::

    <localfile>
      <location>System</location>
      <log_format>eventchannel</log_format>
      <query>Event/System[EventID=7040]</query>
    </localfile>

Filtering events from Windows Event Channel based on severity and queries
-------------------------------------------------------------------------

Users can filter events with different severity levels:

    .. code-block:: xml

        <localfile>
            <location>System</location>
            <log_format>eventchannel</log_format>
            <query>
                \<QueryList>
                    \<Query Id="0"\ Path="System">
                        \<Select Path="System">*[System[(Level&lt;=3)]]\</Select>
                    \</Query>
                \</QueryList>
            </query>
        </localfile>

In this example, only events which levels are less or equal to "3" are checked.
