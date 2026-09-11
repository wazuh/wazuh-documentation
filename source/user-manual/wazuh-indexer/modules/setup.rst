.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Setup module prepares and maintains the storage resources required by the Wazuh indexer. Find more information in this section of the documentation.

Setup module
============

The Setup module prepares and maintains the storage resources required by the Wazuh indexer. These resources include:

-  :ref:`Data streams <wazuh_indexer_indices_data_streams>`
-  :ref:`Stateful indices <wazuh_indexer_indices_stateful_indices>`
-  :ref:`Index State Management (ISM) policies <index_state_management>`

During startup, the module creates or updates the index templates, data streams, ISM policies, and internal indices that Wazuh requires. This ensures that the storage layer is ready before Wazuh begins indexing data.

The Setup module is installed by default with the Wazuh indexer packages as ``wazuh-indexer-setup``. You can verify that the module is installed by running the following command:

.. code-block:: console

   # /usr/share/wazuh-indexer/bin/opensearch-plugin list | grep "wazuh-indexer-setup"

**Output**

.. code-block:: none
   :class: output

   wazuh-indexer-setup

Initialization process
----------------------

When the Wazuh indexer starts, the Setup module verifies that all required Wazuh storage resources are available. It creates any missing resources and updates Wazuh-managed index templates to match the version included with the installed Wazuh release.

.. note::

   Manual changes to Wazuh-managed index templates can be overwritten when the Wazuh indexer restarts.

Initialization retry mechanism
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Setup module retries initialization tasks when temporary failures occur during startup. After an operation fails, the module waits for the configured backoff interval before retrying.

If initialization of the same index fails twice in succession, the module stops the initialization process and shuts down the node. This prevents the node from running with incomplete storage resources. You can configure the retry interval using the ``plugins.setup.backoff`` setting in the ``/etc/wazuh-indexer/opensearch.yml`` configuration file.

Replica configuration
^^^^^^^^^^^^^^^^^^^^^

When configured, the Setup module applies ``cluster.default_number_of_replicas`` as a persistent cluster setting. This gives Wazuh-managed indices a consistent default replica count across the cluster without requiring individual index configuration.

Configuration
-------------

The setup module settings are configured in the ``/etc/wazuh-indexer/opensearch.yml`` file using the ``plugins.setup`` prefix.

+-------------------------------------------+----------+-----------------------------------------------------------------+
| Setting                                   | Default  | Description                                                     |
+===========================================+==========+=================================================================+
| ``plugins.setup.timeout``                 | ``30``   | Timeout, in seconds, for index and search operations.           |
+-------------------------------------------+----------+-----------------------------------------------------------------+
| ``plugins.setup.backoff``                 | ``15``   | Delay, in seconds, between initialization retry attempts.       |
+-------------------------------------------+----------+-----------------------------------------------------------------+
| ``plugins.setup.settings_update.enabled`` | ``true`` | Setting this to ``false`` will return ``403`` for every caller. |
+-------------------------------------------+----------+-----------------------------------------------------------------+


API reference
-------------

The Setup module exposes REST API endpoints under ``/_plugins/_setup/``.

.. note::

   All API requests require authentication.

Update settings
^^^^^^^^^^^^^^^

Update settings are stored in the ``.wazuh-settings`` index on the Wazuh indexer. Currently, the Wazuh indexer API supports the ``engine.index_raw_events`` setting, which controls whether raw events are indexed into the ``wazuh-events-raw-v5`` data stream.

**Request**

.. code-block:: none

   PUT /_plugins/_setup/settings

**Request body:**

.. code-block:: json

   {
     "engine": {
       "index_raw_events": true
     }
   }

Where:

+-----------------------------+----------+-------------------------------------------------+
| Field                       | Required | Description                                     |
+=============================+==========+=================================================+
| ``engine``                  | Yes      | Engine configuration object.                    |
+-----------------------------+----------+-------------------------------------------------+
| ``engine.index_raw_events`` | Yes      | Enables or disables the indexing of raw events. |
+-----------------------------+----------+-------------------------------------------------+

**Example**

.. code-block:: console

   curl -sk -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD>  -X PUT \
   "https://127.0.0.1:9200/_plugins/_setup/settings" \
   -H 'Content-Type: application/json' \
   -d '{
     "engine": {
       "index_raw_events": true
     }
   }'

**Responses**

.. code-block:: json
   :class: output

   // Success
   {
     "message": "Settings updated successfully.",
     "status": 200
   }

   // Missing field
   {
     "message": "Missing required field: 'engine.index_raw_events'.",
     "status": 400
   }

   // Invalid type
   {
     "message": "Field 'engine.index_raw_events' must be of type boolean.",
     "status": 400
   }

The status codes in the responses gave the following meanings:

+---------+-----------------------------------------------------------------------+
| Code    | Description                                                           |
+=========+=======================================================================+
| ``200`` | Settings updated successfully.                                        |
+---------+-----------------------------------------------------------------------+
| ``400`` | Invalid request body, missing required fields, or invalid field type. |
+---------+-----------------------------------------------------------------------+
| ``500`` | Internal server error.                                                |
+---------+-----------------------------------------------------------------------+
