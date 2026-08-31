.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The agent_groups tool manages Wazuh agent groups and group membership. Learn more about it in this section of the documentation.

.. _agent_groups:

agent_groups
============

The ``agent_groups`` tool manages Wazuh agent groups and group membership.

Use this tool to create and remove groups, assign or remove agents from groups, list groups and their configuration files, and display the groups assigned to an agent.

Options
-------

+----------------------------------------+----------------------------------------------------------------+
| Option                                 | Description                                                    |
+========================================+================================================================+
| -a, --add                              | Creates a new group or adds an agent to an existing group.     |
+----------------------------------------+----------------------------------------------------------------+
| -c, --list-files                       | Lists the configuration files associated with a group.         |
+----------------------------------------+----------------------------------------------------------------+
| -d, --debug                            | Runs the tool in debug mode.                                   |
+----------------------------------------+----------------------------------------------------------------+
| -f, --force                            | Forces an agent to belong to a single group.                   |
+----------------------------------------+----------------------------------------------------------------+
| -g <group_id>, --group-id <group_id>   | Specifies the group ID.                                        |
+----------------------------------------+----------------------------------------------------------------+
| -h, --help                             | Displays the help message and exits.                           |
+----------------------------------------+----------------------------------------------------------------+
| -i <agent_id>, --agent-id <agent_id>   | Specifies the agent ID.                                        |
+----------------------------------------+----------------------------------------------------------------+
| -l, --list                             | Lists the existing groups or the agents assigned to a group.   |
+----------------------------------------+----------------------------------------------------------------+
| -q, --quiet                            | Runs in silent mode without prompting for confirmation.        |
+----------------------------------------+----------------------------------------------------------------+
| -r, --remove                           | Removes a group or removes an agent from a group.              |
+----------------------------------------+----------------------------------------------------------------+
| -s, --show-group                       | Displays the groups assigned to an agent.                      |
+----------------------------------------+----------------------------------------------------------------+
| -u, --usage                            | Displays the command usage information.                        |
+----------------------------------------+----------------------------------------------------------------+

Examples
--------

Create group 'webservers':

.. code-block:: console

   # /var/wazuh-manager/bin/agent_groups -a -g webservers

The command output looks similar to this:

.. code-block:: none
   :class: output

   Do you want to create the group 'webservers'? [y/N]: y
   Group 'webservers' created.

Assign group 'webservers' to agent 010:

.. code-block:: console

   # /var/wazuh-manager/bin/agent_groups -a -i 010 -g webservers

The command output looks similar to this:

.. code-block:: none
   :class: output

   Do you want to add the group 'webservers' to the agent '010'? [y/N]: y
   Group 'webservers' added to agent '010'.

Get the groups of agent 010:

.. code-block:: console

   # /var/wazuh-manager/bin/agent_groups -s -i 010

The command output looks similar to this:

.. code-block:: none
   :class: output

   The agent 'Ubuntu' with ID '010' belongs to groups: default, webservers.

List all agents in group 'Linux':

.. code-block:: console

   # /var/wazuh-manager/bin/agent_groups -l -g Linux

The command output looks similar to this:

.. code-block:: none
   :class: output

   2 agent(s) in group 'Linux':
     ID: 003  Name: CentOS.
     ID: 007  Name: agent1.

List configuration files in group 'vd_test':

.. code-block:: console

   # /var/wazuh-manager/bin/agent_groups -c -g vd_test

The command output looks similar to this:

.. code-block:: none
   :class: output

   2 files for 'vd_test' group:
     agent.conf  [70d8d94d64a8114658c40124b8e4bbb8]
     merged.mg   [18c41f58607371284b44a313a6c0cd9a]

Remove agent 010 from all groups except the default:

.. code-block:: console

   # /var/wazuh-manager/bin/agent_groups -r -i 010

The command output looks similar to this:

.. code-block:: none
   :class: output

   Do you want to delete all groups of agent '010'? [y/N]: y
   Group unset for agent '010'.

Remove agent 007 from a specific group

.. code-block:: console

   # /var/wazuh-manager/bin/agent_groups -r -i 007 -g Linux

The command output looks similar to this:

.. code-block:: none
   :class: output

   Do you want to delete the group 'Linux' of agent '007'? [y/N]: y
   Agent '007' removed from Linux.

Remove the group 'webservers' from every agent:

.. code-block:: console

   # /var/wazuh-manager/bin/agent_groups -r -g webservers

The command output looks similar to this:

.. code-block:: none
   :class: output

   Do you want to remove the 'webservers' group? [y/N]: y
   Group webservers removed.

Add an agent to more than one group:

.. code-block:: console

   # /var/wazuh-manager/bin/agent_groups -a -i 010 -g Linux

The command output looks similar to this:

.. code-block:: none
   :class: output

   Do you want to add the group 'Linux' to the agent '010'? [y/N]: y
   Group 'Linux' added to agent '010'.

.. code-block:: console

   # /var/wazuh-manager/bin/agent_groups -a -i 010 -g vd_test

The command output looks similar to this:

.. code-block:: none
   :class: output

   Do you want to add the group 'vd_test' to the agent '010'? [y/N]: y
   Group 'vd_test' added to agent '010'.

Now, '010' belongs to 'default', 'Linux' and 'vd_test'.
