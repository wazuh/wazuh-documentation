.. _command-line-remove:

Remove Agents
----------------------------

The binary */var/ossec/bin/manage_agents* allow us to remove agents.

Confirmation before removing the agent:

.. code-block:: console

    # /var/ossec/bin/manage_agents

    ****************************************
    * Wazuh v2.0 Agent manager.            *
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

No confirmation before removing the agent:

.. code-block:: console

    # /var/ossec/bin/manage_agents -r 001


    ****************************************
    * Wazuh v2.0 Agent manager.            *
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
