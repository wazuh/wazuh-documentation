.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Check out how to install the Wazuh manager and Filebeat using an automated script in this section of our documentation. 
  
.. _unattended_distributed_wazuh:

Wazuh server unattended installation
====================================

You can install the Wazuh manager and Filebeat using an automated script. This script performs a health check to verify that the system has enough resources to achieve optimal performance. 

For more information on system resources, see the :ref:`Requirements <installation_requirements>` section.

Installing the Wazuh server
---------------------------

.. note:: Root user privileges are required to run all the commands. To download the script, the package ``curl`` is used.


Download the installation script:

.. code-block:: console

    # curl -so ~/wazuh-server-installation.sh https://packages.wazuh.com/resources/4.2/open-distro/unattended-installation/distributed/wazuh-server-installation.sh 
    
Run the following command to install the Wazuh manager. Replace ``<node_name>`` with the name of the Wazuh server. The name of the node must be the same used in ``config.yml`` for the certificate creation, e.g. ``filebeat``. 

In case of installing a multi-node Wazuh cluster, repeat the process on every host:

.. code-block:: console

        # bash ~/wazuh-server-installation.sh -n <node_name>

The installation script allows the following options to be applied:

+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| Options                       | Purpose                                                                                                       |
+===============================+===============================================================================================================+
| -n / --node-name              | It indicates the name of the Wazuh server instance.                                                           |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -i / --ignore-healthcheck     | It ignores the health check.                                                                                  |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -d / --debug                  | It shows the complete installation output.                                                                    |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -h / --help                   | It shows help.                                                                                                |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+


Configure the installation
^^^^^^^^^^^^^^^^^^^^^^^^^^

After the installation of all the components of the node, you need to perform some steps to finish configuring the installation. 

Choose the cluster mode between single-node or multi-node:

.. tabs::


  .. group-tab:: Single-node


    Once the script finishes the installation, all the components are ready to use.



  .. group-tab:: Multi-node


    The Wazuh manager is installed and configured as a single-node cluster by default. To build a Wazuh multi-node cluster, you need to configure each Wazuh manager as a master or worker node.
     
    One server has to be chosen as a master, the rest are designated as workers. The ``Master node``  configuration must be applied only to the server chosen for this role. For all the other servers, the configuration ``Worker node`` needs to be applied.


    **Master node:**

    #. .. include:: ../../../../_templates/installations/wazuh/common/configure_wazuh_master_node.rst


    #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

        .. include:: ../../../../_templates/installations/wazuh/common/restart_wazuh_manager.rst


    **Worker node:**

    #. .. include:: ../../../../_templates/installations/wazuh/common/configure_wazuh_worker_node.rst


    #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

        .. include:: ../../../../_templates/installations/wazuh/common/restart_wazuh_manager.rst

    #. .. include:: ../../../../_templates/installations/wazuh/common/check_wazuh_cluster.rst 


To uninstall Wazuh and Filebeat, see the :ref:`Uninstalling <user_manual_uninstall_wazuh_installation_open_distro>` section.
