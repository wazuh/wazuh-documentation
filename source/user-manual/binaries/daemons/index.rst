.. _daemons:

Daemons
=======

+---------------------------------------------------+-----------------------------------------------------------------+
| Daemons                                           | Descriptions                                                    |
+===================================================+=================================================================+
| :ref:`ossec-agentd <ossec-agentd>`                | The client side daemon that communicates with the server        |
+---------------------------------------------------+-----------------------------------------------------------------+
| :ref:`ossec-agentlessd <ossec-agentlessd>`        | Run integrity checking on systems without an agent installed    |
+---------------------------------------------------+-----------------------------------------------------------------+
| :ref:`ossec-analysisd <ossec-analysisd>`          | Recveives the log messages and compares them to the rules       |
+---------------------------------------------------+-----------------------------------------------------------------+
| :ref:`ossec-authd <ossec-authd>`                  | Adds agents to an OSSEC manager                                 |
+---------------------------------------------------+-----------------------------------------------------------------+
| :ref:`ossec-csyslogd <ossec-csyslogd>`            | Forwards the OSSEC alerts via syslog                            |
+---------------------------------------------------+-----------------------------------------------------------------+
| :ref:`ossec-dbd <ossec-dbd>`                      | Inserts the alert logs into a database                          |
+---------------------------------------------------+-----------------------------------------------------------------+
| :ref:`ossec-exced <ossec-execd>`                  | Executes active responses                                       |
+---------------------------------------------------+-----------------------------------------------------------------+
| :ref:`ossec-logcollector <ossec-logcollector>`    | Monitors configured files and commands for new log messages     |
+---------------------------------------------------+-----------------------------------------------------------------+
| :ref:`ossec-maild <ossec-maild>`                  | Sends OSSEC alerts via email                                    |
+---------------------------------------------------+-----------------------------------------------------------------+
| :ref:`ossec-monitord <ossec-monitord>`            | Monitors agent connectivity and compress log files              |
+---------------------------------------------------+-----------------------------------------------------------------+
| :ref:`ossec-remoted <ossec-remoted>`              | It communicates with the agents                                 |
+---------------------------------------------------+-----------------------------------------------------------------+
| :ref:`ossec-reportd <ossec-reportd>`              | Creates reports from OSSEC alerts                               |
+---------------------------------------------------+-----------------------------------------------------------------+
| :ref:`ossec-syscheckd <ossec-syscheckd>`          | Checks configured files for security changes                    |
+---------------------------------------------------+-----------------------------------------------------------------+


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
