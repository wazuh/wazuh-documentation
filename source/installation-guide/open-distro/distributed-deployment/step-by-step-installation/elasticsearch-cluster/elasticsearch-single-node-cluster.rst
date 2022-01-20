.. Copyright (C) 2022 Wazuh, Inc.

.. meta:: :description: Learn how to install Opendistro for using Wazuh

.. _elasticsearch_single_node_cluster:


Elasticsearch single-node cluster
=================================

Install Elasticsearch on a single-node cluster. Open Distro for Elasticsearch is an open source distribution of Elasticsearch, a highly scalable full-text search engine. It offers advanced security, alerting, index management, deep performance analysis, and several other additional features.


.. note:: Root user privileges are necessary to run all the commands.

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

.. include:: ../../../../../_templates/installations/elastic/common/elastic-single-node/configure_elasticsearch.rst

.. _certs_creation:

Elasticsearch roles and users
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You need to add users and roles in order to use the Wazuh Kibana plugin properly.

.. include:: ../../../../../_templates/installations/elastic/common/add_roles_and_users.rst

Certificates creation and deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Remove the demo certificates:

    .. include:: ../../../../../_templates/installations/elastic/common/remove_demo_certs.rst

#. Generate and deploy the certificates:

    .. include:: ../../../../../_templates/installations/elastic/common/elastic-single-node/generate_deploy_certificates.rst

#. Enable and start the Elasticsearch service:

    .. include:: ../../../../../_templates/installations/elastic/common/enable_elasticsearch.rst

#. Run the Elasticsearch ``securityadmin`` script to load the new certificates information and start the cluster. To run this command, the value ``<elasticsearch_IP>`` must be replaced by the Elasticsearch installation IP:

  .. code-block:: console

    # export JAVA_HOME=/usr/share/elasticsearch/jdk/ && /usr/share/elasticsearch/plugins/opendistro_security/tools/securityadmin.sh -cd /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin-key.pem -h <elasticsearch_IP>

Run the following command to ensure that the installation is successful:

.. code-block:: console

  # curl -XGET https://localhost:9200 -u admin:admin -k

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



.. note:: The Open Distro for Elasticsearch performance analyzer plugin is installed by default and can have a negative impact on system resources. We recommend removing it with the following command ``/usr/share/elasticsearch/bin/elasticsearch-plugin remove opendistro-performance-analyzer``. Make sure to restart the Elasticsearch service afterward. 


.. note:: It is highly recommended to change the default passwords of Elasticsearch for the users’ passwords. To perform this action, see the :ref:`Elasticsearch tuning <elastic_tuning>` section.


It is also recommended to customize the file ``/etc/elasticsearch/jvm.options`` in order to improve the performance of Elasticsearch. Learn more about this process in the :ref:`user manual <elastic_tuning>`.

To uninstall Elasticsearch, see the :ref:`Uninstalling <uninstall_elasticsearch>` section.

Next steps
----------

You can now proceed with the Wazuh server installation. To do so, choose the cluster mode.

- :ref:`Wazuh single-node cluster<wazuh_single_node_cluster>`
- :ref:`Wazuh multi-node cluster<wazuh_multi_node_cluster>`
