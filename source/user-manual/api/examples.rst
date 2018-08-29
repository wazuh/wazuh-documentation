.. Copyright (C) 2018 Wazuh, Inc.

.. _api_examples:

Examples
--------

.. _api_curl_label:

CURL
^^^^

cURL is a command-line tool for sending http/https requests and commands. It is pre-installed on many Linux and Mac systems and can be used to interact with the API. Some examples:

**GET**

.. code-block:: console

    # curl -u foo:bar "http://localhost:55000"
    {
       "error": 0,
       "data": {
          "msg": "Welcome to Wazuh HIDS API",
          "api_version": "v3.6.0",
          "hostname": "wazuh",
          "timestamp": "Fri Aug 03 2018 03:00:51 GMT+0000 (UTC)"
       }
    }


**PUT**

.. code-block:: console

    # curl -u foo:bar -X PUT "http://localhost:55000/agents/new_agent"
    {
       "error": 0,
       "data": {
          "id": "009",
          "key": "MDA5IG5ld19hZ2VudCBhbnkgNWQ3NGY1ZjY3YTJiY2U5M2MzMjAyOGM2NTRjMjkyNjgwYTQxMDYzYmI3Y2FhYmI4YjI2ZTU1ZTY4OTUzNGYwMQ=="
       }
    }


**POST**

.. code-block:: console

    # curl -u foo:bar -X POST -d '{"name":"NewHost","ip":"10.0.0.8"}' -H 'Content-Type:application/json' "http://localhost:55000//agents"
    {
       "error": 0,
       "data": {
          "id": "010",
          "key": "MDEwIE5ld0hvc3QgMTAuMC4wLjggZDQzMzU4NzNjMDA3OTRjZmRmZjA2ZWU5ZjBlODI1YzA3NmQ4MDBjNmY2OTRhMjY1NTM0NzBmMjY5NDA0ZTM1Mw=="
       }
    }


**DELETE**

.. code-block:: console

    # curl -u foo:bar -X DELETE "https://localhost:55000/rootcheck/001?pretty"
    {
       "error": 0,
       "data": "Rootcheck database deleted"
    }

.. _api_python-label:

Python
^^^^^^

You can also interact with the API using Python as shown below:

Code:

.. code-block:: python

    #!/usr/bin/env python

    import json
    import requests # To install requests, use: pip install requests

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

.. code-block:: javascript

    {
        "data": {
            "dateAdd": "2018-08-02 16:48:58",
            "id": "000",
            "ip": "127.0.0.1",
            "lastKeepAlive": "9999-12-31 23:59:59",
            "manager_host": "wazuh",
            "name": "wazuh",
            "os": {
                "arch": "x86_64",
                "codename": "Bionic Beaver",
                "major": "18",
                "minor": "04",
                "name": "Ubuntu",
                "platform": "ubuntu",
                "uname": "Linux |wazuh |4.15.0-29-generic |#31-Ubuntu SMP Tue Jul 17 15:39:52 UTC 2018 |x86_64",
                "version": "18.04 LTS"
            },
            "status": "Active",
            "version": "Wazuh v3.6.0"
        },
        "error": 0
    }
    Status: 200


For a more complete example, see ``/var/ossec/api/examples/api-client.py``.

.. _api_powershell_label:

PowerShell
^^^^^^^^^^

The **Invoke-RestMethod** cmdlet was introduced in PowerShell 3.0.  It sends requests to the API and handles the response.

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


For a more complete example, see ``/var/ossec/api/examples/api-client.ps1``.
