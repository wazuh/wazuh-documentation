.. Copyright (C) 2018 Wazuh, Inc.

How to collect Windows logs
===========================

Windows events can be gathered and forwarded to the manager, where they are processed and alerted if they match any rule. There are two formats to collect Windows logs:

- Eventlog (supported by every Windows version)
- Eventchannel (for Windows prior or equal to Vista)

Windows logs are descriptive messages which come with relevant information about events that occur in the system. They are collected and shown at the Event Viewer, where they are classified by the source that generated them.

Eventlog and eventchannel can be both monitored by Wazuh.
Eventchannel data processing has been improved since Wazuh version 3.8, keeping the old functionality and configuration. This updated log format uses the Windows API in order to get every event generated at a monitored channel's log.

This information is gathered by the Windows agent, including the event message, the ``system`` standard fields and the specific ``eventdata`` information from the event. Once it is sent to the manager, it will process this event and parse it to JSON format, which leads to an easier way of querying and filtering by the event fields.

Eventlog uses as well the Windows API to obtain events from Windows logs and return the information in a specific format.

#. `Windows Eventlog vs Windows Eventchannel`_
#. `Monitor the Windows Event Log with Wazuh`_
#. `Monitor the Windows Event Channel with Wazuh`_
#. `Filtering events from Windows Event Channel with queries`_


Windows Eventlog vs Windows Eventchannel
----------------------------------------

Eventlog is supported on every Windows versions and can monitor any logs except for the Applications and Services Logs, this means that the information that can be retrieved is reduced to System, Application and Security logs.

In the other hand, Eventchannel is maintained since Windows Vista and can monitor the Application and Services logs along with the basic Windows logs. In addition, the use of queries to filter by any field is supported for this log format.

With the new changes made in the ``eventchannel`` log format for versions higher than 3.8, the number of fields retrieved has increased comparing it with eventlog and the previous version of eventchannel, since all the information exposed at the Windows event is defined in the alert triggered as well, in addition the ruleset has been updated, extended and reorganized according to the channel since Wazuh 3.9. Furthermore, this modifications facilitate the process of rules' creation and alert triggering since the event is now gathered in JSON format.


Monitor the Windows Event Log with Wazuh
----------------------------------------

To monitor a Windows event log, it is necessary to provide the format as "eventlog" and the location as the name of the event log::

  <localfile>
      <location>Security</location>
      <log_format>eventlog</log_format>
  </localfile>

These logs are obtained through Windows API calls and sent to the manager where they will be alerted if they match any rule.

Monitor the Windows Event Channel with Wazuh
--------------------------------------------

Windows event channels can be monitored by placing their name at the location field from the localfile block and "eventchannel" as the log format.

.. note::
    If the channel name contains a ``%`` it is necessary to replace it with ``/``. For example, replace Microsoft-Windows-PrintService%Operational with Microsoft-Windows-PrintService/Operational.

.. code-block:: xml

    <localfile>
        <location>Microsoft-Windows-PrintService/Operational</location>
        <log_format>eventchannel</log_format>
    </localfile>

.. note::
    Eventchannel is supported on Windows prior or equal to Vista.

Available channels
^^^^^^^^^^^^^^^^^^

The channels added by default at the ruleset can be filtered at the configuration localfile block as the 'channel location' column shows in the table from below:

+-------------------------------+--------------------------------------------------------------+--------------------------------------------------------------------------------+
| Source                        | Channel location                                             | Description                                                                    |
+-------------------------------+--------------------------------------------------------------+--------------------------------------------------------------------------------+
| Application                   | Application                                                  | | This log retrieves every event related to system applications management and |
|                               |                                                              | | is one of the main Windows administrative channels along with Security and   |
|                               |                                                              | | System.                                                                      |
+-------------------------------+--------------------------------------------------------------+--------------------------------------------------------------------------------+
| Security                      | Security                                                     | | This channel gathers information related to users and groups creation, login,|
|                               |                                                              | | logoff and audit policy modifications.                                       |
+-------------------------------+--------------------------------------------------------------+--------------------------------------------------------------------------------+
| System                        | System                                                       | The System channel collects events associated with kernel and service control. |
+-------------------------------+--------------------------------------------------------------+--------------------------------------------------------------------------------+
| Sysmon                        | Microsoft-Windows-Sysmon/Operational                         | | Sysmon monitors system activity as process creation and termination, network |
|                               |                                                              | | connection and file changes.                                                 |
+-------------------------------+--------------------------------------------------------------+--------------------------------------------------------------------------------+
| Windows Defender              | Microsoft-Windows-Windows Defender/Operational               | | The Windows Defender log file shows information about the scans passed,      |
|                               |                                                              | | malware detection and actions taken against them.                            |
+-------------------------------+--------------------------------------------------------------+--------------------------------------------------------------------------------+
| McAfee                        | McLogEvent                                                   | | This source shows McAfee scan results, virus detection and actions taken     |
|                               |                                                              | | against them.                                                                |
+-------------------------------+--------------------------------------------------------------+--------------------------------------------------------------------------------+
| EventLog                      | Microsoft-Windows-Eventlog                                   | This source retrieves information about audit and Windows logs.                |
+-------------------------------+--------------------------------------------------------------+--------------------------------------------------------------------------------+
| | Microsoft Security          | Microsoft Antimalware                                        | | This software gives information about real-time protection for the system,   |
| | Essentials                  |                                                              | | malware-detection scans and antivirus settings.                              |
+-------------------------------+--------------------------------------------------------------+--------------------------------------------------------------------------------+
| Remote Access                 | File Replication Service                                     | These rules which are not that common are stored in a different file.          |
+-------------------------------+--------------------------------------------------------------+                                                                                |
| Terminal Services             | | Service                                                    |                                                                                |
|                               | | Microsoft-Windows-TerminalServices-RemoteConnectionManager |                                                                                |
+-------------------------------+--------------------------------------------------------------+--------------------------------------------------------------------------------+


Windows ruleset redesign
^^^^^^^^^^^^^^^^^^^^^^^^

In order to ease the addition of new rules, the eventchannel ruleset has been classified according to the channel from which events belong. This will ensure an easier way of maintaining the ruleset organized and find the better place for custom rules. To accomplish this, several modifications have been added:

- Each eventchannel file contains a specific channel's rules.
- A base file includes every parent rule filtering by the specific channel from which the other rules will pend.
- Eventlog rules have been updated and improved to match the new JSON events, showing relevant information at the rule's description and facilitating the way of filtering them.
- New channel's rules have been added. By default, the monitored channels are System, Security and Application, but at the old version there weren't enough rules for Application and System. These two channels have their own file now and include a fair set of rules.
- Every file has their own rule ID range in order to get it organized. There are a hundred IDs set for the base rules and five hundred for each channel file.
- In case some rules can't be classified easily or there are so few belonging to a specific channel, they are included at a generic rule file.

To have a complete view of which events are equivalent to the old ones from ``eventlog`` and the previous version of ``eventchannel``, this table classifies every rule according to the source in which they were recorded, including their range of rule IDs and the file where they are described.

+---------------------+---------------------------------------------------------------+--------------------------------------------------------------------+
| Source              | Eventchannel (Wazuh >= 3.9.0)                                 | Eventchannel and eventlog (Wazuh < 3.9.0)                          |
+                     +-----------------------------+---------------------------------+-------------------------------------+------------------------------+
|                     |  Rule IDs                   |   Rule file                     |  Rule IDs                           |   Rule file                  |
+---------------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| Base rules          |   60000 - 60099             | 0575-win-base_rules.xml         |  18100 - 18103, 7704, 7500          | | 0220-msauth_rules.xml,     |
|                     |                             |                                 |                                     | | 0230-ms-se_rules.xml,      |
|                     |                             |                                 |                                     | | 0225-mcafee_av_rules.xml   |
+---------------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| Security            |   60100 - 60599             | 0580-win-security_rules.xml     | | 18100 - 18124, 18127 - 18128,     | 0220-msauth_rules.xml        |
|                     |                             |                                 | | 18130 - 18144, 18146 - 18149,     |                              |
|                     |                             |                                 | | 18151 - 18155, 18170 - 18181,     |                              |
|                     |                             |                                 | | 18200 - 18256, 18260 - 18261      |                              |
+---------------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| Application         |   60600 - 61099             | 0585-win-application_rules.xml  |  18158 - 18160, 18146 - 18147       | 0220-msauth_rules.xml        |
+---------------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| System              |   61100 - 61599             | 0590-win-system_rules.xml       |  18145                              | 0220-msauth_rules.xml        |
+---------------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| Sysmon              |   61600 - 62099             | 0595-win-sysmon_rules.xml       | | 184665 - 184776, 184676 - 184678, | 0330-sysmon_rules.xml        |
|                     |                             |                                 | | 184686 - 184687, 184696 - 184698, |                              |
|                     |                             |                                 | | 184706 - 184707, 184716 - 184717, |                              |
|                     |                             |                                 | | 184726 - 184727, 184736 - 184737, |                              |
|                     |                             |                                 | | 184746 - 184747, 184766 - 184767, |                              |
|                     |                             |                                 | | 184776 - 184777, 185000 - 185013  |                              |
+---------------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
|Windows Defender     |   62100 - 62599             | 0600-win-wdefender_rules.xml    |   83000 - 83002                     | 0430-ms_wdefender_rules.xml  |
+---------------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| McAfee              |   62600 - 63099             | 0605-win-mcafee_rules.xml       |   7500 - 7514, 7550                 | 0225-mcafee_av_rules.xml     |
+---------------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| Eventlog            |   63100 - 63599             | 0610-win-ms_logs_rules.xml      |   83200 - 83202                     | 0435-ms_logs_rules.xml       |
+---------------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| | Microsoft Security|   63600 - 64099             | 0615-win-ms-se_rules.xml        |   7701 - 7720                       | 0230-ms-se_rules.xml         |
| | Essentials        |                             |                                 |                                     |                              |
+---------------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+
| Others              |   64100 - 64599             | 0620-win-generic_rules.xml      | | 18125 - 18126, 18129,             | 0220-msauth_rules.xml        |
|                     |                             |                                 | | 18257 - 18259, 18156 - 18157      |                              |
+---------------------+-----------------------------+---------------------------------+-------------------------------------+------------------------------+


Use case
^^^^^^^^

This section describes a simple use case of an alert triggered when an installation event occurs.

The installation log will be collected at the Application channel. To monitor logs generated by this source with the eventchannel format, the configuration file should include the next localfile block:

.. code-block:: xml

    <localfile>
        <location>Application</location>
        <log_format>eventchannel</log_format>
    </localfile>

The next step is to install the application wanted to be monitored. Once it is installed, the Wazuh manager will build the next JSON event related with the installation process:

.. code-block:: json

    {"win":{"system":{"providerName":"MsiInstaller","eventID":"11707","level":"4","task":"0","keywords":"0x80000000000000","systemTime":"2019-04-03T10:47:39.000000000Z","eventRecordID":"12615","channel":"Application","computer":"pcname","severityValue":"INFORMATION","message":"Product: Dr. Memory -- Installation completed successfully."},"eventdata":{"binary":"7B36373637354144362D314642302D344445312D394543462D3834393937353135303235457D","data":"Product: Dr. Memory -- Installation completed successfully."}}}

This event can be filtered field by field in case an alert is desired to trigger when it occurs. In this use case, the filters used will be the provider name and the event ID, as follows:

.. code-block:: xml

    <rule id="60612" level="3">
        <field name="win.system.providerName">MsiInstaller</field>
        <field name="win.system.eventID">^11707$|^1033$</field>
        <options>alert_by_email</options>
        <description>Application Installed $(win.eventdata.data)</description>
        <options>no_full_log</options>
    </rule>

Finally, once the event is generated, the rule from above will be matched and therefore, trigger the next alert shown at the Kibana app:

.. thumbnail:: ../../../images/manual/log_analysis/kibana-evtchannel-alert.png
    :title: Log analysis flow
    :align: center
    :width: 100%

The next images show a simple event collection with the eventchannel log format.
The first one represents the number of events of each channel, filtered by provider name along the time.

.. thumbnail:: ../../../images/manual/log_analysis/windows_alerts.png
    :title: Number of events by provider name along the time
    :align: center
    :width: 100%

Some events from different channels are shown below with the associated provider name and severity value:

.. thumbnail:: ../../../images/manual/log_analysis/windows_events.png
    :title: Windows events
    :align: center
    :width: 100%


Filtering events from Windows Event Channel with queries
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Events from the Windows Event channel can be filtered as below::

    <localfile>
      <location>System</location>
      <log_format>eventchannel</log_format>
      <query>Event/System[EventID=7040]</query>
    </localfile>

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
