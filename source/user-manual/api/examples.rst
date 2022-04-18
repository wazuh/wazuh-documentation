.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
    :description: Check out some examples of the Wazuh API, an open source RESTful API that allows interaction with the Wazuh manager.
    
.. _api_examples:

Examples
--------

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
    def get_response(url, headers, verify=False):
        """Get API result"""
        request_result = requests.get(url, headers=headers, verify=verify)

        if request_result.status_code == 200:
            return json.loads(request_result.content.decode())
        else:
            raise Exception(f"Error obtaining response: {request_result.json()}")

    # Variables
    base_url = f"{protocol}://{host}:{port}"
    login_url = f"{base_url}/security/user/authenticate"
    basic_auth = f"{user}:{password}".encode()
    headers = {'Authorization': f'Basic {b64encode(basic_auth).decode()}'}
    headers['Authorization'] = f'Bearer {get_response(login_url, headers)["data"]["token"]}'

    #Request
    response = get_response(base_url + endpoint, headers)

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
