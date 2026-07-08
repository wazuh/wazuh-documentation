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

#. Install the Wazuh manager package.

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

Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

.. note::

   Make sure that a copy of the ``wazuh-certificates.tar`` file, created during the initial configuration step, is placed in your working directory.

#. Replace ``<MANAGER_NODE_NAME>`` with your Wazuh manager node certificate name, the same used in ``config.yml`` when creating the certificates. In our case, the node name is, ``manager``. Then move the certificates to their corresponding location:

   .. code-block:: console

      # NODE_NAME=<MANAGER_NODE_NAME>

   .. code-block:: console

      # mkdir /var/wazuh-manager/etc/certs
      # tar -xf ./wazuh-certificates.tar -C /var/wazuh-manager/etc/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
      # mv -n /var/wazuh-manager/etc/certs/$NODE_NAME.pem /var/wazuh-manager/etc/certs/manager.pem
      # mv -n /var/wazuh-manager/etc/certs/$NODE_NAME-key.pem /var/wazuh-manager/etc/certs/manager-key.pem
      # chmod 500 /var/wazuh-manager/etc/certs
      # chmod 400 /var/wazuh-manager/etc/certs/*
      # chown -R root:root /var/wazuh-manager/etc/certs

Configuring the Wazuh indexer connection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Save the Wazuh indexer username and password into the Wazuh manager keystore using the wazuh-manager-keystore tool. Replace ``<WAZUH_INDEXER_USERNAME>`` and ``<WAZUH_INDEXER_PASSWORD>`` with the Wazuh indexer username and password:

   .. code-block:: console

      # echo '<WAZUH_INDEXER_USERNAME>' | /var/wazuh-manager/bin/wazuh-manager-keystore -f indexer -k username
      # echo '<WAZUH_INDEXER_PASSWORD>' | /var/wazuh-manager/bin/wazuh-manager-keystore -f indexer -k password

   .. note::

      The default step-by-step installation credentials are ``admin``:``admin``.

#. Edit ``/var/wazuh-manager/etc/wazuh-manager.conf`` file to configure the indexer connection.

   .. include:: /_templates/installations/manager/configure_indexer_connection.rst

Starting the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Enable and start the Wazuh manager service.

   .. include:: /_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Run the following command to verify the Wazuh manager status:

   .. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst

Your Wazuh manager node is now successfully installed. Repeat this stage of the installation process for every Wazuh manager node in your Wazuh cluster, then proceed with configuring the Wazuh cluster. If you want a Wazuh manager single-node cluster, everything is set and you can proceed directly with :doc:`../wazuh-dashboard/step-by-step`.

Cluster configuration for multi-node deployment
-----------------------------------------------

After completing the installation of the Wazuh manager on every node, you need to configure one server node only as the master and the rest as workers.

.. _wazuh_server_master_node:

Configuring the Wazuh manager master node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Edit the following settings in the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file and configure the necessary parameters:

   .. code-block:: xml
      :emphasize-lines: 9

      <cluster>
        <name>wazuh</name>
        <node_name>master-node</node_name>
        <node_type>master</node_type>
        <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
        <port>1516</port>
        <bind_addr>0.0.0.0</bind_addr>
        <nodes>
          <node><WAZUH_MASTER_NODE_ADDRESS></node>
        </nodes>
        <hidden>no</hidden>
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
   |:ref:`nodes <cluster_nodes>`         | It is the address of the master node and can be either an IP or a DNS. This parameter must be specified in all nodes, including the master itself.                                                                                           |
   +-------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   |:ref:`hidden <cluster_hidden>`       | It shows or hides the cluster information in the generated alerts.                                                                                                                                                                           |
   +-------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#. Restart the Wazuh manager.

   .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

.. _wazuh_server_worker_nodes:

Configuring the Wazuh manager worker nodes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Configure the cluster node by editing the following settings in the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file and configure the necessary parameters:

   .. code-block:: xml

      <cluster>
          <name>wazuh</name>
          <node_name>worker-node</node_name>
          <node_type>worker</node_type>
          <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
          <port>1516</port>
          <bind_addr>0.0.0.0</bind_addr>
          <nodes>
              <node><WAZUH_MASTER_ADDRESS></node>
          </nodes>
          <hidden>no</hidden>
      </cluster>

   Parameters to be configured:

   +-------------------------------------+----------------------------------------------------------------------------------------------+
   | :ref:`name <cluster_name>`          | It indicates the name of the cluster.                                                        |
   +-------------------------------------+----------------------------------------------------------------------------------------------+
   | :ref:`node_name <cluster_node_name>`| It indicates the name of the current node. Each node of the cluster must have a unique name. |
   +-------------------------------------+----------------------------------------------------------------------------------------------+
   | :ref:`node_type <cluster_node_type>`| It specifies the role of the node. It has to be set as ``worker``.                           |
   +-------------------------------------+----------------------------------------------------------------------------------------------+
   | :ref:`key <cluster_key>`            | The key created previously for the ``master`` node. It has to be the same for all the nodes. |
   +-------------------------------------+----------------------------------------------------------------------------------------------+
   | :ref:`nodes <cluster_nodes>`        | It has to specify the address of the ``master node`` and can be either an IP or a DNS.       |
   +-------------------------------------+----------------------------------------------------------------------------------------------+

#. Restart the Wazuh manager.

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
