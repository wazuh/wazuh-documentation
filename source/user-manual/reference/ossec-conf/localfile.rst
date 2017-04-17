.. _reference_ossec_localfile:


localfile
==========

.. topic:: XML section name

	.. code-block:: xml

		<localfile>

This configuration section is used to specify the collection of log data from files, Windows events, and from output of commands.

Options
-------

- `location`_
- `command`_
- `alias`_
- `frequency`_
- `check_diff`_
- `only-future-events`_
- `query`_
- `log_format`_

location
^^^^^^^^

Specify the location of a log or wildcarded group of logs to be read. ``strftime`` format strings may be used for log file names.

For instance, a log file named ``file.log-2017-01-22`` could be referenced with ``file.log-%Y-%m-%d`` (assuming today is Jan 22nd, 2017).

Wildcards may be used on non-Windows systems. When wildcards are used, the log files must exist at the time
``ossec-logcollector`` is started. It will not automatically begin monitoring new log files.

Note that ``strftime`` format strings and wildcards cannot be used on the same entry.

+--------------------+--------------+
| **Default Value**  | n/a          |
+--------------------+--------------+
| **Allowed values** | Any log file |
+--------------------+--------------+

command
^^^^^^^^

A command to be run. All output from this command will be read as one or more log messages depending on whether
command or full_command is used.

+--------------------+--------------------------------------------------+
| **Default Value**  | n/a                                              |
+--------------------+--------------------------------------------------+
| **Allowed values** | any command line, optionally including arguments |
+--------------------+--------------------------------------------------+

alias
^^^^^^^^

This is an alias to identify the command. This will replace the command in the log message.

+--------------------+------------+
| **Default Value**  | n/a        |
+--------------------+------------+
| **Allowed values** | any string |
+--------------------+------------+

For example ``<alias>usb-check</alias>`` would replace:

.. code-block:: xml

   ossec: output: 'reg QUERY HKLM\SYSTEM\CurrentControlSet\Enum\USBSTOR':

with:

.. code-block:: xml

   ossec: output: 'usb-check':


frequency
^^^^^^^^^^

The minimum time in seconds between command runs. The command will probably not run every ``frequency``
seconds exactly, but the time between runs will not be shorter than this setting.
This is used with **command** and **full_command**.

+--------------------+--------------------------------+
| **Default Value**  | n/a                            |
+--------------------+--------------------------------+
| **Allowed values** | any positive number of seconds |
+--------------------+--------------------------------+


check_diff
^^^^^^^^^^

The output from an event will be stored in an internal database. Every time the same event is received, the output is compared
to the previous output. If the output has changed, an alert will be generated.

+--------------------+----------------+
| **Default Value**  | n/a            |
+--------------------+----------------+
| **Allowed values** | <check_diff /> |
+--------------------+----------------+


only-future-events
^^^^^^^^^^^^^^^^^^^

This is for use only with the ``eventchannel`` log format.  By default, when Wazuh starts, it will read all log content from a given Windows Event Channel since Wazuh was last stopped.
Set this option to **yes** to override this behaviour if desired.  Then Wazuh would only receive events that occur after the Wazuh agent is started.

+--------------------+-----------+
| **Default Value**  | n/a       |
+--------------------+-----------+
| **Allowed values** | yes or no |
+--------------------+-----------+

.. code-block:: xml

	<localfile>
	  <location>System</location>
	  <log_format>eventchannel</log_format>
	  <only-future-events>yes</only-future-events>
	</localfile>

query
^^^^^^^^

This is for use only with the ``eventchannel`` log format. It is possible to specify an XPATH query following the event
schema in order to filter the events that Wazuh will process.

+--------------------+----------------------------------------------------------------------------------------------------------------------------------+
| **Default Value**  | n/a                                                                                                                              |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | Any XPATH query following the `event schema <https://msdn.microsoft.com/en-us/library/windows/desktop/aa385201(v=vs.85).aspx>`_  |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------+

For example, the following configuration will only process events with an ID of 7040:

.. code-block:: xml

  <localfile>
     <location>System</location>
     <log_format>eventchannel</log_format>
     <query>Event/System[EventID=7040]</query>
  </localfile>

log_format
^^^^^^^^^^^

This is the format of the log being read.

.. note::

  For most text log files that have one entry per line, you can just use syslog.


	+--------------------+-------------------------------------------------------------------------------------------------------+
	| **Default Value**  | syslog                                                                                                |
	+--------------------+----------------+--------------------------------------------------------------------------------------+
	| **Allowed values** | syslog         | This format is for plain text files in a syslog-like format.                         |
	|                    |                |                                                                                      |
	|                    |                | Also can be used when the logs are single line messages.                             |
	+                    +----------------+--------------------------------------------------------------------------------------+
	|                    | snort-full     | This is used for Snort’s full-output format.                                         |
	+                    +----------------+--------------------------------------------------------------------------------------+
	|                    | snort-fast     | This is used for Snort's fast-output format.                                         |
	+                    +----------------+--------------------------------------------------------------------------------------+
	|                    | squid          | This is used for squid logs.                                                         |
	+                    +----------------+--------------------------------------------------------------------------------------+
	|                    | iis            | This is used for IIS logs.                                                           |
	+                    +----------------+--------------------------------------------------------------------------------------+
	|                    | eventlog       | This is used for the classic Microsoft Windows event log format.                     |
	+                    +----------------+--------------------------------------------------------------------------------------+
	|                    | eventchannel   | This is used for Microsoft Windows event logs, using the new EventApi.               |
	|                    |                |                                                                                      |
	|                    |                | Monitorize: standard “Windows” eventlogs and "Application and Services" logs.        |
	+                    +----------------+--------------------------------------------------------------------------------------+
	|                    | mysql_log      | This is used for ``MySQL`` logs. It does not support multi-line logs.                |
	+                    +----------------+--------------------------------------------------------------------------------------+
	|                    | postgresql_log | This is used for ``PostgreSQL`` logs. It does not support multi-line logs.           |
	+                    +----------------+--------------------------------------------------------------------------------------+
	|                    | nmapg          | Used for monitoring files conforming to the grepable output from ``nmap``.           |
	+                    +----------------+--------------------------------------------------------------------------------------+
	|                    | apache         | Apache's default log format.                                                         |
	+                    +----------------+--------------------------------------------------------------------------------------+
	|                    | command        | Read in arbitrary output from the command (as run by root).                          |
	|                    |                |                                                                                      |
	|                    |                | Command defined by the command tag.                                                  |
	|                    |                |                                                                                      |
	|                    |                |                                                                                      |
	|                    |                | Each line of output will be treated as a separate log.                               |
	+                    +----------------+--------------------------------------------------------------------------------------+
	|                    | full_command   | Read in arbitrary output from the command (as run by root)                           |
	|                    |                |                                                                                      |
	|                    |                | Command defined by the command tag.                                                  |
	|                    |                |                                                                                      |
	|                    |                | The entire output will be treated as a single log item.                              |
	+                    +----------------+--------------------------------------------------------------------------------------+
	|                    | djb-multilog   | Read files in the format produced by the multilog service logger in daemontools.     |
	+                    +----------------+--------------------------------------------------------------------------------------+
	|                    | multi-line     |                                                                                      |
	|                    |                | Allow applications that log multiple lines per event to be monitored.                |
	|                    |                |                                                                                      |
	|                    |                |                                                                                      |
	|                    |                | Require the number of lines to be consistent.                                        |
	|                    |                |                                                                                      |
	|                    |                | ``multi-line:`` is followed by the number of lines in each log entry.                |
	|                    |                |                                                                                      |
	|                    |                | Each line will be combined with the previous lines until all lines are gathered.     |
	|                    |                |                                                                                      |
	|                    |                | There may be multiple timestamps in a finalized event.                               |
	|                    |                |                                                                                      |
	|                    |                | The format is: <log_format>multi-line: NUMBER</log_format>                           |
	+--------------------+----------------+--------------------------------------------------------------------------------------+

	.. warning::

			The eventchannel log format cannot be used on Windows agents older than Vista since they do not produce that kind of log.

	.. warning::

			Agents will ignore ``command`` and ``full_command`` log sources unless they have "logcollector.remote_commands=1" set in their **/var/ossec/etc/internal_options.conf** or **/var/ossec/etc/local_internal_options.conf** file. This is a security precaution since it may not be permissable in all environments to allow the Wazuh manager to run arbitrary commands on agents in their root security context.


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
