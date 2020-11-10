.. Copyright (C) 2020 Wazuh, Inc.

.. _unattended_distributed_wazuh:

Wazuh server unattended installation
====================================

This section will explain how to install the Wazuh manager and Filebeat using an automated script. This script will perform a health check to verify that the system has enough resources to ensure the proper performance of the installation. 

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


Installing the Wazuh server
---------------------------

.. note:: Root user privileges are required to run all the commands described below. To download the script the package ``curl`` will be used.


Download the installation script:

.. code-block:: console

    # curl -so ~/wazuh-server-installation.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.0/resources/open-distro/unattended-installation/distributed/wazuh-server-installation.sh 
    
Run the following command to install the Wazuh manager. Replace ``<node_name>`` by the name of the Wazuh server: 

.. code-block:: console

        # bash ~/wazuh-server-installation.sh -n <node_name>

The installation script allows the following options:

+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| Options                       | Purpose                                                                                                       |
+===============================+===============================================================================================================+
| -n / --node-name              | Indicates the name of the Wazuh server instance                                                               |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -i / --ignore-healthcheck     | Ignores the health-check                                                                                      |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -d / --debug                  | Shows the complete installation output                                                                        |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -h / --help                   | Shows help                                                                                                    |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+

In case of installing a multi-node Wazuh cluster, repeat this process in every host.  

Configure the installation
^^^^^^^^^^^^^^^^^^^^^^^^^^

After the installation of all the components of the node, some steps must be done manually. Choose the cluster mode between single-node or multi-node:

.. tabs::


  .. group-tab:: Single-node


    Once the script finishes the installation, all the components will be ready to use.



  .. group-tab:: Multi-node


    The Wazuh manager is installed and configured as a single-node cluster by default. The following sections will describe how to build a Wazuh multi-node cluster by configuring each Wazuh manager as a master or worker node.
     
    One server has to be chosen as a master, the rest will be workers. The ``Master node``  configuration must be applied only to the server chosen for this role. For all the other servers, the configuration ``Worker node`` must be applied.


    **Master node:**

    #. .. include:: ../../_templates/installations/wazuh/common/configure_wazuh_master_node.rst


    #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

        .. include:: ../../_templates/installations/wazuh/common/restart_wazuh_manager.rst


    **Worker node:**

    #. .. include:: ../../_templates/installations/wazuh/common/configure_wazuh_worker_node.rst


    #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

        .. include:: ../../_templates/installations/wazuh/common/restart_wazuh_manager.rst

    #. .. include:: ../../_templates/installations/wazuh/common/check_wazuh_cluster.rst 




Uninstall
---------

In case you need to uninstall the Wazuh server follow the instructions below:  


Uninstall the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/uninstall_wazuh_manager_api.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/uninstall_wazuh_manager_api.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/uninstall_wazuh_manager_api.rst




Uninstall Filebeat
~~~~~~~~~~~~~~~~~~


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_filebeat.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_filebeat.rst



  .. group-tab:: ZYpp  


    .. include:: ../../_templates/installations/elastic/deb/uninstall_filebeat.rst