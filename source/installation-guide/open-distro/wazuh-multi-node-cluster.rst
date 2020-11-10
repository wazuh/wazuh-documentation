.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install a Wazuh multi-node cluster

.. _wazuh_multi_node_cluster:


Wazuh server
============

This document will go through the installation of the Wazuh server components in a Wazuh multi-node cluster.

.. note:: Alternatively, if you wish to do this installation in an automated way, you can find the instructions :ref:`here <unattended_distributed_wazuh>`.

Requirements
------------

This section aims to provide guidance about the supported operating systems as well as the recommended hardware requirements for a Wazuh server.

Supported operating systems
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Wazuh server can be installed in the following Linux operating systems:

- Amazon Linux 1 and 2.

- CentOS 6 or greater.

- Debian 7 or greater.

- Fedora 31 or greater.

- Oracle Linux 6 or greater.

- Red Hat Enterprise Linux 6 or greater.

- Ubuntu 12 or greater.


Hardware requirements
~~~~~~~~~~~~~~~~~~~~~

The Wazuh server can be installed as a single-node or as multi-node cluster. For each node, the hardware recommendations are: 

                          
+-------------------------+-------------------------+-------------------------------+
|                         |  Minimum                |   Recommended                 |
+-------------------------+----------+--------------+--------------+----------------+
| Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
+=========================+==========+==============+==============+================+
| Wazuh server            |     2    |     2        |      8       |       4        |
+-------------------------+----------+--------------+--------------+----------------+

A 64-bit operating system is required.  

Regarding the disk space requirements, the amount of data depends on the alerts per second (APS) generated. The following table shows an estimate of disk space per agent needed to store 90 days of alerts on a Wazuh server depending on the type of monitored endpoints. 


+-------------------------------------------------+-----+-----------------------------+
| Monitored endpoints                             | APS | Storage in Wazuh Manager    |
|                                                 |     |  (GB/90 days)               |
+=================================================+=====+=============================+
| Servers                                         | 0.25|    0.1                      |       
+-------------------------------------------------+-----+-----------------------------+
| Workstations                                    | 0.1 |    0.04                     |                 
+-------------------------------------------------+-----+-----------------------------+       
| Network devices                                 | 0.5 |    0.2                      |
+-------------------------------------------------+-----+-----------------------------+

For example for an environment with 80 workstations, 10 servers and 10 networks devices the storage needed for 90 days of alerts would be around 6 GB. 


Prerequisites
-------------

.. note:: Root user privileges are required to run all the commands described below.

Before installing the Wazuh manager and Filebeat, some extra packages must be installed:

.. include:: ../../../../../_templates/installations/elastic/common/before_installation_kibana_filebeat.rst

Installing the Wazuh server
---------------------------

The Wazuh server collects and analyzes data from the deployed Wazuh agents. It runs the Wazuh manager and Filebeat. The first step to set up Wazuh is adding the Wazuh's repository to the servers, alternatively, the installation can be done using packages. A list with all the available packages can be found :ref:`here <packages>`. 

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

This section describes how to add the Wazuh repository. It will be used for the Wazuh manager and Filebeat installation. These steps must be followed in all the servers that will be part of the Wazuh multi-node cluster:

.. tabs::



    .. group-tab:: Yum


      .. include:: ../../../../../_templates/installations/wazuh/yum/add_repository.rst



    .. group-tab:: APT


      .. include:: ../../../../../_templates/installations/wazuh/deb/add_repository.rst



    .. group-tab:: ZYpp


      .. include:: ../../../../../_templates/installations/wazuh/zypp/add_repository.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install the Wazuh manager package. This step must be applied in all servers that will act as Wazuh cluster nodes:

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/wazuh/yum/install_wazuh_manager.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/wazuh/deb/install_wazuh_manager.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../_templates/installations/wazuh/zypp/install_wazuh_manager.rst



Choose the cluster mode between single-node or multi-node:


.. tabs::


  .. group-tab:: Single-node


    #. Enable and start the Wazuh manager service:

        .. include:: ../../../../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

    #. Run the following command to check if the Wazuh manager is active: 

        .. include:: ../../../../../_templates/installations/wazuh/common/check_wazuh_manager.rst



  .. group-tab:: Multi-node


    The Wazuh manager is installed and configured as a single-node cluster by default. The following sections will describe how to build a Wazuh multi-node cluster by configuring each Wazuh manager as a master or worker node.
     
    One server has to be chosen as a master, the rest will be workers. The ``Master node``  configuration must be applied only to the server chosen for this role. For all the other servers, the configuration ``Worker node`` must be applied.


    **Master node:**

    #. .. include:: ../../../../../_templates/installations/wazuh/common/configure_wazuh_master_node.rst


    #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

        .. include:: ../../../../../_templates/installations/wazuh/common/restart_wazuh_manager.rst


    **Worker node:**

    #. .. include:: ../../../../../_templates/installations/wazuh/common/configure_wazuh_worker_node.rst


    #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

        .. include:: ../../../../../_templates/installations/wazuh/common/restart_wazuh_manager.rst

    #. .. include:: ../../../../../_templates/installations/wazuh/common/check_wazuh_cluster.rst 



.. _wazuh_server_multi_node_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.  It has to be installed in every Wazuh server.


Filebeat installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


#. Install the Filebeat package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../../../../_templates/installations/elastic/yum/install_filebeat.rst



      .. group-tab:: APT


        .. include:: ../../../../../_templates/installations/elastic/deb/install_filebeat.rst



      .. group-tab:: ZYpp


        .. include:: ../../../../../_templates/installations/elastic/zypp/install_filebeat.rst



#. Download the pre-configured Filebeat configuration file used to forward the Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.0/resources/open-distro/filebeat/7.x/filebeat_elastic_cluster.yml

#. Download the alerts template for Elasticsearch:

    .. include:: ../../../../../_templates/installations/elastic/common/load_filebeat_template.rst


#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Edit the file ``/etc/filebeat/filebeat.yml``:

    .. include:: ../../../../../_templates/installations/elastic/common/configure_filebeat.rst

#. Configure Filebeat certificates:

    .. include:: ../../../../../_templates/installations/elastic/common/copy_certificates_filebeat_wazuh_cluster.rst

#. Enable and start the Filebeat service:

    .. include:: ../../../../../_templates/installations/elastic/common/enable_filebeat.rst

To ensure that Filebeat has been successfully installed, run the following command:

    .. code-block:: console

      # filebeat test output

An example response should look as follows:

.. code-block:: none
             :class: output

              elasticsearch: https://127.0.0.1:9200...
                parse url... OK
                connection...
                  parse host... OK
                  dns lookup... OK
                  addresses: 127.0.0.1
                  dial up... OK
                TLS...
                  security: server's certificate chain verification is enabled
                  handshake... OK
                  TLS version: TLSv1.3
                  dial up... OK
                talk to server... OK
                version: 7.9.1



Next steps
----------

The next step consists of :ref:`installing Kibana <kibana>`.

Uninstall
---------

In case you need to uninstall the Wazuh server follow the instructions below:  


Uninstall the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/wazuh/yum/uninstall_wazuh_manager_api.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/wazuh/deb/uninstall_wazuh_manager_api.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../_templates/installations/wazuh/zypp/uninstall_wazuh_manager_api.rst




Uninstall Filebeat
~~~~~~~~~~~~~~~~~~


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/elastic/yum/uninstall_filebeat.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/elastic/deb/uninstall_filebeat.rst



  .. group-tab:: ZYpp  


    .. include:: ../../../../../_templates/installations/elastic/deb/uninstall_filebeat.rst
