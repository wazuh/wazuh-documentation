.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the cluster configuration section of wazuh-manager.conf, which configures communication and synchronization between Wazuh manager nodes.

.. _reference_wazuh_manager_conf_cluster:

cluster
=======

.. topic:: XML section name

   .. code-block:: xml

      <cluster>
      </cluster>

The ``<cluster>`` section configures communication and synchronization between Wazuh manager nodes.

A Wazuh manager cluster consists of one master node and one or more worker nodes. The master coordinates cluster membership and synchronization, while workers process agent connections and workloads.

Options
-------

- `name`_
- `node_name`_
- `node_type`_
- `key`_
- `port`_
- `bind_addr`_
- `nodes`_
- `hidden`_

name
^^^^

Specifies the name of the cluster this node belongs to. All nodes in the same cluster must use the same value.

+----------------------+------------+
| **Default value**    | wazuh      |
+----------------------+------------+
| **Allowed values**   | Any name   |
+----------------------+------------+

node_name
^^^^^^^^^^

Specifies the name of the current node of the cluster. Each node of the cluster must have a unique name. If two nodes share the same name, one of them will be rejected.

+----------------------+------------+
| **Default value**    | node01     |
+----------------------+------------+
| **Allowed values**   | Any name   |
+----------------------+------------+

node_type
^^^^^^^^^^

Specifies the role of the current node. A Wazuh manager cluster supports one master node. All remaining nodes must be configured as workers.

+----------------------+------------------+
| **Default value**    | master           |
+----------------------+------------------+
| **Allowed values**   | master, worker   |
+----------------------+------------------+

key
^^^

Specifies the shared key used to authenticate cluster nodes and protect cluster communication. All nodes in the cluster must use the same key.

+----------------------+------------------------------------------------------+
| **Default value**    | Value randomly generated during node installation.   |
+----------------------+------------------------------------------------------+
| **Allowed values**   | Letters, digits, and underscores (32 characters)     |
+----------------------+------------------------------------------------------+

**Generate a suitable key with:**

.. code-block:: console

   $ openssl rand -hex 16

To share the key across the cluster, read it on the master node:

.. code-block:: console

   $ sed -n 's|.*<key>\(.*\)</key>.*|\1|p' /var/wazuh-manager/etc/wazuh-manager.conf

Then set that value on each worker node and restart the manager:

.. code-block:: console

   $ sudo sed -i 's|<key>.*</key>|<key>PASTE_MASTER_KEY_HERE</key>|' /var/wazuh-manager/etc/wazuh-manager.conf
   $ sudo systemctl restart wazuh-manager

Treat the cluster key as a credential. Do not include it in scripts, source control, documentation examples, or command history.

port
^^^^

Specifies the port to use for the cluster node communications.

+----------------------+---------------------------------------------------------+
| **Default value**    | 1516                                                    |
+----------------------+---------------------------------------------------------+
| **Allowed values**   | Any port number higher than 1024 and lower than 65535   |
+----------------------+---------------------------------------------------------+

bind_addr
^^^^^^^^^^

Specifies which IP address will communicate with the cluster when the node has multiple network interfaces.

+----------------------+------------------------+
| **Default value**    | 127.0.0.1              |
+----------------------+------------------------+
| **Allowed values**   | Any valid IP address   |
+----------------------+------------------------+

nodes
^^^^^

Lists all master nodes in the cluster using the ``<node>`` tag for each one.

+----------------------+---------------------------------------------------+
| **Default value**    | 127.0.0.1                                         |
+----------------------+---------------------------------------------------+
| **Allowed values**   | Any valid address (IP or DNS) of a cluster node   |
+----------------------+---------------------------------------------------+

The current cluster only allows one master node. Therefore, this list must have only one element. If more elements are found, the first one will be used as master, and the rest will be ignored.

hidden
^^^^^^

Toggles whether or not to show information about the cluster that generated an alert. If this is set to ``yes``, information about the cluster that generated the event won't be included in the alert.

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

.. note::
   Note for users migrating from Wazuh 4.x: The ``<disabled>`` option present in 4.x cluster configuration is no longer processed in 5.0. Cluster enable/disable is controlled at the service level; to disable the cluster, stop or disable the ``wazuh-manager-clusterd`` service. If ``<disabled>`` is present in the configuration file, it is silently ignored.

Sample configuration
---------------------

Master node
^^^^^^^^^^^^

.. code-block:: xml

   <cluster>
     <name>wazuh</name>
     <node_name>master-node</node_name>
     <node_type>master</node_type>
     <key>c98b62a9b6169ac5f67dfe55b73a8d2a</key>
     <port>1516</port>
     <bind_addr>0.0.0.0</bind_addr>
     <nodes>
       <node><MASTER_NODE_IP_ADDRESS></node>
     </nodes>
     <hidden>no</hidden>
   </cluster>

Replace ``<MASTER_NODE_IP_ADDRESS>`` with the actual IP address of the master node.

Worker node
^^^^^^^^^^^^

.. code-block:: xml

   <cluster>
     <name>wazuh</name>
     <node_name>worker-node-01</node_name>
     <node_type>worker</node_type>
     <key>c98b62a9b6169ac5f67dfe55b73a8d2a</key>
     <port>1516</port>
     <bind_addr>0.0.0.0</bind_addr>
     <nodes>
       <node><MASTER_NODE_IP_ADDRESS></node>
     </nodes>
     <hidden>no</hidden>
   </cluster>

Replace ``<MASTER_NODE_IP_ADDRESS>`` with the actual IP address of the master node, and use a unique ``node_name`` for each worker.

Applying configuration changes
--------------------------------

After editing ``/var/wazuh-manager/etc/wazuh-manager.conf`` on each node, restart the manager service:

.. code-block:: console

   $ systemctl restart wazuh-manager

Verify cluster status:

.. code-block:: console

   $ /var/wazuh-manager/bin/cluster_control -l

The command output looks similar to this:

.. code-block:: none
   :class: output

   NAME              TYPE    VERSION  ADDRESS
   master-node       master  5.x.x    10.0.1.10
   worker-node-01    worker  5.x.x    10.0.1.11
