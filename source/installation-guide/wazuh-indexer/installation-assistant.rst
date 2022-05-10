.. Copyright (C) 2015–2022 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh indexer using the Wazuh installation assistant. The Wazuh indexer is a highly scalable full-text search engine and offers advanced security, alerting, index management, deep performance analysis, and several other features.

Installing the Wazuh indexer using the assistant
================================================

Install and configure the Wazuh indexer as a single-node or multi-node cluster with the aid of the Wazuh installation assistant. The Wazuh indexer is a highly scalable full-text search engine and offers advanced security, alerting, index management, deep performance analysis, and several other features.


Wazuh indexer cluster installation
----------------------------------

The installation process is divided into three stages. 

#. Initial configuration

#. Wazuh indexer nodes installation

#. Cluster initialization

.. note:: Root user privileges are required to run the commands described below.


1. Initial configuration
------------------------

Indicate your deployment configuration, create the SSL certificates to encrypt communications between the Wazuh components and random passwords to secure your installation. 

#. Download the Wazuh installation assistant and the configuration file. 

      .. code-block:: console

          # curl -sO https://packages.wazuh.com/|WAZUH_LATEST_MINOR|/wazuh-install.sh
          # curl -sO https://packages.wazuh.com/|WAZUH_LATEST_MINOR|/config.yml
       
#. Edit ``./config.yml`` and replace the node names and IP values with the corresponding names and IP addresses. You need to do this for all the Wazuh server, the Wazuh indexer, and the Wazuh dashboard nodes. Add as many node fields as needed.

      .. code-block:: yaml

         nodes:
           # Wazuh indexer nodes
           indexer:
             - name: node-1
               ip: <indexer-node-ip>
             # - name: node-2
             #   ip: <indexer-node-ip>
             # - name: node-3
             #   ip: <indexer-node-ip>
         
           # Wazuh server nodes
           # Use node_type only with more than one Wazuh manager
           server:
             - name: wazuh-1
               ip: <wazuh-manager-ip>
             # node_type: master
             # - name: wazuh-2
             #   ip: <wazuh-manager-ip>
             # node_type: worker
         
           # Wazuh dashboard node
           dashboard:
             - name: dashboard
               ip: <dashboard-node-ip>

#. Run the assistant with the option ``--generate-config-files`` to generate the  Wazuh cluster key, certificates, and passwords necessary for installation. 

      .. code-block:: console

        # bash wazuh-install.sh --generate-config-files


#.  Copy the ``wazuh-install-files.tar`` file to all the servers of the distributed deployment, including the Wazuh server, the Wazuh indexer, and the Wazuh dashboard nodes. This can be done by using, for example, ``scp``.


2. Wazuh indexer nodes installation
------------------------------------

Install and configure the Wazuh indexer nodes. 


#. Download the Wazuh installation assistant.

      .. code-block:: console

        # curl -sO https://packages.wazuh.com/|WAZUH_LATEST_MINOR|/wazuh-install.sh


#. Run the assistant with the option ``--wazuh-indexer`` and the node name to install and configure the Wazuh indexer. The node name must be the same used in ``config.yml`` for the initial configuration, for example, ``node-1``.
      
      .. note:: Make sure that a copy of ``wazuh-install-files.tar``, created during the initial configuration step, is placed in your working directory.

      .. code-block:: console

        # bash wazuh-install.sh --wazuh-indexer node-1 


Repeat this process on each Wazuh indexer node and proceed with initializing the cluster.             


3. Cluster initialization 
-------------------------


The final stage of the process for installing the Wazuh indexer cluster consists in running the security admin script. 

#. Run the Wazuh installation assistant with option ``--start-cluster`` on `any` Wazuh indexer node to load the new certificates information and start the cluster. 

   .. code-block:: console
 
     # bash wazuh-install.sh --start-cluster
 
   .. note:: You only have to initialize the cluster `once`, there is no need to run this command on every node. 

Next steps
----------

The Wazuh indexer is now successfully installed and you can proceed with installing the Wazuh server. To perform this action, see the :doc:`../wazuh-server/installation-assistant` section.
