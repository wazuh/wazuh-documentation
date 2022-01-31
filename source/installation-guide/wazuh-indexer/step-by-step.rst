.. Copyright (C) 2015-2022 Wazuh, Inc.

.. meta:: :description: Wazuh indexer is a highly scalable full-text search engine. Install  Wazuh indexer in a single-node or multi-node configuration according to your environment needs. 


Installing the Wazuh indexer in step-by-step mode
=================================================

Install and configure the Wazuh indexer as a single-node or multi-node cluster following step-by-step instructions. Wazuh indexer is a highly scalable full-text search engine and offers advanced security, alerting, index management, deep performance analysis, and several other features.

The installation process is divided into three stages.  

#. Certificates creation 

#. Installation

#. Initialization


.. note:: Root user privileges are required to run the commands described below.

1. Certificates creation
------------------------
.. raw:: html

    <div class="accordion-section open">

Generating the SSL certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    .. include:: /_templates/installations/indexer/common/generate_certificates.rst


2. Installation
---------------
.. raw:: html

    <div class="accordion-section open">


Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

    .. tabs::


      .. group-tab:: Yum


        .. include:: /_templates/installations/common/yum/add-repository.rst



      .. group-tab:: APT


        .. include:: /_templates/installations/common/deb/add-repository.rst



      .. group-tab:: ZYpp


        .. include:: /_templates/installations/common/yum/add-repository.rst




Installing the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. include:: /_templates/installations/indexer/common/install-indexer.rst

Configuring the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 

  .. include:: /_templates/installations/indexer/common/configure_indexer_nodes.rst


Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

  .. note::
    Make sure that a copy of ``certs.tar``, created in the previous stage of the installation process, is placed in your working directory.

  .. include:: /_templates/installations/indexer/common/deploy_certificates.rst


You now have installed and configured Wazuh indexer in a single node. Repeat this stage of the installation process for every Wazuh indexer node in your multi-node cluster. Then proceed to the initialization stage.


3. Initialization
-----------------
.. raw:: html

    <div class="accordion-section open">


Initializing a multi-node cluster
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. Run the following command on the initial node if deploying Wazuh indexer in a distributed configuration. Replace ``<initial_node_IP>`` with your Wazuh indexer initial node IP address.
    
     .. code-block:: console

      # export WAZUH_INDEXER_IP="<initial_node_IP>"


  #. Run the Wazuh indexer ``securityadmin.sh`` script on the initial node to load the new certificates information and start the multi-node cluster.

      .. code-block:: console

        # sudo -u wazuh-indexer OPENSEARCH_PATH_CONF=/etc/wazuh-indexer JAVA_HOME=/usr/share/wazuh-indexer/jdk /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -cd /usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig -icl -p 9800 -cd /usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig -nhnv -cacert /etc/wazuh-indexer/certs/root-ca.pem -cert /etc/wazuh-indexer/certs/admin.pem -key /etc/wazuh-indexer/certs/admin-key.pem -h $WAZUH_INDEXER_IP
        
  #. Remove index data from worker nodes.

      .. code-block:: console

        # rm -rf /var/lib/wazuh-indexer/*


Starting the service
^^^^^^^^^^^^^^^^^^^^

  #. Enable and start the Wazuh indexer service.

      .. include:: /_templates/installations/indexer/common/enable_indexer.rst
    
  #. Wait for the initial node to push the changes if deploying a multi-node Wazuh indexer cluster.


  #. Run the following commands to confirm that the installation is successful.

      .. code-block:: console

        # curl -k -u admin:admin https://localhost:9700


      .. code-block:: none
          :class: output accordion-output

          {
            "name" : "node-1",
            "cluster_name" : "wazuh-cluster",
            "cluster_uuid" : "XXT8abZ5S8q1XAIYgOb3cg",
            "version" : {
              "number" : "7.10.2",
              "build_type" : "rpm",
              "build_hash" : "8a529d77c7432bc45b005ac1c4ba3b2741b57d4a",
              "build_date" : "2021-12-21T01:36:21.407473Z",
              "build_snapshot" : false,
              "lucene_version" : "8.10.1",
              "minimum_wire_compatibility_version" : "6.8.0",
              "minimum_index_compatibility_version" : "6.0.0-beta1"
            },
            "tagline" : "The OpenSearch Project: https://opensearch.org/"
          }
    
      .. code-block:: console

        # curl -k -u admin:admin https://localhost:9700/_cluster/health?pretty


      .. code-block:: none
          :class: output accordion-output

          {
            "cluster_name" : "wazuh-cluster",
            "status" : "yellow",
            "timed_out" : false,
            "number_of_nodes" : 1,
            "number_of_data_nodes" : 1,
            "discovered_master" : true,
            "active_primary_shards" : 10,
            "active_shards" : 10,
            "relocating_shards" : 0,
            "initializing_shards" : 0,
            "unassigned_shards" : 2,
            "delayed_unassigned_shards" : 0,
            "number_of_pending_tasks" : 0,
            "number_of_in_flight_fetch" : 0,
            "task_max_waiting_in_queue_millis" : 0,
            "active_shards_percent_as_number" : 83.33333333333334
          }
    
      .. code-block:: console

        # curl -k -u admin:admin https://localhost:9700/_cat/indices?pretty


      .. code-block:: none
          :class: output accordion-output

          green  open .opendistro_security         tgoKvr_0Rw61EF62F7XFOQ 1 0    9 0  60.3kb  60.3kb

  If deploying a multi-node Wazuh indexer cluster, repeat this steps to start the service, for every Wazuh indexer node, .

Testing the cluster installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. Run the following command replacing <WAZUH_INDEXER_IP> with your Wazuh indexer IP address to check the cluster is working correctly.
  
      .. code-block:: console

        # curl -k -u admin:admin https://<WAZUH_INDEXER_IP>:9700/_cat/nodes?v


Next steps
----------

The Wazuh indexer is now successfully installed on your single-node or multi-node cluster and you can proceed with installing the Wazuh server. To perform this action, see the :doc:`../wazuh-server/step-by-step` section.

If you want to uninstall the Wazuh indexer, see the :ref:`Uninstalling <uninstall_elasticsearch>` section.
