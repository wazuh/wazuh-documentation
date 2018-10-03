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
