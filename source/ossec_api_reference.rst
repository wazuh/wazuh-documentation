.. _ossec_api_test:

Reference
======================
This API reference is organized by resources:

* `Agents`_
* `Decoders`_
* `Manager`_
* `Rootcheck`_
* `Rules`_
* `Syscheck`_

Also, it is provided an `Request List`_ with all available requests.


Request List
---------------------------------

`Agents`_
	* DELETE /agents/:agent_id  (`Delete an agent`_)
	* GET /agents  (`Get all agents`_)
	* GET /agents/:agent_id  (`Get an agent`_)
	* GET /agents/:agent_id/key  (`Get agent key`_)
	* POST /agents/:agent_id  (`Add agent`_)
	* PUT /agents/:agent_id  (`Restart an agent`_)
	* PUT /agents/:agent_name  (`Add agent (quick method)`_)
	* PUT /agents/restart  (`Restart all agents`_)

`Decoders`_
	* GET /decoders  (`Get all decoders`_)
	* GET /decoders/:decoder_name  (`Get decoders by name`_)
	* GET /decoders/files  (`Get all decoders files.`_)
	* GET /decoders/parents  (`Get all parent decoders`_)

`Manager`_
	* GET /manager/configuration  (`Get manager configuration`_)
	* GET /manager/info  (`Get manager information`_)
	* GET /manager/logs  (`Get ossec.log`_)
	* GET /manager/logs/summary  (`Get summary of ossec.log`_)
	* GET /manager/stats  (`Get manager stats`_)
	* GET /manager/stats/hourly  (`Get manager stats by hour`_)
	* GET /manager/stats/weekly  (`Get manager stats by week`_)
	* GET /manager/status  (`Get manager status`_)
	* GET /manager/update-ruleset/backups  (`Get ruleset backups`_)
	* PUT /manager/configuration/test  (`Test manager configuration`_)
	* PUT /manager/restart  (`Restart manager`_)
	* PUT /manager/start  (`Start manager`_)
	* PUT /manager/stop  (`Stop manager`_)
	* PUT /manager/update-ruleset  (`Update ruleset`_)
	* PUT /manager/update-ruleset/backups/:id  (`Restore rulset backup`_)

`Rootcheck`_
	* DELETE /rootcheck  (`Clear rootcheck database`_)
	* DELETE /rootcheck/:agent_id  (`Clear rootcheck database of an agent`_)
	* GET /rootcheck/:agent_id  (`Get rootcheck database`_)
	* GET /rootcheck/:agent_id/last_scan  (`Get last rootcheck scan`_)
	* PUT /rootcheck  (`Run rootcheck scan in all agents`_)
	* PUT /rootcheck/:agent_id  (`Run rootcheck scan in an agent`_)

`Rules`_
	* GET /rules  (`Get all rules`_)
	* GET /rules  (`Get rules by id`_)
	* GET /rules/files  (`Get files of rules`_)
	* GET /rules/groups  (`Get rule groups`_)
	* GET /rules/pci  (`Get rule pci requirements`_)

`Syscheck`_
	* DELETE /syscheck  (`Clear syscheck database`_)
	* DELETE /syscheck/:agent_id  (`Clear syscheck database of an agent`_)
	* GET /syscheck/:agent_id/files  (`Get syscheck files`_)
	* GET /syscheck/:agent_id/last_scan  (`Get last syscheck scan`_)
	* PUT /syscheck  (`Run syscheck scan in all agents`_)
	* PUT /syscheck/:agent_id  (`Run syscheck scan in an agent`_)

Agents
---------------------------------
Add
+++++++++++++++++++++++++

Add agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Add a new agent.

**Request**:

``POST`` ::

	/agents/:agent_id

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``name``           | String        | Agent name.                                                                                                                                                                                            |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ip                 | String        | If you do not include this param, the API will get the IP automatically. If you are behind a proxy, you must set the option config.BehindProxyServer to yes at config.js.                              |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - IP                                                                                                                                                                                                   |
|                    |               | - IP/NET                                                                                                                                                                                               |
|                    |               | - ANY                                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X POST -d '{"name":"NewHost","ip":"10.0.0.9"}' -H 'Content-Type:application/json' "https://127.0.0.1:55000/agents?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "001"
	}
	

Add agent (quick method)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Adds a new agent with name :agent_name. This agent will use ANY as IP.

**Request**:

``PUT`` ::

	/agents/:agent_name

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_name``     | String        | Agent name.                                                                                                                                                                                            |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/myNewAgent?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "002"
	}
	


Delete
+++++++++++++++++++++++++

Delete an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Removes an agent. Internally use manage_agents with option -r <id>. You must restart OSSEC after removing an agent.

**Request**:

``DELETE`` ::

	/agents/:agent_id

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/agents/002?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Agent removed"
	}
	


Info
+++++++++++++++++++++++++

Get all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a list with the available agents.

**Request**:

``GET`` ::

	/agents

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| offset             | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| limit              | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| sort               | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| search             | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| status             | string        | Filters by agent status.                                                                                                                                                                               |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - active                                                                                                                                                                                               |
|                    |               | - never connected                                                                                                                                                                                      |
|                    |               | - disconnected                                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents?pretty&offset=0&limit=5&sort=-ip,name"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 2,
	      "items": [
	         {
	            "status": "Active",
	            "ip": "127.0.0.1",
	            "id": "000",
	            "name": "LinMV"
	         },
	         {
	            "status": "Never connected",
	            "ip": "10.0.0.9",
	            "id": "001",
	            "name": "NewHost"
	         }
	      ]
	   }
	}
	

Get an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the information of an agent.

**Request**:

``GET`` ::

	/agents/:agent_id

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/000?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "status": "Active",
	      "ip": "127.0.0.1",
	      "syscheckEndTime": "Wed Jul 13 18:44:36 2016",
	      "id": "000",
	      "name": "LinMV",
	      "rootcheckEndTime": "Wed Jul 13 15:17:26 2016",
	      "version": "OSSEC HIDS v2.8",
	      "syscheckTime": "Wed Jul 13 18:44:11 2016",
	      "lastKeepAlive": "Not available",
	      "os": "Linux LinMV 3.16.0-4-amd64 #1 SMP Debian 3.16.7-ckt11-1 (2015-05-24) x86_64",
	      "rootcheckTime": "Wed Jul 13 18:44:36 2016"
	   }
	}
	


Key
+++++++++++++++++++++++++

Get agent key
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the key of an agent.

**Request**:

``GET`` ::

	/agents/:agent_id/key

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/001/key?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "MDAxIE5ld0hvc3QgMTAuMC4wLjkgZWY1ZWM0MGY5YmE5MGY0ZjY5ZWRkMWU1YjY1ZTkxYzQxZjM3ZmMyZmQ1NWFiNTExN2RmODE2ZWZhZDU5MGY4Ng=="
	}
	


Restart
+++++++++++++++++++++++++

Restart all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Restarts all agents.

**Request**:

``PUT`` ::

	/agents/restart

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/restart?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Restarting all agents"
	}
	

Restart an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Restarts the agent.

**Request**:

``PUT`` ::

	/agents/:agent_id

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent unique ID.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/000/restart?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Restarting agent"
	}
	



Decoders
---------------------------------
Info
+++++++++++++++++++++++++

Get all decoders
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all decoders included in ossec.conf.

**Request**:

``GET`` ::

	/decoders

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| offset             | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| limit              | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| sort               | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| search             | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| file               | String        | Filters by filename.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/decoders?pretty&offset=0&limit=2&sort=+file,position"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 322,
	      "items": [
	         {
	            "position": 0,
	            "details": {
	               "regex": "/bin/(\\S+) (\\S+) - (\\S+) (\\d+.\\d+) (\\d+)",
	               "order": "action, status, srcip, id, extra_data",
	               "prematch": "^\\w\\w\\w \\w+\\s+\\d+ \\d\\d:\\d\\d:\\d\\d \\w+ \\d+ /\\S+/active-response"
	            },
	            "full_path": "/var/ossec/etc/ossec_decoders/active-response_decoders.xml",
	            "file": "active-response_decoders.xml",
	            "name": "ar_log"
	         },
	         {
	            "position": 0,
	            "details": {
	               "regex": [
	                  " R:(\\w)  \\w:\\S+ S:(\\d+.\\d+.\\d+.\\d+) ",
	                  "D:(\\d+.\\d+.\\d+.\\d+) P:(\\S+) SP:(\\d+) DP:(\\d+) "
	               ],
	               "program_name": "^ipsec_logd",
	               "type": "firewall",
	               "order": "action,srcip,dstip,protocol,srcport,dstport"
	            },
	            "full_path": "/var/ossec/etc/ossec_decoders/aix-ipsec_decoders.xml",
	            "file": "aix-ipsec_decoders.xml",
	            "name": "aix-ipsec"
	         }
	      ]
	   }
	}
	

Get all decoders files.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all decoders files included in ossec.conf.

**Request**:

``GET`` ::

	/decoders/files

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| offset             | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| limit              | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| sort               | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| search             | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/decoders/files?pretty&offset=0&limit=10&sort=-"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 71,
	      "items": [
	         "/var/ossec/etc/wazuh_decoders/serv-u_decoders.xml",
	         "/var/ossec/etc/wazuh_decoders/redis_decoders.xml",
	         "/var/ossec/etc/wazuh_decoders/puppet_decoders.xml",
	         "/var/ossec/etc/wazuh_decoders/ossec_ruleset_decoders.xml",
	         "/var/ossec/etc/wazuh_decoders/oscap_decoders.xml",
	         "/var/ossec/etc/wazuh_decoders/netscaler_decoders.xml",
	         "/var/ossec/etc/wazuh_decoders/amazon_decoders.xml",
	         "/var/ossec/etc/ossec_decoders/zeus_decoders.xml",
	         "/var/ossec/etc/ossec_decoders/wordpress_decoders.xml",
	         "/var/ossec/etc/ossec_decoders/windows_decoders.xml"
	      ]
	   }
	}
	

Get all parent decoders
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all parent decoders included in ossec.conf

**Request**:

``GET`` ::

	/decoders/parents

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| offset             | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| limit              | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| sort               | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| search             | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/decoders/parents?pretty&offset=0&limit=2&sort=-file"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 100,
	      "items": [
	         {
	            "position": 0,
	            "details": {
	               "regex": " host=(\\S+), ",
	               "order": "srcip",
	               "prematch": "^[\\d\\d/\\w\\w\\w/\\d\\d\\d\\d:\\d\\d:\\d\\d:\\d\\d \\S+] "
	            },
	            "full_path": "/var/ossec/etc/ossec_decoders/zeus_decoders.xml",
	            "file": "zeus_decoders.xml",
	            "name": "zeus"
	         },
	         {
	            "position": 0,
	            "details": {
	               "regex": "^(\\d+.\\d+.\\d+.\\d+) ",
	               "program_name": "^WPsyslog",
	               "order": "srcip",
	               "prematch": "^["
	            },
	            "full_path": "/var/ossec/etc/ossec_decoders/wordpress_decoders.xml",
	            "file": "wordpress_decoders.xml",
	            "name": "wordpress"
	         }
	      ]
	   }
	}
	

Get decoders by name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the decoders with the specified name.

**Request**:

``GET`` ::

	/decoders/:decoder_name

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``decoder_name``   | String        | Decoder name.                                                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| offset             | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| limit              | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| sort               | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| search             | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/decoders/apache-errorlog?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 3,
	      "items": [
	         {
	            "position": 0,
	            "details": {
	               "program_name": "^httpd"
	            },
	            "full_path": "/var/ossec/etc/ossec_decoders/apache_decoders.xml",
	            "file": "apache_decoders.xml",
	            "name": "apache-errorlog"
	         },
	         {
	            "position": 1,
	            "details": {
	               "prematch": "^[warn] |^[notice] |^[error] "
	            },
	            "full_path": "/var/ossec/etc/ossec_decoders/apache_decoders.xml",
	            "file": "apache_decoders.xml",
	            "name": "apache-errorlog"
	         },
	         {
	            "position": 2,
	            "details": {
	               "prematch": "^[\\w+ \\w+ \\d+ \\d+:\\d+:\\d+.\\d+ \\d+] [\\S+:warn] |^[\\w+ \\w+ \\d+ \\d+:\\d+:\\d+.\\d+ \\d+] [\\S+:notice] |^[\\w+ \\w+ \\d+ \\d+:\\d+:\\d+.\\d+ \\d+] [\\S*:error] |^[\\w+ \\w+ \\d+ \\d+:\\d+:\\d+.\\d+ \\d+] [\\S+:info] "
	            },
	            "full_path": "/var/ossec/etc/ossec_decoders/apache_decoders.xml",
	            "file": "apache_decoders.xml",
	            "name": "apache-errorlog"
	         }
	      ]
	   }
	}
	



Manager
---------------------------------
Actions
+++++++++++++++++++++++++

Restart manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Restarts the OSSEC Manager processes.

**Request**:

``PUT`` ::

	/manager/restart

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/manager/restart?pretty"

**Example Response:**
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
	

Start manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Starts the OSSEC Manager processes.

**Request**:

``PUT`` ::

	/manager/start

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/manager/start?pretty"

**Example Response:**
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
	

Stop manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Stops the OSSEC Manager processes.

**Request**:

``PUT`` ::

	/manager/stop

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/manager/stop?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": [
	      {
	         "status": "killed",
	         "daemon": "ossec-monitord"
	      },
	      {
	         "status": "killed",
	         "daemon": "ossec-logcollector"
	      },
	      {
	         "status": "killed",
	         "daemon": "ossec-remoted"
	      },
	      {
	         "status": "killed",
	         "daemon": "ossec-syscheckd"
	      },
	      {
	         "status": "killed",
	         "daemon": "ossec-analysisd"
	      },
	      {
	         "status": "stopped",
	         "daemon": "ossec-maild"
	      },
	      {
	         "status": "killed",
	         "daemon": "ossec-execd"
	      },
	      {
	         "status": "stopped",
	         "daemon": "wazuh-moduled"
	      }
	   ]
	}
	


Configuration
+++++++++++++++++++++++++

Get manager configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns ossec.conf in JSON format.

**Request**:

``GET`` ::

	/manager/configuration

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| section            | String        | Indicates the ossec.conf section: global, rules, syscheck, rootcheck, remote, alerts, command, active-response, localfile.                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| field              | String        | Indicates a section child, e.g, fields for rule section are: include, decoder_dir, etc.                                                                                                                |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/configuration?section=global&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "email_notification": "no",
	      "white_list": [
	         "127.0.0.1",
	         "^localhost.localdomain$",
	         "10.0.0.2"
	      ],
	      "jsonout_output": "yes",
	      "logall": "yes"
	   }
	}
	

Test manager configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Checks OSSEC Manager configuration.

**Request**:

``PUT`` ::

	/manager/configuration/test

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/manager/configuration/test?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "OK"
	}
	


Logs
+++++++++++++++++++++++++

Get ossec.log
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the 3 last months of ossec.log.

**Request**:

``GET`` ::

	/manager/logs

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| offset             | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| limit              | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| sort               | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| search             | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| type_log           | string        | Filters by type of log.                                                                                                                                                                                |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - all                                                                                                                                                                                                  |
|                    |               | - error                                                                                                                                                                                                |
|                    |               | - info                                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| category           | string        | Filters by category of log.                                                                                                                                                                            |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/logs?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 5577,
	      "items": [
	         "2016/07/13 18:44:52 ossec-testrule: INFO: Reading decoder file etc/wazuh_decoders/serv-u_decoders.xml.",
	         "2016/07/13 18:44:52 ossec-testrule: INFO: Reading decoder file etc/wazuh_decoders/redis_decoders.xml.",
	         "2016/07/13 18:44:52 ossec-testrule: INFO: Reading decoder file etc/wazuh_decoders/puppet_decoders.xml.",
	         "2016/07/13 18:44:52 ossec-testrule: INFO: Reading decoder file etc/wazuh_decoders/ossec_ruleset_decoders.xml.",
	         "2016/07/13 18:44:52 ossec-testrule: INFO: Reading decoder file etc/wazuh_decoders/oscap_decoders.xml.",
	         "2016/07/13 18:44:52 ossec-testrule: INFO: Reading decoder file etc/wazuh_decoders/netscaler_decoders.xml.",
	         "2016/07/13 18:44:52 ossec-testrule: INFO: Reading decoder file etc/wazuh_decoders/amazon_decoders.xml.",
	         "2016/07/13 18:44:52 ossec-testrule: INFO: Reading decoder file etc/ossec_decoders/zeus_decoders.xml.",
	         "2016/07/13 18:44:52 ossec-testrule: INFO: Reading decoder file etc/ossec_decoders/wordpress_decoders.xml.",
	         "2016/07/13 18:44:52 ossec-testrule: INFO: Reading decoder file etc/ossec_decoders/windows_decoders.xml."
	      ]
	   }
	}
	

Get summary of ossec.log
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the 3 last months of ossec.log.

**Request**:

``GET`` ::

	/manager/logs/summary

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/logs/summary?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "ossec-testrule": {
	         "info": 1702,
	         "all": 1702,
	         "error": 0
	      },
	      "wazuh-moduled": {
	         "info": 22,
	         "all": 22,
	         "error": 0
	      },
	      "ossec-rootcheck": {
	         "info": 48,
	         "all": 48,
	         "error": 0
	      },
	      "ossec-monitord": {
	         "info": 40,
	         "all": 40,
	         "error": 0
	      },
	      "ossec-logcollector": {
	         "info": 182,
	         "all": 200,
	         "error": 18
	      },
	      "ossec-execd": {
	         "info": 60,
	         "all": 60,
	         "error": 0
	      },
	      "ossec-remoted": {
	         "info": 140,
	         "all": 162,
	         "error": 22
	      },
	      "ossec-syscheckd": {
	         "info": 206,
	         "all": 206,
	         "error": 0
	      },
	      "ossec-analysisd": {
	         "info": 3110,
	         "all": 3115,
	         "error": 5
	      },
	      "ossec-maild": {
	         "info": 22,
	         "all": 22,
	         "error": 0
	      }
	   }
	}
	


Retrieve_information
+++++++++++++++++++++++++

Get manager information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns basic information about Manager.

**Request**:

``GET`` ::

	/manager/info

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/info?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "path": "/var/ossec",
	      "installation_date": "Wed Jul 13 07:59:11 UTC 2016",
	      "version": "v1.2-alpha1",
	      "type": "server"
	   }
	}
	

Get manager status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the Manager processes that are running.

**Request**:

``GET`` ::

	/manager/status

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/status?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": [
	      {
	         "status": "stopped",
	         "daemon": "ossec-monitord"
	      },
	      {
	         "status": "stopped",
	         "daemon": "ossec-logcollector"
	      },
	      {
	         "status": "stopped",
	         "daemon": "ossec-remoted"
	      },
	      {
	         "status": "stopped",
	         "daemon": "ossec-syscheckd"
	      },
	      {
	         "status": "stopped",
	         "daemon": "ossec-analysisd"
	      },
	      {
	         "status": "stopped",
	         "daemon": "ossec-maild"
	      },
	      {
	         "status": "stopped",
	         "daemon": "ossec-execd"
	      },
	      {
	         "status": "stopped",
	         "daemon": "wazuh-moduled"
	      }
	   ]
	}
	


Ruleset
+++++++++++++++++++++++++

Get ruleset backups
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the ruleset backup list created by ossec_ruleset.py.

**Request**:

``GET`` ::

	/manager/update-ruleset/backups

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/update-ruleset/backups?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": [
	      "20160713_003",
	      "20160713_002",
	      "20160713_001"
	   ]
	}
	

Restore rulset backup
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Restores a ruleset backup.

**Request**:

``PUT`` ::

	/manager/update-ruleset/backups/:id

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``id``             | string        | Backup id.                                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/manager/update-ruleset/backups/20160711_002?pretty"

**Example Response:**
::

	{
	   "error": 2,
	   "message": "Error: No backups with name '20160711_002'."
	}
	

Update ruleset
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Update OSSEC ruleset. If the update change a file in use, OSSEC will be restarted.

**Request**:

``PUT`` ::

	/manager/update-ruleset

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| type               | string        | Selects ruleset to install.                                                                                                                                                                            |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - both                                                                                                                                                                                                 |
|                    |               | - rules                                                                                                                                                                                                |
|                    |               | - rootchecks                                                                                                                                                                                           |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| force              | string        | Overwrites all ruleset. OSSEC will be restarted.                                                                                                                                                       |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - yes                                                                                                                                                                                                  |
|                    |               | - no                                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/manager/update-ruleset?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "msg": "Your ruleset is up to date.",
	      "need_restart": "no",
	      "manual_steps": "no",
	      "restarted": "no"
	   }
	}
	


Stats
+++++++++++++++++++++++++

Get manager stats
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns OSSEC statistical information of current date.

**Request**:

``GET`` ::

	/manager/stats

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| date               | String        | Selects the date for getting the statistical information. Format: YYYYMMDD                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/stats?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": [
	      {
	         "hour": 7,
	         "firewall": 0,
	         "alerts": [
	            {
	               "times": 2,
	               "sigid": 5501,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 10100,
	               "level": 4
	            },
	            {
	               "times": 2,
	               "sigid": 5734,
	               "level": 0
	            },
	            {
	               "times": 1,
	               "sigid": 5715,
	               "level": 3
	            },
	            {
	               "times": 9,
	               "sigid": 530,
	               "level": 0
	            },
	            {
	               "times": 1,
	               "sigid": 502,
	               "level": 3
	            }
	         ],
	         "totalAlerts": 16,
	         "syscheck": 0,
	         "events": 16
	      },
	      {
	         "hour": 8,
	         "firewall": 0,
	         "alerts": [
	            {
	               "times": 25,
	               "sigid": 5501,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 5521,
	               "level": 0
	            },
	            {
	               "times": 23,
	               "sigid": 5502,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 5522,
	               "level": 0
	            },
	            {
	               "times": 25,
	               "sigid": 5734,
	               "level": 0
	            },
	            {
	               "times": 25,
	               "sigid": 5715,
	               "level": 3
	            },
	            {
	               "times": 11,
	               "sigid": 1002,
	               "level": 2
	            },
	            {
	               "times": 77,
	               "sigid": 530,
	               "level": 0
	            },
	            {
	               "times": 3,
	               "sigid": 533,
	               "level": 7
	            },
	            {
	               "times": 10,
	               "sigid": 535,
	               "level": 1
	            },
	            {
	               "times": 1,
	               "sigid": 502,
	               "level": 3
	            },
	            {
	               "times": 4,
	               "sigid": 515,
	               "level": 0
	            },
	            {
	               "times": 3,
	               "sigid": 516,
	               "level": 3
	            }
	         ],
	         "totalAlerts": 209,
	         "syscheck": 10083,
	         "events": 10343
	      },
	      {
	         "hour": 9,
	         "firewall": 0,
	         "alerts": [
	            {
	               "times": 2,
	               "sigid": 5501,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 5521,
	               "level": 0
	            },
	            {
	               "times": 2,
	               "sigid": 5502,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 5522,
	               "level": 0
	            },
	            {
	               "times": 2,
	               "sigid": 5734,
	               "level": 0
	            },
	            {
	               "times": 2,
	               "sigid": 5715,
	               "level": 3
	            },
	            {
	               "times": 79,
	               "sigid": 530,
	               "level": 0
	            },
	            {
	               "times": 1,
	               "sigid": 533,
	               "level": 7
	            },
	            {
	               "times": 10,
	               "sigid": 535,
	               "level": 1
	            },
	            {
	               "times": 2,
	               "sigid": 515,
	               "level": 0
	            },
	            {
	               "times": 12,
	               "sigid": 550,
	               "level": 7
	            }
	         ],
	         "totalAlerts": 114,
	         "syscheck": 10106,
	         "events": 10237
	      },
	      {
	         "hour": 10,
	         "firewall": 0,
	         "alerts": [
	            {
	               "times": 1,
	               "sigid": 5501,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 5502,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 5734,
	               "level": 0
	            },
	            {
	               "times": 1,
	               "sigid": 5715,
	               "level": 3
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
	               "times": 4,
	               "sigid": 515,
	               "level": 0
	            },
	            {
	               "times": 3,
	               "sigid": 516,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 550,
	               "level": 7
	            },
	            {
	               "times": 9,
	               "sigid": 551,
	               "level": 7
	            }
	         ],
	         "totalAlerts": 31,
	         "syscheck": 10123,
	         "events": 10146
	      },
	      {
	         "hour": 11,
	         "firewall": 0,
	         "alerts": [
	            {
	               "times": 2,
	               "sigid": 5501,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 5521,
	               "level": 0
	            },
	            {
	               "times": 1,
	               "sigid": 5522,
	               "level": 0
	            },
	            {
	               "times": 2,
	               "sigid": 5734,
	               "level": 0
	            },
	            {
	               "times": 2,
	               "sigid": 5715,
	               "level": 3
	            },
	            {
	               "times": 79,
	               "sigid": 530,
	               "level": 0
	            },
	            {
	               "times": 1,
	               "sigid": 533,
	               "level": 7
	            },
	            {
	               "times": 10,
	               "sigid": 535,
	               "level": 1
	            },
	            {
	               "times": 2,
	               "sigid": 515,
	               "level": 0
	            },
	            {
	               "times": 8,
	               "sigid": 552,
	               "level": 7
	            }
	         ],
	         "totalAlerts": 108,
	         "syscheck": 10129,
	         "events": 10258
	      },
	      {
	         "hour": 12,
	         "firewall": 0,
	         "alerts": [
	            {
	               "times": 1,
	               "sigid": 5521,
	               "level": 0
	            },
	            {
	               "times": 1,
	               "sigid": 5502,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 5522,
	               "level": 0
	            },
	            {
	               "times": 80,
	               "sigid": 530,
	               "level": 0
	            },
	            {
	               "times": 10,
	               "sigid": 535,
	               "level": 1
	            }
	         ],
	         "totalAlerts": 93,
	         "syscheck": 0,
	         "events": 121
	      },
	      {
	         "hour": 13,
	         "firewall": 0,
	         "alerts": [],
	         "totalAlerts": 0,
	         "syscheck": 0,
	         "events": 0
	      },
	      {
	         "hour": 14,
	         "firewall": 0,
	         "alerts": [
	            {
	               "times": 16,
	               "sigid": 530,
	               "level": 0
	            },
	            {
	               "times": 2,
	               "sigid": 535,
	               "level": 1
	            },
	            {
	               "times": 1,
	               "sigid": 502,
	               "level": 3
	            },
	            {
	               "times": 4,
	               "sigid": 515,
	               "level": 0
	            },
	            {
	               "times": 3,
	               "sigid": 516,
	               "level": 3
	            }
	         ],
	         "totalAlerts": 26,
	         "syscheck": 10131,
	         "events": 10161
	      },
	      {
	         "hour": 15,
	         "firewall": 0,
	         "alerts": [
	            {
	               "times": 4,
	               "sigid": 5501,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 5521,
	               "level": 0
	            },
	            {
	               "times": 4,
	               "sigid": 5502,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 5522,
	               "level": 0
	            },
	            {
	               "times": 4,
	               "sigid": 5734,
	               "level": 0
	            },
	            {
	               "times": 4,
	               "sigid": 5715,
	               "level": 3
	            },
	            {
	               "times": 64,
	               "sigid": 530,
	               "level": 0
	            },
	            {
	               "times": 8,
	               "sigid": 535,
	               "level": 1
	            },
	            {
	               "times": 1,
	               "sigid": 502,
	               "level": 3
	            },
	            {
	               "times": 6,
	               "sigid": 515,
	               "level": 0
	            },
	            {
	               "times": 3,
	               "sigid": 516,
	               "level": 3
	            }
	         ],
	         "totalAlerts": 100,
	         "syscheck": 20263,
	         "events": 20385
	      },
	      {
	         "hour": 16,
	         "firewall": 0,
	         "alerts": [
	            {
	               "times": 14,
	               "sigid": 5501,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 5521,
	               "level": 0
	            },
	            {
	               "times": 14,
	               "sigid": 5502,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 5522,
	               "level": 0
	            },
	            {
	               "times": 14,
	               "sigid": 5734,
	               "level": 0
	            },
	            {
	               "times": 14,
	               "sigid": 5715,
	               "level": 3
	            },
	            {
	               "times": 79,
	               "sigid": 530,
	               "level": 0
	            },
	            {
	               "times": 1,
	               "sigid": 533,
	               "level": 7
	            },
	            {
	               "times": 10,
	               "sigid": 535,
	               "level": 1
	            },
	            {
	               "times": 2,
	               "sigid": 515,
	               "level": 0
	            },
	            {
	               "times": 17,
	               "sigid": 550,
	               "level": 7
	            }
	         ],
	         "totalAlerts": 167,
	         "syscheck": 10132,
	         "events": 10311
	      },
	      {
	         "hour": 17,
	         "firewall": 0,
	         "alerts": [
	            {
	               "times": 1,
	               "sigid": 5501,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 5521,
	               "level": 0
	            },
	            {
	               "times": 1,
	               "sigid": 5502,
	               "level": 3
	            },
	            {
	               "times": 1,
	               "sigid": 5522,
	               "level": 0
	            },
	            {
	               "times": 1,
	               "sigid": 5734,
	               "level": 0
	            },
	            {
	               "times": 1,
	               "sigid": 5715,
	               "level": 3
	            },
	            {
	               "times": 80,
	               "sigid": 530,
	               "level": 0
	            },
	            {
	               "times": 10,
	               "sigid": 535,
	               "level": 1
	            },
	            {
	               "times": 2,
	               "sigid": 515,
	               "level": 0
	            },
	            {
	               "times": 1340,
	               "sigid": 550,
	               "level": 7
	            },
	            {
	               "times": 17,
	               "sigid": 551,
	               "level": 7
	            }
	         ],
	         "totalAlerts": 1455,
	         "syscheck": 10121,
	         "events": 10248
	      }
	   ]
	}
	

Get manager stats by hour
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns OSSEC statistical information per hour. Each item in averages field represents the average of alerts per hour.

**Request**:

``GET`` ::

	/manager/stats/hourly

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/stats/hourly?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "averages": [
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0,
	         0
	      ],
	      "interactions": 0
	   }
	}
	

Get manager stats by week
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns OSSEC statistical information per week. Each item in <em>hours</em> field represents the average of alerts per hour and week day.

**Request**:

``GET`` ::

	/manager/stats/weekly

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/stats/weekly?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "Wed": {
	         "hours": [
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0
	         ],
	         "interactions": 0
	      },
	      "Sun": {
	         "hours": [
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0
	         ],
	         "interactions": 0
	      },
	      "Fri": {
	         "hours": [
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0
	         ],
	         "interactions": 0
	      },
	      "Tue": {
	         "hours": [
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0
	         ],
	         "interactions": 0
	      },
	      "Mon": {
	         "hours": [
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0
	         ],
	         "interactions": 0
	      },
	      "Thu": {
	         "hours": [
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0
	         ],
	         "interactions": 0
	      },
	      "Sat": {
	         "hours": [
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0,
	            0
	         ],
	         "interactions": 0
	      }
	   }
	}
	



Rootcheck
---------------------------------
Clear
+++++++++++++++++++++++++

Clear rootcheck database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears the rootcheck database for all agents.

**Request**:

``DELETE`` ::

	/rootcheck

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/rootcheck?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Policy and auditing database updated"
	}
	

Clear rootcheck database of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears the rootcheck database for an agent.

**Request**:

``DELETE`` ::

	/rootcheck/:agent_id

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/rootcheck/000?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Policy and auditing database updated"
	}
	


Database
+++++++++++++++++++++++++

Get last rootcheck scan
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Return the timestamp of the last rootcheck scan.

**Request**:

``GET`` ::

	/rootcheck/:agent_id/last_scan

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rootcheck/000/last_scan?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "rootcheckEndTime": "Unknown",
	      "rootcheckTime": "Unknown"
	   }
	}
	

Get rootcheck database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the rootcheck database of an agent.

**Request**:

``GET`` ::

	/rootcheck/:agent_id

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| offset             | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| limit              | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| sort               | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| search             | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rootcheck/000?offset=0&limit=2&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 0,
	      "items": []
	   }
	}
	


Run
+++++++++++++++++++++++++

Run rootcheck scan in all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs syscheck/rootcheck on all agents. This request has the same behavior that <code>PUT /syscheck</code>_. Due to OSSEC launches both processes at once.

**Request**:

``PUT`` ::

	/rootcheck

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/rootcheck?pretty"

**Example Response:**
::

	{
	   "error": 41,
	   "message": "Unable to connect to remoted"
	}
	

Run rootcheck scan in an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs syscheck/rootcheck on an agent. This request has the same behavior that <code>PUT /syscheck/:agent_id</code>_. Due to OSSEC launches both processes at once.

**Request**:

``PUT`` ::

	/rootcheck/:agent_id

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/rootcheck/000?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Restarting Syscheck/Rootcheck locally"
	}
	



Rules
---------------------------------
Info
+++++++++++++++++++++++++

Get all rules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all rules.

**Request**:

``GET`` ::

	/rules

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| offset             | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| limit              | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| sort               | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| search             | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| status             | String        | Filters files by status.                                                                                                                                                                               |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - enabled                                                                                                                                                                                              |
|                    |               | - disabled                                                                                                                                                                                             |
|                    |               | - all                                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| group              | String        | Filters file by group.                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| level              | Range         | Filters file by level. level=2 or level=2-5.                                                                                                                                                           |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| file               | String        | Filters by file name.                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| pci                | String        | Filters by pci requirement.                                                                                                                                                                            |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules?offset=0&limit=2&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 1543,
	      "items": [
	         {
	            "status": "enabled",
	            "pci": [],
	            "description": "Generic template for all syslog rules.",
	            "file": "rules_config.xml",
	            "level": 0,
	            "groups": [
	               "syslog"
	            ],
	            "id": 1,
	            "details": {
	               "category": "syslog",
	               "noalert": "1"
	            }
	         },
	         {
	            "status": "enabled",
	            "pci": [],
	            "description": "Generic template for all firewall rules.",
	            "file": "rules_config.xml",
	            "level": 0,
	            "groups": [
	               "firewall"
	            ],
	            "id": 2,
	            "details": {
	               "category": "firewall",
	               "noalert": "1"
	            }
	         }
	      ]
	   }
	}
	

Get files of rules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the files of all rules.

**Request**:

``GET`` ::

	/rules/files

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| offset             | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| limit              | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| sort               | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| search             | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| status             | String        | Filters files by status.                                                                                                                                                                               |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - enabled                                                                                                                                                                                              |
|                    |               | - disabled                                                                                                                                                                                             |
|                    |               | - all                                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/files?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 78,
	      "items": [
	         {
	            "status": "enabled",
	            "name": "amazon-ec2_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "name": "amazon-iam_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "name": "amazon_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "name": "apache_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "name": "apparmor_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "name": "arpwatch_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "name": "asterisk_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "name": "attack_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "name": "auditd_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "name": "cimserver_rules.xml"
	         }
	      ]
	   }
	}
	

Get rule groups
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the groups of all rules.

**Request**:

``GET`` ::

	/rules/groups

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| offset             | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| limit              | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| sort               | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| search             | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/groups?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 86,
	      "items": [
	         "access_control",
	         "access_denied",
	         "account_changed",
	         "active_response",
	         "adduser",
	         "agentless",
	         "arpwatch",
	         "asterisk",
	         "attacks",
	         "authentication_failed"
	      ]
	   }
	}
	

Get rule pci requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the PCI requirements of all rules.

**Request**:

``GET`` ::

	/rules/pci

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| offset             | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| limit              | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| sort               | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| search             | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/pci?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 22,
	      "items": [
	         "1.1.1",
	         "1.3.4",
	         "1.4",
	         "10.1",
	         "10.2.2",
	         "10.2.4",
	         "10.2.5",
	         "10.2.6",
	         "10.2.7",
	         "10.4"
	      ]
	   }
	}
	

Get rules by id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the rules with the specified id.

**Request**:

``GET`` ::

	/rules

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``id``             | Number        | rule.                                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| offset             | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| limit              | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| sort               | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| search             | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/1002?pretty"

**Example Response:**
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
	



Syscheck
---------------------------------
Clear
+++++++++++++++++++++++++

Clear syscheck database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears the syscheck database for all agents.

**Request**:

``DELETE`` ::

	/syscheck

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/syscheck?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Integrity check database updated"
	}
	

Clear syscheck database of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears the syscheck database for an agent.

**Request**:

``DELETE`` ::

	/syscheck/:agent_id

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/syscheck/000?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Integrity check database updated"
	}
	


Database
+++++++++++++++++++++++++

Get last syscheck scan
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Return the timestamp of the last syscheck scan.

**Request**:

``GET`` ::

	/syscheck/:agent_id/last_scan

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscheck/000/last_scan?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "syscheckTime": "Unknown",
	      "syscheckEndTime": "Unknown"
	   }
	}
	

Get syscheck files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the syscheck files of an agent.

**Request**:

``GET`` ::

	/syscheck/:agent_id/files

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| offset             | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| limit              | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| sort               | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| search             | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| event              | String        | Filters files by event.                                                                                                                                                                                |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - added                                                                                                                                                                                                |
|                    |               | - readded                                                                                                                                                                                              |
|                    |               | - modified                                                                                                                                                                                             |
|                    |               | - deleted                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| file               | String        | Filters file by filename.                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| filetype           | String        | Selects type of file.                                                                                                                                                                                  |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - file                                                                                                                                                                                                 |
|                    |               | - registry                                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| summary            | String        | Returns a summary where each item has: scanDate, modificationDate, event and file.                                                                                                                     |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - yes                                                                                                                                                                                                  |
|                    |               | - no                                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| md5                | String        | Returns the files with the specified md5 hash.                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| sha1               | String        | Returns the files with the specified sha1 hash.                                                                                                                                                        |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| hash               | String        | Returns the files with the specified hash (md5 or sha1).                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscheck/000/files?offset=0&limit=2&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 0,
	      "items": []
	   }
	}
	


Run
+++++++++++++++++++++++++

Run syscheck scan in all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs syscheck/rootcheck on all agents. This request has the same behavior that <code>PUT /rootcheck</code>_. Due to OSSEC launches both processes at once.

**Request**:

``PUT`` ::

	/syscheck

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/syscheck?pretty"

**Example Response:**
::

	{
	   "error": 41,
	   "message": "Unable to connect to remoted"
	}
	

Run syscheck scan in an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs syscheck/rootcheck on an agent. This request has the same behavior that <code>PUT /rootcheck/:agent_id</code>_. Due to OSSEC launches both processes at once.

**Request**:

``PUT`` ::

	/syscheck/:agent_id

**Parameters**:

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/syscheck/000?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Restarting Syscheck/Rootcheck locally"
	}
	



