.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _elastic_stack_packages:

Elastic Stack
=============

This document will guide you to install the Elastic Stack components in a all in one configuration. Please, check the :ref:`compatibility matrix<compatibility_matrix>` if you have any doubt about your OS compatibility.

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

.. note:: If your using Debian 7, you will need to change the ulimit by ``ulimit -u 4096``. In addition to this, the setting ``bootstrap.system_call_filter`` must be added and set to ``false`` in the ``/etc/elasticsearch/elasticsearch.yml`` configuration file.

Certificates creation and deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. This step implies to select the Wazuh cluster installation type. Select the tab ``Wazuh single-node cluster`` if you will configure a Wazuh single node cluster. If your Wazuh cluster will have two or more nodes, select ``Wazuh multi-node cluster`` tab.

    .. include:: ../../_templates/installations/elastic/common/elastic-single-node/generate_deploy_certificates.rst

#. Enable and start the Elasticsearch service:

    .. include:: ../../_templates/installations/elastic/common/enable_elasticsearch.rst

#. Generate credentials for all the Elastic Stack pre-built roles and users:

    .. include:: ../../_templates/installations/elastic/common/generate_elastic_credentials.rst

Kibana installation and configuration
-------------------------------------

#. Install the Kibana package:

    .. tabs::

        .. group-tab:: APT


            .. include:: ../../_templates/installations/elastic/deb/install_kibana.rst



        .. group-tab:: Yum


            .. include:: ../../_templates/installations/elastic/yum/install_kibana.rst



        .. group-tab:: ZYpp


            .. include:: ../../_templates/installations/elastic/zypp/install_kibana.rst


#. .. include:: ../../_templates/installations/elastic/common/copy_certificates_kibana_elastic_server.rst

#. Download the Kibana configuration file:

    .. include:: ../../_templates/installations/elastic/common/configure_kibana.rst

#. Install the Wazuh Kibana plugin:

    .. include:: ../../_templates/installations/elastic/common/install_wazuh_kibana_plugin.rst

#. Enable and start the Kibana service:

    .. include:: ../../_templates/installations/elastic/common/enable_kibana.rst

    The first Kibana start may take a few minutes. In order to establish HTTPS communication between the browser and Kibana, go to the browser's settings and import the ``ca.crt`` extracted from the .zip file.

    .. note:: The Kibana service listens on the default port 5601. The browser address will be: ``https://<kibana_ip>:5601`` replacing <kibana_ip> by the Kibana server IP.


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
