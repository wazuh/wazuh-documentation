.. Copyright (C) 2019 Wazuh, Inc.

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