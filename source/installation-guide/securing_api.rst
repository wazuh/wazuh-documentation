.. Copyright (C) 2020 Wazuh, Inc.

.. _securing_api:

Securing the Wazuh API
======================

The communication between the Wazuh UI and the Wazuh API is encrypted with HTTPS, which means that if the users do not provide their own private key and certificate then Wazuh API will generate its own during the first run. Additionally, ``wazuh`` and ``wazuh-wui`` users are created by default having ``wazuh`` as their password. Because of that, it is very important to secure Wazuh API once it has been installed.

.. warning::
  It is highly recommended to change the default passwords and to use your own certificate since the one created by the Wazuh API is self-signed.


Recommended changes to securize Wazuh API
-----------------------------------------

#. Modify HTTPS parameters:

    The Wazuh API has HTTPS enabled by default. In case there is no available certificate in ``WAZUH_PATH/api/configuration/ssl``, the Wazuh API will generate the private key and a self-signed certificate. If that is the case, the following lines will appear in ``WAZUH_PATH/logs/api.log``:

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

    After setting these parameters, it will be necessary to restart the Wazuh API using the ``wazuh-manager`` service:

      * For Systemd:

        .. code-block:: console

          # systemctl restart wazuh-manager

      * For SysV Init:

        .. code-block:: console

          # service wazuh-manager restart

#. Change the default password of the admin users (**wazuh** and **wazuh-wui**): 

    The default password can be changed using the following Wazuh API request: :ref:`Wazuh API endpoint <api_reference>`: ``PUT ​/security​/users​/{username}``

    .. note::
      The password for users must have a minimum length of 8 characters and also use at least one uppercase and lowercase letter, a number and a symbol.

    After changing the password, there is no need to restart the Wazuh API service but a new authentication will be required for the affected users.

#. Change the default host and port:

    The *host* is set to ``0.0.0.0`` by default, which means Wazuh API will accept any incoming connection. It is possible to restrict it editting the API configuration in ``WAZUH_PATH/api/configuration/api.yaml``:

    .. code-block:: console

      host: 0.0.0.0

    The default port can be changed as well in the same configuration file:

    .. code-block:: console

      port: 55000

    After configuring these parameters, it will be necessary to restart the Wazuh API using the ``wazuh-manager`` service.

      * For Systemd:

        .. code-block:: console

          # systemctl restart wazuh-manager

      * For SysV Init:

        .. code-block:: console

          # service wazuh-manager restart

#. Set maximum number of requests per minute:

    In order to avoid overloading the API, it is possible to use rate limiting and to establish a maximum number of requests that the API can handle per minute. Once exceeded, all other requests (from any user) will be rejected.

    The default number of requests per minute is *300*. To change it, modify the ``max_request_per_minute`` setting by doing a request to the following Wazuh API endpoint: ``PUT ​/cluster/{node_id}/api`` or change it in ``WAZUH_PATH/api/configuration/api.yaml``. There is no need to restart the Wazuh API service for these changes to take effect.

#. Set maximum number of login attempts:

    To avoid brute force attacks, it is possible to set the number of times that a login attempt can occur from the same IP during a certain period of time. Once said number is exceeded, the IP is blocked for that period of time.

    The default number of login attempts allowed is *5* for each period of time, which by default is *300* seconds. To change those values, modify the ``max_login_attempts`` and/or the ``block_time`` settings using the following Wazuh API endpoint: ``PUT ​/cluster/{node_id}/api`` or change it in ``WAZUH_PATH/api/configuration/api.yaml``. There is no need to restart the Wazuh API service for these changes to take effect.

A complete API configuration guide can be found here: :ref:`here <api_configuration>`.
