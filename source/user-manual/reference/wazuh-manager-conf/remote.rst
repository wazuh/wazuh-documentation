.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the remote configuration section of wazuh-manager.conf, which configures the listener that receives events from Wazuh agents.

.. _reference_wazuh_manager_conf_remote:

remote
======

.. topic:: XML section name

   .. code-block:: xml

      <remote>
      </remote>

The ``<remote>`` section configures the Wazuh manager listener that receives events from Wazuh agents. Each ``<remote>`` block defines one listener. You can configure multiple ``<remote>`` blocks.

Options
-------

- `port`_
- `protocol`_
- `ipv6`_
- `local_ip`_
- `queue_size`_
- `rids_closing_time`_
- `connection_overtake_time`_
- `agents/allow_higher_versions`_

port
^^^^

Port on which the Wazuh manager listens for incoming agent connections.

+----------------------+---------------------------+
| **Default value**    | 1514                      |
+----------------------+---------------------------+
| **Allowed values**   | Integer from 1 to 65535   |
+----------------------+---------------------------+

protocol
^^^^^^^^

Network protocol used for agent communication. Specify one protocol or a comma-separated pair to enable both protocols.

+----------------------+-------------+
| **Default value**    | tcp         |
+----------------------+-------------+
| **Allowed values**   | - tcp       |
|                      | - udp       |
|                      | - tcp,udp   |
|                      | - udp,tcp   |
+----------------------+-------------+

The order of the values does not affect the configuration.

ipv6
^^^^

Enable IPv6 support for this listener.

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

local_ip
^^^^^^^^

Local IP address to which the listener binds. Use this option on hosts with multiple network interfaces.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | Not set. The listener binds to all available network interfaces.                             |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | Any valid IPv4 or IPv6 address configured on the host. IPv6 addresses are expanded to their  |
|                      | full form.                                                                                   |
+----------------------+----------------------------------------------------------------------------------------------+

queue_size
^^^^^^^^^^

Maximum number of messages that the internal queue can hold while worker threads process incoming events.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | 131072                                                                                       |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | Positive integer (minimum: 1). Values above 262144 generate a startup warning about          |
|                      | potential increase in memory usage.                                                          |
+----------------------+----------------------------------------------------------------------------------------------+

rids_closing_time
^^^^^^^^^^^^^^^^^^

Time after which the Wazuh manager closes inactive agent RIDS (registration identifier) file handles to release file descriptors.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | 300 (5 minutes)                                                                              |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | Positive time value with optional suffix - s, m, h, d. The value 300 without a suffix is     |
|                      | treated as seconds.                                                                          |
+----------------------+----------------------------------------------------------------------------------------------+

connection_overtake_time
^^^^^^^^^^^^^^^^^^^^^^^^^

Time, in seconds, that the Wazuh manager waits before allowing a new connection to replace an existing connection for the same Wazuh agent. Set this option to ``0`` to disable connection overtake protection.

+----------------------+--------------------------+
| **Default value**    | 60                       |
+----------------------+--------------------------+
| **Allowed values**   | Integer from 0 to 3600   |
+----------------------+--------------------------+

agents/allow_higher_versions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Controls whether the listener accepts connections from agents running a newer Wazuh version than the Wazuh manager.

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

.. note::
   This option controls the connection gate (remoted, port 1514). There is an independent option with the same name under ``<auth><agents>`` that controls the enrollment gate (authd, port 1515). Both must be set to ``yes`` for a higher-version agent to enroll and connect. If you set them differently, for example allowing connection but not enrollment, agents cannot obtain keys and therefore cannot communicate.

The ``<allow_higher_versions>`` option is nested under an ``<agents>`` sub-element:

.. code-block:: xml

   <remote>
     <agents>
       <allow_higher_versions>no</allow_higher_versions>
     </agents>
   </remote>

Sample configuration
---------------------

.. code-block:: xml

   <remote>
     <port>1514</port>
     <protocol>tcp</protocol>
     <queue_size>131072</queue_size>
     <rids_closing_time>5m</rids_closing_time>
     <connection_overtake_time>60</connection_overtake_time>
     <agents>
       <allow_higher_versions>no</allow_higher_versions>
     </agents>
   </remote>
