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
| :doc:`wazuh-agentlessd <wazuh-agentlessd>`        | Runs integrity checking on systems where no agent is installed  | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-analysisd <wazuh-analysisd>`          | Receives log messages and compares them to the rules            | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-authd <wazuh-authd>`                  | Adds agents to the Wazuh manager                                | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-csyslogd <wazuh-csyslogd>`            | Forwards Wazuh alerts via syslog                                | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-dbd <wazuh-dbd>`                      | Inserts alert logs into a database                              | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-execd <wazuh-execd>`                  | Executes active responses                                       | manager, agent              |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-logcollector <wazuh-logcollector>`    | Monitors configured files and commands for new log messages     | manager, agent              |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-maild <wazuh-maild>`                  | Sends Wazuh alerts via email                                    | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-monitord <wazuh-monitord>`            | Monitors agent connectivity and compresses log files            | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-remoted <wazuh-remoted>`              | Communicates with agents                                        | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-reportd <wazuh-reportd>`              | Creates reports from Wazuh alerts                               | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-syscheckd <wazuh-syscheckd>`          | Checks configured files for security changes                    | manager, agent              |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-clusterd <clusterd>`                  | Manages the Wazuh cluster manager                               | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-modulesd <wazuh-modulesd>`            | Manages the Wazuh modules                                       | manager, agent              |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-db <wazuh-db>`                        | Manages the Wazuh database                                      | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-integratord <wazuh-integratord>`      | Allows Wazuh to connect to external APIs and alerting tools     | manager                     |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+


.. toctree::
    :hidden:
    :maxdepth: 1

    wazuh-agentd
    wazuh-agentlessd
    wazuh-analysisd
    wazuh-authd
    wazuh-csyslogd
    wazuh-dbd
    wazuh-execd
    wazuh-logcollector
    wazuh-maild
    wazuh-monitord
    wazuh-remoted
    wazuh-reportd
    wazuh-syscheckd
    clusterd
    wazuh-modulesd
    wazuh-db
    wazuh-integratord
