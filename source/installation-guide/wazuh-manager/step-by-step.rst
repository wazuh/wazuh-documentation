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

            # apt-get update && apt-get install -y gnupg apt-transport-https curl

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

Do this **before installing the package**. The package then uses these passwords instead of generating its own, and issues this node's agent listener and Wazuh manager API certificates.

.. note::

   If this host is the first Wazuh indexer node, for example an all-in-one host, the Wazuh manager package retrieves the Wazuh indexer password and certificates from ``/etc/wazuh-indexer/export`` during installation. Skip this section, but first place the two Wazuh manager API passwords. Run these commands in the working directory that holds the ``credentials.env`` file you created in :ref:`Creating the passwords <wazuh_indexer_creating_passwords>`:

   .. code-block:: console

      # install -d -m 0750 /etc/wazuh-manager
      # install -m 0600 /dev/null /etc/wazuh-manager/local.env
      # grep -E '^(WAZUH_MANAGER_API_PASSWORD|WAZUH_MANAGER_WUI_PASSWORD)=' credentials.env > /etc/wazuh-manager/local.env

   Without these two passwords, the Wazuh manager package generates its own, and the values in ``credentials.env`` don't work. On any other host, including a dedicated Wazuh manager node and the other Wazuh indexer nodes, follow this section in full.

   Make sure that a copy of the ``wazuh-certificates.tar`` file, created in the Wazuh indexer :ref:`Certificate creation <certificates_creation>` stage, is placed in your working directory.

#. Replace ``<MANAGER_NODE_NAME>`` with your Wazuh manager node certificate name, the same used in ``config.yml`` when creating the certificates. In our case, the node name is ``manager``. Then extract the archive, and place the passwords:

   .. code-block:: console

      # NODE_NAME=<MANAGER_NODE_NAME>
      # umask 022
      # mkdir wazuh-certificates
      # tar -xf wazuh-certificates.tar -C wazuh-certificates
      # install -d -m 0750 /etc/wazuh-manager
      # install -m 0600 /dev/null /etc/wazuh-manager/local.env
      # grep -E '^(WAZUH_INDEXER_MANAGER_PASSWORD|WAZUH_MANAGER_API_PASSWORD|WAZUH_MANAGER_WUI_PASSWORD)=' wazuh-certificates/credentials.env > /etc/wazuh-manager/local.env

   Keep the ``wazuh-certificates`` directory. You need it after the installation.

#. Optional: set the addresses that Wazuh agents use to reach this node. Without this setting, the package puts the node's host name and IP addresses in its agent listener certificate. Your list replaces them, so include this node's own address and any load balancer, NAT address, or public name that agents use. Separate the entries with commas, and write ``IP:`` before an address and ``DNS:`` before a name:

   .. code-block:: console

      # echo 'WAZUH_MANAGER_REMOTED_CERT_SANS=IP:<WAZUH_MANAGER_ADDRESS>,DNS:<LOAD_BALANCER_NAME>' >> /etc/wazuh-manager/local.env

   The package always adds ``localhost``, ``127.0.0.1``, and ``::1``. For the Wazuh manager API certificate, set ``WAZUH_MANAGER_APID_CERT_SANS`` the same way. The address in the ``url`` setting of the Wazuh dashboard must be in that certificate.

#. On each worker node of a Wazuh manager cluster, place the master node's root CA. Install the master node first. Every node then issues its certificates from the same root CA, so the Wazuh agents trust every node. Skip this step on the master node and on a single Wazuh manager. On the master node, pack the root CA and its private key:

   .. code-block:: console

      # tar -cf manager-ca.tar -C /etc/wazuh-manager/ca root-ca.pem root-ca.key
      # chmod 600 manager-ca.tar

   Copy ``manager-ca.tar`` to the working directory of the worker node, and run these commands there:

   .. code-block:: console

      # install -d -m 0700 /etc/wazuh-manager/ca
      # tar -xf manager-ca.tar -C /etc/wazuh-manager/ca
      # chown root:root /etc/wazuh-manager/ca/root-ca.pem /etc/wazuh-manager/ca/root-ca.key
      # chmod 0644 /etc/wazuh-manager/ca/root-ca.pem
      # chmod 0400 /etc/wazuh-manager/ca/root-ca.key
      # rm -f manager-ca.tar

   The file holds the root CA private key. Remove it from the master node too when every worker node has its copy. To add a Wazuh manager node to the cluster later, repeat this step on the new node before you install its package. Don't issue its certificates with the ``-wm`` option of the certificates tool. The tool signs them with the root CA of the archive, which isn't the root CA of this Wazuh manager cluster. Procedures that add a Wazuh manager node with the certificates tool apply only to assisted installations.

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

   Release candidate packages carry the version of the final release, ``|WAZUH_CURRENT|-|WAZUH_MANAGER_PKG_REV|``. Only their file names show the RC stage, for example ``wazuh-manager_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|_|WAZUH_MANAGER_x64_DEB|.deb``, so ``dpkg -l`` and ``rpm -q`` show ``|WAZUH_CURRENT|-|WAZUH_MANAGER_PKG_REV|``.

#. The installation prints the certificates that the package issued, with their addresses. On a host without the Wazuh indexer, it also prints MISSING lines for ``indexer-ca.pem`` and ``indexer-connector.pem``, and ``Credential resolution is incomplete``. This is expected. Place the Wazuh indexer root CA and this node's client certificate for the Wazuh indexer. They are in the directory where you extracted ``wazuh-certificates.tar``. Skip this step on the first Wazuh indexer node:

   .. code-block:: console

      # install -m 0640 -o root -g wazuh-manager wazuh-certificates/root-ca.pem /etc/wazuh-manager/certs/indexer-ca.pem
      # install -m 0640 -o root -g wazuh-manager wazuh-certificates/$NODE_NAME.pem /etc/wazuh-manager/certs/indexer-connector.pem
      # install -m 0640 -o root -g wazuh-manager wazuh-certificates/$NODE_NAME-key.pem /etc/wazuh-manager/certs/indexer-connector-key.pem

#. Remove the extracted files. They hold private keys:

   .. code-block:: console

      # rm -rf wazuh-certificates

   .. note::

      Firewalls can block communication between Wazuh components on different hosts. Refer to the :ref:`Required ports <default_ports>` section and make sure the necessary ports are open.

Checking the agent listener certificate
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The agent listener certificate, ``/etc/wazuh-manager/certs/remoted.pem``, lists the addresses that Wazuh agents use to reach this node. You can create enrollment tokens only for these addresses. Follow these steps to check the certificate and, if needed, add an address.

#. Check the credentials and the agent listener certificate:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --check
      # openssl verify -CAfile /etc/wazuh-manager/certs/root-ca.pem /etc/wazuh-manager/certs/remoted.pem
      # openssl x509 -in /etc/wazuh-manager/certs/remoted.pem -noout -ext subjectAltName

   The first command prints ``resolve-credentials: check: no problem found``. The second prints ``/etc/wazuh-manager/certs/remoted.pem: OK``, because the package issued the certificate from this node's root CA. The third lists the addresses that agents can use to reach this node.

#. To add an address later, such as a load balancer or a NAT name, set the new list in ``/etc/wazuh-manager/local.env``. Pass every address that agents use, not only the new one, because the list replaces the previous one:

   .. code-block:: console

      # sed -i '/^WAZUH_MANAGER_REMOTED_CERT_SANS=/d' /etc/wazuh-manager/local.env
      # echo 'WAZUH_MANAGER_REMOTED_CERT_SANS=IP:<WAZUH_MANAGER_ADDRESS>,DNS:<LOAD_BALANCER_NAME>' >> /etc/wazuh-manager/local.env

#. Stop the Wazuh manager, remove the agent listener certificate, and issue a new one from the same root CA. Then start the Wazuh manager:

   .. code-block:: console

      # systemctl stop wazuh-manager
      # rm -f /etc/wazuh-manager/certs/remoted.pem /etc/wazuh-manager/certs/remoted-key.pem
      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --install
      # systemctl start wazuh-manager

#. Check that the certificate lists the new address:

   .. code-block:: console

      # openssl x509 -in /etc/wazuh-manager/certs/remoted.pem -noout -ext subjectAltName

#. Repeat these steps on each node that agents reach through a new address. Wazuh agents keep trusting the node, because the new certificate comes from the same root CA.

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

   -  Replace ``127.0.0.1`` with the address of your Wazuh indexer node. It's the node's ``ip`` value in ``config.yml`` and its ``network.host`` value in ``/etc/wazuh-indexer/opensearch.yml`` on that node. Edit only the ``<host>`` value: the ``<ssl>`` block already points to the certificate files in ``/etc/wazuh-manager/certs``. If the Wazuh indexer runs on this host and you left ``network.host`` at the package default, keep ``127.0.0.1``.

   If you are running a Wazuh indexer cluster infrastructure, add a ``<host>`` entry for each one of your Wazuh indexer nodes. For example, in a two-node configuration:

   .. code-block:: xml

      <hosts>
        <host>https://10.0.0.1:9200</host>
        <host>https://10.0.0.2:9200</host>
      </hosts>

   The Wazuh manager prioritizes reporting to the first Wazuh indexer node in the list. It switches to the next node if it is unavailable.

Starting the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Enable and start the Wazuh manager service. The package neither enables nor starts it. The first start usually takes a few seconds, and systemd reports a failure after three minutes:

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable --now wazuh-manager

#. Run the following command to verify the Wazuh manager status. Check that the output shows ``Active: active (running)``:

   .. code-block:: console

      # systemctl status wazuh-manager

   If the Wazuh manager doesn't start, run ``/var/wazuh-manager/bin/wazuh-manager-resolve-credentials --check``. It names each missing or invalid password and certificate, and prints ``check: no problem found`` when there is none. To read the refusals in the log, run:

   .. code-block:: console

      # grep -E 'MISSING|INVALID|UNSAFE' /var/wazuh-manager/logs/wazuh-manager.log | tail

   For example, ``MISSING WAZUH_INDEXER_MANAGER_PASSWORD`` means that the password isn't in ``/etc/wazuh-manager/local.env``. ``UNSAFE /etc/wazuh-manager/certs/indexer-ca.pem: group is root, not wazuh-manager`` means that the file has the wrong group.

#. Check that the Wazuh manager reaches the Wazuh indexer:

   .. code-block:: console

      # grep -E 'indexer is reachable|No configured indexer host' /var/wazuh-manager/logs/wazuh-manager.log | tail -1

   The output is a line that ends in ``INFO: The indexer is reachable; inventory documents can be delivered.`` If the command prints nothing, wait a minute and run it again. If it still prints nothing, or it prints ``No configured indexer host is currently reachable``, check the ``<indexer>`` block. Also check that this host can reach port 9200/TCP of the Wazuh indexer.

Your Wazuh manager node is now successfully installed. Repeat this stage of the installation process for every Wazuh manager node in your Wazuh cluster, then proceed with configuring the Wazuh cluster. If you want a Wazuh manager single-node cluster, everything is set, and you can proceed directly with :doc:`Installing the Wazuh dashboard <../wazuh-dashboard/step-by-step>` step-by-step.

Cluster configuration for multi-node deployment
-----------------------------------------------

After you install the Wazuh manager on every node, configure the master node first, then each worker node, and then test the cluster. Each node already has the master node's root CA, its own certificates, and the same passwords from :ref:`Deploying certificates and passwords <wazuh_manager_deploying_certificates>`.

Only the master node runs the Wazuh manager API. The Wazuh dashboard connects to it with the passwords from the archive, as :ref:`Configuring the Wazuh dashboard <wazuh_dashboard_configuring>` describes.

The package writes a single-node ``<cluster>`` block on every node: ``node_type`` is ``master``, the key is random, and ``bind_addr`` and the node address are ``127.0.0.1``. Edit that block on each node instead of adding a second one. ``node_name`` is the node's name in the cluster and doesn't need to match its name in ``config.yml``.

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

The Wazuh manager API listens only on the master node, so port 55000 on a worker node doesn't answer.

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
