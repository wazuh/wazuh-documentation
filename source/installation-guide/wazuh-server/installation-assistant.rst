.. Copyright (C) 2015, Wazuh, Inc.

.. meta:: 
   :description: Learn how to install the Wazuh server using the assisted installation method. The Wazuh server analyzes the data received from the agents triggering alerts when it detects threats and anomalies. This central component includes the Wazuh manager and Filebeat. 

Installing the Wazuh server using the assisted installation method
==================================================================

Install the Wazuh server as a single-node or multi-node cluster using the assisted installation method. The Wazuh server analyzes the data received from the agents triggering alerts when it detects threats and anomalies. This central component includes the Wazuh manager and Filebeat.

Wazuh server cluster installation
---------------------------------

#. Download the Wazuh installation assistant.

   .. code-block:: console
   
       # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-install.sh

#. Run the Wazuh installation assistant with the option ``--wazuh-server`` followed by the node name to install the Wazuh server. The node name must be the same one used in ``config.yml`` for the initial configuration, for example, ``wazuh-1``.
 
   .. note:: Make sure that a copy of the ``wazuh-install-files.tar``, created during the initial configuration step, is placed in your working directory.

   .. code-block:: console
  
       # bash wazuh-install.sh --wazuh-server wazuh-1


Your Wazuh server is now successfully installed. 

.. note:: The passwords for wazuh and wazuh-wui users have been updated. To view all the passwords you can run the following command:
   :class: not-long

   .. code-block:: console

      tar -O -xvf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt

- If you want a Wazuh server single-node cluster, everything is set and you can proceed directly with :doc:`../wazuh-dashboard/installation-assistant`.
      
- If you want a Wazuh server multi-node cluster, repeat this process on every Wazuh server node.

Next steps
----------
  
The Wazuh server installation is now complete, and you can proceed with installing the Wazuh dashboard. To perform this action, see the :doc:`../wazuh-dashboard/installation-assistant` section.  
