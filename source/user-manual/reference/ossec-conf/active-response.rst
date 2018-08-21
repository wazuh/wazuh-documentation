.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_ossec_active_response:

active-response
===============

.. topic:: XML section name

	.. code-block:: xml

		<active-response>
		</active-response>

In the active response configuration section, an existing command is bound to one or more rules or rule types along with additional criteria for when to execute the command. There is no limit to the number of active responses that can be used, however, each active response must be configured in its own separate ``<active-response>`` section.

Options
-------

- `disabled`_

Manager side
^^^^^^^^^^^^

- `command`_
- `location`_
- `agent_id`_
- `level`_
- `rules_group`_
- `rules_id`_
- `timeout`_

Agent side
^^^^^^^^^^

- `repeated_offenders`_
- `ca_store`_
- `ca_verification`_

disabled
^^^^^^^^

Toggles the active-response capability on and off. Setting this option to ``yes`` on an agent will disable active-response for that agent only, while setting it in the manager's ``ossec.conf`` file will disable active-response on the manager and all agents.

.. note::

    This option is available on server, local, and agent installations.

+--------------------+------------+
| **Default value**  | no         |
+--------------------+------------+
| **Allowed values** | yes, no    |
+--------------------+------------+


command
^^^^^^^

Links the active-response to the command.

+--------------------+-------------------------------------------+
| **Default value**  | n/a                                       |
+--------------------+-------------------------------------------+
| **Allowed values** | Any defined active response command name  |
+--------------------+-------------------------------------------+

location
^^^^^^^^

Indicates which system(s) the command should be executed on.

+--------------------+----------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                              |
+--------------------+---------------+------------------------------------------------------------------+
| **Allowed values** | local         | This runs the command on the agent that generated the event.     |
+--------------------+---------------+------------------------------------------------------------------+
|                    | server        | This runs the command on the Wazuh manager.                      |
+                    +---------------+------------------------------------------------------------------+
|                    | defined-agent | This runs the command on a specific agent identified by agent_id.|
+                    +---------------+------------------------------------------------------------------+
|                    | all           | This runs the command on all agents.                             |
|                    |               | Use with caution.                                                |
+--------------------+---------------+------------------------------------------------------------------+

Example:

If the application that interfaces with your edge firewall runs on one of your agents, you might have a firewall-block-edge command that runs a script on that agent to blacklist an offending IP on the edge firewall.

agent_id
^^^^^^^^

Specifies the ID of the agent on which to execute the active response command (used when defined-agent is set).

+--------------------+--------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                  |
+--------------------+--------------------------------------------------------------------------------------+
| **Allowed values** | Any agent id number, as long as **defined-agent** has been specified as the location.|
+--------------------+--------------------------------------------------------------------------------------+

level
^^^^^

Defines a minimum severity level required for the command to be executed.

+--------------------+------------------------+
| **Default value**  | n/a                    |
+--------------------+------------------------+
| **Allowed values** | Any level from 1 to 16 |
+--------------------+------------------------+


rules_group
^^^^^^^^^^^

Defines the rule group that a rule must belong to one for the command to be executed.

+--------------------+---------------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                         |
+--------------------+---------------------------------------------------------------------------------------------+
| **Allowed values** | Any rule group is allowed. Multiple groups should be separated with a pipe character (“|”). |
+--------------------+---------------------------------------------------------------------------------------------+

.. note::
	All groups must end with a comma.

rules_id
^^^^^^^^

Limits the command execution to only when one or more listed rules fire.

+--------------------+---------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                             |
+--------------------+---------------------------------------------------------------------------------+
| **Allowed values** | Any rule identification. Multiple IDs can be specified if separated by a comma. |
+--------------------+---------------------------------------------------------------------------------+

.. note::
    When setting ``level``, ``rules_group`` and ``rules_id`` together, the active response will be triggered always that any rule matches with **one** of these options. In other words,
    they are accumulative options, not restrictive.


timeout
^^^^^^^

Specifies how long in seconds before the reverse command is executed.  When ``repeated_offenders`` is used, ``timeout`` only applies to the first offense.

+--------------------+-----------------------------+
| **Default value**  | n/a                         |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+


repeated_offenders
^^^^^^^^^^^^^^^^^^

Sets timeouts in minutes for repeat offenders. This is a comma-separated list of increasing timeouts that can contain a maximum of 5 entries.

+--------------------+-----------------------------+
| **Default value**  | n/a                         |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (minutes) |
+--------------------+-----------------------------+

.. warning::
    This option must be configured directly in the **ossec.conf** file of the agent, even when using a manager/agent setup with centralized configuration of other settings via **agent.conf**. Apart from that, it has to be defined in the upper ``<active-response>`` section found in the configuration file.

ca_store
^^^^^^^^

Indicates the path to the root CA certificate. The agent needs the certificate with which the WPK was signed in order to be updated.

+--------------------+-----------------------------+
| **Default value**  | wpk_root.pem                |
+--------------------+-----------------------------+
| **Allowed values** | Path to root CA certificate |
+--------------------+-----------------------------+

ca_verification
^^^^^^^^^^^^^^^

This option enables or disables the WPK validation using the root CA certificate. If this parameter is set to ``no`` the agent will accept any WPK package coming from the manager.

+--------------------+-----------------------------+
| **Default value**  | yes                         |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

Sample Configuration
--------------------

.. code-block:: xml

    <!-- On the manager side -->

    <active-response>
      <disabled>no</disabled>
      <command>host-deny</command>
      <location>defined-agent</location>
      <agent_id>032</agent_id>
      <level>10</level>
      <rules_group>sshd,|pci_dss_11.4,</rules_group>
      <timeout>1</timeout>
    </active-response>

    <!-- On the agent side -->
    <active-response>
      <disabled>no</disabled>
      <ca_store>/var/ossec/etc/wpk_root.pem</ca_store>
      <ca_verification>yes</ca_verification>
      <repeated_offenders>1,5,10</repeated_offenders>
    </active-response>
