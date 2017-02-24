.. _tools:

Tools
=====

+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| Tools                                             | Descriptions                                                               | Supported installations     |
+===================================================+============================================================================+=============================+
| :ref:`ossec-control <ossec-control>`              | Manage the status of Wazuh processes                                       | Server, local, agent        |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :ref:`agent-auth <agent-auth>`                    | Add agents to an Wazuh manager                                             | Agent                       |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :ref:`agent_control <agent_control>`              | Allows you to query and get information from                               | Server                      |
|                                                   |                                                                            |                             |
|                                                   | any agent                                                                  |                             |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :ref:`manage_agents <manage_agents>`              | Provides an interface to handle authentication                             | Server, agent               |
|                                                   |                                                                            |                             |
|                                                   | keys for  agents                                                           |                             |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :ref:`ossec-logtest <ossec-logtest>`              | Allows to test and verify log files                                        | Server, local               |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :ref:`ossec-makelists <ossec-makelists>`          | Compile cdb databases                                                      | Server, local               |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :ref:`rootcheck_control <rootcheck_control>`      | Allows you to manage the policy monitoring                                 | Server, local               |
|                                                   |                                                                            |                             |
|                                                   | and system auditing database                                               |                             |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :ref:`syscheck_control <syscheck_control>`        | Provides an interface for managing the                                     | Server, local               |
|                                                   |                                                                            |                             |
|                                                   | integrity checking database                                                |                             |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :ref:`syscheck_update <syscheck_update>`          | Updates the integrity check database                                       | Server, local               |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :ref:`clear_stats <clear_stats>`                  | Clears the events stats                                                    | Server, local               |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :ref:`ossec-regex <ossec-regex>`                  | Validates a regex expression                                               | Server, local               |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :ref:`update-ruleset.py <update-ruleset.py>`      | Update Decoders, Rules and Rootchecks                                      | Server                      |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :ref:`util.sh <util.sh>`                          | Adds a file to be monitored by ossec-logcollector                          | Server, local, agent        |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :ref:`verify-agent-conf <verify-agent-conf>`      | Verifies the Wazuh agent.conf configuration                                | Server                      |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+

.. topic:: Contents

  .. toctree::
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
    update-ruleset.py
    util.sh
    verify-agent-conf
