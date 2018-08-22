.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_statistics_files:

Statistics files
================

Actually, Wazuh provides two statistical files. One for :doc:`ossec-agentd <daemons/ossec-agentd>` and another for :doc:`ossec-remoted <daemons/ossec-remoted>`.

ossec-agentd state file
-----------------------

The name of the statistical file for **ossec-agentd** is ``ossec-agentd.state`` and it's located under the Wazuh installation directory in ``var/run/ossec-agentd.state``.

This file provides information about the agent, like the current status or the number of generated events among others. By default, this file is updated every 5 seconds 
but this interval can be changed with the ``agent.state_interval`` variable in the ``internal_options.conf`` file.

.. note:: This statistical file is **only** available in agents.

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

ossec-remoted state file
------------------------

The name of the statistical file for **ossec-remoted** is ``ossec-remoted.state`` and it's located under the Wazuh installation directory in ``var/run/ossec-remoted.state``.

This file provides information about the **ossec-remoted** daemon, like the queue size, discarded messages or the number of TCP sessions among others. By default, this file is updated every 5 seconds 
but this interval can be changed with the ``remoted.state_interval`` variable in the ``internal_options.conf`` file.

.. note:: This statistical file is **only** available in managers.

Below you can see an example file:

.. code-block:: bash

    # State file for ossec-remoted
    # Updated every 5 seconds.

    # Queue size
    queue_size='0'

    # Total queue size
    total_queue_size='131072'

    # TCP sessions
    tcp_sessions='0'

    # Events sent to Analysisd
    evt_count='7383'

    # Control messages received
    ctrl_msg_count='270'

    # Discarded messages
    discarded_count='0'

    # Messages sent
    msg_sent='1267'
