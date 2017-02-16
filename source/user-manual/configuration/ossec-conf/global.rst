.. _reference_ossec_global:

Global
======

.. topic:: XML section name

	.. code-block:: xml

		<global>

Global configuration generally applies to features that affect the system as a whole, rather than just one component.

+------------------------+-----------------------------------------------------------------------+
| Options                | Allowed values                                                        |
+========================+=======================================================================+
| `email_notification`_  | yes, no                                                               |
+------------------------+-----------------------------------------------------------------------+
| `email_to`_            | Any valid e-mail address                                              |
+------------------------+-----------------------------------------------------------------------+
| `email_from`_          | Any valid e-mail address                                              |
+------------------------+-----------------------------------------------------------------------+
| `email_reply_to`_      | Any valid e-mail address                                              |
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
| `logall`_              | yes, no                                                               |
+------------------------+-----------------------------------------------------------------------+
| `memory_size`_         | Any size from 16 to 5096                                              |
+------------------------+-----------------------------------------------------------------------+
| `white_list`_          | Any IP address or netblock                                            |
+------------------------+-----------------------------------------------------------------------+
| `host_information`_    | Any level from 0 to 16                                                |
+------------------------+-----------------------------------------------------------------------+
| `jsonout_output`_      | yes, no                                                               |
+------------------------+-----------------------------------------------------------------------+
| `prelude_output`_      | yes, no                                                               |
+------------------------+-----------------------------------------------------------------------+
| `picviz_output`_       | yes                                                                   |
+------------------------+-----------------------------------------------------------------------+
| `picviz_socket`_       | File and path that ossec will create and feed events to               |
+------------------------+-----------------------------------------------------------------------+
| `zeromq_output`_       | yes, no                                                               |
+------------------------+-----------------------------------------------------------------------+
| `zeromq_uri`_          | Format is defined by the ZeroMQ project                               |
+------------------------+-----------------------------------------------------------------------+
| `geoip_db_path`_       | Path to the GeoIP IPv4 database file location                         |
+------------------------+-----------------------------------------------------------------------+



``email_notification``
----------------------

Enable or disable e-mail alerting.

.. topic:: Default value

  .. code-block:: xml

    <email_notification>no</email_notification>

.. topic:: Allowed values

  The options allowed are: yes, no


``email_to``
------------

E-mail recipient of the alerts.

.. note::

  To use granular email configurations, a base configuration is necessary in the section.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any valid e-mail address

``email_from``
--------------

E-mail “source” of the alerts.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any valid e-mail address


``email_reply_to``
------------------

E-mail “Reply-to” of the alerts.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any valid e-mail address

``smtp_server``
---------------

SMTP server.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any valid hostname or IP Address can be used.

``email_maxperhour``
--------------------

Specifies the maximum number of e-mails to be sent per hour. All emails in excess of this setting will be queued for later distribution.


.. note::

  At the end of the hour any queued emails will be sent together in one email. This is true whether the mail grouping is enabled or disabled.

.. topic:: Default value

  .. code-block:: xml

    <email_maxperhour>12</email_maxperhour>

.. topic:: Allowed values

  Can be used any number from 1 to 9999


``email_idsname``
-----------------

The name settled will be added to the email headers with the specified value.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any name

``custom_alert_output``
-----------------------

Specifies the format of alerts written to the logfile.

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

Alerting level for the events generated by the statistical analysis.

.. topic:: Default value

  .. code-block:: xml

    <stats>8</stats>

.. topic:: Allowed values

  Can be used any level from 1 to 16

.. _reference_ossec_global_logall:

``logall``
----------

States if we should store all the events received.

.. topic:: Default value

  .. code-block:: xml

    <logall>no</logall>

.. topic:: Allowed values

  The options allowed are: yes, no

``memory_size``
---------------

Sets the memory size for the event correlation.

.. topic:: Default value

  .. code-block:: xml

    <memory_size>1024</emory_size>

.. topic:: Allowed values

  Can be used any size from 16 to 5096

``white_list``
--------------

List of IP addresses that should never be blocked by the active response(one per element).
This option is only valid in server and local installs.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  Any IP address or netblock is accepted. It is possible indicate more of one of them.

``host_information``
--------------------

Alerting level for the events generated by the host change monitor.


.. topic:: Default value

  .. code-block:: xml

    <host_information>8</host_information>

.. topic:: Allowed values

  Can be used any level from 0 to 16

``jsonout_output``
------------------

Enable or disable writing of json-formated alerts at ``/var/ossec/logs/alerts/alerts.json``

.. topic:: Default value

  .. code-block:: xml

    <jsonout_output>no</jsonout_output>

.. topic:: Allowed values

  The options allowed are: yes, no

``prelude_output``
------------------

Enables or disables prelude output.

.. topic:: Default value

  .. code-block:: xml

    <prelude_output>no</prelude_output>

.. topic:: Allowed values

  The options allowed are: yes, no

``picviz_output``
-----------------

Enable picviz output.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  .. code-block:: xml

    <picviz_output>yes</picviz_output>

``picviz_socket``
-----------------

The full path of the socket that ossec will write alerts/events to. This will then be read by picviz for processing.


.. topic:: Default value

  n/a

.. topic:: Allowed values

  File and path that ossec will create and feed events to

``zeromq_output``
-----------------

Enable ZeroMQ Output


.. topic:: Default value

  n/a

.. topic:: Allowed values

  The options allowed are: yes, no


``zeromq_uri``
--------------

This is zeromq URI that the publisher socket will bind to.

This will listen for zeromq subscribers on ip address 127.0.0.1:11111

.. code-block:: xml

  <zeromq_uri>tcp://localhost:11111/</zeromq_uri>

This will listen for zeromq subscribers on the ip address assiged to eth0 port 21212

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

The full path to the GeoIP IPv4 database file location.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  Path to the GeoIP IPv4 database file location

  Example

  .. code-block:: xml

    <geoip_db_path>/etc/GeoLiteCity.dat</geoip_db_path>
