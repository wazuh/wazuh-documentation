.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_statistics_files:

Statistics files
================

The **statistics files** are documents that show real-time information about the Wazuh environment as the processed events, received messages and the state of the remote connections.

Agents statistical files:

  *  `ossec-agentd.state <https://documentation.wazuh.com/current/user-manual/reference/statistics-files/ossec-agentd-state.html>`_ - It shows number of generated events, last connection, agent status and some other useful information about the agent.
 
Manager statistical files: 

  * `ossec-remoted.state <https://documentation.wazuh.com/current/user-manual/reference/statistics-files/ossec-remoted-state.html>`_ - It shows information about the `remote daemon. <https://documentation.wazuh.com/current/user-manual/reference/daemons/ossec-remoted.html>`_
  * `ossec-analysisd.state <https://documentation.wazuh.com/current/user-manual/reference/statistics-files/ossec-analysisd-state.html>`_ - It shows information about the `analysis daemon <https://documentation.wazuh.com/current/user-manual/reference/daemons/ossec-analysisd.html>`_.



.. topic:: Contents

  .. toctree::
      :maxdepth: 1

      ossec-agentd-state
      ossec-remoted-state
      ossec-analysisd-state