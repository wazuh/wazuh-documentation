.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Follow these steps to install the Wazuh central components offline, without connection to the Internet.

Install Wazuh components step by step
=====================================

Run these steps on each offline host, in the directory where you copied the files in step 6 of :ref:`Download the packages and configuration files <offline_installation_download>`. For an all-in-one deployment, run every section on the same host.

#. Navigate to the directory containing ``wazuh-offline.tar.gz`` and ``wazuh-install-files.tar``, then run the following command to decompress the installation files:

   .. code-block:: console

      # tar xf wazuh-offline.tar.gz
      # tar xf wazuh-install-files.tar

#. Verify the package signatures with ``GPG-KEY-WAZUH``, the key you downloaded in step 3 of :ref:`Download the packages and configuration files <offline_installation_download>`.

   .. tabs::

      .. group-tab:: RPM

         .. code-block:: console

            # rpm --import GPG-KEY-WAZUH
            # rpm -K ./wazuh-offline/wazuh-packages/*.rpm

         Each package must show ``digests signatures OK``.

      .. group-tab:: DEB

         The DEB packages carry their signature in a ``_gpgbuilder`` member. Reading it needs ``ar``, from the ``binutils`` package. Run the following commands for each package, replacing ``<PACKAGE>`` with ``wazuh-indexer``, ``wazuh-manager``, and ``wazuh-dashboard`` in turn:

         .. code-block:: console

            # gpg --import GPG-KEY-WAZUH
            # mkdir -p verify-<PACKAGE> && cd verify-<PACKAGE>
            # ar x ../wazuh-offline/wazuh-packages/<PACKAGE>_*.deb
            # gpg --verify _gpgbuilder
            # sha1sum debian-binary control.tar.* data.tar.*
            # cd ..

         ``gpg`` must report a good signature from ``Wazuh.com (Wazuh Signing Key) <support@wazuh.com>``, with primary key fingerprint ``0DCF CA55 47B1 9D2A 6099 5060 96B3 EE5F 2911 1145``. Each SHA-1 checksum must match the one listed for that file in ``_gpgbuilder``.

Installing the Wazuh indexer
----------------------------

Install and configure the Wazuh indexer on each indexer node. Before installing Wazuh, install the required dependencies from your local package mirror, installation media, or copied packages (see :ref:`Prerequisites <offline_installation_prerequisites>`), as they are not included in the offline bundle.

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

      -  diffutils
      -  iproute2
      -  openssl
      -  procps

#. In the directory where you extracted ``wazuh-install-files.tar``, place the passwords, the root CA certificate, and this node's certificates **before installing the package**. The package then uses them instead of generating its own passwords and its own root CA. Replace ``<INDEXER_NODE_NAME>`` with the name of the Wazuh indexer node you are configuring as defined in the ``config.yml`` file. For example, ``indexer``.

   .. code-block:: console

      # NODE_NAME=<INDEXER_NODE_NAME>

   .. code-block:: console

      # install -d -m 0700 -o root -g root /etc/wazuh /etc/wazuh/ca
      # install -m 0644 wazuh-install-files/root-ca.pem /etc/wazuh/ca/root-ca.pem
      # [ -e /etc/wazuh/credentials.env ] || install -m 0600 /dev/null /etc/wazuh/credentials.env
      # for key in WAZUH_INDEXER_ADMIN_PASSWORD WAZUH_INDEXER_KIBANASERVER_PASSWORD WAZUH_INDEXER_MANAGER_PASSWORD; do
          sed -i "/^${key}=/d" /etc/wazuh/credentials.env
          grep "^${key}=" wazuh-install-files/credentials.env >> /etc/wazuh/credentials.env
        done
      # install -d -m 0750 /etc/wazuh-indexer
      # install -d -m 0500 /etc/wazuh-indexer/certs
      # install -m 0400 wazuh-install-files/$NODE_NAME.pem /etc/wazuh-indexer/certs/indexer.pem
      # install -m 0400 wazuh-install-files/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
      # install -m 0400 wazuh-install-files/admin.pem /etc/wazuh-indexer/certs/admin.pem
      # install -m 0400 wazuh-install-files/admin-key.pem /etc/wazuh-indexer/certs/admin-key.pem

#. Install the Wazuh indexer package.

   .. tabs::

      .. group-tab:: RPM

         .. code-block:: console

            # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-indexer*.rpm

      .. group-tab:: DEB

         .. code-block:: console

            # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-indexer*.deb

#. The package sets the Wazuh indexer heap to 1 GB. Set the heap size as the installation assistant does. Use half of the host memory, the ``total`` value in the ``Mem:`` row of ``free -m``, for a Wazuh indexer node, or one quarter when the Wazuh manager and Wazuh dashboard share the host. Replace ``<HEAP_SIZE>`` with the calculated value in megabytes followed by ``m``, for example, ``4096m``.

   Run the following command:

   .. code-block:: console

      # sed -i 's/-Xms1g/-Xms<HEAP_SIZE>/; s/-Xmx1g/-Xmx<HEAP_SIZE>/' /etc/wazuh-indexer/jvm.options

#. Edit ``/etc/wazuh-indexer/opensearch.yml`` and replace the following values:

   #. ``network.host``: Sets the address of this node for both HTTP and transport traffic. The node will bind to this address and will also use it as its publish address. Accepts an IP address or a hostname.

      Use the same node address set in the ``config.yml`` file to create the SSL certificates.

   #. ``node.name``: Name of the Wazuh indexer node as defined in the ``config.yml`` file. For example, ``indexer``.

   #. ``cluster.initial_cluster_manager_nodes``: List of the names of the master-eligible nodes. These names are defined in the ``config.yml`` file. Replace the ``node-1`` entry the package wrote, and add one line per node, according to your ``config.yml`` file definitions.

      .. code-block:: yaml

         cluster.initial_cluster_manager_nodes:
         - "indexer"
         - "indexer-2"
         - "indexer-3"

   #. ``discovery.seed_hosts``: List of the addresses of the master-eligible nodes. Each element can be either an IP address or a hostname. You can leave this setting commented if you are configuring the Wazuh indexer as a single-node. For multi-node configurations, uncomment this setting and set your master-eligible node addresses.

      .. code-block:: yaml

         discovery.seed_hosts:
           - "10.0.0.1"
           - "10.0.0.2"
           - "10.0.0.3"

   #. ``plugins.security.nodes_dn``: List of the Distinguished Names of the certificates of all the Wazuh indexer cluster nodes. The package writes only one line: replace it with one line per Wazuh indexer node, using the names from your ``config.yml`` file in this order:

      .. code-block:: yaml

         plugins.security.nodes_dn:
         - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=indexer"
         - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=indexer-2"
         - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=indexer-3"

#. Enable and start the Wazuh indexer service.

   .. include:: /_templates/installations/indexer/common/enable_indexer.rst

#. For multi-node clusters, repeat the previous steps on every Wazuh indexer node.

#. After all Wazuh indexer nodes are running, run ``indexer-security-init.sh`` on any indexer node to load the new certificate information and start the cluster.

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

#. Run the following command to check that the installation is successful. Replace ``<WAZUH_INDEXER_ADDRESS>`` with the address of a Wazuh indexer node. When ``curl`` asks for the password, enter the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value. Every Wazuh indexer node holds the same value, received from ``wazuh-install-files.tar``.

   .. code-block:: console

      # grep -m 1 '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-
      # curl -k -u admin https://<WAZUH_INDEXER_ADDRESS>:9200

   The following is an example response.

   .. code-block:: none
      :class: output

      {
        "name" : "indexer",
        "cluster_name" : "wazuh-cluster",
        "cluster_uuid" : "bMp5Us0Asa2kNzabFJ97jg",
        "version" : {
          "distribution" : "opensearch",
          "number" : "3.6.0",
          "build_type" : "deb",
          ...
        },
        "tagline" : "The OpenSearch Project: https://opensearch.org/"
      }

Installing the Wazuh manager
----------------------------

Install and configure the Wazuh manager on each manager node. Before installing Wazuh, install the required dependencies from your local package mirror, installation media, or copied packages (see :ref:`Prerequisites <offline_installation_prerequisites>`), as they are not included in the offline bundle.

.. tabs::

   .. group-tab:: RPM

      -  coreutils
      -  diffutils
      -  findutils
      -  gawk
      -  grep
      -  hostname
      -  iproute
      -  openssl
      -  sed
      -  util-linux

   .. group-tab:: DEB

      -  curl
      -  diffutils
      -  hostname
      -  iproute2
      -  openssl
      -  util-linux

#. In the directory where you extracted ``wazuh-install-files.tar``, place the passwords, the root CA certificate, and this node's certificates **before installing the package**. Replace ``<MANAGER_NODE_NAME>`` with the name of the Wazuh manager node you are configuring as defined in the ``config.yml`` file. For example, ``manager``.

   .. code-block:: console

      # NODE_NAME=<MANAGER_NODE_NAME>

   .. code-block:: console

      # install -d -m 0700 -o root -g root /etc/wazuh /etc/wazuh/ca
      # install -m 0644 wazuh-install-files/root-ca.pem /etc/wazuh/ca/root-ca.pem
      # [ -e /etc/wazuh/credentials.env ] || install -m 0600 /dev/null /etc/wazuh/credentials.env
      # for key in WAZUH_MANAGER_API_PASSWORD WAZUH_MANAGER_WUI_PASSWORD WAZUH_INDEXER_MANAGER_PASSWORD; do
          sed -i "/^${key}=/d" /etc/wazuh/credentials.env
          grep "^${key}=" wazuh-install-files/credentials.env >> /etc/wazuh/credentials.env
        done
      # mkdir -p /var/wazuh-manager/etc/certs
      # install -m 0640 wazuh-install-files/$NODE_NAME.pem /var/wazuh-manager/etc/certs/indexer-connector.pem
      # install -m 0640 wazuh-install-files/$NODE_NAME-key.pem /var/wazuh-manager/etc/certs/indexer-connector-key.pem
      # install -m 0640 wazuh-install-files/$NODE_NAME-remoted.pem /var/wazuh-manager/etc/certs/remoted.pem
      # install -m 0640 wazuh-install-files/$NODE_NAME-remoted-key.pem /var/wazuh-manager/etc/certs/remoted-key.pem

   ``remoted.pem`` is the agent listener certificate, served on port 1517 and reused by enrollment on port 1515. The package gives each file its owner and copies ``root-ca.pem`` to ``/var/wazuh-manager/etc/certs/``.

#. Install the Wazuh manager package.

   .. tabs::

      .. group-tab:: RPM

         .. code-block:: console

            # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-manager*.rpm

      .. group-tab:: DEB

         .. code-block:: console

            # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-manager*.deb

#. Run the following command to check that the agent listener certificate comes from the deployment's root CA. Agents reject a Wazuh manager node whose certificate fails this check:

   .. code-block:: console

      # openssl verify -CAfile /var/wazuh-manager/etc/certs/root-ca.pem /var/wazuh-manager/etc/certs/remoted.pem

#. Verify that the Wazuh manager package used the deployment passwords during installation. The package stores the Wazuh indexer credential (``WAZUH_INDEXER_MANAGER_PASSWORD``) in the Wazuh manager keystore automatically, so no additional keystore configuration step is required:

   .. code-block:: console

      # grep '^WAZUH_INDEXER_MANAGER_PASSWORD=' /etc/wazuh/credentials.env | cmp -s - <(grep '^WAZUH_INDEXER_MANAGER_PASSWORD=' wazuh-install-files/credentials.env) && echo OK

   To change this credential later, use the Wazuh passwords tool, as described in :ref:`Changing the password for a Wazuh indexer user <offline_installation_change_indexer_password>`.

#. In the ``<indexer>`` block of ``/var/wazuh-manager/etc/wazuh-manager.conf``, replace ``127.0.0.1`` with the addresses of the Wazuh indexer nodes, using one ``<host>`` entry per node. The package automatically creates the ``<indexer>`` block and configures the ``<ssl>`` certificate paths during installation, pointing to the certificates generated in step 1. Only update the ``<host>`` entries. Apply this change on every Wazuh manager node, as this configuration is not synchronized across the cluster.

   .. code-block:: xml
      :emphasize-lines: 3, 4

      <indexer>
        <hosts>
          <host>https://<WAZUH_INDEXER_1_ADDRESS>:9200</host>
          <host>https://<WAZUH_INDEXER_2_ADDRESS>:9200</host>
        </hosts>
        ...
      </indexer>

#. Enable and start the Wazuh manager service.

   .. include:: /_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Run the following command to verify that the Wazuh manager status is active.

   .. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst

Wazuh cluster configuration for multi-node deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After completing the installation of the Wazuh manager on every node, you must configure one manager node as the master and the rest as workers. If you have only one Wazuh manager node, skip Configuring the Wazuh manager master node and Testing the Wazuh manager cluster, and go to Installing the Wazuh dashboard: the package already configures that node as the master, and ``wazuh-install-files.tar`` holds a ``clusterkey`` file only when ``config.yml`` lists more than one Wazuh manager node.

Configuring the Wazuh manager master node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Edit the following settings in the ``/var/wazuh-manager/etc/wazuh-manager.conf`` configuration file. Replace ``<CLUSTER_KEY>`` with the key in ``wazuh-install-files/clusterkey``, which the following command shows, and ``<WAZUH_MASTER_ADDRESS>`` with the IP address of the master node.

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

   Repeat these configuration steps for every Wazuh manager worker node in your cluster, with ``<node_type>worker</node_type>``, a unique ``<node_name>``, the same ``<key>`` and ``<WAZUH_MASTER_ADDRESS>`` in ``<nodes>``.

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

Installing the Wazuh dashboard
------------------------------

Install and configure the Wazuh dashboard node. Before installing Wazuh, install the required dependencies from your local package mirror, installation media, or copied packages (see :ref:`Prerequisites <offline_installation_prerequisites>`), as they are not included in the offline bundle.

.. tabs::

   .. group-tab:: RPM

      -  diffutils
      -  libcap
      -  openssl
      -  util-linux

   .. group-tab:: DEB

      -  adduser
      -  curl
      -  debconf
      -  libcap2-bin
      -  openssl
      -  tar

#. In the directory where you extracted ``wazuh-install-files.tar``, place the passwords, the root CA certificate, and this node's certificates **before installing the package**. Replace ``<DASHBOARD_NODE_NAME>`` with your Wazuh dashboard node name, the same used in the ``config.yml`` file to create the certificates. For example, ``dashboard``.

   .. code-block:: console

      # NODE_NAME=<DASHBOARD_NODE_NAME>

   .. code-block:: console

      # install -d -m 0700 -o root -g root /etc/wazuh /etc/wazuh/ca
      # install -m 0644 wazuh-install-files/root-ca.pem /etc/wazuh/ca/root-ca.pem
      # [ -e /etc/wazuh/credentials.env ] || install -m 0600 /dev/null /etc/wazuh/credentials.env
      # for key in WAZUH_INDEXER_KIBANASERVER_PASSWORD WAZUH_MANAGER_WUI_PASSWORD; do
          sed -i "/^${key}=/d" /etc/wazuh/credentials.env
          grep "^${key}=" wazuh-install-files/credentials.env >> /etc/wazuh/credentials.env
        done
      # mkdir -p /etc/wazuh-dashboard/certs
      # install -m 0400 wazuh-install-files/$NODE_NAME.pem /etc/wazuh-dashboard/certs/dashboard.pem
      # install -m 0400 wazuh-install-files/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/dashboard-key.pem

#. Install the Wazuh dashboard package, then assign ownership of the certificates to the Wazuh dashboard service user so the service can access them.

   .. tabs::

      .. group-tab:: RPM

         .. code-block:: console

            # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-dashboard*.rpm

      .. group-tab:: DEB

         .. code-block:: console

            # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-dashboard*.deb

   .. code-block:: console

      # chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs
      # chmod 500 /etc/wazuh-dashboard/certs

#. Edit the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file. The package already configures ``server.host``, ``server.port``, and ``opensearch.ssl.verificationMode``. Verify these values and update only ``opensearch.hosts`` and ``wazuh_core.hosts.url``:

   .. code-block:: yaml
      :emphasize-lines: 3, 8

      server.host: 0.0.0.0
      server.port: 443
      opensearch.hosts: ["https://10.0.0.2:9200", "https://10.0.0.3:9200", "https://10.0.0.4:9200"]
      opensearch.ssl.verificationMode: certificate
      ...
      wazuh_core.hosts:
        default:
          url: https://10.0.0.3
          port: 55000
          username: wazuh-wui
          run_as: true

   -  ``server.host``: This setting specifies the host of the Wazuh dashboard server. To allow remote users to connect, set the value to the IP address or DNS name of the Wazuh dashboard. The value ``0.0.0.0`` accepts all available IP addresses on the host.
   -  ``opensearch.hosts``: The URLs of the Wazuh indexer instances to use for all your queries.

      Set this value to the Wazuh indexer node addresses, even when all components share the same host. The Wazuh dashboard can connect to multiple Wazuh indexer nodes in the same cluster. The addresses of the nodes can be separated by commas. For example, ``["https://10.0.0.2:9200", "https://10.0.0.3:9200","https://10.0.0.4:9200"]``
   -  ``wazuh_core.hosts``: The Wazuh manager hosts that the dashboard will use to query the Wazuh manager API. At least one host is required. Each host entry is defined with a unique ID and must include:

      -  ``url``: The URL to the Wazuh manager API, including the protocol and address (DNS or IP). The Wazuh manager API runs only on the master node.
      -  ``port``: The port where it is served.
      -  ``username``: The user who runs the requests.
      -  ``run_as``: This defines how the dashboard requests the data, using the current user's context (true).

#. Enable and start the Wazuh dashboard service:

   .. include:: /_templates/installations/dashboard/enable_dashboard.rst

#. Run the following command to verify the Wazuh dashboard service is active.

   .. include:: /_templates/installations/wazuh/common/check_wazuh_dashboard.rst

#. Access the Wazuh web interface.

   -  **URL**: ``https://<WAZUH_DASHBOARD_ADDRESS>``
   -  **Username**: ``admin``
   -  **Password**: the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value in the ``credentials.env`` file of ``wazuh-install-files.tar``, or in ``/etc/wazuh/credentials.env`` of a Wazuh indexer node.

   Upon first accessing the Wazuh dashboard, the browser displays a warning that a trusted authority did not issue the certificate. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported into the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured. The certificate names only the Wazuh dashboard addresses in ``config.yml``. To reach the dashboard by another address or a DNS name without the warning, add it to the ``ip`` or ``dns`` list of the dashboard node in ``config.yml`` before you run ``-g``.
