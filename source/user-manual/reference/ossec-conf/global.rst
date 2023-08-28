.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The ossec.conf file is the main configuration file on the Wazuh manager and plays an important role on the agents. Learn more about the global configuration here.

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
- `email_log_source`_
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
- `agents_disconnection_time`_
- `agents_disconnection_alert_time`_
- `limits`_

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

  A base configuration must be included in the section in order to use granular email configurations.

+--------------------+-------------------------+
| **Default value**  | n/a                     |
+--------------------+-------------------------+
| **Allowed values** | Any valid email address |
+--------------------+-------------------------+

Note that this section only allows for one email address. In case you want to add more than one, repeat the section as many times as required.

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

This option defines how the Wazuh server identifies itself when sending mail.

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

+--------------------+--------------------------------+
| **Default value**  | 12                             |
+--------------------+--------------------------------+
| **Allowed values** | Any number from 1 to 1000000   |
+--------------------+--------------------------------+

email_idsname
^^^^^^^^^^^^^

The name will be added to the email headers with the specified value.

+--------------------+----------+
| **Default value**  | n/a      |
+--------------------+----------+
| **Allowed values** | Any name |
+--------------------+----------+


email_log_source
^^^^^^^^^^^^^^^^

This selects the alert file to be read from.

+--------------------+---------------------------+
| **Default value**  | alerts.log                |
+--------------------+---------------------------+
| **Allowed values** | alerts.log or alerts.json |
+--------------------+---------------------------+

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

This toggles whether to store events even when they do not trip a rule with results written to ``/var/ossec/logs/archives/archives.log``.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

.. _reference_ossec_global_logall_json:

logall_json
^^^^^^^^^^^

This toggles whether to store events even when they do not trip a rule with results written to ``/var/ossec/logs/archives/archives.json``.

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

.. _white_list: 

white_list
^^^^^^^^^^

This specifies an IPv4/IPv6 address, netblock, or hostname that will not trigger an active response. Only one of those values may be specified for each ``<while_list>`` tag, but several values may be used by including multiple ``<white_list>`` tags. This configuration is compared against the extracted **srcip** field in the alert.

+--------------------+--------------------------------------------------------------------+
| **Default value**  | n/a                                                                |
+--------------------+--------------------------------------------------------------------+
| **Allowed values** | Any IPv4/IPv6 address, netblock (i.e.: 192.168.0.0/16) or hostname |
+--------------------+--------------------------------------------------------------------+

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

.. _global_jsonout_output:

jsonout_output
^^^^^^^^^^^^^^

This toggles the writing of JSON-formatted alerts to ``/var/ossec/logs/alerts/alerts.json`` which would include the same events that would be sent to alerts.log, only in JSON format.

.. warning::

   Disabling ``jsonout_output`` disrupts the alerts indexing process. In a default installation, Filebeat reads the ``alerts.json`` file and sends this information to the Wazuh indexer. If the writing to this file stops, alerts are no longer indexed.

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

This will listen for ZeroMQ subscribers on IP address ``127.0.0.1:11111``.

.. code-block:: xml

  <zeromq_uri>tcp://localhost:11111/</zeromq_uri>

This will listen on port ``21212`` for ZeroMQ subscribers, binding to the IP address assigned to ``eth0``.

.. code-block:: xml

  <zeromq_uri>tcp://eth0:21212/</zeromq_uri>

This will listen for ZeroMQ on the Unix Domain socket ``/alerts-zmq``.

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

This option sets the interval between file rotation. The range of possible values is from ``10m`` (10 minutes) to ``1d`` (1 day).

+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **Default value**       | 0 (disabled)                                                                                                                      |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values**      | A positive number that should end with a character indicating a time unit, such as: s (seconds), m (minutes), h (hours), d (days) |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------+

.. note::

  The default minimum value ``10m`` is set in the :ref:`analysisd.min_rotate_interval <ossec_internal_analysisd>` option found in the internal configuration file ``/var/ossec/etc/internal_options.conf``.

Example:

.. code-block:: xml

  <rotate_interval>10h</rotate_interval>

max_output_size
^^^^^^^^^^^^^^^

This sets the size limit of alert files with a maximum allowed value of 1TiB and a minimum allowed value of 1MiB.

+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**       | 0 (disabled)                                                                                                                             |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values**      | A positive number that should contain a suffix character indicating a size unit, such as M (mebibyte) and G (gibibyte).                  |
+-------------------------+------------------------------------------------------------------------------------------------------------------------------------------+

Example:

.. code-block:: xml

  <max_output_size>20M</max_output_size>


.. _reference_agents_disconnection_time:

agents_disconnection_time
^^^^^^^^^^^^^^^^^^^^^^^^^

This sets the time after which the manager considers an agent as disconnected since its last keepalive.

+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**       | 10m                                                                                                                                                           |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values**      | A positive number that should end with a character indicating a time unit, such as: s (seconds), m (minutes), h (hours), d (days). The minimum allowed is 1s. |
+-------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------+

.. warning::

  This setting should always be greater than :ref:`notify-time <notify_time>` configured in the agents. This allows them to always notify the manager before it would consider them disconnected.

Example:

.. code-block:: xml

  <agents_disconnection_time>1m</agents_disconnection_time>

.. _reference_agents_disconnection_alert_time:

agents_disconnection_alert_time
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This sets the time after which an alert is generated since an agent was considered as disconnected.
As this is a time-lapse after an agent is considered as disconnected because of the :ref:`disconnection time<reference_agents_disconnection_time>`, the minimum time frame to produce an alert taking the default values is 2m and 20s.

+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**       | 0s                                                                                                                                                                                                                                            |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values**      | A positive number that should end with a character indicating a time unit, such as: s (seconds), m (minutes), h (hours), d (days). The minimum allowed is 0s in order to generate an alert as soon as an agent is considered as disconnected. |
+-------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Example:

.. code-block:: xml

  <agents_disconnection_alert_time>1h</agents_disconnection_alert_time>

limits
------

This block configures the limits section.

- `limits\\eps`_

+----------------------------+
| Options                    |
+============================+
| `limits\\eps`_             |
+----------------------------+

limits\\eps
^^^^^^^^^^^

This block configures the events per second limitation functionality.

- `limits\\eps\\maximum`_
- `limits\\eps\\timeframe`_

+----------------------------------------+----------------------------------------------+
| Options                                | Allowed values                               |
+========================================+==============================================+
| `limits\\eps\\maximum`_                | Zero or a positive number                    |
+----------------------------------------+----------------------------------------------+
| `limits\\eps\\timeframe`_              | A positive number                            |
+----------------------------------------+----------------------------------------------+

Events per second limits example block:

.. code-block:: xml

    <limits>
      <eps>
        <maximum>500</maximum>
        <timeframe>10</timeframe>
      </eps>
    </limits>

limits\\eps\\maximum
^^^^^^^^^^^^^^^^^^^^

Maximum number of events per second allowed to be processed by decoders.

+--------------------+-----------------------------------------------------------------+
| **Default value**  | 0                                                               |
+--------------------+-----------------------------------------------------------------+
| **Allowed values** | A number between 0 and 100000. Zero to disable the functionality|
+--------------------+-----------------------------------------------------------------+

limits\\eps\\timeframe
^^^^^^^^^^^^^^^^^^^^^^

A positive number expressed in seconds that indicates the time period where the events per second processed are increased and restored.

+--------------------+-------------------------------------+
| **Default value**  | 10                                  |
+--------------------+-------------------------------------+
| **Allowed values** | A positive number between 1 and 3600|
+--------------------+-------------------------------------+

Configuration example
---------------------

.. code-block:: xml

   <global>
     <jsonout_output>yes</jsonout_output>
     <alerts_log>yes</alerts_log>
     <logall>no</logall>
     <logall_json>no</logall_json>
     <email_notification>no</email_notification>
     <smtp_server>smtp.example.wazuh.com</smtp_server>
     <email_from>wazuh@example.wazuh.com</email_from>
     <email_to>recipient@example.wazuh.com</email_to>
     <email_maxperhour>12</email_maxperhour>
     <email_log_source>alerts.log</email_log_source>
     <agents_disconnection_time>10m</agents_disconnection_time>
     <agents_disconnection_alert_time>0</agents_disconnection_alert_time>
   </global>
