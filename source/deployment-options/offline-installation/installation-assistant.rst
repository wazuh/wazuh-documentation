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

Make sure that copies of ``wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh`` and ``wazuh-offline.tar.gz`` are placed in your working directory.

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
      -  openssl
      -  procps-ng
      -  sed
      -  tar
      -  util-linux

   .. group-tab:: DEB

      -  adduser
      -  curl
      -  debconf
      -  diffutils
      -  gawk
      -  gnupg
      -  hostname
      -  iproute2
      -  libcap2-bin
      -  openssl
      -  procps
      -  tar
      -  util-linux

#. Run the following command to install all the central components on this host. ``-a|--all-in-one`` installs the Wazuh indexer, Wazuh manager, and Wazuh dashboard. ``--offline-installation`` installs them from ``wazuh-offline.tar.gz`` in the same directory as the script:

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh --offline-installation -a

   If Wazuh agents reach this host through an address it doesn't have, add the address with ``-as``, once per address. Examples are a NAT address or a public DNS name. For example:

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh --offline-installation -a -as 203.0.113.10 -as wazuh.example.com

   After the installation completes, the output shows the access credentials and a message confirming the installation was successful. There is one ``You can access`` line per address of the Wazuh dashboard certificate. In an interactive terminal, the ``Password:`` line shows the ``admin`` password, followed by the command that prints it again.

   .. code-block:: none
      :class: output

      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_IP_ADDRESS>:443
      INFO:     User: admin (Wazuh dashboard login and Wazuh indexer administrator)
      INFO:     Password: <ADMIN_PASSWORD>
      INFO:     To read the password again, run:
      INFO:         sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh-indexer/export/credentials.env | cut -d= -f2-
      INFO: The passwords of the other users are in /etc/wazuh-indexer/export/credentials.env and /etc/wazuh-manager/export/credentials.env.
      INFO: Installation finished.

#. Access the Wazuh web interface with your ``admin`` user credentials. This is the administrator account for the Wazuh indexer, and it allows you to access the Wazuh dashboard.

   -  **URL**: ``https://<WAZUH_DASHBOARD_IP_ADDRESS>``
   -  **Username**: ``admin``
   -  **Password**: the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value in ``/etc/wazuh-indexer/export/credentials.env``.

   When you first access the Wazuh dashboard, your browser displays a warning that a trusted authority did not issue the certificate. To trust it, import ``/etc/wazuh-dashboard/ca/root-ca.pem`` from this host into the browser's certificate manager. You can also add an exception in the browser's advanced options.

   If a firewall is active on this host, allow incoming connections to 443/TCP for the Wazuh dashboard and to 1517/TCP for Wazuh 5.x agents. Wazuh 4.x agents use 1514/TCP and 1515/TCP.

Multi-node offline installation
-------------------------------

Make sure that copies of ``wazuh-install-files.tar`` and ``wazuh-offline.tar.gz``, created in :ref:`Download the packages and configuration files <offline_installation_download>`, are in the working directory of every node.

On every node, the assistant also needs ``systemd``, ``grep``, ``tar``, ``coreutils``, ``sed``, ``gawk``, ``curl``, and ``procps`` (``procps-ng`` on RPM systems). Install any that are missing, together with each component's dependencies below.

Installing the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install and configure the Wazuh indexer nodes on a 64-bit (x86_64/AMD64 or AARCH64/ARM64) architecture. Install the following dependencies on the Wazuh indexer nodes, in addition to the :ref:`prerequisites <offline_installation_prerequisites>`:

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

#. Run the multi-node assisted method with the ``--offline-installation`` option to perform an offline installation. Use the option ``--wazuh-indexer`` and the node name to install and configure the Wazuh indexer. The node name must be the same one used in ``config.yml``, for example, ``indexer``.

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh --offline-installation --wazuh-indexer indexer

   Repeat this step for every Wazuh indexer node in your cluster. Then, proceed with initializing your multi-node cluster in the next step.

#. Run the Wazuh installation assistant with ``--offline-installation`` and ``--start-cluster`` on any Wazuh indexer node. This loads the new certificate information and starts the cluster:

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh --offline-installation --start-cluster

   .. note::

      You only have to initialize the cluster once; there is no need to run this command on every node. The assistant waits up to 300 seconds for the Wazuh indexer cluster to form, and names the Wazuh indexer nodes in ``config.yml`` that must be running. If the time runs out, start the Wazuh indexer service on those nodes and run ``--start-cluster`` again.

Testing the cluster installation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Run the following commands to confirm that the installation is successful. Replace ``<WAZUH_INDEXER_IP_ADDRESS>`` with the address of a Wazuh indexer node. When ``curl`` asks for the password, enter the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value that the first command shows. Every Wazuh indexer node holds the same value.

   .. code-block:: console

      # grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh-indexer/export/credentials.env | cut -d= -f2-
      # curl --cacert /etc/wazuh-indexer/export/ca.pem -u admin https://<WAZUH_INDEXER_IP_ADDRESS>:9200

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

#. Verify that the cluster is running correctly. Replace ``<WAZUH_INDEXER_IP_ADDRESS>`` in the following command, then execute it and enter the same password:

   .. code-block:: console

      # curl --cacert /etc/wazuh-indexer/export/ca.pem -u admin https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cat/nodes?v

   The output lists every Wazuh indexer node, and the node that manages the cluster has ``*`` in the ``cluster_manager`` column. For example:

   .. code-block:: none
      :class: output

      ip          heap.percent ram.percent cpu load_1m load_5m load_15m node.role node.roles                                        cluster_manager name
      10.0.0.1              37          89   9    0.27    0.24     0.18 dimr      cluster_manager,data,ingest,remote_cluster_client *               indexer
      10.0.0.2              44          91   5    0.09    0.09     0.02 dimr      cluster_manager,data,ingest,remote_cluster_client -               indexer-2

Installing the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install the following dependencies on the Wazuh manager nodes, besides the :ref:`prerequisites <offline_installation_prerequisites>`:

.. tabs::

   .. group-tab:: RPM

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
      -  gnupg
      -  hostname
      -  iproute2
      -  openssl
      -  util-linux

#. Run the installation assistant with the ``--offline-installation`` option to perform an offline installation. Use the option ``--wazuh-manager`` followed by the node name to install the Wazuh manager. The node name must be the same one used in ``config.yml``, for example, ``manager``.

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh --offline-installation --wazuh-manager manager

   Your Wazuh manager is now successfully installed. Repeat this step on every Wazuh manager node.

Installing the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install the following dependencies on the Wazuh dashboard node, besides the :ref:`prerequisites <offline_installation_prerequisites>`:

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

#. Run the installation assistant with the ``--offline-installation`` option to perform an offline installation. Use the option ``--wazuh-dashboard`` and the node name to install and configure the Wazuh dashboard. The node name must be the same one used in ``config.yml``, for example, ``dashboard``.

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh --offline-installation --wazuh-dashboard dashboard

   The Wazuh dashboard uses port 443. The installation assistant has no option to change it.

   After the installation completes, the output shows where the access credentials are and a message that confirms that the installation was successful.

   .. code-block:: none
      :class: output

      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_IP_ADDRESS>:443
      INFO:     User: admin (Wazuh dashboard login and Wazuh indexer administrator)
      INFO:     Password: to read it from wazuh-install-files.tar, run:
      INFO:         sudo tar -xOf wazuh-install-files.tar wazuh-install-files/credentials.env | grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' | cut -d= -f2-
      INFO: The passwords of the other users are in wazuh-install-files/credentials.env of wazuh-install-files.tar.
      INFO: Installation finished.

   You have now installed and configured Wazuh.

#. Access the Wazuh web interface with your ``admin`` user credentials. This is the administrator account for the Wazuh indexer, and it allows you to access the Wazuh dashboard.

   -  **URL**: ``https://<WAZUH_DASHBOARD_IP_ADDRESS>``
   -  **Username**: ``admin``
   -  **Password**: the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value in ``wazuh-install-files/credentials.env`` of ``wazuh-install-files.tar``. Run the command that the summary shows to read it.

   When you first access the Wazuh dashboard, your browser displays a warning that a trusted authority didn't issue the certificate. You can add an exception in the browser's advanced options. For better security, import the ``root-ca.pem`` file you generated earlier into the browser's certificate manager instead. You can also configure a certificate from a trusted authority. The certificate names only the Wazuh dashboard addresses in ``config.yml``. To reach the dashboard by another address or DNS name without the warning, add it to the dashboard node's ``ip`` or ``dns`` list in ``config.yml``. Do this before you run ``-g``.
