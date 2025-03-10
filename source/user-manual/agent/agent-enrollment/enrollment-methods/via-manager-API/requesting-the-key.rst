.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to request the Wazuh agent key from the API service for different operating systems in this section of the documentation.

Requesting the client key
=========================

You can request the Wazuh agent key from any endpoint connected with the Wazuh server API. Alternatively, you can obtain it directly from the Wazuh dashboard or by connecting to the API service from a browser. The default API port is 55000/TCP.

The host making the enrollment request must have connectivity to the Wazuh manager via this or any other port on which the API has been configured to listen.

The steps below show how to request the Wazuh agent key for different operating systems.

-  `Linux/Unix and macOS`_
-  `From Windows`_

Linux/Unix and macOS
^^^^^^^^^^^^^^^^^^^^

#. Generate a JWT for authenticating to the Wazuh server API by making a curl request. The default Wazuh server API credentials are ``wazuh:wazuh``. Replace ``<WAZUH_MANAGER_IP_ADDRESS>`` with the Wazuh manager IP address or FQDN (Fully Qualified Domain Name):

   .. code-block:: console

      # TOKEN=$(curl -u <USER>:<PASSWORD> -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/user/authenticate?raw=true")

   Run the command ``echo $TOKEN`` to confirm that the token was successfully generated:

   .. code-block:: console

      # echo $TOKEN

   You should get an output like this:

   .. code-block:: none
      :class: output

      eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YXp1aCIsImF1ZCI6IldhenVoIEFQSSBSRVNUIiwibmJmIjoxNjQzMDExMjQ0LCJleHAiOjE2NDMwMTIxNDQsInN1YiI6IndhenVoIiwicnVuX2FzIjpmYWxzZSwicmJhY19yb2xlcyI6WzFdLCJyYmFjX21vZGUiOiJ3aGl0ZSJ9.Ad6zOZvx0BEV7K0J6s3pIXAXTWB-zdVfxaX2fotLfZMQkiYPMkwDaQHUFiOInsWJ_7KZV3y2BbhEs9-kBqlJAMvMAD0NDBPhEQ2qBd_iutZ7QWZECd6eYfIP83xGqH9iqS7uMI6fXOKr3w4aFV13Q6qsHSUQ1A-1LgDnnDGGaqF5ITYo

   .. note::

      You can locate your Wazuh server API user password in the ``wazuh-install-files.tar`` file generated during the installation process of the Wazuh server. You can also :doc:`reset the password </user-manual/user-administration/password-management>` for the Wazuh server API user if you have forgotten it.

#. Request the client key and agent ID. Replace ``<WAZUH_AGENT_NAME>`` with the corresponding agent name:

   .. code-block:: console

      # curl -k -X POST -d '{"name":"<WAZUH_AGENT_NAME>"}' "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/agents?pretty=true" -H "Content-Type:application/json" -H "Authorization: Bearer $TOKEN"

   The output with the key looks like this:

   .. code-block:: none

      {
          "error": 0,
          "data": {
              "id": "001",
              "key": "MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM=",
          },
      }

From Windows
^^^^^^^^^^^^

Follow these steps to send Wazuh agent enrollment requests from a Windows endpoint via the Wazuh server API:

#. Open PowerShell with administrative privileges. If the Wazuh server API is using a  publicly trusted certificates, move to step 2. If the Wazuh server API is running over HTTPS and it is using a self-signed certificate, execute the function below in PowerShell. The function will ignore the certificate validation errors due to the self-signed SSL/TLS certificates. 

   .. code-block:: powershell

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

   .. note::

      The function above exists only in the PowerShell instance in which it is executed.

#. To generate the JWT, the default credentials are ``wazuh:wazuh``.

   First, encode the credentials as base64 and assign it to the ``$base64AuthInfo`` variable. Replace ``<WAZUH_SERVER_API_USERNAME>`` and ``<WAZUH_SERVER_API_PASSWORD>`` with the Wazuh server API credentials:

   .. code-block:: pwsh-session

      # $base64AuthInfo=[Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f “<WAZUH_SERVER_API_USERNAME>”, “<WAZUH_SERVER_API_PASSWORD>”)))

   Then, request the JWT. Replace ``<WAZUH_MANAGER_IP_ADDRESS>`` with the IP address or FQDN (Fully Qualified Domain Name) of the Wazuh manager:

   .. code-block:: pwsh-session

      # Invoke-WebRequest -UseBasicParsing -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -Method POST -Uri https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/user/authenticate | Select-Object -Expand Content

   .. code-block:: none
      :class: output

      {"data": {"token": "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YXp1aCIsImF1ZCI6IldhenVoIEFQSSBSRVNUIiwibmJmIjoxNzE1NzgwNzgzLCJleHAiOjE3MTU3ODE2ODMsInN1YiI6IndhenVoIiwicnVuX2FzIjpmYWxzZSwicmJhY19yb2xlcyI6WzFdLCJyYmFjX21vZGUiOiJ3aGl0ZSJ9.AIS9VKaVpXpA5RZDTTnaiuDnv474puoM3FViy54CZjctpkoZ2xO9SpLEMjdraGlCIIgLx-YSIe4jdQiKQlDZCg8QASSrrKg1K_-OpFKvsX_smIfrGE3NuzhkIvBN-_KUexAsi0Dc4peGN144gIOTMmgbv-ZqVRq4aV0P3uhYBLFoXJwl"}, "error": 0}

   .. note::

      You can locate your Wazuh server API user password in the ``wazuh-install-files.tar`` file  generated during the installation process of the Wazuh server. You can also :doc:`reset the password </user-manual/user-administration/password-management>` for the Wazuh server API user if you have forgotten it.

#. Run the following commands to create environment variables to hold the generated token and the Wazuh agent variable.

   -  Replace ``<TOKEN_GENERATED>`` with the token generated in step 2:

      .. code-block:: pwsh-session

         # $TOKEN = “<TOKEN_GENERATED>”

   -  Replace ``<WAZUH_AGENT_NAME>`` with the desired agent name:

      .. code-block:: pwsh-session

         # $AgentName = @{"name"="<WAZUH_AGENT_NAME>"} | ConvertTo-Json

   These environment variables will be used in subsequent requests made to the Wazuh manager.

#. To request the client key and agent ID, make a web request with the environment variables created. Replace ``<WAZUH_MANAGER_IP_ADDRESS>`` with the IP address or FQDN (Fully Qualified Domain Name) of the Wazuh manager.

   .. code-block:: pwsh-session

      # Invoke-WebRequest -UseBasicParsing -Headers @{Authorization=("Bearer {0}" -f $TOKEN)} -Method POST -ContentType "application/json" -Uri https://<WAZUH_MANAGER_IP_ADDRESS>:55000/agents -Body $AgentName

   The output should look like this:

   .. code-block:: none
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
