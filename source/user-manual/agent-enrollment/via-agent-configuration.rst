.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about how to register Wazuh agents on Linux, Windows, or macOS X in this section of our documentation.
  
.. _enrollment_via_agent_automatic_request:

Enrollment via agent configuration
==================================

In this option, the agent is automatically enrolled after the Wazuh manager IP address has been configured. Please note that, when using :ref:`additional security options <enrolloment_additional_security>`, other settings might need to be configured.

The Wazuh manager IP address can be configured in one of two ways on the agent:

#. Using environment variables during the agent installation process. The guide to this process can be found :ref:`here <installation_agents>`. 

#. Manually configuring the Wazuh manager IP address in the agent configuration file.

Enrollment with additional security options involves the use of passwords for enrollment authorization or certificates for identity validation of the agent and manager. See the :ref:`additional security options <enrolloment_additional_security>` section for guidance on enrolling an agent to a manager with additional security options enabled.

Linux/Unix endpoint
-------------------

The following steps serve as a guide on how to configure a Linux/Unix endpoint agent for automatic enrollment via the agent configuration method:

#. Launch the terminal as a root user, edit the agent configuration file ``/var/ossec/etc/ossec.conf``, and make the following changes:

   #. Include the Wazuh manager IP address or DNS name in the ``<client><server><address>`` section:

        .. code-block:: xml

          <client>
            <server>
              <address>MANAGER_IP</address>
              ...
            </server>
          </client>

 
     This will allow the agent to connect to the Wazuh manager and automatically request a key.

   #. (Optional) Add enrollment parameters in the ``<client><enrollment>`` section. 

      .. code-block:: xml

        <client>
            .
            .
            .
            <enrollment>
                <agent_name>EXAMPLE_NAME</agent_name>
                <groups>GROUP1,GROUP2,GROUP3</groups>
                .
                .  
            </enrollment>
        </client>


      These agent enrollment parameters are optional and they provide the agent with specific information that can be used during enrollment. Some common enrollment parameters can be seen below:

      - ``<agent_name>EXAMPLE_NAME</agent_name>``: This specifies the name the agent should be enrolled as. When this is not specified, it defaults to the endpoint hostname.

      - ``<groups>GROUP1,GROUP2,GROUP3</groups>``: This specifies the group(s) that the agent should be added to. An agent group is a collection of agents that would share the same configuration. This allows the manager to push configuration settings to a set of agents that belong to the same group. The agent enrollment will fail if a non-existent group is specified. Therefore, it is necessary to create the desired group on the manager before using the group parameter. Additional information on agent groups can be found :ref:`here <grouping-agents>`.
      
      More optional enrollment parameters and their usage can be found :ref:`here <enrollment>`. 


#. Check the agent status to find out if it is running.
   

   .. tabs::
   
   
      .. group-tab:: Systemd
   
       .. code-block:: console
   
         # systemctl status wazuh-agent
   
   
      .. group-tab:: SysV init
   
       .. code-block:: console
   
         # service wazuh-agent status


      .. group-tab:: Other Unix based OS

        .. code-block:: console

         # /var/ossec/bin/wazuh-control status
   


#. Start or restart the agent depending on its current state (not running/running) to make the changes effective.

   - Start the agent if it is not running:

   .. tabs::
   
   
      .. group-tab:: Systemd
   
       .. code-block:: console
   
         # systemctl start wazuh-agent
   
   
      .. group-tab:: SysV init
   
       .. code-block:: console
   
         # service wazuh-agent start


      .. group-tab:: Other Unix based OS

        .. code-block:: console

         # /var/ossec/bin/wazuh-control start




   - Restart the agent if it is already running:

    .. include:: ../../_templates/common/linux/restart_agent.rst

#. Check the agent status again to confirm that it has started.

#. Select the “agents” tab to check for the newly enrolled agent, and its connection status in the Wazuh dashboard to confirm that enrollment was successful.         

Windows endpoint
----------------

The following steps serve as a guide on how to configure a Windows endpoint agent for automatic enrollment via the agent configuration method:

The Wazuh agent installation directory depends on the architecture of the host:

- C:\Program Files (x86)\ossec-agent for 64-bit systems.

- C:\Program Files\ossec-agent for 32-bit systems.


#. Using an administrator account, modify the Wazuh agent configuration file ``ossec.conf`` in the installation directory. For this guide, we are assuming a 64-bit architecture. Hence, ``C:\Program Files (x86)\ossec-agent\ossec.conf``

   - Include the Wazuh manager IP address or DNS name in the ``<client><server><address>`` section:
   
         .. code-block:: xml
   
           <client>
             <server>
               <address>MANAGER_IP</address>
               ...
             </server>
           </client>
   
    
          This will allow the agent to connect to the Wazuh manager and automatically request a key.
    
   - (Optional) Add enrollment parameters in the ``<client><enrollment>`` section. 
    
          .. code-block:: xml
    
            <client>
                .
                .
                .
                <enrollment>
                    <agent_name>EXAMPLE_NAME</agent_name>
                    <groups>GROUP1,GROUP2,GROUP3</groups>
                    .
                    .  
                </enrollment>
            </client>
    
   These agent enrollment parameters are optional and they provide the agent with specific information that should be used during enrollment. Some common enrollment parameters are below:

   - ``<agent_name>EXAMPLE_NAME</agent_name>``: This specifies the name the endpoint should be enrolled as. When this is not specified, it defaults to the endpoint hostname.
    
   - ``<groups>GROUP1,GROUP2,GROUP3</groups>``: This specifies the group(s) that the agent should be added to. An agent group is a collection of agents that would share the same configuration. This allows the manager to push configuration settings to a set of agents that belong to the same group. The agent enrollment will fail if a non-existent group is specified. Therefore, it is necessary to create the desired group on the manager before using the group parameter. Additional information on agent groups can be found :ref:`here <grouping-agents>`.

   More optional enrollment parameters and their usage are provided :ref:`here <enrollment>`.


#. Check the agent status to find out if it is running.

      .. tabs::
        
        
          .. group-tab:: PowerShell (as an administrator)
       
           .. code-block:: console
       
             # Get-Service -name wazuh
       
       
          .. group-tab:: CMD (as an administrator)
       
           .. code-block:: console
       
             # sc query WazuhSvc



#. Start or restart the agent depending on its current state (not running/running) to make the changes effective.

   - Start the agent if it is not running:

    .. tabs::
       
       
          .. group-tab:: PowerShell (as an administrator)
       
           .. code-block:: console
       
             # Start-Service -Name wazuh
       
       
          .. group-tab:: CMD (as an administrator)
       
           .. code-block:: console
       
             # net start wazuh




   - Restart the agent if it is already running:

    .. tabs::
       
       
          .. group-tab:: PowerShell (as an administrator)
       
           .. code-block:: console
       
             # Restart-Service -Name wazuh
       
       
          .. group-tab:: CMD (as an administrator)
       
           .. code-block:: console
       
             # net stop wazuh
             # net start wazuh



#. Check the agent status again to confirm that it has started.

#. Select the “agents” tab to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.


macOS endpoint
--------------

The following steps serve as a guide on how to configure a macOS endpoint agent for automatic enrollment via the agent configuration method:

#. Launch the terminal as a root user, edit the Wazuh agent configuration file ``/Library/Ossec/etc/ossec.conf``, and make the following changes:
    
   #. Include the Wazuh manager IP address or DNS name in the ``<client><server><address>`` section:
      
          .. code-block:: xml
    
            <client>
              <server>
                <address>MANAGER_IP</address>
                ...
              </server>
            </client>
      
       
       This will allow the agent to connect to the Wazuh manager and automatically request a key.
      
   #. (Optional) Add enrollment parameters in the ``<client><enrollment>`` section. 
      
           .. code-block:: xml
      
              <client>
                  .
                  .
                  .
                  <enrollment>
                      <agent_name>EXAMPLE_NAME</agent_name>
                      <groups>GROUP1,GROUP2,GROUP3</groups>
                      .
                      .  
                  </enrollment>
              </client>
      
      These agent enrollment parameters are optional and they provide the agent with specific information that should be used during enrollment. Some common enrollment parameters are below:
   
      - ``<agent_name>EXAMPLE_NAME</agent_name>``: This specifies the name the endpoint should be enrolled as. When this is not specified, it defaults to the endpoint hostname.
      
      - ``<groups>GROUP1,GROUP2,GROUP3</groups>``: This specifies the group(s) that the agent should be added to. An agent group is a collection of agents that would share the same configuration. This allows the manager to push configuration settings to a set of agents that belong to the same group. The agent enrollment will fail if a non-existent group is specified. Therefore, it is necessary to create the desired group on the manager before using the group parameter. Additional information on agent groups can be found :ref:`here <grouping-agents>`.
   
      More optional enrollment parameters and their usage are provided :ref:`here <enrollment>`.


#. Check the agent status to find out if it is running.

   .. code-block:: console
   
     # /Library/Ossec/bin/wazuh-control status

#. Start or restart the agent depending on its current state (not running/running) to make the changes effective.
  
   - Start the agent if it is not running:

   .. code-block:: console

     # /Library/Ossec/bin/wazuh-control start
  
   - Restart the agent if it is already running:

   .. code-block:: console

     # /Library/Ossec/bin/wazuh-control restart

#. Check the agent status again to confirm that it has started.

#. Select the “agents” tab to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.
