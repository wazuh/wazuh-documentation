.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: This guide provides the basic information needed to get started with the Wazuh API, including some practical use cases.

.. _api_getting-started:

Getting started
===============

This guide provides the basic information needed to start using the Wazuh API.

Starting and stopping the Wazuh API
-----------------------------------

The Wazuh API will be installed along with the Wazuh manager by default. To control or check the **wazuh-api**, use the **wazuh-manager** service with the ``systemctl`` or ``service`` command:

.. tabs::

   .. group-tab:: Systemd

      .. code-block:: console

         # systemctl start/status/stop/restart wazuh-manager

   .. group-tab:: SysV init

      .. code-block:: console

         # service wazuh-manager start/status/stop/restart


.. note::
    The -k parameter applied to API requests is used to avoid the server connection verification by using server certificates. If these are valid, this parameter can be removed.
    To configure the certificates, use the following guide :ref:`Securing API <securing_api>`.

.. _api_log_in:

Logging into the Wazuh API
--------------------------

Wazuh API endpoints require authentication in order to be used. Therefore, all calls must include a JSON Web Token. JWT is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. Follow the steps below to log in using :api-ref:`POST /security/user/authenticate <operation/api.controllers.security_controller.login_user>` and obtain a token in order to run any endpoint:

#. Use the cURL command to log in. The Wazuh API will provide a JWT token upon success. Replace <user> and <password> with yours. By default, the user is ``wazuh``, and the password is ``wazuh``. If ``SSL`` (HTTPS) is enabled in the API and it is using the default **self-signed certificates**, it will be necessary to add the parameter ``-k``. Use the ``raw`` option to get the token in a plain text format. Querying the login endpoint with ``raw=true`` is recommended when using cURL commands as tokens could be long and difficult to handle. Exporting the token to an environment variable will ease the use of API requests after login.

    Export the token to an environment variable to use it in authorization header of future API requests:

    .. code-block:: console

        # TOKEN=$(curl -u <user>:<password> -k -X POST "https://localhost:55000/security/user/authenticate?raw=true")

    By default (``raw=false``), the token is obtained in an ``application/json`` format. If using this option, copy the token found in ``<YOUR_JWT_TOKEN>`` without the quotes.

    .. code-block:: json
        :class: output

        {
            "data": {
                "token": "<YOUR_JWT_TOKEN>"
            },
            "error": 0
        }

#. Send an *API request* to confirm that everything is working as expected:

    .. code-block:: console

        # curl -k -X GET "https://localhost:55000/" -H "Authorization: Bearer $TOKEN"

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


Once logged in, it is possible to run any API endpoint following the structure below. Please, do not forget to replace <endpoint> with the string corresponding to the chosen endpoint. If the environment variable is not going to be used, replace $TOKEN with the JWT token obtained.

.. code-block:: console

    # curl -k -X <METHOD> "https://localhost:55000/<ENDPOINT>" -H  "Authorization: Bearer $TOKEN"


.. note::
  There is an advanced authentication method, which allows obtaining the permissions dynamically using a run_as based system. See :ref:`Authorization Context login method <authorization_context_method>`.


Logging into the Wazuh API via scripts
--------------------------------------

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

.. _wazuh_api_use_cases:

Use cases
---------

This section will present several use cases to give you a taste for the Wazuh API's potential. Details about all possible API requests can be found in the :ref:`reference <api_reference>` section.

Exploring the ruleset
^^^^^^^^^^^^^^^^^^^^^

Often when an alert fires, it is helpful to know details about the rule itself. The following request enumerates the attributes of rule *1002*:

.. code-block:: console

    # curl -k -X GET "https://localhost:55000/rules?rule_ids=1002&pretty=true" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
       "data": {
          "affected_items": [
             {
                "filename": "0020-syslog_rules.xml",
                "relative_dirname": "ruleset/rules",
                "id": 1002,
                "level": 2,
                "status": "enabled",
                "details": {
                   "match": {
                      "pattern": "core_dumped|failure|error|attack| bad |illegal |denied|refused|unauthorized|fatal|failed|Segmentation Fault|Corrupted"
                    }
                },
                "pci_dss": [],
                "gpg13": [
                   "4.4"
                ],
                "gdpr": [],
                "hipaa": [],
                "nist_800_53": [],
                "groups": [
                   "syslog",
                   "errors"
                ],
                "description": "Unknown problem somewhere in the system."
             }
          ],
          "total_affected_items": 1,
          "total_failed_items": 0,
          "failed_items": []
       },
       "message": "All selected rules were returned",
       "error": 0
    }


It can also be helpful to know which rules matching a specific criteria are available. For example, all the rules with a group of **web**, a PCI tag of **10.6.1**, and containing the word **failures** can be showed using the command below:

.. code-block:: console

    # curl -k -X GET "https://localhost:55000/rules?pretty=true&limit=500&search=failures&group=web&pci_dss=10.6.1" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "filename": "0260-nginx_rules.xml",
            "relative_dirname": "ruleset/rules",
            "id": 31316,
            "level": 10,
            "status": "enabled",
            "details": {
              "frequency": "8",
              "timeframe": "240",
              "if_matched_sid": "31315",
              "same_source_ip": "",
              "mitre": "\n      "
            },
            "pci_dss": [
              "10.6.1",
              "10.2.4",
              "10.2.5",
              "11.4"
            ],
            "gpg13": [
              "7.1"
            ],
            "gdpr": [
              "IV_35.7.d",
              "IV_32.2"
            ],
            "hipaa": [
              "164.312.b"
            ],
            "nist_800_53": [
              "AU.6",
              "AU.14",
              "AC.7",
              "SI.4"
            ],
            "groups": [
              "authentication_failures",
              "tsc_CC7.2",
              "tsc_CC7.3",
              "tsc_CC6.1",
              "tsc_CC6.8",
              "nginx",
              "web"
            ],
            "description": "Nginx: Multiple web authentication failures."
          }
        ],
        "total_affected_items": 1,
        "total_failed_items": 0,
        "failed_items": []
      },
      "message": "All selected rules were returned",
      "error": 0
    }



Testing rules and decoders
^^^^^^^^^^^^^^^^^^^^^^^^^^

With the Wazuh API, it is possible to start a **wazuh-logtest** session or use an already started session to test and verify custom or default rules and decoders. With the following request, a logtest session is created and the rules and decoders that match with the given log are shown. The predecoding phase is also shown, among other information.

.. code-block:: console

    # curl -k -X PUT "https://localhost:55000/logtest" -H  "Authorization: Bearer $TOKEN" -H  "Content-Type: application/json" -d "{\"event\":\"Jun 29 15:54:13 focal multipathd[557]: sdb: failed to get sysfs uid: No data available\",\"log_format\":\"syslog\",\"location\":\"user->/var/log/syslog\"}"


.. code-block:: json
    :class: output

    {
      "error": 0,
      "data": {
        "token": "bc3ca27a",
        "messages": [
          "WARNING: (7309): 'null' is not a valid token",
          "INFO: (7202): Session initialized with token 'bc3ca27a'"
        ],
        "output": {
          "timestamp": "2020-10-15T09:40:53.630+0000",
          "rule": {
            "level": 0,
            "description": "FreeIPA messages grouped",
            "id": "82202",
            "firedtimes": 1,
            "mail": false,
            "groups": [
              "freeipa"
            ]
          },
          "agent": {
            "id": "000",
            "name": "wazuh-master"
          },
          "manager": {
            "name": "wazuh-master"
          },
          "id": "1602754853.1000774",
          "cluster": {
            "name": "wazuh",
            "node": "master-node"
          },
          "full_log": "Jun 29 15:54:13 focal multipathd[557]: sdb: failed to get sysfs uid: No data available",
          "predecoder": {
            "program_name": "multipathd",
            "timestamp": "Jun 29 15:54:13",
            "hostname": "focal"
          },
          "decoder": {
            "name": "freeipa"
          },
          "location": "user->/var/log/syslog"
        },
        "alert": false,
        "codemsg": 1
      }
    }



Mining the file integrity monitoring database of an agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The API can be used to show information about all monitored files by syscheck. The following example shows all events related with *.py* files in agent *000* (the manager):

.. code-block:: console

    # curl -k -X GET "https://localhost:55000/syscheck/000?pretty=true&search=.py" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "file": "/etc/python2.7/sitecustomize.py",
            "perm": "rw-r--r--",
            "sha1": "67b0a8ccf18bf5d2eb8c7f214b5a5d0d4a5e409d",
            "changes": 1,
            "md5": "d6b276695157bde06a56ba1b2bc53670",
            "inode": 29654607,
            "size": 155,
            "uid": "0",
            "gname": "root",
            "mtime": "2020-04-15T17:20:14Z",
            "sha256": "43d81125d92376b1a69d53a71126a041cc9a18d8080e92dea0a2ae23be138b1e",
            "date": "2020-05-25T14:28:41Z",
            "uname": "root",
            "type": "file",
            "gid": "0"
          },
          {
            "file": "/etc/python3.6/sitecustomize.py",
            "perm": "rw-r--r--",
            "sha1": "67b0a8ccf18bf5d2eb8c7f214b5a5d0d4a5e409d",
            "changes": 1,
            "md5": "d6b276695157bde06a56ba1b2bc53670",
            "inode": 29762235,
            "size": 155,
            "uid": "0",
            "gname": "root",
            "mtime": "2020-04-18T01:56:04Z",
            "sha256": "43d81125d92376b1a69d53a71126a041cc9a18d8080e92dea0a2ae23be138b1e",
            "date": "2020-05-25T14:28:41Z",
            "uname": "root",
            "type": "file",
            "gid": "0"
          }
        ],
        "total_affected_items": 2,
        "total_failed_items": 0,
        "failed_items": []
      },
      "message": "FIM findings of the agent were returned",
      "error": 0
    }

You can find a file using its md5/sha1 hash. In the following examples, the same file is retrieved using both its md5 and sha1:

.. code-block:: console

    # curl -k -X GET "https://localhost:55000/syscheck/000?pretty=true&hash=bc929cb047b79d5c16514f2c553e6b759abfb1b8" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "file": "/sbin/swapon",
            "perm": "rwxr-xr-x",
            "sha1": "bc929cb047b79d5c16514f2c553e6b759abfb1b8",
            "changes": 1,
            "md5": "085c1161d814a8863562694b3819f6a5",
            "inode": 14025822,
            "size": 47184,
            "uid": "0",
            "gname": "root",
            "mtime": "2020-01-08T18:31:23Z",
            "sha256": "f274025a1e4870301c5678568ab9519152f49d3cb907c01f7c71ff17b1a6e870",
            "date": "2020-05-25T14:29:44Z",
            "uname": "root",
            "type": "file",
            "gid": "0"
          }
        ],
        "total_affected_items": 1,
        "total_failed_items": 0,
        "failed_items": []
      },
      "message": "FIM findings of the agent were returned",
      "error": 0
    }

.. code-block:: console

    # curl -k -X GET "https://localhost:55000/syscheck/000?pretty=true&hash=085c1161d814a8863562694b3819f6a5" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "file": "/sbin/swapon",
            "perm": "rwxr-xr-x",
            "sha1": "bc929cb047b79d5c16514f2c553e6b759abfb1b8",
            "changes": 1,
            "md5": "085c1161d814a8863562694b3819f6a5",
            "inode": 14025822,
            "size": 47184,
            "uid": "0",
            "gname": "root",
            "mtime": "2020-01-08T18:31:23Z",
            "sha256": "f274025a1e4870301c5678568ab9519152f49d3cb907c01f7c71ff17b1a6e870",
            "date": "2020-05-25T14:29:44Z",
            "uname": "root",
            "type": "file",
            "gid": "0"
          }
        ],
        "total_affected_items": 1,
        "total_failed_items": 0,
        "failed_items": []
      },
      "message": "FIM findings of the agent were returned",
      "error": 0
    }

Getting information about the manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Some information about the manager can be retrieved using the Wazuh API. Configuration, status, information, logs, etc. The following example retrieves the status of each Wazuh daemon:

.. code-block:: console

    # curl -k -X GET "https://localhost:55000/manager/status?pretty=true" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "wazuh-agentlessd": "running",
            "wazuh-analysisd": "running",
            "wazuh-authd": "running",
            "wazuh-csyslogd": "running",
            "wazuh-dbd": "stopped",
            "wazuh-monitord": "running",
            "wazuh-execd": "running",
            "wazuh-integratord": "running",
            "wazuh-logcollector": "running",
            "wazuh-maild": "running",
            "wazuh-remoted": "running",
            "wazuh-reportd": "stopped",
            "wazuh-syscheckd": "running",
            "wazuh-clusterd": "running",
            "wazuh-modulesd": "running",
            "wazuh-db": "running",
            "wazuh-apid": "stopped"
          }
        ],
        "total_affected_items": 1,
        "total_failed_items": 0,
        "failed_items": []
      },
      "message": "Processes status were successfully read in specified node",
      "error": 0
    }


You can even dump the manager current configuration with the request below (response shortened for brevity):

.. code-block:: console

    # curl -k -X GET "https://localhost:55000/manager/configuration?pretty=true&section=global" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "global": {
              "jsonout_output": "yes",
              "alerts_log": "yes",
              "logall": "no",
              "logall_json": "no",
              "email_notification": "yes",
              "email_to": "me@test.example",
              "smtp_server": "mail.test.example",
              "email_from": "wazuh@test.example",
              "email_maxperhour": "12",
              "email_log_source": "alerts.log",
              "white_list": [
                "127.0.0.1",
                "^localhost.localdomain$",
                "8.8.8.8",
                "8.8.4.4"
              ]
            }
          }
        ],
        "total_affected_items": 1,
        "total_failed_items": 0,
        "failed_items": []
      },
      "message": "Configuration was successfully read in specified node",
      "error": 0
    }


Playing with agents
^^^^^^^^^^^^^^^^^^^

Here are some commands for working with the agents.

This enumerates 2 **active** agents:

.. code-block:: console

    # curl -k -X GET "https://localhost:55000/agents?pretty=true&offset=1&limit=2&select=status%2Cid%2Cmanager%2Cname%2Cnode_name%2Cversion&status=active" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "node_name": "worker2",
            "status": "active",
            "manager": "wazuh-worker2",
            "version": "Wazuh v3.13.1",
            "id": "001",
            "name": "wazuh-agent1"
          },
          {
            "node_name": "worker2",
            "status": "active",
            "manager": "wazuh-worker2",
            "version": "Wazuh v3.13.1",
            "id": "002",
            "name": "wazuh-agent2"
          }
        ],
        "total_affected_items": 9,
        "total_failed_items": 0,
        "failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
    }


Adding an agent is now easier than ever. Simply send a request with the agent name and its IP address.

.. code-block:: console

    # curl -k -X POST "https://localhost:55000/agents?pretty=true" -H  "Authorization: Bearer $TOKEN" -H  "Content-Type: application/json" -d "{\"name\":\"NewHost\",\"ip\":\"10.0.10.11\"}"

.. code-block:: json
    :class: output

    {
      "data": {
        "id": "013",
        "key": "MDEzIE5ld0hvc3RfMiAxMC4wLjEwLjEyIDkzOTE0MmE4OTQ4YTNlMzA0ZTdiYzVmZTRhN2Q4Y2I1MjgwMWIxNDI4NWMzMzk3N2U5MWU5NGJiMDc4ZDEzNjc="
      },
      "error": 0
    }

Ingest security events
^^^^^^^^^^^^^^^^^^^^^^

.. versionadded:: 4.6.0

You can send security events for analysis using the Wazuh API.

There's a limit of ``30`` requests per minute and 100 events per request. This limit prevents endpoints to ingest large amounts of data too fast. Check :ref:`max_request_per_minute <api_configuration_access>` to lower this limit even further or disable the feature.

.. code-block:: console

    # curl -k -X POST "https://localhost:55000/events" -H  "Authorization: Bearer $TOKEN" -H  "Content-Type: application/json" -d '{"events": ["Event value 1", "{\"someKey\": \"Event value 2\"}"]}'

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [

        ],
        "total_affected_items": 2,
        "total_failed_items": 0,
        "failed_items": []
      },
      "message": "All events were forwarded to analisysd",
      "error": 0
    }

Conclusion
^^^^^^^^^^
The provided examples should help appreciate the potential of the Wazuh API. Remember to check out the :ref:`reference <api_reference>` document to discover all the available API requests.
