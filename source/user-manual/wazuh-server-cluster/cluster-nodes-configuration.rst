.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure the master node and the worker nodes of a Wazuh manager cluster.

Cluster nodes configuration
===========================

A Wazuh manager cluster forms when worker nodes connect to the master node with the same cluster name and key. :ref:`Configure the master node <wazuh_manager_cluster_configure_the_master_node>` first, then each :ref:`worker node <wazuh_manager_cluster_configure_a_worker_node>`, to turn standalone Wazuh managers into one cluster.

Every Wazuh manager already has a ``<cluster>`` section in ``/etc/wazuh-manager/wazuh-manager.conf``. The section is mandatory, and the installer fills it with a random key and the default values for a master node. You edit that section on each node.

The ``<cluster>`` section has no ``<disabled>`` option, because the cluster is always on. The Wazuh manager rejects a ``<cluster>`` section with ``<disabled>`` or any other option outside the schema.

.. note::

   The cluster doesn't synchronize ``/etc/wazuh-manager/wazuh-manager.conf``. Apply configuration changes on each node and restart the node to load them.

For every option of the ``<cluster>`` section, see the :doc:`cluster configuration reference </user-manual/reference/wazuh-manager-conf/cluster>`.

Prerequisites
-------------

Check these items before you edit the configuration of any node.

-  The Wazuh manager is installed on every node, at the same Wazuh version. The master node refuses a worker node with a different version.
-  You have root privileges on every node.
-  Each worker node reaches the master node on TCP port ``1516``.

.. _wazuh_manager_cluster_configure_the_master_node:

Configure the master node
-------------------------

The master node keeps the cluster key that every worker node must use. Configure it first so the worker nodes have a key and an address to connect to.

#. Print the cluster key of the master node:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-conf get cluster.key

   To generate a new key, for example when you write the section by hand, run this command:

   .. code-block:: console

      # openssl rand -hex 16

   -  Keep the output. You need the same key on every worker node.

#. Edit the ``<cluster>`` section of ``/etc/wazuh-manager/wazuh-manager.conf`` on the master node:

   .. code-block:: xml
      :emphasize-lines: 5,7,9

      <cluster>
        <name>wazuh</name>
        <node_name>master-node</node_name>
        <node_type>master</node_type>
        <key><CLUSTER_KEY></key>
        <port>1516</port>
        <bind_addr><MASTER_BIND_ADDRESS></bind_addr>
        <nodes>
          <node><MASTER_NODE_ADDRESS></node>
        </nodes>
        <hidden>no</hidden>
      </cluster>

   Where:

      -  ``<name>`` is the name of the cluster. Every node of the cluster must use the same name.
      -  ``<node_name>`` is the name of this node. It must be unique in the cluster.
      -  ``<node_type>`` is the role of this node, ``master`` or ``worker``.
      -  ``<key>`` is the 32-character cluster key. Replace ``<CLUSTER_KEY>`` with the key from step 1.
      -  ``<port>`` is the TCP port the master node listens on for worker nodes. The default value is ``1516``.
      -  ``<bind_addr>`` is the address the master node listens on. Replace ``<MASTER_BIND_ADDRESS>`` with an address the worker nodes reach, or ``0.0.0.0``. The default value ``127.0.0.1`` accepts only local connections.
      -  ``<node>`` is the address of the master node. Replace ``<MASTER_NODE_ADDRESS>`` with its IP address or DNS name. The values ``localhost``, ``0.0.0.0``, and ``127.0.1.1`` aren't valid.
      -  ``<hidden>`` has no effect. The installer writes it, and you can leave it as it is.

#. Validate the configuration file:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-conf validate

   -  The command prints nothing when the configuration is valid.

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

.. _wazuh_manager_cluster_configure_a_worker_node:

Configure a worker node
-----------------------

Each worker node joins the cluster with the master node key and address. Complete these steps on each worker node.

#. Edit the ``<cluster>`` section of ``/etc/wazuh-manager/wazuh-manager.conf`` on the worker node:

   .. code-block:: xml
      :emphasize-lines: 3,5,9

      <cluster>
        <name>wazuh</name>
        <node_name><WORKER_NODE_NAME></node_name>
        <node_type>worker</node_type>
        <key><CLUSTER_KEY></key>
        <port>1516</port>
        <bind_addr>127.0.0.1</bind_addr>
        <nodes>
          <node><MASTER_NODE_ADDRESS></node>
        </nodes>
        <hidden>no</hidden>
      </cluster>

   Where:

      -  ``<WORKER_NODE_NAME>`` is a unique name for this node. Use only letters, digits, ``_``, and ``-``, or the master node refuses the worker node.
      -  ``<CLUSTER_KEY>`` is the key of the master node.
      -  ``<MASTER_NODE_ADDRESS>`` is the IP address or DNS name of the master node.
      -  ``<name>`` and ``<port>`` must match the values on the master node.
      -  ``<bind_addr>`` has no effect on a worker node, because worker nodes don't listen for cluster connections.

#. Validate the configuration file:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-conf validate

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

Verify the cluster
------------------

The ``cluster_control`` tool lists the nodes connected to the cluster. You can run it on any node.

#. List the cluster nodes:

   .. code-block:: console

      # /var/wazuh-manager/bin/cluster_control -l

   -  The output lists the master node and every connected worker node, with its type, Wazuh version, and address.

   .. code-block:: none
      :class: output

      NAME         TYPE    VERSION  ADDRESS
      master-node  master  5.0.0    10.0.0.9
      worker01     worker  5.0.0    10.0.0.10

If a worker node is missing, check ``/var/wazuh-manager/logs/cluster.log`` on that worker node and on the master node.

