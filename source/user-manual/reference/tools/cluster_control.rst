.. Copyright (C) 2018 Wazuh, Inc.

.. _cluster_control:

cluster_control
===============

.. versionadded:: 3.0.0

The cluster_control program allows you to manage the cluster from any manager. It is necessary that ``wazuh-clusterd`` is running
in order to use this tool.

cluster_control options
-----------------------

The options available for masters and workers are different. Bellow, the options for each one are explained.

+-----------------------------------------+---------------------------------------------------+-----------------+
| Option name                             | Option description                                | Available in    |
+=========================================+===================================================+=================+
| ``-h, --help``                          | Display the help message.                         | master, worker  |
+-----------------------------------------+---------------------------------------------------+-----------------+
| ``-i, --health [more] [-fs]``           | Display the cluster's healthcheck.                | master, worker  |
+-----------------------------------------+---------------------------------------------------+-----------------+
| ``-l, --list-nodes [-fn]``              | Display connected nodes in the cluster.           | master, worker  |
+-----------------------------------------+---------------------------------------------------+-----------------+
| ``-d, --debug``                         | Show debug messages.                              | master, worker  |
+-----------------------------------------+---------------------------------------------------+-----------------+
| ``-a, --list-agents [-fs] [-fn]``       | Display agents in the cluster.                    | master          |
+-----------------------------------------+---------------------------------------------------+-----------------+
| ``-fn, --filter-node [NODE_NAME]``      | Display information of specified node(s) only     | master, worker  |
+-----------------------------------------+---------------------------------------------------+-----------------+
| ``-fs, --filter-agent-status [STATUS]`` | Display agents with the specified status(es) only | master          |
+-----------------------------------------+---------------------------------------------------+-----------------+

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
            Version: 3.4.0
            Type: master
            Active agents: 1

        node02 (192.168.56.103)
            Version: 3.4.0
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
            Version: 3.4.0
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
            Version: 3.4.0
            Type: master
            Active agents: 1

        node02 (192.168.56.103)
            Version: 3.4.0
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
        ---------------------------------------
        Name    Address         Type    Version
        ---------------------------------------
        node01  192.168.56.101  master  3.4.0
        node02  192.168.56.103  worker  3.4.0
        node03  192.168.56.105  worker  3.4.0
        ---------------------------------------

* Filter connected nodes by name
    .. code-block:: shell

        # /var/ossec/bin/cluster_control -l -fn node01 node03
        ---------------------------------------
        Name    Address         Type    Version
        ---------------------------------------
        node01  192.168.56.101  master  3.4.0
        node03  192.168.56.105  worker  3.4.0
        ---------------------------------------

Get agents in cluster
^^^^^^^^^^^^^^^^^^^^^

* Get all agents
    .. code-block:: shell

        # /var/ossec/bin/cluster_control -a
        ---------------------------------------------------------------
        ID   Address    Name                   Status           Node
        ---------------------------------------------------------------
        000  127.0.0.1  localhost.localdomain  Active           node01
        001  any        agent1                 Active           node02
        002  any        agent2                 Never connected  unknown
        ---------------------------------------------------------------

* Get all agents reporting to a node
    .. code-block:: shell

        # /var/ossec/bin/cluster_control -a -fn node02
        ------------------------------------
        ID   Address  Name    Status  Node
        ------------------------------------
        001  any      agent1  Active  node02
        ------------------------------------

* Get all active disconnected reporting to a node
    .. code-block:: shell

        # /var/ossec/bin/cluster_control -a -fn node02 -fs Disconnected
        -------------------------------
        ID  Address  Name  Status  Node
        -------------------------------
        -------------------------------

        Found 0 agent(s) with status 'Disconnected'.
