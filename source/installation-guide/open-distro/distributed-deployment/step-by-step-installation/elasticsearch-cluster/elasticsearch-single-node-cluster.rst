.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Opendistro for using Wazuh

.. _elasticsearch_single_node_cluster:


Elasticsearch single-node cluster
=================================

Open Distro for Elasticsearch is an open source distribution of Elasticsearch, a highly scalable full-text search engine. It offers advanced security, alerting, index management, deep performance analysis, and several other additional features. For more information, refer to `Open Distro for Elasticsearch <https://opendistro.github.io/for-elasticsearch/>`_.

This document will explain how to install Elasticsearch in a single-node cluster.

.. note:: Root user privileges are necessary to run all the commands described below.

Installing Elasticsearch
------------------------

Prerequisites
~~~~~~~~~~~~~

Open Distro for Elasticsearch requires the Java Development Kit and other packages installation including ``wget``, ``curl``, and ``unzip`` that will be used in further steps:

.. include:: ../../../../../_templates/installations/elastic/common/before_installation.rst

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/wazuh/deb/add_repository.rst



Elasticsearch installation
~~~~~~~~~~~~~~~~~~~~~~~~~~

Install Open Distro for Elasticsearch:

.. include:: ../../../../../_templates/installations/elastic/common/install_elastic.rst

Elasticsearch configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: ../../../../../_templates/installations/elastic/common/elastic-single-node/configure_elasticsearch.rst

Elasticsearch roles and users
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In order to use the Wazuh Kibana plugin properly, it is necessary to add the extra roles and users:

.. include:: ../../../../../_templates/installations/elastic/common/add_roles_and_users.rst

.. _certs_creation:

Certificates creation and deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Remove the demo certificates:

    .. include:: ../../../../../_templates/installations/elastic/common/remove_demo_certs.rst

#. Generate and deploy the certificates:

    .. include:: ../../../../../_templates/installations/elastic/common/elastic-single-node/generate_deploy_certificates.rst

#. Enable and start the Elasticsearch service:

    .. include:: ../../../../../_templates/installations/elastic/common/enable_elasticsearch.rst

#. Run the Elasticsearch's ``securityadmin`` script to load the new certificates information and start the cluster. To run this command, the value ``<elasticsearch_IP>`` must be replaced by the Elasticsearch installation IP:

  .. code-block:: console

    # cd /usr/share/elasticsearch/plugins/opendistro_security/tools/
    # ./securityadmin.sh -cd ../securityconfig/ -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin.key -h <elasticsearch_IP>

Run the following command to ensure that the installation was made properly:

.. code-block:: console

  # curl -XGET https://localhost:9200 -u admin:admin -k

An example response should look as follows:

.. code-block:: none
             :class: output

              {
                "name" : "node-1",
                "cluster_name" : "elasticsearch",
                "cluster_uuid" : "O82AgJJTTF2pTOXKPnwQsA",
                "version" : {
                  "number" : "7.8.0",
                  "build_flavor" : "oss",
                  "build_type" : "rpm",
                  "build_hash" : "757314695644ea9a1dc2fecd26d1a43856725e65",
                  "build_date" : "2020-06-14T19:35:50.234439Z",
                  "build_snapshot" : false,
                  "lucene_version" : "8.5.1",
                  "minimum_wire_compatibility_version" : "6.8.0",
                  "minimum_index_compatibility_version" : "6.0.0-beta1"
                },
                "tagline" : "You Know, for Search"
              }  

It is highly recommended to change Elasticsearch’s default passwords for the users found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found :ref:`here <change_elastic_pass>`. It is also recommended to customize the file ``/etc/elasticsearch/jvm.options`` in order to improve the performance of Elasticsearch. Learn more about this process in the :ref:`Elasticsearch tuning <elastic_tuning>` section.

Next steps
----------

The next step consists of the selection of the Wazuh server installation type desired:

- :ref:`Wazuh single-node cluster<wazuh_single_node_cluster>`
- :ref:`Wazuh multi-node cluster<wazuh_multi_node_cluster>`
