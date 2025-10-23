.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install the Wazuh indexer using the assisted installation method. The Wazuh indexer is a highly scalable full-text search engine and offers advanced security, alerting, index management, deep performance analysis, and several other features.

Installing the Wazuh indexer using the assisted installation method
===================================================================

Install and configure the Wazuh indexer as a single-node or multi-node cluster on a 64-bit (x86_64/AMD64 or AARCH64/ARM64) architecture using the assisted installation method. The Wazuh indexer is a highly scalable full-text search engine. It offers advanced security, alerting, index management, deep performance analysis, and several other features.

Wazuh indexer cluster installation
----------------------------------

The installation process is divided into three stages.

#. Initial configuration

#. Wazuh indexer nodes installation

#. Cluster initialization

.. note:: You need root user privileges to run all the commands described below.

Initial configuration
---------------------

Follow these steps to configure your Wazuh deployment, create SSL certificates to encrypt communications between the Wazuh components, and generate random passwords to secure your installation.

#. Download the Wazuh installation assistant and the configuration file.

      .. code-block:: console

          # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-install.sh
          # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/config.yml

#. Edit ``./config.yml`` and replace the node names and IP values with the corresponding names and IP addresses. You need to do this for all Wazuh server, Wazuh indexer, and Wazuh dashboard nodes. Add as many node fields as needed.

   .. code-block:: yaml
      :emphasize-lines: 4-5, 15-16, 27-28

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: indexer-1
            ip: "<indexer-node-ip>"
          #- name: indexer-2
          #  ip: "<indexer-node-ip>"
          #- name: indexer-3
          #  ip: "<indexer-node-ip>"

        # Wazuh server nodes
        # If there is more than one Wazuh server
        # node, each one must have a node_type
        server:
          - name: server-1
            ip: "<server-node-ip>"
          #  node_type: master
          #- name: server-2
          #  ip: "<server-node-ip>"
          #  node_type: worker
          #- name: server-3
          #  ip: "<server-node-ip>"
          #  node_type: worker

        # Wazuh dashboard nodes
        dashboard:
          - name: dashboard
            ip: "<dashboard-node-ip>"

#. Run the Wazuh installation assistant with the option ``--generate-config-files`` to generate the  Wazuh cluster key, certificates, and passwords necessary for installation. You can find these files in ``./wazuh-install-files.tar``. The Wazuh installation assistant requires dependencies like ``openssl`` and ``lsof`` to work. To install them automatically, add the ``--install-dependencies`` option to the command.

      .. code-block:: console

        # bash wazuh-install.sh --generate-config-files


#. Copy the ``wazuh-install-files.tar`` file to all the servers of the distributed deployment, including the Wazuh server, the Wazuh indexer, and the Wazuh dashboard nodes. This can be done by using the ``scp`` utility.


Wazuh indexer node installation
-------------------------------

Follow these steps to install and configure a single-node or multi-node Wazuh indexer.

#. Download the Wazuh installation assistant. Skip this step if you performed the initial configuration on the same server and the Wazuh installation assistant is already in your working directory:

      .. code-block:: console

        # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-install.sh


#. Run the Wazuh installation assistant with the option ``--wazuh-indexer`` and the node name to install and configure the Wazuh indexer. The node name must be the same one used in ``config.yml`` for the initial configuration, for example, ``node-1``. The Wazuh installation assistant requires dependencies like ``openssl`` and ``lsof`` to work. To install them automatically, add the ``--install-dependencies`` option to the command.

      .. note:: Make sure that a copy of ``wazuh-install-files.tar``, created during the initial configuration step, is placed in your working directory.

      .. code-block:: console

        # bash wazuh-install.sh --wazuh-indexer node-1


Repeat this stage of the installation process for every Wazuh indexer node in your cluster. Then proceed with initializing your single-node or multi-node cluster in the next stage.

.. note::

   For Wazuh indexer installation on hardened endpoints with ``noexec`` flag on the ``/tmp`` directory, additional setup is required. See the :doc:`/user-manual/wazuh-indexer/wazuh-indexer-on-hardened-endpoints` section for necessary configuration.

Cluster initialization
----------------------

The final stage of installing the Wazuh indexer single-node or multi-node cluster consists of running the security admin script.

#. Run the Wazuh installation assistant with option ``--start-cluster`` on any Wazuh indexer node to load the new certificates information and start the cluster.

   .. code-block:: console

     # bash wazuh-install.sh --start-cluster

   .. note:: You only have to initialize the cluster `once`, there is no need to run this command on every node.

Testing the cluster installation
--------------------------------

Verify that the Wazuh indexer installed correctly and the Wazuh indexer cluster is functioning as expected by following the steps below.

#. Run the following command to get the *admin* password:

   .. code-block:: console

      # tar -axf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt -O | grep -P "\'admin\'" -A 1

#. Run the following command to confirm that the installation is successful. Replace ``<WAZUH_INDEXER_IP_ADDRESS>``  with the IP address of the Wazuh indexer and use the password gotten from the output of the previous command:

   .. code-block:: console

      # curl -k -u admin https://<WAZUH_INDEXER_IP_ADDRESS>:9200

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

#. Run the following command to check if the cluster is working correctly. Replace ``<WAZUH_INDEXER_IP_ADDRESS>`` with the IP address of the Wazuh indexer and enter the password for the Wazuh indexer ``admin`` user when it prompts for password:

   .. code-block:: console

      # curl -k -u admin https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cat/nodes?v

   The command output should be similar to the following:

   .. code-block:: none
      :class: output

      ip              heap.percent ram.percent cpu load_1m load_5m load_15m node.role node.roles                               cluster_manager name
      192.168.107.240           19          94   4    0.22    0.21     0.20 dimr      data,ingest,master,remote_cluster_client *               node-1

Disable Wazuh updates
---------------------

.. include:: /_templates/installations/disable-wazuh-updates.rst

Next steps
----------

The Wazuh indexer is now successfully installed, and you can proceed with installing the Wazuh server. To perform this action, see the :doc:`../wazuh-server/installation-assistant` section.
