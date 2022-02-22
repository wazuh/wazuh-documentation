.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about how to register Wazuh agents on Linux, Windows, or macOS X in this section of our documentation.
  
.. _using-password-authentication:


Using password authentication
=============================

This method requires a password during the enrollment process to ensure that agents enrolled to the Wazuh manager are authenticated.

Below you can find the steps on how to configure password authentication into different endpoint agents:

- :ref:`password-authentication-prerequisites`
- :ref:`password-authentication-linux-unix-endpoint`
- :ref:`password-authentication-windows-endpoint`
- :ref:`password-authentication-macos-endpoint`


.. _password-authentication-prerequisites:


Prerequisites
-------------

Before an agent can be enrolled to the Wazuh manager using the password authentication method, the following must be done on the Wazuh manager:

#. Enable the password authentication option by adding the configuration highlighted below to the ``<auth>`` section of the manager configuration file ``/var/ossec/etc/ossec.conf``.

   .. code-block:: xml
       :emphasize-lines: 2

       <auth>
         <use_password>yes</use_password>
       </auth>
 

#. Create a password to be used for agent enrollment. This can be achieved in two ways:

   - **Recommended** - By creating the file ``/var/ossec/etc/authd.pass`` on the manager and including your own password there. We recommended this method for creating the agent enrollment password. This can be done by running the line below in the terminal and subsequently restarting the Wazuh manager.

     .. code-block:: console

        # echo "<custom_password>" > /var/ossec/etc/authd.pass

   Note that you have to replace ``<custom_password>`` with your own agent enrollment password.

   File permissions for the authd.pass file should be set to 644 and the owner should be root. The permissions and ownership can be configured by running the commands below:

         .. code-block:: console

            # chmod 644 /var/ossec/etc/authd.pass
            # chown root:wazuh /var/ossec/etc/authd.pass


   The output below shows the recommended file owner and permissions.

        .. code-block:: xml
         :class: output

           -rw-r--r-- 1 root wazuh 9 Jan 11 12:50 /var/ossec/etc/authd.pass


   After this, restart the Wazuh service for the changes to take effect.

   .. code-block:: console

       # systemctl restart wazuh-manager


   - By allowing the enrollment service to set a random password. Having added the ``<use_password>yes</use_password>`` configuration to the Wazuh manager, proceed to restart the manager.

   .. code-block:: console

       # systemctl restart wazuh-manager
      
   This will cause the enrollment service to generate a random password. This password can then be found in /var/ossec/logs/ossec.log. Run the following command to get the agent enrollment password.

   .. code-block:: console

       # grep "Random password" /var/ossec/logs/ossec.log

  
   .. code-block:: xml
    :class: output   

      2022/01/11 12:41:35 wazuh-authd: INFO: Accepting connections on port 1515. Random password chosen for agent authentication: 6258b4eb21550e4f182a08c10d94585e


.. note::
   In the case where the deployment architecture is using a multi-node cluster, ensure that password authorization is enabled on each manager node. This prevents unauthorized agent enrollment through an unsecured manager node. 

Once the above prerequisites are fulfilled, agent enrollment can be done using the steps corresponding to the OS running on endpoints with the agent installed. 


.. _password-authentication-linux-unix-endpoint:


Linux/Unix endpoint
-------------------

The following steps serve as a guide on how to enroll a Linux/Unix endpoint with password authentication:

#. Launch the terminal as a root user.
#. Create the file ``/var/ossec/etc/authd.pass`` with the enrollment password in it.

   .. code-block:: console

       # echo "<password>" > /var/ossec/etc/authd.pass


   .. note::
     #. You have to replace ``<password>`` with the agents enrollment password created on the manager.
     #. File permissions for the ``authd.pass`` file should be set to 644 and the owner should be root. The permissions and ownership can be configured by running the commands below:

         .. code-block:: console

               # chmod 644 /var/ossec/etc/authd.pass
               # chown root:wazuh /var/ossec/etc/authd.pass


    The output below shows the recommended file owner and permissions.

         .. code-block:: xml
            :class: output 

            -rw-r--r-- 1 root wazuh 18 Jan 11 13:03 /var/ossec/etc/authd.pass

#. Add the Wazuh manager IP address or DNS name in the ``<client><server><address>`` section of the manager configuration file ``/var/ossec/etc/ossec.conf``.

   .. code-block:: xml
       :emphasize-lines: 3

         <client>
            <server>
               <address>MANAGER_IP</address>
            ...
            </server>
         </client>


   This will allow the agent to send logs to the manager specified.



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


#. Select the “agents” tab to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.


.. _password-authentication-windows-endpoint:


Windows endpoint
----------------

The following steps serve as a guide on how to enroll a Windows endpoint with password authentication:

The Wazuh agent installation directory depends on the architecture of the host.

- C:\Program Files (x86)\ossec-agent for 64-bit systems.
- C:\Program Files\ossec-agent for 32-bit systems.

#. Launch PowerShell as an administrator.
#. Create a file called ``authd.pass`` and save the password to it.

   .. code-block:: console
      
        # ``echo “<custom_password>” > "C:\Program Files (x86)\ossec-agent\authd.pass"``.

   Note that you have to replace ``<password>`` with the agents enrollment password created on the manager.


#. Add the Wazuh manager IP address or DNS name in the ``<client><server><address>`` section of ``C:\Program Files (x86)\ossec-agent\ossec.conf``:

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


#. Select the “agents” tab to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.


.. _password-authentication-macos-endpoint:


macOS endpoint
--------------

The following steps serve as a guide on how to enroll a macOS endpoint with password authentication:

#. Launch the terminal as a root user.

#. Create a file called ``/Library/Ossec/etc/authd.pass`` and save the password to it.


   .. code-block:: console

     # echo "<custom_password>" > /Library/Ossec/etc/authd.pass



   .. note::
    #. You have to replace ``<password>`` with the agents enrollment password created on the manager.
    #. File permissions for the ``authd.pass`` file should be set to 644 and the owner should be root. The permissions and ownership can be configured by running the commands below:

            .. code-block:: console 

                  # chmod 644 /Library/Ossec/etc/authd.pass
                  # chown root:wazuh /Library/Ossec/etc/authd.pass


      The output below shows the recommended file owner and permissions:

            .. code-block:: xml
               :class: output 

               -rw-r--r-- 1 root wazuh 18 Jan 11 13:03 /Library/Ossec/etc/authd.pass

#. Add the Wazuh manager IP address or DNS name in the ``<client><server><address>`` section of ``/Library/Ossec/etc/ossec.conf``:

   .. code-block:: xml
       :emphasize-lines: 3      

       <client>
         <server>
            <address>MANAGER_IP</address>
            ...
         </server>
       </client>

   This will allow the agent to send logs to the specified manager.


#. Restart the agent to make the changes effective.

       .. code-block:: console

        # /Library/Ossec/bin/wazuh-control restart

#. Select the “agents” tab to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.

