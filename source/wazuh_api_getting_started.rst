.. _wazuh_api_getting_started:

Getting started
======================

This guide provides all the basic information you need to start using the API.

Starting and Stopping API
---------------------------------
If it is configured to run as :ref:`service <api-service-label>`, the API is started at boot time. To start, stop, or manipulate it on a running system, use systemctl: ::

 systemctl start/status/stop/restart wazuh-api

Hello world!
---------------------------------
In order to check if everything is working as expected, you can use cURL to do a *request*: ::

    $ curl -u foo:bar -k https://127.0.0.1:55000?pretty
    {
       "error": 0,
       "data": "Welcome to Wazuh HIDS API"
    }

Explanation:

 * ``curl``: Command-line tool for transferring data using various protocols as HTTP and HTTPS.
 * ``-u foo:bar``: User and password.
 * ``-k``: Allow connections to SSL sites with self signed certs.
 * ``https://127.0.0.1:55000``: API URL.
 * ``?pretty``: Param.

Basic concepts
---------------------------------

These are the basic concepts about requests and responses:

* The *base URL* for each request is: ``https://IP:55000/``
* All responses are in *JSON format* with the following structure:

    +---------+-------------------------------------------------------+
    | Field   | Description                                           |
    +=========+=======================================================+
    | error   | 0 if everything was fine and an error code otherwise. |
    +---------+-------------------------------------------------------+
    | data    | data requested. Only if error is equal to 0.          |
    +---------+-------------------------------------------------------+
    | message | error description. Only if error is different to 0.   |
    +---------+-------------------------------------------------------+

 * Example response without errors:

  * ``{ "error": "0", "data": "Welcome to Wazuh HIDS API" }``

 * Example response with errors:

  * ``{ "error": "603", "message": "The requested URL was not found on this server" }``

* Responses with collections (array of data) will return till a maximum of 500 elements. You should use the *offset* and *limit* params to iterate through the collection.
* All responses have a HTTP Status code: 2xx (success), 4xx (client error), 5xx (server error), etc.
* All requests accept the param *pretty* to convert the JSON response to a string formatted.


.. _wazuh_api_use_cases:

Use cases
---------------------------------

This section will introduce you to use cases for the API, with the goal you can see its potential. You can find information about all the used requests in the :ref:`reference <ossec_api_reference>`.

Exploring the ruleset
^^^^^^^^^^^^^^^^^^^^^^^^^

Usually when an alert is fired, we would like to know more information about the rule in question. The next request returns information about the rule *1002*:

``curl -u foo:bar -k "https://127.0.0.1:55000/rules/1002?pretty"``

::

    {
      "error": 0,
      "data": {
        "totalItems": 1,
        "items": [
          {
            "status": "enabled",
            "pci": [],
            "description": "Unknown problem somewhere in the system.",
            "file": "syslog_rules.xml",
            "level": 2,
            "groups": [
              "syslog",
              "errors"
            ],
            "id": 1002,
            "details": {
              "options": "alert_by_email",
              "match": "$BAD_WORDS"
            }
          }
        ]
      }
    }

Also, sometimes we would like to know what rules are availables with some specific conditions. For example, we can show all rules with the **group web**, **PCI DSS 10.6.1** and with the word **failure**.

``curl -u foo:bar -k "https://127.0.0.1:55000/rules?group=web&pci=10.6.1&search=failures&pretty"``

::

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
            "description": "Multiple web authentication failures.",
            "file": "nginx_rules.xml",
            "level": 10,
            "groups": [
              "authentication_failures",
              "nginx",
              "web"
            ],
            "id": 31316,
            "details": {
              "same_source_ip": null,
              "frequency": "6",
              "if_matched_sid": "31315",
              "timeframe": "240"
            }
          }
        ]
      }
    }

Searching in monitored files
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can use the API to show information about all the files monitored by syscheck. For example, let's search all files of agent *000* (Manager) with extension *.py* that have been modified. In order to be concise we limit the result to only an element (*limit=1*).

``curl -u foo:bar -k "https://127.0.0.1:55000/syscheck/000/files?offset=0&limit=1&event=modified&search=.py&pretty"``

::

    {
      "error": 0,
      "data": {
        "totalItems": 1,
        "items": [
          {
            "uid": 0,
            "scanDate": "2016-07-14 10:58:45",
            "user": "root",
            "file": "/home/example.py",
            "modificationDate": "2016-07-14 10:58:18",
            "octalMode": "100777",
            "inode": 270323,
            "event": "modified",
            "size": 8,
            "sha1": "a38c98822f783fd45c256fe8fc928300c169d138",
            "group": "root",
            "gid": 0,
            "permissions": "-rwxrwxrwx",
            "md5": "b7f912e271b6c3e86ba2787f227d984c"
          }
        ]
      }
    }

In case you need to find a file using its md5/sha1 hash, you can do it with a simple request:


``curl -u foo:bar -k "https://127.0.0.1:55000/syscheck/000/files?hash=9d0ac660826f4245f3444b0247755c7229f1f9fe&pretty"``

::

    {
      "error": 0,
      "data": {
        "totalItems": 1,
        "items": [
          {
            "uid": 0,
            "scanDate": "2016-07-14 08:49:27",
            "user": "root",
            "file": "/etc/default/cron",
            "modificationDate": "2014-10-25 22:04:09",
            "octalMode": "100644",
            "inode": 262805,
            "event": "added",
            "size": 955,
            "sha1": "9d0ac660826f4245f3444b0247755c7229f1f9fe",
            "group": "root",
            "gid": 0,
            "permissions": "-rw-r--r--",
            "md5": "eae0d979b5007d2af41540d8c2631359"
          }
        ]
      }
    }

Getting outstanding rootcheck controls
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Rootcheck requests are very similar to the syscheck ones. In order to get all rootcheck control with *outstanding* status you can run this request:

``curl -u foo:bar -k "https://127.0.0.1:55000/rootcheck/000?status=outstanding&offset=0&limit=1&pretty"``

::

    {
      "error": 0,
      "data": {
        "totalItems": 3,
        "items": [
          {
            "status": "outstanding",
            "oldDay": "2016-07-14 08:49:28",
            "readDay": "2016-07-14 08:49:28",
            "event": "System Audit: SSH Hardening - 1: Port 22 {PCI_DSS: 2.2.4}. File: /etc/ssh/sshd_config"
          }
        ]
      }
    }

Starting Manager and getting configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is possible to do a lot of actions with the Manager, for example, you can stop/start/restart it or get its state just with a request:

``curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/manager/restart?pretty"``

::

    {
      "error": 0,
      "data": [
        {
          "status": "running",
          "daemon": "wazuh-moduled"
        },
        {
          "status": "running",
          "daemon": "ossec-maild"
        },
        {
          "status": "running",
          "daemon": "ossec-execd"
        },
        {
          "status": "running",
          "daemon": "ossec-analysisd"
        },
        {
          "status": "running",
          "daemon": "ossec-logcollector"
        },
        {
          "status": "running",
          "daemon": "ossec-remoted"
        },
        {
          "status": "running",
          "daemon": "ossec-syscheckd"
        },
        {
          "status": "running",
          "daemon": "ossec-monitord"
        }
      ]
    }


In case you do not have access to the Manager and you need to know the current configuration, you can retrieve it with the below request:

``curl -u foo:bar -k "https://127.0.0.1:55000/manager/configuration?pretty"``

::

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
^^^^^^^^^^^^^^^^^^^^^^

Of course, we can work with agents. Let's take a look to the **active** agents:


``curl -u foo:bar -k "https://127.0.0.1:55000/agents?offset=0&limit=1&status=active&pretty"``

::

    {
      "error": 0,
      "data": {
        "totalItems": 1,
        "items": [
          {
            "status": "Active",
            "ip": "127.0.0.1",
            "id": "000",
            "name": "LinMV"
          }
        ]
      }
    }

Add an agent is now easy than ever. Just send a request with the agent name and its IP.

``curl -u foo:bar -k -X POST -d '{"name":"NewHost","ip":"10.0.0.8"}' -H 'Content-Type:application/json' "https://127.0.0.1:55000/agents?pretty"``

::

    {
      "error": 0,
      "data": "019"
    }

Do you need the agent key?. Just get it with:

``curl -u foo:bar -k "https://127.0.0.1:55000/agents/019/key?pretty"``

::

    {
      "error": 0,
      "data": "MDE5IGFkZmFmZGFkZmFkZmFkZmEgMTg1LjE2LjIxMS44OCBjN2Y2YzFhMjc4NWI1NjBhOWZiZGJiNjY2ODMwMzdlODNkMjQwNDc5NmUxMDI2Yzk1ZTBmMmY2MDQ5ZDU1Mjlj"
    }


Conclusion
^^^^^^^^^^^^^^^^^^
We hope you have seen the API potential with these real-life examples. Do not forget to visit the :ref:`reference <ossec_api_reference>` to discover all the available requests. Here you find a :ref:`summary <request_list>`.


Using the API with cURL, Python and Powershell
---------------------------------------------------

.. _api_curl_label:

CURL
^^^^^^^^^^^^^^^^^^

cURL is a command-line tool for transferring data using various protocols. It can be used to interact with this API. It is pre-installed on many Linux and Mac systems. Some examples:

**GET**
::

    $ curl -u foo:bar -k https://127.0.0.1:55000

``{"error":"0","data": "Welcome to Wazuh HIDS API"}``

**PUT**
::

    $ curl -u foo:bar -k -X PUT https://127.0.0.1:55000/agents/new_agent

``{"error":0,"data":"004"}``



**POST**
::

    $ curl -u foo:bar -k -X POST -d '{"name":"NewHost","ip":"10.0.0.8"}' -H 'Content-Type:application/json' "https://127.0.0.1:55000//agents"

``{"error":0,"data":"004"}``

**DELETE**
::

    $ curl -u foo:bar -k -X DELETE https://127.0.0.1:55000/rootcheck/001

``{"error":"0","data":"Policy and auditing database updated"}``

.. _api_python-label:

Python
^^^^^^^^^^^^^^^^^^

It is very easy interact with the API using Python:

Code:
::

    #!/usr/bin/env python

    import json
    import requests # Install request: pip install requests

    # Configuration
    base_url = 'https://IP:55000'
    auth = requests.auth.HTTPBasicAuth('foo', 'bar')
    verify = False
    requests.packages.urllib3.disable_warnings()

    # Request
    url = '{0}{1}'.format(base_url, "/agents/000")
    r = requests.get(url, auth=auth, params=None, verify=verify)
    print(json.dumps(r.json(), indent=4, sort_keys=True))
    print("Status: {0}".format(r.status_code))

Output:
::

    {
        "error": "0",
        "data": {
            "id": "000",
            "ip": "127.0.0.1",
            "lastKeepAlive": "Not available",
            "name": "LinMV",
            "os": "Linux LinMV 3.16.0-4-amd64 #1 SMP Debian 3.16.7-ckt11-1 (2015-05-24) x86_64",
            "rootcheckEndTime": "Unknown",
            "rootcheckTime": "Unknown",
            "status": "Active",
            "syscheckEndTime": "Unknown",
            "syscheckTime": "Unknown",
            "version": "OSSEC HIDS v2.8"
        }
    }
    Status: 200

Full example in ``wazuh-API/examples/api-client.py``.

.. _api_powershell_label:

Powershell
^^^^^^^^^^^^^^^^^^

The **Invoke-RestMethod** cmdlet sends requests to the API and handle the response easily. This cmdlet is introduced in Windows PowerShell 3.0.

Code:
::

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
    $base_url = "https://IP:55000"
    $username = "foo"
    $password = "bar"
    $base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $username, $password)))
    Ignore-SelfSignedCerts

    # Request
    $url = $base_url + "/syscheck/000/last_scan"
    $method = "get"
    try{
        $r = Invoke-RestMethod -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -Method $method -Uri $url
    }catch{
        $r = $_.Exception
    }

    Write-Output $r

Output:

::

    error data
    ----- --------
    0     @{syscheckTime=Wed Feb 24 09:55:04 2016; syscheckEndTime=Wed Feb 24 10:00:42 2016}


Full example in ``wazuh-API/examples/api-client.ps1``.
