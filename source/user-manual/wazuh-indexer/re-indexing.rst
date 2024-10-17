.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: When changes are made to the data schema, it becomes necessary to re-index data to reflect these changes. Find out how to re-index an existing index in this section of the documentation.

Re-indexing
===========

When changes are made to the index’s data schema, it becomes necessary to re-index data to reflect these changes. Existing data may not match the updated schema without re-indexing, leading to data inconsistencies or errors during queries. Re-indexing lets you copy all or a subset of your data from a source index into a destination index.

To re-index an existing index, perform the following steps on either the Wazuh dashboard or the Wazuh server.

Wazuh dashboard
---------------

#. Click on the **upper left menu ☰** and go to **Server management** then **Dev Tools**.
#. Enter the following API call, replacing ``my-source-index`` with the source index pattern and ``my-destination-index`` with the destination index pattern.

   .. code-block:: none
      :emphasize-lines: 4, 7

      POST /_reindex
      {
         "source":{
            "index":"my-source-index"
         },
         "dest":{
            "index":"my-destination-index"
         }
      }

   For example:

   .. code-block:: none

      POST /_reindex
      {
         "source":{
            "index":"wazuh-alerts-*"
         },
         "dest":{
            "index":"example-alerts"
         }
      }

   .. code-block:: output
      :class: output

      {
        "took": 23655,
        "timed_out": false,
        "total": 26849,
        "updated": 0,
        "created": 26849,
        "deleted": 0,
        "batches": 27,
        "version_conflicts": 0,
        "noops": 0,
        "retries": {
          "bulk": 0,
          "search": 0
        },
        "throttled_millis": 0,
        "requests_per_second": -1,
        "throttled_until_millis": 0,
        "failures": []
      }

Command line interface
----------------------

Run the following command on any Wazuh central component that is allowed to authenticate to the Wazuh API. Replace ``<INDEXER_USERNAME>`` and ``<INDEXER_PASSWORD>`` with the indexer username and password:

.. code-block:: console
   :emphasize-lines: 4, 7

   curl -k -u "<INDEXER_USERNAME>:<INDEXER_PASSWORD>" -XPOST "https://<INDEXER_IP_ADDRESS>:9200/_reindex" -H 'Content-Type: application/json' -d'
   {
      "source":{
         "index":"my-source-index"
      },
      "dest":{
         "index":"my-destination-index"
      }
   }'

For example:

.. code-block:: none

   root@wazuh-server:~$ curl -k -u "INDEXER_USERNAME:INDEXER_PASSWORD" -XPOST "https://<INDEXER_IP_ADDRESS>:9200/_reindex" -H 'Content-Type: application/json' -d'
   {
      "source":{
         "index":"wazuh-alerts-*"
      },
      "dest":{
         "index":"example-alerts"
      }
   }'

.. code-block:: output
   :class: output

   {"took":18025,"timed_out":false,"total":26854,"updated":26854,"created":0,"deleted":0,"batches":27,"version_conflicts":0,"noops":0,"retries":{"bulk":0,"search":0},"throttled_millis":0,"requests_per_second":-1.0,"throttled_until_millis":0,"failures":[]}

