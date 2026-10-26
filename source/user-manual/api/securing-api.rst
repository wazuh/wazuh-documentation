.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The communication between the Wazuh dashboard and the Wazuh manager API is encrypted with HTTPS by default. Learn how to secure the Wazuh manager API further.

Securing the Wazuh manager API
==============================

The communication between the Wazuh dashboard and the Wazuh manager API is encrypted with HTTPS by default. The installation issues the Wazuh manager API private key and certificate from the Wazuh manager CA. Additionally, every installation creates the following Wazuh manager API users, each with its own password set at installation:

-  ``wazuh``
-  ``wazuh-internal-client``

The passwords are stored in ``/etc/wazuh-manager/export/credentials.env`` on the Wazuh manager, as ``WAZUH_MANAGER_API_PASSWORD`` for ``wazuh`` and ``WAZUH_MANAGER_WUI_PASSWORD`` for ``wazuh-internal-client``. Only root can read this file. To print the password of the ``wazuh`` user, run the following command:

.. code-block:: console

   # sed -n 's/^WAZUH_MANAGER_API_PASSWORD=//p' /etc/wazuh-manager/export/credentials.env

Securing the Wazuh manager API is crucial after installing the Wazuh manager.

.. note::

   We recommend changing the generated passwords. Clients trust the Wazuh manager API certificate only if they trust the Wazuh manager CA. Distribute ``/etc/wazuh-manager/export/ca.pem`` to the clients that connect to the Wazuh manager API.

Recommended changes to secure the Wazuh manager API
---------------------------------------------------

Use a trusted certificate
^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh manager API has HTTPS enabled by default and serves ``/etc/wazuh-manager/certs/apid.pem`` and ``apid-key.pem``. The installation issues them from the Wazuh manager CA. If the configured files are missing, unreadable, or do not match, the Wazuh manager does not start. Clients verify the Wazuh manager API with the Wazuh manager CA certificate, ``/etc/wazuh-manager/export/ca.pem``. The certificate covers the names in ``WAZUH_MANAGER_APID_CERT_SANS`` in ``/etc/wazuh-manager/local.env`` or, if that variable is not set, the hostnames and addresses found at installation.

You can change these HTTPS options, including their status or the certificate filenames, by editing the Wazuh manager API configuration file located at ``/var/wazuh-manager/api/configuration/api.yaml``:

.. code-block:: yaml

   https:
     enabled: yes
     key: "apid-key.pem"               # filename in /etc/wazuh-manager/certs/
     cert: "apid.pem"              # filename in /etc/wazuh-manager/certs/
     use_ca: false                   # true requires a client certificate signed by ca
     ca: "root-ca.pem"                    # optional CA file
     ssl_ciphers: ""

Set ``key`` and ``cert`` to filenames in ``/etc/wazuh-manager/certs/``, not to paths. Each file must be owned by ``root:wazuh-manager`` with mode ``0640``. A path, or a wrong owner or mode, stops the Wazuh manager from starting.

With ``use_ca: true``, the Wazuh manager API requires a client certificate signed by the ca file from every client, including the Wazuh dashboard. The Wazuh dashboard doesn't present a client certificate in Wazuh 5.0, so this setting breaks its connection to the Wazuh manager API.

Restart the Wazuh manager API using the Wazuh manager service to apply the changes:

.. include:: /_templates/common/restart_manager.rst

Change the passwords of the administrative users
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can change the passwords of the administrative users ``wazuh`` and ``wazuh-internal-client`` using the following Wazuh manager API request: :api-ref:`PUT /security/users/{user_id} <operation/api.controllers.security_controller.update_user>`. Change the ``wazuh`` password last, because changing a user's password revokes every token that user holds. To find the ID of any other user, send :api-ref:`GET /security/users <operation/api.controllers.security_controller.get_users>`. This request does not update ``/etc/wazuh-manager/export/credentials.env``. Neither does the ``/var/wazuh-manager/bin/rbac_control change-password`` command. To change the ``wazuh`` or ``wazuh-internal-client`` password and keep that file current, use the Wazuh passwords tool instead, as described in :ref:`Change the password for a Wazuh manager API user <change_password_api_user>`. Send these requests from a terminal with a token of the wazuh user. The Wazuh dashboard, including Dev Tools, uses run_as tokens, and the Wazuh manager API rejects a run_as token that changes the wazuh or wazuh-internal-client user with error ``5011``.

Through the Wazuh manager API, a password must be 12 to 64 printable ASCII characters long, without spaces, and include at least one letter and one number. The Wazuh passwords tool and the installation apply a stricter rule. They accept only ``A-Z``, ``a-z``, ``0-9``, and the symbols ``. , _ + : @ % ^ = ~ -``. The password must include at least one uppercase letter, one lowercase letter, one number, and one of those symbols. Use a password that meets the stricter rule so that both accept it.

The following example changes the password using cURL:

#. Obtain a token as the ``wazuh`` user, replacing ``<WAZUH_PASSWORD>`` with its password as described in the :ref:`authentication steps <api_getting_started_authenticate_the_wazuh_manager_api_from_the_command_line>`:

   .. code-block:: console

      # TOKEN=$(curl -s -u wazuh:<WAZUH_PASSWORD> -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/user/authenticate?raw=true")

#. Change the ``wazuh-internal-client`` password (user ID 2) first and the ``wazuh`` password (user ID 1) last, replacing ``<NEW_WAZUH_INTERNAL_CLIENT_PASSWORD>`` and ``<NEW_WAZUH_PASSWORD>`` with the new passwords:

   .. code-block:: console

      # curl -s -k -X PUT "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/users/2" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"password":"<NEW_WAZUH_INTERNAL_CLIENT_PASSWORD>"}'
      # curl -s -k -X PUT "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/users/1" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"password":"<NEW_WAZUH_PASSWORD>"}'

   .. warning::

      Changing the ``wazuh-internal-client`` user password breaks the Wazuh dashboard connection. After changing it, store the new password in the ``wazuh_core.hosts.default.password`` entry of the Wazuh dashboard keystore, ``/etc/wazuh-dashboard/opensearch_dashboards.keystore``. See the :ref:`Update the wazuh-internal-client password <update_wazuh_internal_client_password>` section of the Password management documentation for details.

Change the default host and port
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default, the ``host`` is set to ``['0.0.0.0', '::']``, allowing the Wazuh manager API to accept incoming connections on all available network interfaces.

To restrict access, edit the Wazuh manager API configuration in ``/var/wazuh-manager/api/configuration/api.yaml``. For example, the following setting makes the Wazuh manager API accept connections only on the loopback interface of the Wazuh manager. With this setting, a Wazuh dashboard on another host can no longer reach the Wazuh manager API:

.. code-block:: yaml

   host: ['127.0.0.1']

You can also change the default port. If you do, update the Wazuh manager API port in the Wazuh dashboard configuration too, so the Wazuh dashboard can still connect:

.. code-block:: yaml

   port: 55000

After configuring these parameters, restart the Wazuh manager API using the Wazuh manager service with Systemd or SysV init:

.. include:: /_templates/common/restart_manager.rst

Enable rate limiting
^^^^^^^^^^^^^^^^^^^^

To prevent overloading the Wazuh manager API, you can implement rate limiting to establish the maximum number of requests the API can handle per minute. The limit applies to each client address separately. A client over the limit gets HTTP ``429`` for the rest of the minute, and other clients are not affected.

The default limit is 300 requests per minute for each client address. Adjust it by changing the ``max_request_per_minute`` setting in ``/var/wazuh-manager/api/configuration/api.yaml``. Unauthenticated and failed requests have their own limit, ``max_unauthenticated_request_per_minute``, which is 10 by default. The Wazuh manager API ignores the ``X-Forwarded-For`` header. Behind a reverse proxy, all clients share the address of the proxy, so they share the same rate limits and login block.

.. note::

   To disable rate limiting, set ``max_request_per_minute`` to 0.

Limit login attempts
^^^^^^^^^^^^^^^^^^^^

To protect against brute-force attacks, the Wazuh manager API counts the failed login attempts from each IP address. When an address reaches ``max_login_attempts`` failed attempts (50 by default), the API rejects further login requests from that address with HTTP ``403`` ("Limit of login attempts reached"). The count and the block are cleared ``block_time`` seconds (300 by default) after the first failed attempt from that address. Successful logins do not count toward this limit.

Failed login attempts also count against ``max_unauthenticated_request_per_minute``, so an address that sends more than 10 failed requests in a minute gets HTTP ``429`` before it reaches the login limit.

To adjust these limits, edit the ``max_login_attempts`` and/or ``block_time`` settings in ``/var/wazuh-manager/api/configuration/api.yaml``.

For the complete configuration guide, see :ref:`Wazuh manager API configuration file <api_configuration_wazuh_manager_api_configuration_file>`.
