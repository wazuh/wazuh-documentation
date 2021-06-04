.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on AIX

.. _wazuh_agent_package_aix:

Deploying Wazuh agents to your AIX systems
==========================================

Deploy a Wazuh agent to your AIX system. 


#. Download the `AIX installer <https://packages.wazuh.com/|CURRENT_MAJOR|/aix/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_AIX|.aix.ppc.rpm>`_. 

#. Edit the ``WAZUH_MANAGER`` variable to contain your Wazuh manager IP address or hostname and proceed to deploy the agent in your system: 

   .. code-block:: console
   
      # WAZUH_MANAGER="10.0.0.2" rpm -ivh wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_AIX|.aix.ppc.rpm

   See the following document for additional deployment options: :ref:`deployment variables <deployment_variables_aix>`.

#. Start the service:

    .. code-block:: console

      # startsrc -s wazuh-agent
    
    
Alternatively, you can install the agent ``rpm -ivh wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_AIX|.aix.ppc.rpm`` and then proceed to register and configure it to communicate with the manager. For more information about this process, see: :ref:`registering agents <register_agents>`.


Uninstall
---------

To uninstall the agent:

    .. code-block:: console

      # rpm -e wazuh-agent

There are files marked as configuration files. Due to this designation, the package manager does not remove those files from the filesystem. The complete file removal action is on user's responsibility. it can be done by removing the folder ``/var/ossec``.
