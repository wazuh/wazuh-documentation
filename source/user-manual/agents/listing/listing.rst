.. Copyright (C) 2018 Wazuh, Inc.

.. _restful-api-listing:

Listing agents using the Wazuh API
----------------------------------

The request :ref:`GET /agents <request_list>` returns the list of available agents.

.. note:: GET is the default action of curl and does not need to be specifically referenced.

.. code-block:: console

    # curl -u foo:bar "http://localhost:55000/agents?pretty"

.. code-block:: json

    {
       "error": 0,
       "data": {
          "totalItems": 15,
          "items": [
             {
                "status": "Active",
                "ip": "127.0.0.1",
                "id": "000",
                "name": "vpc-ossec-manager"
             },
             {
                "status": "Active",
                "ip": "10.0.0.121",
                "id": "003",
                "name": "vpc-agent-debian"
             },
             {
                "status": "Active",
                "ip": "10.0.0.126",
                "id": "005",
                "name": "vpc-agent-ubuntu-public"
             },
             {
                "status": "Active",
                "ip": "10.0.0.124",
                "id": "006",
                "name": "vpc-agent-windows"
             },
            {
                "...": "..."
            }
          ]
       }
    }
