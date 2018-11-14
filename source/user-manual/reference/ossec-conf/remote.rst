.. Copyright (C) 2018 Wazuh, Inc.

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
- `denied-ips`_
- `local_ip`_
- `ipv6`_
- `queue_size`_

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

.. _manager_protocol:

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

denied-ips
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

queue_size
^^^^^^^^^^^^

Sets the capacity of the remote daemon queue in number of agent events.

+--------------------+----------------------------------+
| **Default value**  | 16384                            |
+--------------------+----------------------------------+
| **Allowed values** | Any number between 1 and 262144. |
+--------------------+----------------------------------+

.. note::
  The remote queue is only available for agent events, not *syslog* events. This options only works when the **connection** is set to ``secure``.

Example of configuration
------------------------

.. code-block:: xml

    <remote>
      <connection>syslog</connection>
      <port>514</port>
      <protocol>udp</protocol>
      <allowed-ips>192.168.1.0/24</allowed-ips>
      <local_ip>192.168.1.5</local_ip>
    </remote>

    <remote>
      <connection>secure</connection>
      <port>1514</port>
      <protocol>udp</protocol>
      <queue_size>16384</queue_size>
    </remote>
