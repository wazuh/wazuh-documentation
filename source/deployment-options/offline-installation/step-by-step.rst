.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Follow these steps to install the Wazuh central components offline, without connection to the Internet.

Install Wazuh components step by step
=====================================

Run these steps on each offline host, in the directory where you copied the files in step 6 of :ref:`Download the packages and configuration files <offline_installation_download>`.

All-in-one deployment
---------------------

An all-in-one deployment doesn't use ``wazuh-install-files.tar``. The Wazuh packages create the root CA, the certificates, and the passwords on the host. Follow :ref:`All-in-one deployment <wazuh_indexer_all_in_one_deployment>` in the Installation guide, but skip the steps that add the Wazuh repository. Install each package from ``./wazuh-offline/wazuh-packages/`` at the step where that guide installs it. Before that, decompress the packages and check their signatures as described in :ref:`Preparing the packages <offline_installation_preparing_packages>`.

.. code-block:: console

   # tar xf wazuh-offline.tar.gz

.. _offline_installation_preparing_packages:

Preparing the packages
----------------------

#. Decompress the installation files. For an all-in-one deployment, decompress only ``wazuh-offline.tar.gz``.

   .. code-block:: console

      # umask 022
      # tar xf wazuh-offline.tar.gz
      # tar xf wazuh-install-files.tar

   ``wazuh-install-files.tar`` holds ``root-ca.pem``, the certificates of every node in ``config.yml``, and ``credentials.env`` with the five passwords. Place them on each node before you install its package. The package then uses them instead of generating its own.

#. Verify the package signatures with the Wazuh key that ``wazuh-offline.tar.gz`` carries, ``wazuh-offline/GPG-KEY-WAZUH``. These commands need ``gnupg``, and ``binutils`` on DEB systems. Don't install a package that fails these checks.

   -  Check that the fingerprint of the key is ``0DCF CA55 47B1 9D2A 6099 5060 96B3 EE5F 2911 1145``:

      .. code-block:: console

         # gpg --show-keys --with-fingerprint wazuh-offline/GPG-KEY-WAZUH

   .. tabs::

      .. group-tab:: RPM

         Every package must show ``Signature, key ID 29111145: OK``. ``rpm -K`` alone also passes on an unsigned package, so check the key ID.

         .. code-block:: console

            # rpm --import wazuh-offline/GPG-KEY-WAZUH
            # for p in wazuh-offline/wazuh-packages/*.rpm; do echo "$p"; rpm -Kv "$p" | grep -i signature; done

      .. group-tab:: DEB

         ``apt`` doesn't check the signature embedded in a ``.deb`` package. The following commands check the ``_gpgbuilder`` member with ``gpgv`` and compare the hashes it signs with the other members. Every package must show ``OK``:

         .. code-block:: console

            # gpg --dearmor < wazuh-offline/GPG-KEY-WAZUH > wazuh.gpg
            # for p in wazuh-offline/wazuh-packages/*.deb; do
                ar p "$p" _gpgbuilder > _gpgbuilder
                gpgv --keyring ./wazuh.gpg --output signed _gpgbuilder 2>/dev/null || { echo "$p: not signed with the Wazuh key"; continue; }
                awk 'NF == 4 && length($1) == 32 {print $2, $4}' signed | sort > signed-members
                for m in $(ar t "$p" | grep -v '^_gpg'); do echo "$(ar p "$p" "$m" | sha1sum | cut -d' ' -f1) $m"; done | sort > members
                cmp -s signed-members members && echo "$p: OK" || echo "$p: FAILED"
              done
            # rm -f wazuh.gpg _gpgbuilder signed signed-members members

Installing the Wazuh indexer
----------------------------

Install and configure the Wazuh indexer on each indexer node. Before installing it, install the following dependencies, if missing, from your local package mirror, installation media, or copied packages (see :ref:`Prerequisites <offline_installation_prerequisites>`):

.. tabs::

   .. group-tab:: RPM

      -  coreutils
      -  diffutils
      -  hostname
      -  iproute
      -  openssl
      -  procps-ng
      -  util-linux

   .. group-tab:: DEB

      -  adduser
      -  debconf
      -  diffutils
      -  iproute2
      -  openssl
      -  procps

#. Place the passwords, the root CA certificate, and the certificates of this node before installing the package. Replace ``<INDEXER_NODE_NAME>`` with the name of the node as defined in ``config.yml``, for example, ``indexer``.

   .. code-block:: console

      # NODE_NAME=<INDEXER_NODE_NAME>

   .. code-block:: console

      # install -d -m 0750 -o root -g root /etc/wazuh-indexer /etc/wazuh-indexer/ca
      # install -m 0640 wazuh-install-files/root-ca.pem /etc/wazuh-indexer/ca/root-ca.pem
      # install -m 0600 /dev/null /etc/wazuh-indexer/local.env
      # grep '^WAZUH_INDEXER_' wazuh-install-files/credentials.env > /etc/wazuh-indexer/local.env
      # install -d -m 0750 /etc/wazuh-indexer/certs
      # install -m 0640 wazuh-install-files/$NODE_NAME.pem /etc/wazuh-indexer/certs/indexer.pem
      # install -m 0640 wazuh-install-files/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
      # install -m 0600 wazuh-install-files/admin.pem /etc/wazuh-indexer/certs/admin.pem
      # install -m 0600 wazuh-install-files/admin-key.pem /etc/wazuh-indexer/certs/admin-key.pem

#. Install the Wazuh indexer package. The package uses the passwords and certificates you placed. It gives the node certificate, its key, and the root CA certificate to ``root``, with the ``wazuh-indexer`` group. The admin certificate and its key stay readable by ``root`` only. Don't install it before placing them. Placing them afterwards doesn't configure the node.

   .. tabs::

      .. group-tab:: RPM

         .. code-block:: console

            # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-indexer*.rpm

      .. group-tab:: DEB

         .. code-block:: console

            # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-indexer*.deb

#. Edit ``/etc/wazuh-indexer/opensearch.yml`` and replace the following values:

   -  ``network.host``: Sets the address of this node for both HTTP and transport traffic. The node will bind to this address and will also use it as its publish address. Accepts an IP address or a hostname. Use the same node address set in the ``config.yml`` file to create the SSL certificates.

   -  ``node.name``: Name of the Wazuh indexer node as defined in the ``config.yml`` file. For example, ``indexer``.

   -  ``cluster.initial_cluster_manager_nodes``: List of the names of the master-eligible nodes. These names are defined in the ``config.yml`` file. Replace the ``node-1`` entry the package wrote, and add one line per node, according to your ``config.yml`` file definitions.

      .. code-block:: yaml

         cluster.initial_cluster_manager_nodes:
         - "indexer"
         - "indexer-2"
         - "indexer-3"

   -  ``discovery.seed_hosts``: List of the addresses of the master-eligible nodes. Each element can be either an IP address or a hostname. You can leave this setting commented if you are configuring the Wazuh indexer as a single-node. For multi-node configurations, uncomment this setting and set your master-eligible node addresses.

      .. code-block:: yaml

         discovery.seed_hosts:
           - "10.0.0.1"
           - "10.0.0.2"
           - "10.0.0.3"

   -  ``plugins.security.nodes_dn``: List of the Distinguished Names of the certificates of all the Wazuh indexer cluster nodes. The package writes only one line. Replace it with one line per Wazuh indexer node, using the names from your ``config.yml`` file in this order. Leave ``plugins.security.authcz.admin_dn`` as the package wrote it.

      .. code-block:: yaml

         plugins.security.nodes_dn:
         - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=indexer"
         - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=indexer-2"
         - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=indexer-3"

#. Set the Java heap of the Wazuh indexer. The package sets 1 GB, which isn't enough. The Wazuh dashboard then fails on its first start with ``circuit_breaking_exception``. Use half of the host memory on a dedicated Wazuh indexer node. Use one quarter when the Wazuh manager and Wazuh dashboard share the host, by changing ``/ 2`` to ``/ 4``:

   .. code-block:: console

      # HEAP_MB=$(( $(free -m | awk 'NR == 2 {print $2}') / 2 ))
      # sed -i -e "s/^-Xms.*/-Xms${HEAP_MB}m/" -e "s/^-Xmx.*/-Xmx${HEAP_MB}m/" /etc/wazuh-indexer/jvm.options

#. Enable and start the Wazuh indexer service.

   .. include:: /_templates/installations/indexer/common/enable_indexer.rst

#. For multi-node clusters, repeat the previous steps on every Wazuh indexer node.

#. After all Wazuh indexer nodes are running, run ``indexer-security-init.sh`` once, on any one of them. It loads the users of that node into the security index, which replaces the users of every other node, and starts the cluster.

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

#. Check that every Wazuh indexer node joined the cluster and that its status is ``green``. Replace ``<WAZUH_INDEXER_IP_ADDRESS>`` with the address of a Wazuh indexer node. When ``curl`` asks for the password, enter the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value that the first command shows.

   .. code-block:: console

      # grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh-indexer/export/credentials.env | cut -d= -f2-
      # curl --cacert /etc/wazuh-indexer/export/ca.pem -u admin https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cat/nodes?v
      # curl --cacert /etc/wazuh-indexer/export/ca.pem -u admin https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cluster/health?pretty

Installing the Wazuh manager
----------------------------

Install and configure the Wazuh manager on each manager node. Before installing it, install the following dependencies, if missing:

.. tabs::

   .. group-tab:: RPM

      -  coreutils
      -  shadow-utils

   .. group-tab:: DEB

      -  libc6 (2.18 or later)
      -  passwd

#. Place the passwords, the root CA certificate, and the certificates of this node before installing the package. Replace ``<MANAGER_NODE_NAME>`` with the name of the node as defined in ``config.yml``, for example, ``manager``.

   .. code-block:: console

      # NODE_NAME=<MANAGER_NODE_NAME>

   .. code-block:: console

      # install -d -m 0750 -o root -g root /etc/wazuh-manager /etc/wazuh-manager/certs
      # install -d -m 0700 -o root -g root /etc/wazuh-manager/ca
      # install -m 0644 wazuh-install-files/root-ca.pem /etc/wazuh-manager/ca/root-ca.pem
      # install -m 0600 /dev/null /etc/wazuh-manager/local.env
      # grep -E '^(WAZUH_MANAGER_API_PASSWORD|WAZUH_MANAGER_WUI_PASSWORD|WAZUH_INDEXER_MANAGER_PASSWORD)=' wazuh-install-files/credentials.env > /etc/wazuh-manager/local.env
      # install -m 0640 wazuh-install-files/root-ca.pem /etc/wazuh-manager/certs/root-ca.pem
      # install -m 0640 wazuh-install-files/root-ca.pem /etc/wazuh-manager/certs/indexer-ca.pem
      # install -m 0640 wazuh-install-files/$NODE_NAME.pem /etc/wazuh-manager/certs/indexer-connector.pem
      # install -m 0640 wazuh-install-files/$NODE_NAME-key.pem /etc/wazuh-manager/certs/indexer-connector-key.pem
      # install -m 0640 wazuh-install-files/$NODE_NAME-remoted.pem /etc/wazuh-manager/certs/remoted.pem
      # install -m 0640 wazuh-install-files/$NODE_NAME-remoted-key.pem /etc/wazuh-manager/certs/remoted-key.pem
      # install -m 0640 wazuh-install-files/$NODE_NAME-apid.pem /etc/wazuh-manager/certs/apid.pem
      # install -m 0640 wazuh-install-files/$NODE_NAME-apid-key.pem /etc/wazuh-manager/certs/apid-key.pem

   The root CA of the deployment also signed the Wazuh indexer certificates, so it is placed as ``indexer-ca.pem`` too. ``remoted.pem`` is the agent listener certificate, served on port 1517 and reused by enrollment on port 1515. ``apid.pem`` is the Wazuh manager API certificate. Without either pair, the Wazuh manager doesn't start.

#. Install the Wazuh manager package. The package uses the files you placed instead of issuing its own, and gives the ``remoted`` and ``apid`` pairs their owner.

   .. tabs::

      .. group-tab:: RPM

         .. code-block:: console

            # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-manager*.rpm

      .. group-tab:: DEB

         .. code-block:: console

            # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-manager*.deb

#. Check the credentials. On RPM systems, the installation prints ``UNSAFE /etc/wazuh-manager/certs/<FILE>.pem: group is root, not wazuh-manager`` for the files you placed. The package fixes the owner at the end of the installation, and nothing needs to be done. The check must end with ``no problem found``. In a distributed deployment, it also warns that the dashboard client pair was not generated, which is expected:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --check -H /var/wazuh-manager

#. Check that the agent listener certificate comes from the deployment's root CA. Agents reject a Wazuh manager node whose certificate fails this check:

   .. code-block:: console

      # openssl verify -CAfile /etc/wazuh-manager/certs/root-ca.pem /etc/wazuh-manager/certs/remoted.pem

#. In the ``<indexer>`` block of ``/etc/wazuh-manager/wazuh-manager.conf``, replace ``127.0.0.1`` with the addresses of the Wazuh indexer nodes, one ``<host>`` entry per node. Do it on every Wazuh manager node, because the cluster doesn't synchronize this block. Leave the ``<ssl>`` settings as the package wrote them. The credentials aren't set here. The package stored them in the Wazuh manager keystore.

   .. code-block:: xml
      :emphasize-lines: 3, 4

      <indexer>
        <hosts>
          <host>https://<WAZUH_INDEXER_1_IP_ADDRESS>:9200</host>
          <host>https://<WAZUH_INDEXER_2_IP_ADDRESS>:9200</host>
        </hosts>
        ...
      </indexer>

#. Enable and start the Wazuh manager service, first on the master node and then on the worker nodes. A fresh installation doesn't start the service by itself.

   .. include:: /_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Run the following commands to verify that the Wazuh manager status is active and that it reaches the Wazuh indexer:

   .. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst

   .. code-block:: console

      # grep 'indexer is reachable' /var/wazuh-manager/logs/wazuh-manager.log | tail -1

Wazuh cluster configuration for multi-node deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After completing the installation of the Wazuh manager on every node, you must configure one manager node as the master and the rest as workers. If you have only one Wazuh manager node, skip this section and go to :ref:`Installing the Wazuh dashboard <offline_installation_step_by_step_dashboard>`. ``wazuh-install-files.tar`` holds a ``clusterkey`` file only when ``config.yml`` lists more than one Wazuh manager node.

On every node, the package writes a ``<cluster>`` block with its own random key, ``node_type`` ``master``, and ``bind_addr`` ``127.0.0.1``. Replace the whole block on each node.

Configuring the Wazuh manager master node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Edit the following settings in the ``/etc/wazuh-manager/wazuh-manager.conf`` configuration file. Replace ``<CLUSTER_KEY>`` with the key in ``wazuh-install-files/clusterkey``, which the following command shows, and ``<WAZUH_MASTER_ADDRESS>`` with the IP address of the master node.

   .. code-block:: console

      # cat wazuh-install-files/clusterkey

   .. code-block:: xml
      :emphasize-lines: 5, 9

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

   Parameters to be configured:

   +-------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+
   | Parameter                                                         | Description                                                                                                                                        |
   +===================================================================+====================================================================================================================================================+
   | :ref:`name <reference_wazuh_manager_conf_cluster_name>`           | It indicates the name of the cluster.                                                                                                              |
   +-------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`node_name <reference_wazuh_manager_conf_cluster_node_name>` | It indicates the name of the current node.                                                                                                         |
   +-------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`node_type <reference_wazuh_manager_conf_cluster_node_type>` | It specifies the role of the node. It has to be set to ``master``.                                                                                 |
   +-------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`key <reference_wazuh_manager_conf_cluster_key>`             | Key that is used to encrypt communication between cluster nodes. Use the key in ``wazuh-install-files/clusterkey``, the same on every node.        |
   +-------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`port <reference_wazuh_manager_conf_cluster_port>`           | It indicates the destination port for cluster communication.                                                                                       |
   +-------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`bind_addr <reference_wazuh_manager_conf_cluster_bind_addr>` | It is the network IP to which the node is bound to listen for incoming requests (0.0.0.0 for any IP).                                              |
   +-------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`nodes <reference_wazuh_manager_conf_cluster_nodes>`         | It is the address of the master node and can be either an IP or a DNS. This parameter must be specified in all nodes, including the master itself. |
   +-------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+
   | :ref:`hidden <reference_wazuh_manager_conf_cluster_hidden>`       | It shows or hides the cluster information in the generated alerts.                                                                                 |
   +-------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+

#. Restart the Wazuh manager.

   .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

   Repeat these configuration steps for every Wazuh manager worker node in your cluster, with ``<node_type>worker</node_type>``, a unique ``<node_name>``, the same ``<key>``, and ``<WAZUH_MASTER_ADDRESS>`` in ``<nodes>``.

Testing the Wazuh manager cluster
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To verify that the Wazuh cluster is enabled and all the nodes are connected, run the following command:

.. code-block:: console

   # /var/wazuh-manager/bin/cluster_control -l

The command returns output similar to the following example:

.. code-block:: none
   :class: output

   NAME          TYPE    VERSION  ADDRESS
   master-node   master  5.0.0    10.0.0.3
   worker-node1  worker  5.0.0    10.0.0.4
   worker-node2  worker  5.0.0    10.0.0.5

Note that ``10.0.0.3``, ``10.0.0.4``, ``10.0.0.5`` are example IPs.

.. _offline_installation_step_by_step_dashboard:

Installing the Wazuh dashboard
------------------------------

Install and configure the Wazuh dashboard node. Before installing it, install the following dependencies, if missing:

.. tabs::

   .. group-tab:: RPM

      -  diffutils
      -  libcap
      -  openssl
      -  util-linux

   .. group-tab:: DEB

      -  curl
      -  diffutils
      -  libcap2-bin
      -  openssl
      -  tar

#. Place the passwords, the root CA certificate, and the certificate of this node before installing the package. Replace ``<DASHBOARD_NODE_NAME>`` with the name of the node as defined in ``config.yml``, for example, ``dashboard``.

   .. code-block:: console

      # NODE_NAME=<DASHBOARD_NODE_NAME>

   .. code-block:: console

      # install -d -m 0750 -o root -g root /etc/wazuh-dashboard /etc/wazuh-dashboard/certs
      # install -m 0600 /dev/null /etc/wazuh-dashboard/local.env
      # grep -E '^(WAZUH_INDEXER_KIBANASERVER_PASSWORD|WAZUH_MANAGER_WUI_PASSWORD)=' wazuh-install-files/credentials.env > /etc/wazuh-dashboard/local.env
      # install -m 0640 wazuh-install-files/$NODE_NAME.pem /etc/wazuh-dashboard/certs/dashboard.pem
      # install -m 0640 wazuh-install-files/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/dashboard-key.pem
      # install -m 0640 wazuh-install-files/root-ca.pem /etc/wazuh-dashboard/certs/indexer-ca.pem
      # install -m 0640 wazuh-install-files/root-ca.pem /etc/wazuh-dashboard/certs/manager-ca.pem

   The root CA of the deployment signed the Wazuh indexer and the Wazuh manager certificates, so it is placed as ``indexer-ca.pem`` and ``manager-ca.pem``.

#. Install the Wazuh dashboard package.

   .. tabs::

      .. group-tab:: RPM

         .. code-block:: console

            # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-dashboard*.rpm

      .. group-tab:: DEB

         .. code-block:: console

            # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-dashboard*.deb

#. Check the ownership of the certificates. The package gives the certificates you placed to ``root`` with the ``wazuh-dashboard`` group, with mode ``0750`` for the directory and ``0640`` for the files. It keeps ``local.env`` readable by root only, with owner ``root:root`` and mode ``0600``. Don't give them to the ``wazuh-dashboard`` user. The Wazuh dashboard refuses to start when a file in ``/etc/wazuh-dashboard/certs`` isn't owned by ``root`` or is writable by its group or others.

   .. code-block:: console

      # ls -ld /etc/wazuh-dashboard/certs /etc/wazuh-dashboard/certs/*

#. Edit the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file. The package already configures ``server.host``, ``server.port``, and ``opensearch.ssl.verificationMode``. Verify these values and update only ``opensearch.hosts`` and ``wazuh_core.hosts.default.url``:

   .. code-block:: yaml
      :emphasize-lines: 3, 7

      server.host: 0.0.0.0
      server.port: 443
      opensearch.hosts: ["https://<WAZUH_INDEXER_1_IP_ADDRESS>:9200", "https://<WAZUH_INDEXER_2_IP_ADDRESS>:9200"]
      opensearch.ssl.verificationMode: certificate
      wazuh_core.hosts:
        default:
          url: https://<WAZUH_MASTER_IP_ADDRESS>
          port: 55000
          username: wazuh-internal-client

   -  ``server.host``: This setting specifies the host of the Wazuh dashboard server. To allow remote users to connect, set the value to the IP address or DNS name of the Wazuh dashboard. The value ``0.0.0.0`` accepts all available IP addresses on the host.
   -  ``opensearch.hosts``: The URLs of the Wazuh indexer nodes. Set this value to the Wazuh indexer node addresses, even when all components share the same host. The addresses of the nodes are separated by commas.
   -  ``wazuh_core.hosts``: The Wazuh manager API that the dashboard queries. ``url`` must point to the Wazuh manager API on the master node, the only node that runs it. Use one of the addresses in the master node's ``apid.pem`` certificate. Don't set a ``password``. The package stored the ``wazuh-internal-client`` password in the Wazuh dashboard keystore, and the keystore value takes precedence over a password in this file. Leave ``run_as`` as the package wrote it.

#. Enable and start the Wazuh dashboard service.

   .. include:: /_templates/installations/dashboard/enable_dashboard.rst

#. Run the following command to verify the Wazuh dashboard service is active.

   .. include:: /_templates/installations/wazuh/common/check_wazuh_dashboard.rst

#. Access the Wazuh web interface.

   -  **URL**: ``https://<WAZUH_DASHBOARD_IP_ADDRESS>``
   -  **Username**: ``admin``
   -  **Password**: the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value in ``wazuh-install-files/credentials.env``.

   When you first access the Wazuh dashboard, your browser displays a warning that a trusted authority didn't issue the certificate. You can add an exception in the browser's advanced options. For better security, import the deployment's root CA into the browser's certificate manager instead. It's ``wazuh-install-files/root-ca.pem``, the same file as ``/etc/wazuh-dashboard/certs/indexer-ca.pem``. You can also configure a certificate from a trusted authority. The certificate names only the Wazuh dashboard addresses in ``config.yml``. To reach the dashboard by another address or DNS name without the warning, add it to the dashboard node's ``ip`` or ``dns`` list in ``config.yml``. Do this before you run ``-g``.
