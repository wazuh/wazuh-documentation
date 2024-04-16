.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the cluster node configuration in Wazuh: master and worker nodes, labels, Filebeat, Splunk forwarder installation, and more. 

Wazuh server cluster
====================

.. toctree::
   :maxdepth: 1
   :hidden:

   basics
   advanced-settings
   cluster-management

.. _gt-cluster:

Cluster nodes configuration
---------------------------

The Wazuh cluster is made up of manager type nodes. Only one of them will take the master role, the others will take the worker role. For both node types, the configuration file ``/var/ossec/etc/ossec.conf`` contains the cluster configuration values. Within the labels ``<cluster>...</cluster>`` the following configuration values can be set:

-  :ref:`name <cluster_name>`: Name that will be assigned to the cluster
-  :ref:`node_name <cluster_node_name>`: Name of the current node
-  :ref:`key <cluster_key>`: The key must be 32 characters long and should be the same for all of the cluster nodes. You may use the following command to generate a random one:

      .. code-block:: console

         # openssl rand -hex 16

- :ref:`node_type <cluster_node_type>`: Set the node type (master/worker)
- :ref:`port <cluster_port>`: Destination port for cluster communication
- :ref:`bind_addr <cluster_bind_addr>`: IP address where this node is listening to (0.0.0.0 any IP)
- :ref:`nodes <cluster_nodes>`: The address of the **master** , it must be specified in all nodes (including the master itself). The address can be either an IP or a DNS.
- :ref:`hidden <cluster_hidden>`: Toggles whether or not to show information about the cluster that generated an alert.
- :ref:`disabled <cluster_disabled>`: Indicates whether the node will be enabled or not in the cluster.

We are going to configure a cluster with a master node and a single worker node, for the **master node** we set the following configuration:

.. code-block:: xml

   <cluster>
       <name>wazuh</name>
       <node_name>master-node</node_name>
       <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
       <node_type>master</node_type>
       <port>1516</port>
       <bind_addr>0.0.0.0</bind_addr>
       <nodes>
           <node>master</node>
       </nodes>
       <hidden>no</hidden>
       <disabled>no</disabled>
   </cluster>

Restart the master node:

.. code-block:: console

   # systemctl restart wazuh-manager

Now it's time to configure the **worker node**:

.. code-block:: xml

   <cluster>
       <name>wazuh</name>
       <node_name>worker01-node</node_name>
       <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
       <node_type>worker</node_type>
       <port>1516</port>
       <bind_addr>0.0.0.0</bind_addr>
       <nodes>
           <node>master</node>
       </nodes>
       <hidden>no</hidden>
       <disabled>no</disabled>
   </cluster>

Restart the worker node:

.. code-block:: console

   # systemctl restart wazuh-manager

Let's execute the following command (works on both worker and master nodes) to check that everything worked as expected:

.. code-block:: console

   # /var/ossec/bin/cluster_control -l

.. code-block:: none
   :class: output

   NAME           TYPE    VERSION  ADDRESS
   master-node    master  |WAZUH_CURRENT|   wazuh-master
   worker01-node  worker  |WAZUH_CURRENT|   172.22.0.3

Forwarder installation
----------------------

-  The apps must be configured to point to the master's API.
-  All manager nodes need an event forwarder in order to send data to Elasticsearch or Splunk. Install **Filebeat** if you're using the **Elastic Stack** or **Splunk forwarder** if you're using **Splunk**. This is only necessary if the node is in a separate instance from Elasticsearch or Splunk.

Installing Filebeat
^^^^^^^^^^^^^^^^^^^

+---------------------------------------------------------------------+------------------------------------------------+
| Type                                                                | Description                                    |
+=====================================================================+================================================+
| :ref:`Wazuh single node cluster<wazuh_server_multi_node_filebeat>`  | Install Filebeat on Wazuh single node cluster. |
+---------------------------------------------------------------------+------------------------------------------------+
| :ref:`Wazuh multi node cluster<wazuh_server_multi_node_filebeat>`   | Install Filebeat on Wazuh multi node cluster.  |
+---------------------------------------------------------------------+------------------------------------------------+


Installing Splunk forwarder
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. |V4.5_SPLUNK_FWD| replace:: `RPM/DEB packages – Version 4.5 <https://documentation.wazuh.com/4.5/deployment-options/splunk/splunk-install.html>`__

+--------------------+-------------------------------------------------------------+
| Type               | Description                                                 |
+====================+=============================================================+
| |V4.5_SPLUNK_FWD|  | Install Splunk forwarder for RPM and DEB based OS.          |
+--------------------+-------------------------------------------------------------+

.. _deploy_wazuh_agents_cluster:

Pointing agents to the cluster nodes
------------------------------------

Finally, the configuration of the agents has to be modified in order to report to the cluster. In this case, agent 001 will report to the worker01-node node. To achieve this, we must modify the information contained in the labels ``<client><server>`` in the file ``/var/ossec/etc/ossec.conf``, where we will place the IP address of the node we want to report to, in our case, it would look like this:

.. code-block:: xml

   <client>
       <server>
           <address>WORKER01_NODE_IP</address>
           ...
       </server>
   </client>

Restart the agent:

.. code-block:: console

   # systemctl restart wazuh-agent

The second agent will report to the master-node node. For this, we will place the IP address of our master in the agent configuration, as we have seen in the previous case:

.. code-block:: xml

   <client>
       <server>
           <address>MASTER_NODE_IP</address>
           ...
       </server>
   </client>

Restart the agent:

.. code-block:: console

   # systemctl restart wazuh-agent


Execute the following command on the ``master node`` to verify that the Wazuh agents are correctly connected:

.. code-block:: console

   # /var/ossec/bin/agent_control -l

.. code-block:: none
   :class: output

   Wazuh agent_control. List of available agents:
       ID: 000, Name: agent000 (server), IP: 127.0.0.1, Active/Local
       ID: 001, Name: agent001, IP: 172.18.0.5, Active
       ID: 002, Name: agent002, IP: 172.18.0.6, Active

.. note::

   We recommend using a :ref:`load balancer <load_balancer>` for registering and connecting the agents. This way, the agents will be able to be registered and report to the nodes in a distributed way, and it will be the load balancer who assigns which worker they will report to. Using this option we can better distribute the load, and in case of a fall in some worker node, its agents will **reconnect** to another one.
