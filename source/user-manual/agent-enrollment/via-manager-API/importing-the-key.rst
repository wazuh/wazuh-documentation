.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about how to register Wazuh agents on Linux, Windows, or macOS X in this section of our documentation.
  
.. _importing-the-key:


Importing the key to the agent
==============================

Linux/Unix endpoint
^^^^^^^^^^^^^^^^^^^

The following steps serve as a guide on how to import the key to a Linux/Unix agent:

#. From the Wazuh agent, launch the terminal as a root user and import the key.


      .. code-block:: console

        #/var/ossec/bin/manage_agents -i <key>

   The output should look like this:

      .. code-block:: console
            :class: output 

                Agent information:
                    ID:001
                    Name:agent_1
                    IP Address:any
                Confirm adding it?(y/n): y
                Added.


#. Add the Wazuh manager IP address to the agent configuration file in ``/var/ossec/etc/ossec.conf``. 

   .. code-block:: xml
       :emphasize-lines: 3

          <client>
            <server>
              <address>MANAGER_IP</address>
              ...
            </server>
          </client>


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


   Start the agent if it is not running:


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


   Restart the agent if it is already running:


   .. tabs::
   
   
      .. group-tab:: Systemd
   
       .. code-block:: console
   
         # systemctl restart wazuh-agent
   
   
      .. group-tab:: SysV init
   
       .. code-block:: console
   
         # service wazuh-agent restart


      .. group-tab:: Other Unix based OS

        .. code-block:: console

         # /var/ossec/bin/wazuh-control restart


#. Check the agent status again to confirm that it has started.
#. Select the “agents” tab to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.


Windows endpoint
^^^^^^^^^^^^^^^^

The following steps serve as a guide on how to import the key to a Windows agent:
The Wazuh agent installation directory depends on the architecture of the host:

- C:\Program Files (x86)\ossec-agent for 64-bit systems.
- C:\Program Files\ossec-agent for 32-bit systems.

#. From the Wazuh agent, launch the CMD or PowerShell as an administrator and import the key.

   .. code-block:: console

    & "C:\Program Files (x86)\ossec-agent\manage_agents.exe" -i <key>

   The output should look like this:

   .. code-block:: console
      :class: output

        Agent information:
            ID:001
            Name:agent_1
            IP Address:any
        Confirm adding it?(y/n): y
        Added.

#. Add the Wazuh manager IP address or DNS name to the agent configuration file in ``C:\Program Files (x86)\ossec-agent\ossec.conf``.

   .. code-block:: xml
       :emphasize-lines: 3
     
          <client>
            <server>
              <address>MANAGER_IP</address>
              ...
            </server>
          </client>

#. Check the agent status to find out if it is running.

      .. tabs::
        
        
          .. group-tab:: PowerShell (as an administrator)
       
           .. code-block:: console
       
             # Get-Service -name wazuh
       
       
          .. group-tab:: CMD (as an administrator)
       
           .. code-block:: console
       
             # sc query WazuhSvc


#. Start or restart the agent depending on its current state (not running /running) to make the changes effective.

   Start the agent if it is not running:
   
      .. tabs::
        
        
          .. group-tab:: PowerShell (as an administrator)
       
           .. code-block:: console
       
             # Start-Service -Name wazuh
       
       
          .. group-tab:: CMD (as an administrator)
       
           .. code-block:: console
       
             # net start wazuh


   Restart the agent if it is already running:

      .. tabs::
        
        
          .. group-tab:: PowerShell (as an administrator)
       
           .. code-block:: console
       
             # Restart-Service -Name wazuh
       
       
          .. group-tab:: CMD (as an administrator)
       
           .. code-block:: console
       
             # net stop wazuh
             # net start wazuh


#. Check the agent status again to confirm that it has started.
#. Select the “agents” tab to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successfully.


macOS endpoint
^^^^^^^^^^^^^^

The following steps serve as a guide on how to import the key to a macOS agent:


#. From the Wazuh agent, launch the terminal as a root user and import the key.

   .. code-block:: console

        # /Library/Ossec/bin/manage_agents -i <key>
      
   The output should look like this:

   .. code-block:: console
          :class: output

          Agent information:
              ID:001
              Name:agent_1
              IP Address:any

          Confirm adding it?(y/n): y
          Added.

#. Add the Wazuh manager IP address to the agent configuration file in ``/Library/Ossec/etc/ossec.conf``.

   .. code-block:: xml
       :emphasize-lines: 3

          <client>
            <server>
              <address>MANAGER_IP</address>
              ...
            </server>
          </client>


#. Check the agent status to find out if it is running.

   .. code-block:: console

    # /Library/Ossec/bin/wazuh-control status

    
#. Start or restart the agent depending on its current state (not running/running) to make the changes effective.


   Start the agent if it is not running:

   .. code-block:: console

    # /Library/Ossec/bin/wazuh-control start
    
   Restart the agent if it is already running:

   .. code-block:: console

    # /Library/Ossec/bin/wazuh-control restart


#. Check the agent status again to confirm that it has started.
#. Select the “agents” tab to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.