.. _reference_ossec_remote:


remote
=======

.. topic:: XML section name

	.. code-block:: xml

		<remote>

Configuration of manager to listen for events from the agents.

Options
-------

- `connection`_
- `port`_
- `protocol`_
- `allowed-ips`_
- `deny-ips`_
- `local_ip`_
- `ipv6`_

connection
^^^^^^^^^^^

Specifies a type of incoming connection to accept: secure or syslog.

+--------------------+----------------+
| **Default Value**  | secure         |
+--------------------+----------------+
| **Allowed values** | secure, syslog |
+--------------------+----------------+

port
^^^^^^^^^^^

Specifies the port to use to listen for events.

+--------------------+---------------------------------+
| **Default Value**  | 1514 if secure, 514 if syslog   |
+--------------------+---------------------------------+
| **Allowed values** | Any port number from 1 to 65535 |
+--------------------+---------------------------------+



protocol
^^^^^^^^^^^

Specifies the protocol to use. It is available for secure connections and syslog events.

+--------------------+----------+
| **Default Value**  | udp      |
+--------------------+----------+
| **Allowed values** | udp, tcp |
+--------------------+----------+


allowed-ips
^^^^^^^^^^^

List of IP addresses that are allowed to send syslog messages to the server (one per line).

+--------------------+---------------------------+
| **Default Value**  | n/a                       |
+--------------------+---------------------------+
| **Allowed values** | Any IP address or network |
+--------------------+---------------------------+

.. note::

   It is necessary to list at least one IP address when using the syslog connection type.

deny-ips
^^^^^^^^^^^

List of IP addresses that are not allowed to send syslog messages to the server (one per line).

+--------------------+---------------------------+
| **Default Value**  | n/a                       |
+--------------------+---------------------------+
| **Allowed values** | Any IP address or network |
+--------------------+---------------------------+


local_ip
^^^^^^^^^^^

Local ip address to use to listen for connections.

+--------------------+-------------------------+
| **Default Value**  | All interfaces          |
+--------------------+-------------------------+
| **Allowed values** | Any internal ip address |
+--------------------+-------------------------+


ipv6
^^^^^^^^^^^

Local ipv6 address to listen for connections.

+--------------------+------------------+
| **Default Value**  | n/a              |
+--------------------+------------------+
| **Allowed values** | Any IPv6 address |
+--------------------+------------------+
