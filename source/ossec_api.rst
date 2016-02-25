.. _ossec_api:

OSSEC Wazuh RESTful API 
**************************

Introduction
======================

OSSEC Wazuh RESTful API provides a new mechanism to manage OSSEC Wazuh. The goal is to manage your OSSEC deployment remotely (e.g. through a web browser), or to control OSSEC with external systems.

Perform everyday actions like adding an agent, restart OSSEC, or check the configuration are now simplest using Wazuh RESTful API.

OSSEC Wazuh API RESTful capabilities:

* Agents management
* Manager control & overview
* Rootcheck control
* Syscheck control
* Statistical Information
* HTTPS and User authentication
* Error Handling

Installation
======================

OSSEC Wazuh RESTful API requires you to have previously installed our OSSEC fork as your manager. You can download and install it following :ref:`these instructions <wazuh_installation>`. 

As well, OSSEC API works under a NodeJS server (v0.10.x) with Express module (4.0.x), and has the following dependencies:

- Body parser
- FS
- HTTPS
- HTTP-AUTH
- Moment

The service will operate on port 55000/tcp by default, and NodeJS service will be protected with HTTP Authentication and encrypted by HTTPS.

Copy the API folder to OSSEC folder: ::

 $ cd ~ && git clone https://github.com/wazuh/wazuh-API.git
 $ mkdir -p /var/ossec/api && cp -r wazuh-API/* /var/ossec/api

NodeJS
------------

On CentOS, install ``epel-release`` and ``nodejs`` packages: ::
 
 $ sudo yum install epel-release
 $ sudo yum install nodejs

On Debian, update your repositories and install ``nodejs`` package: ::

 $ sudo apt-get update
 $ sudo apt-get install nodejs

.. note:: Remember to open 55000 port TCP in your firewall, as it is used by the API service.

Python packages
------------------
The API uses Python to perform some tasks. Install in your system:

- Python 2.6+
- Package *xmljson*: ``pip install xmljson``

Configuration
----------------

You can configure some parameters using the file ``api/conf.js``:

- Port: **55000** by default.


- Security

 - https: Use HTTP protocol over TLS/SSL. Default value: **yes**.
 - basic_auth: Use basic authentication. Default value: **yes**.
 - AccessControlAllowOrigin: Set header **Access-Control-Allow-Origin**. Default value: *****.
 - AccessControlAllowHeaders: Set header **Access-Control-Allow-Headers**. Default value: **kbn-version**.

- Paths:

 - ossec_path: */var/ossec* by default.

- Logs

 - logs: Log level (disabled, info, warning, error, debug). Each level includes the previous level. Default value: **info**.
 - logs_tag: Tag to use in logs. Default value: **WazuhAPI**.


SSL Certificate
----------------

At ``/var/ossec/api`` directory you can find some certificates we already created for you. But, if you want to create your own certificates, you can do it by following these steps (they require you to have openssl installed): ::

 $ cd /var/ossec/api/ssl
 $ sudo openssl genrsa -des3 -out server.key 1024
 $ sudo openssl req -new -key server.key -out server.csr

The password must be entered everytime you run the server, if you don't want to enter the password everytime, you can remove it by running these commands: ::

 $ sudo cp server.key server.key.org
 $ sudo openssl rsa -in server.key.org -out server.key

Now generate your self-signed certificate: ::

 $ sudo openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

And remove temporary files: ::

 $ sudo rm server.csr
 $ sudo rm server.key.org

Basic Authentication
--------------------------

By default you can access by entering user "foo" and password "bar". We recommend you to generate new credentials. This can be done very easily, doing the following steps:

At first please make sure that you have ``htpasswd`` tool installed.

On Debian, update your repositories and install ``apache2-utils`` package: ::

 $ sudo apt-get update
 $ sudo apt-get install apache2-utils

Then, run htpasswd with your desired username: :: 

 $ cd /var/ossec/api/ssl
 $ sudo htpasswd -c htpasswd username

Running API on the background
----------------------------------

Time to start the API, we are going to start it on background and redirect the standard output to a log file called ``api.log``: ::

 $ /bin/node /var/ossec/api/app.js > /var/ossec/api/api.log &

.. note:: Sometimes NodeJS binary is called "nodejs" or it is located on /usr/bin/, if the API does not start, check it please.


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
  * response: data requested or null if error is different to 0.
  * message: error description or null if error is equal to 0
  
  * Examples:

    * Response without errors: ``{ "error": "0", "response": "...", "message": null }``
    * Response with errors: ``{ "error": "NOT 0", "response": null, "message": "..." }``

* All responses have a HTTP Status code: 2xx (success), 4xx (client error), 5xx (server error), etc.

Find some `Examples`_ of how to use this API with `Curl`_, `Powershell`_ and `Python`_.


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
      "response": [
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
      "message": null
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
      "response": {
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
      "message": null
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
      "response": "MDAxIEhvc3QxIGFueSBkMDZlYjRkNTk4MzU2YjAwYWQzNzcxZTdiMDJiMmRiZDhkM2ZhNjA3ZGU0NGU4YTQyZGVkYTJjMGY0NTQ1NWYz",
      "message": null
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
      "response": "Restarting agent",
      "message": null
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
      "error": "0",
      "response": "Agent added with ID 001",
      "message": null
    }


POST /agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Add a new agent.

**Parameters:**

* name: Agent name
* ip: IP (10.0.0.5), IP/MASK (10.0.0.1/24), ANY

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
      "error": "0",
      "response": "Agent added with ID 002",
      "message": null
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
      "response": "Agent removed",
      "message": null
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
      "response": [
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
      "message": null
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
      "response": [
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
      "message": null
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
      "response": [
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
      "message": null
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
      "response": [
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
      "message": null
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
      "response": [
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
      "message": null
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
      "response": null,
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
      "response": [
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
      "message": null
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
      "response": {
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
      "message": null
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
      "response": [
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
      "message": null
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
      "response": {
        "rootcheckTime": "Tue Feb 23 15:54:13 2016",
        "rootcheckEndTime": "Tue Feb 23 15:58:52 2016"
      },
      "message": null
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
      "response": "Restarting Syscheck/Rootcheck on all agents",
      "message": null
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
      "response": "Restarting Syscheck/Rootcheck on agent",
      "message": null
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
      "response": "Policy and auditing database updated",
      "message": null
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
      "response": "Policy and auditing database updated",
      "message": null
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
      "response": [
        {
          "readDay": "2016 Feb 23 15:42:46",
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
          "readDay": "2016 Feb 23 15:53:41",
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
      "message": null
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
      "response": {
        "syscheckTime": "Tue Feb 23 15:37:42 2016",
        "syscheckEndTime": "Tue Feb 23 15:42:58 2016"
      },
      "message": null
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
      "response": "Restarting Syscheck/Rootcheck on all agents",
      "message": null
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
      "response": "Restarting Syscheck/Rootcheck on agent",
      "message": null
    }

------------

Clear Database
+++++++++++++++++++++++++

DELETE /syscheck
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears the rootcheck database for all agents.

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
      "response": "Integrity check database updated",
      "message": null
    }

DELETE /syscheck/:agent_id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears the rootcheck database for an agent.

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
      "response": "Integrity check database updated",
      "message": null
    }

------------

Examples
------------
CURL
+++++++++++++++++++++++++

cURL is a command-line tool for transferring data using various protocols. It can be used to interact with this API. It is pre-installed on many Linux and Mac systems. Some examples:

**GET**
::

    $ curl -u foo:bar -k https://127.0.0.1:55000

``{"error":"0","response":"OSSEC-API","message":"wazuh.com"}``

**PUT**
::

    $ curl -u foo:bar -k -X PUT https://127.0.0.1:55000/agents/new_agent

``{"error":"0","response":"Agent added","message":null}``

**POST**
::

    $ curl -u foo:bar -k -X POST -d 'name=NewHost&ip=10.0.0.8' https://127.0.0.1:55000/agents

``{"error":"0","response":"Agent added","message":null}``

**DELETE**
::

    $ curl -u foo:bar -k -X DELETE https://127.0.0.1:55000/rootcheck/001

``{"error":"0","response":"Policy and auditing database updated","message":null}``


Python
+++++++++++++++++++++++++

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
        "message": null, 
        "response": {
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


Powershell
+++++++++++++++++++++++++

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

    error response                                                                           message
    ----- --------                                                                           -------
    0     @{syscheckTime=Wed Feb 24 09:55:04 2016; syscheckEndTime=Wed Feb 24 10:00:42 2016}  


Full example in ``wazuh-API/examples/api-client.ps1``.


What's next
-----------

Once you have your OSSEC RESTful API running, we recommend you to check our OSSEC Wazuh ruleset:

* `OSSEC Wazuh Ruleset installation guide <http://documentation.wazuh.com/en/latest/ossec_ruleset.html>`_ 
