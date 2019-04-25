.. Copyright (C) 2019 Wazuh, Inc.

.. _restful-api-remove:

Remove Agents
-------------

The request :ref:`DELETE /agents/:agent_id <request_list>` removes the specified agent.

.. code-block:: console

    # curl -u foo:bar -X DELETE "http://localhost:55000/agents/002"

    {"error":0,"data":"Agent removed"}
