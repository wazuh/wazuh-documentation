.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Follow these steps to enroll a Windows endpoint through the Wazuh agent configuration method.

Windows
=======

Follow these steps to enroll a Windows endpoint through the Wazuh agent configuration method.

The Wazuh agent installation directory depends on the endpoint architecture:

-  ``C:\Program Files (x86)\ossec-agent`` for 64-bit systems.
-  ``C:\Program Files\ossec-agent`` for 32-bit systems.

#. Use an administrator account to edit the Wazuh agent configuration file. For this guide, the examples use the 64-bit installation path: ``C:\Program Files (x86)\ossec-agent\ossec.conf``

   -  Add the Wazuh manager IP address or fully qualified domain name (FQDN) to the ``<address>`` setting in the ``<client><manager>`` section. Replace ``<WAZUH_MANAGER_IP>`` with the Wazuh manager IP address or FQDN:

      .. code-block:: xml
         :emphasize-lines: 3

         <client>
           <manager>
             <address><WAZUH_MANAGER_IP></address>
             ...
           </manager>
         </client>

      This setting allows the Wazuh agent to connect to the Wazuh manager and request a client key automatically.

      .. note::

         If you have a Wazuh manager cluster, you can add multiple ``<client>`` sections that point to the worker nodes.

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

      -  ``<agent_name>EXAMPLE_NAME</agent_name>``: Specifies the name that the Wazuh agent uses during enrollment. If you do not configure this setting, the Wazuh agent uses the endpoint hostname.
      -  ``<groups>GROUP1,GROUP2,GROUP3</groups>``: Specifies the groups that the Wazuh agent joins during enrollment. An agent group is a collection of Wazuh agents that share the same configuration. The Wazuh manager pushes configuration settings to Wazuh agents that belong to the same group. Enrollment fails if you specify a group that doesn't exist. Create the required group on the Wazuh manager before you use the ``<groups>`` setting. Additional information on agent groups can be found :doc:`here </user-manual/agent/agent-management/grouping-agents>`.

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
