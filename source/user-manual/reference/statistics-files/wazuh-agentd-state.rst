.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-agentd.state file provides information about the agent. Learn more about it in this section of the Wazuh documentation.

.. _wazuh_agentd_state_file:

wazuh-agentd.state
==================

The statistics file for ``wazuh-agentd`` is located at ``/var/ossec/var/run/wazuh-agentd.state``.

This file provides information about the agent, such as the number of generated events, last connection, and agent status.

By default, this file is updated every 5 seconds. You can change this interval by modifying ``agent.state_interval`` in the :ref:`internal configuration <reference_internal_options>` file.

.. note::
   This file is created the first time the agent connects to the manager.

The content differs slightly between agent versions.

**Wazuh 5.0 agents**

.. code-block:: ini

   # State file for wazuh-agentd
   # Agent status:
   # - pending:      waiting to get connected.
   # - connected:    connection established with manager in the last 10 seconds.
   # - disconnected: connection lost or no ACK received in the last 60 seconds.
   status='connected'

   # Last time a keepalive was sent
   last_keepalive='2026-09-03 17:23:49'

   # Number of generated events
   msg_count='324'

   # Number of events currently buffered
   # Always empty: the HTTPS accumulator reports occupancy as a ladder,
   # not as a count
   msg_buffer=''

   # /control tasks routed to a handler
   dispatched='0'

   # /control tasks discarded as duplicates (durable registry)
   discarded_duplicate='0'

   # /control tasks that failed to dispatch/execute
   failed='0'

**Wazuh 4.x agents**

.. code-block:: ini

   # State file for wazuh-agentd
   # Agent status:
   # - pending:      waiting to get connected.
   # - connected:    connection established with manager in the last 20 seconds.
   # - disconnected: connection lost or no ACK received in the last 60 seconds.
   status='connected'

   # Last time a keepalive was sent
   last_keepalive='2026-09-04 15:23:52'

   # Last time a control message was received
   last_ack='2026-09-04 15:23:52'

   # Number of generated events
   msg_count='3481'

   # Number of messages (events + control messages) sent to the manager
   msg_sent='4148'

   # Number of events currently buffered
   # Empty if anti-flooding mechanism is disabled
   msg_buffer='0'
