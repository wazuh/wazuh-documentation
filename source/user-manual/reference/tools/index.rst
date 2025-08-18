.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out our User manual to see the available tools and their supported installations for configuring and using each of the Wazuh components. 
  
.. _tools:

Tools
=====

+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| Tools                                             | Descriptions                                                               | Supported installations     |
+===================================================+============================================================================+=============================+
| :doc:`wazuh-control <wazuh-control>`              | Manages the status of Wazuh processes                                      | manager, agent              |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`agent-auth <agent-auth>`                    | Adds agents to a Wazuh manager                                             | agent                       |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`agent_control <agent-control>`              | Allows queries of the manager to get information about any agent           | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`manage_agents <manage-agents>`              | Provides an interface to handle authentication keys for  agents            | manager, agent              |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`rbac_control <rbac-control>`                | Manage API RBAC resources and reset RBAC DB                                | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`agent_groups <agent-groups>`                | Manages and assigns groups                                                 | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`agent_upgrade <agent-upgrade>`              | List outdated agents and upgrade them                                      | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`cluster_control <cluster-control>`          | Manages and retrieves cluster information                                  | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`fim_migrate <fim-migrate>`                  | Migrates older FIM databases to Wazuh-DB                                   | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-keystore <wazuh-keystore>`            | Stores sensitive information for increased security                        | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+

.. toctree::
   :hidden:
   :maxdepth: 1

    agent-auth
    agent-control
    manage-agents
    wazuh-control
    wazuh-logtest
    rbac-control
    agent-groups
    agent-upgrade
    cluster-control
    fim-migrate
    wazuh-keystore
