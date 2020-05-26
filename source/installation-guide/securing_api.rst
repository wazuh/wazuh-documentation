.. Copyright (C) 2019 Wazuh, Inc.

.. _securing_api:

Securing the Wazuh API
======================

By default, the communication between the Wazuh Kibana plugin and the Wazuh API is  encrypted with HTTPS. This means that if you do not provide your own private key and certificate, the Wazuh API will generate its own. In addition to this, both default user and password is ``wazuh``. For this reason, it is highly recommended that you change the default password at least and use your own certificate since the one created by the Wazuh API is self signed. These are the **recommended mininum changes** that you should do:

#. Modify HTTPS parameters:

    The Wazuh API has HTTPS enabled by default. If you do not have any certificate in ``WAZUH_PATH/api/configuration/ssl``, it will generate the private key and the self signed certificate. If that was the case, the following lines will appear in ``WAZUH_PATH/logs/api.log``:

    .. code-block:: console

      INFO: HTTPS is enabled but cannot find the private key and/or certificate. Attempting to generate them.
      INFO: Generated private key file in WAZUH_PATH/api/configuration/ssl/server.key.
      INFO: Generated certificate file in WAZUH_PATH/api/configuration/ssl/server.crt.

    You can modify the HTTPS options, including its status or the path to the certificate, by modifying the API configuration in ``WAZUH_PATH/api/configuration/api.yaml``:

    .. code-block:: yaml

      https:
        enabled: yes
        key: "api/configuration/ssl/server.key"
        cert: "api/configuration/ssl/server.crt"
        use_ca: False
        ca: "api/configuration/ssl/ca.crt"

    After you have configured these, you will need to restart the Wazuh API service:

      * For Systemd:

        .. code-block:: console

          # systemctl restart wazuh-api

      * For SysV Init:

        .. code-block:: console

          # service wazuh-api restart

#. Change the default password: 

    You can change the default password using the Wazuh API. To do this, you need to do a request to the following endpoint: ``PUT ​/security​/users​/{username}``

    .. note::
      The password for users must have a minimum length of 8 characters and must have at least one uppercase and lowercase letter, a number and a symbol.

    After configuring this, you will need to restart the Wazuh API service.

      * For Systemd:

        .. code-block:: console

          # systemctl restart wazuh-api

      * For SysV Init:

        .. code-block:: console

          # service wazuh-api restart

#. Change the default port:

    You can change the default port modifying the API configuration in ``WAZUH_PATH/api/configuration/api.yaml``:

    .. code-block:: console

      port: 55000

    After configuring this, you will need to restart the Wazuh API service.

      * For Systemd:

        .. code-block:: console

          # systemctl restart wazuh-api

      * For SysV Init:

        .. code-block:: console

          # service wazuh-api restart
