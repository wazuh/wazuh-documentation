.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _elasticsearch_multi_node_cluster:


Elasticsearch multi-node cluster
=================================

Open Distro is an open source distribution of Elasticsearch, a highly scalable full-text search engine. It offers advanced security, alerting, index management, deep performance analysis, and a number of other additional features. For more information, refer to `Open Distro for Elasticsearch <https://opendistro.github.io/for-elasticsearch/>`_.

This document will explain how to install the Open Distro components in a multi-node cluster.

.. note:: Root user privileges are necessary to execute all the commands described below.


Installing Elasticsearch
------------------------

The Elasticsearch configuration section has steps that must be done in all the hosts where Elasticsearch will be installed. But some of them only need to be done in the Elasticsearch master node. The labels [*All*] or [*Master*]  at the beginning of the step will indicate whether the steps must be done in all nodes or in a master node only. In case of having two or more [*Master*] nodes, the steps must be done in just one of them.

Preparing the installation
--------------------------

[*All*] Before installing Wazuh server and Open Distro, some extra packages must be installed. Open Distro for Elasticsearch requires the installation of Java Development Kit. Besides, ``wget``, ``curl``, and ``unzip`` utilities will be used in further steps:

  .. include:: ../../_templates/installations/elastic/common/before_installation.rst

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

[*All*] The addition of the Wazuh repository must be done in all Elasticsearch cluster nodes.

  .. tabs::


    .. group-tab:: APT


      .. include:: ../../_templates/installations/wazuh/deb/add_repository.rst



    .. group-tab:: Yum


      .. include:: ../../_templates/installations/wazuh/yum/add_repository.rst



Elasticsearch installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

[*All*] Install the Open Distro for Elasticsearch package:

    .. include:: ../../_templates/installations/elastic/common/install_elastic.rst

Elasticsearch configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~

[*All*] Once Elasticsearch is installed it has to be configured by downloading and editing the file ``/etc/elasticsearch/elasticsearch.yml`` as follows:

    .. include:: ../../_templates/installations/elastic/common/elastic-multi-node/configure_elasticsearch.rst

Certificates creation and deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. [*All*] Remove the demo certificates:

    .. include:: ../../_templates/installations/elastic/common/remove_demo_certs.rst

#. [*Master*] This step implies the selection of the Wazuh cluster installation type. Choose between ``Wazuh single-node cluster``, if having only one Wazuh server, and ``Wazuh multi-node cluster`` in case of having two or more Wazuh servers.

    .. include:: ../../_templates/installations/elastic/common/elastic-multi-node/generate_certificates.rst

#. [*All except Master*] Configure Elasticsearch certificates:

    .. include:: ../../_templates/installations/elastic/common/elastic-multi-node/deploy_certificates.rst

#. [*All*] Enable and start the Elasticsearch service:

    .. include:: ../../_templates/installations/elastic/common/enable_elasticsearch.rst

#. [*Master*] Execute the Elasticsearch's ``securityadmin`` script to load the new certificates information and start the cluster. To run this command, the value ``<elasticsearch_IP>`` must to be replaced by the Elasticsearch installation IP:

  .. code-block:: console

    # cd /usr/share/elasticsearch/plugins/opendistro_security/tools/
    # ./securityadmin.sh -cd ../securityconfig/ -icl -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin.key  -h <elasticsearch_IP>


Next steps
----------

The next step consists on the selection of the Wazuh server installation desired:

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
