.. Copyright (C) 2019 Wazuh, Inc.

.. _reference_ossec_localfile:

localfile
=========

.. topic:: XML section name

    .. code-block:: xml

        <localfile>
        </localfile>

This configuration section is used to configure the collection of log data from files, Windows events, and from the output of commands.

Options
-------

- `location`_
- `command`_
- `alias`_
- `frequency`_
- `only-future-events`_
- `query`_
- `label`_
- `target`_
- `log_format`_
- `out_format`_

location
^^^^^^^^

Option to get the location of a log or a group of logs. ``strftime`` format strings may be used for log file names.

For instance, a log file named ``file.log-2017-01-22`` could be referenced with ``file.log-%Y-%m-%d`` (assuming today is Jan 22nd, 2017).

Wildcards may be used on non-Windows systems, but if the log file doesn't exist at the time ``ossec-logcollector`` is started, it will be added after ``logcollector.vcheck_files`` seconds.

Note that ``strftime`` format strings and wildcards cannot be used on the same entry.

The location field is also valid to filter by channel in case of using an ``eventchannel`` supporting Windows. 

As an example, these two configurations show a channel filtering for firewall and Sysmon events.

.. code-block:: xml

  <localfile>
      <location>Microsoft-Windows-Sysmon/Operational</location>
      <log_format>eventchannel</log_format>
  </localfile>

  <localfile>
      <location>Microsoft-Windows-Windows Firewall With Advanced Security/Firewall</location>
      <log_format>eventchannel</log_format>
  </localfile>

+--------------------+--------------+
| **Default value**  | n/a          |
+--------------------+--------------+
| **Allowed values** | Any log file |
+--------------------+--------------+

command
^^^^^^^

Given a command output, it will be read as one or more log messages depending on *command* or *full_command* is used.

+--------------------+--------------------------------------------------+
| **Default value**  | n/a                                              |
+--------------------+--------------------------------------------------+
| **Allowed values** | Any command line, optionally including arguments |
+--------------------+--------------------------------------------------+

alias
^^^^^

Change a command name in the log message.

For example ``<alias>usb-check</alias>`` would replace:

.. code-block:: xml

   ossec: output: 'reg QUERY HKLM\SYSTEM\CurrentControlSet\Enum\USBSTOR':

with:

.. code-block:: xml

   ossec: output: 'usb-check':

+--------------------+------------+
| **Default value**  | n/a        |
+--------------------+------------+
| **Allowed values** | any string |
+--------------------+------------+

frequency
^^^^^^^^^

Prevents a command from being executed in less time than the specified time (in seconds). This options can be used with *command* and *full_command*.

+--------------------+--------------------------------+
| **Default value**  | n/a                            |
+--------------------+--------------------------------+
| **Allowed values** | any positive number of seconds |
+--------------------+--------------------------------+

only-future-events
^^^^^^^^^^^^^^^^^^

Set it to *yes* to collect only events generated after the Wazuh starts.

By default, when Wazuh starts it will read all log content from a given Windows Event Channel since the last time Wazuh was stopped.

Only compatible with `eventchannel` log format.

+--------------------+-----------+
| **Default value**  | n/a       |
+--------------------+-----------+
| **Allowed values** | yes or no |
+--------------------+-----------+

query
^^^^^

Filter ``eventchannel`` events that Wazuh will process by using an *XPATH* query following the event schema.

Example: 

.. code-block:: xml

  <localfile>
    <location>Security</location>
    <log_format>eventchannel</log_format>
    <query>Event[System/EventID = 4624 and (EventData/Data[@Name='LogonType'] = 2 or EventData/Data[@Name='LogonType'] = 10)]</query>
  </localfile>

+--------------------+----------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                                                              |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | Any XPATH query following the `event schema <https://msdn.microsoft.com/en-us/library/windows/desktop/aa385201(v=vs.85).aspx>`_  |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------+

label
^^^^^

.. versionadded:: 3.0.0

Used to add custom data in JSON events. Set `log_format`_ to ``json`` to use it.

Labels can be nested in JSON alerts by separating the "key" terms by a period.

Here is an example of how to identify the source of each log entry when monitoring several files simultaneously:

.. code-block:: xml

  <localfile>
    <location>/var/log/myapp/log.json</location>
    <log_format>json</log_format>
    <label key="@source">myapp</label>
    <label key="agent.type">webserver</label>
  </localfile>

This is a sample JSON object from the log file:

.. code-block:: json

  {
    "event": {
      "type": "write",
      "destination": "sample.txt"
    },
    "agent": {
      "name": "web01"
    }
  }

The additional fields configured above would appear in the resulting event as below:

.. code-block:: json

  {
    "event": {
      "type": "write",
      "destination": "sample.txt"
    },
    "agent": {
      "name": "web01",
      "type": "webserver"
    },
    "@source": "myapp"
  }

.. note:: If a label key already exists in the log data, the configured field value will not be included. It is recommended that a unique label key is defined by using a symbol prior to the key name as in *@source*.

target
^^^^^^

.. versionadded:: 3.3.0

Target specifies the name of the socket where the output will be redirected. The socket must be defined previously.

+--------------------+--------------------------------+
| **Default value**  | agent                          |
+--------------------+--------------------------------+
| **Allowed values** | any defined socket             |
+--------------------+--------------------------------+

log_format
^^^^^^^^^^

Set the format of the log to be read. **field is required**

.. note:: For most of the text log files that only have one entry per line, syslog may be used.

+--------------------+-----------------------------------------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                                                   |
+--------------------+--------------------+--------------------------------------------------------------------------------------------------+
| **Allowed values** | syslog             | Used for plain text files in a syslog-like format.                                               |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | json               | Used for single-line JSON files and allows for customized labels to be added to JSON events.     |
|                    |                    |                                                                                                  |
|                    |                    | See also the tag `label`_ for more information.                                                  |
|                    |                    |                                                                                                  |
|                    |                    | .. versionadded:: 3.0.0                                                                          |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | snort-full         | Used for Snort’s full-output format.                                                             |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | snort-fast         | Used for Snort's fast-output format.                                                             |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | squid              | Used for squid logs.                                                                             |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | iis                | Used for IIS logs.                                                                               |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | eventlog           | Used for the classic Microsoft Windows event log format.                                         |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | eventchannel       | Used for Microsoft Windows event logs, returns the events in JSON format.                        |
|                    |                    |                                                                                                  |
|                    |                    | Monitors every channel specified at the configuration file and shows every field included in it. |
|                    |                    |                                                                                                  |
|                    |                    | This can be used to monitor standard “Windows” event logs and "Application and Services" logs.   |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | audit              | Used for events from Auditd.                                                                     |
|                    |                    |                                                                                                  |
|                    |                    | This format chains consecutive logs with the same ID into a single event.                        |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | mysql_log          | Used for ``MySQL`` logs, however, this value does not support multi-line logs.                   |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | postgresql_log     | Used for ``PostgreSQL`` logs, however, this value does not support multi-line logs.              |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | nmapg              | Used for monitoring files conforming to the grep-able output from ``nmap``.                      |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | apache             | Used for Apache's default log format.                                                            |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | command            | Used to read the output from the command (as run by root) specified by the command tag.          |
|                    |                    |                                                                                                  |
|                    |                    | Each line of output is treated as a separate log.                                                |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | full_command       | Used to read the output from the command (as run by root) specified by the command tag.          |
|                    |                    |                                                                                                  |
|                    |                    | The entire output will be treated as a single log item.                                          |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | djb-multilog       | Used to read files in the format produced by the multi-log service logger in daemon tools.       |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | multi-line         | Used to monitor applications that log multiple lines per event.                                  |
|                    |                    |                                                                                                  |
|                    |                    | The number of lines must be consistent in order to use this value.                               |
|                    |                    |                                                                                                  |
|                    |                    | The number of lines in each log entry must be specified following the ``multi-line:`` value.     |
|                    |                    |                                                                                                  |
|                    |                    | Each line will be combined with the previous lines until all lines are gathered which means there|
|                    |                    |                                                                                                  |
|                    |                    | may be multiple timestamps in the final event.                                                   |
|                    |                    |                                                                                                  |
|                    |                    | The format for this value is: <log_format>multi-line: NUMBER</log_format>                        |
+--------------------+--------------------+--------------------------------------------------------------------------------------------------+

.. warning::

    The ``eventchannel`` log format cannot be used on Windows agents prior to the Vista OS as they do not produce this type of log.

.. warning::

    Agents will ignore ``command`` and ``full_command`` log sources unless they have ``logcollector.remote_commands=1`` set in their **/var/ossec/etc/internal_options.conf** or **/var/ossec/etc/local_internal_options.conf** file. This is a security precaution to prevent the Wazuh Manager from running arbitrary commands on agents in their root security context.

Sample of Multi-line log message in original log file:

.. code-block:: console

    Aug 9 14:22:47 hostname log line one
    Aug 9 14:22:47 hostname log line two
    Aug 9 14:22:47 hostname log line four
    Aug 9 14:22:47 hostname log line three
    Aug 9 14:22:47 hostname log line five

Sample Log message as analyzed by ossec-analysisd:

.. code-block:: console

    Aug 9 14:22:47 hostname log line one Aug 9 14:22:47 hostname log line two Aug 9 14:22:47 hostname log line three Aug 9 14:22:47 hostname log line four Aug 9 14:22:47 hostname log line five

.. _ossec_localfile_out_format:

out_format
^^^^^^^^^^

.. versionadded:: 3.3.0

This option allows formatting logs from Logcollector using field substitution.

The list of available parameters is:

+------------------------+-----------------------------------------------------------------------+
| **Parameter**          | **Description**                                                       |
+========================+=======================================================================+
| ``log``                | Message from the log.                                                 |
+------------------------+-----------------------------------------------------------------------+
| ``output``             | Output from a command. Alias of ``log``.                              |
+------------------------+-----------------------------------------------------------------------+
| ``location``           | Path to the source log file.                                          |
+------------------------+-----------------------------------------------------------------------+
| ``command``            | Command line or alias defined for the command. Alias of ``location``. |
+------------------------+-----------------------------------------------------------------------+
| ``timestamp``          | Current timestamp (when the log is sent), in RFC3164 format.          |
+------------------------+-----------------------------------------------------------------------+
| ``timestamp <format>`` | Custom timestamp, in ``strftime`` string format.                      |
+------------------------+-----------------------------------------------------------------------+
| ``hostname``           | System's host name.                                                   |
+------------------------+-----------------------------------------------------------------------+

Attributes:

+------------+-----------------------------------------------------------------------------------+
| **target** | This option selects a defined target to apply the output format.                  |
+            +----------------+------------------------------------------------------------------+
|            | Allowed values | Any target defined in the option ``<target>``.                   |
|            +----------------+------------------------------------------------------------------+
|            | Default value  | Select all targets defined in the ``<localfile>`` stanza.        |
+------------+----------------+------------------------------------------------------------------+

Configuration examples
----------------------

Linux configuration:

.. code-block:: xml

    <!-- For monitoring log files -->
    <localfile>
      <log_format>syslog</log_format>
      <location>/var/log/syslog</location>
    </localfile>

    <!-- For monitoring command output -->
    <localfile>
      <log_format>command</log_format>
      <command>df -P</command>
      <frequency>360</frequency>
    </localfile>

    <!-- To use a custom target or format -->
    <localfile>
      <log_format>syslog</log_format>
      <location>/var/log/auth.log</location>
      <target>agent,custom_socket</target>
      <out_format target="custom_socket">$(timestamp %Y-%m-%d %H:%M:%S): $(log)</out_format>
    </localfile>

Windows configuration:

.. code-block:: xml

    <!-- For monitoring Windows eventchannel -->
    <localfile>
      <location>Security</location>
      <log_format>eventchannel</log_format>
      <only-future-events>yes</only-future-events>
      <query>Event/System[EventID != 5145 and EventID != 5156]</query>
    </localfile>
