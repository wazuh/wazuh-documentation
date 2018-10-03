
.. Copyright (C) 2018 Wazuh, Inc.
.. Do not modify this file manually. It is generated automatically.

.. _api_reference:

Reference
======================
This API reference is organized by resources:

* `Active_Response`_
* `Agents`_
* `Cache`_
* `Ciscat`_
* `Cluster`_
* `Decoders`_
* `Experimental`_
* `Manager`_
* `Rootcheck`_
* `Rules`_
* `Syscheck`_
* `Syscollector`_

Below is the `Request List`_ that shows all of the available requests.

.. _request_list:

Request List
---------------------------------

`Active_Response`_
	* PUT /active-response/:agent_id  (`Run an AR command in the agent`_)

`Agents`_
	* DELETE /agents  (`Delete agents`_)
	* DELETE /agents/:agent_id  (`Delete an agent`_)
	* DELETE /agents/:agent_id/group  (`Unset the agent group`_)
	* DELETE /agents/groups  (`Delete a list of groups`_)
	* DELETE /agents/groups/:group_id  (`Remove group`_)
	* GET /agents  (`Get all agents`_)
	* GET /agents/:agent_id  (`Get an agent`_)
	* GET /agents/:agent_id/key  (`Get agent key`_)
	* GET /agents/:agent_id/upgrade_result  (`Get upgrade result from agent`_)
	* GET /agents/groups  (`Get groups`_)
	* GET /agents/groups/:group_id  (`Get agents in a group`_)
	* GET /agents/groups/:group_id/configuration  (`Get group configuration`_)
	* GET /agents/groups/:group_id/files  (`Get group files`_)
	* GET /agents/groups/:group_id/files/:filename  (`Get a file in group`_)
	* GET /agents/name/:agent_name  (`Get an agent by its name`_)
	* GET /agents/no_group  (`Get agents without group`_)
	* GET /agents/outdated  (`Get outdated agents`_)
	* GET /agents/stats/distinct  (`Get distinct fields in agents`_)
	* GET /agents/summary  (`Get agents summary`_)
	* GET /agents/summary/os  (`Get OS summary`_)
	* POST /agents  (`Add agent`_)
	* POST /agents/insert  (`Insert agent`_)
	* POST /agents/restart  (`Restart a list of agents`_)
	* PUT /agents/:agent_id/group/:group_id  (`Set agent group`_)
	* PUT /agents/:agent_id/add_group/:group_id  (`Add agent group`_)
	* PUT /agents/:agent_id/restart  (`Restart an agent`_)
	* PUT /agents/:agent_id/upgrade  (`Upgrade agent using online repository`_)
	* PUT /agents/:agent_id/upgrade_custom  (`Upgrade agent using custom file`_)
	* PUT /agents/:agent_name  (`Add agent (quick method)`_)
	* PUT /agents/groups/:group_id  (`Create a group`_)
	* PUT /agents/restart  (`Restart all agents`_)

`Cache`_
	* DELETE /cache  (`Clear group cache`_)
	* DELETE /cache  (`Delete cache index`_)
	* GET /cache  (`Get cache index`_)
	* GET /cache/config  (`Return cache configuration`_)

`Ciscat`_
	* GET /ciscat/:agent_id/results  (`Get CIS-CAT results from an agent`_)

`Cluster`_
	* GET /cluster/config  (`Get the cluster configuration`_)
	* GET /cluster/healthcheck  (`Show cluster health`_)
	* GET /cluster/node  (`Get local node info`_)
	* GET /cluster/nodes  (`Get nodes info`_)
	* GET /cluster/nodes/:node_name  (`Get node info`_)
	* GET /cluster/status  (`Get info about cluster status`_)

`Decoders`_
	* GET /decoders  (`Get all decoders`_)
	* GET /decoders/:decoder_name  (`Get decoders by name`_)
	* GET /decoders/files  (`Get all decoders files`_)
	* GET /decoders/parents  (`Get all parent decoders`_)

`Experimental`_
	* GET /experimental/ciscat/results  (`Get CIS-CAT results`_)
	* GET /experimental/syscollector/hardware  (`Get hardware info of all agents`_)
	* GET /experimental/syscollector/netaddr  (`Get network address info of all agents`_)
	* GET /experimental/syscollector/netiface  (`Get network interface info of all agents`_)
	* GET /experimental/syscollector/netproto  (`Get network protocol info of all agents`_)
	* GET /experimental/syscollector/os  (`Get os info of all agents`_)
	* GET /experimental/syscollector/packages  (`Get packages info of all agents`_)
	* GET /experimental/syscollector/ports  (`Get ports info of all agents`_)
	* GET /experimental/syscollector/processes  (`Get processes info of all agents`_)

`Manager`_
	* GET /manager/configuration  (`Get manager configuration`_)
	* GET /manager/info  (`Get manager information`_)
	* GET /manager/logs  (`Get ossec.log`_)
	* GET /manager/logs/summary  (`Get summary of ossec.log`_)
	* GET /manager/stats  (`Get manager stats`_)
	* GET /manager/stats/hourly  (`Get manager stats by hour`_)
	* GET /manager/stats/weekly  (`Get manager stats by week`_)
	* GET /manager/status  (`Get manager status`_)

`Rootcheck`_
	* DELETE /rootcheck  (`Clear rootcheck database`_)
	* DELETE /rootcheck/:agent_id  (`Clear rootcheck database of an agent`_)
	* GET /rootcheck/:agent_id  (`Get rootcheck database`_)
	* GET /rootcheck/:agent_id/cis  (`Get rootcheck CIS requirements`_)
	* GET /rootcheck/:agent_id/last_scan  (`Get last rootcheck scan`_)
	* GET /rootcheck/:agent_id/pci  (`Get rootcheck pci requirements`_)
	* PUT /rootcheck  (`Run rootcheck scan in all agents`_)
	* PUT /rootcheck/:agent_id  (`Run rootcheck scan in an agent`_)

`Rules`_
	* GET /rules  (`Get all rules`_)
	* GET /rules/:rule_id  (`Get rules by id`_)
	* GET /rules/files  (`Get files of rules`_)
	* GET /rules/gdpr  (`Get rule gdpr requirements`_)
	* GET /rules/groups  (`Get rule groups`_)
	* GET /rules/pci  (`Get rule pci requirements`_)

`Syscheck`_
	* DELETE /syscheck  (`Clear syscheck database`_)
	* DELETE /syscheck/:agent_id  (`Clear syscheck database of an agent`_)
	* GET /syscheck/:agent_id  (`Get syscheck files`_)
	* GET /syscheck/:agent_id/last_scan  (`Get last syscheck scan`_)
	* PUT /syscheck  (`Run syscheck scan in all agents`_)
	* PUT /syscheck/:agent_id  (`Run syscheck scan in an agent`_)

`Syscollector`_
	* GET /syscollector/:agent_id/hardware  (`Get hardware info`_)
	* GET /syscollector/:agent_id/netaddr  (`Get network address info of an agent`_)
	* GET /syscollector/:agent_id/netiface  (`Get network interface info of an agent`_)
	* GET /syscollector/:agent_id/netproto  (`Get network protocol info of an agent`_)
	* GET /syscollector/:agent_id/os  (`Get os info`_)
	* GET /syscollector/:agent_id/packages  (`Get packages info`_)
	* GET /syscollector/:agent_id/ports  (`Get ports info of an agent`_)
	* GET /syscollector/:agent_id/processes  (`Get processes info`_)

Active_Response
----------------------------------------
Command
++++++++++++++++++++++++++++++++++++++++

Run an AR command in the agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs an Active Response command on a specified agent

**Request**:

``PUT`` ::

	/active-response/:agent_id

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``command``        | String        | Command.                                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``Custom``         | Boolean       | Custom.                                                                                                                                                                                                |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``Arguments``      | Arguments     | Command arguments.                                                                                                                                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT -d '{"command":"restart-ossec0", "arguments": ["-", "null", "(from_the_server)", "(no_rule_id)"]}' -H 'Content-Type:application/json' "https://127.0.0.1:55000/active-response/001?pretty"

**Example Response:**
::

	{
	    "data": "Command sent.", 
	    "error": 0
	}



Agents
----------------------------------------
Add
++++++++++++++++++++++++++++++++++++++++

Add agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Add a new agent.

**Request**:

``POST`` ::

	/agents

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``name``           | String        | Agent name.                                                                                                                                                                                            |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ip``             | String        | If this is not included, the API will get the IP automatically. If you are behind a proxy, you must set the option config.BehindProxyServer to yes at config.js.                                       |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - IP                                                                                                                                                                                                   |
|                    |               | - IP/NET                                                                                                                                                                                               |
|                    |               | - ANY                                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``force``          | Number        | Remove the old agent with the same IP if disconnected since <force> seconds.                                                                                                                           |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X POST -d '{"name":"NewHost","ip":"10.0.0.9"}' -H 'Content-Type:application/json' "https://127.0.0.1:55000/agents?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "id": "007",
	      "key": "MDA3IE5ld0hvc3QgMTAuMC4wLjkgZDcyMjliNjA1YTJjNzgzOGE0NjJmZTViMDZiYzI5NWJkMzQ5M2E3OTRkOTMyMDU1MzAzZTE3ZDBkN2I0MmM5Yw=="
	   }
	}
	

Add agent (quick method)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Adds a new agent with name :agent_name. This agent will use ANY as IP.

**Request**:

``PUT`` ::

	/agents/:agent_name

**Parameters:**

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
	   "data": {
	      "id": "008",
	      "key": "MDA4IG15TmV3QWdlbnQgYW55IGEzNGQ4YzFkMjkwZTcxNDA0MmMyNDhmNTcxYmU2NjliNTMzY2VmZDQ0NGY4MDk2MTBlYTVlZWI1YjU1OGQzMjY="
	   }
	}
	

Insert agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Insert an agent with an existing id and key.

**Request**:

``POST`` ::

	/agents/insert

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``name``           | String        | Agent name.                                                                                                                                                                                            |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ip``             | String        | If this is not included, the API will get the IP automatically. If you are behind a proxy, you must set the option config.BehindProxyServer to yes at config.js.                                       |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - IP                                                                                                                                                                                                   |
|                    |               | - IP/NET                                                                                                                                                                                               |
|                    |               | - ANY                                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``id``             | String        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``key``            | String        | Agent key. Minimum length: 64 characters. Allowed values: ^[a-zA-Z0-9]+$                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``force``          | Number        | Remove the old agent the with same IP if disconnected since <force> seconds.                                                                                                                           |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X POST -d '{"name":"NewHost_2","ip":"10.0.10.10","id":"123","key":"1abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghi64"}' -H 'Content-Type:application/json' "https://127.0.0.1:55000/agents/insert?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "id": "123",
	      "key": "1abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghi64"
	   }
	}
	


Delete
++++++++++++++++++++++++++++++++++++++++

Delete a list of groups
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Removes a list of groups.

**Request**:

``DELETE`` ::

	/agents/groups

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``ids``            | String[]      | Array of group ID's.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE -H "Content-Type:application/json" -d '{"ids":["webserver","database"]}' "https://127.0.0.1:55000/agents/groups?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "msg": "All selected groups were removed",
	      "ids": [
	         "webserver",
	         "database"
	      ],
	      "affected_agents": [
	         "002",
	         "003"
	      ]
	   }
	}
	

Delete agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Removes agents, using a list of them or a criterion based on the status or time of the last connection. The Wazuh API must be restarted after removing an agent.

**Request**:

``DELETE`` ::

	/agents

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``ids``            | String[]      | Array of agent ID's.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``purge``          | Boolean       | Delete an agent from the key store.                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``         | String        | Filters by agent status. Use commas to enter multiple statuses.                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - active                                                                                                                                                                                               |
|                    |               | - pending                                                                                                                                                                                              |
|                    |               | - neverconnected                                                                                                                                                                                       |
|                    |               | - disconnected                                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``older_than``     | String        | Filters out disconnected agents for longer than specified. Time in seconds, '[n_days]d', '[n_hours]h', '[n_minutes]m' or '[n_seconds]s'. For never connected agents, uses the register date.           |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE -H "Content-Type:application/json" -d '{"ids":["003","005"]}' "https://127.0.0.1:55000/agents?pretty&older_than=10s"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "msg": "All selected agents were removed",
	      "older_than": "10s",
	      "affected_agents": [
	         "003",
	         "005"
	      ],
	      "total_affected_agents": 2
	   }
	}
	

Delete an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Removes an agent.

**Request**:

``DELETE`` ::

	/agents/:agent_id

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``purge``          | String        | Delete an agent from the key store.                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/agents/008?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "msg": "All selected agents were removed",
	      "affected_agents": [
	         "008"
	      ]
	   }
	}
	


Groups
++++++++++++++++++++++++++++++++++++++++

Create a group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Creates a new group.

**Request**:

``PUT`` ::

	/agents/groups/:group_id

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``group_id``       | String        | Group ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/groups/pciserver?pretty"

**Example Response:**
::

	{
	   "error": 1711,
	   "message": "The group already exists: pciserver"
	}
	

Get a file in group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the specified file belonging to the group parsed to JSON.

**Request**:

``GET`` ::

	/agents/groups/:group_id/files/:filename

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``group_id``       | String        | Group ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file_name``      | String        | Filename                                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``           | String        | Type of file.                                                                                                                                                                                          |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - conf                                                                                                                                                                                                 |
|                    |               | - rootkit_files                                                                                                                                                                                        |
|                    |               | - rootkit_trojans                                                                                                                                                                                      |
|                    |               | - rcl                                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/groups/webserver/files/cis_debian_linux_rcl.txt?pretty"

**Example Response:**
::

	{
	    "data": {
	        "controls": [
	            {
	                "...": "..."
	            }, 
	            {
	                "condition": "all required", 
	                "name": "CIS - Testing against the CIS Debian Linux Benchmark v1", 
	                "reference": "CIS_Debian_Benchmark_v1.0pdf", 
	                "checks": [
	                    "f:/etc/debian_version;"
	                ]
	            }
	        ]
	    }, 
	    "error": 0
	}

Get agents in a group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the list of agents in a group.

**Request**:

``GET`` ::

	/agents/groups/:group_id

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``group_id``       | String        | Group ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``         | String        | Filters by agent status.                                                                                                                                                                               |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - active                                                                                                                                                                                               |
|                    |               | - pending                                                                                                                                                                                              |
|                    |               | - neverconnected                                                                                                                                                                                       |
|                    |               | - disconnected                                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/groups/dmz?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 2,
	      "items": [
	         {
	            "status": "Active",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00",
	            "group": "dmz",
	            "name": "ubuntu",
	            "mergedSum": "39d0eccd457fed75f151a8b4fa0e822d",
	            "ip": "192.168.185.7",
	            "node_name": "node01",
	            "dateAdd": "2018-09-06 14:39:46",
	            "version": "Wazuh v3.5.0",
	            "key": "91d271be7d5d7d1904ad9d5a98242b513dc6ac00502f591e8ececbc0953b9ec2",
	            "manager_host": "manager",
	            "lastKeepAlive": "2018-09-06 15:49:30",
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
	         },
	         {
	            "status": "Never connected",
	            "group": "dmz",
	            "name": "main_database",
	            "ip": "10.0.0.15",
	            "node_name": "unknown",
	            "dateAdd": "2018-09-06 15:48:50",
	            "key": "ba5ce03af43b8d3dc294f3a554cf1230882fbbb208a22abe7c3a3e1f42681c8d",
	            "id": "004"
	         }
	      ]
	   }
	}
	

Get agents without group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a list with the available agents without group.

**Request**:

``GET`` ::

	/agents/no_group

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/no_group?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 3,
	      "items": [
	         {
	            "status": "Never connected",
	            "dateAdd": "2018-09-06 15:48:56",
	            "name": "server002",
	            "key": "ee5e171fec35c94caff1068e6132f89b5c13e58256ee6c380022080da7d21f31",
	            "ip": "10.0.0.20",
	            "id": "006",
	            "node_name": "unknown"
	         },
	         {
	            "status": "Never connected",
	            "dateAdd": "2018-09-06 15:49:38",
	            "name": "NewHost",
	            "key": "d7229b605a2c7838a462fe5b06bc295bd3493a794d932055303e17d0d7b42c9c",
	            "ip": "10.0.0.9",
	            "id": "007",
	            "node_name": "unknown"
	         },
	         {
	            "status": "Never connected",
	            "dateAdd": "2018-09-06 15:49:38",
	            "name": "NewHost_2",
	            "key": "1abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghi64",
	            "ip": "10.0.10.10",
	            "id": "123",
	            "node_name": "unknown"
	         }
	      ]
	   }
	}
	

Get group configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the group configuration (agent.conf).

**Request**:

``GET`` ::

	/agents/groups/:group_id/configuration

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``group_id``       | String        | Group ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/groups/dmz/configuration?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 1,
	      "items": [
	         {
	            "config": {
	               "localfile": [
	                  {
	                     "log_format": "syslog",
	                     "location": "/var/log/linux.log"
	                  }
	               ]
	            },
	            "filters": {
	               "os": "Linux"
	            }
	         }
	      ]
	   }
	}
	

Get group files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the files belonging to the group.

**Request**:

``GET`` ::

	/agents/groups/:group_id/files

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``group_id``       | String        | Group ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/groups/default/files?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 24,
	      "items": [
	         {
	            "hash": "ab73af41699f13fdd81903b5f23d8d00",
	            "filename": "agent.conf"
	         },
	         {
	            "hash": "76d8be9b97d8eae4c239e530ee7e71c8",
	            "filename": "ar.conf"
	         },
	         {
	            "hash": "6d9bd718faff778bbeabada6f07f5c2f",
	            "filename": "cis_apache2224_rcl.txt"
	         },
	         {
	            "hash": "9beed128b4305943eead1a66a86d27d5",
	            "filename": "cis_debian_linux_rcl.txt"
	         },
	         {
	            "hash": "ee520e627150c8751493bc32540b859a",
	            "filename": "cis_mysql5-6_community_rcl.txt"
	         },
	         {
	            "hash": "672c92a1f57463e33ff14011b43727de",
	            "filename": "cis_mysql5-6_enterprise_rcl.txt"
	         },
	         {
	            "hash": "e03345360941dbff248f63765971f87e",
	            "filename": "cis_rhel5_linux_rcl.txt"
	         },
	         {
	            "hash": "d53e584559b759cb6ec3956f23dee46f",
	            "filename": "cis_rhel6_linux_rcl.txt"
	         },
	         {
	            "hash": "3b67c8b54d0fa8fdf5afa8d0d43398d8",
	            "filename": "cis_rhel7_linux_rcl.txt"
	         },
	         {
	            "hash": "24e83427d2678aada50fa401b921a0cd",
	            "filename": "cis_rhel_linux_rcl.txt"
	         },
	         {
	            "hash": "a3978c24aec520c4bcfb7db62bea41b9",
	            "filename": "cis_sles11_linux_rcl.txt"
	         },
	         {
	            "hash": "533ec3f8eda8e52edb181e3f6bd44d52",
	            "filename": "cis_sles12_linux_rcl.txt"
	         },
	         {
	            "hash": "6d762779c44dda24901673c0e715f5a9",
	            "filename": "cis_win2012r2_domainL1_rcl.txt"
	         },
	         {
	            "hash": "18ae1149bf2db6cc942d4fcb0f17a336",
	            "filename": "cis_win2012r2_domainL2_rcl.txt"
	         },
	         {
	            "hash": "5f0f6c9c40684b8cdac9bca1fa138ebc",
	            "filename": "cis_win2012r2_memberL1_rcl.txt"
	         },
	         {
	            "hash": "10b99529e86bedd78accce983eb402b5",
	            "filename": "cis_win2012r2_memberL2_rcl.txt"
	         },
	         {
	            "hash": "f1a9e24e02ba4cc5ea80a9d3feb3bb9a",
	            "filename": "merged.mg"
	         },
	         {
	            "hash": "a403c34392032ace267fbb163fc7cfad",
	            "filename": "rootkit_files.txt"
	         },
	         {
	            "hash": "b5d427623664d76140acbcb91f42d586",
	            "filename": "rootkit_trojans.txt"
	         },
	         {
	            "hash": "6cca8467c592a23fcf62cd5f33608fc3",
	            "filename": "system_audit_rcl.txt"
	         },
	         {
	            "hash": "e778eb44e4e8116a1e4c017b9b23eea2",
	            "filename": "system_audit_ssh.txt"
	         },
	         {
	            "hash": "0e1f8f16e217a70b9b80047646823587",
	            "filename": "win_applications_rcl.txt"
	         },
	         {
	            "hash": "4c2207e003d08db69822754271f9cb60",
	            "filename": "win_audit_rcl.txt"
	         },
	         {
	            "hash": "f9c3330533586eb380f294dcbd9918d8",
	            "filename": "win_malware_rcl.txt"
	         }
	      ]
	   }
	}
	

Get groups
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the list of existing agent groups.

**Request**:

``GET`` ::

	/agents/groups

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``hash``           | String        | Select algorithm to generate the sum.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/groups?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 3,
	      "items": [
	         {
	            "count": 1,
	            "mergedSum": "f1a9e24e02ba4cc5ea80a9d3feb3bb9a",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00",
	            "name": "default"
	         },
	         {
	            "count": 2,
	            "mergedSum": "dcfef4bf55b2989aad7bc057f5392fe5",
	            "configSum": "0d8a4be71bea9aa0c36f6c975ec5a1de",
	            "name": "dmz"
	         },
	         {
	            "count": 0,
	            "mergedSum": "01f8d7dcfae76fa0e5b1e39c0bacd3f7",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00",
	            "name": "pciserver"
	         }
	      ]
	   }
	}
	

Remove group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Removes the group. Agents that were assigned to the removed group will automatically revert to the 'default' group.

**Request**:

``DELETE`` ::

	/agents/groups/:group_id

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``group_id``       | String        | Group ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/agents/groups/dmz?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "msg": "All selected groups were removed",
	      "ids": [
	         "dmz"
	      ],
	      "affected_agents": [
	         "001",
	         "004"
	      ]
	   }
	}
	

Set agent group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Sets an agent to the specified group.

**Request**:

``PUT`` ::

	/agents/:agent_id/group/:group_id

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent unique ID.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group_id``       | String        | Group ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/004/group/webserver?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Group 'webserver' set to agent '004'."
	}

Add agent group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Add an agent to the specified group.

**Request**:

``PUT`` ::

	/agents/:agent_id/add_group/:group_id

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent unique ID.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group_id``       | String        | Group ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -X PUT "http://localhost:55000/agents/004/add_group/webserver?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Group 'webserver' added to agent '002'."
	}	


Unset the agent group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unsets the group of the agent. The agent will automatically revert to the 'default' group.

**Request**:

``DELETE`` ::

	/agents/:agent_id/group

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/agents/004/group?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Group unset for agent '004'."
	}
	


Info
++++++++++++++++++++++++++++++++++++++++

Get OS summary
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a summary of the OS.

**Request**:

``GET`` ::

	/agents/summary/os

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/summary/os?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 1,
	      "items": [
	         "ubuntu"
	      ]
	   }
	}
	

Get agents summary
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a summary of the available agents.

**Request**:

``GET`` ::

	/agents/summary

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/summary?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "Active": 2,
	      "Never connected": 5,
	      "Total": 7,
	      "Disconnected": 0
	   }
	}
	

Get all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a list with the available agents.

**Request**:

``GET`` ::

	/agents

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``         | String        | Filters by agent status. Use commas to enter multiple statuses.                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - active                                                                                                                                                                                               |
|                    |               | - pending                                                                                                                                                                                              |
|                    |               | - neverconnected                                                                                                                                                                                       |
|                    |               | - disconnected                                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``older_than``     | String        | Filters out disconnected agents for longer than specified. Time in seconds, '[n_days]d', '[n_hours]h', '[n_minutes]m' or '[n_seconds]s'. For never connected agents, uses the register date.           |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os.platform``    | String        | Filters by OS platform.                                                                                                                                                                                |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os.version``     | String        | Filters by OS version.                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``manager``        | String        | Filters by manager hostname to which agents are connected.                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``version``        | String        | Filters by agents version.                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group``          | String        | Filters by group of agents.                                                                                                                                                                            |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``node``           | String        | Filters by node name.                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents?pretty&offset=0&limit=5&sort=-ip,name"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 7,
	      "items": [
	         {
	            "status": "Active",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00",
	            "group": "default",
	            "name": "ubuntu",
	            "mergedSum": "5b1bb1912df41faa404e1dcd07ab34ad",
	            "ip": "192.168.185.7",
	            "node_name": "node01",
	            "dateAdd": "2018-09-06 14:39:46",
	            "version": "Wazuh v3.5.0",
	            "key": "91d271be7d5d7d1904ad9d5a98242b513dc6ac00502f591e8ececbc0953b9ec2",
	            "manager_host": "manager",
	            "lastKeepAlive": "2018-09-06 15:49:40",
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
	         },
	         {
	            "status": "Active",
	            "name": "manager",
	            "ip": "127.0.0.1",
	            "node_name": "node01",
	            "dateAdd": "2018-09-06 14:22:27",
	            "version": "Wazuh v3.6.1",
	            "manager_host": "manager",
	            "lastKeepAlive": "9999-12-31 23:59:59",
	            "os": {
	               "major": "18",
	               "name": "Ubuntu",
	               "uname": "Linux |manager |4.15.0-33-generic |#36-Ubuntu SMP Wed Aug 15 16:00:05 UTC 2018 |x86_64",
	               "platform": "ubuntu",
	               "version": "18.04 LTS",
	               "codename": "Bionic Beaver",
	               "arch": "x86_64",
	               "minor": "04"
	            },
	            "id": "000"
	         },
	         {
	            "status": "Never connected",
	            "dateAdd": "2018-09-06 15:49:38",
	            "name": "NewHost_2",
	            "key": "1abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghi64",
	            "ip": "10.0.10.10",
	            "id": "123",
	            "node_name": "unknown"
	         },
	         {
	            "status": "Never connected",
	            "dateAdd": "2018-09-06 15:49:38",
	            "name": "NewHost",
	            "key": "d7229b605a2c7838a462fe5b06bc295bd3493a794d932055303e17d0d7b42c9c",
	            "ip": "10.0.0.9",
	            "id": "007",
	            "node_name": "unknown"
	         },
	         {
	            "status": "Never connected",
	            "group": "default",
	            "name": "server001",
	            "ip": "10.0.0.62",
	            "node_name": "unknown",
	            "dateAdd": "2018-09-06 15:48:44",
	            "key": "99cb4219e25ea2a35054c7086759a9f48a030e7696384195d61968bd7d107bb7",
	            "id": "002"
	         }
	      ]
	   }
	}
	

Get an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns various information from an agent.

**Request**:

``GET`` ::

	/agents/:agent_id

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
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
	      "name": "manager",
	      "ip": "127.0.0.1",
	      "dateAdd": "2018-09-06 14:22:27",
	      "version": "Wazuh v3.6.1",
	      "manager_host": "manager",
	      "lastKeepAlive": "9999-12-31 23:59:59",
	      "os": {
	         "major": "18",
	         "name": "Ubuntu",
	         "platform": "ubuntu",
	         "uname": "Linux |manager |4.15.0-33-generic |#36-Ubuntu SMP Wed Aug 15 16:00:05 UTC 2018 |x86_64",
	         "version": "18.04 LTS",
	         "codename": "Bionic Beaver",
	         "arch": "x86_64",
	         "minor": "04"
	      },
	      "id": "000"
	   }
	}
	

Get an agent by its name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns various information from an agent called :agent_name.

**Request**:

``GET`` ::

	/agents/name/:agent_name

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_name``     | String        | Agent name.                                                                                                                                                                                            |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/name/NewHost?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "status": "Never connected",
	      "ip": "10.0.0.9",
	      "dateAdd": "2018-09-06 15:49:38",
	      "id": "007",
	      "name": "NewHost"
	   }
	}
	


Key
++++++++++++++++++++++++++++++++++++++++

Get agent key
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the key of an agent.

**Request**:

``GET`` ::

	/agents/:agent_id/key

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/004/key?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "MDA0IG1haW5fZGF0YWJhc2UgMTAuMC4wLjE1IGJhNWNlMDNhZjQzYjhkM2RjMjk0ZjNhNTU0Y2YxMjMwODgyZmJiYjIwOGEyMmFiZTdjM2EzZTFmNDI2ODFjOGQ="
	}
	


Restart
++++++++++++++++++++++++++++++++++++++++

Restart a list of agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Restarts a list of agents.

**Request**:

``POST`` ::

	/agents/restart

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``ids``            | String[]      | Array of agent ID's.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X POST -H "Content-Type:application/json" -d '{"ids":["002","004"]}' "https://127.0.0.1:55000/agents/restart?pretty"

**Example Response:**
::

	{
	    "data": "All selected agents were restarted", 
	    "error": 0
	}

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
	    "data": "Restarting all agents", 
	    "error": 0
	}

Restart an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Restarts the specified agent.

**Request**:

``PUT`` ::

	/agents/:agent_id/restart

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent unique ID.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/007/restart?pretty"

**Example Response:**
::

	{
	    "data": "Restarting agent", 
	    "error": 0
	}


Stats
++++++++++++++++++++++++++++++++++++++++

Get distinct fields in agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all the different combinations that agents have for the selected fields. It also indicates the total number of agents that have each combination.

**Request**:

``GET`` ::

	/agents/stats/distinct

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``fields``         | String        | List of fields affecting the operation.                                                                                                                                                                |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/stats/distinct?pretty&fields=os.platform"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 2,
	      "items": [
	         {
	            "count": 2,
	            "os": {
	               "platform": "ubuntu"
	            }
	         },
	         {
	            "count": 5,
	            "os": {
	               "platform": null
	            }
	         }
	      ]
	   }
	}
	


Upgrade
++++++++++++++++++++++++++++++++++++++++

Get outdated agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the list of outdated agents.

**Request**:

``GET`` ::

	/agents/outdated

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/outdated?pretty"

**Example Response:**
::

	{
	    "data": {
	        "totalItems": 2, 
	        "items": [
	            {
	                "version": "Wazuh v3.0.0", 
	                "id": "003", 
	                "name": "main_database"
	            }, 
	            {
	                "version": "Wazuh v3.0.0", 
	                "id": "004", 
	                "name": "dmz002"
	            }
	        ]
	    }, 
	    "error": 0
	}

Get upgrade result from agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the upgrade result from an agent.

**Request**:

``GET`` ::

	/agents/:agent_id/upgrade_result

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``timeout``        | Number        | Seconds to wait for the agent to respond.                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/003/upgrade_result?pretty"

**Example Response:**
::

	{
	    "data": "Agent upgraded successfully", 
	    "error": 0
	}

Upgrade agent using custom file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Upgrade the agent using a custom file.

**Request**:

``PUT`` ::

	/agents/:agent_id/upgrade_custom

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent unique ID.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file_path``      | String        | WPK file path.                                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``installer``      | String        | Installation script.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/002/upgrade_custom?pretty"

**Example Response:**
::

	{
	    "data": "Installation started", 
	    "error": 0
	}

Upgrade agent using online repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Upgrade the agent using a WPK file from online repository.

**Request**:

``PUT`` ::

	/agents/:agent_id/upgrade

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent unique ID.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``wpk_repo``       | String        | WPK repository.                                                                                                                                                                                        |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``version``        | String        | Wazuh version.                                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``use_http``       | Boolean       | Use protocol http. If it's false use https. By default the value is set to false.                                                                                                                      |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``force``          | number        | Force upgrade.                                                                                                                                                                                         |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - 0                                                                                                                                                                                                    |
|                    |               | - 1                                                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/002/upgrade?pretty"

**Example Response:**
::

	{
	    "data": "Upgrade procedure started", 
	    "error": 0
	}



Cache
----------------------------------------
Delete
++++++++++++++++++++++++++++++++++++++++

Clear group cache
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears cache of the specified group.

**Request**:

``DELETE`` ::

	/cache

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``group``          | String        | cache group.                                                                                                                                                                                           |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/cache/mygroup?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "all": [
	         "/agents?pretty&offset=0&limit=5&sort=-ip,name",
	         "/agents/000?pretty",
	         "/agents/name/NewHost?pretty",
	         "/agents/stats/distinct?pretty&fields=os.platform"
	      ],
	      "groups": {
	         "agents": [
	            "/agents?pretty&offset=0&limit=5&sort=-ip,name",
	            "/agents/000?pretty",
	            "/agents/name/NewHost?pretty"
	         ],
	         "manager": [
	            "/agents/stats/distinct?pretty&fields=os.platform"
	         ]
	      }
	   }
	}
	

Delete cache index
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears entire cache.

**Request**:

``DELETE`` ::

	/cache

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/cache?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "all": [],
	      "groups": {}
	   }
	}
	


Info
++++++++++++++++++++++++++++++++++++++++

Get cache index
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns current cache index.

**Request**:

``GET`` ::

	/cache

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cache?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "all": [],
	      "groups": {}
	   }
	}
	

Return cache configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns cache configuration.

**Request**:

``GET`` ::

	/cache/config

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cache/config?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "debug": false,
	      "defaultDuration": 750,
	      "enabled": true,
	      "appendKey": [],
	      "jsonp": false,
	      "redisClient": false
	   }
	}
	



Ciscat
----------------------------------------
Results
++++++++++++++++++++++++++++++++++++++++

Get CIS-CAT results from an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's ciscat results info

**Request**:

``GET`` ::

	/ciscat/:agent_id/results

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``benchmark``      | String        | Filters by benchmark.                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``profile``        | String        | Filters by evaluated profile.                                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pass``           | Number        | Filters by passed checks.                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``fail``           | Number        | Filters by failed checks.                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``error``          | Number        | Filters by encountered errors.                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``notchecked``     | Number        | Filters by not checked.                                                                                                                                                                                |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``unknown``        | Number        | Filters by unknown results.                                                                                                                                                                            |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``score``          | Number        | Filters by final score.                                                                                                                                                                                |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/ciscat/000/results?pretty&sort=-score"

**Example Response:**
::

	{
	    "data": {
	        "totalItems": 2, 
	        "items": [
	            {
	                "profile": "xccdf_org.cisecurity.benchmarks_profile_Level_2_-_Server", 
	                "score": 57, 
	                "error": 0, 
	                "scan": {
	                    "id": 1406741147, 
	                    "time": "2018-09-06T07:50:15.632-07:00"
	                }, 
	                "fail": 79, 
	                "benchmark": "CIS Ubuntu Linux 16.04 LTS Benchmark", 
	                "pass": 104, 
	                "notchecked": 36, 
	                "unknown": 1
	            }, 
	            {
	                "profile": "xccdf_org.cisecurity.benchmarks_profile_Level_1_-_Workstation", 
	                "score": 64, 
	                "error": 0, 
	                "scan": {
	                    "id": 1406741147, 
	                    "time": "2018-09-06T07:50:52.630-07:00"
	                }, 
	                "fail": 53, 
	                "benchmark": "CIS Ubuntu Linux 16.04 LTS Benchmark", 
	                "pass": 96, 
	                "notchecked": 71, 
	                "unknown": 0
	            }
	        ]
	    }, 
	    "error": 0
	}



Cluster
----------------------------------------
Configuration
++++++++++++++++++++++++++++++++++++++++

Get the cluster configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the cluster configuration

**Request**:

``GET`` ::

	/cluster/config

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/config?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "disabled": "no",
	      "hidden": "no",
	      "name": "wazuh",
	      "node_name": "node01",
	      "bind_addr": "0.0.0.0",
	      "node_type": "master",
	      "key": "cc136bfbe415cdaa49dcfac1eaaa0743",
	      "nodes": [
	         "192.168.185.4"
	      ],
	      "port": 1516
	   }
	}
	


Info
++++++++++++++++++++++++++++++++++++++++

Get info about cluster status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns whether the cluster is enabled or disabled

**Request**:

``GET`` ::

	/cluster/status

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/status?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "running": "yes",
	      "enabled": "yes"
	   }
	}
	

Show cluster health
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Show cluster health

**Request**:

``GET`` ::

	/cluster/healthcheck

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``node``           | String        | Filter information by node name. *                                                                                                                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/healthcheck?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "nodes": {
	         "node02": {
	            "info": {
	               "ip": "192.168.185.5",
	               "version": "3.6.1",
	               "type": "worker",
	               "name": "node02",
	               "n_active_agents": 0
	            },
	            "status": {
	               "last_sync_agentinfo": {
	                  "date_start_master": "2018-09-06 15:49:23.33",
	                  "date_end_master": "2018-09-06 15:49:23.33",
	                  "total_agentinfo": 1
	               },
	               "sync_integrity_free": true,
	               "last_sync_agentgroups": {
	                  "date_end_master": "n/a",
	                  "total_agentgroups": 0,
	                  "date_start_master": "n/a"
	               },
	               "last_sync_integrity": {
	                  "total_files": {
	                     "shared": 1,
	                     "missing": 1,
	                     "extra_valid": 0,
	                     "extra": 0
	                  },
	                  "date_end_master": "2018-09-06 15:49:19.79",
	                  "date_start_master": "2018-09-06 15:49:18.68"
	               },
	               "sync_agentinfo_free": true,
	               "sync_extravalid_free": true
	            }
	         },
	         "node01": {
	            "info": {
	               "ip": "192.168.185.4",
	               "version": "3.6.1",
	               "type": "master",
	               "name": "node01",
	               "n_active_agents": 2
	            }
	         }
	      },
	      "n_connected_nodes": 2
	   }
	}
	


Nodes
++++++++++++++++++++++++++++++++++++++++

Get local node info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the local node info

**Request**:

``GET`` ::

	/cluster/node

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/node?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "node": "node01",
	      "cluster": "wazuh",
	      "type": "master"
	   }
	}
	

Get node info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the node info

**Request**:

``GET`` ::

	/cluster/nodes/:node_name

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/nodes/node01?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "ip": "192.168.185.4",
	      "version": "3.6.1",
	      "type": "master",
	      "name": "node01"
	   }
	}
	

Get nodes info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the nodes info

**Request**:

``GET`` ::

	/cluster/nodes

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``           | String        | Filters by node type. *                                                                                                                                                                                |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/nodes?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 2,
	      "items": [
	         {
	            "ip": "192.168.185.5",
	            "version": "3.6.1",
	            "type": "worker",
	            "name": "node02"
	         },
	         {
	            "ip": "192.168.185.4",
	            "version": "3.6.1",
	            "type": "master",
	            "name": "node01"
	         }
	      ]
	   }
	}
	



Decoders
----------------------------------------
Info
++++++++++++++++++++++++++++++++++++++++

Get all decoders
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all decoders included in ossec.conf.

**Request**:

``GET`` ::

	/decoders

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``           | String        | Filters by filename.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``           | String        | Filters by path.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``         | String        | Filters the decoders by status.                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - enabled                                                                                                                                                                                              |
|                    |               | - disabled                                                                                                                                                                                             |
|                    |               | - all                                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/decoders?pretty&offset=0&limit=2&sort=+file,position"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 570,
	      "items": [
	         {
	            "status": "enabled",
	            "name": "wazuh",
	            "details": {
	               "prematch": "^wazuh: "
	            },
	            "file": "0005-wazuh_decoders.xml",
	            "position": 0,
	            "path": "/var/ossec/ruleset/decoders"
	         },
	         {
	            "status": "enabled",
	            "name": "agent-buffer",
	            "details": {
	               "regex": "^ '(\\S+)'.",
	               "prematch": "^Agent buffer:",
	               "parent": "wazuh",
	               "order": "level"
	            },
	            "file": "0005-wazuh_decoders.xml",
	            "position": 1,
	            "path": "/var/ossec/ruleset/decoders"
	         }
	      ]
	   }
	}
	

Get all decoders files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all decoders files included in ossec.conf.

**Request**:

``GET`` ::

	/decoders/files

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``         | String        | Filters the decoders by status.                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - enabled                                                                                                                                                                                              |
|                    |               | - disabled                                                                                                                                                                                             |
|                    |               | - all                                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``           | String        | Filters by filename.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``           | String        | Filters by path.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``download``       | String        | Downloads the file                                                                                                                                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/decoders/files?pretty&offset=0&limit=10&sort=-path"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 95,
	      "items": [
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0180-openbsd_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0120-horde_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0315-su_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0410-docker_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0175-ntpd_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0050-checkpoint_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0165-netscreen_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0205-pam_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0405-mongodb_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0210-pix_decoders.xml"
	         }
	      ]
	   }
	}
	

Get all parent decoders
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all parent decoders included in ossec.conf

**Request**:

``GET`` ::

	/decoders/parents

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/decoders/parents?pretty&offset=0&limit=2&sort=-file"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 152,
	      "items": [
	         {
	            "status": "enabled",
	            "name": "local_decoder_example",
	            "details": {
	               "program_name": "local_decoder_example"
	            },
	            "file": "local_decoder.xml",
	            "position": 0,
	            "path": "/var/ossec/etc/decoders"
	         },
	         {
	            "status": "enabled",
	            "name": "kes_parent",
	            "details": {
	               "program_name": "kes"
	            },
	            "file": "0460-kaspersky_decoders.xml",
	            "position": 0,
	            "path": "/var/ossec/ruleset/decoders"
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

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``decoder_name``   | String        | Decoder name.                                                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
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
	            "status": "enabled",
	            "name": "apache-errorlog",
	            "details": {
	               "program_name": "^apache2|^httpd"
	            },
	            "file": "0025-apache_decoders.xml",
	            "position": 0,
	            "path": "/var/ossec/ruleset/decoders"
	         },
	         {
	            "status": "enabled",
	            "name": "apache-errorlog",
	            "details": {
	               "prematch": "^[warn] |^[notice] |^[error] "
	            },
	            "file": "0025-apache_decoders.xml",
	            "position": 1,
	            "path": "/var/ossec/ruleset/decoders"
	         },
	         {
	            "status": "enabled",
	            "name": "apache-errorlog",
	            "details": {
	               "prematch": "^[\\w+ \\w+ \\d+ \\d+:\\d+:\\d+.\\d+ \\d+] [\\S+:warn] |^[\\w+ \\w+ \\d+ \\d+:\\d+:\\d+.\\d+ \\d+] [\\S+:notice] |^[\\w+ \\w+ \\d+ \\d+:\\d+:\\d+.\\d+ \\d+] [\\S*:error] |^[\\w+ \\w+ \\d+ \\d+:\\d+:\\d+.\\d+ \\d+] [\\S+:info] "
	            },
	            "file": "0025-apache_decoders.xml",
	            "position": 2,
	            "path": "/var/ossec/ruleset/decoders"
	         }
	      ]
	   }
	}
	



Experimental
----------------------------------------
Hardware
++++++++++++++++++++++++++++++++++++++++

Get hardware info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's hardware info

**Request**:

``GET`` ::

	/experimental/syscollector/hardware

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ram_free``       | String        | Filters by ram_free.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ram_total``      | String        | Filters by ram_total.                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cpu_cores``      | String        | Filters by cpu_cores.                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cpu_mhz``        | String        | Filters by cpu_mhz.                                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cpu_name``       | String        | Filters by cpu_name.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``board_serial``   | String        | Filters by board_serial.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/hardware?pretty&sort=-ram_free"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 2,
	      "items": [
	         {
	            "board_serial": "0",
	            "agent_id": "000",
	            "ram": {
	               "usage": 15,
	               "total": 5437308,
	               "free": 4631152
	            },
	            "cpu": {
	               "cores": 2,
	               "mhz": 1992,
	               "name": "Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz"
	            },
	            "scan": {
	               "id": 2094097878,
	               "time": "2018/09/06 15:46:55"
	            }
	         },
	         {
	            "board_serial": "0",
	            "agent_id": "001",
	            "ram": {
	               "usage": 74,
	               "total": 1015976,
	               "free": 272340
	            },
	            "cpu": {
	               "cores": 1,
	               "mhz": 1992,
	               "name": "Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz"
	            },
	            "scan": {
	               "id": 2134810342,
	               "time": "2018/09/06 08:43:30"
	            }
	         }
	      ]
	   }
	}
	


Netaddr
++++++++++++++++++++++++++++++++++++++++

Get network address info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network address info

**Request**:

``GET`` ::

	/experimental/syscollector/netaddr

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``id``             | String        | Filters by id.                                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``proto``          | String        | Filters by proto.                                                                                                                                                                                      |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``address``        | String        | Filters by address.                                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``broadcast``      | String        | Filters by broadcast.                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``netmask``        | String        | Filters by netmask.                                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/netaddr?pretty&limit=2&sort=proto"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 8,
	      "items": [
	         {
	            "scan_id": 1034745317,
	            "agent_id": "000",
	            "proto": "ipv6",
	            "address": "fe80::a00:27ff:fe21:a579",
	            "netmask": "ffff:ffff:ffff:ffff::",
	            "id": 33
	         },
	         {
	            "scan_id": 1034745317,
	            "agent_id": "000",
	            "proto": "ipv6",
	            "address": "fe80::a00:27ff:feda:1fa3",
	            "netmask": "ffff:ffff:ffff:ffff::",
	            "id": 34
	         }
	      ]
	   }
	}
	


Netiface
++++++++++++++++++++++++++++++++++++++++

Get network interface info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network interface info

**Request**:

``GET`` ::

	/experimental/syscollector/netiface

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``id``             | String        | Filters by id.                                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``           | String        | Filters by name.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``adapter``        | String        | Filters by adapter.                                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``           | String        | Filters by type.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``          | String        | Filters by state.                                                                                                                                                                                      |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``mtu``            | String        | Filters by mtu.                                                                                                                                                                                        |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_packets``     | String        | Filters by tx_packets.                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_packets``     | String        | Filters by rx_packets.                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_bytes``       | String        | Filters by tx_bytes.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_bytes``       | String        | Filters by rx_bytes.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_errors``      | String        | Filters by tx_errors.                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_errors``      | String        | Filters by rx_errors.                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_dropped``     | String        | Filters by tx_dropped.                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_dropped``     | String        | Filters by rx_dropped.                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/netiface?pretty&limit=2&sort=rx_bytes"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 4,
	      "items": [
	         {
	            "name": "enp0s3",
	            "tx": {
	               "packets": 94,
	               "errors": 0,
	               "bytes": 9162,
	               "dropped": 0
	            },
	            "scan": {
	               "id": 1034745317,
	               "time": "2018/09/06 15:46:55"
	            },
	            "rx": {
	               "packets": 85,
	               "errors": 0,
	               "bytes": 18594,
	               "dropped": 0
	            },
	            "mac": "08:00:27:21:A5:79",
	            "mtu": 1500,
	            "state": "up",
	            "agent_id": "000",
	            "type": "ethernet",
	            "id": 33
	         },
	         {
	            "name": "enp0s8",
	            "tx": {
	               "packets": 12566,
	               "errors": 0,
	               "bytes": 2617973,
	               "dropped": 0
	            },
	            "scan": {
	               "id": 1034745317,
	               "time": "2018/09/06 15:46:55"
	            },
	            "rx": {
	               "packets": 18832,
	               "errors": 0,
	               "bytes": 4316932,
	               "dropped": 0
	            },
	            "mac": "08:00:27:DA:1F:A3",
	            "mtu": 1500,
	            "state": "up",
	            "agent_id": "000",
	            "type": "ethernet",
	            "id": 34
	         }
	      ]
	   }
	}
	


Netproto
++++++++++++++++++++++++++++++++++++++++

Get network protocol info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network protocol info

**Request**:

``GET`` ::

	/experimental/syscollector/netproto

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``id``             | String        | Filters by id.                                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``iface``          | String        | Filters by iface.                                                                                                                                                                                      |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``           | String        | Filters by type.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``gateway``        | String        | Filters by gateway.                                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``dhcp``           | String        | Filters by dhcp.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/netproto?pretty&limit=2&sort=type"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 8,
	      "items": [
	         {
	            "scan_id": 1034745317,
	            "iface": "enp0s3",
	            "agent_id": "000",
	            "dhcp": "enabled",
	            "type": "ipv6",
	            "id": 33
	         },
	         {
	            "scan_id": 1034745317,
	            "iface": "enp0s8",
	            "agent_id": "000",
	            "dhcp": "enabled",
	            "type": "ipv6",
	            "id": 34
	         }
	      ]
	   }
	}
	


OS
++++++++++++++++++++++++++++++++++++++++

Get os info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's os info

**Request**:

``GET`` ::

	/experimental/syscollector/os

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os_name``        | String        | Filters by os_name.                                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``architecture``   | String        | Filters by architecture.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os_version``     | String        | Filters by os_version.                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``version``        | String        | Filters by version.                                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``release``        | String        | Filters by release.                                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/os?pretty&sort=-os_name"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 2,
	      "items": [
	         {
	            "sysname": "Linux",
	            "scan": {
	               "id": 1226446053,
	               "time": "2018/09/06 15:46:55"
	            },
	            "hostname": "manager",
	            "version": "#36-Ubuntu SMP Wed Aug 15 16:00:05 UTC 2018",
	            "agent_id": "000",
	            "release": "4.15.0-33-generic",
	            "os": {
	               "major": "18",
	               "name": "Ubuntu",
	               "platform": "ubuntu",
	               "version": "18.04 LTS (Bionic Beaver)",
	               "codename": "Bionic Beaver",
	               "minor": "04"
	            },
	            "architecture": "x86_64"
	         },
	         {
	            "sysname": "Linux",
	            "scan": {
	               "id": 372297073,
	               "time": "2018/09/06 08:43:30"
	            },
	            "hostname": "ubuntu",
	            "version": "#157-Ubuntu SMP Thu Jul 12 15:51:36 UTC 2018",
	            "agent_id": "001",
	            "release": "4.4.0-131-generic",
	            "os": {
	               "major": "16",
	               "name": "Ubuntu",
	               "platform": "ubuntu",
	               "version": "16.04.5 LTS (Xenial Xerus)",
	               "codename": "Xenial Xerus",
	               "minor": "04"
	            },
	            "architecture": "x86_64"
	         }
	      ]
	   }
	}
	


Packages
++++++++++++++++++++++++++++++++++++++++

Get packages info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's packages info

**Request**:

``GET`` ::

	/experimental/syscollector/packages

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``vendor``         | String        | Filters by vendor.                                                                                                                                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``           | String        | Filters by name.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``architecture``   | String        | Filters by architecture.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``format``         | String        | Filters by format.                                                                                                                                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/packages?pretty&sort=-name&limit=2&offset=4"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 1035,
	      "items": [
	         {
	            "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
	            "name": "apparmor",
	            "scan": {
	               "id": 538049180,
	               "time": "2018/09/06 15:46:55"
	            },
	            "section": "admin",
	            "format": "deb",
	            "architecture": "amd64",
	            "priority": "optional",
	            "version": "2.12-4ubuntu5",
	            "agent_id": "000",
	            "size": 1848,
	            "description": "user-space parser utility for AppArmor"
	         },
	         {
	            "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
	            "name": "amd64-microcode",
	            "scan": {
	               "id": 538049180,
	               "time": "2018/09/06 15:46:55"
	            },
	            "section": "non-free/admin",
	            "format": "deb",
	            "architecture": "amd64",
	            "priority": "standard",
	            "version": "3.20180524.1~ubuntu0.18.04.2",
	            "agent_id": "000",
	            "size": 75,
	            "description": "Processor microcode firmware for AMD CPUs"
	         }
	      ]
	   }
	}
	


Ports
++++++++++++++++++++++++++++++++++++++++

Get ports info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's ports info

**Request**:

``GET`` ::

	/experimental/syscollector/ports

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pid``            | Number        | Filters by pid.                                                                                                                                                                                        |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``protocol``       | String        | Filters by protocol.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``local_ip``       | String        | Filters by local_ip.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``local_port``     | Number        | Filters by local_port.                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``remote_ip``      | String        | Filters by remote_ip.                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_queue``       | Number        | Filters by tx_queue.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``          | String        | Filters by state.                                                                                                                                                                                      |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/ports?pretty&limit=2&sort=protocol"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 13,
	      "items": [
	         {
	            "remote": {
	               "ip": "::",
	               "port": 0
	            },
	            "scan": {
	               "id": 349352305,
	               "time": "2018/09/06 15:47:01"
	            },
	            "inode": 18018,
	            "state": "listening",
	            "tx_queue": 0,
	            "agent_id": "000",
	            "protocol": "tcp6",
	            "rx_queue": 0,
	            "local": {
	               "ip": "::",
	               "port": 22
	            }
	         },
	         {
	            "remote": {
	               "ip": "::",
	               "port": 0
	            },
	            "scan": {
	               "id": 349352305,
	               "time": "2018/09/06 15:47:01"
	            },
	            "inode": 36180,
	            "state": "listening",
	            "tx_queue": 0,
	            "agent_id": "000",
	            "protocol": "tcp6",
	            "rx_queue": 0,
	            "local": {
	               "ip": "::",
	               "port": 55000
	            }
	         }
	      ]
	   }
	}
	


Processes
++++++++++++++++++++++++++++++++++++++++

Get processes info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's processes info

**Request**:

``GET`` ::

	/experimental/syscollector/processes

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pid``            | Number        | Filters by process pid.                                                                                                                                                                                |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``egroup``         | String        | Filters by process egroup.                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``euser``          | String        | Filters by process euser.                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``fgroup``         | String        | Filters by process fgroup.                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``nlwp``           | Number        | Filters by process nlwp.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pgrp``           | Number        | Filters by process pgrp.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``priority``       | Number        | Filters by process priority.                                                                                                                                                                           |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rgroup``         | String        | Filters by process rgroup.                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ruser``          | String        | Filters by process ruser.                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sgroup``         | String        | Filters by process sgroup.                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``suser``          | String        | Filters by process suser.                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/processes?pretty&limit=2&sort=priority"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 223,
	      "items": [
	         {
	            "euser": "root",
	            "tty": 0,
	            "rgroup": "root",
	            "sgroup": "root",
	            "scan": {
	               "id": 968408826,
	               "time": "2018/09/06 15:47:01"
	            },
	            "resident": 0,
	            "share": 0,
	            "start_time": 2,
	            "pid": "28",
	            "session": 0,
	            "stime": 0,
	            "vm_size": 0,
	            "size": 0,
	            "agent_id": "000",
	            "ppid": 2,
	            "egroup": "root",
	            "name": "ksmd",
	            "pgrp": 0,
	            "tgid": 28,
	            "utime": 0,
	            "priority": 25,
	            "fgroup": "root",
	            "state": "S",
	            "ruser": "root",
	            "suser": "root",
	            "nlwp": 1,
	            "processor": 1,
	            "nice": 5
	         },
	         {
	            "euser": "root",
	            "tty": 0,
	            "rgroup": "root",
	            "sgroup": "root",
	            "scan": {
	               "id": 968408826,
	               "time": "2018/09/06 15:47:01"
	            },
	            "resident": 0,
	            "share": 0,
	            "start_time": 2,
	            "pid": "29",
	            "session": 0,
	            "stime": 0,
	            "vm_size": 0,
	            "size": 0,
	            "agent_id": "000",
	            "ppid": 2,
	            "egroup": "root",
	            "name": "khugepaged",
	            "pgrp": 0,
	            "tgid": 29,
	            "utime": 0,
	            "priority": 39,
	            "fgroup": "root",
	            "state": "S",
	            "ruser": "root",
	            "suser": "root",
	            "nlwp": 1,
	            "processor": 1,
	            "nice": 19
	         }
	      ]
	   }
	}
	


Results
++++++++++++++++++++++++++++++++++++++++

Get CIS-CAT results
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's ciscat results info

**Request**:

``GET`` ::

	/experimental/ciscat/results

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``benchmark``      | String        | Filters by benchmark.                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``profile``        | String        | Filters by evaluated profile.                                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pass``           | Number        | Filters by passed checks.                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``fail``           | Number        | Filters by failed checks.                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``error``          | Number        | Filters by encountered errors.                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``notchecked``     | Number        | Filters by not checked.                                                                                                                                                                                |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``unknown``        | Number        | Filters by unknown results.                                                                                                                                                                            |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``score``          | Number        | Filters by final score.                                                                                                                                                                                |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/ciscat/results?pretty&sort=-score"

**Example Response:**
::

	{
	    "data": {
	        "totalItems": 2, 
	        "items": [
	            {
	                "profile": "xccdf_org.cisecurity.benchmarks_profile_Level_1_-_Workstation", 
	                "score": 64, 
	                "agent_id": "001", 
	                "error": 0, 
	                "scan": {
	                    "id": 1260865673, 
	                    "time": "2018-09-06T07:59:25.682-07:00"
	                }, 
	                "fail": 53, 
	                "benchmark": "CIS Ubuntu Linux 16.04 LTS Benchmark", 
	                "pass": 96, 
	                "notchecked": 71, 
	                "unknown": 0
	            }, 
	            {
	                "profile": "xccdf_org.cisecurity.benchmarks_profile_Level_2_-_Server", 
	                "score": 57, 
	                "agent_id": "001", 
	                "error": 0, 
	                "scan": {
	                    "id": 1260865673, 
	                    "time": "2018-09-06T07:58:39.342-07:00"
	                }, 
	                "fail": 79, 
	                "benchmark": "CIS Ubuntu Linux 16.04 LTS Benchmark", 
	                "pass": 104, 
	                "notchecked": 36, 
	                "unknown": 1
	            }
	        ]
	    }, 
	    "error": 0
	}



Manager
----------------------------------------
Configuration
++++++++++++++++++++++++++++++++++++++++

Get manager configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns ossec.conf in JSON format.

**Request**:

``GET`` ::

	/manager/configuration

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``section``        | String        | Indicates the ossec.conf section: global, rules, syscheck, rootcheck, remote, alerts, command, active-response, localfile.                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``field``          | String        | Indicates a section child, e.g, fields for rule section are: include, decoder_dir, etc.                                                                                                                |
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
	      "alerts_log": "yes",
	      "jsonout_output": "yes",
	      "smtp_server": "smtp.example.wazuh.com",
	      "queue_size": "131072",
	      "email_to": "recipient@example.wazuh.com",
	      "logall": "no",
	      "email_maxperhour": "12",
	      "white_list": [
	         "127.0.0.1",
	         "^localhost.localdomain$",
	         "127.0.0.53"
	      ],
	      "email_from": "ossecm@example.wazuh.com",
	      "logall_json": "no"
	   }
	}
	


Info
++++++++++++++++++++++++++++++++++++++++

Get manager information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns basic information about manager.

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
	      "compilation_date": "Thu Sep  6 14:22:25 UTC 2018",
	      "version": "v3.6.1",
	      "openssl_support": "yes",
	      "max_agents": "14000",
	      "ruleset_version": "3601",
	      "path": "/var/ossec",
	      "tz_name": "UTC",
	      "type": "manager",
	      "tz_offset": "+0000"
	   }
	}
	

Get manager status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the status of the manager processes.

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
	


Logs
++++++++++++++++++++++++++++++++++++++++

Get ossec.log
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the three last months of ossec.log.

**Request**:

``GET`` ::

	/manager/logs

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type_log``       | String        | Filters by type of log.                                                                                                                                                                                |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - all                                                                                                                                                                                                  |
|                    |               | - error                                                                                                                                                                                                |
|                    |               | - warning                                                                                                                                                                                              |
|                    |               | - info                                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``category``       | String        | Filters by category of log.                                                                                                                                                                            |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/logs?offset=0&limit=5&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 2000,
	      "items": [
	         {
	            "timestamp": "2018-09-06 15:49:44",
	            "tag": "ossec-remoted",
	            "description": "(1409): Authentication file changed. Updating.",
	            "level": "info"
	         },
	         {
	            "timestamp": "2018-09-06 15:49:44",
	            "tag": "ossec-remoted",
	            "description": "(1410): Reading authentication keys file.",
	            "level": "info"
	         },
	         {
	            "timestamp": "2018-09-06 15:49:39",
	            "tag": "wazuh-modulesd:database",
	            "description": "Couldn't get database status for agent '3'.",
	            "level": "error"
	         },
	         {
	            "timestamp": "2018-09-06 15:49:04",
	            "tag": "ossec-remoted",
	            "description": "(1409): Authentication file changed. Updating.",
	            "level": "info"
	         },
	         {
	            "timestamp": "2018-09-06 15:49:04",
	            "tag": "ossec-remoted",
	            "description": "(1410): Reading authentication keys file.",
	            "level": "info"
	         }
	      ]
	   }
	}
	

Get summary of ossec.log
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a summary of the last three months of the <code>ossec.log</code> file.

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
	      "wazuh-modulesd": {
	         "info": 17,
	         "all": 17,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:oscap": {
	         "info": 17,
	         "all": 17,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-db": {
	         "info": 33,
	         "all": 36,
	         "critical": 0,
	         "error": 3,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-authd": {
	         "info": 14,
	         "all": 14,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:ciscat": {
	         "info": 17,
	         "all": 17,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:syscollector": {
	         "info": 67,
	         "all": 67,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-rootcheck": {
	         "info": 57,
	         "all": 57,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-monitord": {
	         "info": 33,
	         "all": 33,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-logcollector": {
	         "info": 169,
	         "all": 169,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-execd": {
	         "info": 49,
	         "all": 49,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-remoted": {
	         "info": 166,
	         "all": 169,
	         "critical": 0,
	         "error": 3,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-syscheckd": {
	         "info": 485,
	         "all": 485,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:osquery": {
	         "info": 17,
	         "all": 17,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:download": {
	         "info": 17,
	         "all": 17,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-analysisd": {
	         "info": 3773,
	         "all": 3773,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:database": {
	         "info": 17,
	         "all": 33,
	         "critical": 0,
	         "error": 16,
	         "debug": 0,
	         "warning": 0
	      }
	   }
	}
	


Stats
++++++++++++++++++++++++++++++++++++++++

Get manager stats
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns Wazuh statistical information for the current or specified date.

**Request**:

``GET`` ::

	/manager/stats

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``date``           | String        | Selects the date for getting the statistical information. Format: YYYYMMDD                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/stats?pretty"

**Example Response:**
::

	{
	    "data": [
	        {
	            "hour": 5, 
	            "firewall": 0, 
	            "alerts": [
	                {
	                    "level": 3, 
	                    "sigid": 5715, 
	                    "times": 4
	                }, 
	                {
	                    "level": 2, 
	                    "sigid": 1002, 
	                    "times": 2
	                }, 
	                {
	                    "...": "..."
	                }
	            ], 
	            "totalAlerts": 107, 
	            "syscheck": 1257, 
	            "events": 1483
	        }, 
	        {
	            "...": "..."
	        }
	    ], 
	    "error": 0
	}

Get manager stats by hour
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns Wazuh statistical information per hour. Each number in the averages field represents the average of alerts per hour.

**Request**:

``GET`` ::

	/manager/stats/hourly

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/stats/hourly?pretty"

**Example Response:**
::

	{
	    "data": {
	        "averages": [
	            100, 
	            357, 
	            242, 
	            500, 
	            422, 
	            "...", 
	            123
	        ], 
	        "interactions": 0
	    }, 
	    "error": 0
	}

Get manager stats by week
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns Wazuh statistical information per week. Each number in the hours field represents the average alerts per hour for that specific day.

**Request**:

``GET`` ::

	/manager/stats/weekly

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/stats/weekly?pretty"

**Example Response:**
::

	{
	    "data": {
	        "Wed": {
	            "hours": [
	                223, 
	                "...", 
	                456
	            ], 
	            "interactions": 0
	        }, 
	        "Sun": {
	            "hours": [
	                332, 
	                "...", 
	                313
	            ], 
	            "interactions": 0
	        }, 
	        "Thu": {
	            "hours": [
	                888, 
	                "...", 
	                123
	            ], 
	            "interactions": 0
	        }, 
	        "Tue": {
	            "hours": [
	                536, 
	                "...", 
	                345
	            ], 
	            "interactions": 0
	        }, 
	        "Mon": {
	            "hours": [
	                444, 
	                "...", 
	                556
	            ], 
	            "interactions": 0
	        }, 
	        "Fri": {
	            "hours": [
	                131, 
	                "...", 
	                432
	            ], 
	            "interactions": 0
	        }, 
	        "Sat": {
	            "hours": [
	                134, 
	                "...", 
	                995
	            ], 
	            "interactions": 0
	        }
	    }, 
	    "error": 0
	}



Rootcheck
----------------------------------------
Clear
++++++++++++++++++++++++++++++++++++++++

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
	    "data": "Rootcheck database deleted", 
	    "error": 0
	}

Clear rootcheck database of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears the rootcheck database for a specific agent.

**Request**:

``DELETE`` ::

	/rootcheck/:agent_id

**Parameters:**

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
	    "data": "Rootcheck database deleted", 
	    "error": 0
	}


Info
++++++++++++++++++++++++++++++++++++++++

Get last rootcheck scan
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the timestamp of the last rootcheck scan.

**Request**:

``GET`` ::

	/rootcheck/:agent_id/last_scan

**Parameters:**

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
	      "start": "2018-09-06 15:46:56",
	      "end": "2018-09-06 15:47:19"
	   }
	}
	

Get rootcheck CIS requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the CIS requirements of all rootchecks of the specified agent.

**Request**:

``GET`` ::

	/rootcheck/:agent_id/cis

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rootcheck/000/cis?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 0,
	      "items": []
	   }
	}
	

Get rootcheck database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the rootcheck database of an agent.

**Request**:

``GET`` ::

	/rootcheck/:agent_id

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pci``            | String        | Filters by pci requirement.                                                                                                                                                                            |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cis``            | String        | Filters by CIS.                                                                                                                                                                                        |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``         | String        | Filters by status.                                                                                                                                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rootcheck/000?offset=0&limit=2&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 7,
	      "items": [
	         {
	            "status": "outstanding",
	            "oldDay": "2018-09-06 14:22:48",
	            "readDay": "2018-09-06 15:46:59",
	            "event": "System Audit: SSH Hardening - 3: Root can log in. File: /etc/ssh/sshd_config. Reference: 3 ."
	         },
	         {
	            "status": "outstanding",
	            "oldDay": "2018-09-06 14:22:48",
	            "pci": "2.2.4",
	            "readDay": "2018-09-06 15:46:59",
	            "event": "System Audit: SSH Hardening - 4: No Public Key authentication {PCI_DSS: 2.2.4}. File: /etc/ssh/sshd_config. Reference: 4 ."
	         }
	      ]
	   }
	}
	

Get rootcheck pci requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the PCI requirements of all rootchecks of the agent.

**Request**:

``GET`` ::

	/rootcheck/:agent_id/pci

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rootcheck/000/pci?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 1,
	      "items": [
	         "2.2.4"
	      ]
	   }
	}
	


Run
++++++++++++++++++++++++++++++++++++++++

Run rootcheck scan in all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs syscheck and rootcheck on all agents (Wazuh launches both processes simultaneously).

**Request**:

``PUT`` ::

	/rootcheck

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/rootcheck?pretty"

**Example Response:**
::

	{
	    "data": "Restarting Syscheck/Rootcheck on all agents", 
	    "error": 0
	}

Run rootcheck scan in an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs syscheck and rootcheck on a specified agent (Wazuh launches both processes simultaneously)

**Request**:

``PUT`` ::

	/rootcheck/:agent_id

**Parameters:**

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
----------------------------------------
Info
++++++++++++++++++++++++++++++++++++++++

Get all rules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all rules.

**Request**:

``GET`` ::

	/rules

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``         | String        | Filters the rules by status.                                                                                                                                                                           |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - enabled                                                                                                                                                                                              |
|                    |               | - disabled                                                                                                                                                                                             |
|                    |               | - all                                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group``          | String        | Filters the rules by group.                                                                                                                                                                            |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``level``          | Range         | Filters the rules by level. level=2 or level=2-5.                                                                                                                                                      |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``           | String        | Filters the rules by path.                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``           | String        | Filters the rules by file name.                                                                                                                                                                        |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pci``            | String        | Filters the rules by pci requirement.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``gdpr``           | String        | Filters the rules by gdpr.                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules?offset=0&limit=2&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 1662,
	      "items": [
	         {
	            "status": "enabled",
	            "pci": [],
	            "description": "Generic template for all syslog rules.",
	            "file": "0010-rules_config.xml",
	            "level": 0,
	            "path": "/var/ossec/ruleset/rules",
	            "details": {
	               "category": "syslog",
	               "noalert": "1"
	            },
	            "groups": [
	               "syslog"
	            ],
	            "id": 1,
	            "gdpr": []
	         },
	         {
	            "status": "enabled",
	            "pci": [],
	            "description": "Generic template for all firewall rules.",
	            "file": "0010-rules_config.xml",
	            "level": 0,
	            "path": "/var/ossec/ruleset/rules",
	            "details": {
	               "category": "firewall",
	               "noalert": "1"
	            },
	            "groups": [
	               "firewall"
	            ],
	            "id": 2,
	            "gdpr": []
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

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``         | String        | Filters files by status.                                                                                                                                                                               |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - enabled                                                                                                                                                                                              |
|                    |               | - disabled                                                                                                                                                                                             |
|                    |               | - all                                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``           | String        | Filters the rules by path.                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``           | String        | Filters the rules by filefile.                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``download``       | String        | Downloads the file                                                                                                                                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/files?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 108,
	      "items": [
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/rules",
	            "file": "0010-rules_config.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/rules",
	            "file": "0015-ossec_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/rules",
	            "file": "0016-wazuh_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/rules",
	            "file": "0020-syslog_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/rules",
	            "file": "0025-sendmail_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/rules",
	            "file": "0030-postfix_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/rules",
	            "file": "0035-spamd_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/rules",
	            "file": "0040-imapd_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/rules",
	            "file": "0045-mailscanner_rules.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/rules",
	            "file": "0050-ms-exchange_rules.xml"
	         }
	      ]
	   }
	}
	

Get rule gdpr requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the GDPR requirements of all rules.

**Request**:

``GET`` ::

	/rules/gdpr

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/gdpr?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 4,
	      "items": [
	         "II_5.1.f",
	         "IV_30.1.g",
	         "IV_32.2",
	         "IV_35.7.d"
	      ]
	   }
	}
	

Get rule groups
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the groups of all rules.

**Request**:

``GET`` ::

	/rules/groups

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/groups?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 293,
	      "items": [
	         "access_control",
	         "access_denied",
	         "accesslog",
	         "account_changed",
	         "active_response",
	         "adduser",
	         "agent",
	         "agent_flooding",
	         "agent_restarting",
	         "agentless"
	      ]
	   }
	}
	

Get rule pci requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the PCI requirements of all rules.

**Request**:

``GET`` ::

	/rules/pci

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/pci?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 38,
	      "items": [
	         "1.1.1",
	         "1.3.4",
	         "1.4",
	         "10.1",
	         "10.2.1",
	         "10.2.2",
	         "10.2.4",
	         "10.2.5",
	         "10.2.6",
	         "10.2.7"
	      ]
	   }
	}
	

Get rules by id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the rules with the specified id.

**Request**:

``GET`` ::

	/rules/:rule_id

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``id``             | Number        | rule.                                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
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
	



Syscheck
----------------------------------------
Clear
++++++++++++++++++++++++++++++++++++++++

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
	    "data": "Syscheck database deleted", 
	    "error": 0
	}

Clear syscheck database of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears the syscheck database for the specified agent.

**Request**:

``DELETE`` ::

	/syscheck/:agent_id

**Parameters:**

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
	    "data": "Syscheck database deleted", 
	    "error": 0
	}


Info
++++++++++++++++++++++++++++++++++++++++

Get last syscheck scan
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Return the timestamp of the last syscheck scan.

**Request**:

``GET`` ::

	/syscheck/:agent_id/last_scan

**Parameters:**

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
	      "start": "2018-09-06 15:46:56",
	      "end": "2018-09-06 15:47:01"
	   }
	}
	

Get syscheck files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the syscheck files of an agent.

**Request**:

``GET`` ::

	/syscheck/:agent_id

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``event``          | String        | Filters files by event.                                                                                                                                                                                |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - added                                                                                                                                                                                                |
|                    |               | - readded                                                                                                                                                                                              |
|                    |               | - modified                                                                                                                                                                                             |
|                    |               | - deleted                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``           | String        | Filters file by filename.                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``filetype``       | String        | Selects type of file.                                                                                                                                                                                  |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - file                                                                                                                                                                                                 |
|                    |               | - registry                                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``summary``        | String        | Returns a summary grouping by filename.                                                                                                                                                                |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - yes                                                                                                                                                                                                  |
|                    |               | - no                                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``md5``            | String        | Returns the files with the specified md5 hash.                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sha1``           | String        | Returns the files with the specified sha1 hash.                                                                                                                                                        |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``hash``           | String        | Returns the files with the specified hash (md5 or sha1).                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscheck/000?offset=0&limit=2&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 3011,
	      "items": [
	         {
	            "sha1": "cecaba8692e33157de515fd6bfbc5b2a3eb57175",
	            "group": "root",
	            "uid": 0,
	            "scanDate": "2018-09-06 15:28:56",
	            "gid": 0,
	            "user": "root",
	            "file": "/sbin/mount.vboxsf",
	            "modificationDate": "2018-09-06 15:24:35",
	            "octalMode": "120777",
	            "permissions": "lrwxrwxrwx",
	            "md5": "acc2dc0d695ac4d1129a5b1571c15954",
	            "inode": 32232,
	            "event": "modified",
	            "size": 49
	         },
	         {
	            "sha1": "321109a3ca416a7a35a10abfa34f19a717a65c4e",
	            "group": "root",
	            "uid": 0,
	            "scanDate": "2018-09-06 15:28:56",
	            "gid": 0,
	            "user": "root",
	            "file": "/sbin/rcvboxadd",
	            "modificationDate": "2018-09-06 15:24:35",
	            "octalMode": "120777",
	            "permissions": "lrwxrwxrwx",
	            "md5": "5703613332e5affa3eee1d18a4bc63c3",
	            "inode": 32233,
	            "event": "modified",
	            "size": 43
	         }
	      ]
	   }
	}
	


Run
++++++++++++++++++++++++++++++++++++++++

Run syscheck scan in all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs syscheck and rootcheck on all agents (Wazuh launches both processes simultaneously).

**Request**:

``PUT`` ::

	/syscheck

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/syscheck?pretty"

**Example Response:**
::

	{
	    "data": "Restarting Syscheck/Rootcheck on all agents", 
	    "error": 0
	}

Run syscheck scan in an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs syscheck and rootcheck on an agent (Wazuh launches both processes simultaneously).

**Request**:

``PUT`` ::

	/syscheck/:agent_id

**Parameters:**

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
	



Syscollector
----------------------------------------
Hardware
++++++++++++++++++++++++++++++++++++++++

Get hardware info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's hardware info

**Request**:

``GET`` ::

	/syscollector/:agent_id/hardware

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/hardware?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "board_serial": "0",
	      "ram": {
	         "usage": 15,
	         "total": 5437308,
	         "free": 4631152
	      },
	      "cpu": {
	         "cores": 2,
	         "mhz": 1992,
	         "name": "Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz"
	      },
	      "scan": {
	         "id": 2094097878,
	         "time": "2018/09/06 15:46:55"
	      }
	   }
	}
	


Netaddr
++++++++++++++++++++++++++++++++++++++++

Get network address info of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network address info

**Request**:

``GET`` ::

	/syscollector/:agent_id/netaddr

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``id``             | String        | Filters by id.                                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``proto``          | String        | Filters by proto.                                                                                                                                                                                      |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``address``        | String        | Filters by address.                                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``broadcast``      | String        | Filters by broadcast.                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``netmask``        | String        | Filters by netmask.                                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/netaddr?pretty&limit=2&sort=proto"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 4,
	      "items": [
	         {
	            "id": 33,
	            "scan_id": 1034745317,
	            "address": "fe80::a00:27ff:fe21:a579",
	            "netmask": "ffff:ffff:ffff:ffff::",
	            "proto": "ipv6"
	         },
	         {
	            "id": 34,
	            "scan_id": 1034745317,
	            "address": "fe80::a00:27ff:feda:1fa3",
	            "netmask": "ffff:ffff:ffff:ffff::",
	            "proto": "ipv6"
	         }
	      ]
	   }
	}
	


Netiface
++++++++++++++++++++++++++++++++++++++++

Get network interface info of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network interface info

**Request**:

``GET`` ::

	/syscollector/:agent_id/netiface

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``id``             | String        | Filters by id.                                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``           | String        | Filters by name.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``adapter``        | String        | Filters by adapter.                                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``           | String        | Filters by type.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``          | String        | Filters by state.                                                                                                                                                                                      |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``mtu``            | String        | Filters by mtu.                                                                                                                                                                                        |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_packets``     | String        | Filters by tx_packets.                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_packets``     | String        | Filters by rx_packets.                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_bytes``       | String        | Filters by tx_bytes.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_bytes``       | String        | Filters by rx_bytes.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_errors``      | String        | Filters by tx_errors.                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_errors``      | String        | Filters by rx_errors.                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_dropped``     | String        | Filters by tx_dropped.                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_dropped``     | String        | Filters by rx_dropped.                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/netiface?pretty&limit=2&sort=state"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 2,
	      "items": [
	         {
	            "name": "enp0s3",
	            "tx": {
	               "packets": 94,
	               "errors": 0,
	               "bytes": 9162,
	               "dropped": 0
	            },
	            "scan": {
	               "id": 1034745317,
	               "time": "2018/09/06 15:46:55"
	            },
	            "rx": {
	               "packets": 85,
	               "errors": 0,
	               "bytes": 18594,
	               "dropped": 0
	            },
	            "mac": "08:00:27:21:A5:79",
	            "mtu": 1500,
	            "state": "up",
	            "type": "ethernet",
	            "id": 33
	         },
	         {
	            "name": "enp0s8",
	            "tx": {
	               "packets": 12566,
	               "errors": 0,
	               "bytes": 2617973,
	               "dropped": 0
	            },
	            "scan": {
	               "id": 1034745317,
	               "time": "2018/09/06 15:46:55"
	            },
	            "rx": {
	               "packets": 18832,
	               "errors": 0,
	               "bytes": 4316932,
	               "dropped": 0
	            },
	            "mac": "08:00:27:DA:1F:A3",
	            "mtu": 1500,
	            "state": "up",
	            "type": "ethernet",
	            "id": 34
	         }
	      ]
	   }
	}
	


Netproto
++++++++++++++++++++++++++++++++++++++++

Get network protocol info of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network protocol info

**Request**:

``GET`` ::

	/syscollector/:agent_id/netproto

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``id``             | String        | Filters by id.                                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``iface``          | String        | Filters by iface.                                                                                                                                                                                      |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``           | String        | Filters by type.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``gateway``        | String        | Filters by gateway.                                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``dhcp``           | String        | Filters by dhcp.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/netproto?pretty&limit=2&sort=type"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 4,
	      "items": [
	         {
	            "dhcp": "enabled",
	            "scan_id": 1034745317,
	            "iface": "enp0s3",
	            "type": "ipv6",
	            "id": 33
	         },
	         {
	            "dhcp": "enabled",
	            "scan_id": 1034745317,
	            "iface": "enp0s8",
	            "type": "ipv6",
	            "id": 34
	         }
	      ]
	   }
	}
	


OS
++++++++++++++++++++++++++++++++++++++++

Get os info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's OS info

**Request**:

``GET`` ::

	/syscollector/:agent_id/os

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/os?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "sysname": "Linux",
	      "version": "#36-Ubuntu SMP Wed Aug 15 16:00:05 UTC 2018",
	      "architecture": "x86_64",
	      "scan": {
	         "id": 1226446053,
	         "time": "2018/09/06 15:46:55"
	      },
	      "release": "4.15.0-33-generic",
	      "hostname": "manager",
	      "os": {
	         "major": "18",
	         "name": "Ubuntu",
	         "platform": "ubuntu",
	         "version": "18.04 LTS (Bionic Beaver)",
	         "codename": "Bionic Beaver",
	         "minor": "04"
	      }
	   }
	}
	


Packages
++++++++++++++++++++++++++++++++++++++++

Get packages info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's packages info

**Request**:

``GET`` ::

	/syscollector/:agent_id/packages

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``         | String        | Looks for elements with the specified string.                                                                                                                                                          |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``vendor``         | String        | Filters by vendor.                                                                                                                                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``           | String        | Filters by name.                                                                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``architecture``   | String        | Filters by architecture.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``format``         | String        | Filters by format.                                                                                                                                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``version``        | String        | Filters by version.                                                                                                                                                                                    |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/packages?pretty&limit=2&offset=10&sort=-name"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 572,
	      "items": [
	         {
	            "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
	            "name": "apt-utils",
	            "scan": {
	               "id": 538049180,
	               "time": "2018/09/06 15:46:55"
	            },
	            "section": "admin",
	            "format": "deb",
	            "priority": "important",
	            "source": "apt",
	            "version": "1.6.1",
	            "architecture": "amd64",
	            "size": 768,
	            "description": "package management related utility programs"
	         },
	         {
	            "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
	            "name": "at",
	            "scan": {
	               "id": 538049180,
	               "time": "2018/09/06 15:46:55"
	            },
	            "section": "admin",
	            "format": "deb",
	            "priority": "standard",
	            "version": "3.1.20-3.1ubuntu2",
	            "architecture": "amd64",
	            "multiarch": "foreign",
	            "size": 151,
	            "description": "Delayed job execution and batch processing"
	         }
	      ]
	   }
	}
	


Ports
++++++++++++++++++++++++++++++++++++++++

Get ports info of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's ports info

**Request**:

``GET`` ::

	/syscollector/:agent_id/ports

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pid``            | Number        | Filters by pid.                                                                                                                                                                                        |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``protocol``       | String        | Filters by protocol.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``local_ip``       | String        | Filters by local_ip.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``local_port``     | Number        | Filters by local_port.                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``remote_ip``      | String        | Filters by remote_ip.                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_queue``       | Number        | Filters by tx_queue.                                                                                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``          | String        | Filters by state.                                                                                                                                                                                      |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/ports?pretty&sort=-protocol&limit=2"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 9,
	      "items": [
	         {
	            "remote": {
	               "ip": "0.0.0.0",
	               "port": 0
	            },
	            "scan": {
	               "id": 349352305,
	               "time": "2018/09/06 15:47:01"
	            },
	            "inode": 844033,
	            "state": "listening",
	            "tx_queue": 0,
	            "protocol": "tcp",
	            "rx_queue": 0,
	            "local": {
	               "ip": "0.0.0.0",
	               "port": 1516
	            }
	         },
	         {
	            "remote": {
	               "ip": "0.0.0.0",
	               "port": 0
	            },
	            "scan": {
	               "id": 349352305,
	               "time": "2018/09/06 15:47:01"
	            },
	            "inode": 16870,
	            "state": "listening",
	            "tx_queue": 0,
	            "protocol": "tcp",
	            "rx_queue": 0,
	            "local": {
	               "ip": "127.0.0.53",
	               "port": 53
	            }
	         }
	      ]
	   }
	}
	


Processes
++++++++++++++++++++++++++++++++++++++++

Get processes info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's processes info

**Request**:

``GET`` ::

	/syscollector/:agent_id/processes

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``agent_id``       | Number        | Agent ID.                                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``           | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``         | String        | List of selected fields.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pid``            | Number        | Filters by process pid.                                                                                                                                                                                |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``egroup``         | String        | Filters by process egroup.                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``euser``          | String        | Filters by process euser.                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``fgroup``         | String        | Filters by process fgroup.                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``nlwp``           | Number        | Filters by process nlwp.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pgrp``           | Number        | Filters by process pgrp.                                                                                                                                                                               |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``priority``       | Number        | Filters by process priority.                                                                                                                                                                           |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rgroup``         | String        | Filters by process rgroup.                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ruser``          | String        | Filters by process ruser.                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sgroup``         | String        | Filters by process sgroup.                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``suser``          | String        | Filters by process suser.                                                                                                                                                                              |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/processes?pretty&limit=2&offset=10&sort=-name"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 112,
	      "items": [
	         {
	            "euser": "root",
	            "tty": 0,
	            "rgroup": "root",
	            "sgroup": "root",
	            "scan": {
	               "id": 968408826,
	               "time": "2018/09/06 15:47:01"
	            },
	            "resident": 0,
	            "share": 0,
	            "start_time": 0,
	            "pid": "12",
	            "session": 0,
	            "stime": 0,
	            "vm_size": 0,
	            "size": 0,
	            "ppid": 2,
	            "egroup": "root",
	            "name": "cpuhp/0",
	            "pgrp": 0,
	            "tgid": 12,
	            "utime": 0,
	            "priority": 20,
	            "fgroup": "root",
	            "state": "S",
	            "ruser": "root",
	            "suser": "root",
	            "nlwp": 1,
	            "processor": 0,
	            "nice": 0
	         },
	         {
	            "euser": "root",
	            "tty": 0,
	            "rgroup": "root",
	            "sgroup": "root",
	            "scan": {
	               "id": 968408826,
	               "time": "2018/09/06 15:47:01"
	            },
	            "resident": 0,
	            "share": 0,
	            "start_time": 0,
	            "pid": "13",
	            "session": 0,
	            "stime": 0,
	            "vm_size": 0,
	            "size": 0,
	            "ppid": 2,
	            "egroup": "root",
	            "name": "cpuhp/1",
	            "pgrp": 0,
	            "tgid": 13,
	            "utime": 0,
	            "priority": 20,
	            "fgroup": "root",
	            "state": "S",
	            "ruser": "root",
	            "suser": "root",
	            "nlwp": 1,
	            "processor": 1,
	            "nice": 0
	         }
	      ]
	   }
	}
	



