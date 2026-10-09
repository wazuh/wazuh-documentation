.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the global configuration section of wazuh-manager.conf, which configures the time after which a Wazuh agent is marked as disconnected.

.. _reference_wazuh_manager_conf_global:

global
======

.. topic:: XML section name

   .. code-block:: xml

      <global>
      </global>

The ``<global>`` section configures the time after which the Wazuh manager marks a Wazuh agent as disconnected.

Options
-------

- `agents_disconnection_time`_

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

Sample configuration
---------------------

.. code-block:: xml

   <global>
     <agents_disconnection_time>15m</agents_disconnection_time>
   </global>
