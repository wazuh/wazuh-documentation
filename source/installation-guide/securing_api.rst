.. Copyright (C) 2020 Wazuh, Inc.

.. _securing_api:

Securing the Wazuh API
======================

By default, the communication between the Wazuh Kibana plugin and the Wazuh API is not encrypted. In addition to this, the default user is "foo" and the password is  "bar". For this reason, it is highly recommended that you secure the Wazuh API and change the default user and password. The following steps will help you to achieve it:

#. Enable HTTPS:

    In order to enable HTTPS, you can generate your own certificate or generate it automatically by using the script ``/var/ossec/api/scripts/configure_api.sh``.

        #. Option a: Generate the certificate automatically by using the script.

          Run ``/var/ossec/api/scripts/configure_api.sh`` and follow the script steps. At some point, it will ask you for all the necessary parameters and it will create the certificate using the data you provided during the process. After this, the script will restart the Wazuh API automatically.

        #. Option b: Use your own certificate. In the file ``/var/ossec/api/configuration/config.js`` you will find the following section:

          .. code-block:: javascript

            //config.https_key = "configuration/ssl/server.key"
            //config.https_cert = "configuration/ssl/server.crt"
            //config.https_use_ca = "no"
            //config.https_ca = "configuration/ssl/ca.crt"

          You will need to uncomment these lines. Then, you can indicate the path of your ``crt``, ``key`` and/or the ``ca`` (setting ``https_use_ca`` to ``yes``). Above those lines, the option ``config.https`` has to be set to ``yes``.

          After you have configured these, you will need to restart the Wazuh API service:

            * For Systemd:

              .. code-block:: console

                # systemctl restart wazuh-api

            * For SysV Init:

              .. code-block:: console

                # service wazuh-api restart

#. Change the default credentials. You can do this manually or you can run this script: ``/var/ossec/api/scripts/configure_api.sh``.

    #. Option a: Change the default credentials using the script.

      Run ``/var/ossec/api/scripts/configure_api.sh`` and follow the script steps. It will ask you for all the necessary parameters and it will create the user with the required password. After this, the script will restart the Wazuh API automatically.

    #. Option b: Change the default credentials manually using the following commands:

      .. code-block:: console

        # cd /var/ossec/api/configuration/auth
        # node htpasswd -Bc -C 10 user myUserName

      After doing this, you will need to restart the Wazuh API service:

        * For Systemd:

          .. code-block:: console

            # systemctl restart wazuh-api

        * For SysV Init:

          .. code-block:: console

            # service wazuh-api restart

#. Change the default port:

    You can change the default port by using the script ``/var/ossec/api/scripts/configure_api.sh`` or by editing the file ``/var/ossec/api/configuration/config.js``.

        #. Option a: Change the port automatically by using the script.

          Run ``/var/ossec/api/scripts/configure_api.sh`` and follow the script steps. At some point, it will ask you for all the necessary parameters and it will change the port using the data you provided during the process. After this, the script will restart the Wazuh API automatically.

        #. Option b: Change the port manually. The file ``/var/ossec/api/configuration/config.js`` contains the parameter:

          .. code-block:: javascript

            // TCP Port used by the API.
            config.port = "55000";

          You can replace it with a port that's not being used by your system. After configuring this, you will need to restart the Wazuh API service.

            * For Systemd:

              .. code-block:: console

                # systemctl restart wazuh-api

            * For SysV Init:

              .. code-block:: console

                # service wazuh-api restart

#. (Optional) Bind to localhost:

    If you don't need to to access to the API externally, you should bind the API to ``localhost`` using the option ``config.host`` in the configuration file ``/var/ossec/api/configuration/config.js``.
