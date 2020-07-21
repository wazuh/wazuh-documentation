.. Copyright (C) 2019 Wazuh, Inc.

.. _api_configuration:

Configuration
=============

By default, the API will bind to port 55000/tcp and use self-signed certificates. Please review the :ref:`Securing API <securing_api>` section for more information on how to protect it.

.. _api_configuration_file:

Configuration file
------------------

The API configuration can be found inside ``{WAZUH_PATH}/api/configuration/api.yaml``. By default, all settings are commented out. To apply a different configuration, uncomment it. For more information on each of the settings, check the :ref:`Configuration options <api_configuration_options>`.

.. code-block:: yaml

     host: 0.0.0.0
     port: 55000
     behind_proxy_server: no

     use_only_authd: no
     drop_privileges: yes
     experimental_features: no

     https:
        enabled: yes
        key: "api/configuration/ssl/server.key"
        cert: "api/configuration/ssl/server.crt"
        use_ca: False
        ca: "api/configuration/ssl/ca.crt"

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

.. warning::

    If running a cluster, the master doesn’t send its local API configuration file to the workers. Each node provides its own API, if the configuration file is changed in the master node, it should be updated manually in the workers if so desired. Take care of not overwriting the IP and port in the local configuration of each worker.

Make sure to restart wazuh-api service after editing the configuration file:

  a. For Systemd:

  .. code-block:: console

    # systemctl restart wazuh-api

  b. For SysV Init:

  .. code-block:: console

    # service wazuh-api restart

Security configuration
----------------------
Unlike the other API settings that can be changed in the :ref:`configuration file <api_configuration_file>`, the API security settings are only intended to be modified through an API endpoint (``/security/config``). For more information on each of the settings, please check the :ref:`Security configuration options <api_security_configuration_options>`.

.. code-block:: yaml

    auth_token_exp_timeout: 36000
    rbac_mode: white
    max_login_attempts: 5
    block_time: 300
    max_request_per_minute: 300

It is not needed to restart the Wazuh API for these changes to take effect. However, for some of them it may be required to request a new JWT token.

Configuration endpoints
-----------------------

The API has multiple endpoints that allow both querying and modifying part of its configuration. Those settings that could break access (such as IP, port, etc.) cannot be changed through the endpoints, so the only way to modify them is by accessing the ``api.yaml`` file described in the section :ref:`Configuration file <api_configuration_file>`.

The security configuration can only be queried and modified through the ``/security/config`` endpoint.

Get configuration
^^^^^^^^^^^^^^^^^
- ``GET /manager/api/config``: Get the complete configuration of the node on which it is run.
- ``GET /cluster/api/config``: Get the complete configuration of all (or a list) of the cluster nodes.
- ``GET /security/config``: Get the current security configuration.

Modify configuration
^^^^^^^^^^^^^^^^^^^^
- ``PUT /manager/api/config``: Change part of the configuration of the node on which it is run.
- ``PUT /cluster/api/config``: Change part of the configuration of all (or a list) of the cluster nodes.
- ``PUT /security/config``: Change the security configuration.

Restore configuration
^^^^^^^^^^^^^^^^^^^^^
- ``DELETE /manager/api/config``: Restore the default configuration of the node on which it is run.
- ``DELETE /cluster/api/config``: Restore the default configuration of all (or a list) of the cluster nodes.
- ``DELETE /security/config``: Restore the default security configuration.

The following settings are hot applied when using the configuration endpoints:

- behind_proxy_server
- use_only_authd
- experimental_features
- cache (``enabled`` and ``time``)

To apply changes to different settings, it is necessary to restart each API whose configuration have changed:

  a. For Systemd:

  .. code-block:: console

    # systemctl restart wazuh-api

  b. For SysV Init:

  .. code-block:: console

    # service wazuh-api restart

Manually enable https support
-----------------------------

Generate the key and certificate request (the Openssl package is required).

.. code-block:: console

 # cd /var/ossec/api/configuration/ssl
 # openssl genrsa -des3 -out server.key 1024
 # openssl req -new -key server.key -out server.csr

.. note::

    Please note that this whole process is already done automatically when the API is run for the first time.

By default, the key's password must be entered every time you run the server.  If you don't want to enter the password every time, you can remove it by running these commands:

.. code-block:: console

 # cp server.key server.key.org
 # openssl rsa -in server.key.org -out server.key

Next generate your self-signed certificate:

.. code-block:: console

 # openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

And remove temporary files:

.. code-block:: console

 # rm server.csr
 # rm server.key.org

.. _api_configuration_options:

API configuration options
-------------------------

host
^^^^^^^^^^^^^^^^^^^^^^
+--------------------------+---------------+-----------------------------------------------------------------+
| Allowed values           | Default value | Description                                                     |
+==========================+===============+=================================================================+
| Any valid IP or hostname | 0.0.0.0       | IP or hostname of the Wazuh manager where the API is installed. |
+--------------------------+---------------+-----------------------------------------------------------------+

port
^^^^^^^^^^^^^^^^^^^^^^
+-------------------------------+---------------+---------------------------------+
| Allowed values                | Default value | Description                     |
+===============================+===============+=================================+
| Any value between 1 and 65535 | 55000         | Port where the API will listen. |
+-------------------------------+---------------+---------------------------------+

behind_proxy_server
^^^^^^^^^^^^^^^^^^^^^^
+----------------------+---------------+----------------------------------------------------------------------------+
| Allowed values       | Default value | Description                                                                |
+======================+===============+============================================================================+
| yes, true, no, false | true          | Set this option to "yes" in case the API is running behind a proxy server. |
+----------------------+---------------+----------------------------------------------------------------------------+

use_only_authd
^^^^^^^^^^^^^^^^^^^^^^
+----------------------+---------------+---------------------------------------------------------------------+
| Allowed values       | Default value | Description                                                         |
+======================+===============+=====================================================================+
| yes, true, no, false | false         | Forces the use of ossec-authd when registering and removing agents. |
+----------------------+---------------+---------------------------------------------------------------------+

drop_privileges
^^^^^^^^^^^^^^^^^^^^^^
+----------------------+---------------+-------------------------------------+
| Allowed values       | Default value | Description                         |
+======================+===============+=====================================+
| yes, true, no, false | true          | Run wazuh-api process as ossec user |
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
+------------+----------------------+----------------------------------+------------------------------------------------------------+
| Sub-fields | Allowed values       | Default value                    | Description                                                |
+============+======================+==================================+============================================================+
| enabled    | yes, true, no, false | true                             | Enable or disable SSL (https) in the Wazuh API.            |
+------------+----------------------+----------------------------------+------------------------------------------------------------+
| key        | Any text string      | api/configuration/ssl/server.key | Path of the file with the private key.                     |
+------------+----------------------+----------------------------------+------------------------------------------------------------+
| cert       | Any text string      | api/configuration/ssl/server.crt | Path to the file with the certificate.                     |
+------------+----------------------+----------------------------------+------------------------------------------------------------+
| use_ca     | yes, true, no, false | false                            | Whether to use a certificate from a Certificate Authority. |
+------------+----------------------+----------------------------------+------------------------------------------------------------+
| ca         | Any text string      | api/configuration/ssl/ca.crt     | Path to the certificate of the Certificate Authority (CA). |
+------------+----------------------+----------------------------------+------------------------------------------------------------+

logs
^^^^^^^^^^^^^^^^^^^^^^
+------------+----------------------------------------------------------------------------------------+---------------+-------------------------------------------+
| Sub-fields | Allowed values                                                                         | Default value | Description                               |
+============+========================================================================================+===============+===========================================+
| level      | disabled, info, warning, error, debug, debug2 (each level includes the previous level) | info          | Sets the verbosity level of the API logs. |
+------------+----------------------------------------------------------------------------------------+---------------+-------------------------------------------+
| path       | Any text string                                                                        | logs/api.log  | Path where to save the API logs.          |
+------------+----------------------------------------------------------------------------------------+---------------+-------------------------------------------+

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
| allow_credentials | yes, true, no, false | false         | Tells browsers whether to expose the response to frontend JavaScript.                         |
+-------------------+----------------------+---------------+-----------------------------------------------------------------------------------------------+

cache
^^^^^^^^^^^^^^^^^^^^^^
+------------+--------------------------------------+---------------+---------------------------------------------------------------------------------------------+
| Sub-fields | Allowed values                       | Default value | Description                                                                                 |
+============+======================================+===============+=============================================================================================+
| enabled    | yes, true, no, false                 | true          | Enables or disables caching for certain API responses (currently, all ``/rules`` endpoints) |
+------------+--------------------------------------+---------------+---------------------------------------------------------------------------------------------+
| time       | Any positive integer or real number. | 0.75          | Time in seconds that the cache lasts before expiring.                                       |
+------------+--------------------------------------+---------------+---------------------------------------------------------------------------------------------+

.. _api_security_configuration_options:

Security configuration options
------------------------------

auth_token_exp_timeout
^^^^^^^^^^^^^^^^^^^^^^
+-----------------------+---------------+---------------------------------------------------------+
| Allowed values        | Default value | Description                                             |
+=======================+===============+=========================================================+
| Any positive integer. | 36000         | Set how many seconds it takes for JWT tokens to expire. |
+-----------------------+---------------+---------------------------------------------------------+

rbac_mode
^^^^^^^^^^^^^^^^^^^^^^
+----------------+---------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Allowed values | Default value | Description                                                                                                                                                    |
+================+===============+================================================================================================================================================================+
| black,white    | black         | Sets the behavior of RBAC. For example, in black mode, policies not included in the list **can be** executed, while in white mode they **cannot** be executed. |
+----------------+---------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+

max_login_attempts
^^^^^^^^^^^^^^^^^^^^^^
+----------------------+---------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Allowed values       | Default value | Description                                                                                                                                                    |
+======================+===============+================================================================================================================================================================+
| Any positive integer.| 5             | Sets a maximum limit for login attempts during a specified ``block_time``.                                                                                     |
+----------------------+---------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+

block_time
^^^^^^^^^^^^^^^^^^^^^^
+----------------------+---------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Allowed values       | Default value | Description                                                                                                                                                                                                            |
+======================+===============+========================================================================================================================================================================================================================+
| Any positive integer.| 300           | Established period of time (in seconds) for doing login requests. If the established number of requests (``max_login_attempts``) is exceeded within this time limit, the IP is blocked until the end of the block time.|
+----------------------+---------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

max_request_per_minute
^^^^^^^^^^^^^^^^^^^^^^
+----------------------+---------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Allowed values       | Default value | Description                                                                                                                                                    |
+======================+===============+================================================================================================================================================================+
| Any positive integer.| 300           | Establishes a maximum limit of requests per minute (does not include requests to obtain a token).                                                              |
+----------------------+---------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
