.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This document provides the information needed to properly secure your Wazuh indexer APIs.
   
Securing the Wazuh indexer API
==============================

The communication to the Wazuh indexer API is encrypted with HTTPS by default. This is facilitated by the self-signed certificates generated during installation. Users can also supply their certificates to encrypt the traffic. A user named ``admin`` is also created during the installation that has administrative access to the Wazuh indexer API. It is recommended that the default password is changed and CA-signed certificates are used rather than self-signed certificates, especially when the Wazuh indexer is accessible over the internet.

Recommended changes to secure the Wazuh indexer API
---------------------------------------------------

Change the default password for the administrative users

The password for the default administrative user ``admin`` can be changed via the Wazuh dashboard or through a Wazuh indexer API. On the dashboard, navigate to **Index management** > **Security** > **Internal users** > **admin** then input and save a new password.

.. note::

   The password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.

To change the user password using the API, we use the ``_plugins/_security/api/account`` endpoint. Below is an example of changing the password for the current user using the API:

.. code-block:: console
   :emphasize-lines: 2,3

   PUT _plugins/_security/api/account
   {
       "current_password": "<OLD_PASSWORD>",
       "password": "<NEW_PASSWORD>"
   }

Change ``<OLD_PASSWORD>`` and ``<NEW_PASSWORD>`` to the corresponding values.

Restrict network access
^^^^^^^^^^^^^^^^^^^^^^^

We advise restricting network access to the Wazuh indexer using network capabilities such as security groups, firewalls, etc., to limit the exposure of the Wazuh indexer API to only trusted networks.

Limit API exposure
^^^^^^^^^^^^^^^^^^

Exposing all endpoints can increase the attack surface of the Wazuh indexer API. We can specify the Wazuh indexer API endpoints we want to be accessible using the ``/etc/wazuh-indexer/opensearch-security/allowlist.yml`` configuration file. This configuration allows us to specify the HTTP methods and endpoints that can be accessed. The below shows the syntax:

.. code-block:: yaml

   config:
     enabled: true
     requests:
       /<ENDPOINT1>:
         - <HTTP_METHOD1>
         - <HTTP_METHOD2>

       /<ENDPOINT2>:
         - <HTTP_METHOD1>
         - <HTTP_METHOD2>

For example, if we want to add ``GET`` and ``PUT`` request methods for ``/_cluster/settings`` endpoint to the allowlist:

.. code-block:: yaml

   config:
     enabled: true
     requests:
       /_cluster/settings:
         - GET
         - PUT

After a change is made, run the ``/usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh`` script to load the configuration changes:

.. code-block:: console

   # export JAVA_HOME=/usr/share/wazuh-indexer/jdk/ && bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -f /etc/wazuh-indexer/opensearch-security/config.yml -icl -key /etc/wazuh-indexer/certs/admin-key.pem -cert /etc/wazuh-indexer/certs/admin.pem -cacert /etc/wazuh-indexer/certs/root-ca.pem -h 127.0.0.1 -nhnv

.. note::

   The ``allowlist.yml`` configuration works with an explicit deny approach. This means when it is enabled, only the endpoints specified in the allowlist are accessible. This does not apply to the ``admin`` user.

Enforce rate limiting
^^^^^^^^^^^^^^^^^^^^^

Configuring API rate limiting is a useful control to limit client requests to the Wazuh indexer node within a specified time frame. It helps prevent resource exhaustion caused by excessive or malicious traffic, ensuring the stability and availability of the cluster for all users. Rate limiting safeguards against potential Denial of Service (DoS) attacks and enforces fair usage policies. We have the option to set limits based on usernames or IP addresses. These settings are specified in the ``/etc/wazuh-indexer/opensearch-security/config.yml`` configuration file.

The rate limit for username limits the number of authentication trials a user can make before being blocked. The following configuration is an example of the username rate limiting:

.. code-block:: yaml

   auth_failure_listeners:
     internal_authentication_backend_limiting:
       type: username
       authentication_backend: internal
       allowed_tries: 3
       time_window_seconds: 60
       block_expiry_seconds: 60
       max_blocked_clients: 100000
       max_tracked_clients: 100000

The allowed settings are highlighted below.

auth_failure_listeners
^^^^^^^^^^^^^^^^^^^^^^

+---------------------------+---------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| **Sub-fields**            | **Allowed values**        | **Description**                                                                                                                       |
+===========================+===========================+=======================================================================================================================================+
| type                      | username, ip              | Specifies the type of rate limiting. Set to ``username``.                                                                             |
+---------------------------+---------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| authentication_backend    | internal, ldap, jwt       | Specifies the authentication backend.                                                                                                 |
+---------------------------+---------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| allowed_tries             | Any positive integer      | Sets the maximum number of allowed login attempts before blocking the user.                                                           |
+---------------------------+---------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| time_window_seconds       | Any positive integer      | Sets the time window to enforce ``allowed_tries``. For example, if ``allowed_tries`` is 3 and                                         |
|                           |                           | ``time_window_seconds`` is 60, a username has 3 attempts to log in successfully within a 60-second period before login attempts are   |
|                           |                           | blocked.                                                                                                                              |
+---------------------------+---------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| block_expiry_seconds      | Any positive integer      | Sets the time window for a username to remain blocked.                                                                                |
+---------------------------+---------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| max_blocked_clients       | Any positive integer      | Sets the maximum number of blocked usernames. This limits heap usage to avoid a potential DoS attack.                                 |
+---------------------------+---------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| max_tracked_clients       | Any positive integer      | Sets the maximum number of tracked usernames with failed login attempts. This limits heap usage to avoid a potential DoS attack.      |
+---------------------------+---------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| ignore_hosts              |                           | Specifies a list of IP addresses or hostname patterns to ignore while evaluating rate-limiting rules.                                 |
|                           |                           | ``config.dynamic.hosts_resolver_mode`` must be set to ``ip-hostname`` to support hostname matching.                                   |
+---------------------------+---------------------------+---------------------------------------------------------------------------------------------------------------------------------------+

After a change is made, run the ``/usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh`` script to load the configuration changes:

.. code-block:: console

   # export JAVA_HOME=/usr/share/wazuh-indexer/jdk/ && bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -f /etc/wazuh-indexer/opensearch-security/config.yml -icl -key /etc/wazuh-indexer/certs/admin-key.pem -cert /etc/wazuh-indexer/certs/admin.pem -cacert /etc/wazuh-indexer/certs/root-ca.pem -h 127.0.0.1 -nhnv
