.. _ manual_tcp:

OSSEC with TCP
==============

.. versionadded:: v1.1

Until now, OSSEC only used the UDP protocol to connect agents to the manager. Now we introduce a new feature that allows to use TCP, providing reliable, ordered and error-checked delivery of OSSEC messages.

Requirements
------------

Managers must be able to listen a TCP port (1514 by default), so your firewall should be configured to allow ingoing traffic on that port.

Configuration
-------------

OSSEC provides a new option called ``<protocol>`` for secure connections at file
``etc/ossec.conf``. Depending on your installation type you must use one of the
following configurations:

Managers
^^^^^^^^

Remote connections are declared with ``<remote>`` sections. ::

    <remote>
      <connection>secure</connection>
      <protocol>tcp</protocol>
      <port>1514</port>
    </remote>

<connection>
""""""""""""

Type of connection. Allowed values:

- ``secure`` *default.*
- ``syslog``

<protocol>
""""""""""

Protocol to use. Allowed values:

- ``udp`` for UDP. *Default*
- ``tcp`` for TCP.

<port>
""""""

Port to bind. *Default: 1514.*

.. note:: 
    At the present it's not allowed to configure two secure connections,
    for example one listening TCP and another listening UDP.

Agents
^^^^^^

Agents can be configure to connect to the manager using TCP at the section
``<client>``. ::

    <client>
      <server-ip>1.2.3.4</server-ip>
      <protocol>tcp</protocol>
      <port>1514</port>
    </client>

<server-ip>
"""""""""""

IP of the manager.

<protocol>
""""""""""

Protocol to use. Allowed values:

- ``udp`` for UDP. *Default*
- ``tcp`` for TCP.

<port>
""""""

Port to bind. *Default: 1514.*

TCP versus UDP
--------------

UDP is a convenient protocol in OSSEC since it is a fast protocol and allows
agents to delivery independent messages to the manager with a mininum impact
over network.

UDP is a best-effort protocol and supports fragmentation (on IP layer) and error
checking, but it is a connectionless service and does not provide guarantee of
delivery, so it's possible that not every message arrives to the manager.

On the other hand, TCP is a connection-oriented service and is optimized for
accurate delivery, providing OSSEC to establish a connection with each agent,
receive data with delivery guarantee and detect immediately if an agent has been
disconnected.

In the agent side, when using UDP, OSSEC waits for a response from the manager
and, from this moment, transmits messages with no acknowledge responses. If the
manager is disconnected or changes its IP, the agent can't know it.

With TCP, agents can detect lost connections and try to recover them. If the
address of the manager has been specified with a host-name, OSSEC will resolve
it before retry to connect.

Also, active response messages (communication in the opposite way) are
guaranteed to arrive from manager to agents.
