.. _restful-api-remove:

Remove Agents
--------------------------------

The request :ref:`DELETE /agents/:agent_id <request_list>` removes the specified agent.

.. code-block:: console

    $ curl -u foo:bar -k -X DELETE http://127.0.0.1:55000/agents/002

    {"error":0,"data":"Agent removed"}
