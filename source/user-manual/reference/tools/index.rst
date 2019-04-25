.. Copyright (C) 2019 Wazuh, Inc.

.. _tools:

Tools
=====

+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| Tools                                             | Descriptions                                                               | Supported installations     |
+===================================================+============================================================================+=============================+
| :doc:`ossec-control <ossec-control>`              | Manages the status of Wazuh processes                                      | manager, agent              |
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
| :doc:`ossec-logtest <ossec-logtest>`              | Allows testing and verification of rules against provided log records      | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`ossec-makelists <ossec-makelists>`          | Compiles cdb databases                                                     | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`rootcheck_control <rootcheck_control>`      | Allows management of policy monitoring                                     | manager                     |
|                                                   |                                                                            |                             |
|                                                   | and system auditing database                                               |                             |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`syscheck_control <syscheck_control>`        | Provides an interface for managing the integrity checking database         | manager                     |
|                                                   |                                                                            |                             |
|                                                   | .. deprecated:: 3.7                                                        |                             |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`syscheck_update <syscheck_update>`          | Updates the integrity check database                                       | manager                     |
|                                                   |                                                                            |                             |
|                                                   | .. deprecated:: 3.7                                                        |                             |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`clear_stats <clear_stats>`                  | Clears the events stats                                                    | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`ossec-regex <ossec-regex>`                  | Validates a regex expression                                               | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`update_ruleset <update_ruleset>`            | Update Decoders, Rules and Rootchecks                                      | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`util.sh <util.sh>`                          | Adds a file to be monitored by ossec-logcollector                          | manager agent               |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`verify-agent-conf <verify-agent-conf>`      | Verifies the Wazuh agent.conf configuration                                | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`agent_groups <agent_groups>`                | Manages and assigns groups                                                 | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`agent_upgrade <agent_upgrade>`              | List outgraded agent and upgrade them                                      | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`cluster_control <cluster_control>`          | Manages and retrieves cluster information                                  | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`fim_migrate <fim_migrate>`                  | Migrates older FIM databases to Wazuh-DB                                   | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+



  .. toctree::
    :hidden:
    :maxdepth: 1

    agent-auth
    agent_control
    manage_agents
    ossec-control
    ossec-logtest
    ossec-makelists
    rootcheck_control
    syscheck_control
    syscheck_update
    clear_stats
    ossec-regex
    update_ruleset
    util.sh
    verify-agent-conf
    agent_groups
    agent_upgrade
    cluster_control
    fim_migrate
