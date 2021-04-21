.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install Opendistro for using Wazuh

.. _elasticsearch_single_node_cluster:


Elasticsearch single-node cluster
=================================

Open Distro for Elasticsearch is an open source distribution of Elasticsearch, a highly scalable full-text search engine. It offers advanced security, alerting, index management, deep performance analysis, and several other additional features.

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



  .. group-tab:: ZYpp


    .. include:: ../../../../../_templates/installations/wazuh/zypp/add_repository.rst



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

In order to use the Wazuh Kibana plugin properly, it is necessary to add the extra roles and users:

.. include:: ../../../../../_templates/installations/elastic/common/add_roles_and_users.rst

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

    # /usr/share/elasticsearch/plugins/opendistro_security/tools/securityadmin.sh -cd /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin.key -h <elasticsearch_IP>

Run the following command to ensure that the installation has been successful:

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

.. note:: The Open Distro for Elasticsearch performance analyzer plugin is installed by default and can have a negative impact on system resources. We recommend removing it with the following command ``/usr/share/elasticsearch/bin/elasticsearch-plugin remove opendistro-performance-analyzer``. Please be sure to restart the Elasticsearch service afterwards. 

It is highly recommended to change Elasticsearch’s default passwords for the users found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found :ref:`here <change_elastic_pass>`. It is also recommended to customize the file ``/etc/elasticsearch/jvm.options`` in order to improve the performance of Elasticsearch. Learn more about this process in the :ref:`Elasticsearch tuning <elastic_tuning>` section.

To uninstall Elasticsearch, visit the :ref:`uninstalling section <uninstall_elasticsearch>`.

Next steps
----------

The next step is the installation of the Wazuh server, select the cluster mode:

- :ref:`Wazuh single-node cluster<wazuh_single_node_cluster>`
- :ref:`Wazuh multi-node cluster<wazuh_multi_node_cluster>`
