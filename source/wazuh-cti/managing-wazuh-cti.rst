.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure Wazuh CTI synchronization, manage it through the Wazuh indexer API, and administer your Wazuh CTI subscription.

Managing the Wazuh CTI
======================

You can configure and manage Wazuh CTI to control how CTI content is synchronized and accessed in your Wazuh environment. This section describes how to configure CTI synchronization, perform administrative operations using the Wazuh Content Manager API, and manage your Wazuh CTI subscription.

.. _configuring_wazuh_cti:

Configuring Wazuh CTI
---------------------

You can configure how the Content Manager connects to Wazuh CTI and synchronizes content with the Wazuh environment. The Content Manager configuration uses settings with the ``plugins.content_manager`` prefix.

These settings are optional and are not included in the ``/etc/wazuh-indexer/opensearch.yml`` file by default. Add only the settings that you want to configure. Unless otherwise specified, restart the Wazuh indexer after modifying the configuration for the changes to take effect.

The following table shows the Content Manager settings related to Wazuh CTI synchronization:

+--------------------------------------------------------+---------+----------+------------------------------------------+
| Setting                                                | Type    | Default  | Description                              |
+========================================================+=========+==========+==========================================+
| ``plugins.content_manager.catalog.sync_interval``      | Integer | ``60``   | Defines the interval, in minutes,        |
|                                                        |         |          | between scheduled synchronization        |
|                                                        |         |          | cycles. The allowed range is ``10`` to   |
|                                                        |         |          | ``1440``.                                |
+--------------------------------------------------------+---------+----------+------------------------------------------+
| ``plugins.content_manager.catalog.update_on_start``    | Boolean | ``true`` | Specifies whether the Content Manager    |
|                                                        |         |          | checks for content updates when it       |
|                                                        |         |          | starts. The allowed value is ``true`` or |
|                                                        |         |          | ``false``.                               |
+--------------------------------------------------------+---------+----------+------------------------------------------+
| ``plugins.content_manager.catalog.update_on_schedule`` | Boolean | ``true`` | Enables or disables scheduled content    |
|                                                        |         |          | synchronization. The allowed value is    |
|                                                        |         |          | ``true`` or ``false``.                   |
+--------------------------------------------------------+---------+----------+------------------------------------------+
| ``plugins.content_manager.catalog.update_on_demand``   | Boolean | ``true`` | Enables or disables manual               |
|                                                        |         |          | synchronization through the Content      |
|                                                        |         |          | Manager API. The allowed value is        |
|                                                        |         |          | ``true`` or ``false``.                   |
+--------------------------------------------------------+---------+----------+------------------------------------------+
| ``plugins.content_manager.client.timeout``             | Long    | ``10``   | Defines the timeout, in seconds, for     |
|                                                        |         |          | requests to the Wazuh CTI service. The   |
|                                                        |         |          | allowed range is ``10`` to ``50``.       |
+--------------------------------------------------------+---------+----------+------------------------------------------+
| ``plugins.content_manager.max_items_per_bulk``         | Integer | ``1000`` | Defines the maximum number of documents  |
|                                                        |         |          | included in each bulk indexing operation |
|                                                        |         |          | during synchronization. The allowed      |
|                                                        |         |          | range is ``10`` to ``1000``.             |
+--------------------------------------------------------+---------+----------+------------------------------------------+
| ``plugins.content_manager.max_concurrent_bulks``       | Integer | ``5``    | Defines the maximum number of bulk       |
|                                                        |         |          | indexing operations that Content Manager |
|                                                        |         |          | can run concurrently. The allowed range  |
|                                                        |         |          | is ``1`` to ``5``.                       |
+--------------------------------------------------------+---------+----------+------------------------------------------+

Configuring synchronization interval
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default, the Content Manager checks for CTI content updates every 60 minutes. You can modify the synchronization interval using the ``plugins.content_manager.catalog.sync_interval`` setting.

For example, the following configuration changes the synchronization interval to 1440 minutes, or 24 hours:

.. code-block:: yaml

   plugins.content_manager.catalog.sync_interval: 1440

Set the value according to how frequently you want the Content Manager to check for available CTI content updates. The allowed range is ``10`` to ``1440`` minutes.

Restart the Wazuh indexer after modifying this setting.

.. code-block:: console

   # systemctl restart wazuh-indexer

Configuring synchronization performance
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Content Manager uses bulk indexing operations to store synchronized CTI content in the Wazuh indexer. You can adjust the number of documents processed in each bulk operation and the number of bulk operations that run concurrently.

The ``plugins.content_manager.max_items_per_bulk`` setting controls the maximum number of documents included in each bulk indexing request:

.. code-block:: yaml

   plugins.content_manager.max_items_per_bulk: 1000

The allowed range is ``10`` to ``1000``.

The ``plugins.content_manager.max_concurrent_bulks`` setting controls the maximum number of bulk operations that can run concurrently:

.. code-block:: yaml

   plugins.content_manager.max_concurrent_bulks: 5

The allowed range is ``1`` to ``5``.

In environments with limited resources, you can reduce these values to limit resource usage during content synchronization. For example:

.. code-block:: yaml

   plugins.content_manager.max_items_per_bulk: 100
   plugins.content_manager.max_concurrent_bulks: 2

Reducing these values can decrease the resource usage associated with synchronization but can increase the time required to process large content updates.

Restart the Wazuh indexer after modifying this setting.

.. code-block:: console

   # systemctl restart wazuh-indexer

Configuring an offline deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In a Wazuh environment without internet connectivity, the Wazuh Content Manager initializes CTI content from the snapshot packaged with the installed Wazuh indexer, and Wazuh uses that content while disconnected. Content updates resume once the Wazuh indexer can reach the Wazuh CTI service again.

To prevent the Content Manager from repeatedly attempting operations that require connectivity to Wazuh CTI, disable synchronization on startup, scheduled synchronization, and the Wazuh version update check, which is enabled by default:

.. code-block:: yaml

   plugins.content_manager.catalog.update_on_start: false
   plugins.content_manager.catalog.update_on_schedule: false
   plugins.content_manager.telemetry.enabled: false

Restart the Wazuh indexer after modifying this setting.

.. code-block:: console

   # systemctl restart wazuh-indexer

.. warning::

   The packaged snapshot reflects the CTI content included with the installed Wazuh version. To receive updated content, restore connectivity to the Wazuh CTI service and re-enable the applicable synchronization options.

.. _wazuh_indexer_api:

Wazuh indexer API
-----------------

You can access Content Manager endpoints through the Wazuh indexer API to perform administrative operations related to Wazuh CTI. These operations include triggering an immediate content synchronization, checking the synchronization state, and managing the deployment's registration.

The following examples use the Wazuh indexer API. Replace ``<WAZUH_INDEXER_IP>``, ``<WAZUH_INDEXER_USERNAME>``, and ``<WAZUH_INDEXER_PASSWORD>`` with your Wazuh indexer credentials. On an all-in-one deployment, the Wazuh indexer listens on ``127.0.0.1`` by default. These requests require a Wazuh indexer user with the ``all_access`` role, such as ``admin``. To let another user trigger a synchronization, create a role that holds the ``cluster:admin/content_manager/update/trigger`` permission and map the user to it.

Triggering a content synchronization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Content Manager synchronizes CTI content automatically according to the configured synchronization schedule. You can also trigger an immediate synchronization without waiting for the next scheduled cycle. You can do this from a terminal by sending a request to the Wazuh indexer API or from the Wazuh dashboard by running the same request in **Indexer management** > **Dev Tools**.

Terminal
~~~~~~~~

Run the following request:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     -X POST "https://<WAZUH_INDEXER_IP>:9200/_plugins/_content_manager/update"

Replace

-  ``<WAZUH_INDEXER_USERNAME>`` with the username of a Wazuh indexer user with the ``all_access`` role, such as ``admin``.
-  ``<WAZUH_INDEXER_PASSWORD>`` with the password of that user.
-  ``<WAZUH_INDEXER_IP>`` with the IP address or hostname of a Wazuh indexer node

.. note::

   To retrieve the generated ``admin`` password, run the following command on the Wazuh indexer node: ``$ sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-``.

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
     "message": "The update request has been accepted for processing.",
     "status": 202
   }

The ``202`` status indicates that the Content Manager accepted the synchronization request for processing. The operation runs asynchronously, so the response does not indicate that synchronization has completed.

The following table shows other responses that the request can return:

+---------+---------------------------------------------------------+
| Status  | Description                                             |
+=========+=========================================================+
| ``202`` | Content Manager accepted the synchronization request    |
|         | for processing.                                         |
+---------+---------------------------------------------------------+
| ``409`` | A content synchronization is already in progress.       |
+---------+---------------------------------------------------------+
| ``403`` | The user lacks the ``all_access`` role, or on-demand    |
|         | synchronization is disabled.                            |
+---------+---------------------------------------------------------+

On-demand synchronization must also be enabled through the ``plugins.content_manager.catalog.update_on_demand`` setting. If this option is disabled, the Content Manager rejects manual synchronization requests.

.. _wazuh_cti_trigger_sync_dashboard:

Wazuh dashboard
~~~~~~~~~~~~~~~

You can also perform this action using the **Update CTI content** feature or the **Dev Tools** console on the Wazuh dashboard.

To use the **Update CTI content** feature, navigate to **Indexer management** > **Settings**, then click **Update CTI content**.

.. thumbnail:: /images/wazuh-cti/update-cti-content.png
   :title: Update CTI content
   :alt: Update CTI content
   :align: center
   :width: 80%

To request a content synchronization from the **Dev Tools** console, navigate to **Indexer management** > **Dev Tools** and send the following request.

.. code-block:: none

   POST _plugins/_content_manager/update

.. thumbnail:: /images/wazuh-cti/content-synchronization-dev-tools.png
   :title: Content synchronization via Wazuh Dev Tools
   :alt: Content synchronization via Wazuh Dev tools
   :align: center
   :width: 80%

Checking synchronization status
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh Content Manager maintains synchronization information independently for each CTI content category. You can inspect this information to determine the current synchronization status and compare the locally synchronized content with the content available from Wazuh CTI. You can do this from a terminal by sending requests to the Wazuh indexer API or from the Wazuh dashboard by running the same requests in **Indexer management** > **Dev Tools**.

Terminal
~~~~~~~~

Run the following request:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     "https://<WAZUH_INDEXER_IP>:9200/.wazuh-cti-consumers/_search?pretty"

Replace

-  ``<WAZUH_INDEXER_USERNAME>`` with the username of a Wazuh indexer user with the ``all_access`` role, such as ``admin``.
-  ``<WAZUH_INDEXER_PASSWORD>`` with the password of that user.
-  ``<WAZUH_INDEXER_IP>`` with the IP address or hostname of a Wazuh indexer node

.. note::

   To retrieve the generated ``admin`` password, run the following command on the Wazuh indexer node: ``$ sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-``.

The command output looks similar to this:

.. code-block:: json
   :class: output
   :emphasize-lines: 27,42,57

   {
     "took" : 1,
     "timed_out" : false,
     "_shards" : {
       "total" : 1,
       "successful" : 1,
       "skipped" : 0,
       "failed" : 0
     },
     "hits" : {
       "total" : {
         "value" : 3,
         "relation" : "eq"
       },
       "max_score" : 1.0,
       "hits" : [
         {
           "_index" : ".wazuh-cti-consumers",
           "_id" : "cti:catalog:consumer:ruleset",
           "_score" : 1.0,
           "_source" : {
             "name" : "public-ruleset-5",
             "context" : "rc1-t1-ruleset-5",
             "type" : "cti:catalog:consumer:ruleset",
             "resource" : "https://api.pre.cloud.wazuh.com/api/v1/catalog/contexts/rc1-t1-ruleset-5/consumers/public-ruleset-5",
             "is_public" : true,
             "status" : "ready",
             "local_offset" : 1230,
             "remote_offset" : 1230
           }
         },
         {
           "_index" : ".wazuh-cti-consumers",
           "_id" : "cti:catalog:consumer:iocs",
           "_score" : 1.0,
           "_source" : {
             "name" : "public-iocs-5",
             "context" : "t1-iocs-5",
             "type" : "cti:catalog:consumer:iocs",
             "resource" : "https://api.pre.cloud.wazuh.com/api/v1/catalog/contexts/t1-iocs-5/consumers/public-iocs-5",
             "is_public" : true,
             "status" : "ready",
             "local_offset" : 255096,
             "remote_offset" : 255096
           }
         },
         {
           "_index" : ".wazuh-cti-consumers",
           "_id" : "cti:catalog:consumer:vulnerabilities",
           "_score" : 1.0,
           "_source" : {
             "name" : "public-vulnerabilities-5",
             "context" : "t1-vulnerabilities-5",
             "type" : "cti:catalog:consumer:vulnerabilities",
             "resource" : "https://api.pre.cloud.wazuh.com/api/v1/catalog/contexts/t1-vulnerabilities-5/consumers/public-vulnerabilities-5",
             "is_public" : true,
             "status" : "ready",
             "local_offset" : 595699,
             "remote_offset" : 595699
           }
         }
       ]
     }
   }

The ``name``, ``context``, ``resource``, and offset values differ on your deployment. Check ``status``, and compare ``local_offset`` with ``remote_offset``. The ``ruleset`` consumer holds detection content, ``iocs`` holds indicators of compromise, and ``vulnerabilities`` holds vulnerability intelligence.

Wazuh dashboard
~~~~~~~~~~~~~~~

You can also perform this action using the **Dev Tools** console on the Wazuh dashboard. Navigate to **Indexer management** > **Dev Tools** and send the following request.

.. code-block:: none

   GET .wazuh-cti-consumers/_search?pretty

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
-  ``local_offset`` is ``0``: The content category has not completed its initial synchronization, or it is applying a newly registered plan.

If a content category remains in the ``running`` state for an extended period or reports a ``failed`` status, check the Wazuh indexer logs ``/var/log/wazuh-indexer/wazuh-cluster.log`` for Content Manager synchronization errors.

.. note::

   The ``.wazuh-cti-consumers`` index is an internal system index. Use it to inspect synchronization state for administrative and troubleshooting purposes.

Wazuh CTI subscription
----------------------

Wazuh CTI provides a free Open Feed and a Professional Feed. The Open Feed is available to every Wazuh deployment without registration or subscription, while the Professional Feed provides the same threat intelligence content without the delay applied to the Open Feed.

The following table compares the two plans.

+--------------------------+------------------+-------------------+
| Content                  | Open Feed (free) | Professional Feed |
+==========================+==================+===================+
| Vulnerability CVE stream | 7-day delay      | Instant access    |
+--------------------------+------------------+-------------------+
| IoC intelligence stream  | 14-day delay     | Instant access    |
+--------------------------+------------------+-------------------+
| Ruleset service          | 30-day delay     | Instant access    |
+--------------------------+------------------+-------------------+
| Critical CVEs            | Instant access   | Instant access    |
+--------------------------+------------------+-------------------+
| Released content updates | Instant access   | Instant access    |
+--------------------------+------------------+-------------------+

You can purchase and manage subscriptions in the `Wazuh Cloud Console <http://console.cloud.wazuh.com>`__. The Content Manager API identifies the Open Feed as the Open plan.

The Wazuh Content Manager uses a deployment's registration to authenticate requests to Wazuh CTI and retrieve the content available under its assigned plan. When you register a deployment, the Content Manager securely stores the registration in the Wazuh indexer for subsequent requests.

To register a deployment, generate a one-time code in the Wazuh dashboard and enter it in the Wazuh Cloud Console. The dashboard then completes the registration with the Content Manager. For more information, see the :ref:`Registering a deployment <wazuh_cti_registering_deployment>` section.

You can check or remove a registration through the Content Manager API. Until a deployment is registered and assigned a Professional Feed subscription, the Content Manager synchronizes Open Feed content on schedule or on demand.

Buying a Professional Feed subscription
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You buy Professional Feed subscriptions in the Wazuh Cloud Console. Each subscription covers one deployment, and you can buy several at once and assign them later. You need the **Editor** role in your console organization to buy and assign subscriptions. On the Wazuh Cloud Console, click on **Organization** > **Members** to view user roles.

#. In the `Wazuh Cloud Console <http://console.cloud.wazuh.com>`__, select **CTI** > **Feeds** and click **Buy Subscription** on the Professional Feed.

   .. thumbnail:: /images/wazuh-cti/buying-professional-feed-subscription.png
      :title: Buy Subscription on the Professional Feed
      :alt: Buy Subscription on the Professional Feed
      :align: center
      :width: 80%

#. Set **Deployments covered** to the number of deployments to upgrade, and select the **Billing period**. Optional: click **Apply discount code**, enter your code, and click **Validate**.

   .. thumbnail:: /images/wazuh-cti/buy-feed-subscription-dialog.png
      :title: Buy a feed subscription dialog
      :alt: Buy a feed subscription dialog
      :align: center
      :width: 80%

#. Accept the terms and conditions, and click **Continue to payment**.

#. Select a card under **Saved methods**, or add one under **New card**, and click **Confirm purchase**.

#. Select the deployments to upgrade and click **Assign**. Alternatively, click **Do this later**, then click **Assign subscription** on a deployment in **CTI** > **Deployments**.

If your organization has paid subscriptions that no deployment uses, the **Deployments** page shows how many are unassigned. It also lists the deployments without a subscription.

Subscriptions renew automatically. To cancel one, select **Billing** > **Subscriptions** in the Wazuh Cloud Console and open the options menu of the subscription. Click **Unsubscribe**, then click **Unsubscribe** again to confirm. The subscription stays active until the end of the current billing period. To call off the cancellation while the subscription is Canceling, open its options menu, click **Resume subscription**, and **confirm**.

.. note::

   You need the **Editor** role to cancel or resume a subscription.

.. _wazuh_cti_registering_deployment:

Registering a deployment
^^^^^^^^^^^^^^^^^^^^^^^^

Registration connects your Wazuh deployment to your Wazuh Cloud Console organization. The Wazuh dashboard requests a one-time code from the console, and you confirm the code in the console.

Follow the steps below to register a deployment from the Wazuh dashboard.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Add the following setting in ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to enable the Wazuh dashboard registration interface.

   .. code-block:: yaml

      wazuh_check_updates.ctiRegistrationUiEnabled: true

#. Restart the Wazuh dashboard to apply the change.

   .. code-block:: console

      $ sudo systemctl restart wazuh-dashboard

#. On the Wazuh dashboard, click **CTI** in the top bar. Alternatively, click **Register now** in the banner at the bottom of the overview page.

   .. note::

      For a deployment that has been registered, the **CTI** icon is replaced with a **Wazuh Cloud** icon that shows the subscription plan your deployment is registered to.

   .. thumbnail:: /images/wazuh-cti/wazuh-dashboard-cti-button.png
      :title: CTI button in the Wazuh dashboard top bar
      :alt: CTI button in the Wazuh dashboard top bar
      :align: center
      :width: 80%

#. Click **Register** in the dialog. The Wazuh Cloud Console opens on the **Register Deployment** dialog with the code already filled in.

#. Check that **the One time use code** matches the code shown on your Wazuh dashboard.

#. Enter a name for the deployment in **Environment name** (you can change it later) and click **Register Deployment**.

   .. thumbnail:: /images/wazuh-cti/registering-deployment-wazuh-dashboard.gif
      :title: Registering a deployment from the Wazuh dashboard
      :alt: Registering a deployment from the Wazuh dashboard
      :align: center
      :width: 80%

Wazuh Cloud Console
~~~~~~~~~~~~~~~~~~~

In the Wazuh Cloud Console, select **CTI** > **Deployments** > **Register deployment**. Enter the name and the code that was shown in the previous step.

.. thumbnail:: /images/wazuh-cti/register-deployment-wazuh-cloud-console.png
   :title: Register Deployment dialog in the Wazuh Cloud Console
   :alt: Register Deployment dialog in the Wazuh Cloud Console
   :align: center
   :width: 80%

.. warning::

   Only confirm a code that you started from your own Wazuh dashboard. Confirming a code that someone else sent you connects their deployment to your organization.

.. note::

   Registering a deployment requires the **Editor** role in your Wazuh Cloud Console organization.

To check that the deployment is connected, find it in **CTI** > **Deployments** in the Wazuh Cloud Console. **Last seen at** shows the last time the deployment reported in, or **Not seen** if it has not reported yet.

.. thumbnail:: /images/wazuh-cti/deployment-connected-wazuh-cloud-console.png
   :title: Registered deployment in the Wazuh Cloud Console
   :alt: Registered deployment in the Wazuh Cloud Console
   :align: center
   :width: 80%

If the registration fails, the **One time use code** field in the Wazuh Cloud Console shows one of the following messages:

-  **not found**: the code is wrong. Start the registration again from the Wazuh dashboard to get a new code.
-  **already granted** or **already denied**: the code was already used or rejected. Start the registration again from the Wazuh dashboard to get a new code.
-  **Environment already exists**: the deployment is already registered.

Assigning a subscription plan
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh Cloud Console
~~~~~~~~~~~~~~~~~~~

Follow the steps below to assign a subscription plan or change the subscription of a deployment.

#. In the Wazuh Cloud Console, select **CTI** > **Deployments**.

#. On the deployment, click **Assign subscription**, or **Change subscription** if it already has one.

#. Select the subscription to use. The free subscription keeps the deployment on the Open Feed.

#. Click **Confirm**.

After registration, the Content Manager also starts a content update that applies your plan. For several minutes, every content category whose content changes shows the ``running`` status, with ``local_offset`` at ``0``. The new content downloads alongside the current content, which stays in use, so the update needs free disk space for a second copy. If scheduled synchronization is disabled, trigger a content synchronization to apply the plan.

Checking registration status
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can verify a deployment registration status and identify its associated plan through the Wazuh dashboard or the Wazuh indexer API.

Wazuh Dashboard
~~~~~~~~~~~~~~~

On the Wazuh dashboard, click **Wazuh Cloud** in the top bar to confirm the registration and the subscription plan.

.. thumbnail:: /images/wazuh-cti/checking-registration-status-wazuh-dashboard.png
   :title: Registration status in the Wazuh dashboard
   :alt: Registration status in the Wazuh dashboard
   :align: center
   :width: 80%

You can also check the deployment registration status using the Wazuh indexer API.

Terminal
~~~~~~~~

Run the following command from an authorized endpoint:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     -X GET "https://<WAZUH_INDEXER_IP>:9200/_plugins/_content_manager/subscription"

Replace

-  ``<WAZUH_INDEXER_USERNAME>`` with the username of a Wazuh indexer user with the ``all_access`` role, such as ``admin``.
-  ``<WAZUH_INDEXER_PASSWORD>`` with the password of that user.
-  ``<WAZUH_INDEXER_IP>`` with the IP address or hostname of a Wazuh indexer node

.. note::

   To retrieve the generated ``admin`` password, run the following command on the Wazuh indexer node: ``$ sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-``.

For a registered deployment, the response identifies the active plan and confirms the registration status. The command output looks similar to this:

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

If the deployment isn't registered, the Content Manager reports the Open plan. The command output looks similar to this:

.. code-block:: json
   :class: output

   {
     "message": {
       "plan": {
         "name": "Open",
         "is_public": true
       },
       "is_registered": false
     },
     "status": 200
   }

The Content Manager validates the deployment's registration when you check its status. If the Wazuh CTI service rejects the registration, for example because it expired or was revoked, the Content Manager removes it. The deployment then reverts to the unregistered state.

Unregistering a deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^

When you unregister a deployment, the Content Manager removes its registration. The Content Manager then synchronizes only the Open Feed content.

The Wazuh Cloud Console keeps its records unchanged:

-  The deployment stays listed in **CTI** > **Deployments**. To remove it from your organization, click **Delete** on the deployment and **Confirm**.
-  If the deployment has a Professional Feed subscription, the subscription stays active, and you're still billed for it. To stop billing, cancel the subscription as described in Buying a Professional Feed subscription.

To connect the deployment again later, register it again from the Wazuh dashboard.

Terminal
~~~~~~~~

Run the following request on the Wazuh indexer to unregister the deployment:

.. code-block:: console

   $ curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
     -X DELETE "https://<WAZUH_INDEXER_IP>:9200/_plugins/_content_manager/subscription"

Replace

-  ``<WAZUH_INDEXER_USERNAME>`` with the username of a Wazuh indexer user with the ``all_access`` role, such as ``admin``.
-  ``<WAZUH_INDEXER_PASSWORD>`` with the password of that user.
-  ``<WAZUH_INDEXER_IP>`` with the IP address or hostname of a Wazuh indexer node

.. note::

   To retrieve the generated ``admin`` password, run the following command on the Wazuh indexer node: ``$ sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-``.

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
     "message": "Credentials removed",
     "status": 200
   }
