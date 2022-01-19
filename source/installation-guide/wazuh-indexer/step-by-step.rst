.. Copyright (C) 2015-2022 Wazuh, Inc.

.. meta:: :description: Wazuh indexer is a highly scalable full-text search engine. Install  Wazuh indexer in a single-node or multi-node configuration according to your environment needs. 


Installing the Wazuh indexer in step-by-step mode
=================================================

Install and configure the Wazuh indexer, a highly scalable full-text search engine. It offers advanced security, alerting, index management, deep performance analysis, and several other features.

.. note:: Root user privileges are required to run the commands described below.

Wazuh indexer cluster installation 
----------------------------------

Install and configure the Wazuh indexer as a single-node or multi-node cluster according to your environment needs. If you want to install a single-node cluster, follow the instructions to install the initial node and proceed directly to initialize the cluster. 

The installation process is divided into three stages.  

#. Initial node 

#. Subsequent nodes 

#. Initialize cluster


1. Initial node
---------------
.. raw:: html

    <div class="accordion-section open">

Install and configure the initial node. During this stage, the SSL certificates to encrypt communications between the Wazuh components are generated. These certificates are later deployed to other Wazuh instances. 

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

  .. include:: /_templates/installations/indexer/common/configure_indexer_initial.rst

Adding Wazuh indexer roles and users
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
..
  .. include:: ../../_templates/installations/elastic/common/add_roles_and_users.rst

Creating and deploying certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Remove the demo certificates.

    .. include:: /_templates/installations/indexer/common/remove_demo_certs.rst

#. Generate and deploy the SSL certificates to encrypt communications between the Wazuh central components.

    .. include:: /_templates/installations/indexer/common/generate_certificates.rst

     
#. Enable and start the Wazuh indexer service.

        .. include:: /_templates/installations/indexer/common/enable_indexer.rst

 
You now have installed and configured the initial Wazuh indexer node. 

- If you want a single-node cluster, proceed directly with :ref:`initializing the cluster <initialize_cluster>`. 
- If you want to install a multi-node cluster, expand the instructions below to install and configure subsequent nodes. 

2. Subsequent nodes
-------------------
.. raw:: html

    <div class="accordion-section">

Install and configure subsequent nodes of your multi-node cluster. 


Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^


  .. tabs::
  
  
    .. group-tab:: Yum
  
  
      .. include:: ../../_templates/installations/wazuh/yum/add_repository_elastic_cluster.rst
  
  
  
    .. group-tab:: APT
  
  
      .. include:: ../../_templates/installations/wazuh/deb/add_repository_elastic_cluster.rst
  
  
  
    .. group-tab:: ZYpp
  
  
      .. include:: ../../_templates/installations/wazuh/zypp/add_repository_elastic_cluster.rst



Installing the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install Open Distro for Elasticsearch:

  .. include:: ../../_templates/installations/elastic/common/install_elastic.rst


Configuring the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. include:: ../../_templates/installations/elastic/common/elastic-multi-node/configure_elasticsearch_subsequent.rst


Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

Deploy the certificates to encrypt communications between the Wazuh central components.

#. Remove the demo certificates.

    .. include:: ../../_templates/installations/elastic/common/remove_demo_certs.rst

#. Configure the Wazuh indexer certificates.

    .. include:: ../../_templates/installations/elastic/common/elastic-multi-node/deploy_certificates.rst


#. Enable and start the Elasticsearch service.

    .. include:: ../../_templates/installations/elastic/common/enable_elasticsearch.rst

   

You now have installed a subsequent node of your Wazuh indexer multi-node cluster. Repeat this process on every other subsequent node that you want to add to your cluster and proceed with initializing the cluster. 

.. _initialize_cluster:

3. Initialize cluster
---------------------
.. raw:: html

  <div class="accordion-section open">

The final stage of the process for installing the Wazuh indexer consists in running the security admin script. 

#. Run the following command on the initial node replacing ``<initial_node_IP>`` with your Wazuh indexer initial node IP address.
  
   .. code-block:: console

    # export ELASTICSEARCH_IP="<initial_node_IP>"


#. Run the Wazuh indexer ``securityadmin`` script on the initial node to load the new certificates information and start the cluster. Run the following command.

    .. code-block:: console

      # export JAVA_HOME=/usr/share/elasticsearch/jdk/ && /usr/share/elasticsearch/plugins/opendistro_security/tools/securityadmin.sh -cd /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ -icl -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin-key.pem -h $ELASTICSEARCH_IP

#. Run the command to confirm that the installation is successful. 

    .. code-block:: console

      # curl -XGET https://$ELASTICSEARCH_IP:9200 -u admin:admin -k

    Expand the output to see an example response.

    .. code-block:: none
        :class: output accordion-output

        {
          "name" : "node-1",
          "cluster_name" : "elasticsearch",
          "cluster_uuid" : "tWYgqpgdRz6fGN8gH11flw",
          "version" : {
            "number" : "7.10.2",
            "build_flavor" : "oss",
            "build_type" : "rpm",
            "build_hash" : "747e1cc71def077253878a59143c1f785afa92b9",
            "build_date" : "2021-01-13T00:42:12.435326Z",
            "build_snapshot" : false,
            "lucene_version" : "8.7.0",
            "minimum_wire_compatibility_version" : "6.8.0",
            "minimum_index_compatibility_version" : "6.0.0-beta1"
          },
          "tagline" : "You Know, for Search"
        }
  

If you want to uninstall the Wazuh indexer, see the :ref:`Uninstalling <uninstall_elasticsearch>` section.

Next steps
----------

The Wazuh indexer is now successfully installed and you can proceed with installing the Wazuh server. To perform this action, see the :ref:`wazuh_server_step_by_step` section.
