.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Manage the Wazuh cluster from any manager using the cluster_control program. Learn more about it in this section of the Wazuh documentation.
  
.. _cluster_control:

cluster_control
===============

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
    .. code-block:: console

        # /var/ossec/bin/cluster_control -i

    .. code-block:: none
        :class: output

        Cluster name: wazuh

        Last completed synchronization for connected nodes (3):
        node02 (192.168.56.103): Integrity check: 2023-03-28T15:34:38.801440Z | Integrity sync: 2023-03-28T15:33:53.499310Z | Agents-info: 2023-03-28T15:34:16.094609Z | Last keep alive: 2023-03-28T15:33:53.379383Z | Agent-groups: 2023-03-28T15:34:33.444899Z | Agent-groups full: n/a.
        node03 (192.168.56.105): Integrity check: 2023-03-28T15:34:31.521853Z | Integrity sync: 2023-03-28T15:33:48.943411Z | Agents-info: 2023-03-28T15:34:27.082314Z | Last keep alive: 2023-03-28T15:33:54.379334Z | Agent-groups: 2023-03-28T15:34:32.321787Z | Agent-groups full: n/a.

* Extended version
    .. code-block:: console

        # /var/ossec/bin/cluster_control -i more

    .. code-block:: none
        :class: output

        Cluster name: wazuh

        Connected nodes (3):

        node01 (192.168.56.101)
            Version: |WAZUH_CURRENT|
            Type: master
            Active agents: 1

        node02 (192.168.56.103)
            Version: |WAZUH_CURRENT|
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
                Agents-groups:
                        Last synchronization: 0.001s (2018-05-15 17:28:33.35 - 2018-05-15 17:28:33.35).
                        Number of synchronized chunks: 1.
                Agents-groups full:
                        Last synchronization: n/a (n/a - n/a).
                        Number of synchronized chunks: 0.

        node03 (192.168.56.105)
            Version: |WAZUH_CURRENT|
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
                Agents-groups:
                        Last synchronization: 0.001s (2018-05-15 17:28:33.35 - 2018-05-15 17:28:33.35).
                        Number of synchronized chunks: 1.
                Agents-groups full:
                        Last synchronization: n/a (n/a - n/a).
                        Number of synchronized chunks: 0.

* Getting healthcheck of multiple nodes
    .. code-block:: console

        # /var/ossec/bin/cluster_control -i more -fn node02 node01

    .. code-block:: none
        :class: output

        Cluster name: wazuh

        Connected nodes (3):

        node01 (192.168.56.101)
            Version: |WAZUH_CURRENT|
            Type: master
            Active agents: 1

        node02 (192.168.56.103)
            Version: |WAZUH_CURRENT|
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
                Agents-groups:
                        Last synchronization: 0.001s (2018-05-15 17:28:33.35 - 2018-05-15 17:28:33.35).
                        Number of synchronized chunks: 1.
                Agents-groups full:
                        Last synchronization: n/a (n/a - n/a).
                        Number of synchronized chunks: 0.


Get connected nodes
^^^^^^^^^^^^^^^^^^^

* Get all connected nodes
    .. code-block:: console

        # /var/ossec/bin/cluster_control -l

    .. code-block:: none
        :class: output

        NAME      TYPE    VERSION  ADDRESS
        worker-1  worker  |WAZUH_CURRENT|    172.17.0.101
        worker-2  worker  |WAZUH_CURRENT|    172.17.0.102
        master    master  |WAZUH_CURRENT|    172.17.0.100

* Filter connected nodes by name
    .. code-block:: console

        # /var/ossec/bin/cluster_control -l -fn master worker-1

    .. code-block:: none
        :class: output

        NAME      TYPE    VERSION  ADDRESS
        worker-1  worker  |WAZUH_CURRENT|    172.17.0.101
        master    master  |WAZUH_CURRENT|    172.17.0.100

Get agents in cluster
^^^^^^^^^^^^^^^^^^^^^

* Get all agents
    .. code-block:: console

        # /var/ossec/bin/cluster_control -a

    .. code-block:: none
        :class: output

        NAME    IP         ID   STATUS  VERSION       NODE NAME
        master  127.0.0.1  000  Active  Wazuh v|WAZUH_CURRENT|  master
        agent1  any        001  Active  Wazuh v|WAZUH_CURRENT|  worker-2

* Get all agents reporting to a node
    .. code-block:: console

        # /var/ossec/bin/cluster_control -a -fn worker-2

    .. code-block:: none
        :class: output

        NAME    IP         ID   STATUS  VERSION       NODE NAME
        agent1  any        001  Active  Wazuh v|WAZUH_CURRENT|  worker-2

* Get all active disconnected reporting to a node
    .. code-block:: console

        # /var/ossec/bin/cluster_control -a -fn node02 -fs Disconnected

    .. code-block:: none
        :class: output

        NAME    IP         ID   STATUS  VERSION       NODE NAME
