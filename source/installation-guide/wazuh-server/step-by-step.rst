.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: The Wazuh server is in charge of analyzing the data received from the Wazuh agents. Install the Wazuh server in a single-node or multi-node configuration according to your environment needs.

Installing the Wazuh server in step-by-step mode
================================================

Install and configure the Wazuh server as a single-node or multi-node cluster following step-by-step instructions. The Wazuh server is in charge of analyzing the data received from the agents and triggering alerts when threats or anomalies are detected. This central component includes the Wazuh manager and Filebeat. The Wazuh manager collects and analyzes data from the deployed Wazuh agents. Filebeat securely forwards alerts and archived events to the Wazuh indexer.

The installation process is divided into three stages.  

#. Wazuh manager nodes installation

#. Filebeat installation

#. Cluster configuration for multi-node deployment 

.. note:: Root user privileges are required to run the commands described below.

.. _wazuh-manager-nodes-installation:

1. Wazuh manager nodes installation
-----------------------------------
.. raw:: html

  <div class="accordion-section open">

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::
  If you are installing Wazuh server on the same host as the Wazuh indexer, you may skip this step as you may have added the Wazuh repository already.

..
  Add the Wazuh repository to download the official Wazuh packages. As an alternative, you can download the Wazuh packages directly from :doc:`../packages-list`.
    
.. tabs::


  .. group-tab:: Yum


    .. include:: /_templates/installations/common/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: /_templates/installations/common/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: /_templates/installations/common/zypp/add_repository.rst



Installing the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install the Wazuh manager package. 

   .. tabs::
   
   
     .. group-tab:: Yum
   
   
       .. include:: /_templates/installations/wazuh/yum/install_wazuh_manager.rst
   
   
   
     .. group-tab:: APT
   
   
       .. include:: /_templates/installations/wazuh/deb/install_wazuh_manager.rst
   
   
   
     .. group-tab:: ZYpp
     
         
       .. include:: /_templates/installations/wazuh/zypp/install_wazuh_manager.rst


#. Enable and start the Wazuh manager service.

    .. include:: /_templates/installations/wazuh/common/enable_wazuh_manager_service.rst


#. Run the following command to verify the Wazuh manager status. 

    .. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst



.. _wazuh_server_multi_node_filebeat:

2. Install Filebeat
------------------------------
.. raw:: html

  <div class="accordion-section open">

Installing and configuring Filebeat 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


#. Install the Filebeat package.

    .. tabs::


      .. group-tab:: Yum


        .. include:: /_templates/installations/elastic/yum/install_filebeat.rst



      .. group-tab:: APT


        .. include:: /_templates/installations/elastic/deb/install_filebeat.rst



      .. group-tab:: ZYpp


        .. include:: /_templates/installations/elastic/zypp/install_filebeat.rst



#. Download the preconfigured Filebeat configuration file.

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://packages.wazuh.com/resources/|WAZUH_LATEST_MINOR|/open-distro/filebeat/7.x/filebeat_indexer_cluster.yml
      
      
#. Edit the file ``/etc/filebeat/filebeat.yml``.

    .. include:: /_templates/installations/filebeat/opensearch/configure_filebeat.rst


#. Download the alerts template for the Wazuh indexer.

    .. include:: /_templates/installations/filebeat/opensearch/load_filebeat_template.rst


#. Download the Wazuh module.

    .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Replace ``<server-node-certificate-name>`` with your Wazuh server node certificate name, the same used in ``instances.yml`` when creating the certificates. Then, move the certificates to their corresponding location. A copy of ``certs.tar``, created during the Wazuh indexer installation, should be available in your working directory.

    .. include:: /_templates/installations/filebeat/opensearch/copy_certificates_filebeat_wazuh_cluster.rst

#. Enable and start the Filebeat service.

    .. include:: /_templates/installations/filebeat/common/enable_filebeat.rst

#. Run the following command to verify that Filebeat is successfully installed.

   .. code-block:: console

      # filebeat test output

   Expand the output to see an example response.
   
   .. code-block:: none
        :class: output accordion-output
   
        elasticsearch: https://127.0.0.1:9700...
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

- If you want a Wazuh server single-node cluster, everything is set and you can proceed directly with :doc:`../wazuh-dashboard/step-by-step`. 
  
- If you want a Wazuh server multi-node cluster, repeat the :ref:`wazuh-manager-nodes-installation` stage on every node and carry on with configuring the Wazuh cluster.

3. Configure the Wazuh cluster
------------------------------
.. raw:: html

  <div class="accordion-section">

To configure the Wazuh cluster as a multi-node cluster, the Wazuh server needs to be installed on every node. After completing this action, you need to choose and configure one server as a Wazuh master node, and configure the rest as workers. 

The :ref:`Wazuh server master node <wazuh_server_master_node>` configuration needs to be applied only to the server chosen for this role. Once the master node is fully configured, apply the :ref:`Wazuh server worker nodes <wazuh_server_worker_nodes>` configuration to the rest of the servers.

.. _wazuh_server_master_node:

Wazuh server master node
^^^^^^^^^^^^^^^^^^^^^^^^

#. .. include:: ../../_templates/installations/wazuh/common/configure_wazuh_master_node.rst

#. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, restart the Wazuh manager. 

    .. include:: ../../_templates/installations/wazuh/common/restart_wazuh_manager.rst

.. _wazuh_server_worker_nodes:
    
Wazuh server worker nodes
^^^^^^^^^^^^^^^^^^^^^^^^^

#. .. include:: ../../_templates/installations/wazuh/common/configure_wazuh_worker_node.rst

#. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, restart the Wazuh manager. 

    .. include:: ../../_templates/installations/wazuh/common/restart_wazuh_manager.rst

#. .. include:: ../../_templates/installations/wazuh/common/check_wazuh_cluster.rst


Next steps
----------

The Wazuh server installation is now complete and you can proceed with installing Wazuh dashboard. To perform this action, see the :ref:`wazuh_dashboard_step_by_step` section.

If you want to uninstall the Wazuh server, see the :ref:`uninstalling section <user_manual_uninstall_wazuh_installation_open_distro>`.
