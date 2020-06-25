.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _elasticsearch_multi_node_cluster:


Elasticsearch multi-node cluster
=================================

Open Distro for Elasticsearch is an open-source distribution of Elasticsearch, a highly scalable full-text search engine. It offers advanced security, alerting, index management, deep performance analysis, and several other additional features. For more information, refer to `Open Distro for Elasticsearch <https://opendistro.github.io/for-elasticsearch/>`_.

This document will explain how to install Elasticsearch in a multi-node cluster.

.. note:: Root user privileges are necessary to run all the commands described below.


Installing Elasticsearch
------------------------

The Elasticsearch configuration section has steps that must be done in all the hosts where Elasticsearch will be installed. But some of them only need to be done in the Elasticsearch master node or in all the Elasticsearch nodes except the master node. The labels [*All*], [*Master*] or [*All except Master*] at the beginning of the step will indicate where the steps must be done. In case of having two or more [*Master*] nodes, the steps must be done in just one of them.

Prerequisites
~~~~~~~~~~~~~

[*All*] Open Distro for Elasticsearch requires the Java Development Kit and other packages installation including ``wget``, ``curl`` and ``unzip`` that will be used in further steps:

.. include:: ../../../../_templates/installations/elastic/common/before_installation.rst

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

[*All*] The addition of the Wazuh repository must be done in all Elasticsearch cluster nodes:

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../../_templates/installations/wazuh/deb/add_repository.rst



Elasticsearch installation
~~~~~~~~~~~~~~~~~~~~~~~~~~

[*All*] Install Open Distro for Elasticsearch:

.. include:: ../../../../_templates/installations/elastic/common/install_elastic.rst

Elasticsearch configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~

[*All*] Once Elasticsearch is installed it has to be configured by downloading and editing the file ``/etc/elasticsearch/elasticsearch.yml`` as follows:

.. include:: ../../../../_templates/installations/elastic/common/elastic-multi-node/configure_elasticsearch.rst

Elasticsearch roles and users
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

[*Master*] In order to use the Wazuh Kibana plugin properly, it is necessary to add the extra roles and users:

.. include:: ../../../../_templates/installations/elastic/common/add_roles_and_users.rst

Certificates creation and deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. [*All*] Remove the demo certificates:

    .. include:: ../../../../_templates/installations/elastic/common/remove_demo_certs.rst

#. [*Master*] Generate and deploy the certificates:

    .. include:: ../../../../_templates/installations/elastic/common/elastic-multi-node/generate_certificates.rst

#. [*All except Master*] Configure Elasticsearch certificates:

    .. include:: ../../../../_templates/installations/elastic/common/elastic-multi-node/deploy_certificates.rst

#. [*All*] Enable and start the Elasticsearch service:

    .. include:: ../../../../_templates/installations/elastic/common/enable_elasticsearch.rst

#. [*Master*] Run the Elasticsearch's ``securityadmin`` script to load the new certificates information and start the cluster. To run this command, the value ``<elasticsearch_IP>`` must to be replaced by the Elasticsearch installation IP:

  .. code-block:: console

    # cd /usr/share/elasticsearch/plugins/opendistro_security/tools/
    # ./securityadmin.sh -cd ../securityconfig/ -icl -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin.key  -h <elasticsearch_IP>

Run the following command to ensure that the installation was made properly:

.. code-block:: console

  # curl -XGET https://<elasticsearch_ip>:9200 -u admin:admin -k

The response should look as follows:

.. code-block:: none
             :class: output

              {
                "name" : "node-1",
                "cluster_name" : "elasticsearch",
                "cluster_uuid" : "O82AgJJTTF2pTOXKPnwQsA",
                "version" : {
                  "number" : "7.6.1",
                  "build_flavor" : "oss",
                  "build_type" : "rpm",
                  "build_hash" : "aa751e09be0a5072e8570670309b1f12348f023b",
                  "build_date" : "2020-02-29T00:15:25.529771Z",
                  "build_snapshot" : false,
                  "lucene_version" : "8.4.0",
                  "minimum_wire_compatibility_version" : "6.8.0",
                  "minimum_index_compatibility_version" : "6.0.0-beta1"
                },
                "tagline" : "You Know, for Search"
              }

It is highly recommended to change Elasticsearch’s default passwords for the users found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found :ref:`here <change_elastic_pass>`. It is also recommended to customize the file ``/etc/elasticsearch/jvm.options`` in order to improve the performance of Elasticsearch. Learn more about this process in the :ref:`Elasticsearch tuning <elastic_tuning>` section.

Next steps
----------

The next step consists on the selection of the Wazuh server installation desired:

- :ref:`Wazuh single-node cluster<wazuh_single_node_cluster>`
- :ref:`Wazuh multi-node cluster<wazuh_multi_node_cluster>`
