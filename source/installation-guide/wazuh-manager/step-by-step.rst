.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh manager analyzes event data received from Wazuh agents and forwards the processed events to the Wazuh indexer. Install the Wazuh manager in a single-node or multi-node configuration according to your environment needs.

Installing the Wazuh manager step-by-step
=========================================

Install and configure the Wazuh manager as a single-node or multi-node cluster following step-by-step instructions. The Wazuh manager analyzes event data received from Wazuh agents and forwards the processed events to the Wazuh indexer.

The installation process is divided into two stages:

#. `Wazuh manager node installation`_
#. `Cluster configuration for multi-node deployment`_

.. note:: You need root user privileges to run all the commands described below.

Wazuh manager node installation
-------------------------------

Follow these steps to install a single-node or multi-node cluster Wazuh manager.

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::

   If you are installing the Wazuh manager on the same host as the Wazuh indexer, you may skip these steps only if the Wazuh repository is already configured and enabled.

.. tabs::

   .. group-tab:: APT

      .. include:: /_templates/installations/common/deb/add-repository.rst

   .. group-tab:: Yum

      .. include:: /_templates/installations/common/yum/add-repository.rst

   .. group-tab:: DNF

      .. include:: /_templates/installations/common/dnf/add-repository.rst

Installing the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install the Wazuh manager package:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install wazuh-manager|WAZUH_MANAGER_DEB_PKG_INSTALL|

      .. group-tab:: Yum

         .. code-block:: console

            # yum -y install wazuh-manager|WAZUH_MANAGER_RPM_PKG_INSTALL|

      .. group-tab:: DNF

         .. code-block:: console

            # dnf -y install wazuh-manager|WAZUH_MANAGER_RPM_PKG_INSTALL|

   .. note::

      Installing the package generates the ``wazuh`` and ``wazuh-wui`` API passwords into ``/etc/wazuh/credentials.env``, as ``WAZUH_MANAGER_API_PASSWORD`` and ``WAZUH_MANAGER_WUI_PASSWORD``. It also issues the Wazuh manager certificates from a root CA in ``/etc/wazuh/ca``, and creates that CA if the directory is empty. The next section replaces these certificates with the ones you created with ``wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh``. The service stays stopped and disabled until you start it.

   .. note::

      Firewalls can block communication between Wazuh components on different hosts. Refer to the :ref:`Required ports <default_ports>` section and ensure the necessary ports are open.

Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

.. note::

   Make sure that a copy of the ``wazuh-certificates.tar`` file, created during the initial configuration step, is placed in your working directory.

#. Replace ``<MANAGER_NODE_NAME>`` with your Wazuh manager node certificate name, the same used in ``config.yml`` when creating the certificates. In our case, the node name is, ``manager``. Then move the certificates to their corresponding location:

   .. code-block:: console

      # NODE_NAME=<MANAGER_NODE_NAME>

   .. code-block:: console

      # mkdir -p /var/wazuh-manager/etc/certs
      # tar -xf wazuh-certificates.tar -C /var/wazuh-manager/etc/certs/ \
          ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem \
          ./$NODE_NAME-remoted.pem ./$NODE_NAME-remoted-key.pem
      # mv -f /var/wazuh-manager/etc/certs/$NODE_NAME.pem /var/wazuh-manager/etc/certs/indexer-connector.pem
      # mv -f /var/wazuh-manager/etc/certs/$NODE_NAME-key.pem /var/wazuh-manager/etc/certs/indexer-connector-key.pem
      # mv -f /var/wazuh-manager/etc/certs/$NODE_NAME-remoted.pem /var/wazuh-manager/etc/certs/remoted.pem
      # mv -f /var/wazuh-manager/etc/certs/$NODE_NAME-remoted-key.pem /var/wazuh-manager/etc/certs/remoted-key.pem
      # chown root:wazuh-manager \
          /var/wazuh-manager/etc/certs/root-ca.pem \
          /var/wazuh-manager/etc/certs/indexer-connector.pem \
          /var/wazuh-manager/etc/certs/indexer-connector-key.pem
      # chown wazuh-manager:wazuh-manager \
          /var/wazuh-manager/etc/certs/remoted.pem \
          /var/wazuh-manager/etc/certs/remoted-key.pem
      # chmod 640 /var/wazuh-manager/etc/certs/*.pem

#. Check the agent listener certificate:

   .. code-block:: console

      # openssl verify -CAfile /var/wazuh-manager/etc/certs/root-ca.pem /var/wazuh-manager/etc/certs/remoted.pem
      # openssl x509 -in /var/wazuh-manager/etc/certs/remoted.pem -noout -ext subjectAltName

   The first command prints ``/var/wazuh-manager/etc/certs/remoted.pem: OK``. The second lists this node's address, its name, and every address you added with ``-as``. If the first check fails, creating an enrollment token fails with ``ERROR 9025: Enrollment token refused: ca does not sign the listener certificate``.

Configuring the Wazuh indexer connection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Edit ``/var/wazuh-manager/etc/wazuh-manager.conf`` file to configure the indexer connection. Do it on the master node and on every worker node, as the cluster does not synchronize this block. By default, the indexer settings configure one host. It's set to ``127.0.0.1`` as highlighted below.

   .. include:: /_templates/installations/manager/configure_indexer_connection.rst

Starting the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Enable and start the Wazuh manager service:

   .. include:: /_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Run the following command to verify the Wazuh manager status:

   .. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst

#. Check that the Wazuh manager reaches the Wazuh indexer:

   .. code-block:: console

      # grep 'indexer is reachable' /var/wazuh-manager/logs/wazuh-manager.log | tail -1

Your Wazuh manager node is now successfully installed. Repeat this stage of the installation process for every Wazuh manager node in your Wazuh cluster, then proceed with configuring the Wazuh cluster. If you want a Wazuh manager single-node cluster, everything is set and you can proceed directly with :doc:`../wazuh-dashboard/step-by-step`.

Cluster configuration for multi-node deployment
-----------------------------------------------

After completing the installation of the Wazuh manager on every node, configure one Wazuh manager node as the master and the rest as workers.

The package writes a single-node ``<cluster>`` block on every node, with ``node_type`` set to ``master``, a random key, and ``127.0.0.1`` as the ``bind_addr`` and node address. Edit that block in place on each node, and don't add a second ``<cluster>`` block.

.. _wazuh_server_master_node:

Configuring the Wazuh manager master node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Edit the following settings in the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file and configure the necessary parameters:

   .. code-block:: xml
      :emphasize-lines: 5,9

      <cluster>
        <name>wazuh</name>
        <node_name>master-node</node_name>
        <node_type>master</node_type>
        <key><CLUSTER_KEY></key>
        <port>1516</port>
        <bind_addr>0.0.0.0</bind_addr>
        <nodes>
          <node><WAZUH_MASTER_ADDRESS></node>
        </nodes>
        <hidden>no</hidden>
      </cluster>

   Configuration parameters:

   +--------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`name <cluster_name>`           | Indicates the name of the cluster. All nodes must use the same cluster name.                                                                                                                                                                  |
   +--------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`node_name <cluster_node_name>` | Indicates the name of the current node. Each node of the cluster must have a unique name.                                                                                                                                                     |
   +--------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`node_type <cluster_node_type>` | Specifies the role of the node. It has to be set to ``master``.                                                                                                                                                                               |
   +--------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`key <cluster_key>`             | Key that encrypts communication between cluster nodes. Replace ``<CLUSTER_KEY>`` with a 32-character key that is the same on every node. Create it once, on the master node, with ``openssl rand -hex 16``.                                   |
   +--------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`port <cluster_port>`           | It indicates the destination port for cluster communication.                                                                                                                                                                                  |
   +--------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`bind_addr <cluster_bind_addr>` | It is the network IP to which the node is bound to listen for incoming requests (0.0.0.0 to listen on all interfaces.).                                                                                                                       |
   +--------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`nodes <cluster_nodes>`         | It is the address of the ``master node`` and can be either an IP or a DNS. This parameter must be specified in all nodes, including the master itself. Replace ``<WAZUH_MASTER_ADDRESS>`` with the IP address or DNS name of the master node. |
   +--------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`hidden <cluster_hidden>`       | Whether the node is hidden from the cluster. Default:``no``.                                                                                                                                                                                  |
   +--------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#. Restart the Wazuh manager:

   .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

.. _wazuh_server_worker_nodes:

Configuring the Wazuh manager worker nodes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. The Wazuh manager cluster lets you scale horizontally by distributing the load across multiple nodes. On each worker node, edit the ``<cluster>`` block in ``/var/wazuh-manager/etc/wazuh-manager.conf`` as follows. Use a unique ``node_name``, set ``node_type`` to ``worker``, and use the same ``<CLUSTER_KEY>`` as the master node:

   .. code-block:: xml
      :emphasize-lines: 5,9

      <cluster>
          <name>wazuh</name>
          <node_name>worker-node</node_name>
          <node_type>worker</node_type>
          <key><CLUSTER_KEY></key>
          <port>1516</port>
          <bind_addr>0.0.0.0</bind_addr>
          <nodes>
              <node><WAZUH_MASTER_ADDRESS></node>
          </nodes>
          <hidden>no</hidden>
      </cluster>

   Configuration parameters:

   +--------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`name <cluster_name>`           | Indicates the name of the cluster. All nodes must use the same cluster name.                                                                                                    |
   +--------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`node_name <cluster_node_name>` | Indicates the name of the current node. Each node of the cluster must have a unique name.                                                                                       |
   +--------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`node_type <cluster_node_type>` | Specifies the role of the node. It has to be set as ``worker``.                                                                                                                 |
   +--------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`key <cluster_key>`             | The ``<CLUSTER_KEY>`` value you created on the master node. It must be the same on every node.                                                                                  |
   +--------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`nodes <cluster_nodes>`         | Specifies the address of the ``master node``. Replace ``<WAZUH_MASTER_ADDRESS>`` with the IP address or DNS name of the master node, the same value you set on the master node. |
   +--------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#. Restart the Wazuh manager:

   .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

Repeat these configuration steps for every Wazuh manager worker node in your cluster.

Testing Wazuh manager cluster
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the following command to verify that the Wazuh cluster is enabled and all the nodes are connected:

.. code-block:: console

    # /var/wazuh-manager/bin/cluster_control -l

An example output of the command looks as follows:

.. code-block:: none
   :class: output

   NAME         TYPE    VERSION  ADDRESS
   master-node  master  5.0.0    10.0.0.3
   worker-node1 worker  5.0.0    10.0.0.4
   worker-node2 worker  5.0.0    10.0.0.5

Note that the IP addresses ``10.0.0.3``, ``10.0.0.4``, and ``10.0.0.5`` are used as examples.

Disable Wazuh updates
---------------------

.. include:: /_templates/installations/disable-wazuh-updates.rst

Next steps
----------

The Wazuh manager installation is now complete, and you can proceed with :doc:`../wazuh-dashboard/step-by-step`.

If you want to uninstall the Wazuh manager, see :ref:`uninstall_server`.
