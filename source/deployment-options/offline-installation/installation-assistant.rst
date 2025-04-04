Install Wazuh components using the assistant
--------------------------------------------

Install and configure the different Wazuh components on a 64-bit (x86_64/AMD64 or AARCH64/ARM64) architecture with the aid of the Wazuh installation assistant.

.. note:: You need root user privileges to run all the commands described below.

Please, make sure that a copy of the ``wazuh-install-files.tar`` and ``wazuh-offline.tar.gz`` files, created during the initial configuration step, is placed in your working directory.

Installing the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install and configure the Wazuh indexer nodes.

.. tabs::

   .. group-tab:: RPM

      The following dependencies must be installed on the Wazuh indexer nodes.

      -  coreutils

   .. group-tab:: DEB

      The following dependencies must be installed on the Wazuh indexer nodes.

      -  debconf
      -  adduser
      -  procps
      -  apt-transport-https

#. Run the assistant with the ``--offline-installation`` to perform an offline installation. Use the option ``--wazuh-indexer`` and the node name to install and configure the Wazuh indexer. The node name must be the same one used in ``config.yml`` for the initial configuration, for example, ``node-1``.

   .. code-block:: console

      # bash wazuh-install.sh --offline-installation --wazuh-indexer node-1

   Repeat this step for every Wazuh indexer node in your cluster. Then proceed with initializing your single-node or multi-node cluster in the next step.

#. Run the Wazuh installation assistant with option ``--start-cluster`` on any Wazuh indexer node to load the new certificates information and start the cluster.

   .. code-block:: console

      # bash wazuh-install.sh --offline-installation --start-cluster

   .. note:: You only have to initialize the cluster `once`, there is no need to run this command on every node.

Testing the cluster installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Run the following command to get the *admin* password:

   .. code-block:: console

      # tar -axf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt -O | grep -P "\'admin\'" -A 1

#. Run the following command to confirm that the installation is successful. Replace ``<ADMIN_PASSWORD>`` with the password gotten from the output of the previous command. Replace ``<WAZUH_INDEXER_IP_ADDRESS>`` with the configured Wazuh indexer IP address:

   .. code-block:: console

      # curl -k -u admin:<ADMIN_PASSWORD> https://<WAZUH_INDEXER_IP_ADDRESS>:9200

   .. code-block:: none
      :class: output

      {
        "name" : "node-1",
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

#. Replace ``<WAZUH_INDEXER_IP_ADDRESS>`` and ``<ADMIN_PASSWORD>``, and run the following command to check if the cluster is working correctly:

   .. code-block:: console

      # curl -k -u admin:<ADMIN_PASSWORD> https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cat/nodes?v

Installing the Wazuh server
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tabs::

   .. group-tab:: RPM

      On systems with *yum* as package manager, the following dependencies must be installed on the Wazuh server nodes.

      -  libcap

   .. group-tab:: DEB

      On systems with *apt* as package manager, the following dependencies must be installed on the Wazuh server nodes.

      -  gnupg
      -  apt-transport-https

#. Run the assistant with the ``--offline-installation`` to perform an offline installation. Use the option ``--wazuh-server`` followed by the node name to install the Wazuh server. The node name must be the same one used in ``config.yml`` for the initial configuration, for example, ``wazuh-1``.

   .. code-block:: console

      # bash wazuh-install.sh --offline-installation --wazuh-server wazuh-1

Your Wazuh server is now successfully installed.

-  If you want a Wazuh server multi-node cluster, repeat this step on every Wazuh server node.
-  If you want a Wazuh server single-node cluster, everything is set and you can proceed directly with the next stage.

Installing the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tabs::

   .. group-tab:: RPM

      The following dependencies must be installed on the Wazuh dashboard node.

      -  libcap

   .. group-tab:: DEB

      The following dependencies must be installed on the Wazuh dashboard node.

      -  debhelper version 9 or later
      -  tar
      -  curl
      -  libcap2-bin

#. Run the assistant with the ``--offline-installation`` to perform an offline installation. Use the option ``--wazuh-dashboard`` and the node name to install and configure the Wazuh dashboard. The node name must be the same one used in ``config.yml`` for the initial configuration, for example, ``dashboard``.

   .. code-block:: console

      # bash wazuh-install.sh --offline-installation --wazuh-dashboard dashboard

   The default Wazuh web user interface port is 443, used by the Wazuh dashboard. You can change this port using the optional parameter ``-p|--port <PORT_NUMBER>``. Some recommended ports are 8443, 8444, 8080, 8888, and 9000.

   Once the assistant finishes the installation, the output shows the access credentials and a message that confirms that the installation was successful.

   .. code-block:: none
      :emphasize-lines: 3,4

      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_IP_ADDRESS>
         User: admin
         Password: <ADMIN_PASSWORD>

      INFO: Installation finished.

   You now have installed and configured Wazuh. All passwords generated by the Wazuh installation assistant can be found in the ``wazuh-passwords.txt`` file inside the ``wazuh-install-files.tar`` archive. To print them, run the following command:

   .. code-block:: console

      # tar -O -xvf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt

#. Access the Wazuh web interface with your ``admin`` user credentials. This is the default administrator account for the Wazuh indexer and it allows you to access the Wazuh dashboard.

   -  **URL**: ``https://<WAZUH_DASHBOARD_IP_ADDRESS>``
   -  **Username**: ``admin``
   -  **Password**: ``<ADMIN_PASSWORD>``

   When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser. For increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser instead. Alternatively, a certificate from a trusted authority can be configured.
