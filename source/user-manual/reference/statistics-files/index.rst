.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The statistics files are documents that show real-time information about the Wazuh environment. Learn more about it in this section of the documentation.

.. _reference_statistics_files:

Statistics files
================

The **statistics files** are documents that show real-time information about the Wazuh environment as the processed events, received messages, and the state of the remote connections.

Agents statistical files:

  * :ref:`wazuh-agentd.state <wazuh_agentd_state_file>` - It shows the amount of events generated,
    last connection date and agent status, among other useful information related to the agent.

Manager statistical files:

  * :ref:`wazuh-remoted.state <wazuh_remoted_state_file>` - It shows information
    about the :ref:`remote daemon <wazuh-remoted>`
  * :ref:`wazuh-analysisd.state <wazuh_analysisd_state_file>` - It shows information
    about the :ref:`analysis daemon <wazuh-analysisd>`.

Manager and Agents statistical files:

  * :ref:`wazuh-logcollector.state <wazuh_logcollector_state_file>` - It shows information about :ref:`logcollector daemon <wazuh-logcollector>`.

.. topic:: Contents

  .. toctree::
      :maxdepth: 1

      wazuh-agentd-state
      wazuh-remoted-state
      wazuh-analysisd-state
      wazuh-logcollector-state
