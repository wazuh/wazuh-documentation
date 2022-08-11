.. Copyright (C) 2015, Wazuh, Inc.

.. meta:: 
   :description: Learn how to install the Wazuh server using the Wazuh installation assistant. The Wazuh server is in charge of analyzing the data received from the agents and triggering alerts when threats or anomalies are detected. This central component includes the Wazuh manager and Filebeat. 

Installing the Wazuh server using the assistant
===============================================

Install the Wazuh server as a single-node or multi-node cluster with the aid of the Wazuh installation assistant. The Wazuh server is in charge of analyzing the data received from the agents and triggering alerts when threats or anomalies are detected. This central component includes the Wazuh manager and Filebeat.


Wazuh server cluster installation
---------------------------------

#. Download the Wazuh installation assistant.

   .. code-block:: console
   
       # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-install.sh

#. Run the assistant with the option ``--wazuh-server`` followed by the node name to install the Wazuh server. The node name must be the same used in ``wazuh-config.yml`` for the initial configuration, for example, ``wazuh-1``.
 
   .. note:: Make sure that a copy of ``wazuh-install-files.tar``, created during the Wazuh indexer installation, is placed in your working directory.

   .. code-block:: console
  
       # bash wazuh-install.sh --wazuh-server wazuh-1


Your Wazuh server is now successfully installed. 

- If you want a Wazuh server single-node cluster, everything is set and you can proceed directly with :doc:`../wazuh-dashboard/installation-assistant`.
      
- If you want a Wazuh server multi-node cluster, repeat this process on every Wazuh server node.

Next steps
----------
  
The Wazuh server installation is now complete and you can proceed with installing the Wazuh dashboard. To perform this action, see the :doc:`../wazuh-dashboard/installation-assistant` section.  
