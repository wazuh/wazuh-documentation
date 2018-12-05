.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_ossec_global:

global
======

.. topic:: XML section name

	.. code-block:: xml

		<global>
		</global>

Global configuration generally applies to features that affect the system as a whole, rather than a specific component.

Options
-------

- `alerts_log`_
- `email_notification`_
- `email_to`_
- `email_from`_
- `email_reply_to`_
- `smtp_server`_
- `helo_server`_
- `email_maxperhour`_
- `email_idsname`_
- `custom_alert_output`_
- `stats`_
- `logall`_
- `logall_json`_
- `memory_size`_
- `white_list`_
- `host_information`_
- `jsonout_output`_
- `prelude_output`_
- `prelude_log_level`_
- `prelude_profile`_
- `zeromq_output`_
- `zeromq_uri`_
- `geoipdb`_
- `rotate_interval`_
- `max_output_size`_
- `queue_size`_

alerts_log
^^^^^^^^^^

This toggles the writing of alerts to ``/var/ossec/logs/alerts/alerts.log``.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

.. warning::
  Disabling JSON and plain text formatted alerts simultaneously is not compatible with the integrator, syslog client or email features.

email_notification
^^^^^^^^^^^^^^^^^^

This toggles the use of email alerting.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

email_to
^^^^^^^^

This specifies the email recipient for alerts.

.. note::

  A base configuration must be included in the section in order to use granular email configurations, .

+--------------------+-------------------------+
| **Default value**  | n/a                     |
+--------------------+-------------------------+
| **Allowed values** | Any valid email address |
+--------------------+-------------------------+

This section will only allow for one email address, but the section can be repeated for each email address you would wish include.

email_from
^^^^^^^^^^

This specifies the “source” address contained in the email alerts.

+--------------------+-------------------------+
| **Default value**  | n/a                     |
+--------------------+-------------------------+
| **Allowed values** | Any valid email address |
+--------------------+-------------------------+


email_reply_to
^^^^^^^^^^^^^^

This specifies the “reply-to” address contained in the email alerts.

+--------------------+-------------------------+
| **Default value**  | n/a                     |
+--------------------+-------------------------+
| **Allowed values** | Any valid email address |
+--------------------+-------------------------+

smtp_server
^^^^^^^^^^^

This option defines what SMTP server to use to deliver alerts.

+--------------------+-----------------------------------------------+
| **Default value**  | n/a                                           |
+--------------------+-----------------------------------------------+
| **Allowed values** | - Valid hostname or IP address.               |
|                    |                                               |
|                    | - Full path to a sendmail-like executable.    |
+--------------------+-----------------------------------------------+

helo_server
^^^^^^^^^^^

This option defines how the ossec server will identify itself when sending mail.

+--------------------+-----------------------------------------------+
| **Default value**  | notify.ossec.net                              |
+--------------------+-----------------------------------------------+
| **Allowed values** | Any valid hostname.                           |
+--------------------+-----------------------------------------------+

email_maxperhour
^^^^^^^^^^^^^^^^

This sets the maximum number of email alerts that can be sent per hour. All emails beyond this hourly threshold are then queued to be sent together in a single email at the end of the hour.

.. note::

  At the end of the hour, the queued emails will be sent together in one email whether mail grouping is turned on or not.

+--------------------+---------------------------+
| **Default value**  | 12                        |
+--------------------+---------------------------+
| **Allowed values** | Any number from 1 to 9999 |
+--------------------+---------------------------+

email_idsname
^^^^^^^^^^^^^

The name will be added to the email headers with the specified value.

+--------------------+----------+
| **Default value**  | n/a      |
+--------------------+----------+
| **Allowed values** | Any name |
+--------------------+----------+

custom_alert_output
^^^^^^^^^^^^^^^^^^^

The values below may be used with this option to specify the format of the alerts that are written to ``alerts.log``:

+---------------+----------------------------------------------------+
| Variable name | Description                                        |
+===============+====================================================+
| $TIMESTAMP    | The time the event was processed by OSSEC.         |
+---------------+----------------------------------------------------+
| $FTELL        | Unknown                                            |
+---------------+----------------------------------------------------+
| $RULEALERT    | Unknown                                            |
+---------------+----------------------------------------------------+
| $HOSTNAME     | Hostname of the system generating the event.       |
+---------------+----------------------------------------------------+
| $LOCATION     | The file the log messages were saved to.           |
+---------------+----------------------------------------------------+
| $RULEID       | The rule id of the alert.                          |
+---------------+----------------------------------------------------+
| $RULELEVEL    | The rule level of the alert.                       |
+---------------+----------------------------------------------------+
| $RULECOMMENT  | Unknown                                            |
+---------------+----------------------------------------------------+
| $SRCIP        | The source IP specified in the log message.        |
+---------------+----------------------------------------------------+
| $DSTUSER      | The destination user specified in the log message. |
+---------------+----------------------------------------------------+
| $FULLLOG      | The original log message.                          |
+---------------+----------------------------------------------------+
| $RULEGROUP    | The group containing the rule.                     |
+---------------+----------------------------------------------------+

stats
^^^^^

This sets the severity level for events that are generated by statistical analysis.

+--------------------+------------------------+
| **Default value**  | 8                      |
+--------------------+------------------------+
| **Allowed values** | Any level from 0 to 16 |
+--------------------+------------------------+

.. _reference_ossec_global_logall:

logall
^^^^^^

This toggles whether to store events even when they do not trip a rule with results written to /var/ossec/logs/archives/archives.log.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

logall_json
^^^^^^^^^^^

This toggles whether to store events even when they do not trip a rule with results written to /var/ossec/logs/archives/archives.json.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

memory_size
^^^^^^^^^^^

This sets the memory size for the event correlation engine.

+--------------------+-----------------------------------+
| **Default value**  | 8192                              |
+--------------------+-----------------------------------+
| **Allowed values** | Any integer, but values less than |
|                    | 2048 will be replaced by 2048.    |
+--------------------+-----------------------------------+

white_list
^^^^^^^^^^

This designates IP addresses that should never be blocked with an active response and, though only one IP address can be included in this section, you may repeat this as many times as needed to include additional IP addresses.

+--------------------+----------------------------+
| **Default value**  | n/a                        |
+--------------------+----------------------------+
| **Allowed values** | Any IP address or netblock |
+--------------------+----------------------------+

.. note::

  This option is only valid in server and local installs.

host_information
^^^^^^^^^^^^^^^^

This sets the severity level for events generated by the host change monitor.

+--------------------+------------------------------------+
| **Default value**  | 8                                  |
+--------------------+------------------------------------+
| **Allowed values** | Can be used any level from 0 to 16 |
+--------------------+------------------------------------+

jsonout_output
^^^^^^^^^^^^^^

This toggles the writing of JSON-formatted alerts to /var/ossec/logs/alerts/alerts.json which would include the same events that would be sent to alerts.log, only in JSON format.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

prelude_output
^^^^^^^^^^^^^^

This toggles Prelude output.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

prelude_log_level
^^^^^^^^^^^^^^^^^

The minimum alert level required to trigger prelude output.

+--------------------+------------------------------------+
| **Default value**  | 0                                  |
+--------------------+------------------------------------+
| **Allowed values** | Any integer from 0 to 16 inclusive |
+--------------------+------------------------------------+

prelude_profile
^^^^^^^^^^^^^^^

The prelude client analyzer name.

+--------------------+------------------------------------+
| **Default value**  | OSSEC                              |
+--------------------+------------------------------------+
| **Allowed values** | Any valid prelude client analyzer. |
+--------------------+------------------------------------+

zeromq_output
^^^^^^^^^^^^^

This enables ZeroMQ output.

+--------------------+---------+
| **Default value**  | n/a     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

zeromq_uri
^^^^^^^^^^

This specifies the ZeroMQ URI for the publisher socket to bind to.

+--------------------+---------------------------------------------------+
| **Default value**  | n/a                                               |
+--------------------+---------------------------------------------------+
| **Allowed values** | This URI format is defined by the ZeroMQ project. |
+--------------------+---------------------------------------------------+

For example:

This will listen for ZeroMQ subscribers on IP address 127.0.0.1:11111.

.. code-block:: xml

  <zeromq_uri>tcp://localhost:11111/</zeromq_uri>

This will listen on port 21212 for ZeroMQ subscribers, binding to the IP address assigned to eth0.

.. code-block:: xml

  <zeromq_uri>tcp://eth0:21212/</zeromq_uri>

This will listen for zeromq on the Unix Domain socket /alerts-zmq.

.. code-block:: xml

  <zeromq_uri>ipc:///alerts-zmq</zeromq_uri>

geoipdb
^^^^^^^

This indicates the full path of the MaxMind GeoIP IPv4 database file.

+--------------------+-----------------------------------------------+
| **Default value**  | n/a                                           |
+--------------------+-----------------------------------------------+
| **Allowed values** | Path to the GeoIP IPv4 database file location |
+--------------------+-----------------------------------------------+

For example:

.. code-block:: xml

  <geoipdb>/etc/GeoLiteCity.dat</geoipdb>

rotate_interval
^^^^^^^^^^^^^^^

.. versionadded:: 3.1.0

This sets the interval between file rotation with ``min_rotate_interval`` the highest allowed value.

+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**       | 0 (disabled)                                                                                                                             |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values**      | A positive number that should ends with character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days).        |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------+

Example

.. code-block:: xml

  <rotate_interval>10h</rotate_interval>

max_output_size
^^^^^^^^^^^^^^^

.. versionadded:: 3.1.0

This sets the size limit of alert files with a maximum allowed value of 1TiB.

+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**       | 0 (disabled)                                                                                                                             |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values**      | A positive number that should contain a suffix character indicating a size unit, such as, B (bytes), K (kibibyte), M (mebibyte),         |
|                         | G (gibibyte).                                                                                                                            |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------+

Example

.. code-block:: xml

  <max_output_size>20M</max_output_size>

queue_size
^^^^^^^^^^

.. versionadded:: 3.3.0

This sets the size of the message input buffer in Analysisd (number of events).

+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**       | 131072                                                                                                                                   |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values**      | A positive number. The minimum allowed is 1. The recommended range is [16384..262144]                                                    |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------+

Example

.. code-block:: xml

  <queue_size>16384</queue_size>

Default configuration
---------------------

.. code-block:: xml

    <global>
      <jsonout_output>yes</jsonout_output>
      <alerts_log>yes</alerts_log>
      <logall>no</logall>
      <logall_json>no</logall_json>
      <email_notification>yes</email_notification>
      <smtp_server>smtp.example.wazuh.com</smtp_server>
      <email_from>ossecm@example.wazuh.com</email_from>
      <email_to>recipient@example.wazuh.com</email_to>
      <email_maxperhour>12</email_maxperhour>
    </global>
