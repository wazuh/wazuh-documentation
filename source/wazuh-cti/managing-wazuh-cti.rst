.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure Wazuh CTI synchronization, manage it through the Wazuh indexer API, and administer your Wazuh CTI subscription.

Managing Wazuh CTI
===================

You can configure and manage Wazuh CTI to control how CTI content is synchronized and accessed in your Wazuh environment. This section describes how to configure CTI synchronization, perform administrative operations using the Wazuh Content Manager API, and manage your Wazuh CTI subscription.

.. _configuring_wazuh_cti:

Configuring Wazuh CTI
----------------------

You can configure how the Content Manager connects to Wazuh CTI and synchronizes content with the Wazuh environment. The Content Manager configuration uses settings with the ``plugins.content_manager`` prefix.

These settings are optional and are not included in the ``/etc/wazuh-indexer/opensearch.yml`` file by default. Add only the settings that you want to configure. Unless otherwise specified, restart the Wazuh indexer after modifying the configuration for the changes to take effect.

The following table shows the Content Manager settings related to Wazuh CTI synchronization:

+--------------------------------------------------------+---------+---------+------------------------------------------+
| Setting                                                | Type    | Default | Description                              |
+========================================================+=========+=========+==========================================+
| ``plugins.content_manager.catalog.sync_interval``      | Integer | 60      | Defines the interval, in minutes,        |
|                                                        |         |         | between scheduled synchronization        |
|                                                        |         |         | cycles. The allowed range is 1 to 1440.  |
+--------------------------------------------------------+---------+---------+------------------------------------------+
| ``plugins.content_manager.catalog.update_on_start``    | Boolean | true    | Specifies whether the Content Manager    |
|                                                        |         |         | checks for content updates when it       |
|                                                        |         |         | starts. The allowed value is ``true`` or |
|                                                        |         |         | ``false``.                               |
+--------------------------------------------------------+---------+---------+------------------------------------------+
| ``plugins.content_manager.catalog.update_on_schedule`` | Boolean | true    | Enables or disables scheduled content    |
|                                                        |         |         | synchronization. The allowed value is    |
|                                                        |         |         | ``true`` or ``false``.                   |
+--------------------------------------------------------+---------+---------+------------------------------------------+
| ``plugins.content_manager.catalog.update_on_demand``   | Boolean | true    | Enables or disables manual               |
|                                                        |         |         | synchronization through the Content      |
|                                                        |         |         | Manager API. The allowed value is        |
|                                                        |         |         | ``true`` or ``false``.                   |
+--------------------------------------------------------+---------+---------+------------------------------------------+
| ``plugins.content_manager.client.timeout``             | Long    | 10      | Defines the timeout, in seconds, for     |
|                                                        |         |         | requests to the Wazuh CTI service. The   |
|                                                        |         |         | allowed range is 10 to 50.               |
+--------------------------------------------------------+---------+---------+------------------------------------------+
| ``plugins.content_manager.max_items_per_bulk``         | Integer | 999     | Defines the maximum number of documents  |
|                                                        |         |         | included in each bulk indexing operation |
|                                                        |         |         | during synchronization. The allowed      |
|                                                        |         |         | range is 10 to 999.                      |
+--------------------------------------------------------+---------+---------+------------------------------------------+
| ``plugins.content_manager.max_concurrent_bulks``       | Integer | 5       | Defines the maximum number of bulk       |
|                                                        |         |         | indexing operations that Content Manager |
|                                                        |         |         | can run concurrently. The allowed range  |
|                                                        |         |         | is 1 to 5.                               |
+--------------------------------------------------------+---------+---------+------------------------------------------+

Configuring synchronization interval
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default, the Content Manager checks for CTI content updates every 60 minutes. You can modify the synchronization interval using the ``plugins.content_manager.catalog.sync_interval`` setting.

For example, the following configuration changes the synchronization interval to 1440 minutes, or 24 hours:

.. code-block:: yaml

   plugins.content_manager.catalog.sync_interval: 1440

Set the value according to how frequently you want the Content Manager to check for available CTI content updates. The allowed range is 1 to 1440 minutes.

Restart the Wazuh indexer after modifying this setting.

.. code-block:: console

   # systemctl restart wazuh-indexer

Configuring synchronization performance
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Content Manager uses bulk indexing operations to store synchronized CTI content in the Wazuh indexer. You can adjust the number of documents processed in each bulk operation and the number of bulk operations that run concurrently.

The ``plugins.content_manager.max_items_per_bulk`` setting controls the maximum number of documents included in each bulk indexing request:

.. code-block:: yaml

   plugins.content_manager.max_items_per_bulk: 999

The allowed range is 10 to 999.

The ``plugins.content_manager.max_concurrent_bulks`` setting controls the maximum number of bulk operations that can run concurrently:

.. code-block:: yaml

   plugins.content_manager.max_concurrent_bulks: 5

The allowed range is 1 to 5.

In environments with limited resources, you can reduce these values to limit resource usage during content synchronization. For example:

.. code-block:: yaml

   plugins.content_manager.max_items_per_bulk: 100
   plugins.content_manager.max_concurrent_bulks: 2

Reducing these values can decrease the resource usage associated with synchronization but can increase the time required to process large content updates.

Restart the Wazuh indexer after modifying this setting.

.. code-block:: console

   # systemctl restart wazuh-indexer

Configuring an offline deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A Wazuh environment without internet connectivity cannot retrieve subsequent content updates from the Wazuh CTI service. However, the Wazuh Content Manager can initialize supported CTI content from the snapshot packaged with the installed Wazuh indexer. This allows Wazuh to use the packaged CTI content while disconnected.

To prevent the Content Manager from repeatedly attempting operations that require connectivity to Wazuh CTI, disable synchronization on startup and scheduled synchronization:

.. code-block:: yaml

   plugins.content_manager.catalog.update_on_start: false
   plugins.content_manager.catalog.update_on_schedule: false

If your Wazuh installation also has the Wazuh version update check enabled, disable it:

.. code-block:: yaml

   plugins.content_manager.telemetry.enabled: false

Restart the Wazuh indexer after modifying this setting.

.. code-block:: console

   # systemctl restart wazuh-indexer

.. warning::

   The packaged snapshot reflects the CTI content included with the installed Wazuh version. To receive updated content, restore connectivity to the Wazuh CTI service and re-enable the applicable synchronization options.

.. _wazuh_indexer_api:

Wazuh indexer API
-------------------

You can access Content Manager endpoints through the Wazuh indexer API to perform administrative operations related to Wazuh CTI. These operations include triggering an immediate content synchronization, checking the synchronization state, and managing the Wazuh CTI subscription.

The following examples use the Wazuh indexer API. Replace ``<WAZUH_INDEXER_IP>``, ``<WAZUH_INDEXER_USERNAME>``, and ``<WAZUH_INDEXER_PASSWORD>`` with your Wazuh indexer credentials.

Triggering a content synchronization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Content Manager synchronizes CTI content automatically according to the configured synchronization schedule. You can also trigger an immediate synchronization without waiting for the next scheduled cycle.

Run the following request:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     -X POST "https://<WAZUH_INDEXER_IP>:9200/_plugins/_content_manager/update"

.. code-block:: json
   :class: output

   {
     "message": "The update request has been accepted for processing.",
     "status": 202
   }

The ``202`` status indicates that the Content Manager accepted the synchronization request for processing. The operation runs asynchronously, so the response does not indicate that synchronization has completed.

The following table shows other responses that the request can return:

+---------+------------------------------------------------------+
| Status  | Description                                          |
+=========+======================================================+
| ``202`` | Content Manager accepted the synchronization request |
|         | for processing.                                      |
+---------+------------------------------------------------------+
| ``409`` | A content synchronization is already in progress.    |
+---------+------------------------------------------------------+
| ``403`` | On-demand synchronization is disabled.               |
+---------+------------------------------------------------------+

On-demand synchronization must also be enabled through the ``plugins.content_manager.catalog.update_on_demand`` setting. If this option is disabled, the Content Manager rejects manual synchronization requests.

You can also perform this action using the **Update CTI content** feature or the **Dev tools** console on the Wazuh dashboard.

To use the **Update CTI content** feature, navigate to **Indexer management** > **Settings**, then click on **Update CTI content**.

.. thumbnail:: /images/wazuh-cti/update-cti-content.png
   :title: Update CTI content
   :alt: Update CTI content
   :align: center
   :width: 80%

To request a content synchronization using the **Dev tools** console, navigate to **Indexer management** > **Dev tools**, then send the post request below.

.. code-block:: none

   post _plugins/_content_manager/update

.. thumbnail:: /images/wazuh-cti/content-synchronization-dev-tools.png
   :title: Content synchronization via Wazuh Dev tools
   :alt: Content synchronization via Wazuh Dev tools
   :align: center
   :width: 80%

Checking synchronization status
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh Content Manager maintains synchronization information independently for each CTI content category. You can inspect this information to determine the current synchronization status and compare the locally synchronized content with the content available from Wazuh CTI.

Run the following request:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     "https://<WAZUH_INDEXER_IP>:9200/.wazuh-cti-consumers/_search?pretty"

.. code-block:: json
   :class: output
   :emphasize-lines: 27,42,57

   {
     "took": 1,
     "timed_out": false,
     "_shards": {
       "total": 1,
       "successful": 1,
       "skipped": 0,
       "failed": 0
     },
     "hits": {
       "total": {
         "value": 3,
         "relation": "eq"
       },
       "max_score": 1.0,
       "hits": [
         {
           "_index": ".wazuh-cti-consumers",
           "_id": "cti:catalog:consumer:ruleset",
           "_score": 1.0,
           "_source": {
             "name": "public-ruleset-5",
             "context": "rc1-t1-ruleset-5",
             "type": "cti:catalog:consumer:ruleset",
             "resource": "https://api.pre.cloud.wazuh.com/api/v1/catalog/contexts/rc1-t1-ruleset-5/consumers/public-ruleset-5",
             "is_public": true,
             "status": "ready",
             "local_offset": 1230,
             "remote_offset": 1230
           }
         },
         {
           "_index": ".wazuh-cti-consumers",
           "_id": "cti:catalog:consumer:iocs",
           "_score": 1.0,
           "_source": {
             "name": "public-iocs-5",
             "context": "t1-iocs-5",
             "type": "cti:catalog:consumer:iocs",
             "resource": "https://api.pre.cloud.wazuh.com/api/v1/catalog/contexts/t1-iocs-5/consumers/public-iocs-5",
             "is_public": true,
             "status": "ready",
             "local_offset": 255096,
             "remote_offset": 255096
           }
         },
         {
           "_index": ".wazuh-cti-consumers",
           "_id": "cti:catalog:consumer:vulnerabilities",
           "_score": 1.0,
           "_source": {
             "name": "public-vulnerabilities-5",
             "context": "t1-vulnerabilities-5",
             "type": "cti:catalog:consumer:vulnerabilities",
             "resource": "https://api.pre.cloud.wazuh.com/api/v1/catalog/contexts/t1-vulnerabilities-5/consumers/public-vulnerabilities-5",
             "is_public": true,
             "status": "ready",
             "local_offset": 595699,
             "remote_offset": 595699
           }
         }
       ]
     }
   }

You can also perform this action using the **Dev tools** console on the Wazuh dashboard. Navigate to **Indexer management** > **Dev tools**, then send the post request below.

.. code-block:: none

   get .wazuh-cti-consumers/_search?pretty

.. thumbnail:: /images/wazuh-cti/checking-synchronization-status-dev-tools.png
   :title: Checking synchronization status via Wazuh Dev tools
   :alt: Checking synchronization status via Wazuh Dev tools
   :align: center
   :width: 80%

The response contains the synchronization state for the CTI content categories, including information such as the category type, synchronization status, and local and remote offsets.

Use the ``status`` field to determine the state of a content category:

+-------------+---------------------------------------------------------+
| Status      | Description                                             |
+=============+=========================================================+
| ``ready``   | Synchronization is complete, and the content is         |
|             | available for use.                                      |
+-------------+---------------------------------------------------------+
| ``running`` | A synchronization operation is currently in progress.   |
+-------------+---------------------------------------------------------+
| ``failed``  | The previous synchronization attempt was interrupted by |
|             | an error.                                               |
+-------------+---------------------------------------------------------+

You can also compare the local and remote synchronization offsets:

-  ``local_offset`` equals ``remote_offset``: The content category is synchronized with the available CTI content.
-  ``local_offset`` is lower than ``remote_offset``: Newer content is available, and the content category requires synchronization.
-  ``local_offset`` is ``0``: The content category has not completed its initial synchronization and requires snapshot initialization.

If a content category remains in the ``running`` state for an extended period or reports a ``failed`` status, check the Wazuh indexer logs ``/var/log/wazuh-indexer/wazuh-indexer.log`` for Content Manager synchronization errors.

.. note::

   The ``.wazuh-cti-consumers`` index is an internal system index. Use it to inspect synchronization state for administrative and troubleshooting purposes.

..
   Wazuh CTI subscription
   ------------------------

   Wazuh CTI provides content through both the free plan and subscription plans. The free plan provides content that can be synchronized without registering a subscription, while subscription plans provide additional content that requires authentication.

   The Wazuh Content Manager uses the registered subscription to authenticate requests to the Wazuh CTI service and retrieve the content available for the associated plan.

   Authentication is performed using an access token. When you register a subscription, the Content Manager securely stores the token in the Wazuh indexer and uses it for subsequent requests to the Wazuh CTI service.

   You can register, check, and remove the Wazuh CTI subscription through the Content Manager API. Without a registered access token, the Content Manager synchronizes only the content available through the Free plan. Operations that require an authenticated subscription, such as manually triggering a content synchronization, are unavailable until you register a valid access token.

   Setting up a CTI subscription
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

   Register a Wazuh CTI subscription by providing its access token to the Content Manager subscription endpoint. Run the following request on the Wazuh indexer:

   .. code-block:: none

      $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
        -X POST "https://<WAZUH_INDEXER_IP>:9200/_plugins/_content_manager/subscription" \
        -H "Content-Type: application/json" \
        -d '{
          "access_token": "<CTI_ACCESS_TOKEN>"
        }'

   Replace:

   -  ``<WAZUH_INDEXER_USERNAME>`` with the Wazuh indexer username.
   -  ``<WAZUH_INDEXER_PASSWORD>`` with the corresponding password.
   -  ``<WAZUH_INDEXER_IP>`` with the IP address or hostname of the Wazuh indexer.
   -  ``<CTI_ACCESS_TOKEN>`` with your Wazuh CTI subscription access token.

   .. code-block:: json
      :class: output

      {
        "message": "Credentials received",
        "status": 201
      }

   After registration, the Content Manager stores the access token and uses it to authenticate subsequent requests to the Wazuh CTI service.

   Checking subscription status
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   You can check whether a Wazuh CTI subscription is registered and identify the active subscription plan.

   Run the following command:

   .. code-block:: console

      $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
        -X GET "https://<WAZUH_INDEXER_IP>:9200/_plugins/_content_manager/subscription"

   For a registered subscription, the response identifies the active plan and confirms the registration status:

   .. code-block:: json
      :class: output

      {
        "message": {
          "plan": {
            "name": "<SUBSCRIPTION_PLAN>",
            "is_public": false
          },
          "is_registered": true
        },
        "status": 200
      }

   If no subscription is registered, Content Manager reports the public free plan:

   .. code-block:: json
      :class: output

      {
        "message": {
          "plan": {
            "name": "Free",
            "is_public": true
          },
          "is_registered": false
        },
        "status": 200
      }

   Content Manager validates stored credentials when checking the subscription status. If Wazuh CTI service rejects the access token, for example because it has expired or been revoked, the Content Manager removes the invalid credentials and reverts to the unregistered state.

   Removing a CTI subscription
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^

   Removing a subscription deletes the registered CTI access token. Content Manager will no longer access subscription-specific content and instead use the content available through the public free plan.

   Run the following request to remove the registered subscription:

   .. code-block:: console

      $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
        -X DELETE "https://<WAZUH_INDEXER_IP>:9200/_plugins/_content_manager/subscription"

   .. code-block:: json
      :class: output

      {
        "message": "Credentials removed",
        "status": 200
      }
