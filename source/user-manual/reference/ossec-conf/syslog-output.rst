.. _reference_ossec_syslog_output:


syslog_output
=============

.. topic:: XML section name

	.. code-block:: xml

		<syslog_output>

Configuration options for sending alerts to a syslog server.

Options
-------

- `server`_
- `port`_
- `level`_
- `group`_
- `rule_id`_
- `location`_
- `use_fqdn`_
- `format`_

server
^^^^^^

The IP Address of the syslog server.

+--------------------+----------------------+
| **Default Value**  | n/a                  |
+--------------------+----------------------+
| **Allowed values** | Any valid IP address |
+--------------------+----------------------+

port
^^^^

The port to forward alerts to.

+--------------------+----------------+
| **Default Value**  | 514            |
+--------------------+----------------+
| **Allowed values** | Any valid port |
+--------------------+----------------+


level
^^^^^^

The minimum level of the alerts to be forwarded.

+--------------------+------------------------+
| **Default Value**  | n/a                    |
+--------------------+------------------------+
| **Allowed values** | Any level from 1 to 16 |
+--------------------+------------------------+

group
^^^^^^

Group of the alerts to be forwarded.

+--------------------+--------------------------------------------------------------------------+
| **Default Value**  | n/a                                                                      |
+--------------------+--------------------------------------------------------------------------+
| **Allowed values** | Any valid group. Separate multiple groups with the pipe ("|") character. |
+--------------------+--------------------------------------------------------------------------+


rule_id
^^^^^^^

The rule_id of the alerts to be forwarded.

+--------------------+-------------------+
| **Default Value**  | n/a               |
+--------------------+-------------------+
| **Allowed values** | Any valid rule_id |
+--------------------+-------------------+

location
^^^^^^^^

The location of the alerts to be forwarded.

+--------------------+-----------------------------+
| **Default Value**  | n/a                         |
+--------------------+-----------------------------+
| **Allowed values** | Any valid log file location |
+--------------------+-----------------------------+

use_fqdn
^^^^^^^^^

Toggle for full or truncated hostname configured on the server. By default, ossec truncates the hostname at the first period ('.') when generating syslog messages.

+--------------------+---------+
| **Default Value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

format
^^^^^^

Format of alert output.

+--------------------+-------------------------------------------------------------------------------------------+
| **Default Value**  | default                                                                                   |
+--------------------+---------+---------------------------------------------------------------------------------+
| **Allowed values** | default                                                                                   |
+                    +---------+---------------------------------------------------------------------------------+
|                    | cef     | will output data in the ArcSight Common Event Format.                           |
+                    +---------+---------------------------------------------------------------------------------+
|                    | splunk  | will output data in a Splunk-friendly format.                                   |
+                    +---------+---------------------------------------------------------------------------------+
|                    | json    | will output data in the JSON format that can be consumed by a variety of tools. |
+--------------------+---------+---------------------------------------------------------------------------------+
