.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Diagnose and resolve issues with Wazuh CTI content synchronization and Content Manager operations.

Troubleshooting Wazuh CTI
===========================

Use the following troubleshooting procedures to diagnose issues with Wazuh CTI content synchronization and Content Manager operations. Start by checking the synchronization state of the affected content category, then review the Content Manager configuration and Wazuh indexer logs for additional information. You can perform the Wazuh indexer API requests shown in this section by using curl or the **Dev Tools** console in the Wazuh dashboard.

CTI content is not updating
----------------------------

If CTI content is not updating, verify the connection to Wazuh CTI, the subscription status, and the synchronization state.

Perform the following checks:

#. Verify network connectivity. Ensure that the Wazuh indexer can connect to the Wazuh CTI service and that firewalls, proxies, or other network controls do not block the connection.

#. Check the subscription status. Verify that a valid Wazuh CTI subscription is registered if the requested operation or content requires authentication:

   .. code-block:: console

      $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
        -X GET "https://<WAZUH_INDEXER_IP>:9200/_plugins/_content_manager/subscription"

#. Check the content category synchronization state. Run the following command:

   .. code-block:: console

      $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
        "https://<WAZUH_INDEXER_IP>:9200/.wazuh-cti-consumers/_search?pretty"

   Review the ``status``, ``local_offset``, and ``remote_offset`` fields for the affected content category.

   -  If ``local_offset`` equals ``remote_offset``, the content category is synchronized with the currently available content.
   -  If ``local_offset`` is lower than ``remote_offset``, newer content is available but has not yet been synchronized.
   -  If ``local_offset`` is ``0``, the content category has not completed its initial synchronization.

#. Check the Wazuh indexer logs. Review ``/var/log/wazuh-indexer/wazuh-indexer.log`` for the Content Manager or CTI-related errors.

CTI synchronization fails
---------------------------

A CTI content synchronization enters the failed state when an unexpected error interrupts the synchronization process.

Check the content synchronization state to identify the affected content category:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     "https://<WAZUH_INDEXER_IP>:9200/.wazuh-cti-consumers/_search?pretty"

Then review the Wazuh indexer log:

.. code-block:: console

   $ grep -Ei "content.manager|Contentmanager|CatalogSync|consumer-sync|cti|CTIClient" \
     /var/log/wazuh-indexer/wazuh-indexer.log

To search specifically for related errors, run:

.. code-block:: console

   $ grep -Ei "ERROR.*content.manager" \
     /var/log/wazuh-indexer/wazuh-indexer.log

Common causes include connectivity problems, invalid or expired subscription credentials, unavailable CTI services, and errors while processing or storing synchronized content.

Content Manager retries a failed scheduled synchronization during the next synchronization cycle. Resolve the underlying issue and verify that the content synchronization state returns to the ``ready`` state after a subsequent synchronization.

Manual synchronization fails
------------------------------

If an on-demand synchronization request fails, use the returned status code to identify the cause.

+---------+-------------------------------------+------------------------------------------------------+
| Status  | Cause                               | Action                                               |
+=========+=====================================+======================================================+
| ``409`` | A content synchronization operation | Wait for the current                                 |
|         | is already running.                 | synchronization to complete before                   |
|         |                                     | trying again.                                        |
+---------+-------------------------------------+------------------------------------------------------+
| ``403`` | On-demand synchronization is        | Enable                                               |
|         | disabled.                           | ``plugins.content_manager.catalog.update_on_demand`` |
|         |                                     | if manual synchronization is                         |
|         |                                     | required.                                            |
+---------+-------------------------------------+------------------------------------------------------+

You can verify that on-demand synchronization is enabled in ``/etc/wazuh-indexer/opensearch.yml``:

.. code-block:: yaml

   plugins.content_manager.catalog.update_on_demand: true

After resolving the issue, trigger synchronization again:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     -X POST "https://<WAZUH_INDEXER_IP>:9200/_plugins/_content_manager/update"

A successful request returns a ``202`` status, indicating that the synchronization request has been accepted for processing.

Verify synchronized content
-----------------------------

You can verify that the Content Manager has populated the expected content by checking the document count in the relevant content indices.

For example, check the number of synchronized rules:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     "https://<WAZUH_INDEXER_IP>:9200/wazuh-threatintel-rules/_count?pretty"

.. code-block:: json
   :class: output
   :emphasize-lines: 2

   {
     "count": 268,
     "_shards": {
       "total": 1,
       "successful": 1,
       "skipped": 0,
       "failed": 0
     }
   }

You can perform the same check for the applicable CTI content indices:

-  ``wazuh-threatintel-rules``
-  ``wazuh-threatintel-decoders``
-  ``wazuh-threatintel-integrations``
-  ``wazuh-threatintel-kvdbs``
-  ``wazuh-threatintel-policies``
-  ``wazuh-threatintel-enrichments``

A non-zero document count confirms that the index contains content, but it does not by itself confirm that the content is current.

Content Manager jobs do not start
-----------------------------------

Content Manager uses scheduled jobs to perform periodic CTI synchronization and Wazuh version update checks. These jobs require the ``.wazuh-content-manager-jobs`` index to reach the required health state before they can register.

Check the Wazuh indexer cluster health:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     "https://<WAZUH_INDEXER_IP>:9200/_cluster/health?pretty"

You can also inspect the Content Manager job metadata:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     "https://<WAZUH_INDEXER_IP>:9200/.wazuh-content-manager-jobs/_search?pretty"

If a job cannot register during startup, the Content Manager retries the registration up to three times. The retries use increasing delays of 15, 30, and 45 seconds. If all attempts fail, the Content Manager records an error in the Wazuh indexer log and does not attempt to register the job again until the next Wazuh indexer restart.

Search the logs for job scheduling errors:

.. code-block:: console

   $ grep -Ei "CatalogSyncJob|scheduling|content.manager" \
     /var/log/wazuh-indexer/wazuh-indexer.log

If the ``.wazuh-content-manager-jobs`` index is unavailable or unhealthy, investigate the Wazuh indexer cluster health and shard allocation before restarting the affected Wazuh indexer node.
