.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about local configuration (ossec.conf) and how to configure the Active Response. Check out the options and a sample configuration in this section of the Wazuh documentation.
  
.. _reference_ossec_active_response:

active-response
===============

.. topic:: XML section name

	.. code-block:: xml

		<active-response>
		</active-response>

In the Active Response configuration section, an existing command is bound to one or more rules or rule types along with additional criteria for when to execute the command. There is no limit to the number of active responses that can be used, however, each active response must be configured in its own separate ``<active-response>`` section.

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

disabled
^^^^^^^^

Toggles the active-response capability on and off. Setting this option to ``yes`` on an agent will disable active-response for that agent only while setting it in the manager ``ossec.conf`` file will disable active-response on the manager and all agents.

.. note::

    This option is available on the server, local, and agent installations.

+--------------------+------------+
| **Default value**  | no         |
+--------------------+------------+
| **Allowed values** | yes, no    |
+--------------------+------------+


command
^^^^^^^

Links the active-response to the command. You can find more information at the :doc:`commands <commands>` section.

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
+                    +---------------+------------------------------------------------------------------+
|                    | server        | This runs the command on the Wazuh manager.                      |
+                    +---------------+------------------------------------------------------------------+
|                    | defined-agent | This runs the command on a specific agent identified by agent_id.|
+                    +---------------+------------------------------------------------------------------+
|                    | all           | This runs the command on all agents, not including the manager.  |
|                    |               | Use with caution.                                                |
+--------------------+---------------+------------------------------------------------------------------+

Example:

If the application that interfaces with your edge firewall runs on one of your agents, you might have a firewall-block-edge command that runs a script on that agent to blacklist an offending IP address on the edge firewall.

.. note::
    If it is desired to trigger a particular active response on every agent and
    the manager as well, two similar configuration blocks can be used setting 
    the option `"all"` in one of the blocks and `"server"` on the other.

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

Defines the rule group that a rule must belong to for the execution of the command.

+--------------------+------------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                      |
+--------------------+------------------------------------------------------------------------------------------+
| **Allowed values** | Any group string. For multiple groups, separate the strings with a pipe character ``|``. |
+--------------------+------------------------------------------------------------------------------------------+

.. note::
	
   To avoid partial matches, add a comma at the end of the group string. For example, ``<rules_group>group_a,|group_b,|group_c,</rules_group>`` Also, check that the rule group in your rule definitions ends with a comma as well. This is usually the case in the Wazuh default ruleset. For example, ``<group>group_b,</group>``.
   
   Not ending the group string with a comma implies that the group string is a substring open for partial matches.  For example, the group string ``authentication`` matches rule groups ``authentication``, ``authentication_success``, and ``authentication_failure`` while the group string ``authentication,`` matches only rule group ``authentication``.

rules_id
^^^^^^^^

Limits the command execution to only when one or more listed rules fire.

+--------------------+---------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                             |
+--------------------+---------------------------------------------------------------------------------+
| **Allowed values** | Any rule identification. Multiple IDs can be specified if separated by a comma. |
+--------------------+---------------------------------------------------------------------------------+

.. note::
    When setting ``level``, ``rules_group``, and ``rules_id`` together, the active response will be triggered always that any rule matches with **one** of these options. In other words,
    they are accumulative options, not restrictive.


timeout
^^^^^^^

Specifies how long in seconds before the reverse command is executed.  When ``repeated_offenders`` is used, ``timeout`` only applies to the first offense.

+--------------------+-----------------------------+
| **Default value**  | n/a                         |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

.. _repeated_offenders:

repeated_offenders
^^^^^^^^^^^^^^^^^^

Sets timeouts in minutes for repeat offenders. This is a comma-separated list of increasing timeouts that can contain a maximum of 5 entries.

+--------------------+-----------------------------+
| **Default value**  | n/a                         |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (minutes) |
+--------------------+-----------------------------+

.. warning::
    This option must be configured directly in the **ossec.conf** file of the agent (currently not supported by agents running on Windows), even when using a manager/agent setup with a centralized configuration of other settings via **agent.conf**. Apart from that, it has to be defined in the upper ``<active-response>`` section found in the configuration file.

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
      <repeated_offenders>1,5,10</repeated_offenders>
    </active-response>
