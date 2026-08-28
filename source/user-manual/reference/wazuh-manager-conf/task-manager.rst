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

- `cleanup_time`_
- `task_timeout`_

cleanup_time
^^^^^^^^^^^^^

Specifies how long completed, failed, or timed-out upgrade task records are retained before they are removed. Must be greater than or equal to ``task_timeout``.

+----------------------+---------------------------------------------------------+
| **Default value**    | 15m                                                     |
+----------------------+---------------------------------------------------------+
| **Allowed values**   | Positive time value with optional suffix - s, m, h, d   |
+----------------------+---------------------------------------------------------+

task_timeout
^^^^^^^^^^^^^

Specifies the maximum time an upgrade task can remain ``In progress`` before it is marked as ``Timeout``.

+----------------------+---------------------------------------------------------+
| **Default value**    | 15m                                                     |
+----------------------+---------------------------------------------------------+
| **Allowed values**   | Positive time value with optional suffix - s, m, h, d   |
+----------------------+---------------------------------------------------------+

Sample configuration
---------------------

.. code-block:: xml

   <task-manager>
     <cleanup_time>15m</cleanup_time>
     <task_timeout>300</task_timeout>
   </task-manager>
