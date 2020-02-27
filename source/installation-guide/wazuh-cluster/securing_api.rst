.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to secure the Wazuh API

:orphan:

.. _securing_api:

Securing the Wazuh API
======================

By default, the communications between the Wazuh Kibana plugin and the Wazuh API are not encrypted. In addition to this, the default user is "foo" and the password is  "bar". For this reason, it is highly recommended to secure the Wazuh API and change the default user and password. The following steps will explain how achieve it:

#. Enable HTTPS:

    In order to enable HTTPS, certificates can be generated either manually or automatically using the script ``/var/ossec/api/scripts/configure_api.sh``.

        #. Option a: Generate the certificate automatically using the script.

          The fisrt step is to execute the script ``/var/ossec/api/scripts/configure_api.sh`` and follow the script steps. It will ask for all the necessary parameters and it will create the certificate using the data provided in the interactive process. The script will restart the Wazuh API automatically.

        #. Option b: Use own certificate. The file ``/var/ossec/api/configuration/config.js`` contains the section:

          .. code-block:: console

            //config.https_key = "configuration/ssl/server.key"
            //config.https_cert = "configuration/ssl/server.crt"
            //config.https_use_ca = "no"
            //config.https_ca = "configuration/ssl/ca.crt"

          All those lines have to be uncommented. Then, the path of  ``crt``, ``key`` and/or the ``ca`` (setting ``https_use_ca`` to ``yes``) can be indicated. Above those lines, the option ``config.https`` has to be set up to ``yes``.

          After configuring them, the Wazuh API service has to be restarted:

            * For Systemd:

              .. code-block:: console

                # systemctl restart wazuh-api

            * For SysV Init:

              .. code-block:: console

                # service wazuh-api restart

#. Change the default credentials. They can be changed manually or using the script ``/var/ossec/api/scripts/configure_api.sh``.

    #. Option a: Change the default credentials using the script.

      Execute ``/var/ossec/api/scripts/configure_api.sh`` and follow the script steps. It will ask for all the necessary parameters and it will create the user with the required password. The script will restart the Wazuh API automatically.

    #. Option b: Change the default credentials manually using the following commands:

      .. code-block:: console

        # cd /var/ossec/api/configuration/auth
        # node htpasswd -Bc -C 10 user myUserName

      After configuring it, the Wazuh API service has to be restarted:

        * For Systemd:

          .. code-block:: console

            # systemctl restart wazuh-api

        * For SysV Init:

          .. code-block:: console

            # service wazuh-api restart

#. Change the default port:

    The default port can be changed using the script ``/var/ossec/api/scripts/configure_api.sh`` or editing the file ``/var/ossec/api/configuration/config.js``.

        #. Option a: Change the port automatically using the script.

          Execute the script ``/var/ossec/api/scripts/configure_api.sh`` and follow the script steps. It will ask for all the necessary parameters and it will change the port using the data provided in the interactive process. The script will restart the Wazuh API automatically.

        #. Option b: Change the port manually. The file ``/var/ossec/api/configuration/config.js`` contains the parameter:

          .. code-block:: console

            // TCP Port used by the API.
            config.port = "55000";

          It can be changed by a non-used system's port. After configuring it, the Wazuh API service has to be restarted:

            * For Systemd:

              .. code-block:: console

                # systemctl restart wazuh-api

            * For SysV Init:

              .. code-block:: console

                # service wazuh-api restart

#. (Optional) Bind to localhost:

    If the API will not be accessed externally, the API should be bond to ``localhost`` using the option ``config.host`` in the configuration file ``/var/ossec/api/configuration/config.js``.
