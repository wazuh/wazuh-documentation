.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The statistics files are documents that show real-time information about the Wazuh environment. Learn more about it in this section of the documentation.

.. _reference_statistics_files:

Statistics files
================

The statistics files are documents that show real-time information about the Wazuh environment, such as processed events, received messages, and the state of remote connections.

Agent statistical files:

-  :ref:`wazuh-agentd.state <wazuh_agentd_state_file>` - shows the number of events generated, last connection date, and agent status, along with other useful agent-related information.

Manager statistical files - **removed in Wazuh 5.0**, replaced by the API:

-  :doc:`wazuh-remoted.state <wazuh-remoted-state>`
-  :ref:`wazuh-analysisd.state <wazuh_analysisd_state_file>`

Manager and Agent statistical files:

-  :ref:`wazuh-logcollector.state <wazuh_logcollector_state_file>` - shows information about the logcollector daemon.

.. toctree::
   :hidden:
   :maxdepth: 1

   wazuh-agentd-state
   wazuh-remoted-state
   wazuh-analysisd-state
   wazuh-logcollector-state
