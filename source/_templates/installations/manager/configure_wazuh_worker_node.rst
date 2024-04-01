.. Copyright (C) 2015, Wazuh, Inc.

Configure the cluster node by editing the following settings in the ``/var/ossec/etc/ossec.conf`` file.

.. code-block:: xml

  <cluster>
      <name>wazuh</name>
      <node_name>worker-node</node_name>
      <node_type>worker</node_type>
      <key>c98b62a9b6169ac5f67dae55ae4a9088</key>      
      <port>1516</port>
      <bind_addr>0.0.0.0</bind_addr>
      <nodes>
          <node>WAZUH-MASTER-ADDRESS</node>
      </nodes>
      <hidden>no</hidden>
      <disabled>no</disabled>
  </cluster>

Parameters to be configured:

+-------------------------------------+-------------------------------------------------------------------------------------------------+
| :ref:`name <cluster_name>`          | It indicates the name of the cluster.                                                           |
+-------------------------------------+-------------------------------------------------------------------------------------------------+
| :ref:`node_name <cluster_node_name>`| It indicates the name of the current node. Each node of the cluster must have a unique name.    |
+-------------------------------------+-------------------------------------------------------------------------------------------------+
| :ref:`node_type <cluster_node_type>`| It specifies the role of the node. It has to be set as ``worker``.                              |
+-------------------------------------+-------------------------------------------------------------------------------------------------+
| :ref:`key <cluster_key>`            | The key created previously for the ``master`` node. It has to be the same for all the nodes.    |
+-------------------------------------+-------------------------------------------------------------------------------------------------+
| :ref:`nodes <cluster_nodes>`        | It has to contain the address of the ``master node`` and can be either an IP or a DNS.          |
+-------------------------------------+-------------------------------------------------------------------------------------------------+
| :ref:`disabled <cluster_disabled>`  | It indicates whether the node is enabled or disabled in the cluster. It has to be set to ``no``.|
+-------------------------------------+-------------------------------------------------------------------------------------------------+

.. End of include file
