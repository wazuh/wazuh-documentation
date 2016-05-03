.. _ossec_api_reference:

Reference
======================
This API reference is organized by resources:

* `Agents`_
* `Manager`_
* `Rootcheck`_
* `Syscheck`_

Also, it is provided an `Request List`_ with all available requests.

Before starting to use the API, you must keep in mind:

* The *base URL* for each request is: *https://IP:55000/*
* All responses are in *JSON format* with the following structure:

  * error: 0 if everything was fine and an error code otherwise.
  * data: data requested or empty if error is different to 0.
  * message: error description or empty if error is equal to 0
  
  * Examples:

    * Response without errors: ``{ "error": "0", "data": "...", "message": "" }``
    * Response with errors: ``{ "error": "NOT 0", "data": "", "message": "..." }``

* All responses have a HTTP Status code: 2xx (success), 4xx (client error), 5xx (server error), etc.

Find some :ref:`ossec_api_examples` of how to use this API with :ref:`curl-label`, :ref:`powershell-label` and :ref:`python-label`.

Request List
---------------------------------

* `Agents`_
    * `DELETE /agents/:agent_id`_
    * `GET /agents`_
    * `GET /agents/:agent_id`_
    * `GET /agents/:agent_id/key`_
    * `POST /agents`_
    * `PUT /agents/:agent_id/restart`_
    * `PUT /agents/:agent_name`_

* `Manager`_
    * `GET /manager/configuration`_
    * `GET /manager/configuration/test`_
    * `GET /manager/stats`_
    * `GET /manager/stats/hourly`_
    * `GET /manager/stats/weekly`_
    * `GET /manager/status`_
    * `PUT /manager/restart`_
    * `PUT /manager/start`_
    * `PUT /manager/stop`_

* `Rootcheck`_
    * `DELETE /rootcheck`_
    * `DELETE /rootcheck/:agent_id`_
    * `GET /rootcheck/:agent_id`_
    * `GET /rootcheck/:agent_id/last_scan`_
    * `PUT /rootcheck`_
    * `PUT /rootcheck/:agent_id`_

* `Syscheck`_
    * `DELETE /syscheck`_
    * `DELETE /syscheck/:agent_id`_
    * `GET /syscheck/:agent_id/files/changed`_
    * `GET /syscheck/:agent_id/last_scan`_
    * `PUT /syscheck`_
    * `PUT /syscheck/:agent_id`_

Versioning
---------------------------------

We want to keep our API as backward compatible as possible. So, the client can specify what API version wants to use. The version is determined by the incoming client request, and may either be based on the request URL, or based on the request headers. If you don't specify the version, you will use the lastest version available. Right now, the API just has a version available: **v1.2**.

Below it is detailed how to use the API Versioning.


URL Versioning
+++++++++++++++++++++++++
API version is specified into the URL: ::

    GET https://IP:55000/v1.2/agents

Header Versioning
+++++++++++++++++++++++++
The normal URL but add the header **api-version**: ::

    GET https://IP:55000/agents
    api-version: v1.2


Agents
---------------------------------

List
+++++++++++++++++++++++++

GET /agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a list with the available agents.

**Parameters:**

* N/A

**Query:**

* status: Status of the agents to return. Possible values: Active, Disconnected or Never connected.

**Example Request:**
::

    GET https://IP:55000/agents?status=never+connected

**Example Response:**

::

    {
      "error": "0",
      "data": [
        {
          "id": "001",
          "name": "Host1",
          "ip": "any",
          "status": "Never connected"
        },
        {
          "id": "002",
          "name": "Host2",
          "ip": "10.0.0.4",
          "status": "Never connected"
        }
      ],
      "message": ""
    }

------------

Info
+++++++++++++++++++++++++

GET /agents/:agent_id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the information of an agent.

**Parameters:**

* agent_id

**Query:**

* N/A

**Example Request:**
::

    GET https://IP:55000/agents/000

**Example Response:**

::

    {
      "error": "0",
      "data": {
        "id": "000",
        "name": "LinMV",
        "ip": "127.0.0.1",
        "status": "Active",
        "os": "Linux LinMV 3.16.0-4-amd64 #1 SMP Debian 3.16.7-ckt11-1 (2015-05-24) x86_64",
        "version": "OSSEC HIDS v2.8",
        "lastKeepAlive": "Not available",
        "syscheckTime": "Tue Feb 23 10:57:30 2016",
        "syscheckEndTime": "Tue Feb 23 11:02:46 2016",
        "rootcheckTime": "Tue Feb 23 11:03:06 2016",
        "rootcheckEndTime": "Tue Feb 23 10:33:32 2016"
      },
      "message": ""
    }

------------

key
+++++++++++++++++++++++++

GET /agents/:agent_id/key
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the key for an agent.

**Parameters:**

* agent_id

**Query:**

* N/A

**Example Request:**
::

    GET https://IP:55000/agents/001/key

**Example Response:**

::

    {
      "error": "0",
      "data": "MDAxIEhvc3QxIGFueSBkMDZlYjRkNTk4MzU2YjAwYWQzNzcxZTdiMDJiMmRiZDhkM2ZhNjA3ZGU0NGU4YTQyZGVkYTJjMGY0NTQ1NWYz",
      "message": ""
    }

------------

Restart
+++++++++++++++++++++++++

PUT /agents/:agent_id/restart
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Restarts the agent.

**Parameters:**

* agent_id

**Query:**

* N/A

**Example Request:**
::

    PUT https://IP:55000/agents/001/restart

**Example Response:**

::

    {
      "error": "0",
      "data": "Restarting agent",
      "message": ""
    }

------------

Add
+++++++++++++++++++++++++


PUT /agents/:agent_name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Add a new agent with name *:agent_name*. This agent will use *ANY* as IP.

**Parameters:**

* agent_name

**Query:**

* N/A

**Example Request:**
::

    PUT https://IP:55000/agents/Host_005

**Example Response:**

::

    {
      "error": 0,
      "data": {
        "id": "002",
        "message": "Agent added"
      },
      "message": ""
    }


POST /agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Add a new agent.

**Parameters:**

- name: Agent name
- ip: (optional)
    - IP (10.0.0.5)
    - IP/MASK (10.0.0.1/24)
    - ANY
    - If you do not include this param, the API will get the **IP automatically**. If you are behind a proxy, you must set the option *config.BehindProxyServer* to *yes* at *config.js*.



**Query:**

* N/A

**Example Request:**
::

    POST https://IP:55000/agents
    Body:
        name: HostWindows
        ip: 10.10.10.6

**Example Response:**

::

    {
      "error": 0,
      "data": {
        "id": "003",
        "message": "Agent added"
      },
      "message": ""
    }

------------

Remove
+++++++++++++++++++++++++

DELETE /agents/:agent_id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Removes an agent.

Internally use *manage_agents* with option *-r <id>*.
You must **restart** OSSEC after removing an agent.

**Parameters:**

* agent_id

**Query:**

* N/A

**Example Request:**
::

    DELETE https://IP:55000/agents/005

**Example Response:**

::

    {
      "error": "0",
      "data": "Agent removed",
      "message": ""
    }

------------

Manager
---------------------------------

Start
+++++++++++++++++++++++++


PUT /manager/start
~~~~~~~~~~~~~~~~~~~~
Starts the OSSEC Manager processes.

**Parameters:**

* N/A

**Query:**

* N/A

**Example Request:**
::

    PUT https://IP:55000/manager/start

**Example Response:**

::

    {
      "error": "0",
      "data": [
        {
          "daemon": "ossec-maild",
          "status": "running"
        },
        {
          "daemon": "ossec-execd",
          "status": "running"
        },
        {
          "daemon": "ossec-analysisd",
          "status": "running"
        },
        {
          "daemon": "ossec-logcollector",
          "status": "running"
        },
        {
          "daemon": "ossec-remoted",
          "status": "running"
        },
        {
          "daemon": "ossec-syscheckd",
          "status": "running"
        },
        {
          "daemon": "ossec-monitord",
          "status": "running"
        }
      ],
      "message": ""
    }

------------

Stop
+++++++++++++++++++++++++

PUT /manager/stop
~~~~~~~~~~~~~~~~~~~~
Stops the OSSEC Manager processes.

**Parameters:**

* N/A

**Query:**

* N/A

**Example Request:**
::

    PUT https://IP:55000/manager/stop

**Example Response:**

::

    {
      "error": "0",
      "data": [
        {
          "daemon": "ossec-monitord",
          "status": "killed"
        },
        {
          "daemon": "ossec-logcollector",
          "status": "killed"
        },
        {
          "daemon": "ossec-remoted",
          "status": "killed"
        },
        {
          "daemon": "ossec-syscheckd",
          "status": "killed"
        },
        {
          "daemon": "ossec-analysisd",
          "status": "killed"
        },
        {
          "daemon": "ossec-maild",
          "status": "stopped"
        },
        {
          "daemon": "ossec-execd",
          "status": "killed"
        }
      ],
      "message": ""
    }

------------

Restart
+++++++++++++++++++++++++

PUT /manager/restart
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Restarts the OSSEC Manager processes.

**Parameters:**

* N/A

**Query:**

* N/A

**Example Request:**
::

    PUT https://IP:55000/manager/restart

**Example Response:**

::

    {
      "error": "0",
      "data": [
        {
          "daemon": "ossec-maild",
          "status": "running"
        },
        {
          "daemon": "ossec-execd",
          "status": "running"
        },
        {
          "daemon": "ossec-analysisd",
          "status": "running"
        },
        {
          "daemon": "ossec-logcollector",
          "status": "running"
        },
        {
          "daemon": "ossec-remoted",
          "status": "running"
        },
        {
          "daemon": "ossec-syscheckd",
          "status": "running"
        },
        {
          "daemon": "ossec-monitord",
          "status": "running"
        }
      ],
      "message": ""
    }

------------

Status
+++++++++++++++++++++++++

GET /manager/status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the OSSEC Manager processes that are running.

**Parameters:**

* N/A

**Query:**

* N/A

**Example Request:**
::

    GET https://IP:55000/manager/status

**Example Response:**

::

    {
      "error": "0",
      "data": [
        {
          "daemon": "ossec-monitord",
          "status": "running"
        },
        {
          "daemon": "ossec-logcollector",
          "status": "running"
        },
        {
          "daemon": "ossec-remoted",
          "status": "running"
        },
        {
          "daemon": "ossec-syscheckd",
          "status": "running"
        },
        {
          "daemon": "ossec-analysisd",
          "status": "running"
        },
        {
          "daemon": "ossec-maild",
          "status": "stopped"
        },
        {
          "daemon": "ossec-execd",
          "status": "running"
        }
      ],
      "message": ""
    }

------------

Configuration
+++++++++++++++++++++++++

GET /manager/configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns *ossec.conf* in JSON format.

**Parameters:**

* N/A

**Query:**

* Section: Indicates the ossec.conf section: global, rules, syscheck, rootcheck, remote, alerts, command, active-response, localfile.
* Field: Indicates section child, e.g, fields for rule section are: include, decoder_dir, etc.

**Example Request:**
::

    GET https://IP:55000/manager/configuration?section=rules&field=include

**Example Response:**

::

    {
      "error": "0",
      "data": [
        {
          "$t": "rules_config.xml"
        },
        {
          "$t": "pam_rules.xml"
        },
        {
          "$t": "..._rules.xml"
        }
      ],
      "message": ""
    }

GET /manager/configuration/test
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Test OSSEC Manager configuration.

**Parameters:**

* N/A

**Query:**

* N/A

**Example Request:**
::

    GET https://IP:55000/manager/configuration/test
    * The second line of ossec.conf have been changed from <global> to <globaaaal>.
    
**Example Response:**

::

    {
      "error": 82,
      "data": "",
      "message": "[\"2016/02/23 12:30:57 ossec-testrule(1226): ERROR: Error reading XML file '/var/ossec/etc/ossec.conf': XMLERR: Element 'globaaaal' not closed. (line 6).\", \"2016/02/23 12:30:57 ossec-testrule(1202): ERROR: Configuration error at '/var/ossec/etc/ossec.conf'. Exiting.\"]"
    }

------------

Stats
+++++++++++++++++++++++++

GET /manager/stats
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns OSSEC statistical information of current date.

**Parameters:**

* N/A

**Query:**

* date: Select date for getting the statistical information. Format: YYYYMMDD

**Example Request:**
::

    GET https://IP:55000/manager/stats?date=20160223

**Example Response:**

::

    {
      "error": "0",
      "data": [
        {
          "hour": 10,
          "firewall": 0,
          "alerts": [
            {
              "times": 2,
              "sigid": 600,
              "level": 0
            },
            {
              "times": 2,
              "sigid": 1002,
              "level": 2
            },
            {
              "times": 8,
              "sigid": 530,
              "level": 0
            },
            {
              "times": 1,
              "sigid": 535,
              "level": 1
            },
            {
              "times": 1,
              "sigid": 502,
              "level": 3
            },
            {
              "times": 1,
              "sigid": 515,
              "level": 0
            }
          ],
          "totalAlerts": 15,
          "syscheck": 1126,
          "events": 1144
        },
        {
          "hour": 11,
          "firewall": 0,
          "alerts": [
            {
              "...": "..."
            }
          ],
          "totalAlerts": 432,
          "syscheck": 1146,
          "events": 1607
        }
      ],
      "message": ""
    }

GET /manager/stats/hourly
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns OSSEC statistical information per hour. Each item in *averages* field represents the average of alerts per hour.

**Parameters:**

* N/A

**Query:**

* N/A

**Example Request:**
::

    GET https://IP:55000/manager/stats/hourly

**Example Response:**

::

    {
    "error":"0",
    "response":{
      "averages":[
        974,
        1291,
        886,
        784,
        1013,
        843,
        880,
        872,
        805,
        681,
        1094,
        868,
        609,
        659,
        1455,
        1382,
        1465,
        2092,
        1475,
        1879,
        1548,
        1854,
        1849,
        1020
      ],
      "interactions":20
    },
    "message":null
    }
    
GET /manager/stats/weekly
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns OSSEC statistical information per week. Each item in *hours* field represents the average of alerts per hour and week day.

**Parameters:**

* N/A

**Query:**

* N/A

**Example Request:**
::

    GET https://IP:55000/manager/stats/weekly

**Example Response:**

::

    {
      "error": "0",
      "data": {
        "Mon":{
          "hours":[
            948,
            838,
            711,
            1091,
            589,
            574,
            888,
            665,
            522,
            428,
            593,
            638,
            446,
            757,
            401,
            443,
            1439,
            1114,
            648,
            1047,
            629,
            483,
            2641,
            649
          ],
        "interactions":0
        },
        "...": {
          ...
        },
        "Sun":{
          "hours":[
            1066,
            1684,
            901,
            652,
            1078,
            1236,
            1052,
            920,
            803,
            686,
            391,
            800,
            736,
            558,
            418,
            703,
            591,
            2122,
            578,
            1608,
            631,
            732,
            895,
            623
          ],
          "interactions":0
        },
      },
      "message": ""
    }

------------

Rootcheck
---------------------------------

Database
+++++++++++++++++++++++++

GET /rootcheck/:agent_id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the rootcheck database of an agent.

**Parameters:**

* agent_id

**Query:**

* N/A

**Example Request:**
::

    GET https://IP:55000/rootcheck/000

**Example Response:**

::

    {
      "error": "0",
      "data": [
        {
          "status": "outstanding",
          "readDay": "2016 Feb 23 12:52:58",
          "oldDay": "2016 Feb 22 19:41:05",
          "event": "(null)System Audit: CIS - Testing against the CIS Debian Linux Benchmark v1.0. File: /etc/debian_version. Reference: http://www.ossec.net/wiki/index.php/CIS_DebianLinux ."
        },
        {
          "status": "outstanding",
          "readDay": "2016 Feb 23 12:52:58",
          "oldDay": "2016 Feb 22 19:41:05",
          "event": "(null)System Audit: CIS - Debian Linux - 1.4 - Robust partition scheme - /tmp is not on its own partition {CIS: 1.4 Debian Linux}. File: /etc/fstab. Reference: http://www.ossec.net/wiki/index.php/CIS_DebianLinux ."
        },
        {
          "status": "outstanding",
          "readDay": "2016 Feb 23 12:52:58",
          "oldDay": "2016 Feb 22 19:41:05",
          "event": "(null)System Audit: CIS - Debian Linux - 1.4 - Robust partition scheme - /opt is not on its own partition {CIS: 1.4 Debian Linux}. File: /opt. Reference: http://www.ossec.net/wiki/index.php/CIS_DebianLinux ."
        },
        {
          "status": "outstanding",
          "readDay": "2016 Feb 23 12:52:58",
          "oldDay": "2016 Feb 22 19:41:05",
          "event": "(null)System Audit: CIS - Debian Linux - 1.4 - Robust partition scheme - /var is not on its own partition {CIS: 1.4 Debian Linux}. File: /etc/fstab. Reference: http://www.ossec.net/wiki/index.php/CIS_DebianLinux ."
        },
        {
          "status": "outstanding",
          "readDay": "2016 Feb 23 12:52:58",
          "oldDay": "2016 Feb 22 19:41:05",
          "event": "(null)System Audit: CIS - Debian Linux - 4.13 - Disable standard boot services - Web server Enabled {CIS: 4.13 Debian Linux} {PCI_DSS: 2.2.2}. File: /etc/init.d/apache2. Reference: http://www.ossec.net/wiki/index.php/CIS_DebianLinux ."
        }
      ],
      "message": ""
    }

------------

Last scan
+++++++++++++++++++++++++

GET /rootcheck/:agent_id/last_scan
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Return the timestamp of the last rootcheck scan.

**Parameters:**

* agent_id

**Query:**

* N/A

**Example Request:**
::

    GET https://IP:55000/rootcheck/000/last_scan

**Example Response:**

::

    {
      "error": "0",
      "data": {
        "rootcheckTime": "Tue Feb 23 15:54:13 2016",
        "rootcheckEndTime": "Tue Feb 23 15:58:52 2016"
      },
      "message": ""
    }

------------

Run
+++++++++++++++++++++++++

PUT /rootcheck
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs syscheck/rootcheck on all agents.

This request has the same behavior that `PUT /syscheck`_. Due to OSSEC launches both processes at once.

**Parameters:**

* N/A

**Query:**

* N/A

**Example Request:**
::

    PUT https://IP:55000/rootcheck

**Example Response:**

::

    {
      "error": "0",
      "data": "Restarting Syscheck/Rootcheck on all agents",
      "message": ""
    }

PUT /rootcheck/:agent_id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs syscheck/rootcheck  on an agent.

This request has the same behavior that `PUT /syscheck/:agent_id`_. Due to OSSEC launches both processes at once.

**Parameters:**

* agent_id

**Query:**

* N/A

**Example Request:**
::

    PUT https://IP:55000/rootcheck/001

**Example Response:**

::

    {
      "error": "0",
      "data": "Restarting Syscheck/Rootcheck on agent",
      "message": ""
    }

------------

Clear Database
+++++++++++++++++++++++++

DELETE /rootcheck
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears the rootcheck database for all agents.

**Parameters:**

* N/A

**Query:**

* N/A

**Example Request:**
::

    DELETE https://IP:55000/rootcheck

**Example Response:**

::

    {
      "error": "0",
      "data": "Policy and auditing database updated",
      "message": ""
    }

DELETE /rootcheck/:agent_id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears the rootcheck database for an agent.

**Parameters:**

* agent_id

**Query:**

* N/A

**Example Request:**
::

    DELETE https://IP:55000/rootcheck/001

**Example Response:**

::

    {
      "error": "0",
      "data": "Policy and auditing database updated",
      "message": ""
    }

------------

Syscheck
---------------------------------

Database
+++++++++++++++++++++++++

GET /syscheck/:agent_id/files/changed
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns changed files for an agent. If a filename is specified, returns the changes in that files.

**Parameters:**

* agent_id

**Query:**

* filename

**Example Request:**
::

    GET https://IP:55000/syscheck/000/files/changed?filename=/home/test/passwords.txt

**Example Response:**

::

    {
      "error": "0",
      "data": [
        {
          "date": "2016 Feb 23 15:42:46",
          "file": "/home/test/passwords.txt",
          "changes": 0,
          "attrs": {
            "event": "added",
            "size": "2",
            "mode": 33188,
            "perm": "rw-r--r--",
            "uid": "0",
            "gid": "0",
            "md5": "60b725f10c9c85c70d97880dfe8191b3",
            "sha1": "3f786850e387550fdab836ed7e6dc881de23001b"
          }
        },
        {
          "date": "2016 Feb 23 15:53:41",
          "file": "/home/test/passwords.txt",
          "changes": 0,
          "attrs": {
            "event": "modified",
            "size": "53",
            "mode": 33279,
            "perm": "rwxrwxrwx",
            "uid": "0",
            "gid": "0",
            "md5": "0a8bc357686b61e32ca87a6a07c0abef",
            "sha1": "756e229be4c2ef11d4e4aea69e4483432f6d0988"
          }
        }
      ],
      "message": ""
    }

------------

Last scan
+++++++++++++++++++++++++

GET /syscheck/:agent_id/last_scan
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Return the timestamp of the last syscheck scan.

**Parameters:**

* agent_id

**Query:**

* N/A

**Example Request:**
::

    GET https://IP:55000/syscheck/001/last_scan

**Example Response:**

::

    {
      "error": "0",
      "data": {
        "syscheckTime": "Tue Feb 23 15:37:42 2016",
        "syscheckEndTime": "Tue Feb 23 15:42:58 2016"
      },
      "message": ""
    }

------------

Run
+++++++++++++++++++++++++

PUT /syscheck
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs syscheck/rootcheck on all agents.

This request has the same behavior that `PUT /rootcheck`_. Due to OSSEC launches both processes at once.

**Parameters:**

* N/A

**Query:**

* N/A

**Example Request:**
::

    PUT https://IP:55000/syscheck

**Example Response:**

::

    {
      "error": "0",
      "data": "Restarting Syscheck/Rootcheck on all agents",
      "message": ""
    }

PUT /syscheck/:agent_id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs syscheck/rootcheck on an agent.

This request has the same behavior that `PUT /rootcheck/:agent_id`_. Due to OSSEC launches both processes at once.

**Parameters:**

* agent_id

**Query:**

* N/A

**Example Request:**
::

    PUT https://IP:55000/syscheck/001

**Example Response:**

::

    {
      "error": "0",
      "data": "Restarting Syscheck/Rootcheck on agent",
      "message": ""
    }

------------

Clear Database
+++++++++++++++++++++++++

DELETE /syscheck
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears the syscheck database for all agents.

**Parameters:**

* N/A

**Query:**

* N/A

**Example Request:**
::

    DELETE https://IP:55000/syscheck

**Example Response:**

::

    {
      "error": "0",
      "data": "Integrity check database updated",
      "message": ""
    }

DELETE /syscheck/:agent_id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears the syscheck database for an agent.

**Parameters:**

* agent_id

**Query:**

* N/A

**Example Request:**
::

    DELETE https://IP:55000/syscheck/001

**Example Response:**

::

    {
      "error": "0",
      "data": "Integrity check database updated",
      "message": ""
    }

