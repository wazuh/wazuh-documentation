.. Copyright (C) 2019 Wazuh, Inc.

.. _daemons:

Daemons
=======

+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| Daemons                                           | Descriptions                                                    | Supported installations     |
+===================================================+=================================================================+=============================+
| :doc:`ossec-agentd <ossec-agentd>`                | Client side daemon that communicates with the server.           | agent                       |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`ossec-agentlessd <ossec-agentlessd>`        | Runs integrity checking on systems where no agent is installed  | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`ossec-analysisd <ossec-analysisd>`          | Receives log messages and compares them to the rules            | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`ossec-authd <ossec-authd>`                  | Adds agents to the Wazuh manager                                | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`ossec-csyslogd <ossec-csyslogd>`            | Forwards Wazuh alerts via syslog                                | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`ossec-dbd <ossec-dbd>`                      | Inserts alert logs into a database                              | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`ossec-execd <ossec-execd>`                  | Executes active responses                                       | manager, agent              |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`ossec-logcollector <ossec-logcollector>`    | Monitors configured files and commands for new log messages     | manager, agent              |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`ossec-maild <ossec-maild>`                  | Sends Wazuh alerts via email                                    | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`ossec-monitord <ossec-monitord>`            | Monitors agent connectivity and compresses log files            | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`ossec-remoted <ossec-remoted>`              | Communicates with agents                                        | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`ossec-reportd <ossec-reportd>`              | Creates reports from Wazuh alerts                               | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`ossec-syscheckd <ossec-syscheckd>`          | Checks configured files for security changes                    | manager, agent              |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-clusterd <clusterd>`                  | Manages the Wazuh cluster manager                               | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-modulesd <wazuh-modulesd>`            | Manages the Wazuh modules                                       | manager, agent              |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-db <wazuh-db>`                        | Manages the Wazuh database                                      | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`ossec-integratord <ossec-integratord>`      | Allows Wazuh to connect to external APIs and alerting tools     | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+


.. toctree::
    :hidden:
    :maxdepth: 1

    ossec-agentd
    ossec-agentlessd
    ossec-analysisd
    ossec-authd
    ossec-csyslogd
    ossec-dbd
    ossec-execd
    ossec-logcollector
    ossec-maild
    ossec-monitord
    ossec-remoted
    ossec-reportd
    ossec-syscheckd
    clusterd
    wazuh-modulesd
    wazuh-db
    ossec-integratord
