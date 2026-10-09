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

Time-to-live for a task, measured from creation. Tasks older than this are moved to the expired state.

+--------------------+-----------------------------------------------+
| **Default value**  | 3600 (1 hour)                                 |
+--------------------+-----------------------------------------------+
| **Allowed values** | Integer >= 0 (seconds); 0 means "use default" |
+--------------------+-----------------------------------------------+

cleanup_interval
^^^^^^^^^^^^^^^^^

Interval between cleanup runs - marks expired tasks and deletes rows expired more than 24h ago.

+--------------------+-----------------------------------------------+
| **Default value**  | 300 (5 minutes)                               |
+--------------------+-----------------------------------------------+
| **Allowed values** | Integer >= 0 (seconds); 0 means "use default" |
+--------------------+-----------------------------------------------+

max_payload_bytes
^^^^^^^^^^^^^^^^^^

Maximum accepted size of a single task payload after JSON serialization.

+--------------------+---------------------------------------------+
| **Default value**  | 1048576 (1 MiB)                             |
+--------------------+---------------------------------------------+
| **Allowed values** | Integer >= 0 (bytes); 0 means "use default" |
+--------------------+---------------------------------------------+

max_tasks_per_poll
^^^^^^^^^^^^^^^^^^^

Maximum tasks returned by a single poll; remaining pending tasks are returned on later polls.

+--------------------+-------------------------------------+
| **Default value**  | 100                                 |
+--------------------+-------------------------------------+
| **Allowed values** | Integer >= 0; 0 means "use default" |
+--------------------+-------------------------------------+

upgrade_enabled
^^^^^^^^^^^^^^^

Enables or disables remote Wazuh agent upgrades (WPK upgrades requested through the Wazuh server API).

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
