.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh indexer is a highly scalable full-text search engine. Install the Wazuh indexer in a single-node or multi-node configuration according to your environment needs. 

Installing the Wazuh indexer step by step
=========================================

Install and configure the Wazuh indexer as a single-node or multi-node cluster following step-by-step instructions. Wazuh indexer is a highly scalable full-text search engine and offers advanced security, alerting, index management, deep performance analysis, and several other features.

The installation process is divided into three stages.  

#. Certificates creation

#. Nodes installation

#. Cluster initialization


.. note:: You need root user privileges to run all the commands described below.

1. Certificates creation
------------------------
.. raw:: html

    <div class="accordion-section open">

Generating the SSL certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Download the ``wazuh-certs-tool.sh`` script and the ``config.yml`` configuration file. This creates the certificates that encrypt communications between the Wazuh central components.

   .. code-block:: console

    # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-certs-tool.sh
    # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/config.yml

#. Edit ``./config.yml`` and replace the node names and IP values with the corresponding names and IP addresses. You need to do this for all Wazuh server, Wazuh indexer, and Wazuh dashboard nodes. Add as many node fields as needed.

      .. code-block:: yaml

        nodes:
          # Wazuh indexer nodes
          indexer:
            - name: node-1
              ip: "<indexer-node-ip>"
            #- name: node-2
            #  ip: "<indexer-node-ip>"
            #- name: node-3
            #  ip: "<indexer-node-ip>"

          # Wazuh server nodes
          # If there is more than one Wazuh server
          # node, each one must have a node_type
          server:
            - name: wazuh-1
              ip: "<wazuh-manager-ip>"
            #  node_type: master
            #- name: wazuh-2
            #  ip: "<wazuh-manager-ip>"
            #  node_type: worker
            #- name: wazuh-3
            #  ip: "<wazuh-manager-ip>"
            #  node_type: worker

          # Wazuh dashboard nodes
          dashboard:
            - name: dashboard
              ip: "<dashboard-node-ip>"


      To learn more about how to create and configure the certificates, see the :doc:`/user-manual/certificates` section.

#. Run ``./wazuh-certs-tool.sh`` to create the certificates. For a multi-node cluster, these certificates need to be later deployed to all Wazuh instances in your cluster.

   .. code-block:: console

     #  bash ./wazuh-certs-tool.sh -A

#. Compress all the necessary files.

   .. code-block:: console

     # tar -cvf ./wazuh-certificates.tar -C ./wazuh-certificates/ .
     # rm -rf ./wazuh-certificates


#. Copy the ``wazuh-certificates.tar`` file to all the nodes, including the Wazuh indexer, Wazuh server, and Wazuh dashboard nodes. This can be done by using the ``scp`` utility.


2. Nodes installation
---------------------
.. raw:: html

    <div class="accordion-section open">


Installing package dependencies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/installations/indexer/common/install-dependencies.rst

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

    .. tabs::


      .. group-tab:: Yum


        .. include:: /_templates/installations/common/yum/add-repository.rst



      .. group-tab:: APT


        .. include:: /_templates/installations/common/deb/add-repository.rst



Installing the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install the Wazuh indexer package.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum -y install wazuh-indexer|WAZUH_INDEXER_RPM_PKG_INSTALL|

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install wazuh-indexer|WAZUH_INDEXER_DEB_PKG_INSTALL|

Configuring the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. include:: /_templates/installations/indexer/common/configure_indexer_nodes.rst


Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

  .. note::
    Make sure that a copy of the ``wazuh-certificates.tar`` file, created during the initial configuration step, is placed in your working directory.

  .. include:: /_templates/installations/indexer/common/deploy_certificates.rst

Starting the service
^^^^^^^^^^^^^^^^^^^^

  #. Enable and start the Wazuh indexer service.

      .. include:: /_templates/installations/indexer/common/enable_indexer.rst
    
Repeat this stage of the installation process for every Wazuh indexer node in your cluster. Then proceed with initializing your single-node or multi-node cluster in the next stage.


3. Cluster initialization
-------------------------
.. raw:: html

    <div class="accordion-section open">

Cluster initialization involves configuring a default ISM policy, loading new certificate information, and starting the single-node or multi-node cluster. 

#. Run the Wazuh indexer ``indexer-init.sh`` script on `any` Wazuh indexer node to initialize the cluster. Check :doc:`/user-manual/wazuh-indexer/index-life-management` for customization options.
    
   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-init.sh

   .. note::
      
      You only have to initialize the cluster *once*, there is no need to run this command on every node.
      
Testing the cluster installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Replace ``<WAZUH_INDEXER_IP>`` and run the following commands to confirm that the installation is successful.

   .. code-block:: console

      # curl -k -u admin:admin https://<WAZUH_INDEXER_IP>:9200

   .. code-block:: none
      :class: output accordion-output

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

#. Replace ``<WAZUH_INDEXER_IP>`` and run the following command to check if the single-node or multi-node cluster is working correctly. 
  
   .. code-block:: console

      # curl -k -u admin:admin https://<WAZUH_INDEXER_IP>:9200/_cat/nodes?v

Next steps
----------

The Wazuh indexer is now successfully installed on your single-node or multi-node cluster, and you can proceed with installing the Wazuh server. To perform this action, see the :doc:`../wazuh-server/step-by-step` section.

If you want to uninstall the Wazuh indexer, see :ref:`uninstall_indexer`.
