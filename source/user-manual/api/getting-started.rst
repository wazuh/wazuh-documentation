.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This guide provides the essential information needed to utilize the Wazuh server API.

Getting started
===============

This guide provides the essential information needed to utilize the Wazuh server API.

Starting and stopping the Wazuh server API
------------------------------------------

When you install the Wazuh manager, the Wazuh server API is also installed by default as part of the process. You can manage or monitor the Wazuh server API by executing the ``systemctl`` or ``service`` commands with the Wazuh manager service:

.. tabs::

   .. group-tab:: Systemd

      .. code-block:: console

         # systemctl start/status/stop/restart wazuh-manager

   .. group-tab:: SysV init

      .. code-block:: console

         # service wazuh-manager start/status/stop/restart

Using the Wazuh server API via the Wazuh dashboard
--------------------------------------------------

You can interact with the Wazuh server API via the Wazuh dashboard. To do this, you need to log into the Wazuh dashboard with a user that has administrator privileges. For example, the default ``admin`` user has administrator privileges. To access the Wazuh server API console on the dashboard, click on the menu icon and navigate to **Tools** > **API Console**.

.. thumbnail:: /images/manual/api/access-wazuh-server-api.png
   :title: Access the Wazuh server API console on the dashboard
   :alt: Access the Wazuh server API console on the dashboard
   :align: center
   :width: 80%

In the **API Console**, input the method, request endpoint, and any query parameters, then click the play button to execute the request. See `Understanding the Wazuh server API request and response`_ to learn more about the basic concepts.

.. thumbnail:: /images/manual/api/execute-api-request.png
   :title: Execute API request
   :alt: Execute API request
   :align: center
   :width: 80%

.. _api_log_in:

Logging into the Wazuh server API via command line
--------------------------------------------------

To ensure secure access, all Wazuh server API endpoints require authentication. Users must include a JSON Web Token (JWT) in every request. JWT is an open standard (RFC 7519) that defines a compact and self-contained method for securely transmitting information between parties as a JSON object. Follow the steps below to log into the Wazuh server API using `POST /security/user/authenticate <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.login_user>`__ and obtain a token necessary for accessing the API endpoints:

#. Run the following command to send a user authentication POST request to the Wazuh server API  and store the returned JWT in the ``TOKEN`` variable. Replace ``<WAZUH_API_USER>`` and ``<WAZUH_API_PASSWORD>`` with your credentials.

   .. code-block:: console

      # TOKEN=$(curl -u <WAZUH_API_USER>:<WAZUH_API_PASSWORD> -k -X POST "https://localhost:55000/security/user/authenticate?raw=true")

   .. note::

      -  If ``SSL`` (HTTPS) is enabled in the API and it is using the default self-signed certificates, you need to add the parameter ``-k`` to avoid the server connection verification. We recommend using the ``raw=true`` query parameter when authenticating via cURL commands, as it simplifies handling by returning the token in plain text, especially useful for long JWTs.
      -  The default Wazuh server API credential is ``wazuh:wazuh``. But if the Wazuh deployment was performed using the installation script, the Wazuh API user is ``wazuh`` and you can extract the password from ``wazuh-install-files.tar`` by running the command ``tar -axf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt -O | grep -P "\'wazuh\'" -A 1``.
      -  You can :doc:`reset the password </user-manual/user-administration/password-management>` for the ``wazuh`` user if you cannot retrieve the password.

#. Verify that the token has been generated:

   .. code-block:: console

      # echo $TOKEN

   The output should be a lengthy string similar to the following:

   .. code-block:: none
      :class: output

      eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YXp1aCIsImF1ZCI6IldhenVoIEFQSSBSRVNUIiwibmJmIjoxNzA3ODk4NTEzLCJleHAiOjE3MDc4OTk0MTMsInN1YiI6IndhenVoIiwicnVuX2FzIjpmYWxzZSwicmJhY19yb2xlcyI6WzFdLCJyYmFjX21vZGUiOiJ3aGl0ZSJ9.ACcJ3WdV3SnTOC-PV2oGZGCyH3GpStSOu161UHHT7w6eUm_REOP_g8SqqIJDDW0gCcQNJTEECortIuI4zj7nybNhACRlBrDBZoG4Re4HXEpAchyFQXwq0SsZ3HHSj7eJinBF0pJDG0D8d1_LkcoxaX3FpxpsCZ4xzJ492CpnVZLT8qI4

   If the authentication fails, the output will either display an error message or remain blank. In such cases, double-check your user credentials and ensure you have network connectivity to the Wazuh server API.

#. Send an API request to confirm that everything is working as expected:

   .. code-block:: console

      # curl -k -X GET "https://localhost:55000/" -H "Authorization: Bearer $TOKEN"

   .. code-block:: none
      :class: output

      {
          "data": {
              "title": "Wazuh API REST",
              "api_version": "4.7.4",
              "revision": 40717,
              "license_name": "GPL 2.0",
              "license_url": "https://github.com/wazuh/wazuh/blob/master/LICENSE",
              "hostname": "wazuh-master",
              "timestamp": "2024-05-14T21:34:15Z"},
         "error": 0
      }

   Once logged in, you can access any API endpoint using the below structure. Replace ``<METHOD>`` with the desired method and  ``<ENDPOINT>`` with the string corresponding to the endpoint you wish to access. If you are not using an environment variable,  replace ``$TOKEN`` with the obtained JWT.

   .. code-block:: console

      # curl -k -X <METHOD> "https://localhost:55000/<ENDPOINT>" -H  "Authorization: Bearer $TOKEN"

Logging into the Wazuh server API via scripts
---------------------------------------------

The following scripts provide API login examples using default (`false`) or plain text (`true`) `raw` parameter. They intend to bring the user closer to real use cases with the Wazuh API.

#. Logging in with Python:

.. code-block:: python

    #!/usr/bin/env python3

    import json
    import requests
    import urllib3
    from base64 import b64encode

    # Disable insecure https warnings (for self-signed SSL certificates)
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    # Configuration
    protocol = 'https'
    host = 'localhost'
    port = 55000
    user = 'wazuh'
    password = 'wazuh'
    login_endpoint = 'security/user/authenticate'

    login_url = f"{protocol}://{host}:{port}/{login_endpoint}"
    basic_auth = f"{user}:{password}".encode()
    login_headers = {'Content-Type': 'application/json',
                     'Authorization': f'Basic {b64encode(basic_auth).decode()}'}

    print("\nLogin request ...\n")
    response = requests.post(login_url, headers=login_headers, verify=False)
    token = json.loads(response.content.decode())['data']['token']
    print(token)

    # New authorization header with the JWT token we got
    requests_headers = {'Content-Type': 'application/json',
                        'Authorization': f'Bearer {token}'}

    print("\n- API calls with TOKEN environment variable ...\n")

    print("Getting API information:")

    response = requests.get(f"{protocol}://{host}:{port}/?pretty=true", headers=requests_headers, verify=False)
    print(response.text)

    print("\nGetting agents status summary:")

    response = requests.get(f"{protocol}://{host}:{port}/agents/summary/status?pretty=true", headers=requests_headers, verify=False)
    print(response.text)

    print("\nEnd of the script.\n")

Running the script provides a result similar to the following:

.. code-block:: console

    # root@wazuh-master:/# python3 login_script.py

    Login request ...

    eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3YXp1aCIsImF1ZCI6IldhenVoIEFQSSBSRVNUIiwibmJmIjoxNjAyMjMxNjU2LCJleHAiOjE2MDIyMzUyNTYsInN1YiI6IndhenVoIiwicmJhY19yb2xlcyI6WzFdLCJyYmFjX21vZGUiOiJ3aGl0ZSJ9.V60_otHPaT4NTkrS6SF3GHva0Z9r5p4mqe5Cn0hk4o4

    - API calls with TOKEN environment variable ...

    Getting API information:
    {
       "data": {
          "title": "Wazuh API REST",
          "api_version": "4.0.0",
          "revision": 4000,
          "license_name": "GPL 2.0",
          "license_url": "https://github.com/wazuh/wazuh/blob/master/LICENSE",
          "hostname": "wazuh-master",
          "timestamp": "2020-08-19T09:20:02+0000"
       },
       "error": 0
    }

    Getting agents status summary:
    {
       "data": {
           "connection": {
               "active": 1,
               "disconnected": 0,
               "never_connected": 0,
               "pending": 0,
               "total": 1
           },
           "configuration": {
               "synced": 1,
               "not_synced": 0,
               "total": 1
           }
       },
       "error": 0
    }

    End of the script.


#. Logging in with a bash script and raw token:

.. code-block:: bash

    #!/bin/bash

    echo -e "\n- Getting token...\n"

    TOKEN=$(curl -u wazuh:wazuh -k -X POST "https://localhost:55000/security/user/authenticate?raw=true")

    echo -e "\n- API calls with TOKEN environment variable ...\n"

    echo -e "Getting default information:\n"

    curl -k -X GET "https://localhost:55000/?pretty=true" -H  "Authorization: Bearer $TOKEN"

    echo -e "\n\nGetting /agents/summary/os:\n"

    curl -k -X GET "https://localhost:55000/agents/summary/os?pretty=true" -H  "Authorization: Bearer $TOKEN"

    echo -e "\n\nEnd of the script.\n"

Running the script provides a result similar to the following:

.. code-block:: console

    # root@wazuh-master:/# ./login_script.sh

    - Getting token...

      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100  3059  100  3059    0     0  17089      0 --:--:-- --:--:-- --:--:-- 17089

    - API calls with TOKEN environment variable ...

    Getting default information:

    {
       "data": {
          "title": "Wazuh API REST",
          "api_version": "4.0.0",
          "revision": 4000,
          "license_name": "GPL 2.0",
          "license_url": "https://github.com/wazuh/wazuh/blob/master/LICENSE",
          "hostname": "wazuh-master",
          "timestamp": "2020-08-19T09:20:02+0000"
       },
       "error": 0
    }

    Getting /agents/summary/os:

    {
        "data": {
            "affected_items": [
                "windows"
            ],
            "total_affected_items": 1,
            "total_failed_items": 0,
            "failed_items": []
        },
        "message": "Showing the operative system of all specified agents",
        "error": 0
    }

    End of the script.

Understanding the Wazuh server API request and response
-------------------------------------------------------


Basic concepts
--------------

Here are some of the basic concepts related to making API requests and understanding their responses:

-  The *cURL command* for each request contains:

    +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | Field                                           | Description                                                                                                                                                        |
    +=================================================+====================================================================================================================================================================+
    | ``-X GET/POST/PUT/DELETE``                      | Specifies a custom request method to use when communicating with the HTTP server.                                                                                  |
    +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | ``http://localhost:55000/<ENDPOINT>``           | The API URL to use if you are running the command on the manager itself. It will be ``http`` or ``https`` depending on whether SSL is activated in the API or not. |
    | ``https://localhost:55000/<ENDPOINT>``          |                                                                                                                                                                    |
    +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | ``-H "Authorization: Bearer <YOUR_JWT_TOKEN>"`` | Include an extra header in the request to specify JWT token.                                                                                                       |
    +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | ``-k``                                          | Suppress SSL certificate errors (only if you use the default self-signed certificates).                                                                            |
    +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+

- All responses are in *JSON format*, and most of them follow this structure:

    +---------+----------------------+----------------------------------------------------------------------------------------------------------------+
    | Field   | Optional Sub-fields  | Description                                                                                                    |
    +=========+======================+================================================================================================================+
    | data    | affected_items       | List with each of the successfully affected items in the request.                                              |
    |         +----------------------+----------------------------------------------------------------------------------------------------------------+
    |         | total_affected_items | Total number of successfully affected items.                                                                   |
    |         +----------------------+----------------------------------------------------------------------------------------------------------------+
    |         | failed_items         | List containing each of the failed items in the request.                                                       |
    |         +----------------------+----------------------------------------------------------------------------------------------------------------+
    |         | total_failed_items   | Total number of failed items.                                                                                  |
    +---------+----------------------+----------------------------------------------------------------------------------------------------------------+
    | message |                      | Result description.                                                                                            |
    +---------+----------------------+----------------------------------------------------------------------------------------------------------------+
    | error   |                      | For HTTP ``200`` responses determines if the response was complete (``0``), failed (``1``) or partial (``2``). |
    |         |                      |                                                                                                                |
    |         |                      | For HTTP ``4xx`` or ``5xx`` responses determines the error code related to the failure.                        |
    +---------+----------------------+----------------------------------------------------------------------------------------------------------------+


    - Example response without errors (HTTP status code 200):

    .. code-block:: json
        :class: output

        {
          "data": {
            "affected_items": [
              "master-node",
              "worker1"
            ],
            "total_affected_items": 2,
            "failed_items": [],
            "total_failed_items": 0
          },
          "message": "Restart request sent to all specified nodes",
          "error": 0
        }

    - Example response with errors (HTTP status code 200):

    .. code-block:: json
        :class: output

        {
          "data": {
            "affected_items": [],
            "total_affected_items": 0,
            "total_failed_items": 4,
            "failed_items": [
              {
                "error": {
                  "code": 1707,
                  "message": "Cannot send request, agent is not active",
                  "remediation": "Please, check non-active agents connection and try again. Visit
                  https://documentation.wazuh.com/current/user-manual/registering/index.html and
                  https://documentation.wazuh.com/current/user-manual/agents/agent-connection.html
                  to obtain more information on registering and connecting agents"
                },
                "id": [
                  "001",
                  "002",
                  "009",
                  "010"
                ]
              },
            ]
          },
          "message": "Restart command was not sent to any agent",
          "error": 1
        }

   - Example of partial response (HTTP status code 200):

    .. code-block:: json
        :class: output

        {
          "data": {
            "affected_items": [
              {
                "ip": "10.0.0.9",
                "id": "001",
                "name": "Carlos",
                "dateAdd": "2020-10-07T08:14:32Z",
                "node_name": "unknown",
                "registerIP": "10.0.0.9",
                "status": "never_connected"
              }
            ],
            "total_affected_items": 1,
            "total_failed_items": 1,
            "failed_items": [
              {
                "error": {
                  "code": 1701,
                  "message": "Agent does not exist",
                  "remediation": "Please, use `GET /agents?select=id,name` to find all available agents"
                },
                "id": [
                  "005"
                ]
              }
            ]
          },
          "message": "Some agents information was not returned",
          "error": 2
        }

    - Example response to report an unauthorized request (HTTP status code 401):

    .. code-block:: json
        :class: output

        {
          "title": "Unauthorized",
          "detail": "The server could not verify that you are authorized to access the URL requested. You either supplied the wrong credentials (e.g. a bad password), or your browser doesn't understand how to supply the credentials required.",
        }

    - Example response to report a permission denied error (HTTP status code 403):

    .. code-block:: json
        :class: output

        {
          "title": "Permission Denied",
          "detail": "Permission denied: Resource type: *:*",
          "remediation": "Please, make sure you have permissions to execute the current request. For more information on how to set up permissions, please visit https://documentation.wazuh.com/current/user-manual/api/rbac/configuration.html",
          "error": 4000,
          "dapi_errors": {
            "unknown-node": {
              "error": "Permission denied: Resource type: *:*"
            }
          }
        }

- Responses containing collections of data will return a maximum of 500 elements by default. The *offset* and *limit* parameters may be used to iterate through large collections. The *limit* parameter accepts up to 100000 items, although it is recommended not to exceed the default value (500 items). Doing so can lead to unexpected behaviors (timeouts, large responses, etc.). Use with caution.
- All responses have an HTTP status code: 2xx (success), 4xx (client error), 5xx (server error), etc.
- All requests (except ``POST /security/user/authenticate`` and ``POST /security/user/authenticate/run_as``) accept the parameter ``pretty`` to convert the JSON response to a more human-readable format.
- The Wazuh API log is stored on the manager at ``WAZUH_PATH/logs`` directory as ``api.log`` or ``api.json`` depending on the chosen log format (the verbosity level can be changed in the Wazuh API configuration file). The Wazuh API logs are rotated daily. Rotated logs are stored in ``WAZUH_PATH/logs/api/<year>/<month>`` and compressed using ``gzip``.
- All Wazuh API requests will be aborted if no response is received after a certain amount of time. The parameter ``wait_for_complete`` can be used to disable this timeout. This is useful for calls that could take more time than expected, such as :api-ref:`PUT /agents/upgrade <operation/api.controllers.agent_controller.put_upgrade_agents>`.

.. note:: The maximum API response time can be modified in the :ref:`API configuration <api_configuration_options>`.

.. _api_examples:

Usage in scripts
----------------

.. _api_curl_label:

CURL
^^^^

cURL is a command-line tool for sending http/https requests and commands. It is pre-installed on many Linux and Mac systems and can be used to interact with the Wazuh API. Please note that before executing any endpoint, a JWT token will be needed. In the following examples, the ``raw`` option has been used in order to obtain the token and save it in an environment variable (``$TOKEN``). For information about getting the JWT token visit :ref:`Getting started <api_log_in>`.

**GET**

.. code-block:: console

    # curl -k -X GET "https://localhost:55000/" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
        "data": {
            "title": "Wazuh API",
            "api_version": "4.0.0",
            "revision": 4000,
            "license_name": "GPL 2.0",
            "license_url": "https://github.com/wazuh/wazuh/blob/master/LICENSE",
            "hostname": "wazuh-master",
            "timestamp": "2020-05-25T07:05:00+0000"
        },
        "error": 0
    }


**POST**

.. code-block:: console

    # curl -k -X POST "https://localhost:55000/security/users" -H  "Authorization: Bearer $TOKEN" -H  "Content-Type: application/json" -d "{\"username\":\"test_user\",\"password\":\"Test_user1\"}"

.. code-block:: json
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


**DELETE**

.. code-block:: console

    # curl -k -X DELETE "https://localhost:55000/groups?pretty=true&groups_list=all" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
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

.. _api_python-label:

Python
^^^^^^

It is also possible to interact with the Wazuh API using Python as shown below:

Code:

.. code-block:: python

    #!/usr/bin/env python3

    import json
    from base64 import b64encode

    import requests  # To install requests, use: pip install requests
    import urllib3

    # Configuration
    endpoint = '/agents?select=lastKeepAlive&select=id&status=disconnected'

    protocol = 'https'
    host = 'API_IP'
    port = 'API_PORT'
    user = 'wazuh'
    password = 'wazuh'

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

.. code-block:: json
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


In this example, the script will show which agents are disconnected with their ID and the time of their last connection. All it does is print the response of the GET request. But it can be modified to do other things with the response obtained. PUT, POST or DELETE requests can also be made. It is possible to call other endpoints, too.

.. _api_powershell_label:

PowerShell
^^^^^^^^^^

The **Invoke-RestMethod** cmdlet was introduced in PowerShell 3.0.  It sends requests to the Wazuh API and handles the response.

Code:

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
    }


    # Configuration
    $endpoint = "/agents?select=lastKeepAlive&select=id&status=disconnected"
    $method = "get"

    $protocol = "https"
    $host_name = "API_IP"
    $port = "API_PORT"
    $username = "wazuh"
    $password = "wazuh"

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


.. code-block:: none
    :class: output

    affected_items                                   total_affected_items total_failed_items failed_items
    --------------                                   -------------------- ------------------ ------------
    {@{lastKeepAlive=2020-05-23T12:39:50Z; id=009},  2                    0                  {}
    @{lastKeepAlive=2020-05-23T12:39:50Z; id=010}}


As in the previous case, this script can be modified as the user desires.
