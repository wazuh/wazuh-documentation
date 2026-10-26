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

   If the Wazuh repository is already configured and enabled on this host (for example on the Wazuh indexer host), skip these steps.

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

         .. code-block:: console

            # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/yum/\nprotect=1' | tee /etc/yum.repos.d/wazuh.repo

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

#. Replace ``<MANAGER_NODE_NAME>`` with your Wazuh manager node certificate name, the same used in ``config.yml`` when creating the certificates. In our case, the node name is ``manager``. Then extract the archive, and place the root CA and the passwords:

   .. code-block:: console

      # NODE_NAME=<MANAGER_NODE_NAME>
      # umask 022
      # mkdir wazuh-certificates
      # tar -xf wazuh-certificates.tar -C wazuh-certificates
      # install -d -m 0750 /etc/wazuh-manager
      # install -d -m 0700 /etc/wazuh-manager/ca
      # install -m 0644 wazuh-certificates/root-ca.pem /etc/wazuh-manager/ca/root-ca.pem
      # install -m 0600 /dev/null /etc/wazuh-manager/local.env
      # grep -E '^(WAZUH_INDEXER_MANAGER_PASSWORD|WAZUH_MANAGER_API_PASSWORD|WAZUH_MANAGER_WUI_PASSWORD)=' wazuh-certificates/credentials.env > /etc/wazuh-manager/local.env

   Keep the ``wazuh-certificates`` directory: you place this node's certificates from it after you install the package. The root CA in ``/etc/wazuh-manager/ca`` makes the package use the deployment's CA instead of creating its own. Place it before the install. If the package creates its own CA first, it refuses the archive's certificates as ``INVALID``.

   If the Wazuh indexer runs on this host and is already installed, skip this step and step 2 of :ref:`Installing the Wazuh manager <wazuh_manager_installing_package>`. The package imports the password and certificates from ``/etc/wazuh-indexer/export``.

   For a Wazuh manager cluster, follow these steps on every node. Every node gets the same root CA, so the Wazuh agents trust every node, and no node needs the root CA private key.

#. **Recommended action**: If no other Wazuh components will be installed on this node, remove the ``wazuh-certificates.tar`` file.

   .. code-block:: console

      # rm -f ./wazuh-certificates.tar

.. _wazuh_manager_installing_package:

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

   The installation prints ``MISSING`` lines for ``remoted.pem``, ``apid.pem``, ``indexer-ca.pem``, and ``indexer-connector.pem`` in ``/etc/wazuh-manager/certs``. You place these files now.

   Place this node's agent listener and Wazuh server API certificates, the Wazuh indexer root CA, and this node's Wazuh indexer client certificate. They are in the directory where you extracted ``wazuh-certificates.tar``. Skip this step if the Wazuh indexer runs on this host:

   .. code-block:: console

      # install -m 0640 -o root -g wazuh-manager wazuh-certificates/$NODE_NAME-remoted.pem /etc/wazuh-manager/certs/remoted.pem
      # install -m 0640 -o root -g wazuh-manager wazuh-certificates/$NODE_NAME-remoted-key.pem /etc/wazuh-manager/certs/remoted-key.pem
      # install -m 0640 -o root -g wazuh-manager wazuh-certificates/$NODE_NAME-apid.pem /etc/wazuh-manager/certs/apid.pem
      # install -m 0640 -o root -g wazuh-manager wazuh-certificates/$NODE_NAME-apid-key.pem /etc/wazuh-manager/certs/apid-key.pem
      # install -m 0640 -o root -g wazuh-manager wazuh-certificates/root-ca.pem /etc/wazuh-manager/certs/indexer-ca.pem
      # install -m 0640 -o root -g wazuh-manager wazuh-certificates/$NODE_NAME.pem /etc/wazuh-manager/certs/indexer-connector.pem
      # install -m 0640 -o root -g wazuh-manager wazuh-certificates/$NODE_NAME-key.pem /etc/wazuh-manager/certs/indexer-connector-key.pem
      # rm -rf wazuh-certificates

   .. note::

      Firewalls can block communication between Wazuh components on different hosts. Refer to the :ref:`Required ports <default_ports>` section and ensure the necessary ports are open.

Checking the agent listener certificate
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Check the agent listener certificate:

   .. code-block:: console

      # openssl verify -CAfile /etc/wazuh-manager/certs/root-ca.pem /etc/wazuh-manager/certs/remoted.pem
      # openssl x509 -in /etc/wazuh-manager/certs/remoted.pem -noout -ext subjectAltName

   The first command prints ``/etc/wazuh-manager/certs/remoted.pem: OK``. The second lists this node's name, its addresses from ``config.yml``, and every address you added with ``-as``. Only these addresses can be used to create enrollment tokens on this node.

   To add an address later, such as a load balancer or a NAT name, issue the certificates again on the first Wazuh indexer node. Pass every address that the Wazuh agents use, because the certificate holds only the ``-as`` values of that run:

   .. code-block:: console

      # rm -rf /usr/share/wazuh-indexer/tools/wazuh-certificates
      # WAZUH_CA_DIR=/etc/wazuh-indexer/ca bash /usr/share/wazuh-indexer/tools/wazuh-certs-tool.sh -wm -as <ADDRESS> -as <OTHER_ADDRESS>

   The tool writes new certificates for every Wazuh manager node to ``/usr/share/wazuh-indexer/tools/wazuh-certificates``. Copy ``<NODE_NAME>-remoted.pem`` and ``<NODE_NAME>-remoted-key.pem`` to each Wazuh manager node. Then, on that node, run:

   .. code-block:: console

      # install -m 0640 -o root -g wazuh-manager <NODE_NAME>-remoted.pem /etc/wazuh-manager/certs/remoted.pem
      # install -m 0640 -o root -g wazuh-manager <NODE_NAME>-remoted-key.pem /etc/wazuh-manager/certs/remoted-key.pem
      # systemctl restart wazuh-manager
      # openssl x509 -in /etc/wazuh-manager/certs/remoted.pem -noout -ext subjectAltName

   The last command lists the new address. Then remove the ``wazuh-certificates`` directory and the copied files: they hold private keys. ``/etc/wazuh-manager/ca`` holds only the root CA certificate. The root CA private key stays on the first Wazuh indexer node.

Configuring the Wazuh indexer connection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Edit ``/etc/wazuh-manager/wazuh-manager.conf`` file to configure the indexer connection. Do it on the master node and on every worker node, as the cluster does not synchronize this block. By default, the indexer settings configure one host. It's set to ``127.0.0.1``:

   .. code-block:: xml
      :emphasize-lines: 3

      <indexer>
         <hosts>
           <host>https://127.0.0.1:9200</host>
         </hosts>
         <ssl>
           <certificate_authorities>
             <ca>/etc/wazuh-manager/certs/indexer-ca.pem</ca>
           </certificate_authorities>
           <certificate>/etc/wazuh-manager/certs/indexer-connector.pem</certificate>
           <key>/etc/wazuh-manager/certs/indexer-connector-key.pem</key>
         </ssl>
       </indexer>

   -  Replace ``127.0.0.1`` with the address of your Wazuh indexer node: its ``ip`` value in ``config.yml``, which is also its ``network.host`` value in ``/etc/wazuh-indexer/opensearch.yml`` on that node. Edit only the ``<host>`` value: the ``<ssl>`` block already points to the certificate files in ``/etc/wazuh-manager/certs``. If the Wazuh indexer runs on this host and you left ``network.host`` at the package default, keep ``127.0.0.1``.

   If you are running a Wazuh indexer cluster infrastructure, add a ``<host>`` entry for each one of your Wazuh indexer nodes. For example, in a two-node configuration:

   .. code-block:: xml

      <hosts>
        <host>https://10.0.0.1:9200</host>
        <host>https://10.0.0.2:9200</host>
      </hosts>

   The Wazuh manager prioritizes reporting to the first Wazuh indexer node in the list. It switches to the next node if it is unavailable.

Starting the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Enable and start the Wazuh manager service. The package neither enables nor starts it. The first start can take up to a few minutes:

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable --now wazuh-manager

#. Run the following command to verify the Wazuh manager status. Check that the output shows ``Active: active (running)``:

   .. code-block:: console

      # systemctl status wazuh-manager

   If the Wazuh manager doesn't start, run ``/var/wazuh-manager/bin/wazuh-manager-resolve-credentials --check``. It names each missing or invalid password and certificate, and prints ``check: no problem found`` when there is none. To read the refusals in the log, run:

   .. code-block:: console

      # grep -E 'MISSING|INVALID|UNSAFE' /var/wazuh-manager/logs/wazuh-manager.log | tail

   For example, ``MISSING WAZUH_INDEXER_MANAGER_PASSWORD`` means that the password is not in ``/etc/wazuh-manager/local.env``, and ``UNSAFE /etc/wazuh-manager/certs/indexer-ca.pem: group is root, not wazuh-manager`` means that the file has the wrong group.

#. Check that the Wazuh manager reaches the Wazuh indexer:

   .. code-block:: console

      # grep -E 'indexer is reachable|No configured indexer host' /var/wazuh-manager/logs/wazuh-manager.log | tail -1

   The output is a line that ends in ``INFO: The indexer is reachable; inventory documents can be delivered.`` If the command prints nothing, wait a minute and run it again. If it still prints nothing, or it prints a line with ``No configured indexer host is currently reachable``, check the ``<indexer>`` block and that port 9200/TCP of the Wazuh indexer is reachable from this host.

Your Wazuh manager node is now successfully installed. Repeat this stage of the installation process for every Wazuh manager node in your Wazuh cluster, then proceed with configuring the Wazuh cluster. If you want a Wazuh manager single-node cluster, everything is set, and you can proceed directly with :doc:`Installing the Wazuh dashboard <../wazuh-dashboard/step-by-step>` step-by-step.

Cluster configuration for multi-node deployment
-----------------------------------------------

After completing the installation of the Wazuh manager on every node, configure one Wazuh manager node as the master and the rest as workers. The Wazuh server API runs on the master node, so only the master node's API passwords are used. Every node, workers included, needs its own Wazuh indexer password and client certificate from :ref:`Deploying certificates and passwords <wazuh_manager_deploying_certificates>`. Each node also needs the deployment's root CA in ``/etc/wazuh-manager/ca`` before its package is installed. Every node gets the same API passwords from the archive, so a worker that you promote later has known passwords. These passwords must be in ``local.env`` before you install each node. Otherwise, the node generates its own API passwords, which differ from the master node's. Read the Wazuh server API passwords on the master node, and point the Wazuh dashboard to the master node.

The package writes a single-node ``<cluster>`` block on every node, with ``node_type`` set to ``master``, a random key, and ``127.0.0.1`` as the ``bind_addr`` and node address. Edit that block in place on each node, and don't add a second ``<cluster>`` block. The ``node_name`` parameter is the node's name inside the Wazuh manager cluster. It doesn't need to match the certificate name in ``config.yml``.

.. _wazuh_server_master_node:

Configuring the Wazuh manager master node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. On the master node, create the cluster key and keep the output. You use the same value on the master node and on every worker node:

   .. code-block:: console

      # openssl rand -hex 16

   Then edit the following settings in the ``/etc/wazuh-manager/wazuh-manager.conf`` file and configure the necessary parameters:

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
   | :ref:`hidden <reference_wazuh_manager_conf_cluster_hidden>`       | Has no effect in Wazuh 5.0. Keep the default, ``no``.                                                                                                                                                                                         |
   +-------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#. Restart the Wazuh manager:

   .. code-block:: console

      # systemctl restart wazuh-manager

.. _wazuh_server_worker_nodes:

Configuring the Wazuh manager worker nodes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. The Wazuh manager cluster lets you scale horizontally by distributing the load across multiple nodes. On each worker node, edit the ``<cluster>`` block in ``/etc/wazuh-manager/wazuh-manager.conf`` as follows. Use a unique ``node_name``, for example ``worker-node1`` and ``worker-node2``, set ``node_type`` to ``worker``, and use the same ``<CLUSTER_KEY>`` as the master node:

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

   .. code-block:: console

      # systemctl restart wazuh-manager

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

The Wazuh server API listens only on the master node, so port 55000 on a worker node doesn't answer.

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
