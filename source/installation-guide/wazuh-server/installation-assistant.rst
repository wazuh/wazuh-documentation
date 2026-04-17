.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install the Wazuh manager using the assisted installation method. The Wazuh manager analyzes event data received from Wazuh agents and forwards the processed events to the Wazuh indexer.

Installing the Wazuh manager using the assisted installation method
===================================================================

Install the Wazuh manager as a single-node or multi-node cluster on a 64-bit (x86_64/AMD64 or AARCH64/ARM64) architecture using the assisted installation method. The Wazuh manager analyzes event data received from Wazuh agents and forwards the processed events to the Wazuh indexer.

Wazuh manager cluster installation
----------------------------------

#. Download the Wazuh installation assistant and the installation artifacts. Skip this step if you installed Wazuh indexer on the same server and the Wazuh installation assistant and artifacts files are already in your working directory:

   .. code-block:: console

       # curl -o artifact_urls.yaml https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/artifact_urls_5.0.0-beta1.yaml
       # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-5.0.0-beta1.sh

#. Run the Wazuh installation assistant with the option ``--wazuh-manager`` followed by the node name to install the Wazuh manager. The node name must be the same one used in config.yml for the initial configuration, for example, ``manager``:
 
   .. note:: Make sure that a copy of ``wazuh-install-files.tar``, created during the initial configuration step, is placed in your working directory.

   .. code-block:: console
  
       # bash wazuh-install-5.0.0-beta1.sh --wazuh-manager manager -d local


Your Wazuh manager is now successfully installed. 

- If you want a Wazuh manager single-node cluster, everything is set and you can proceed directly with :doc:`../wazuh-dashboard/installation-assistant`.
      
- If you want a Wazuh manager multi-node cluster, repeat this process on every Wazuh manager node.

Disable Wazuh updates
---------------------

.. include:: /_templates/installations/disable-wazuh-updates.rst

Next steps
----------
  
The Wazuh manager installation is now complete, and you can proceed with installing the Wazuh dashboard. To perform this action, see the :doc:`../wazuh-dashboard/installation-assistant` section.  
