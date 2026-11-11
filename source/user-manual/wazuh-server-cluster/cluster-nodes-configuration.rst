.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure the master and worker nodes of a Wazuh manager cluster in the cluster block of wazuh-manager.conf.

Wazuh cluster nodes configuration
=================================

The ``<cluster>`` block of ``/etc/wazuh-manager/wazuh-manager.conf`` configures each node. The block is required: the Wazuh manager doesn't start without it. The package writes a single-node block on every node, with ``node_type`` set to ``master``, a random key, and ``127.0.0.1`` as ``bind_addr`` and node address. Edit that block instead of adding a second one.

The cluster doesn't synchronize ``wazuh-manager.conf``, so edit it on each node. To deploy a new cluster, follow the :ref:`cluster configuration <wazuh_server_master_node>` steps of the installation guide. To add a node to an existing cluster, see :doc:`Adding new Wazuh server nodes </user-manual/wazuh-server-cluster/adding-new-server-nodes/index>`.

Master node
-----------

#. Create the cluster key on the master node and keep the output. The key must be the same on every node:

   .. code-block:: console

      # openssl rand -hex 16

#. Edit the ``<cluster>`` block of ``/etc/wazuh-manager/wazuh-manager.conf``:

   .. code-block:: xml

      <cluster>
        <name>wazuh</name>
        <node_name>master-node</node_name>
        <node_type>master</node_type>
        <key><CLUSTER_KEY></key>
        <port>1516</port>
        <bind_addr><MASTER_NODE_ADDRESS></bind_addr>
        <nodes>
          <node><MASTER_NODE_ADDRESS></node>
        </nodes>
        <hidden>no</hidden>
      </cluster>

   Where:

   -  ``<name>`` is the name of the cluster. Use only letters, digits, ``_`` and ``-``, and the same name on every node.
   -  ``<node_name>`` is the name of this node. Each node needs a unique name, with only letters, digits, ``_`` and ``-``.
   -  ``<node_type>`` is ``master`` or ``worker``. A cluster has exactly one master node.
   -  ``<key>`` is the 32-character key you created. Use letters and digits only.
   -  ``<port>`` is the cluster port, from ``1025`` to ``65534``. It must differ from the other Wazuh manager listener ports.
   -  ``<bind_addr>`` is the address where the master node listens for worker nodes. Worker nodes ignore it. With the default, ``127.0.0.1``, the master node accepts only local connections. Use an address on the management network rather than ``0.0.0.0`` on a host whose other interfaces face Wazuh agents or users.
   -  ``<node>`` is the address of the master node, an IP address or a DNS name. Set it on every node, the master node included. ``localhost``, ``0.0.0.0`` and ``127.0.1.1`` are refused.
   -  ``<hidden>`` has no effect in Wazuh 5.0. Keep the default, ``no``.

   See the :doc:`cluster </user-manual/reference/wazuh-manager-conf/cluster>` reference for every option.

#. Check the configuration, then restart the Wazuh manager:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-control check
      # systemctl restart wazuh-manager

Worker node
-----------

#. Edit the ``<cluster>`` block of ``/etc/wazuh-manager/wazuh-manager.conf``. Set a unique ``<node_name>``, ``worker`` as ``<node_type>``, and the cluster key of the master node, which is different from the random key the package wrote on this node:

   .. code-block:: xml

      <cluster>
        <name>wazuh</name>
        <node_name>worker-node1</node_name>
        <node_type>worker</node_type>
        <key><CLUSTER_KEY></key>
        <port>1516</port>
        <bind_addr>0.0.0.0</bind_addr>
        <nodes>
          <node><MASTER_NODE_ADDRESS></node>
        </nodes>
        <hidden>no</hidden>
      </cluster>

#. Check the configuration, then restart the Wazuh manager:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-control check
      # systemctl restart wazuh-manager

#. Check that the node joined the cluster:

   .. code-block:: console

      # /var/wazuh-manager/bin/cluster_control -l

   The command returns output similar to the following:

   .. code-block:: none
      :class: output

      NAME          TYPE    VERSION  ADDRESS
      master-node   master  5.0.0    10.0.0.3
      worker-node1  worker  5.0.0    10.0.0.4

   If the worker node isn't listed, check ``/var/wazuh-manager/logs/cluster.log`` on the worker node and the master node. See :doc:`How the Wazuh server cluster works </user-manual/wazuh-server-cluster/how-server-cluster-works>` for the refusal errors.

The Wazuh manager API runs only on the master node, so port 55000 doesn't answer on a worker node.
