.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to collect and monitor Windows logs with Wazuh and check out this use case of the log data collection feature.

How to collect Windows logs
===========================

Windows events can be gathered and forwarded to the manager, where they are processed and alerted if they match any rule. There are two formats to collect Windows logs:

- Eventlog (supported by every Windows version)
- Eventchannel (for Windows Vista and later versions)

Windows logs are descriptive messages which come with relevant information about events that occur in the system. They are collected and shown at the Event Viewer, where they are classified by the source that generated them.

Eventlog and eventchannel can be both monitored by Wazuh.
Eventchannel data processing has been improved since Wazuh version 3.8, keeping the old functionality and configuration. This updated log format uses the Windows API in order to get every event generated at a monitored channel's log.

This information is gathered by the Windows agent, including the event description, the ``system`` standard fields and the specific ``eventdata`` information from the event. Once an event is sent to the manager, it is processed and translated to JSON format, which leads to an easier way of querying and filtering the event fields.

Eventlog uses the Windows API to obtain events from Windows logs and return the information in a specific format.

#. `Windows Eventlog vs Windows Eventchannel`_
#. `Monitor the Windows Event Log with Wazuh`_
#. `Monitor the Windows Event Channel with Wazuh`_
#. `Filtering events from Windows Event Channel with queries`_


Windows Eventlog vs Windows Eventchannel
----------------------------------------

Eventlog is supported on every Windows version and can monitor any logs except for particular Applications and Services Logs, this means that the information that can be retrieved is reduced to System, Application, and Security channels.

On the other hand, Eventchannel is maintained since Windows Vista and can monitor the Application and Services logs along with the basic Windows logs. In addition, the use of queries to filter by any field is supported for this log format.

With the new changes made in the ``eventchannel`` log format for versions higher than v3.8.0, the number of fields decoded has increased. In addition, the Windows ruleset has been updated, extended, and reorganized according to the source channel.

Furthermore, these modifications facilitate the process of rules creation as well as the alert triggering since the event is now gathered in JSON format.

Monitor the Windows Event Log with Wazuh
----------------------------------------

To monitor a Windows event log, it is necessary to provide the format as "eventlog" and the location as the name of the event log.

.. code-block:: xml

  <localfile>
      <location>Security</location>
      <log_format>eventlog</log_format>
  </localfile>

These logs are obtained through Windows API calls and sent to the manager, where they will be alerted if they match any rule.

Monitor the Windows Event Channel with Wazuh
--------------------------------------------

Windows event channels can be monitored by placing their name at the location field from the localfile block and "eventchannel" as the log format.

.. note:: Read the `How to collect Windows events with Wazuh <https://wazuh.com/blog/how-to-collect-windows-events-with-wazuh//>`_ document for more information.

.. note::

    If the channel name contains a ``%`` it is necessary to replace it with ``/``. For example, replace Microsoft-Windows-PrintService%Operational with Microsoft-Windows-PrintService/Operational.

.. code-block:: xml

    <localfile>
        <location>Microsoft-Windows-PrintService/Operational</location>
        <log_format>eventchannel</log_format>
    </localfile>

.. note::

    Eventchannel is supported on Windows versions equal to or more recent than Vista.

Available channels and providers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The table below shows available channels and providers to monitor included in the Wazuh ruleset:

+-------------------------------+--------------------------------------------------------------+------------------------------------+--------------------------------------------------------------------------------+
| Source                        | Channel location                                             | Provider name                      | Description                                                                    |
+===============================+==============================================================+====================================+================================================================================+
| Application                   | Application                                                  | Any                                | This log retrieves every event related to system applications management and   |
|                               |                                                              |                                    | is one of the main Windows administrative channels along with Security, and    |
|                               |                                                              |                                    | System.                                                                        |
+-------------------------------+--------------------------------------------------------------+------------------------------------+--------------------------------------------------------------------------------+
| Security                      | Security                                                     | Any                                | This channel gathers information related to users and groups creation, login,  |
|                               |                                                              |                                    | logoff, and audit policy modifications.                                        |
+-------------------------------+--------------------------------------------------------------+------------------------------------+--------------------------------------------------------------------------------+
| System                        | System                                                       | Any                                | The System channel collects events associated with kernel and service control. |
+-------------------------------+--------------------------------------------------------------+------------------------------------+--------------------------------------------------------------------------------+
| Sysmon                        | Microsoft-Windows-Sysmon/Operational                         | Microsoft-Windows-Sysmon           | Sysmon monitors system activity as process creation and termination, network   |
|                               |                                                              |                                    | connection and file changes.                                                   |
+-------------------------------+--------------------------------------------------------------+------------------------------------+--------------------------------------------------------------------------------+
| Windows Defender              | Microsoft-Windows-Windows Defender/Operational               | Microsoft-Windows-Windows Defender | The Windows Defender log file shows information about the scans passed,        |
|                               |                                                              |                                    | malware detection, and actions taken against them.                             |
+-------------------------------+--------------------------------------------------------------+------------------------------------+--------------------------------------------------------------------------------+
| McAfee                        | Application                                                  | McLogEvent                         | This source shows McAfee scan results, virus detection, and actions taken      |
|                               |                                                              |                                    | against them.                                                                  |
+-------------------------------+--------------------------------------------------------------+------------------------------------+--------------------------------------------------------------------------------+
| EventLog                      | System                                                       | Eventlog                           | This source retrieves information about audit and Windows logs.                |
+-------------------------------+--------------------------------------------------------------+------------------------------------+--------------------------------------------------------------------------------+
| Microsoft Security            | System                                                       | Microsoft Antimalware              | This software gives information about real-time protection for the system,     |
| Essentials                    |                                                              |                                    | malware-detection scans, and antivirus settings.                               |
+-------------------------------+--------------------------------------------------------------+------------------------------------+--------------------------------------------------------------------------------+
| Remote Access                 | File Replication Service                                     | Any                                | Other channels (they are grouped in a generic Windows rule file).              |
+-------------------------------+--------------------------------------------------------------+                                    |                                                                                |
| Terminal Services             | Service                                                      |                                    |                                                                                |
|                               | Microsoft-Windows-TerminalServices-RemoteConnectionManager   |                                    |                                                                                |
+-------------------------------+--------------------------------------------------------------+------------------------------------+--------------------------------------------------------------------------------+
| Powershell                    | Microsoft-Windows-PowerShell/Operational                     | Microsoft-Windows-PowerShell       | This channel collects and audits Powershell activity.                          |
+-------------------------------+--------------------------------------------------------------+------------------------------------+--------------------------------------------------------------------------------+

When monitoring a channel, events from different providers can be gathered. In the ruleset, this is taken into account to monitor logs from McAfee, Eventlog or Security Essentials.

Windows ruleset redesign
^^^^^^^^^^^^^^^^^^^^^^^^

In order to ease the addition of new rules, the eventchannel ruleset has been classified according to the channel from which events belong. This will ensure an easier way of maintaining the ruleset organized and finding a better place for custom rules. To accomplish this, several modifications have been added:

- Each event channel has one or more files with rules specific to it. For example, you can find the rules specific to the ``System`` channel in the ``0590-win-system_rules.xml`` file.
- A base file includes every parent rule filtering by the specific channels monitored.
- Rules have been updated and improved to match the new JSON events, showing relevant information in the rule's description and facilitating the way of filtering them.
- New channel rules have been added. By default, the monitored channels are System, Security, and Application. These channels have their own file now and include a fair set of rules.
- Every file has its rule ID range to get it organized. There are a hundred IDs set for the base rules and five hundred for each channel file.
- If some rules can’t be classified easily, or there are so few belonging to a specific channel, they are included in a generic Windows rule file.

To have a complete view of which events are equivalent to the old ones from ``eventlog`` and the previous version of ``eventchannel``, this table classifies every rule according to the source in which they were recorded, including their range of rule IDs and the file where they are described.

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

Use case
^^^^^^^^

This section describes a simple use case of an alert triggered when an installation event occurs.

The installation log will be collected at the Application channel. To monitor logs generated by this source with the eventchannel format, the configuration file should include the next localfile block:

.. code-block:: xml

    <localfile>
      <location>Application</location>
      <log_format>eventchannel</log_format>
    </localfile>

The next step is to install a new application. Once it is installed, the Wazuh manager will build the next JSON event related to the installation process:

.. code-block:: json
    :class: output

    {
        "win": {
            "system": {
            "providerName": "MsiInstaller",
            "eventID": "11707",
            "level": "4",
            "task": "0",
            "keywords": "0x80000000000000",
            "systemTime": "2019-04-03T10:47:39.000000000Z",
            "eventRecordID": "12615",
            "channel": "Application",
            "computer": "pcname",
            "severityValue": "INFORMATION",
            "message": "Product: Dr. Memory -- Installation completed successfully."
            },
            "eventdata": {
            "binary": "7B36373637354144362D314642302D344445312D394543462D3834393937353135303235457D",
            "data": "Product: Dr. Memory -- Installation completed successfully."
            }
        }
    }

This event can be filtered field by field in case an alert is desired to trigger when it occurs. In this use case, the filters used will be the provider name and the event ID, as follows:

.. code-block:: xml

    <rule id="60612" level="3">
        <field name="win.system.providerName">MsiInstaller</field>
        <field name="win.system.eventID">^11707$|^1033$</field>
        <options>alert_by_email</options>
        <description>Application Installed $(win.eventdata.data)</description>
        <options>no_full_log</options>
    </rule>

Finally, once the event is generated, the rule from above will be matched and, therefore, trigger the next alert shown on the Wazuh dashboard:

.. thumbnail:: ../../../images/manual/log-analysis/wazuh-dashboard-alert.png
    :title: Alert shown on the Wazuh dashboard
    :alt: Alert shown on the Wazuh dashboard
    :align: center
    :width: 100%

The next images show a simple event collection with the eventchannel log format.
The first one represents the number of events of each channel, filtered by provider name along the time.

.. thumbnail:: ../../../images/manual/log-analysis/number-of-events.png
    :title: Event count graph
    :alt: Event count graph
    :align: center
    :width: 100%

Some events from different channels are shown below with the associated provider name and severity value:

.. thumbnail:: ../../../images/manual/log-analysis/windows-events.png
    :title: Windows events table
    :alt: Windows events table
    :align: center
    :width: 100%


Filtering events from Windows Event Channel with queries
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Events from the Windows Event channel can be filtered as below. Only events whose levels are less or equal to “3” are checked in this example.

.. code-block:: xml

    <localfile>
      <location>System</location>
      <log_format>eventchannel</log_format>
      <query>Event/System[EventID=7040]</query>
    </localfile>

Users can filter events with different severity levels.

.. code-block:: xml
    :class: escaped-tag-signs

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

.. note::
  The ``<QueryList>`` syntax requires escaping the XML labels inside the query as above. 
