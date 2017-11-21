.. _reference_ossec_remote:


remote
=======

.. topic:: XML section name

	.. code-block:: xml

		<remote>
		</remote>

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
| **Default value**  | secure         |
+--------------------+----------------+
| **Allowed values** | secure, syslog |
+--------------------+----------------+

port
^^^^^^^^^^^

Specifies the port to use to listen for events.

+--------------------+---------------------------------+
| **Default value**  | 1514 if secure, 514 if syslog   |
+--------------------+---------------------------------+
| **Allowed values** | Any port number from 1 to 65535 |
+--------------------+---------------------------------+



protocol
^^^^^^^^^^^

Specifies the protocol to use. It is available for secure connections and syslog events.

+--------------------+----------+
| **Default value**  | udp      |
+--------------------+----------+
| **Allowed values** | udp, tcp |
+--------------------+----------+

.. note::
	It is not possible to use both protocols simultaneously.

allowed-ips
^^^^^^^^^^^

List of IP addresses that are allowed to send syslog messages to the server (one per line).

+--------------------+---------------------------+
| **Default value**  | n/a                       |
+--------------------+---------------------------+
| **Allowed values** | Any IP address or network |
+--------------------+---------------------------+

.. note::

   It is necessary to list at least one IP address when using the syslog connection type.

deny-ips
^^^^^^^^^^^

List of IP addresses that are not allowed to send syslog messages to the server (one per line).

+--------------------+---------------------------+
| **Default value**  | n/a                       |
+--------------------+---------------------------+
| **Allowed values** | Any IP address or network |
+--------------------+---------------------------+


local_ip
^^^^^^^^^^^

Local ip address to use to listen for connections.

+--------------------+-------------------------+
| **Default value**  | All interfaces          |
+--------------------+-------------------------+
| **Allowed values** | Any internal ip address |
+--------------------+-------------------------+


ipv6
^^^^^^^^^^^

Local ipv6 address to listen for connections.

+--------------------+------------------+
| **Default value**  | n/a              |
+--------------------+------------------+
| **Allowed values** | Any IPv6 address |
+--------------------+------------------+

Example of configuration
------------------------

.. code-block:: xml

    <remote>
      <connection>syslog</connection>
      <port>514</port>
      <protocol>udp</protocol>
      <allowed_ips>192.168.1.0/24</allowed_ips>
      <local_ip>192.168.1.5</local_ip>
    </remote>

    <remote>
      <connection>secure</connection>
      <port>1514</port>
      <protocol>udp</protocol>
    </remote>
