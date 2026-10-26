.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the RBAC actions, resources, and default roles and policies available on the Wazuh manager API.

RBAC reference
==============

RBAC policies consist of three elements: **actions**, **resources**, and **effect**. Each API endpoint involves one or more actions and can be performed on specific resources.

For example, the :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>` endpoint is used to obtain the information of one or all Wazuh agents. This endpoint applies the action ``agent:read`` on the resource ``agent:id`` or ``agent:group``. For example, ``agent:id:001`` (agent 001) or ``agent:id:*`` (all agents). All the existing resources, available actions, and the endpoints affected by each one can be found on this reference page.

To list the RBAC actions and resources that your Wazuh manager supports, use the :api-ref:`GET /security/actions <operation/api.controllers.security_controller.get_rbac_actions>` and :api-ref:`GET /security/resources <operation/api.controllers.security_controller.get_rbac_resources>` endpoints. :api-ref:`GET /security/actions <operation/api.controllers.security_controller.get_rbac_actions>` also returns the endpoints related to each action. These endpoints require the ``security:read_config`` action.

The Wazuh manager API also includes default policies, roles, and rules that you can use immediately instead of creating new ones. The defaults listed here are those of Wazuh |WAZUH_CURRENT|.

:ref:`Resources <api_rbac_reference_resources>`

:ref:`Actions <api_rbac_reference_actions>`

:ref:`Agent <api_rbac_reference_agent>`

-  :ref:`agent:create <api_rbac_reference_agent_create>`
-  :ref:`agent:delete <api_rbac_reference_agent_delete>`
-  :ref:`agent:modify_group <api_rbac_reference_agent_modify_group>`
-  :ref:`agent:read <api_rbac_reference_agent_read>`
-  :ref:`agent:reload <api_rbac_reference_agent_reload>`
-  :ref:`agent:restart <api_rbac_reference_agent_restart>`
-  :ref:`agent:upgrade <api_rbac_reference_agent_upgrade>`
-  :ref:`agent:scan_vulnerability <api_rbac_reference_agent_scan_vulnerability>`
-  :ref:`agent:uninstall <api_rbac_reference_agent_uninstall>`
-  :ref:`agent:read_secrets <api_rbac_reference_agent_read_secrets>`

:ref:`Cluster <api_rbac_reference_cluster>`

-  :ref:`cluster:read_api_config <api_rbac_reference_cluster_read_api_config>`
-  :ref:`cluster:read <api_rbac_reference_cluster_read>`
-  :ref:`cluster:restart <api_rbac_reference_cluster_restart>`
-  :ref:`cluster:status <api_rbac_reference_cluster_status>`
-  :ref:`cluster:update_config <api_rbac_reference_cluster_update_config>`
-  :ref:`cluster:read_secrets <api_rbac_reference_cluster_read_secrets>`
-  :ref:`Enrollment token <api_rbac_reference_enrollment_token>`
-  :ref:`enrollment_token:create <api_rbac_reference_enrollment_token_create>`
-  :ref:`enrollment_token:delete <api_rbac_reference_enrollment_token_delete>`
-  :ref:`enrollment_token:read <api_rbac_reference_enrollment_token_read>`

:ref:`Group <api_rbac_reference_group>`

-  :ref:`group:create <api_rbac_reference_group_create>`
-  :ref:`group:delete <api_rbac_reference_group_delete>`
-  :ref:`group:modify_assignments <api_rbac_reference_group_modify_assignments>`
-  :ref:`group:read <api_rbac_reference_group_read>`
-  :ref:`group:update_config <api_rbac_reference_group_update_config>`

:ref:`MITRE <api_rbac_reference_mitre>`

-  :ref:`mitre:read <api_rbac_reference_mitre_read>`

:ref:`Security <api_rbac_reference_security>`

-  :ref:`security:create_user <api_rbac_reference_security_create_user>`
-  :ref:`security:create <api_rbac_reference_security_create>`
-  :ref:`security:delete <api_rbac_reference_security_delete>`
-  :ref:`security:edit_run_as <api_rbac_reference_security_edit_run_as>`
-  :ref:`security:read_config <api_rbac_reference_security_read_config>`
-  :ref:`security:read <api_rbac_reference_security_read>`
-  :ref:`security:revoke <api_rbac_reference_security_revoke>`
-  :ref:`security:update_config <api_rbac_reference_security_update_config>`
-  :ref:`security:update <api_rbac_reference_security_update>`

:ref:`Default policies <api_rbac_reference_default_policies>`

-  :ref:`agents_all_* <api_rbac_reference_agents_all>`
-  :ref:`agents_read_* <api_rbac_reference_agents_read>`
-  :ref:`cluster_all_* <api_rbac_reference_cluster_all>`
-  :ref:`cluster_read_* <api_rbac_reference_cluster_read_2>`
-  :ref:`mitre_read_* <api_rbac_reference_mitre_read_2>`
-  :ref:`secrets_read_* <api_rbac_reference_secrets_read>`
-  :ref:`security_all_* <api_rbac_reference_security_all>`
-  :ref:`security_read_* <api_rbac_reference_security_read_2>`
-  :ref:`users_all_* <api_rbac_reference_users_all>`
-  :ref:`users_modify_run_as_* <api_rbac_reference_users_modify_run_as>`

:ref:`Default roles <api_rbac_reference_default_roles>`

-  :ref:`administrator <api_rbac_reference_administrator>`
-  :ref:`agents_admin <api_rbac_reference_agents_admin>`
-  :ref:`agents_readonly <api_rbac_reference_agents_readonly>`
-  :ref:`cluster_admin <api_rbac_reference_cluster_admin>`
-  :ref:`cluster_readonly <api_rbac_reference_cluster_readonly>`
-  :ref:`readonly <api_rbac_reference_readonly>`
-  :ref:`users_admin <api_rbac_reference_users_admin>`
-  :ref:`wazuh_indexer_admin <api_rbac_reference_wazuh_indexer_admin>`

:ref:`Default rules <api_rbac_reference_default_rules>`

-  :ref:`wui_elastic_admin <api_rbac_reference_wui_elastic_admin>`
-  :ref:`wui_opensearch_admin <api_rbac_reference_wui_opensearch_admin>`
-  :ref:`wazuh_indexer_demo <api_rbac_reference_wazuh_indexer_demo>`
-  :ref:`wazuh_indexer_readonly <api_rbac_reference_wazuh_indexer_readonly>`
-  :ref:`wazuh_indexer_admin <api_rbac_reference_wazuh_indexer_admin_2>`

.. _api_rbac_reference_resources:

Resources
---------

+-----------------+----------------------------------------------------------------------------------------------------------------------------+------------------+
| Resources       | Description                                                                                                                | Example          |
+=================+============================================================================================================================+==================+
| ``*:*``         | References "any" or "all" resources across all scopes. Actions using these resources are called resourceless.              |                  |
+-----------------+----------------------------------------------------------------------------------------------------------------------------+------------------+
| ``agent:group`` | Reference agents through group name. This resource is disaggregated into the agent's IDs belonging to the specified group. | agent:group:web  |
+-----------------+----------------------------------------------------------------------------------------------------------------------------+------------------+
| ``agent:id``    | Reference agents through agent ID                                                                                          | agent:id:001     |
+-----------------+----------------------------------------------------------------------------------------------------------------------------+------------------+
| ``group:id``    | Reference agent groups through group ID                                                                                    | group:id:default |
+-----------------+----------------------------------------------------------------------------------------------------------------------------+------------------+
| ``node:id``     | Reference cluster node by node ID                                                                                          | node:id:worker1  |
+-----------------+----------------------------------------------------------------------------------------------------------------------------+------------------+
| ``policy:id``   | Reference security policy through its ID                                                                                   | policy:id:1      |
+-----------------+----------------------------------------------------------------------------------------------------------------------------+------------------+
| ``role:id``     | Reference security role through its ID                                                                                     | role:id:1        |
+-----------------+----------------------------------------------------------------------------------------------------------------------------+------------------+
| ``rule:id``     | Reference security rule through its ID                                                                                     | rule:id:1        |
+-----------------+----------------------------------------------------------------------------------------------------------------------------+------------------+
| ``user:id``     | Reference security user through its ID                                                                                     | user:id:1        |
+-----------------+----------------------------------------------------------------------------------------------------------------------------+------------------+

.. _api_rbac_reference_actions:

Actions
-------

In each action, the affected endpoints are specified along with the necessary resources, following this structure: ``<METHOD>`` ``<ENDPOINT>`` (``<RESOURCE>``).

.. _api_rbac_reference_agent:

Agent
^^^^^

The :api-ref:`/agents <tag/Agents>` endpoint of the Wazuh manager API allows users to enroll and manage Wazuh agents on the Wazuh manager.

.. _api_rbac_reference_agent_create:

agent:create
~~~~~~~~~~~~

-  :api-ref:`POST /agents <operation/api.controllers.agent_controller.add_agent>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`POST /agents/insert <operation/api.controllers.agent_controller.insert_agent>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`POST /agents/insert/quick <operation/api.controllers.agent_controller.post_new_agent>` (:ref:`*:* <api_rbac_reference_resources>`)

.. _api_rbac_reference_agent_delete:

agent:delete
~~~~~~~~~~~~

-  :api-ref:`DELETE /agents <operation/api.controllers.agent_controller.delete_agents>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

.. _api_rbac_reference_agent_modify_group:

agent:modify_group
~~~~~~~~~~~~~~~~~~

-  :api-ref:`DELETE /agents/group <operation/api.controllers.agent_controller.delete_multiple_agent_single_group>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /agents/{agent_id}/group <operation/api.controllers.agent_controller.delete_single_agent_multiple_groups>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /agents/{agent_id}/group/{group_id} <operation/api.controllers.agent_controller.delete_single_agent_single_group>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/group <operation/api.controllers.agent_controller.put_multiple_agent_single_group>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/{agent_id}/group/{group_id} <operation/api.controllers.agent_controller.put_agent_single_group>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

.. _api_rbac_reference_agent_read:

agent:read
~~~~~~~~~~

-  :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /agents/no_group <operation/api.controllers.agent_controller.get_agent_no_group>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /agents/outdated <operation/api.controllers.agent_controller.get_agent_outdated>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /agents/stats/distinct <operation/api.controllers.agent_controller.get_agent_fields>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /agents/summary <operation/api.controllers.agent_controller.get_agents_summary>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /agents/summary/os <operation/api.controllers.agent_controller.get_agent_summary_os>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /agents/summary/status <operation/api.controllers.agent_controller.get_agent_summary_status>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /groups/{group_id}/agents <operation/api.controllers.agent_controller.get_agents_in_group>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`GET /overview/agents <operation/api.controllers.overview_controller.get_overview_agents>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

.. _api_rbac_reference_agent_read_secrets:

agent:read_secrets
~~~~~~~~~~~~~~~~~~

-  :api-ref:`GET /agents/{agent_id}/key <operation/api.controllers.agent_controller.get_agent_key>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

.. _api_rbac_reference_agent_reload:

agent:reload
~~~~~~~~~~~~

-  :api-ref:`PUT /agents/group/{group_id}/reload <operation/api.controllers.agent_controller.reload_agents_by_group>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`). It also requires group:read on the group and agent:read on its agents
-  :api-ref:`PUT /agents/reload <operation/api.controllers.agent_controller.reload_agents>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/{agent_id}/reload <operation/api.controllers.agent_controller.reload_agent>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

.. _api_rbac_reference_agent_restart:

agent:restart
~~~~~~~~~~~~~

-  :api-ref:`PUT /agents/group/{group_id}/restart <operation/api.controllers.agent_controller.restart_agents_by_group>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`). It also requires group:read on the group and agent:read on its agents
-  :api-ref:`PUT /agents/restart <operation/api.controllers.agent_controller.restart_agents>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/{agent_id}/restart <operation/api.controllers.agent_controller.restart_agent>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

.. _api_rbac_reference_agent_scan_vulnerability:

agent:scan_vulnerability
~~~~~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`PUT /agents/scan/vulnerability <operation/api.controllers.agent_controller.scan_agents>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

.. _api_rbac_reference_agent_upgrade:

agent:upgrade
~~~~~~~~~~~~~

-  :api-ref:`PUT /agents/upgrade <operation/api.controllers.agent_controller.put_upgrade_agents>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/upgrade_custom <operation/api.controllers.agent_controller.put_upgrade_custom_agents>` (:ref:`agent:id <api_rbac_reference_resources>`, :ref:`agent:group <api_rbac_reference_resources>`)

.. _api_rbac_reference_agent_uninstall:

agent:uninstall
~~~~~~~~~~~~~~~

-  :api-ref:`GET /agents/uninstall <operation/api.controllers.agent_controller.get_agent_uninstall_permission>` (:ref:`*:* <api_rbac_reference_resources>`)

.. _api_rbac_reference_cluster:

Cluster
^^^^^^^

The :api-ref:`/cluster <tag/Cluster>` endpoint of the Wazuh manager API allows users to manage the configuration and health of every node in the Wazuh cluster.

.. _api_rbac_reference_cluster_read_api_config:

cluster:read_api_config
~~~~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`GET /cluster/api/config <operation/api.controllers.cluster_controller.get_api_config>` (:ref:`node:id <api_rbac_reference_resources>`)

.. _api_rbac_reference_cluster_read:

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
-  :api-ref:`GET /cluster/{node_id}/status <operation/api.controllers.cluster_controller.get_status_node>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/{node_id}/daemons/remoted/tls <operation/api.controllers.cluster_controller.get_remoted_tls_node>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /cluster/reload <operation/api.controllers.cluster_controller.put_reload>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /cluster/restart <operation/api.controllers.cluster_controller.put_restart>` (:ref:`node:id <api_rbac_reference_resources>`)

.. _api_rbac_reference_cluster_read_secrets:

cluster:read_secrets
~~~~~~~~~~~~~~~~~~~~

Without this action, the Wazuh manager API returns the enrollment password, the cluster key, and other credential values as \*\*\*\*\* in node and group configuration responses. :api-ref:`PUT /cluster/{node_id}/configuration <operation/api.controllers.cluster_controller.update_configuration>` also requires this action to change the cluster key or the indexer section.

-  :api-ref:`GET /cluster/local/config <operation/api.controllers.cluster_controller.get_config>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/{node_id}/configuration <operation/api.controllers.cluster_controller.get_configuration_node>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /cluster/{node_id}/configuration/{component}/{configuration} <operation/api.controllers.cluster_controller.get_node_config>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /groups/{group_id}/configuration <operation/api.controllers.agent_controller.get_group_config>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /groups/{group_id}/files/{file_name} <operation/api.controllers.agent_controller.get_group_file>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /cluster/{node_id}/configuration <operation/api.controllers.cluster_controller.update_configuration>` (:ref:`node:id <api_rbac_reference_resources>`)

.. _api_rbac_reference_cluster_restart:

cluster:restart
~~~~~~~~~~~~~~~

-  :api-ref:`PUT /cluster/restart <operation/api.controllers.cluster_controller.put_restart>` (:ref:`node:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /cluster/reload <operation/api.controllers.cluster_controller.put_reload>` (:ref:`node:id <api_rbac_reference_resources>`)

.. _api_rbac_reference_cluster_status:

cluster:status
~~~~~~~~~~~~~~

-  :api-ref:`GET /cluster/status <operation/api.controllers.cluster_controller.get_status>` (:ref:`*:* <api_rbac_reference_resources>`)

.. _api_rbac_reference_cluster_update_config:

cluster:update_config
~~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`PUT /cluster/{node_id}/configuration <operation/api.controllers.cluster_controller.update_configuration>` (:ref:`node:id <api_rbac_reference_resources>`)

.. _api_rbac_reference_enrollment_token:

Enrollment token
^^^^^^^^^^^^^^^^

The ``/agents/enrollment-tokens`` endpoint of the Wazuh manager API allows users to create, list, and revoke the tokens that new Wazuh agents use to enroll.

.. _api_rbac_reference_enrollment_token_create:

enrollment_token:create
~~~~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`POST /agents/enrollment-tokens <operation/api.controllers.agent_controller.create_enrollment_token>` (:ref:`*:* <api_rbac_reference_resources>`)

.. _api_rbac_reference_enrollment_token_delete:

enrollment_token:delete
~~~~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`DELETE /agents/enrollment-tokens <operation/api.controllers.agent_controller.delete_enrollment_tokens>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /agents/enrollment-tokens/{token_id} <operation/api.controllers.agent_controller.delete_enrollment_token>` (:ref:`*:* <api_rbac_reference_resources>`)

.. _api_rbac_reference_enrollment_token_read:

enrollment_token:read
~~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`GET /agents/enrollment-tokens <operation/api.controllers.agent_controller.get_enrollment_tokens>` (:ref:`*:* <api_rbac_reference_resources>`)

.. _api_rbac_reference_group:

Group
^^^^^

The :api-ref:`/groups <tag/Groups>` endpoint of the Wazuh manager API enables users to group Wazuh agents into distinct subsets for centralized configurations.

.. _api_rbac_reference_group_create:

group:create
~~~~~~~~~~~~

-  :api-ref:`POST /groups <operation/api.controllers.agent_controller.post_group>` (:ref:`*:* <api_rbac_reference_resources>`)

.. _api_rbac_reference_group_delete:

group:delete
~~~~~~~~~~~~

-  :api-ref:`DELETE /groups <operation/api.controllers.agent_controller.delete_groups>` (:ref:`group:id <api_rbac_reference_resources>`)

.. _api_rbac_reference_group_modify_assignments:

group:modify_assignments
~~~~~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`DELETE /agents/group <operation/api.controllers.agent_controller.delete_multiple_agent_single_group>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /agents/{agent_id}/group <operation/api.controllers.agent_controller.delete_single_agent_multiple_groups>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /agents/{agent_id}/group/{group_id} <operation/api.controllers.agent_controller.delete_single_agent_single_group>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/group <operation/api.controllers.agent_controller.put_multiple_agent_single_group>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /agents/{agent_id}/group/{group_id} <operation/api.controllers.agent_controller.put_agent_single_group>` (:ref:`group:id <api_rbac_reference_resources>`)

.. _api_rbac_reference_group_read:

group:read
~~~~~~~~~~

-  :api-ref:`GET /groups <operation/api.controllers.agent_controller.get_list_group>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /groups/{group_id}/agents <operation/api.controllers.agent_controller.get_agents_in_group>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /groups/{group_id}/configuration <operation/api.controllers.agent_controller.get_group_config>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /groups/{group_id}/files <operation/api.controllers.agent_controller.get_group_files>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /groups/{group_id}/files/{file_name} <operation/api.controllers.agent_controller.get_group_file>` (:ref:`group:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /overview/agents <operation/api.controllers.overview_controller.get_overview_agents>` (:ref:`group:id <api_rbac_reference_resources>`)

.. _api_rbac_reference_group_update_config:

group:update_config
~~~~~~~~~~~~~~~~~~~

-  :api-ref:`PUT /groups/{group_id}/configuration <operation/api.controllers.agent_controller.put_group_config>` (:ref:`group:id <api_rbac_reference_resources>`)

.. _api_rbac_reference_mitre:

MITRE
^^^^^

The :api-ref:`/mitre <tag/MITRE>` endpoint of the Wazuh manager API allows users to retrieve high-level overview about the corresponding tactics and techniques from the MITRE ATT&CK database.

.. _api_rbac_reference_mitre_read:

mitre:read
~~~~~~~~~~

-  :api-ref:`GET /mitre/metadata <operation/api.controllers.mitre_controller.get_metadata>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /mitre/tactics <operation/api.controllers.mitre_controller.get_tactics>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /mitre/techniques <operation/api.controllers.mitre_controller.get_techniques>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /mitre/groups <operation/api.controllers.mitre_controller.get_groups>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /mitre/mitigations <operation/api.controllers.mitre_controller.get_mitigations>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /mitre/software <operation/api.controllers.mitre_controller.get_software>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /mitre/references <operation/api.controllers.mitre_controller.get_references>` (:ref:`*:* <api_rbac_reference_resources>`)

.. _api_rbac_reference_security:

Security
^^^^^^^^

The :api-ref:`/security <tag/Security>` endpoint of the Wazuh manager API enables administrators to manage security-related aspects within the Wazuh environment.

.. _api_rbac_reference_security_create_user:

security:create_user
~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`POST /security/users <operation/api.controllers.security_controller.create_user>` (:ref:`*:* <api_rbac_reference_resources>`)

.. _api_rbac_reference_security_create:

security:create
~~~~~~~~~~~~~~~

-  :api-ref:`POST /security/policies <operation/api.controllers.security_controller.add_policy>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`POST /security/roles <operation/api.controllers.security_controller.add_role>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`POST /security/rules <operation/api.controllers.security_controller.add_rule>` (:ref:`*:* <api_rbac_reference_resources>`)

.. _api_rbac_reference_security_delete:

security:delete
~~~~~~~~~~~~~~~

-  :api-ref:`DELETE /security/policies <operation/api.controllers.security_controller.remove_policies>` (:ref:`policy:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /security/roles <operation/api.controllers.security_controller.remove_roles>` (:ref:`role:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /security/roles/{role_id}/policies <operation/api.controllers.security_controller.remove_role_policy>` (:ref:`role:id <api_rbac_reference_resources>`, :ref:`policy:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /security/roles/{role_id}/rules <operation/api.controllers.security_controller.remove_role_rule>` (:ref:`role:id <api_rbac_reference_resources>`, :ref:`rule:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /security/rules <operation/api.controllers.security_controller.remove_rules>` (:ref:`rule:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /security/users <operation/api.controllers.security_controller.delete_users>` (:ref:`user:id <api_rbac_reference_resources>`)
-  :api-ref:`DELETE /security/users/{user_id}/roles <operation/api.controllers.security_controller.remove_user_role>` (:ref:`user:id <api_rbac_reference_resources>`, :ref:`role:id <api_rbac_reference_resources>`)

.. _api_rbac_reference_security_edit_run_as:

security:edit_run_as
~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`PUT /security/users/{user_id}/run_as <operation/api.controllers.security_controller.edit_run_as>` (:ref:`*:* <api_rbac_reference_resources>`)

.. _api_rbac_reference_security_read_config:

security:read_config
~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`GET /security/actions <operation/api.controllers.security_controller.get_rbac_actions>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /security/config <operation/api.controllers.security_controller.get_security_config>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`GET /security/resources <operation/api.controllers.security_controller.get_rbac_resources>` (:ref:`*:* <api_rbac_reference_resources>`)

.. _api_rbac_reference_security_read:

security:read
~~~~~~~~~~~~~

-  :api-ref:`GET /security/policies <operation/api.controllers.security_controller.get_policies>` (:ref:`policy:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /security/roles <operation/api.controllers.security_controller.get_roles>` (:ref:`role:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /security/rules <operation/api.controllers.security_controller.get_rules>` (:ref:`rule:id <api_rbac_reference_resources>`)
-  :api-ref:`GET /security/users <operation/api.controllers.security_controller.get_users>` (:ref:`user:id <api_rbac_reference_resources>`)

.. _api_rbac_reference_security_revoke:

security:revoke
~~~~~~~~~~~~~~~

-  :api-ref:`PUT /security/user/revoke <operation/api.controllers.security_controller.revoke_all_tokens>` (:ref:`*:* <api_rbac_reference_resources>`)

.. _api_rbac_reference_security_update_config:

security:update_config
~~~~~~~~~~~~~~~~~~~~~~

-  :api-ref:`DELETE /security/config <operation/api.controllers.security_controller.delete_security_config>` (:ref:`*:* <api_rbac_reference_resources>`)
-  :api-ref:`PUT /security/config <operation/api.controllers.security_controller.put_security_config>` (:ref:`*:* <api_rbac_reference_resources>`)

.. _api_rbac_reference_security_update:

security:update
~~~~~~~~~~~~~~~

-  :api-ref:`POST /security/roles/{role_id}/policies <operation/api.controllers.security_controller.set_role_policy>` (:ref:`role:id <api_rbac_reference_resources>`, :ref:`policy:id <api_rbac_reference_resources>`)
-  :api-ref:`POST /security/roles/{role_id}/rules <operation/api.controllers.security_controller.set_role_rule>` (:ref:`role:id <api_rbac_reference_resources>`, :ref:`rule:id <api_rbac_reference_resources>`)
-  :api-ref:`POST /security/users/{user_id}/roles <tag/Security/operation/api.controllers.security_controller.set_user_role>` (:ref:`user:id <api_rbac_reference_resources>`, :ref:`role:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /security/policies/{policy_id} <operation/api.controllers.security_controller.update_policy>` (:ref:`policy:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /security/roles/{role_id} <operation/api.controllers.security_controller.update_role>` (:ref:`role:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /security/rules/{rule_id} <operation/api.controllers.security_controller.update_rule>` (:ref:`rule:id <api_rbac_reference_resources>`)
-  :api-ref:`PUT /security/users/{user_id} <operation/api.controllers.security_controller.update_user>` (:ref:`user:id <api_rbac_reference_resources>`)

.. _api_rbac_reference_default_policies:

Default policies
----------------

.. _api_rbac_reference_agents_all:

agents_all\_\*
^^^^^^^^^^^^^^

Grant full access to all Wazuh agent-related functionalities.

.. code-block:: yaml

   agents_all_resourceless:
     actions:
       - agent:create
       - group:create
       - agent:uninstall
       - enrollment_token:create
       - enrollment_token:read
       - enrollment_token:delete
     resources:
       - '*:*:*'
     effect: allow
   agents_all_agents:
     actions:
       - agent:read
       - agent:delete
       - agent:modify_group
       - agent:restart
       - agent:reload
       - agent:upgrade
       - agent:scan_vulnerability
     resources:
       - agent:id:*
       - agent:group:*
     effect: allow
   agents_all_groups:
     actions:
       - group:read
       - group:delete
       - group:update_config
       - group:modify_assignments
     resources:
       - group:id:*
     effect: allow

.. _api_rbac_reference_agents_read:

agents_read\_\*
^^^^^^^^^^^^^^^

Grant read access to all Wazuh agent-related functionalities.

.. code-block:: yaml

   agents_read_resourceless:
     actions:
       - enrollment_token:read
     resources:
       - '*:*:*'
     effect: allow
   agents_read_agents:
     actions:
       - agent:read
     resources:
       - agent:id:*
       - agent:group:*
     effect: allow
   agents_read_groups:
     actions:
       - group:read
     resources:
       - group:id:*
     effect: allow

.. _api_rbac_reference_cluster_all:

cluster_all\_\*
^^^^^^^^^^^^^^^

Provide full access to all cluster-related functionalities.

.. code-block:: yaml

   cluster_all_resourceless:
     actions:
       - cluster:status
       - cluster:update_config
       - cluster:restart
     resources:
       - '*:*:*'
     effect: allow
   cluster_all_nodes:
     actions:
       - cluster:read_api_config
       - cluster:read
       - cluster:restart
       - cluster:update_config
     resources:
       - node:id:*
     effect: allow

.. _api_rbac_reference_cluster_read_2:

cluster_read\_\*
^^^^^^^^^^^^^^^^

Provide read access to all cluster-related functionalities.

.. code-block:: yaml

   cluster_read_resourceless:
     actions:
       - cluster:status
       - cluster:read
       - cluster:read_api_config
     resources:
       - '*:*:*'
     effect: allow
   cluster_read_nodes:
     actions:
       - cluster:read_api_config
       - cluster:read
     resources:
       - node:id:*
     effect: allow

.. _api_rbac_reference_mitre_read_2:

mitre_read\_\*
^^^^^^^^^^^^^^

Allow reading MITRE database information.

.. code-block:: yaml

   mitre_read_mitre:
     actions:
       - mitre:read
     resources:
       - '*:*:*'
     effect: allow

.. _api_rbac_reference_security_all:

security_all\_\*
^^^^^^^^^^^^^^^^

Provide full access to all security-related functionalities.

.. code-block:: yaml

   security_all_resourceless:
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
   security_all_security:
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

.. _api_rbac_reference_users_all:

users_all\_\*
^^^^^^^^^^^^^

Provide full access to all user-related functionalities.

.. code-block:: yaml

   users_all_resourceless:
     actions:
       - security:create_user
       - security:edit_run_as
       - security:revoke
     resources:
       - '*:*:*'
     effect: allow
   users_all_users:
     actions:
       - security:read
       - security:update
       - security:delete
     resources:
       - user:id:*
     effect: allow

.. _api_rbac_reference_users_modify_run_as:

users_modify_run_as\_\*
^^^^^^^^^^^^^^^^^^^^^^^

Allow changing the ``allow_run_as`` parameter of users. On its own, this policy only allows disabling the parameter. Enabling it also requires ``security:update`` on ``role:id:*``.

.. code-block:: yaml

   users_modify_run_as_flag:
     actions:
       - security:edit_run_as
     resources:
       - '*:*:*'
     effect: allow

.. _api_rbac_reference_secrets_read:

secrets_read\_\*
^^^^^^^^^^^^^^^^

Allow reading the enrollment password, the cluster key, and the agents' pre-shared keys in clear instead of masked.

.. code-block:: yaml

   secrets_read_nodes:
     actions:
       - cluster:read_secrets
     resources:
       - node:id:*
     effect: allow
   secrets_read_agents:
     actions:
       - agent:read_secrets
     resources:
       - agent:id:*
     effect: allow

.. _api_rbac_reference_security_read_2:

security_read\_\*
^^^^^^^^^^^^^^^^^

Provide read-only access to all security-related functionalities.

.. code-block:: yaml

   security_read_resourceless:
     actions:
       - security:read_config
     resources:
       - '*:*:*'
     effect: allow
   security_read_security:
     actions:
       - security:read
     resources:
       - role:id:*
       - policy:id:*
       - user:id:*
       - rule:id:*
     effect: allow

.. _api_rbac_reference_default_roles:

Default roles
-------------

.. _api_rbac_reference_administrator:

administrator
^^^^^^^^^^^^^

The administrator role has full access to all endpoints in the Wazuh manager API.

**Policies**

-  :ref:`agents_all_* <api_rbac_reference_agents_all>`
-  :ref:`cluster_all_* <api_rbac_reference_cluster_all>`
-  :ref:`mitre_read_* <api_rbac_reference_mitre_read_2>`
-  :ref:`secrets_read_* <api_rbac_reference_secrets_read>`
-  :ref:`security_all_* <api_rbac_reference_security_all>`

**Rules**

-  :ref:`wui_elastic_admin <api_rbac_reference_wui_elastic_admin>`
-  :ref:`wui_opensearch_admin <api_rbac_reference_wui_opensearch_admin>`

.. _api_rbac_reference_agents_admin:

agents_admin
^^^^^^^^^^^^

The agent administrator role has full access to all Wazuh agent-related functionalities.

**Policies**

-  :ref:`agents_all_* <api_rbac_reference_agents_all>`

.. _api_rbac_reference_agents_readonly:

agents_readonly
^^^^^^^^^^^^^^^

Read only role for Wazuh agent-related functionalities.

**Policies**

-  :ref:`agents_read_* <api_rbac_reference_agents_read>`

.. _api_rbac_reference_cluster_admin:

cluster_admin
^^^^^^^^^^^^^

Manager administrator of the Wazuh manager cluster; this role has full access to all Wazuh manager-related functionalities.

**Policies**

-  :ref:`cluster_all_* <api_rbac_reference_cluster_all>`

.. _api_rbac_reference_cluster_readonly:

cluster_readonly
^^^^^^^^^^^^^^^^

Read-only role for Wazuh manager-related functionalities.

**Policies**

-  :ref:`cluster_read_* <api_rbac_reference_cluster_read_2>`

.. _api_rbac_reference_readonly:

readonly
^^^^^^^^

Read-only role for Wazuh agent, cluster, and MITRE information. It has no access to security resources.

**Policies**

-  :ref:`agents_read_* <api_rbac_reference_agents_read>`
-  :ref:`cluster_read_* <api_rbac_reference_cluster_read_2>`
-  :ref:`mitre_read_* <api_rbac_reference_mitre_read_2>`

**Rules**

-  :ref:`wazuh_indexer_readonly <api_rbac_reference_wazuh_indexer_readonly>`
-  :ref:`wazuh_indexer_demo <api_rbac_reference_wazuh_indexer_demo>`

.. _api_rbac_reference_users_admin:

users_admin
^^^^^^^^^^^

System user administrator; this role provides full access to all user-related functionalities.

**Policies**

-  :ref:`users_all_* <api_rbac_reference_users_all>`

.. _api_rbac_reference_wazuh_indexer_admin:

wazuh_indexer_admin
^^^^^^^^^^^^^^^^^^^

The Wazuh indexer administrator role has full access to agent and cluster functionalities, and read-only access to security resources.

**Policies**

-  :ref:`agents_all_* <api_rbac_reference_agents_all>`
-  :ref:`cluster_all_* <api_rbac_reference_cluster_all>`
-  :ref:`mitre_read_* <api_rbac_reference_mitre_read_2>`
-  :ref:`security_read_* <api_rbac_reference_security_read_2>`

**Rules**

-  :ref:`wazuh_indexer_admin <api_rbac_reference_wazuh_indexer_admin_2>`

.. _api_rbac_reference_default_rules:

Default rules
-------------

.. note::

   Only the ``wazuh-internal-client`` user (ID 2) can obtain ``run_as`` permissions through these mapping rules. These rules never match an authorization context for any other Wazuh manager API user. Rules that you create apply to any user with ``allow_run_as`` enabled.

.. _api_rbac_reference_wui_elastic_admin:

wui_elastic_admin
^^^^^^^^^^^^^^^^^

Administrator permissions for the elastic users of the Wazuh dashboard.

.. code-block:: yaml

   rule:
       FIND:
           username: "elastic"

.. _api_rbac_reference_wui_opensearch_admin:

wui_opensearch_admin
^^^^^^^^^^^^^^^^^^^^

Administrator permissions for the OpenSearch users of the Wazuh dashboard.

.. code-block:: yaml

   rule:
       FIND:
           user_name: "admin"

.. _api_rbac_reference_wazuh_indexer_demo:

wazuh_indexer_demo
^^^^^^^^^^^^^^^^^^

Read-only permissions for the wazuh-demo user of the Wazuh indexer.

.. code-block:: yaml

   rule:
       FIND:
           user_name: "wazuh-demo"

.. _api_rbac_reference_wazuh_indexer_readonly:

wazuh_indexer_readonly
^^^^^^^^^^^^^^^^^^^^^^

Read-only permissions for the wazuh-readonly user of the Wazuh indexer.

.. code-block:: yaml

   rule:
       FIND:
           user_name: "wazuh-readonly"

.. _api_rbac_reference_wazuh_indexer_admin_2:

wazuh_indexer_admin
^^^^^^^^^^^^^^^^^^^

Administrator permissions, with read-only access to security resources, for the wazuh-admin user of the Wazuh indexer.

.. code-block:: yaml

   rule:
       FIND:
           user_name: "wazuh-admin"
