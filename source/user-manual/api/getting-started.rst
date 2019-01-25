.. Copyright (C) 2018 Wazuh, Inc.

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

Use the cURL command to send a *request* to confirm that everything is working as expected:

.. code-block:: console

    # curl -u foo:bar "http://localhost:55000?pretty"
    {
        "error": 0,
        "data": {
            "msg": "Welcome to Wazuh HIDS API",
            "api_version": "v3.8.0",
            "hostname": "wazuh",
            "timestamp": "Mon Dec 03 2018 00:36:13 GMT+0000 (UTC)"
        }
    }


Explanation:

 * ``curl``: A command-line tool for sending requests and commands over HTTP and HTTPS.
 * ``-u foo:bar``: The username and password to authenticate with the API.
 * ``http://localhost:55000``: The API URL to use if you are running the command on the manager itself.
 * ``?pretty``: The parameter that makes the JSON output more human-readable.

Basic concepts
--------------

Here are some of the basic concepts related to making API requests and understanding their responses:

* The *base URL* for each request is ``https://IP:55000/`` or ``http://IP:55000/``, depending on whether or not SSL is enabled and set up in the API.
* All responses are in *JSON format* with the following structure:

    +---------+-------------------------------------------------------+
    | Field   | Description                                           |
    +=========+=======================================================+
    | error   | 0 if everything was fine and an error code otherwise. |
    +---------+-------------------------------------------------------+
    | data    | The data requested. Only if error is equal to 0.      |
    +---------+-------------------------------------------------------+
    | message | The error description. Only if error is other than 0. |
    +---------+-------------------------------------------------------+

 * Example response without errors:

  .. code-block:: console

        {
            "error":0,
            "data":{
                "msg":"Welcome to Wazuh HIDS API",
                "api_version":"v3.8.0",
                "hostname":"wazuh",
                "timestamp":"Mon Dec 03 2018 00:37:50 GMT+0000 (UTC)"
            }
        }

 * Example response with errors:

  ``{ "error": "603", "message": "The requested URL was not found on this server" }``

* Responses containing collections of data will return a maximum of 500 elements. The *offset* and *limit* parameters may be used to iterate through large collections.
* All responses have an HTTP status code: 2xx (success), 4xx (client error), 5xx (server error), etc.
* All requests accept the parameter ``pretty`` to convert the JSON response to a more human-readable format.
* The API log is stored on the manager as ``/var/ossec/logs/api.log``. The API logs are rotated daily. The rotations are stored in ``/var/ossec/logs/api/<year>/<month>`` and compressed using ``gzip``.
* All API requests will be aborted if no response is received after a certain amount of time. The parameter ``wait_for_complete`` can be used to disable this timeout. This is useful for calls that could take more time than expected, such as :ref:`PUT/agents/:agent_id/upgrade <api_reference>`.

.. _wazuh_api_use_cases:

Use cases
---------

This section will present several use cases to give you a taste for the API's potential. You can find details about all possible API requests in the :ref:`reference <api_reference>` section.

Exploring the ruleset
^^^^^^^^^^^^^^^^^^^^^

Often when an alert fires, it is helpful to know details about the rule itself. The following request enumerates the attributes of rule *1002*:

.. code-block:: console

    # curl -u foo:bar "http://localhost:55000/rules/1002?pretty"
    {
       "error": 0,
       "data": {
          "totalItems": 1,
          "items": [
             {
                "status": "enabled",
                "pci": [],
                "description": "Unknown problem somewhere in the system.",
                "file": "0020-syslog_rules.xml",
                "level": 2,
                "path": "/var/ossec/ruleset/rules",
                "details": {
                   "match": "$BAD_WORDS"
                },
                "groups": [
                   "gpg13_4.3",
                   "syslog",
                   "errors"
                ],
                "id": 1002,
                "gdpr": []
             }
          ]
       }
    }


It can also be helpful to know what rules are available that match a specific criteria. For example, all the rules with a group of **web**, a PCI tag of **10.6.1**, and containing the word **failures** can be showed using the command bellow:

.. code-block:: console

    # curl -u foo:bar "http://localhost:55000/rules?group=web&pci=10.6.1&search=failures&pretty"
    {
       "error": 0,
       "data": {
          "totalItems": 1,
          "items": [
             {
                "status": "enabled",
                "pci": [
                   "10.6.1",
                   "10.2.4",
                   "10.2.5",
                   "11.4"
                ],
                "description": "Nginx: Multiple web authentication failures.",
                "file": "0260-nginx_rules.xml",
                "level": 10,
                "path": "/var/ossec/ruleset/rules",
                "details": {
                   "same_source_ip": "",
                   "frequency": "8",
                   "if_matched_sid": "31315",
                   "timeframe": "240"
                },
                "groups": [
                   "authentication_failures",
                   "gpg13_7.1",
                   "nginx",
                   "web"
                ],
                "id": 31316,
                "gdpr": [
                   "IV_35.7.d",
                   "IV_32.2"
                ]
             }
          ]
       }
    }



Mining the file integrity monitoring database of an agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The API can be used to show information about all monitored files by syscheck. The following example shows all modified *.py* files in agent *000* (the manager):

.. code-block:: console

    # curl -u foo:bar "http://localhost:55000/syscheck/000?event=modified&search=.py&pretty"
    {
        "error": 0,
        "data": {
            "totalItems": 2,
            "items": [
                {
                    "sha1": "67b0a8ccf18bf5d2eb8c7f214b5a5d0d4a5e409d",
                    "group": "root",
                    "uid": 0,
                    "scanDate": "2018-08-02 16:49:47",
                    "gid": 0,
                    "user": "root",
                    "file": "/etc/python2.7/sitecustomize.py",
                    "modificationDate": "2018-04-15 21:51:34",
                    "octalMode": "100644",
                    "permissions": "-rw-r--r--",
                    "md5": "d6b276695157bde06a56ba1b2bc53670",
                    "inode": 536845,
                    "event": "modified",
                    "size": 155
                },
                {
                    "sha1": "67b0a8ccf18bf5d2eb8c7f214b5a5d0d4a5e409d",
                    "group": "root",
                    "uid": 0,
                    "scanDate": "2018-08-02 16:49:33",
                    "gid": 0,
                    "user": "root",
                    "file": "/etc/python3.6/sitecustomize.py",
                    "modificationDate": "2018-04-01 05:46:30",
                    "octalMode": "100644",
                    "permissions": "-rw-r--r--",
                    "md5": "d6b276695157bde06a56ba1b2bc53670",
                    "inode": 394698,
                    "event": "modified",
                    "size": 155
                }
            ]
        }
    }


You can find a file using its md5/sha1 hash. In the following examples, the same file is retrieved using both its md5 and sha1:

.. code-block:: console

    # curl -u foo:bar "http://localhost:55000/syscheck/000?pretty&hash=17f51705df5b61c53ef600fc1fcbe031e4d53c20"
    {
       "error": 0,
       "data": {
          "totalItems": 1,
          "items": [
             {
                "sha1": "17f51705df5b61c53ef600fc1fcbe031e4d53c20",
                "group": "root",
                "uid": 0,
                "scanDate": "2018-08-02 16:50:12",
                "gid": 0,
                "user": "root",
                "file": "/sbin/swapon",
                "modificationDate": "2018-03-15 22:47:34",
                "octalMode": "100755",
                "permissions": "-rwxr-xr-x",
                "md5": "39b88ab3ddfaf00db53e5cf193051351",
                "inode": 584,
                "event": "modified",
                "size": 47184
             }
          ]
       }
    }

.. code-block:: console

    # curl -u foo:bar "http://localhost:55000/syscheck/000?pretty&hash=39b88ab3ddfaf00db53e5cf193051351"
    {
       "error": 0,
       "data": {
          "totalItems": 1,
          "items": [
             {
                "sha1": "17f51705df5b61c53ef600fc1fcbe031e4d53c20",
                "group": "root",
                "uid": 0,
                "scanDate": "2018-08-02 16:50:12",
                "gid": 0,
                "user": "root",
                "file": "/sbin/swapon",
                "modificationDate": "2018-03-15 22:47:34",
                "octalMode": "100755",
                "permissions": "-rwxr-xr-x",
                "md5": "39b88ab3ddfaf00db53e5cf193051351",
                "inode": 584,
                "event": "modified",
                "size": 47184
             }
          ]
       }
    }


Listing outstanding rootcheck issues
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Rootcheck requests are very similar to the syscheck requests. In order to get all rootcheck issues with the **outstanding** status, run this request:

.. code-block:: console

    # curl -u foo:bar "http://localhost:55000/rootcheck/000?status=outstanding&offset=10&limit=1&pretty"
    {
       "error": 0,
       "data": {
          "totalItems": 14,
          "items": [
             {
                "status": "outstanding",
                "oldDay": "2018-08-02 16:50:41",
                "pci": "2.2.4",
                "readDay": "2018-08-03 00:27:29",
                "event": "System Audit: SSH Hardening - 6: Empty passwords allowed {PCI_DSS: 2.2.4}. File: /etc/ssh/sshd_config. Reference: 6 ."
             }
          ]
       }
    }


Getting information about the manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Some information about the manager can be retrieved using the API. Configuration, status, information, logs, etc. The following example retrieves the status of each daemon Wazuh runs:

.. code-block:: console

    # curl -u foo:bar "http://localhost:55000/manager/status?pretty"
    {
        "error": 0,
        "data": {
          "wazuh-modulesd": "running",
          "ossec-authd": "stopped",
          "wazuh-clusterd": "running",
          "ossec-monitord": "running",
          "ossec-logcollector": "running",
          "ossec-execd": "running",
          "ossec-remoted": "running",
          "ossec-syscheckd": "running",
          "ossec-analysisd": "running",
          "ossec-maild": "stopped"
        }
    }


You can even dump the manager's current configuration with the request bellow (response shortened for brevity):

.. code-block:: console

    # curl -u foo:bar "http://localhost:55000/manager/configuration?pretty"
    {
      "error": 0,
      "data": {
        "global": {
          "email_notification": "no",
          "white_list": [
            "127.0.0.1",
            "^localhost.localdomain$",
            "10.0.0.2"
          ],
          "jsonout_output": "yes",
          "logall": "yes"
        },
        "...": {"...": "..."}
      }
    }


Playing with agents
^^^^^^^^^^^^^^^^^^^

Here are some commands for working with the agents.

This enumerates **active** agents:

.. code-block:: console

    # curl -u foo:bar "http://localhost:55000/agents?offset=1&limit=1&status=active&pretty"
    {
       "error": 0,
       "data": {
          "totalItems": 2,
          "items": [
             {
                "status": "Active",
                "configSum": "ab73af41699f13fdd81903b5f23d8d00",
                "group": "default",
                "name": "ubuntu",
                "mergedSum": "f1a9e24e02ba4cc5ea80a9d3feb3bb9a",
                "ip": "192.168.185.7",
                "node_name": "node01",
                "dateAdd": "2018-08-02 16:52:04",
                "version": "Wazuh v3.8.0",
                "key": "ac7b7eddf95d65374cb82003024096effa8d90789d447805c375427cb62c75a2",
                "manager_host": "wazuh",
                "lastKeepAlive": "2018-08-03 01:27:33",
                "os": {
                   "major": "16",
                   "name": "Ubuntu",
                   "uname": "Linux |ubuntu |4.4.0-131-generic |#157-Ubuntu SMP Thu Jul 12 15:51:36 UTC 2018 |x86_64",
                   "platform": "ubuntu",
                   "version": "16.04.5 LTS",
                   "codename": "Xenial Xerus",
                   "arch": "x86_64",
                   "minor": "04"
                },
                "id": "001"
             }
          ]
       }
    }


Adding an agent is now easier than ever. Simply send a request with the agent name and its IP.

.. code-block:: console

    # curl -u foo:bar -X POST -d '{"name":"NewHost","ip":"10.0.0.9"}' -H 'Content-Type:application/json' "http://localhost:55000/agents?pretty"
    {
        "error": 0,
        "data": {
          "id": "007",
          "key": "MDA3IE5ld0hvc3QgMTAuMC4wLjkgYzc2YmZiOTEyYzI0MmMyYzFmMjY2ZTZiMzMyMDM4OTlkMzQ5M2E3OTRkOTMyMDU1MzAzZTE3ZDBkN2I0MmM5Yw=="
        }
    }


Conclusion
^^^^^^^^^^
We hope those examples have helped you to appreciate the potential of the Wazuh API. Remember to check out the :ref:`reference <api_reference>` document to discover all the available API requests. A nice summary can also be found here: :ref:`summary <request_list>`.
