.. Copyright (C) 2020 Wazuh, Inc.

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
          <node>wazuh-master-address</node>
      </nodes>
      <hidden>no</hidden>
      <disabled>no</disabled>
  </cluster>

As shown in the example above, the following parameters have to be amended:

- :ref:`node_type <cluster_node_type>` has to be set as ``worker``,

- :ref:`node_name <cluster_node_name>` has to be given (different in every node),

- the previously generated :ref:`key <cluster_key>` has to be add (same for all nodes),

- :ref:`nodes <cluster_nodes>` has to contain the address of the master (it can be either an IP or a DNS),

- :ref:`disabled <cluster_disabled>` has to be set to ``no``.

.. End of include file
