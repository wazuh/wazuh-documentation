.. Copyright (C) 2019 Wazuh, Inc.

.. _ossec_agentd_state_file:

ossec-agentd.state
==================

The statistical file for **ossec-agentd** is located at ``/var/ossec/var/run/ossec-agentd.state``.

This file provides information about the agent as the number of generated events, last connection, agent status and some other useful information. 

By default, this file is updated every 5 seconds. This interval can be changed by modifying the ``agent.state_interval`` value from the :ref:`internal configuration <reference_internal_options>` file.

.. note::
    
    This file is created the first time the agent connects to the manager.

Below there is an example of the content of the file:

.. code-block:: bash

    # State file for ossec-agentd

    # Agent status:
    # - pending:      waiting for get connected.
    # - connected:    connection established with manager in the last 5 seconds.
    # - disconnected: connection lost or no ACK received in the last 5 seconds.
    status='connected'

    # Last time a keepalive was sent
    last_keepalive='2019-02-05 12:18:37'

    # Last time a control message was received
    last_ack='2019-02-05 12:18:37'

    # Number of generated events
    msg_count='12579'

    # Number of messages (events + control messages) sent to the manager
    msg_sent='12928'
