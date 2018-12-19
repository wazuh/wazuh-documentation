.. Copyright (C) 2018 Wazuh, Inc.

.. _agent_groups:

agent_groups
============

.. versionadded:: 3.0.0

The agent_groups program allows you to list agents assigned to a group, assign agents to a group and manage the agents groups. Below are the parameters that can be used with this new function:

+---------------------------------------+-----------------------------------------------------------+
| **-h**                                | Displays the help message                                 |
+---------------------------------------+-----------------------------------------------------------+
| **-q**                                | Quiet mode (outputs no confirmation)                      |
+---------------------------------------+-----------------------------------------------------------+
| **-d**                                | Debug                                                     |
+---------------------------------------+-----------------------------------------------------------+
| **-l**                                | Lists all groups                                          |
+---------------------------------------+-----------------------------------------------------------+
| **-l -g group_id**                    | Lists the agents in the group                             |
+---------------------------------------+-----------------------------------------------------------+
| **-c -g group_id**                    | Lists the configuration files in group                    |
+---------------------------------------+-----------------------------------------------------------+
| **-a -g group_id [-q]**               | Creates a group                                           |
+---------------------------------------+-----------------------------------------------------------+
| **-r -g group_id [-q]**               | Removes a group (affects to all agents assigned to it)    |
+---------------------------------------+-----------------------------------------------------------+
| **-a -i agent_id -g group_id [-q]**   | Assigns group_id to the agent's group list                |
+---------------------------------------+-----------------------------------------------------------+
| **-a -f -i agent_id -g group_id [-q]**| Replaces the agent's groups to group_id                   |
+---------------------------------------+-----------------------------------------------------------+
| **-r -i agent_id [-q]**               | Remove an agent from all its groups                       |
+---------------------------------------+-----------------------------------------------------------+
| **-r -i agent_id -g group_id [-q]**   | Remove an agent from a specific group                     |
+---------------------------------------+-----------------------------------------------------------+
| **-s -i agent_id**                    | Shows the groups of an agent                              |
+---------------------------------------+-----------------------------------------------------------+
| **-S -i agent_id**                    | Shows the shared files sync status of an agent            |
+---------------------------------------+-----------------------------------------------------------+

Examples
--------
* Create group *'debian'*:

.. code-block:: console

    $ /var/ossec/bin/agent_groups -a -g debian
    Do you want to create the group 'debian'? [y/N]: y
    Group 'debian' created.

* Assign group *'debian'* to agent 002:

.. code-block:: console

    $ /var/ossec/bin/agent_groups -a -i 002 -g debian
    Do you want to set the group 'debian' to the agent '002'? [y/N]: y
    Group 'debian' assigned to agent '002'.

* Get the groups of agent 002:

.. code-block:: console

    $ /var/ossec/bin/agent_groups -s -i 002
    The agent 'agent-deb-002' with ID '002' belongs to groups: default, debian, east-office

* List all agents in group *'debian'*:

.. code-block:: console

    $ /var/ossec/bin/agent_groups -l -g debian
    3 agent(s) in group 'debian':
        ID: 002  Name: agent-deb-002.
        ID: 003  Name: agent-deb-003.
        ID: 004  Name: agent-deb-004.

* List configuration files in group *'debian'*:

.. code-block:: console

    $ /var/ossec/bin/agent_groups -c -g debian
    Files for group 'debian':
      agent.conf                [ab73af41699f13fdd81903b5f23d8d00]
      rootkit_trojans.txt       [76d8be9b97d8eae4c239e530ee7e71c8]
      merged.mg                 [4437654d67c9c4ac2e46cf5f73e04518]
      cis_debian_linux_rcl.txt  [38cc9b168dc24576daa76f4502575a4f]
      rootkit_files.txt         [127711eb705cf90c6946ef4b7053d9c3]
      system_audit_ssh.txt      [5c4a3180e4b5b3f7bb7b61b0b9d23a4b]
      system_audit_rcl.txt      [882122c1e9e30e86c80893cbb9482c2d]


* Remove agent 002 from all groups except the default:

.. code-block:: console

    $ /var/ossec/bin/agent_groups -r -i 002
    Do you want to delete all groups of agent '002'? [y/N]: y
    Group unset for agent '002'.

* Remove agent 003 from a specific group

.. code-block:: console

    $ /var/ossec/bin/agent_groups -r -i 003 -g group2
    Do you want to delete the group 'group2' of agent '003'? [y/N]: y
    Group 'group2' unset for agent '003'.

* Remove the group *'debian'* from every agent:

.. code-block:: console

    $ /var/ossec/bin/agent_groups -r -g debian
    Do you want to remove the 'debian' group? [y/N]: y
    All selected groups were removed
    Affected agents: 007, 013

* Add an agent to more than one group:

.. code-block:: console

    $ /var/ossec/bin/agent_groups -a -i 001 -g group1
    Do you want to add the group 'group1' to the agent '001'? [y/N]: y
    Group 'group1' added to agent '001'.

    $ /var/ossec/bin/agent_groups -a -i 001 -g group2
    Do you want to add the group 'group2' to the agent '001'? [y/N]: y
    Group 'group2' added to agent '001'.

Now, 'agent1' belongs to 'default', 'group1' and 'group2'.
