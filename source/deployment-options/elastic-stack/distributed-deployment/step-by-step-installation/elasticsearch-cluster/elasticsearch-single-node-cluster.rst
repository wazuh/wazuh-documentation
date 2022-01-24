.. Copyright (C) 2022 Wazuh, Inc.

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

#. This step implies the selection of the Wazuh cluster mode. Choose between ``Wazuh single-node cluster``, if having only one Wazuh server, and ``Wazuh multi-node cluster`` in case of having two or more Wazuh servers.

    .. include:: ../../../../../_templates/installations/basic/elastic/common/elastic-single-node/generate_deploy_certificates.rst

#. Copy ``~/certs.zip`` to all the servers of the distributed deployment. This can be done by using, for example,  ``scp.``

#. The next step is to create the directory ``/etc/elasticsearch/certs``, and then copy the certificate authorities, the certificate and key there:

    .. code-block:: console
    
      # unzip ~/certs.zip -d ~/certs 
      # mkdir /etc/elasticsearch/certs/ca -p
      # cp -R ~/certs/ca/ ~/certs/elasticsearch/* /etc/elasticsearch/certs/
      # chown -R elasticsearch: /etc/elasticsearch/certs
      # chmod -R 500 /etc/elasticsearch/certs
      # chmod 400 /etc/elasticsearch/certs/ca/ca.* /etc/elasticsearch/certs/elasticsearch.*
      # rm -rf ~/certs/

#. If Kibana will be installed in this node, keep the certificates file. Otherwise, if the file has been copied already to all the instances of the distributed deployment, remove it to increase security  ``rm -f ~/certs.zip``.

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


To uninstall Elasticsearch, visit the :ref:`uninstalling section <basic_uninstall_elasticsearch>`.

Next steps
----------

The next step is the installation of the Wazuh server, select the cluster mode:

- :ref:`Wazuh single-node cluster<basic_wazuh_single_node_cluster>`
- :ref:`Wazuh multi-node cluster<basic_wazuh_multi_node_cluster>`
