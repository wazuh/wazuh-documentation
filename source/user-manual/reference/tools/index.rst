.. Copyright (C) 2021 Wazuh, Inc.

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
| :doc:`agent_control <agent_control>`              | Allows queries of the manager to get information about                     | manager                     |
|                                                   |                                                                            |                             |
|                                                   | any agent                                                                  |                             |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`manage_agents <manage_agents>`              | Provides an interface to handle authentication                             | manager, agent              |
|                                                   |                                                                            |                             |
|                                                   | keys for  agents                                                           |                             |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-logtest <wazuh-logtest>`              | Allows testing and verification of rules against provided log records      | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`clear_stats <clear_stats>`                  | Clears the events stats                                                    | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-regex <wazuh-regex>`                  | Validates a regex expression                                               | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`update_ruleset <update_ruleset>`            | Update Decoders, Rules and Rootchecks                                      | manager                     |
|                                                   |                                                                            |                             |
|                                                   | .. deprecated:: 4.2                                                        |                             |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`verify-agent-conf <verify-agent-conf>`      | Verifies the Wazuh agent.conf configuration                                | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`agent_groups <agent_groups>`                | Manages and assigns groups                                                 | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`agent_upgrade <agent_upgrade>`              | List outdated agents and upgrade them                                      | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`cluster_control <cluster_control>`          | Manages and retrieves cluster information                                  | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`fim_migrate <fim_migrate>`                  | Migrates older FIM databases to Wazuh-DB                                   | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`security_resources <security_resources>`    | Manages RBAC protected resources and offers RBAC database utilities        | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+




  .. toctree::
    :hidden:
    :maxdepth: 1

    agent-auth
    agent_control
    manage_agents
    wazuh-control
    wazuh-logtest
    clear_stats
    wazuh-regex
    update_ruleset
    verify-agent-conf
    agent_groups
    agent_upgrade
    cluster_control
    fim_migrate
    security_resources
