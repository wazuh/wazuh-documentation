.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _basic_elasticsearch_single_node_cluster:


Elasticsearch single-node cluster
=================================

This document will explain how to install the Elastic Stack components in a single-node cluster.

.. note:: Root user privileges are necessary to execute all the commands described below.


Installing Elasticsearch
------------------------

Elasticsearch is a highly scalable full-text search and analytics engine. 

Prerequisites
-------------
Some extra packages are needed for the installation, such us ``curl`` or ``unzip``, that will be used in further steps: 

.. include:: ../../../../../_templates/installations/basic/before_installation_elastic.rst

Adding the Elastic Stack repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/basic/elastic/yum/add_repository.rst
    


  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/basic/elastic/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../_templates/installations/basic/elastic/zypp/add_repository.rst





Elasticsearch installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Elasticsearch package:

    .. tabs::

      .. group-tab:: Yum


        .. include:: ../../../../../_templates/installations/basic/elastic/yum/install_elasticsearch.rst



      .. group-tab:: APT


        .. include:: ../../../../../_templates/installations/basic/elastic/deb/install_elasticsearch.rst



      .. group-tab:: ZYpp


        .. include:: ../../../../../_templates/installations/basic/elastic/zypp/install_elasticsearch.rst


#. .. include:: ../../../../../_templates/installations/basic/elastic/common/elastic-single-node/configure_elasticsearch.rst

Certificates creation and deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. This step implies the selection of the Wazuh cluster installation type. Choose between ``Wazuh single-node cluster``, if having only one Wazuh server, and ``Wazuh multi-node cluster`` in case of having two or more Wazuh servers.

    .. include:: ../../../../../_templates/installations/basic/elastic/common/elastic-single-node/generate_deploy_certificates.rst

#. Enable and start the Elasticsearch service:

    .. include:: ../../../../../_templates/installations/basic/elastic/common/enable_elasticsearch.rst

#. Generate credentials for all the Elastic Stack pre-built roles and users:

    .. include:: ../../../../../_templates/installations/basic/elastic/common/generate_elastic_credentials.rst

Disabling repositories
----------------------

.. include:: ../../../../../_templates/installations/basic/elastic/common/disabling_repositories_explanation.rst


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/basic/elastic/yum/disabling_repositories.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/basic/elastic/deb/disabling_repositories.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../_templates/installations/basic/elastic/zypp/disabling_repositories.rst


Next steps
----------

The next step consists on the selection of the Wazuh server installation type desired.

- :ref:`Wazuh single-node cluster<basic_wazuh_single_node_cluster>`
- :ref:`Wazuh multi-node cluster<basic_wazuh_multi_node_cluster>`
