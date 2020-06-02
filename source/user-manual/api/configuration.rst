.. Copyright (C) 2019 Wazuh, Inc.

.. _api_configuration:

Configuration
=============

By default, the API will bind to port 55000/tcp and use self-signed certificates. Please review the :ref:`Securing API <securing_api>` section for more information on how to protect it.

Configuration file
------------------

The API configuration can be found inside ``/var/ossec/api/configuration/api.yaml``. By default, all settings are commented out. To apply a different configuration, uncomment it. For more information on each of the settings, check the :ref:`Configuration options <api_configuration_options>`.

.. code-block:: yaml

     host: 0.0.0.0
     port: 55000
     behind_proxy_server: no

     auth_token_exp_timeout: 36000
     use_only_authd: no
     drop_privileges: yes
     experimental_features: no

     rbac:
        mode: white

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

    The master doesn’t send its local API configuration file to the workers. If the configuration is changed in the master node, it should be changed manually in the workers. Take care of not overwriting the IP and port in the local configuration of each worker.

You can view and edit the API configuration both through the ``api.yaml`` file and through the endpoint ``/manager/api/config`` (or ``/cluster/api/config`` in case of using Wazuh cluster). Some of the settings are hot applied without the need to restart the API (only through previous endpoints). In case of editing the ``api.yaml`` file, make sure to restart wazuh-api service:

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

Configuration options
---------------------

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

auth_token_exp_timeout
^^^^^^^^^^^^^^^^^^^^^^
+-----------------------+---------------+---------------------------------------------------------+
| Allowed values        | Default value | Description                                             |
+=======================+===============+=========================================================+
| Any positive integer. | 36000         | Set how many seconds it takes for JWT tokens to expire. |
+-----------------------+---------------+---------------------------------------------------------+

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

rbac
^^^^^^^^^^^^^^^^^^^^^^
+----------------+---------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Allowed values | Default value | Description                                                                                                                                                    |
+================+===============+================================================================================================================================================================+
| black,white    | black         | Sets the behavior of RBAC. For example, in black mode, policies not included in the list **can be** executed, while in white mode they **cannot** be executed. |
+----------------+---------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+

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
