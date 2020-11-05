.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _elasticsearch_multi_node_cluster:


Elasticsearch
=============

Open Distro for Elasticsearch is an open source distribution of Elasticsearch, a highly scalable full-text search engine. It offers advanced security, alerting, index management, deep performance analysis, and several other additional features.

This document will explain how to install Elasticsearch cluster, the user can select the cluster mode between single-node or multi-node. For resilience in case Elasticsearch nodes become unavailable, it is recommended to have an odd number of master eligible nodes, please take this into consideration when deciding the configuration of your Elasticsearch cluster.

.. note:: Alternatively, if you wish to do this installation in an automated way, you can find the instructions :ref:`here <unattended_distributed_elasticsearch>`.



Requirements
------------

This section aims to provide guidance about the supported operating systems as well as the minimum hardware requirements for an Elastic Stack server. 

Supported operating systems
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Elastic Stack components can be installed in the following operating systems:

- Amazon Linux 1 and 2.

- CentOS 6 or greater.

- Debian 8 or greater.

- Oracle Linux 6 or greater.

- Red Hat Enterprise Linux 6 or greater.

- Ubuntu 16 or greater.

- openSUSE Leap 42.

- SLES 12 or greater. 

- Windows Server 2012/R2 or greater. 


Hardware requirements
~~~~~~~~~~~~~~~~~~~~~

Elastic Stack can be installed as a single-node or as multi-node cluster. Kibana can either be installed in the same node as Elasticsearch, or in a dedicated host. For each Elastic Stack node, the hardware recommendations are: 

+-------------------------+-------------------------+-------------------------------+
|                         |  Minimum                |   Recommended                 |
+-------------------------+----------+--------------+--------------+----------------+
| Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
+=========================+==========+==============+==============+================+
| Elastic Stack           |     4    |     2        |     16       |       8        |
+-------------------------+----------+--------------+--------------+----------------+

A 64-bit operating system is required.  

Regarding the disk space requirements, the amount of data depends on the alerts per second (APS) generated. The following table shows an estimate of disk space per agent needed to store 90 days of alerts on an Elasticsearch server depending on the type of monitored endpoints. 


+-------------------------------------------------+-----+-----------------------------+
| Monitored endpoints                             | APS | Storage in Elasticsearch    |
|                                                 |     |   (GB/90 days)              | 
+=================================================+=====+=============================+
| Servers                                         | 0.25|           3.7               |       
+-------------------------------------------------+-----+-----------------------------+
| Workstations                                    | 0.1 |           1.5               |                    
+-------------------------------------------------+-----+-----------------------------+       
| Network devices                                 | 0.5 |           7.4               |
+-------------------------------------------------+-----+-----------------------------+

For example for an environment with 80 workstations, 10 servers and 10 networks devices the storage needed for 90 days of alerts would be around 230 GB on the Elasticsearch server.


Installing Elasticsearch
------------------------

The installation process for a multi-node cluster will be explained in three parts. The first one refers to the configuration of the initial node, in which the SSL certificates that will be deployed to the subsequent nodes are generated. 

The second part will explain how to configure the remaining nodes of the cluster. Finally, the third part provides instructions for initializing the Elasticsearch cluster and verifying that everything is working properly.  

In case you want to install a single-node cluster, follow the instructions for the master node and select the single-node tabs. After finishing the installation of the master node, proceed to initialize the cluster without installing subsequent nodes. 

.. note:: Root user privileges are necessary to run all the commands described below.

**Initial node**
****************

The following instructions are meant to be performed on the **first** Elasticsearch node to be configured.  

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

To configure Elasticsearch download the following file ``/etc/elasticsearch/elasticsearch.yml``:

.. tabs::


  .. group-tab:: Single-node 


    .. include:: ../../../../../_templates/installations/elastic/common/elastic-single-node/configure_elasticsearch.rst
   


  .. group-tab:: Multi-node 


    .. include:: ../../../../../_templates/installations/elastic/common/elastic-multi-node/configure_elasticsearch_initial.rst



Certificates creation and deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: Single-node 


   #. Remove the demo certificates:

      .. include:: ../../../../../_templates/installations/elastic/common/remove_demo_certs.rst

   #. Generate and deploy the certificates:

       .. include:: ../../../../../_templates/installations/elastic/common/elastic-single-node/generate_deploy_certificates.rst

   #. Enable and start the Elasticsearch service:

       .. include:: ../../../../../_templates/installations/elastic/common/enable_elasticsearch.rst



  .. group-tab:: Multi-node 


     #. Remove the demo certificates:

        .. include:: ../../../../../_templates/installations/elastic/common/remove_demo_certs.rst

     #. Generate and deploy the certificates:

        .. include:: ../../../../../_templates/installations/elastic/common/elastic-multi-node/generate_certificates.rst

     #. Enable and start the Elasticsearch service:

        .. include:: ../../../../../_templates/installations/elastic/common/enable_elasticsearch.rst



.. note:: In case you want to install a single-node cluster, click :ref:`here <initialize_cluster>` to proceed with the initialization of the cluster. 

**Subsequent nodes**
********************

The following steps **should be executed in each of the subsequent nodes** of the Elasticsearch cluster. 


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

To configure Elasticsearch download the following file ``/etc/elasticsearch/elasticsearch.yml``:


.. include:: ../../../../../_templates/installations/elastic/common/elastic-multi-node/configure_elasticsearch_subsequent.rst


Certificates deployment
~~~~~~~~~~~~~~~~~~~~~~~

#. Remove the demo certificates:

    .. include:: ../../../../../_templates/installations/elastic/common/remove_demo_certs.rst

#. Configure Elasticsearch certificates:

    .. include:: ../../../../../_templates/installations/elastic/common/elastic-multi-node/deploy_certificates.rst

#. Enable and start the Elasticsearch service:

    .. include:: ../../../../../_templates/installations/elastic/common/enable_elasticsearch.rst


.. _initialize_cluster:

**Initializing the cluster**
****************************

Once the installation process is done in all the servers of the Elasticsearch cluster, run the security admin script on the **initial node**: 

Run the Elasticsearch's ``securityadmin`` script to load the new certificates information and start the cluster. To run this command, the value ``<elasticsearch_IP>`` must be replaced by the Elasticsearch installation IP:

  .. code-block:: console

    # /usr/share/elasticsearch/plugins/opendistro_security/tools/securityadmin.sh -cd /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ -icl -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin.key -h <elasticsearch_IP>

Replace the value ``<elasticsearch_IP>`` by the Elasticsearch installation IP and run the following command to ensure that the installation has been successful:

.. code-block:: console

  # curl -XGET https://<elasticsearch_ip>:9200 -u admin:admin -k

An example response should look as follows:

.. code-block:: none
             :class: output

              {
                "name" : "node-1",
                "cluster_name" : "elasticsearch",
                "cluster_uuid" : "2gIeOOeUQh25c2yU0Pd-RQ",
                "version" : {
                  "number" : "7.9.1",
                  "build_flavor" : "oss",
                  "build_type" : "rpm",
                  "build_hash" : "083627f112ba94dffc1232e8b42b73492789ef91",
                  "build_date" : "2020-09-01T21:22:21.964974Z",
                  "build_snapshot" : false,
                  "lucene_version" : "8.6.2",
                  "minimum_wire_compatibility_version" : "6.8.0",
                  "minimum_index_compatibility_version" : "6.0.0-beta1"
                },
                "tagline" : "You Know, for Search"
              }


To verify the nodes that are connected to the cluster, replace ``<elasticsearch_ip>``  and run the following command: 

.. code-block:: console

  # curl -XGET https://<elasticsearch_ip>:9200/_cat/nodes -u admin:admin -k


It is highly recommended to change Elasticsearch’s default passwords for the users found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found :ref:`here <change_elastic_pass>`. It is also recommended to customize the file ``/etc/elasticsearch/jvm.options`` in order to improve the performance of Elasticsearch. Learn more about this process in the :ref:`Elasticsearch tuning <elastic_tuning>` section.


 
Next steps
----------

The next step is the installation of the Wazuh server, select the cluster mode:

- :ref:`Wazuh single-node cluster<wazuh_single_node_cluster>`
- :ref:`Wazuh multi-node cluster<wazuh_multi_node_cluster>`

Uninstall Elasticsearch
-----------------------

In case you need to uninstall Elasticsearch follow the instructions below: 



.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/elastic/yum/uninstall_elasticsearch.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/elastic/deb/uninstall_elasticsearch.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../_templates/installations/elastic/zypp/uninstall_elasticsearch.rst




