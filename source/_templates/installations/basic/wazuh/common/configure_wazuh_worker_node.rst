.. Copyright (C) 2015, Wazuh, Inc.

Configure the cluster node by editing the following settings in ``/var/ossec/etc/ossec.conf``:

.. code-block:: xml

  <cluster>
      <name>wazuh</name>
      <node_name>worker-node</node_name>
      <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
      <node_type>worker</node_type>
      <port>1516</port>
      <bind_addr>0.0.0.0</bind_addr>
      <nodes>
          <node>WAZUH-MASTER-ADDRESS</node>
      </nodes>
      <hidden>no</hidden>
      <disabled>no</disabled>
  </cluster>

As shown in the example above, the following parameters have to be edited:

+-------------------------------------+------------------------------------------------------------------------------------------------------+
| :ref:`node_name <cluster_node_name>`| Each node of the cluster must have a unique name.                                                    |
+-------------------------------------+------------------------------------------------------------------------------------------------------+
| :ref:`node_type <cluster_node_type>`| Has to be set as a ``worker``.                                                                       |
+-------------------------------------+------------------------------------------------------------------------------------------------------+
| :ref:`key <cluster_key>`            | The key created previously for the ``master`` node. It has to be the same for all the nodes.         |
+-------------------------------------+------------------------------------------------------------------------------------------------------+
| :ref:`nodes <cluster_nodes>`        | Has to contain the address of the master (it can be either an IP or a DNS).                          |
+-------------------------------------+------------------------------------------------------------------------------------------------------+
| :ref:`disabled <cluster_disabled>`  | Has to be set to ``no``.                                                                             |
+-------------------------------------+------------------------------------------------------------------------------------------------------+

.. End of include file
