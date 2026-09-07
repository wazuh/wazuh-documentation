.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the task-manager configuration section of wazuh-manager.conf, which manages remote agent upgrade tasks.

.. _reference_wazuh_manager_conf_task_manager:

task-manager
============

.. topic:: XML section name

   .. code-block:: xml

      <task-manager>
      </task-manager>

The ``<task-manager>`` section manages remote upgrade tasks created by ``<agent-upgrade>``. It tracks task status, applies execution timeouts, and removes expired task records.

Options
-------

- `task_ttl`_
- `cleanup_interval`_
- `max_payload_bytes`_
- `max_tasks_per_poll`_

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

Sample configuration
---------------------

.. code-block:: xml

   <task-manager>
     <task_ttl>3600</task_ttl>
     <cleanup_interval>300</cleanup_interval>
     <max_payload_bytes>1048576</max_payload_bytes>
     <max_tasks_per_poll>100</max_tasks_per_poll>
   </task-manager>
