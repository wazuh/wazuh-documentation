.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Manage the Wazuh cluster from any manager using the cluster_control program. Learn more about it in this section of the Wazuh documentation.

cluster_control
===============

The cluster_control program allows you to manage the cluster from any manager. It is necessary that ``wazuh-clusterd`` is running
in order to use this tool.

cluster_control options
-----------------------

+---------------------------------------------+---------------------------------------------------+
| Option name                                 | Option description                                |
+=============================================+===================================================+
| ``-h``, ``--help``                          | Display the help message.                         |
+---------------------------------------------+---------------------------------------------------+
| ``-i``, ``--health [more] [-fs]``           | Display the cluster's healthcheck.                |
+---------------------------------------------+---------------------------------------------------+
| ``-l``, ``--list-nodes [-fn]``              | Display connected nodes in the cluster.           |
+---------------------------------------------+---------------------------------------------------+
| ``-d``, ``--debug``                         | Show debug messages.                              |
+---------------------------------------------+---------------------------------------------------+
| ``-a``, ``--list-agents [-fs] [-fn]``       | Display agents in the cluster.                    |
+---------------------------------------------+---------------------------------------------------+
| ``-fn``, ``--filter-node [NODE_NAME]``      | Display information of specified node(s) only     |
+---------------------------------------------+---------------------------------------------------+
| ``-fs``, ``--filter-agent-status [STATUS]`` | Display agents with the specified status(es) only |
+---------------------------------------------+---------------------------------------------------+

Examples
--------

Get cluster's healthcheck
^^^^^^^^^^^^^^^^^^^^^^^^^^^

-  **Summarized version**

   .. code-block:: console

      # /var/ossec/bin/cluster_control -i

   .. code-block:: none
      :class: output

      Cluster name: wazuh_cluster

      Last completed synchronization for connected nodes (2):
          wazuh-2 (172.16.1.14): Integrity check: 2025-08-18T17:10:41.432055Z | Integrity sync: 2025-08-18T17:05:07.390796Z | Agents-info: 2025-08-18T17:10:40.847664Z | Agent-groups: n/a | Agent-groups full: 2025-08-18T17:05:23.954292Z | Last keep alive: 2025-08-18T17:10:40.325416Z.
          wazuh-3 (172.16.1.15): Integrity check: 2025-08-18T17:10:41.005503Z | Integrity sync: 2025-08-18T17:05:07.015033Z | Agents-info: n/a | Agent-groups: n/a | Agent-groups full: 2025-08-18T17:05:23.954485Z | Last keep alive: 2025-08-18T17:10:39.970344Z.

-  **Extended version**

   .. code-block:: console

      # /var/ossec/bin/cluster_control -i more

   .. code-block:: none
      :class: output

      Cluster name: wazuh_cluster

      Connected nodes (2):

          wazuh-1 (172.16.1.13)
              Version: 4.12.0
              Type: master
              Active agents: 1

          wazuh-2 (172.16.1.14)
              Version: 4.12.0
              Type: worker
              Active agents: 1
              Status:
                  Last keep Alive:
                      Last received: 2025-08-18T17:05:40.275469Z.
                  Integrity check:
                      Last integrity check: 0.013s (2025-08-18T17:06:28.638405Z - 2025-08-18T17:06:28.651010Z).
                      Permission to check integrity: True.
                  Integrity sync:
                      Last integrity synchronization: 0.015s (2025-08-18T17:05:07.376177Z - 2025-08-18T17:05:07.390796Z).
                      Synchronized files: Shared: 1 | Missing: 0 | Extra: 0.
                  Agents-info:
                      Last synchronization: 0.008s (2025-08-18T17:06:20.389530Z - 2025-08-18T17:06:20.397984Z).
                      Number of synchronized chunks: 1.
                      Permission to synchronize agent-info: True.
                  Agents-groups:
                      Last synchronization: n/a (2025-08-18T17:06:24.011490Z - n/a).
                      Number of synchronized chunks: 0.
                  Agents-groups full:
                      Last synchronization: 0.01s (2025-08-18T17:05:23.944439Z - 2025-08-18T17:05:23.954292Z).
                      Number of synchronized chunks: 1.

          wazuh-3 (172.16.1.15)
              Version: 4.12.0
              Type: worker
              Active agents: 0
              Status:
                  Last keep Alive:
                      Last received: 2025-08-18T17:05:39.950325Z.
                  Integrity check:
                      Last integrity check: 0.014s (2025-08-18T17:06:28.238423Z - 2025-08-18T17:06:28.252409Z).
                      Permission to check integrity: True.
                  Integrity sync:
                      Last integrity synchronization: 0.003s (2025-08-18T17:05:07.011863Z - 2025-08-18T17:05:07.015033Z).
                      Synchronized files: Shared: 1 | Missing: 0 | Extra: 0.
                  Agents-info:
                      Last synchronization: n/a (n/a - n/a).
                      Number of synchronized chunks: 0.
                      Permission to synchronize agent-info: True.
                  Agents-groups:
                      Last synchronization: n/a (2025-08-18T17:06:24.009932Z - n/a).
                      Number of synchronized chunks: 0.
                  Agents-groups full:
                      Last synchronization: 0.008s (2025-08-18T17:05:23.946172Z - 2025-08-18T17:05:23.954485Z).
                      Number of synchronized chunks: 1.

-  **Getting healthcheck of multiple nodes**

   .. code-block:: console

      # /var/ossec/bin/cluster_control -i more -fn wazuh-2 wazuh-1

   .. code-block:: none
      :class: output

      Cluster name: wazuh_cluster

      Connected nodes (1):

          wazuh-1 (172.16.1.13)
              Version: 4.12.0
              Type: master
              Active agents: 1

          wazuh-2 (172.16.1.14)
              Version: 4.12.0
              Type: worker
              Active agents: 1
              Status:
                  Last keep Alive:
                      Last received: 2025-08-18T17:13:40.354898Z.
                  Integrity check:
                      Last integrity check: 0.004s (2025-08-18T17:14:00.037058Z - 2025-08-18T17:14:00.040772Z).
                      Permission to check integrity: True.
                  Integrity sync:
                      Last integrity synchronization: 0.015s (2025-08-18T17:05:07.376177Z - 2025-08-18T17:05:07.390796Z).
                      Synchronized files: Shared: 1 | Missing: 0 | Extra: 0.
                  Agents-info:
                      Last synchronization: 0.008s (2025-08-18T17:14:01.197572Z - 2025-08-18T17:14:01.205289Z).
                      Number of synchronized chunks: 1.
                      Permission to synchronize agent-info: True.
                  Agents-groups:
                      Last synchronization: n/a (2025-08-18T17:14:04.406802Z - n/a).
                      Number of synchronized chunks: 0.
                  Agents-groups full:
                      Last synchronization: 0.01s (2025-08-18T17:05:23.944439Z - 2025-08-18T17:05:23.954292Z).
                      Number of synchronized chunks: 1.

Get connected nodes
^^^^^^^^^^^^^^^^^^^

-  **Get all connected nodes**

   .. code-block:: console

      # /var/ossec/bin/cluster_control -l

   .. code-block:: none
      :class: output

      NAME     TYPE    VERSION  ADDRESS      
      wazuh-1  master  4.12.0   172.16.1.13  
      wazuh-3  worker  4.12.0   172.16.1.15  
      wazuh-2  worker  4.12.0   172.16.1.14  

-  **Filter connected nodes by name**

   .. code-block:: console

      # /var/ossec/bin/cluster_control -l -fn wazuh-1 wazuh-3

   .. code-block:: none
      :class: output

      NAME     TYPE    VERSION  ADDRESS      
      wazuh-1  master  4.12.0   172.16.1.13  
      wazuh-3  worker  4.12.0   172.16.1.15  

Get agents in cluster
^^^^^^^^^^^^^^^^^^^^^

-  **Get all agents**

   .. code-block:: console

      # /var/ossec/bin/cluster_control -a

   .. code-block:: none
      :class: output

      ID   NAME         IP           STATUS  VERSION        NODE NAME  
      000  centos8a     127.0.0.1    active  Wazuh v4.12.0  wazuh-1    
      001  ag-centos9s  172.16.1.85  active  Wazuh v4.12.0  wazuh-1    
      002  ag-ubuntu22  172.16.1.83  active  Wazuh v4.12.0  wazuh-2    

-  **Get all agents reporting to a node**

   .. code-block:: console

           # /var/ossec/bin/cluster_control -a -fn wazuh-2

   .. code-block:: none
      :class: output

      ID   NAME         IP           STATUS  VERSION        NODE NAME  
      002  ag-ubuntu22  172.16.1.83  active  Wazuh v4.12.0  wazuh-2    

-  **Get all active disconnected reporting to a node**

   .. code-block:: console

      # /var/ossec/bin/cluster_control -a -fn wazuh-2 -fs Disconnected

   .. code-block:: none
      :class: output

      ID  NAME  IP  STATUS  VERSION  NODE NAME
