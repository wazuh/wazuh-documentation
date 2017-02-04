.. _reference_ossec_remote:


Remote
=======

.. topic:: XML section name

	.. code-block:: xml

		<remote>

Configure manager to listen events from the agents.

+----------------+-----------------------------------------------------------------------+
| Options        | Allowed values                                                        |
+================+=======================================================================+
| `connection`_  | secure, syslog                                                        |
+----------------+-----------------------------------------------------------------------+
| `port`_        | Any port number from 1 to 65535                                       |
+----------------+-----------------------------------------------------------------------+
| `protocol`_    | udp, tcp                                                              |
+----------------+-----------------------------------------------------------------------+
| `allowed-ips`_ | Any IP address or network                                             |
+----------------+-----------------------------------------------------------------------+
| `deny-ips`_    | Any IP address or network                                             |
+----------------+-----------------------------------------------------------------------+
| `local_ip`_    | Any internal ip address                                               |
+----------------+-----------------------------------------------------------------------+
| `ipv6`_        | Any IPv6 address                                                      |
+----------------+-----------------------------------------------------------------------+


``connection``
--------------

Specify the type of connection being enabled: secure or using syslog.

.. topic:: Default value

  .. code-block:: xml

 	  <connection>secure</connection>

.. topic:: Allowed values

  The options are: secure or syslog



``port``
--------

Specifies the port to listen for events.

.. topic:: Default value

  1514: if connection is set to secure

  514: if connection is set to syslog

.. topic:: Allowed values

  Any port number from 1 to 65535 are allowed.



``protocol``
------------

Specifies the protocol to use for syslog events.


.. topic:: Default value

  .. code-block:: xml

 	  <protocol>udp</protocol>

.. topic:: Allowed values

  The options are: udp, tcp


``allowed-ips``
---------------

List of IP addresses that are allowed to send syslog messages to the server (one per element).

.. note::

   It is necessary to allow at least one IP address when using the syslog connection type.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  Any IP address or network


``deny-ips``
------------

List of IP addresses that are not allowed to send syslog messages to the server (one per element).

.. topic:: Default value

  n/a

.. topic:: Allowed values

  Any IP address or network


``local_ip``
------------

Local ip address to listen for connections.

.. topic:: Default value

  All interfaces

.. topic:: Allowed values

  Any internal ip address


``ipv6``
--------

Local ipv6 address to listen for connections.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  Any IPv6 address
