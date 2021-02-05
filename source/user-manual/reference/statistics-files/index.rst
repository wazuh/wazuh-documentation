.. Copyright (C) 2021 Wazuh, Inc.

.. _reference_statistics_files:

Statistics files
================

The **statistics files** are documents that show real-time information about the Wazuh environment as the processed events, received messages and the state of the remote connections.

Agents statistical files:

  *  `wazuh-agentd.state <https://documentation.wazuh.com/current/user-manual/reference/statistics-files/wazuh-agentd-state.html>`_ - It shows number of generated events, last connection, agent status and some other useful information about the agent.

Manager statistical files:

  * `wazuh-remoted.state <https://documentation.wazuh.com/current/user-manual/reference/statistics-files/wazuh-remoted-state.html>`_ - It shows information about the `remote daemon. <https://documentation.wazuh.com/current/user-manual/reference/daemons/wazuh-remoted.html>`_
  * `wazuh-analysisd.state <https://documentation.wazuh.com/current/user-manual/reference/statistics-files/wazuh-analysisd-state.html>`_ - It shows information about the `analysis daemon <https://documentation.wazuh.com/current/user-manual/reference/daemons/wazuh-analysisd.html>`_.

Manager and Agents statistical files:

  * :ref:`wazuh-logcollector.state <wazuh_logcollector_state_file>` - It shows information about :ref:`logcollector daemon <wazuh-logcollector>`.

.. topic:: Contents

  .. toctree::
      :maxdepth: 1

      wazuh-agentd-state
      wazuh-remoted-state
      wazuh-analysisd-state
      wazuh-logcollector-state
