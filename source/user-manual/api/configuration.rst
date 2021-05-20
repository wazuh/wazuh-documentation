.. Copyright (C) 2021 Wazuh, Inc.

.. _api_configuration:

Configuration
=============

.. note::
  Please review the :ref:`Securing API <securing_api>` section for more information on how to protect the Wazuh API.

.. _api_configuration_file:

Wazuh API configuration
-----------------------

The Wazuh API configuration can be found inside ``{WAZUH_PATH}/api/configuration/api.yaml``. All settings are commented out by default. To apply a different configuration, uncomment and edit the desired line.

Here are all the available settings for the ``api.yaml`` configuration file. For more information on each of the settings, check the :ref:`configuration options <api_configuration_options>` below:

.. code-block:: yaml

     host: 0.0.0.0
     port: 55000

     use_only_authd: no
     drop_privileges: yes
     experimental_features: no

     https:
        enabled: yes
        key: "api/configuration/ssl/server.key"
        cert: "api/configuration/ssl/server.crt"
        use_ca: False
        ca: "api/configuration/ssl/ca.crt"
        ssl_protocol: "TLSv1.2"
        ssl_ciphers: "HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH"

     logs:
        level: "info"
        path: "logs/api.log"

     cors:
        enabled: no
        source_route: "*"
        expose_headers: "*"
        allow_headers: "*"
        allow_credentials: no

     cache:
        enabled: yes
        time: 0.750

     access:
        max_login_attempts: 50
        block_time: 300
        max_request_per_minute: 300

     remote_commands:
        localfile:
           enabled: yes
           exceptions: []

       wodle_command:
          enabled: yes
          exceptions: []

.. warning::

    If running a cluster, the master will NOT send its local Wazuh API configuration file to the workers. Each node provides its own Wazuh API. If the configuration file is changed in the master node, the user should manually update the workers Wazuh API configuration in order to use the same one. Be sure to not overwrite the IP and port in the local configuration of each worker.

Make sure to restart the Wazuh API using **wazuh-manager** service after editing the configuration file:

  a. For Systemd:

  .. code-block:: console

    # systemctl restart wazuh-manager

  b. For SysV Init:

  .. code-block:: console

    # service wazuh-manager restart

Security configuration
----------------------
Unlike regular Wazuh API configuration settings that can be changed in the :ref:`configuration file <api_configuration_file>`, the following Wazuh API security settings are only intended to be modified through a Wazuh API endpoint  (:api-ref:`PUT /security/config <operation/api.controllers.security_controller.put_security_config>`), and they are applied to every Wazuh API in the cluster, in case there is one configured. For more information on each of the settings, please check the :ref:`security configuration options <api_security_configuration_options>`.

.. code-block:: yaml

    auth_token_exp_timeout: 900
    rbac_mode: white

.. warning::
    All JWT tokens are revoked for security reasons when the security configuration is changed. It will be necessary to log in and obtain a new token after the change.

Configuration endpoints
-----------------------

The Wazuh API has several endpoints that allow querying its current configuration. The API configuration can only be modified by accessing the ``api.yaml`` file described in the section :ref:`configuration file <api_configuration_file>`.

The security configuration, which contains the ``auth_token_exp_timeout`` and ``rbac_mode`` settings, can only be queried and modified through the :api-ref:`GET /security/config <operation/api.controllers.security_controller.get_security_config>`, :api-ref:`PUT /security/config <operation/api.controllers.security_controller.put_security_config>` and :api-ref:`DELETE /security/config <operation/api.controllers.security_controller.delete_security_config>` Wazuh API endpoints.

Get configuration
^^^^^^^^^^^^^^^^^
- :api-ref:`GET /manager/api/config <operation/api.controllers.manager_controller.get_api_config>`: Get the complete local Wazuh API configuration.
- :api-ref:`GET /cluster/api/config <operation/api.controllers.cluster_controller.get_api_config>`: Get the complete Wazuh API configuration of all (or a list) of the cluster nodes.
- :api-ref:`GET /security/config <operation/api.controllers.security_controller.get_security_config>`: Get the current security configuration.

Modify configuration
^^^^^^^^^^^^^^^^^^^^
- :api-ref:`PUT /security/config <operation/api.controllers.security_controller.put_security_config>`: Modify the security configuration.

Restore configuration
^^^^^^^^^^^^^^^^^^^^^
- :api-ref:`DELETE /security/config <operation/api.controllers.security_controller.delete_security_config>`: Restore the default security configuration.

SSL certificate
---------------
.. note::

    Please note that this whole process is already done automatically when the Wazuh API is run for the first time.

Generate the key and certificate request (the ``openssl`` package is required).

.. code-block:: console

 # cd /var/ossec/api/configuration/ssl
 # openssl req -newkey rsa:2048 -new -nodes -x509 -days 365 -keyout server.key -out server.crt


By default, the key's password must be entered every time the server is run. If the key was generated by the Wazuh API or using the command above, it will not have a password. To set one, use the following command:

.. code-block:: console

 # ssh-keygen -p -f server.key

This will trigger a prompt to set a new password for the key.

.. _api_configuration_options:

API configuration options
-------------------------

host
^^^^^^^^^^^^^^^^^^^^^^
+--------------------------+---------------+-----------------------------------------------------------------------+
| Allowed values           | Default value | Description                                                           |
+==========================+===============+=======================================================================+
| Any valid IP or hostname | 0.0.0.0       | IP or hostname of the Wazuh manager where the Wazuh API is running.   |
+--------------------------+---------------+-----------------------------------------------------------------------+

port
^^^^^^^^^^^^^^^^^^^^^^
+-------------------------------+---------------+---------------------------------------+
| Allowed values                | Default value | Description                           |
+===============================+===============+=======================================+
| Any value between 1 and 65535 | 55000         | Port where the Wazuh API will listen. |
+-------------------------------+---------------+---------------------------------------+

use_only_authd
^^^^^^^^^^^^^^^^^^^^^^
+----------------------+---------------+--------------------------------------------------------------------+
| Allowed values       | Default value | Description                                                        |
+======================+===============+====================================================================+
| yes, true, no, false | false         | Force the use of wazuh-authd when registering and removing agents. |
+----------------------+---------------+--------------------------------------------------------------------+

drop_privileges
^^^^^^^^^^^^^^^^^^^^^^
+----------------------+---------------+-------------------------------------+
| Allowed values       | Default value | Description                         |
+======================+===============+=====================================+
| yes, true, no, false | true          | Run wazuh-api process as wazuh user |
+----------------------+---------------+-------------------------------------+

experimental_features
^^^^^^^^^^^^^^^^^^^^^^
+----------------------+---------------+-----------------------------------+
| Allowed values       | Default value | Description                       |
+======================+===============+===================================+
| yes, true, no, false | false         | Enable features under development |
+----------------------+---------------+-----------------------------------+

https
^^^^^^^^^^^^^^^^^^^^^^
+--------------+------------------------------+----------------------------------------------------+-------------------------------------------------------------------+
| Sub-fields   | Allowed values               | Default value                                      | Description                                                       |
+==============+==============================+====================================================+===================================================================+
| enabled      | yes, true, no, false         | true                                               | Enable or disable SSL (https) in the Wazuh API.                   |
+--------------+------------------------------+----------------------------------------------------+-------------------------------------------------------------------+
| key          | Any text string              | api/configuration/ssl/server.key                   | Path of the file with the private key.                            |
+--------------+------------------------------+----------------------------------------------------+-------------------------------------------------------------------+
| cert         | Any text string              | api/configuration/ssl/server.crt                   | Path to the file with the certificate.                            |
+--------------+------------------------------+----------------------------------------------------+-------------------------------------------------------------------+
| use_ca       | yes, true, no, false         | false                                              | Whether to use a certificate from a Certificate Authority or not. |
+--------------+------------------------------+----------------------------------------------------+-------------------------------------------------------------------+
| ca           | Any text string              | api/configuration/ssl/ca.crt                       | Path to the certificate of the Certificate Authority (CA).        |
+--------------+------------------------------+----------------------------------------------------+-------------------------------------------------------------------+
| ssl_protocol | TLS, TLSv1, TLSv1.1, TLSv1.2 | TLSv1.2                                            | SSL protocol to be used. Its value is not case sensitive.         |
+--------------+------------------------------+----------------------------------------------------+-------------------------------------------------------------------+
| ssl_cipher   | Any ssl cipher               | HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH | SSL cipher to be used. Its value is not case sensitive.           |
+--------------+------------------------------+----------------------------------------------------+-------------------------------------------------------------------+

logs
^^^^^^^^^^^^^^^^^^^^^^
+------------+----------------------------------------------------------------------------------------+---------------+-------------------------------------------------+
| Sub-fields | Allowed values                                                                         | Default value | Description                                     |
+============+========================================================================================+===============+=================================================+
| level      | disabled, info, warning, error, debug, debug2 (each level includes the previous level) | info          | Set the verbosity level of the Wazuh API logs.  |
+------------+----------------------------------------------------------------------------------------+---------------+-------------------------------------------------+
| path       | Any text string                                                                        | logs/api.log  | Path where the Wazuh API logs will be saved.    |
+------------+----------------------------------------------------------------------------------------+---------------+-------------------------------------------------+

cors
^^^^^^^^^^^^^^^^^^^^^^
+-------------------+----------------------+---------------+-----------------------------------------------------------------------------------------------+
| Sub-fields        | Allowed values       | Default value | Description                                                                                   |
+===================+======================+===============+===============================================================================================+
| enabled           | yes, true, no, false | false         | Enable or disable the use of CORS in the Wazuh API.                                           |
+-------------------+----------------------+---------------+-----------------------------------------------------------------------------------------------+
| source_route      | Any text string      | ``*``         | Sources for which the resources will be available. For example ``http://client.example.org``. |
+-------------------+----------------------+---------------+-----------------------------------------------------------------------------------------------+
| expose_headers    | Any text string      | ``*``         | Which headers can be exposed as part of the response.                                         |
+-------------------+----------------------+---------------+-----------------------------------------------------------------------------------------------+
| allow_headers     | Any text string      | ``*``         | Which HTTP headers can be used during the actual request.                                     |
+-------------------+----------------------+---------------+-----------------------------------------------------------------------------------------------+
| allow_credentials | yes, true, no, false | false         | Tell browsers whether to expose the response to frontend JavaScript or not.                   |
+-------------------+----------------------+---------------+-----------------------------------------------------------------------------------------------+

cache
^^^^^^^^^^^^^^^^^^^^^^
+------------+--------------------------------------+---------------+----------------------------------------------------------------------------------------------------------------------+
| Sub-fields | Allowed values                       | Default value | Description                                                                                                          |
+============+======================================+===============+======================================================================================================================+
| enabled    | yes, true, no, false                 | true          | Enable or disable caching for certain Wazuh API responses (currently, all :api-ref:`rules endpoints <tag/Rules>` )   |
+------------+--------------------------------------+---------------+----------------------------------------------------------------------------------------------------------------------+
| time       | Any positive integer or real number  | 0.75          | Time in seconds that the cache lasts before expiring.                                                                |
+------------+--------------------------------------+---------------+----------------------------------------------------------------------------------------------------------------------+

access
^^^^^^^
+------------------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Sub-fields             | Allowed values       | Default value | Description                                                                                                                                                                                                                                                                                                                     |
+========================+======================+===============+=================================================================================================================================================================================================================================================================================================================================+
| max_login_attempts     | Any positive integer | 50            | Set a maximum number of login attempts during a specified ``block_time`` number of seconds.                                                                                                                                                                                                                                     |
+------------------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| block_time             | Any positive integer | 300           | Established period of time (in seconds) to attempt login requests. If the established number of requests (``max_login_attempts``) is exceeded within this time limit, the IP is blocked until the end of the block time period.                                                                                                 |
+------------------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| max_request_per_minute | Any positive integer | 300           | Establish a maximum number of requests the Wazuh API can handle per minute (does not include authentication requests). If the number of requests for a given minute is exceeded, all incoming requests (from any user) will be blocked for the remaining of the minute. This feature can be disabled by setting its value to 0. |
+------------------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

remote_commands (localfile and wodle "command")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
+------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Sub-fields | Allowed values       | Default value | Description                                                                                                                                                                                                                                                                                                                                 |
+============+======================+===============+=============================================================================================================================================================================================================================================================================================================================================+
| enabled    | yes, true, no, false | true          | Enable or disable uploading configurations with remote commands through the Wazuh API. When this option is disabled it is not possible to upload **ossec.conf** files with the <command> option inside the :ref:`localfile tag <reference_ossec_localfile>` as well as the :ref:`wodle "command" option <wodle_command>`.                   |
+------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| exceptions | command list         | [ ]           | Set a list of commands allowed to be uploaded through the API. These exceptions could always be uploaded independently of the value of the enabled config                                                                                                                                                                                   |
+------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

.. _api_security_configuration_options:

Security configuration options
------------------------------

auth_token_exp_timeout
^^^^^^^^^^^^^^^^^^^^^^
+-----------------------+---------------+---------------------------------------------------------+
| Allowed values        | Default value | Description                                             |
+=======================+===============+=========================================================+
| Any positive integer  | 900           | Set how many seconds it takes for JWT tokens to expire. |
+-----------------------+---------------+---------------------------------------------------------+

rbac_mode
^^^^^^^^^^^^^^^^^^^^^^
+----------------+---------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Allowed values | Default value | Description                                                                                                                                                                                                                                                                                                                                                           |
+================+===============+=======================================================================================================================================================================================================================================================================================================================================================================+
| black,white    | white         | Set the behavior of RBAC. By default, everything is allowed in black mode while everything is denied in white mode. Choose the rbac_mode that better suits the desired RBAC infraestructure. In black mode it is very easy to deny a few specific action-resources pairs with just some policies while white mode is more secure and requires building from scratch.  |
+----------------+---------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
