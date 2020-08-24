.. Copyright (C) 2020 Wazuh, Inc.

.. _securing_api:

Securing the Wazuh API
======================

By default, the communication between the Wazuh Kibana plugin and the Wazuh API is encrypted with HTTPS. This means that if you do not provide your own private key and certificate, the Wazuh API will generate its own in the first run. In addition, the default users are ``wazuh`` and ``wazuh-wui``, and the default password is ``wazuh`` for both of them. For this reason, it is highly recommended to at least change the default passwords and to use your own certificate since the one created by the Wazuh API is self signed. These are the **recommended changes** to apply:

#. Modify HTTPS parameters:

    The Wazuh API has HTTPS enabled by default. If you do not have any certificate in ``WAZUH_PATH/api/configuration/ssl``, it will generate the private key and the self signed certificate. If that was the case, the following lines will appear in ``WAZUH_PATH/logs/api.log``:

    .. code-block:: console

      INFO: HTTPS is enabled but cannot find the private key and/or certificate. Attempting to generate them.
      INFO: Generated private key file in WAZUH_PATH/api/configuration/ssl/server.key.
      INFO: Generated certificate file in WAZUH_PATH/api/configuration/ssl/server.crt.

    These HTTPS options can be changed, including its status or the path to the certificate, by modifying the API configuration in ``WAZUH_PATH/api/configuration/api.yaml``:

    .. code-block:: yaml

      https:
        enabled: yes
        key: "api/configuration/ssl/server.key"
        cert: "api/configuration/ssl/server.crt"
        use_ca: False
        ca: "api/configuration/ssl/ca.crt"

    After you have configured these parameters, it will be necessary to restart the Wazuh API service:

      * For Systemd:

        .. code-block:: console

          # systemctl restart wazuh-api

      * For SysV Init:

        .. code-block:: console

          # service wazuh-api restart

#. Change the default password of the admin users (**wazuh** and **wazuh-wui**): 

    You can change the default password using the Wazuh API. To do this, you need to do a request to the following Wazuh API endpoint: ``PUT ​/security​/users​/{username}``

    .. note::
      The password for users must have a minimum length of 8 characters and also use at least one uppercase and lowercase letter, a number and a symbol.

    After changing the password, there is no need to restart the Wazuh API service but a new authentication will be required for the affected users.

#. Change the default host and port:

    The default host is ``0.0.0.0``, which means that the Wazuh API will accept any incoming connection. You can restrict this modifying the API configuration in ``WAZUH_PATH/api/configuration/api.yaml``:

    .. code-block:: console

      host: 0.0.0.0

    The default port can be changed as well in the same configuration file:

    .. code-block:: console

      port: 55000

    After configuring these parameters, it will be necessary to restart the Wazuh API service.

      * For Systemd:

        .. code-block:: console

          # systemctl restart wazuh-api

      * For SysV Init:

        .. code-block:: console

          # service wazuh-api restart

You can check a complete API configuration guide :doc:`here <../user-manual/api/configuration>`.
