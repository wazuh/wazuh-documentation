.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh manager analyzes event data received from Wazuh agents and forwards the processed events to the Wazuh indexer. Install the Wazuh manager in a single-node or multi-node configuration according to your environment needs.

Installing the Wazuh manager step-by-step
=========================================

Install and configure the Wazuh manager as a single-node or multi-node cluster following step-by-step instructions. The Wazuh manager analyzes event data received from Wazuh agents and forwards the processed events to the Wazuh indexer.

The installation process is divided into two stages:

#. `Wazuh manager node installation`_
#. `Cluster configuration for multi-node deployment`_

.. note::

   You need root user privileges to run all the commands described below.

Wazuh manager node installation
-------------------------------

Follow these steps to install a single-node or multi-node cluster Wazuh manager.

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::

   If the Wazuh repository is already configured and enabled on this host, for example, on the Wazuh indexer host, skip these steps.

.. tabs::

   .. group-tab:: APT

      #. Install the following packages if missing:

         .. code-block:: console

            # apt-get install -y gnupg apt-transport-https curl

      #. Install the GPG key:

         .. code-block:: console

            # curl -s https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import && chmod 644 /usr/share/keyrings/wazuh.gpg

      #. Add the repository:

         .. code-block:: console

            # echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/apt/ unstable main" | tee /etc/apt/sources.list.d/wazuh.list

      #. Update the package information:

         .. code-block:: console

            # apt-get update

   .. group-tab:: Yum

      #. Import the GPG key:

         .. code-block:: console

            # rpm --import https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH

      #. Add the repository:

         -  For RHEL-compatible systems version 8 and earlier, use the following command:

            .. code-block:: console

               # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/yum/\nprotect=1' | tee /etc/yum.repos.d/wazuh.repo

         -  For RHEL-compatible systems version 9 and later, use the following command:

            .. code-block:: console

               # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/yum/\npriority=1' | tee /etc/yum.repos.d/wazuh.repo

   .. group-tab:: DNF

      #. Import the GPG key:

         .. code-block:: console

            # rpm --import https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH

      #. Add the repository:

         .. code-block:: console

            # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/yum/\npriority=1' | tee /etc/yum.repos.d/wazuh.repo

.. _wazuh_manager_deploying_certificates:

Deploying certificates and passwords
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Do this **before installing the package**. The package then uses these files and passwords instead of generating its own.

.. note::

   Make sure that a copy of the ``wazuh-certificates.tar`` file, created in the Wazuh indexer :ref:`Certificate creation <certificates_creation>` stage, is placed in your working directory.

#. Replace ``<MANAGER_NODE_NAME>`` with your Wazuh manager node certificate name, the same used in ``config.yml`` when creating the certificates. In our case, the node name is ``manager``. Then place the root CA, the passwords, and this node's certificates:

   .. code-block:: console

      # NODE_NAME=<MANAGER_NODE_NAME>

   .. code-block:: console

      # umask 022
      # mkdir wazuh-certificates
      # tar -xf wazuh-certificates.tar -C wazuh-certificates
      # install -d -m 0700 -o root -g root /etc/wazuh /etc/wazuh/ca
      # install -m 0644 wazuh-certificates/root-ca.pem /etc/wazuh/ca/root-ca.pem
      # [ -e /etc/wazuh/credentials.env ] || install -m 0600 /dev/null /etc/wazuh/credentials.env
      # for key in WAZUH_MANAGER_API_PASSWORD WAZUH_MANAGER_WUI_PASSWORD WAZUH_INDEXER_MANAGER_PASSWORD; do
          sed -i "/^${key}=/d" /etc/wazuh/credentials.env
          grep "^${key}=" wazuh-certificates/credentials.env >> /etc/wazuh/credentials.env
        done
      # mkdir -p /var/wazuh-manager/etc/certs
      # install -m 0640 wazuh-certificates/$NODE_NAME.pem /var/wazuh-manager/etc/certs/indexer-connector.pem
      # install -m 0640 wazuh-certificates/$NODE_NAME-key.pem /var/wazuh-manager/etc/certs/indexer-connector-key.pem
      # install -m 0640 wazuh-certificates/$NODE_NAME-remoted.pem /var/wazuh-manager/etc/certs/remoted.pem
      # install -m 0640 wazuh-certificates/$NODE_NAME-remoted-key.pem /var/wazuh-manager/etc/certs/remoted-key.pem
      # rm -rf wazuh-certificates

   The ``wazuh-manager`` user does not exist yet. When the package is installed, it gives each file its owner and copies ``root-ca.pem`` to ``/var/wazuh-manager/etc/certs``.

#. **Recommended action**: If no other Wazuh components will be installed on this node, remove the ``wazuh-certificates.tar`` file.

   .. code-block:: console

      # rm -f ./wazuh-certificates.tar

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

      Firewalls can block communication between Wazuh components on different hosts. Refer to the :ref:`Required ports <default_ports>` section and ensure the necessary ports are open.

Checking the agent listener certificate
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Check the agent listener certificate:

   .. code-block:: console

      # openssl verify -CAfile /var/wazuh-manager/etc/certs/root-ca.pem /var/wazuh-manager/etc/certs/remoted.pem
      # openssl x509 -in /var/wazuh-manager/etc/certs/remoted.pem -noout -ext subjectAltName

   The first command prints ``/var/wazuh-manager/etc/certs/remoted.pem: OK``. The second lists this node's address, its name, and every address you added with ``-as``. Only these addresses can be used to create enrollment tokens on this node.

Configuring the Wazuh indexer connection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Edit ``/var/wazuh-manager/etc/wazuh-manager.conf`` file to configure the indexer connection. Do it on the master node and on every worker node, as the cluster does not synchronize this block. By default, the indexer settings configure one host. It's set to ``127.0.0.1``:

   .. code-block:: xml
      :emphasize-lines: 3

      <indexer>
         <hosts>
           <host>https://127.0.0.1:9200</host>
         </hosts>
         <ssl>
           <certificate_authorities>
             <ca>etc/certs/root-ca.pem</ca>
           </certificate_authorities>
           <certificate>etc/certs/indexer-connector.pem</certificate>
           <key>etc/certs/indexer-connector-key.pem</key>
         </ssl>
       </indexer>

   -  Replace ``127.0.0.1`` with the address of your Wazuh indexer node: its ``ip`` value in ``config.yml``, which is also its ``network.host`` value in ``/etc/wazuh-indexer/opensearch.yml`` on that node.

   If you are running a Wazuh indexer cluster infrastructure, add a ``<host>`` entry for each one of your Wazuh indexer nodes. For example, in a two-node configuration:

   .. code-block:: xml

      <hosts>
        <host>https://10.0.0.1:9200</host>
        <host>https://10.0.0.2:9200</host>
      </hosts>

   The Wazuh manager prioritizes reporting to the first Wazuh indexer node in the list. It switches to the next node if it is unavailable.

Starting the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Enable and start the Wazuh manager service:

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl daemon-reload
            # systemctl enable wazuh-manager
            # systemctl start wazuh-manager

      .. group-tab:: SysV Init

         Choose one option according to your operating system:

         #. RPM-based operating system:

            .. code-block:: console

               # chkconfig --add wazuh-manager
               # service wazuh-manager start

         #. Debian-based operating system:

            .. code-block:: console

               # update-rc.d wazuh-manager defaults 95 10
               # service wazuh-manager start

#. Run the following command to verify the Wazuh manager status. Check that the output shows ``Active: active (running)``:

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl status wazuh-manager

      .. group-tab:: SysV Init

         .. code-block:: console

            # service wazuh-manager status

#. Check that the Wazuh manager reaches the Wazuh indexer:

   .. code-block:: console

      # grep -E 'indexer is reachable|No configured indexer host' /var/wazuh-manager/logs/wazuh-manager.log | tail -1

   The output is a line that ends in ``INFO: The indexer is reachable; inventory documents can be delivered.`` If the command prints nothing, wait a minute and run it again. If it still prints nothing, or it prints a line with ``No configured indexer host is currently reachable``, check the ``<indexer>`` block and that port 9200/TCP of the Wazuh indexer is reachable from this host.

Your Wazuh manager node is now successfully installed. Repeat this stage of the installation process for every Wazuh manager node in your Wazuh cluster, then proceed with configuring the Wazuh cluster. If you want a Wazuh manager single-node cluster, everything is set, and you can proceed directly with :doc:`Installing the Wazuh dashboard <../wazuh-dashboard/step-by-step>` step-by-step.

Cluster configuration for multi-node deployment
-----------------------------------------------

After completing the installation of the Wazuh manager on every node, configure one Wazuh manager node as the master and the rest as workers. Every node receives the same Wazuh manager API passwords from ``wazuh-certificates.tar`` in :ref:`Deploying certificates and passwords <wazuh_manager_deploying_certificates>`, so the workers need no extra password step.

The package writes a single-node ``<cluster>`` block on every node, with ``node_type`` set to ``master``, a random key, and ``127.0.0.1`` as the ``bind_addr`` and node address. Edit that block in place on each node, and don't add a second ``<cluster>`` block. The ``node_name`` parameter is the node's name inside the Wazuh manager cluster. It doesn't need to match the certificate name in ``config.yml``.

.. _wazuh_server_master_node:

Configuring the Wazuh manager master node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. On the master node, create the cluster key and keep the output. You use the same value on the master node and on every worker node:

   .. code-block:: console

      # openssl rand -hex 16

   Then edit the following settings in the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file and configure the necessary parameters:

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

   +-------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`name <reference_wazuh_manager_conf_cluster_name>`           | Indicates the name of the cluster. All nodes must use the same cluster name.                                                                                                                                                                  |
   +-------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`node_name <reference_wazuh_manager_conf_cluster_node_name>` | Indicates the name of the current node. Each node of the cluster must have a unique name.                                                                                                                                                     |
   +-------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`node_type <reference_wazuh_manager_conf_cluster_node_type>` | Specifies the role of the node. It has to be set to ``master``.                                                                                                                                                                               |
   +-------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`key <reference_wazuh_manager_conf_cluster_key>`             | Key that encrypts communication between cluster nodes. Replace ``<CLUSTER_KEY>`` with a 32-character key that is the same on every node. Create it once, on the master node, with ``openssl rand -hex 16``.                                   |
   +-------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`port <reference_wazuh_manager_conf_cluster_port>`           | It indicates the destination port for cluster communication.                                                                                                                                                                                  |
   +-------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`bind_addr <reference_wazuh_manager_conf_cluster_bind_addr>` | It is the network IP to which the node is bound to listen for incoming requests (0.0.0.0 to listen on all interfaces.).                                                                                                                       |
   +-------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`nodes <reference_wazuh_manager_conf_cluster_nodes>`         | It is the address of the ``master node`` and can be either an IP or a DNS. This parameter must be specified in all nodes, including the master itself. Replace ``<WAZUH_MASTER_ADDRESS>`` with the IP address or DNS name of the master node. |
   +-------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`hidden <reference_wazuh_manager_conf_cluster_hidden>`       | Whether the node is hidden from the cluster. Default: ``no``.                                                                                                                                                                                 |
   +-------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#. Restart the Wazuh manager:

   .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

.. _wazuh_server_worker_nodes:

Configuring the Wazuh manager worker nodes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. The Wazuh manager cluster lets you scale horizontally by distributing the load across multiple nodes. On each worker node, edit the ``<cluster>`` block in ``/var/wazuh-manager/etc/wazuh-manager.conf`` as follows. Use a unique ``node_name``, for example ``worker-node1`` and ``worker-node2``, set ``node_type`` to ``worker``, and use the same ``<CLUSTER_KEY>`` as the master node:

   .. code-block:: xml
      :emphasize-lines: 5,9

      <cluster>
          <name>wazuh</name>
          <node_name>worker-node1</node_name>
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

   +-------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`name <reference_wazuh_manager_conf_cluster_name>`           | Indicates the name of the cluster. All nodes must use the same cluster name.                                                                                                    |
   +-------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`node_name <reference_wazuh_manager_conf_cluster_node_name>` | Indicates the name of the current node. Each node of the cluster must have a unique name.                                                                                       |
   +-------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`node_type <reference_wazuh_manager_conf_cluster_node_type>` | Specifies the role of the node. It has to be set as ``worker``.                                                                                                                 |
   +-------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`key <reference_wazuh_manager_conf_cluster_key>`             | The ``<CLUSTER_KEY>`` value you created on the master node (the package wrote a different random key on this node). It must be the same on every node.                          |
   +-------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`nodes <reference_wazuh_manager_conf_cluster_nodes>`         | Specifies the address of the ``master node``. Replace ``<WAZUH_MASTER_ADDRESS>`` with the IP address or DNS name of the master node, the same value you set on the master node. |
   +-------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#. Restart the Wazuh manager:

   .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

Repeat these configuration steps for every Wazuh manager worker node in your cluster.

Testing the Wazuh manager cluster
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

On any Wazuh manager node, run the following command to verify that the Wazuh cluster is enabled and all the nodes are connected:

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

After all Wazuh components on this host are installed, disable the Wazuh repository to prevent accidental upgrades. If you will also install another component on this host, do this after installing it:

.. tabs::

   .. group-tab:: APT

      .. code-block:: console

         # sed -i "s/^deb /#deb /" /etc/apt/sources.list.d/wazuh.list
         # apt update

   .. group-tab:: Yum

      .. code-block:: console

         # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

   .. group-tab:: DNF

      .. code-block:: console

         # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

Next steps
----------

The Wazuh manager installation is now complete, and you can proceed with :doc:`Installing the Wazuh dashboard <../wazuh-dashboard/step-by-step>` step-by-step.

If you want to uninstall the Wazuh manager, see :ref:`Uninstall the Wazuh manager <uninstall_server>`.
