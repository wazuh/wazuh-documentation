Install Wazuh components using the assisted method
--------------------------------------------------

Single-node offline installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use the Wazuh assisted installation method to install and configure the single-node server on a 64-bit (x86_64/AMD64 or AARCH64/ARM64) architecture.

.. note::

   You need root user privileges to run all the commands described below.

Make sure that copies of the ``wazuh-install-5.0.0-beta1.sh``, ``wazuh-install-files.tar``, and ``wazuh-offline.tar.gz`` files created during the initial configuration step are placed in your working directory.

The following dependencies must be installed on the Wazuh single node.

.. tabs::

   .. group-tab:: RPM

      -  coreutils
      -  yum-utils
      -  libcap

   .. group-tab:: DEB

      -  debconf
      -  adduser
      -  procps
      -  apt-transport-https
      -  gnupg
      -  debhelper (version 9 or later)
      -  libcap2-bin

#. Run the following command to perform the offline installation with the ``--offline-installation`` option on a single-node using the assisted method:

   .. code-block:: console

      # bash wazuh-install-5.0.0-beta1.sh --offline-installation -a

   After the installation completes, the output shows the access credentials and a message confirming the installation was successful.

   .. code-block:: none
      :class: output

      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_IP_ADDRESS>:443
          User: admin
          Password: admin
      INFO: Installation finished.

#. Access the Wazuh web interface with your ``admin`` user credentials. This is the default administrator account for the Wazuh indexer, and it allows you to access the Wazuh dashboard.

   -  **URL**: ``https://<WAZUH_DASHBOARD_IP_ADDRESS>``
   -  **Username**: ``admin``
   -  **Password**: ``admin``

Multi-node offline installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Installing the Wazuh indexer
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install and configure the Wazuh indexer nodes on a 64-bit (x86_64/AMD64 or AARCH64/ARM64) architecture.

The following dependencies must be installed on the Wazuh indexer nodes.

.. tabs::

   .. group-tab:: RPM

      -  coreutils
      -  lsof
      -  openssl

   .. group-tab:: DEB

      -  debconf
      -  adduser
      -  procps
      -  apt-transport-https

#. Run the multi-node assisted method with the ``--offline-installation`` option to perform an offline installation. Use the option ``--wazuh-indexer`` and the node name to install and configure the Wazuh indexer. The node name must be the same one used in the ``config.yml`` file for the initial configuration, for example, ``indexer-1``.

   .. code-block:: console

      # bash wazuh-install-5.0.0-beta1.sh --offline-installation --wazuh-indexer indexer-1

   Repeat this step for every Wazuh indexer node in your cluster. Then, proceed with initializing your multi-node cluster in the next step.

-  Run the Wazuh installation assistant with the ``--offline-installation`` and ``--start-cluster`` options on any Wazuh indexer node to load the new certificate information and start the cluster:

   .. code-block:: console

      # bash wazuh-install-5.0.0-beta1.sh --offline-installation --start-cluster

   .. note::

      You only have to initialize the cluster once; there is no need to run this command on every node.

Testing the cluster installation
""""""""""""""""""""""""""""""""

#. Run the following command to confirm that the installation is successful.

   .. code-block:: console

      # curl -k -u admin:admin https://<WAZUH_INDEXER_IP_ADDRESS>:9200

   .. code-block:: none
      :class: output

      {
        "name" : "indexer",
        "cluster_name" : "wazuh-cluster",
        "cluster_uuid" : "095jEW-oRJSFKLz5wmo5PA",
        "version" : {
          "number" : "7.10.2",
          "build_type" : "rpm",
          "build_hash" : "db90a415ff2fd428b4f7b3f800a51dc229287cb4",
          "build_date" : "2023-06-03T06:24:25.112415503Z",
          "build_snapshot" : false,
          "lucene_version" : "9.6.0",
          "minimum_wire_compatibility_version" : "7.10.0",
          "minimum_index_compatibility_version" : "7.0.0"
        },
        "tagline" : "The OpenSearch Project: https://opensearch.org/"
      }

#. Verify that the cluster is running correctly. Replace ``<WAZUH_INDEXER_IP_ADDRESS>`` in the following command, then execute it:

   .. code-block:: console

      # curl -k -u admin:admin https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cat/nodes?v

Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::

   .. group-tab:: RPM

      On systems with ``yum`` as the package manager, the following dependencies must be installed on the Wazuh manager nodes.

      -  libcap

   .. group-tab:: DEB

      On systems with ``apt`` as the package manager, the following dependencies must be installed on the Wazuh manager nodes.

      -  apt-transport-https
      -  gnupg

#. Run the installation assistant with the ``--offline-installation`` option to perform an offline installation. Use the option ``--wazuh-manager`` followed by the node name to install the Wazuh manager. The node name must be the same one used in the ``config.yml`` file for the initial configuration, for example, ``manager-1``.

   .. code-block:: console

      # bash wazuh-install-5.0.0-beta1.sh --offline-installation --wazuh-manager manager-1

Your Wazuh manager is now successfully installed. Repeat this step on every Wazuh manager node.

Installing the Wazuh dashboard
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following dependencies must be installed on the Wazuh dashboard node.

.. tabs::

   .. group-tab:: RPM

      -  libcap

   .. group-tab:: DEB

      -  debhelper (version 9 or later)
      -  tar
      -  curl
      -  libcap2-bin

#. Run the installation assistant with the ``--offline-installation`` option to perform an offline installation. Use the option ``--wazuh-dashboard`` and the node name to install and configure the Wazuh dashboard. The node name must be the same one used in the ``config.yml`` file for the initial configuration, for example, ``dashboard``.

   .. code-block:: console

      # bash wazuh-install-5.0.0-beta1.sh --offline-installation --wazuh-dashboard dashboard

   The Wazuh dashboard uses port ``443`` by default. You can change this port using the optional parameter ``-p|--port <PORT_NUMBER>``. Some recommended ports are 8443, 8444, 8080, 8888, and 9000.

   After the installation completes, the output shows the access credentials and a message that confirms that the installation was successful.

   .. code-block:: none
      :class: output

      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_IP_ADDRESS>
         User: admin
         Password: admin

      INFO: Installation finished.

   You have now installed and configured Wazuh.

#. Access the Wazuh web interface with your ``admin`` user credentials. This is the default administrator account for the Wazuh indexer, and it allows you to access the Wazuh dashboard.

   -  **URL**: ``https://<WAZUH_DASHBOARD_IP_ADDRESS>``
   -  **Username**: ``admin``
   -  **Password**: ``admin``

   When you first access the Wazuh dashboard, your browser displays a warning that a trusted authority did not issue the certificate. An exception can be added in the advanced options of the web browser. For increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser instead. Alternatively, a certificate from a trusted authority can be configured.
