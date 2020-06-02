.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Opendistro for using Wazuh

.. _elasticsearch_single_node_cluster:


Elasticsearch single-node cluster
=================================

Open Distro is an open source distribution of Elasticsearch, a highly scalable full-text search engine. It offers advanced security, alerting, index management, deep performance analysis and a number of other additional features. For more information, refer to `Open Distro for Elasticsearch <https://opendistro.github.io/for-elasticsearch/>`_.

This document will explain how to install the Open Distro components in a single-node cluster.

.. note:: Root user privileges are necessary to execute all the commands described below.

Installing Elasticsearch
------------------------

Prerequisites
~~~~~~~~~~~~~

Open Distro for Elasticsearch requires the installation of Java Development Kit and other packages including ``wget``, ``curl`` and ``unzip`` that will be used in further steps:

  .. include:: ../../../_templates/installations/elastic/common/before_installation.rst

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

  .. tabs::


    .. group-tab:: Yum


      .. include:: ../../../_templates/installations/wazuh/yum/add_repository.rst



    .. group-tab:: APT


      .. include:: ../../../_templates/installations/wazuh/deb/add_repository.rst



Elasticsearch installation
~~~~~~~~~~~~~~~~~~~~~~~~~~

Install Open Distro for Elasticsearch:

    .. include:: ../../../_templates/installations/elastic/common/install_elastic.rst

Elasticsearch configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. .. include:: ../../../_templates/installations/elastic/common/elastic-single-node/configure_elasticsearch.rst

.. _certs_creation:

Certificates creation and deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Remove the demo certificates:

    .. include:: ../../../_templates/installations/elastic/common/remove_demo_certs.rst

#. Generate and deploy the certificates:

    .. include:: ../../../_templates/installations/elastic/common/elastic-single-node/generate_deploy_certificates.rst

#. Enable and start the Elasticsearch service:

    .. include:: ../../../_templates/installations/elastic/common/enable_elasticsearch.rst

#. Execute the Elasticsearch's ``securityadmin`` script to load the new certificates information and start the cluster. To run this command, the value ``<elasticsearch_IP>`` must to be replaced by the Elasticsearch installation IP:

  .. code-block:: console

    # cd /usr/share/elasticsearch/plugins/opendistro_security/tools/
    # ./securityadmin.sh -cd ../securityconfig/ -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin.key  -h <elasticsearch_IP>


Next steps
----------

The next step consists on the selection of the Wazuh server installation type desired:

- :ref:`Wazuh single-node cluster<wazuh_single_node_cluster>`
- :ref:`Wazuh multi-node cluster<wazuh_multi_node_cluster>`


Uninstall
---------

To uninstall Elasticsearch:

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../_templates/installations/elastic/yum/uninstall_elasticsearch.rst



  .. group-tab:: APT


    .. include:: ../../../_templates/installations/elastic/deb/uninstall_elasticsearch.rst
