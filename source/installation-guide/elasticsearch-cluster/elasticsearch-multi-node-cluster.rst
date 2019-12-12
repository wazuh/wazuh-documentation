.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _elasticsearch_multi_node_cluster:


Elasticsearch multi-node cluster
=================================

This document will guide you to install the Elastic Stack components in a multi-node cluster. Please, check the :ref:`compatibility matrix<compatibility_matrix>` if you have any doubt about your OS compatibility.

.. note:: Root user privileges are necessary to execute all the commands described below.


Installing Elasticsearch
------------------------

Elasticsearch is a highly scalable full-text search and analytics engine. For more information, please see `Elasticsearch <https://www.elastic.co/products/elasticsearch>`_.

The Elasticsearch configuration section has steps that must be done in all the hosts where Elasticsearch will be installed. But some of them only need to be done in the Elasticsearch master node. You will know if you must to follow the step in all nodes or only in master by the [All] or [Master] label at the beginning of the step.

Adding the Elastic Stack repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

[*All*] The adding Elastic Stack repository must be done in all Elasticsearch cluster node. 

.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/add_repository.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/add_repository.rst


Elasticsearch installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. [*All*] Install the Elasticsearch package:

    .. tabs::

      .. group-tab:: APT


        .. include:: ../../_templates/installations/elastic/deb/install_elasticsearch.rst



      .. group-tab:: Yum


        .. include:: ../../_templates/installations/elastic/yum/install_elasticsearch.rst



      .. group-tab:: ZYpp


        .. include:: ../../_templates/installations/elastic/zypp/install_elasticsearch.rst



#. [*All*] Once Elasticsearch is installed we need to configure it by downloading and editing the file ``/etc/elasticsearch/elasticsearch.yml`` as follows:

    .. include:: ../../_templates/installations/elastic/common/elastic-multi-node/configure_elasticsearch.rst

.. note:: If your using Debian 7, you will need to change the ulimit by ``ulimit -u 4096``. In addition to this, the setting ``bootstrap.system_call_filter`` must be added and set to ``false`` in the ``/etc/elasticsearch/elasticsearch.yml`` configuration file.


Certificates creation and deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. [*Master*] This step implies to select the Wazuh cluster installation type. Select the tab ``Wazuh single-node cluster`` if you will configure a Wazuh single node cluster. If your Wazuh cluster will have two or more nodes, select ``Wazuh multi-node cluster`` tab.

    .. include:: ../../_templates/installations/elastic/common/elastic-multi-node/generate_certificates.rst

#. [*All*] The next step is to create the directory ``/etc/elasticsearch/certs``, and then copy the certificate authorities, the certificate and the key there. Remember to replace the ``X`` according to the defined ``instances.yml`` file:

    .. include:: ../../_templates/installations/elastic/common/elastic-multi-node/deploy_certificates.rst

#. [*All*] Enable and start the Elasticsearch service:

    .. include:: ../../_templates/installations/elastic/common/enable_elasticsearch.rst

#. [*Master*] Generate credentials for all the Elastic Stack pre-built roles and users:

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

The next step consists of select the Wazuh server installation type that you want.

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





