.. Copyright (C) 2019 Wazuh, Inc.

.. _remove_agents:

Removing agents
===============

.. _remove:

Remove agents using the CLI
---------------------------

The binary ``manage_agents`` can be used also to remove agents using the command line.

If the user would like confirmation before removing the agent, use the following:

.. code-block:: console

    # /var/ossec/bin/manage_agents

    ****************************************
    * Wazuh v3.9.1 Agent manager.          *
    * The following options are available: *
    ****************************************
       (A)dd an agent (A).
       (E)xtract key for an agent (E).
       (L)ist already added agents (L).
       (R)emove an agent (R).
       (Q)uit.
    Choose your action: A,E,L,R or Q: r

    Available agents:
       ID: 001, Name: DB_Agent, IP: any
    Provide the ID of the agent to be removed (or '\q' to quit): 003
    Confirm deleting it?(y/n): y
    Agent '001' removed.

    manage_agents: Exiting.

If the user would like to remove the agent without confirmation, use the option shown below:

.. code-block:: console

    # /var/ossec/bin/manage_agents -r 001

    ****************************************
    * Wazuh v3.9.1 Agent manager.          *
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

    manage_agents: Exiting.


.. _restful-api-remove:

Remove agents using the Wazuh API
----------------------------------

The request `DELETE /agents <https://documentation.wazuh.com/current/user-manual/api/reference.html#delete-agents>`_ removes the specified agents.

.. code-block:: console

    # curl -u foo:bar -k -X DELETE -d '{"ids":["005","006","007"]}' "https://127.0.0.1:55000/agents?pretty&purge"

.. code-block:: json

    {
        "error": 0,
        "data": {
            "msg": "All selected agents were removed",
            "affected_agents": [
                "005",
                "006",
                "007"
            ]
        }
    }
