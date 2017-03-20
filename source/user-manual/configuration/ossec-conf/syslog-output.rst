.. _reference_ossec_syslog_output:


syslog_output
=============

.. topic:: XML section name

	.. code-block:: xml

		<syslog_output>

Configuration options for sending alerts to a syslog server.

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

The IP Address of the syslog server.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any valid IP address

``port``
--------

The port to forward alerts to.

.. topic:: Default value

	.. code-block:: xml

		<port>514</port>

.. topic:: Allowed values

  Any valid port


``level``
---------

The minimum level of the alerts to be forwarded.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any level from 1 to 16

``group``
---------

Group of the alerts to be forwarded.

.. topic:: Default value

	n/a

.. topic:: Allowed value

  Any valid group. Separate multiple groups with the pipe ("|") character.



``rule_id``
-----------

The rule_id of the alerts to be forwarded.


.. topic:: Default value

	n/a

.. topic:: Allowed value

  Any valid rule_id

``location``
------------

The location of the alerts to be forwarded.

.. topic:: Default value

	n/a

.. topic:: Allowed value

  Any valid log file location

``use_fqdn``
------------

Toggle for full or truncated hostname configured on the server. By default, ossec truncates the hostname at the first period ('.') when generating syslog messages.


.. topic:: Default value

  .. code-block:: xml

      <use_fqdn>no</use_fqdn>

.. topic:: Allowed value

  The options are: yes, no

``format``
----------

Format of alert output.  The options are:

-*"CEF"* will output data in the ArcSight Common Event Format.

-*"json"* will output data in the JSON format that can be consumed by a variety of tools.

-*"splunk"* will output data in a Splunk-friendly format.

.. topic:: Default value

  .. code-block:: xml

      <format>default</format>

.. topic:: Allowed value

  The options are: default, cef, splunk, json
