
.. Copyright (C) 2019 Wazuh, Inc.
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
* `Lists`_
* `Manager`_
* `Rootcheck`_
* `Rules`_
* `Security Configuration Assessment`_
* `Summary`_
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
	* PUT /agents/groups/:group_id/restart  (`Restart agents which belong to a group`_)
	* PUT /agents/restart  (`Restart all agents`_)

`Cache`_
	* DELETE /cache  (`Delete cache index`_)
	* DELETE /cache/:group  (`Clear group cache`_)
	* GET /cache  (`Get cache index`_)
	* GET /cache/config  (`Return cache configuration`_)

`Ciscat`_
	* GET /ciscat/:agent_id/results  (`Get CIS-CAT results from an agent`_)

`Cluster`_
	* DELETE /cluster/:node_id/files  (`Delete a remote file in a cluster node`_)
	* GET /cluster/:node_id/config/:component/:configuration  (`Get active configuration in node node_id`_)
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
	* DELETE /manager/files  (`Delete a local file`_)
	* GET /manager/config/:component/:configuration  (`Get manager active configuration`_)
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
	* GET /rules/gpg13  (`Get rule gpg13 requirements`_)
	* GET /rules/groups  (`Get rule groups`_)
	* GET /rules/hipaa  (`Get rule hipaa requirements`_)
	* GET /rules/nist-800-53  (`Get rule nist-800-53 requirements`_)
	* GET /rules/pci  (`Get rule pci requirements`_)

`Security Configuration Assessment`_
	* GET /sca/:agent_id  (`Get security configuration assessment (SCA) database`_)
	* GET /sca/:agent_id/checks/:id  (`Get security configuration assessment (SCA) checks database`_)

`Summary`_
	* GET /summary/agents  (`Get a full summary of agents`_)

`Syscheck`_
	* DELETE /syscheck/:agent_id  (`Clear syscheck database of an agent`_)
	* GET /syscheck/:agent_id  (`Get syscheck files`_)
	* GET /syscheck/:agent_id/last_scan  (`Get last syscheck scan`_)
	* PUT /syscheck  (`Run syscheck scan in all agents`_)
	* PUT /syscheck/:agent_id  (`Run syscheck scan in an agent`_)

`Syscollector`_
	* GET /syscollector/:agent_id/hardware  (`Get hardware info`_)
	* GET /syscollector/:agent_id/hotfixes  (`Get hotfixes info`_)
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
Runs an Active Response command on a specified agent.

**Request**:

``PUT`` ::

	/active-response/:agent_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``command``                  | String        | Command running in the agent. If this value starts by !, then it refers to a script name instead of a command name.                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``custom``                   | Boolean       | Whether the specified command is a custom command or not.                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``arguments``                | String[]      | Array with command arguments.                                                                                                                                                                                                        |
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
	      "id": "009",
	      "key": "MDA5IE5ld0hvc3QgMTAuMC4wLjkgYjA1MTVjZTU0MWZhZjA1MjBkN2UwYTg2NDY1OGZjNmE4NjEyNDZlZDY4Njk0ZWI5NTAwYzQ4MTg4MzYyZGRjNA=="
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
	      "id": "010",
	      "key": "MDEwIG15TmV3QWdlbnQgYW55IDZkODVmZTI1MzhhNTVmNzVhN2ZhMTFmOTZhNGQ0MTlhMTEyZTIzYzFiMGU2Mzk0NzI3N2U2YTc3MTBjNzY1NTc="
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

+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Component    | Configuration                                                                                                                                                                                                                          |
+==============+========================================================================================================================================================================================================================================+
| agent        | client                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | buffer                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | labels                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | logging                                                                                                                                                                                                                                |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| com          | active-response                                                                                                                                                                                                                        |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| logcollector | localfile                                                                                                                                                                                                                              |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | socket                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| syscheck     | syscheck                                                                                                                                                                                                                               |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | rootcheck                                                                                                                                                                                                                              |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wmodules     | wmodules                                                                                                                                                                                                                               |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
	            "ignore_binaries": "no",
	            "target": [
	               "agent"
	            ],
	            "frequency": 360,
	            "only-future-events": "yes"
	         },
	         {
	            "logformat": "full_command",
	            "command": "netstat -tulpn | sed 's/\\([[:alnum:]]\\+\\)\\ \\+[[:digit:]]\\+\\ \\+[[:digit:]]\\+\\ \\+\\(.*\\):\\([[:digit:]]*\\)\\ \\+\\([0-9\\.\\:\\*]\\+\\).\\+\\ \\([[:digit:]]*\\/[[:alnum:]\\-]*\\).*/\\1 \\2 == \\3 == \\4 \\5/' | sort -k 4 -g | sed 's/ == \\(.*\\) ==/:\\1/' | sed 1,2d",
	            "alias": "netstat listening ports",
	            "ignore_binaries": "no",
	            "target": [
	               "agent"
	            ],
	            "frequency": 360,
	            "only-future-events": "yes"
	         },
	         {
	            "logformat": "full_command",
	            "command": "last -n 20",
	            "alias": "last -n 20",
	            "ignore_binaries": "no",
	            "target": [
	               "agent"
	            ],
	            "frequency": 360,
	            "only-future-events": "yes"
	         },
	         {
	            "file": "/var/ossec/logs/active-responses.log",
	            "logformat": "syslog",
	            "ignore_binaries": "no",
	            "target": [
	               "agent"
	            ],
	            "only-future-events": "yes"
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
| ``ids``                      | String        | Name of groups separated by commas.                                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/agents/groups?ids=webserver,database&pretty"

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
Removes agents, using a list of them or a criterion based on the status or time of the last connection.

**Request**:

``DELETE`` ::

	/agents

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``ids``                      | String        | Agent IDs separated by commas.                                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``purge``                    | Boolean       | Delete an agent from the key store. This parameter is only valid if purge is set to no in the manager's ossec.conf.                                                                                                                  |
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

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/agents?older_than=10s&purge&ids=003,005&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "msg": "Some agents were not removed",
	      "affected_agents": [
	         "003"
	      ],
	      "failed_ids": [
	         {
	            "id": "005",
	            "error": {
	               "message": "Agent is not eligible for removal: The agent has a status different to 'all' or the specified time frame 'older_than 10s' does not apply.",
	               "code": 1731
	            }
	         }
	      ],
	      "older_than": "10s",
	      "total_affected_agents": 1,
	      "total_failed_ids": 1
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
| ``purge``                    | Boolean       | Delete an agent from the key store. This parameter is only valid if purge is set to no in the manager's ossec.conf.                                                                                                                  |
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
Returns the sync status in JSON format.

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
| ``ids``                      | String[]      | List of agents ID.                                                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -X POST -H "Content-Type:application/json" -d '{"ids":["001","002"]}' "https://127.0.0.1:55000/agents/group/dmz?pretty" -k

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
| ``force_single_group``       | Boolean       | Whether to append new group to current agent's group or replace it.                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/004/group/dmz?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "Group 'dmz' added to agent '004'."
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
	    "error": 0,
	    "data": {
	        "controls": [
	            {
	                "...": "..."
	            },
	            {
	                "reference": "CIS_Debian_Benchmark_v1.0pdf",
	                "name": "CIS - Testing against the CIS Debian Linux Benchmark v1",
	                "condition": "all required",
	                "checks": [
	                    "f:/etc/debian_version;"
	                ]
	            }
	        ]
	    }
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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
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
	               "major": "7",
	               "minor": "6",
	               "name": "CentOS Linux",
	               "platform": "centos",
	               "uname": "Linux |1b0e9cb1ec2a |5.2.9-200.fc30.x86_64 |#1 SMP Fri Aug 16 21:37:45 UTC 2019 |x86_64",
	               "version": "7.6"
	            },
	            "dateAdd": "1970-01-01 00:00:00",
	            "version": "Wazuh v3.10.2",
	            "manager": "1cb46c820ff5",
	            "mergedSum": "6c2a4b148047e590188f8befe47c2bff",
	            "id": "001",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00",
	            "registerIP": "172.22.0.3",
	            "name": "1b0e9cb1ec2a",
	            "ip": "172.22.0.3",
	            "node_name": "master",
	            "group": [
	               "default",
	               "dmz"
	            ],
	            "lastKeepAlive": "2019-08-30 09:31:03",
	            "status": "Active"
	         },
	         {
	            "os": {
	               "arch": "x86_64",
	               "major": "7",
	               "minor": "6",
	               "name": "CentOS Linux",
	               "platform": "centos",
	               "uname": "Linux |7084a5343d0a |5.2.9-200.fc30.x86_64 |#1 SMP Fri Aug 16 21:37:45 UTC 2019 |x86_64",
	               "version": "7.6"
	            },
	            "dateAdd": "2019-08-30 09:18:12",
	            "version": "Wazuh v3.10.2",
	            "manager": "7995615e03c0",
	            "mergedSum": "6c2a4b148047e590188f8befe47c2bff",
	            "id": "002",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00",
	            "registerIP": "172.22.0.6",
	            "name": "7084a5343d0a",
	            "ip": "172.22.0.6",
	            "node_name": "worker-1",
	            "group": [
	               "default",
	               "dmz"
	            ],
	            "lastKeepAlive": "2019-08-30 09:30:54",
	            "status": "Active"
	         },
	         {
	            "dateAdd": "2019-08-30 09:30:55",
	            "id": "004",
	            "registerIP": "10.0.0.62",
	            "name": "server001",
	            "ip": "10.0.0.62",
	            "node_name": "unknown",
	            "group": [
	               "dmz"
	            ],
	            "status": "Never connected"
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
| ``q``                        | String        | Query to filter result. For example q="status=Active"                                                                                                                                                                                |
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
	            "name": "main_database",
	            "id": "006",
	            "node_name": "unknown",
	            "registerIP": "10.0.0.15",
	            "ip": "10.0.0.15",
	            "dateAdd": "2019-08-30 09:30:55",
	            "status": "Never connected"
	         },
	         {
	            "name": "dmz002",
	            "id": "007",
	            "node_name": "unknown",
	            "registerIP": "10.0.0.14",
	            "ip": "10.0.0.14",
	            "dateAdd": "2019-08-30 09:30:56",
	            "status": "Never connected"
	         },
	         {
	            "name": "NewHost",
	            "id": "009",
	            "node_name": "unknown",
	            "registerIP": "10.0.0.9",
	            "ip": "10.0.0.9",
	            "dateAdd": "2019-08-30 09:31:01",
	            "status": "Never connected"
	         },
	         {
	            "name": "myNewAgent",
	            "id": "010",
	            "node_name": "unknown",
	            "registerIP": "any",
	            "ip": "any",
	            "dateAdd": "2019-08-30 09:31:02",
	            "status": "Never connected"
	         },
	         {
	            "name": "NewHost_2",
	            "id": "123",
	            "node_name": "unknown",
	            "registerIP": "10.0.10.10",
	            "ip": "10.0.10.10",
	            "dateAdd": "2019-08-30 09:31:03",
	            "status": "Never connected"
	         }
	      ],
	      "totalItems": 5
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
	            "hash": "0b0900dd285b797e2a1c0ba043de08f1"
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
	            "hash": "6c2a4b148047e590188f8befe47c2bff"
	         },
	         {
	            "filename": "rootkit_files.txt",
	            "hash": "e5ddcac443143cef6237d5f9b8d48585"
	         },
	         {
	            "filename": "rootkit_trojans.txt",
	            "hash": "84b08dab2e200d846a445dcbff1487a0"
	         },
	         {
	            "filename": "system_audit_rcl.txt",
	            "hash": "20138d1fc81eb7ecc13629283fea3470"
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
	            "count": 3,
	            "name": "default",
	            "mergedSum": "6c2a4b148047e590188f8befe47c2bff",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00"
	         },
	         {
	            "count": 3,
	            "name": "dmz",
	            "mergedSum": "db2586910faf61c5c596c5226bd4f071",
	            "configSum": "cfbae9ecc10eb15f1b4fc736de6758cc"
	         },
	         {
	            "count": 0,
	            "name": "pciserver",
	            "mergedSum": "49d75a97d35ccf5ced69da4a77c99392",
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
	    "error": 0,
	    "data": "Agent configuration was updated successfully"
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
	   "data": "Agent 004 set to group default."
	}


Remove a single group of multiple agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Remove a list of agents of a group.

**Request**:

``DELETE`` ::

	/agents/group/:group_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``ids``                      | String        | Agent IDs separated by commas.                                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``group_id``                 | String        | Group ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/agents/group/dmz?ids=001,002&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "msg": "All selected agents were removed from group dmz",
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
	    "error": 0,
	    "data": "Agent configuration was updated successfully"
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
| ``q``                        | String        | Query to filter result. For example q="status=Active"                                                                                                                                                                                |
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
	         "centos"
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
	      "Total": 10,
	      "Active": 3,
	      "Disconnected": 0,
	      "Never connected": 7,
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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
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
| ``q``                        | String        | Query to filter results by. For example q="status=Active"                                                                                                                                                                            |
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
	            "registerIP": "any",
	            "name": "myNewAgent",
	            "status": "Never connected",
	            "dateAdd": "2019-08-30 09:31:02",
	            "node_name": "unknown",
	            "ip": "any",
	            "id": "010"
	         },
	         {
	            "os": {
	               "arch": "x86_64",
	               "major": "7",
	               "minor": "6",
	               "name": "CentOS Linux",
	               "platform": "centos",
	               "uname": "Linux |7084a5343d0a |5.2.9-200.fc30.x86_64 |#1 SMP Fri Aug 16 21:37:45 UTC 2019 |x86_64",
	               "version": "7.6"
	            },
	            "registerIP": "172.22.0.6",
	            "name": "7084a5343d0a",
	            "mergedSum": "6c2a4b148047e590188f8befe47c2bff",
	            "status": "Active",
	            "group": [
	               "default"
	            ],
	            "dateAdd": "2019-08-30 09:18:12",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00",
	            "lastKeepAlive": "2019-08-30 09:31:04",
	            "node_name": "worker-1",
	            "ip": "172.22.0.6",
	            "id": "002",
	            "version": "Wazuh v3.10.2",
	            "manager": "7995615e03c0"
	         },
	         {
	            "os": {
	               "arch": "x86_64",
	               "major": "7",
	               "minor": "6",
	               "name": "CentOS Linux",
	               "platform": "centos",
	               "uname": "Linux |1b0e9cb1ec2a |5.2.9-200.fc30.x86_64 |#1 SMP Fri Aug 16 21:37:45 UTC 2019 |x86_64",
	               "version": "7.6"
	            },
	            "registerIP": "172.22.0.3",
	            "name": "1b0e9cb1ec2a",
	            "mergedSum": "6c2a4b148047e590188f8befe47c2bff",
	            "status": "Active",
	            "group": [
	               "default"
	            ],
	            "dateAdd": "1970-01-01 00:00:00",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00",
	            "lastKeepAlive": "2019-08-30 09:31:03",
	            "node_name": "master",
	            "ip": "172.22.0.3",
	            "id": "001",
	            "version": "Wazuh v3.10.2",
	            "manager": "1cb46c820ff5"
	         },
	         {
	            "os": {
	               "arch": "x86_64",
	               "major": "7",
	               "minor": "6",
	               "name": "CentOS Linux",
	               "platform": "centos",
	               "uname": "Linux |1cb46c820ff5 |5.2.9-200.fc30.x86_64 |#1 SMP Fri Aug 16 21:37:45 UTC 2019 |x86_64",
	               "version": "7.6"
	            },
	            "registerIP": "127.0.0.1",
	            "name": "1cb46c820ff5",
	            "status": "Active",
	            "dateAdd": "2019-08-30 08:02:33",
	            "lastKeepAlive": "9999-12-31 23:59:59",
	            "node_name": "master",
	            "ip": "127.0.0.1",
	            "id": "000",
	            "version": "Wazuh v3.10.2",
	            "manager": "1cb46c820ff5"
	         },
	         {
	            "registerIP": "10.0.10.10",
	            "name": "NewHost_2",
	            "status": "Never connected",
	            "dateAdd": "2019-08-30 09:31:03",
	            "node_name": "unknown",
	            "ip": "10.0.10.10",
	            "id": "123"
	         }
	      ],
	      "totalItems": 10
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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/000?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "manager": "1cb46c820ff5",
	      "status": "Active",
	      "os": {
	         "arch": "x86_64",
	         "major": "7",
	         "minor": "6",
	         "name": "CentOS Linux",
	         "platform": "centos",
	         "uname": "Linux |1cb46c820ff5 |5.2.9-200.fc30.x86_64 |#1 SMP Fri Aug 16 21:37:45 UTC 2019 |x86_64",
	         "version": "7.6"
	      },
	      "dateAdd": "2019-08-30 08:02:33",
	      "registerIP": "127.0.0.1",
	      "name": "1cb46c820ff5",
	      "ip": "127.0.0.1",
	      "lastKeepAlive": "9999-12-31 23:59:59",
	      "version": "Wazuh v3.10.2",
	      "id": "000",
	      "node_name": "master"
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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
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
	      "id": "009",
	      "name": "NewHost",
	      "dateAdd": "2019-08-30 09:31:01",
	      "status": "Never connected",
	      "registerIP": "10.0.0.9",
	      "node_name": "unknown"
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
	   "data": "MDA0IHNlcnZlcjAwMSAxMC4wLjAuNjIgY2U3NmM1ZTQxNzJjZDg0ZGIxZmIwYTJlMzdiMTZjNTJjODQ3YjYxNjQ3ZjZjZWNlNmM2OWRlZjFkZjIwNDI0Mg=="
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
	    "error": 0,
	    "data": {
	        "msg": "All selected agents were restarted",
	        "affected_agents": [
	            "002",
	            "004"
	        ]
	    }
	}

Restart agents which belong to a group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Restarts agents which belong to a group

**Request**:

``PUT`` ::

	/agents/groups/:group_id/restart

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``group_id``                 | String        | Group ID                                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/groups/dmz/restart?pretty"

**Example Response:**
::

	{
	    "data": {
	        "msg": "All selected agents were restarted",
	        "affected_agents": [
	            "002",
	            "003"
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
	    "error": 0,
	    "data": "Restarting all agents"
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
	    "error": 0,
	    "data": {
	        "msg": "All selected agents were restarted",
	        "affected_agents": [
	            "007"
	        ]
	    }
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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter result. For example q="status=Active"                                                                                                                                                                                |
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
	               "platform": "centos"
	            },
	            "count": 3
	         },
	         {
	            "count": 7
	         }
	      ],
	      "totalItems": 10
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
| ``q``                        | String        | Query to filter result. For example q="status=Active"                                                                                                                                                                                |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/outdated?pretty"

**Example Response:**
::

	{
	    "error": 0,
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
	    }
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
	    "error": 0,
	    "data": "Agent upgraded successfully"
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
	    "error": 0,
	    "data": "Installation started"
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
| ``use_http``                 | Boolean       | Use protocol HTTP. If it is false use HTTPS. By default the value is set to false.                                                                                                                                                   |
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
	    "error": 0,
	    "data": "Upgrade procedure started"
	}



Cache
----------------------------------------
Delete
++++++++++++++++++++++++++++++++++++++++

Delete cache index
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears entire cache.

**Request**:

``DELETE`` ::

	/cache/:group

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


Clear group cache
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Clears cache of the specified group.

**Request**:

``DELETE`` ::

	/cache/:group

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
	      "defaultDuration": 3600000,
	      "enabled": false,
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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
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
	    "error": 0,
	    "data": {
	        "totalItems": 2,
	        "items": [
	            {
	                "profile": "xccdf_org.cisecurity.benchmarks_profile_Level_2_-_Server",
	                "scan": {
	                    "id": 1406741147,
	                    "time": "2018-09-06T07:50:15.632-07:00"
	                },
	                "notchecked": 36,
	                "pass": 104,
	                "benchmark": "CIS Ubuntu Linux 16.04 LTS Benchmark",
	                "unknown": 1,
	                "score": 57,
	                "error": 0,
	                "fail": 79
	            },
	            {
	                "profile": "xccdf_org.cisecurity.benchmarks_profile_Level_1_-_Workstation",
	                "scan": {
	                    "id": 1406741147,
	                    "time": "2018-09-06T07:50:52.630-07:00"
	                },
	                "notchecked": 71,
	                "pass": 96,
	                "benchmark": "CIS Ubuntu Linux 16.04 LTS Benchmark",
	                "unknown": 0,
	                "score": 64,
	                "error": 0,
	                "fail": 53
	            }
	        ]
	    }
	}



Cluster
----------------------------------------
Configuration
++++++++++++++++++++++++++++++++++++++++

Get active configuration in node node_id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the requested configuration in JSON format.

**Request**:

``GET`` ::

	/cluster/:node_id/config/:component/:configuration

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``node_id``                  | String        | Node ID.                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``component``                | String        | Selected component.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``configuration``            | String        | Configuration to read.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Component/Configuration options:**

+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Component    | Configuration                                                                                                                                                                                                                          |
+==============+========================================================================================================================================================================================================================================+
| agentless    | agentless                                                                                                                                                                                                                              |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| analysis     | global                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | active_response                                                                                                                                                                                                                        |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | alerts                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | command                                                                                                                                                                                                                                |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | logging                                                                                                                                                                                                                                |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| auth         | auth                                                                                                                                                                                                                                   |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| com          | active-response                                                                                                                                                                                                                        |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | cluster                                                                                                                                                                                                                                |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| csyslog      | csyslog                                                                                                                                                                                                                                |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| integrator   | integration                                                                                                                                                                                                                            |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| logcollector | localfile                                                                                                                                                                                                                              |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | socket                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| mail         | global                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | alerts                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| monitor      | monitor                                                                                                                                                                                                                                |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | logging                                                                                                                                                                                                                                |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| request      | remote                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| syscheck     | syscheck                                                                                                                                                                                                                               |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | rootcheck                                                                                                                                                                                                                              |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wmodules     | wmodules                                                                                                                                                                                                                               |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/master/config/logcollector/internal?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "internal": {
	         "logcollector": {
	            "remote_commands": 0,
	            "loop_timeout": 2,
	            "open_attempts": 8,
	            "vcheck_files": 64,
	            "max_lines": 10000,
	            "max_files": 1000,
	            "sock_fail_time": 300,
	            "debug": 0,
	            "sample_log_length": 64,
	            "queue_size": 1024,
	            "input_threads": 4,
	            "force_reload": 0,
	            "reload_interval": 64,
	            "reload_delay": 1000,
	            "rlimit_nofile": 1100
	         }
	      }
	   }
	}


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

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/worker-1/configuration?section=global&pretty"

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
	      "email_from": "wazuh@example.wazuh.com",
	      "email_to": "recipient@example.wazuh.com",
	      "email_maxperhour": "12",
	      "email_log_source": "alerts.log",
	      "white_list": [
	         "127.0.0.1",
	         "^localhost.localdomain$",
	         "10.0.5.124",
	         "10.5.5.120"
	      ]
	   }
	}


Get the cluster configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the cluster configuration.

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
	      "node_name": "master",
	      "node_type": "master",
	      "key": "9d273b53510fef702b54a92e9cffc82e",
	      "port": 1516,
	      "bind_addr": "0.0.0.0",
	      "nodes": [
	         "wazuh-master"
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

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/master/configuration/validation?pretty"

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


Delete a remote file in a cluster node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Confirmation message.

**Request**:

``DELETE`` ::

	/cluster/:node_id/files

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``path``                     | String        | Relative path of file. This parameter is mandatory.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/cluster/master/files?path=etc/rules/local_rules.xml&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "File was deleted"
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
| ``path``                     | String        | Relative path of file. This parameter is mandatory.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``validation``               | Boolean       | Validates the content of the file. An error will be returned if file content is not strictly correct. False by default.                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/master/files?path=etc/decoders/local_decoder.xml&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "<!-- Local Decoders -->\n\n<!-- Modify it at your will. -->\n<!-- Copyright (C) 2015-2019, Wazuh Inc. -->\n\n<!--\n  - Allowed static fields:\n  - location   - where the log came from (only on FTS)\n  - srcuser    - extracts the source username\n  - dstuser    - extracts the destination (target) username\n  - user       - an alias to dstuser (only one of the two can be used)\n  - srcip      - source ip\n  - dstip      - dst ip\n  - srcport    - source port\n  - dstport    - destination port\n  - protocol   - protocol\n  - id         - event id\n  - url        - url of the event\n  - action     - event action (deny, drop, accept, etc)\n  - status     - event status (success, failure, etc)\n  - extra_data - Any extra data\n-->\n\n<decoder name=\"local_decoder_example\">\n    <program_name>local_decoder_example</program_name>\n</decoder>\n"
	}


Update local file at any cluster node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Upload a local file (rules, decoders and lists) in a cluster node.

**Request**:

``POST`` ::

	/cluster/:node_id/files

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``file``                     | String        | Input file.                                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``path``                     | String        | Relative path were input file will be placed. This parameter is mandatory.                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``overwrite``                | Boolean       | Replaces the existing file. False by default.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X POST -H 'Content-type: application/xml' -d @rules.xml "https://127.0.0.1:55000/cluster/master/files?path=etc/rules/local_rules.xml&pretty"

**Example Response:**
::

	{
	    "error": 0,
	    "data": "File updated successfully"
	}


Info
++++++++++++++++++++++++++++++++++++++++

Get info about cluster status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns whether the cluster is enabled or disabled.

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

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/worker-1/status?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "ossec-agentlessd": "stopped",
	      "ossec-analysisd": "running",
	      "ossec-authd": "stopped",
	      "ossec-csyslogd": "stopped",
	      "ossec-dbd": "stopped",
	      "ossec-monitord": "running",
	      "ossec-execd": "running",
	      "ossec-integratord": "stopped",
	      "ossec-logcollector": "running",
	      "ossec-maild": "stopped",
	      "ossec-remoted": "running",
	      "ossec-reportd": "stopped",
	      "ossec-syscheckd": "running",
	      "wazuh-clusterd": "running",
	      "wazuh-modulesd": "running",
	      "wazuh-db": "running"
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

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/worker-1/info?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "path": "/var/ossec",
	      "version": "v3.10.2",
	      "compilation_date": "Fri Aug 30 08:02:30 UTC 2019",
	      "type": "server",
	      "max_agents": "14000",
	      "openssl_support": "yes",
	      "ruleset_version": "31005",
	      "tz_offset": "+0000",
	      "tz_name": "UTC",
	      "name": "7995615e03c0",
	      "cluster": {
	         "enabled": "yes",
	         "running": "yes",
	         "name": "wazuh",
	         "node_name": "worker-1",
	         "node_type": "worker"
	      }
	   }
	}


Show cluster health
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Show cluster health.

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
	      "n_connected_nodes": 2,
	      "nodes": {
	         "worker-1": {
	            "info": {
	               "name": "worker-1",
	               "type": "worker",
	               "version": "3.10.2",
	               "ip": "172.22.0.4",
	               "n_active_agents": 1
	            },
	            "status": {
	               "sync_integrity_free": true,
	               "last_sync_integrity": {
	                  "date_start_master": "2019-08-30 09:31:16.722936",
	                  "date_end_master": "2019-08-30 09:31:16.856300",
	                  "total_files": {
	                     "missing": 3,
	                     "extra": 1,
	                     "extra_valid": 0,
	                     "shared": 4
	                  }
	               },
	               "sync_agentinfo_free": true,
	               "last_sync_agentinfo": {
	                  "date_start_master": "2019-08-30 09:31:12.764872",
	                  "date_end_master": "2019-08-30 09:31:12.775800",
	                  "total_agentinfo": 0,
	                  "total_agent_info": 10
	               },
	               "sync_extravalid_free": true,
	               "last_sync_agentgroups": {
	                  "date_start_master": "2019-08-30 09:18:28.271983",
	                  "date_end_master": "2019-08-30 09:18:28.292969",
	                  "total_agentgroups": 0,
	                  "total_extra_valid": 4
	               },
	               "last_keep_alive": "2019-08-30 09:31:10.263967"
	            }
	         },
	         "worker-2": {
	            "info": {
	               "name": "worker-2",
	               "type": "worker",
	               "version": "3.10.2",
	               "ip": "172.22.0.5",
	               "n_active_agents": 0
	            },
	            "status": {
	               "sync_integrity_free": true,
	               "last_sync_integrity": {
	                  "date_start_master": "2019-08-30 09:31:16.770995",
	                  "date_end_master": "2019-08-30 09:31:16.877926",
	                  "total_files": {
	                     "missing": 3,
	                     "extra": 1,
	                     "extra_valid": 0,
	                     "shared": 4
	                  }
	               },
	               "sync_agentinfo_free": true,
	               "last_sync_agentinfo": {
	                  "date_start_master": "2019-08-30 09:31:12.753823",
	                  "date_end_master": "2019-08-30 09:31:12.762115",
	                  "total_agentinfo": 0,
	                  "total_agent_info": 10
	               },
	               "sync_extravalid_free": true,
	               "last_sync_agentgroups": {
	                  "date_start_master": "2019-08-30 09:18:37.369250",
	                  "date_end_master": "2019-08-30 09:18:37.387447",
	                  "total_agentgroups": 0,
	                  "total_extra_valid": 4
	               },
	               "last_keep_alive": "2019-08-30 09:31:10.265842"
	            }
	         },
	         "master": {
	            "info": {
	               "name": "master",
	               "type": "master",
	               "version": "3.10.2",
	               "ip": "wazuh-master",
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
| ``q``                        | String        | Query to filter results by. For example q="level=info"                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/worker-1/logs?offset=0&limit=5&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "timestamp": "2019-08-30 09:31:10",
	            "tag": "ossec-remoted",
	            "level": "info",
	            "description": " (1409): Authentication file changed. Updating."
	         },
	         {
	            "timestamp": "2019-08-30 09:31:10",
	            "tag": "ossec-remoted",
	            "level": "info",
	            "description": " (1410): Reading authentication keys file."
	         },
	         {
	            "timestamp": "2019-08-30 09:19:14",
	            "tag": "ossec-logcollector",
	            "level": "info",
	            "description": " (1904): File not available, ignoring it: '/var/ossec/logs/active-responses.log'."
	         },
	         {
	            "timestamp": "2019-08-30 09:19:14",
	            "tag": "ossec-logcollector",
	            "level": "info",
	            "description": " (1904): File not available, ignoring it: '/var/log/dpkg.log'."
	         },
	         {
	            "timestamp": "2019-08-30 09:18:54",
	            "tag": "ossec-rootcheck",
	            "level": "info",
	            "description": " Ending rootcheck scan."
	         }
	      ],
	      "totalItems": 142
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

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/worker-1/logs/summary?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "ossec-csyslogd": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-dbd": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-integratord": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-agentlessd": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-authd": {
	         "all": 4,
	         "info": 4,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-db": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-execd": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-remoted": {
	         "all": 12,
	         "info": 10,
	         "error": 0,
	         "critical": 0,
	         "warning": 2,
	         "debug": 0
	      },
	      "ossec-monitord": {
	         "all": 2,
	         "info": 2,
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
	      "wazuh-modulesd:osquery": {
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
	      "sca": {
	         "all": 13,
	         "info": 13,
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
	      "ossec-analysisd": {
	         "all": 38,
	         "info": 38,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-logcollector": {
	         "all": 13,
	         "info": 11,
	         "error": 2,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd:syscollector": {
	         "all": 5,
	         "info": 5,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-syscheckd": {
	         "all": 28,
	         "info": 28,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-rootcheck": {
	         "all": 3,
	         "info": 3,
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
Returns the local node info.

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
	      "node": "master",
	      "cluster": "wazuh",
	      "type": "master"
	   }
	}


Get node info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the node info.

**Request**:

``GET`` ::

	/cluster/nodes/:node_name

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/nodes/master?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "name": "master",
	      "type": "master",
	      "version": "3.10.2",
	      "ip": "wazuh-master"
	   }
	}


Get nodes info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the nodes info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
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
	      "totalItems": 3,
	      "items": [
	         {
	            "name": "master",
	            "type": "master",
	            "version": "3.10.2",
	            "ip": "wazuh-master"
	         },
	         {
	            "name": "worker-1",
	            "type": "worker",
	            "version": "3.10.2",
	            "ip": "172.22.0.4"
	         },
	         {
	            "name": "worker-2",
	            "type": "worker",
	            "version": "3.10.2",
	            "ip": "172.22.0.5"
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

	curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/cluster/worker-1/restart?pretty"

**Example Response:**
::

	{
	    "error": 0,
	    "data": "Restart request sent"
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
	    "error": 0,
	    "data": "Restart request sent"
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

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/worker-1/stats/analysisd?pretty"

**Example Response:**
::

	{
	    "error": 0,
	    "data": [
	        {
	            "hour": 5,
	            "firewall": 0,
	            "alerts": [
	                {
	                    "times": 4,
	                    "sigid": 5715,
	                    "level": 3
	                },
	                {
	                    "times": 2,
	                    "sigid": 1002,
	                    "level": 2
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
	    ]
	}

Get node node_id's remoted stats
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a summary of the current remoted stats on the node.

**Request**:

``GET`` ::

	/cluster/:node_id/stats/remoted

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/worker-1/stats/remoted?pretty"

**Example Response:**
::

	{
	    "error": 0,
	    "data": [
	        {
	            "hour": 5,
	            "firewall": 0,
	            "alerts": [
	                {
	                    "times": 4,
	                    "sigid": 5715,
	                    "level": 3
	                },
	                {
	                    "times": 2,
	                    "sigid": 1002,
	                    "level": 2
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
	    ]
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

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/worker-1/stats?pretty"

**Example Response:**
::

	{
	    "error": 0,
	    "data": [
	        {
	            "hour": 5,
	            "firewall": 0,
	            "alerts": [
	                {
	                    "times": 4,
	                    "sigid": 5715,
	                    "level": 3
	                },
	                {
	                    "times": 2,
	                    "sigid": 1002,
	                    "level": 2
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
	    ]
	}

Get node node_id's stats by hour
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns Wazuh statistical information per hour. Each number in the averages field represents the average of alerts per hour.

**Request**:

``GET`` ::

	/cluster/:node_id/stats/hourly

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/worker-1/stats/hourly?pretty"

**Example Response:**
::

	{
	    "error": 0,
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
	    }
	}

Get node node_id's stats by week
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns Wazuh statistical information per week. Each number in the hours field represents the average alerts per hour for that specific day.

**Request**:

``GET`` ::

	/cluster/:node_id/stats/weekly

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/worker-1/stats/weekly?pretty"

**Example Response:**
::

	{
	    "error": 0,
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
	        "Fri": {
	            "hours": [
	                131,
	                "...",
	                432
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
	        "Thu": {
	            "hours": [
	                888,
	                "...",
	                123
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
	            "path": "ruleset/decoders",
	            "name": "wazuh",
	            "position": 0,
	            "status": "enabled",
	            "details": {
	               "prematch": "^wazuh: "
	            }
	         },
	         {
	            "file": "0005-wazuh_decoders.xml",
	            "path": "ruleset/decoders",
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
	      "totalItems": 827
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
| ``download``                 | String        | Name of the decoder file to download.                                                                                                                                                                                                |
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
	            "file": "0115-grandstream_decoders.xml",
	            "path": "ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0165-netscreen_decoders.xml",
	            "path": "ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0010-active-response_decoders.xml",
	            "path": "ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0325-suhosin_decoders.xml",
	            "path": "ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0379-dpkg_decoders.xml",
	            "path": "ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0065-cisco-ios_decoders.xml",
	            "path": "ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0310-ssh_decoders.xml",
	            "path": "ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0285-snort_decoders.xml",
	            "path": "ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0360-vmware_decoders.xml",
	            "path": "ruleset/decoders",
	            "status": "enabled"
	         },
	         {
	            "file": "0130-imapd_decoders.xml",
	            "path": "ruleset/decoders",
	            "status": "enabled"
	         }
	      ],
	      "totalItems": 100
	   }
	}


Get all parent decoders
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all parent decoders included in ossec.conf.

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
	            "path": "etc/decoders",
	            "name": "local_decoder_example",
	            "position": 0,
	            "status": "enabled",
	            "details": {
	               "program_name": "local_decoder_example"
	            }
	         },
	         {
	            "file": "0470-perdition_decoders.xml",
	            "path": "ruleset/decoders",
	            "name": "perdition",
	            "position": 0,
	            "status": "enabled",
	            "details": {
	               "program_name": "^perdition"
	            }
	         }
	      ],
	      "totalItems": 159
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
	            "path": "ruleset/decoders",
	            "name": "apache-errorlog",
	            "position": 0,
	            "status": "enabled",
	            "details": {
	               "program_name": "^apache2|^httpd"
	            }
	         },
	         {
	            "file": "0025-apache_decoders.xml",
	            "path": "ruleset/decoders",
	            "name": "apache-errorlog",
	            "position": 1,
	            "status": "enabled",
	            "details": {
	               "prematch": "^[warn] |^[notice] |^[error] "
	            }
	         },
	         {
	            "file": "0025-apache_decoders.xml",
	            "path": "ruleset/decoders",
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
	    "error": 0,
	    "data": "Syscheck database deleted"
	}


Hardware
++++++++++++++++++++++++++++++++++++++++

Get hardware info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's hardware info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
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
	               "cores": 4,
	               "mhz": 3061.329,
	               "name": "Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz"
	            },
	            "ram": {
	               "free": 187808,
	               "total": 7943140,
	               "usage": 98
	            },
	            "scan": {
	               "id": 1195929022,
	               "time": "2019/08/30 09:18:11"
	            },
	            "board_serial": "PM00R017AM000245",
	            "agent_id": "000"
	         },
	         {
	            "cpu": {
	               "cores": 4,
	               "mhz": 1470.443,
	               "name": "Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz"
	            },
	            "ram": {
	               "free": 680984,
	               "total": 7943140,
	               "usage": 92
	            },
	            "scan": {
	               "id": 589016442,
	               "time": "2019/08/30 09:19:04"
	            },
	            "board_serial": "PM00R017AM000245",
	            "agent_id": "002"
	         },
	         {
	            "cpu": {
	               "cores": 4,
	               "mhz": 1891.016,
	               "name": "Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz"
	            },
	            "ram": {
	               "free": 187392,
	               "total": 7943140,
	               "usage": 98
	            },
	            "scan": {
	               "id": 252908616,
	               "time": "2019/08/30 09:18:11"
	            },
	            "board_serial": "PM00R017AM000245",
	            "agent_id": "000"
	         },
	         {
	            "cpu": {
	               "cores": 4,
	               "mhz": 3100.003,
	               "name": "Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz"
	            },
	            "ram": {
	               "free": 684140,
	               "total": 7943140,
	               "usage": 92
	            },
	            "scan": {
	               "id": 1639647201,
	               "time": "2019/08/30 09:19:03"
	            },
	            "board_serial": "PM00R017AM000245",
	            "agent_id": "001"
	         }
	      ],
	      "totalItems": 6
	   }
	}



Netaddr
++++++++++++++++++++++++++++++++++++++++

Get network address info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network address info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
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
	            "address": "172.22.0.4",
	            "proto": "ipv4",
	            "broadcast": "172.22.255.255",
	            "scan_id": 450400745,
	            "iface": "eth0",
	            "netmask": "255.255.0.0",
	            "agent_id": "000"
	         },
	         {
	            "address": "172.22.0.6",
	            "proto": "ipv4",
	            "broadcast": "172.22.255.255",
	            "scan_id": 684056155,
	            "iface": "eth0",
	            "netmask": "255.255.0.0",
	            "agent_id": "002"
	         }
	      ],
	      "totalItems": 6
	   }
	}



Netiface
++++++++++++++++++++++++++++++++++++++++

Get network interface info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network interface info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
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
	               "bytes": 7051,
	               "dropped": 0,
	               "errors": 0,
	               "packets": 50
	            },
	            "scan": {
	               "id": 450400745,
	               "time": "2019/08/30 09:18:11"
	            },
	            "tx": {
	               "bytes": 454,
	               "dropped": 0,
	               "errors": 0,
	               "packets": 5
	            },
	            "name": "eth0",
	            "mtu": 1500,
	            "mac": "02:42:ac:16:00:04",
	            "state": "up",
	            "type": "ethernet",
	            "agent_id": "000"
	         },
	         {
	            "rx": {
	               "bytes": 448217,
	               "dropped": 0,
	               "errors": 0,
	               "packets": 1083
	            },
	            "scan": {
	               "id": 684056155,
	               "time": "2019/08/30 09:19:04"
	            },
	            "tx": {
	               "bytes": 411420,
	               "dropped": 0,
	               "errors": 0,
	               "packets": 1347
	            },
	            "name": "eth0",
	            "mtu": 1500,
	            "mac": "02:42:ac:16:00:06",
	            "state": "up",
	            "type": "ethernet",
	            "agent_id": "002"
	         }
	      ],
	      "totalItems": 6
	   }
	}



Netproto
++++++++++++++++++++++++++++++++++++++++

Get network protocol info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network protocol info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
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
	            "dhcp": "unknown",
	            "scan_id": 450400745,
	            "iface": "eth0",
	            "type": "ipv4",
	            "gateway": "172.22.0.1",
	            "agent_id": "000"
	         },
	         {
	            "dhcp": "enabled",
	            "scan_id": 684056155,
	            "iface": "eth0",
	            "type": "ipv4",
	            "gateway": "172.22.0.1",
	            "agent_id": "002"
	         }
	      ],
	      "totalItems": 6
	   }
	}



OS
++++++++++++++++++++++++++++++++++++++++

Get os info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's os info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
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
	               "major": "7",
	               "minor": "6",
	               "name": "CentOS Linux",
	               "platform": "centos",
	               "version": "7.6"
	            },
	            "scan": {
	               "id": 1473979068,
	               "time": "2019/08/30 09:18:11"
	            },
	            "sysname": "Linux",
	            "hostname": "7995615e03c0",
	            "version": "#1 SMP Fri Aug 16 21:37:45 UTC 2019",
	            "release": "5.2.9-200.fc30.x86_64",
	            "architecture": "x86_64",
	            "agent_id": "000"
	         },
	         {
	            "os": {
	               "major": "7",
	               "minor": "6",
	               "name": "CentOS Linux",
	               "platform": "centos",
	               "version": "7.6"
	            },
	            "scan": {
	               "id": 1991862333,
	               "time": "2019/08/30 09:19:04"
	            },
	            "sysname": "Linux",
	            "hostname": "7084a5343d0a",
	            "version": "#1 SMP Fri Aug 16 21:37:45 UTC 2019",
	            "release": "5.2.9-200.fc30.x86_64",
	            "architecture": "x86_64",
	            "agent_id": "002"
	         },
	         {
	            "os": {
	               "major": "7",
	               "minor": "6",
	               "name": "CentOS Linux",
	               "platform": "centos",
	               "version": "7.6"
	            },
	            "scan": {
	               "id": 640586774,
	               "time": "2019/08/30 09:18:11"
	            },
	            "architecture": "x86_64",
	            "version": "#1 SMP Fri Aug 16 21:37:45 UTC 2019",
	            "release": "5.2.9-200.fc30.x86_64",
	            "sysname": "Linux",
	            "hostname": "1cb46c820ff5",
	            "agent_id": "000"
	         },
	         {
	            "os": {
	               "major": "7",
	               "minor": "6",
	               "name": "CentOS Linux",
	               "platform": "centos",
	               "version": "7.6"
	            },
	            "scan": {
	               "id": 1381117853,
	               "time": "2019/08/30 09:19:03"
	            },
	            "architecture": "x86_64",
	            "version": "#1 SMP Fri Aug 16 21:37:45 UTC 2019",
	            "release": "5.2.9-200.fc30.x86_64",
	            "sysname": "Linux",
	            "hostname": "1b0e9cb1ec2a",
	            "agent_id": "001"
	         }
	      ],
	      "totalItems": 6
	   }
	}



Packages
++++++++++++++++++++++++++++++++++++++++

Get packages info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's packages info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``version``                  | String        | Filter by version name.                                                                                                                                                                                                              |
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
	               "id": 1460739678,
	               "time": "2019/08/30 09:18:11"
	            },
	            "name": "audit-libs",
	            "vendor": "CentOS",
	            "size": 250,
	            "section": "Development/Libraries",
	            "format": "rpm",
	            "version": "2.8.4-4.el7",
	            "description": "Dynamic library for libaudit",
	            "architecture": "x86_64",
	            "install_time": "2019/08/01 01:09:44",
	            "agent_id": "000"
	         },
	         {
	            "scan": {
	               "id": 838619437,
	               "time": "2019/08/30 09:18:11"
	            },
	            "format": "rpm",
	            "section": "Development/Libraries",
	            "vendor": "CentOS",
	            "description": "Dynamic library for libaudit",
	            "name": "audit-libs",
	            "version": "2.8.4-4.el7",
	            "install_time": "2019/08/01 01:09:44",
	            "size": 250,
	            "architecture": "x86_64",
	            "agent_id": "000"
	         }
	      ],
	      "totalItems": 1140
	   }
	}



Ports
++++++++++++++++++++++++++++++++++++++++

Get ports info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's ports info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
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
	               "id": 562414277,
	               "time": "2019/08/30 09:18:14"
	            },
	            "protocol": "tcp6",
	            "rx_queue": 0,
	            "tx_queue": 0,
	            "state": "listening",
	            "inode": 71866142,
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
	               "id": 562414277,
	               "time": "2019/08/30 09:18:14"
	            },
	            "protocol": "tcp6",
	            "rx_queue": 0,
	            "tx_queue": 0,
	            "state": "listening",
	            "inode": 71867167,
	            "agent_id": "000"
	         }
	      ],
	      "totalItems": 19
	   }
	}



Processes
++++++++++++++++++++++++++++++++++++++++

Get processes info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's processes info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
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
	               "id": 63924444,
	               "time": "2019/08/30 09:18:14"
	            },
	            "start_time": 35986673,
	            "nice": 0,
	            "tgid": 1,
	            "priority": 20,
	            "state": "S",
	            "pid": "1",
	            "ruser": "root",
	            "size": 2923,
	            "sgroup": "root",
	            "ppid": 0,
	            "argvs": "/scripts/entrypoint.sh,wazuh-master,worker-1,worker",
	            "pgrp": 1,
	            "name": "bash",
	            "resident": 675,
	            "rgroup": "root",
	            "share": 623,
	            "utime": 27,
	            "euser": "root",
	            "stime": 1,
	            "session": 1,
	            "tty": 0,
	            "egroup": "root",
	            "nlwp": 1,
	            "fgroup": "root",
	            "suser": "root",
	            "vm_size": 11692,
	            "cmd": "bash",
	            "processor": 2,
	            "agent_id": "000"
	         },
	         {
	            "scan": {
	               "id": 63924444,
	               "time": "2019/08/30 09:18:14"
	            },
	            "start_time": 35986982,
	            "nice": 0,
	            "tgid": 126,
	            "priority": 20,
	            "state": "S",
	            "pid": "126",
	            "ruser": "ossec",
	            "size": 159065,
	            "sgroup": "ossec",
	            "ppid": 1,
	            "pgrp": 125,
	            "name": "wazuh-db",
	            "resident": 1148,
	            "rgroup": "ossec",
	            "share": 921,
	            "utime": 7,
	            "euser": "ossec",
	            "stime": 3,
	            "session": 125,
	            "tty": 0,
	            "egroup": "ossec",
	            "nlwp": 11,
	            "fgroup": "ossec",
	            "suser": "ossec",
	            "vm_size": 636260,
	            "cmd": "/var/ossec/bin/wazuh-db",
	            "processor": 2,
	            "agent_id": "000"
	         }
	      ],
	      "totalItems": 70
	   }
	}



Results
++++++++++++++++++++++++++++++++++++++++

Get CIS-CAT results
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's ciscat results info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
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
| ``q``                        | String        | Advanced query filtering.                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/experimental/ciscat/results?pretty&sort=-score"

**Example Response:**
::

	{
	    "error": 0,
	    "data": {
	        "totalItems": 2,
	        "items": [
	            {
	                "profile": "xccdf_org.cisecurity.benchmarks_profile_Level_1_-_Workstation",
	                "scan": {
	                    "id": 1260865673,
	                    "time": "2018-09-06T07:59:25.682-07:00"
	                },
	                "notchecked": 71,
	                "pass": 96,
	                "benchmark": "CIS Ubuntu Linux 16.04 LTS Benchmark",
	                "unknown": 0,
	                "score": 64,
	                "agent_id": "001",
	                "error": 0,
	                "fail": 53
	            },
	            {
	                "profile": "xccdf_org.cisecurity.benchmarks_profile_Level_2_-_Server",
	                "scan": {
	                    "id": 1260865673,
	                    "time": "2018-09-06T07:58:39.342-07:00"
	                },
	                "notchecked": 36,
	                "pass": 104,
	                "benchmark": "CIS Ubuntu Linux 16.04 LTS Benchmark",
	                "unknown": 1,
	                "score": 57,
	                "agent_id": "001",
	                "error": 0,
	                "fail": 79
	            }
	        ]
	    }
	}



Lists
----------------------------------------
Info
++++++++++++++++++++++++++++++++++++++++

Get all lists
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the content of all CDB lists.

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
	            "name": "aws-eventnames"
	         },
	         {
	            "path": "etc/lists/amazon",
	            "name": "aws-sources"
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

Get manager active configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the requested configuration in JSON format.

**Request**:

``GET`` ::

	/manager/config/:component/:configuration

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                            |
+==============================+===============+========================================================================================================================================================================================================+
| ``component``                | String        | Selected component.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``configuration``            | String        | Configuration to read.                                                                                                                                                                                 |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Component/Configuration options:**

+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Component    | Configuration                                                                                                                                                                                                                          |
+==============+========================================================================================================================================================================================================================================+
| agentless    | agentless                                                                                                                                                                                                                              |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| analysis     | global                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | active_response                                                                                                                                                                                                                        |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | alerts                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | command                                                                                                                                                                                                                                |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | logging                                                                                                                                                                                                                                |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| auth         | auth                                                                                                                                                                                                                                   |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| com          | active-response                                                                                                                                                                                                                        |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | cluster                                                                                                                                                                                                                                |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| csyslog      | csyslog                                                                                                                                                                                                                                |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| integrator   | integration                                                                                                                                                                                                                            |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| logcollector | localfile                                                                                                                                                                                                                              |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | socket                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| mail         | global                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | alerts                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| monitor      | monitor                                                                                                                                                                                                                                |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | logging                                                                                                                                                                                                                                |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| request      | remote                                                                                                                                                                                                                                 |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| syscheck     | syscheck                                                                                                                                                                                                                               |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | rootcheck                                                                                                                                                                                                                              |
|              +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              | internal                                                                                                                                                                                                                               |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wmodules     | wmodules                                                                                                                                                                                                                               |
+--------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/config/logcollector/internal?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "internal": {
	         "logcollector": {
	            "remote_commands": 0,
	            "loop_timeout": 2,
	            "open_attempts": 8,
	            "vcheck_files": 64,
	            "max_lines": 10000,
	            "max_files": 1000,
	            "sock_fail_time": 300,
	            "debug": 0,
	            "sample_log_length": 64,
	            "queue_size": 1024,
	            "input_threads": 4,
	            "force_reload": 0,
	            "reload_interval": 64,
	            "reload_delay": 1000,
	            "rlimit_nofile": 1100
	         }
	      }
	   }
	}


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
	      "email_notification": "yes",
	      "smtp_server": "localhost",
	      "email_from": "wazuh@test.com",
	      "email_to": "recipient@example.wazuh.com",
	      "email_maxperhour": "12",
	      "email_log_source": "alerts.log",
	      "white_list": [
	         "127.0.0.1",
	         "^localhost.localdomain$",
	         "10.0.5.124",
	         "10.5.5.120"
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


Delete a local file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Confirmation message.

**Request**:

``DELETE`` ::

	/manager/files

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``path``                     | String        | Relative path of file. This parameter is mandatory.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/manager/files?path=etc/rules/local_rules.xml&pretty"

**Example Response:**
::

   {
      "error": 0,
      "data": "File was deleted"
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
| ``path``                     | String        | Relative path of file. This parameter is mandatory.                                                                                                                                                                                  |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``validation``               | Boolean       | Validates the content of the file. An error will be returned if file content is not strictly correct. False by default.                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/manager/files?path=etc/decoders/local_decoder.xml&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": "<!-- Local Decoders -->\n\n<!-- Modify it at your will. -->\n<!-- Copyright (C) 2015-2019, Wazuh Inc. -->\n\n<!--\n  - Allowed static fields:\n  - location   - where the log came from (only on FTS)\n  - srcuser    - extracts the source username\n  - dstuser    - extracts the destination (target) username\n  - user       - an alias to dstuser (only one of the two can be used)\n  - srcip      - source ip\n  - dstip      - dst ip\n  - srcport    - source port\n  - dstport    - destination port\n  - protocol   - protocol\n  - id         - event id\n  - url        - url of the event\n  - action     - event action (deny, drop, accept, etc)\n  - status     - event status (success, failure, etc)\n  - extra_data - Any extra data\n-->\n\n<decoder name=\"local_decoder_example\">\n    <program_name>local_decoder_example</program_name>\n</decoder>\n"
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
| ``path``                     | String        | Relative path were input file will be placed. This parameter is mandatory.                                                                                                                                                           |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``overwrite``                | Boolean       | Replaces the existing file. False by default.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X POST -H 'Content-type: application/xml' -d @rules.xml "https://127.0.0.1:55000/manager/files?path=etc/rules/new_rule.xml&pretty"

**Example Response:**
::

	{
	    "error": 0,
	    "data": "File updated successfully"
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
	      "path": "/var/ossec",
	      "version": "v3.10.2",
	      "compilation_date": "Fri Aug 30 08:02:30 UTC 2019",
	      "type": "server",
	      "max_agents": "14000",
	      "openssl_support": "yes",
	      "ruleset_version": "31005",
	      "tz_offset": "+0000",
	      "tz_name": "UTC",
	      "name": "1cb46c820ff5",
	      "cluster": {
	         "enabled": "yes",
	         "running": "yes",
	         "name": "wazuh",
	         "node_name": "master",
	         "node_type": "master"
	      }
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
	      "ossec-agentlessd": "running",
	      "ossec-analysisd": "running",
	      "ossec-authd": "running",
	      "ossec-csyslogd": "running",
	      "ossec-dbd": "stopped",
	      "ossec-monitord": "running",
	      "ossec-execd": "running",
	      "ossec-integratord": "running",
	      "ossec-logcollector": "running",
	      "ossec-maild": "running",
	      "ossec-remoted": "running",
	      "ossec-reportd": "stopped",
	      "ossec-syscheckd": "running",
	      "wazuh-clusterd": "running",
	      "wazuh-modulesd": "running",
	      "wazuh-db": "running"
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
	            "timestamp": "2019-08-30 09:31:10",
	            "tag": "ossec-remoted",
	            "level": "info",
	            "description": " (1409): Authentication file changed. Updating."
	         },
	         {
	            "timestamp": "2019-08-30 09:31:10",
	            "tag": "ossec-remoted",
	            "level": "info",
	            "description": " (1410): Reading authentication keys file."
	         },
	         {
	            "timestamp": "2019-08-30 09:31:08",
	            "tag": "ossec-remoted",
	            "level": "warning",
	            "description": " Could not open directory '/etc/shared/webserver'. Group folder was deleted."
	         },
	         {
	            "timestamp": "2019-08-30 09:31:05",
	            "tag": "ossec-authd",
	            "level": "info",
	            "description": " Agent '008' (server002) deleted (requested locally)"
	         },
	         {
	            "timestamp": "2019-08-30 09:31:04",
	            "tag": "ossec-authd",
	            "level": "info",
	            "description": " Agent '003' (b8189584d2e4) deleted (requested locally)"
	         }
	      ],
	      "totalItems": 189
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
	      "ossec-csyslogd": {
	         "all": 3,
	         "info": 3,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-dbd": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-integratord": {
	         "all": 3,
	         "info": 3,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-agentlessd": {
	         "all": 4,
	         "info": 2,
	         "error": 2,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-authd": {
	         "all": 25,
	         "info": 25,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-db": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-execd": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-remoted": {
	         "all": 15,
	         "info": 12,
	         "error": 0,
	         "critical": 0,
	         "warning": 3,
	         "debug": 0
	      },
	      "ossec-monitord": {
	         "all": 2,
	         "info": 2,
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
	      "wazuh-modulesd:osquery": {
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
	      "sca": {
	         "all": 13,
	         "info": 13,
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
	      "ossec-analysisd": {
	         "all": 45,
	         "info": 45,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-logcollector": {
	         "all": 13,
	         "info": 11,
	         "error": 2,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd:syscollector": {
	         "all": 5,
	         "info": 5,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-maild": {
	         "all": 2,
	         "info": 2,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "wazuh-modulesd:vulnerability-detector": {
	         "all": 10,
	         "info": 10,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-syscheckd": {
	         "all": 28,
	         "info": 28,
	         "error": 0,
	         "critical": 0,
	         "warning": 0,
	         "debug": 0
	      },
	      "ossec-rootcheck": {
	         "all": 3,
	         "info": 3,
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
Restarts Wazuh manager.

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
	    "data": "Restart request sent"
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
	      "sca_events_decoded": 0,
	      "sca_edps": 0,
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
	      "sca_queue_usage": 0,
	      "sca_queue_size": 16384,
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
	    "error": 0,
	    "data": [
	        {
	            "hour": 5,
	            "firewall": 0,
	            "alerts": [
	                {
	                    "times": 4,
	                    "sigid": 5715,
	                    "level": 3
	                },
	                {
	                    "times": 2,
	                    "sigid": 1002,
	                    "level": 2
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
	    ]
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
	    "error": 0,
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
	    }
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
	    "error": 0,
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
	        "Fri": {
	            "hours": [
	                131,
	                "...",
	                432
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
	        "Thu": {
	            "hours": [
	                888,
	                "...",
	                123
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
	    }
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
	      "evt_count": 3211,
	      "ctrl_msg_count": 85,
	      "discarded_count": 0,
	      "msg_sent": 2057,
	      "recv_bytes": 934090,
	      "dequeued_after_close": 0
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
	    "error": 0,
	    "data": "Rootcheck database deleted"
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
	    "error": 0,
	    "data": "Rootcheck database deleted"
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
	      "end": "2019-08-30 09:18:55",
	      "start": "2019-08-30 09:18:27"
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
         "totalItems": 2,
         "items": [
            "2.3 RHEL7",
            "1.4 RHEL7"
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
	      "items": [
	         {
	            "status": "outstanding",
	            "event": "File '/root/.npm/_cacache/index-v5/43/ba/c4e5cd056db39539408209f32113644c25acadd7e1b245a98de885a8ca18' is owned by root and has written permissions to anyone.",
	            "oldDay": "2019-08-30 09:18:31",
	            "readDay": "2019-08-30 09:18:31"
	         }
	      ],
	      "totalItems": 1
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
	    "error": 0,
	    "data": "Restarting Syscheck/Rootcheck on all agents"
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
| ``gdpr``                     | String        | Filters the rules by gdpr requirement.                                                                                                                                                                                               |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``hipaa``                    | String        | Filters the rules by hipaa requirement.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``nist-800-53``              | String        | Filters the rules by nist-800-53 requirement.                                                                                                                                                                                        |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``gpg13``                    | String        | Filters the rules by gpg13 requirement.                                                                                                                                                                                              |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter results by. For example q="id=89055"                                                                                                                                                                                 |
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
	            "path": "ruleset/rules",
	            "id": 1,
	            "description": "Generic template for all syslog rules.",
	            "level": 0,
	            "status": "enabled",
	            "groups": [
	               "syslog"
	            ],
	            "pci": [],
	            "gdpr": [],
	            "hipaa": [],
	            "nist-800-53": [],
	            "gpg13": [],
	            "details": {
	               "noalert": "1",
	               "category": "syslog"
	            }
	         },
	         {
	            "file": "0010-rules_config.xml",
	            "path": "ruleset/rules",
	            "id": 2,
	            "description": "Generic template for all firewall rules.",
	            "level": 0,
	            "status": "enabled",
	            "groups": [
	               "firewall"
	            ],
	            "pci": [],
	            "gdpr": [],
	            "hipaa": [],
	            "nist-800-53": [],
	            "gpg13": [],
	            "details": {
	               "noalert": "1",
	               "category": "firewall"
	            }
	         }
	      ],
	      "totalItems": 2855
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
	            "path": "ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0015-ossec_rules.xml",
	            "path": "ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0016-wazuh_rules.xml",
	            "path": "ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0020-syslog_rules.xml",
	            "path": "ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0025-sendmail_rules.xml",
	            "path": "ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0030-postfix_rules.xml",
	            "path": "ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0035-spamd_rules.xml",
	            "path": "ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0040-imapd_rules.xml",
	            "path": "ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0045-mailscanner_rules.xml",
	            "path": "ruleset/rules",
	            "status": "enabled"
	         },
	         {
	            "file": "0050-ms-exchange_rules.xml",
	            "path": "ruleset/rules",
	            "status": "enabled"
	         }
	      ],
	      "totalItems": 125
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


Get rule gpg13 requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the GPG13 requirements of all rules.

**Request**:

``GET`` ::

	/rules/gpg13

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

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/gpg13?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         "1.3",
	         "10.1",
	         "3.1",
	         "3.2",
	         "3.3",
	         "3.5",
	         "3.6",
	         "3.7",
	         "4.1",
	         "4.10"
	      ],
	      "totalItems": 28
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
	      "totalItems": 298
	   }
	}


Get rule hipaa requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the HIPAA requirements of all rules.

**Request**:

``GET`` ::

	/rules/hipaa

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

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/hipaa?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         "164.312.a.1",
	         "164.312.a.2.I",
	         "164.312.a.2.II",
	         "164.312.a.2.III",
	         "164.312.a.2.IV",
	         "164.312.b",
	         "164.312.c.1",
	         "164.312.c.2",
	         "164.312.d",
	         "164.312.e.1"
	      ],
	      "totalItems": 12
	   }
	}


Get rule nist-800-53 requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the NIST-800-53 requirements of all rules.

**Request**:

``GET`` ::

	/rules/nist-800-53

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

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules/nist-800-53?offset=0&limit=10&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         "AC.12",
	         "AC.2",
	         "AC.6",
	         "AC.7",
	         "AU.12",
	         "AU.14",
	         "AU.5",
	         "AU.6",
	         "AU.8",
	         "AU.9"
	      ],
	      "totalItems": 25
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
	            "path": "ruleset/rules",
	            "id": 1002,
	            "description": "Unknown problem somewhere in the system.",
	            "level": 2,
	            "status": "enabled",
	            "groups": [
	               "syslog",
	               "errors"
	            ],
	            "pci": [],
	            "gdpr": [],
	            "hipaa": [],
	            "nist-800-53": [],
	            "gpg13": [
	               "4.3"
	            ],
	            "details": {
	               "match": "core_dumped|failure|error|attack| bad |illegal |denied|refused|unauthorized|fatal|failed|Segmentation Fault|Corrupted"
	            }
	         }
	      ],
	      "totalItems": 1
	   }
	}




Security Configuration Assessment
----------------------------------------
Info
++++++++++++++++++++++++++++++++++++++++

Get security configuration assessment (SCA) checks database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the sca checks of an agent.

**Request**:

``GET`` ::

	/sca/:agent_id/checks/:policy_id

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``policy_id``                | String        | Filter by policy name                                                                                                                                                                                                                |
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

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/sca/000/checks/unix_audit?pretty&limit=2"

**Example Response:**
::

   {
      "error": 0,
      "data": {
         "totalItems": 23,
         "items": [
            {
               "id": 4022,
               "status": "",
               "policy_id": "unix_audit",
               "command": "systemctl is-enabled auditd",
               "reason": "",
               "result": "failed",
               "remediation": "Run the following command to enable auditd: # systemctl enable auditd",
               "title": "Ensure auditd service is enabled",
               "rationale": "The capturing of system events provides system administrators with information to allow them to determine if unauthorized access to their system is occurring.",
               "description": "Turn on the auditd daemon to record system events.",
               "compliance": [
                  {
                     "key": "cis_csc",
                     "value": "6.2,6.3"
                  }
               ],
               "rules": [
                  {
                     "type": "command",
                     "rule": "c:systemctl is-enabled auditd -> r:^enabled"
                  }
               ]
            },
            {
               "id": 4021,
               "status": "",
               "policy_id": "unix_audit",
               "command": "systemctl is-enabled cups",
               "reason": "",
               "references": "https://www.cups.org",
               "result": "passed",
               "remediation": "Run the following command to disable cups: # systemctl disable cups",
               "title": "Ensure CUPS is not enabled",
               "rationale": "If the system does not need to print jobs or accept print jobs from other systems, it is recommended that CUPS be disabled to reduce the potential attack surface.",
               "description": "The Common Unix Print System (CUPS) provides the ability to print to both local and network printers. A system running CUPS can also accept print jobs from remote systems and print them to local printers. It also provides a web based remote administration capability.",
               "compliance": [
                  {
                     "key": "cis_csc",
                     "value": "9.1,9.2"
                  }
               ],
               "rules": [
                  {
                     "type": "command",
                     "rule": "c:systemctl is-enabled cups -> r:^enabled"
                  }
               ]
            }
         ]
      }
   }



Get security configuration assessment (SCA) database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the sca database of an agent.

**Request**:

``GET`` ::

	/sca/:agent_id

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

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/sca/000?q=pass>20;score<150&pretty"

**Example Response:**
::

   {
      "error": 0,
      "data": {
         "totalItems": 1,
         "items": [
            {
               "references": "https://www.cisecurity.org/cis-benchmarks/",
               "name": "CIS Benchmark for Red Hat Enterprise Linux 7",
               "total_checks": 64,
               "end_scan": "2019-09-04 08:23:27",
               "pass": 30,
               "start_scan": "2019-09-04 08:23:27",
               "fail": 31,
               "score": 49,
               "hash_file": "bbc8852e2a222ebaa997afc26f258b1e79f38174a8979b11a1a047dc3f75390a",
               "description": "This document provides prescriptive guidance for establishing a secure configuration posture for Red Hat Enterprise Linux 7 systems running on x86 and x64 platforms. This document was tested against Red Hat Enterprise Linux 7.4.",
               "policy_id": "cis_rhel7",
               "invalid": 3
            }
         ]
      }
   }



Summary
----------------------------------------
Info
++++++++++++++++++++++++++++++++++++++++

Get a full summary of agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a dictionary with a full summary of agents.

**Request**:

``GET`` ::

	/summary/agents

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/summary/agents?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "nodes": {
	         "items": [
	            {
	               "node_name": "master",
	               "count": 2
	            },
	            {
	               "node_name": "worker-1",
	               "count": 1
	            },
	            {
	               "node_name": "worker-2",
	               "count": 1
	            },
	            {
	               "node_name": "unknown",
	               "count": 7
	            }
	         ],
	         "totalItems": 11
	      },
	      "groups": {
	         "items": [
	            {
	               "count": 5,
	               "name": "default",
	               "mergedSum": "6c2a4b148047e590188f8befe47c2bff",
	               "configSum": "ab73af41699f13fdd81903b5f23d8d00"
	            },
	            {
	               "count": 0,
	               "name": "pciserver",
	               "mergedSum": "49d75a97d35ccf5ced69da4a77c99392",
	               "configSum": "ab73af41699f13fdd81903b5f23d8d00"
	            }
	         ],
	         "totalItems": 2
	      },
	      "agent_os": {
	         "items": [
	            {
	               "os": {
	                  "name": "CentOS Linux",
	                  "platform": "centos",
	                  "version": "8.0"
	               },
	               "count": 3
	            },
	            {
	               "os": {
	                  "name": "CentOS Linux",
	                  "platform": "centos",
	                  "version": "8"
	               },
	               "count": 1
	            },
	            {
	               "count": 7
	            }
	         ],
	         "totalItems": 11
	      },
	      "agent_status": {
	         "Total": 11,
	         "Active": 4,
	         "Disconnected": 0,
	         "Never connected": 7,
	         "Pending": 0
	      },
	      "agent_version": {
	         "items": [
	            {
	               "count": 1,
	               "version": "Wazuh v3.11.0"
	            },
	            {
	               "count": 2,
	               "version": "Wazuh v3.10.2"
	            },
	            {
	               "count": 1,
	               "version": "Wazuh v3.5.0"
	            },
	            {
	               "count": 7
	            }
	         ],
	         "totalItems": 11
	      },
	      "last_registered_agent": {
	         "id": "123",
	         "status": "Never connected",
	         "registerIP": "10.0.10.10",
	         "dateAdd": "2019-10-03 05:58:05",
	         "node_name": "unknown",
	         "name": "NewHost_2",
	         "ip": "10.0.10.10"
	      }
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
	    "error": 0,
	    "data": "Syscheck database deleted"
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
	      "start": "2019-08-30 09:18:27",
	      "end": "2019-08-30 09:18:50"
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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``md5``                      | String        | Returns the files with the specified md5 hash.                                                                                                                                                                                       |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sha1``                     | String        | Returns the files with the specified sha1 hash.                                                                                                                                                                                      |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sha256``                   | String        | Returns the files with the specified sha256 hash.                                                                                                                                                                                    |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``hash``                     | String        | Returns the files with the specified hash (md5, sha1 or sha256).                                                                                                                                                                     |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | string        | Advanced query filtering                                                                                                                                                                                                             |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscheck/000?offset=0&limit=2&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 990,
	      "items": [
	         {
	            "file": "/etc/openldap/ldap.conf",
	            "type": "file",
	            "date": "2019-08-30 09:18:32",
	            "uname": "root",
	            "gname": "root",
	            "uid": "0",
	            "sha1": "6e6603b896c69131911067717accea79e4dc3d85",
	            "mtime": "2019-01-29 17:43:29",
	            "inode": 9830759,
	            "md5": "3249b02f6d57bef9a424860cb7624e09",
	            "attributes": 0,
	            "perm": "100644",
	            "gid": "0",
	            "size": 363,
	            "sha256": "f221a45d80d6df1cc6b00c148e20096f78af459722c432d6e6df9b2986688e8a"
	         },
	         {
	            "file": "/etc/shadow",
	            "type": "file",
	            "date": "2019-08-30 09:18:32",
	            "uname": "root",
	            "gname": "root",
	            "uid": "0",
	            "sha1": "cbb29f8dfe019f269e901d24fcd778b58376e7b3",
	            "mtime": "2019-08-30 08:01:42",
	            "inode": 9856733,
	            "md5": "40265245395580369b4a7ccbb3b5a4cb",
	            "attributes": 0,
	            "perm": "100000",
	            "gid": "0",
	            "size": 585,
	            "sha256": "9869a272c5fc136931b51980ed854da286ebce3b0615d300785aac7c0913f6ca"
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
	    "error": 0,
	    "data": "Restarting Syscheck/Rootcheck on all agents"
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
Returns the agent's hardware info.

**Request**:

``GET`` ::

	/syscollector/:agent_id/hardware

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
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
	         "cores": 4,
	         "mhz": 1891.016,
	         "name": "Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz"
	      },
	      "ram": {
	         "free": 187392,
	         "total": 7943140,
	         "usage": 98
	      },
	      "scan": {
	         "id": 252908616,
	         "time": "2019/08/30 09:18:11"
	      },
	      "board_serial": "PM00R017AM000245"
	   }
	}


Hotfixes
++++++++++++++++++++++++++++++++++++++++

Get hotfixes info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns all hotfixes installed by Microsoft(R) in Windows(R) systems (KB... fixes)

**Request**:

``GET`` ::

	/syscollector/:agent_id/hotfixes

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter results by.                                                                                                                                                                                                          |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``hotfix``                   | String        | Filters by hotfix.                                                                                                                                                                                                                   |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/001/hotfixes?pretty&limit=2"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "items": [
	         {
	            "scan": {
	               "id": 1408519641,
	               "time": "2019/08/05 12:06:26"
	            },
	            "hotfix": "KB2533552"
	         },
	         {
	            "scan": {
	               "id": 1408519641,
	               "time": "2019/08/05 12:06:26"
	            },
	            "hotfix": "KB2534366"
	         }
	      ],
	      "totalItems": 6
	   }
	}


Netaddr
++++++++++++++++++++++++++++++++++++++++

Get network address info of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network address info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter results by.                                                                                                                                                                                                          |
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
	            "netmask": "255.255.0.0",
	            "scan_id": 1004456427,
	            "address": "172.22.0.2",
	            "proto": "ipv4",
	            "broadcast": "172.22.255.255",
	            "iface": "eth0"
	         }
	      ],
	      "totalItems": 1
	   }
	}



Netiface
++++++++++++++++++++++++++++++++++++++++

Get network interface info of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network interface info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter results by.                                                                                                                                                                                                          |
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
	               "bytes": 823214,
	               "dropped": 0,
	               "errors": 0,
	               "packets": 206
	            },
	            "scan": {
	               "id": 1004456427,
	               "time": "2019/08/30 09:18:11"
	            },
	            "tx": {
	               "bytes": 10250,
	               "dropped": 0,
	               "errors": 0,
	               "packets": 144
	            },
	            "mac": "02:42:ac:16:00:02",
	            "type": "ethernet",
	            "name": "eth0",
	            "mtu": 1500,
	            "state": "up"
	         }
	      ],
	      "totalItems": 1
	   }
	}



Netproto
++++++++++++++++++++++++++++++++++++++++

Get network protocol info of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's network protocol info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter results by.                                                                                                                                                                                                          |
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
	            "gateway": "172.22.0.1",
	            "type": "ipv4",
	            "scan_id": 1004456427,
	            "iface": "eth0",
	            "dhcp": "unknown"
	         }
	      ],
	      "totalItems": 1
	   }
	}



OS
++++++++++++++++++++++++++++++++++++++++

Get os info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's OS info.

**Request**:

``GET`` ::

	/syscollector/:agent_id/os

**Parameters:**

+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param                        | Type          | Description                                                                                                                                                                                                                          |
+==============================+===============+======================================================================================================================================================================================================================================+
| ``agent_id``                 | Number        | Agent ID.                                                                                                                                                                                                                            |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
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
	         "major": "7",
	         "minor": "6",
	         "name": "CentOS Linux",
	         "platform": "centos",
	         "version": "7.6"
	      },
	      "scan": {
	         "id": 640586774,
	         "time": "2019/08/30 09:18:11"
	      },
	      "version": "#1 SMP Fri Aug 16 21:37:45 UTC 2019",
	      "sysname": "Linux",
	      "release": "5.2.9-200.fc30.x86_64",
	      "architecture": "x86_64",
	      "hostname": "1cb46c820ff5"
	   }
	}



Packages
++++++++++++++++++++++++++++++++++++++++

Get packages info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's packages info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter results by.                                                                                                                                                                                                          |
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
	               "id": 838619437,
	               "time": "2019/08/30 09:18:11"
	            },
	            "version": "2018.2.22-70.0.el7_5",
	            "section": "System Environment/Base",
	            "description": "The Mozilla CA root certificate bundle",
	            "architecture": "noarch",
	            "install_time": "2019/08/01 01:09:41",
	            "size": 951,
	            "name": "ca-certificates",
	            "format": "rpm",
	            "vendor": "CentOS"
	         },
	         {
	            "scan": {
	               "id": 838619437,
	               "time": "2019/08/30 09:18:11"
	            },
	            "version": "7-6.1810.2.el7.centos",
	            "section": "System Environment/Base",
	            "description": "CentOS Linux release file",
	            "architecture": "x86_64",
	            "install_time": "2019/08/01 01:09:42",
	            "size": 40,
	            "name": "centos-release",
	            "format": "rpm",
	            "vendor": "CentOS"
	         }
	      ],
	      "totalItems": 225
	   }
	}



Ports
++++++++++++++++++++++++++++++++++++++++

Get ports info of an agent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's ports info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter results by.                                                                                                                                                                                                          |
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
	               "id": 295821724,
	               "time": "2019/08/30 09:18:14"
	            },
	            "tx_queue": 0,
	            "state": "listening",
	            "rx_queue": 0,
	            "inode": 71866572,
	            "protocol": "tcp"
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
	               "id": 295821724,
	               "time": "2019/08/30 09:18:14"
	            },
	            "tx_queue": 0,
	            "state": "listening",
	            "rx_queue": 0,
	            "inode": 71865836,
	            "protocol": "tcp"
	         }
	      ],
	      "totalItems": 6
	   }
	}



Processes
++++++++++++++++++++++++++++++++++++++++

Get processes info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's processes info.

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
| ``select``                   | String        | List of selected fields separated by commas.                                                                                                                                                                                         |
+------------------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``q``                        | String        | Query to filter results by.                                                                                                                                                                                                          |
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
	               "id": 110992305,
	               "time": "2019/08/30 09:18:14"
	            },
	            "priority": 20,
	            "state": "S",
	            "pid": "234",
	            "share": 466,
	            "stime": 0,
	            "resident": 681,
	            "euser": "ossec",
	            "suser": "ossec",
	            "sgroup": "ossec",
	            "fgroup": "ossec",
	            "utime": 0,
	            "ruser": "ossec",
	            "rgroup": "ossec",
	            "nlwp": 1,
	            "processor": 3,
	            "vm_size": 21756,
	            "size": 5439,
	            "start_time": 35986970,
	            "tgid": 234,
	            "cmd": "/var/ossec/bin/ossec-monitord",
	            "ppid": 1,
	            "tty": 0,
	            "egroup": "ossec",
	            "session": 233,
	            "name": "ossec-monitord",
	            "pgrp": 233,
	            "nice": 0
	         },
	         {
	            "scan": {
	               "id": 110992305,
	               "time": "2019/08/30 09:18:14"
	            },
	            "priority": 20,
	            "state": "S",
	            "pid": "198",
	            "share": 708,
	            "stime": 1,
	            "resident": 1044,
	            "euser": "ossecr",
	            "suser": "ossecr",
	            "sgroup": "ossec",
	            "fgroup": "ossec",
	            "utime": 1,
	            "ruser": "ossecr",
	            "rgroup": "ossec",
	            "nlwp": 20,
	            "processor": 1,
	            "vm_size": 506340,
	            "size": 126585,
	            "start_time": 35986952,
	            "tgid": 198,
	            "cmd": "/var/ossec/bin/ossec-remoted",
	            "ppid": 1,
	            "tty": 0,
	            "egroup": "ossec",
	            "session": 194,
	            "name": "ossec-remoted",
	            "pgrp": 194,
	            "nice": 0
	         }
	      ],
	      "totalItems": 18
	   }
	}




