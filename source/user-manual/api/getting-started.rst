.. Copyright (C) 2019 Wazuh, Inc.

.. _api_getting_started:

Getting started
===============

This guide provides the basic information you need to start using the Wazuh API.

Starting and stopping the API
-----------------------------

The API starts at boot time. To control or check the **wazuh-api** service, use the ``systemctl`` or ``service`` command.

**Systemd systems**

.. code-block:: console

    # systemctl start/status/stop/restart wazuh-api

**SysVinit systems**

.. code-block:: console

    # service wazuh-api start/status/stop/restart

.. _api_log_in:

Logging into the API
--------------------

Wazuh API endpoints require authentication in order to be used. Therefore, all calls must include a JSON Web Token. JWT is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. Follow the steps below to log in and obtain a token in order to run any endpoint:

1. Use the cURL command to log in, the API will provide a JWT token upon success. Replace <user> and <password> with yours. By default, the user is ``wazuh`` and the password is ``wazuh``. If ``SSL`` (https) is enabled in the API and it is using the default **self-signed certificates**, it will be necessary to add the parameter ``-k``. Use the ``raw`` option to get the token in a plain text format. Querying the login endpoint with ``raw=true`` is highly recommended when using cURL commands as tokens could be really long and difficult to handle otherwise. Exporting the token to an environment variable will ease the use of API requests after login.

    .. code-block:: console

        # curl -u <user>:<password> -k -X GET "https://localhost:55000/security/user/authenticate?raw=true"

    You will get a result similar to the following.

    .. code-block:: none
        :class: output

        <YOUR_JWT_TOKEN>

    Export the token to an environment variable to use it in authorization header of future API requests:

    .. code-block:: console

        # TOKEN=$(curl -u <user>:<password> -k -X GET "https://localhost:55000/security/user/authenticate?raw=true")

    By default (``raw=false``), the token is obtained in an ``application/json`` format. If using this option, copy the token that you will find in ``<YOUR_JWT_TOKEN>`` without the quotes.

    .. code-block:: none
        :class: output

        {"token": "<YOUR_JWT_TOKEN>"}

2. Send a *request* to confirm that everything is working as expected:

    .. code-block:: console

        # curl -k -X GET "https://localhost:55000/" -H "Authorization: Bearer $TOKEN"

    .. code-block:: json
        :class: output

        {
            "title": "Wazuh API",
            "api_version": "4.0.0",
            "revision": 4000,
            "license_name": "GPL 2.0",
            "license_url": "https://github.com/wazuh/wazuh/blob/master/LICENSE",
            "hostname": "wazuh-master",
            "timestamp": "2020-05-25T07:05:00+0000"
        }


Once we are logged in we can run any endpoint following the structure below. Please, do not forget to replace <endpoint> with your own value. In case you are not using the environment variable, replace $TOKEN with your jwt token.

.. code-block:: console

    # curl -k -X <METHOD> "https://localhost:55000/<ENDPOINT>" -H  "Authorization: Bearer $TOKEN"


Logging into the API via scripts
--------------------------------

With these scripts, it will be easier to understand the two ways of logging into the API: using `raw=true` or `raw=false`.

1. Logging in with Python and non-raw token:

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
    login_endpoint = 'security/user/authenticate?raw=false'

    login_url = f"{protocol}://{host}:{port}/{login_endpoint}"
    basic_auth = f"{user}:{password}".encode()
    login_headers = {'Content-Type': 'application/json',
                     'Authorization': f'Basic {b64encode(basic_auth).decode()}'}

    print("\n- Getting token ...\n")
    response = requests.get(login_url, headers=login_headers, verify=False)
    token = json.loads(response.content.decode())['token']

    # new authorization with the token we got
    requests_headers = {'Content-Type': 'application/json',
                        'Authorization': f'Bearer {token}'}

    print("\n- API calls with TOKEN environment variable ...\n")

    print("Getting default information:\n")

    response = requests.get(f"{protocol}://{host}:{port}/?pretty=true", headers=requests_headers, verify=False)
    print(response.text)

    print("\nGetting /agents/summary/os:\n")

    response = requests.get(f"{protocol}://{host}:{port}/agents/summary/status?pretty=true", headers=requests_headers, verify=False)
    print(response.text)

    print("\n\nEnd of the script.\n")

With this script, you will get a result similar to the following:

.. code-block:: console

    # root@wazuh-master:/# python3 login_script.py

    - Getting token ...


    - API calls with TOKEN environment variable ...

    Getting default information:

    {
       "title": "Wazuh API REST",
       "api_version": "4.0.0",
       "revision": 4000,
       "license_name": "GPL 2.0",
       "license_url": "https://github.com/wazuh/wazuh/blob/master/LICENSE",
       "hostname": "wazuh-master",
       "timestamp": "2020-08-18T08:35:45+0000"
    }

    Getting /agents/summary/os:

    {
       "data": {
          "active": 9,
          "disconnected": 2,
          "never_connected": 2,
          "pending": 0,
          "total": 13
       }
    }


    End of the script.


2. Logging in with a bash script and raw token:

.. code-block:: bash

    #!/bin/bash

    echo -e "\n- Getting token...\n"

    TOKEN=$(curl -u wazuh:wazuh -k -X GET "https://localhost:55000/security/user/authenticate?raw=true")

    echo -e "\n- API calls with TOKEN environment variable ...\n"

    echo -e "Getting default information:\n"

    curl -k -X GET "https://localhost:55000/?pretty=true" -H  "Authorization: Bearer $TOKEN"

    echo -e "\n\nGetting /agents/summary/os:\n"

    curl -k -X GET "https://localhost:55000/agents/summary/status?pretty=true" -H  "Authorization: Bearer $TOKEN"

    echo -e "\n\nEnd of the script.\n"

With this script, you will get a result similar to the following:

.. code-block:: console

    # root@wazuh-master:/# ./login_script.sh

    - Getting token...

      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100  3059  100  3059    0     0  17089      0 --:--:-- --:--:-- --:--:-- 17089

    - API calls with TOKEN environment variable ...

    Getting default information:

    {
       "title": "Wazuh API REST",
       "api_version": "4.0.0",
       "revision": 4000,
       "license_name": "GPL 2.0",
       "license_url": "https://github.com/wazuh/wazuh/blob/master/LICENSE",
       "hostname": "wazuh-master",
       "timestamp": "2020-08-18T08:36:56+0000"
    }

    Getting /agents/summary/os:

    {
       "data": {
          "active": 9,
          "disconnected": 2,
          "never_connected": 2,
          "pending": 0,
          "total": 13
       }
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
    | ``-H  "accept: application/json"``              | Include extra header in the request to set output type to JSON (optional).                                                                                         |
    +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | ``-H "Authorization: Bearer <YOUR_JWT_TOKEN>"`` | Include extra header in the request to specify JWT token.                                                                                                          |
    +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | ``-k``                                          | Suppress SSL certificate errors (only if you use the default self-signed certificates).                                                                            |
    +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+

- All responses are in *JSON format* and most of them follow this structure:

    +---------+----------------------+-----------------------------------------------------------------------+
    | Field   | Sub-field            | Description                                                           |
    +=========+======================+=======================================================================+
    | data    | affected_items       | List with each one of the successfully affected items in the request. |
    |         +----------------------+-----------------------------------------------------------------------+
    |         | total_affected_items | Total number of successfully affected items.                          |
    |         +----------------------+-----------------------------------------------------------------------+
    |         | total_failed_items   | Total number of failed items.                                         |
    |         +----------------------+-----------------------------------------------------------------------+
    |         | failed_items         | List containing each of the failed items in the request.              |
    +---------+----------------------+-----------------------------------------------------------------------+
    | message |                      | Result description.                                                   |
    +---------+----------------------+-----------------------------------------------------------------------+


    - Example response without errors:

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
          }
          "message": "Restart command sent to all shown nodes",
        }

    - Example response with errors:

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
                  "message": "Impossible to restart non-active agent: never_connected",
                  "remediation": "Please, make sure agent is active before attempting to restart"
                },
                "id": [
                  "001",
                  "002",
                ]
              },
              {
                "error": {
                  "code": 1707,
                  "message": "Impossible to restart non-active agent: disconnected",
                  "remediation": "Please, make sure agent is active before attempting to restart"
                },
                "id": [
                  "009",
                  "010"
                ]
              }
            ]
          },
          "message": "Could not send command to any agent"
        }

    - Example response to report a result error (code 400):

    .. code-block:: json
        :class: output

        {
          "type": "about:blank",
          "title": "Wazuh Error",
          "detail": "Permission denied: Resource type: *:*",
          "status": 400,
          "remediation": "Please, make sure you have permissions to execute the current request. For more information on how to set up permissions, please visit https://documentation.wazuh.com/current/user-manual/api/rbac/configuration.html",
          "code": 4000,
          "dapi_errors": {
            "master-node": {
              "error": "Permission denied: Resource type: *:*"
            }
          }
        }

    - Example response to report an unauthorized request (code 401):

    .. code-block:: json
        :class: output

        {
          "type": "about:blank",
          "title": "Unauthorized",
          "detail": "No authorization token provided",
          "status": 401
        }

- Responses containing collections of data will return a maximum of 500 elements. The *offset* and *limit* parameters may be used to iterate through large collections.
- All responses have an HTTP status code: 2xx (success), 4xx (client error), 5xx (server error), etc.
- All requests (except ``GET /`` and ``GET /security/user/authenticate``) accept the parameter ``pretty`` to convert the JSON response to a more human-readable format.
- The API log is stored on the manager as ``/var/ossec/logs/api.log`` (the path and verbosity level can be changed in the API configuration file). The API logs are rotated daily. Rotated logs are stored in ``/var/ossec/logs/api/<year>/<month>`` and compressed using ``gzip``.
- All API requests will be aborted if no response is received after a certain amount of time. The parameter ``wait_for_complete`` can be used to disable this timeout. This is useful for calls that could take more time than expected, such as :ref:`PUT/agents/:agent_id/upgrade <api_reference>`.

.. _wazuh_api_use_cases:

Use cases
---------

This section will present several use cases to give you a taste for the API's potential. You can find details about all possible API requests in the :ref:`reference <api_reference>` section.

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
                   "match": "core_dumped|failure|error|attack| bad |illegal |denied|refused|unauthorized|fatal|failed|Segmentation Fault|Corrupted"
                },
                "pci_dss": [],
                "gpg13": [
                   "4.3"
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
       "message": "All selected rules were shown"
    }


It can also be helpful to know what rules are available that match a specific criteria. For example, all the rules with a group of **web**, a PCI tag of **10.6.1**, and containing the word **failures** can be showed using the command below:

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
      "message": "All selected rules were shown"
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
      "message": "FIM findings of the agent"
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
      "message": "FIM findings of the agent"
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
      "message": "FIM findings of the agent"
    }

Getting information about the manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Some information about the manager can be retrieved using the API. Configuration, status, information, logs, etc. The following example retrieves the status of each daemon Wazuh runs:

.. code-block:: console

    # curl -k -X GET "https://localhost:55000/manager/status?pretty=true" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "ossec-agentlessd": "running",
            "ossec-analysisd": "running",
            "ossec-authd": "running",
            "ossec-csyslogd": "running",
            "ossec-dbd": "stopped",
            "ossec-monitord": "running",
            "ossec-execd": "running",
            "ossec-integratord": "running",
            "ossec-logcollector": "running",
            "ossec-maild": "running",
            "ossec-remoted": "running",
            "ossec-reportd": "stopped",
            "ossec-syscheckd": "running",
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
      "message": "Processes status read successfully in specified node"
    }


You can even dump the manager's current configuration with the request below (response shortened for brevity):

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
              "email_to": "me@test.com",
              "smtp_server": "mail.test.com",
              "email_from": "wazuh@test.com",
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
      "message": "Configuration read successfully in specified node"
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
      "message": "All selected agents information is shown"
    }


Adding an agent is now easier than ever. Simply send a request with the agent name and its IP.

.. code-block:: console

    # curl -k -X POST "https://localhost:55000/agents?pretty=true" -H  "Authorization: Bearer $TOKEN" -H  "Content-Type: application/json" -d "{\"name\":\"NewHost\",\"ip\":\"10.0.10.11\"}"

.. code-block:: json
    :class: output

    {
      "data": {
        "id": "013",
        "key": "MDEzIE5ld0hvc3RfMiAxMC4wLjEwLjEyIDkzOTE0MmE4OTQ4YTNlMzA0ZTdiYzVmZTRhN2Q4Y2I1MjgwMWIxNDI4NWMzMzk3N2U5MWU5NGJiMDc4ZDEzNjc="
      }
    }


Conclusion
^^^^^^^^^^
We hope the provided examples have helped you to appreciate the potential of the Wazuh API. Remember to check out the :ref:`reference <api_reference>` document to discover all the available API requests.
