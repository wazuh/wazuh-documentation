.. Copyright (C) 2018 Wazuh, Inc.

.. _ossec_remoted_state_file:

ossec-remoted state file
========================

The statistical file for **ossec-remoted** is ``ossec-remoted.state`` and it's located in the Wazuh installation directory (``/var/ossec/var/run/ossec-remoted.state``).

This file provides information about the **ossec-remoted** daemon like the queue size, discarded messages or the number of TCP sessions among others. By default, this file is updated **every 5 seconds** but this interval can be changed with the ``remoted.state_interval`` variable in the ``internal_options.conf`` file. For further information, visit the :ref:`internal configuration <reference_internal_options>` page.

.. note:: The ``ossec-remoted.state`` statistical file is only available in managers.

.. note::
    This file is created automatically when an agent connects for the first time to the manager.
    If the manager had never an agent connected to it, this file won't exist.

Below you can see an example file:

.. code-block:: bash

    # State file for ossec-remoted
    # Updated every 5 seconds.

    # Queue size
    queue_size='0'

    # Total queue size
    total_queue_size='131072'

    # TCP sessions
    tcp_sessions='1'

    # Events sent to Analysisd
    evt_count='1997'

    # Control messages received
    ctrl_msg_count='344'

    # Discarded messages
    discarded_count='2'

    # Messages sent
    msg_sent='344'

    # Total number of bytes received
    recv_bytes='43587'

