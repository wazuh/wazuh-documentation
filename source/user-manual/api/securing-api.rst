.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Securing the Wazuh API is crucial. In this section we show you how to do it.

.. _securing_api:

Securing the Wazuh API
======================

The communication between the Wazuh UI and the Wazuh API is encrypted with HTTPS by default, which means that if the users do not provide their own private key and certificate then the Wazuh API will generate its own during the first run. Additionally, the Wazuh API users ``wazuh`` and ``wazuh-wui`` are created by default, with ``wazuh`` and ``wazuh-wui`` as their passwords, respectively. Because of that, it is very important to secure the Wazuh API once the Wazuh Manager has been installed.

.. warning::
  It is highly recommended to change the default passwords and to use your own certificate since the one created by the Wazuh API is self-signed.


Recommended changes to secure the Wazuh API
-------------------------------------------

#. Modify HTTPS parameters:

    The Wazuh API has HTTPS enabled by default. In case there is no available certificate in ``WAZUH_PATH/api/configuration/ssl``, the Wazuh API will generate the private key and a self-signed certificate. If that is the case and the API log format is set as ``plain``, the following lines will appear in ``WAZUH_PATH/logs/api.log``:

    .. code-block:: console

      INFO: HTTPS is enabled but cannot find the private key and/or certificate. Attempting to generate them.
      INFO: Generated private key file in WAZUH_PATH/api/configuration/ssl/server.key.
      INFO: Generated certificate file in WAZUH_PATH/api/configuration/ssl/server.crt.

    These HTTPS options can be changed, including its status or the path to the certificate, by editing the Wazuh API configuration file located in ``WAZUH_PATH/api/configuration/api.yaml``:

    .. code-block:: yaml

      https:
        enabled: yes
        key: "server.key"
        cert: "server.crt"
        use_ca: False
        ca: "ca.crt"
        ssl_protocol: "auto"
        ssl_ciphers: ""

    After setting these parameters, it will be necessary to restart the Wazuh API using the ``wazuh-manager`` service:

      .. include:: /_templates/common/restart_manager.rst

#. Change the default password of the admin users (**wazuh** and **wazuh-wui**): 

    The default password can be changed using the following Wazuh API request: :api-ref:`PUT /security/users/{user_id} <operation/api.controllers.security_controller.update_user>`

    .. note::
      The password for users must be between 8 and 64 characters long. It should contain at least one uppercase and one lowercase letter, a number, and a symbol.

    After changing the password, there is no need to restart the Wazuh API but a new :api-ref:`authentication <operation/api.controllers.security_controller.login_user>` will be required for the affected users.

    .. warning::
      Changing the **wazuh-wui** user password will affect the Wazuh UI. You will have to update the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` configuration file accordingly with the new credentials. To learn more, see the :doc:`Wazuh dashboard configuration file </user-manual/wazuh-dashboard/config-file>` document.

#. Change the default host and port:

    The *host* is set to ``0.0.0.0`` by default, which means the Wazuh API will accept any incoming connection. It is possible to restrict it by editing the Wazuh API configuration in ``WAZUH_PATH/api/configuration/api.yaml``:

    .. code-block:: console

      host: 0.0.0.0

    The default port can be changed as well:

    .. code-block:: console

      port: 55000

    After configuring these parameters, it will be necessary to restart the Wazuh API using the ``wazuh-manager`` service.

      .. include:: /_templates/common/restart_manager.rst

#. Set maximum number of requests per minute:

    In order to avoid overloading the Wazuh API, it is possible to use rate limiting to establish the maximum number of requests the Wazuh API can handle per minute. Once exceeded, all other requests (from any user) will be rejected for the remaining period of time.

    The default number of requests per minute is *300*. To change it, modify the ``max_request_per_minute`` setting in ``WAZUH_PATH/api/configuration/api.yaml``.

    .. note:: To disable this feature, set its value to 0.

#. Set maximum number of login attempts:

    To avoid brute force attacks, it is possible to set the number of times that a login attempt can occur from the same IP address during a certain period of time. Once the said number is exceeded, the IP address will be blocked for that period of time.

    The default number of login attempts allowed is *50* for each period of time, which by default is *300* seconds. To change these values, modify the ``max_login_attempts`` and/or the ``block_time`` settings in ``WAZUH_PATH/api/configuration/api.yaml``.

A complete Wazuh API configuration guide can be found :doc:`here <configuration>`.
