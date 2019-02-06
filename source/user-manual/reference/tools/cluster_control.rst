.. Copyright (C) 2018 Wazuh, Inc.

.. _cluster_control:

cluster_control
===============

.. versionadded:: 3.0.0

The cluster_control program allows you to manage the cluster from any manager. It is necessary that ``wazuh-clusterd`` is running
in order to use this tool.

cluster_control options
-----------------------

+-----------------------------------------+---------------------------------------------------+
| Option name                             | Option description                                |
+=========================================+===================================================+
| ``-h, --help``                          | Display the help message.                         |
+-----------------------------------------+---------------------------------------------------+
| ``-i, --health [more] [-fs]``           | Display the cluster's healthcheck.                |
+-----------------------------------------+---------------------------------------------------+
| ``-l, --list-nodes [-fn]``              | Display connected nodes in the cluster.           |
+-----------------------------------------+---------------------------------------------------+
| ``-d, --debug``                         | Show debug messages.                              |
+-----------------------------------------+---------------------------------------------------+
| ``-a, --list-agents [-fs] [-fn]``       | Display agents in the cluster.                    |
+-----------------------------------------+---------------------------------------------------+
| ``-fn, --filter-node [NODE_NAME]``      | Display information of specified node(s) only     |
+-----------------------------------------+---------------------------------------------------+
| ``-fs, --filter-agent-status [STATUS]`` | Display agents with the specified status(es) only |
+-----------------------------------------+---------------------------------------------------+

Examples of use
---------------

Get cluster's healthcheck
^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Summarized version
    .. code-block:: shell

        # /var/ossec/bin/cluster_control -i
        Cluster name: wazuh

        Last completed synchronization for connected nodes (3):
        node02 (192.168.56.103): Integrity: 2018-05-15 17:25:12.64 | Agents-info: 2018-05-15 17:25:14.74 | Agent-groups: n/a.
        node03 (192.168.56.105): Integrity: 2018-05-15 17:25:15.35 | Agents-info: n/a | Agent-groups: n/a.

* Extended version
    .. code-block:: shell

        # /var/ossec/bin/cluster_control -i more
        Cluster name: wazuh

        Connected nodes (3):

        node01 (192.168.56.101)
            Version: 3.9.0
            Type: master
            Active agents: 1

        node02 (192.168.56.103)
            Version: 3.9.0
            Type: worker
            Active agents: 1
            Status:
                Integrity
                    Last synchronization: 2018-05-15 17:28:35.17 - 2018-05-15 17:28:35.17.
                    Synchronized files: Shared: 0 | Missing: 0 | Extra: 0 | Extra valid: 0.
                    Permission to synchronize: True.
                Agents-info
                    Last synchronization: 2018-05-15 17:28:33.35 - 2018-05-15 17:28:33.35.
                    Synchronized files: 1.
                    Permission to synchronize: True.
                Agents-group
                    Last synchronization: n/a - n/a.
                    Synchronized files: 0.
                    Permission to synchronize: True.

        node03 (192.168.56.105)
            Version: 3.8.1
            Type: worker
            Active agents: 0
            Status:
                Integrity
                    Last synchronization: 2018-05-15 17:28:37.84 - 2018-05-15 17:28:37.85.
                    Synchronized files: Shared: 0 | Missing: 0 | Extra: 0 | Extra valid: 0.
                    Permission to synchronize: True.
                Agents-info
                    Last synchronization: n/a - n/a.
                    Synchronized files: 0.
                    Permission to synchronize: True.
                Agents-group
                    Last synchronization: n/a - n/a.
                    Synchronized files: 0.
                    Permission to synchronize: True.

* Getting healthcheck of multiple nodes
    .. code-block:: shell

        # /var/ossec/bin/cluster_control -i more -fn node02 node01
        Cluster name: wazuh

        Connected nodes (3):

        node01 (192.168.56.101)
            Version: 3.9.0
            Type: master
            Active agents: 1

        node02 (192.168.56.103)
            Version: 3.9.0
            Type: worker
            Active agents: 1
            Status:
                Integrity
                    Last synchronization: 2018-05-15 17:31:07.04 - 2018-05-15 17:31:07.04.
                    Synchronized files: Shared: 0 | Missing: 0 | Extra: 0 | Extra valid: 0.
                    Permission to synchronize: True.
                Agents-info
                    Last synchronization: 2018-05-15 17:30:45.74 - 2018-05-15 17:30:45.75.
                    Synchronized files: 1.
                    Permission to synchronize: True.
                Agents-group
                    Last synchronization: n/a - n/a.
                    Synchronized files: 0.
                    Permission to synchronize: True.


Get connected nodes
^^^^^^^^^^^^^^^^^^^

* Get all connected nodes
    .. code-block:: shell

        # /var/ossec/bin/cluster_control -l
        NAME      TYPE    VERSION  ADDRESS
        worker-1  worker  3.9.0    172.17.0.101
        worker-2  worker  3.9.0    172.17.0.102
        master    master  3.9.0    172.17.0.100

* Filter connected nodes by name
    .. code-block:: shell

        # /var/ossec/bin/cluster_control -l -fn master worker-1
        NAME      TYPE    VERSION  ADDRESS
        worker-1  worker  3.9.0    172.17.0.101
        master    master  3.9.0    172.17.0.100

Get agents in cluster
^^^^^^^^^^^^^^^^^^^^^

* Get all agents
    .. code-block:: shell

        # /var/ossec/bin/cluster_control -a
        NAME    IP         ID   STATUS  VERSION       NODE NAME
        master  127.0.0.1  000  Active  Wazuh v3.9.0  master
        agent1  any        001  Active  Wazuh v3.9.0  worker-2

* Get all agents reporting to a node
    .. code-block:: shell

        # /var/ossec/bin/cluster_control -a -fn worker-2
        NAME    IP         ID   STATUS  VERSION       NODE NAME
        agent1  any        001  Active  Wazuh v3.9.0  worker-2

* Get all active disconnected reporting to a node
    .. code-block:: shell

        # /var/ossec/bin/cluster_control -a -fn node02 -fs Disconnected
        NAME    IP         ID   STATUS  VERSION       NODE NAME
