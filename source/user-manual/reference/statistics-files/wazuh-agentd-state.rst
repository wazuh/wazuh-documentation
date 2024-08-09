.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-agentd.state file provides information about the agent. Learn more about it in this section of the Wazuh documentation.

.. _wazuh_agentd_state_file:

wazuh-agentd.state
==================

The statistical file for **wazuh-agentd** is located at ``/var/ossec/var/run/wazuh-agentd.state``.

This file provides information about the agent as the number of generated events, last connection, agent status, and some other useful information.

By default, this file is updated every 5 seconds. This interval can be changed by modifying the ``agent.state_interval`` value from the :ref:`internal configuration <reference_internal_options>` file.

.. note::

    This file is created the first time the agent connects to the manager.

Below there is an example of the content of the file:

.. code-block:: pkgconfig

    # State file for wazuh-agentd

    # Agent status:
    # - pending:      waiting for get connected.
    # - connected:    connection established with manager in the last 10 seconds.
    # - disconnected: connection lost or no ACK received in the last 60 seconds.
    status='connected'

    # Last time a keepalive was sent
    last_keepalive='2019-02-05 12:18:37'

    # Last time a control message was received
    last_ack='2019-02-05 12:18:37'

    # Number of generated events
    msg_count='12579'

    # Number of messages (events + control messages) sent to the manager
    msg_sent='12928'

    # Number of events currently buffered
    # Empty if anti-flooding mechanism is disabled
    msg_buffer='35'

.. note::

    Statistics can also be acquired in real-time through the API.
