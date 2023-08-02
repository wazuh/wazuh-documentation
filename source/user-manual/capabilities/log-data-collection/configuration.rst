.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: 

Configuring log collection for different operating systems
==========================================================

Windows
-------

Windows logs are descriptive messages that provide information about events that occur in Windows systems. The Windows Event Viewer shows events, as well as the software, applications, or components that generate them. The Wazuh agent captures  essential information from events, such as their descriptions, standard ``system`` fields, and ``eventdata`` specifics. The Wazuh server analyzes and translates the collected events to JSON format. This format makes it easier for users to query and filter the various event fields.

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To monitor specific Windows event channels using the Wazuh agent, simply include the channel name in the ``location`` field and set the log format as ``eventchannel`` within the ``localfile`` block in the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` file. For example, perform the following steps to monitor the Microsoft-Windows-PrintService/Operational channel:

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can configure Wazuh agent to collect specific Windows events from the Windows event channel using queries. For example, the following configuration collects Windows events from the ``System`` channel whose levels are equal to or less than 3 (warning):

   .. code-block:: none

      <localfile>
        <location>System</location>
        <log_format>eventchannel</log_format>
         <query>
           \<QueryList\>
             \<Query Id="0" Path="System"\>
               \<Select Path="System"\>*[System[(Level&lt;=3)]]\</Select\>
                \</Query\>
              \</QueryList\>
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


