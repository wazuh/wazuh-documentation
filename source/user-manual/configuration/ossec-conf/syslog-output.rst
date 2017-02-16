.. _reference_ossec_syslog_output:


Syslog output
=============

.. topic:: XML section name

	.. code-block:: xml

		<syslog_output>

Configuration to send alerts to a syslog server.

+-------------+-----------------------------------------------------------+
| Options     | Allowed values                                            |
+=============+===========================================================+
| `server`_   | Any valid IP address                                      |
+-------------+-----------------------------------------------------------+
| `port`_     | Any valid port                                            |
+-------------+-----------------------------------------------------------+
| `level`_    | Any level from 1 to 16                                    |
+-------------+-----------------------------------------------------------+
| `group`_    | Any valid group                                           |
+-------------+-----------------------------------------------------------+
| `rule_id`_  | Any valid rule_id                                         |
+-------------+-----------------------------------------------------------+
| `location`_ | Any valid logfile location                                |
+-------------+-----------------------------------------------------------+
| `use_fqdn`_ | yes, no                                                   |
+-------------+-----------------------------------------------------------+
| `format`_   | The options are: default, cef, splunk, json               |
+-------------+-----------------------------------------------------------+



``server``
----------

IP Address of the syslog server.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any valid IP address

``port``
--------

Port to forward alerts to.

.. topic:: Default value

	.. code-block:: xml

		<port>514</port>

.. topic:: Allowed values

  Any valid port


``level``
---------

Minimum alert level of the alerts to be forwarded.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any level from 1 to 16

``group``
---------

Alerts belonging to this group will be forwarded.

.. topic:: Default value

	n/a

.. topic:: Allowed value

  Any valid group. Separate multiple groups with the pipe ("|") character.



``rule_id``
-----------

Alerts matching this rule_id will be forwarded.


.. topic:: Default value

	n/a

.. topic:: Allowed value

  Any valid rule_id

``location``
------------

Alerts from this location will be forwarded.

.. topic:: Default value

	n/a

.. topic:: Allowed value

  Any valid logfile location

``use_fqdn``
------------

By default, ossec truncates the hostname at the first period ('.') when generating syslog messages.
Setting this option to 'yes' will cause it to use the full hostname configured on the server.

.. topic:: Default value

  .. code-block:: xml

      <use_fqdn>no</use_fqdn>

.. topic:: Allowed value

  The options are: yes, no

``format``
----------

Format of alert output.  The options are explained below:

CEF is the ArcSight Common Event Format.

json can be used with a variety of tools.

The splunk option is for sending data to a Splunk server.

.. topic:: Default value

  .. code-block:: xml

      <format>default</format>

.. topic:: Allowed value

  The options are: default, cef, splunk, json
