.. Copyright (C) 2018 Wazuh, Inc.

.. _ossec_agentd_state_file:

ossec-agentd state file
=======================

The statistical file for **ossec-agentd** is ``ossec-agentd.state`` and it's located under the Wazuh installation directory (``/var/ossec/var/run/ossec-agentd.state``).

This file provides information about the agent, like its current status or the number of generated events, among others. By default this file is updated **every 5 seconds**
but this interval can be changed with the ``agent.state_interval`` variable in the ``internal_options.conf`` file. For further information please visit the :ref:`internal configuration <reference_internal_options>` page.

.. note:: The ``ossec-agentd.state`` statistical file is **only** available in agents.

Below you can see an example file:

.. code-block:: bash

    # State file for ossec-agentd

    # Agent status:
    # - pending:      waiting for get connected.
    # - connected:    connection established with manager in the last 10 seconds.
    # - disconnected: connection lost or no ACK received in the last 10 seconds.
    status='connected'

    # Last time a keepalive was sent
    last_keepalive='2018-08-21 12:11:21'

    # Last time a control message was received
    last_ack='2018-08-21 12:11:21'

    # Number of generated events
    msg_count='5619'

    # Number of messages (events + control messages) sent to the manager
    msg_sent='5801'
