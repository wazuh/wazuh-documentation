.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Know the Wazuh Daemons that perform different actions between the different components of the Wazuh platform. Learn more about it in this section.

.. _daemons:

Daemons
=======

+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| Daemons                                           | Descriptions                                                    | Supported installations     |
+===================================================+=================================================================+=============================+
| :doc:`wazuh-agentd <wazuh-agentd>`                | Client side daemon that communicates with the server.           | agent                       |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-analysisd <wazuh-analysisd>`          | Receives log messages and compares them to the rules            | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-authd <wazuh-authd>`                  | Adds agents to the Wazuh manager                                | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-execd <wazuh-execd>`                  | Executes active responses                                       | manager, agent              |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-logcollector <wazuh-logcollector>`    | Monitors configured files and commands for new log messages     | manager, agent              |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-monitord <wazuh-monitord>`            | Monitors agent connectivity and compresses log files            | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-remoted <wazuh-remoted>`              | Communicates with agents                                        | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-syscheckd <wazuh-syscheckd>`          | Checks configured files for security changes                    | manager, agent              |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-clusterd <clusterd>`                  | Manages the Wazuh cluster manager                               | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-modulesd <wazuh-modulesd>`            | Manages the Wazuh modules                                       | manager, agent              |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-db <wazuh-db>`                        | Manages the Wazuh database                                      | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+


.. toctree::
    :hidden:
    :maxdepth: 1

    wazuh-agentd
    wazuh-analysisd
    wazuh-authd
    wazuh-execd
    wazuh-logcollector
    wazuh-monitord
    wazuh-remoted
    wazuh-syscheckd
    clusterd
    wazuh-modulesd
    wazuh-db
    
