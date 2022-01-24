.. Copyright (C) 2015-2022 Wazuh, Inc.

.. meta:: :description: Wazuh indexer is a highly scalable full-text search engine. Install  Wazuh indexer in a single-node or multi-node configuration according to your environment needs. 


Installing the Wazuh indexer in step-by-step mode
=================================================

Install and configure the Wazuh indexer as a single-node or multi-node cluster following step-by-step instructions. Wazuh indexer is a highly scalable full-text search engine and offers advanced security, alerting, index management, deep performance analysis, and several other features.

The installation process is divided into three stages.  

#. Certificates creation 

#. Wazuh indexer nodes installation

#. Cluster initialization


.. note:: Root user privileges are required to run the commands described below.

1. Certificates creation
------------------------
.. raw:: html

    <div class="accordion-section open">

Generating the SSL certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    .. include:: /_templates/installations/indexer/common/generate_certificates.rst


2. Wazuh indexer nodes installation
-----------------------------------
.. raw:: html

    <div class="accordion-section open">


Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

    .. tabs::


      .. group-tab:: Yum


        .. include:: /_templates/installations/indexer/yum/add_repository.rst



      .. group-tab:: APT


        .. include:: /_templates/installations/indexer/deb/add_repository.rst



      .. group-tab:: ZYpp


        .. include:: /_templates/installations/indexer/zypp/add_repository.rst




Installing the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. include:: /_templates/installations/indexer/common/install-indexer.rst

Configuring the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 

  .. include:: /_templates/installations/indexer/common/configure_indexer_nodes.rst


Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

  .. note::
    Make sure that a copy of ``certs.tar``, created during the previous step, is placed in your working directory.

  .. include:: /_templates/installations/indexer/common/deploy_certificates.rst


Starting the service
^^^^^^^^^^^^^^^^^^^^

  .. include:: /_templates/installations/indexer/common/enable_indexer.rst


Testing the installation
^^^^^^^^^^^^^^^^^^^^^^^^

  #. Run the following commands to confirm that the installation is successful.

      .. code-block:: console

        # curl -k -u admin:admin https://localhost:9700


      Expand the output to see an example response.

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


      Expand the output to see an example response.

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


      Expand the output to see an example response.

      .. code-block:: none
          :class: output accordion-output

          green  open .opendistro_security         tgoKvr_0Rw61EF62F7XFOQ 1 0    9 0  60.3kb  60.3kb

 
You now have installed and configured a Wazuh indexer node. Repeat this process for every Wazuh indexer node in your cluster.


3. Cluster initialization
-------------------------
.. raw:: html

    <div class="accordion-section">

..
  The final stage of the process for installing the Wazuh indexer consists in running the security admin script. 

  #. Run the following command on the initial node replacing ``<initial_node_IP>`` with your Wazuh indexer initial node IP address.
    
     .. code-block:: console

      # export ELASTICSEARCH_IP="<initial_node_IP>"


  #. Run the Wazuh indexer ``securityadmin`` script on the initial node to load the new certificates information and start the cluster. Run the following command.

      .. code-block:: console

        # export JAVA_HOME=/usr/share/elasticsearch/jdk/ && /usr/share/elasticsearch/plugins/opendistro_security/tools/securityadmin.sh -cd /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ -icl -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin-key.pem -h $ELASTICSEARCH_IP


Next steps
----------

The Wazuh indexer is now successfully installed on your cluster and you can proceed with installing the Wazuh server. To perform this action, see the :doc:`../wazuh-server/step-by-step` section.

If you want to uninstall the Wazuh indexer, see the :ref:`Uninstalling <uninstall_elasticsearch>` section.
