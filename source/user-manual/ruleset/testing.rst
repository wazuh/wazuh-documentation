.. Copyright (C) 2019 Wazuh, Inc.

.. _ruleset_testing:

Testing decoders and rules
===============================

Each environment needs a specified ruleset. The Sysadmins eventually will need to create their own rules and decoders. 

When creating rules and decoders, there is a need to verify that they work. The Logtest tool allows their testing and verification.

To test logs like following run */var/ossec/bin/ossec-logtest* and paste it. ::

    Mar  8 22:39:13 ip-10-0-0-10 sshd[2742]: Accepted publickey for root from 73.189.131.56 port 57516

Logtest output will be:

.. code-block:: console

    $ /var/ossec/bin/ossec-logtest

    Mar  8 22:39:13 ip-10-0-0-10 sshd[2742]: Accepted publickey for root from 73.189.131.56 port 57516

    **Phase 1: Completed pre-decoding.
           full event: 'Mar  8 22:39:13 ip-10-0-0-10 sshd[2742]: Accepted publickey for root from 73.189.131.56 port 57516'
           hostname: 'ip-10-0-0-10'
           program_name: 'sshd'
           log: 'Accepted publickey for root from 73.189.131.56 port 57516'

    **Phase 2: Completed decoding.
           decoder: 'sshd'
           dstuser: 'root'
           srcip: '73.189.131.56'

    **Phase 3: Completed filtering (rules).
           Rule id: '5715'
           Level: '3'
           Description: 'sshd: authentication success.'
    **Alert to be generated.


As shown, log processing has three phases:

  - Phase 1: Pre-decoding tries to divide logs into four fields following the Syslog standard. 
  - Phase 2: The decoding extracts useful information to share in a possible alert.
  - Phase 3: Rules matching decides if a log will generate an alert.


.. note::
    - Only the log message extracting in *Phase 1* will be pushed to rules and decoders.
    - If *Phase 1* doesn't admit log format, full log will be pushed to rules and decoders.
    - The decoder name showed in *Phase 2* will be the name of the parent decoder.

.. note::
    Logtest has mutliples options to run. You can see all of these `here <../reference/tools/ossec-logtest.html>`_.


Test Event channel events
-------------------------

Wazuh allows the monitoring of Windows event channels. There are two formats to collect Windows logs: Eventlog and Eventchannel.

To test rules for logs in eventchannel format the option -e can be used.

An example could be the following. Run Logtest and paste this log::

    <Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event"><System><Provider Name="Microsoft-Windows-Security-Auditing" Guid="{54849625-5478-4994-a5ba-3e3b0328c30d}" /><EventID>4625</EventID><Version>0</Version><Level>0</Level><Task>12544</Task><Opcode>0</Opcode><Keywords>0x8010000000000000</Keywords><TimeCreated SystemTime="2019-11-21T09:27:22.761037400Z" /><EventRecordID>219488</EventRecordID><Correlation ActivityID="{edb11679-a087-0000-f018-b1ed87a0d501}" /><Execution ProcessID="584" ThreadID="3520" /><Channel>Security</Channel><Computer>WIN-6UJQ4IGFLK2</Computer><Security /></System><EventData><Data Name="SubjectUserSid">S-1-5-18</Data><Data Name="SubjectUserName">WIN-6UJQ4IGFLK2$</Data><Data Name="SubjectDomainName">WORKGROUP</Data><Data Name="SubjectLogonId">0x3e7</Data><Data Name="TargetUserSid">S-1-0-0</Data><Data Name="TargetUserName">Administrator</Data><Data Name="TargetDomainName">WIN-6UJQ4IGFLK2</Data><Data Name="Status">0xc000006d</Data><Data Name="FailureReason">%%2313</Data><Data Name="SubStatus">0xc000006a</Data><Data Name="LogonType">7</Data><Data Name="LogonProcessName">User32</Data><Data Name="AuthenticationPackageName">Negotiate</Data><Data Name="WorkstationName">WIN-6UJQ4IGFLK2</Data><Data Name="TransmittedServices">-</Data><Data Name="LmPackageName">-</Data><Data Name="KeyLength">0</Data><Data Name="ProcessId">0x340</Data><Data Name="ProcessName">C:\Windows\System32\svchost.exe</Data><Data Name="IpAddress">127.0.0.1</Data><Data Name="IpPort">0</Data></EventData></Event>

The output is:

.. code-block:: console

    $ /var/ossec/bin/ossec-logtest -e
    2019/11/22 09:59:56 ossec-testrule: INFO: Started (pid: 12330).
    ossec-testrule: Type one log per line.

    <Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event"><System><Provider Name="Microsoft-Windows-Security-Auditing" Guid="{54849625-5478-4994-a5ba-3e3b0328c30d}" /><EventID>4625</EventID><Version>0</Version><Level>0</Level><Task>12544</Task><Opcode>0</Opcode><Keywords>0x8010000000000000</Keywords><TimeCreated SystemTime="2019-11-21T09:27:22.761037400Z" /><EventRecordID>219488</EventRecordID><Correlation ActivityID="{edb11679-a087-0000-f018-b1ed87a0d501}" /><Execution ProcessID="584" ThreadID="3520" /><Channel>Security</Channel><Computer>WIN-6UJQ4IGFLK2</Computer><Security /></System><EventData><Data Name="SubjectUserSid">S-1-5-18</Data><Data Name="SubjectUserName">WIN-6UJQ4IGFLK2$</Data><Data Name="SubjectDomainName">WORKGROUP</Data><Data Name="SubjectLogonId">0x3e7</Data><Data Name="TargetUserSid">S-1-0-0</Data><Data Name="TargetUserName">Administrator</Data><Data Name="TargetDomainName">WIN-6UJQ4IGFLK2</Data><Data Name="Status">0xc000006d</Data><Data Name="FailureReason">%%2313</Data><Data Name="SubStatus">0xc000006a</Data><Data Name="LogonType">7</Data><Data Name="LogonProcessName">User32</Data><Data Name="AuthenticationPackageName">Negotiate</Data><Data Name="WorkstationName">WIN-6UJQ4IGFLK2</Data><Data Name="TransmittedServices">-</Data><Data Name="LmPackageName">-</Data><Data Name="KeyLength">0</Data><Data Name="ProcessId">0x340</Data><Data Name="ProcessName">C:\Windows\System32\svchost.exe</Data><Data Name="IpAddress">127.0.0.1</Data><Data Name="IpPort">0</Data></EventData></Event>



    **Phase 1: Completed pre-decoding.
        full event: '<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event"><System><Provider Name="Microsoft-Windows-Security-Auditing" Guid="{54849625-5478-4994-a5ba-3e3b0328c30d}" /><EventID>4625</EventID><Version>0</Version><Level>0</Level><Task>12544</Task><Opcode>0</Opcode><Keywords>0x8010000000000000</Keywords><TimeCreated SystemTime="2019-11-21T09:27:22.761037400Z" /><EventRecordID>219488</EventRecordID><Correlation ActivityID="{edb11679-a087-0000-f018-b1ed87a0d501}" /><Execution ProcessID="584" ThreadID="3520" /><Channel>Security</Channel><Computer>WIN-6UJQ4IGFLK2</Computer><Security /></System><EventData><Data Name="SubjectUserSid">S-1-5-18</Data><Data Name="SubjectUserName">WIN-6UJQ4IGFLK2$</Data><Data Name="SubjectDomainName">WORKGROUP</Data><Data Name="SubjectLogonId">0x3e7</Data><Data Name="TargetUserSid">S-1-0-0</Data><Data Name="TargetUserName">Administrator</Data><Data Name="TargetDomainName">WIN-6UJQ4IGFLK2</Data><Data Name="Status">0xc000006d</Data><Data Name="FailureReason">%%2313</Data><Data Name="SubStatus">0xc000006a</Data><Data Name="LogonType">7</Data><Data Name="LogonProcessName">User32</Data><Data Name="AuthenticationPackageName">Negotiate</Data><Data Name="WorkstationName">WIN-6UJQ4IGFLK2</Data><Data Name="TransmittedServices">-</Data><Data Name="LmPackageName">-</Data><Data Name="KeyLength">0</Data><Data Name="ProcessId">0x340</Data><Data Name="ProcessName">C:\Windows\System32\svchost.exe</Data><Data Name="IpAddress">127.0.0.1</Data><Data Name="IpPort">0</Data></EventData></Event>'
        timestamp: '(null)'
        hostname: 'lopezziur'
        program_name: '(null)'
        log: '<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event"><System><Provider Name="Microsoft-Windows-Security-Auditing" Guid="{54849625-5478-4994-a5ba-3e3b0328c30d}" /><EventID>4625</EventID><Version>0</Version><Level>0</Level><Task>12544</Task><Opcode>0</Opcode><Keywords>0x8010000000000000</Keywords><TimeCreated SystemTime="2019-11-21T09:27:22.761037400Z" /><EventRecordID>219488</EventRecordID><Correlation ActivityID="{edb11679-a087-0000-f018-b1ed87a0d501}" /><Execution ProcessID="584" ThreadID="3520" /><Channel>Security</Channel><Computer>WIN-6UJQ4IGFLK2</Computer><Security /></System><EventData><Data Name="SubjectUserSid">S-1-5-18</Data><Data Name="SubjectUserName">WIN-6UJQ4IGFLK2$</Data><Data Name="SubjectDomainName">WORKGROUP</Data><Data Name="SubjectLogonId">0x3e7</Data><Data Name="TargetUserSid">S-1-0-0</Data><Data Name="TargetUserName">Administrator</Data><Data Name="TargetDomainName">WIN-6UJQ4IGFLK2</Data><Data Name="Status">0xc000006d</Data><Data Name="FailureReason">%%2313</Data><Data Name="SubStatus">0xc000006a</Data><Data Name="LogonType">7</Data><Data Name="LogonProcessName">User32</Data><Data Name="AuthenticationPackageName">Negotiate</Data><Data Name="WorkstationName">WIN-6UJQ4IGFLK2</Data><Data Name="TransmittedServices">-</Data><Data Name="LmPackageName">-</Data><Data Name="KeyLength">0</Data><Data Name="ProcessId">0x340</Data><Data Name="ProcessName">C:\Windows\System32\svchost.exe</Data><Data Name="IpAddress">127.0.0.1</Data><Data Name="IpPort">0</Data></EventData></Event>'

    **Phase 2: Completed decoding.

        decoder: 'windows_eventchannel'
        win.system.providerName: 'Microsoft-Windows-Security-Auditing'
        win.system.providerGuid: '{54849625-5478-4994-a5ba-3e3b0328c30d}'
        win.system.eventID: '4625'
        win.system.version: '0'
        win.system.level: '0'
        win.system.task: '12544'
        win.system.opcode: '0'
        win.system.keywords: '0x8010000000000000'
        win.system.systemTime: '2019-11-21T09:27:22.761037400Z'
        win.system.eventRecordID: '219488'
        win.system.processID: '584'
        win.system.threadID: '3520'
        win.system.channel: 'Security'
        win.system.computer: 'WIN-6UJQ4IGFLK2'
        win.system.severityValue: 'AUDIT_FAILURE'
        win.eventdata.subjectUserSid: 'S-1-5-18'
        win.eventdata.subjectUserName: 'WIN-6UJQ4IGFLK2$'
        win.eventdata.subjectDomainName: 'WORKGROUP'
        win.eventdata.subjectLogonId: '0x3e7'
        win.eventdata.targetUserSid: 'S-1-0-0'
        win.eventdata.targetUserName: 'Administrator'
        win.eventdata.targetDomainName: 'WIN-6UJQ4IGFLK2'
        win.eventdata.status: '0xc000006d'
        win.eventdata.failureReason: '%%2313'
        win.eventdata.subStatus: '0xc000006a'
        win.eventdata.logonType: '7'
        win.eventdata.logonProcessName: 'User32'
        win.eventdata.authenticationPackageName: 'Negotiate'
        win.eventdata.workstationName: 'WIN-6UJQ4IGFLK2'
        win.eventdata.keyLength: '0'
        win.eventdata.processId: '0x340'
        win.eventdata.processName: 'C:\Windows\System32\svchost.exe'
        win.eventdata.ipAddress: '127.0.0.1'
        win.eventdata.ipPort: '0'

    **Phase 3: Completed filtering (rules).
        Rule id: '60122'
        Level: '5'
        Description: 'Logon Failure - Unknown user or bad password'
    **Alert to be generated.


.. warning::
    Log must be added without line breaks.