.. _daemons:

Daemons
=======

+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| Daemons                                           | Descriptions                                                    | Supported installations     |
+===================================================+=================================================================+=============================+
| :ref:`ossec-agentd <ossec-agentd>`                | The client side daemon that communicates                        | Agent                       |
|                                                   |                                                                 |                             |
|                                                   | with the server                                                 |                             |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :ref:`ossec-agentlessd <ossec-agentlessd>`        | Run integrity checking on systems without                       | Server, local               |
|                                                   |                                                                 |                             |
|                                                   | an agent installed                                              |                             |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :ref:`ossec-analysisd <ossec-analysisd>`          | Receives the log messages and compares                          | Server, local               |
|                                                   |                                                                 |                             |
|                                                   | them to the rules                                               |                             |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :ref:`ossec-authd <ossec-authd>`                  | Adds agents to an OSSEC manager                                 | Server                      |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :ref:`ossec-csyslogd <ossec-csyslogd>`            | Forwards the OSSEC alerts via syslog                            | Server, local               |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :ref:`ossec-dbd <ossec-dbd>`                      | Inserts the alert logs into a database                          | Server, local               |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :ref:`ossec-execd <ossec-execd>`                  | Executes active responses                                       | Server, local, agent        |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :ref:`ossec-logcollector <ossec-logcollector>`    | Monitors configured files and commands for                      | Server, local, agent        |
|                                                   |                                                                 |                             |
|                                                   | new log messages                                                |                             |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :ref:`ossec-maild <ossec-maild>`                  | Sends OSSEC alerts via email                                    | Server, local               |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :ref:`ossec-monitord <ossec-monitord>`            | Monitors agent connectivity and compress log files              | Server, local               |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :ref:`ossec-remoted <ossec-remoted>`              | It communicates with the agents                                 | Server                      |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :ref:`ossec-reportd <ossec-reportd>`              | Creates reports from OSSEC alerts                               | Server, local               |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :ref:`ossec-syscheckd <ossec-syscheckd>`          | Checks configured files for security changes                    | Server, local, agent        |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+
| :ref:`wazuh-modulesd <wazuh-modulesd>`            | Wazuh module manager                                            | Server, agent               |
+---------------------------------------------------+-----------------------------------------------------------------+-----------------------------+


.. topic:: Contents

    .. toctree::
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
        wazuh-modulesd
