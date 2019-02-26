.. Copyright (C) 2018 Wazuh, Inc.

.. _ossec_agentd_state_file:

ossec-agentd state file
=======================

The statistical file for **ossec-agentd** is ``ossec-agentd.state`` and it's located in the Wazuh installation directory (``/var/ossec/var/run/ossec-agentd.state``).

This file provides information about the agent, like its current status or the number of generated events, among others. By default this file is updated **every 5 seconds**
but this interval can be changed with the ``agent.state_interval`` variable in the ``internal_options.conf`` file. For further information, visit the :ref:`internal configuration <reference_internal_options>` page.

.. note:: The ``ossec-agentd.state`` statistical file is **only** available in agents.

.. note::
    This file is created automatically when the agent connects for the first time to a manager.
    If the agent has not been connected to a manager yet, this file won't exist.

Below you can see an example file:

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
