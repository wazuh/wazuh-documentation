.. Copyright (C) 2019 Wazuh, Inc.

Configure the cluster mode by editing the following settings in ``/var/ossec/etc/ossec.conf``:

.. code-block:: xml

  <cluster>
      <name>wazuh</name>
      <node_name>worker-node</node_name>
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

As you can see in the previous example, you have to set the :ref:`node_type <cluster_node_type>` as ``worker``, give a name in :ref:`node_name <cluster_node_name>` (it has to be different in every node), the previously generated :ref:`key <cluster_key>` (it has to be the same for all nodes), the setting of the :ref:`nodes <cluster_nodes>` has to contain the master address (it can be either an IP or a DNS), and :ref:`disabled <cluster_disabled>` to ``no``.


.. End of include file
