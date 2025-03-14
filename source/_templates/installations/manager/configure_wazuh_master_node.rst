.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: xml

  <cluster>
    <name>wazuh</name>
    <node_name>master-node</node_name>
    <node_type>master</node_type>
    <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
    <port>1516</port>
    <bind_addr>0.0.0.0</bind_addr>
    <nodes>
      <node><WAZUH_MASTER_ADDRESS></node>
    </nodes>
    <hidden>no</hidden>
    <disabled>no</disabled>
  </cluster>

Parameters to be configured:

+-------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|:ref:`name <cluster_name>`           | It indicates the name of the cluster.                                                                                                                                                                                                        |
+-------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|:ref:`node_name <cluster_node_name>` | It indicates the name of the current node.                                                                                                                                                                                                   |
+-------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|:ref:`node_type <cluster_node_type>` | It specifies the role of the node. It has to be set to ``master``.                                                                                                                                                                           |
+-------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|:ref:`key <cluster_key>`             | Key that is used to encrypt communication between cluster nodes. The key must be 32 characters long and the same for all of the nodes in the cluster. The following command can be used to generate a random key: ``openssl rand -hex 16``.  |
+-------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|:ref:`port <cluster_port>`           | It indicates the destination port for cluster communication.                                                                                                                                                                                 |
+-------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|:ref:`bind_addr <cluster_bind_addr>` | It is the network IP to which the node is bound to listen for incoming requests (0.0.0.0 for any IP).                                                                                                                                        |
+-------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|:ref:`nodes <cluster_nodes>`         | It is the address of the ``master node`` and can be either an IP or a DNS. This parameter must be specified in all nodes, including the master itself.                                                                                       |
+-------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|:ref:`hidden <cluster_hidden>`       | It shows or hides the cluster information in the generated alerts.                                                                                                                                                                           |
+-------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|:ref:`disabled <cluster_disabled>`   | It indicates whether the node is enabled or disabled in the cluster.  This option must be set to ``no``.                                                                                                                                     |                                          
+-------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

.. End of include file
