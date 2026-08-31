.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The cluster_control tool retrieves information about the Wazuh manager cluster. Learn more about it in this section of the documentation.

.. _cluster_control:

cluster_control
================

The ``cluster_control`` tool retrieves information about the Wazuh manager cluster.

Use this tool to list cluster nodes, list registered agents, display the cluster health, and filter results by node name or agent status.

Options
-------

+------------------------------------------------------------+---------------------------------------------------------+
| Option                                                     | Description                                             |
+============================================================+=========================================================+
| -a, --list-agents                                          | Lists the registered agents in the cluster.             |
+------------------------------------------------------------+---------------------------------------------------------+
| -d, --debug                                                | Runs the tool in debug mode.                            |
+------------------------------------------------------------+---------------------------------------------------------+
| -fn [<node> ...], --filter-node [<node> ...]               | Filters the results by one or more node names.          |
+------------------------------------------------------------+---------------------------------------------------------+
| -fs [<status> ...], --filter-agent-status [<status> ...]   | Filters the agent list by one or more agent statuses.   |
+------------------------------------------------------------+---------------------------------------------------------+
| -h, --help                                                 | Displays the help message and exits.                    |
+------------------------------------------------------------+---------------------------------------------------------+
| -i [health], --health [health]                             | Displays information about the cluster health.          |
+------------------------------------------------------------+---------------------------------------------------------+
| -l, --list-nodes                                           | Lists the nodes in the cluster.                         |
+------------------------------------------------------------+---------------------------------------------------------+
| -u, --usage                                                | Displays the command usage information.                 |
+------------------------------------------------------------+---------------------------------------------------------+

Examples
--------

Get all connected nodes:

.. code-block:: console

   # /var/wazuh-manager/bin/cluster_control -l

The command output looks similar to this:

.. code-block:: none
   :class: output

   NAME    TYPE    VERSION  ADDRESS
   node01  master  5.0.0    127.0.0.1

Get agents in cluster

Get all agents:

.. code-block:: console

   # /var/wazuh-manager/bin/cluster_control -a

The command output looks similar to this:

.. code-block:: none
   :class: output

   ID   NAME        IP             STATUS        VERSION  NODE NAME
   003  CentOS      192.168.1.209  disconnected  v5.0.0   node01
   005  MacOS       192.168.1.208  disconnected  v4.14.5  node01
   007  agent1      192.168.1.185  disconnected  v5.0.0   node01
   009  Windows     192.168.1.204  active        v5.0.0   node01
   010  Ubuntu      192.168.1.252  disconnected  v5.0.0   node01
   011  ubuntu2004  192.168.1.252  active        v4.14.7  node01
