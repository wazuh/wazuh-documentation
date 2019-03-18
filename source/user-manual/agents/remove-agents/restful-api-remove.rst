.. Copyright (C) 2018 Wazuh, Inc.

.. _restful-api-remove:

Remove agents using the Wazuh API
----------------------------------

The request :ref:`DELETE /agents/:agent_id <request_list>` removes the specified agent.

.. code-block:: console

    # curl -u foo:bar -X DELETE "http://localhost:55000/agents/002"

    {"error":0,"data":"Agent removed"}
