.. Copyright (C) 2021 Wazuh, Inc.

.. _basic_unattended_distributed_wazuh:

Wazuh server unattended installation
====================================

This section will explain how to install the Wazuh manager and Filebeat using an automated script. This script will perform a health check to verify that the system has enough resources to achieve an optimal performance. For more information, please visit the :ref:`requirements <installation_requirements>` section.

Installing the Wazuh server
---------------------------

.. note:: Root user privileges are required to run all the commands described below. To download the script the package ``curl`` will be used.

Download the installation script:

.. code-block:: console

  # curl -so ~/wazuh-server-installation.sh https://packages.wazuh.com/resources/|WAZUH_LATEST_MINOR|/elastic-stack/unattended-installation/distributed/wazuh-server-installation.sh
    

Replace the following variables and run the installation script: 

- ``<node_name>``: Name of the Wazuh server instance (this name must be the same used in ``config.yml`` for the certificate creation, e.g. ``filebeat``). 
- ``<elastic_user_password>``: The password of the user ``elastic`` generated during the Elasticsearch installation. 

.. code-block:: console

    # bash ~/wazuh-server-installation.sh -n <node_name> -p <elastic_password>

The installation script allows the following options:

+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| Options                       | Purpose                                                                                                       |
+===============================+===============================================================================================================+
| -n / --node-name              | Name of the Wazuh server instance                                                                             |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -p / --elastic-password       | Elastic user password                                                                                         |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -d / --debug                  | Shows the complete installation output                                                                        |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -i / --ignore-healthcheck     | Ignores the health-check                                                                                      |
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

    #. .. include:: ../../../../../_templates/installations/wazuh/common/configure_wazuh_master_node.rst


    #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

      .. include:: ../../../../../_templates/installations/wazuh/common/restart_wazuh_manager.rst


    **Worker node:**

    #. .. include:: ../../../../../_templates/installations/wazuh/common/configure_wazuh_worker_node.rst


    #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

        .. include:: ../../../../../_templates/installations/wazuh/common/restart_wazuh_manager.rst

    #. .. include:: ../../../../../_templates/installations/wazuh/common/check_wazuh_cluster.rst 


To uninstall Wazuh and Filebeat, visit the :ref:`uninstalling section <user_manual_uninstall_wazuh_installation_basic>`.
