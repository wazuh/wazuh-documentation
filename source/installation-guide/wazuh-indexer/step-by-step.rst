.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh indexer is a highly scalable full-text search engine. Install the Wazuh indexer in a single-node or multi-node configuration according to your environment needs.

Installing the Wazuh indexer step by step
=========================================

Install and configure the Wazuh indexer as a single-node or multi-node cluster following step-by-step instructions. The Wazuh indexer is a scalable search and analytics engine that stores and indexes events forwarded by the Wazuh manager, enabling near real-time data analysis and several other features.

The installation process is divided into three stages:

#. `Certificate creation`_
#. `Wazuh indexer nodes installation`_
#. `Cluster initialization`_

.. note::

   You need root user privileges to run all the commands described below.

.. _certificates_creation:

Certificate creation
--------------------

Wazuh uses certificates to establish confidentiality and encrypt communications between its central components. Follow these steps to create certificates for the Wazuh central components.

Generating the SSL certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Download the ``wazuh-certs-tool.sh`` script and the ``config.yml`` configuration file. This creates the certificates that encrypt communications between the Wazuh central components.

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-5.0.0-beta1.sh
      # curl -o config.yml https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/config-5.0.0-beta1.yml

#. Edit ``./config.yml`` and replace the node names and IP values with the corresponding names and IP addresses. You need to do this for all Wazuh manager, Wazuh indexer, and Wazuh dashboard nodes. Add as many node fields as needed.

   .. code-block:: yaml
      :emphasize-lines: 4-5, 15-16, 27-28

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: indexer
            ip: "<indexer-node-ip>"
          #  dns: "<indexer-node-dns>"
          #- name: indexer-2
          #  ip: "<indexer-node-ip>"
          #  dns: "<indexer-node-dns>"
          #- name: indexer-3
          #  ip: "<indexer-node-ip>"
          #  dns:
          #    - "<indexer-node-dns>"

        # Wazuh manager nodes
        # If there is more than one Wazuh manager
        # node, each one must have a node_type
        manager:
          - name: manager
            ip: "<wazuh-manager-ip>"
          #  dns: "<wazuh-manager-dns>"
          #  node_type: master
          #- name: manager-2
          #  dns: "<wazuh-manager-dns>"
          #  node_type: worker
          #- name: manager-3
          #  ip: "<wazuh-manager-ip>"
          #  dns:
          #    - "<wazuh-manager-dns>"
          #  node_type: worker

        # Wazuh dashboard nodes
        dashboard:
          - name: dashboard
            ip: "<dashboard-node-ip>"
          #  dns: "<dashboard-node-dns>"


   To learn more about how to create and configure the certificates, see the :doc:`/user-manual/wazuh-indexer-cluster/certificate-deployment` section.

#. Run ``./wazuh-certs-tool-5.0.0-beta1.sh`` to create the certificates. For a multi-node cluster, these certificates need to be later deployed to all Wazuh instances in your cluster.

   .. code-block:: console

      # bash ./wazuh-certs-tool-5.0.0-beta1.sh -A

#. Compress all the necessary files.

   .. code-block:: console

      # tar -cvf ./wazuh-certificates.tar -C ./wazuh-certificates/ .
      # rm -rf ./wazuh-certificates

#. Copy the ``wazuh-certificates.tar`` file to all the nodes, including the Wazuh indexer, Wazuh manager, and Wazuh dashboard nodes. This can be done by using the ``scp`` utility.

Wazuh indexer nodes installation
--------------------------------

Follow these steps to install and configure a single-node or multi-node Wazuh indexer.

Installing package dependencies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/installations/indexer/common/install-dependencies.rst

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tabs::

   .. group-tab:: APT

      .. include:: /_templates/installations/common/deb/add-repository.rst

   .. group-tab:: Yum

      .. include:: /_templates/installations/common/yum/add-repository.rst

   .. group-tab:: DNF

      .. include:: /_templates/installations/common/dnf/add-repository.rst

Installing the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install the Wazuh indexer package.

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install wazuh-indexer|WAZUH_INDEXER_DEB_PKG_INSTALL|

      .. group-tab:: Yum

         .. code-block:: console

            # yum -y install wazuh-indexer|WAZUH_INDEXER_RPM_PKG_INSTALL|

      .. group-tab:: DNF

         .. code-block:: console

            # dnf -y install wazuh-indexer|WAZUH_INDEXER_RPM_PKG_INSTALL|

Configuring the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/installations/indexer/common/configure_indexer_nodes.rst

.. include:: /_templates/installations/common/firewall-ports-note.rst

Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

.. note::

   Make sure that a copy of ``wazuh-certificates.tar``, created in the previous stage of the installation process, is placed in your working directory.

.. include:: /_templates/installations/indexer/common/deploy_certificates.rst

Starting the service
^^^^^^^^^^^^^^^^^^^^

  #. Enable and start the Wazuh indexer service.

      .. include:: /_templates/installations/indexer/common/enable_indexer.rst

Repeat this stage of the installation process for every Wazuh indexer node in your multi-node cluster. Then proceed with initializing your single-node or multi-node cluster in the next stage.

Disable Wazuh updates
---------------------

.. include:: /_templates/installations/disable-wazuh-updates.rst

Cluster initialization
----------------------

The final stage of installing the Wazuh indexer single-node or multi-node cluster consists of running the security admin script.

.. note::

   You only have to initialize the cluster once, there is no need to run this command on every node.

#. Run the Wazuh indexer ``indexer-security-init.sh`` script on *any* Wazuh indexer node to load the new certificates information and start the single-node or multi-node cluster:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

Testing the cluster installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Run the following commands to confirm that the installation is successful. Replace ``<WAZUH_INDEXER_IP_ADDRESS>``  with the IP address of the Wazuh indexer and enter admin as the password when prompted:

   .. code-block:: console

      # curl -k -u admin https://<WAZUH_INDEXER_IP_ADDRESS>:9200

   .. code-block:: none
      :class: output accordion-output

      {
        "name" : "indexer",
        "cluster_name" : "wazuh-cluster",
        "cluster_uuid" : "rM3vIXsSS0qgW0fkwHGolg",
        "version" : {
          "distribution" : "opensearch",
          "number" : "3.5.0",
          "build_type" : "rpm",
          "build_hash" : "0688bb0c0d4d2384772311ab88edcd2a18a67774",
          "build_date" : "2026-04-09T12:10:10.126706914Z",
          "build_snapshot" : false,
          "lucene_version" : "10.3.2",
          "minimum_wire_compatibility_version" : "2.19.0",
          "minimum_index_compatibility_version" : "2.0.0"
        },
        "tagline" : "The OpenSearch Project: https://opensearch.org/"
      }

#. Run the following command to check if the cluster is working correctly. Replace ``<WAZUH_INDEXER_IP_ADDRESS>``  with the IP address of the Wazuh indexer and enter admin as the password when prompted:

   .. code-block:: console

      # curl -k -u admin https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cat/nodes?v

   The command produces output similar to the following:

   .. code-block:: none
      :class: output

      ip             heap.percent ram.percent cpu load_1m load_5m load_15m node.role node.roles                                        cluster_manager name
      192.168.33.147           33          69  17    0.09    0.61     0.50 dimr      cluster_manager,data,ingest,remote_cluster_client *               indexer

Next steps
----------

The Wazuh indexer is now successfully installed on your single-node or multi-node cluster, and you can proceed with installing the Wazuh manager. To perform this action, see the :doc:`../wazuh-server/step-by-step` section.

To uninstall the Wazuh indexer, see :ref:`uninstall_indexer`.
