.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the task-manager configuration section of wazuh-manager.conf, which configures task tracking and remote agent upgrades.

.. _reference_wazuh_manager_conf_task_manager:

task-manager
============

.. topic:: XML section name

   .. code-block:: xml

      <task-manager>
      </task-manager>

The ``<task-manager>`` section configures the task manager module. It tracks the status of agent tasks, applies execution timeouts, removes expired task records, and serves remote Wazuh agent upgrades.

The task manager handles two kinds of tasks:

- An agent task is work for a Wazuh agent, such as a remote upgrade, an active response, or an agent restart or reload. The task manager stores the task until the agent fetches it.
- A manager task is work that the Wazuh manager runs itself, such as removing a deleted agent's data from the Wazuh indexer, the agent disconnection sweep, or the daily log rotation.

A poll is a request for an agent's pending agent tasks. Wazuh 5.0 agents poll through ``wazuh-manager-remoted``. For Wazuh agents earlier than 5.0, ``wazuh-manager-remoted`` polls on the agent's behalf and delivers only remote upgrade tasks.

Options
-------

- `task_ttl`_
- `cleanup_interval`_
- `max_payload_bytes`_
- `max_tasks_per_poll`_
- `upgrade_enabled`_
- `wpk_repository`_

task_ttl
^^^^^^^^^

Time-to-live for a pending agent task, measured from its creation. Pending agent tasks older than this are moved to the expired state. Manager tasks are never expired by age.

+--------------------+----------------------------------------------------------------+
| **Default value**  | 3600 (1 hour)                                                  |
+--------------------+----------------------------------------------------------------+
| **Allowed values** | Integer from 0 to 2147483647 (seconds); 0 means "use default"  |
+--------------------+----------------------------------------------------------------+

cleanup_interval
^^^^^^^^^^^^^^^^^

Interval between cleanup runs - marks expired tasks and deletes rows expired more than 24h ago.

+--------------------+----------------------------------------------------------------+
| **Default value**  | 300 (5 minutes)                                                |
+--------------------+----------------------------------------------------------------+
| **Allowed values** | Integer from 0 to 2147483647 (seconds); 0 means "use default"  |
+--------------------+----------------------------------------------------------------+

max_payload_bytes
^^^^^^^^^^^^^^^^^^

Maximum accepted size of a single task payload after JSON serialization.

+--------------------+----------------------------------------------------------------+
| **Default value**  | 1048576 (1 MiB)                                                |
+--------------------+----------------------------------------------------------------+
| **Allowed values** | Integer from 0 to 2147483647 (bytes); 0 means "use default"    |
+--------------------+----------------------------------------------------------------+

max_tasks_per_poll
^^^^^^^^^^^^^^^^^^^

Maximum tasks returned by a single poll; remaining pending tasks are returned on later polls.

+--------------------+----------------------------------------------------------------+
| **Default value**  | 100                                                            |
+--------------------+----------------------------------------------------------------+
| **Allowed values** | Integer from 0 to 2147483647; 0 means "use default"            |
+--------------------+----------------------------------------------------------------+

upgrade_enabled
^^^^^^^^^^^^^^^

Enables or disables remote Wazuh agent upgrades requested through the Wazuh manager API. These upgrades use Wazuh signed package (WPK) files. See :ref:`upgrade_agents_remotely`.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

wpk_repository
^^^^^^^^^^^^^^

Repository from which WPK upgrade packages are downloaded, as ``host/path``. If the value starts with ``http://`` or ``https://``, it is used as given. Otherwise, ``https://`` is prepended, or ``http://`` when the upgrade request asks for HTTP.

+--------------------+-----------------------------------------------------------------------------------+
| **Default value**  | None. When not set, the repository is chosen from the target Wazuh agent version. |
+--------------------+-----------------------------------------------------------------------------------+
| **Allowed values** | A non-empty ``host/path``, with or without an ``http://`` or ``https://`` scheme  |
+--------------------+-----------------------------------------------------------------------------------+

Sample configuration
---------------------

.. code-block:: xml

   <task-manager>
     <task_ttl>3600</task_ttl>
     <cleanup_interval>300</cleanup_interval>
     <max_payload_bytes>1048576</max_payload_bytes>
     <max_tasks_per_poll>100</max_tasks_per_poll>
     <upgrade_enabled>yes</upgrade_enabled>
   </task-manager>
