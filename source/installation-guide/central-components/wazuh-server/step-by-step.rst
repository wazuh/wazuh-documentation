.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: The Wazuh server is in charge of analyzing the data received from the Wazuh agents. Install the Wazuh server in a single-node or multi-node configuration according to your environment needs.

.. _wazuh_server_step_by_step:


Installing Wazuh server in step-by-step mode
============================================

The Wazuh server is in charge of analyzing the data received from the agents and triggering alerts when threats or anomalies are detected. This central component includes the Wazuh manager and the Wazuh forwarder.


Wazuh server cluster installation and configuration
----------------------------------------------------

Install the Wazuh server as a single-node or multi-node cluster according to your environment needs. If you want to install a single-node cluster, follow the instructions to install the Wazuh manager and the Wazuh forwarder, and proceed directly with :ref:`installing the Wazuh interface <wazuh_interface_installation>`.

The installation process is divided in three stages.  

#. Wazuh manager installation

#. Wazuh forwarder installation

#. Cluster configuration for multi-node deployment 

.. note:: Root user privileges are required to run the commands described below.

Install the Wazuh manager
-------------------------

The Wazuh manager collects and analyzes data from the deployed Wazuh agents. 

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Add the Wazuh repository to download the official Wazuh packages. As an alternative, you can download the Wazuh packages directly from our :ref:`Package list <packages>`. 
    
   .. tabs::
   
   
   
       .. group-tab:: Yum
   
   
         .. include:: ../../../_templates/installations/wazuh/yum/add_repository_wazuh_server.rst
   
   
   
       .. group-tab:: APT
   
   
         .. include:: ../../../_templates/installations/wazuh/deb/add_repository_wazuh_server.rst
   
   
   
       .. group-tab:: ZYpp
   
   
         .. include:: ../../../_templates/installations/wazuh/zypp/add_repository_wazuh_server.rst
    


Installing the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install the Wazuh manager package. 

   .. tabs::
   
   
     .. group-tab:: Yum
   
   
       .. include:: ../../../_templates/installations/wazuh/yum/install_wazuh_manager.rst
   
   
   
     .. group-tab:: APT
   
   
       .. include:: ../../../_templates/installations/wazuh/deb/install_wazuh_manager.rst
   
   
   
     .. group-tab:: ZYpp
   
   
       .. include:: ../../../_templates/installations/wazuh/zypp/install_wazuh_manager.rst


#. Enable and start the Wazuh manager service.

    .. include:: ../../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst


#. Run the following command to verify the Wazuh manager status. 

    .. include:: ../../../_templates/installations/wazuh/common/check_wazuh_manager.rst



.. _wazuh_server_multi_node_filebeat:

Install the Wazuh forwarder
---------------------------

The Wazuh forwarder, based on Filebeat-OSS, securely forwards alerts and archived events to the Wazuh indexer.  


Installing and configuring the Wazuh forwarder 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


#. Install the Filebeat package.

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../../_templates/installations/elastic/yum/install_filebeat.rst



      .. group-tab:: APT


        .. include:: ../../../_templates/installations/elastic/deb/install_filebeat.rst



      .. group-tab:: ZYpp


        .. include:: ../../../_templates/installations/elastic/zypp/install_filebeat.rst



#. Download the preconfigured Filebeat configuration file used to forward the Wazuh alerts to the Wazuh indexer.

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/|WAZUH_LATEST_MINOR|/resources/open-distro/filebeat/7.x/filebeat_elastic_cluster.yml

#. Download the alerts template for the Wazuh indexer.

    .. include:: ../../../_templates/installations/elastic/common/load_filebeat_template.rst


#. Download the Wazuh module.

    .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Edit the file ``/etc/filebeat/filebeat.yml``.

    .. include:: ../../../_templates/installations/elastic/common/configure_filebeat.rst

#. Replace ``wazuh-node-name`` with your Wazuh server node name, the same used in ``instances.yml`` to create the certificates, and move the certificates to their corresponding location. By default, a copy of ``certs.tar``, created during the Wazuh indexer installation, should be located in the root home folder (``~/``). 

    .. include:: ../../../_templates/installations/elastic/common/copy_certificates_filebeat_wazuh_cluster.rst

#. Enable and start the Filebeat service.

    .. include:: ../../../_templates/installations/elastic/common/enable_filebeat.rst

#. Run the following command to verify that Filebeat is successfully installed.

   .. code-block:: console

      # filebeat test output

   An example response looks as follows:
   
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
                   version: 7.10.2


Your Wazuh server is now successfully installed and the Wazuh manager is configured as a single-node cluster by default. 

- If you want a single-node deployment configuration, you can proceed directly with :ref:`installing the Wazuh interface <wazuh_interface_installation>`. 
  
- If you want to perform a multi-node deployment, install the Wazuh server on every node and carry on with configuring the Wazuh cluster.

Configure the Wazuh cluster
---------------------------

To configure the Wazuh cluster as a multi-node deployment, the Wazuh server needs to be installed on every node. After completing this action, you need to choose and configure one server as a Wazuh master node, the rest will be configured as workers. 

The *Wazuh server master node* configuration needs to be applied only to the server chosen for this role. Once the master node is fully configured, apply the *Wazuh server worker nodes* configuration to the rest of the servers.



Wazuh server master node
^^^^^^^^^^^^^^^^^^^^^^^^

#. .. include:: ../../../_templates/installations/wazuh/common/configure_wazuh_master_node.rst

#. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, restart the Wazuh manager. 

    .. include:: ../../../_templates/installations/wazuh/common/restart_wazuh_manager.rst

Wazuh server worker nodes
^^^^^^^^^^^^^^^^^^^^^^^^^

#. .. include:: ../../../_templates/installations/wazuh/common/configure_wazuh_worker_node.rst

#. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, restart the Wazuh manager. 

    .. include:: ../../../_templates/installations/wazuh/common/restart_wazuh_manager.rst

#. .. include:: ../../../_templates/installations/wazuh/common/check_wazuh_cluster.rst


To uninstall the Wazuh server, see the :ref:`uninstalling section <user_manual_uninstall_wazuh_installation_open_distro>`.

Next steps
----------

The next step consists of :ref:`installing the Wazuh interface <wazuh_interface_installation>` for mining, analyzing, and visualizing data.
