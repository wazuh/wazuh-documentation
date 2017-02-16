.. _daemons:

Daemons
=======

+---------------------------------------------------+-----------------------------------------------------------------+
| Daemons                                           | Descriptions                                                    |
+===================================================+=================================================================+
| `ossec-agentd <ossec-agentd.html>`_               | The client side daemon that communicates with the server        |
+---------------------------------------------------+-----------------------------------------------------------------+
| `ossec-agentlessd <ossec-agentlessd.html>`_       | Run integrity checking on systems without an agent installed    |
+---------------------------------------------------+-----------------------------------------------------------------+
| `ossec-analysisd <ossec-analysisd.html>`_         | Recveives the log messages and compares them to the rules       |
+---------------------------------------------------+-----------------------------------------------------------------+
| `ossec-authd <ossec-authd.html>`_                 | Adds agents to an OSSEC manager                                 |
+---------------------------------------------------+-----------------------------------------------------------------+
| `ossec-csyslogd <ossec-csyslogd.html>`_           | Forwards the OSSEC alerts via syslog                            |
+---------------------------------------------------+-----------------------------------------------------------------+
| `ossec-dbd <ossec-dbd.html>`_                     | Inserts the alert logs into a database                          |
+---------------------------------------------------+-----------------------------------------------------------------+
| `ossec-exced <ossec-execd.html>`_                 | Executes active responses                                       |
+---------------------------------------------------+-----------------------------------------------------------------+
| `ossec-logcollector <ossec-logcollector.html>`_   | Monitors configured files and commands for new log messages     |
+---------------------------------------------------+-----------------------------------------------------------------+
| `ossec-maild <ossec-maild.html>`_                 | Sends OSSEC alerts via email                                    |
+---------------------------------------------------+-----------------------------------------------------------------+
| `ossec-monitord <ossec-monitord.html>`_           | Monitors agent connectivity and compress log files              |
+---------------------------------------------------+-----------------------------------------------------------------+
| `ossec-remoted <ossec-remoted.html>`_             | It communicates with the agents                                 |
+---------------------------------------------------+-----------------------------------------------------------------+
| `ossec-reportd <ossec-reportd.html>`_             | Creates reports from OSSEC alerts                               |
+---------------------------------------------------+-----------------------------------------------------------------+
| `ossec-syscheckd <ossec-syscheckd.html>`_         | Checks configured files for security changes                    |
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
