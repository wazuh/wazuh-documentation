.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _elasticsearch_single_node_cluster:


Elasticsearch single-node cluster
=================================

This document will guide you to install the Elastic Stack components in a single-node cluster. Please, check the :ref:`compatibility matrix<compatibility_matrix>` if you have any doubt about your OS compatibility.

.. note:: Root user privileges are necessary to execute all the commands described below.


Installing Elasticsearch
------------------------

Elasticsearch is a highly scalable full-text search and analytics engine. For more information, please see `Elasticsearch <https://www.elastic.co/products/elasticsearch>`_.

Adding the Elastic Stack repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/add_repository.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/add_repository.rst





Elasticsearch installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Elasticsearch package:

    .. tabs::

      .. group-tab:: APT


        .. include:: ../../_templates/installations/elastic/deb/install_elasticsearch.rst



      .. group-tab:: Yum


        .. include:: ../../_templates/installations/elastic/yum/install_elasticsearch.rst



      .. group-tab:: ZYpp


        .. include:: ../../_templates/installations/elastic/zypp/install_elasticsearch.rst


#. .. include:: ../../_templates/installations/elastic/common/elastic-single-node/configure_elasticsearch.rst

.. note:: If you are using Debian 7, you will need to change the ulimit by ``ulimit -u 4096``. In addition to this, the setting ``bootstrap.system_call_filter`` must be added and set to ``false`` in the ``/etc/elasticsearch/elasticsearch.yml`` configuration file. Remember that this only concerns to Debian 7 operating system.

Certificates creation and deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. In this step you must select the type of Wazuh cluster installation that you will set in your environment. Select the ``Wazuh single-node cluster`` tab if you want to configure a single Wazuh node cluster. If your Wazuh cluster will have two or more nodes, select the ``Wazuh multi-node cluster`` tab.

    .. include:: ../../_templates/installations/elastic/common/elastic-single-node/generate_deploy_certificates.rst

#. Enable and start the Elasticsearch service:

    .. include:: ../../_templates/installations/elastic/common/enable_elasticsearch.rst

#. Generate credentials for all the Elastic Stack pre-built roles and users:

    .. include:: ../../_templates/installations/elastic/common/generate_elastic_credentials.rst

Disabling repositories
----------------------

.. include:: ../../_templates/installations/elastic/common/disabling_repositories_explanation.rst

In order to anticipate and avoid this situation, we recommend disabling the Elasticsearch repository in the following way:

.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/disabling_repositories.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/disabling_repositories.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/disabling_repositories.rst


Next steps
----------

The next step consists on the selection of the Wazuh server installation type desired.

- :ref:`Wazuh single-node cluster<wazuh_single_node_cluster>`
- :ref:`Wazuh multi-node cluster<wazuh_multi_node_cluster>`


Uninstall
---------

To uninstall Elasticsearch:

.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_elasticsearch.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_elasticsearch.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/uninstall_elasticsearch.rst
