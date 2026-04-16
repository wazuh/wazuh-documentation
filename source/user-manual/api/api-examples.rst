.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Practical examples of Wazuh server API usage using cURL, Python, and PowerShell.

Practical examples of Wazuh server API usage
============================================

In this section, we demonstrate how to send various types of requests to the Wazuh server API using cURL, Python scripts, and PowerShell scripts. These examples serve as foundational knowledge for more advanced use cases you may envision.

cURL
----

cURL is a command-line tool for sending HTTP/HTTPS requests and commands. It comes pre-installed on many Linux and macOS endpoints, allowing users to interact with the Wazuh server API directly from the command line. Note that you must obtain a JWT before executing any endpoints. For detailed instructions on obtaining the JWT, please refer to the :doc:`getting started <getting-started>` section.

GET
^^^

The following GET request retrieves basic information about the Wazuh server API, such as its title, version, revision, license, hostname, and the current timestamp:

.. code-block:: console

   # curl -k -X GET "https://localhost:55000/?pretty=true" -H  "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
      "data": {
         "title": "Wazuh API REST",
         "api_version": "4.14.1",
         "revision": "rc2",
         "license_name": "GPL 2.0",
         "license_url": "https://github.com/wazuh/wazuh/blob/v4.14.1/LICENSE",
         "hostname": "thecotilking-VirtualBox",
         "timestamp": "2026-01-23T13:57:11Z"
      },
      "error": 0
   }

POST
^^^^

The following POST request to the Wazuh server API creates a new user on the Wazuh server by specifying the username ``test_user`` and password ``Test_user1`` in the request body.

.. code-block:: console

   # curl -k -X POST "https://localhost:55000/security/users" -H  "Authorization: Bearer $TOKEN" -H  "Content-Type: application/json" -d "{\"username\":\"test_user\",\"password\":\"Test_user1\"}"

.. code-block:: none
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "username": "test_user",
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

The following DELETE request to the Wazuh server API deletes all agent groups on the Wazuh server.

.. code-block:: console

   # curl -k -X DELETE "https://localhost:55000/groups?pretty=true&groups_list=all" -H  "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
     "data": {
       "affected_items": [
         "group1",
         "group2",
         "group3"
       ],
       "total_affected_items": 3,
       "total_failed_items": 0,
       "failed_items": [],
       "affected_agents": [
         "001",
         "002",
         "003",
         "005",
         "006",
         "007",
         "008",
         "009",
         "010"
       ]
     },
     "message": "All selected groups were deleted",
     "error": 0
   }

Python
------

You can use a Python script to retrieve information about disconnected agents, including their last keep-alive time and IDs. To do this, the script first authenticates with the Wazuh server API using basic authentication to obtain a bearer token, then makes a GET request to retrieve the required information.

#. Save the following Python script as ``get_agent_keep_alive.py``, replace the placeholders listed below:

   .. code-block:: python3
      :emphasize-lines: 11-14

      #!/usr/bin/env python3

      import json
      from base64 import b64encode
      import requests  # To install requests, use: pip install requests
      import urllib3

      # Configuration
      endpoint = '/agents?select=lastKeepAlive&select=id&status=disconnected'
      protocol = 'https'
      host = '<WAZUH_SERVER_API_IP>'
      port = '<WAZUH_SERVER_API_PORT>'
      user = '<WAZUH_API_USER>'
      password = '<WAZUH_API_PASSWORD>'

      # Disable insecure https warnings (for self-signed SSL certificates)
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

   Replace the following variables below:

   -  ``<WAZUH_SERVER_API_IP>`` with your Wazuh server IP address.
   -  ``<WAZUH_SERVER_API_PORT>`` with the Wazuh server API port number (port 55000 by default).
   -  ``<WAZUH_API_USER>`` and ``<WAZUH_API_PASSWORD>`` with the correct credentials.

#. Install the Python ``requests`` module:

   .. code-block:: console

      # python3 -m pip install requests

   .. note::

      The Python module ``urllib3`` version 2.0 and above only supports OpenSSL version 1.1.1 or later. If your system has an older version of OpenSSL, you will need to either:

      -  Upgrade OpenSSL to version 1.1.1 or higher.
      -  Downgrade ``urllib3`` to a version compatible with your current OpenSSL version.

      Please ensure your software dependencies are properly aligned to avoid compatibility issues.

#. Run the Python script to retrieve information about the disconnected agents:

   .. code-block:: console

      # python3 get_agent_keep_alive.py

   .. code-block:: none
      :class: output

      {
          "data": {
              "affected_items": [
                  {
                      "id": "009",
                      "lastKeepAlive": "2020-05-23T12:39:50Z"
                  },
                  {
                      "id": "010",
                      "lastKeepAlive": "2020-05-23T12:39:50Z"
                  }
              ],
              "failed_items": [],
              "total_affected_items": 2,
              "total_failed_items": 0
          },
          "message": "All selected agents information was returned",
          "error": 0
      }

PowerShell
----------

You can also use a PowerShell script to fetch details on disconnected agents, including their last keep-alive time and IDs. To do this, the script first authenticates with the Wazuh server API using basic authentication to obtain a bearer token, then makes a GET request to retrieve the required information.

#. Save the following PowerShell script as ``get_agent_keep_alive.ps1``, replace the placeholders listed below:

   .. code-block:: powershell
      :emphasize-lines: 21-24

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
      $endpoint = "/agents?select=lastKeepAlive&select=id&status=disconnected"
      $method = "get"
      $protocol = "https"
      $host_name = "<WAZUH_SERVER_API_IP>"
      $port = "<WAZUH_SERVER_API_PORT>"
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
      $token_response = Invoke-RestMethod -Uri $login_url -Headers $headers
      $headers["Authorization"] = "Bearer " + $token_response.data.token

      # Request
      try{
          $response = Invoke-RestMethod -Method $method -Uri $endpoint_url -Headers $headers
      }catch{
          $response = $_.Exception.Response
      }

      # WORK WITH THE RESPONSE AS YOU LIKE
      Write-Output $response.data

   Replace the following variables below:

   -  ``<WAZUH_SERVER_API_IP>`` with your Wazuh server IP address.
   -  ``<WAZUH_SERVER_API_PORT>`` with the Wazuh server API port number (port 55000 by default).
   -  ``<WAZUH_API_USER>`` and ``<WAZUH_API_PASSWORD>`` with the correct credentials.

#. Run the PowerShell script on a Windows endpoint to retrieve information about the disconnected agents:

   .. code-block:: console

      > powershell .\get_agent_keep_alive.ps1

   .. code-block:: none
      :class: output

      affected_items                                   total_affected_items total_failed_items failed_items
      --------------                                   -------------------- ------------------ ------------
      {@{lastKeepAlive=2020-05-23T12:39:50Z; id=009},  2                    0                  {}
      @{lastKeepAlive=2020-05-23T12:39:50Z; id=010}}
