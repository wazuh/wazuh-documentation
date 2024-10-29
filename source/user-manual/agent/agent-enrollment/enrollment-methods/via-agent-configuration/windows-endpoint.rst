.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Follow these steps to configure a Windows endpoint for enrollment via the agent configuration method.

Windows
=======

Follow these steps to configure a Windows endpoint for enrollment via the agent configuration method.

The Wazuh agent installation directory depends on the architecture of the endpoint:

-  ``C:\Program Files (x86)\ossec-agent`` for 64-bit systems.
-  ``C:\Program Files\ossec-agent`` for 32-bit systems.

#. Using an administrator account, modify the Wazuh agent configuration file ``ossec.conf`` in the installation directory. For this guide, we are assuming a 64-bit architecture. Hence, ``C:\Program Files (x86)\ossec-agent\ossec.conf``

   -  Include the Wazuh manager IP address or FQDN (Fully Qualified Domain Name) in the ``<client><server><address>`` section. Replace ``<WAZUH_MANAGER_IP>`` with the Wazuh manager IP address or FQDN:

      .. code-block:: xml
         :emphasize-lines: 3

         <client>
           <server>
             <address><WAZUH_MANAGER_IP></address>
             ...
           </server>
         </client>

      This will allow the Wazuh agent to connect to the Wazuh manager and automatically request a client key.

      .. note::

         If you have a multi-cluster Wazuh server installation, you can add multiple ``<client>`` sections that point to the worker nodes. Refer to :ref:`pointing agents to the cluster (Failover mode) <cluster_agent_connections>` for more information.

   -  (Optional) Add enrollment parameters in the ``<client><enrollment>`` section.

      .. code-block:: xml
         :emphasize-lines: 4,5

         <client>
             ...
             <enrollment>
                 <agent_name>EXAMPLE_NAME</agent_name>
                 <groups>GROUP1,GROUP2,GROUP3</groups>
                 ...
             </enrollment>
         </client>

      These agent enrollment parameters are optional, and they provide the Wazuh agent with specific information that should be used during enrollment. Some common enrollment parameters are below:

      -  ``<agent_name>EXAMPLE_NAME</agent_name>``: This specifies the name the endpoint should be enrolled as. When this is not specified, it defaults to the endpoint hostname.
      -  ``<groups>GROUP1,GROUP2,GROUP3</groups>``: This specifies the group(s) in which the Wazuh agent should be added. An agent group is a collection of agents that would share the same configuration. This allows the Wazuh manager to push configuration settings to a set of Wazuh agents that belong to the same group. The Wazuh agent enrollment will fail if a non-existent group is specified. Therefore, creating the desired group on the Wazuh manager is necessary before using the group parameter. Additional information on agent groups can be found :doc:`here </user-manual/agent/agent-management/grouping-agents>`.

      More optional enrollment parameters and their usage are provided :ref:`here <enrollment>`.

#. Restart the Wazuh agent to make the changes effective.

   .. tabs::

      .. group-tab:: PowerShell (as an administrator):

         .. code-block:: pwsh-session

            # Restart-Service -Name wazuh

      .. group-tab:: CMD (as an administrator):

         .. code-block:: doscon

            # net stop wazuh
            # net start wazuh

#. Click on the upper-left menu icon and navigate to **Agents management** > **Summary** on the Wazuh dashboard to check for the newly enrolled Wazuh agent and its connection status. If the enrollment was successful, you will have an interface similar to the image below.

   .. thumbnail:: /images/manual/agent/windows-check-newly-enrolled.png
      :title: Check newly enrolled Wazuh agent - Windows
      :alt: Check newly enrolled Wazuh agent - Windows
      :align: center
      :width: 80%
