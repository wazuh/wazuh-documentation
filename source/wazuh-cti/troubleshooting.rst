.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Diagnose and resolve issues with Wazuh CTI content synchronization and Content Manager operations.

Troubleshooting Wazuh CTI
=========================

Use the following troubleshooting procedures to diagnose issues with Wazuh CTI content synchronization and Content Manager operations. Start by checking the synchronization state of the affected content category, then review the Content Manager configuration and Wazuh indexer logs for additional information. You can perform the Wazuh indexer API requests shown in this section by using ``curl`` or the **Dev Tools** console in the Wazuh dashboard.

CTI content is not updating
---------------------------

If CTI content is not updating, verify the connection to Wazuh CTI, the subscription status, and the synchronization state.

Perform the following checks:

#. Verify network connectivity. Confirm that the Wazuh indexer can reach the Wazuh CTI API over HTTPS on port 443 through any firewall or proxy.

   .. code-block:: console

      $ curl -v https://cti.wazuh.com/api/v1

#. Check the registration status. Verify whether the deployment is registered. If it isn't, the Content Manager synchronizes only the Open Feed content:

   .. code-block:: console

      $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
        -X GET "https://<WAZUH_INDEXER_IP>:9200/_plugins/_content_manager/subscription"

   Replace

   -  ``<WAZUH_INDEXER_USERNAME>`` with the username of a Wazuh indexer user with the ``all_access`` role, such as ``admin``.
   -  ``<WAZUH_INDEXER_PASSWORD>`` with the password of that user.
   -  ``<WAZUH_INDEXER_IP>`` with the IP address or hostname of a Wazuh indexer node

   .. note::

      To retrieve the generated ``admin`` password, run the following command on the Wazuh indexer node: ``$ sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-``

#. Check the content category synchronization state. Run the following command:

   .. code-block:: console

      $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
        "https://<WAZUH_INDEXER_IP>:9200/.wazuh-cti-consumers/_search?pretty"

   Review the ``status``, ``local_offset``, and ``remote_offset`` fields for the affected content category.

   -  If ``local_offset`` equals ``remote_offset``, the content category is synchronized with the currently available content.
   -  If ``local_offset`` is lower than ``remote_offset``, newer content is available but has not yet been synchronized.
   -  If ``local_offset`` is ``0``, the content category has not completed its initial synchronization, or is applying a newly registered plan.

#. Check the Wazuh indexer logs. Review ``/var/log/wazuh-indexer/wazuh-cluster.log`` for the Content Manager or CTI-related errors.

CTI synchronization fails
-------------------------

A CTI content synchronization enters the ``failed`` state when an unexpected error interrupts the synchronization process.

Check the content synchronization state to identify the affected content category:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     "https://<WAZUH_INDEXER_IP>:9200/.wazuh-cti-consumers/_search?pretty"

Replace

-  ``<WAZUH_INDEXER_USERNAME>`` with the username of a Wazuh indexer user with the ``all_access`` role, such as ``admin``.
-  ``<WAZUH_INDEXER_PASSWORD>`` with the password of that user.
-  ``<WAZUH_INDEXER_IP>`` with the IP address or hostname of a Wazuh indexer node

.. note::

   To retrieve the generated ``admin`` password, run the following command on the Wazuh indexer node: ``$ sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-``.

Then review the Wazuh indexer log:

.. code-block:: console

   # grep -E "\[c\.w\.c\." /var/log/wazuh-indexer/wazuh-cluster.log

To search specifically for related errors, run:

.. code-block:: console

   # grep -E "\[ERROR\]\[c\.w\.c\." /var/log/wazuh-indexer/wazuh-cluster.log

Common causes include connectivity problems, an expired or revoked registration, unavailable CTI services, and errors while processing or storing synchronized content.

The Content Manager retries a failed scheduled synchronization during the next synchronization cycle. Resolve the underlying issue and verify that the content synchronization state returns to the ``ready`` state after a subsequent synchronization.

Manual synchronization fails
----------------------------

If an on-demand synchronization request fails, use the returned status code to identify the cause.

+---------+------------------------------------------+------------------------------------------------------+
| Status  | Cause                                    | Action                                               |
+=========+==========================================+======================================================+
| ``409`` | A content synchronization operation is   | Wait for the current synchronization to complete     |
|         | already running.                         | before trying again.                                 |
+---------+------------------------------------------+------------------------------------------------------+
| ``403`` | The user lacks the ``all_access`` role,  | Use a user with the ``all_access`` role, such as     |
|         | or on-demand synchronization is          | ``admin``. If on-demand synchronization is disabled, |
|         | disabled.                                | enable                                               |
|         |                                          | ``plugins.content_manager.catalog.update_on_demand`` |
|         |                                          | if manual synchronization is required.               |
+---------+------------------------------------------+------------------------------------------------------+

On-demand synchronization is enabled by default, and ``/etc/wazuh-indexer/opensearch.yml`` carries no line for it unless you added one. Check that the file does not contain the following line:

.. code-block:: yaml

   plugins.content_manager.catalog.update_on_demand: false

After resolving the issue, trigger synchronization again:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     -X POST "https://<WAZUH_INDEXER_IP>:9200/_plugins/_content_manager/update"

A successful request returns a ``202`` status, indicating that the synchronization request has been accepted for processing.

Synchronized content looks incomplete
-------------------------------------

You can verify that the Content Manager has populated the expected content by checking the document count in the relevant content indices.

For example, check the number of synchronized rules:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     "https://<WAZUH_INDEXER_IP>:9200/wazuh-threatintel-rules/_count?pretty"

The command output looks similar to this:

.. code-block:: json
   :class: output
   :emphasize-lines: 2

   {
     "count" : 268,
     "_shards" : {
       "total" : 1,
       "successful" : 1,
       "skipped" : 0,
       "failed" : 0
     }
   }

You can perform the same check for the applicable CTI content indices:

-  ``wazuh-threatintel-rules``
-  ``wazuh-threatintel-decoders``
-  ``wazuh-threatintel-integrations``
-  ``wazuh-threatintel-kvdbs``
-  ``wazuh-threatintel-policies``
-  ``wazuh-threatintel-filters``
-  ``wazuh-threatintel-enrichments``

A non-zero document count confirms that the index contains content, but it does not by itself confirm that the content is current. On the Open Feed, ``wazuh-threatintel-filters`` can hold zero documents on a deployment that synchronizes correctly.

Content Manager jobs do not start
---------------------------------

The Content Manager uses scheduled jobs to perform periodic CTI synchronization and Wazuh version update checks. These jobs require the ``.wazuh-content-manager-jobs`` index to reach yellow or green status, with at least one active shard, before they can register.

Check the Wazuh indexer cluster health:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     "https://<WAZUH_INDEXER_IP>:9200/_cluster/health?pretty"

Replace

-  ``<WAZUH_INDEXER_USERNAME>`` with the username of a Wazuh indexer user with the ``all_access`` role, such as ``admin``.
-  ``<WAZUH_INDEXER_PASSWORD>`` with the password of that user.
-  ``<WAZUH_INDEXER_IP>`` with the IP address or hostname of a Wazuh indexer node

.. note::

   To retrieve the generated ``admin`` password, run the following command on the Wazuh indexer node: ``$ sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-``.

You can also inspect the Content Manager job metadata:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     "https://<WAZUH_INDEXER_IP>:9200/.wazuh-content-manager-jobs/_search?pretty"

If a job cannot register during startup, the Content Manager retries the registration up to three times. The retries use increasing delays of 15, 30, and 45 seconds. If all attempts fail, the Content Manager records an error in the Wazuh indexer log. It tries to register the job again at the next Wazuh indexer restart.

Search the logs for job scheduling errors:

.. code-block:: console

   # grep -Ei "\[c\.w\.c\..*job" /var/log/wazuh-indexer/wazuh-cluster.log

If the ``.wazuh-content-manager-jobs`` index is unavailable or unhealthy, investigate the Wazuh indexer cluster health and shard allocation before restarting the affected Wazuh indexer node.
