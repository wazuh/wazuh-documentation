.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Practical examples of Wazuh manager API usage with cURL, Python, and PowerShell.

Practical examples of Wazuh manager API usage
=============================================

You can send requests to the Wazuh manager API with cURL, Python scripts, and PowerShell scripts. These examples are a starting point for more advanced use cases.

cURL
----

``cURL`` is a command-line tool for sending HTTP/HTTPS requests and commands. It comes pre-installed on macOS and most Linux endpoints, so you can interact with the Wazuh manager API directly from the command line. Note that you must obtain a JWT before executing any endpoints. To obtain a JWT, see the :ref:`authentication <api_getting_started_authentication>` section.

GET
^^^^

The following GET request retrieves basic information about the Wazuh manager API, such as its title, version, revision, license, hostname, and the current timestamp:

.. code-block:: console

   # curl -k -X GET "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/" -H "Authorization: Bearer $TOKEN"

Replace:

-  ``<WAZUH_MANAGER_IP_ADDRESS>`` with your Wazuh manager IP address.

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
      "data": {
         "title": "Wazuh API REST",
         "api_version": "5.0.0",
         "revision": "rc2",
         "license_name": "GPL 2.0",
         "license_url": "https://github.com/wazuh/wazuh/blob/v5.0.0-rc2/LICENSE",
         "hostname": "ubuntu-QEMU-Virtual-Machine",
         "timestamp": "2026-09-26T12:25:02Z"
      },
      "error": 0
   }

POST
^^^^

The following POST request creates a new Wazuh manager API user with the username and password in the request body.

.. code-block:: console

   # curl -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/users?pretty=true" \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"username":"<WAZUH_TEST_USER>","password":"<WAZUH_TEST_PASSWORD>"}'

Replace:

-  ``<WAZUH_MANAGER_IP_ADDRESS>`` with your Wazuh manager IP address.
-  ``<WAZUH_TEST_USER>`` with a preferred username.
-  ``<WAZUH_TEST_PASSWORD>`` with a preferred password. The password must be 12 to 64 printable ASCII characters long, without spaces, and include at least one letter and one number.

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "id": 100,
               "username": "test_user",
               "allow_run_as": false,
               "roles": []
            }
         ],
         "total_affected_items": 1,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "User was successfully created",
      "error": 0
   }

DELETE
^^^^^^

#. Create two disposable groups:

   .. code-block:: console

      # curl -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/groups" \
        -H "Authorization: Bearer $TOKEN" \
        -H "Content-Type: application/json" \
        -d '{"group_id":"<WAZUH_GROUP_A>"}'

      curl -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/groups" \
        -H "Authorization: Bearer $TOKEN" \
        -H "Content-Type: application/json" \
        -d '{"group_id":"<WAZUH_GROUP_B>"}'

   Replace:

   -  ``<WAZUH_MANAGER_IP_ADDRESS>`` with your Wazuh manager IP address.
   -  ``<WAZUH_GROUP_A>`` and ``<WAZUH_GROUP_B>`` with your Wazuh agent group names.

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      {"message": "Group 'doctest_group_a' created.", "error": 0}
      {"message": "Group 'doctest_group_b' created.", "error": 0}

#. Delete both groups using the ``groups_list`` parameter:

   .. code-block:: console

      # curl -k -X DELETE "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/groups?pretty=true&groups_list=<WAZUH_GROUP_A>,<WAZUH_GROUP_B>" \
        -H "Authorization: Bearer $TOKEN"

Replace:

-  ``<WAZUH_MANAGER_IP_ADDRESS>`` with your Wazuh manager IP address.
-  ``<WAZUH_GROUP_A>`` and ``<WAZUH_GROUP_B>`` with your Wazuh agent group names.

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
      "data": {
         "affected_items": ["doctest_group_a", "doctest_group_b"],
         "total_affected_items": 2,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected groups were deleted",
      "error": 0
   }

Python
------

You can use a Python script to retrieve information about disconnected Wazuh agents, including their last keep-alive time and IDs. The script first authenticates with the Wazuh manager API using basic authentication to obtain a bearer token. It then makes a GET request to retrieve the required information.

#. Save the following Python script as ``get_agent_keep_alive.py`` and replace these placeholders:

   .. code-block:: python3
      :emphasize-lines: 13,14,15,16

      #!/usr/bin/env python3

      import json
      from base64 import b64encode

      import requests  # To install requests, use: pip install requests
      import urllib3

      # Configuration
      endpoint = '/agents?select=id,lastKeepAlive&status=disconnected'

      protocol = 'https'
      host = '<WAZUH_MANAGER_IP_ADDRESS>'
      port = '<WAZUH_MANAGER_API_PORT>'
      user = '<WAZUH_API_USER>'
      password = '<WAZUH_API_PASSWORD>'

      # Disable insecure HTTPS warnings (when the client does not trust the Wazuh manager CA)
      urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

      # Functions
      def get_response(request_method, url, headers, verify=False, body=None):
          """Get API result"""
          if body is None:
              body = {}

          request_result = getattr(requests, request_method.lower())(url, headers=headers, verify=verify, data=body)

          if request_result.status_code == 200:
              return json.loads(request_result.content.decode())
          else:
              raise Exception(f"Error obtaining response: {request_result.json()}")

      # Variables
      base_url = f"{protocol}://{host}:{port}"
      login_url = f"{base_url}/security/user/authenticate"
      basic_auth = f"{user}:{password}".encode()
      headers = {
                 'Authorization': f'Basic {b64encode(basic_auth).decode()}',
                 'Content-Type': 'application/json'
                 }
      headers['Authorization'] = f'Bearer {get_response("POST", login_url, headers)["data"]["token"]}'

      # Request
      response = get_response("GET", url=base_url + endpoint, headers=headers)

      # WORK WITH THE RESPONSE AS YOU LIKE
      print(json.dumps(response, indent=4, sort_keys=True))

   Replace the following variables:

   -  ``<WAZUH_MANAGER_IP_ADDRESS>`` with your Wazuh manager IP address.
   -  ``<WAZUH_MANAGER_API_PORT>`` with the Wazuh manager API port number (port 55000 by default).
   -  ``<WAZUH_API_USER>`` and ``<WAZUH_API_PASSWORD>`` with the correct credentials.

#. Install the Python ``requests`` module:

   .. code-block:: console

      # apt update && apt install python3-requests -y

#. Run the Python script to retrieve information about the disconnected Wazuh agents:

   .. code-block:: console

      # python3 get_agent_keep_alive.py

   The command output looks similar to this:

   .. code-block:: json
      :class: output

      {
          "data": {
              "affected_items": [],
              "failed_items": [],
              "total_affected_items": 0,
              "total_failed_items": 0
          },
          "error": 0,
          "message": "No agent information was returned"
      }

The preceding response shows that no Wazuh agents are disconnected.

PowerShell
----------

You can also use a PowerShell script to fetch details on disconnected Wazuh agents, including their last keep-alive time and IDs. The script first authenticates with the Wazuh manager API using basic authentication to obtain a bearer token. It then makes a GET request to retrieve the required information.

The script runs in Windows PowerShell 5.1, which the powershell command starts on Windows. To run it in PowerShell 7, add ``-SkipCertificateCheck`` to both ``Invoke-RestMethod`` calls. PowerShell 7 then prints errors from the Ignore-SelfSignedCerts function and still returns the agent data.

#. Save the following PowerShell script as ``get_agent_keep_alive.ps1`` and replace these placeholders:

   .. code-block:: powershell
      :emphasize-lines: 24,25,26,27

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
      }


      # Configuration
      $endpoint = "/agents?select=id,lastKeepAlive&status=disconnected"
      $method = "get"

      $protocol = "https"
      $host_name = "<WAZUH_MANAGER_IP_ADDRESS>"
      $port = "<WAZUH_MANAGER_API_PORT>"
      $username = "<WAZUH_API_USER>"
      $password = "<WAZUH_API_PASSWORD>"

      # Variables
      $base_url = $protocol + "://" + $host_name + ":" + $port
      $login_url = $base_url + "/security/user/authenticate"
      $endpoint_url = $base_url + $endpoint
      $base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $username, $password)))
      $headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
      $headers.Add("Content-Type", 'application/json')
      $headers.Add("Authorization", "Basic " + $base64AuthInfo)

      Ignore-SelfSignedCerts
      $token_response = Invoke-RestMethod -Method Post -Uri $login_url -Headers $headers
      $headers["Authorization"] = "Bearer " + $token_response.data.token

      # Request
      try{
          $response = Invoke-RestMethod -Method $method -Uri $endpoint_url -Headers $headers
      }catch{
          $response = $_.Exception.Response
      }

      # WORK WITH THE RESPONSE AS YOU LIKE
      Write-Output $response.data

   Replace the following variables:

   -  ``<WAZUH_MANAGER_IP_ADDRESS>`` with your Wazuh manager IP address.
   -  ``<WAZUH_MANAGER_API_PORT>`` with the Wazuh manager API port number (port 55000 by default).
   -  ``<WAZUH_API_USER>`` and ``<WAZUH_API_PASSWORD>`` with the correct credentials.

#. Run the PowerShell script on a Windows endpoint to retrieve information about the disconnected Wazuh agents:

   .. code-block:: powershell

      > powershell .\get_agent_keep_alive.ps1

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      affected_items                                   total_affected_items total_failed_items failed_items
      --------------                                   -------------------- ------------------ ------------
      {@{lastKeepAlive=2026-10-04T21:24:28+00:00; id=009},  2                    0                  {}
      @{lastKeepAlive=2026-10-05T09:45:21+00:00; id=010}}
