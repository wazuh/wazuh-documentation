.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure a Wazuh server cluster with a master node and a single worker node in this section of the documentation.

Wazuh cluster nodes configuration
=================================

In a Wazuh server cluster, there can only be one master node in a cluster while all other Wazuh servers are the worker nodes. For both node types, the configuration file ``/var/ossec/etc/ossec.conf`` contains the cluster configuration values. We show how to configure a cluster with a master node and a single worker node.

Master node
-----------

#. For the Wazuh server master node, set the following configuration within the ``<cluster>`` block in the configuration file ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml

      <cluster>
          <name>wazuh</name>
          <node_name>master-node</node_name>
          <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
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
   -  ``<node_name>`` is the name of the current node.
   -  ``<key>`` is a unique 32-characters long key and should be the same for all of the cluster nodes. We generate a unique key with the command ``openssl rand -hex 16``.
   -  ``<node_type>`` sets the node type to either ``master`` or ``worker``.
   -  ``<port>`` is the destination port for cluster communication.
   -  ``<bind_addr>`` is the IP address where the node is listening to (0.0.0.0 any IP).
   -  ``<node>`` specifies the address of the master node within the ``<nodes>`` block and this must be specified in all nodes including the master node itself. The address can be either an IP or a DNS.
   -  ``<hidden>`` toggles whether or not to show information about the cluster that generated an alert.
   -  ``<disabled>`` indicates whether the node will be enabled or not in the cluster.

   You can learn more about the available configuration options in the :doc:`cluster </user-manual/reference/ossec-conf/cluster>` reference guide.

#. Restart the master node to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

Worker node
-----------

#. For the Wazuh server worker node, within the ``<cluster>...</cluster>`` in the configuration file ``/var/ossec/etc/ossec.conf`` we set the following configuration.

   .. code-block:: xml

      <cluster>
        <name>wazuh</name>
        <node_name>worker01-node</node_name>
        <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
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

   .. code-block: console

      # systemctl restart wazuh-manager

#. Execute the following command to check that everything worked as expected:

   .. code-block:: console

      # /var/ossec/bin/cluster_control -l

   .. note::

      The command above can be executed on either a master or worker node.

   .. code-block:: none
      :class: output

      NAME           TYPE    VERSION  ADDRESS
      master-node    master  4.8.0   wazuh-master
      worker01-node  worker  4.8.0   172.22.0.3
