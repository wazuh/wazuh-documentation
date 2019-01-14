
.. Copyright (C) 2018 Wazuh, Inc.
.. Do not modify this file manually. It is generated automatically.

.. _api_reference:

Reference
======================
This API reference is organized by resources:

* `Active Response`_
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

`Active Response`_
	* PUT /active-response/:agent_id  (`Run an AR command in the agent`_)

`Agents`_
	* DELETE /agents  (`Delete agents`_)
	* DELETE /agents/:agent_id  (`Delete an agent`_)
	* DELETE /agents/:agent_id/group  (`Remove all agent groups.`_)
	* DELETE /agents/:agent_id/group/:group_id  (`Remove a single group of an agent`_)
	* DELETE /agents/group/:group_id  (`Remove a single group of multiple agents`_)
	* DELETE /agents/groups  (`Delete a list of groups`_)
	* DELETE /agents/groups/:group_id  (`Remove group`_)
	* GET /agents  (`Get all agents`_)
	* GET /agents/:agent_id  (`Get an agent`_)
	* GET /agents/:agent_id/config/:component/:configuration  (`Get active configuration`_)
	* GET /agents/:agent_id/group/is_sync  (`Get sync status of agent`_)
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
	* POST /agents/group/:group_id  (`Add a list of agents to a group`_)
	* POST /agents/groups/:group_id/configuration  (`Put configuration file (agent.conf) into a group`_)
	* POST /agents/groups/:group_id/files/:file_name  (`Upload file into a group`_)
	* POST /agents/insert  (`Insert agent`_)
	* POST /agents/restart  (`Restart a list of agents`_)
	* PUT /agents/:agent_id/group/:group_id  (`Add agent group`_)
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
	* GET /cluster/:node_id/configuration  (`Get node node_id's configuration`_)
	* GET /cluster/:node_id/info  (`Get node_id's information`_)
	* GET /cluster/:node_id/logs  (`Get ossec.log from a specific node in cluster.`_)
	* GET /cluster/:node_id/logs/summary  (`Get summary of ossec.log from a specific node in cluster.`_)
	* GET /cluster/:node_id/stats  (`Get node node_id's stats`_)
	* GET /cluster/:node_id/stats/analysisd  (`Get node node_id's analysisd stats`_)
	* GET /cluster/:node_id/stats/hourly  (`Get node node_id's stats by hour`_)
	* GET /cluster/:node_id/stats/remoted  (`Get node node_id's remoted stats`_)
	* GET /cluster/:node_id/stats/weekly  (`Get node node_id's stats by week`_)
	* GET /cluster/:node_id/status  (`Get node node_id's status`_)
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
	* DELETE /experimental/syscheck  (`Clear syscheck database`_)
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
	* GET /manager/stats/analysisd  (`Get analysisd stats`_)
	* GET /manager/stats/hourly  (`Get manager stats by hour`_)
	* GET /manager/stats/remoted  (`Get remoted stats`_)
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs an Active Response command on a specified agent

**Request**:

``PUT`` ::

	/active-response/:agent_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``command``                  | String        | Command.                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``Custom``                   | Boolean       | Custom.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``Arguments``                | Arguments     | Command arguments.                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Add a new agent.

**Request**:

``POST`` ::

	/agents

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``name``                     | String        | Agent name.                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ip``                       | String        | If this is not included, the API will get the IP automatically. If you are behind a proxy, you must set the option config.BehindProxyServer to yes at config.js.                                       |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - IP                                                                                                                                                                                                   |
|                              |               | - IP/NET                                                                                                                                                                                               |
|                              |               | - ANY                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``force``                    | Number        | Remove the old agent with the same IP if disconnected since <force> seconds.                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X POST -d '{"name":"NewHost","ip":"10.0.0.9"}' -H 'Content-Type:application/json' "https://127.0.0.1:55000/agents?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "id": "007",
	      "key": "MDA3IE5ld0hvc3QgMTAuMC4wLjkgN2Y4OWM2NzVkNWE1NjAwNzA2OTY1ODQwM2NjYzZiNThkMzQ5M2E3OTRkOTMyMDU1MzAzZTE3ZDBkN2I0MmM5Yw=="
	   }
	}


Add agent (quick method)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Adds a new agent with name :agent_name. This agent will use ANY as IP.

**Request**:

``PUT`` ::

	/agents/:agent_name

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_name``               | String        | Agent name.                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/myNewAgent?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "id": "008",
	      "key": "MDA4IG15TmV3QWdlbnQgYW55IGMwNWQzMTdmZWFkNTllM2I5MzJhZThjZDI2OWVlYWMzNTMzY2VmZDQ0NGY4MDk2MTBlYTVlZWI1YjU1OGQzMjY="
	   }
	}


Insert agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Insert an agent with an existing id and key.

**Request**:

``POST`` ::

	/agents/insert

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``name``                     | String        | Agent name.                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ip``                       | String        | If this is not included, the API will get the IP automatically. If you are behind a proxy, you must set the option config.BehindProxyServer to yes at config.js.                                       |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - IP                                                                                                                                                                                                   |
|                              |               | - IP/NET                                                                                                                                                                                               |
|                              |               | - ANY                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``id``                       | String        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``key``                      | String        | Agent key. Minimum length: 64 characters. Allowed values: ^[a-zA-Z0-9]+$                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``force``                    | Number        | Remove the old agent the with same IP if disconnected since <force> seconds.                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X POST -d '{"name":"NewHost_2","ip":"10.0.10.10","id":"123","key":"1abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghi64"}' -H 'Content-Type:application/json' "https://127.0.0.1:55000/agents/insert?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "id": "123",
	      "key": "MTIzIE5ld0hvc3RfMiAxMC4wLjEwLjEwIDFhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5emFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6YWJjZGVmZ2hpNjQ="
	   }
	}



Config
++++++++++++++++++++++++++++++++++++++++

Get active configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the active configuration in JSON format.

**Request**:

``GET`` ::

	/agents/:agent_id/config/:component/:configuration

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``component``                | String        | Selected component.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``configuration``            | String        | Configuration to read.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Component/Configuration options:**

+--------------+-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Component    | Configuration                                   | Type                                                                                                                                                                                 |
+==============+=================================================+======================================================================================================================================================================================+
| agent        | client                                          | agent                                                                                                                                                                                |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | buffer                                          | agent                                                                                                                                                                                |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | labels                                          | agent                                                                                                                                                                                |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                        | agent                                                                                                                                                                                |
+--------------+-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| agentless    | agentless                                       | manager                                                                                                                                                                              |
+--------------+-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| analysis     | global                                          | manager                                                                                                                                                                              |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | active_response                                 | manager                                                                                                                                                                              |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | alerts                                          | manager                                                                                                                                                                              |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | command                                         | manager                                                                                                                                                                              |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                        | manager                                                                                                                                                                              |
+--------------+-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| auth         | auth                                            | manager                                                                                                                                                                              |
+--------------+-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| com          | active-response                                 | agent/manager                                                                                                                                                                        |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                        | agent/manager                                                                                                                                                                        |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | cluster                                         | manager                                                                                                                                                                              |
+--------------+-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| csyslog      | csyslog                                         | manager                                                                                                                                                                              |
+--------------+-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| integrator   | integration                                     | manager                                                                                                                                                                              |
+--------------+-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| logcollector | localfile                                       | agent/manager                                                                                                                                                                        |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | socket                                          | agent/manager                                                                                                                                                                        |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                        | agent/manager                                                                                                                                                                        |
+--------------+-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| mail         | global                                          | manager                                                                                                                                                                              |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | alerts                                          | manager                                                                                                                                                                              |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                        | manager                                                                                                                                                                              |
+--------------+-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| monitor      | internal                                        | manager                                                                                                                                                                              |
+--------------+-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| request      | remote                                          | manager                                                                                                                                                                              |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                        | manager                                                                                                                                                                              |
+--------------+-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| syscheck     | syscheck                                        | agent/manager                                                                                                                                                                        |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | rootcheck                                       | agent/manager                                                                                                                                                                        |
|              +-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                        | agent/manager                                                                                                                                                                        |
+--------------+-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wmodules     | wmodules                                        | agent/manager                                                                                                                                                                        |
+--------------+-------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/001/config/logcollector/localfile?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "localfile": [
	         {
	            "alias": "df -P",
	            "logformat": "command",
	            "frequency": 360,
	            "command": "df -P",
	            "target": [
	               "agent"
	            ]
	         },
	         {
	            "alias": "netstat listening ports",
	            "logformat": "full_command",
	            "frequency": 360,
	            "command": "netstat -tulpn | sed 's/\\([[:alnum:]]\\+\\)\\ \\+[[:digit:]]\\+\\ \\+[[:digit:]]\\+\\ \\+\\(.*\\):\\([[:digit:]]*\\)\\ \\+\\([0-9\\.\\:\\*]\\+\\).\\+\\ \\([[:digit:]]*\\/[[:alnum:]\\-]*\\).*/\\1 \\2 == \\3 == \\4 \\5/' | sort -k 4 -g | sed 's/ == \\(.*\\) ==/:\\1/' | sed 1,2d",
	            "target": [
	               "agent"
	            ]
	         },
	         {
	            "alias": "last -n 20",
	            "logformat": "full_command",
	            "frequency": 360,
	            "command": "last -n 20",
	            "target": [
	               "agent"
	            ]
	         },
	         {
	            "logformat": "syslog",
	            "target": [
	               "agent"
	            ],
	            "file": "/var/ossec/logs/active-responses.log"
	         },
	         {
	            "logformat": "syslog",
	            "target": [
	               "agent"
	            ],
	            "file": "/var/log/auth.log"
	         },
	         {
	            "logformat": "syslog",
	            "target": [
	               "agent"
	            ],
	            "file": "/var/log/syslog"
	         },
	         {
	            "logformat": "syslog",
	            "target": [
	               "agent"
	            ],
	            "file": "/var/log/dpkg.log"
	         },
	         {
	            "logformat": "syslog",
	            "target": [
	               "agent"
	            ],
	            "file": "/var/log/kern.log"
	         }
	      ]
	   }
	}



Delete
++++++++++++++++++++++++++++++++++++++++

Delete a list of groups
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Removes a list of groups.

**Request**:

``DELETE`` ::

	/agents/groups

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``ids``                      | String[]      | Array of group ID's.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -X DELETE -H "Content-Type:application/json" -d '{"ids":["webserver","database"]}' "http://localhost:55000/agents/groups?pretty"

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
	         "005",
	         "003"
	      ]
	   }
	}


Delete agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Removes agents, using a list of them or a criterion based on the status or time of the last connection. The Wazuh API must be restarted after removing an agent.

**Request**:

``DELETE`` ::

	/agents

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``ids``                      | String[]      | Array of agent ID's.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``purge``                    | Boolean       | Delete an agent from the key store.                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters by agent status. Use commas to enter multiple statuses.                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - active                                                                                                                                                                                               |
|                              |               | - pending                                                                                                                                                                                              |
|                              |               | - neverconnected                                                                                                                                                                                       |
|                              |               | - disconnected                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``older_than``               | String        | Filters out disconnected agents for longer than specified. Time in seconds, '[n_days]d', '[n_hours]h', '[n_minutes]m' or '[n_seconds]s'. For never connected agents, uses the register date.           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE -H "Content-Type:application/json" -d '{"ids":["003","005"]}' "https://127.0.0.1:55000/agents?pretty&older_than=10s&purge"

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Removes an agent.

**Request**:

``DELETE`` ::

	/agents/:agent_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``purge``                    | String        | Delete an agent from the key store.                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/agents/008?pretty&purge"

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



Group
++++++++++++++++++++++++++++++++++++++++

Get sync status of agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the sync status in JSON format

**Request**:

``GET`` ::

	/agents/:agent_id/group/is_sync

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/001/group/is_sync?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "synced": true
	   }
	}
	


Groups
++++++++++++++++++++++++++++++++++++++++

Add a list of agents to a group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Adds a list of agents to the specified group.

**Request**:

``POST`` ::

	/agents/group/:group_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id_list``            | Number        | List of agents ID.                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -X POST -H "Content-Type:application/json" -d '{"ids":["001","002"]}' "https://localhost:55000/agents/group/dmz?pretty" -k

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "msg": "Some agents were not assigned to group dmz",
	      "failed_ids": [
	         "002"
	      ],
	      "affected_agents": [
	         "001"
	      ]
	   }
	}
	

Add agent group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Adds an agent to the specified group.

**Request**:

``PUT`` ::

	/agents/:agent_id/group/:group_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent unique ID.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``force_single_group``       | Boolean       | Wheter to append new group to current agent's group or replace it.                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/004/group/dmz?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Agent '004' already belongs to group 'dmz'."
	}


Create a group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Creates a new group.

**Request**:

``PUT`` ::

	/agents/groups/:group_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/groups/pciserver?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Group 'pciserver' created."
	}


Get a file in group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the specified file belonging to the group parsed to JSON.

**Request**:

``GET`` ::

	/agents/groups/:group_id/files/:filename

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file_name``                | String        | Filename                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                     | String        | Type of file.                                                                                                                                                                                          |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - conf                                                                                                                                                                                                 |
|                              |               | - rootkit_files                                                                                                                                                                                        |
|                              |               | - rootkit_trojans                                                                                                                                                                                      |
|                              |               | - rcl                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``format``                   | String        | Optional. Output format (JSON, XML).                                                                                                                                                                   |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - json                                                                                                                                                                                                 |
|                              |               | - xml                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the list of agents in a group.

**Request**:

``GET`` ::

	/agents/groups/:group_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | Select which fields to return (separated by comma).                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters by agent status.                                                                                                                                                                               |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - active                                                                                                                                                                                               |
|                              |               | - pending                                                                                                                                                                                              |
|                              |               | - neverconnected                                                                                                                                                                                       |
|                              |               | - disconnected                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter results by.                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	            "group": [
	               "default",
	               "dmz"
	            ],
	            "name": "agent1",
	            "mergedSum": "f1a9e24e02ba4cc5ea80a9d3feb3bb9a",
	            "ip": "192.168.185.7",
	            "dateAdd": "2018-10-11 09:38:47",
	            "node_name": "node02",
	            "manager": "manager",
	            "version": "Wazuh v3.7.2",
	            "lastKeepAlive": "2018-10-11 13:58:08",
	            "os": {
	               "major": "16",
	               "name": "Ubuntu",
	               "uname": "Linux |ubuntu |4.4.0-135-generic |#161-Ubuntu SMP Mon Aug 27 10:45:01 UTC 2018 |x86_64",
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
	            "group": [
	               "dmz"
	            ],
	            "name": "main_database",
	            "ip": "10.0.0.15",
	            "node_name": "unknown",
	            "dateAdd": "2018-10-11 13:58:11",
	            "id": "004"
	         }
	      ]
	   }
	}


Get agents without group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a list with the available agents without group.

**Request**:

``GET`` ::

	/agents/no_group

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | Select which fields to return (separated by comma).                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter result. For example q=&quot;status=Active&quot;                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	            "dateAdd": "2018-10-11 13:58:11",
	            "name": "server002",
	            "ip": "10.0.0.20",
	            "id": "006",
	            "node_name": "unknown"
	         },
	         {
	            "status": "Never connected",
	            "dateAdd": "2018-10-11 13:58:22",
	            "name": "NewHost",
	            "ip": "10.0.0.9",
	            "id": "007",
	            "node_name": "unknown"
	         },
	         {
	            "status": "Never connected",
	            "dateAdd": "2018-10-11 13:58:23",
	            "name": "NewHost_2",
	            "ip": "10.0.10.10",
	            "id": "123",
	            "node_name": "unknown"
	         }
	      ]
	   }
	}


Get group configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the group configuration (agent.conf).

**Request**:

``GET`` ::

	/agents/groups/:group_id/configuration

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the files belonging to the group.

**Request**:

``GET`` ::

	/agents/groups/:group_id/files

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``hash``                     | String        | Hash algorithm to use to calculate files checksums.                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the list of existing agent groups.

**Request**:

``GET`` ::

	/agents/groups

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``hash``                     | String        | Select algorithm to generate the sum.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	            "count": 2,
	            "mergedSum": "f1a9e24e02ba4cc5ea80a9d3feb3bb9a",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00",
	            "name": "default"
	         },
	         {
	            "count": 2,
	            "mergedSum": "2c9d1cc2609a8ff8062c2e2dded3221c",
	            "configSum": "53b61b583230d823a57ff68a9b94eaf6",
	            "name": "dmz"
	         },
	         {
	            "count": 0,
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00",
	            "name": "pciserver"
	         }
	      ]
	   }
	}
	

Put configuration file (agent.conf) into a group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Upload the group configuration (agent.conf).

**Request**:

``POST`` ::

	/agents/groups/:group_id/configuration

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``xml_file``                 | String        | Configuration file.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -X POST -H 'Content-type: application/xml' -d @agent.conf.xml "https://127.0.0.1:55000/agents/groups/dmz/configuration?pretty" -k

**Example Response:**
::

	{
	    "data": "Agent configuration was updated successfully", 
	    "error": 0
	}

Remove a single group of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Remove the group of the agent but will leave the rest of its group if it belongs to a multigroup.

**Request**:

``DELETE`` ::

	/agents/:agent_id/group/:group_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/agents/004/group/dmz?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Group 'dmz' unset for agent '004'."
	}
	

Remove a single group of multiple agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Remove a list of agents of a group

**Request**:

``DELETE`` ::

	/agents/group/:group_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | List          | Agent ID list.                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -X DELETE -H "Content-Type:application/json" -d '{"ids":["001","002"]}' "https://localhost:55000/agents/group/dmz?pretty" -k

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "msg": "Some agents were not removed to group dmz",
	      "failed_ids": [
	         "002"
	      ],
	      "affected_agents": [
	         "001"
	      ]
	   }
	}
	

Remove all agent groups.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Removes the group of the agent. The agent will automatically revert to the 'default' group.

**Request**:

``DELETE`` ::

	/agents/:agent_id/group

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/agents/004/group?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Group unset for agent '004'."
	}


Remove group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Removes the group. Agents that were assigned to the removed group will automatically revert to the 'default' group.

**Request**:

``DELETE`` ::

	/agents/groups/:group_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	         "001"
	      ]
	   }
	}

Upload file into a group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Upload a file to a group.

**Request**:

``POST`` ::

	/agents/groups/:group_id/files/:file_name

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``xml_file``                 | String        | File. contents                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file_name``                | String        | File name.                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -X POST -H 'Content-type: application/xml' -d @agent.conf.xml "https://127.0.0.1:55000/agents/groups/dmz/files/agent.conf?pretty" -k

**Example Response:**
::

	{
	    "data": "Agent configuration was updated successfully", 
	    "error": 0
	}


Info
++++++++++++++++++++++++++++++++++++++++

Get OS summary
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a summary of the OS.

**Request**:

``GET`` ::

	/agents/summary/os

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter result. For example q=&quot;status=Active&quot;                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
	      "Disconnected": 0,
	      "Pending": 0
	   }
	}


Get all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a list with the available agents.

**Request**:

``GET`` ::

	/agents

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | Select which fields to return (separated by comma).                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters by agent status. Use commas to enter multiple statuses.                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - active                                                                                                                                                                                               |
|                              |               | - pending                                                                                                                                                                                              |
|                              |               | - neverconnected                                                                                                                                                                                       |
|                              |               | - disconnected                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter results by. For example q=&quot;status=Active&quot;                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``older_than``               | String        | Filters out disconnected agents for longer than specified. Time in seconds, '[n_days]d', '[n_hours]h', '[n_minutes]m' or '[n_seconds]s'. For never connected agents, uses the register date.           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os.platform``              | String        | Filters by OS platform.                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os.version``               | String        | Filters by OS version.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os.name``                  | String        | Filters by OS name.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``manager``                  | String        | Filters by manager hostname to which agents are connected.                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``version``                  | String        | Filters by agents version.                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group``                    | String        | Filters by group of agents.                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``node_name``                | String        | Filters by node name.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``                     | String        | Filters by agent name.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ip``                       | String        | Filters by agent IP.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	            "group": [
	               "default"
	            ],
	            "name": "agent1",
	            "mergedSum": "f1a9e24e02ba4cc5ea80a9d3feb3bb9a",
	            "ip": "192.168.185.7",
	            "manager": "manager",
	            "node_name": "node02",
	            "dateAdd": "2018-10-11 09:38:47",
	            "version": "Wazuh v3.7.2",
	            "lastKeepAlive": "2018-10-11 13:58:08",
	            "os": {
	               "major": "16",
	               "name": "Ubuntu",
	               "uname": "Linux |ubuntu |4.4.0-135-generic |#161-Ubuntu SMP Mon Aug 27 10:45:01 UTC 2018 |x86_64",
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
	            "manager": "manager",
	            "node_name": "node01",
	            "dateAdd": "2018-10-11 09:37:23",
	            "version": "Wazuh v3.7.2",
	            "lastKeepAlive": "9999-12-31 23:59:59",
	            "os": {
	               "major": "18",
	               "name": "Ubuntu",
	               "uname": "Linux |manager |4.15.0-36-generic |#39-Ubuntu SMP Mon Sep 24 16:19:09 UTC 2018 |x86_64",
	               "platform": "ubuntu",
	               "version": "18.04.1 LTS",
	               "codename": "Bionic Beaver",
	               "arch": "x86_64",
	               "minor": "04"
	            },
	            "id": "000"
	         },
	         {
	            "status": "Never connected",
	            "dateAdd": "2018-10-11 13:58:23",
	            "name": "NewHost_2",
	            "ip": "10.0.10.10",
	            "id": "123",
	            "node_name": "unknown"
	         },
	         {
	            "status": "Never connected",
	            "dateAdd": "2018-10-11 13:58:22",
	            "name": "NewHost",
	            "ip": "10.0.0.9",
	            "id": "007",
	            "node_name": "unknown"
	         },
	         {
	            "status": "Never connected",
	            "dateAdd": "2018-10-11 13:58:10",
	            "group": [
	               "default"
	            ],
	            "name": "server001",
	            "ip": "10.0.0.62",
	            "id": "002",
	            "node_name": "unknown"
	         }
	      ]
	   }
	}


Get an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns various information from an agent.

**Request**:

``GET`` ::

	/agents/:agent_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	      "manager": "manager",
	      "node_name": "node01",
	      "dateAdd": "2018-10-11 09:37:23",
	      "version": "Wazuh v3.7.2",
	      "lastKeepAlive": "9999-12-31 23:59:59",
	      "os": {
	         "major": "18",
	         "name": "Ubuntu",
	         "uname": "Linux |manager |4.15.0-36-generic |#39-Ubuntu SMP Mon Sep 24 16:19:09 UTC 2018 |x86_64",
	         "platform": "ubuntu",
	         "version": "18.04.1 LTS",
	         "codename": "Bionic Beaver",
	         "arch": "x86_64",
	         "minor": "04"
	      },
	      "id": "000"
	   }
	}


Get an agent by its name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns various information from an agent called :agent_name.

**Request**:

``GET`` ::

	/agents/name/:agent_name

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_name``               | String        | Agent name.                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/name/NewHost?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "status": "Never connected",
	      "name": "NewHost",
	      "ip": "10.0.0.9",
	      "node_name": "unknown",
	      "dateAdd": "2018-10-11 13:58:22",
	      "id": "007"
	   }
	}



Key
++++++++++++++++++++++++++++++++++++++++

Get agent key
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the key of an agent.

**Request**:

``GET`` ::

	/agents/:agent_id/key

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/004/key?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "MDA0IG1haW5fZGF0YWJhc2UgMTAuMC4wLjE1IDcwYjJiZTVlMTI1ZTZiYTYxNmJhNjRkN2E0NDRkZWFjODgyZmJiYjIwOGEyMmFiZTdjM2EzZTFmNDI2ODFjOGQ="
	}



Restart
++++++++++++++++++++++++++++++++++++++++

Restart a list of agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Restarts a list of agents.

**Request**:

``POST`` ::

	/agents/restart

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``ids``                      | String[]      | Array of agent ID's.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X POST -H "Content-Type:application/json" -d '{"ids":["002","004"]}' "https://127.0.0.1:55000/agents/restart?pretty"

**Example Response:**
::

	{
	    "data": {
	        "msg": "All selected agents were restarted",
	        "affected_agents": [
	            "002",
	            "004"
	        ]
	    },
	    "error": 0
	}

Restart all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Restarts the specified agent.

**Request**:

``PUT`` ::

	/agents/:agent_id/restart

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent unique ID.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/007/restart?pretty"

**Example Response:**
::

	{
	    "data": {
	        "msg": "All selected agents were restarted",
	        "affected_agents": [
	            "007"
	        ]
	    },
	    "error": 0
	}


Stats
++++++++++++++++++++++++++++++++++++++++

Get distinct fields in agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all the different combinations that agents have for the selected fields. It also indicates the total number of agents that have each combination.

**Request**:

``GET`` ::

	/agents/stats/distinct

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``fields``                   | String        | List of fields affecting the operation.                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter result. For example q=&quot;status=Active&quot;                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/stats/distinct?pretty&fields=os.platform"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 7,
	      "items": [
	         {
	            "count": 2,
	            "os": {
	               "platform": "ubuntu"
	            }
	         },
	         {
	            "count": 5
	         }
	      ]
	   }
	}



Upgrade
++++++++++++++++++++++++++++++++++++++++

Get outdated agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the list of outdated agents.

**Request**:

``GET`` ::

	/agents/outdated

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter result. For example q=&quot;status=Active&quot;                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the upgrade result from an agent.

**Request**:

``GET`` ::

	/agents/:agent_id/upgrade_result

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``timeout``                  | Number        | Seconds to wait for the agent to respond.                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Upgrade the agent using a custom file.

**Request**:

``PUT`` ::

	/agents/:agent_id/upgrade_custom

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent unique ID.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file_path``                | String        | Path to the WPK file. The file must be on a folder on the Wazuh's installation directory (by default, ``/var/ossec``).                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``installer``                | String        | Installation script.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/002/upgrade_custom?pretty"

**Example Response:**
::

	{
	    "data": "Installation started",
	    "data": "Installation started", 
	    "error": 0
	}

Upgrade agent using online repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Upgrade the agent using a WPK file from online repository.

**Request**:

``PUT`` ::

	/agents/:agent_id/upgrade

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent unique ID.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``wpk_repo``                 | String        | WPK repository.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``version``                  | String        | Wazuh version.                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``use_http``                 | Boolean       | Use protocol http. If it's false use https. By default the value is set to false.                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``force``                    | number        | Force upgrade.                                                                                                                                                                                         |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - 0                                                                                                                                                                                                    |
|                              |               | - 1                                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears cache of the specified group.

**Request**:

``DELETE`` ::

	/cache

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``group``                    | String        | cache group.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/cache/mygroup?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "all": [
	         "/agents/000?pretty",
	         "/agents/name/NewHost?pretty",
	         "/agents/stats/distinct?pretty&fields=os.platform"
	      ],
	      "groups": {
	         "agents": [
	            "/agents/000?pretty",
	            "/agents/name/NewHost?pretty",
	            "/agents/stats/distinct?pretty&fields=os.platform"
	         ]
	      }
	   }
	}


Delete cache index
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's ciscat results info

**Request**:

``GET`` ::

	/ciscat/:agent_id/results

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``benchmark``                | String        | Filters by benchmark.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``profile``                  | String        | Filters by evaluated profile.                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pass``                     | Number        | Filters by passed checks.                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``fail``                     | Number        | Filters by failed checks.                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``error``                    | Number        | Filters by encountered errors.                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``notchecked``               | Number        | Filters by not checked.                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``unknown``                  | Number        | Filters by unknown results.                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``score``                    | Number        | Filters by final score.                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

Get node node_id's configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns ossec.conf in JSON format.

**Request**:

``GET`` ::

	/cluster/:node_id/configuration

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``section``                  | String        | Indicates the ossec.conf section: global, rules, syscheck, rootcheck, remote, alerts, command, active-response, localfile.                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``field``                    | String        | Indicates a section child, e.g, fields for rule section are: include, decoder_dir, etc.                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/node02/configuration?section=global&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "email_notification": "no",
	      "alerts_log": "yes",
	      "jsonout_output": "yes",
	      "smtp_server": "smtp.example.wazuh.com",
	      "email_log_source": "alerts.log",
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


Get the cluster configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
	      "key": "9d273b53510fef702b54a92e9cffc82e",
	      "nodes": [
	         "172.17.0.100"
	      ],
	      "port": 1516
	   }
	}



Info
++++++++++++++++++++++++++++++++++++++++

Get info about cluster status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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


Get node node_id's status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the status of the manager processes.

**Request**:

``GET`` ::

	/cluster/:node_id/status

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/node02/status?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "wazuh-modulesd": "running",
	      "ossec-authd": "stopped",
	      "ossec-syscheckd": "running",
	      "ossec-monitord": "running",
	      "ossec-logcollector": "running",
	      "ossec-execd": "running",
	      "ossec-remoted": "running",
	      "wazuh-clusterd": "running",
	      "ossec-analysisd": "running",
	      "ossec-maild": "stopped"
	   }
	}


Get node_id's information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns basic information about manager.

**Request**:

``GET`` ::

	/cluster/:node_id/info

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/node02/info?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "compilation_date": "Fri Jan 11 18:44:25 UTC 2019",
	      "openssl_support": "yes",
	      "ruleset_version": "3801",
	      "tz_name": "UTC",
	      "tz_offset": "+0000",
	      "version": "v3.8.0",
	      "path": "/var/ossec",
	      "max_agents": "14000",
	      "type": "manager"
	   }
	}
	

Show cluster health
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Show cluster health

**Request**:

``GET`` ::

	/cluster/healthcheck

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``node``                     | String        | Filter information by node name.                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	               "ip": "172.17.0.101",
	               "version": "3.8.0",
	               "type": "worker",
	               "name": "node02",
	               "n_active_agents": 1
	            },
	            "status": {
	               "last_sync_agentinfo": {
	                  "date_start_master": "2019-01-11 18:52:57.72",
	                  "date_end_master": "2019-01-11 18:52:57.73",
	                  "total_agentinfo": 1
	               },
	               "sync_integrity_free": true,
	               "last_sync_agentgroups": {
	                  "date_end_master": "2019-01-11 18:52:51.56",
	                  "total_agentgroups": 0,
	                  "date_start_master": "2019-01-11 18:52:51.56"
	               },
	               "last_sync_integrity": {
	                  "total_files": {
	                     "shared": 2,
	                     "missing": 4,
	                     "extra_valid": 0,
	                     "extra": 0
	                  },
	                  "date_end_master": "2019-01-11 18:52:45.47",
	                  "date_start_master": "2019-01-11 18:52:44.36"
	               },
	               "last_keep_alive": "2019-01-11 18:52:16.661280",
	               "sync_agentinfo_free": true,
	               "sync_extravalid_free": true
	            }
	         },
	         "node01": {
	            "info": {
	               "ip": "172.17.0.100",
	               "version": "3.8.0",
	               "type": "master",
	               "name": "node01",
	               "n_active_agents": 1
	            }
	         }
	      },
	      "n_connected_nodes": 2
	   }
	}



Logs
++++++++++++++++++++++++++++++++++++++++

Get ossec.log from a specific node in cluster.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the three last months of ossec.log.

**Request**:

``GET`` ::

	/cluster/:node_id/logs

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type_log``                 | String        | Filters by type of log.                                                                                                                                                                                |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - all                                                                                                                                                                                                  |
|                              |               | - error                                                                                                                                                                                                |
|                              |               | - warning                                                                                                                                                                                              |
|                              |               | - info                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``category``                 | String        | Filters by category of log.                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/node02/logs?offset=0&limit=5&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 595,
	      "items": [
	         {
	            "timestamp": "2019-01-11 18:52:03",
	            "tag": "ossec-remoted",
	            "description": "(1409): Authentication file changed. Updating.",
	            "level": "info"
	         },
	         {
	            "timestamp": "2019-01-11 18:52:03",
	            "tag": "ossec-remoted",
	            "description": "(1410): Reading authentication keys file.",
	            "level": "info"
	         },
	         {
	            "tag": "wazuh-modulesd:syscollector",
	            "description": "Evaluation finished.",
	            "level": "info"
	            "timestamp": "2019-01-11 18:51:54",
	         },
	         {
	            "tag": "wazuh-modulesd:syscollector",
	            "description": "Starting evaluation.",
	            "level": "info"
	            "timestamp": "2019-01-11 18:51:54",
	         },
	         {
	            "tag": "ossec-remoted",
	            "description": "(1409): Authentication file changed. Updating.",
	            "level": "info"
	            "timestamp": "2019-01-11 18:51:54",
	         }
	      ]
	   }
	}


Get summary of ossec.log from a specific node in cluster.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a summary of the last three months of the <code>ossec.log</code> file.

**Request**:

``GET`` ::

	/cluster/:node_id/logs/summary

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/node02/logs/summary?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "wazuh-modulesd": {
	         "info": 2,
	         "all": 616,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 614
	      },
	      "wazuh-modulesd:oscap": {
	         "info": 2,
	         "all": 2,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-db": {
	         "info": 3,
	         "all": 3,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-authd": {
	         "info": 8,
	         "all": 13,
	         "critical": 0,
	         "error": 5,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:ciscat": {
	         "info": 2,
	         "all": 2,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:syscollector": {
	         "info": 15,
	         "all": 15,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-rootcheck": {
	         "info": 6,
	         "all": 6,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-monitord": {
	         "info": 3,
	         "all": 3,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-logcollector": {
	         "info": 19,
	         "all": 19,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-execd": {
	         "info": 4,
	         "all": 4,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-remoted": {
	         "info": 115,
	         "all": 564,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 449
	      },
	      "ossec-syscheckd": {
	         "info": 55,
	         "all": 55,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:osquery": {
	         "info": 2,
	         "all": 2,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:download": {
	         "info": 2,
	         "all": 2,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-analysisd": {
	         "info": 449,
	         "all": 449,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:database": {
	         "info": 2,
	         "all": 67,
	         "critical": 0,
	         "error": 65,
	         "debug": 0,
	         "warning": 0
	      }
	   }
	}



Nodes
++++++++++++++++++++++++++++++++++++++++

Get local node info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
	      "ip": "172.17.0.100",
	      "version": "3.8.0",
	      "type": "master",
	      "name": "node01"
	   }
	}


Get nodes info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the nodes info

**Request**:

``GET`` ::

	/cluster/nodes

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                     | String        | Filters by node type.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	            "ip": "172.17.0.101",
	            "version": "3.8.0",
	            "type": "worker",
	            "name": "node02"
	         },
	         {
	            "ip": "172.17.0.100",
	            "version": "3.8.0",
	            "type": "master",
	            "name": "node01"
	         }
	      ]
	   }
	}



Stats
++++++++++++++++++++++++++++++++++++++++

Get node node_id's analysisd stats
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a summary of the current analysisd stats on the node.

**Request**:

``GET`` ::

	/cluster/:node_id/stats/analysisd

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/node02/analysisd/stats?pretty"

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

Get node node_id's remoted stats
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a summary of the current remoted stats on the node.

**Request**:

``GET`` ::

	/cluster/:node_id/stats/remoted

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/node02/stats/remoted?pretty"

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

Get node node_id's stats
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns Wazuh statistical information for the current or specified date.

**Request**:

``GET`` ::

	/cluster/:node_id/stats

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``date``                     | String        | Selects the date for getting the statistical information. Format: YYYYMMDD                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/node02/stats?pretty"

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

Get node node_id's stats by hour
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns Wazuh statistical information per hour. Each number in the averages field represents the average of alerts per hour.

**Request**:

``GET`` ::

	/cluster/:node_id/stats/hourly

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/node02/stats/hourly?pretty"

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

Get node node_id's stats by week
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns Wazuh statistical information per week. Each number in the hours field represents the average alerts per hour for that specific day.

**Request**:

``GET`` ::

	/cluster/:node_id/stats/weekly

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/node02/stats/weekly?pretty"

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



Decoders
----------------------------------------
Info
++++++++++++++++++++++++++++++++++++++++

Get all decoders
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all decoders included in ossec.conf.

**Request**:

``GET`` ::

	/decoders

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``                     | String        | Filters by filename.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``                     | String        | Filters by path.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters the decoders by status.                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - enabled                                                                                                                                                                                              |
|                              |               | - disabled                                                                                                                                                                                             |
|                              |               | - all                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/decoders?pretty&offset=0&limit=2&sort=+file,position"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 571,
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all decoders files included in ossec.conf.

**Request**:

``GET`` ::

	/decoders/files

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters the decoders by status.                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - enabled                                                                                                                                                                                              |
|                              |               | - disabled                                                                                                                                                                                             |
|                              |               | - all                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``                     | String        | Filters by filename.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``                     | String        | Filters by path.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``download``                 | String        | Downloads the file                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/decoders/files?pretty&offset=0&limit=10&sort=-path"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 96,
	      "items": [
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0465-azure_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0055-cimserver_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0030-arpwatch_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0370-vsftpd_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0445-exim_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0315-su_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0205-pam_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0080-courier_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0190-openvpn_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0045-barracuda_decoders.xml"
	         }
	      ]
	   }
	}
	

Get all parent decoders
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all parent decoders included in ossec.conf

**Request**:

``GET`` ::

	/decoders/parents

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/decoders/parents?pretty&offset=0&limit=2&sort=-file"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 153,
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
	            "name": "azure-storage",
	            "details": {
	               "regex": "^azure_storage_tag: (\\S+)",
	               "order": "tag",
	               "prematch": "^azure_tag: azure-storage. "
	            },
	            "file": "0465-azure_decoders.xml",
	            "position": 0,
	            "path": "/var/ossec/ruleset/decoders"
	         }
	      ]
	   }
	}
	

Get decoders by name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the decoders with the specified name.

**Request**:

``GET`` ::

	/decoders/:decoder_name

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``decoder_name``             | String        | Decoder name.                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
Clear
++++++++++++++++++++++++++++++++++++++++

Clear syscheck database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears the syscheck database for all agents.

**Request**:

``DELETE`` ::

	/experimental/syscheck

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/experimental/syscheck?pretty"

**Example Response:**
::

	{
	    "data": "Syscheck database deleted", 
	    "error": 0
	}


Hardware
++++++++++++++++++++++++++++++++++++++++

Get hardware info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's hardware info

**Request**:

``GET`` ::

	/experimental/syscollector/hardware

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ram_free``                 | String        | Filters by ram_free.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ram_total``                | String        | Filters by ram_total.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cpu_cores``                | String        | Filters by cpu_cores.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cpu_mhz``                  | String        | Filters by cpu_mhz.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cpu_name``                 | String        | Filters by cpu_name.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``board_serial``             | String        | Filters by board_serial.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/hardware?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 4,
	      "items": [
	         {
	            "cpu": {
	               "cores": 2,
	               "mhz": 1991.999,
	               "name": "Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz"
	            },
	            "ram": {
	               "usage": 90,
	               "total": 492832,
	               "free": 52600
	            },
	            "scan": {
	               "id": 1510104912,
	               "time": "2019/01/11 18:46:14"
	            },
	            "agent_id": "000",
	            "board_serial": "0"
	         },
	         {
	            "cpu": {
	               "cores": 1,
	               "mhz": 1991.999,
	               "name": "Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz"
	            },
	            "ram": {
	               "usage": 94,
	               "total": 234968,
	               "free": 16228
	            },
	            "scan": {
	               "id": 307366873,
	               "time": "2019/01/11 18:52:21"
	            },
	            "agent_id": "001",
	            "board_serial": "0"
	         },
	         {
	            "cpu": {
	               "cores": 2,
	               "mhz": 1991.999,
	               "name": "Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz"
	            },
	            "ram": {
	               "usage": 91,
	               "total": 492832,
	               "free": 48984
	            },
	            "scan": {
	               "id": 308938316,
	               "time": "2019/01/11 18:41:01"
	            },
	            "agent_id": "000",
	            "board_serial": "0"
	         }
	      ]
	   }
	}
	


Netaddr
++++++++++++++++++++++++++++++++++++++++

Get network address info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network address info

**Request**:

``GET`` ::

	/experimental/syscollector/netaddr

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``proto``                    | String        | Filters by proto.                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``address``                  | String        | Filters by address.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``broadcast``                | String        | Filters by broadcast.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``netmask``                  | String        | Filters by netmask.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/netaddr?pretty&limit=2&sort=proto"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 16,
	      "items": [
	         {
	            "scan_id": 1369259489,
	            "iface": "enp0s3",
	            "proto": "ipv6",
	            "netmask": "ffff:ffff:ffff:ffff::",
	            "agent_id": "000",
	            "address": "fe80::2f:73ff:feea:2792"
	         },
	         {
	            "scan_id": 1369259489,
	            "iface": "enp0s8",
	            "proto": "ipv6",
	            "netmask": "ffff:ffff:ffff:ffff::",
	            "agent_id": "000",
	            "address": "fe80::a00:27ff:fe43:a0ca"
	         }
	      ]
	   }
	}
	


Netiface
++++++++++++++++++++++++++++++++++++++++

Get network interface info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network interface info

**Request**:

``GET`` ::

	/experimental/syscollector/netiface

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``                     | String        | Filters by name.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``adapter``                  | String        | Filters by adapter.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                     | String        | Filters by type.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``                    | String        | Filters by state.                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``mtu``                      | String        | Filters by mtu.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_packets``               | String        | Filters by tx_packets.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_packets``               | String        | Filters by rx_packets.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_bytes``                 | String        | Filters by tx_bytes.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_bytes``                 | String        | Filters by rx_bytes.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_errors``                | String        | Filters by tx_errors.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_errors``                | String        | Filters by rx_errors.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_dropped``               | String        | Filters by tx_dropped.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_dropped``               | String        | Filters by rx_dropped.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/netiface?pretty&limit=2"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 8,
	      "items": [
	         {
	            "name": "enp0s3",
	            "tx": {
	               "bytes": 2623337,
	               "errors": 0,
	               "packets": 41065,
	               "dropped": 0
	            },
	            "scan": {
	               "id": 1369259489,
	               "time": "2019/01/11 18:46:14"
	            },
	            "rx": {
	               "bytes": 137673558,
	               "errors": 0,
	               "packets": 102456,
	               "dropped": 0
	            },
	            "state": "up",
	            "mtu": 1500,
	            "mac": "02:2F:73:EA:27:92",
	            "agent_id": "000",
	            "type": "ethernet"
	         },
	         {
	            "name": "enp0s8",
	            "tx": {
	               "bytes": 8454,
	               "errors": 0,
	               "packets": 36,
	               "dropped": 0
	            },
	            "scan": {
	               "id": 1369259489,
	               "time": "2019/01/11 18:46:14"
	            },
	            "rx": {
	               "bytes": 3710,
	               "errors": 0,
	               "packets": 20,
	               "dropped": 0
	            },
	            "state": "up",
	            "mtu": 1500,
	            "mac": "08:00:27:43:A0:CA",
	            "agent_id": "000",
	            "type": "ethernet"
	         }
	      ]
	   }
	}
	


Netproto
++++++++++++++++++++++++++++++++++++++++

Get network protocol info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network protocol info

**Request**:

``GET`` ::

	/experimental/syscollector/netproto

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``iface``                    | String        | Filters by iface.                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                     | String        | Filters by type.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``gateway``                  | String        | Filters by gateway.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``dhcp``                     | String        | Filters by dhcp.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/netproto?pretty&limit=2&sort=type"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 16,
	      "items": [
	         {
	            "dhcp": "enabled",
	            "scan_id": 1369259489,
	            "iface": "enp0s3",
	            "type": "ipv6",
	            "agent_id": "000"
	         },
	         {
	            "dhcp": "enabled",
	            "scan_id": 1369259489,
	            "iface": "enp0s8",
	            "type": "ipv6",
	            "agent_id": "000"
	         }
	      ]
	   }
	}
	


OS
++++++++++++++++++++++++++++++++++++++++

Get os info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's os info

**Request**:

``GET`` ::

	/experimental/syscollector/os

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os_name``                  | String        | Filters by os_name.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``architecture``             | String        | Filters by architecture.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os_version``               | String        | Filters by os_version.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``version``                  | String        | Filters by version.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``release``                  | String        | Filters by release.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/os?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 4,
	      "items": [
	         {
	            "sysname": "Linux",
	            "scan": {
	               "id": 1326171823,
	               "time": "2019/01/11 18:46:14"
	            },
	            "hostname": "worker-1",
	            "version": "#46-Ubuntu SMP Thu Dec 6 14:45:28 UTC 2018",
	            "agent_id": "000",
	            "release": "4.15.0-43-generic",
	            "os": {
	               "major": "18",
	               "name": "Ubuntu",
	               "platform": "ubuntu",
	               "version": "18.04.1 LTS (Bionic Beaver)",
	               "codename": "Bionic Beaver",
	               "minor": "04"
	            },
	            "architecture": "x86_64"
	         },
	         {
	            "sysname": "Linux",
	            "scan": {
	               "id": 662342450,
	               "time": "2019/01/11 18:52:21"
	            },
	            "hostname": "agent-1",
	            "version": "#46-Ubuntu SMP Thu Dec 6 14:45:28 UTC 2018",
	            "agent_id": "001",
	            "release": "4.15.0-43-generic",
	            "os": {
	               "major": "18",
	               "name": "Ubuntu",
	               "platform": "ubuntu",
	               "version": "18.04.1 LTS (Bionic Beaver)",
	               "codename": "Bionic Beaver",
	               "minor": "04"
	            },
	            "architecture": "x86_64"
	         },
	         {
	            "sysname": "Linux",
	            "scan": {
	               "id": 2045709396,
	               "time": "2019/01/11 18:41:01"
	            },
	            "hostname": "master",
	            "version": "#46-Ubuntu SMP Thu Dec 6 14:45:28 UTC 2018",
	            "agent_id": "000",
	            "release": "4.15.0-43-generic",
	            "os": {
	               "major": "18",
	               "name": "Ubuntu",
	               "platform": "ubuntu",
	               "version": "18.04.1 LTS (Bionic Beaver)",
	               "codename": "Bionic Beaver",
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's packages info

**Request**:

``GET`` ::

	/experimental/syscollector/packages

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``vendor``                   | String        | Filters by vendor.                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``                     | String        | Filters by name.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``architecture``             | String        | Filters by architecture.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``format``                   | String        | Filters by format.                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/packages?pretty&sort=-name&limit=2"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 2227,
	      "items": [
	         {
	            "description": "Access control list utilities",
	            "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
	            "name": "acl",
	            "format": "deb",
	            "section": "utils",
	            "scan": {
	               "id": 247177813,
	               "time": "2019/01/11 18:46:14"
	            },
	            "priority": "optional",
	            "version": "2.2.52-3build1",
	            "architecture": "amd64",
	            "multiarch": "foreign",
	            "size": 200,
	            "agent_id": "000"
	         },
	         {
	            "description": "Access control list utilities",
	            "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
	            "name": "acl",
	            "format": "deb",
	            "section": "utils",
	            "scan": {
	               "id": 1051384738,
	               "time": "2019/01/11 18:41:01"
	            },
	            "priority": "optional",
	            "version": "2.2.52-3build1",
	            "architecture": "amd64",
	            "multiarch": "foreign",
	            "size": 200,
	            "agent_id": "000"
	         }
	      ]
	   }
	}
	


Ports
++++++++++++++++++++++++++++++++++++++++

Get ports info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's ports info

**Request**:

``GET`` ::

	/experimental/syscollector/ports

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pid``                      | Number        | Filters by pid.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``protocol``                 | String        | Filters by protocol.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``local_ip``                 | String        | Filters by local_ip.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``local_port``               | Number        | Filters by local_port.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``remote_ip``                | String        | Filters by remote_ip.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_queue``                 | Number        | Filters by tx_queue.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``                    | String        | Filters by state.                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``process``                  | String        | Filters by process.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/ports?pretty&limit=2&sort=protocol"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 20,
	      "items": [
	         {
	            "remote": {
	               "ip": "::",
	               "port": 0
	            },
	            "scan": {
	               "id": 1455373406,
	               "time": "2019/01/11 18:46:22"
	            },
	            "local": {
	               "ip": "::",
	               "port": 22
	            },
	            "state": "listening",
	            "tx_queue": 0,
	            "agent_id": "000",
	            "protocol": "tcp6",
	            "rx_queue": 0,
	            "inode": 18997
	         },
	         {
	            "remote": {
	               "ip": "::",
	               "port": 0
	            },
	            "scan": {
	               "id": 1455373406,
	               "time": "2019/01/11 18:46:22"
	            },
	            "local": {
	               "ip": "::",
	               "port": 55000
	            },
	            "state": "listening",
	            "tx_queue": 0,
	            "agent_id": "000",
	            "protocol": "tcp6",
	            "rx_queue": 0,
	            "inode": 222031
	         }
	      ]
	   }
	}
	


Processes
++++++++++++++++++++++++++++++++++++++++

Get processes info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's processes info

**Request**:

``GET`` ::

	/experimental/syscollector/processes

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pid``                      | Number        | Filters by process pid.                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``                    | String        | Filters by process state.                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ppid``                     | Number        | Filters by process parent pid.                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``egroup``                   | String        | Filters by process egroup.                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``euser``                    | String        | Filters by process euser.                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``fgroup``                   | String        | Filters by process fgroup.                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``                     | String        | Filters by process name.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``nlwp``                     | Number        | Filters by process nlwp.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pgrp``                     | Number        | Filters by process pgrp.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``priority``                 | Number        | Filters by process priority.                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rgroup``                   | String        | Filters by process rgroup.                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ruser``                    | String        | Filters by process ruser.                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sgroup``                   | String        | Filters by process sgroup.                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``suser``                    | String        | Filters by process suser.                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/processes?pretty&limit=2&sort=priority"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 446,
	      "items": [
	         {
	            "tty": 0,
	            "rgroup": "root",
	            "sgroup": "root",
	            "scan": {
	               "id": 1076911529,
	               "time": "2019/01/11 18:46:22"
	            },
	            "resident": 1936,
	            "pid": "1",
	            "session": 1,
	            "size": 56353,
	            "egroup": "root",
	            "tgid": 1,
	            "priority": 20,
	            "fgroup": "root",
	            "state": "S",
	            "ppid": 0,
	            "nice": 0,
	            "euser": "root",
	            "share": 1323,
	            "start_time": 6,
	            "agent_id": "000",
	            "vm_size": 225412,
	            "utime": 133,
	            "nlwp": 1,
	            "name": "systemd",
	            "cmd": "/sbin/init",
	            "pgrp": 1,
	            "ruser": "root",
	            "suser": "root",
	            "processor": 1,
	            "stime": 536
	         },
	         {
	            "tty": 0,
	            "rgroup": "root",
	            "sgroup": "root",
	            "scan": {
	               "id": 880020033,
	               "time": "2019/01/11 18:41:08"
	            },
	            "resident": 1757,
	            "pid": "1",
	            "session": 1,
	            "size": 39968,
	            "egroup": "root",
	            "tgid": 1,
	            "priority": 20,
	            "fgroup": "root",
	            "state": "S",
	            "ppid": 0,
	            "nice": 0,
	            "euser": "root",
	            "share": 1144,
	            "start_time": 5,
	            "agent_id": "000",
	            "vm_size": 159872,
	            "utime": 142,
	            "nlwp": 1,
	            "name": "systemd",
	            "cmd": "/sbin/init",
	            "pgrp": 1,
	            "ruser": "root",
	            "suser": "root",
	            "processor": 1,
	            "stime": 775
	         }
	      ]
	   }
	}
	


Results
++++++++++++++++++++++++++++++++++++++++

Get CIS-CAT results
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's ciscat results info

**Request**:

``GET`` ::

	/experimental/ciscat/results

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``benchmark``                | String        | Filters by benchmark.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``profile``                  | String        | Filters by evaluated profile.                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pass``                     | Number        | Filters by passed checks.                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``fail``                     | Number        | Filters by failed checks.                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``error``                    | Number        | Filters by encountered errors.                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``notchecked``               | Number        | Filters by not checked.                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``unknown``                  | Number        | Filters by unknown results.                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``score``                    | Number        | Filters by final score.                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns ossec.conf in JSON format.

**Request**:

``GET`` ::

	/manager/configuration

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``section``                  | String        | Indicates the ossec.conf section: global, rules, syscheck, rootcheck, remote, alerts, command, active-response, localfile.                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``field``                    | String        | Indicates a section child, e.g, fields for rule section are: include, decoder_dir, etc.                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	      "email_log_source": "alerts.log",
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
	      "compilation_date": "Fri Jan 11 18:40:06 UTC 2019",
	      "version": "v3.8.0",
	      "openssl_support": "yes",
	      "max_agents": "14000",
	      "ruleset_version": "3801",
	      "path": "/var/ossec",
	      "tz_name": "UTC",
	      "type": "manager",
	      "tz_offset": "+0000"
	   }
	}
	

Get manager status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
	      "ossec-authd": "running",
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the three last months of ossec.log.

**Request**:

``GET`` ::

	/manager/logs

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type_log``                 | String        | Filters by type of log.                                                                                                                                                                                |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - all                                                                                                                                                                                                  |
|                              |               | - error                                                                                                                                                                                                |
|                              |               | - warning                                                                                                                                                                                              |
|                              |               | - info                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``category``                 | String        | Filters by category of log.                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/logs?offset=0&limit=5&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 623,
	      "items": [
	         {
	            "timestamp": "2019-01-11 18:52:51",
	            "tag": "ossec-remoted",
	            "description": "(1409): Authentication file changed. Updating.",
	            "level": "info"
	         },
	         {
	            "timestamp": "2019-01-11 18:52:50",
	            "tag": "ossec-remoted",
	            "description": "(1410): Reading authentication keys file.",
	            "level": "info"
	         },
	         {
	            "timestamp": "2019-01-11 18:52:47",
	            "tag": "ossec-authd",
	            "description": "Agent key generated for agent 'NewHost' (requested locally)",
	            "level": "info"
	         },
	         {
	            "timestamp": "2019-01-11 18:52:47",
	            "tag": "ossec-authd",
	            "description": "Agent key generated for agent 'myNewAgent' (requested locally)",
	            "level": "info"
	         }
	      ]
	   }
	}
	

Get summary of ossec.log
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
	         "info": 2,
	         "all": 2,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:oscap": {
	         "info": 2,
	         "all": 2,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-db": {
	         "info": 3,
	         "all": 3,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-authd": {
	         "info": 35,
	         "all": 36,
	         "critical": 0,
	         "error": 1,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:ciscat": {
	         "info": 2,
	         "all": 2,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:syscollector": {
	         "info": 7,
	         "all": 7,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-rootcheck": {
	         "info": 8,
	         "all": 8,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-monitord": {
	         "info": 3,
	         "all": 3,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-logcollector": {
	         "info": 19,
	         "all": 19,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-execd": {
	         "info": 4,
	         "all": 4,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-remoted": {
	         "info": 21,
	         "all": 21,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-syscheckd": {
	         "info": 57,
	         "all": 57,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:osquery": {
	         "info": 2,
	         "all": 2,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:download": {
	         "info": 2,
	         "all": 2,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "ossec-analysisd": {
	         "info": 453,
	         "all": 453,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      },
	      "wazuh-modulesd:database": {
	         "info": 2,
	         "all": 2,
	         "critical": 0,
	         "error": 0,
	         "debug": 0,
	         "warning": 0
	      }
	   }
	}
	


Stats
++++++++++++++++++++++++++++++++++++++++

Get analysisd stats
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a summary of the current analysisd stats.

**Request**:

``GET`` ::

	/manager/stats/analysisd

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/stats/analysisd?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "archives_queue_size": 16384,
	      "events_dropped": 0,
	      "alerts_queue_size": 16384,
	      "rule_matching_queue_usage": 0,
	      "events_processed": 6,
	      "event_queue_usage": 0,
	      "events_edps": 1,
	      "hostinfo_events_decoded": 0,
	      "syscollector_events_decoded": 0,
	      "rootcheck_edps": 0,
	      "firewall_queue_usage": 0,
	      "winevt_edps": 0,
	      "firewall_queue_size": 16384,
	      "alerts_written": 0,
	      "firewall_written": 0,
	      "syscheck_queue_size": 16384,
	      "events_received": 6,
	      "rootcheck_queue_usage": 0,
	      "rootcheck_events_decoded": 0,
	      "rootcheck_queue_size": 16384,
	      "syscheck_edps": 0,
	      "fts_written": 0,
	      "syscheck_queue_usage": 0,
	      "other_events_edps": 1,
	      "statistical_queue_usage": 0,
	      "hostinfo_edps": 0,
	      "winevt_queue_size": 16384,
	      "hostinfo_queue_usage": 0,
	      "syscheck_events_decoded": 0,
	      "syscollector_queue_usage": 0,
	      "archives_queue_usage": 0,
	      "statistical_queue_size": 16384,
	      "total_events_decoded": 6,
	      "alerts_queue_usage": 0,
	      "hostinfo_queue_size": 16384,
	      "syscollector_queue_size": 16384,
	      "rule_matching_queue_size": 16384,
	      "other_events_decoded": 6,
	      "winevt_queue_usage": 0,
	      "event_queue_size": 16384,
	      "syscollector_edps": 0,
	      "winevt_events_decoded": 0
	   }
	}
	

Get manager stats
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns Wazuh statistical information for the current or specified date.

**Request**:

``GET`` ::

	/manager/stats

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``date``                     | String        | Selects the date for getting the statistical information. Format: YYYYMMDD                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

Get remoted stats
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a summary of the current remoted stats.

**Request**:

``GET`` ::

	/manager/stats/remoted

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/stats/remoted?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "discarded_count": 0,
	      "msg_sent": 0,
	      "queue_size": 0,
	      "ctrl_msg_count": 0,
	      "evt_count": 0,
	      "tcp_sessions": 0,
	      "total_queue_size": 131072
	   }
	}
	



Rootcheck
----------------------------------------
Clear
++++++++++++++++++++++++++++++++++++++++

Clear rootcheck database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears the rootcheck database for a specific agent.

**Request**:

``DELETE`` ::

	/rootcheck/:agent_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the timestamp of the last rootcheck scan.

**Request**:

``GET`` ::

	/rootcheck/:agent_id/last_scan

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rootcheck/000/last_scan?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "start": "2019-01-11 18:51:43",
	      "end": "2019-01-11 18:52:08"
	   }
	}
	

Get rootcheck CIS requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the CIS requirements of all rootchecks of the specified agent.

**Request**:

``GET`` ::

	/rootcheck/:agent_id/cis

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rootcheck/000/cis?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 2,
	      "items": [
	         "2.3 Debian Linux",
	         "1.4 Debian Linux"
	      ]
	   }
	}
	

Get rootcheck database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the rootcheck database of an agent.

**Request**:

``GET`` ::

	/rootcheck/:agent_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pci``                      | String        | Filters by pci requirement.                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cis``                      | String        | Filters by CIS.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters by status.                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rootcheck/000?offset=0&limit=2&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 6,
	      "items": [
	         {
	            "status": "outstanding",
	            "oldDay": "2019-01-11 18:40:30",
	            "event": "System Audit: SSH Hardening - 3: Root can log in. File: /etc/ssh/sshd_config. Reference: 3 .",
	            "readDay": "2019-01-11 18:51:45"
	         },
	         {
	            "status": "outstanding",
	            "oldDay": "2019-01-11 18:40:30",
	            "pci": "2.2.4",
	            "event": "System Audit: SSH Hardening - 4: No Public Key authentication {PCI_DSS: 2.2.4}. File: /etc/ssh/sshd_config. Reference: 4 .",
	            "readDay": "2019-01-11 18:51:45"
	         }
	      ]
	   }
	}
	

Get rootcheck pci requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the PCI requirements of all rootchecks of the agent.

**Request**:

``GET`` ::

	/rootcheck/:agent_id/pci

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rootcheck/000/pci?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 2,
	      "items": [
	         "4.1",
	         "2.2.4"
	      ]
	   }
	}
	


Run
++++++++++++++++++++++++++++++++++++++++

Run rootcheck scan in all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs syscheck and rootcheck on a specified agent (Wazuh launches both processes simultaneously)

**Request**:

``PUT`` ::

	/rootcheck/:agent_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all rules.

**Request**:

``GET`` ::

	/rules

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters the rules by status.                                                                                                                                                                           |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - enabled                                                                                                                                                                                              |
|                              |               | - disabled                                                                                                                                                                                             |
|                              |               | - all                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group``                    | String        | Filters the rules by group.                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``level``                    | Range         | Filters the rules by level. level=2 or level=2-5.                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``                     | String        | Filters the rules by path.                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``                     | String        | Filters the rules by file name.                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pci``                      | String        | Filters the rules by pci requirement.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``gdpr``                     | String        | Filters the rules by gdpr.                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules?offset=0&limit=2&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 2112,
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the files of all rules.

**Request**:

``GET`` ::

	/rules/files

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters files by status.                                                                                                                                                                               |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - enabled                                                                                                                                                                                              |
|                              |               | - disabled                                                                                                                                                                                             |
|                              |               | - all                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``                     | String        | Filters the rules by path.                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``                     | String        | Filters the rules by filefile.                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``download``                 | String        | Downloads the file                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/files?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 111,
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the GDPR requirements of all rules.

**Request**:

``GET`` ::

	/rules/gdpr

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the groups of all rules.

**Request**:

``GET`` ::

	/rules/groups

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/groups?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 317,
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the PCI requirements of all rules.

**Request**:

``GET`` ::

	/rules/pci

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the rules with the specified id.

**Request**:

``GET`` ::

	/rules/:rule_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``id``                       | Number        | rule.                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	               "match": "core_dumped|failure|error|attack| bad |illegal |denied|refused|unauthorized|fatal|failed|Segmentation Fault|Corrupted"
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

Clear syscheck database of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears the syscheck database for the specified agent.

**Request**:

``DELETE`` ::

	/syscheck/:agent_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Return the timestamp of the last syscheck scan.

**Request**:

``GET`` ::

	/syscheck/:agent_id/last_scan

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscheck/000/last_scan?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "start": "2019-01-11 18:53:32",
	      "end": "2019-01-11 18:52:27"
	   }
	}
	

Get syscheck files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the syscheck files of an agent.

**Request**:

``GET`` ::

	/syscheck/:agent_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``                     | String        | Filters file by filename.                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                     | String        | Selects type of file.                                                                                                                                                                                  |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - file                                                                                                                                                                                                 |
|                              |               | - registry                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``summary``                  | String        | Returns a summary grouping by filename.                                                                                                                                                                |
|                              |               |                                                                                                                                                                                                        |
|                              |               | Allowed values:                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                        |
|                              |               | - yes                                                                                                                                                                                                  |
|                              |               | - no                                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``md5``                      | String        | Returns the files with the specified md5 hash.                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sha1``                     | String        | Returns the files with the specified sha1 hash.                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sha256``                   | String        | Returns the files with the specified sha256 hash.                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``hash``                     | String        | Returns the files with the specified hash (md5, sha1 or sha256).                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscheck/000?offset=0&limit=2&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 2947,
	      "items": [
	         {
	            "sha1": "8163bdb537ae25675b9e5be5c767d97a26a596fd",
	            "uid": "0",
	            "type": "file",
	            "gname": "root",
	            "perm": "100644",
	            "uname": "root",
	            "gid": "0",
	            "file": "/etc/cron.weekly/.placeholder",
	            "mtime": "2017-11-16 05:29:19",
	            "date": "2019-01-11 18:41:22",
	            "sha256": "49674d9b1bd433cdb58f30497f6c441dc823de549160eef5c1acec4c20786810",
	            "inode": 1151,
	            "md5": "e5e12910bf011222160404d7bdb824f2",
	            "size": 102
	         },
	         {
	            "sha1": "72e775a244a55f00dfc0edddf3b043e4cebcd159",
	            "uid": "0",
	            "type": "file",
	            "gname": "root",
	            "perm": "100755",
	            "uname": "root",
	            "gid": "0",
	            "file": "/etc/cron.weekly/man-db",
	            "mtime": "2018-04-07 10:39:15",
	            "date": "2019-01-11 18:41:22",
	            "sha256": "bc0fbed10680ad2e64f5f0d6dfddd40cdbae6c0d58eb10127efe2d1fc8826bc3",
	            "inode": 1152,
	            "md5": "40fa232bff2326e0f82837a360d0055f",
	            "size": 723
	         }
	      ]
	   }
	}
	


Run
++++++++++++++++++++++++++++++++++++++++

Run syscheck scan in all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs syscheck and rootcheck on an agent (Wazuh launches both processes simultaneously).

**Request**:

``PUT`` ::

	/syscheck/:agent_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's hardware info

**Request**:

``GET`` ::

	/syscollector/:agent_id/hardware

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/hardware?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "ram": {
	         "usage": 91,
	         "total": 492832,
	         "free": 48984
	      },
	      "scan": {
	         "id": 308938316,
	         "time": "2019/01/11 18:41:01"
	      },
	      "cpu": {
	         "cores": 2,
	         "mhz": 1991.999,
	         "name": "Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz"
	      },
	      "board_serial": "0"
	   }
	}
	


Netaddr
++++++++++++++++++++++++++++++++++++++++

Get network address info of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network address info

**Request**:

``GET`` ::

	/syscollector/:agent_id/netaddr

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``iface``                    | String        | Filters by interface name.                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``proto``                    | String        | Filters by proto.                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``address``                  | String        | Filters by address.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``broadcast``                | String        | Filters by broadcast.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``netmask``                  | String        | Filters by netmask.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	            "proto": "ipv6",
	            "scan_id": 482885448,
	            "iface": "enp0s3",
	            "netmask": "ffff:ffff:ffff:ffff::",
	            "address": "fe80::2f:73ff:feea:2792"
	         },
	         {
	            "proto": "ipv6",
	            "scan_id": 482885448,
	            "iface": "enp0s8",
	            "netmask": "ffff:ffff:ffff:ffff::",
	            "address": "fe80::a00:27ff:feba:59df"
	         }
	      ]
	   }
	}
	


Netiface
++++++++++++++++++++++++++++++++++++++++

Get network interface info of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network interface info

**Request**:

``GET`` ::

	/syscollector/:agent_id/netiface

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``                     | String        | Filters by name.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``adapter``                  | String        | Filters by adapter.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                     | String        | Filters by type.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``                    | String        | Filters by state.                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``mtu``                      | String        | Filters by mtu.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_packets``               | String        | Filters by tx_packets.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_packets``               | String        | Filters by rx_packets.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_bytes``                 | String        | Filters by tx_bytes.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_bytes``                 | String        | Filters by rx_bytes.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_errors``                | String        | Filters by tx_errors.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_errors``                | String        | Filters by rx_errors.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_dropped``               | String        | Filters by tx_dropped.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_dropped``               | String        | Filters by rx_dropped.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	               "bytes": 1787453,
	               "errors": 0,
	               "packets": 27134,
	               "dropped": 0
	            },
	            "scan": {
	               "id": 482885448,
	               "time": "2019/01/11 18:41:01"
	            },
	            "rx": {
	               "bytes": 137550339,
	               "errors": 0,
	               "packets": 100233,
	               "dropped": 0
	            },
	            "mac": "02:2F:73:EA:27:92",
	            "mtu": 1500,
	            "state": "up",
	            "type": "ethernet"
	         },
	         {
	            "name": "enp0s8",
	            "tx": {
	               "bytes": 5996,
	               "errors": 0,
	               "packets": 26,
	               "dropped": 0
	            },
	            "scan": {
	               "id": 482885448,
	               "time": "2019/01/11 18:41:01"
	            },
	            "rx": {
	               "bytes": 516,
	               "errors": 0,
	               "packets": 6,
	               "dropped": 0
	            },
	            "mac": "08:00:27:BA:59:DF",
	            "mtu": 1500,
	            "state": "up",
	            "type": "ethernet"
	         }
	      ]
	   }
	}
	


Netproto
++++++++++++++++++++++++++++++++++++++++

Get network protocol info of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network protocol info

**Request**:

``GET`` ::

	/syscollector/:agent_id/netproto

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``iface``                    | String        | Filters by iface.                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                     | String        | Filters by type.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``gateway``                  | String        | Filters by gateway.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``dhcp``                     | String        | Filters by dhcp.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	            "scan_id": 482885448,
	            "iface": "enp0s3",
	            "type": "ipv6"
	         },
	         {
	            "dhcp": "enabled",
	            "scan_id": 482885448,
	            "iface": "enp0s8",
	            "type": "ipv6"
	         }
	      ]
	   }
	}
	


OS
++++++++++++++++++++++++++++++++++++++++

Get os info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's OS info

**Request**:

``GET`` ::

	/syscollector/:agent_id/os

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/os?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "sysname": "Linux",
	      "scan": {
	         "id": 2045709396,
	         "time": "2019/01/11 18:41:01"
	      },
	      "hostname": "master",
	      "version": "#46-Ubuntu SMP Thu Dec 6 14:45:28 UTC 2018",
	      "architecture": "x86_64",
	      "release": "4.15.0-43-generic",
	      "os": {
	         "major": "18",
	         "name": "Ubuntu",
	         "platform": "ubuntu",
	         "version": "18.04.1 LTS (Bionic Beaver)",
	         "codename": "Bionic Beaver",
	         "minor": "04"
	      }
	   }
	}
	


Packages
++++++++++++++++++++++++++++++++++++++++

Get packages info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's packages info

**Request**:

``GET`` ::

	/syscollector/:agent_id/packages

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``vendor``                   | String        | Filters by vendor.                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``                     | String        | Filters by name.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``architecture``             | String        | Filters by architecture.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``format``                   | String        | Filters by format.                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``version``                  | String        | Filters by version.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/packages?pretty&limit=2&offset=10&sort=-name"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 576,
	      "items": [
	         {
	            "description": "Debian base system miscellaneous files",
	            "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
	            "name": "base-files",
	            "format": "deb",
	            "section": "admin",
	            "scan": {
	               "id": 1051384738,
	               "time": "2019/01/11 18:41:01"
	            },
	            "priority": "required",
	            "version": "10.1ubuntu2.3",
	            "architecture": "amd64",
	            "multiarch": "foreign",
	            "size": 386
	         },
	         {
	            "description": "Debian base system master password and group files",
	            "vendor": "Colin Watson <cjwatson@debian.org>",
	            "name": "base-passwd",
	            "format": "deb",
	            "section": "admin",
	            "scan": {
	               "id": 1051384738,
	               "time": "2019/01/11 18:41:01"
	            },
	            "priority": "required",
	            "version": "3.5.44",
	            "architecture": "amd64",
	            "multiarch": "foreign",
	            "size": 228
	         }
	      ]
	   }
	}
	


Ports
++++++++++++++++++++++++++++++++++++++++

Get ports info of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's ports info

**Request**:

``GET`` ::

	/syscollector/:agent_id/ports

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pid``                      | Number        | Filters by pid.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``protocol``                 | String        | Filters by protocol.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``local_ip``                 | String        | Filters by local_ip.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``local_port``               | Number        | Filters by local_port.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``remote_ip``                | String        | Filters by remote_ip.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_queue``                 | Number        | Filters by tx_queue.                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``                    | String        | Filters by state.                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/ports?pretty&sort=-protocol&limit=2"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 6,
	      "items": [
	         {
	            "remote": {
	               "ip": "0.0.0.0",
	               "port": 0
	            },
	            "scan": {
	               "id": 1564991222,
	               "time": "2019/01/11 18:41:08"
	            },
	            "local": {
	               "ip": "0.0.0.0",
	               "port": 1515
	            },
	            "state": "listening",
	            "tx_queue": 0,
	            "protocol": "tcp",
	            "rx_queue": 0,
	            "inode": 228631
	         },
	         {
	            "remote": {
	               "ip": "0.0.0.0",
	               "port": 0
	            },
	            "scan": {
	               "id": 1564991222,
	               "time": "2019/01/11 18:41:08"
	            },
	            "local": {
	               "ip": "0.0.0.0",
	               "port": 1516
	            },
	            "state": "listening",
	            "tx_queue": 0,
	            "protocol": "tcp",
	            "rx_queue": 0,
	            "inode": 228638
	         }
	      ]
	   }
	}
	


Processes
++++++++++++++++++++++++++++++++++++++++

Get processes info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's processes info

**Request**:

``GET`` ::

	/syscollector/:agent_id/processes

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pid``                      | Number        | Filters by process pid.                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``                    | String        | Filters by process state.                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ppid``                     | Number        | Filters by process parent pid.                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``egroup``                   | String        | Filters by process egroup.                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``euser``                    | String        | Filters by process euser.                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``fgroup``                   | String        | Filters by process fgroup.                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``                     | String        | Filters by process name.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``nlwp``                     | Number        | Filters by process nlwp.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pgrp``                     | Number        | Filters by process pgrp.                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``priority``                 | Number        | Filters by process priority.                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rgroup``                   | String        | Filters by process rgroup.                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ruser``                    | String        | Filters by process ruser.                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sgroup``                   | String        | Filters by process sgroup.                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``suser``                    | String        | Filters by process suser.                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/processes?pretty&limit=2&offset=10&sort=-name"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 120,
	      "items": [
	         {
	            "tty": 0,
	            "rgroup": "root",
	            "sgroup": "root",
	            "scan": {
	               "id": 880020033,
	               "time": "2019/01/11 18:41:08"
	            },
	            "resident": 0,
	            "pid": "120",
	            "session": 0,
	            "size": 0,
	            "egroup": "root",
	            "tgid": 120,
	            "priority": 0,
	            "fgroup": "root",
	            "state": "I",
	            "nlwp": 1,
	            "euser": "root",
	            "share": 0,
	            "start_time": 758,
	            "stime": 0,
	            "vm_size": 0,
	            "utime": 0,
	            "ppid": 2,
	            "name": "charger_manager",
	            "pgrp": 0,
	            "ruser": "root",
	            "suser": "root",
	            "processor": 0
	         },
	         {
	            "tty": 0,
	            "rgroup": "root",
	            "sgroup": "root",
	            "scan": {
	               "id": 880020033,
	               "time": "2019/01/11 18:41:08"
	            },
	            "resident": 0,
	            "pid": "12",
	            "session": 0,
	            "size": 0,
	            "egroup": "root",
	            "tgid": 12,
	            "priority": 20,
	            "fgroup": "root",
	            "state": "S",
	            "ppid": 2,
	            "nice": 0,
	            "euser": "root",
	            "share": 0,
	            "start_time": 6,
	            "stime": 0,
	            "vm_size": 0,
	            "utime": 0,
	            "nlwp": 1,
	            "name": "cpuhp/0",
	            "pgrp": 0,
	            "ruser": "root",
	            "suser": "root",
	            "processor": 0
	         }
	      ]
	   }
	}
