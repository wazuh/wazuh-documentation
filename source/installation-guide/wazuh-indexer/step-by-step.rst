.. Copyright (C) 2015-2022 Wazuh, Inc.

.. meta:: :description: Wazuh indexer is a highly scalable full-text search engine. Install the Wazuh indexer in a single-node or multi-node configuration according to your environment needs. 


Installing the Wazuh indexer in step-by-step mode
=================================================

Install and configure the Wazuh indexer as a single-node or multi-node cluster following step-by-step instructions. Wazuh indexer is a highly scalable full-text search engine and offers advanced security, alerting, index management, deep performance analysis, and several other features.

The installation process is divided into three stages.  

#. Certificates creation

#. Nodes installation

#. Cluster initialization


.. note:: Root user privileges are required to run the commands described below.

1. Certificates creation
------------------------
.. raw:: html

    <div class="accordion-section open">

Generating the SSL certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    .. include:: /_templates/installations/indexer/common/generate_certificates.rst


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

  .. include:: /_templates/installations/indexer/common/install-indexer.rst

Configuring the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 

  .. include:: /_templates/installations/indexer/common/configure_indexer_nodes.rst


Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

  .. note::
    Make sure that a copy of ``certs.tar``, created in the previous stage of the installation process, is placed in your working directory.

  .. include:: /_templates/installations/indexer/common/deploy_certificates.rst

Starting the service
^^^^^^^^^^^^^^^^^^^^

  #. Enable and start the Wazuh indexer service.

      .. include:: /_templates/installations/indexer/common/enable_indexer.rst
    
Repeat this stage of the installation process for every Wazuh indexer node in your multi-node cluster. Then proceed to the cluster initialization stage.


3. Cluster initialization
-------------------------
.. raw:: html

    <div class="accordion-section open">


#. Run the Wazuh indexer ``securityadmin.sh`` script on any Wazuh indexer node to load the new certificates information and start the cluster. Replace ``<node_IP>`` with your Wazuh indexer node IP address.
    
    .. code-block:: console

      # export WAZUH_INDEXER_IP="<node_IP>"

    .. code-block:: console

      # sudo -u wazuh-indexer OPENSEARCH_PATH_CONF=/etc/wazuh-indexer JAVA_HOME=/usr/share/wazuh-indexer/jdk /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -cd /usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig -icl -p 9800 -cd /usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig -nhnv -cacert /etc/wazuh-indexer/certs/root-ca.pem -cert /etc/wazuh-indexer/certs/admin.pem -key /etc/wazuh-indexer/certs/admin-key.pem -h $WAZUH_INDEXER_IP
        
       

Testing the cluster installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. Run the following commands to confirm that the installation is successful.

      .. code-block:: console

        # curl -k -u admin:admin https://$WAZUH_INDEXER_IP:9700


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

  #. Run the following command to check if the cluster is working correctly.
  
      .. code-block:: console

        # curl -k -u admin:admin https://$WAZUH_INDEXER_IP:9700/_cat/nodes?v


Next steps
----------

The Wazuh indexer is now successfully installed on your single-node or multi-node cluster and you can proceed with installing the Wazuh server. To perform this action, see the :doc:`../wazuh-server/step-by-step` section.

If you want to uninstall the Wazuh indexer, see the :ref:`Uninstalling <uninstall_elasticsearch>` section.
