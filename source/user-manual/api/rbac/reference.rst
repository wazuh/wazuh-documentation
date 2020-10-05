.. Copyright (C) 2020 Wazuh, Inc.

.. Section marks used on this document:
.. h0 ======================================
.. h1 --------------------------------------
.. h2 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. h3 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. h4 ######################################
.. h5 ::::::::::::::::::::::::::::::::::::::

.. _api_rbac_reference:

RBAC Reference
==============

RBAC policies are made up of three elements: **actions**, **resources** and **effect**. Each API endpoint involves one or more actions and can be performed on specific resources.

For example, to obtain the information of one or all agents use the ``GET /agents`` endpoint. This endpoint applies the action ``agent:read`` on the resource ``agent:id``. For example, ``agent:id:001`` (agent 001) or ``agent:id:*`` (all agents). All the existing resources, available actions and the endpoints affected by each one can be found in this reference page.

This reference also contains a set of default roles and policies that can be immediately used instead of having to create new ones.

`Resources`_
    - `*:*`_
    - `agent:group`_
    - `agent:id`_
    - `group:id`_
    - `node:id`_
    - `file:path`_
    - `decoder:file`_
    - `list:path`_
    - `rule:file`_
    - `policy:id`_
    - `role:id`_
    - `rule:id`_
    - `user:id`_

`Actions`_
    - `Active_response`_
        - `active-response:command`_

    - `Agent`_
        - `agent:create`_
        - `agent:delete`_
        - `agent:modify_group`_
        - `agent:read`_
        - `agent:restart`_
        - `agent:upgrade`_

    - `Ciscat`_
        - `ciscat:read`_

    - `Cluster`_
        - `cluster:delete_file`_
        - `cluster:read_api_config`_
        - `cluster:read`_
        - `cluster:read_file`_
        - `cluster:restart`_
        - `cluster:status`_
        - `cluster:update_api_config`_
        - `cluster:upload_file`_

    - `Decoders`_
        - `decoders:read`_

    - `Group`_
        - `group:create`_
        - `group:delete`_
        - `group:modify_assignments`_
        - `group:read`_
        - `group:update_config`_

    - `Lists`_
        - `lists:read`_

    - `Manager`_
        - `manager:delete_file`_
        - `manager:read_api_config`_
        - `manager:read`_
        - `manager:read_file`_
        - `manager:restart`_
        - `manager:update_api_config`_
        - `manager:upload_file`_

    - `Mitre`_
        - `mitre:read`_

    - `Rules`_
        - `rules:read`_

    - `SCA`_
        - `sca:read`_

    - `Security`_
        - `security:create_user`_
        - `security:create`_
        - `security:delete`_
        - `security:read_config`_
        - `security:read`_
        - `security:revoke`_
        - `security:update_config`_
        - `security:update`_

    - `Syscheck`_
        - `syscheck:clear`_
        - `syscheck:read`_
        - `syscheck:run`_

    - `Syscollector`_
        - `syscollector:read`_

`Default policies`_
    - `agents_all`_
    - `agents_commands`_
    - `agents_read`_
    - `ciscat_read`_
    - `cluster_all`_
    - `cluster_read`_
    - `decoders_read`_
    - `rules_read`_
    - `security_all`_
    - `users_all`_

`Default roles`_
    - `administrator`_
    - `agents_admin`_
    - `agents_readonly`_
    - `cluster_admin`_
    - `cluster_readonly`_
    - `readonly`_
    - `users_admin`_

Resources
-----------

`*:*`
^^^^^^

+-----------------+-----------------------------------------------------------------------------------------------------------------------------------------+
| **Description** | Resource applied in functions acting on resources that do not yet exist in the system. We call these functions, resourceless functions. |
+-----------------+-----------------------------------------------------------------------------------------------------------------------------------------+
| **Example**     | agent:create                                                                                                                            |
+-----------------+-----------------------------------------------------------------------------------------------------------------------------------------+

agent:group
^^^^^^^^^^^
+-----------------+---------------------------------+
| **Description** | Reference agents via group name |
+-----------------+---------------------------------+
| **Example**     | agent:group:web                 |
+-----------------+---------------------------------+

agent:id
^^^^^^^^^

+-----------------+-------------------------------+
| **Description** | Reference agents via agent ID |
+-----------------+-------------------------------+
| **Example**     | agent:id:001                  |
+-----------------+-------------------------------+

group:id
^^^^^^^^

+-----------------+-------------------------------------+
| **Description** | Reference agent groups via group ID |
+-----------------+-------------------------------------+
| **Example**     | group:id:default                    |
+-----------------+-------------------------------------+

node:id
^^^^^^^

+-----------------+------------------------------------+
| **Description** | Reference cluster node via node ID |
+-----------------+------------------------------------+
| **Example**     | node:id:worker1                    |
+-----------------+------------------------------------+

`file:path`
^^^^^^^^^^^^^

+-----------------+----------------------------------+
| **Description** | Reference file via its path      |
+-----------------+----------------------------------+
| **Example**     | file:path:etc/rules/new_rule.xml |
+-----------------+----------------------------------+

decoder:file
^^^^^^^^^^^^

+-----------------+--------------------------------------+
| **Description** | Reference decoder file via its path  |
+-----------------+--------------------------------------+
| **Example**     | decoder:file:0005-wazuh_decoders.xml |
+-----------------+--------------------------------------+

list:path
^^^^^^^^^^

+-----------------+----------------------------------+
| **Description** | Reference list file via its path |
+-----------------+----------------------------------+
| **Example**     | list:path:etc/lists/audit-keys   |
+-----------------+----------------------------------+

rule:file
^^^^^^^^^^

+-----------------+---------------------------------------+
| **Description** | Reference rule file via its path      |
+-----------------+---------------------------------------+
| **Example**     | rule:file:0610-win-ms_logs_rules.xml  |
+-----------------+---------------------------------------+

policy:id
^^^^^^^^^

+-----------------+--------------------------------------+
| **Description** | Reference security policy via its id |
+-----------------+--------------------------------------+
| **Example**     | policy:id:1                          |
+-----------------+--------------------------------------+

role:id
^^^^^^^

+-----------------+------------------------------------+
| **Description** | Reference security role via its id |
+-----------------+------------------------------------+
| **Example**     | role:id:1                          |
+-----------------+------------------------------------+

rule:id
^^^^^^^

+-----------------+------------------------------------+
| **Description** | Reference security rule via its id |
+-----------------+------------------------------------+
| **Example**     | rule:id:1                          |
+-----------------+------------------------------------+

user:id
^^^^^^^

+-----------------+------------------------------------+
| **Description** | Reference security user via its id |
+-----------------+------------------------------------+
| **Example**     | user:id:1                          |
+-----------------+------------------------------------+


Actions
-------

In each action, the affected endpoints are specified along with the necessary resources, following this structure: <Method> <Endpoint> (<Resource>)

Active_response
^^^^^^^^^^^^^^^
active-response:command
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /active-response (`agent:id`_)


Agent
^^^^^^^^^^^^^^^
agent:create
~~~~~~~~~~~~~~~~~~~~~~~~~~
- POST /agents (`*:*`_)
- POST /agents/insert (`*:*`_)
- POST /agents/insert/quick (`*:*`_)

agent:delete
~~~~~~~~~~~~
- DELETE /agents (`agent:id`_)

agent:modify_group
~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /agents/group (`agent:id`_)
- PUT /agents/{agent_id}/group/{group_id} (`agent:id`_)
- DELETE /agents/group (`agent:id`_)
- DELETE /agents/{agent_id}/group (`agent:id`_)
- DELETE /agents/{agent_id}/group/{group_id} (`agent:id`_)
- DELETE /groups (`agent:id`_)

agent:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /agents (`agent:id`_)
- GET /agents/no_group (`agent:id`_)
- GET /agents/outdated (`agent:id`_)
- GET /agents/stats/distinct (`agent:id`_)
- GET /agents/summary/os (`agent:id`_)
- GET /agents/summary/status (`agent:id`_)
- GET /agents/{agent_id}/config/{component}/{configuration} (`agent:id`_)
- GET /agents/{agent_id}/group/is_sync (`agent:id`_)
- GET /agents/{agent_id}/key (`agent:id`_)
- GET /groups/{group_id}/agents (`agent:id`_)
- GET /overview/agents (`agent:id`_)

agent:restart
~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /agents/restart (`agent:id`_)
- PUT /agents/node/{node_id}/restart (`agent:id`_)
- PUT /agents/{agent_id}/restart (`agent:id`_)
- PUT /agents/group/{group_id}/restart (`agent:id`_)

agent:upgrade
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /agents/{agent_id}/upgrade_result (`agent:id`_)
- PUT /agents/{agent_id}/upgrade (`agent:id`_)
- PUT /agents/{agent_id}/upgrade_custom (`agent:id`_)


Ciscat
^^^^^^^
ciscat:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /ciscat/{agent_id}/results (`agent:id`_)
- GET /experimental/ciscat/results (`agent:id`_)


Cluster
^^^^^^^
cluster:delete_file
~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /cluster/{node_id}/files (`node:id<node>`)
- DELETE /cluster/{node_id}/files (`node:id:<node>&file:path:<file_path>`)

cluster:read_api_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /cluster/api/config (`node:id`_)

cluster:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /agents/node/{node_id}/restart (`node:id`_)
- GET /cluster/configuration/validation (`node:id`_)
- GET /cluster/healthcheck (`node:id`_)
- GET /cluster/local/config (`node:id`_)
- GET /cluster/local/info (`node:id`_)
- GET /cluster/nodes (`node:id`_)
- GET /cluster/{node_id}/configuration (`node:id`_)
- GET /cluster/{node_id}/configuration/{component}/{configuration} (`node:id`_)
- GET /cluster/{node_id}/files (`node:id`_)
- PUT /cluster/{node_id}/files (`node:id`_)
- DELETE /cluster/{node_id}/files (`node:id`_)
- GET /cluster/{node_id}/info (`node:id`_)
- GET /cluster/{node_id}/logs (`node:id`_)
- GET /cluster/{node_id}/logs/summary (`node:id`_)
- GET /cluster/{node_id}/stats (`node:id`_)
- GET /cluster/{node_id}/stats/analysisd (`node:id`_)
- GET /cluster/{node_id}/stats/hourly (`node:id`_)
- GET /cluster/{node_id}/stats/remoted (`node:id`_)
- GET /cluster/{node_id}/stats/weekly (`node:id`_)
- GET /cluster/{node_id}/status (`node:id`_)
- PUT /cluster/restart (`node:id`_)

cluster:read_file
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /cluster/{node_id}/files (`node:id:<node>&file:path:<file_path>`)

cluster:restart
~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /cluster/restart (`node:id`_)

cluster:status
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /cluster/status (`*:*`_)

cluster:update_api_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /cluster/api/config (`node:id`_)
- DELETE /cluster/api/config (`node:id`_)

cluster:upload_file
~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /cluster/{node_id}/files (`node:id`_)


Decoders
^^^^^^^^^^^^^^^
decoders:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /decoders (`decoder:file`_)
- GET /decoders/files (`decoder:file`_)
- GET /decoders/files/{filename}/download (`decoder:file`_)
- GET /decoders/parents (`decoder:file`_)

Group
^^^^^^^^^^^^^^^
group:create
~~~~~~~~~~~~~~~~~~~~~~~~~~
- POST /groups (`*:*`_)

group:delete
~~~~~~~~~~~~~~~~~~~~~~~~~~
- DELETE /groups (`group:id`_)

group:modify_assignments
~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /agents/group (`group:id`_)
- PUT /agents/{agent_id}/group/{group_id} (`group:id`_)
- DELETE /agents/group (`group:id`_)
- DELETE /agents/{agent_id}/group (`group:id`_)
- DELETE /agents/{agent_id}/group/{group_id} (`group:id`_)
- DELETE /groups (`group:id`_)

group:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /groups (`group:id`_)
- GET /groups/{group_id}/agents (`group:id`_)
- GET /groups/{group_id}/configuration (`group:id`_)
- GET /groups/{group_id}/files (`group:id`_)
- GET /groups/{group_id}/files/{file_name}/json (`group:id`_)
- GET /groups/{group_id}/files/{file_name}/xml (`group:id`_)
- GET /overview/agents (`group:id`_)

group:update_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /groups/{group_id}/configuration (`group:id`_)


Lists
^^^^^^^^^^^^^^^
lists:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /lists (`list:path`_)
- GET /lists/files (`list:path`_)


Manager
^^^^^^^^^^^^^^^
manager:delete_file
~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /manager/files (`*:*`_)
- DELETE /manager/files (`file:path`_)

manager:read_api_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /manager/api/config (`*:*`_)

manager:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /manager/configuration (`*:*`_)
- GET /manager/configuration/validation (`*:*`_)
- GET /manager/configuration/{component}/{configuration} (`*:*`_)
- GET /manager/files (`*:*`_)
- PUT /manager/files (`*:*`_)
- DELETE /manager/files (`*:*`_)
- GET /manager/info (`*:*`_)
- GET /manager/logs (`*:*`_)
- GET /manager/logs/summary (`*:*`_)
- GET /manager/stats (`*:*`_)
- GET /manager/stats/analysisd (`*:*`_)
- GET /manager/stats/hourly (`*:*`_)
- GET /manager/stats/remoted (`*:*`_)
- GET /manager/stats/weekly (`*:*`_)
- GET /manager/status (`*:*`_)
- PUT /manager/restart (`*:*`_)

manager:read_file
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /manager/files (`file:path`_)

manager:restart
~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /manager/restart (`*:*`_)

manager:update_api_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /manager/api/config (`*:*`_)
- DELETE /manager/api/config (`*:*`_)

manager:upload_file
~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /manager/files (`*:*`_)


Mitre
^^^^^^^^^^^^^^^
mitre:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /mitre (`*:*`_)

Rules
^^^^^^^^^^^^^^^
rules:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /rules (`rule:file`_)
- GET /rules/files (`rule:file`_)
- GET /rules/files/{filename}/download (`rule:file`_)
- GET /rules/groups (`rule:file`_)
- GET /rules/requirement/{requirement} (`rule:file`_)


SCA
^^^^^^^^^^^^^^^
sca:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /sca/{agent_id} (`agent:id`_)
- GET /sca/{agent_id}/checks/{policy_id} (`agent:id`_)


Security
^^^^^^^^^^^^^^^
security:create_user
~~~~~~~~~~~~~~~~~~~~~~~~~~
- POST /security/users (`*:*`_)

security:create
~~~~~~~~~~~~~~~~~~~~~~~~~~
- POST /security/policies (`*:*`_)
- POST /security/roles (`*:*`_)
- POST /security/rules (`*:*`_)

security:delete
~~~~~~~~~~~~~~~~~~~~~~~~~~
- DELETE /security/policies (`policy:id`_)
- DELETE /security/roles (`role:id`_)
- DELETE /security/rules (`rule:id`_)
- DELETE /security/roles/{role_id}/policies (`role:id`_, `policy:id`_)
- DELETE /security/roles/{role_id}/rules (`role:id`_, `rule:id`_)
- DELETE /security/users (`user:id`_)
- DELETE /security/users/{username}/roles (`user:id`_, `role:id`_)

security:read_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /security/config (`*:*`_)

security:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /security/policies (`policy:id`_)
- GET /security/roles (`role:id`_)
- GET /security/rules (`rule:id`_)
- GET /security/users (`user:id`_)

security:revoke
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /security/user/authenticate (`*:*`_)

security:update_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /security/config (`*:*`_)
- DELETE /security/config (`*:*`_)

security:update
~~~~~~~~~~~~~~~~~~~~~~~~~~
- POST /security/roles/{role_id}/policies (`role:id`_, `policy:id`_)
- POST /security/users/{username}/roles (`user:id`_, `role:id`_)
- PUT /security/policies/{policy_id} (`policy:id`_)
- PUT /security/roles/{role_id} (`role:id`_)
- PUT /security/rules/{rule_id} (`rule:id`_)
- PUT /security/users/{username} (`user:id`_)


Syscheck
^^^^^^^^^^^^^^^
syscheck:clear
~~~~~~~~~~~~~~~~~~~~~~~~~~
- DELETE /experimental/syscheck (`agent:id`_)
- DELETE /syscheck/{agent_id} (`agent:id`_)

syscheck:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /syscheck/{agent_id} (`agent:id`_)
- GET /syscheck/{agent_id}/last_scan (`agent:id`_)

syscheck:run
~~~~~~~~~~~~~~~~~~~~~~~~~~
- PUT /syscheck (`agent:id`_)


Syscollector
^^^^^^^^^^^^^^^
syscollector:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- GET /experimental/syscollector/hardware (`agent:id`_)
- GET /experimental/syscollector/hotfixes (`agent:id`_)
- GET /experimental/syscollector/netaddr (`agent:id`_)
- GET /experimental/syscollector/netiface (`agent:id`_)
- GET /experimental/syscollector/netproto (`agent:id`_)
- GET /experimental/syscollector/os (`agent:id`_)
- GET /experimental/syscollector/packages (`agent:id`_)
- GET /experimental/syscollector/ports (`agent:id`_)
- GET /experimental/syscollector/processes (`agent:id`_)
- GET /syscollector/{agent_id}/hardware (`agent:id`_)
- GET /syscollector/{agent_id}/hotfixes (`agent:id`_)
- GET /syscollector/{agent_id}/netaddr (`agent:id`_)
- GET /syscollector/{agent_id}/netiface (`agent:id`_)
- GET /syscollector/{agent_id}/netproto (`agent:id`_)
- GET /syscollector/{agent_id}/os (`agent:id`_)
- GET /syscollector/{agent_id}/packages (`agent:id`_)
- GET /syscollector/{agent_id}/ports (`agent:id`_)
- GET /syscollector/{agent_id}/processes (`agent:id`_)


Default policies
----------------
agents_all
^^^^^^^^^^^^^^^
Grant full access to all agents related functionalities.

Actions
    - `agent:read`_
    - `agent:create`_
    - `agent:delete`_
    - `agent:modify_group`_
    - `agent:restart`_
    - `agent:upgrade`_
    - `group:read`_
    - `group:delete`_
    - `group:create`_
    - `group:update_config`_
    - `group:modify_assignments`_

Resources
    - ``agent:id:*``
    - ``group:id:*``
    - ``*:*:*``

Effect
    - allow

agents_commands
^^^^^^^^^^^^^^^
Allow sending commands to agents.

Actions
    - `active-response:command`_

Resources
    - ``agent:id:*``

Effect
    - allow

agents_read
^^^^^^^^^^^^^^^
Grant read access to all agents related functionalities.

Actions
    - `agent:read`_
    - `group:read`_

Resources
    - ``agent:id:*``
    - ``group:id:*``

Effect
    - allow

ciscat_read
^^^^^^^^^^^^^^^
Allow read agent’s ciscat results information.

Actions
    - `ciscat:read`_

Resources
    - ``agent:id:*``

Effect
    - allow

cluster_all
^^^^^^^^^^^^^^^
Provide full access to all cluster/manager related functionalities.

Actions
    - `cluster:read`_
    - `cluster:read_api_config`_
    - `cluster:update_api_config`_
    - `cluster:restart`_
    - `cluster:status`_
    - `cluster:read_file`_
    - `cluster:upload_file`_
    - `cluster:delete_file`_
    - `manager:read`_
    - `manager:read_api_config`_
    - `manager:update_api_config`_
    - `manager:delete_file`_
    - `manager:read_file`_
    - `manager:upload_file`_
    - `manager:restart`_

Resources
    - ``file:path:*``
    - ``node:id:*``
    - ``node:id:*&file:path:*``
    - ``'*:*:*'``
    - ``file:path:*``
    - ``node:id:*``
    - ``node:id:*&file:path:*``
    - ``*:*:*``

Effect
    - allow

cluster_read
^^^^^^^^^^^^^^^
Provide read access to all cluster/manager related functionalities.

Actions
    - `cluster:read`_
    - `cluster:read_api_config`_
    - `cluster:status`_
    - `cluster:read_file`_
    - `manager:read`_
    - `manager:read_api_config`_
    - `manager:read_file`_

Resources
    - ``agent:id:*``
    - ``group:id:*``

Effect
    - allow

decoders_read
^^^^^^^^^^^^^^^
Allow read all decoder files in the system.

Actions
    - `decoders:read`_

Resources
    - ``decoder:file:*``

Effect
    - allow

mitre_read
^^^^^^^^^^^^^^^
Allow read MITRE database information.

Actions
    - `mitre:read`_

Resources
    - ``*:*:*``

Effect
    - allow

rules_read
^^^^^^^^^^^^^^^
Allow read all rule files in the system.

Actions
    - `rules:read`_

Resources
    - ``rules:file:*``

Effect
    - allow

security_all
^^^^^^^^^^^^^^^
Provide full access to all security related functionalities.

Actions
    - `security:create`_
    - `security:create_user`_
    - `security:delete`_
    - `security:read`_
    - `security:read_config`_
    - `security:revoke`_
    - `security:update`_
    - `security:update_config`_

Resources
    - ``role:id:*``
    - ``policy:id:*``
    - ``user:id:*``
    - ``*:*:*``

Effect
    - allow

users_all
^^^^^^^^^^^^^^^
Provide full access to all users related functionalities.

Actions
    - `security:read`_
    - `security:create_user`_
    - `security:update`_
    - `security:revoke`_
    - `security:delete`_

Resources
    - ``user:id:*``
    - ``*:*:*``

Effect
    - allow

Default roles
-------------
administrator
^^^^^^^^^^^^^
Administrator role of the system, this role have full access to the system.

Policies
    - `agents_all`_
    - `agents_commands`_
    - `security_all`_
    - `cluster_all`_
    - `ciscat_read`_
    - `decoders_read`_
    - `mitre_read`_
    - `rules_read`_

agents_admin
^^^^^^^^^^^^
Agents administrator of the system, this role have full access to all agents related functionalities.

Policies
    - `agents_all`_

agents_readonly
^^^^^^^^^^^^^^^^
Read only role for agents related functionalities.

Policies
    - `agents_read`_

cluster_admin
^^^^^^^^^^^^^
Manager administrator of the system, this role have full access to all manager related functionalities.

Policies
    - `cluster_all`_

cluster_readonly
^^^^^^^^^^^^^^^^
Read only role for manager related functionalities.

Policies
    - `cluster_read`_

readonly
^^^^^^^^^^^^
Read only role, this role can read all the information of the system.

Policies
    - `agents_read`_
    - `ciscat_read`_
    - `decoders_read`_
    - `mitre_read`_
    - `rules_read`_

users_admin
^^^^^^^^^^^^
Users administrator of the system, this role have full access to all users related functionalities.

Policies
    - `users_all`_
