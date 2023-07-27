.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to register Wazuh agents on Linux, Windows, or macOS X in this section of our documentation.
  
.. _requesting-the-key:

Requesting the key
==================

The agent key can be requested from any system that has connectivity with the manager API. It can also be done from the Wazuh web user interface or from a browser by connecting directly to the API service. The default API port is 55000/TCP. The host making the enrollment request must have connectivity to the manager via this port or any other port that the API has been configured to listen on.

In this document, you will find the following information:

- :ref:`from-linux-unix-and-macos`
- :ref:`from-windows`


.. _from-linux-unix-and-macos:


From Linux/Unix and macOS
^^^^^^^^^^^^^^^^^^^^^^^^^

#. Proceed to generate a JWT for authenticating to the manager API by making a curl request. The default manager API credentials are ``wazuh:wazuh``.

   .. code-block:: console

     # TOKEN=$(curl -u <user>:<password> -k "https://<MANAGER_IP>:55000/security/user/authenticate?raw=true")

   Run the command ``echo $TOKEN`` to confirm that the token was successfully generated. You should get an output like this:

   .. code-block:: xml
      :class: output
   
        eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YXp1aCIsImF1ZCI6IldhenVoIEFQSSBSRVNUIiwibmJmIjoxNjQzMDExMjQ0LCJleHAiOjE2NDMwMTIxNDQsInN1YiI6IndhenVoIiwicnVuX2FzIjpmYWxzZSwicmJhY19yb2xlcyI6WzFdLCJyYmFjX21vZGUiOiJ3aGl0ZSJ9.Ad6zOZvx0BEV7K0J6s3pIXAXTWB-zdVfxaX2fotLfZMQkiYPMkwDaQHUFiOInsWJ_7KZV3y2BbhEs9-kBqlJAMvMAD0NDBPhEQ2qBd_iutZ7QWZECd6eYfIP83xGqH9iqS7uMI6fXOKr3w4aFV13Q6qsHSUQ1A-1LgDnnDGGaqF5ITYo

#. Request the key and agent ID. Replace ``<agent_name>`` with the desired agent name.

   .. code-block:: console

     # curl -k -X POST -d '{"name":"<agent_name>"}' "https://<MANAGER_IP>:55000/agents?pretty=true" -H "Content-Type:application/json" -H "Authorization: Bearer $TOKEN" 

   The output with the key looks like this:

   .. code-block:: xml
      :class: output

          {
              "error": 0,
              "data": {
                  "id": "001",
                  "key": "MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM=",
              },
          }


.. _from-windows:


From Windows
^^^^^^^^^^^^

The following steps serve as a guide on how to send agent enrollment requests from a Windows system via the Wazuh manager API:

#. Open PowerShell with administrative privileges. If the manager API is running over HTTPS and it is using a self-signed certificate, the function below has to be executed in PowerShell.

   .. code-block:: xml
      
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

    # Invoke-WebRequest -UseBasicParsing -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -Method POST -Uri https://<MANAGER_IP>:55000/security/user/authenticate | Select-Object -Expand Content
   
   The output looks like this: 
 
   .. code-block:: xml
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

   .. code-block:: xml 
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
         
