.. Copyright (C) 2022 Wazuh, Inc.

.. _wazuh_indexer_unattended:

Installing the Wazuh indexer in unattended mode
===============================================

Install and configure the Wazuh indexer using the Wazuh installer. Wazuh indexer is a highly scalable full-text search engine and offers advanced security, alerting, index management, deep performance analysis, and several other features.


Wazuh indexer cluster installation
----------------------------------

Install and configure the Wazuh indexer as a single-node or multi-node cluster according to your environment needs. 

The installation process is divided into three stages. 

#. Initial configuration

#. Wazuh indexer nodes installation

#. Cluster initialization

.. note:: Root user privileges are required to run the commands described below.


1. Initial configuration
------------------------

Indicate your deployment configuration, create the SSL certificates to encrypt communications between the Wazuh components and random passwords to secure your installation. 

#. Download the unattended installation script and the configuration file. 

      .. code-block:: console

          # curl -sO https://s3.us-west-1.amazonaws.com/packages-dev.wazuh.com/wazuh_install/4.3/wazuh_install.sh
          # curl -sO https://s3.us-west-1.amazonaws.com/packages-dev.wazuh.com/wazuh_install/4.3/config.yml
       
#. Edit ``./config.yml`` and replace the node names and IP values with the corresponding names and IP addresses. You need to do this for all the Wazuh server, the Wazuh indexer, and the Wazuh dashboard nodes. Add as many node fields as needed.

      .. code-block:: yaml

         nodes:
           # Wazuh indexer nodes
           indexer:
             name: node-1
             ip: <indexer-node-ip>
             # name: node-2
             # ip: <indexer-node-ip>
             # name: node-3
             # ip: <indexer-node-ip>
         
           # Wazuh server nodes
           # Use node_type only with more than one Wazuh manager
           server:
             name: wazuh-1
             ip: <wazuh-manager-ip>
             # node_type: master
             # name: wazuh-2
             # ip: <wazuh-manager-ip>
             # node_type: worker
         
           # Wazuh dashboard node
           dashboard:
             name: dashboard
             ip: <dashboard-node-ip>

#. Run the script with the option ``-c`` to generate the SSL certificates. 

      .. code-block:: console

        # bash ./wazuh_install.sh -c


#.  Copy the ``configurations.tar`` file to all the servers of the distributed deployment, including the Wazuh server, the Wazuh indexer, and the Wazuh dashboard nodes. This can be done by using, for example, ``scp``.


2. Wazuh indexer nodes installation
------------------------------------

Install and configure the Wazuh indexer nodes. Make sure that a copy of ``configurations.tar``, created during the previous step, is placed in your working directory.


#. Download the script.

      .. code-block:: console

        # curl -sO https://s3.us-west-1.amazonaws.com/packages-dev.wazuh.com/resources/4.3/wazuh_install.sh


#. Run the script with the option ``-wi`` and the node name to install and configure the Wazuh indexer. The node name must be the same used in ``config.yml`` for the initial configuration, for example, ``node-1``.

      .. code-block:: console

        # bash ./wazuh_install.sh -wi node-1 


Repeat this process on each Wazuh indexer node and proceed with initializing the cluster.             


3. Cluster initialization 
-------------------------


The final stage of the process for installing Wazuh indexer cluster consists in running the security admin script. 

Run the unattended script with option ``-s`` to load the new certificates information and start the cluster. 

  .. code-block:: console

    # bash ./wazuh_install.sh -s


Next steps
----------

The Wazuh indexer is now successfully installed and you can proceed with installing the Wazuh server. To perform this action, see the :ref:`wazuh_server_unattended` section.
