.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Notifications module enables the Wazuh indexer to send alerts, reports, and messages to external services. Find more information in this section of the documentation.

Notifications module
====================

The Notifications module enables the Wazuh indexer to send alerts, reports, and messages to external services. These external services include: Slack, Microsoft Teams, Amazon Chime, Amazon SNS, email, and custom webhooks.

The module acts as a bridge between internal Wazuh indexer components such as Alerting, Reporting, and Index State Management (ISM) and external destinations. When an alert fires or a report is generated, these components call the Notifications module. The notification module resolves the destination type and sends the message through the appropriate transport.

All channel configurations are managed through a unified REST API at ``/_plugins/_notifications/`` and are accessible from the Wazuh Dashboard under **Explore** > **Notifications** > **Channels**.

Key capabilities
----------------

The Notifications module provides the following capabilities, enabling administrators and security teams to integrate the Wazuh indexer with a wide range of external notification services and platforms.

-  **Multi-channel delivery:** Send notifications to Slack, Microsoft Teams, Amazon Chime, email (SMTP and AWS SES), AWS SNS, and custom HTTP webhooks.
-  **Unified REST API:** Create, update, delete, and query notification channel configurations through a single API surface at ``/_plugins/_notifications/``.
-  **Test notifications:** Validate a channel configuration by sending a test message before relying on it for production alerts.
-  **Feature discovery:** Other modules can dynamically query the supported notification features and allowed channel types.
-  **RBAC integration:** Access to notification configurations is governed by the Wazuh indexer security module, with optional backend-role-based filtering.
-  **Default channels:** Pre-configured channel templates for Slack, Jira, PagerDuty, and Shuffle SOAR are created automatically on first startup.
-  **Extensible architecture:** The module uses a Service Provider Interface (SPI) pattern, making it straightforward to add new destination types.

Supported channel types
-----------------------

The Notifications module delivers messages to external services through the following channel types. Each channel type defines how a notification is delivered and requires its own set of configuration fields.

+---------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Channel Type        | Protocol               | Description                                                                                                                                                                                                           |
+=====================+========================+=======================================================================================================================================================================================================================+
| ``slack``           | HTTPS (Webhook)        | Sends messages to a Slack channel using an incoming webhook URL.                                                                                                                                                      |
+---------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``chime``           | HTTPS (Webhook)        | Sends messages to an Amazon Chime room using a webhook URL.                                                                                                                                                           |
+---------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``microsoft_teams`` | HTTPS (Webhook)        | Sends messages to a Microsoft Teams channel using a connector webhook.                                                                                                                                                |
+---------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``webhook``         | HTTP/HTTPS             | Sends a payload to an arbitrary HTTP endpoint with configurable method, headers, and URL.                                                                                                                             |
+---------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``email``           | SMTP / AWS SES         | Sends email messages. Requires an smtp_account or ses_account configuration.                                                                                                                                          |
+---------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``sns``             | AWS SNS SDK            | Publishes a message to an Amazon SNS topic.                                                                                                                                                                           |
+---------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``smtp_account``    | None                   | Defines SMTP server connection details (host, port, encryption method, and credentials).                                                                                                                              |
+---------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ses_account``     | None                   | Defines AWS SES sending details (region, IAM role ARN, and from address).                                                                                                                                             |
+---------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``email_group``     | None                   | Defines a named group of email recipients for reuse across email-type channels.                                                                                                                                       |
+---------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``active_response`` | Internal (data stream) | Writes active response execution requests to the ``wazuh-active-responses`` data stream. The Wazuh manager retrieves them and runs the active response on the agents. Active Response monitors use this channel type. |
+---------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Default notification channels
-----------------------------

The Notifications module creates a set of predefined notification channels when the Wazuh indexer starts for the first time. These channels are disabled by default and contain placeholder values that must be updated before use.

You can modify the channel configuration and enable it after providing the required credentials and connection details.

The following default channels are created:

+-------------------+-------------+-------------------------+-------------------------------+
| Channel Name      | Type        | Target Service          | Fixed ID                      |
+===================+=============+=========================+===============================+
| Slack Channel     | ``slack``   | Slack                   | ``default_slack_channel``     |
+-------------------+-------------+-------------------------+-------------------------------+
| Jira Channel      | ``webhook`` | Jira Cloud              | ``default_jira_channel``      |
+-------------------+-------------+-------------------------+-------------------------------+
| PagerDuty Channel | ``webhook`` | PagerDuty Events API v2 | ``default_pagerduty_channel`` |
+-------------------+-------------+-------------------------+-------------------------------+
| Shuffle Channel   | ``webhook`` | Shuffle SOAR            | ``default_shuffle_channel``   |
+-------------------+-------------+-------------------------+-------------------------------+

Default channels behaviors
--------------------------

The following rules govern how the module creates and manages default channels.

-  Default channels are created only on the cluster manager node during startup.
-  If a default channel already exists, it is not recreated or overwritten on subsequent startups.
-  All default channels are created with an empty access list, making them visible to all users.
-  Each channel has a fixed, predictable ID (for example, ``default_slack_channel``) so they can be referenced consistently.
-  No alerting monitors are created with these channels. Create monitors under **Explore** > **Alerting** > **Monitors** in the Wazuh dashboard.

Activating a default channel
----------------------------

Default notification channels are created in a disabled state. Before a channel can be used, you must update its configuration with valid connection details and enable it.

For a detailed guide on configuring and activating default notification channels, see the :doc:`Notifications and alerts </user-manual/wazuh-dashboard/wazuh-dashboard-configurations>` section of the Wazuh dashboard documentation.

Configuration
-------------

All Notifications module settings are dynamic. You can set them in ``/etc/wazuh-indexer/opensearch.yml``, where they apply when the Wazuh indexer starts, or change them at runtime with the cluster settings API, without a restart. The exceptions are the HTTP connection settings, which take effect only after a restart, and the Active Response bulk settings, which are static.

The module also loads default values from bundled configuration files during startup. These defaults can be overridden through ``/etc/wazuh-indexer/opensearch.yml`` or by using the cluster settings API.

The following sections describe the configuration files, available settings, and secure credential storage options used by the Notifications module.

Configuration files
^^^^^^^^^^^^^^^^^^^

The Notifications module loads default configuration values from the following files during startup.

+--------------------------------------------------------------------------------+------------------------------------------------------------+
| File                                                                           | Description                                                |
+================================================================================+============================================================+
| ``/etc/wazuh-indexer/wazuh-indexer-notifications-core/notifications-core.yml`` | Defines core settings for the notification delivery engine |
+--------------------------------------------------------------------------------+------------------------------------------------------------+
| ``/etc/wazuh-indexer/wazuh-indexer-notifications/notifications.yml``           | Defines module-specific default settings                   |
+--------------------------------------------------------------------------------+------------------------------------------------------------+

Settings configured in ``/etc/wazuh-indexer/opensearch.yml`` or through the cluster settings API override the values defined in these files.

The following example shows a minimal ``/etc/wazuh-indexer/opensearch.yml`` configuration for the Notifications module. If you set ``opensearch.notifications.core.allowed_config_types``, include ``active_response``. Your list replaces the default list, and Active Response monitors need the ``active_response`` channel type. Setting ``host_deny_list`` replaces the built-in list, so the example list no longer blocks loopback, link-local, or ``192.168.0.0/16`` addresses. Keep every range you still want to block in your list.

.. code-block:: yaml

   # Notification core settings
   opensearch.notifications.core.email.size_limit: 10000000
   opensearch.notifications.core.http.max_connections: 60
   opensearch.notifications.core.http.connection_timeout: 5000
   opensearch.notifications.core.http.socket_timeout: 50000
   opensearch.notifications.core.http.host_deny_list:
     - "10.0.0.0/8"
     - "172.16.0.0/12"
   # Allowed channel types
   opensearch.notifications.core.allowed_config_types:
     - slack
     - chime
     - microsoft_teams
     - webhook
     - email
     - sns
     - ses_account
     - smtp_account
     - email_group
     - active_response
   # Plugin settings
   opensearch.notifications.general.operation_timeout_ms: 60000
   opensearch.notifications.general.default_items_query_count: 100
   opensearch.notifications.general.filter_by_backend_roles: false

Core settings
-------------

Core settings control how the Notifications module delivers messages and manages HTTP and email communications.

Email settings
^^^^^^^^^^^^^^

The following settings control email message size limits and email header validation.

+---------------------------------------------------------------+---------------------------------------------------------------------+---------+------------------+
| Setting                                                       | Description                                                         | Type    | Default          |
+===============================================================+=====================================================================+=========+==================+
| ``opensearch.notifications.core.email.size_limit``            | Maximum allowed size, in bytes, for email messages and attachments. | Integer | 10000000 (10 MB) |
+---------------------------------------------------------------+---------------------------------------------------------------------+---------+------------------+
| ``opensearch.notifications.core.email.minimum_header_length`` | Minimum length allowed for email headers during validation.         | Integer | 160              |
+---------------------------------------------------------------+---------------------------------------------------------------------+---------+------------------+

HTTP connection settings
^^^^^^^^^^^^^^^^^^^^^^^^

The following settings control HTTP communication used by Slack, Microsoft Teams, Chime, and custom webhook destinations.

+-----------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Setting                                                         | Description                                                                                                                                                      | Type    | Default                                                                                                                                                                    |
+=================================================================+==================================================================================================================================================================+=========+============================================================================================================================================================================+
| ``opensearch.notifications.core.http.max_connections``          | Maximum number of concurrent HTTP connections used by the Notifications module.                                                                                  | Integer | 60                                                                                                                                                                         |
+-----------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``opensearch.notifications.core.max_http_response_size``        | Maximum size, in bytes, of an HTTP response that the Notifications module can process when communicating with external services.                                 | Integer | 104857600                                                                                                                                                                  |
+-----------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``opensearch.notifications.core.http.max_connection_per_route`` | Maximum number of concurrent connections allowed for a single destination endpoint.                                                                              | Integer | 20                                                                                                                                                                         |
+-----------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``opensearch.notifications.core.http.connection_timeout``       | Time, in milliseconds, to wait when establishing an HTTP connection.                                                                                             | Integer | 5000                                                                                                                                                                       |
+-----------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``opensearch.notifications.core.http.socket_timeout``           | Time, in milliseconds, to wait for data after a connection is established.                                                                                       | Integer | 50000                                                                                                                                                                      |
+-----------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``opensearch.notifications.core.http.host_deny_list``           | List of hosts or network ranges that notification requests cannot access. Setting it replaces the built-in list, so include every range you still want to block. | List    | Built-in list of loopback, link-local, private (``10.0.0.0/8``, ``172.16.0.0/12``, ``192.168.0.0/16``), CGNAT, documentation, multicast, and reserved IPv4 and IPv6 ranges |
+-----------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

General core settings
^^^^^^^^^^^^^^^^^^^^^

The following settings control supported channel types and general module behavior.

+--------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------+--------------+--------------------------+
| Setting                                                | Description                                                                                                                                | Type         | Default                  |
+========================================================+============================================================================================================================================+==============+==========================+
| ``opensearch.notifications.core.allowed_config_types`` | Defines the notification channel types that users can create and manage. Only the specified channel types are available for configuration. | List<String> | Configured channel types |
+--------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------+--------------+--------------------------+
| ``opensearch.notifications.core.tooltip_support``      | Enables tooltip information in supported user interfaces that interact with the Notifications module.                                      | Boolean      | true                     |
+--------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------+--------------+--------------------------+

Module settings
---------------

Module settings control the general behavior of the Notifications module.

+---------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+---------+
| Setting                                                             | Description                                                                                                                                                          | Type    | Default |
+=====================================================================+======================================================================================================================================================================+=========+=========+
| ``opensearch.notifications.general.operation_timeout_ms``           | Maximum time, in milliseconds, that the module waits for an operation to complete.                                                                                   | Long    | 60000   |
+---------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+---------+
| ``opensearch.notifications.general.default_items_query_count``      | Default number of items returned by list operations when a count is not specified.                                                                                   | Integer | 100     |
+---------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+---------+
| ``opensearch.notifications.general.filter_by_backend_roles``        | Restricts access to notification configurations based on backend role mappings.                                                                                      | Boolean | false   |
+---------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+---------+
| ``plugins.notifications.max_notification_configs``                  | Maximum number of notification configurations of any type, including channels, recipient groups, senders, and active response channels.                              | Integer | 40      |
+---------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+---------+
| ``plugins.notifications.max_notification_groups``                   | Maximum number of ``email_group`` configurations. They also count toward ``max_notification_configs``.                                                               | Integer | 10      |
+---------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+---------+
| ``plugins.notifications.max_notification_senders``                  | Maximum number of ``smtp_account`` and ``ses_account`` configurations combined. They also count toward ``max_notification_configs``.                                 | Integer | 5       |
+---------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+---------+
| ``plugins.notifications.max_active_responses``                      | Maximum number of ``active_response`` channels. They also count toward ``max_notification_configs``.                                                                 | Integer | 10      |
+---------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+---------+
| ``opensearch.notifications.active_response.bulk_flush_interval_ms`` | Maximum time, in milliseconds, that queued active response documents wait before they're written to the ``wazuh-active-responses`` data stream. Static. Minimum 100. | Long    | 500     |
+---------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+---------+
| ``opensearch.notifications.active_response.bulk_max_actions``       | Number of queued active response documents that triggers a bulk write before the flush interval ends. Static. Minimum 1.                                             | Integer | 1000    |
+---------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+---------+

A request that would create more configurations than a ``max_*`` limit is rejected with ``400 Bad Request``. The ``opensearch.notifications.active_response.*`` settings are static: set them in ``/etc/wazuh-indexer/opensearch.yml`` and restart the Wazuh indexer.

Update dynamic settings
-----------------------

The following Notifications module settings support dynamic updates through the OpenSearch Cluster Settings API. Unlike static settings configured in the ``/etc/wazuh-indexer/opensearch.yml`` file, dynamic settings can be modified without restarting the Wazuh indexer.

The following example updates two Notifications module settings as persistent cluster settings:

-  ``opensearch.notifications.core.email.size_limit``: Raises the maximum size of email messages and attachments to 20 MB.
-  ``opensearch.notifications.general.filter_by_backend_roles``: Enables backend role filtering so users can access only the notification resources permitted by their assigned backend roles.

Run the following command from a terminal on a host that can communicate with the Wazuh indexer REST API. Replace ``<WAZUH_INDEXER_IP>`` with the IP address of the Wazuh indexer node.

Replace ``<WAZUH_INDEXER_USERNAME>`` and ``<WAZUH_INDEXER_PASSWORD>`` with the credentials of a Wazuh indexer user allowed to update cluster settings, such as ``admin``. The ``admin`` password is the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value in ``/etc/wazuh-indexer/export/credentials.env`` of a Wazuh indexer node, or in the ``credentials.env`` file of ``wazuh-install-files.tar``.

.. code-block:: console

   curl -sk -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> -X PUT \
   "https://<WAZUH_INDEXER_IP>:9200/_cluster/settings" \
   -H "Content-Type: application/json" \
   -d '{
     "persistent": {
       "opensearch.notifications.core.email.size_limit": 20000000,
       "opensearch.notifications.general.filter_by_backend_roles": true
     }
   }'

**Output**

.. code-block:: json
   :class: output

   {
     "acknowledged": true,
     "persistent": {
       "opensearch": {
         "notifications": {
           "core": {
             "email": {
               "size_limit": "20000000"
             }
           },
           "general": {
             "filter_by_backend_roles": "true"
           }
         }
       }
     },
     "transient": {}
   }

The ``acknowledged`` value confirms that the Wazuh indexer successfully applied the requested settings. The updated values appear under the ``persistent`` section, indicating that they are stored as persistent cluster settings and remain in effect after the Wazuh indexer restarts.

Email destination secure settings
---------------------------------

Email notification channels require an email account configuration to send messages to recipients.

The Notifications module supports the following email delivery methods:

-  **SMTP (Simple Mail Transfer Protocol):** used to send email through a mail server such as Microsoft Exchange, Microsoft 365, Gmail, Postfix, or other SMTP-compatible services.
-  **Amazon Simple Email Service (SES)**: which sends email through Amazon Web Services (AWS).

SMTP accounts that require authentication need credentials. To protect sensitive information, the Notifications module stores SMTP credentials in the OpenSearch Keystore rather than plain-text configuration files. SES and SNS channels don't use the keystore. They authenticate with the AWS default credentials chain, optionally assuming the IAM role set in the channel's ``role_arn``.

.. _wazuh_indexer_notifications_smtp_credentials:

SMTP account credentials
^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh indexer uses these credentials only when the SMTP sender uses SSL/TLS or STARTTLS encryption. Perform the following steps to configure SMTP credentials for an email account named ``my_smtp_account``:

-  Run the command below to add the SMTP username:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/opensearch-keystore add \
      opensearch.notifications.core.email.my_smtp_account.username

-  Enter the SMTP username when prompted
-  Run the command below to add the SMTP password:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/opensearch-keystore add \
      opensearch.notifications.core.email.my_smtp_account.password

-  Enter the SMTP password when prompted.
-  Restore the ownership and permissions of the keystore. When ``opensearch-keystore`` runs as ``root``, it rewrites the keystore as ``root:root``, and the Wazuh indexer can't read it:

   .. code-block:: console

      # chown root:wazuh-indexer /etc/wazuh-indexer/opensearch.keystore
      # chmod 640 /etc/wazuh-indexer/opensearch.keystore

-  Run the keystore commands above on every Wazuh indexer node. Then reload the secure settings to load the credentials:

   .. code-block:: console

      # curl -sk -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> -X POST "https://127.0.0.1:9200/_nodes/reload_secure_settings"

SMTP authentication credentials are stored as secure settings in the Wazuh indexer keystore using the following keys, where ``<account_name>`` is the name of the configured SMTP sender:

.. code-block:: none

   opensearch.notifications.core.email.<account_name>.username
   opensearch.notifications.core.email.<account_name>.password

Set both the username and the password. If neither is set for the account, the Wazuh indexer connects to the SMTP server without authenticating. If only one is set, it authenticates with an empty value for the other, and the SMTP server rejects the login.

Troubleshooting
---------------

Active Response requests are not queued
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An Active Response monitor triggers, but no request reaches the ``wazuh-active-responses`` data stream, and ``/var/log/wazuh-indexer/wazuh-cluster.log`` reports status ``424`` with ``Failed to prepare active response document``. The alert itself stays ``Active`` and shows no error. The module couldn't read the event that triggered the alert, usually because the event or its index no longer exists. Check the ``ERROR`` entry in ``/var/log/wazuh-indexer/wazuh-cluster.log`` for the document ID and index name, and confirm that the document exists.

A message that doesn't resolve to ``<doc_id>|<index>`` is refused with status ``400`` and ``Invalid active response payload. Expected format: docId|indexName``, which is also logged in ``/var/log/wazuh-indexer/wazuh-cluster.log``. In that case, check that the monitor's message template resolves to the document ID and the index name separated by ``|``.

User doesn't have backend roles configured
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

API requests return ``403 Forbidden`` with this message when ``opensearch.notifications.general.filter_by_backend_roles`` is ``true`` and the user has no backend roles. Assign backend roles to the user, or set the setting to ``false``. While the setting is ``true``, users see the configurations created by users who share at least one backend role with them, and configurations with an empty access list, such as the default channels. Users with the ``all_access`` role see all configurations, but they also need at least one backend role. An ``all_access`` user without backend roles gets the same ``403 Forbidden`` response.
