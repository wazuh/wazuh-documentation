.. Copyright (C) 2020 Wazuh, Inc.

.. _migration_guide:

Migrating to Open Distro for Elasticsearch
==========================================

This guide will explain how to migrate from Elastic Stack with basic license to Elastic Stack with Open Distro for Elasticsearch.

.. note:: Root user privileges are required to run all the commands described below.

This is a critical process and it is highly recommended to perform a back-up of the indices before continuing with the migration.

#. Create a snapshot repository. If it was already created, this step can be omited:

.. code-block:: console

    # curl -PUT https://localhost:9200/_snapshot/my_repository -uelastic:c00urJy9G73kzJ7YcM3G -k -H 'Content-Type: application/json' -d'
    {
    "type": "fs",
    "settings": {
        "location": "/var/backups/"
    }
    }
    '


curl -PUT https://localhost:9200/_snapshot/my_repository/snapshot_2?wait_for_completion=true -uelastic:c00urJy9G73kzJ7YcM3G -k -H 'Content-Type: application/json' -d'
{
  "indices": "all",
  "ignore_unavailable": true,
  "include_global_state": false
}
'