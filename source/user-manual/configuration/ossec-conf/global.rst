.. _reference_ossec_global:

global
======

.. topic:: XML section name

	.. code-block:: xml

		<global>

Global configuration generally applies to features that affect the system as a whole, rather than just one component.

+------------------------+-----------------------------------------------------------------------+
| Options                | Allowed values                                                        |
+========================+=======================================================================+
| `email_notification`_  | yes or no                                                             |
+------------------------+-----------------------------------------------------------------------+
| `email_to`_            | Any valid email address                                               |
+------------------------+-----------------------------------------------------------------------+
| `email_from`_          | Any valid email address                                               |
+------------------------+-----------------------------------------------------------------------+
| `email_reply_to`_      | Any valid email address                                               |
+------------------------+-----------------------------------------------------------------------+
| `smtp_server`_         | Any valid hostname or IP Address                                      |
+------------------------+-----------------------------------------------------------------------+
| `email_maxperhour`_    | Any number from 1 to 9999                                             |
+------------------------+-----------------------------------------------------------------------+
| `email_idsname`_       | Any name                                                              |
+------------------------+-----------------------------------------------------------------------+
| `custom_alert_output`_ | Specific variables (list_)                                            |
+------------------------+-----------------------------------------------------------------------+
| `stats`_               | Any level from 0 to 16                                                |
+------------------------+-----------------------------------------------------------------------+
| `logall`_              | yes or no                                                             |
+------------------------+-----------------------------------------------------------------------+
| `memory_size`_         | Any size from 16 to 5096                                              |
+------------------------+-----------------------------------------------------------------------+
| `white_list`_          | Any IP address or netblock                                            |
+------------------------+-----------------------------------------------------------------------+
| `host_information`_    | Any level from 0 to 16                                                |
+------------------------+-----------------------------------------------------------------------+
| `jsonout_output`_      | yes or no                                                             |
+------------------------+-----------------------------------------------------------------------+
| `prelude_output`_      | yes, no                                                               |
+------------------------+-----------------------------------------------------------------------+
| `picviz_output`_       | yes                                                                   |
+------------------------+-----------------------------------------------------------------------+
| `picviz_socket`_       | File and path that ossec will create and feed events to               |
+------------------------+-----------------------------------------------------------------------+
| `zeromq_output`_       | yes or no                                                             |
+------------------------+-----------------------------------------------------------------------+
| `zeromq_uri`_          | Format is defined by the ZeroMQ project                               |
+------------------------+-----------------------------------------------------------------------+
| `geoip_db_path`_       | Path to the GeoIP IPv4 database file location                         |
+------------------------+-----------------------------------------------------------------------+



``email_notification``
----------------------

This enable or disables email alerting.

.. topic:: Default value

  .. code-block:: xml

    <email_notification>no</email_notification>

.. topic:: Allowed values

  The options allowed are: yes, no


``email_to``
------------

This specifies the email recipient for alerts.

.. note::

  To use granular email configurations, a base configuration is necessary in the section.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any single valid email address is allowed.  Use this section repeatedly for multiple email addresses, once per addresses.


``email_from``
--------------

This controls the “source” address in email alerts.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any valid email address


``email_reply_to``
------------------

This controls the “reply-to” address in email alerts.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any valid email address


``smtp_server``
---------------

This controls what SMTP server to forward email alerts to for delivery.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any valid hostname or IP address can be used.


``email_maxperhour``
--------------------

This specifies the maximum number of emails to be sent per hour. All emails in excess of this setting will be queued for later distribution.


.. note::

  At the end of the hour any queued emails will be sent together in one email. This is true whether mail grouping is enabled or disabled.

.. topic:: Default value

  .. code-block:: xml

    <email_maxperhour>12</email_maxperhour>

.. topic:: Allowed values

  Any number from 1 to 9999


``email_idsname``
-----------------

The name will be added to the email headers with the specified value.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any name


``custom_alert_output``
-----------------------

This specifies the format of alerts written to alerts.log.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  .. _list:

  Variables:

    "$TIMESTAMP"
      The time the event was processed by OSSEC.
    "$FTELL"
      Unknown
    "$RULEALERT"
      Unknown
    "$HOSTNAME"
      Hostname of the system generating the event.
    "$LOCATION"
      The file the log messages was saved to.
    "$RULEID"
      The rule id of the alert.
    "$RULELEVEL"
      The rule level of the alert.
    "$RULECOMMENT"
      Unknown
    "$SRCIP"
      The source IP specified in the log message.
    "$DSTUSER"
      The destination user specified in the log message.
    "$FULLLOG"
      The original log message.
    "$RULEGROUP"
      The groups containing the rule.


``stats``
---------

This controls the severity level assigned to events generated by statistical analysis.

.. topic:: Default value

  .. code-block:: xml

    <stats>8</stats>

.. topic:: Allowed values

  This can be any level from 1 to 16.

.. _reference_ossec_global_logall:


``logall``
----------

This controls whether or not to store all events received even when they do not trip a rule.  This results in output to /var/ossec/logs/archives/archives.log

.. topic:: Default value

  .. code-block:: xml

    <logall>no</logall>

.. topic:: Allowed values

  The options allowed are **yes** or **no**.


``memory_size``
---------------

This sets the memory size for the event correlation engine.

.. topic:: Default value

  .. code-block:: xml

    <memory_size>1024</memory_size>

.. topic:: Allowed values

  Can be used any size from 16 to 5096


``white_list``
--------------

This is a list of IP addresses that should never be blocked with active response.  Repeat this option for multiple IPs, one IP per line.
This option is only valid in server and local installs.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  Any IP address or CIDR netblock is accepted.


``host_information``
--------------------

The controls the severity level for events generated by the host change monitor.


.. topic:: Default value

  .. code-block:: xml

    <host_information>8</host_information>

.. topic:: Allowed values

  Can be used any level from 0 to 16


``jsonout_output``
------------------

This enables/disables writing of JSON-formated alerts to ``/var/ossec/logs/alerts/alerts.json``.  This will include the same events that would be sent to alerts.log, but in JSON format.

.. topic:: Default value

  .. code-block:: xml

    <jsonout_output>yes</jsonout_output>

.. topic:: Allowed values

  The options allowed are **yes** or **no**.


``prelude_output``
------------------

Enables or disables Prelude output.

.. topic:: Default value

  .. code-block:: xml

    <prelude_output>no</prelude_output>

.. topic:: Allowed values

  The options allowed are **yes** or **no**.


``picviz_output``
-----------------

Enable PicViz output.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  .. code-block:: xml

    <picviz_output>yes</picviz_output>


``picviz_socket``
-----------------

This is the full path of the socket that Wazuh will write alerts/events to for PicViz to read.


.. topic:: Default value

  n/a

.. topic:: Allowed values

  file and path that Wazuh will create and feed events to


``zeromq_output``
-----------------

Enable ZeroMQ output.


.. topic:: Default value

  n/a

.. topic:: Allowed values

  The options allowed are **yes** or **no**.


``zeromq_uri``
--------------

This is the ZeroMQ URI that the publisher socket will bind to.

For example, this will listen for ZeroMQ subscribers on IP address 127.0.0.1:11111.

.. code-block:: xml

  <zeromq_uri>tcp://localhost:11111/</zeromq_uri>

This will listen on port 21212 for ZeroMQ subscribers, binding to the IP address assiged to eth0.

.. code-block:: xml

  <zeromq_uri>tcp://eth0:21212/</zeromq_uri>

This will listen for zeromq on the Unix Domain socket /alerts-zmq.

.. code-block:: xml

  <zeromq_uri>ipc:///alerts-zmq</zeromq_uri>

.. topic:: Default value

  n/a

.. topic:: Allowed values

  This URI format is defined by the ZeroMQ project.


``geoip_db_path``
-----------------

This is the full path to the MaxMind GeoIP IPv4 database file.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  Path to the GeoIP IPv4 database file location

  Example

  .. code-block:: xml

    <geoip_db_path>/etc/GeoLiteCity.dat</geoip_db_path>
