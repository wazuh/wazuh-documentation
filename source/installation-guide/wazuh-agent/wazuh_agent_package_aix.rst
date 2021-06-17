.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on AIX

.. _wazuh_agent_package_aix:

Deploying Wazuh agents on your AIX systems
==========================================

The agent runs on the host you want to monitor and communicates with the Wazuh manager, sending data in near real time through an encrypted and authenticated channel. The deployment of a Wazuh agent on an AIX system uses deployment variables that facilitate the task of deploying, logging, and configuring the agent.

#. Download the `AIX installer <https://packages.wazuh.com/|CURRENT_MAJOR|/aix/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_AIX|.aix.ppc.rpm>`_. 

#. Edit the ``WAZUH_MANAGER`` variable to contain your Wazuh manager IP address or hostname and proceed to deploy the agent in your system: 

   .. code-block:: console
   
      # WAZUH_MANAGER="10.0.0.2" rpm -ivh wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_AIX|.aix.ppc.rpm

   For additional deployment options, like agent name, agent group, and registration password, see :ref:`deployment variables <deployment_variables_aix>` section.   

#. Start the service:

    .. code-block:: console

      # startsrc -s wazuh-agent

      
Now you have an active Wazuh agent connected to the Wazuh manager. 
      

Uninstall
---------

To uninstall the agent:

    .. code-block:: console

      # rpm -e wazuh-agent

To remove the configuration files that are not eliminated by the package manager, remove the folder ``/var/ossec``. 
