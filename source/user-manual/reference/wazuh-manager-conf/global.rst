.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the global configuration section of wazuh-manager.conf, which configures agent disconnection timing and disconnection alerts.

.. _reference_wazuh_manager_conf_global:

global
======

.. topic:: XML section name

   .. code-block:: xml

      <global>
      </global>

The ``<global>`` section configures manager-wide timing for detecting agent disconnections and generating disconnection alerts.

Options
-------

- `agents_disconnection_time`_
- `agents_disconnection_alert_time`_

.. _reference_manager_agents_disconnection_time:

agents_disconnection_time
^^^^^^^^^^^^^^^^^^^^^^^^^^

Time a Wazuh agent can remain without communication before the Wazuh manager marks it as disconnected.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | 15m (900 s)                                                                                  |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | Positive integer with optional time unit suffix: `s` (seconds), `m` (minutes), `h` (hours),  |
|                      | `d` (days). Minimum: 1s.                                                                     |
+----------------------+----------------------------------------------------------------------------------------------+

agents_disconnection_alert_time
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Time after a Wazuh agent disconnects before a disconnection alert is generated. Set to ``0`` to disable disconnection alerts.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | 0                                                                                            |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | Non-negative integer with optional time unit suffix: `s`, `m`, `h`, `d`. A value of 0        |
|                      | disables disconnection alerts.                                                               |
+----------------------+----------------------------------------------------------------------------------------------+

Sample configuration
---------------------

.. code-block:: xml

   <global>
     <agents_disconnection_time>15m</agents_disconnection_time>
     <agents_disconnection_alert_time>0</agents_disconnection_alert_time>
   </global>
