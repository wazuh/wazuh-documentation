.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Check out how to remove agents using the Wazuh API. The Wazuh API is an open source RESTful API that allows for interaction with the Wazuh manager.
    
.. _restful-api-remove:

Remove agents using the Wazuh API
----------------------------------

This section includes examples of how to use the :api-ref:`DELETE /agents <operation/api.controllers.agent_controller.delete_agents>` request to either delete a list of agents or agents that have been disconnected for a given period of time. 

The examples use :ref:`an authentication token <api_log_in>`. To get your token, replace ``<user>:<password>`` with your Wazuh API credentials and run the following command:

.. code-block:: console

   # TOKEN=$(curl -u <user>:<password> -k -X GET "https://localhost:55000/security/user/authenticate?raw=true")

Removing agents in a list
^^^^^^^^^^^^^^^^^^^^^^^^^

You can remove specific agents using a list. Use the parameter ``agents_list`` to set a list of agent IDs separated by commas. For example, to remove agents ID ``005``, ``006``, and ``007``, run a query like the following one.

.. code-block:: console

    # curl -k -X DELETE "https://localhost:55000/agents?pretty=true&older_than=0s&agents_list=005,006,007&status=all" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
        "data": {
            "affected_items": [
                "005",
                "006",
                "007"
            ],
            "total_affected_items": 3,
            "total_failed_items": 0,
            "failed_items": [],
        },
        "message": "All selected agents were deleted",
        "error": 0,
    }

.. _remove_disconnected_agents:

Removing disconnected agents
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can remove agents which never connected or which have been disconnected for a given period of time. Use the parameter ``older_than`` to set a period of no known activity. Use ``status`` to select the `Never connected` and `Disconnected` agents. For example, to remove agents inactive for more than 21 days, run a query like the following one.

.. code-block:: console

    # curl -k -X DELETE "https://localhost:55000/agents?pretty=true&older_than=21d&agents_list=all&status=never_connected,disconnected" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
   :class: output

   {
      "data": {
         "affected_items": [
            "003"
         ],
         "total_affected_items": 1,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents were deleted",
      "error": 0
   }
