.. _grouping-agents:

Grouping agents
=================

.. versionadded:: 3.0.0

Once the agent is registered, we have two different ways to configure it. We can configure agents locally
with the :doc:`ossec.conf <../reference/ossec-conf/index>` file, or remotely using
the :doc:`centralized configuration <../reference/centralized-configuration>`. If we select the centraliced
configuration option, it is possible to group agents, making the configuration easier.

By default, all the new agents belong to the **'default'** group. This group is created on the installation
process and has all configuration files contained in the folder ``etc/shared/default/``. These files will be
pushed from the manager and received for all agents belonging to this group.

To describe this functionality we will use the following example:

We will assume that we have a group of agents that host a database management system. If we want these
agents to have a specific configuration, we will follow the next steps:

1. If we already have all agents added to the manager, the next step is to assign them to the group.
   To do this we will use the :doc:`agent_groups <../reference/tools/agent_groups>` tool or the
   :doc:`API <../api/index>`.
   In our example we are going to assign the agent with id 002 to the group *'dbms'*, so we will use
   the following commands:

   Using **agent_groups**:

   .. code-block:: console

      # /var/ossec/bin/agent_groups -a -i 002 -g dbms

   Using the API:

   .. code-block:: console

      # curl -u foo:bar -k -X PUT "https://API_ADDRESS:55000/agents/002/group/dbms?pretty"

   .. note:: If the group to which we are going to assign the agents does not exist, it will be created when the first
      agent is added and will contain the same files than the *'default'* group. It is also possible to create new groups
      in advance.


   Once added to the group, we can check if the group was correctly added:

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

      # curl -u foo:bar -k -X GET "https://API_ADDRESS:55000/agents/groups/dbms?pretty"


2. Now we can edit the ``agents.conf`` file for this group. To do this we have to modify the file ``etc/shared/dbms/agents.conf``.
   Each agent belonging to this group will receive this file.

3. Once the agent connects to the manager, the manager will sent the files inside the *'dbms'* folder,
   including the ``agent.conf`` file that we modified in the previous step, to the agent in a maximum of 20 minutes.

4. Agents will receive the files in a time period depending on the files size, the amount of agents and also on
   the connection protocol used. For example, we need around 8 minutes to receive a 10 MB folder (excluding **merged.mg** file)
   on 100 agents using UDP. Using TCP will be faster, depending on the network bandwidth.

Once a specific agent belongs to a group, even though an agent is registered again with other name or ID, it will be **automatically reassigned**
to the same group as before. This is made possible by comparing the checksum of the ``merged.mg`` sent by the agent with the checksums saved for all agents in the manager.
