.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This document provides the information needed to properly secure your Wazuh indexer APIs.

Securing the Wazuh indexer API
==============================

The communication with the Wazuh indexer API is encrypted with HTTPS by default. The installation generates certificates signed by a root certificate authority (CA) that it creates for the deployment, and you can supply your own certificates instead. The installation also creates an ``admin`` user with administrative access to the Wazuh indexer API and stores its password in ``/etc/wazuh-indexer/export/credentials.env``. We recommend that you change the default password and use certificates signed by a trusted CA, especially when the Wazuh indexer is reachable from the internet.

Recommended changes to secure the Wazuh indexer API
---------------------------------------------------

Change the default password for the administrative users
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use the Wazuh passwords tool to change the password of the Wazuh indexer users that the installation creates: ``admin``, ``kibanaserver``, and ``wazuh-manager``. The tool changes the password, saves a generated password in ``/etc/wazuh/credentials.env``. It updates the keystores of the Wazuh components on the same node.

#. Run the following command on any Wazuh indexer node to set a random password for the ``admin`` user:

   .. code-block:: console

      # bash /usr/share/wazuh-indexer/tools/wazuh-passwords-tool.sh -u admin

   To set your own password, add the ``-p`` option. The tool asks for the password and doesn't show it. The password needs 12 to 64 characters from ``A-Z a-z 0-9 . , _ + : @ % ^ = ~ -``, with at least one uppercase letter, one lowercase letter, one digit, and one symbol.

#. Run the following command to show the new password:

   .. code-block:: console

      # grep -m 1 '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh-indexer/export/credentials.env | cut -d= -f2-

A password you set with ``-p`` is saved in this file only if the file already exists. Use the new password in your next requests and in the Wazuh dashboard login. Each run of the tool also saves a backup of ``internal_users.yml`` in ``/etc/wazuh-indexer/internalusers-backup/``.

The ``admin``, ``kibanaserver``, and ``wazuh-manager`` users are reserved. The Wazuh dashboard and the Wazuh indexer API reject password changes for them with ``Resource '<USERNAME>' is reserved.``, so use the Wazuh passwords tool for these users.

For other Wazuh indexer internal users that you create, you can change the password of the user you're logged in as through the Wazuh dashboard or the Wazuh indexer API. On the Wazuh dashboard, click the user avatar, the circle with the first letter of your username in the upper-right corner, and select **Reset password**. Enter the **Current password**, **New password**, and **Re-enter new password** values, then click **Reset**. The Wazuh dashboard logs you out, and you log in again with the new password.

To change the password with the API, use the ``_plugins/_security/api/account`` endpoint. The following example changes the password of the current user:

.. code-block:: none
   :emphasize-lines: 3,4

   PUT _plugins/_security/api/account
   {
       "current_password": "<OLD_PASSWORD>",
       "password": "<NEW_PASSWORD>"
   }

Replace ``<OLD_PASSWORD>`` and ``<NEW_PASSWORD>`` with the corresponding values.

.. note::

   The Wazuh dashboard and the API don't update ``/etc/wazuh-indexer/export/credentials.env``.

Restrict network access
^^^^^^^^^^^^^^^^^^^^^^^

We recommend that you restrict network access to the Wazuh indexer with network controls such as security groups and firewalls. Expose the Wazuh indexer API port, ``9200`` by default, only to trusted networks.

Limit API exposure
^^^^^^^^^^^^^^^^^^

Exposing all endpoints increases the attack surface of the Wazuh indexer API. You can define which Wazuh indexer API endpoints and HTTP methods are accessible in the ``/etc/wazuh-indexer/opensearch-security/allowlist.yml`` configuration file. The syntax is the following:

.. code-block:: yaml
   :emphasize-lines: 4,5,6,8,9,10

   config:
     enabled: true
     requests:
       /<ENDPOINT1>:
         - <HTTP_METHOD1>
         - <HTTP_METHOD2>

       /<ENDPOINT2>:
         - <HTTP_METHOD1>
         - <HTTP_METHOD2>

For example, the following configuration allows the ``GET`` and ``PUT`` methods for the ``/_cluster/settings`` endpoint. It also allows ``GET /_plugins/_security/whoami``, which the ``securityadmin.sh`` script needs to load configuration changes:

.. code-block:: yaml

   config:
     enabled: true
     requests:
       /_cluster/settings:
         - GET
         - PUT

       /_plugins/_security/whoami:
         - GET

Keep the ``_meta`` section at the top of the file. After you make a change, run the ``indexer-security-init.sh`` script to load the ``allowlist.yml`` file:

.. code-block:: console

   # /usr/share/wazuh-indexer/bin/indexer-security-init.sh --options "-f /etc/wazuh-indexer/opensearch-security/allowlist.yml -icl -nhnv"

.. warning::

   The allowlist works with an explicit deny approach. When you enable it, only the endpoints in the allowlist are accessible, for every user. Requests authenticated with the admin certificate, ``/etc/wazuh-indexer/certs/admin.pem``, bypass the allowlist for most endpoints, but not for ``GET /_plugins/_security/whoami``. If the allowlist doesn't include that endpoint, the ``securityadmin.sh`` script, which ``indexer-security-init.sh`` runs, fails with ``403 Forbidden`` and you can't use it to change the allowlist. The Wazuh dashboard and the Wazuh manager connect to the Wazuh indexer with the ``kibanaserver`` and ``wazuh-manager`` users, so they stop working unless the allowlist includes every endpoint they use.

To turn the allowlist off, set ``enabled: false`` in the ``/etc/wazuh-indexer/opensearch-security/allowlist.yml`` file and load it again with the same command.

If the command fails with ``403 Forbidden`` on ``/_plugins/_security/whoami``, turn the allowlist off with the admin certificate and the Wazuh indexer API instead:

.. code-block:: console

   # curl --cacert /etc/wazuh-indexer/certs/root-ca.pem --cert /etc/wazuh-indexer/certs/admin.pem --key /etc/wazuh-indexer/certs/admin-key.pem -X PUT "https://<WAZUH_INDEXER_IP>:9200/_plugins/_security/api/allowlist" -H 'Content-Type: application/json' -d '{"enabled": false, "requests": {"/_cluster/settings": ["GET", "PUT"]}}'

The command output looks similar to this:

.. code-block:: json
   :class: output

   {"status":"OK","message":"'config' updated."}

Then set ``enabled: false`` in the ``allowlist.yml`` file too, so the file matches the active configuration the next time you load it.

Enforce rate limiting
^^^^^^^^^^^^^^^^^^^^^

API rate limiting restricts the number of client requests to a Wazuh indexer node within a time frame. It helps prevent resource exhaustion caused by excessive or malicious traffic and keeps the cluster stable and available for all users. Rate limiting also protects against Denial of Service (DoS) attacks and enforces fair usage. You can set limits based on usernames or IP addresses. Add these settings under ``config.dynamic`` in the ``/etc/wazuh-indexer/opensearch-security/config.yml`` configuration file.

The username rate limit sets the number of failed authentication attempts a user can make before the Wazuh indexer blocks the user. The default ``config.yml`` file includes a commented ``auth_failure_listeners`` example under ``config.dynamic``. It differs from the following example: it also defines an IP address rate limiter and uses ``authentication_backend: intern``. The following configuration is an example of username rate limiting:

.. code-block:: yaml

   config:
     dynamic:
       auth_failure_listeners:
         internal_authentication_backend_limiting:
           type: username
           authentication_backend: internal
           allowed_tries: 3
           time_window_seconds: 60
           block_expiry_seconds: 60
           max_blocked_clients: 100000
           max_tracked_clients: 100000

The following table describes the allowed settings.

**auth_failure_listeners**

+----------------------------+---------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Sub-fields**             | **Allowed values**                          | **Description**                                                                                                                                                                                                                             |
+============================+=============================================+=============================================================================================================================================================================================================================================+
| ``type``                   | ``username``, ``ip``                        | The type of rate limiting. Set to ``username`` in this example.                                                                                                                                                                             |
+----------------------------+---------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``authentication_backend`` | ``internal``, ``ldap``, ``jwt``             | The authentication backend.                                                                                                                                                                                                                 |
+----------------------------+---------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``allowed_tries``          | Any positive integer                        | The maximum number of failed login attempts before the Wazuh indexer blocks the user.                                                                                                                                                       |
+----------------------------+---------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``time_window_seconds``    | Any positive integer                        | The time window that applies to ``allowed_tries``. For example, if ``allowed_tries`` is ``3`` and ``time_window_seconds`` is ``60``, a username has 3 attempts to log in successfully within 60 seconds before the Wazuh indexer blocks it. |
+----------------------------+---------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``block_expiry_seconds``   | Any positive integer                        | The time a username stays blocked.                                                                                                                                                                                                          |
+----------------------------+---------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_blocked_clients``    | Any positive integer                        | The maximum number of blocked usernames. This limits heap usage to avoid a potential DoS attack.                                                                                                                                            |
+----------------------------+---------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_tracked_clients``    | Any positive integer                        | The maximum number of tracked usernames with failed login attempts. This limits heap usage to avoid a potential DoS attack.                                                                                                                 |
+----------------------------+---------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ignore_hosts``           | A list of IP addresses or hostname patterns | IP addresses or hostname patterns that rate limiting ignores. To match hostnames, set ``config.dynamic.hosts_resolver_mode`` to ``ip-hostname``.                                                                                            |
+----------------------------+---------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

After you make a change, run the ``indexer-security-init.sh`` script to load the ``config.yml`` file:

.. code-block:: console

   # /usr/share/wazuh-indexer/bin/indexer-security-init.sh --options "-f /etc/wazuh-indexer/opensearch-security/config.yml -icl -nhnv"
