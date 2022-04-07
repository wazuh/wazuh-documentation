.. Copyright (C) 2022 Wazuh, Inc.

.. _wazuh_server_unattended:

Installing the Wazuh server in unattended mode
==============================================


The Wazuh server is in charge of analyzing the data received from the agents and triggering alerts when threats or anomalies are detected. This central component includes the Wazuh manager and Filebeat.


Wazuh server cluster installation
---------------------------------

Install the Wazuh server as a single-node or multi-node cluster according to your environment needs.  

#. Download the unattended installation script. 

   .. code-block:: console
   
       # curl -sO https://packages-dev.wazuh.com/|WAZUH_LATEST_MINOR|/wazuh-install.sh

#. Run the script with the option ``-ws`` followed by the node name to install the Wazuh server. The node name must be the same used in ``config.yml`` for the initial configuration, for example, ``wazuh-master``.
 
   .. note:: Make sure that a copy of ``wazuh-install-files.tar``, created during the Wazuh indexer installation, is placed in your working directory.

   .. code-block:: console
  
       # bash ./unattended_installation.sh -ws wazuh-master


Your Wazuh server is now successfully installed. 

- If you want a Wazuh server single-node cluster, everything is set and you can proceed directly with :ref:`wazuh_dashboard_unattended_installation`.
      
- If you want a Wazuh server multi-node cluster, repeat this process on every Wazuh server node.

Next steps
----------
  
The Wazuh server installation is now complete and you can proceed with installing the Wazuh dashboard. To perform this action, see the :ref:`wazuh_dashboard_unattended_installation` section.  
