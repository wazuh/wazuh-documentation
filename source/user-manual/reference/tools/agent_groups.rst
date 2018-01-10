.. _agent_groups:

agent_groups
=============

.. versionadded:: 3.0.0

The agent_groups program allows you to list, assign and manage the agents groups.

+---------------------------------------+---------------------------------------------------------+
| **-h**                                | Display the help message                                |
+---------------------------------------+---------------------------------------------------------+
| **-l**                                | List all groups                                         |
+---------------------------------------+---------------------------------------------------------+
| **-q**                                | Quiet (no confirmation)                                 |
+---------------------------------------+---------------------------------------------------------+
| **-l -g group_id**                    | List agents in group                                    |
+---------------------------------------+---------------------------------------------------------+
| **-c -g group_id**                    | List configuration files in group                       |
+---------------------------------------+---------------------------------------------------------+
| **-a -i agent_id -g group_id [-q]**   | Set agent group                                         |
+---------------------------------------+---------------------------------------------------------+
| **-r -i agent_id [-q]**               | Unset agent group                                       |
+---------------------------------------+---------------------------------------------------------+
| **-s -i agent_id**                    | Show group of agent                                     |
+---------------------------------------+---------------------------------------------------------+
| **-a -g group_id [-q]**               | Create group                                            |
+---------------------------------------+---------------------------------------------------------+
| **-r -g group_id [-q]**               | Remove group                                            |
+---------------------------------------+---------------------------------------------------------+
| **-d**                                | Debug                                                   |
+---------------------------------------+---------------------------------------------------------+

Examples
----------

* Assign group *'debian'* to agent 002:

.. code-block:: console

    $ /var/ossec/bin/agent_groups -a -i 002 -g debian
    Do you want to set the group 'debian' to the agent '002'? [y/N]: y
    Group 'debian' assigned to agent '002'.

* Get the group of agent 002:

.. code-block:: console

    $ /var/ossec/bin/agent_groups -s -i 002
    The agent 'agent-deb-002' with ID '002' has the group: 'debian'.

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
      agent.conf
      rootkit_trojans.txt
      merged.mg
      cis_debian_linux_rcl.txt
      rootkit_files.txt
      system_audit_ssh.txt
      system_audit_rcl.txt


* Remove the current group of the agent 002:

.. code-block:: console

    $ /var/ossec/bin/agent_groups -r -i 002
    Do you want to remove the current group of agent '002'? [y/N]: y
    Group removed. Current group for agent '002': 'default'.


* Remove the group *'debian'* in every agent:

.. code-block:: console

    $ /var/ossec/bin/agent_groups -r -g debian
    Do you want to remove the 'debian' group of every agent? [y/N]: y
    Group 'debian' removed.
    Affected agents: 003, 004.
