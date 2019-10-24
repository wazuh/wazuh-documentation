.. Copyright (C) 2019 Wazuh, Inc.

.. _restful-api-listing:

Listing agents using the Wazuh API
----------------------------------

The request `GET /agents <https://documentation.wazuh.com/current/user-manual/api/reference.html#get-all-agents>`_ returns the list of available agents.

.. code-block:: console

   # curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents?pretty&offset=0&sort=-ip,name"

.. code-block:: json

   {
      "error": 0,
      "data": {
         "totalItems": 2,
         "items": [
            {
               "status": "Active",
               "dateAdd": "2019-03-18 17:15:12",
               "lastKeepAlive": "2019-03-18 17:25:30",
               "os": {
                  "major": "16",
                  "name": "Ubuntu",
                  "uname": "Linux |ubuntu |4.4.0-135-generic |#161-Ubuntu SMP Mon Aug 27 10:45:01 UTC 2018 |x86_64",
                  "platform": "ubuntu",
                  "version": "16.04.5 LTS",
                  "codename": "Xenial Xerus",
                  "arch": "x86_64",
                  "minor": "04"
               },
               "name": "Ubuntu-01",
               "ip": "10.0.2.15",
               "id": "003",
               "node_name": "node01"
            },
            {
               "status": "Active",
               "dateAdd": "2019-03-18 17:15:49",
               "lastKeepAlive": "2019-03-18 17:25:30",
               "os": {
                  "major": "16",
                  "name": "Ubuntu",
                  "uname": "Linux |ubuntu |4.4.0-135-generic |#39-Ubuntu SMP Mon Sep 24 16:19:09 UTC 2018 |x86_64",
                  "platform": "ubuntu",
                  "version": "16.04.5 LTS",
                  "codename": "Xenial Xerus",
                  "arch": "x86_64",
                  "minor": "04"
               },
               "name": "Ubuntu-02",
               "ip": "10.0.2.16",
               "id": "004",
               "node_name": "node02"
            }
         ]
      }
   }
