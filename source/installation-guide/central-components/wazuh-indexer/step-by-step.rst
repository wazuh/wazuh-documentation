.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: The Wazuh indexer is a highly scalable full-text search engine. Install the Wazuh indexer in a single-node or multi-node configuration according to your environment needs. 


.. _wazuh_indexer_step_by_step:


Installing Wazuh indexer in step-by-step mode
=============================================

Install and configure the Wazuh indexer, a highly scalable full-text search engine based on Open Distro for Elasticsearch. It offers advanced security, alerting, index management, deep performance analysis, and several other features.

.. note:: Root user privileges are necessary to run all the commands.

Wazuh indexer cluster installation and configuration
----------------------------------------------------

Install the Wazuh indexer as a single-node or multi-node cluster according to your environment needs. If you want to install a single-node cluster, follow the instructions to install the initial node and proceed directly to initialize the cluster. 

The installation process is divided in three stages.  

#. Initial node installation and configuration

#. Subsequent nodes installation and configuration for multi-node clusters

#. Cluster initialization 


1. Initial node installation and configuration
-----------------------------------------------
.. raw:: html

    <div class="accordion-section open">

Install and configure the initial node. During this stage the SSL certificates to encrypt communications between the different Wazuh components are generated, these certificates are later deployed to other Wazuh instances. 

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~


  .. tabs::
  
  
    .. group-tab:: Yum
  
  
      .. include:: ../../../_templates/installations/wazuh/yum/add_repository_elastic_cluster.rst
  
  
  
    .. group-tab:: APT
  
  
      .. include:: ../../../_templates/installations/wazuh/deb/add_repository_elastic_cluster.rst
  
  
  
    .. group-tab:: ZYpp
  
  
      .. include:: ../../../_templates/installations/wazuh/zypp/add_repository_elastic_cluster.rst



Installing Elasticsearch
~~~~~~~~~~~~~~~~~~~~~~~~

Install Open Distro for Elasticsearch.

  .. include:: ../../../_templates/installations/elastic/common/install_elastic.rst

Configuring Elasticsearch
~~~~~~~~~~~~~~~~~~~~~~~~~

Follow these steps to configure Elasticsearch. 

  .. include:: ../../../_templates/installations/elastic/common/elastic-multi-node/configure_elasticsearch_initial.rst

Adding Elasticsearch roles and users
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add new users and roles in Kibana.

  .. include:: ../../../_templates/installations/elastic/common/add_roles_and_users.rst

Creating and deploying certificates
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create and deploy SSL certificates to encrypt communications between the Wazuh central components. 

#. Remove the demo certificates.

    .. include:: ../../../_templates/installations/elastic/common/remove_demo_certs.rst

#. Generate and deploy the certificates.

    .. include:: ../../../_templates/installations/elastic/common/elastic-multi-node/generate_certificates.rst

#. Enable and start the Elasticsearch service.

    .. include:: ../../../_templates/installations/elastic/common/enable_elasticsearch.rst


- **Recommended action**  - Remove Open Distro for Elasticsearch performance analyzer plugin. 

  The Open Distro for Elasticsearch performance analyzer plugin is installed by default and can have a negative impact on system resources. We recommend removing it with the following command:  

  .. code-block:: console
  
    # /usr/share/elasticsearch/bin/elasticsearch-plugin remove opendistro-performance-analyzer

  Restart Elasticsearch after removing the plugin. 
  
 
You now have installed and configured the initial Wazuh indexer node, if you want a single-node cluster, proceed directly to :ref:`initialize the cluster <initialize_cluster>`. If you want to install a multi-node cluster, follow the instructions to install and configure subsequent nodes. 

2. Subsequent nodes configuration
---------------------------------
.. raw:: html

    <div class="accordion-section">

Install and configure subsequent nodes of your multi-node cluster. 


Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~


  .. tabs::
  
  
    .. group-tab:: Yum
  
  
      .. include:: ../../../_templates/installations/wazuh/yum/add_repository_elastic_cluster.rst
  
  
  
    .. group-tab:: APT
  
  
      .. include:: ../../../_templates/installations/wazuh/deb/add_repository_elastic_cluster.rst
  
  
  
    .. group-tab:: ZYpp
  
  
      .. include:: ../../../_templates/installations/wazuh/zypp/add_repository_elastic_cluster.rst



Installing Elasticsearch
~~~~~~~~~~~~~~~~~~~~~~~~

Install Open Distro for Elasticsearch:

  .. include:: ../../../_templates/installations/elastic/common/install_elastic.rst


Configuring Elasticsearch
~~~~~~~~~~~~~~~~~~~~~~~~~

To configure Elasticsearch successfully, follow these steps:

.. include:: ../../../_templates/installations/elastic/common/elastic-multi-node/configure_elasticsearch_subsequent.rst


Deploying certificates
~~~~~~~~~~~~~~~~~~~~~~~

Deploy the certificates to encrypt communications between the Wazuh central components.

#. Remove the demo certificates:

    .. include:: ../../../_templates/installations/elastic/common/remove_demo_certs.rst

#. Configure Elasticsearch certificates:

    .. include:: ../../../_templates/installations/elastic/common/elastic-multi-node/deploy_certificates.rst

#. Enable and start the Elasticsearch service:

    .. include:: ../../../_templates/installations/elastic/common/enable_elasticsearch.rst

- **Recommended action**  - Remove Open Distro for Elasticsearch performance analyzer plugin. 

  The Open Distro for Elasticsearch performance analyzer plugin is installed by default and can have a negative impact on system resources. We recommend removing it with the following command:  

  .. code-block:: console
  
    # /usr/share/elasticsearch/bin/elasticsearch-plugin remove opendistro-performance-analyzer

  Restart Elasticsearch after removing the plugin.

You now have install a subsequent node of your Wazuh indexer multi-node cluster. Repeat this process on every other subsequent node that you want to add to your cluster and proceed to initialize the cluster. 

.. _initialize_cluster:

3. Cluster initialization
-------------------------
.. raw:: html

    <div class="accordion-section">

The final stage of the process for installing a Wazuh indexer multi-node cluster consists in running the security admin script. 

#. Run the Elasticsearch ``securityadmin`` script on the initial node to load the new certificates information and start the cluster. Replace ``<elasticsearch_IP>`` with the Elasticsearch installation IP and run the following command:

    .. code-block:: console

      # export JAVA_HOME=/usr/share/elasticsearch/jdk/ && /usr/share/elasticsearch/plugins/opendistro_security/tools/securityadmin.sh -cd /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ -icl -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin-key.pem -h <elasticsearch_IP>

#. Replace ``<elasticsearch_IP>`` and run the following command to confirm that the installation is successful: 

    .. code-block:: console

      # curl -XGET https://<elasticsearch_ip>:9200 -u admin:admin -k

    An example response should look as follows:

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
  


Next steps
----------

The next step is the installation of the :ref:`Wazuh server <wazuh_server_step_by_step>`.

If you want to uninstall the Wazuh indexer, visit the :ref:`Uninstalling section <uninstall_elasticsearch>`.