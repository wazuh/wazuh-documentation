.. Copyright (C) 2022 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _basic_elasticsearch_multi_node_cluster:


Elasticsearch multi-node cluster
=================================

Elasticsearch is a highly scalable full-text search and analytics engine. This document will explain how to install the Elastic Stack components in a multi-node cluster.

For resilience in case Elasticsearch nodes become unavailable, it is recommended to have an odd number of master eligible nodes, please take this into consideration when deciding the configuration of your Elasticsearch cluster. 

.. note:: Root user privileges are necessary to execute all the commands described below.


Installing Elasticsearch
------------------------

The installation process for a multi-node cluster will be explained in three parts. The first one refers to the configuration of the initial node, in which the certificates that will be deployed to the subsequent nodes are generated. 

The second part will explain how to configure the remaining nodes of the cluster. Finally, the third part provides instructions for initializing the Elasticsearch cluster and verifying that everything is working properly.  


**Initial node**
****************

The following instructions are meant to be performed on the **first** Elasticsearch node to be configured.  


Prerequisites
~~~~~~~~~~~~~

.. include:: ../../../../../../_templates/installations/basic/before_installation_elastic.rst


Adding the Elastic Stack repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The addition of Elastic Stack repository must be done in all Elasticsearch cluster nodes.

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../../_templates/installations/basic/elastic/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../../../../_templates/installations/basic/elastic/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../../_templates/installations/basic/elastic/zypp/add_repository.rst


Elasticsearch installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install the Elasticsearch package:

    .. tabs::

      .. group-tab:: Yum


        .. include:: ../../../../../../_templates/installations/basic/elastic/yum/install_elasticsearch.rst



      .. group-tab:: APT


        .. include:: ../../../../../../_templates/installations/basic/elastic/deb/install_elasticsearch.rst



      .. group-tab:: ZYpp


        .. include:: ../../../../../../_templates/installations/basic/elastic/zypp/install_elasticsearch.rst



Once Elasticsearch is installed it has to be configured by downloading and editing the file ``/etc/elasticsearch/elasticsearch.yml`` as follows:

.. include:: ../../../../../../_templates/installations/basic/elastic/common/elastic-multi-node/configure_elasticsearch_initial_node.rst


Certificates creation and deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#.  This step implies the selection of the Wazuh cluster mode. Choose between ``Wazuh single-node cluster``, if having only one Wazuh server, and ``Wazuh multi-node cluster`` in case of having two or more Wazuh servers.

    .. include:: ../../../../../../_templates/installations/basic/elastic/common/elastic-multi-node/generate_certificates.rst

#. Copy ``~/certs.zip`` to all the servers of the distributed deployment. This can be done by using, for example,  ``scp.``. 

#.  The next step is to create the directory ``/etc/elasticsearch/certs``, and then copy the CA file, the certificate and the key there.  

    .. include:: ../../../../../../_templates/installations/basic/elastic/common/elastic-multi-node/deploy_certificates_initial_node.rst


#. If Kibana will be installed in this node, keep the certificates file. Otherwise, if the file has been copied already to all the instances of the distributed deployment, remove it to increase security  ``rm -f ~/certs.zip``. 


#. Enable and start the Elasticsearch service:

    .. include:: ../../../../../../_templates/installations/basic/elastic/common/enable_elasticsearch.rst


**Subsequent nodes**
********************

The following steps **should be executed in each of the subsequent nodes** of the Elasticsearch cluster. 


Prerequisites
~~~~~~~~~~~~~

.. include:: ../../../../../../_templates/installations/basic/before_installation_elastic.rst


Adding the Elastic Stack repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The addition of Elastic Stack repository must be done in all Elasticsearch cluster nodes.

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../../_templates/installations/basic/elastic/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../../../../_templates/installations/basic/elastic/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../../_templates/installations/basic/elastic/zypp/add_repository.rst


Elasticsearch installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Elasticsearch package:

  .. tabs::

    .. group-tab:: Yum


      .. include:: ../../../../../../_templates/installations/basic/elastic/yum/install_elasticsearch.rst



    .. group-tab:: APT


      .. include:: ../../../../../../_templates/installations/basic/elastic/deb/install_elasticsearch.rst



    .. group-tab:: ZYpp


      .. include:: ../../../../../../_templates/installations/basic/elastic/zypp/install_elasticsearch.rst


 Once Elasticsearch is installed it has to be configured by downloading and editing the file ``/etc/elasticsearch/elasticsearch.yml`` as follows:

.. include:: ../../../../../../_templates/installations/basic/elastic/common/elastic-multi-node/configure_elasticsearch_subsequent_nodes.rst

Certificates deployment
~~~~~~~~~~~~~~~~~~~~~~~


#.  The next step is to create the directory ``/etc/elasticsearch/certs``, and then copy the CA file, the certificate and the key there. The ``X`` must be replaced according to the defined data in ``instances.yml`` file:

    .. include:: ../../../../../../_templates/installations/basic/elastic/common/elastic-multi-node/deploy_certificates_subsequent_nodes.rst

#. If Kibana will be installed in this node, keep the certificates file. Otherwise, remove it to increase security ``rm -f ~/certs.zip``.  

#.  Enable and start the Elasticsearch service:

    .. include:: ../../../../../../_templates/installations/basic/elastic/common/enable_elasticsearch.rst


**Initializing the cluster**
****************************

Once the installation process is done in all the servers of the Elasticsearch cluster, run the following command on the **initial node** to generate credentials for all the Elastic Stack pre-built roles and users: 

.. include:: ../../../../../../_templates/installations/basic/elastic/common/generate_elastic_credentials.rst


Disabling repositories
----------------------

.. include:: ../../../../../../_templates/installations/basic/elastic/common/disabling_repositories_explanation.rst


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../../_templates/installations/basic/elastic/yum/disabling_repositories.rst



  .. group-tab:: APT


    .. include:: ../../../../../../_templates/installations/basic/elastic/deb/disabling_repositories.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../../_templates/installations/basic/elastic/zypp/disabling_repositories.rst


To uninstall Elasticsearch, visit the :ref:`uninstalling section <basic_uninstall_elasticsearch>`.

Next steps
----------

The next step is the installation of the Wazuh server, select the cluster mode: 

- :ref:`Wazuh single-node cluster<basic_wazuh_single_node_cluster>`
- :ref:`Wazuh multi-node cluster<basic_wazuh_multi_node_cluster>`

