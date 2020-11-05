.. Copyright (C) 2020 Wazuh, Inc.

.. _migration_guide:

Migrating to Open Distro for Elasticsearch
==========================================

This guide will explain how to migrate from Elastic Stack with basic license to Elastic Stack with Open Distro for Elasticsearch.

.. note:: Root user privileges are required to run all the commands described below.

This is a critical process and it is highly recommended to perform a back-up of the indices before continuing with the migration.

Create a snapshot repository. If it was already created, this step can be omited:

  .. code-block:: bash

      curl -PUT https://<elasticsearch_ip>:9200/_snapshot/<repository_name> -uelastic:<elastic_password> -k -H 'Content-Type: application/json' -d'
      {
        "type": "fs",
        "settings": {
            "location": "/var/backups/"
        }
      }
      '

Create the snapshot:

  .. code-block:: bash

    curl -PUT https://<elasticsearch_ip>:9200/_snapshot/<repository_name>/<snapshot_name>?wait_for_completion=true -uelastic:<elastic_password> -k -H 'Content-Type: application/json' -d'
    {
      "indices": "all",
      "ignore_unavailable": true,
      "include_global_state": false
    }
      '
