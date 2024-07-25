.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to configure the collection of log data from files, Windows events, and from the output of commands with Wazuh.

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
- `ignore_binaries`_
- `age`_
- `exclude`_
- `reconnect_time`_
- `multiline_regex`_
- `ignore`_
- `restrict`_
- `filter`_


location
^^^^^^^^

The ``location`` field specifies where the log data comes from. It includes the following options.

-  A path to a log file
-  A Windows event channel
-  The macOS ULS
-  The ``journald`` system

+--------------------+----------------------------------------------------------+
| **Default value**  | n/a                                                      |
+--------------------+----------------------------------------------------------+
| **Allowed values** | File path, Event channel, ``macos``, ``journald``        |
+--------------------+----------------------------------------------------------+

.. note::

   -  To collect logs from the macOS ULS, you must set both ``location`` and ``log_format`` to ``macos``.
   -  To collect logs from the ``journald`` system, you must set both ``location`` and ``log_format`` to ``journald``.

For log file names, you can use ``strftime`` format strings. For example, you can reference a log file named ``file.log-2024-04-26`` by ``file.log-%Y-%m-%d``.

Wildcards can be used on Linux and Windows systems, if the log file doesn't exist at ```` start time, such log will be re-scanned after ``logcollector.vcheck_files`` seconds.

The location field is also valid to filter by channel in case of using an ``eventchannel`` supporting Windows.

In the following example we can see two configurations showing a channel filtering for firewall and Sysmon events.

.. code-block:: xml

  <localfile>
      <location>Microsoft-Windows-Sysmon/Operational</location>
      <log_format>eventchannel</log_format>
  </localfile>

  <localfile>
      <location>Microsoft-Windows-Windows Firewall With Advanced Security/Firewall</location>
      <log_format>eventchannel</log_format>
  </localfile>


Below we have some Windows wildcard examples.

.. code-block:: xml

  <localfile>
      <location>C:\Users\wazuh\myapp\*</location>
      <log_format>syslog</log_format>
  </localfile>

  <localfile>
      <location>C:\xampp\apache\logs\*.log</location>
      <log_format>syslog</log_format>
  </localfile>

  <localfile>
      <location>C:\logs\file-%Y-%m-%d.log</location>
      <log_format>syslog</log_format>
  </localfile>

.. note::
  * ``strftime`` format strings and wildcards cannot be used on the same entry.

  * On Windows systems, only character ``*`` is supported as a wildcard. For instance ``*ANY_STRING*``, will match all files that have ``ANY_STRING`` inside its name, another example is ``*.log`` this will match any log file.
  * The maximum amount of files monitored at same time is limited to 1000.

.. _command:

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

.. code-block:: none

   ossec: output: 'reg QUERY HKLM\SYSTEM\CurrentControlSet\Enum\USBSTOR':

with:

.. code-block:: none
   :class: output

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

It allows to read new log content since ```` was stopped.

By default, when ```` is started it reads the logs generated since that moment.
Set it to ``no`` to collect events generated since ```` was stopped.

+--------------------+-----------+
| **Default value**  | yes       |
+--------------------+-----------+
| **Allowed values** | yes or no |
+--------------------+-----------+

The attributes below are optional.

+-------------+---------------------------------------+--------------+---------------+
| Attribute   |              Description              | Value range  | Default value |
+=============+=======================================+==============+===============+
|**max-size** | Allows to skip reading old events     |              |               |
|             | from the last read if the length of   |  0 to 2GB    |     10MB      |
|             | them exceeds a certain value in bytes.|              |               |
|             |                                       |              |               |
|             | Positive number followed by B, KB, MB |              |               |
|             | and GB units are supported            |              |               |
+-------------+---------------------------------------+--------------+---------------+

.. warning::
  If collecting logs with ``<log_format>`` set as ``macos``, then ``max-size`` is ignored.

.. note::
  If the log rotates while ```` is stopped and ``only-future-events`` is set to ``no``, it will start reading from the beginning of the log.

.. _query:

query
^^^^^

This label can be used to filter *Windows* ``eventchannel`` events or *macOS* ULS logs (``macos``) that Wazuh will process.

To filter *Windows* ``eventchannel`` events, *XPATH* format is used to make the queries following the event schema.

Example:

.. code-block:: xml

  <localfile>
    <location>Security</location>
    <log_format>eventchannel</log_format>
    <query>Event[System/EventID = 4624 and (EventData/Data[@Name='LogonType'] = 2 or EventData/Data[@Name='LogonType'] = 10)]</query>
  </localfile>

To filter *macOS* ULS logs (``macos``), *Predicates* format is used to make the queries.

Example:

.. code-block:: xml

  <localfile>
    <location>macos</location>
    <log_format>macos</log_format>
    <query type="log,trace" level="debug">process == "sshd" OR message CONTAINS "invalid"</query>
  </localfile>

+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                                                                                       |
+--------------------+----------------------+------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | Windows Eventchannel | XPATH query format, follows the `event schema <https://msdn.microsoft.com/en-us/library/windows/desktop/aa385201(v=vs.85).aspx>`_  |
|                    +----------------------+------------------------------------------------------------------------------------------------------------------------------------+
|                    | macOS ULS            | Predicate query format, see :ref:`How to collect macOS ULS logs <how-to-collect-macoslogs>`                                        |
+--------------------+----------------------+------------------------------------------------------------------------------------------------------------------------------------+

The attributes below are optional and only valid for macOS ULS (``macos``).

+-------------+---------------------------------------+--------------+----------------+
| Attribute   |              Description              | Value range  | Default value  |
+=============+=======================================+==============+================+
|  **level**  | Indicates the level of verbosity,     |   default    |    default     |
|             | `default` is the less verbose and     +--------------+                |
|             | `debug` is the most verbose.          |   info       |                |
|             |                                       +--------------+                |
|             |                                       |   debug      |                |
+-------------+---------------------------------------+--------------+----------------+
|  **type**   | Limits the type of logs that are      |  activity    |    all         |
|             | intended to be acquired to the ones   +--------------+                |
|             | listed and sepparated by commas.      |   log        |                |
|             |                                       +--------------+                |
|             |                                       |   trace      |                |
+-------------+---------------------------------------+--------------+----------------+


label
^^^^^

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
  :class: output

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

Target specifies the name of the socket where the output will be redirected. The socket must be defined previously.

+--------------------+--------------------------------+
| **Default value**  | agent                          |
+--------------------+--------------------------------+
| **Allowed values** | any defined socket             |
+--------------------+--------------------------------+

.. _log_format:

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
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | snort-full         | Used for Snort’s full-output format.                                                             |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | squid              | Used for squid logs.                                                                             |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | eventlog           | Used for the classic Microsoft Windows event log format.                                         |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | eventchannel       | Used for Microsoft Windows event logs, gets the events in JSON format.                           |
|                    |                    |                                                                                                  |
|                    |                    | Monitors every channel specified in the configuration file and shows every field included in it. |
|                    |                    |                                                                                                  |
|                    |                    | This can be used to monitor standard “Windows” event logs and "Application and Services" logs.   |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | macos              | Used for macOS ULS logs, gets the logs in syslog format.                                         |
|                    |                    |                                                                                                  |
|                    |                    | Monitors all the logs that match the query filter.                                               |
|                    |                    | See :ref:`How to collect macOS ULS logs <how-to-collect-macoslogs>`.                             |
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | journald           | Required to monitor systemd-journal events. Events are collected in syslog format.               |
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
|                    | iis                | Used for ``iis`` (Windows Web Server) logs.                                                      |
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
+                    +--------------------+--------------------------------------------------------------------------------------------------+
|                    | multi-line-regex   | Used to monitor applications that log variable amount lines with variable length per event.      |
|                    |                    |                                                                                                  |
|                    |                    | The behavior depends on `multiline_regex`_ option.                                               |
+--------------------+--------------------+--------------------------------------------------------------------------------------------------+

.. warning::

    Only one configuration block with ``log_format`` set as ``macos`` is allowed. If more blocks are added, the last one will be used.

.. warning::

    The ``eventchannel`` log format cannot be used on Windows agents prior to the Vista OS as they do not produce this type of log.

.. warning::

    Agents will ignore ``command`` and ``full_command`` log sources unless they have ``logcollector.remote_commands=1`` set in their **/var/ossec/etc/internal_options.conf** or **/var/ossec/etc/local_internal_options.conf** file. This is a security precaution to prevent the Wazuh manager from running arbitrary commands on agents in their root security context.

Sample of Multi-line log message in original log file:

.. code-block:: none

    Aug 9 14:22:47 hostname log line one
    Aug 9 14:22:47 hostname log line two
    Aug 9 14:22:47 hostname log line four
    Aug 9 14:22:47 hostname log line three
    Aug 9 14:22:47 hostname log line five

Sample Log message as analyzed by :

.. code-block:: none
    :class: output

    Aug 9 14:22:47 hostname log line one Aug 9 14:22:47 hostname log line two Aug 9 14:22:47 hostname log line three Aug 9 14:22:47 hostname log line four Aug 9 14:22:47 hostname log line five

.. _ossec_localfile_out_format:

out_format
^^^^^^^^^^

This option allows formatting logs from Logcollector using field substitution.

The list of available parameters is:

+------------------------+-----------------------------------------------------------------------+
| **Parameter**          | **Description**                                                       |
+========================+=======================================================================+
| ``log``                | Message from the log.                                                 |
+------------------------+-----------------------------------------------------------------------+
| ``json_escaped_log``   | Message from the log, escaping JSON reserver characters.              |
+------------------------+-----------------------------------------------------------------------+
| ``base64_log``         | Message from the log, encoded in base64.                              |
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
| ``host_ip``            | Host's primary IP address.                                            |
+------------------------+-----------------------------------------------------------------------+

Attributes:

+------------+-----------------------------------------------------------------------------------+
| **target** | This option selects a defined target to apply the output format.                  |
+            +----------------+------------------------------------------------------------------+
|            | Allowed values | Any target defined in the option ``<target>``.                   |
|            +----------------+------------------------------------------------------------------+
|            | Default value  | Select all targets defined in the ``<localfile>`` stanza.        |
+------------+----------------+------------------------------------------------------------------+

ignore_binaries
^^^^^^^^^^^^^^^

This specifies to ignore binary files, testing if the file is UTF8 or ASCII.

If this is set to **yes** and the file is, for example, a binary file, it will be discarded.

+--------------------+-----------+
| **Default value**  | n/a       |
+--------------------+-----------+
| **Allowed values** | yes or no |
+--------------------+-----------+

.. code-block:: xml

  <localfile>
      <log_format>syslog</log_format>
      <location>/var/logs/*</location>
      <ignore_binaries>yes</ignore_binaries>
  </localfile>

.. note::
  On Windows agents, it will also check if the file is encoded with UCS-2 LE BOM or UCS-2 BE BOM.

age
^^^

This specifies to read-only files that have been modified before the specified age.

For example, if the age is set to 1 day, all files that have not been modified since 1 day will be ignored.

.. code-block:: xml

  <localfile>
      <log_format>syslog</log_format>
      <location>/var/logs/*</location>
      <age>1d</age>
  </localfile>

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                                                                      |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days). |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+

exclude
^^^^^^^

This indicates the location of a wild-carded group of logs to be excluded.

For example, we may want to read all the files from a directory, but exclude those files whose name starts with an `e`.

.. code-block:: xml

  <localfile>
      <log_format>syslog</log_format>
      <location>/var/logs/*</location>
      <exclude>/var/logs/e*</exclude>
  </localfile>

+--------------------+--------------------------+
| **Default value**  | n/a                      |
+--------------------+--------------------------+
| **Allowed values** | Any log file or wildcard |
+--------------------+--------------------------+

reconnect_time
^^^^^^^^^^^^^^

Defines the interval of reconnection attempts when the Windows Event Channel service is down.

+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 5s                                                                                                                                                  |
+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days), w (weeks)  |
+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+

.. note::

    This option only applies when the ``log_format`` is ``eventchannel``.

multiline_regex
^^^^^^^^^^^^^^^

This specifies a regular expression, match criteria and replace option for logs with a variable amount of lines.

+--------------------+--------------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                        |
+--------------------+--------------------------------------------------------------------------------------------+
| **Allowed values** | Any :ref:`PCRE2 regular expression <pcre2_syntax>`                                         |
+--------------------+--------------------------------------------------------------------------------------------+

The attributes below are optional.

+-------------+---------------------------------------+--------------+---------------+
| Attribute   |              Description              | Value range  | Default value |
+=============+=======================================+==============+===============+
| **match**   | Allows to set how regex will handle   |   start      |    start      |
|             | regex match.                          +--------------+               |
|             |                                       |   end        |               |
|             |                                       +--------------+               |
|             |                                       |   all        |               |
+-------------+---------------------------------------+--------------+---------------+
| **replace** | Allows to replace or remove           |  no-replace  |  no-replace   |
|             | end-of-line.                          +--------------+               |
|             |                                       |   wspace     |               |
|             |                                       +--------------+               |
|             |                                       |   tab        |               |
|             |                                       +--------------+               |
|             |                                       |   none       |               |
+-------------+---------------------------------------+--------------+---------------+
| **timeout** | Allows to set max waiting time in     |   1 to 120   |      5        |
|             | seconds to receive a new line         |              |               |
+-------------+---------------------------------------+--------------+---------------+

.. note::
    This option only applies when the `log_format`_ is ``multi-line-regex``.

.. note::
    The value of ``timeout`` attribute cannot be bigger than the value of the `age`_ option.

The behavior of the ``match`` attribute is as follows

+-------------+-------------------------------------------------------------------------+
| Match       |                       Description                                       |
+=============+=========================================================================+
| **start**   | Group as one event the content between two lines that matches the regex.|
|             |                                                                         |
|             | The grouped event does not include the last matching line.              |
+-------------+-------------------------------------------------------------------------+
|  **end**    | Group as one event the content until a line that matches the regex.     |
+-------------+-------------------------------------------------------------------------+
|  **all**    | Group as one event the content until whole event match the regex.       |
+-------------+-------------------------------------------------------------------------+

.. note::
    ``start`` and ``end`` value for ``match`` attribute try to match the regex with a single line.

For example, we may want to read a Python Traceback output as one single log, replacing newline with spaces

.. code-block:: xml

  <localfile>
      <log_format>multi-line-regex</log_format>
      <location>/var/logs/my_python_app.log</location>
      <multiline_regex replace="wspace">^Traceback</multiline_regex>
   </localfile>

ignore
^^^^^^^^^^^^^^^

Specify a regular expression to ignore log lines or command outputs when matching. Whether several `ignore` labels are defined, entries are ignored when matching any of the specified ones.

+--------------------+---------------------------------------------------------------+
| **Default Value**  | n/a                                                           |
+--------------------+---------------------------------------------------------------+
| **Allowed values** | Any `regex <regex.html#regex-os-regex-syntax>`_,              |
|                    | `sregex <regex.html#sregex-os-match-syntax>`_ or              |
|                    | `PCRE2 <regex.html#pcre2-syntax>`_ expression.                |
+--------------------+---------------------------------------------------------------+

Use the `type` attribute to define the regular expression type. By default, PCRE2 is applied.

+----------+--------------------------------------------------------------------------------+
| **type** | Allows to set regular expression type                                          |
+          +------------------+-------------------------------------------------------------+
|          | Default value    | PCRE2                                                       |
|          +------------------+-------------------------------------------------------------+
|          | Allowed values   | osregex, osmatch, PCRE2                                     |
+----------+------------------+-------------------------------------------------------------+

For example, to ignore events related to configuration changes in the audit log:

.. code-block:: xml

  <localfile>
      <log_format>audit</log_format>
      <location>/var/log/audit/audit.log</location>
      <ignore type="PCRE2">type=.+_CHANGE</ignore>
      <ignore type="osregex">type=CONFIG_\.+</ignore>
  </localfile>

restrict
^^^^^^^^^^^^^^^

Specify a regular expression to restrict processed log lines or command outputs. Whether several `restrict` labels are defined, entries are processed when matching all of them.

+--------------------+---------------------------------------------------------------+
| **Default Value**  | n/a                                                           |
+--------------------+---------------------------------------------------------------+
| **Allowed values** | Any `regex <regex.html#regex-os-regex-syntax>`_,              |
|                    | `sregex <regex.html#sregex-os-match-syntax>`_ or              |
|                    | `PCRE2 <regex.html#pcre2-syntax>`_ expression.                |
+--------------------+---------------------------------------------------------------+

Use the `type` attribute to define the regular expression type. By default, PCRE2 is applied.

+----------+--------------------------------------------------------------------------------+
| **type** | Allows to set regular expression type                                          |
+          +------------------+-------------------------------------------------------------+
|          | Default value    | PCRE2                                                       |
|          +------------------+-------------------------------------------------------------+
|          | Allowed values   | osregex, osmatch, PCRE2                                     |
+----------+------------------+-------------------------------------------------------------+

For example, to restrict syslog events related to a particular user name:

.. code-block:: xml

  <localfile>
      <log_format>syslog</log_format>
      <location>/custom/file/path</location>
      <restrict type="PCRE2">username_\d?</restrict>
      <restrict type="osregex">Jun\.+</restrict>
  </localfile>

.. note::
  For formats that group multiple lines, the entire group is treated as a single log when evaluating the regex.

.. note::
  Whether the same log entry matches an ignore and also a restrict configured for the same `localfile`, the entry is discarded. In other words, the `ignore` has precedence over `restrict`. Said that, if the same expression is defined in both `ignore` and `restrict`, no log will be processed for that `localfile`.

.. note::
  The `eventchannel` format already provides a way to filter logs through queries. Therefore, `ignore` and `restrict` settings don't apply to this format.


filter
^^^^^^

Collects ``journald`` logs selectively by filtering specific fields.

You must specify a PCRE2 regex pattern as your filter. Use the ``field`` attribute to define the journald field where to apply the regular expression.

+--------------------+---------------------------------------------------------------+
| **Default Value**  | n/a                                                           |
+--------------------+---------------------------------------------------------------+
| **Allowed values** | Any :ref:`PCRE2 <pcre2_syntax>` expression.                   |
+--------------------+---------------------------------------------------------------+

You can use the ``ignore_if_missing`` attribute to ignore the filtering condition for logs without the specified field.

+-----------------------+--------------------------------------------------------------------------------------------------------------+
| **ignore_if_missing** | When set to ``yes``, it accepts logs without the specified field. Conversely, when set to ``no``,            |
|                       | logs without the specified field fail to meet the filtering criteria and are disregarded.                    |
+                       +------------------+-------------------------------------------------------------------------------------------+
|                       | Default value    | no                                                                                        |
|                       +------------------+-------------------------------------------------------------------------------------------+
|                       | Allowed values   | no, yes                                                                                   |
+-----------------------+------------------+-------------------------------------------------------------------------------------------+

In the following configuration example Wazuh collects the ``journald`` logs if any of the following conditions are met.

-  The field ``_SYSTEMD_UNIT`` is present with the value ``ssh.service``.
-  The field ``_SYSTEMD_UNIT`` is present with the value ``cron.service`` and the field ``PRIORITY`` is present with the value ``0``, ``1``, ``2``, or ``3``.

.. code-block:: xml

    <!-- For monitoring log files -->
    <localfile>
      <location>journald</location>
      <log_format>journald</log_format>
      <filter field="_SYSTEMD_UNIT">^ssh.service$</filter>
    <localfile>

    <localfile>
      <location>journald</location>
      <log_format>journald</log_format>
      <filter field="_SYSTEMD_UNIT">^cron.service$</filter>
      <filter field="PRIORITY" ignore_if_missing="yes">[0-3]</filter>
    <localfile>

.. note::

   Filters within the same ``<localfile>`` block follow an AND logic, while multiple blocks are evaluated in OR logic regarding log collection.


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
      <reconnect_time>10s</reconnect_time>
    </localfile>

macOS configuration:

.. code-block:: xml

  <!-- For monitoring macOS ULS Logs -->
  <localfile>
    <location>macos</location>
    <log_format>macos</log_format>
    <query type="trace,log,activity" level="info">process == "sshd" OR message CONTAINS "invalid"</query>
  </localfile>
