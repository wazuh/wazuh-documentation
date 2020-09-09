.. Copyright (C) 2020 Wazuh, Inc.

.. _unattended_distributed_wazuh:

Wazuh server unattended installation
====================================

This section will explain how to install the Wazuh manager, the Wazuh API, and Filebeat-OSS using an automated script. This script will perform a health check to verify that the system has enough resources to ensure the proper performance of the installation. For more information, please visit the :ref:`requirements <installation_requirements>` section.

Run the script
--------------

.. note:: Root user privileges are required to run all the commands described below. To download the script the package ``curl`` will be used.


Download the script:

.. code-block:: console

    # curl -so ~/wazuh-server-installation.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/open-distro/unattended-installation/distributed/wazuh-server-installation.sh 
    

Filebeat needs to be configured by adding the Elasticsearch nodes IPs in order to connect with them. Choose between single-node or multi-node depending on the type of installation. The following commands assume that the script has been downloaded in the root home directory ( ``~/`` ):

.. code-block:: console

        # bash ~/wazuh-server-installation.sh -n <node_name>

Replace the ``<node_name>`` by the name of the Wazuh server name.


The script allows the following options:

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

Configure the installation
^^^^^^^^^^^^^^^^^^^^^^^^^^

After the installation of all the components of the node, some steps must be done manually. Choose between single-node or multi-node depending on the type of installation:

.. tabs::


  .. group-tab:: Single-node


    Once the script finishes the installation, all the components will be ready to use.



  .. group-tab:: Multi-node


    By default, the Wazuh manager is configured to work as a single-node cluster. The following steps will describe how to configure the Wazuh manager as a Wazuh ``master`` or ``worker`` node.

    **Master node:**

    #. .. include:: ../../../../_templates/installations/wazuh/common/configure_wazuh_master_node.rst


    #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

        .. include:: ../../../../_templates/installations/wazuh/common/restart_wazuh_manager.rst


    **Worker node:**

    #. .. include:: ../../../../_templates/installations/wazuh/common/configure_wazuh_worker_node.rst


    #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

        .. include:: ../../../../_templates/installations/wazuh/common/restart_wazuh_manager.rst

    #. .. include:: ../../../../_templates/installations/wazuh/common/check_wazuh_cluster.rst 

