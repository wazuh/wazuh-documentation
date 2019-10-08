.. Copyright (C) 2019 Wazuh, Inc.

:orphan:

.. _securing_api:

Securing the Wazuh API
======================

By default, the communications between the Wazuh Kibana App and the Wazuh API are not encrypted. Besides, the default user is "foo" and the password is  "bar". It is highly recommended that you secure the Wazuh API and change the default user and password. The following steps will help you to achieving it:

#. Enable HTTPS:

    In order to enable HTTPS, you can generate your own certificate or generate it automatically by using the script ``/var/ossec/api/scripts/configure_api.sh``.

        #. Option a: Generate the certificate automatically by using the script.

          You need to execute the script ``/var/ossec/api/scripts/configure_api.sh`` and follow the script steps. It will ask you for all the necessary parameters and it will create the certificate using the data provided in the interactive process. The script will restart the Wazuh API automatically.

        #. Option b: Use your own certificate. The file ``/var/ossec/api/configuration/config.js`` contains the section:

          .. code-block:: console

            //config.https_key = "configuration/ssl/server.key"
            //config.https_cert = "configuration/ssl/server.crt"
            //config.https_use_ca = "no"
            //config.https_ca = "configuration/ssl/ca.crt"

          All those lines have to be uncommented.  Then, you can indicate the path of your ``crt``, ``key`` and/or the ``ca`` (setting ``https_use_ca`` to ``yes``). Above those options the option, ``config.https`` has to be set up to ``yes``.

          After configure them, the Wazuh API service has to be restarted:

            * For Systemd:

              .. code-block:: console

                # systemctl restart wazuh-api

            * For SysV Init:

              .. code-block:: console

                # service wazuh-api restart

#. Change the default credentials. You can change them manually or using the script ``/var/ossec/api/scripts/configure_api.sh``.

    #. Option a: Change the default credentials using the script.

      You need to execute ``/var/ossec/api/scripts/configure_api.sh`` and follow the script steps. It will ask you for all the necessary parameters and it will create the user with the required password. The script will restart the Wazuh API automatically.

    #. Option b: Change the default credentials manually using the following commands:

      .. code-block:: console

        # cd /var/ossec/api/configuration/auth
        # node htpasswd -Bc -C 10 user myUserName

      After configure it, the Wazuh API service has to be restarted:

        * For Systemd:

          .. code-block:: console

            # systemctl restart wazuh-api

        * For SysV Init:

          .. code-block:: console

            # service wazuh-api restart

#. (Optional) Bind to localhost:

    If you do not need to access to the API externally, you should bind the API to ``localhost`` using the option ``config.host`` in the configuration file ``/var/ossec/api/configuration/config.js``.
