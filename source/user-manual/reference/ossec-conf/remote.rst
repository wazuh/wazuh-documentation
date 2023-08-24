.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to configure the manager to listen for events from the agents and an example of configuration in this section of the Wazuh documentation. 
  
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
- `rids_closing_time`_
- `connection_overtake_time`_

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
| **Default value**  | tcp      |
+--------------------+----------+
| **Allowed values** | udp, tcp |
+--------------------+----------+

  It is now possible to configure both UDP and TCP protocols to work simultaneously in the secure connections, this can be achieved by writing in the same configuration block the accepted protocols separated with a comma. For syslog connections, multiple protocols support require multiple configuration blocks since only one protocol per block is allowed.

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

Enables IPv6 support.

+--------------------+------------------+
| **Default value**  | no               |
+--------------------+------------------+
| **Allowed values** | yes, no          |
+--------------------+------------------+

queue_size
^^^^^^^^^^^^

Sets the capacity of the remote daemon queue in number of agent events.

+--------------------+----------------------------------+
| **Default value**  | 131072                           |
+--------------------+----------------------------------+
| **Allowed values** | Any number between 1 and 262144. |
+--------------------+----------------------------------+

.. note::
  The remote queue is only available for agent events, not *syslog* events. This option only works when the **connection** is set to ``secure``.

rids_closing_time
^^^^^^^^^^^^^^^^^^

Sets the time to close the RIDS files for agents that don't report new events in that time interval.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 5m                                                                                                                                       |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days). |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+

connection_overtake_time
^^^^^^^^^^^^^^^^^^^^^^^^^

.. versionadded:: 4.5.2

Sets the time to wait before considering a connection with a TCP client down when a new connection with the same key arrives. A value of 0 disables this assessment of connection activity.

.. warning::

   The ``connection_overtake_time`` must be higher than the agent :ref:`notify-time <notify_time>`.

+--------------------+-----------------------------------------------+
| **Default value**  | 60                                            |
+--------------------+-----------------------------------------------+
| **Allowed values** | A number between 0 and 3600 (seconds).        |
+--------------------+-----------------------------------------------+

.. note::

   ``connection_overtake_time`` doesn't apply to connections with UDP clients.

Example of configuration
------------------------

.. code-block:: xml

    <remote>
      <connection>syslog</connection>
      <port>514</port>
      <protocol>tcp</protocol>
      <allowed-ips>192.168.1.0/24</allowed-ips>
      <local_ip>192.168.1.5</local_ip>
    </remote>

    <remote>
      <connection>secure</connection>
      <port>1514</port>
      <protocol>tcp,udp</protocol>
      <queue_size>16384</queue_size>
      <rids_closing_time>5m</rids_closing_time>
      <connection_overtake_time>600</connection_overtake_time>
    </remote>
