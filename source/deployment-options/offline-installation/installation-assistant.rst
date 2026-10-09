.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Discover the offline assisted installation method to install the Wazuh central components without connection to the Internet.

Install Wazuh components using the assisted method
==================================================

All-in-one offline installation
-------------------------------

Use the Wazuh assisted installation method to install and configure the Wazuh indexer, Wazuh manager, and Wazuh dashboard on one 64-bit (x86_64/AMD64 or AARCH64/ARM64) host.

.. note::

   You need root user privileges to run all the commands described below.

Make sure that copies of the ``wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh`` and ``wazuh-offline.tar.gz`` files are placed in your working directory.

Install the following dependencies from your local package mirror, installation media, or copied packages (see :ref:`Prerequisites <offline_installation_prerequisites>`) before you run the assistant on this host.

.. tabs::

   .. group-tab:: RPM

      -  coreutils
      -  curl
      -  diffutils
      -  findutils
      -  gawk
      -  gnupg2
      -  grep
      -  hostname
      -  iproute
      -  libcap
      -  lsof
      -  openssl
      -  procps-ng
      -  sed
      -  tar
      -  util-linux

   .. group-tab:: DEB

      -  adduser
      -  apt-transport-https
      -  curl
      -  debconf
      -  diffutils
      -  gnupg
      -  hostname
      -  iproute2
      -  libcap2-bin
      -  lsof
      -  openssl
      -  procps
      -  tar
      -  util-linux

#. Run the following command to install all the central components on this host. ``-a|--all-in-one`` installs the Wazuh indexer, Wazuh manager, and Wazuh dashboard, and ``--offline-installation`` installs them from ``wazuh-offline.tar.gz`` in the same directory as the script:

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh --offline-installation -a

   If Wazuh agents reach this host through an address that it doesn't have, such as a NAT address or a public DNS name, add the address with ``-as``, once per address. For example:

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh --offline-installation -a -as 203.0.113.10 -as wazuh.example.com

   After the installation completes, the output shows where the access credentials are, and a message confirming the installation was successful.

   .. code-block:: none
      :class: output

      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_ADDRESS>:443
      INFO:     User: admin (Wazuh dashboard login and Wazuh indexer administrator)
      INFO:     Password: to read it from the credentials file, run:
      INFO:         sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-
      INFO: The other users of the deployment are listed at the top of /etc/wazuh/credentials.env.
      INFO: Installation finished.

   .. note::

      The assisted all-in-one installation creates the root CA on this host. Its private key, ``root-ca.key``, is in ``/etc/wazuh/ca``, and the five passwords are in ``/etc/wazuh/credentials.env``. No ``wazuh-install-files.tar`` is created. Back up ``/etc/wazuh/ca`` and store the passwords before you remove ``/etc/wazuh/credentials.env``. You need the root CA private key to add nodes and to renew certificates.

#. Access the Wazuh web interface with your ``admin`` user credentials. This is the administrator account for the Wazuh indexer, and it allows you to access the Wazuh dashboard.

   -  **URL**: ``https://<WAZUH_DASHBOARD_ADDRESS>``. Replace ``<WAZUH_DASHBOARD_ADDRESS>`` with an address of this host that your browser can reach.
   -  **Username**: ``admin``
   -  **Password**: the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value in ``/etc/wazuh/credentials.env``. Run the following command to show it.

      .. code-block:: console

         # grep -m 1 '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-

   When you first access the Wazuh dashboard, your browser displays a warning that a trusted authority did not issue the certificate. To trust it, import ``/etc/wazuh/ca/root-ca.pem`` from this host into the certificate manager of the browser, or add an exception in the advanced options of the browser. The dashboard certificate names the addresses of this host, not the addresses you add with ``-as``.

   If a firewall is active on this host, allow incoming connections to 443/TCP for the Wazuh dashboard and to 1517/TCP for Wazuh 5.x agents. Wazuh 4.x agents use 1514/TCP and 1515/TCP.

Multi-node offline installation
-------------------------------

Installing the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install and configure the Wazuh indexer nodes on a 64-bit (x86_64/AMD64 or AARCH64/ARM64) architecture.

Install the following dependencies from your local package mirror, installation media, or copied packages (see :ref:`Prerequisites <offline_installation_prerequisites>`) before you run the assistant on the Wazuh indexer nodes.

.. tabs::

   .. group-tab:: RPM

      -  coreutils
      -  curl
      -  diffutils
      -  gnupg2
      -  hostname
      -  iproute
      -  lsof
      -  openssl
      -  procps-ng
      -  tar
      -  util-linux

   .. group-tab:: DEB

      -  adduser
      -  curl
      -  debconf
      -  diffutils
      -  gnupg
      -  iproute2
      -  lsof
      -  openssl
      -  procps
      -  tar

#. Run the multi-node assisted method with the ``--offline-installation`` option to perform an offline installation. Use the option ``--wazuh-indexer`` and the node name to install and configure the Wazuh indexer. The node name must be the same one used in ``config.yml`` in step 4 of :ref:`Download the packages and configuration files <offline_installation_download>`, for example, ``indexer``.

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh --offline-installation --wazuh-indexer indexer

   Repeat this step for every Wazuh indexer node in your cluster. Then, proceed with initializing your multi-node cluster in the next step.

#. Run the Wazuh installation assistant with the ``--offline-installation`` and ``--start-cluster`` options on any Wazuh indexer node to load the new certificate information and start the cluster:

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh --offline-installation --start-cluster

   .. note::

      You only have to initialize the cluster once; there is no need to run this command on every node.

Testing the cluster installation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Run the following command to confirm that the installation is successful. Replace ``<WAZUH_INDEXER_ADDRESS>`` with the address of a Wazuh indexer node. When ``curl`` asks for the password, enter the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value from ``/etc/wazuh/credentials.env`` on any Wazuh indexer node, or from the ``credentials.env`` file in ``wazuh-install-files.tar``. Every node holds the same value.

   .. code-block:: console

      # grep -m 1 '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-
      # curl -k -u admin https://<WAZUH_INDEXER_ADDRESS>:9200

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      {
        "name" : "indexer",
        "cluster_name" : "wazuh-cluster",
        "cluster_uuid" : "095jEW-oRJSFKLz5wmo5PA",
        "version" : {
          "distribution" : "opensearch",
          "number" : "3.6.0",
          ...
        },
        "tagline" : "The OpenSearch Project: https://opensearch.org/"
      }

#. Verify that the cluster is running correctly. Replace ``<WAZUH_INDEXER_ADDRESS>`` in the following command, then execute it and enter the same password:

   .. code-block:: console

      # curl -k -u admin https://<WAZUH_INDEXER_ADDRESS>:9200/_cat/nodes?v

   The output lists every Wazuh indexer node, and the node that manages the cluster has ``*`` in the ``cluster_manager`` column. For example:

   .. code-block:: none
      :class: output

      ip          heap.percent ram.percent cpu load_1m load_5m load_15m node.role node.roles                                        cluster_manager name
      10.0.0.1              37          89   9    0.27    0.24     0.18 dimr      cluster_manager,data,ingest,remote_cluster_client *               indexer
      10.0.0.2              44          91   5    0.09    0.09     0.02 dimr      cluster_manager,data,ingest,remote_cluster_client -               indexer-2

Installing the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install the following dependencies from your local package mirror, installation media, or copied packages (see :ref:`Prerequisites <offline_installation_prerequisites>`) before you run the assistant on the Wazuh manager nodes.

.. tabs::

   .. group-tab:: RPM

      -  coreutils
      -  curl
      -  diffutils
      -  findutils
      -  gawk
      -  gnupg2
      -  grep
      -  hostname
      -  iproute
      -  lsof
      -  openssl
      -  sed
      -  tar
      -  util-linux

   .. group-tab:: DEB

      -  apt-transport-https
      -  curl
      -  diffutils
      -  gnupg
      -  hostname
      -  iproute2
      -  lsof
      -  openssl
      -  tar
      -  util-linux

#. Run the installation assistant with the ``--offline-installation`` option to perform an offline installation. Use the option ``--wazuh-manager`` followed by the node name to install the Wazuh manager. The node name must be the same one used in ``config.yml`` in step 4 of :ref:`Download the packages and configuration files <offline_installation_download>`, for example, ``manager``.

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh --offline-installation --wazuh-manager manager

   Your Wazuh manager is now successfully installed. Repeat this step on every Wazuh manager node.

Installing the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install the following dependencies from your local package mirror, installation media, or copied packages (see :ref:`Prerequisites <offline_installation_prerequisites>`) before you run the assistant on the Wazuh dashboard node.

.. tabs::

   .. group-tab:: RPM

      -  curl
      -  diffutils
      -  gnupg2
      -  libcap
      -  lsof
      -  openssl
      -  tar
      -  util-linux

   .. group-tab:: DEB

      -  adduser
      -  curl
      -  debconf
      -  diffutils
      -  gnupg
      -  libcap2-bin
      -  lsof
      -  openssl
      -  tar

#. Run the installation assistant with the ``--offline-installation`` option to perform an offline installation. Use the option ``--wazuh-dashboard`` and the node name to install and configure the Wazuh dashboard. The node name must be the same one used in ``config.yml`` in step 4 of :ref:`Download the packages and configuration files <offline_installation_download>`, for example, ``dashboard``.

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh --offline-installation --wazuh-dashboard dashboard

   The Wazuh dashboard uses port 443. The installation assistant has no option to change it.

   After the installation completes, the output shows where the access credentials are and a message that confirms that the installation was successful.

   .. code-block:: none
      :class: output

      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_ADDRESS>:443
      INFO:     User: admin (Wazuh dashboard login and Wazuh indexer administrator)
      INFO:     Password: to read it from wazuh-install-files.tar, run:
      INFO:         sudo tar -xOf wazuh-install-files.tar wazuh-install-files/credentials.env | grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' | cut -d= -f2-
      INFO: The other users of the deployment are listed at the top of wazuh-install-files/credentials.env of wazuh-install-files.tar.
      INFO: Installation finished.

   You have now installed and configured Wazuh.

#. Access the Wazuh web interface with your ``admin`` user credentials. This is the administrator account for the Wazuh indexer, and it allows you to access the Wazuh dashboard.

   -  **URL**: ``https://<WAZUH_DASHBOARD_ADDRESS>``
   -  **Username**: ``admin``
   -  **Password**: the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value. Run the command that the summary shows to read it.

   When you first access the Wazuh dashboard, your browser displays a warning that a trusted authority did not issue the certificate. An exception can be added in the advanced options of the web browser. For increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser instead. Alternatively, a certificate from a trusted authority can be configured. The certificate names only the Wazuh dashboard addresses in ``config.yml``. To reach the dashboard by another address or a DNS name without the warning, add it to the ``ip`` or ``dns`` list of the dashboard node in ``config.yml`` before you run ``-g``.
