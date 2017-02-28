.. _reference_ossec_localfile:


Local file
==========

.. topic:: XML section name

	.. code-block:: xml

		<localfile>

This configuration section is used to specify the collection of log data from files, Windows events, and from output of commands.

+-----------------------+--------------------------------------------------------------------------------------------+
| Options               | Allowed values                                                                             |
+=======================+============================================================================================+
| `location`_           | Any log file                                                                               |
+-----------------------+--------------------------------------------------------------------------------------------+
| `command`_            | Any command line with arguments                                                            |
+-----------------------+--------------------------------------------------------------------------------------------+
| `alias`_              | Any string                                                                                 |
+-----------------------+--------------------------------------------------------------------------------------------+
| `frequency`_          | A number of seconds                                                                        |
+-----------------------+--------------------------------------------------------------------------------------------+
| `check_diff`_         | <check_diff />                                                                             |
+-----------------------+--------------------------------------------------------------------------------------------+
| `only-future-events`_ | yes or no                                                                                  |
+-----------------------+--------------------------------------------------------------------------------------------+
| `query`_              | Any XPATH query following the `event                                                       |
|                       | schema <https://msdn.microsoft.com/en-us/library/windows/desktop/aa385201(v=vs.85).aspx>`_ |
+-----------------------+--------------------------------------------------------------------------------------------+
| `log_format`_         | syslog, snort-full, snort-fast, squid, iis,                                                |
|                       |                                                                                            |
|                       | eventlog, eventchannel, mysql_log,                                                         |
|                       |                                                                                            |
|                       | postgresql_log, nmapg, apache, command,                                                    |
|                       |                                                                                            |
|                       | full_command, djb-multilog, multi-line                                                     |
+-----------------------+--------------------------------------------------------------------------------------------+


``location``
------------

Specify the location of a log or wildcarded group of logs to be read. ``strftime`` format strings may be used for log file names.

For instance, a log file named ``file.log-2017-01-22`` could be referenced with ``file.log-%Y-%m-%d`` (assuming today is Jan 22nd, 2017).

Wildcards may be used on non-Windows systems. When wildcards are used, the log files must exist at the time
``ossec-logcollector`` is started. It will not automatically begin monitoring new log files.

Note that ``strftime`` format strings and wildcards cannot be used on the same entry.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Any log file



``command``
-----------

A command to be run. All output from this command will be read as one or more log messages depending on whether
command or full_command is used.


.. topic:: Default value

	n/a

.. topic:: Allowed values

	any command line, optionally including arguments


``alias``
---------

This is an alias to identify the command. This will replace the command in the log message.
For example ``<alias>usb-check</alias>`` would replace:

.. code-block:: xml

   ossec: output: 'reg QUERY HKLM\SYSTEM\CurrentControlSet\Enum\USBSTOR':

with:

.. code-block:: xml

   ossec: output: 'usb-check':


.. topic:: Default value

	n/a

.. topic:: Allowed values

	any string


``frequency``
-------------

The minimum time in seconds between command runs. The command will probably not run every ``frequency``
seconds exactly, but the time between runs will not be shorter than this setting.
This is used with **command** and **full_command**.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	any positive number of seconds


``check_diff``
--------------

The output from an event will be stored in an internal database. Every time the same event is received, the output is compared
to the previous output. If the output has changed, an alert will be generated.


.. topic:: Default value

	n/a

.. topic:: Allowed values

	<check_diff />


``only-future-events``
----------------------

This is for use only with the ``eventchannel`` log format.  By default, when Wazuh starts, it will read all log content from a given Windows Event Channel since Wazuh was last stopped.
Set this option to **yes** to override this behaviour if desired.  Then Wazuh would only receive events that occur after the Wazuh agent is started.

.. code-block:: xml

	<localfile>
	  <location>System</location>
	  <log_format>eventchannel</log_format>
	  <only-future-events>yes</only-future-events>
	</localfile>


.. topic:: Default value

  n/a

.. topic:: Allowed values

  The option accepted are **yes** or **no**.
  

``query``
---------

This is for use only with the ``eventchannel`` log format. It is possible to specify an XPATH query following the event
schema in order to filter the events that Wazuh will process.
For example, the following configuration will only process events with an ID of 7040:

.. code-block:: xml

  <localfile>
     <location>System</location>
     <log_format>eventchannel</log_format>
     <query>Event/System[EventID=7040]</query>
  </localfile>

.. topic:: Default value

  n/a

.. topic:: Allowed values

	Any XPATH query following the `event schema <https://msdn.microsoft.com/en-us/library/windows/desktop/aa385201(v=vs.85).aspx>`_


``log_format``
--------------

This is the format of the log being read.

.. note::

  For most text log files that have one entry per line, you can just use syslog.

.. topic:: Default value

	.. code-block:: xml

	  	<log_format>syslog</log_format>

.. topic:: Allowed values

  syslog
      This format is for plain text files in a syslog-like format. It can also be used when there is no support for the logging format, and the logs are single line messages.
  snort-full
      This is used for Snort’s full-output format.
  snort-fast
      This is used for Snort's fast-output format.
  squid
      This is used for squid logs.
  iis
      This is used for IIS logs.
  eventlog
      This is used for the classic Microsoft Windows event log format.
  eventchannel
      This is used for Microsoft Windows event logs, using the new EventApi. This allows Wazuh to monitor both standard “Windows” event logs and the more recent "Application and Services" logs.

  .. warning::

      The eventchannel log format cannot be used on Windows agents older than Vista since they do not produce that kind of log.

  mysql_log
      This is used for ``MySQL`` logs. It does not support multi-line logs.
  postgresql_log:
      This is used for ``PostgreSQL`` logs. It does not support multi-line logs.
  nmapg
      This is used for monitoring files conforming to the grepable output from ``nmap``.
  apache
      This format is for apache's default log format.
  command
      This format reads in arbitrary output from the command (as run by root) defined by the command tag.
      Each line of output will be treated as a separate log.
  full_command
      This format reads in arbitrary output from the command (as run by root) defined by the command tag. 
      The entire output will be treated as a single log item.

  .. warning::

      Agents will ignore ``command`` and ``full_command`` log sources unless they have "logcollector.remote_commands=1" set in their **/var/ossec/etc/internal_options.conf** or **/var/ossec/etc/local_internal_options.conf** file. This is a security precaution since it may not be permissable in all environments to allow the Wazuh manager to run arbitrary commands on agents in their root security context.

  djb-multilog
      This option reads files in the format produced by the multilog service logger in daemontools.
  

  multi-line
      This option will allow applications that log multiple lines per event to be monitored. This format requires the number of lines to be consistent.
      ``multi-line:`` is followed by the number of lines in each log entry. Each line will be combined with the previous lines until all lines are gathered.
      There may be multiple timestamps in a finalized event.

      The format is: <log_format>multi-line: NUMBER</log_format>

      Example:

      Multi-line log message in original log file:

      .. code-block:: console

         Aug 9 14:22:47 hostname log line one
         Aug 9 14:22:47 hostname log line two
         Aug 9 14:22:47 hostname log line four
         Aug 9 14:22:47 hostname log line three
         Aug 9 14:22:47 hostname log line five

      Log message as analyzed by ossec-analysisd:

      .. code-block:: console

         Aug 9 14:22:47 hostname log line one Aug 9 14:22:47 hostname log line two Aug 9 14:22:47 hostname log line three Aug 9 14:22:47 hostname log line four Aug 9 14:22:47 hostname log line five
