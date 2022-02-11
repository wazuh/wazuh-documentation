.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about how to register Wazuh agents on Linux, Windows, or macOS X in this section of our documentation.
  
.. _enrollment_via_manager_api:

Enrollment via manager API
==========================

The Wazuh manager API allows users to make an agent enrollment request to the Wazuh manager. This request returns a unique key for the agent, which must be manually imported to the agent.

How it works
------------

The flow of an agent being enrolled via API is as follows:

   #. The user sends an API request with the manager API credentials to generate an authorization token (a JSON Web Token).
   #. The user sends an API request with the authorization token to the Wazuh manager. This request enrolls the agent and gets the agent key.
   #. On the agent endpoint, the user imports the key to the agent.
   #. The user configures the Wazuh manager IP address on the agent.
   #. The user restarts the agent and the connection to the manager is established.


Requesting the key
------------------

When connecting to the manager API, a JSON Web Token (JWT) is needed to ensure secure and authorized communication between hosts. The JWT is generated and then used to request the agent key.

The agent key can be requested from any system that has connectivity with the manager API. It can also be done from the Wazuh web user interface or from a browser by connecting directly to the API service. The default API port is 55000/TCP. The host making the enrollment request must have connectivity to the manager via this port or any other port that the API has been configured to listen on.

From Linux/Unix and macOS
^^^^^^^^^^^^^^^^^^^^^^^^^

#. Proceed to generate a JWT for authenticating to the manager API by making a curl request. The default manager API credentials are ``wazuh:wazuh``.

   .. code-block:: console

     # TOKEN=$(curl -u <user>:<password> -k -X GET "https://<MANAGER_IP>:55000/security/user/authenticate?raw=true")

   Run the command ``echo $TOKEN`` to confirm that the token was successfully generated. You should get an output like this:

   .. code-block:: console
      :class: output
   
        eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YXp1aCIsImF1ZCI6IldhenVoIEFQSSBSRVNUIiwibmJmIjoxNjQzMDExMjQ0LCJleHAiOjE2NDMwMTIxNDQsInN1YiI6IndhenVoIiwicnVuX2FzIjpmYWxzZSwicmJhY19yb2xlcyI6WzFdLCJyYmFjX21vZGUiOiJ3aGl0ZSJ9.Ad6zOZvx0BEV7K0J6s3pIXAXTWB-zdVfxaX2fotLfZMQkiYPMkwDaQHUFiOInsWJ_7KZV3y2BbhEs9-kBqlJAMvMAD0NDBPhEQ2qBd_iutZ7QWZECd6eYfIP83xGqH9iqS7uMI6fXOKr3w4aFV13Q6qsHSUQ1A-1LgDnnDGGaqF5ITYo

#. Request the key and agent ID. Replace ``<agent_name>`` with the desired agent name.

   .. code-block:: console

     # curl -k -X POST -d '{"name":"<agent_name>"}' "https://<MANAGER_IP>:55000/agents?pretty=true" -H "Content-Type:application/json" -H "Authorization: Bearer $TOKEN" 

   The output with the key looks like this:

   .. code-block:: console
      :class: output

          {
              "error": 0,
              "data": {
                  "id": "001",
                  "key": "MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM=",
              },
          }

From Windows
^^^^^^^^^^^^

The following steps serve as a guide on how to send agent enrollment requests from a Windows system via the Wazuh manager API:

#. Open PowerShell with administrative privileges. If the manager API is running over HTTPS and it is using a self-signed certificate, the function below has to be executed in PowerShell.

   .. code-block:: console
      
     function Ignore-SelfSignedCerts {
         add-type @"
             using System.Net;
             using System.Security.Cryptography.X509Certificates;
             public class PolicyCert : ICertificatePolicy {
                 public PolicyCert() {}
                 public bool CheckValidationResult(
                     ServicePoint sPoint, X509Certificate cert,
                     WebRequest wRequest, int certProb) {
                     return true;
                 }
             }
     "@
         [System.Net.ServicePointManager]::CertificatePolicy = new-object PolicyCert
         [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12;
     }
     
     Ignore-SelfSignedCerts

   Note that the function above exists only in the PowerShell instance it is executed in.

#. To generate the JWT, the default credentials are ``wazuh:wazuh``

   First, encode the credentials as base64 and assign it to the variable ``$base64AuthInfo``.

   .. code-block:: console

    # $base64AuthInfo=[Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f “<API_username>”, “<API_password>”)))

   Then, make a request for the JWT.

   .. code-block:: console

    # Invoke-WebRequest -UseBasicParsing -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -Method GET -Uri https://<MANAGER_IP>:55000/security/user/authenticate | Select-Object -Expand Content
   
   The output looks like this: 
 
   .. code-block:: console
      :class: output

      {"data":{"token": "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YXp1aCIsImF1ZCI6IldhenVoIEFQSSBSRVNUIiwibmJmIjoxNjM5NjQ2Nzg0LCJleHAiOjE2Mzk2NDc2ODQsInN1YiI6IndhenVoIiwicnVuX2FzIjpmYWxzZSwicmJhY19yb2xlcyI6WzFdLCJyYmFjX21vZGUiOiJ3aGl0ZSJ9.ASonc7xinw6u4JUoUlkJ_52FvJz8ECPiI3ObDr-SOO0fWRfWq-uTnA432UnCDK86ypRG5fAY6paQkX3vjrXrvBFvADyCnNNCZ-eNzaUoEq5f38wCfbC1bZhRsz61s2PRRt3YD2rfzRASbSJk140Vx-XP-IDnqlgMgmIyJxb2iU1ZL8R7"}, "error": 0}

#. Create environment variables to hold the generated token and the agent variable.

    - Replace ``<token_generated>`` with the token generated in step 2.

      .. code-block:: console
 
        # $TOKEN = “<token_generated>”  

    - Replace ``<agent_name>`` with the desired agent name.

      .. code-block:: console

        # $AgentName = @{"name"="<agent_name>"} | ConvertTo-Json
   
   These environment variables will be used in subsequent requests made to the manager.

#. To request the key and agent ID, proceed to make a web request with the environment variables created. Replace ``<MANAGER_IP>`` with the Wazuh manager IP address or DNS name.

   .. code-block:: console
 
       # Invoke-WebRequest -UseBasicParsing -Headers @{Authorization=("Bearer {0}" -f $TOKEN)} -Method POST -ContentType "application/json" -Uri https://<MANAGER_IP>:55000/agents -Body $AgentName

   The output should look like this:

   .. code-block:: console 
      :class: output     

        StatusCode        : 200
        StatusDescription : OK
        Content           : {"data": {"id": "020", "key": "MDIwIGFwaS13aW5kb3dzIGFueSA3OTJmZTcwZDJiYzNhYzRiY2ZjOTc0MzAyNGZmMTc0ODA3ZGE5YjJjZjViZGQ4OGI3MjkxMTEzMmEwZGU3OGQ2"},
                            "error": 0}
        RawContent        : HTTP/1.1 200 OK
                            Strict-Transport-Security: max-age=63072000; includeSubdomains
                            X-Frame-Options: DENY
                            X-XSS-Protection: 1; mode=block
                            X-Content-Type-Options: nosniff
                            Content-Security-Policy: none...
        Forms             : {}
        Headers           : {[Strict-Transport-Security, max-age=63072000; includeSubdomains], [X-Frame-Options, DENY], [X-XSS-Protection, 1;
                            mode=block], [X-Content-Type-Options, nosniff]...}
        Images            : {}
        InputFields       : {}
        Links             : {}
        ParsedHtml        : System.__ComObject
        RawContentLength  : 158
         

Importing the key to the agent
------------------------------

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


   .. code-block:: console

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

   .. code-block:: console
     
      <client>
        <server>
          <address>MANAGER_IP</address>
          ...
        </server>
      </client>

#. Check the agent status to find out if it is running.

   - PowerShell (as an administrator)

   .. code-block:: console

      # Get-Service -name wazuh

   - CMD (as an administrator)

   .. code-block:: console
 
     # sc query WazuhSvc


#. Start or restart the agent depending on its current state (not running /running) to make the changes effective.

   Start the agent if it is not running:
   
   - PowerShell (as an administrator)

   .. code-block:: console
  
     # Start-Service -Name wazuh

   - CMD (as an administrator)

   .. code-block:: console

     # net start wazuh

   Restart the agent if it is already running:

   - PowerShell (as an administrator)

   .. code-block:: console
  
     # Restart-Service -Name wazuh

   - CMD (as an administrator)

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