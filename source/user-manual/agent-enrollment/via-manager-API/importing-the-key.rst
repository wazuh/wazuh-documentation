.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to register Wazuh agents on Linux, Windows, or macOS X in this section of our documentation.
  
.. _importing-the-key:


Importing the key to the agent
==============================

In this document, you will find the following information:

- :ref:`linux-unix-endpoint`
- :ref:`this-windows-endpoint`
- :ref:`this-macos-endpoint`


.. _linux-unix-endpoint:


Linux/Unix endpoint
-------------------

The following steps serve as a guide on how to import the key to a Linux/Unix agent:

#. From the Wazuh agent, launch the terminal as a root user and import the key.


      .. code-block:: console

        #/var/ossec/bin/manage_agents -i <key>

   The output should look like this:

      .. code-block:: xml
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


#. Restart the agent to make the changes effective.

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


#. Select the “agents” module to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.


.. _this-windows-endpoint:


Windows endpoint
----------------

The following steps serve as a guide on how to import the key to a Windows agent:
The Wazuh agent installation directory depends on the architecture of the host:

- ``C:\Program Files (x86)\ossec-agent`` for 64-bit systems.
- ``C:\Program Files\ossec-agent`` for 32-bit systems.

#. From the Wazuh agent, launch the CMD or PowerShell as an administrator and import the key.

   .. code-block:: console

    # & "C:\Program Files (x86)\ossec-agent\manage_agents.exe" -i <key>

   The output should look like this:

   .. code-block:: xml
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


#. Restart the agent to make the changes effective.

      .. tabs::
        
        
          .. group-tab:: PowerShell (as an administrator)
       
           .. code-block:: console
       
             # Restart-Service -Name wazuh
       
       
          .. group-tab:: CMD (as an administrator)
       
           .. code-block:: console
       
             # net stop wazuh
             # net start wazuh



#. Select the “agents” module to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successfully.


.. _this-macos-endpoint:


macOS endpoint
--------------

The following steps serve as a guide on how to import the key to a macOS agent:


#. From the Wazuh agent, launch the terminal as a root user and import the key.

   .. code-block:: console

        # /Library/Ossec/bin/manage_agents -i <key>
      
   The output should look like this:

   .. code-block:: xml
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

    
#. Restart the agent to make the changes effective.

   .. code-block:: console

    # /Library/Ossec/bin/wazuh-control restart


#. Select the “agents” module to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.