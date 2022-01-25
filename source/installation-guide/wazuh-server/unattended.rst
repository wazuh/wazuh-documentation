.. Copyright (C) 2022 Wazuh, Inc.

.. _wazuh_server_unattended:

Installing the Wazuh server in unattended mode
==============================================


The Wazuh server is in charge of analyzing the data received from the agents and triggering alerts when threats or anomalies are detected. This central component includes the Wazuh manager and Filebeat.


Wazuh server cluster installation
---------------------------------

Install the Wazuh server as a single-node or multi-node cluster according to your environment needs.  If you want to install a single-node cluster, follow the instructions to install the Wazuh master node and proceed directly with :ref:`installing Kibana <wazuh_dashboard_installation>`.

The installation process is divided into two stages.  

#. Wazuh master node installation

#. Wazuh worker nodes installation for multi-node clusters

.. note:: Root user privileges are required to run the commands described below.

1. Wazuh master node installation and configuration
----------------------------------------------------

.. raw:: html

  <div class="accordion-section open">


Install and configure the Wazuh master node. Make sure that a copy of ``certs.tar``, created during the Wazuh indexer installation, is placed in the root home folder ``(~/)``.

#. Download the unattended installation script. 

   .. code-block:: console
   
       # curl -sO https://s3.us-west-1.amazonaws.com/packages-dev.wazuh.com/resources/4.2/unattended_installation.sh

#. Run the script with the options ``-w`` and ``-wn <node_name>`` to install the Wazuh server. The node name must be the same used in ``config.yml`` for the certificate creation, for example, ``wazuh-master``.
 
- Additionally, you can indicate a cluster key of 32 characters with option ``-ck``. If no key is provided, the installation script generates one using ``openssl``.

  .. code-block:: console
  
         # bash ./unattended_installation.sh -w -wn nodeW-1

  Options available when running the script:
  
  +-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
  | Options                       | Purpose                                                                                                                                      |
  +===============================+==============================================================================================================================================+
  | -w / --install-wazuh          | Installs the Wazuh server. Must be used with option ``-wname <node-name>``.                                                                  |
  +-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
  | -wn / --wazuh-node-name       | Indicates the name of the Wazuh instance.                                                                                                    |
  +-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
  | -ck / --cluster-key           | Key used to encrypt communication between cluster nodes. It must be 32 characters long and same for all of the nodes in the cluster.         |                                          
  +-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
  | -o / --overwrite              | Overwrites the existing installation.                                                                                                        |
  +-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
  | -r / --uninstall              | Removes the installation.                                                                                                                    |
  +-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
  | -v / --verbose                | Shows the complete installation output.                                                                                                      |
  +-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
  | -i / --ignore-health-check    | Ignores the health check.                                                                                                                    |
  +-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
  | -h / --help                   | Shows *help*.                                                                                                                                |
  +-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+  

Your Wazuh server is now successfully installed. 

- If you want a Wazuh server single-node cluster, everything is set and you can proceed directly with :ref:`wazuh_dashboard_unattended_installation`.
      
- If you want a Wazuh server multi-node cluster, expand the instructions below to install and configure Wazuh worker nodes. 


2. Wazuh worker nodes installation and configuration
----------------------------------------------------

.. raw:: html

  <div class="accordion-section">


Install and configure the Wazuh worker nodes. Make sure that a copy of ``certs.tar``, created during the Wazuh indexer installation, is placed in the root home folder ``(~/)``.

#. Download the unattended installation script. 

   .. code-block:: console
   
       # curl -so ~/unattended-installation.sh https://packages.wazuh.com/resources/4.2/unattended-installation/unattended-installation.sh 

#. Run the script with the options ``-w``, ``-wn <node_name>``, and ``-ck`` to install the Wazuh server. The node name must be the same used in ``config.yml`` for the certificate creation, for example, ``wazuh-worker-1``. The cluster key must be the same used in the Wazuh master node. 
 
   .. code-block:: console
   
       # bash ~/wazuh-server-installation.sh -w -wn <node_name> -ck <cluster_key> 

Your Wazuh server is now successfully installed. Repeat this process on every Wazuh worker node in the multi-node cluster. 

Next steps
----------
  
The Wazuh server installation is now complete and you can proceed with installing the Wazuh dashboard. To perform this action, see the :ref:`wazuh_dashboard_unattended_installation` section.  
