.. Copyright (C) 2015, Wazuh, Inc.

RBAC Reference
==============

RBAC policies consist of three elements: *actions*, *resources*, and *effect*. Each API endpoint involves one or more actions and can be performed on specific resources.

For example, the :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>` endpoint is used to obtain the information of one or all agents. This endpoint applies the action ``agent:read`` on the resource ``agent:id`` or ``agent:group``. For example, ``agent:id:001`` (agent 001) or ``agent:id:*`` (all agents). All the existing resources, available actions, and the endpoints affected by each one can be found on this reference page.

This reference also contains a set of default roles and policies that can be immediately used instead of creating new ones.

.. contents::
   :local:
   :depth: 3
   :backlinks: none

.. _api_rbac_reference_resources:

Resources
-----------

+--------------------+---------------------------------------------------------+--------------------------------------+
| Resources          | Description                                             | Example                              |
+====================+=========================================================+======================================+
| \*:\*              | Reference resources that do not yet exist in the system |                                      |
|                    | (futures). Actions using these resources are called     |                                      |
|                    | resourceless.                                           |                                      |
+--------------------+---------------------------------------------------------+--------------------------------------+
| agent:group        | Reference agents via group name. This resource is       | agent:group:web                      |
|                    | disaggregated into the agent's IDs belonging to the     |                                      |
|                    | specified group.                                        |                                      |
+--------------------+---------------------------------------------------------+--------------------------------------+
| agent:id           | Reference agents via agent ID                           | agent:id:001                         |
+--------------------+---------------------------------------------------------+--------------------------------------+
| group:id           | Reference agent groups via group ID                     | group:id:default                     |
+--------------------+---------------------------------------------------------+--------------------------------------+
| node:id            | Reference cluster node by node ID                       | node:id:worker1                      |
+--------------------+---------------------------------------------------------+--------------------------------------+
| decoder:file       | Reference decoder file via its filename                 | decoder:file:0005-wazuh_decoders.xml |
+--------------------+---------------------------------------------------------+--------------------------------------+
| list:file          | Reference list file via its filename                    | list:file:audit-keys                 |
+--------------------+---------------------------------------------------------+--------------------------------------+
| rule:file          | Reference rule file via its filename                    | rule:file:0610-win-ms_logs_rules.xml |
+--------------------+---------------------------------------------------------+--------------------------------------+
| policy:id          | Reference security policy via its ID                    | policy:id:1                          |
+--------------------+---------------------------------------------------------+--------------------------------------+
| role:id            | Reference security role via its ID                      | role:id:1                            |
+--------------------+---------------------------------------------------------+--------------------------------------+
| rule:id            | Reference security rule via its ID                      | rule:id:1                            |
+--------------------+---------------------------------------------------------+--------------------------------------+
| user:id            | Reference security user via its ID                      | user:id:1                            |
+--------------------+---------------------------------------------------------+--------------------------------------+

Actions
-------

In each action, the affected endpoints are specified along with the necessary resources, following this structure: <Method> <Endpoint> (<Resource>).

Active_response
^^^^^^^^^^^^^^^

The :api-ref:`/active-response <tag/Active-response>` endpoint of the Wazuh server API allows users to interact with the Wazuh Active Response module.

active-response:command
~~~~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`PUT /active-response <operation/api.controllers.active_response_controller.run_command>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

Agent
^^^^^

The :api-ref:`/agents <tag/Agents>` endpoint of the Wazuh server API allows users to enroll and manage agents on the Wazuh server.

agent:create
~~~~~~~~~~~~

-  :api-ref:`POST /agents <operation/api.controllers.agent_controller.add_agent>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`POST /agents/insert <operation/api.controllers.agent_controller.insert_agent>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`POST /agents/insert/quick <operation/api.controllers.agent_controller.post_new_agent>` (:ref:`*:* <api_rbac_reference_resources>`)

agent:delete
~~~~~~~~~~~~

-  :api-ref:`DELETE /agents <operation/api.controllers.agent_controller.delete_agents>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

agent:modify_group
~~~~~~~~~~~~~~~~~~

-  :api-ref:`DELETE /agents/group <operation/api.controllers.agent_controller.delete_multiple_agent_single_group>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /agents/{agent_id}/group <operation/api.controllers.agent_controller.delete_single_agent_multiple_groups>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /agents/{agent_id}/group/{group_id} <operation/api.controllers.agent_controller.delete_single_agent_single_group>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/group <operation/api.controllers.agent_controller.put_multiple_agent_single_group>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/{agent_id}/group/{group_id} <operation/api.controllers.agent_controller.put_agent_single_group>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

agent:read
~~~~~~~~~~

-  :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /agents/outdated <operation/api.controllers.agent_controller.get_agent_outdated>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /agents/stats/distinct <operation/api.controllers.agent_controller.get_agent_fields>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /agents/summary/os <operation/api.controllers.agent_controller.get_agent_summary_os>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /agents/summary/status <operation/api.controllers.agent_controller.get_agent_summary_status>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /agents/{agent_id}/config/{component}/{configuration} <operation/api.controllers.agent_controller.get_agent_config>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /agents/{agent_id}/daemons/stats <operation/api.controllers.agent_controller.get_daemon_stats>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /agents/{agent_id}/group/is_sync <operation/api.controllers.agent_controller.get_sync_agent>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`) - *Deprecated since version 4.4*
-  :api-ref:`GET /agents/{agent_id}/key <operation/api.controllers.agent_controller.get_agent_key>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /agents/no_group <operation/api.controllers.agent_controller.get_agent_no_group>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /groups/{group_id}/agents <operation/api.controllers.agent_controller.get_agents_in_group>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /agents/{agent_id}/stats/{component} <operation/api.controllers.agent_controller.get_component_stats>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /overview/agents <operation/api.controllers.overview_controller.get_overview_agents>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

agent:reconnect
~~~~~~~~~~~~~~~

-  :api-ref:`PUT /agents/reconnect <operation/api.controllers.agent_controller.reconnect_agents>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

agent:restart
~~~~~~~~~~~~~

-  :api-ref:`PUT /agents/group/{group_id}/restart <operation/api.controllers.agent_controller.restart_agents_by_group>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/node/{node_id}/restart <operation/api.controllers.agent_controller.restart_agents_by_node>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/restart <operation/api.controllers.agent_controller.restart_agents>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/{agent_id}/restart <operation/api.controllers.agent_controller.restart_agent>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

agent:upgrade
~~~~~~~~~~~~~

-  :api-ref:`GET /agents/upgrade_result <operation/api.controllers.agent_controller.get_agent_upgrade>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/upgrade <operation/api.controllers.agent_controller.put_upgrade_agents>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/upgrade_custom <operation/api.controllers.agent_controller.put_upgrade_custom_agents>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

CIS-CAT
^^^^^^^

The :api-ref:`/ciscat <tag/Ciscat>` endpoint of the Wazuh server API enables users to retrieve specific information from the results of CIS-CAT scans carried out on the Wazuh agents.

ciscat:read
~~~~~~~~~~~

-  :api-ref:`GET /ciscat/{agent_id}/results <operation/api.controllers.ciscat_controller.get_agents_ciscat_results>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /experimental/ciscat/results <operation/api.controllers.experimental_controller.get_cis_cat_results>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

Cluster
^^^^^^^

The :api-ref:`/cluster <tag/Cluster>` endpoint of the Wazuh server API allows users to manage the configuration and health of the master node and the worker nodes in the Wazuh cluster.

cluster:read_api_config
~~~~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`GET /cluster/api/config <operation/api.controllers.cluster_controller.get_api_config>` (:ref:`node:id <api_rbac_reference_resources>`)

cluster:read
~~~~~~~~~~~~

-  :api-ref:`GET /cluster/configuration/validation <operation/api.controllers.cluster_controller.get_conf_validation>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/healthcheck <operation/api.controllers.cluster_controller.get_healthcheck>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/local/config <operation/api.controllers.cluster_controller.get_config>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/local/info <operation/api.controllers.cluster_controller.get_cluster_node>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/nodes <operation/api.controllers.cluster_controller.get_cluster_nodes>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/{node_id}/configuration <operation/api.controllers.cluster_controller.get_configuration_node>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/{node_id}/configuration/{component}/{configuration} <operation/api.controllers.cluster_controller.get_node_config>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/{node_id}/daemons/stats <operation/api.controllers.cluster_controller.get_daemon_stats_node>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/{node_id}/info <operation/api.controllers.cluster_controller.get_info_node>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/{node_id}/logs <operation/api.controllers.cluster_controller.get_log_node>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/{node_id}/logs/summary <operation/api.controllers.cluster_controller.get_log_summary_node>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/{node_id}/stats <operation/api.controllers.cluster_controller.get_stats_node>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/{node_id}/stats/analysisd <operation/api.controllers.cluster_controller.get_stats_analysisd_node>` (:ref:`node:id <api_rbac_reference_resources>`) - Deprecated since version 4.4
-  :api-ref:`GET /cluster/{node_id}/stats/hourly <operation/api.controllers.cluster_controller.get_stats_hourly_node>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/{node_id}/stats/remoted <operation/api.controllers.cluster_controller.get_stats_remoted_node>` (:ref:`node:id <api_rbac_reference_resources>`) - Deprecated since version 4.4
-  :api-ref:`GET /cluster/{node_id}/stats/weekly <operation/api.controllers.cluster_controller.get_stats_weekly_node>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/{node_id}/status <operation/api.controllers.cluster_controller.get_status_node>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/node/{node_id}/restart <operation/api.controllers.agent_controller.restart_agents_by_node>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /cluster/restart <operation/api.controllers.cluster_controller.put_restart>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/ruleset/synchronization <operation/api.controllers.cluster_controller.get_nodes_ruleset_sync_status>` (:ref:`node:id <api_rbac_reference_resources>`)

cluster:restart
~~~~~~~~~~~~~~~

-  :api-ref:`PUT /cluster/restart <operation/api.controllers.cluster_controller.put_restart>` (:ref:`node:id <api_rbac_reference_resources>`)

cluster:status
~~~~~~~~~~~~~~

-  :api-ref:`GET /cluster/status <operation/api.controllers.cluster_controller.get_status>` (:ref:`*:* <api_rbac_reference_resources>`)

cluster:update_config
~~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`PUT /cluster/{node_id}/configuration <operation/api.controllers.cluster_controller.update_configuration>` (:ref:`node:id <api_rbac_reference_resources>`)

Decoders
^^^^^^^^

The :api-ref:`/decoder <tag/Decoders>` endpoint of the Wazuh server API enables users to manage and retrieve information about the decoders included in the Wazuh server.

decoders:read
~~~~~~~~~~~~~

-  :api-ref:`GET /decoders <operation/api.controllers.decoder_controller.get_decoders>` (:ref:`decoder:file <api_rbac_reference_resources>`)
-  :api-ref:`GET /decoders/files <operation/api.controllers.decoder_controller.get_decoders_files>` (:ref:`decoder:file <api_rbac_reference_resources>`)
-  :api-ref:`GET /decoders/files/{filename} <operation/api.controllers.decoder_controller.get_file>` (:ref:`decoder:file <api_rbac_reference_resources>`)
-  :api-ref:`GET /decoders/parents <operation/api.controllers.decoder_controller.get_decoders_parents>` (:ref:`decoder:file <api_rbac_reference_resources>`)

decoders:update
~~~~~~~~~~~~~~~

-  :api-ref:`PUT /decoders/files/{filename} <operation/api.controllers.decoder_controller.put_file>` (:ref:`*:* <api_rbac_reference_resources>`)

decoders:delete
~~~~~~~~~~~~~~~

-  :api-ref:`PUT /decoders/files/{filename} <operation/api.controllers.decoder_controller.put_file>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /decoders/files/{filename} <operation/api.controllers.decoder_controller.delete_file>` (:ref:`decoder:file <api_rbac_reference_resources>`)

Events
^^^^^^

The :api-ref:`/event <tag/Events>` endpoint of the Wazuh server API allows users to ingest security events to the Wazuh analysis engine.

event:ingest
~~~~~~~~~~~~

-  :api-ref:`POST /events <operation/api.controllers.event_controller.forward_event>` (:ref:`*:* <api_rbac_reference_resources>`)

Group
^^^^^

The :api-ref:`/groups <tag/Groups>` endpoint of the Wazuh server API enables users to group Wazuh agents into distinct subsets for centralized configurations.

group:create
~~~~~~~~~~~~

-  :api-ref:`POST /groups <operation/api.controllers.agent_controller.post_group>` (:ref:`*:* <api_rbac_reference_resources>`)

group:delete
~~~~~~~~~~~~

-  :api-ref:`DELETE /groups <operation/api.controllers.agent_controller.delete_groups>` (:ref:`group:id <api_rbac_reference_resources>`)

group:modify_assignments
~~~~~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`DELETE /agents/group <operation/api.controllers.agent_controller.delete_multiple_agent_single_group>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /agents/{agent_id}/group <operation/api.controllers.agent_controller.delete_single_agent_multiple_groups>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /agents/{agent_id}/group/{group_id} <operation/api.controllers.agent_controller.delete_single_agent_single_group>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/group <operation/api.controllers.agent_controller.put_multiple_agent_single_group>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/{agent_id}/group/{group_id} <operation/api.controllers.agent_controller.put_agent_single_group>` (:ref:`group:id <api_rbac_reference_resources>`)

group:read
~~~~~~~~~~

-  :api-ref:`GET /groups <operation/api.controllers.agent_controller.get_list_group>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /groups/{group_id}/agents <operation/api.controllers.agent_controller.get_agents_in_group>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /groups/{group_id}/configuration <operation/api.controllers.agent_controller.get_group_config>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /groups/{group_id}/files <operation/api.controllers.agent_controller.get_group_files>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /groups/{group_id}/files/{file_name} <operation/api.controllers.agent_controller.get_group_file>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /overview/agents <operation/api.controllers.overview_controller.get_overview_agents>` (:ref:`group:id <api_rbac_reference_resources>`)

group:update_config
~~~~~~~~~~~~~~~~~~~

-  :api-ref:`PUT /groups/{group_id}/configuration <operation/api.controllers.agent_controller.put_group_config>` (:ref:`group:id <api_rbac_reference_resources>`)

Lists
^^^^^

The :api-ref:`/lists <tag/Lists>` endpoint of the Wazuh server API allows users to retrieve and manage the CDB lists that are used for checking malicious files on Wazuh agents.

lists:read
~~~~~~~~~~

-  :api-ref:`GET /lists <operation/api.controllers.cdb_list_controller.get_lists>` (:ref:`list:file <api_rbac_reference_resources>`)
-  :api-ref:`GET /lists/files <operation/api.controllers.cdb_list_controller.get_lists_files>` (:ref:`list:file <api_rbac_reference_resources>`)
-  :api-ref:`GET /lists/files/{filename} <operation/api.controllers.cdb_list_controller.get_file>` (:ref:`list:file <api_rbac_reference_resources>`)

lists:update
~~~~~~~~~~~~

-  :api-ref:`PUT /lists/files/{filename} <operation/api.controllers.cdb_list_controller.put_file>` (:ref:`*:* <api_rbac_reference_resources>`)

lists:delete
~~~~~~~~~~~~

-  :api-ref:`DELETE /lists/files/{filename} <operation/api.controllers.cdb_list_controller.delete_file>` (:ref:`list:file <api_rbac_reference_resources>`)
-  :api-ref:`PUT /lists/files/{filename} <operation/api.controllers.cdb_list_controller.put_file>` (:ref:`*:* <api_rbac_reference_resources>`)

Logtest
^^^^^^^

The :api-ref:`/logtest <tag/Logtest>` endpoint of the Wazuh server API allows users to test and verify new rules and decoders against provided log examples in the Wazuh analysis engine.

logtest:run
~~~~~~~~~~~

-  :api-ref:`PUT /logtest <operation/api.controllers.logtest_controller.run_logtest_tool>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /logtest/sessions/{token} <operation/api.controllers.logtest_controller.end_logtest_session>` (:ref:`*:* <api_rbac_reference_resources>`)

Manager
^^^^^^^

The :api-ref:`/manager <tag/Manager>` endpoint of the Wazuh server API enables users to manage and collect relevant information from the Wazuh manager.

manager:read_api_config
~~~~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`GET /manager/api/config <operation/api.controllers.manager_controller.get_api_config>` (:ref:`*:* <api_rbac_reference_resources>`)

manager:read
~~~~~~~~~~~~

-  :api-ref:`GET /manager/configuration <operation/api.controllers.manager_controller.get_configuration>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /manager/configuration/validation <operation/api.controllers.manager_controller.get_conf_validation>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /manager/configuration/{component}/{configuration} <operation/api.controllers.manager_controller.get_manager_config_ondemand>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /manager/daemons/stats <operation/api.controllers.manager_controller.get_daemon_stats>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /manager/info <operation/api.controllers.manager_controller.get_info>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /manager/logs <operation/api.controllers.manager_controller.get_log>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /manager/logs/summary <operation/api.controllers.manager_controller.get_log_summary>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /manager/stats <operation/api.controllers.manager_controller.get_stats>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /manager/stats/analysisd <operation/api.controllers.manager_controller.get_stats_analysisd>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /manager/stats/hourly <operation/api.controllers.manager_controller.get_stats_hourly>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /manager/stats/remoted <operation/api.controllers.manager_controller.get_stats_remoted>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /manager/stats/weekly <operation/api.controllers.manager_controller.get_stats_weekly>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /manager/status <operation/api.controllers.manager_controller.get_status>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`PUT /manager/restart <operation/api.controllers.manager_controller.put_restart>` (:ref:`*:* <api_rbac_reference_resources>`)

manager:restart
~~~~~~~~~~~~~~~

-  :api-ref:`PUT /manager/restart <operation/api.controllers.manager_controller.put_restart>` (:ref:`*:* <api_rbac_reference_resources>`)

manager:update_config
~~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`PUT /manager/configuration <operation/api.controllers.manager_controller.update_configuration>` (:ref:`*:* <api_rbac_reference_resources>`)

MITRE
^^^^^

The :api-ref:`/mitre <tag/MITRE>` endpoint of the Wazuh server API allows users to retrieve a high-level overview of the corresponding tactics and techniques from the MITRE ATT&CK database.

mitre:read
~~~~~~~~~~

-  :api-ref:`GET /mitre/metadata <operation/api.controllers.mitre_controller.get_metadata>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /mitre/tactics <operation/api.controllers.mitre_controller.get_tactics>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /mitre/techniques <operation/api.controllers.mitre_controller.get_techniques>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /mitre/groups <operation/api.controllers.mitre_controller.get_groups>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /mitre/mitigations <operation/api.controllers.mitre_controller.get_mitigations>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /mitre/software <operation/api.controllers.mitre_controller.get_software>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /mitre/references <operation/api.controllers.mitre_controller.get_references>` (:ref:`*:* <api_rbac_reference_resources>`)

Rootcheck
^^^^^^^^^

The :api-ref:`/rootcheck <tag/Rootcheck>` endpoint of the Wazuh server API enables users to interact with the Wazuh rootcheck module and retrieve results from the scans on the Wazuh agents.

rootcheck:clear
~~~~~~~~~~~~~~~

-  :api-ref:`DELETE /rootcheck/{agent_id} <operation/api.controllers.rootcheck_controller.delete_rootcheck>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /experimental/rootcheck <operation/api.controllers.experimental_controller.clear_rootcheck_database>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

rootcheck:read
~~~~~~~~~~~~~~

-  :api-ref:`GET /rootcheck/{agent_id} <operation/api.controllers.rootcheck_controller.get_rootcheck_agent>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /rootcheck/{agent_id}/last_scan <operation/api.controllers.rootcheck_controller.get_last_scan_agent>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

rootcheck:run
~~~~~~~~~~~~~

-  :api-ref:`PUT /rootcheck <operation/api.controllers.rootcheck_controller.put_rootcheck>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

Rules
^^^^^

The :api-ref:`/rules <tag/Rules>` endpoint of the Wazuh server API lets users manage and retrieve information about the Wazuh rules that are used to analyze incoming events and generate alerts.

rules:read
~~~~~~~~~~

-  :api-ref:`GET /rules <operation/api.controllers.rule_controller.get_rules>` (:ref:`rule:file <api_rbac_reference_resources>`)
-  :api-ref:`GET /rules/files <operation/api.controllers.rule_controller.get_rules_files>` (:ref:`rule:file <api_rbac_reference_resources>`)
-  :api-ref:`GET /rules/files/{filename} <operation/api.controllers.rule_controller.get_file>` (:ref:`rule:file <api_rbac_reference_resources>`)
-  :api-ref:`GET /rules/groups <operation/api.controllers.rule_controller.get_rules_groups>` (:ref:`rule:file <api_rbac_reference_resources>`)
-  :api-ref:`GET /rules/requirement/{requirement} <operation/api.controllers.rule_controller.get_rules_requirement>` (:ref:`rule:file <api_rbac_reference_resources>`)

rules:update
~~~~~~~~~~~~

-  :api-ref:`PUT /rules/files/{filename} <operation/api.controllers.rule_controller.put_file>` (:ref:`*:* <api_rbac_reference_resources>`)

rules:delete
~~~~~~~~~~~~

-  :api-ref:`PUT /rules/files/{filename} <operation/api.controllers.rule_controller.put_file>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /rules/files/{filename} <operation/api.controllers.rule_controller.delete_file>` (:ref:`rule:file <api_rbac_reference_resources>`)

SCA
^^^

The :api-ref:`/sca <tag/SCA>` endpoint of the Wazuh server API allows users to interact with the Wazuh SCA module and collect relevant SCA scan results from Wazuh agents.

sca:read
~~~~~~~~

-  :api-ref:`GET /sca/{agent_id} <operation/api.controllers.sca_controller.get_sca_agent>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /sca/{agent_id}/checks/{policy_id} <operation/api.controllers.sca_controller.get_sca_checks>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

Security
^^^^^^^^

The :api-ref:`/security <tag/Security>` endpoint of the Wazuh server API enables administrators to manage security-related aspects within the Wazuh environment.

security:create_user
~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`POST /security/users <operation/api.controllers.security_controller.create_user>` (:ref:`*:* <api_rbac_reference_resources>`)

security:create
~~~~~~~~~~~~~~~

-  :api-ref:`POST /security/policies <operation/api.controllers.security_controller.add_policy>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`POST /security/roles <operation/api.controllers.security_controller.add_role>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`POST /security/rules <operation/api.controllers.security_controller.add_rule>` (:ref:`*:* <api_rbac_reference_resources>`)

security:delete
~~~~~~~~~~~~~~~

-  :api-ref:`DELETE /security/policies <operation/api.controllers.security_controller.remove_policies>` (:ref:`policy:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /security/roles <operation/api.controllers.security_controller.remove_roles>` (:ref:`role:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /security/roles/{role_id}/policies <operation/api.controllers.security_controller.remove_role_policy>` (:ref:`role:id <api_rbac_reference_resources>`, :ref:`policy:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /security/roles/{role_id}/rules <operation/api.controllers.security_controller.remove_role_rule>` (:ref:`role:id <api_rbac_reference_resources>`, :ref:`rule:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /security/rules <operation/api.controllers.security_controller.remove_rules>` (:ref:`rule:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /security/users <operation/api.controllers.security_controller.delete_users>` (:ref:`user:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /security/users/{user_id}/roles <operation/api.controllers.security_controller.remove_user_role>` (:ref:`user:id <api_rbac_reference_resources>`, :ref:`role:id <api_rbac_reference_resources>`)

security:edit_run_as
~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`PUT /security/users/{user_id}/run_as <operation/api.controllers.security_controller.edit_run_as>` (:ref:`*:* <api_rbac_reference_resources>`)

security:read_config
~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`GET /security/config <operation/api.controllers.security_controller.get_security_config>` (:ref:`*:* <api_rbac_reference_resources>`)

security:read
~~~~~~~~~~~~~

-  :api-ref:`GET /security/policies <operation/api.controllers.security_controller.get_policies>` (:ref:`policy:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /security/roles <operation/api.controllers.security_controller.get_roles>` (:ref:`role:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /security/rules <operation/api.controllers.security_controller.get_rules>` (:ref:`rule:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /security/users <operation/api.controllers.security_controller.get_users>` (:ref:`user:id <api_rbac_reference_resources>`)

security:revoke
~~~~~~~~~~~~~~~

-  :api-ref:`PUT /security/user/revoke <operation/api.controllers.security_controller.revoke_all_tokens>` (:ref:`*:* <api_rbac_reference_resources>`)

security:update_config
~~~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`DELETE /security/config <operation/api.controllers.security_controller.delete_security_config>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`PUT /security/config <operation/api.controllers.security_controller.put_security_config>` (:ref:`*:* <api_rbac_reference_resources>`)

security:update
~~~~~~~~~~~~~~~

-  :api-ref:`POST /security/roles/{role_id}/policies <operation/api.controllers.security_controller.set_role_policy>` (:ref:`role:id <api_rbac_reference_resources>`, :ref:`policy:id <api_rbac_reference_resources>`)
-  :api-ref:`POST /security/roles/{role_id}/rules <operation/api.controllers.security_controller.set_role_rule>` (:ref:`role:id <api_rbac_reference_resources>`, :ref:`rule:id <api_rbac_reference_resources>`)
-  :api-ref:`POST /security/users/{user_id}/roles <operation/api.controllers.security_controller.set_user_role>` (:ref:`user:id <api_rbac_reference_resources>`, :ref:`role:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /security/policies/{policy_id} <operation/api.controllers.security_controller.update_policy>` (:ref:`policy:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /security/roles/{role_id} <operation/api.controllers.security_controller.update_role>` (:ref:`role:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /security/rules/{rule_id} <operation/api.controllers.security_controller.update_rule>` (:ref:`rule:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /security/users/{user_id} <operation/api.controllers.security_controller.update_user>` (:ref:`user:id <api_rbac_reference_resources>`)

File integrity monitoring
^^^^^^^^^^^^^^^^^^^^^^^^^

The :api-ref:`/syscheck <tag/Syscheck>` endpoint of the Wazuh server API allows users to interact with the Wazuh File Integrity Monitoring module as it initiates routine scans and retrieves syscheck results.

syscheck:clear
~~~~~~~~~~~~~~

-  :api-ref:`DELETE /experimental/syscheck <operation/api.controllers.experimental_controller.clear_syscheck_database>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /syscheck/{agent_id} <operation/api.controllers.syscheck_controller.delete_syscheck_agent>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

syscheck:read
~~~~~~~~~~~~~

-  :api-ref:`GET /syscheck/{agent_id} <operation/api.controllers.syscheck_controller.get_syscheck_agent>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /syscheck/{agent_id}/last_scan <operation/api.controllers.syscheck_controller.get_last_scan_agent>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

syscheck:run
~~~~~~~~~~~~

-  :api-ref:`PUT /syscheck <operation/api.controllers.syscheck_controller.put_syscheck>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

Syscollector
^^^^^^^^^^^^

The :api-ref:`/syscollector <tag/Syscollector>` endpoint of the Wazuh server API allows users to collect system information from monitored endpoints and send them to the Wazuh server.

syscollector:read
~~~~~~~~~~~~~~~~~

-  :api-ref:`GET /experimental/syscollector/hardware <operation/api.controllers.experimental_controller.get_hardware_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /experimental/syscollector/hotfixes <operation/api.controllers.experimental_controller.get_hotfixes_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /experimental/syscollector/netaddr <operation/api.controllers.experimental_controller.get_network_address_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /experimental/syscollector/netiface <operation/api.controllers.experimental_controller.get_network_interface_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /experimental/syscollector/netproto <operation/api.controllers.experimental_controller.get_network_protocol_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /experimental/syscollector/os <operation/api.controllers.experimental_controller.get_os_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /experimental/syscollector/packages <operation/api.controllers.experimental_controller.get_packages_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /experimental/syscollector/ports <operation/api.controllers.experimental_controller.get_ports_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /experimental/syscollector/processes <operation/api.controllers.experimental_controller.get_processes_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /syscollector/{agent_id}/hardware <operation/api.controllers.syscollector_controller.get_hardware_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /syscollector/{agent_id}/hotfixes <operation/api.controllers.syscollector_controller.get_hotfix_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /syscollector/{agent_id}/netaddr <operation/api.controllers.syscollector_controller.get_network_address_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /syscollector/{agent_id}/netiface <operation/api.controllers.syscollector_controller.get_network_interface_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /syscollector/{agent_id}/netproto <operation/api.controllers.syscollector_controller.get_network_protocol_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /syscollector/{agent_id}/os <operation/api.controllers.syscollector_controller.get_os_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /syscollector/{agent_id}/packages <operation/api.controllers.syscollector_controller.get_packages_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /syscollector/{agent_id}/ports <operation/api.controllers.syscollector_controller.get_ports_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /syscollector/{agent_id}/processes <operation/api.controllers.syscollector_controller.get_processes_info>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

Task
^^^^^

The :api-ref:`/tasks <tag/Tasks>` endpoint of the Wazuh server API enables users to get status information about the tasks performed by the Wazuh manager.

task:status
~~~~~~~~~~~

-  :api-ref:`GET /tasks/status <operation/api.controllers.task_controller.get_tasks_status>` (:ref:`*:* <api_rbac_reference_resources>`)

Vulnerability
^^^^^^^^^^^^^

The :api-ref:`/vulnerability <tag/Vulnerability>` endpoint of the Wazuh server API allows users to perform vulnerability detector scans and collect relevant information about vulnerabilities from Wazuh agents. This API endpoint has been deprecated since version 4.7.

vulnerability:read
~~~~~~~~~~~~~~~~~~

-  :api-ref:`GET /vulnerability/{agent_id} <operation/api.controllers.vulnerability_controller.get_vulnerability_agent>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`) - *Deprecated since version 4.7*
-  :api-ref:`GET /vulnerability/{agent_id}/last_scan <operation/api.controllers.vulnerability_controller.get_last_scan_agent>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`) - *Deprecated since version 4.7*
-  :api-ref:`GET /vulnerability/{agent_id}/summary/{field} <operation/api.controllers.vulnerability_controller.get_summary>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`) - *Deprecated since version 4.7*

vulnerability:run
~~~~~~~~~~~~~~~~~~

-  :api-ref:`PUT /vulnerability <operation/api.controllers.vulnerability_controller.put_vulnerability>` (:ref:`*:* <api_rbac_reference_resources>`) - *Deprecated since version 4.7*

.. _api_rbac_reference_default_policies:

Default policies
----------------

agents_all
^^^^^^^^^^

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

Allow sending active response commands to Wazuh agents.

.. code-block:: yaml

   agents:
     actions:
       - active-response:command
     resources:
       - agent:id:*
     effect: allow

agents_read
^^^^^^^^^^^

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
^^^^^^^^^^^

Allow reading the agent ciscat results information.

.. code-block:: yaml

   ciscat:
     actions:
       - ciscat:read
     resources:
       - agent:id:*
     effect: allow

cluster_all
^^^^^^^^^^^

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
^^^^^^^^^^^^

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
^^^^^^^^^^^^

Allow managing all decoder files in the Wazuh server.

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
^^^^^^^^^^^^^

Allow reading all decoder files in the Wazuh server.

.. code-block:: yaml

   decoders:
     actions:
       - decoders:read
     resources:
       - decoder:file:*
     effect: allow

events_ingest
^^^^^^^^^^^^^

Allow sending events to the Wazuh analysis engine.

.. code-block:: yaml

   resourceless:
     actions:
       - event:ingest
     resources:
       - '*:*:*'
     effect: allow

lists_all
^^^^^^^^^

Allow managing all CDB lists files on the Wazuh server.

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
^^^^^^^^^^

Allow reading the path of  all the lists in the Wazuh server.

.. code-block:: yaml

   lists:
     actions:
       - lists:read
     resources:
       - list:file:*
     effect: allow

logtest_all
^^^^^^^^^^^

Provide access to all logtest related functionalities.

.. code-block:: yaml

   logtest:
     actions:
       - logtest:run
     resources:
       - '*:*:*'
     effect: allow

mitre_read
^^^^^^^^^^

Allow reading MITRE database information.

.. code-block:: yaml

   mitre:
     actions:
       - mitre:read
     resources:
       - '*:*:*'
     effect: allow

rootcheck_all
^^^^^^^^^^^^^

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
^^^^^^^^^

Allow managing all rule files in the Wazuh server.

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
^^^^^^^^^^

Allow reading all rule files in the system.

.. code-block:: yaml

   rules:
     actions:
       - rules:read
     resources:
       - rule:file:*
     effect: allow

sca_read
^^^^^^^^

Allow reading the agent sca information.

.. code-block:: yaml

   sca:
     actions:
       - sca:read
     resources:
       - agent:id:*
     effect: allow

security_all
^^^^^^^^^^^^

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
^^^^^^^^^^^^

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
^^^^^^^^^^^^^

Allow reading syscheck information.

.. code-block:: yaml

   syscheck:
     actions:
       - syscheck:read
     resources:
       - agent:id:*
     effect: allow

syscollector_read
^^^^^^^^^^^^^^^^^

Allow reading agents information.

.. code-block:: yaml

   syscollector:
     actions:
       - syscollector:read
     resources:
       - agent:id:*
     effect: allow

task_status
^^^^^^^^^^^

Allow reading tasks information.

.. code-block:: yaml

   task:
     actions:
       - task:status
     resources:
       - '*:*:*'
     effect: allow

users_all
^^^^^^^^^

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

The administrator role has full access to all endpoints in the Wazuh server API.

**Policies**

   -  `agents_all`_
   -  `agents_commands`_
   -  `ciscat_read`_
   -  `cluster_all`_
   -  `decoders_all`_
   -  `lists_all`_
   -  `logtest_all`_
   -  `mitre_read`_
   -  `rootcheck_all`_
   -  `rules_all`_
   -  `sca_read`_
   -  `security_all`_
   -  `syscheck_all`_
   -  `syscollector_read`_
   -  `task_status`_
   -  `vulnerability_read`_
   -  `vulnerability_run`_

**Rules**

   -  `wui_elastic_admin`_
   -  `wui_opendistro_admin`_

agents_admin
^^^^^^^^^^^^

The agent administrator role has full access to all agents related functionalities.

**Policies**

   -  `agents_all`_

agents_readonly
^^^^^^^^^^^^^^^

Read only role for agents related functionalities.

**Policies**

   -  `agents_read`_

cluster_admin
^^^^^^^^^^^^^

Manager administrator of the Wazuh server cluster, this role has full access to all manager related functionalities.

**Policies**

   -  `cluster_all`_

cluster_readonly
^^^^^^^^^^^^^^^^

Read only role for manager related functionalities.

**Policies**

   -  `cluster_read`_

readonly
^^^^^^^^

Read only role, this role can read all the information of the system.

**Policies**

   -  `agents_read`_
   -  `ciscat_read`_
   -  `cluster_read`_
   -  `decoders_read`_
   -  `lists_read`_
   -  `mitre_read`_
   -  `rootcheck_read`_
   -  `rules_read`_
   -  `sca_read`_
   -  `syscheck_read`_
   -  `syscollector_read`_
   -  `vulnerability_read`_

users_admin
^^^^^^^^^^^

Users administrator of the system, this role provides full access to all users related functionalities.

**Policies**

   -  `users_all`_

Default rules
-------------

.. warning::

   run_as permissions through these mapping rules can only be obtained with ``wazuh-wui`` user. These rules will never match an authorization context for any other Wazuh server API user.

wui_elastic_admin
^^^^^^^^^^^^^^^^^

Administrator permissions for the elastic users of the Wazuh dashboard.

.. code-block:: yaml

   rule:
       FIND:
           username: "elastic"

wui_opendistro_admin
^^^^^^^^^^^^^^^^^^^^

Administrator permissions for the opendistro users of the Wazuh dashboard.

.. code-block:: yaml

   rule:
       FIND:
           user_name: "admin"
