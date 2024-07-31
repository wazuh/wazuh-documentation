.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the Wazuh server API configuration in this section of the documentation.

Configuration
=============

.. note::

   Please review :doc:`securing the Wazuh server API <securing-api>` section for more information on how to protect the Wazuh server API.

.. _api_configuration_file:

Wazuh server API configuration file
-----------------------------------

The Wazuh server API configuration is located in the ``/var/ossec/api/configuration/api.yaml`` file on the Wazuh server. By default, all settings are commented out. To apply a different configuration, uncomment and edit the desired line.

Here are all the available settings for the ``/var/ossec/api/configuration/api.yaml`` configuration file. For more information on each of the settings, check the :ref:`configuration options <api_configuration_options>`:

.. code-block:: yaml

   host: 0.0.0.0
   port: 55000

   drop_privileges: yes
   experimental_features: no
   max_upload_size: 10485760

   intervals:
      request_timeout: 10

   https:
      enabled: yes
      key: "server.key"
      cert: "server.crt"
      use_ca: False
      ca: "ca.crt"
      ssl_protocol: "auto"
      ssl_ciphers: ""

   logs:
      level: "info"
      format: "plain"
      max_size:
       enabled: false

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

   upload_configuration:
      remote_commands:
         localfile:
            allow: yes
            exceptions: []
         wodle_command:
            allow: yes
            exceptions: []
      limits:
         eps:
            allow: yes
       agents:
         allow_higher_versions:
            allow: yes
       indexer:
         allow: yes
       integrations:
         virustotal:
            public_key:
             allow: yes
             minimum_quota: 240

.. warning::

   When running a Wazuh server cluster, the master node does not automatically send its local Wazuh server API configuration file to the worker nodes. Each node maintains its own Wazuh server API configuration. Therefore, if any changes are made to the configuration file on the master node, you must manually update the configuration on each worker node to ensure consistency. Ensure that the IP address and port are not overwritten in the local configuration of each worker.

Make sure to restart the Wazuh server API using the Wazuh manager service after editing the configuration file:

  .. include:: /_templates/common/restart_manager.rst

.. _api_configuration_options:

API configuration options
-------------------------

host
^^^^

+----------------------------------+---------------+--------------------------------------------------------------------------------------+
| Allowed values                   | Default value | Description                                                                          |
+==================================+===============+======================================================================================+
| Any valid IP address or hostname | 0.0.0.0       | IP address or hostname of the Wazuh manager where the Wazuh server API is running.   |
+----------------------------------+---------------+--------------------------------------------------------------------------------------+

port
^^^^

+-------------------------------+---------------+----------------------------------------------+
| Allowed values                | Default value | Description                                  |
+===============================+===============+==============================================+
| Any value between 1 and 65535 | 55000         | Port where the Wazuh server API will listen. |
+-------------------------------+---------------+----------------------------------------------+

use_only_authd
^^^^^^^^^^^^^^

.. deprecated:: 4.3.0

+----------------------+---------------+--------------------------------------------------------------------+
| Allowed values       | Default value | Description                                                        |
+======================+===============+====================================================================+
| yes, true, no, false | false         | Force the use of wazuh-authd when registering and removing agents. |
+----------------------+---------------+--------------------------------------------------------------------+

drop_privileges
^^^^^^^^^^^^^^^

+----------------------+---------------+----------------------------------------------+
| Allowed values       | Default value | Description                                  |
+======================+===============+==============================================+
| yes, true, no, false | true          | Run wazuh-api process as the ``wazuh`` user. |
+----------------------+---------------+----------------------------------------------+

experimental_features
^^^^^^^^^^^^^^^^^^^^^^

+----------------------+---------------+-----------------------------------+
| Allowed values       | Default value | Description                       |
+======================+===============+===================================+
| yes, true, no, false | false         | Enable features under development |
+----------------------+---------------+-----------------------------------+

max_upload_size
^^^^^^^^^^^^^^^

+----------------------+---------------+------------------------------------------------------------------------------+
| Allowed values       | Default value | Description                                                                  |
+======================+===============+==============================================================================+
| Any positive integer | 10485760      | Set the maximum body size that the API can accept, in bytes (0 -> limitless) |
+----------------------+---------------+------------------------------------------------------------------------------+

intervals
^^^^^^^^^^

+-----------------+----------------------+---------------+-----------------------------------------------------------------+
| Sub-fields      | Allowed values       | Default value | Description                                                     |
+=================+======================+===============+=================================================================+
| request_timeout | Any positive integer | 10            | Set the maximum response time (in seconds) for each API request |
+-----------------+----------------------+---------------+-----------------------------------------------------------------+

https
^^^^^

+--------------+------------------------------------+----------------------------------+------------------------------------------------------------------------------------------------------------+
| Sub-fields   | Allowed values                     | Default value                    | Description                                                                                                |
+==============+====================================+==================================+============================================================================================================+
| enabled      | yes, true, no, false               | true                             | Enable or disable SSL (https) in the Wazuh server API.                                                     |
+--------------+------------------------------------+----------------------------------+------------------------------------------------------------------------------------------------------------+
| key          | Any text string                    | server.key                       | Name of the private key. Stored in ``/var/ossec/api/configuration/ssl``.                                   |
+--------------+------------------------------------+----------------------------------+------------------------------------------------------------------------------------------------------------+
| cert         | Any text string                    | server.crt                       | Name of the certificate. Stored in ``/var/ossec/api/configuration/ssl``.                                   |
+--------------+------------------------------------+----------------------------------+------------------------------------------------------------------------------------------------------------+
| use_ca       | yes, true, no, false               | false                            | Whether to use a certificate from a Certificate Authority or not.                                          |
+--------------+------------------------------------+----------------------------------+------------------------------------------------------------------------------------------------------------+
| ca           | Any text string                    | ca.crt                           | Name of the certificate of the Certificate Authority (CA). Stored in ``/var/ossec/api/configuration/ssl``. |
+--------------+------------------------------------+----------------------------------+------------------------------------------------------------------------------------------------------------+
| ssl_protocol | TLS, TLSv1, TLSv1.1, TLSv1.2, auto | .. versionadded:: 4.8.0          |                                                                                                            |
|              |                                    |                                  |                                                                                                            |
|              |                                    | auto                             | SSL protocol to allow. Its value is not case sensitive.                                                    |
+--------------+------------------------------------+----------------------------------+------------------------------------------------------------------------------------------------------------+
| ssl_ciphers  | Any text string                    | None                             | SSL ciphers to allow. Its value is not case sensitive.                                                     |
+--------------+------------------------------------+----------------------------------+------------------------------------------------------------------------------------------------------------+

logs
^^^^

+---------------------------+----------------------------------------------------------------------------------------+---------------+--------------------------------------------------------+
| Sub-fields                | Allowed values                                                                         | Default value | Description                                            |
+===========================+========================================================================================+===============+========================================================+
| level                     | disabled, info, warning, error, debug, debug2 (each level includes the previous level) | info          | Set the verbosity level of the Wazuh server API logs.  |
+---------------------------+----------------------------------------------------------------------------------------+---------------+--------------------------------------------------------+
| path                      | Any text string.                                                                       | logs/api.log  | .. deprecated:: 4.3.0                                  |
|                           |                                                                                        |               |                                                        |
|                           |                                                                                        |               | Path where the Wazuh server API logs will be saved.    |
+---------------------------+----------------------------------------------------------------------------------------+---------------+--------------------------------------------------------+
| format                    | plain, json or both (plain,json)                                                       | plain         | .. versionadded:: 4.4.0                                |
|                           |                                                                                        |               |                                                        |
|                           |                                                                                        |               | Set the format of the Wazuh server API logs.           |
+---------------------------+----------------------------------------------------------------------------------------+---------------+--------------------------------------------------------+

max_size
^^^^^^^^

.. versionadded:: 4.6.0

+------------+-----------------------------------------------+---------------+-------------------------------------------------------------------------------------------------------------------+
| Sub-fields | Allowed values                                | Default value | Description                                                                                                       |
+============+===============================================+===============+===================================================================================================================+
| enabled    | yes, true, no, false                          | false         | Enable or disable log file rotation based on file size. This option will disable log file rotation based on time. |
+------------+-----------------------------------------------+---------------+-------------------------------------------------------------------------------------------------------------------+
| size       | Any positive number followed by a valid unit. | 1M            | Set a file size to trigger log rotation.                                                                          |
|            | K/k for kilobytes, M/m for megabytes.         |               |                                                                                                                   |
+------------+-----------------------------------------------+---------------+-------------------------------------------------------------------------------------------------------------------+

cors
^^^^

+-------------------+----------------------+---------------+-----------------------------------------------------------------------------------------------+
| Sub-fields        | Allowed values       | Default value | Description                                                                                   |
+===================+======================+===============+===============================================================================================+
| enabled           | yes, true, no, false | false         | Enable or disable the use of CORS in the Wazuh server API.                                    |
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
^^^^^

.. deprecated:: 4.8.0

+------------+--------------------------------------+---------------+-----------------------------------------------------------------------------------------------------------------------------+
| Sub-fields | Allowed values                       | Default value | Description                                                                                                                 |
+============+======================================+===============+=============================================================================================================================+
| enabled    | yes, true, no, false                 | true          | Enable or disable caching for certain Wazuh server API responses (currently, all :api-ref:`rules endpoints <tag/Rules>` )   |
+------------+--------------------------------------+---------------+-----------------------------------------------------------------------------------------------------------------------------+
| time       | Any positive integer or real number  | 0.75          | Time in seconds that the cache lasts before expiring.                                                                       |
+------------+--------------------------------------+---------------+-----------------------------------------------------------------------------------------------------------------------------+

.. _api_configuration_access:

access
^^^^^^
+------------------------+----------------------+---------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Sub-fields             | Allowed values       | Default value | Description                                                                                                                                                                                                                                                                                                                                                                                   |
+========================+======================+===============+===============================================================================================================================================================================================================================================================================================================================================================================================+
| max_login_attempts     | Any positive integer | 50            | Set a maximum number of login attempts during a specified ``block_time`` number of seconds.                                                                                                                                                                                                                                                                                                   |
+------------------------+----------------------+---------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| block_time             | Any positive integer | 300           | Established period of time (in seconds) to attempt login requests. If the established number of requests (``max_login_attempts``) is exceeded within this time limit, the IP address is blocked until the end of the block time period.                                                                                                                                                       |
+------------------------+----------------------+---------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| max_request_per_minute | Any positive integer | 300           | The maximum number of requests allowed per minute. It applies to all Wazuh server API endpoints except for authentication requests. Reaching this limit in less than a minute blocks all incoming requests from any user for the remaining time. A value of ``0`` disables this feature. For ``POST /events`` requests, the effective value is ``30`` for values greater than 30.             |
+------------------------+----------------------+---------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+


upload_configuration
^^^^^^^^^^^^^^^^^^^^

.. versionadded:: 4.4.0

remote_commands (localfile and wodle "command")
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

+------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Sub-fields | Allowed values       | Default value | Description                                                                                                                                                                                                                                                                                                                                 |
+============+======================+===============+=============================================================================================================================================================================================================================================================================================================================================+
| allow      | yes, true, no, false | true          | Allow uploading configurations with remote commands through the Wazuh server API. Setting this option to ``false`` prevents uploading ``ossec.conf`` files that contain the :ref:`wodle "command" option <wodle_command>` or the ``<command>`` option inside the :ref:`localfile tag <reference_ossec_localfile>`.                          |
+------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| exceptions | command list         | [ ]           | Set a list of commands allowed to be uploaded through the API. These exceptions can always be uploaded regardless of the ``allow`` configuration.                                                                                                                                                                                           |
+------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

limits
~~~~~~

.. rubric:: eps
   :class: h5

.. versionadded:: 4.4.0

+------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Sub-fields | Allowed values       | Default value | Description                                                                                                                                                                                                                                                                                                                                 |
+============+======================+===============+=============================================================================================================================================================================================================================================================================================================================================+
| allow      | yes, true, no, false | true          | Allow uploading configurations with modified EPS limits through the Wazuh server API. Setting this option to ``false`` prevents uploading ``ossec.conf`` files if the ``<limits><eps>`` section inside the :ref:`global tag <reference_ossec_global>` has changed.                                                                          |
+------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

agents
~~~~~~

.. rubric:: allow_higher_versions
   :class: h5

.. versionadded:: 4.6.0

+------------+----------------------+---------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Sub-fields | Allowed values       | Default value | Description                                                                                                                                                                                                                                                                                                                                        |
+============+======================+===============+====================================================================================================================================================================================================================================================================================================================================================+
| allow      | yes, true, no, false | true          | Allow uploading configurations that accept higher agent versions through the Wazuh server API. Setting this option to ``false`` prevents uploading ``ossec.conf`` files that contain the ``<allow_higher_versions>`` section with the ``yes`` value inside the :ref:`auth <reference_ossec_auth>` or :ref:`remote <reference_ossec_remote>` tags.  |
+------------+----------------------+---------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

indexer
~~~~~~~

.. versionadded:: 4.8.0

+------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Sub-fields | Allowed values       | Default value | Description                                                                                                                                                                                                                                                                                                                                 |
+============+======================+===============+=============================================================================================================================================================================================================================================================================================================================================+
| allow      | yes, true, no, false | true          | Allows uploading an updated :doc:`indexer configuration section </user-manual/reference/ossec-conf/indexer>` through the Wazuh server API. Setting this option to ``false`` prevents updating the indexer configuration when uploading ``ossec.conf``.                                                                                      |
+------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

integrations
~~~~~~~~~~~~

.. versionadded:: 4.8.0

.. rubric:: virustotal (public_key)
   :class: h5

+-----------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Sub-fields      | Allowed values       | Default value | Description                                                                                                                                                                                                                                                                                                                                 |
+=================+======================+===============+=============================================================================================================================================================================================================================================================================================================================================+
| allow           | yes, true, no, false | true          | Allows uploading an updated :doc:`Virus Total integration configuration section </user-manual/reference/ossec-conf/integration>` using a public API key through the Wazuh server API. Setting this option to ``false`` prevents updating the integrations Virus Total configuration when uploading ``ossec.conf``.                          |
+-----------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| minimum_quota   | Any positive integer | 240           | Minimum quota value for Virus Total public API key.                                                                                                                                                                                                                                                                                         |
+-----------------+----------------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Wazuh server API security configuration
---------------------------------------

You can query and modify the security configuration, including ``auth_token_exp_timeout`` and ``rbac_mode`` settings, exclusively through the Wazuh server API endpoints: :api-ref:`GET /security/config <operation/api.controllers.security_controller.get_security_config>`, :api-ref:`PUT /security/config <operation/api.controllers.security_controller.put_security_config>`, and :api-ref:`DELETE /security/config <operation/api.controllers.security_controller.delete_security_config>`. The ``auth_token_exp_timeout`` defines the duration in seconds before an authentication token expires and requires renewal. The ``rbac_mode`` determines the overall behavior of the Role-Based Access Control system, which can be configured to either broadly permit or restrict access to resources and endpoints based on user roles and permissions. Refer to the :doc:`Role-Based Access Control <rbac/index>` documentation for more details. The configuration is applied to every Wazuh server API in a cluster if applicable.

For more information on each of the settings, please check the :ref:`security configuration options <api_security_configuration_options>`.

.. code-block:: none

   auth_token_exp_timeout: 900
   rbac_mode: white

.. warning::

   For security reasons, changing the security configuration revokes all JWTs. You will need to log in and obtain a new token after the change.

.. _api_security_configuration_options:

Security configuration options
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

auth_token_exp_timeout
~~~~~~~~~~~~~~~~~~~~~~
+-----------------------+---------------+---------------------------------------------------------+
| Allowed values        | Default value | Description                                             |
+=======================+===============+=========================================================+
| Any positive integer  | 900           | Set how many seconds it takes for JWT tokens to expire. |
+-----------------------+---------------+---------------------------------------------------------+

rbac_mode
~~~~~~~~~
+----------------+---------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Allowed values | Default value | Description                                                                                                                                                                                                                                                                                                                                                           |
+================+===============+=======================================================================================================================================================================================================================================================================================================================================================================+
| black,white    | white         | Set the behavior of RBAC. By default, everything is allowed in black mode while everything is denied in white mode. Choose the rbac_mode that better suits the desired RBAC infrastructure. In black mode it is very easy to deny a few specific action-resources pairs with just some policies while white mode is more secure and requires building from scratch.   |
+----------------+---------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Configuration endpoints
-----------------------

The Wazuh server API has several endpoints that allow querying its current configuration. To modify the general API configuration, edit the ``/var/ossec/api/configuration/api.yaml`` file as detailed in the :ref:`Wazuh server API configuration file <api_configuration_file>` section.

Get configuration
^^^^^^^^^^^^^^^^^

-  :api-ref:`GET /manager/api/config <operation/api.controllers.manager_controller.get_api_config>`: Get the complete local Wazuh server API configuration.
-  :api-ref:`GET /cluster/api/config <operation/api.controllers.cluster_controller.get_api_config>`: Get the complete Wazuh server API configuration of all (or a list) of the cluster nodes.
-  :api-ref:`GET /security/config <operation/api.controllers.security_controller.get_security_config>`: Get the current security configuration.

Modify configuration
^^^^^^^^^^^^^^^^^^^^

-  :api-ref:`PUT /security/config <operation/api.controllers.security_controller.put_security_config>`: Modify the security configuration.

Restore configuration
^^^^^^^^^^^^^^^^^^^^^

-  :api-ref:`DELETE /security/config <operation/api.controllers.security_controller.delete_security_config>`: Restore the default security configuration.

SSL certificate
---------------

.. note::

   This process is done automatically when the Wazuh server API is run for the first time.

The SSL certificate ensures secure communication between the Wazuh server API and its clients. The certificate files are stored within the ``/var/ossec/api/configuration/ssl/`` directory.

Take the following steps to generate new certificates for the Wazuh server API:

#. Generate the key and certificate request (the ``openssl`` package is required):

   .. code-block:: console

      # cd /var/ossec/api/configuration/ssl
      # openssl req -newkey rsa:2048 -new -nodes -x509 -days 365 -keyout server.key -out server.crt

   By default, the key's password must be entered every time the server is run. If the key was generated by the Wazuh server API or the command above, it would not have a password.

#. (Optional) Secure the key with a password:

   .. code-block:: console

      # ssh-keygen -p -f server.key

   You will be prompted to enter and confirm the new password.
