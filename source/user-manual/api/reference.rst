.. _api_reference:


.. Do not modify this file manually. It is generated automatically.

Reference
======================
This API reference is organized by resources:

* `Agents`_
* `Cache`_
* `Cluster`_
* `Decoders`_
* `Manager`_
* `Rootcheck`_
* `Rules`_
* `Syscheck`_
* `Syscollector`_

Below is the `Request List`_ that shows all of the available requests.

.. _request_list:

Request List
---------------------------------

`Agents`_
	* DELETE /agents  (`Delete a list of agents`_)
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
	* GET /agents/outdated  (`Get outdated agents`_)
	* GET /agents/summary  (`Get agents summary`_)
	* GET /agents/summary/os  (`Get OS summary`_)
	* GET /purgeable/:timeframe  (`Get list of purgeable agents`_)
	* POST /agents  (`Add agent`_)
	* POST /agents/insert  (`Insert agent`_)
	* POST /agents/purge  (`Purge old agents from manager`_)
	* POST /agents/restart  (`Restart a list of agents`_)
	* PUT /agents/:agent_id/group/:group_id  (`Set agent group`_)
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

`Cluster`_
	* GET /cluster/agents  (`Get info about agents in cluster`_)
	* GET /cluster/config  (`Get the cluster configuration`_)
	* GET /cluster/files  (`Get info about files in cluster`_)
	* GET /cluster/node  (`Get node info`_)
	* GET /cluster/nodes  (`Get nodes info`_)
	* GET /cluster/status  (`Get info about cluster status`_)

`Decoders`_
	* GET /decoders  (`Get all decoders`_)
	* GET /decoders/:decoder_name  (`Get decoders by name`_)
	* GET /decoders/files  (`Get all decoders files`_)
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
	* GET /syscollector/:agent_id/os  (`Get os info`_)
	* GET /syscollector/:agent_id/packages  (`Get packages info`_)
	* GET /syscollector/hardware  (`Get hardware info of all agents`_)
	* GET /syscollector/os  (`Get os info of all agents`_)
	* GET /syscollector/packages  (`Get packages info of all agents`_)

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
	      "id": "006",
	      "key": "MDA2IE5ld0hvc3QgMTAuMC4wLjkgMTVhZTNiZDU4Mjg2MzRjN2E4MTBiZmRjYzY1Y2E2MmEyMGY3YmQ2NWVlM2NjOWRiYWNlNGRmNGM1MTdkNTY1Ng=="
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
	      "id": "007",
	      "key": "MDA3IG15TmV3QWdlbnQgYW55IDcwMTQ2MjNiNmEzMjYyMjVjNGRiNzQ2MTllMTM4MzVkYTEzOWY2OTNkZWUzMGU4OTRiZjQ1MmY0YjhlOTBkYzc="
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

Delete a list of agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Removes a list of agents. The Wazuh API must be restarted after removing an agent.

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

**Example Request:**
::

	curl -u foo:bar -k -X DELETE -H "Content-Type:application/json" -d '{"ids":["003","005"]}' "https://127.0.0.1:55000/agents?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "msg": "All selected agents were removed",
	      "affected_agents": [
	         "003",
	         "005"
	      ]
	   }
	}


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
	         "001"
	      ]
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

	curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/agents/001?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "msg": "All selected agents were removed",
	      "affected_agents": [
	         "001"
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
	   "error": 0,
	   "data": "Group 'pciserver' created."
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
	            "ip": "10.0.0.12",
	            "id": "002",
	            "name": "dmz001"
	         },
	         {
	            "ip": "10.0.0.14",
	            "id": "004",
	            "name": "dmz002"
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
	            "config": {},
	            "filters": {}
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
	      "totalItems": 19,
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
	            "hash": "bc742a625c5f8d60ae67489811e307ae",
	            "filename": "cis_rhel7_linux_rcl.txt"
	         },
	         {
	            "hash": "24e83427d2678aada50fa401b921a0cd",
	            "filename": "cis_rhel_linux_rcl.txt"
	         },
	         {
	            "hash": "16cfc690e7c5fda8d5be45b7c3b6d257",
	            "filename": "cis_sles11_linux_rcl.txt"
	         },
	         {
	            "hash": "533ec3f8eda8e52edb181e3f6bd44d52",
	            "filename": "cis_sles12_linux_rcl.txt"
	         },
	         {
	            "hash": "613f16b8c8d8978b7e07bbd1fa6c29ca",
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
	            "count": 0,
	            "conf_sum": "ab73af41699f13fdd81903b5f23d8d00",
	            "merged_sum": "613f16b8c8d8978b7e07bbd1fa6c29ca",
	            "name": "default"
	         },
	         {
	            "count": 2,
	            "conf_sum": "ab73af41699f13fdd81903b5f23d8d00",
	            "merged_sum": "2e57fa6141fc6ff5656e2a751536fd7c",
	            "name": "dmz"
	         },
	         {
	            "count": 0,
	            "conf_sum": "ab73af41699f13fdd81903b5f23d8d00",
	            "merged_sum": "613f16b8c8d8978b7e07bbd1fa6c29ca",
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
	         "002",
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
	      "Active": 1,
	      "Never connected": 5,
	      "Total": 6,
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
| ``status``         | String        | Filters by agent status.                                                                                                                                                                               |
|                    |               |                                                                                                                                                                                                        |
|                    |               | Allowed values:                                                                                                                                                                                        |
|                    |               |                                                                                                                                                                                                        |
|                    |               | - active                                                                                                                                                                                               |
|                    |               | - pending                                                                                                                                                                                              |
|                    |               | - never connected                                                                                                                                                                                      |
|                    |               | - disconnected                                                                                                                                                                                         |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os.platform``    | String        | Filters by OS platform.                                                                                                                                                                                |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``os.version``     | String        | Filters by OS version.                                                                                                                                                                                 |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``manager``        | String        | Filters by manager hostname to which agents are connected.                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``version``        | String        | Filters by agents version.                                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents?pretty&offset=0&limit=5&sort=-ip,name"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 6,
	      "items": [
	         {
	            "status": "Never connected",
	            "ip": "any",
	            "dateAdd": "2018-02-13 01:02:38",
	            "id": "007",
	            "name": "myNewAgent"
	         },
	         {
	            "status": "Never connected",
	            "ip": "10.0.10.10",
	            "dateAdd": "2018-02-13 01:02:39",
	            "id": "123",
	            "name": "NewHost_2"
	         },
	         {
	            "status": "Never connected",
	            "ip": "10.0.0.9",
	            "dateAdd": "2018-02-13 01:02:38",
	            "id": "006",
	            "name": "NewHost"
	         },
	         {
	            "status": "Never connected",
	            "ip": "10.0.0.14",
	            "dateAdd": "2018-02-13 01:00:41",
	            "id": "004",
	            "name": "dmz002"
	         },
	         {
	            "status": "Never connected",
	            "ip": "10.0.0.12",
	            "dateAdd": "2018-02-13 01:00:20",
	            "id": "002",
	            "name": "dmz001"
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

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/000?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "status": "Active",
	      "name": "ubuntu",
	      "ip": "127.0.0.1",
	      "dateAdd": "2018-02-13 00:51:41",
	      "version": "Wazuh v3.2.0",
	      "manager_host": "ubuntu",
	      "lastKeepAlive": "9999-12-31 23:59:59",
	      "os": {
	         "major": "16",
	         "name": "Ubuntu",
	         "uname": "Linux |ubuntu |4.13.0-32-generic |#35~16.04.1-Ubuntu SMP Thu Jan 25 10:13:43 UTC 2018 |x86_64",
	         "platform": "ubuntu",
	         "version": "16.04.3 LTS",
	         "codename": "Xenial Xerus",
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
	      "dateAdd": "2018-02-13 01:02:38",
	      "id": "006",
	      "name": "NewHost"
	   }
	}


Get list of purgeable agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a list of agents that can be purged.

**Request**:

``GET`` ::

	/purgeable/:timeframe

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``timeframe``      | String        | Time from last connection in seconds or [n_days]d[n_hours]h[n_minutes]m[n_seconds]s.                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset``         | Number        | First element to return in the collection.                                                                                                                                                             |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``limit``          | Number        | Maximum number of elements to return.                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/purgeable/1d5h?pretty"

**Example Response:**
::

	{
	    "data": {
	        "items": [
	            {
	                "id": "001",
	                "name": "test1"
	            },
	            {
	                "id": "002",
	                "name": "test2"
	            }
	        ],
	        "timeframe": 104400
	    },
	    "error": 0
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
	   "data": "MDA0IGRtejAwMiAxMC4wLjAuMTQgNmEzMTI4NzMwY2YzODNmZjVjYTAwYzc4OGI3NGUwOWY5MDRhZDdlMzIxMTY0NDlhNmVjYWZmY2MzMzY5NzUzZQ=="
	}



Purge
++++++++++++++++++++++++++++++++++++++++

Purge old agents from manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Deletes all agents that did not connect in the last timeframe seconds.

**Request**:

``POST`` ::

	/agents/purge

**Parameters:**

+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Param              | Type          | Description                                                                                                                                                                                            |
+====================+===============+========================================================================================================================================================================================================+
| ``timeframe``      | String        | Time from last connection in seconds or [n_days]d[n_hours]h[n_minutes]m[n_seconds]s.                                                                                                                   |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``verbose``        | Boolean       | Return information about agents purged.                                                                                                                                                                |
+--------------------+---------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**Example Request:**
::

	curl -u foo:bar -k -X POST -H "Content-Type:application/json" -d '{"timeframe":"1d5h","verbose":true}' "https://127.0.0.1:55000/agents/purge?pretty"

**Example Response:**
::

	{
	    "data": {
	        "totalItems": 2,
	        "items": [
	            {
	                "id": "001",
	                "name": "test1"
	            },
	            {
	                "id": "002",
	                "name": "test2"
	            }
	        ],
	        "timeframe": 104400
	    },
	    "error": 0
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
	         "/agents/000?pretty",
	         "/agents/name/NewHost?pretty"
	      ],
	      "groups": {
	         "agents": [
	            "/agents/000?pretty",
	            "/agents/name/NewHost?pretty"
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




Cluster
----------------------------------------
Node
++++++++++++++++++++++++++++++++++++++++

Get node info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the Node information

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
	      "node": "ubuntu_node",
	      "cluster": "wazuh",
	      "type": "master"
	   }
	}



Nodes
++++++++++++++++++++++++++++++++++++++++

Get info about agents in cluster
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the state of each agent and the manager it's reporting to in the cluster

**Request**:

``GET`` ::

	/cluster/agents

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/agents?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "None": [
	         {
	            "status": "Never connected",
	            "ip": "10.0.0.12",
	            "id": "002",
	            "name": "dmz001"
	         },
	         {
	            "status": "Never connected",
	            "ip": "10.0.0.14",
	            "id": "004",
	            "name": "dmz002"
	         },
	         {
	            "status": "Never connected",
	            "ip": "10.0.0.9",
	            "id": "006",
	            "name": "NewHost"
	         },
	         {
	            "status": "Never connected",
	            "ip": "any",
	            "id": "007",
	            "name": "myNewAgent"
	         },
	         {
	            "status": "Never connected",
	            "ip": "10.0.10.10",
	            "id": "123",
	            "name": "NewHost_2"
	         }
	      ]
	   }
	}


Get info about files in cluster
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the state of each file in the cluster

**Request**:

``GET`` ::

	/cluster/files

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/cluster/files?pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "192.168.1.135": {
	         "synchronized": [
	            "/etc/shared/dmz/cis_rhel6_linux_rcl.txt"
	         ]
	      }
	   }
	}


Get nodes info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the Nodes info

**Request**:

``GET`` ::

	/cluster/nodes

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
	            "url": "localhost",
	            "node": "node01",
	            "status": "connected",
	            "cluster": "wazuh"
	         },
	         {
	            "url": "192.168.1.135",
	            "node": "node02",
	            "status": "connected",
	            "cluster": "wazuh"
	         }
	      ]
	   }
	}



Status
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



config
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
	      "interval": "2m",
	      "node_name": "ubuntu_node",
	      "bind_addr": "0.0.0.0",
	      "node_type": "master",
	      "key": "dcb3640dc9bb2b136fe1a942c3cad892",
	      "nodes": [
	         "192.168.1.36",
	         "192.168.1.135"
	      ],
	      "port": "1516"
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
	      "totalItems": 527,
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
	      "totalItems": 90,
	      "items": [
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0090-dragon-nids_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0440-proxmox-ve_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0125-hp_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0430-cylance_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0380-windows_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0190-openvpn_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0395-sqlserver_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0065-cisco-ios_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0275-sendmail_decoders.xml"
	         },
	         {
	            "status": "enabled",
	            "path": "/var/ossec/ruleset/decoders",
	            "file": "0425-qualysguard_decoders.xml"
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
	      "totalItems": 133,
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
	            "name": "pvedaemon",
	            "details": {
	               "program_name": "^pvedaemon"
	            },
	            "file": "0440-proxmox-ve_decoders.xml",
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
	      "email_to": "recipient@example.wazuh.com",
	      "logall": "no",
	      "email_maxperhour": "12",
	      "white_list": [
	         "127.0.0.1",
	         "^localhost.localdomain$",
	         "127.0.1.1"
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
	      "compilation_date": "Tue Feb 13 00:51:40 PST 2018",
	      "version": "v3.2.0",
	      "openssl_support": "yes",
	      "max_agents": "8000",
	      "ruleset_version": "3206",
	      "path": "/var/ossec",
	      "tz_name": "PST",
	      "type": "manager",
	      "tz_offset": "-0800"
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
	    "data": {
	        "totalItems": 16480,
	        "items": [
	            "2016/07/15 09:33:49 ossec-syscheckd: INFO: Syscheck scan frequency: 3600 seconds",
	            "2016/07/15 09:33:49 ossec-syscheckd: INFO: Starting syscheck scan (forwarding database).",
	            "2016/07/15 09:33:49 ossec-syscheckd: INFO: Starting syscheck database (pre-scan).",
	            "2016/07/15 09:33:42 ossec-logcollector: INFO: Started (pid: 2832).",
	            "2016/07/15 09:33:42 ossec-logcollector: INFO: Monitoring output of command(360): df -P"
	        ]
	    },
	    "error": 0
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
	         "info": 4,
	         "all": 4,
	         "error": 0
	      },
	      "wazuh-modulesd:oscap": {
	         "info": 4,
	         "all": 4,
	         "error": 0
	      },
	      "wazuh-db": {
	         "info": 7,
	         "all": 7,
	         "error": 0
	      },
	      "wazuh-modulesd:ciscat": {
	         "info": 4,
	         "all": 4,
	         "error": 0
	      },
	      "ossec-rootcheck": {
	         "info": 6,
	         "all": 6,
	         "error": 0
	      },
	      "ossec-monitord": {
	         "info": 7,
	         "all": 7,
	         "error": 0
	      },
	      "ossec-logcollector": {
	         "info": 43,
	         "all": 47,
	         "error": 4
	      },
	      "ossec-execd": {
	         "info": 10,
	         "all": 10,
	         "error": 0
	      },
	      "ossec-remoted": {
	         "info": 19,
	         "all": 23,
	         "error": 4
	      },
	      "ossec-syscheckd": {
	         "info": 95,
	         "all": 95,
	         "error": 0
	      },
	      "wazuh-clusterd-internal": {
	         "info": 2,
	         "all": 2,
	         "error": 0
	      },
	      "wazuh-clusterd-internal:inotify": {
	         "info": 26,
	         "all": 26,
	         "error": 0
	      },
	      "ossec-analysisd": {
	         "info": 835,
	         "all": 835,
	         "error": 0
	      },
	      "wazuh-modulesd:database": {
	         "info": 4,
	         "all": 7,
	         "error": 3
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
	      "start": "2018-02-13 01:00:12",
	      "end": "2018-02-13 01:00:41"
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
	      "totalItems": 5,
	      "items": [
	         "1.4 Debian Linux",
	         "2.3 Debian Linux",
	         "4.13 Debian Linux",
	         "7.2 Debian Linux",
	         "7.3 Debian Linux"
	      ]
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

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rootcheck/000?offset=0&limit=2&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 14,
	      "items": [
	         {
	            "status": "outstanding",
	            "oldDay": "2018-02-13 01:00:14",
	            "cis": "1.4 Debian Linux",
	            "readDay": "2018-02-13 01:00:14",
	            "event": "System Audit: CIS - Debian Linux - 1.4 - Robust partition scheme - /opt is not on its own partition {CIS: 1.4 Debian Linux}. File: /opt. Reference: https://benchmarks.cisecurity.org/tools2/linux/CIS_Debian_Benchmark_v1.0.pdf ."
	         },
	         {
	            "status": "outstanding",
	            "oldDay": "2018-02-13 01:00:14",
	            "cis": "1.4 Debian Linux",
	            "readDay": "2018-02-13 01:00:14",
	            "event": "System Audit: CIS - Debian Linux - 1.4 - Robust partition scheme - /tmp is not on its own partition {CIS: 1.4 Debian Linux}. File: /etc/fstab. Reference: https://benchmarks.cisecurity.org/tools2/linux/CIS_Debian_Benchmark_v1.0.pdf ."
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
	      "totalItems": 3,
	      "items": [
	         "2.2.2",
	         "2.2.4",
	         "4.1"
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

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/rules?offset=0&limit=2&pretty"

**Example Response:**
::

	{
	   "error": 0,
	   "data": {
	      "totalItems": 1579,
	      "items": [
	         {
	            "status": "enabled",
	            "pci": [],
	            "description": "Generic template for all syslog rules.",
	            "file": "0010-rules_config.xml",
	            "level": 0,
	            "path": "/var/ossec/ruleset/rules",
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
	            "file": "0010-rules_config.xml",
	            "level": 0,
	            "path": "/var/ossec/ruleset/rules",
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
	      "totalItems": 102,
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
	      "totalItems": 283,
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
	            "groups": [
	               "gpg13_4.3",
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
	      "start": "2018-02-13 01:00:08",
	      "end": "2018-02-13 01:00:12"
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
	    "data": {
	        "totalItems": 2762,
	        "items": [
	            {
	                "size": 157721,
	                "uid": 0,
	                "scanDate": "2017-03-02 23:43:28",
	                "user": "root",
	                "file": "!1488498208 /boot/config-3.16.0-4-amd64",
	                "modificationDate": "2016-10-19 06:45:50",
	                "octalMode": "100644",
	                "inode": 5217,
	                "event": "added",
	                "permissions": "-rw-r--r--",
	                "sha1": "4fed08ccbd0168593a6fffcd925adad65e5ae6d9",
	                "group": "root",
	                "gid": 0,
	                "md5": "46d43391ae54c1084a2d40e8d1b4873c"
	            },
	            {
	                "size": 2679264,
	                "uid": 0,
	                "scanDate": "2017-03-02 23:43:26",
	                "user": "root",
	                "file": "!1488498206 /boot/System.map-3.16.0-4-amd64",
	                "modificationDate": "2016-10-19 06:45:50",
	                "octalMode": "100644",
	                "inode": 5216,
	                "event": "added",
	                "permissions": "-rw-r--r--",
	                "sha1": "d48151a3d3638b723f5d7bc1e9c71d478fcde4e6",
	                "group": "root",
	                "gid": 0,
	                "md5": "29cc12246faecd4a14d212b4d9bac0fe"
	            }
	        ]
	    },
	    "error": 0
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
Syscollector
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

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/hardware?pretty"

**Example Response:**
::

	{
	    "data": {
	        "ram": {
	            "total": 1883804,
	            "free": 1114784
	        },
	        "scan": {
	            "id": 826635219,
	            "time": "2018/02/12 23:21:10"
	        },
	        "cpu": {
	            "cores": 1,
	            "mhz": 1795.917,
	            "name": "Intel(R) Core(TM) i5-3337U CPU @ 1.80GHz"
	        },
	        "board_serial": "BSS-24TR232FGF25"
	    },
	    "error": 0
	}

Get hardware info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's hardware info

**Request**:

``GET`` ::

	/syscollector/hardware

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

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/hardware?pretty&sort=-ram_free"

**Example Response:**
::

	{
	    "data": {
	        "totalItems": 3,
	        "items": [
	            {
	                "ram_free": 5351420,
	                "scan_id": 565830616,
	                "agent_id": "002",
	                "ram_total": 6291000,
	                "board_serial": "BSS-41SGRW31214",
	                "scan_time": "2018/02/12 16:09:45",
	                "cpu_mhz": 1796,
	                "cpu_name": "Intel(R) Core(TM) i5-3337U CPU @ 1.80GHz",
	                "cpu_cores": 4
	            },
	            {
	                "ram_free": 2374568,
	                "scan_id": 263523550,
	                "agent_id": "001",
	                "ram_total": 2988700,
	                "board_serial": "BSS-2524522AAAF4",
	                "scan_time": "2018/02/12 16:47:29",
	                "cpu_mhz": 1795.917,
	                "cpu_name": " Intel(R) Core(TM) i5-3337U CPU @ 1.80GHz",
	                "cpu_cores": 2
	            },
	            {
	                "ram_free": 950384,
	                "scan_id": 22856332,
	                "agent_id": "000",
	                "ram_total": 1883804,
	                "board_serial": "BSS-675RG5GYTTTW3",
	                "scan_time": "2018/02/13 00:24:30",
	                "cpu_mhz": 1795.917,
	                "cpu_name": "Intel(R) Core(TM) i5-3337U CPU @ 1.80GHz",
	                "cpu_cores": 4
	            }
	        ]
	    },
	    "error": 0
	}

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

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/os?pretty"

**Example Response:**
::

	{
	    "data": {
	        "sysname": "centos",
	        "scan": {
	            "id": 1363438688,
	            "time": "2018/02/12 23:21:10"
	        },
	        "hostname": "node01",
	        "version": "3.10.0-514.el7.x86_64",
	        "architecture": "x86_64",
	        "release": "Linux",
	        "os": {
	            "version": "7 (Core)",
	            "name": "CentOS Linux"
	        }
	    },
	    "error": 0
	}

Get os info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's os info

**Request**:

``GET`` ::

	/syscollector/os

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

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/os?pretty&sort=-os_name"

**Example Response:**
::

	{
	    "data": {
	        "totalItems": 3,
	        "items": [
	            {
	                "scan_id": 1857569867,
	                "os_name": "Microsoft Windows 7 Home Premium",
	                "scan_time": "2018/02/12 16:09:44",
	                "hostname": "WAZUH-PC",
	                "os_version": "6.1.7601",
	                "architecture": "i686",
	                "agent_id": "002"
	            },
	            {
	                "sysname": "centos",
	                "scan_id": 686817457,
	                "os_name": "CentOS Linux",
	                "version": "3.10.0-514.el7.x86_64",
	                "os_version": "7 (Core)",
	                "scan_time": "2018/02/13 00:24:30",
	                "release": "Linux",
	                "hostname": "node01",
	                "agent_id": "000",
	                "architecture": "x86_64"
	            },
	            {
	                "sysname": "centos",
	                "scan_id": 1004984843,
	                "os_name": "CentOS Linux",
	                "version": "3.10.0-514.el7.x86_64",
	                "os_version": "7 (Core)",
	                "scan_time": "2018/02/12 16:47:29",
	                "release": "Linux",
	                "hostname": "manager",
	                "agent_id": "001",
	                "architecture": "x86_64"
	            }
	        ]
	    },
	    "error": 0
	}

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

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/000/packages?pretty&limit=2&offset=10&sort=-name"

**Example Response:**
::

	{
	    "data": {
	        "totalItems": 372,
	        "items": [
	            {
	                "scan_id": 1516906568,
	                "version": "1.1.0-1.el7",
	                "vendor": "CentOS",
	                "description": "ALSA tools for uploading firmware to some soundcards",
	                "name": "alsa-tools-firmware",
	                "format": "rpm",
	                "scan_time": "2018/02/12 23:21:10",
	                "architecture": "x86_64"
	            },
	            {
	                "scan_id": 1516906568,
	                "version": "2.6.5-3.el7",
	                "vendor": "CentOS",
	                "description": "User space tools for 2.6 kernel auditing",
	                "name": "audit",
	                "format": "rpm",
	                "scan_time": "2018/02/12 23:21:10",
	                "architecture": "x86_64"
	            }
	        ]
	    },
	    "error": 0
	}

Get packages info of all agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns the agent's packages info

**Request**:

``GET`` ::

	/syscollector/packages

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

**Example Request:**
::

	curl -u foo:bar -k -X GET "https://127.0.0.1:55000/syscollector/packages?pretty&sort=-name&limit=2&offset=4"

**Example Response:**
::

	{
	    "data": {
	        "totalItems": 2,
	        "items": [
	            {
	                "scan_id": 373751880,
	                "version": "1:1.4.0-12.el7",
	                "vendor": "CentOS",
	                "description": "Wifi plugin for NetworkManager",
	                "name": "NetworkManager-wifi",
	                "format": "rpm",
	                "scan_time": "2018/02/13 00:24:30",
	                "architecture": "x86_64",
	                "agent_id": "000"
	            },
	            {
	                "scan_id": 373751880,
	                "version": "1:1.4.0-12.el7",
	                "vendor": "CentOS",
	                "description": "NetworkManager curses-based UI",
	                "name": "NetworkManager-tui",
	                "format": "rpm",
	                "scan_time": "2018/02/13 00:24:30",
	                "architecture": "x86_64",
	                "agent_id": "000"
	            }
	        ]
	    },
	    "error": 0
	}
