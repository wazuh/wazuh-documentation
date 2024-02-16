.. Copyright (C) 2015, Wazuh, Inc.

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

RBAC policies are made up of three elements: **actions**, **resources**, and **effect**. Each API endpoint involves one or more actions and can be performed on specific resources.

For example, the :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>` endpoint is used to obtain the information of one or all agents. This endpoint applies the action ``agent:read`` on the resource ``agent:id`` or ``agent:group``. For example, ``agent:id:001`` (agent 001) or ``agent:id:*`` (all agents). All the existing resources, available actions, and the endpoints affected by each one can be found on this reference page.

This reference also contains a set of default roles and policies that can be immediately used instead of having to create new ones.

`Resources`_
    - `*:*`_
    - `agent:group`_
    - `agent:id`_
    - `group:id`_
    - `node:id`_
    - `decoder:file`_
    - `list:file`_
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
        - `agent:reconnect`_
        - `agent:restart`_
        - `agent:upgrade`_

    - `Ciscat`_
        - `ciscat:read`_

    - `Cluster`_
        - `cluster:read_api_config`_
        - `cluster:read`_
        - `cluster:restart`_
        - `cluster:status`_
        - `cluster:update_config`_

    - `Decoders`_
        - `decoders:read`_
        - `decoders:update`_
        - `decoders:delete`_

    - `Events`_
        - `event:ingest`_

    - `Group`_
        - `group:create`_
        - `group:delete`_
        - `group:modify_assignments`_
        - `group:read`_
        - `group:update_config`_

    - `Lists`_
        - `lists:read`_
        - `lists:update`_
        - `lists:delete`_

    - `Logtest`_
        - `logtest:run`_

    - `Manager`_
        - `manager:read_api_config`_
        - `manager:read`_
        - `manager:restart`_
        - `manager:update_config`_

    - `Mitre`_
        - `mitre:read`_

    - `Rootcheck`_
        - `rootcheck:clear`_
        - `rootcheck:read`_
        - `rootcheck:run`_

    - `Rules`_
        - `rules:read`_
        - `rules:update`_
        - `rules:delete`_

    - `SCA`_
        - `sca:read`_

    - `Security`_
        - `security:create_user`_
        - `security:create`_
        - `security:delete`_
        - `security:edit_run_as`_
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

    - `Task`_
        - `task:status`_

    - `Vulnerability`_
        - `vulnerability:read`_

`Default policies`_
    - `agents_all`_
    - `agents_commands`_
    - `agents_read`_
    - `ciscat_read`_
    - `cluster_all`_
    - `cluster_read`_
    - `decoders_all`_
    - `decoders_read`_
    - `events_ingest`_
    - `lists_all`_
    - `lists_read`_
    - `logtest_all`_
    - `mitre_read`_
    - `rootcheck_all`_
    - `rootcheck_read`_
    - `rules_all`_
    - `rules_read`_
    - `sca_read`_
    - `security_all`_
    - `syscheck_all`_
    - `syscheck_read`_
    - `syscollector_read`_
    - `task_status`_
    - `users_all`_
    - `vulnerability_read`_

`Default roles`_
    - `administrator`_
    - `agents_admin`_
    - `agents_readonly`_
    - `cluster_admin`_
    - `cluster_readonly`_
    - `readonly`_
    - `users_admin`_

`Default rules`_
    - `wui_elastic_admin`_
    - `wui_opendistro_admin`_

Resources
-----------

`*:*`
^^^^^^

+-----------------+---------------------------------------------------------------------------------------------------------------------------+
| **Description** | Reference resources that do not yet exist in the system (futures). Actions using these resources are called resourceless. |
+-----------------+---------------------------------------------------------------------------------------------------------------------------+

agent:group
^^^^^^^^^^^
+-----------------+------------------------------------------------------------------------------------------------------------------------+
| **Description** | Reference agents via group name. This resource is disaggregated into the agent's IDs belonging to the specified group. |
+-----------------+------------------------------------------------------------------------------------------------------------------------+
| **Example**     | agent:group:web                                                                                                        |
+-----------------+------------------------------------------------------------------------------------------------------------------------+

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

decoder:file
^^^^^^^^^^^^

+-----------------+-----------------------------------------+
| **Description** | Reference decoder file via its filename |
+-----------------+-----------------------------------------+
| **Example**     | decoder:file:0005-wazuh_decoders.xml    |
+-----------------+-----------------------------------------+

list:file
^^^^^^^^^^

+-----------------+--------------------------------------+
| **Description** | Reference list file via its filename |
+-----------------+--------------------------------------+
| **Example**     | list:file:audit-keys                 |
+-----------------+--------------------------------------+

rule:file
^^^^^^^^^^

+-----------------+-------------------------------------------+
| **Description** | Reference rule file via its filename      |
+-----------------+-------------------------------------------+
| **Example**     | rule:file:0610-win-ms_logs_rules.xml      |
+-----------------+-------------------------------------------+

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
- :api-ref:`PUT /active-response <operation/api.controllers.active_response_controller.run_command>` (`agent:id`_, `agent:group`_)


Agent
^^^^^^^^^^^^^^^
agent:create
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`POST /agents <operation/api.controllers.agent_controller.add_agent>` (`*:*`_)
- :api-ref:`POST /agents/insert <operation/api.controllers.agent_controller.insert_agent>` (`*:*`_)
- :api-ref:`POST /agents/insert/quick <operation/api.controllers.agent_controller.post_new_agent>` (`*:*`_)

agent:delete
~~~~~~~~~~~~
- :api-ref:`DELETE /agents <operation/api.controllers.agent_controller.delete_agents>` (`agent:id`_, `agent:group`_)

agent:modify_group
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`DELETE /agents/group <operation/api.controllers.agent_controller.delete_multiple_agent_single_group>` (`agent:id`_, `agent:group`_)
- :api-ref:`DELETE /agents/{agent_id}/group <operation/api.controllers.agent_controller.delete_single_agent_multiple_groups>` (`agent:id`_, `agent:group`_)
- :api-ref:`DELETE /agents/{agent_id}/group/{group_id} <operation/api.controllers.agent_controller.delete_single_agent_single_group>` (`agent:id`_, `agent:group`_)
- :api-ref:`PUT /agents/group <operation/api.controllers.agent_controller.put_multiple_agent_single_group>` (`agent:id`_, `agent:group`_)
- :api-ref:`PUT /agents/{agent_id}/group/{group_id} <operation/api.controllers.agent_controller.put_agent_single_group>` (`agent:id`_, `agent:group`_)

agent:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /agents/no_group <operation/api.controllers.agent_controller.get_agent_no_group>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /agents/outdated <operation/api.controllers.agent_controller.get_agent_outdated>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /agents/stats/distinct <operation/api.controllers.agent_controller.get_agent_fields>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /agents/summary/os <operation/api.controllers.agent_controller.get_agent_summary_os>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /agents/summary/status <operation/api.controllers.agent_controller.get_agent_summary_status>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /agents/{agent_id}/config/{component}/{configuration} <operation/api.controllers.agent_controller.get_agent_config>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /agents/{agent_id}/daemons/stats <operation/api.controllers.agent_controller.get_daemon_stats>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /agents/{agent_id}/group/is_sync <operation/api.controllers.agent_controller.get_sync_agent>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /agents/{agent_id}/key <operation/api.controllers.agent_controller.get_agent_key>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /groups/{group_id}/agents <operation/api.controllers.agent_controller.get_agents_in_group>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /agents/{agent_id}/stats/{component} <operation/api.controllers.agent_controller.get_component_stats>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /overview/agents <operation/api.controllers.overview_controller.get_overview_agents>` (`agent:id`_, `agent:group`_)

agent:reconnect
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /agents/reconnect <operation/api.controllers.agent_controller.reconnect_agents>` (`agent:id`_, `agent:group`_)

agent:restart
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /agents/group/{group_id}/restart <operation/api.controllers.agent_controller.restart_agents_by_group>` (`agent:id`_, `agent:group`_)
- :api-ref:`PUT /agents/node/{node_id}/restart <operation/api.controllers.agent_controller.restart_agents_by_node>` (`agent:id`_, `agent:group`_)
- :api-ref:`PUT /agents/restart <operation/api.controllers.agent_controller.restart_agents>` (`agent:id`_, `agent:group`_)
- :api-ref:`PUT /agents/{agent_id}/restart <operation/api.controllers.agent_controller.restart_agent>` (`agent:id`_, `agent:group`_)

agent:upgrade
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /agents/upgrade_result <operation/api.controllers.agent_controller.get_agent_upgrade>` (`agent:id`_, `agent:group`_)
- :api-ref:`PUT /agents/upgrade <operation/api.controllers.agent_controller.put_upgrade_agents>` (`agent:id`_, `agent:group`_)
- :api-ref:`PUT /agents/upgrade_custom <operation/api.controllers.agent_controller.put_upgrade_custom_agents>` (`agent:id`_, `agent:group`_)


Ciscat
^^^^^^^
ciscat:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /ciscat/{agent_id}/results <operation/api.controllers.ciscat_controller.get_agents_ciscat_results>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /experimental/ciscat/results <operation/api.controllers.experimental_controller.get_cis_cat_results>` (`agent:id`_, `agent:group`_)


Cluster
^^^^^^^
cluster:read_api_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /cluster/api/config <operation/api.controllers.cluster_controller.get_api_config>` (`node:id`_)

cluster:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /cluster/configuration/validation <operation/api.controllers.cluster_controller.get_conf_validation>` (`node:id`_)
- :api-ref:`GET /cluster/healthcheck <operation/api.controllers.cluster_controller.get_healthcheck>` (`node:id`_)
- :api-ref:`GET /cluster/local/config <operation/api.controllers.cluster_controller.get_config>` (`node:id`_)
- :api-ref:`GET /cluster/local/info <operation/api.controllers.cluster_controller.get_cluster_node>` (`node:id`_)
- :api-ref:`GET /cluster/nodes <operation/api.controllers.cluster_controller.get_cluster_nodes>` (`node:id`_)
- :api-ref:`GET /cluster/{node_id}/configuration <operation/api.controllers.cluster_controller.get_configuration_node>` (`node:id`_)
- :api-ref:`GET /cluster/{node_id}/configuration/{component}/{configuration} <operation/api.controllers.cluster_controller.get_node_config>` (`node:id`_)
- :api-ref:`GET /cluster/{node_id}/daemons/stats <operation/api.controllers.cluster_controller.get_daemon_stats_node>` (`node:id`_)
- :api-ref:`GET /cluster/{node_id}/info <operation/api.controllers.cluster_controller.get_info_node>` (`node:id`_)
- :api-ref:`GET /cluster/{node_id}/logs <operation/api.controllers.cluster_controller.get_log_node>` (`node:id`_)
- :api-ref:`GET /cluster/{node_id}/logs/summary <operation/api.controllers.cluster_controller.get_log_summary_node>` (`node:id`_)
- :api-ref:`GET /cluster/{node_id}/stats <operation/api.controllers.cluster_controller.get_stats_node>` (`node:id`_)
- :api-ref:`GET /cluster/{node_id}/stats/analysisd <operation/api.controllers.cluster_controller.get_stats_analysisd_node>` (`node:id`_)
- :api-ref:`GET /cluster/{node_id}/stats/hourly <operation/api.controllers.cluster_controller.get_stats_hourly_node>` (`node:id`_)
- :api-ref:`GET /cluster/{node_id}/stats/remoted <operation/api.controllers.cluster_controller.get_stats_remoted_node>` (`node:id`_)
- :api-ref:`GET /cluster/{node_id}/stats/weekly <operation/api.controllers.cluster_controller.get_stats_weekly_node>` (`node:id`_)
- :api-ref:`GET /cluster/{node_id}/status <operation/api.controllers.cluster_controller.get_status_node>` (`node:id`_)
- :api-ref:`PUT /agents/node/{node_id}/restart <operation/api.controllers.agent_controller.restart_agents_by_node>` (`node:id`_)
- :api-ref:`PUT /cluster/restart <operation/api.controllers.cluster_controller.put_restart>` (`node:id`_)
- :api-ref:`GET /cluster/ruleset/synchronization <operation/api.controllers.cluster_controller.get_nodes_ruleset_sync_status>` (`node:id`_)

cluster:restart
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /cluster/restart <operation/api.controllers.cluster_controller.put_restart>` (`node:id`_)

cluster:status
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /cluster/status <operation/api.controllers.cluster_controller.get_status>` (`*:*`_)

cluster:update_api_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- .. deprecated:: 4.0.4

cluster:update_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /cluster/{node_id}/configuration <operation/api.controllers.cluster_controller.update_configuration>` (`node:id`_)

Decoders
^^^^^^^^^^^^^^^
decoders:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /decoders <operation/api.controllers.decoder_controller.get_decoders>` (`decoder:file`_)
- :api-ref:`GET /decoders/files <operation/api.controllers.decoder_controller.get_decoders_files>` (`decoder:file`_)
- :api-ref:`GET /decoders/files/{filename} <operation/api.controllers.decoder_controller.get_file>` (`decoder:file`_)
- :api-ref:`GET /decoders/parents <operation/api.controllers.decoder_controller.get_decoders_parents>` (`decoder:file`_)

decoders:update
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /decoders/files/{filename} <operation/api.controllers.decoder_controller.put_file>` (`*:*`_)

decoders:delete
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /decoders/files/{filename} <operation/api.controllers.decoder_controller.put_file>` (`*:*`_)
- :api-ref:`DELETE /decoders/files/{filename} <operation/api.controllers.decoder_controller.delete_file>` (`decoder:file`_)

Events
^^^^^^^
event:ingest
~~~~~~~~~~~~
- :api-ref:`POST /events <operation/api.controllers.event_controller.forward_event>` (`*:*`_)

Group
^^^^^^^^^^^^^^^
group:create
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`POST /groups <operation/api.controllers.agent_controller.post_group>` (`*:*`_)

group:delete
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`DELETE /groups <operation/api.controllers.agent_controller.delete_groups>` (`group:id`_)

group:modify_assignments
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`DELETE /agents/group <operation/api.controllers.agent_controller.delete_multiple_agent_single_group>` (`group:id`_)
- :api-ref:`DELETE /agents/{agent_id}/group <operation/api.controllers.agent_controller.delete_single_agent_multiple_groups>` (`group:id`_)
- :api-ref:`DELETE /agents/{agent_id}/group/{group_id} <operation/api.controllers.agent_controller.delete_single_agent_single_group>` (`group:id`_)
- :api-ref:`PUT /agents/group <operation/api.controllers.agent_controller.put_multiple_agent_single_group>` (`group:id`_)
- :api-ref:`PUT /agents/{agent_id}/group/{group_id} <operation/api.controllers.agent_controller.put_agent_single_group>` (`group:id`_)

group:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /groups <operation/api.controllers.agent_controller.get_list_group>` (`group:id`_)
- :api-ref:`GET /groups/{group_id}/agents <operation/api.controllers.agent_controller.get_agents_in_group>` (`group:id`_)
- :api-ref:`GET /groups/{group_id}/configuration <operation/api.controllers.agent_controller.get_group_config>` (`group:id`_)
- :api-ref:`GET /groups/{group_id}/files <operation/api.controllers.agent_controller.get_group_files>` (`group:id`_)
- :api-ref:`GET /groups/{group_id}/files/{file_name} <operation/api.controllers.agent_controller.get_group_file>` (`group:id`_)
- :api-ref:`GET /overview/agents <operation/api.controllers.overview_controller.get_overview_agents>` (`group:id`_)

group:update_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /groups/{group_id}/configuration <operation/api.controllers.agent_controller.put_group_config>` (`group:id`_)

Lists
^^^^^^^^^^^^^^^
lists:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /lists <operation/api.controllers.cdb_list_controller.get_lists>` (`list:file`_)
- :api-ref:`GET /lists/files <operation/api.controllers.cdb_list_controller.get_lists_files>` (`list:file`_)
- :api-ref:`GET /lists/files/{filename} <operation/api.controllers.cdb_list_controller.get_file>` (`list:file`_)

lists:update
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /lists/files/{filename} <operation/api.controllers.cdb_list_controller.put_file>` (`*:*`_)

lists:delete
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`DELETE /lists/files/{filename} <operation/api.controllers.cdb_list_controller.delete_file>` (`list:file`_)
- :api-ref:`PUT /lists/files/{filename} <operation/api.controllers.cdb_list_controller.put_file>` (`*:*`_)


Logtest
^^^^^^^^^^^^^^^
logtest:run
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /logtest <operation/api.controllers.logtest_controller.run_logtest_tool>` (`*:*`_)
- :api-ref:`DELETE /logtest/sessions/{token} <operation/api.controllers.logtest_controller.end_logtest_session>` (`*:*`_)


Manager
^^^^^^^^^^^^^^^
manager:read_api_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /manager/api/config <operation/api.controllers.manager_controller.get_api_config>` (`*:*`_)

manager:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /manager/configuration <operation/api.controllers.manager_controller.get_configuration>` (`*:*`_)
- :api-ref:`GET /manager/configuration/validation <operation/api.controllers.manager_controller.get_conf_validation>` (`*:*`_)
- :api-ref:`GET /manager/configuration/{component}/{configuration} <operation/api.controllers.manager_controller.get_manager_config_ondemand>` (`*:*`_)
- :api-ref:`GET /manager/daemons/stats <operation/api.controllers.manager_controller.get_daemon_stats>` (`*:*`_)`
- :api-ref:`GET /manager/info <operation/api.controllers.manager_controller.get_info>` (`*:*`_)
- :api-ref:`GET /manager/logs <operation/api.controllers.manager_controller.get_log>` (`*:*`_)
- :api-ref:`GET /manager/logs/summary <operation/api.controllers.manager_controller.get_log_summary>` (`*:*`_)
- :api-ref:`GET /manager/stats <operation/api.controllers.manager_controller.get_stats>` (`*:*`_)
- :api-ref:`GET /manager/stats/analysisd <operation/api.controllers.manager_controller.get_stats_analysisd>` (`*:*`_)
- :api-ref:`GET /manager/stats/hourly <operation/api.controllers.manager_controller.get_stats_hourly>` (`*:*`_)
- :api-ref:`GET /manager/stats/remoted <operation/api.controllers.manager_controller.get_stats_remoted>` (`*:*`_)
- :api-ref:`GET /manager/stats/weekly <operation/api.controllers.manager_controller.get_stats_weekly>` (`*:*`_)
- :api-ref:`GET /manager/status <operation/api.controllers.manager_controller.get_status>` (`*:*`_)
- :api-ref:`PUT /manager/restart <operation/api.controllers.manager_controller.put_restart>` (`*:*`_)

manager:restart
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /manager/restart <operation/api.controllers.manager_controller.put_restart>` (`*:*`_)

manager:update_api_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- .. deprecated:: 4.0.4

manager:update_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /manager/configuration <operation/api.controllers.manager_controller.update_configuration>` (`*:*`_)

Mitre
^^^^^^
mitre:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /mitre/metadata <operation/api.controllers.mitre_controller.get_metadata>` (`*:*`_)
- :api-ref:`GET /mitre/tactics <operation/api.controllers.mitre_controller.get_tactics>` (`*:*`_)
- :api-ref:`GET /mitre/techniques <operation/api.controllers.mitre_controller.get_techniques>` (`*:*`_)
- :api-ref:`GET /mitre/groups <operation/api.controllers.mitre_controller.get_groups>` (`*:*`_)
- :api-ref:`GET /mitre/mitigations <operation/api.controllers.mitre_controller.get_mitigations>` (`*:*`_)
- :api-ref:`GET /mitre/software <operation/api.controllers.mitre_controller.get_software>` (`*:*`_)
- :api-ref:`GET /mitre/references <operation/api.controllers.mitre_controller.get_references>` (`*:*`_)

Rootcheck
^^^^^^^^^^^^^^^
rootcheck:clear
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`DELETE /rootcheck/{agent_id} <operation/api.controllers.rootcheck_controller.delete_rootcheck>` (`agent:id`_, `agent:group`_)
- :api-ref:`DELETE /experimental/rootcheck <operation/api.controllers.experimental_controller.clear_rootcheck_database>` (`agent:id`_, `agent:group`_)

rootcheck:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /rootcheck/{agent_id} <operation/api.controllers.rootcheck_controller.get_rootcheck_agent>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /rootcheck/{agent_id}/last_scan <operation/api.controllers.rootcheck_controller.get_last_scan_agent>` (`agent:id`_, `agent:group`_)

rootcheck:run
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /rootcheck <operation/api.controllers.rootcheck_controller.put_rootcheck>` (`agent:id`_, `agent:group`_)

Rules
^^^^^^^^^^^^^^^
rules:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /rules <operation/api.controllers.rule_controller.get_rules>` (`rule:file`_)
- :api-ref:`GET /rules/files <operation/api.controllers.rule_controller.get_rules_files>` (`rule:file`_)
- :api-ref:`GET /rules/files/{filename} <operation/api.controllers.rule_controller.get_file>` (`rule:file`_)
- :api-ref:`GET /rules/groups <operation/api.controllers.rule_controller.get_rules_groups>` (`rule:file`_)
- :api-ref:`GET /rules/requirement/{requirement} <operation/api.controllers.rule_controller.get_rules_requirement>` (`rule:file`_)

rules:update
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /rules/files/{filename} <operation/api.controllers.rule_controller.put_file>` (`*:*`_)

rules:delete
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /rules/files/{filename} <operation/api.controllers.rule_controller.put_file>` (`*:*`_)
- :api-ref:`DELETE /rules/files/{filename} <operation/api.controllers.rule_controller.delete_file>` (`rule:file`_)


SCA
^^^^^^^^^^^^^^^
sca:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /sca/{agent_id} <operation/api.controllers.sca_controller.get_sca_agent>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /sca/{agent_id}/checks/{policy_id} <operation/api.controllers.sca_controller.get_sca_checks>` (`agent:id`_, `agent:group`_)


Security
^^^^^^^^^^^^^^^
security:create_user
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`POST /security/users <operation/api.controllers.security_controller.create_user>` (`*:*`_)

security:create
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`POST /security/policies <operation/api.controllers.security_controller.add_policy>` (`*:*`_)
- :api-ref:`POST /security/roles <operation/api.controllers.security_controller.add_role>` (`*:*`_)
- :api-ref:`POST /security/rules <operation/api.controllers.security_controller.add_rule>` (`*:*`_)

security:delete
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`DELETE /security/policies <operation/api.controllers.security_controller.remove_policies>` (`policy:id`_)
- :api-ref:`DELETE /security/roles <operation/api.controllers.security_controller.remove_roles>` (`role:id`_)
- :api-ref:`DELETE /security/roles/{role_id}/policies <operation/api.controllers.security_controller.remove_role_policy>` (`role:id`_, `policy:id`_)
- :api-ref:`DELETE /security/roles/{role_id}/rules <operation/api.controllers.security_controller.remove_role_rule>` (`role:id`_, `rule:id`_)
- :api-ref:`DELETE /security/rules <operation/api.controllers.security_controller.remove_rules>` (`rule:id`_)
- :api-ref:`DELETE /security/users <operation/api.controllers.security_controller.delete_users>` (`user:id`_)
- :api-ref:`DELETE /security/users/{user_id}/roles <operation/api.controllers.security_controller.remove_user_role>` (`user:id`_, `role:id`_)

security:edit_run_as
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /security/users/{user_id}/run_as <operation/api.controllers.security_controller.edit_run_as>` (`*:*`_)

security:read_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /security/config <operation/api.controllers.security_controller.get_security_config>` (`*:*`_)

security:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /security/policies <operation/api.controllers.security_controller.get_policies>` (`policy:id`_)
- :api-ref:`GET /security/roles <operation/api.controllers.security_controller.get_roles>` (`role:id`_)
- :api-ref:`GET /security/rules <operation/api.controllers.security_controller.get_rules>` (`rule:id`_)
- :api-ref:`GET /security/users <operation/api.controllers.security_controller.get_users>` (`user:id`_)

security:revoke
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /security/user/revoke <operation/api.controllers.security_controller.revoke_all_tokens>` (`*:*`_)

security:update_config
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`DELETE /security/config <operation/api.controllers.security_controller.delete_security_config>` (`*:*`_)
- :api-ref:`PUT /security/config <operation/api.controllers.security_controller.put_security_config>` (`*:*`_)

security:update
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`POST /security/roles/{role_id}/policies <operation/api.controllers.security_controller.set_role_policy>` (`role:id`_, `policy:id`_)
- :api-ref:`POST /security/roles/{role_id}/rules <operation/api.controllers.security_controller.set_role_rule>` (`role:id`_, `rule:id`_)
- :api-ref:`POST /security/users/{user_id}/roles <operation/api.controllers.security_controller.set_user_role>` (`user:id`_, `role:id`_)
- :api-ref:`PUT /security/policies/{policy_id} <operation/api.controllers.security_controller.update_policy>` (`policy:id`_)
- :api-ref:`PUT /security/roles/{role_id} <operation/api.controllers.security_controller.update_role>` (`role:id`_)
- :api-ref:`PUT /security/rules/{rule_id} <operation/api.controllers.security_controller.update_rule>` (`rule:id`_)
- :api-ref:`PUT /security/users/{user_id} <operation/api.controllers.security_controller.update_user>` (`user:id`_)


Syscheck
^^^^^^^^^^^^^^^
syscheck:clear
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`DELETE /experimental/syscheck <operation/api.controllers.experimental_controller.clear_syscheck_database>` (`agent:id`_, `agent:group`_)
- :api-ref:`DELETE /syscheck/{agent_id} <operation/api.controllers.syscheck_controller.delete_syscheck_agent>` (`agent:id`_, `agent:group`_)

syscheck:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /syscheck/{agent_id} <operation/api.controllers.syscheck_controller.get_syscheck_agent>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /syscheck/{agent_id}/last_scan <operation/api.controllers.syscheck_controller.get_last_scan_agent>` (`agent:id`_, `agent:group`_)

syscheck:run
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`PUT /syscheck <operation/api.controllers.syscheck_controller.put_syscheck>` (`agent:id`_, `agent:group`_)


Syscollector
^^^^^^^^^^^^^^^
syscollector:read
~~~~~~~~~~~~~~~~~~~~~~~~~~
- :api-ref:`GET /experimental/syscollector/hardware <operation/api.controllers.experimental_controller.get_hardware_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /experimental/syscollector/hotfixes <operation/api.controllers.experimental_controller.get_hotfixes_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /experimental/syscollector/netaddr <operation/api.controllers.experimental_controller.get_network_address_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /experimental/syscollector/netiface <operation/api.controllers.experimental_controller.get_network_interface_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /experimental/syscollector/netproto <operation/api.controllers.experimental_controller.get_network_protocol_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /experimental/syscollector/os <operation/api.controllers.experimental_controller.get_os_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /experimental/syscollector/packages <operation/api.controllers.experimental_controller.get_packages_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /experimental/syscollector/ports <operation/api.controllers.experimental_controller.get_ports_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /experimental/syscollector/processes <operation/api.controllers.experimental_controller.get_processes_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /syscollector/{agent_id}/hardware <operation/api.controllers.syscollector_controller.get_hardware_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /syscollector/{agent_id}/hotfixes <operation/api.controllers.syscollector_controller.get_hotfix_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /syscollector/{agent_id}/netaddr <operation/api.controllers.syscollector_controller.get_network_address_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /syscollector/{agent_id}/netiface <operation/api.controllers.syscollector_controller.get_network_interface_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /syscollector/{agent_id}/netproto <operation/api.controllers.syscollector_controller.get_network_protocol_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /syscollector/{agent_id}/os <operation/api.controllers.syscollector_controller.get_os_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /syscollector/{agent_id}/packages <operation/api.controllers.syscollector_controller.get_packages_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /syscollector/{agent_id}/ports <operation/api.controllers.syscollector_controller.get_ports_info>` (`agent:id`_, `agent:group`_)
- :api-ref:`GET /syscollector/{agent_id}/processes <operation/api.controllers.syscollector_controller.get_processes_info>` (`agent:id`_, `agent:group`_)

Task
^^^^^
task:status
~~~~~~~~~~~~~
- :api-ref:`GET /tasks/status <operation/api.controllers.task_controller.get_tasks_status>` (`*:*`_)

Vulnerability
^^^^^^^^^^^^^^^
vulnerability:read
~~~~~~~~~~~~~~~~~~
.. deprecated:: 4.8.0

vulnerability:run
~~~~~~~~~~~~~~~~~~
.. deprecated:: 4.8.0

.. _api_rbac_reference_default_policies:

Default policies
----------------
agents_all
^^^^^^^^^^^^^^^
Grant full access to all agents related functionalities.

.. code-block:: yaml

    resourceless:
      actions:
        - agent:create
        - group:create
      resources:
        - '*:*:*'
      effect: allow
    agents:
      actions:
        - agent:read
        - agent:delete
        - agent:modify_group
        - agent:reconnect
        - agent:restart
        - agent:upgrade
      resources:
        - agent:id:*
        - agent:group:*
      effect: allow
    groups:
      actions:
        - group:read
        - group:delete
        - group:update_config
        - group:modify_assignments
      resources:
        - group:id:*
      effect: allow

agents_commands
^^^^^^^^^^^^^^^
Allow sending commands to agents.

.. code-block:: yaml

    agents:
      actions:
        - active-response:command
      resources:
        - agent:id:*
      effect: allow

agents_read
^^^^^^^^^^^^^^^
Grant read access to all agents related functionalities.

.. code-block:: yaml

    agents:
      actions:
        - agent:read
      resources:
        - agent:id:*
        - agent:group:*
      effect: allow
    groups:
      actions:
        - group:read
      resources:
        - group:id:*
      effect: allow

ciscat_read
^^^^^^^^^^^^^^^
Allow reading the agent ciscat results information.

.. code-block:: yaml

    ciscat:
      actions:
        - ciscat:read
      resources:
        - agent:id:*
      effect: allow

cluster_all
^^^^^^^^^^^^^^^
Provide full access to all cluster/manager related functionalities.

.. code-block:: yaml

    resourceless:
      actions:
        - cluster:status
        - manager:read
        - manager:read_api_config
        - manager:update_config
        - manager:restart
      resources:
        - '*:*:*'
      effect: allow
    nodes:
      actions:
        - cluster:read_api_config
        - cluster:read
        - cluster:restart
        - cluster:update_config
      resources:
        - node:id:*
      effect: allow

cluster_read
^^^^^^^^^^^^^^^
Provide read access to all cluster/manager related functionalities.

.. code-block:: yaml

    resourceless:
      actions:
        - cluster:status
        - manager:read
        - manager:read_api_config
      resources:
        - '*:*:*'
      effect: allow
    nodes:
      actions:
        - cluster:read_api_config
        - cluster:read
        - cluster:read_api_config
      resources:
        - node:id:*
      effect: allow

decoders_all
^^^^^^^^^^^^^^^
Allow managing all decoder files in the system.

.. code-block:: yaml

    files:
      actions:
        - decoders:read
        - decoders:delete
      resources:
        - decoder:file:*
      effect: allow
    resourceless:
      actions:
        - decoders:update
      resources:
        - '*:*:*'
      effect: allow

decoders_read
^^^^^^^^^^^^^^^
Allow reading all decoder files in the system.

.. code-block:: yaml

    decoders:
      actions:
        - decoders:read
      resources:
        - decoder:file:*
      effect: allow

events_ingest
^^^^^^^^^^^^^
Allow sending events to analysisd.

.. code-block:: yaml

    resourceless:
      actions:
        - event:ingest
      resources:
        - '*:*:*'
      effect: allow

lists_all
^^^^^^^^^^^^^^^
Allow managing all CDB lists files in the system.

.. code-block:: yaml

      files:
        actions:
          - lists:read
          - lists:delete
        resources:
          - list:file:*
        effect: allow
      resourceless:
        actions:
          - lists:update
        resources:
          - '*:*:*'
        effect: allow

lists_read
^^^^^^^^^^^^^^^
Allow reading all lists paths in the system.

.. code-block:: yaml

    lists:
      actions:
        - lists:read
      resources:
        - list:file:*
      effect: allow

logtest_all
^^^^^^^^^^^^^^^
Provide access to all logtest related functionalities.

.. code-block:: yaml

    logtest:
      actions:
        - logtest:run
      resources:
        - '*:*:*'
      effect: allow

mitre_read
^^^^^^^^^^^^^^^
Allow reading MITRE database information.

.. code-block:: yaml

    mitre:
      actions:
        - mitre:read
      resources:
        - '*:*:*'
      effect: allow

rootcheck_all
^^^^^^^^^^^^^^^
Allow reading, running and clearing rootcheck information.

.. code-block:: yaml

    rootcheck:
      actions:
        - rootcheck:clear
        - rootcheck:read
        - rootcheck:run
      resources:
        - agent:id:*
      effect: allow

rootcheck_read
^^^^^^^^^^^^^^^
Allow reading all rootcheck information.

.. code-block:: yaml

    rootcheck:
      actions:
        - rootcheck:read
      resources:
        - agent:id:*
      effect: allow

rules_all
^^^^^^^^^^^^^^^
Allow managing all rule files in the system.

.. code-block:: yaml

    files:
      actions:
        - rules:read
        - rules:delete
      resources:
        - rule:file:*
      effect: allow
    resourceless:
      actions:
        - rules:update
      resources:
        - '*:*:*'
      effect: allow

rules_read
^^^^^^^^^^^^^^^
Allow reading all rule files in the system.

.. code-block:: yaml

    rules:
      actions:
        - rules:read
      resources:
        - rule:file:*
      effect: allow

sca_read
^^^^^^^^^^^^^^^
Allow reading the agent sca information.

.. code-block:: yaml

    sca:
      actions:
        - sca:read
      resources:
        - agent:id:*
      effect: allow

security_all
^^^^^^^^^^^^^^^
Provide full access to all security related functionalities.

.. code-block:: yaml

    resourceless:
      actions:
        - security:create
        - security:create_user
        - security:edit_run_as
        - security:read_config
        - security:update_config
        - security:revoke
      resources:
        - '*:*:*'
      effect: allow
    security:
      actions:
        - security:read
        - security:update
        - security:delete
      resources:
        - role:id:*
        - policy:id:*
        - user:id:*
        - rule:id:*
      effect: allow

syscheck_all
^^^^^^^^^^^^^^^
Allow reading, running and clearing syscheck information.

.. code-block:: yaml

    syscheck:
      actions:
        - syscheck:clear
        - syscheck:read
        - syscheck:run
      resources:
        - agent:id:*
      effect: allow

syscheck_read
^^^^^^^^^^^^^^^
Allow reading syscheck information.

.. code-block:: yaml

    syscheck:
      actions:
        - syscheck:read
      resources:
        - agent:id:*
      effect: allow

syscollector_read
^^^^^^^^^^^^^^^^^^
Allow reading agents information.

.. code-block:: yaml

    syscollector:
      actions:
        - syscollector:read
      resources:
        - agent:id:*
      effect: allow

task_status
^^^^^^^^^^^^^^^^^^
Allow reading tasks information.

.. code-block:: yaml

    task:
      actions:
        - task:status
      resources:
        - '*:*:*'
      effect: allow

users_all
^^^^^^^^^^^^^^^
Provide full access to all users related functionalities.

.. code-block:: yaml

    resourceless:
      actions:
        - security:create_user
        - security:edit_run_as
        - security:revoke
      resources:
        - '*:*:*'
      effect: allow
    users:
      actions:
        - security:read
        - security:update
        - security:delete
      resources:
        - user:id:*
      effect: allow

users_modify_run_as
^^^^^^^^^^^^^^^^^^^
Provides the capability to modify the users' run_as parameter.

.. code-block:: yaml

    flag:
      actions:
        - security:edit_run_as
      resources:
        - '*:*:*'
      effect: allow

vulnerability_read
^^^^^^^^^^^^^^^^^^
Allow reading agents' vulnerabilities information.

.. code-block:: yaml

    vulnerability:
      actions:
        - vulnerability:read
      resources:
        - agent:id:*
      effect: allow

vulnerability_run
^^^^^^^^^^^^^^^^^^
Allow running a vulnerability detector scan.

.. code-block:: yaml

    resourceless:
      actions:
        - vulnerability:run
      resources:
        - '*:*:*'
      effect: allow


.. _api_rbac_reference_default_roles:

Default roles
-------------
administrator
^^^^^^^^^^^^^
Administrator role of the system, this role have full access to the system.

Policies
    - `agents_all`_
    - `agents_commands`_
    - `ciscat_read`_
    - `cluster_all`_
    - `decoders_all`_
    - `lists_all`_
    - `logtest_all`_
    - `mitre_read`_
    - `rootcheck_all`_
    - `rules_all`_
    - `sca_read`_
    - `security_all`_
    - `syscheck_all`_
    - `syscollector_read`_
    - `task_status`_
    - `vulnerability_read`_
    - `vulnerability_run`_

Rules
    - `wui_elastic_admin`_
    - `wui_opendistro_admin`_

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
    - `cluster_read`_
    - `decoders_read`_
    - `lists_read`_
    - `mitre_read`_
    - `rootcheck_read`_
    - `rules_read`_
    - `sca_read`_
    - `syscheck_read`_
    - `syscollector_read`_
    - `vulnerability_read`_


users_admin
^^^^^^^^^^^^
Users administrator of the system, this role provides full access to all users related functionalities.

Policies
    - `users_all`_

Default rules
-------------
.. warning::

    Run_as permissions through these mapping rules can only be obtained with ``wazuh-wui`` user. These rules will never match an authorization context for any other Wazuh API user.

wui_elastic_admin
^^^^^^^^^^^^^^^^^^^^^
Administrator permissions for WUI's elastic users.

.. code-block:: yaml

    rule:
        FIND:
            username: "elastic"

wui_opendistro_admin
^^^^^^^^^^^^^^^^^^^^^
Administrator permissions for WUI's opendistro users.

.. code-block:: yaml

    rule:
        FIND:
            user_name: "admin"
