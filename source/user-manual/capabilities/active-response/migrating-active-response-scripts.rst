.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn what changes to make to custom active response scripts when migrating from Wazuh 4.x to Wazuh 5.x.

Migrating active response scripts from Wazuh 4.x to Wazuh 5.x
================================================================

Wazuh 5.x changes how custom active response scripts are configured, triggered, and receive information from Wazuh. If you use custom active response scripts from Wazuh 4.x, update them to account for the following changes before using them with Wazuh 5.x:

-  Active response conditions move to Alerting monitors. In Wazuh 4.x, the ``<active-response>`` block in the Wazuh manager configuration specifies conditions such as rule IDs, rule levels, and rule groups that trigger a response. In Wazuh 5.x, configure these conditions through a monitor with the Active response type. The monitor contains a trigger and an Add active response action that specifies which active response configuration to execute when the conditions are met.

-  ``ar.conf`` no longer exists. In Wazuh 4.x, a script's execution information, including name, executable, type (stateless or stateful), and timeout, is defined separately in ``ar.conf`` and looked up by the agent at execution time. In Wazuh 5.x, there is no local lookup file. The same metadata is embedded directly inside the ``wazuh.active_response`` object of every message the script receives. A stateful script reads its own timeout from the incoming message.

-  The commands used to execute and revert active response actions have changed. In Wazuh 4.x, the manager sends ``"command": "add"`` to perform an action and ``"command": "delete"`` to revert it. Wazuh 5.x replaces these values with ``"command": "enable"`` and ``"command": "disable"``, respectively. Custom scripts that evaluate the command field must be updated to recognize the new values.

-  The JSON message structure has changed. In Wazuh 4.x, active response scripts receive the finding data under ``parameters.alert``, along with fields such as ``parameters.extra_args`` and ``parameters.program``. In Wazuh 5.x, the ``wazuh.active_response`` object contains the active response metadata, while relevant finding data is provided through top-level `Wazuh Common Schema <https://github.com/wazuh/wazuh-indexer-plugins/blob/main/wcs/stateless/events/main/docs/fields.csv>`__ (WCS) fields, such as ``source.ip``, ``user.name``, ``wazuh.rule.id``, and ``file.path``. Custom scripts that reference the Wazuh 4.x JSON structure must be updated to use the corresponding fields in the Wazuh 5.x message structure.

-  Active response configuration no longer requires a restart. In Wazuh 5.x, creating or updating an active response configuration from the dashboard takes effect without restarting the Wazuh manager or agent.

-  Agent restart and reload actions move to the Control module. In Wazuh 4.x, some active response scripts, such as ``restart-wazuh``/``restart.sh``, restart or reload the Wazuh agent as part of their response action. In Wazuh 5.x, this functionality moves to the Control module API endpoints. Redesign any custom script that relies on agent restart or reload functionality to use the Control module instead of active response.
