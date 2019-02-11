.. Copyright (C) 2018 Wazuh, Inc.

.. _command-line-remove:

Remove Agents
-------------

The binary */var/ossec/bin/manage_agents* allows the removal of agents using the command line.

If the user would like a confirmation before removing the agent, use the following:

.. code-block:: console

    # /var/ossec/bin/manage_agents

    ****************************************
    * Wazuh v3.8.1 Agent manager.          *
    * The following options are available: *
    ****************************************
       (A)dd an agent (A).
       (E)xtract key for an agent (E).
       (L)ist already added agents (L).
       (R)emove an agent (R).
       (Q)uit.
    Choose your action: A,E,L,R or Q: r

    Available agents:
       ID: 003, Name: DB_Agent, IP: any
    Provide the ID of the agent to be removed (or '\q' to quit): 003
    Confirm deleting it?(y/n): y
    Agent '003' removed.

    ** You must restart OSSEC for your changes to take effect.

    manage_agents: Exiting.

If the user would like to remove the agent with no confirmation, use the option shown below:

.. code-block:: console

    # /var/ossec/bin/manage_agents -r 001

    ****************************************
    * Wazuh v3.8.1 Agent manager.          *
    * The following options are available: *
    ****************************************
       (A)dd an agent (A).
       (E)xtract key for an agent (E).
       (L)ist already added agents (L).
       (R)emove an agent (R).
       (Q)uit.
    Choose your action: A,E,L,R or Q:
    Available agents:
       ID: 001, Name: new, IP: any
    Provide the ID of the agent to be removed (or '\q' to quit): 001
    Confirm deleting it?(y/n): y
    Agent '001' removed.

    ** You must restart OSSEC for your changes to take effect.

    manage_agents: Exiting.
