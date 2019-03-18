.. Copyright (C) 2018 Wazuh, Inc.

.. _restful-api-listing:

Listing agents using the Wazuh API
----------------------------------

The request `GET /agents <https://documentation.wazuh.com/current/user-manual/api/reference.html#get-all-agents>`_ returns the list of available agents.

.. note:: GET is the default action of curl and does not need to be specifically referenced.

.. code-block:: console

   # curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents?pretty&offset=0&sort=-ip,name"

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
               "name": "Ubuntu-02",
               "ip": "10.0.0.8",
               "id": "003",
               "node_name": "node11"
            },
            {
               "status": "Connected",
               "dateAdd": "2019-03-04 02:01:06",
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
               "group": [
                  "default"
               ],
               "name": "Ubuntu-01",
               "ip": "10.0.0.15",
               "id": "002",
               "node_name": "node02"
            }
         ]
      }
   }
