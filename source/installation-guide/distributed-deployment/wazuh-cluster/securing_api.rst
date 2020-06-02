.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to secure the Wazuh API

:orphan:

.. _securing_api:

Securing the Wazuh API
======================

By default, the communications between the Wazuh Kibana plugin and the Wazuh API are not encrypted. In addition to this, the default user is "foo" and the password is  "bar". For this reason, it is highly recommended to secure the Wazuh API and change the default user and password. Each step can be done using either the automated process or the manual process.

The automated process consists on running the script ``/var/ossec/api/scripts/configure_api.sh`` and following its steps. It will ask for all the necessary parameters during the interactive process. Binding the network is not contemplated in this script. The next configuration must be done manually: :ref:`binding port<binding port>`.

The following sections will explain how to generate certificates, change credentials and default port manually. In case of having run the previously mentioned script, these section do not have to be executed. 

Enable HTTPS
~~~~~~~~~~~~~

    In order to enable HTTPS, certificates must be generated:


    The file ``/var/ossec/api/configuration/config.js`` contains the section:

    .. code-block:: console

      //config.https_key = "configuration/ssl/server.key"
      //config.https_cert = "configuration/ssl/server.crt"
      //config.https_use_ca = "no"
      //config.https_ca = "configuration/ssl/ca.crt"

    All those lines have to be uncommented. Then, the path of  ``crt``, ``key`` and/or the ``ca`` (setting ``https_use_ca`` to ``yes``) can be indicated. Above those lines, the option ``config.https`` has to be set up to ``yes``.

    After configuring them, the Wazuh API service has to be restarted:

        .. tabs::


          .. group-tab:: Systemd

            .. code-block:: console

              # systemctl restart wazuh-api

          .. group-tab:: SysV Init

            .. code-block:: console

              # service wazuh-api restart



Change the default credentials
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    The default credentials can be changed manually using the following commands:

    .. code-block:: console

      # cd /var/ossec/api/configuration/auth
      # node htpasswd -Bc -C 10 user myUserName

    After changing them, the Wazuh API service has to be restarted:

        .. tabs::


          .. group-tab:: Systemd

            .. code-block:: console

              # systemctl restart wazuh-api

          .. group-tab:: SysV Init

            .. code-block:: console

              # service wazuh-api restart



Change the default port
~~~~~~~~~~~~~~~~~~~~~~~~

    The file ``/var/ossec/api/configuration/config.js`` contains the parameter:
    
    .. code-block:: console

      // TCP Port used by the API.
      config.port = "55000";

    It can be changed by a non-used system's port. After configuring it, the Wazuh API service has to be restarted:

        .. tabs::


          .. group-tab:: Systemd

            .. code-block:: console

              # systemctl restart wazuh-api

          .. group-tab:: SysV Init

            .. code-block:: console

              # service wazuh-api restart



.. _binding port:

Bind to localhost (optional)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    If the API will not be accessed externally, the API should be bond to ``localhost`` using the option ``config.host`` in the configuration file ``/var/ossec/api/configuration/config.js``.
