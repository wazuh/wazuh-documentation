.. Copyright (C) 2018 Wazuh, Inc.

.. _restful-api-listing:

Listing agents using the Wazuh API
----------------------------------

The request :ref:`GET /agents <request_list>` returns the list of available agents.

.. note:: GET is the default action of curl and does not need to be specifically referenced.

.. code-block:: console

   # curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents?pretty&offset=0&limit=5&sort=-ip,name"

.. code-block:: json

   {
      "error": 0,
      "data": {
         "totalItems": 2,
         "items": [
            {
               "status": "Disconnected",
               "dateAdd": "2019-02-16 15:17:11",
               "lastKeepAlive": "2019-03-05 12:20:18",
               "name": "NewHost",
               "ip": "10.0.0.8",
               "id": "003",
               "node_name": "unknown"
            },
            {
               "status": "Never connected",
               "dateAdd": "2019-03-04 02:01:06",
               "group": [
                  "default"
               ],
               "name": "server001",
               "ip": "10.0.0.15",
               "id": "002",
               "node_name": "unknown"
            }
         ]
      }
   }
