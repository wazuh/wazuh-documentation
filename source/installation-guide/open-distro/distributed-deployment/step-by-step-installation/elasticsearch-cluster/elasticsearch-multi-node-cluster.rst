.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn how to install Elasticsearch on a multi-node cluster with Wazuh. This deployment type provides high availability and scalability of the product. 

.. _elasticsearch_multi_node_cluster:


Elasticsearch multi-node cluster
=================================

Open Distro for Elasticsearch is an open source distribution of Elasticsearch, a highly scalable full-text search engine. It offers advanced security, alerting, index management, deep performance analysis, and several other additional features.

You can install Elasticsearch on a multi-node cluster. For security and stability reasons in case Elasticsearch nodes become unavailable, it is recommended to have an odd number of master eligible nodes. Make sure that you take this into consideration when deciding the configuration of your Elasticsearch cluster.

The installation process for a multi-node cluster is performed in three stages.

#. Initial node configuration

#. Subsequent nodes configuration

#. Initializing the Elasticsearch cluster

.. note:: Root user privileges are necessary to run all the commands.

1. Initial node configuration
---------------------------------

The first stage of the process for installing a multi-node cluster is performed on the first Elasticsearch node to be configured. The SSL certificates generated in this stage are later deployed to the subsequent nodes.

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/wazuh/yum/add_repository_elastic_cluster.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/wazuh/deb/add_repository_elastic_cluster.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../_templates/installations/wazuh/zypp/add_repository_elastic_cluster.rst



Elasticsearch installation
~~~~~~~~~~~~~~~~~~~~~~~~~~

Install Open Distro for Elasticsearch:

.. include:: ../../../../../_templates/installations/elastic/common/install_elastic.rst

Elasticsearch configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~

To configure Elasticsearch successfully, follow these steps:

.. include:: ../../../../../_templates/installations/elastic/common/elastic-multi-node/configure_elasticsearch_initial.rst

Elasticsearch roles and users
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To use the Wazuh Kibana plugin properly, run the following command to add new users and roles in Kibana.

.. include:: ../../../../../_templates/installations/elastic/common/add_roles_and_users.rst

Certificates creation and deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Remove the demo certificates:

    .. include:: ../../../../../_templates/installations/elastic/common/remove_demo_certs.rst

#.  Generate and deploy the certificates:

    .. include:: ../../../../../_templates/installations/elastic/common/elastic-multi-node/generate_certificates.rst

#. Enable and start the Elasticsearch service:

    .. include:: ../../../../../_templates/installations/elastic/common/enable_elasticsearch.rst

.. note:: The Open Distro for Elasticsearch performance analyzer plugin is installed by default and can have a negative impact on system resources. We recommend removing it with the following command ``/usr/share/elasticsearch/bin/elasticsearch-plugin remove opendistro-performance-analyzer``. Make sure to restart the Elasticsearch service afterwards. 
 

2. Subsequent nodes configuration
---------------------------------

The second stage of the process for installing a multi-node cluster is performed on the subsequent nodes of the Elasticsearch cluster. 

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/wazuh/yum/add_repository_elastic_cluster.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/wazuh/deb/add_repository_elastic_cluster.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../_templates/installations/wazuh/zypp/add_repository_elastic_cluster.rst



Elasticsearch installation
~~~~~~~~~~~~~~~~~~~~~~~~~~

Install Open Distro for Elasticsearch:

.. include:: ../../../../../_templates/installations/elastic/common/install_elastic.rst


Elasticsearch configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~

To configure Elasticsearch successfully, follow these steps:

.. include:: ../../../../../_templates/installations/elastic/common/elastic-multi-node/configure_elasticsearch_subsequent.rst


Certificates deployment
~~~~~~~~~~~~~~~~~~~~~~~

#. Remove the demo certificates:

    .. include:: ../../../../../_templates/installations/elastic/common/remove_demo_certs.rst

#. Configure Elasticsearch certificates:

    .. include:: ../../../../../_templates/installations/elastic/common/elastic-multi-node/deploy_certificates.rst

#. Enable and start the Elasticsearch service:

    .. include:: ../../../../../_templates/installations/elastic/common/enable_elasticsearch.rst

.. note:: The Open Distro for Elasticsearch performance analyzer plugin is installed by default and can have a negative impact on system resources. We recommend removing it with the following command ``/usr/share/elasticsearch/bin/elasticsearch-plugin remove opendistro-performance-analyzer``. Make sure to restart the Elasticsearch service afterward. 


3. Initializing the cluster
---------------------------

The final stage of the process for installing a multi-node cluster is performed on the initial node and consists in running the security admin script. 

#. Run the Elasticsearch ``securityadmin`` script to load the new certificates information and start the cluster. To run this command, the value ``<elasticsearch_IP>`` must be replaced with the Elasticsearch installation IP:

    .. code-block:: console

      # export JAVA_HOME=/usr/share/elasticsearch/jdk/ && /usr/share/elasticsearch/plugins/opendistro_security/tools/securityadmin.sh -cd /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ -icl -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin-key.pem -h <elasticsearch_IP>

#. To confirm that the installation is successful, run the following command replacing the value ``<elasticsearch_IP>`` with the Elasticsearch installation IP address.

    .. code-block:: console

      # curl -XGET https://<elasticsearch_ip>:9200 -u admin:admin -k

    An example response should look as follows:

    .. code-block:: none
        :class: output

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
  



.. note:: It is highly recommended to change the default passwords of Elasticsearch for the users’ passwords. To perform this action, see the :ref:`Elasticsearch tuning <elastic_tuning>` section.


It is also recommended to customize the file ``/etc/elasticsearch/jvm.options`` in order to improve the performance of Elasticsearch. Learn more about these processes in the :ref:`user manual <elastic_tuning>`.



To uninstall Elasticsearch, visit the :ref:`Uninstalling section <uninstall_elasticsearch>`.

Next steps
----------

The next step is the installation of the Wazuh server. First, choose the cluster mode.

- :ref:`Wazuh single-node cluster<wazuh_single_node_cluster>`
- :ref:`Wazuh multi-node cluster<wazuh_multi_node_cluster>`
