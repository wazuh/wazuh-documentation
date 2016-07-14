.. _ossec_api_getting_started:

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


.. _use_cases:

Use cases
---------------------------------

*ToDo*

Using the API with cURL, Python and Powershell
---------------------------------------------------

.. _curl-label:

CURL
^^^^^^^^^^^^^^^^^^

cURL is a command-line tool for transferring data using various protocols. It can be used to interact with this API. It is pre-installed on many Linux and Mac systems. Some examples:

**GET**
::

    $ curl -u foo:bar -k https://127.0.0.1:55000

``{"error":"0","data":"OSSEC-API","message":"wazuh.com"}``

**PUT**
::

    $ curl -u foo:bar -k -X PUT https://127.0.0.1:55000/agents/new_agent

``{"error":0,"data":{"id":"004","message":"Agent added"},"message":""}``



**POST**
::

    $ curl -u foo:bar -k -X POST -d '{"name":"NewHost","ip":"10.0.0.8"}' -H 'Content-Type:application/json' "https://127.0.0.1:55000/agents"

``{"error":0,"data":{"id":"004","message":"Agent added"},"message":""}``

**DELETE**
::

    $ curl -u foo:bar -k -X DELETE https://127.0.0.1:55000/rootcheck/001

``{"error":"0","data":"Policy and auditing database updated","message":""}``

.. _python-label:

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
        "message": "",
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

.. _powershell-label:

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

    error data                                                                                 message
    ----- --------                                                                           -------
    0     @{syscheckTime=Wed Feb 24 09:55:04 2016; syscheckEndTime=Wed Feb 24 10:00:42 2016}


Full example in ``wazuh-API/examples/api-client.ps1``.

Versioning
---------------------------------

We want to keep our API as backward compatible as possible. So, the client can specify what API version wants to use. The version is determined by the incoming client request, and may either be based on the request URL, or based on the request headers. If you don't specify the version, you will use the lastest version available. Right now, the API just has a version available: **v1.2**.

Below it is detailed how to use the API Versioning.


URL Versioning
^^^^^^^^^^^^^^^^^^
API version is specified into the URL: ::

    GET https://IP:55000/v1.2/agents

Header Versioning
^^^^^^^^^^^^^^^^^^
The normal URL but add the header **api-version**: ::

    GET https://IP:55000/agents
    api-version: v1.2
