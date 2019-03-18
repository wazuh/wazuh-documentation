.. Copyright (C) 2018 Wazuh, Inc.

.. _restful-api-remove:

Remove agents using the Wazuh API
----------------------------------

The request :ref:`DELETE /agents/:agent_id <request_list>` removes the specified agent.

.. code-block:: console

    # curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/agents/005?pretty&purge"
    {
    "error": 0,
    "data": {
        "msg": "All selected agents were removed",
        "affected_agents": [
            "005"
        ]
    }
    }