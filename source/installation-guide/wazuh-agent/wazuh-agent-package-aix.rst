.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn how to deploy the Wazuh agent on AIX using deployment variables that facilitate the task of installing, registering, and configuring the agent. 

.. _wazuh_agent_package_aix:

Deploying Wazuh agents on AIX systems
=====================================

The agent runs on the host you want to monitor and communicates with the Wazuh manager, sending data in near real time through an encrypted and authenticated channel. 

The deployment of a Wazuh agent on an AIX system uses deployment variables that facilitate the task of installing, registering, and configuring the agent. 

#. To start the deployment process, download the `AIX installer <https://packages.wazuh.com/|CURRENT_MAJOR|/aix/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_AIX|.aix.ppc.rpm>`_. 

#. To deploy the Wazuh agent to your system, edit the ``WAZUH_MANAGER`` variable so that it contains the Wazuh manager IP address or hostname.

   .. code-block:: console
   
      # WAZUH_MANAGER="10.0.0.2" rpm -ivh wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_AIX|.aix.ppc.rpm

   For additional deployment options such as agent name, agent group, and registration password, see :ref:`Deployment variables for AIX <deployment_variables_aix>` section.   
   
   .. note:: Alternatively, if you want to install an agent without registering it, omit the deployment variables.  To learn more about the different registration methods, see the :ref:`Registering Wazuh agents <register_agents>` section.

#. To complete the installation process, start the Wazuh agent.

    .. code-block:: console

      # startsrc -s wazuh-agent

      
The deployment process is now complete and the Wazuh agent is successfully running on your AIX system.
      

Uninstall a Wazuh agent
-----------------------

To uninstall the agent, run the following command:

    .. code-block:: console

      # rpm -e wazuh-agent

   Some files are not removed from the filesystem by the package manager. If you want to completely remove all files, delete the ``/var/ossec`` folder. 

The Wazuh agent is now completely removed from your AIX system
