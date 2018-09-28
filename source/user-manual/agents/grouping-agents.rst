.. Copyright (C) 2018 Wazuh, Inc.

.. _grouping-agents:

Grouping agents
===============

.. versionadded:: 3.0.0

There are two methods for configuring registered agents. They can either be configured locally with the :doc:`ossec.conf <../reference/ossec-conf/index>` file or remotely using
the :doc:`centralized configuration <../reference/centralized-configuration>`. If the centralized configuration is used, agents may be assigned to groups with each group possessing a unique configuration.  This greatly simplifies the overall configuration process.

Unless otherwise assigned, all new agents automatically belong to the **'default'** group. This group is created during the installation process with the configuration files placed in the ``etc/shared/default/`` folder. These files will be pushed from the manager to all agents belonging to this group.

Below are the steps to assign agents to a group with a specific configuration:

1. Once an agent has been added to the manager, assign it to a group using the :doc:`agent_groups <../reference/tools/agent_groups>` tool or the
   :doc:`API <../api/index>`.  Below are examples of how to assign an agent with ID 002 to the group *'dbms'* using these methods:

   Using **agent_groups**:

   .. code-block:: console

      # /var/ossec/bin/agent_groups -a -i 002 -g dbms

   Using the API:

   .. code-block:: console

      # curl -u foo:bar -X PUT "http://localhost:55000/agents/002/group/dbms?pretty"

   .. note:: New groups may be created and configured before assigning agents. If a group does not exist prior to assigning an agent, it will be created when the first agent is added and set up with the files from the *'default'* group.

   An agent's group assignment can be checked using one of the following commands:

   Using **agent_groups**:

   .. code-block:: console

      # /var/ossec/bin/agent_groups -l -g dbms

        5 agent(s) in group 'dbms':
          ID: 002  Name: agent-dbms-e1.
          ID: 003  Name: agent-dbms-e2.
          ID: 004  Name: agent-dbms-a1.
          ID: 005  Name: agent-dbms-a2.
          ID: 006  Name: agent-dbms-a3.

   Using the API:

   .. code-block:: console

      # curl -u foo:bar -X GET "http://localhost:55000/agents/groups/dbms?pretty"


2. Once a group is created, its ``agents.conf`` file can be edited to include the specific configuration you wish to assign to this group. For this example, the file to be edited is located at ``etc/shared/dbms/agents.conf`` and each agent belonging to this group will receive this file.

3. Within 20 minutes of connecting to the manager, each agent assigned to a group will receive the files contained in the *'dbms'* folder from the manager, including the ``agent.conf`` file that was modified in the previous step.  The length of time it takes for the manager to push these files to the agents depends on the size of the files, the number of agents in the group and the connection protocol used. For example, depending on network bandwidth and performance, it may take 8 minutes to receive a 10 MB folder (excluding **merged.mg** file) on 100 agents using UDP, however if TCP is used, this may move along much faster.

4. Once a specific agent belongs to a group, it will be **automatically reassigned** to this group even if it is registered under another name or ID. This happens because, when the agent is re-registered, the checksum of ``merged.mg`` sent by the agent is compared with that of the other agents registered with the manager.

.. _multigroups:

Multigroups
-----------

Assigning multiple groups to an agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When an agent belongs to more than one group, its agent configuration file consists on a merged configuration of them, where the last group joined is the one with the most priority. Setting multiple groups to an agent is simple, it can be done with `authd` and `agent_groups`:

   To set the group with **authd**, run the following command at the manager:

   .. code-block:: console

      # /var/ossec/bin/ossec-authd

   Then, register the agent setting the multigroup with the -G option at the agent:

   .. code-block:: console

    # /var/ossec/bin/agent-auth -m MANAGER_IP -G group1-group2-group3

   With the **agent_groups** command, agents can be registered to groups one by one as it was said in the last section.

Listing multigroups
^^^^^^^^^^^^^^^^^^^^

   Run the following command to check the different groups and multigroups created in order of assignment:

   .. code-block:: console

    # ls /var/ossec/var/multigroups

   List the agents belonging to a group with the command below:

   .. code-block:: console
   
    # /var/ossec/bin/agent_groups -l -g group1
    2 agent(s) in group 'group1':
      ID: 001  Name: agent1. *
      ID: 002  Name: agent2.

The asterisk next to the agent name means that this agent is also assigned to other groups different than group1.

.. note::

         The priority of the groups increases from left to right, being the last one the one with the highest priority.


Shared files
^^^^^^^^^^^^^

As it was said before, each group has its ``agent.conf`` file; with the multigroups, the different ``agent.conf`` and other configuration files are merged into one of each kind (agent.conf, merged.mg, rootkit_files.txt...). They are stored at /var/ossec/var/multigroups/multigroup-name and sent to the agents belonging to that multigroup with the restrictions specified at the last section.
When two groups have conflicting fields in its configuration, the last one assigned to the agent will be the leading one.

The multigroups information can be consulted with the API one by one as it works with the simple groups.


Multigroups database
^^^^^^^^^^^^^^^^^^^^^
With database realtime enabled at /var/ossec/etc/internal_options.conf, the operations of adding, removing or creating a group are inmediately added to the `/var/ossec/var/db/global.db` database, in other case, they are applied every `wazuh_database.interval` seconds, which means that the configuration files are sent after this delay.

To query for the multigroups information, the 'agent', 'belongs' and 'group' tables can be consulted.

    The 'group' table shows the different groups with their IDs.

    .. code-block:: console

      # sqlite3 /var/ossec/var/db/global.db
      sqlite> select * from `group`;
      1|default
      2|group1
      3|group2

The 'belongs' table shows two rows, the first one is related with the agent ID, and the second one, the groups IDs to which this agent belongs. In the following example, the agent 1 is assigned to the groups 1, 2 and 3 and the agent 2 to the group 1:

   .. code-block:: console
   
    # sqlite3 /var/ossec/var/db/global.db

    sqlite> select * from belongs;
    1|1
    1|2
    1|3
    2|1

The last query at the 'agent' table shows the groups or multigroups of each of the agents.

    .. code-block:: console
   
      # sqlite3 /var/ossec/var/db/global.db
      sqlite> select `group` from agent where id='1';
      default-group1-group2




