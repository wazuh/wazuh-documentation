.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure a Wazuh server cluster with a master node and a single worker node in this section of the documentation.

Wazuh cluster nodes configuration
=================================

There can only be one master node in a cluster, while all other Wazuh servers are the worker nodes. For both node types, the configuration file ``/var/ossec/etc/ossec.conf`` contains the cluster configuration values.

The following section shows how to configure a cluster with a master node and a single worker node configuration example.

.. note::

   Configuration changes to the ``/var/ossec/etc/ossec.conf`` file on the master node is not automatically synchronized to the worker nodes. Manually replicate the configuration and restart the nodes to apply the changes.

Master node
-----------

Before configuring the cluster, generate a unique 32-character hexadecimal key. This key must be the same on all nodes (master and workers) in the cluster. We generate a unique key with the command ``openssl rand -hex 16``.

#. Set the following configuration in the ``<cluster>`` block of ``/var/ossec/etc/ossec.conf`` on the Wazuh server master node:

   .. code-block:: xml

      <cluster>
          <name>wazuh</name>
          <node_name>master-node</node_name>
          <key>756c70a151ad0b73b20e9f8cd37fe24c</key>
          <node_type>master</node_type>
          <port>1516</port>
          <bind_addr>0.0.0.0</bind_addr>
          <nodes>
              <node><MASTER_NODE_IP_ADDRESS></node>
          </nodes>
          <hidden>no</hidden>
          <disabled>no</disabled>
      </cluster>

   Where:

   -  ``<name>`` is the name that will be assigned to the cluster.
   -  ``<node_name>`` is the name of the current Wazuh server node.
   -  ``<key>`` is a unique 32-character key generated before configuring the cluster and must be the same on all cluster nodes.
   -  ``<node_type>`` sets the Wazuh server node type to either ``master`` or ``worker``.
   -  ``<port>`` is the destination port for cluster communication.
   -  ``<bind_addr>`` is the IP address where the Wazuh server node is listening to (0.0.0.0 or any IP address).
   -  ``<node>`` specifies the address of the master node within the ``<nodes>`` block, and this must be specified in all Wazuh server nodes, including the master node itself. The address can be either an IP address or a DNS.
   -  ``<hidden>`` toggles whether or not to show information about the cluster that generated an alert.
   -  ``<disabled>`` indicates whether the Wazuh server is enabled or not in the cluster.

   You can learn more about the available configuration options in the :doc:`cluster </user-manual/reference/ossec-conf/cluster>` reference guide.

#. Restart the master node to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

Worker node
-----------

#. Set the following configuration in the ``<cluster>`` block of ``/var/ossec/etc/ossec.conf`` on the Wazuh server worker node.

   .. code-block:: xml

      <cluster>
        <name>wazuh</name>
        <node_name>worker01-node</node_name>
        <key>756c70a151ad0b73b20e9f8cd37fe24c</key>
        <node_type>worker</node_type>
        <port>1516</port>
        <bind_addr>0.0.0.0</bind_addr>
        <nodes>
            <node><MASTER_NODE_IP_ADDRESS></node>
        </nodes>
        <hidden>no</hidden>
        <disabled>no</disabled>
      </cluster>

#. Restart the worker node to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

#. Execute the following command to check that everything worked as expected:

   .. code-block:: console

      # /var/ossec/bin/cluster_control -l

   .. code-block:: none
      :class: output

      NAME     TYPE    VERSION  ADDRESS
      wazuh-1  master  4.14.2   10.0.0.9
      wazuh-2  worker  4.14.2   10.0.0.10
