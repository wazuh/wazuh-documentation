
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
* `Configuration Assessment`_
* `Decoders`_
* `Experimental`_
* `Lists`_
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
	* GET /cluster/:node_id/configuration/validation  (`Check Wazuh configuration in a cluster node`_)
	* GET /cluster/:node_id/files  (`Get local file from any cluster node`_)
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
	* GET /cluster/configuration/validation  (`Check Wazuh configuration in all cluster nodes`_)
	* GET /cluster/healthcheck  (`Show cluster health`_)
	* GET /cluster/node  (`Get local node info`_)
	* GET /cluster/nodes  (`Get nodes info`_)
	* GET /cluster/nodes/:node_name  (`Get node info`_)
	* GET /cluster/status  (`Get info about cluster status`_)
	* POST /cluster/:node_id/files  (`Update local file at any cluster node`_)
	* PUT /cluster/:node_id/restart  (`Restart a specific node in cluster`_)
	* PUT /cluster/restart  (`Restart all nodes in cluster`_)

`Configuration Assessment`_
	* GET /configuration-assessment/:agent_id  (`Get configuration assessment database`_)
	* GET /configuration-assessment/:agent_id/checks/:id  (`Get configuration assessment checks database`_)

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

`Lists`_
	* GET /lists  (`Get all lists`_)
	* GET /lists/files  (`Get paths from all lists`_)

`Manager`_
	* GET /manager/configuration  (`Get manager configuration`_)
	* GET /manager/configuration/validation  (`Check Wazuh configuration`_)
	* GET /manager/files  (`Get local file`_)
	* GET /manager/info  (`Get manager information`_)
	* GET /manager/logs  (`Get ossec.log`_)
	* GET /manager/logs/summary  (`Get summary of ossec.log`_)
	* GET /manager/stats  (`Get manager stats`_)
	* GET /manager/stats/analysisd  (`Get analysisd stats`_)
	* GET /manager/stats/hourly  (`Get manager stats by hour`_)
	* GET /manager/stats/remoted  (`Get remoted stats`_)
	* GET /manager/stats/weekly  (`Get manager stats by week`_)
	* GET /manager/status  (`Get manager status`_)
	* POST /manager/files  (`Update local file`_)
	* PUT /manager/restart  (`Restart Wazuh manager`_)

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

Active Response
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``command``                  | String        | Command.                                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``Custom``                   | Boolean       | Custom.                                                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``Arguments``                | Arguments     | Command arguments.                                                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``name``                     | String        | Agent name.                                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ip``                       | String        | If this is not included, the API will get the IP automatically. If you are behind a proxy, you must set the option config.BehindProxyServer to yes at config.js.                                                                     |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - IP                                                                                                                                                                                                                                 |
|                              |               | - IP/NET                                                                                                                                                                                                                             |
|                              |               | - ANY                                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``force``                    | Number        | Remove the old agent with the same IP if disconnected since <force> seconds.                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X POST -d '{"name":"NewHost","ip":"10.0.0.9"}' -H 'Content-Type:application/json' "https://127.0.0.1:55000/agents?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "id": "007",
	      "key": "MDA3IE5ld0hvc3QgMTAuMC4wLjkgZTk5MDE2ZTkzMjMyZDBjZDYyMGIyZTZmMTM2ZjMzMDQxMjY3M2E0NGRmOTNmODk1NzFjMGQyYzczY2VlYzRhZQ=="
	   }
	}
	

Add agent (quick method)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Adds a new agent with name :agent_name. This agent will use ANY as IP.

**Request**:

``PUT`` ::

	/agents/:agent_name

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_name``               | String        | Agent name.                                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/myNewAgent?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "id": "008",
	      "key": "MDA4IG15TmV3QWdlbnQgYW55IDIyNGVmNmI4NjYyMDk5OTc5NzdiZWJhNDRmZTAyNDI0NjU2ZDM1NjhjNWJiZWI4Njk0M2JkMzdjZjA5YjZlM2M="
	   }
	}
	

Insert agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Insert an agent with an existing id and key.

**Request**:

``POST`` ::

	/agents/insert

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``name``                     | String        | Agent name.                                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ip``                       | String        | If this is not included, the API will get the IP automatically. If you are behind a proxy, you must set the option config.BehindProxyServer to yes at config.js.                                                                     |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - IP                                                                                                                                                                                                                                 |
|                              |               | - IP/NET                                                                                                                                                                                                                             |
|                              |               | - ANY                                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``id``                       | String        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``key``                      | String        | Agent key. Minimum length: 64 characters. Allowed values: ^[a-zA-Z0-9]+$                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``force``                    | Number        | Remove the old agent the with same IP if disconnected since <force> seconds.                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``component``                | String        | Selected component.                                                                                                                                                                                                                  |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - agent                                                                                                                                                                                                                              |
|                              |               | - agentless                                                                                                                                                                                                                          |
|                              |               | - analysis                                                                                                                                                                                                                           |
|                              |               | - auth                                                                                                                                                                                                                               |
|                              |               | - com                                                                                                                                                                                                                                |
|                              |               | - csyslog                                                                                                                                                                                                                            |
|                              |               | - integrator                                                                                                                                                                                                                         |
|                              |               | - logcollector                                                                                                                                                                                                                       |
|                              |               | - mail                                                                                                                                                                                                                               |
|                              |               | - monitor                                                                                                                                                                                                                            |
|                              |               | - request                                                                                                                                                                                                                            |
|                              |               | - syscheck                                                                                                                                                                                                                           |
|                              |               | - wmodules                                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``configuration``            | String        | Configuration to read.                                                                                                                                                                                                               |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - client                                                                                                                                                                                                                             |
|                              |               | - buffer                                                                                                                                                                                                                             |
|                              |               | - labels                                                                                                                                                                                                                             |
|                              |               | - internal                                                                                                                                                                                                                           |
|                              |               | - agentless                                                                                                                                                                                                                          |
|                              |               | - global                                                                                                                                                                                                                             |
|                              |               | - active_response                                                                                                                                                                                                                    |
|                              |               | - alerts                                                                                                                                                                                                                             |
|                              |               | - command                                                                                                                                                                                                                            |
|                              |               | - rules                                                                                                                                                                                                                              |
|                              |               | - decoders                                                                                                                                                                                                                           |
|                              |               | - internal                                                                                                                                                                                                                           |
|                              |               | - auth                                                                                                                                                                                                                               |
|                              |               | - active-response                                                                                                                                                                                                                    |
|                              |               | - internal                                                                                                                                                                                                                           |
|                              |               | - cluster                                                                                                                                                                                                                            |
|                              |               | - csyslog                                                                                                                                                                                                                            |
|                              |               | - integration                                                                                                                                                                                                                        |
|                              |               | - localfile                                                                                                                                                                                                                          |
|                              |               | - socket                                                                                                                                                                                                                             |
|                              |               | - remote                                                                                                                                                                                                                             |
|                              |               | - syscheck                                                                                                                                                                                                                           |
|                              |               | - rootcheck                                                                                                                                                                                                                          |
|                              |               | - wmodules                                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	            "logformat": "command",
	            "command": "df -P",
	            "alias": "df -P",
	            "target": [
	               "agent"
	            ],
	            "frequency": 360
	         },
	         {
	            "logformat": "full_command",
	            "command": "netstat -tulpn | sed 's/\\([[:alnum:]]\\+\\)\\ \\+[[:digit:]]\\+\\ \\+[[:digit:]]\\+\\ \\+\\(.*\\):\\([[:digit:]]*\\)\\ \\+\\([0-9\\.\\:\\*]\\+\\).\\+\\ \\([[:digit:]]*\\/[[:alnum:]\\-]*\\).*/\\1 \\2 == \\3 == \\4 \\5/' | sort -k 4 -g | sed 's/ == \\(.*\\) ==/:\\1/' | sed 1,2d",
	            "alias": "netstat listening ports",
	            "target": [
	               "agent"
	            ],
	            "frequency": 360
	         },
	         {
	            "logformat": "full_command",
	            "command": "last -n 20",
	            "alias": "last -n 20",
	            "target": [
	               "agent"
	            ],
	            "frequency": 360
	         },
	         {
	            "file": "/var/ossec/logs/active-responses.log",
	            "logformat": "syslog",
	            "target": [
	               "agent"
	            ]
	         },
	         {
	            "file": "/var/log/auth.log",
	            "logformat": "syslog",
	            "target": [
	               "agent"
	            ]
	         },
	         {
	            "file": "/var/log/syslog",
	            "logformat": "syslog",
	            "target": [
	               "agent"
	            ]
	         },
	         {
	            "file": "/var/log/dpkg.log",
	            "logformat": "syslog",
	            "target": [
	               "agent"
	            ]
	         },
	         {
	            "file": "/var/log/kern.log",
	            "logformat": "syslog",
	            "target": [
	               "agent"
	            ]
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``ids``                      | String[]      | Array of group ID's.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``ids``                      | String[]      | Array of agent ID's.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``purge``                    | Boolean       | Delete an agent from the key store.                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters by agent status. Use commas to enter multiple statuses.                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - active                                                                                                                                                                                                                             |
|                              |               | - pending                                                                                                                                                                                                                            |
|                              |               | - neverconnected                                                                                                                                                                                                                     |
|                              |               | - disconnected                                                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``older_than``               | String        | Filters out disconnected agents for longer than specified. Time in seconds, '[n_days]d', '[n_hours]h', '[n_minutes]m' or '[n_seconds]s'. For never connected agents, uses the register date. Default value: 7d.                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE -H "Content-Type:application/json" -d '{"ids":["003","005"]}' "https://127.0.0.1:55000/agents?pretty&older_than=10s&purge"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "msg": "All selected agents were removed",
	      "affected_agents": [
	         "003",
	         "005"
	      ],
	      "older_than": "10s",
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``purge``                    | String        | Delete an agent from the key store.                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/001/group/is_sync?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "synced": false
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id_list``            | Number        | List of agents ID.                                                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -X POST -H "Content-Type:application/json" -d '{"ids":["001","002"]}' "https://localhost:55000/agents/group/dmz?pretty" -k

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "msg": "All selected agents assigned to group dmz",
	      "affected_agents": [
	         "001",
	         "002"
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent unique ID.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``force_single_group``       | Boolean       | Wheter to append new group to current agent's group or replace it.                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file_name``                | String        | Filename                                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                     | String        | Type of file.                                                                                                                                                                                                                        |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - conf                                                                                                                                                                                                                               |
|                              |               | - rootkit_files                                                                                                                                                                                                                      |
|                              |               | - rootkit_trojans                                                                                                                                                                                                                    |
|                              |               | - rcl                                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``format``                   | String        | Optional. Output format (JSON, XML).                                                                                                                                                                                                 |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - json                                                                                                                                                                                                                               |
|                              |               | - xml                                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | Select which fields to return (separated by comma).                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters by agent status.                                                                                                                                                                                                             |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - active                                                                                                                                                                                                                             |
|                              |               | - pending                                                                                                                                                                                                                            |
|                              |               | - neverconnected                                                                                                                                                                                                                     |
|                              |               | - disconnected                                                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter results by.                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/groups/dmz?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "os": {
	               "arch": "x86_64",
	               "codename": "Bionic Beaver",
	               "major": "18",
	               "minor": "04",
	               "name": "Ubuntu",
	               "platform": "ubuntu",
	               "uname": "Linux |agent-1 |4.15.0-43-generic |#46-Ubuntu SMP Thu Dec 6 14:45:28 UTC 2018 |x86_64",
	               "version": "18.04.1 LTS"
	            },
	            "group": [
	               "default",
	               "dmz"
	            ],
	            "lastKeepAlive": "2019-02-19 10:31:09",
	            "ip": "172.17.0.201",
	            "manager": "master",
	            "status": "Active",
	            "version": "Wazuh v3.8.2",
	            "dateAdd": "2019-02-19 10:25:42",
	            "name": "agent-1",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00",
	            "registerIP": "172.17.0.201",
	            "node_name": "node01",
	            "id": "001",
	            "mergedSum": "f8d49771911ed9d5c45b03a40babd065"
	         },
	         {
	            "group": [
	               "default",
	               "dmz"
	            ],
<<<<<<< HEAD
	            "name": "agent1",
	            "mergedSum": "f1a9e24e02ba4cc5ea80a9d3feb3bb9a",
	            "ip": "192.168.185.7",
	            "dateAdd": "2018-10-11 09:38:47",
	            "node_name": "node02",
	            "manager": "manager",
	            "version": "Wazuh v3.8.2",
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
=======
	            "ip": "10.0.0.62",
	            "status": "Never connected",
	            "dateAdd": "2019-02-19 10:30:59",
	            "name": "server001",
	            "registerIP": "10.0.0.62",
	            "node_name": "unknown",
	            "id": "002"
>>>>>>> 3.9
	         },
	         {
	            "group": [
	               "dmz"
	            ],
	            "ip": "10.0.0.15",
	            "status": "Never connected",
	            "dateAdd": "2019-02-19 10:31:00",
	            "name": "main_database",
	            "registerIP": "10.0.0.15",
	            "node_name": "unknown",
	            "id": "004"
	         }
	      ],
	      "totalItems": 3
	   }
	}
	

Get agents without group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a list with the available agents without group.

**Request**:

``GET`` ::

	/agents/no_group

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | Select which fields to return (separated by comma).                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter result. For example q=&quot;status=Active&quot;                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/no_group?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "ip": "10.0.0.20",
	            "status": "Never connected",
	            "dateAdd": "2019-02-19 10:31:00",
	            "name": "server002",
	            "registerIP": "10.0.0.20",
	            "node_name": "unknown",
	            "id": "006"
	         },
	         {
	            "ip": "10.0.0.9",
	            "status": "Never connected",
	            "dateAdd": "2019-02-19 10:31:12",
	            "name": "NewHost",
	            "registerIP": "10.0.0.9",
	            "node_name": "unknown",
	            "id": "007"
	         },
	         {
	            "ip": "10.0.10.10",
	            "status": "Never connected",
	            "dateAdd": "2019-02-19 10:31:13",
	            "name": "NewHost_2",
	            "registerIP": "10.0.10.10",
	            "node_name": "unknown",
	            "id": "123"
	         }
	      ],
	      "totalItems": 3
	   }
	}
	

Get group configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the group configuration (agent.conf).

**Request**:

``GET`` ::

	/agents/groups/:group_id/configuration

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	            "filters": {
	               "os": "Linux"
	            },
	            "config": {
	               "localfile": [
	                  {
	                     "location": "/var/log/linux.log",
	                     "log_format": "syslog"
	                  }
	               ]
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``hash``                     | String        | Hash algorithm to use to calculate files checksums.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/groups/default/files?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "filename": "agent.conf",
	            "hash": "ab73af41699f13fdd81903b5f23d8d00"
	         },
	         {
	            "filename": "ar.conf",
	            "hash": "76d8be9b97d8eae4c239e530ee7e71c8"
	         },
	         {
	            "filename": "cis_apache2224_rcl.txt",
	            "hash": "3c2469443a08b01c454ca35558cb9fa6"
	         },
	         {
	            "filename": "cis_debian_linux_rcl.txt",
	            "hash": "cc12fdba595817758f308024f61acb71"
	         },
	         {
	            "filename": "cis_mysql5-6_community_rcl.txt",
	            "hash": "f5f770160baf596373e4f77f987cc422"
	         },
	         {
	            "filename": "cis_mysql5-6_enterprise_rcl.txt",
	            "hash": "de9865c809f1555d537e5a49872eaf4c"
	         },
	         {
	            "filename": "cis_rhel5_linux_rcl.txt",
	            "hash": "a3af38b3f81a48332c7bcd9cf8aa6eff"
	         },
	         {
	            "filename": "cis_rhel6_linux_rcl.txt",
	            "hash": "bdcfa3ab90b553f8e5c84cfa9fd90289"
	         },
	         {
	            "filename": "cis_rhel7_linux_rcl.txt",
	            "hash": "039e579029e3edcf8241fb391f46b12f"
	         },
	         {
	            "filename": "cis_rhel_linux_rcl.txt",
	            "hash": "569cd8a2cc7527cc75f81f77098de461"
	         },
	         {
	            "filename": "cis_sles11_linux_rcl.txt",
	            "hash": "d86ee36d384930293cbcc83c8fb57c93"
	         },
	         {
	            "filename": "cis_sles12_linux_rcl.txt",
	            "hash": "6f58710fa8eef659dc782a3fa4699e33"
	         },
	         {
	            "filename": "cis_win2012r2_domainL1_rcl.txt",
	            "hash": "8819dfa3523933b113e27a85fc9e568d"
	         },
	         {
	            "filename": "cis_win2012r2_domainL2_rcl.txt",
	            "hash": "e8a2c7ab57bc8102b237f061b8f82dce"
	         },
	         {
	            "filename": "cis_win2012r2_memberL1_rcl.txt",
	            "hash": "38c88156d03af9372efd620e6e57d473"
	         },
	         {
	            "filename": "cis_win2012r2_memberL2_rcl.txt",
	            "hash": "c4b62b3e01b5f5634a9719eb8a104028"
	         },
	         {
	            "filename": "merged.mg",
	            "hash": "f8d49771911ed9d5c45b03a40babd065"
	         },
	         {
	            "filename": "rootkit_files.txt",
	            "hash": "e5ddcac443143cef6237d5f9b8d48585"
	         },
	         {
	            "filename": "rootkit_trojans.txt",
	            "hash": "6bcf7016d3e6b4c7faa62cf265c24dcc"
	         },
	         {
	            "filename": "system_audit_rcl.txt",
	            "hash": "be69b84dd5ee73200bb903a46270e18c"
	         },
	         {
	            "filename": "system_audit_ssh.txt",
	            "hash": "407c1f5e103f0cb58249eb7252a84797"
	         },
	         {
	            "filename": "win_applications_rcl.txt",
	            "hash": "0a4ad12c8145aca8a28d31de5c448b48"
	         },
	         {
	            "filename": "win_audit_rcl.txt",
	            "hash": "92d8011facc8b921ece301ea4ce6a616"
	         },
	         {
	            "filename": "win_malware_rcl.txt",
	            "hash": "6a8d3c63a0e77dea35aaed3ee2cca3a1"
	         }
	      ],
	      "totalItems": 24
	   }
	}
	

Get groups
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the list of existing agent groups.

**Request**:

``GET`` ::

	/agents/groups

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``hash``                     | String        | Select algorithm to generate the sum.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/groups?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "count": 2,
	            "name": "default",
	            "mergedSum": "f8d49771911ed9d5c45b03a40babd065",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00"
	         },
	         {
	            "count": 3,
	            "name": "dmz",
	            "mergedSum": "220d6c5fc253f251827ee7487341c0fc",
	            "configSum": "cfbae9ecc10eb15f1b4fc736de6758cc"
	         },
	         {
	            "count": 0,
	            "name": "pciserver",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00"
	         }
	      ],
	      "totalItems": 3
	   }
	}
	

Put configuration file (agent.conf) into a group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Upload the group configuration (agent.conf).

**Request**:

``POST`` ::

	/agents/groups/:group_id/configuration

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | List          | Agent ID list.                                                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -X DELETE -H "Content-Type:application/json" -d '{"ids":["001","002"]}' "https://localhost:55000/agents/group/dmz?pretty" -k

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "msg": "All selected agents were removed to group dmz",
	      "affected_agents": [
	         "001",
	         "002"
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	      "affected_agents": []
	   }
	}
	

Upload file into a group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Upload a file to a group.

**Request**:

``POST`` ::

	/agents/groups/:group_id/files/:file_name

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file_name``                | String        | File name.                                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter result. For example q=&quot;status=Active&quot;                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	      "Total": 7,
	      "Active": 2,
	      "Disconnected": 0,
	      "Never connected": 5,
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | Select which fields to return (separated by comma).                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters by agent status. Use commas to enter multiple statuses.                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - active                                                                                                                                                                                                                             |
|                              |               | - pending                                                                                                                                                                                                                            |
|                              |               | - neverconnected                                                                                                                                                                                                                     |
|                              |               | - disconnected                                                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter results by. For example q=&quot;status=Active&quot;                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``older_than``               | String        | Filters out disconnected agents for longer than specified. Time in seconds, '[n_days]d', '[n_hours]h', '[n_minutes]m' or '[n_seconds]s'. For never connected agents, uses the register date.                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os.platform``              | String        | Filters by OS platform.                                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os.version``               | String        | Filters by OS version.                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os.name``                  | String        | Filters by OS name.                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``manager``                  | String        | Filters by manager hostname to which agents are connected.                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``version``                  | String        | Filters by agents version.                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group``                    | String        | Filters by group of agents.                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``node_name``                | String        | Filters by node name.                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``                     | String        | Filters by agent name.                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ip``                       | String        | Filters by agent IP.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents?pretty&offset=0&limit=5&sort=-ip,name"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "ip": "10.0.0.20",
	            "status": "Never connected",
	            "dateAdd": "2019-02-19 10:31:00",
	            "name": "server002",
	            "registerIP": "10.0.0.20",
	            "node_name": "unknown",
	            "id": "006"
	         },
	         {
	            "group": [
	               "default"
	            ],
<<<<<<< HEAD
	            "name": "agent1",
	            "mergedSum": "f1a9e24e02ba4cc5ea80a9d3feb3bb9a",
	            "ip": "192.168.185.7",
	            "manager": "manager",
	            "node_name": "node02",
	            "dateAdd": "2018-10-11 09:38:47",
	            "version": "Wazuh v3.8.2",
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
	            "version": "Wazuh v3.8.2",
	            "lastKeepAlive": "9999-12-31 23:59:59",
=======
	            "ip": "10.0.0.62",
	            "status": "Never connected",
	            "dateAdd": "2019-02-19 10:30:59",
	            "name": "server001",
	            "registerIP": "10.0.0.62",
	            "node_name": "unknown",
	            "id": "002"
	         },
	         {
>>>>>>> 3.9
	            "os": {
	               "arch": "x86_64",
	               "codename": "Bionic Beaver",
	               "major": "18",
	               "minor": "04",
	               "name": "Ubuntu",
	               "platform": "ubuntu",
	               "uname": "Linux |master |4.15.0-43-generic |#46-Ubuntu SMP Thu Dec 6 14:45:28 UTC 2018 |x86_64",
	               "version": "18.04.1 LTS"
	            },
	            "lastKeepAlive": "9999-12-31 23:59:59",
	            "ip": "127.0.0.1",
	            "manager": "master",
	            "status": "Active",
	            "version": "Wazuh v3.9.0",
	            "dateAdd": "2019-02-19 10:21:40",
	            "name": "master",
	            "node_name": "node01",
	            "id": "000"
	         },
	         {
	            "group": [
	               "default"
	            ],
	            "ip": "10.0.0.15",
	            "status": "Never connected",
	            "dateAdd": "2019-02-19 10:31:00",
	            "name": "main_database",
	            "registerIP": "10.0.0.15",
	            "node_name": "unknown",
	            "id": "004"
	         },
	         {
	            "os": {
	               "arch": "x86_64",
	               "codename": "Bionic Beaver",
	               "major": "18",
	               "minor": "04",
	               "name": "Ubuntu",
	               "platform": "ubuntu",
	               "uname": "Linux |agent-1 |4.15.0-43-generic |#46-Ubuntu SMP Thu Dec 6 14:45:28 UTC 2018 |x86_64",
	               "version": "18.04.1 LTS"
	            },
	            "group": [
	               "default"
	            ],
	            "lastKeepAlive": "2019-02-19 10:31:19",
	            "ip": "172.17.0.201",
	            "manager": "master",
	            "status": "Active",
	            "version": "Wazuh v3.8.2",
	            "dateAdd": "2019-02-19 10:25:42",
	            "name": "agent-1",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00",
	            "registerIP": "172.17.0.201",
	            "node_name": "node01",
	            "id": "001",
	            "mergedSum": "780cd70d3021764b0de1a127ab2fc615"
	         }
	      ],
	      "totalItems": 7
	   }
	}
	

Get an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns various information from an agent.

**Request**:

``GET`` ::

	/agents/:agent_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/000?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
<<<<<<< HEAD
	      "status": "Active",
	      "name": "manager",
	      "ip": "127.0.0.1",
	      "manager": "manager",
	      "node_name": "node01",
	      "dateAdd": "2018-10-11 09:37:23",
	      "version": "Wazuh v3.8.2",
=======
>>>>>>> 3.9
	      "lastKeepAlive": "9999-12-31 23:59:59",
	      "ip": "127.0.0.1",
	      "manager": "master",
	      "os": {
	         "arch": "x86_64",
	         "codename": "Bionic Beaver",
	         "major": "18",
	         "minor": "04",
	         "name": "Ubuntu",
	         "platform": "ubuntu",
	         "uname": "Linux |master |4.15.0-43-generic |#46-Ubuntu SMP Thu Dec 6 14:45:28 UTC 2018 |x86_64",
	         "version": "18.04.1 LTS"
	      },
	      "status": "Active",
	      "version": "Wazuh v3.9.0",
	      "dateAdd": "2019-02-19 10:21:40",
	      "name": "master",
	      "node_name": "node01",
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_name``               | String        | Agent name.                                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/name/NewHost?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "ip": "10.0.0.9",
	      "status": "Never connected",
	      "dateAdd": "2019-02-19 10:31:12",
	      "name": "NewHost",
	      "registerIP": "10.0.0.9",
	      "node_name": "unknown",
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/004/key?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "MDA0IG1haW5fZGF0YWJhc2UgMTAuMC4wLjE1IDIzNGM1Y2MzZjhhNzA2OWY2ZGRjN2I0NDc1MWZmNmE1Zjg3MjExMTJiZWJhNmFhMWUyMDIzNWI4MTBjYWNiM2I="
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``ids``                      | String[]      | Array of agent ID's.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent unique ID.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``fields``                   | String        | List of fields affecting the operation.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter result. For example q=&quot;status=Active&quot;                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/stats/distinct?pretty&fields=os.platform"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "os": {
	               "platform": "ubuntu"
	            },
	            "count": 2
	         },
	         {
	            "count": 5
	         }
	      ],
	      "totalItems": 7
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter result. For example q=&quot;status=Active&quot;                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``timeout``                  | Number        | Seconds to wait for the agent to respond.                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent unique ID.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file_path``                | String        | Path to the WPK file. The file must be on a folder on the Wazuh's installation directory (by default, <code>/var/ossec</code>).                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``installer``                | String        | Installation script.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Upgrade the agent using a WPK file from online repository.

**Request**:

``PUT`` ::

	/agents/:agent_id/upgrade

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent unique ID.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``wpk_repo``                 | String        | WPK repository.                                                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``version``                  | String        | Wazuh version.                                                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``use_http``                 | Boolean       | Use protocol http. If it's false use https. By default the value is set to false.                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``force``                    | number        | Force upgrade.                                                                                                                                                                                                                       |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - 0                                                                                                                                                                                                                                  |
|                              |               | - 1                                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``group``                    | String        | cache group.                                                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/cache/mygroup?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "all": [
	         "/agents/stats/distinct?pretty&fields=os.platform"
	      ],
	      "groups": {
	         "agents": [
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``benchmark``                | String        | Filters by benchmark.                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``profile``                  | String        | Filters by evaluated profile.                                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pass``                     | Number        | Filters by passed checks.                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``fail``                     | Number        | Filters by failed checks.                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``error``                    | Number        | Filters by encountered errors.                                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``notchecked``               | Number        | Filters by not checked.                                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``unknown``                  | Number        | Filters by unknown results.                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``score``                    | Number        | Filters by final score.                                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``section``                  | String        | Indicates the ossec.conf section: global, rules, syscheck, rootcheck, remote, alerts, command, active-response, localfile.                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``field``                    | String        | Indicates a section child, e.g, fields for rule section are: include, decoder_dir, etc.                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/node02/configuration?section=global&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "jsonout_output": "yes",
	      "alerts_log": "yes",
	      "logall": "no",
	      "logall_json": "no",
	      "email_notification": "no",
	      "smtp_server": "smtp.example.wazuh.com",
	      "email_from": "ossecm@example.wazuh.com",
	      "email_to": "recipient@example.wazuh.com",
	      "email_maxperhour": "12",
	      "email_log_source": "alerts.log",
	      "queue_size": "131072",
	      "white_list": [
	         "127.0.0.1",
	         "^localhost.localdomain$",
	         "127.0.0.53"
	      ]
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
	      "name": "wazuh",
	      "node_name": "node02",
	      "node_type": "worker",
	      "key": "9d273b53510fef702b54a92e9cffc82e",
	      "port": 1516,
	      "bind_addr": "0.0.0.0",
	      "nodes": [
	         "172.17.0.100"
	      ],
	      "hidden": "no",
	      "disabled": false
	   }
	}
	


Files
++++++++++++++++++++++++++++++++++++++++

Check Wazuh configuration in a cluster node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns if Wazuh configuration is OK.

**Request**:

``GET`` ::

	/cluster/:node_id/configuration/validation

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/node01/configuration/validation?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "status": "OK"
	   }
	}
	

Check Wazuh configuration in all cluster nodes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns if Wazuh configuration is OK.

**Request**:

``GET`` ::

	/cluster/configuration/validation

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/configuration/validation?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "status": "OK"
	   }
	}
	

Get local file from any cluster node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the content of a local file (rules, decoders and lists).

**Request**:

``GET`` ::

	/cluster/:node_id/files

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``path``                     | String        | Relative path of file.                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/node02/files?path=etc/rules/local_rules.xml&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "<!-- Local rules -->\n\n<!-- Modify it at your will. -->\n<!-- Copyright (C) 2015-2019, Wazuh Inc. -->\n\n<!-- Example -->\n<group name=\"local,syslog,sshd,\">\n\n  <!--\n  Dec 10 01:02:02 host sshd[1234]: Failed none for root from 1.1.1.1 port 1066 ssh2\n  -->\n  <rule id=\"100001\" level=\"5\">\n    <if_sid>5716</if_sid>\n    <srcip>1.1.1.1</srcip>\n    <description>sshd: authentication failed from IP 1.1.1.1.</description>\n    <group>authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group>\n  </rule>\n\n</group>\n"
	}
	

Update local file at any cluster node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Upload a local file (rules, decoders and lists) in a cluster node

**Request**:

``POST`` ::

	/cluster/:node_id/files

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``file``                     | String        | Input file.                                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``                     | String        | Relative path were input file will be placed.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X POST -H 'Content-type: application/xml' -d @rules.xml "https://127.0.0.1:55000/cluster/node02/files?path=etc/rules/local_rules.xml&pretty"

**Example Response:**
::

	{
	    "data": "File updated successfully", 
	    "error": 0
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
	      "enabled": "yes",
	      "running": "yes"
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
	      "ossec-monitord": "running",
	      "ossec-logcollector": "running",
	      "ossec-remoted": "running",
	      "ossec-syscheckd": "running",
	      "ossec-analysisd": "running",
	      "ossec-maild": "stopped",
	      "ossec-execd": "running",
	      "wazuh-modulesd": "running",
	      "ossec-authd": "stopped",
	      "wazuh-clusterd": "running"
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
<<<<<<< HEAD
	      "compilation_date": "Fri Jan 11 18:44:25 UTC 2019",
	      "openssl_support": "yes",
	      "ruleset_version": "3801",
	      "tz_name": "UTC",
	      "tz_offset": "+0000",
	      "version": "v3.8.2",
=======
>>>>>>> 3.9
	      "path": "/var/ossec",
	      "version": "v3.9.0",
	      "compilation_date": "Tue Feb 19 10:27:25 UTC 2019",
	      "type": "manager",
	      "max_agents": "14000",
	      "openssl_support": "yes",
	      "ruleset_version": "3902",
	      "tz_offset": "+0000",
	      "tz_name": "UTC"
	   }
	}
	

Show cluster health
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Show cluster health

**Request**:

``GET`` ::

	/cluster/healthcheck

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``node``                     | String        | Filter information by node name.                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/healthcheck?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "n_connected_nodes": 1,
	      "nodes": {
	         "node02": {
	            "info": {
<<<<<<< HEAD
	               "ip": "172.17.0.101",
	               "version": "3.8.2",
	               "type": "worker",
=======
>>>>>>> 3.9
	               "name": "node02",
	               "type": "worker",
	               "version": "3.9.0",
	               "ip": "172.17.0.101",
	               "n_active_agents": 0
	            },
	            "status": {
	               "sync_integrity_free": true,
	               "last_sync_integrity": {
	                  "date_start_master": "2019-02-19 10:31:19.185350",
	                  "date_end_master": "2019-02-19 10:31:19.230885",
	                  "total_files": {
	                     "missing": 2,
	                     "extra": 2,
	                     "extra_valid": 0,
	                     "shared": 3
	                  }
	               },
	               "sync_agentinfo_free": true,
	               "last_sync_agentinfo": {
	                  "date_start_master": "2019-02-19 10:31:18.103253",
	                  "date_end_master": "n/a",
	                  "total_agentinfo": 0
	               },
	               "sync_extravalid_free": true,
	               "last_sync_agentgroups": {
	                  "date_start_master": "n/a",
	                  "date_end_master": "n/a",
	                  "total_agentgroups": 0
	               },
	               "last_keep_alive": "2019-02-19 10:30:27.722379"
	            }
	         },
	         "node01": {
	            "info": {
<<<<<<< HEAD
	               "ip": "172.17.0.100",
	               "version": "3.8.2",
	               "type": "master",
=======
>>>>>>> 3.9
	               "name": "node01",
	               "type": "master",
	               "version": "3.9.0",
	               "ip": "172.17.0.100",
	               "n_active_agents": 2
	            }
	         }
	      }
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type_log``                 | String        | Filters by type of log.                                                                                                                                                                                                              |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - all                                                                                                                                                                                                                                |
|                              |               | - error                                                                                                                                                                                                                              |
|                              |               | - warning                                                                                                                                                                                                                            |
|                              |               | - info                                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``category``                 | String        | Filters by category of log.                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/node02/logs?offset=0&limit=5&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "timestamp": "2019-02-19 10:31:26",
	            "tag": "ossec-remoted",
	            "level": "info",
	            "description": "(1409): Authentication file changed. Updating."
	         },
	         {
	            "timestamp": "2019-02-19 10:31:26",
	            "tag": "ossec-remoted",
	            "level": "info",
	            "description": "(1410): Reading authentication keys file."
	         },
	         {
	            "timestamp": "2019-02-19 10:31:16",
	            "tag": "ossec-remoted",
	            "level": "info",
	            "description": "(1409): Authentication file changed. Updating."
	         },
	         {
	            "timestamp": "2019-02-19 10:31:16",
	            "tag": "ossec-remoted",
	            "level": "info",
	            "description": "(1410): Reading authentication keys file."
	         },
	         {
	            "timestamp": "2019-02-19 10:29:27",
	            "tag": "ossec-syscheckd",
	            "level": "info",
	            "description": "Ending syscheck scan. Database completed."
	         }
	      ],
	      "totalItems": 596
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
	      "ossec-authd": {
	         "all": 6,
	         "info": 6,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-db": {
	         "all": 3,
	         "info": 3,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-execd": {
	         "all": 4,
	         "info": 4,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-analysisd": {
	         "all": 455,
	         "info": 455,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-remoted": {
	         "all": 13,
	         "info": 13,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-monitord": {
	         "all": 3,
	         "info": 3,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "configuration-assessment": {
	         "all": 14,
	         "info": 14,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd:osquery": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd:ciscat": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd:database": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd:oscap": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd:download": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-logcollector": {
	         "all": 19,
	         "info": 19,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd:syscollector": {
	         "all": 7,
	         "info": 7,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-syscheckd": {
	         "all": 55,
	         "info": 55,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-rootcheck": {
	         "all": 5,
	         "info": 5,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
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
	      "node": "node02",
	      "cluster": "wazuh",
	      "type": "worker"
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
<<<<<<< HEAD
	      "ip": "172.17.0.100",
	      "version": "3.8.2",
=======
	      "name": "node01",
>>>>>>> 3.9
	      "type": "master",
	      "version": "3.9.0",
	      "ip": "172.17.0.100"
	   }
	}
	

Get nodes info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the nodes info

**Request**:

``GET`` ::

	/cluster/nodes

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                     | String        | Filters by node type.                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
<<<<<<< HEAD
	            "ip": "172.17.0.101",
	            "version": "3.8.2",
=======
	            "name": "node02",
>>>>>>> 3.9
	            "type": "worker",
	            "version": "3.9.0",
	            "ip": "172.17.0.101"
	         },
	         {
<<<<<<< HEAD
	            "ip": "172.17.0.100",
	            "version": "3.8.2",
=======
	            "name": "node01",
>>>>>>> 3.9
	            "type": "master",
	            "version": "3.9.0",
	            "ip": "172.17.0.100"
	         }
	      ]
	   }
	}
	


Restart
++++++++++++++++++++++++++++++++++++++++

Restart a specific node in cluster
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Restarts a specific node in cluster.

**Request**:

``PUT`` ::

	/cluster/:node_id/restart

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/cluster/node02/restart?pretty"

**Example Response:**
::

	{
	    "data": "Restarting manager", 
	    "error": 0
	}

Restart all nodes in cluster
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Restarts all nodes in cluster.

**Request**:

``PUT`` ::

	/cluster/restart

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/cluster/restart?pretty"

**Example Response:**
::

	{
	    "data": "Restarting manager", 
	    "error": 0
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``date``                     | String        | Selects the date for getting the statistical information. Format: YYYYMMDD                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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



Configuration Assessment
----------------------------------------
Info
++++++++++++++++++++++++++++++++++++++++

Get configuration assessment checks database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the configuration assessment checks of an agent

**Request**:

``GET`` ::

	/configuration-assessment/:agent_id/checks/:id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``policy_id``                | String        | Filters by scan id                                                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``title``                    | String        | Filters by title                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``description``              | String        | Filters by policy description                                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rationale``                | String        | Filters by rationale                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``remediation``              | String        | Filters by remediation                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``                     | String        | Filters by file                                                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``process``                  | String        | Filters by process                                                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``directory``                | String        | Filters by directory                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``registry``                 | String        | Filters by registry                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``references``               | String        | Filters by references                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``result``                   | String        | Filters by result                                                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/configuration-assessment/000/checks/system_audit?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 16,
	      "items": [
	         {
	            "directory": "/var/www,/var/htdocs,/home/httpd,/usr/local/apache,/usr/local/apache2,/usr/local/www",
	            "result": "passed",
	            "references": "http://blog.sucuri.net/2011/05/understanding-htaccess-attacks-part-1.html",
	            "policy_id": "system_audit",
	            "title": "Web vulnerability - .htaccess file compromised - auto append",
	            "id": 1015,
	            "compliance": [
	               {
	                  "value": "6.5, 6.6, 11.4",
	                  "key": "pci_dss"
	               }
	            ]
	         },
	         {
	            "directory": "/var/www,/var/htdocs,/home/httpd,/usr/local/apache,/usr/local/apache2,/usr/local/www",
	            "result": "passed",
	            "references": "http://blog.sucuri.net/2011/05/understanding-htaccess-attacks-part-1.html",
	            "policy_id": "system_audit",
	            "title": "Web vulnerability - .htaccess file compromised",
	            "id": 1014,
	            "compliance": [
	               {
	                  "value": "6.5, 6.6, 11.4",
	                  "key": "pci_dss"
	               }
	            ]
	         },
	         {
	            "directory": "/var/www,/var/htdocs,/home/httpd,/usr/local/apache,/usr/local/apache2,/usr/local/www",
	            "result": "passed",
	            "policy_id": "system_audit",
	            "title": "Web vulnerability - Backdoors / Web based malware found - eval(base64_decode(POST ",
	            "id": 1013,
	            "compliance": [
	               {
	                  "value": "6.5, 6.6, 11.4",
	                  "key": "pci_dss"
	               }
	            ]
	         },
	         {
	            "directory": "/var/www,/var/htdocs,/home/httpd,/usr/local/apache,/usr/local/apache2,/usr/local/www",
	            "result": "passed",
	            "policy_id": "system_audit",
	            "title": "Web vulnerability - Backdoors / Web based malware found - eval(base64_decode",
	            "id": 1012,
	            "compliance": [
	               {
	                  "value": "6.5, 6.6, 11.4",
	                  "key": "pci_dss"
	               }
	            ]
	         },
	         {
	            "directory": "/var/www,/var/htdocs,/home/httpd,/usr/local/apache,/usr/local/apache2,/usr/local/www",
	            "result": "passed",
	            "policy_id": "system_audit",
	            "title": "Web vulnerability - Outdated osCommerce (v2.2) installation",
	            "id": 1011,
	            "compliance": [
	               {
	                  "value": "6.5, 6.6, 11.4",
	                  "key": "pci_dss"
	               }
	            ]
	         },
	         {
	            "directory": "/var/www,/var/htdocs,/home/httpd,/usr/local/apache,/usr/local/apache2,/usr/local/www",
	            "result": "passed",
	            "policy_id": "system_audit",
	            "title": "Web vulnerability - Outdated Joomla installation",
	            "id": 1010,
	            "compliance": [
	               {
	                  "value": "6.5, 6.6, 11.4",
	                  "key": "pci_dss"
	               }
	            ]
	         },
	         {
	            "directory": "/var/www,/var/htdocs,/home/httpd,/usr/local/apache,/usr/local/apache2,/usr/local/www",
	            "result": "passed",
	            "policy_id": "system_audit",
	            "title": "Web vulnerability - Outdated WordPress installation",
	            "id": 1009,
	            "compliance": [
	               {
	                  "value": "6.5, 6.6, 11.4",
	                  "key": "pci_dss"
	               }
	            ]
	         },
	         {
	            "directory": "/var/www,/var/htdocs,/home/httpd,/usr/local/apache,/usr/local/apache2,/usr/local/www",
	            "result": "passed",
	            "policy_id": "system_audit",
	            "title": "Web exploits (uncommon file name inside htdocs) - Possible compromise",
	            "id": 1008,
	            "compliance": [
	               {
	                  "value": "6.5, 6.6, 11.4",
	                  "key": "pci_dss"
	               }
	            ]
	         },
	         {
	            "directory": "/var/www,/var/htdocs,/home/httpd,/usr/local/apache,/usr/local/apache2,/usr/local/www",
	            "result": "passed",
	            "policy_id": "system_audit",
	            "title": "Web exploits (uncommon file name inside htdocs) - Possible compromise",
	            "id": 1007,
	            "compliance": [
	               {
	                  "value": "6.5, 6.6, 11.4",
	                  "key": "pci_dss"
	               }
	            ]
	         },
	         {
	            "directory": "/var/www,/var/htdocs,/home/httpd,/usr/local/apache,/usr/local/apache2,/usr/local/www",
	            "result": "passed",
	            "policy_id": "system_audit",
	            "title": "Web exploits (uncommon file name inside htdocs)",
	            "id": 1006,
	            "compliance": [
	               {
	                  "value": "6.5, 6.6, 11.4",
	                  "key": "pci_dss"
	               }
	            ]
	         },
	         {
	            "directory": "/var/www,/var/htdocs,/home/httpd,/usr/local/apache,/usr/local/apache2,/usr/local/www",
	            "result": "passed",
	            "policy_id": "system_audit",
	            "title": "Web exploits (uncommon file name inside htdocs) - Possible compromise",
	            "id": 1005,
	            "compliance": [
	               {
	                  "value": "6.5, 6.6, 11.4",
	                  "key": "pci_dss"
	               }
	            ]
	         },
	         {
	            "directory": "/var/www,/var/htdocs,/home/httpd,/usr/local/apache,/usr/local/apache2,/usr/local/www",
	            "result": "passed",
	            "policy_id": "system_audit",
	            "title": "Web exploits (uncommon file name inside htdocs) - Possible compromise",
	            "id": 1004,
	            "compliance": [
	               {
	                  "value": "6.5, 6.6, 11.4",
	                  "key": "pci_dss"
	               }
	            ]
	         },
	         {
	            "result": "passed",
	            "policy_id": "system_audit",
	            "title": "PHP - Displaying of errors is enabled",
	            "id": 1003,
	            "file": "/etc/php.ini",
	            "compliance": []
	         },
	         {
	            "result": "passed",
	            "policy_id": "system_audit",
	            "title": "PHP - Allow URL fopen is enabled",
	            "id": 1002,
	            "file": "/etc/php.ini",
	            "compliance": []
	         },
	         {
	            "result": "passed",
	            "policy_id": "system_audit",
	            "title": "PHP - Expose PHP is enabled",
	            "id": 1001,
	            "file": "/etc/php.ini",
	            "compliance": []
	         },
	         {
	            "result": "passed",
	            "policy_id": "system_audit",
	            "title": "PHP - Register globals are enabled",
	            "id": 1000,
	            "file": "/etc/php.ini",
	            "compliance": []
	         }
	      ]
	   }
	}
	

Get configuration assessment database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the configuration assessment database of an agent.

**Request**:

``GET`` ::

	/configuration-assessment/:agent_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``                     | String        | Filters by policy name.                                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``description``              | String        | Filters by policy description                                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``references``               | String        | Filters by references                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter results by. This is specially useful to filter by total checks passed, failed or total score (fields pass, fail, score).                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "curl -u foo:bar -k -X GET "https://127.0.0.1:55000/configuration-assessment/000?pretty&q=pass>50;score<150"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 1,
	      "items": [
	         {
	            "end_scan": "2019-02-19 10:22:15",
	            "name": "System audit for web-related vulnerabilities",
	            "start_scan": "2019-02-19 10:22:15",
	            "description": "Guidance for establishing a secure configuration for web-related vulnerabilities.",
	            "fail": 0,
	            "references": "(null)",
	            "policy_id": "system_audit",
	            "score": 100,
	            "pass": 76
	         }
	      ]
	   }
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``                     | String        | Filters by filename.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``                     | String        | Filters by path.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters the decoders by status.                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - enabled                                                                                                                                                                                                                            |
|                              |               | - disabled                                                                                                                                                                                                                           |
|                              |               | - all                                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/decoders?pretty&offset=0&limit=2&sort=+file,position"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "file": "0005-wazuh_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "name": "wazuh",
	            "position": 0,
	            "status": "enabled",
	            "details": {
	               "prematch": "^wazuh: "
	            }
	         },
	         {
	            "file": "0005-wazuh_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "name": "agent-buffer",
	            "position": 1,
	            "status": "enabled",
	            "details": {
	               "parent": "wazuh",
	               "prematch": "^Agent buffer:",
	               "regex": "^ '(\\S+)'.",
	               "order": "level"
	            }
	         }
	      ],
	      "totalItems": 571
	   }
	}
	

Get all decoders files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all decoders files included in ossec.conf.

**Request**:

``GET`` ::

	/decoders/files

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters the decoders by status.                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - enabled                                                                                                                                                                                                                            |
|                              |               | - disabled                                                                                                                                                                                                                           |
|                              |               | - all                                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``                     | String        | Filters by filename.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``                     | String        | Filters by path.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``download``                 | String        | Downloads the file                                                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/decoders/files?pretty&offset=0&limit=10&sort=-path"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "file": "0185-openldap_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0220-postfix_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0400-identity_guard_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0190-openvpn_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0060-cisco-estreamer_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0335-telnet_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0035-asterisk_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0275-sendmail_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0345-unbound_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0415-jenkins_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "status": "enabled"
	         }
	      ],
	      "totalItems": 96
	   }
	}
	

Get all parent decoders
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all parent decoders included in ossec.conf

**Request**:

``GET`` ::

	/decoders/parents

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/decoders/parents?pretty&offset=0&limit=2&sort=-file"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "file": "local_decoder.xml",
	            "path": "/var/ossec/etc/decoders",
	            "name": "local_decoder_example",
	            "position": 0,
	            "status": "enabled",
	            "details": {
	               "program_name": "local_decoder_example"
	            }
	         },
	         {
	            "file": "0465-azure_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "name": "azure-storage",
	            "position": 0,
	            "status": "enabled",
	            "details": {
	               "prematch": "^azure_tag: azure-storage. ",
	               "regex": "^azure_storage_tag: (\\S+)",
	               "order": "tag"
	            }
	         }
	      ],
	      "totalItems": 153
	   }
	}
	

Get decoders by name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the decoders with the specified name.

**Request**:

``GET`` ::

	/decoders/:decoder_name

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``decoder_name``             | String        | Decoder name.                                                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/decoders/apache-errorlog?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "file": "0025-apache_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "name": "apache-errorlog",
	            "position": 0,
	            "status": "enabled",
	            "details": {
	               "program_name": "^apache2|^httpd"
	            }
	         },
	         {
	            "file": "0025-apache_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "name": "apache-errorlog",
	            "position": 1,
	            "status": "enabled",
	            "details": {
	               "prematch": "^[warn] |^[notice] |^[error] "
	            }
	         },
	         {
	            "file": "0025-apache_decoders.xml",
	            "path": "/var/ossec/ruleset/decoders",
	            "name": "apache-errorlog",
	            "position": 2,
	            "status": "enabled",
	            "details": {
	               "prematch": "^[\\w+ \\w+ \\d+ \\d+:\\d+:\\d+.\\d+ \\d+] [\\S+:warn] |^[\\w+ \\w+ \\d+ \\d+:\\d+:\\d+.\\d+ \\d+] [\\S+:notice] |^[\\w+ \\w+ \\d+ \\d+:\\d+:\\d+.\\d+ \\d+] [\\S*:error] |^[\\w+ \\w+ \\d+ \\d+:\\d+:\\d+.\\d+ \\d+] [\\S+:info] "
	            }
	         }
	      ],
	      "totalItems": 3
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ram_free``                 | String        | Filters by ram_free.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ram_total``                | String        | Filters by ram_total.                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cpu_cores``                | String        | Filters by cpu_cores.                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cpu_mhz``                  | String        | Filters by cpu_mhz.                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cpu_name``                 | String        | Filters by cpu_name.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``board_serial``             | String        | Filters by board_serial.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/hardware?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "cpu": {
	               "cores": 2,
	               "mhz": 1992.001,
	               "name": "Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz"
	            },
	            "ram": {
	               "free": 65396,
	               "total": 492832,
	               "usage": 87
	            },
	            "scan": {
	               "id": 219248827,
	               "time": "2019/02/19 10:22:14"
	            },
	            "board_serial": "0",
	            "agent_id": "000"
	         },
	         {
	            "cpu": {
	               "cores": 1,
	               "mhz": 1992.001,
	               "name": "Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz"
	            },
	            "ram": {
	               "free": 40372,
	               "total": 234968,
	               "usage": 83
	            },
	            "scan": {
	               "id": 257116304,
	               "time": "2019/02/19 10:26:20"
	            },
	            "board_serial": "0",
	            "agent_id": "001"
	         }
	      ],
	      "totalItems": 4
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``proto``                    | String        | Filters by proto.                                                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``address``                  | String        | Filters by address.                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``broadcast``                | String        | Filters by broadcast.                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``netmask``                  | String        | Filters by netmask.                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/netaddr?pretty&limit=2&sort=proto"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "proto": "ipv6",
	            "iface": "enp0s3",
	            "scan_id": 1203337658,
	            "address": "fe80::f9:71ff:fed7:9d11",
	            "netmask": "ffff:ffff:ffff:ffff::",
	            "agent_id": "000"
	         },
	         {
	            "proto": "ipv6",
	            "iface": "enp0s8",
	            "scan_id": 1203337658,
	            "address": "fe80::a00:27ff:fefc:51f5",
	            "netmask": "ffff:ffff:ffff:ffff::",
	            "agent_id": "000"
	         }
	      ],
	      "totalItems": 16
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``                     | String        | Filters by name.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``adapter``                  | String        | Filters by adapter.                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                     | String        | Filters by type.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``                    | String        | Filters by state.                                                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``mtu``                      | String        | Filters by mtu.                                                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_packets``               | String        | Filters by tx_packets.                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_packets``               | String        | Filters by rx_packets.                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_bytes``                 | String        | Filters by tx_bytes.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_bytes``                 | String        | Filters by rx_bytes.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_errors``                | String        | Filters by tx_errors.                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_errors``                | String        | Filters by rx_errors.                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_dropped``               | String        | Filters by tx_dropped.                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_dropped``               | String        | Filters by rx_dropped.                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/netiface?pretty&limit=2"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "rx": {
	               "bytes": 47319629,
	               "dropped": 0,
	               "errors": 0,
	               "packets": 43889
	            },
	            "scan": {
	               "id": 1203337658,
	               "time": "2019/02/19 10:22:14"
	            },
	            "tx": {
	               "bytes": 843282,
	               "dropped": 0,
	               "errors": 0,
	               "packets": 12505
	            },
	            "mac": "02:f9:71:d7:9d:11",
	            "name": "enp0s3",
	            "type": "ethernet",
	            "mtu": 1500,
	            "state": "up",
	            "agent_id": "000"
	         },
	         {
	            "rx": {
	               "bytes": 0,
	               "dropped": 0,
	               "errors": 0,
	               "packets": 0
	            },
	            "scan": {
	               "id": 1203337658,
	               "time": "2019/02/19 10:22:14"
	            },
	            "tx": {
	               "bytes": 3874,
	               "dropped": 0,
	               "errors": 0,
	               "packets": 19
	            },
	            "mac": "08:00:27:fc:51:f5",
	            "name": "enp0s8",
	            "type": "ethernet",
	            "mtu": 1500,
	            "state": "up",
	            "agent_id": "000"
	         }
	      ],
	      "totalItems": 8
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``iface``                    | String        | Filters by iface.                                                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                     | String        | Filters by type.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``gateway``                  | String        | Filters by gateway.                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``dhcp``                     | String        | Filters by dhcp.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/netproto?pretty&limit=2&sort=type"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "iface": "enp0s3",
	            "scan_id": 1203337658,
	            "type": "ipv6",
	            "dhcp": "enabled",
	            "agent_id": "000"
	         },
	         {
	            "iface": "enp0s8",
	            "scan_id": 1203337658,
	            "type": "ipv6",
	            "dhcp": "enabled",
	            "agent_id": "000"
	         }
	      ],
	      "totalItems": 16
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os_name``                  | String        | Filters by os_name.                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``architecture``             | String        | Filters by architecture.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os_version``               | String        | Filters by os_version.                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``version``                  | String        | Filters by version.                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``release``                  | String        | Filters by release.                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/os?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "os": {
	               "codename": "Bionic Beaver",
	               "major": "18",
	               "minor": "04",
	               "name": "Ubuntu",
	               "platform": "ubuntu",
	               "version": "18.04.1 LTS (Bionic Beaver)"
	            },
	            "scan": {
	               "id": 651932304,
	               "time": "2019/02/19 10:22:14"
	            },
	            "release": "4.15.0-43-generic",
	            "architecture": "x86_64",
	            "version": "#46-Ubuntu SMP Thu Dec 6 14:45:28 UTC 2018",
	            "sysname": "Linux",
	            "hostname": "master",
	            "agent_id": "000"
	         },
	         {
	            "os": {
	               "codename": "Bionic Beaver",
	               "major": "18",
	               "minor": "04",
	               "name": "Ubuntu",
	               "platform": "ubuntu",
	               "version": "18.04.1 LTS (Bionic Beaver)"
	            },
	            "scan": {
	               "id": 780978297,
	               "time": "2019/02/19 10:26:20"
	            },
	            "release": "4.15.0-43-generic",
	            "architecture": "x86_64",
	            "version": "#46-Ubuntu SMP Thu Dec 6 14:45:28 UTC 2018",
	            "sysname": "Linux",
	            "hostname": "agent-1",
	            "agent_id": "001"
	         }
	      ],
	      "totalItems": 4
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``vendor``                   | String        | Filters by vendor.                                                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``                     | String        | Filters by name.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``architecture``             | String        | Filters by architecture.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``format``                   | String        | Filters by format.                                                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/packages?pretty&sort=-name&limit=2"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "scan": {
	               "id": 1631140954,
	               "time": "2019/02/19 10:22:14"
	            },
	            "name": "acl",
	            "section": "utils",
	            "priority": "optional",
	            "size": 200,
	            "description": "Access control list utilities",
	            "architecture": "amd64",
	            "multiarch": "foreign",
	            "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
	            "version": "2.2.52-3build1",
	            "format": "deb",
	            "agent_id": "000"
	         },
	         {
	            "scan": {
	               "id": 1631140954,
	               "time": "2019/02/19 10:22:14"
	            },
	            "name": "accountsservice",
	            "section": "admin",
	            "priority": "optional",
	            "size": 440,
	            "description": "query and manipulate user account information",
	            "architecture": "amd64",
	            "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
	            "version": "0.6.45-1ubuntu1",
	            "format": "deb",
	            "agent_id": "000"
	         }
	      ],
	      "totalItems": 2014
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pid``                      | Number        | Filters by pid.                                                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``protocol``                 | String        | Filters by protocol.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``local_ip``                 | String        | Filters by local_ip.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``local_port``               | Number        | Filters by local_port.                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``remote_ip``                | String        | Filters by remote_ip.                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_queue``                 | Number        | Filters by tx_queue.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``                    | String        | Filters by state.                                                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``process``                  | String        | Filters by process.                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/ports?pretty&limit=2&sort=protocol"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "local": {
	               "ip": "::",
	               "port": 22
	            },
	            "remote": {
	               "ip": "::",
	               "port": 0
	            },
	            "scan": {
	               "id": 729678272,
	               "time": "2019/02/19 10:22:20"
	            },
	            "inode": 19514,
	            "tx_queue": 0,
	            "protocol": "tcp6",
	            "rx_queue": 0,
	            "state": "listening",
	            "agent_id": "000"
	         },
	         {
	            "local": {
	               "ip": "::",
	               "port": 55000
	            },
	            "remote": {
	               "ip": "::",
	               "port": 0
	            },
	            "scan": {
	               "id": 729678272,
	               "time": "2019/02/19 10:22:20"
	            },
	            "inode": 109632,
	            "tx_queue": 0,
	            "protocol": "tcp6",
	            "rx_queue": 0,
	            "state": "listening",
	            "agent_id": "000"
	         }
	      ],
	      "totalItems": 18
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pid``                      | Number        | Filters by process pid.                                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``                    | String        | Filters by process state.                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ppid``                     | Number        | Filters by process parent pid.                                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``egroup``                   | String        | Filters by process egroup.                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``euser``                    | String        | Filters by process euser.                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``fgroup``                   | String        | Filters by process fgroup.                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``                     | String        | Filters by process name.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``nlwp``                     | Number        | Filters by process nlwp.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pgrp``                     | Number        | Filters by process pgrp.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``priority``                 | Number        | Filters by process priority.                                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rgroup``                   | String        | Filters by process rgroup.                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ruser``                    | String        | Filters by process ruser.                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sgroup``                   | String        | Filters by process sgroup.                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``suser``                    | String        | Filters by process suser.                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/syscollector/processes?pretty&limit=2&sort=priority"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "scan": {
	               "id": 419533576,
	               "time": "2019/02/19 10:22:20"
	            },
	            "euser": "root",
	            "size": 56351,
	            "ppid": 0,
	            "rgroup": "root",
	            "utime": 85,
	            "nice": 0,
	            "tgid": 1,
	            "tty": 0,
	            "cmd": "/sbin/init",
	            "state": "S",
	            "fgroup": "root",
	            "processor": 0,
	            "priority": 20,
	            "vm_size": 225404,
	            "start_time": 5,
	            "stime": 247,
	            "ruser": "root",
	            "egroup": "root",
	            "nlwp": 1,
	            "resident": 1831,
	            "name": "systemd",
	            "share": 1214,
	            "session": 1,
	            "suser": "root",
	            "pgrp": 1,
	            "pid": "1",
	            "sgroup": "root",
	            "agent_id": "000"
	         },
	         {
	            "scan": {
	               "id": 419533576,
	               "time": "2019/02/19 10:22:20"
	            },
	            "euser": "root",
	            "size": 0,
	            "ppid": 2,
	            "rgroup": "root",
	            "utime": 0,
	            "nice": 5,
	            "tgid": 28,
	            "tty": 0,
	            "state": "S",
	            "fgroup": "root",
	            "processor": 1,
	            "priority": 25,
	            "vm_size": 0,
	            "start_time": 18,
	            "stime": 0,
	            "ruser": "root",
	            "egroup": "root",
	            "nlwp": 1,
	            "resident": 0,
	            "name": "ksmd",
	            "share": 0,
	            "session": 0,
	            "suser": "root",
	            "pgrp": 0,
	            "pid": "28",
	            "sgroup": "root",
	            "agent_id": "000"
	         }
	      ],
	      "totalItems": 422
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``benchmark``                | String        | Filters by benchmark.                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``profile``                  | String        | Filters by evaluated profile.                                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pass``                     | Number        | Filters by passed checks.                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``fail``                     | Number        | Filters by failed checks.                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``error``                    | Number        | Filters by encountered errors.                                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``notchecked``               | Number        | Filters by not checked.                                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``unknown``                  | Number        | Filters by unknown results.                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``score``                    | Number        | Filters by final score.                                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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



Lists
----------------------------------------
Info
++++++++++++++++++++++++++++++++++++++++

Get all lists
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the content of all CDB lists

**Request**:

``GET`` ::

	/lists

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``                     | String        | Filters by path.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters the decoders by status.                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - enabled                                                                                                                                                                                                                            |
|                              |               | - disabled                                                                                                                                                                                                                           |
|                              |               | - all                                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/lists?pretty&path=etc/lists/audit-keys"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 1,
	      "items": [
	         [
	            {
	               "key": "audit-wazuh-w",
	               "value": "write"
	            },
	            {
	               "key": "audit-wazuh-r",
	               "value": "read"
	            },
	            {
	               "key": "audit-wazuh-a",
	               "value": "attribute"
	            },
	            {
	               "key": "audit-wazuh-x",
	               "value": "execute"
	            },
	            {
	               "key": "audit-wazuh-c",
	               "value": "command"
	            }
	         ]
	      ]
	   }
	}
	

Get paths from all lists
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the path from all lists.

**Request**:

``GET`` ::

	/lists/files

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/lists/files?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 4,
	      "items": [
	         {
	            "path": "etc/lists",
	            "name": "security-eventchannel"
	         },
	         {
	            "path": "etc/lists/amazon",
	            "name": "aws-sources"
	         },
	         {
	            "path": "etc/lists/amazon",
	            "name": "aws-eventnames"
	         },
	         {
	            "path": "etc/lists",
	            "name": "audit-keys"
	         }
	      ]
	   }
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``section``                  | String        | Indicates the ossec.conf section: global, rules, syscheck, rootcheck, remote, alerts, command, active-response, localfile.                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``field``                    | String        | Indicates a section child, e.g, fields for rule section are: include, decoder_dir, etc.                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/configuration?section=global&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "jsonout_output": "yes",
	      "alerts_log": "yes",
	      "logall": "no",
	      "logall_json": "no",
	      "email_notification": "no",
	      "smtp_server": "smtp.example.wazuh.com",
	      "email_from": "ossecm@example.wazuh.com",
	      "email_to": "recipient@example.wazuh.com",
	      "email_maxperhour": "12",
	      "email_log_source": "alerts.log",
	      "queue_size": "131072",
	      "white_list": [
	         "127.0.0.1",
	         "^localhost.localdomain$",
	         "127.0.0.53"
	      ]
	   }
	}
	


Files
++++++++++++++++++++++++++++++++++++++++

Check Wazuh configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns if Wazuh configuration is OK.

**Request**:

``GET`` ::

	/manager/configuration/validation

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/configuration/validation?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "status": "OK"
	   }
	}
	

Get local file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the content of a local file (rules, decoders and lists).

**Request**:

``GET`` ::

	/manager/files

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``path``                     | String        | Relative path of file.                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/files?path=etc/rules/local_rules.xml&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "<!-- Local rules -->\n\n<!-- Modify it at your will. -->\n<!-- Copyright (C) 2015-2019, Wazuh Inc. -->\n\n<!-- Example -->\n<group name=\"local,syslog,sshd,\">\n\n  <!--\n  Dec 10 01:02:02 host sshd[1234]: Failed none for root from 1.1.1.1 port 1066 ssh2\n  -->\n  <rule id=\"100001\" level=\"5\">\n    <if_sid>5716</if_sid>\n    <srcip>1.1.1.1</srcip>\n    <description>sshd: authentication failed from IP 1.1.1.1.</description>\n    <group>authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group>\n  </rule>\n\n</group>\n"
	}
	

Update local file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Upload a local file (rules, decoders and lists).

**Request**:

``POST`` ::

	/manager/files

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``file``                     | String        | Input file.                                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``                     | String        | Relative path were input file will be placed.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X POST -H 'Content-type: application/xml' -d @rules.xml "https://127.0.0.1:55000/manager/files?path=etc/rules/new_rule.xml&pretty"

**Example Response:**
::

	{
	    "data": "File updated successfully", 
	    "error": 0
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
<<<<<<< HEAD
	      "compilation_date": "Fri Jan 11 18:40:06 UTC 2019",
	      "version": "v3.8.2",
	      "openssl_support": "yes",
	      "max_agents": "14000",
	      "ruleset_version": "3801",
=======
>>>>>>> 3.9
	      "path": "/var/ossec",
	      "version": "v3.9.0",
	      "compilation_date": "Tue Feb 19 10:27:25 UTC 2019",
	      "type": "manager",
	      "max_agents": "14000",
	      "openssl_support": "yes",
	      "ruleset_version": "3902",
	      "tz_offset": "+0000",
	      "tz_name": "UTC"
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
	      "ossec-monitord": "running",
	      "ossec-logcollector": "running",
	      "ossec-remoted": "running",
	      "ossec-syscheckd": "running",
	      "ossec-analysisd": "running",
	      "ossec-maild": "stopped",
	      "ossec-execd": "running",
	      "wazuh-modulesd": "running",
	      "ossec-authd": "stopped",
	      "wazuh-clusterd": "running"
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type_log``                 | String        | Filters by type of log.                                                                                                                                                                                                              |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - all                                                                                                                                                                                                                                |
|                              |               | - error                                                                                                                                                                                                                              |
|                              |               | - warning                                                                                                                                                                                                                            |
|                              |               | - info                                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``category``                 | String        | Filters by category of log.                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/logs?offset=0&limit=5&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "timestamp": "2019-02-19 10:31:26",
	            "tag": "ossec-remoted",
	            "level": "info",
	            "description": "(1409): Authentication file changed. Updating."
	         },
	         {
	            "timestamp": "2019-02-19 10:31:26",
	            "tag": "ossec-remoted",
	            "level": "info",
	            "description": "(1410): Reading authentication keys file."
	         },
	         {
	            "timestamp": "2019-02-19 10:31:16",
	            "tag": "ossec-remoted",
	            "level": "info",
	            "description": "(1409): Authentication file changed. Updating."
	         },
	         {
	            "timestamp": "2019-02-19 10:31:16",
	            "tag": "ossec-remoted",
	            "level": "info",
	            "description": "(1410): Reading authentication keys file."
	         },
	         {
	            "timestamp": "2019-02-19 10:29:27",
	            "tag": "ossec-syscheckd",
	            "level": "info",
	            "description": "Ending syscheck scan. Database completed."
	         }
	      ],
	      "totalItems": 596
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
	      "ossec-authd": {
	         "all": 6,
	         "info": 6,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-db": {
	         "all": 3,
	         "info": 3,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-execd": {
	         "all": 4,
	         "info": 4,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-analysisd": {
	         "all": 455,
	         "info": 455,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-remoted": {
	         "all": 13,
	         "info": 13,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-monitord": {
	         "all": 3,
	         "info": 3,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "configuration-assessment": {
	         "all": 14,
	         "info": 14,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd:osquery": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd:ciscat": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd:database": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd:oscap": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd:download": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-logcollector": {
	         "all": 19,
	         "info": 19,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd:syscollector": {
	         "all": 7,
	         "info": 7,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-syscheckd": {
	         "all": 55,
	         "info": 55,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-rootcheck": {
	         "all": 5,
	         "info": 5,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      }
	   }
	}
	


Restart
++++++++++++++++++++++++++++++++++++++++

Restart Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Restarts Wazuh Manager.

**Request**:

``PUT`` ::

	/manager/restart

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/manager/restart?pretty"

**Example Response:**
::

	{
	    "data": "Restarting manager", 
	    "error": 0
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
	      "total_events_decoded": 5,
	      "syscheck_events_decoded": 0,
	      "syscheck_edps": 0,
	      "syscollector_events_decoded": 0,
	      "syscollector_edps": 0,
	      "rootcheck_events_decoded": 0,
	      "rootcheck_edps": 0,
	      "configuration_assessment_events_decoded": 0,
	      "configuration_assessment_edps": 0,
	      "hostinfo_events_decoded": 0,
	      "hostinfo_edps": 0,
	      "winevt_events_decoded": 0,
	      "winevt_edps": 0,
	      "other_events_decoded": 5,
	      "other_events_edps": 1,
	      "events_processed": 5,
	      "events_edps": 1,
	      "events_received": 5,
	      "events_dropped": 0,
	      "alerts_written": 0,
	      "firewall_written": 0,
	      "fts_written": 0,
	      "syscheck_queue_usage": 0,
	      "syscheck_queue_size": 16384,
	      "syscollector_queue_usage": 0,
	      "syscollector_queue_size": 16384,
	      "rootcheck_queue_usage": 0,
	      "rootcheck_queue_size": 16384,
	      "configuration_assessment_queue_usage": 0,
	      "configuration_assessment_queue_size": 16384,
	      "hostinfo_queue_usage": 0,
	      "hostinfo_queue_size": 16384,
	      "winevt_queue_usage": 0,
	      "winevt_queue_size": 16384,
	      "event_queue_usage": 0,
	      "event_queue_size": 16384,
	      "rule_matching_queue_usage": 0,
	      "rule_matching_queue_size": 16384,
	      "alerts_queue_usage": 0,
	      "alerts_queue_size": 16384,
	      "firewall_queue_usage": 0,
	      "firewall_queue_size": 16384,
	      "statistical_queue_usage": 0,
	      "statistical_queue_size": 16384,
	      "archives_queue_usage": 0,
	      "archives_queue_size": 16384
	   }
	}
	

Get manager stats
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns Wazuh statistical information for the current or specified date.

**Request**:

``GET`` ::

	/manager/stats

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``date``                     | String        | Selects the date for getting the statistical information. Format: YYYYMMDD                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	      "queue_size": 0,
	      "total_queue_size": 131072,
	      "tcp_sessions": 0,
	      "evt_count": 0,
	      "ctrl_msg_count": 0,
	      "discarded_count": 0,
	      "msg_sent": 0,
	      "recv_bytes": 0
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rootcheck/000/last_scan?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "end": "2019-02-19 10:22:56",
	      "start": "2019-02-19 10:22:31"
	   }
	}
	

Get rootcheck CIS requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the CIS requirements of all rootchecks of the specified agent.

**Request**:

``GET`` ::

	/rootcheck/:agent_id/cis

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the rootcheck database of an agent.

**Request**:

``GET`` ::

	/rootcheck/:agent_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pci``                      | String        | Filters by pci requirement.                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cis``                      | String        | Filters by CIS.                                                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters by status.                                                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rootcheck/000?offset=0&limit=2&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [],
	      "totalItems": 0
	   }
	}
	

Get rootcheck pci requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the PCI requirements of all rootchecks of the agent.

**Request**:

``GET`` ::

	/rootcheck/:agent_id/pci

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rootcheck/000/pci?offset=0&limit=10&pretty"

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters the rules by status.                                                                                                                                                                                                         |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - enabled                                                                                                                                                                                                                            |
|                              |               | - disabled                                                                                                                                                                                                                           |
|                              |               | - all                                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group``                    | String        | Filters the rules by group.                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``level``                    | Range         | Filters the rules by level. level=2 or level=2-5.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``                     | String        | Filters the rules by path.                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``                     | String        | Filters the rules by file name.                                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pci``                      | String        | Filters the rules by pci requirement.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``gdpr``                     | String        | Filters the rules by gdpr.                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules?offset=0&limit=2&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "file": "0010-rules_config.xml",
	            "path": "/var/ossec/ruleset/rules",
	            "id": 1,
	            "level": 0,
	            "description": "Generic template for all syslog rules.",
	            "status": "enabled",
	            "groups": [
	               "syslog"
	            ],
	            "pci": [],
	            "gdpr": [],
	            "details": {
	               "noalert": "1",
	               "category": "syslog"
	            }
	         },
	         {
	            "file": "0010-rules_config.xml",
	            "path": "/var/ossec/ruleset/rules",
	            "id": 2,
	            "level": 0,
	            "description": "Generic template for all firewall rules.",
	            "status": "enabled",
	            "groups": [
	               "firewall"
	            ],
	            "pci": [],
	            "gdpr": [],
	            "details": {
	               "noalert": "1",
	               "category": "firewall"
	            }
	         }
	      ],
	      "totalItems": 2117
	   }
	}
	

Get files of rules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the files of all rules.

**Request**:

``GET`` ::

	/rules/files

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``status``                   | String        | Filters files by status.                                                                                                                                                                                                             |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - enabled                                                                                                                                                                                                                            |
|                              |               | - disabled                                                                                                                                                                                                                           |
|                              |               | - all                                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``                     | String        | Filters the rules by path.                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``                     | String        | Filters the rules by filefile.                                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``download``                 | String        | Downloads the file                                                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/files?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "file": "0010-rules_config.xml",
	            "path": "/var/ossec/ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0015-ossec_rules.xml",
	            "path": "/var/ossec/ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0016-wazuh_rules.xml",
	            "path": "/var/ossec/ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0020-syslog_rules.xml",
	            "path": "/var/ossec/ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0025-sendmail_rules.xml",
	            "path": "/var/ossec/ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0030-postfix_rules.xml",
	            "path": "/var/ossec/ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0035-spamd_rules.xml",
	            "path": "/var/ossec/ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0040-imapd_rules.xml",
	            "path": "/var/ossec/ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0045-mailscanner_rules.xml",
	            "path": "/var/ossec/ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0050-ms-exchange_rules.xml",
	            "path": "/var/ossec/ruleset/rules",
	            "status": "enabled"
	         }
	      ],
	      "totalItems": 112
	   }
	}
	

Get rule gdpr requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the GDPR requirements of all rules.

**Request**:

``GET`` ::

	/rules/gdpr

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/gdpr?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         "II_5.1.f",
	         "IV_30.1.g",
	         "IV_32.2",
	         "IV_35.7.d"
	      ],
	      "totalItems": 4
	   }
	}
	

Get rule groups
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the groups of all rules.

**Request**:

``GET`` ::

	/rules/groups

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/groups?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
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
	      ],
	      "totalItems": 318
	   }
	}
	

Get rule pci requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the PCI requirements of all rules.

**Request**:

``GET`` ::

	/rules/pci

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/pci?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
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
	      ],
	      "totalItems": 38
	   }
	}
	

Get rules by id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the rules with the specified id.

**Request**:

``GET`` ::

	/rules/:rule_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``id``                       | Number        | rule.                                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/1002?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "file": "0020-syslog_rules.xml",
	            "path": "/var/ossec/ruleset/rules",
	            "id": 1002,
	            "level": 2,
	            "description": "Unknown problem somewhere in the system.",
	            "status": "enabled",
	            "groups": [
	               "gpg13_4.3",
	               "syslog",
	               "errors"
	            ],
	            "pci": [],
	            "gdpr": [],
	            "details": {
	               "match": "core_dumped|failure|error|attack| bad |illegal |denied|refused|unauthorized|fatal|failed|Segmentation Fault|Corrupted"
	            }
	         }
	      ],
	      "totalItems": 1
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscheck/000/last_scan?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "start": "2019-02-19 10:31:40",
	      "end": "2019-02-19 10:23:14"
	   }
	}
	

Get syscheck files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the syscheck files of an agent.

**Request**:

``GET`` ::

	/syscheck/:agent_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``file``                     | String        | Filters file by filename.                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                     | String        | Selects type of file.                                                                                                                                                                                                                |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - file                                                                                                                                                                                                                               |
|                              |               | - registry                                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``summary``                  | String        | Returns a summary grouping by filename.                                                                                                                                                                                              |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | Allowed values:                                                                                                                                                                                                                      |
|                              |               |                                                                                                                                                                                                                                      |
|                              |               | - yes                                                                                                                                                                                                                                |
|                              |               | - no                                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``md5``                      | String        | Returns the files with the specified md5 hash.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sha1``                     | String        | Returns the files with the specified sha1 hash.                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sha256``                   | String        | Returns the files with the specified sha256 hash.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``hash``                     | String        | Returns the files with the specified hash (md5, sha1 or sha256).                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscheck/000?offset=0&limit=2&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 2802,
	      "items": [
	         {
	            "sha256": "9fa9dd312da04fbad130b70c96bf9707b8dc72cbdbb304d69bf58f52f94883b4",
	            "inode": 1578,
	            "uid": "0",
	            "mtime": "2018-11-05 11:51:29",
	            "size": 553122,
	            "type": "file",
	            "date": "2019-02-19 10:22:36",
	            "gid": "0",
	            "perm": "100644",
	            "gname": "root",
	            "md5": "fe5be9e1b2ad5c55132a3521ecaadcdd",
	            "sha1": "6541fc14923473fcd2e04c98248c9ef2613050b1",
	            "file": "/etc/ssh/moduli",
	            "uname": "root"
	         },
	         {
	            "sha256": "a39fbc57dc2ef8a473f078d1f6a35f725809400df67070b8852e8ed725047df2",
	            "inode": 1579,
	            "uid": "0",
	            "mtime": "2018-11-05 11:51:29",
	            "size": 1580,
	            "type": "file",
	            "date": "2019-02-19 10:22:36",
	            "gid": "0",
	            "perm": "100644",
	            "gname": "root",
	            "md5": "f7bf238a3b0bf155c565454a9f819731",
	            "sha1": "016f8bd2ea009451042a856611d5d2967760e833",
	            "file": "/etc/ssh/ssh_config",
	            "uname": "root"
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/hardware?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "cpu": {
	         "cores": 2,
	         "mhz": 1992.001,
	         "name": "Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz"
	      },
	      "ram": {
	         "free": 65396,
	         "total": 492832,
	         "usage": 87
	      },
	      "scan": {
	         "id": 219248827,
	         "time": "2019/02/19 10:22:14"
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``iface``                    | String        | Filters by interface name.                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``proto``                    | String        | Filters by proto.                                                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``address``                  | String        | Filters by address.                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``broadcast``                | String        | Filters by broadcast.                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``netmask``                  | String        | Filters by netmask.                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/netaddr?pretty&limit=2&sort=proto"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "proto": "ipv6",
	            "iface": "enp0s3",
	            "scan_id": 1203337658,
	            "address": "fe80::f9:71ff:fed7:9d11",
	            "netmask": "ffff:ffff:ffff:ffff::"
	         },
	         {
	            "proto": "ipv6",
	            "iface": "enp0s8",
	            "scan_id": 1203337658,
	            "address": "fe80::a00:27ff:fefc:51f5",
	            "netmask": "ffff:ffff:ffff:ffff::"
	         }
	      ],
	      "totalItems": 4
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``                     | String        | Filters by name.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``adapter``                  | String        | Filters by adapter.                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                     | String        | Filters by type.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``                    | String        | Filters by state.                                                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``mtu``                      | String        | Filters by mtu.                                                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_packets``               | String        | Filters by tx_packets.                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_packets``               | String        | Filters by rx_packets.                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_bytes``                 | String        | Filters by tx_bytes.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_bytes``                 | String        | Filters by rx_bytes.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_errors``                | String        | Filters by tx_errors.                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_errors``                | String        | Filters by rx_errors.                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_dropped``               | String        | Filters by tx_dropped.                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rx_dropped``               | String        | Filters by rx_dropped.                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/netiface?pretty&limit=2&sort=state"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "rx": {
	               "bytes": 47319629,
	               "dropped": 0,
	               "errors": 0,
	               "packets": 43889
	            },
	            "scan": {
	               "id": 1203337658,
	               "time": "2019/02/19 10:22:14"
	            },
	            "tx": {
	               "bytes": 843282,
	               "dropped": 0,
	               "errors": 0,
	               "packets": 12505
	            },
	            "mac": "02:f9:71:d7:9d:11",
	            "name": "enp0s3",
	            "type": "ethernet",
	            "mtu": 1500,
	            "state": "up"
	         },
	         {
	            "rx": {
	               "bytes": 0,
	               "dropped": 0,
	               "errors": 0,
	               "packets": 0
	            },
	            "scan": {
	               "id": 1203337658,
	               "time": "2019/02/19 10:22:14"
	            },
	            "tx": {
	               "bytes": 3874,
	               "dropped": 0,
	               "errors": 0,
	               "packets": 19
	            },
	            "mac": "08:00:27:fc:51:f5",
	            "name": "enp0s8",
	            "type": "ethernet",
	            "mtu": 1500,
	            "state": "up"
	         }
	      ],
	      "totalItems": 2
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``iface``                    | String        | Filters by iface.                                                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                     | String        | Filters by type.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``gateway``                  | String        | Filters by gateway.                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``dhcp``                     | String        | Filters by dhcp.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/netproto?pretty&limit=2&sort=type"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "iface": "enp0s3",
	            "scan_id": 1203337658,
	            "type": "ipv6",
	            "dhcp": "enabled"
	         },
	         {
	            "iface": "enp0s8",
	            "scan_id": 1203337658,
	            "type": "ipv6",
	            "dhcp": "enabled"
	         }
	      ],
	      "totalItems": 4
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/os?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "os": {
	         "codename": "Bionic Beaver",
	         "major": "18",
	         "minor": "04",
	         "name": "Ubuntu",
	         "platform": "ubuntu",
	         "version": "18.04.1 LTS (Bionic Beaver)"
	      },
	      "scan": {
	         "id": 651932304,
	         "time": "2019/02/19 10:22:14"
	      },
	      "release": "4.15.0-43-generic",
	      "architecture": "x86_64",
	      "version": "#46-Ubuntu SMP Thu Dec 6 14:45:28 UTC 2018",
	      "sysname": "Linux",
	      "hostname": "master"
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``vendor``                   | String        | Filters by vendor.                                                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``                     | String        | Filters by name.                                                                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``architecture``             | String        | Filters by architecture.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``format``                   | String        | Filters by format.                                                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``version``                  | String        | Filters by version.                                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/packages?pretty&limit=2&offset=10&sort=-name"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "scan": {
	               "id": 1631140954,
	               "time": "2019/02/19 10:22:14"
	            },
	            "name": "base-files",
	            "section": "admin",
	            "priority": "required",
	            "size": 386,
	            "description": "Debian base system miscellaneous files",
	            "architecture": "amd64",
	            "multiarch": "foreign",
	            "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
	            "version": "10.1ubuntu2.3",
	            "format": "deb"
	         },
	         {
	            "scan": {
	               "id": 1631140954,
	               "time": "2019/02/19 10:22:14"
	            },
	            "name": "base-passwd",
	            "section": "admin",
	            "priority": "required",
	            "size": 228,
	            "description": "Debian base system master password and group files",
	            "architecture": "amd64",
	            "multiarch": "foreign",
	            "vendor": "Colin Watson <cjwatson@debian.org>",
	            "version": "3.5.44",
	            "format": "deb"
	         }
	      ],
	      "totalItems": 508
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pid``                      | Number        | Filters by pid.                                                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``protocol``                 | String        | Filters by protocol.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``local_ip``                 | String        | Filters by local_ip.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``local_port``               | Number        | Filters by local_port.                                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``remote_ip``                | String        | Filters by remote_ip.                                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tx_queue``                 | Number        | Filters by tx_queue.                                                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``                    | String        | Filters by state.                                                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/ports?pretty&sort=-protocol&limit=2"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "local": {
	               "ip": "0.0.0.0",
	               "port": 1515
	            },
	            "remote": {
	               "ip": "0.0.0.0",
	               "port": 0
	            },
	            "scan": {
	               "id": 729678272,
	               "time": "2019/02/19 10:22:20"
	            },
	            "inode": 107067,
	            "tx_queue": 0,
	            "protocol": "tcp",
	            "rx_queue": 0,
	            "state": "listening"
	         },
	         {
	            "local": {
	               "ip": "0.0.0.0",
	               "port": 1516
	            },
	            "remote": {
	               "ip": "0.0.0.0",
	               "port": 0
	            },
	            "scan": {
	               "id": 729678272,
	               "time": "2019/02/19 10:22:20"
	            },
	            "inode": 108138,
	            "tx_queue": 0,
	            "protocol": "tcp",
	            "rx_queue": 0,
	            "state": "listening"
	         }
	      ],
	      "totalItems": 6
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

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``                   | Number        | First element to return in the collection.                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``                    | Number        | Maximum number of elements to return.                                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sort``                     | String        | Sorts the collection by a field or fields (separated by comma). Use +/- at the beginning to list in ascending or descending order.                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search``                   | String        | Looks for elements with the specified string.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pid``                      | Number        | Filters by process pid.                                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``state``                    | String        | Filters by process state.                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ppid``                     | Number        | Filters by process parent pid.                                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``egroup``                   | String        | Filters by process egroup.                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``euser``                    | String        | Filters by process euser.                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``fgroup``                   | String        | Filters by process fgroup.                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``name``                     | String        | Filters by process name.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``nlwp``                     | Number        | Filters by process nlwp.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pgrp``                     | Number        | Filters by process pgrp.                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``priority``                 | Number        | Filters by process priority.                                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rgroup``                   | String        | Filters by process rgroup.                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ruser``                    | String        | Filters by process ruser.                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sgroup``                   | String        | Filters by process sgroup.                                                                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``suser``                    | String        | Filters by process suser.                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/processes?pretty&limit=2&offset=10&sort=-name"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "scan": {
	               "id": 419533576,
	               "time": "2019/02/19 10:22:20"
	            },
	            "euser": "root",
	            "size": 0,
	            "ppid": 2,
	            "rgroup": "root",
	            "utime": 0,
	            "nice": -20,
	            "tgid": 120,
	            "tty": 0,
	            "state": "I",
	            "fgroup": "root",
	            "processor": 1,
	            "priority": 0,
	            "vm_size": 0,
	            "start_time": 167,
	            "stime": 0,
	            "ruser": "root",
	            "egroup": "root",
	            "nlwp": 1,
	            "resident": 0,
	            "name": "charger_manager",
	            "share": 0,
	            "session": 0,
	            "suser": "root",
	            "pgrp": 0,
	            "pid": "120",
	            "sgroup": "root"
	         },
	         {
	            "scan": {
	               "id": 419533576,
	               "time": "2019/02/19 10:22:20"
	            },
	            "euser": "root",
	            "size": 0,
	            "ppid": 2,
	            "rgroup": "root",
	            "utime": 0,
	            "nice": 0,
	            "tgid": 12,
	            "tty": 0,
	            "state": "S",
	            "fgroup": "root",
	            "processor": 0,
	            "priority": 20,
	            "vm_size": 0,
	            "start_time": 7,
	            "stime": 0,
	            "ruser": "root",
	            "egroup": "root",
	            "nlwp": 1,
	            "resident": 0,
	            "name": "cpuhp/0",
	            "share": 0,
	            "session": 0,
	            "suser": "root",
	            "pgrp": 0,
	            "pid": "12",
	            "sgroup": "root"
	         }
	      ],
	      "totalItems": 122
	   }
	}
	



