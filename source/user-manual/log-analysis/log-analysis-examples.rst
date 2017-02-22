.. _log-analysis-examples:

Examples
==========================

.. topic:: Contents

    1. `Basic usage`_
    2. `Regular expresions`_
    3. `Data based`_
    4. `Windows Eventlog`_
    5. `Windows EventChannel`_
    6. `Windows EventChannel with queries`_
    7. `Environment variables`_

Basic usage
---------------------------------------------------
Provide the name of the file to be monitored and the format::

    <localfile>
        <location>/var/log/messages</location>
        <log_format>syslog</log_format>
    </localfile>


Regular expresions
---------------------------------------------------
OSSEC supports posix regular expressions. For example, to analyze every file that ends with a .log inside the /var/log directory, use the following configuration::

    <localfile>
        <location>/var/log/*.log</location>
        <log_format>syslog</log_format>
    </localfile>

Data based
---------------------------------------------------
For log files that change according to the date, you can also specify a **strftime** format to replace the day, month, year, etc. For example, to monitor the log C:\Windows\app\log-08-12-15.log, where 08 is the year, 12 is the month and 15 the day (and it is rolled over every day), do::

    <localfile>
        <location>C:\Windows\app\log-%y-%m-%d.log</location>
        <log_format>syslog</log_format>
    </localfile>

Windows Eventlog
---------------------------------------------------
To monitor a Windows event log, you need to provide the format as "eventlog" and the location is the name of the event log::

  <localfile>
      <location>Security</location>
      <log_format>eventlog</log_format>
  </localfile>

Windows EventChannel
---------------------------------------------------
To monitor a Windows event log on Windows Vista or later, you have the possibility to use the "eventchannel" log format. The location is the name of the event log. This is the only way to monitor Applications and Services logs. If the file name contains a "%4", replace it with "/"::

    <localfile>
        <location>Microsoft-Windows-PrintService/Operational</location>
        <log_format>eventchannel</log_format>
    </localfile>

Windows EventChannel with queries
---------------------------------------------------
It is possible to filter the events of eventchannel::

    <localfile>
      <location>System</location>
      <log_format>eventchannel</log_format>
      <query>Event/System[EventID=7040]</query>
    </localfile>

Environment variables
---------------------------------------------------
It is possible to use environment variables like *%WinDir%*. The following is an example to read logs from an IIS server::

    <localfile>
        <location>%WinDir%\System32\LogFiles\W3SVC3\ex%y%m%d.log</location>
        <log_format>iis</log_format>
    </localfile>
