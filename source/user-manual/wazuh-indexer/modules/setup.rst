.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Setup module prepares and maintains the storage resources required by the Wazuh indexer. Find more information in this section of the documentation.

Setup module
============

The Setup module prepares and maintains the storage resources required by the Wazuh indexer. These resources include:

-  :ref:`Data streams <wazuh_indexer_indices_data_streams>`
-  :ref:`Stateful indices <wazuh_indexer_indices_stateful_indices>`
-  :ref:`Index State Management (ISM) policies <index_state_management>`

During startup, the module creates or updates the index templates, data streams, ISM policies, and internal indices that Wazuh requires. This ensures that the storage layer is ready before Wazuh begins indexing data. The module uses the following internal indices:

-  ``.wazuh-setup-status``: a hidden, single-document index that records the initialization state: ``running``, ``ready``, or ``failed``.
-  ``.wazuh-settings``: stores the cluster-wide Wazuh settings managed through the `Update settings`_ endpoint.
-  ``.wazuh-internal-state``: a hidden system index that holds the AI assistant providers configuration, settings, and field policy, and the Content Manager internal state, such as its CTI credentials. Users can't read or change it directly. Manage the AI assistant through the :ref:`AI assistant administrative API <wazuh_indexer_setup_ai_assistant_admin_api>`. Only the Content Manager module accesses its own part.

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

By default, the module retries a failed initialization task once. If the retry also fails, the module stops the initialization process, logs ``Setup initialization failed``, and marks the setup status as ``failed``. The node keeps running with incomplete storage resources. Fix the cause shown in ``/var/log/wazuh-indexer/wazuh-cluster.log`` and restart the Wazuh indexer. You can set the number of retries with the ``plugins.setup.max_retries`` setting and the interval between them with the ``plugins.setup.backoff`` setting, in the ``/etc/wazuh-indexer/opensearch.yml`` file.

Replica configuration
^^^^^^^^^^^^^^^^^^^^^

When configured, the Setup module applies ``cluster.default_number_of_replicas`` as a persistent cluster setting. This gives Wazuh-managed indices a consistent default replica count across the cluster without requiring individual index configuration.

Configuration
-------------

The Setup module settings are configured in the ``/etc/wazuh-indexer/opensearch.yml`` file using the ``plugins.setup`` prefix. Changes take effect after you restart the Wazuh indexer.

+-------------------------------------------+----------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| Setting                                   | Default  | Description                                                                                                                                               |
+===========================================+==========+===========================================================================================================================================================+
| ``plugins.setup.timeout``                 | ``30``   | Timeout, in seconds, for index and search operations. Valid range: 5-120.                                                                                 |
+-------------------------------------------+----------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``plugins.setup.backoff``                 | ``15``   | Delay, in seconds, between initialization retry attempts. Valid range: 5-60.                                                                              |
+-------------------------------------------+----------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``plugins.setup.max_retries``             | ``1``    | Number of times the module retries a failed initialization task before it stops the initialization. ``0`` disables retries. Valid range: 0-10.            |
+-------------------------------------------+----------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``plugins.setup.settings_update.enabled`` | ``true`` | Allows changes through the ``PUT /_plugins/_setup/settings`` endpoint. When ``false``, the endpoint returns ``403`` for every caller, regardless of role. |
+-------------------------------------------+----------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+


API reference
-------------

The Setup module exposes REST API endpoints under ``/_plugins/_setup/``.

.. note::

   All API requests require authentication.

Update settings
^^^^^^^^^^^^^^^

Update settings are stored in the ``.wazuh-settings`` index on the Wazuh indexer. Currently, the Wazuh indexer API supports the ``engine.index_raw_events`` setting, which controls whether raw events are indexed into the ``wazuh-events-raw-v5`` data stream. The default value is ``false``, so Wazuh does not index raw events until you enable the setting. Indexed raw events are deleted as described in :doc:`Event template retention </user-manual/wazuh-indexer/index-templates-reference>`. To read the current value, query the ``.wazuh-settings`` index:

**Request**

.. code-block:: none

   GET /.wazuh-settings/_search?filter_path=hits.hits._source&pretty

**Response**

.. code-block:: json
   :class: output
   :emphasize-lines: 7

   {
     "hits": {
       "hits": [
         {
           "_source": {
             "engine": {
               "index_raw_events": false
             }
           }
         }
       ]
     }
   }

Update the setting using the following request.

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

+-----------------------------+----------+--------------------------------------------------------------------------------------------------+
| Field                       | Required | Description                                                                                      |
+=============================+==========+==================================================================================================+
| ``engine``                  | Yes      | Engine configuration object.                                                                     |
+-----------------------------+----------+--------------------------------------------------------------------------------------------------+
| ``engine.index_raw_events`` | Yes      | Enables (``true``) or disables (``false``) the indexing of raw events. The default is ``false``. |
+-----------------------------+----------+--------------------------------------------------------------------------------------------------+

**Example**

Replace ``<WAZUH_INDEXER_IP>`` with the IP address of the Wazuh indexer node and ``<WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD>`` with your Wazuh indexer username and password.

.. code-block:: console

   curl -sk -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD>  -X PUT \
   "https://<WAZUH_INDEXER_IP>:9200/_plugins/_setup/settings" \
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

   // Settings updates disabled
   {
     "message": "Setup settings updates are disabled on this deployment.",
     "status": 403
   }

The status codes in the responses have the following meanings:

+---------+-------------------------------------------------------------------------------------------------------------+
| Code    | Description                                                                                                 |
+=========+=============================================================================================================+
| ``200`` | Settings updated successfully.                                                                              |
+---------+-------------------------------------------------------------------------------------------------------------+
| ``400`` | Invalid request body, missing required fields, or invalid field type.                                       |
+---------+-------------------------------------------------------------------------------------------------------------+
| ``403`` | Settings updates are disabled on this node, because ``plugins.setup.settings_update.enabled`` is ``false``. |
+---------+-------------------------------------------------------------------------------------------------------------+
| ``500`` | Internal server error.                                                                                      |
+---------+-------------------------------------------------------------------------------------------------------------+

.. _wazuh_indexer_setup_ai_assistant_sessions:

AI assistant sessions
^^^^^^^^^^^^^^^^^^^^^

The Wazuh dashboard stores AI assistant conversations in the ``wazuh-ai-assistant-sessions`` data stream through the following endpoints. Each one requires the ``plugin:wazuh/ai_assistant/session/write`` cluster permission, which the ``wazuh_ai_assistant`` role grants to every user. The Wazuh indexer sets the session owner from the authenticated user and ignores a ``user`` value in the request body.

-  ``POST /_plugins/_setup/ai_assistant/sessions``: creates a session.
-  ``PUT /_plugins/_setup/ai_assistant/sessions/{id}``: replaces the transcript of a session.
-  ``PATCH /_plugins/_setup/ai_assistant/sessions/{id}``: renames a session.
-  ``DELETE /_plugins/_setup/ai_assistant/sessions/{id}``: deletes a session.

A request body must be 5 MiB or smaller, and a session can hold up to 1000 messages. Larger requests are rejected with ``400``. Each user can own up to 500 sessions, and creating another one returns ``409`` until the user deletes a session. Updating, renaming, or deleting a session that belongs to another user returns ``404``. There are no read endpoints: to list sessions or read a transcript, query the data stream. Document-level security limits the results to the user's own sessions.

.. _wazuh_indexer_setup_ai_assistant_admin_api:

AI assistant administrative API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The AI assistant providers configuration, assistant-wide settings, and field policy are stored in the hidden ``.wazuh-internal-state`` index and managed through the following endpoints. Reading them requires the ``plugin:wazuh/ai_assistant/settings/read`` cluster permission, and changing them requires ``plugin:wazuh/ai_assistant/settings/write``. Only the ``all_access`` role holds these permissions by default.

-  ``GET`` and ``PUT /_plugins/_setup/ai_assistant/settings``: read and update the assistant settings.
-  ``GET`` and ``POST /_plugins/_setup/ai_assistant/providers``: list and add providers.
-  ``PUT`` and ``DELETE /_plugins/_setup/ai_assistant/providers/{id}``: update and delete a provider.
