.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-manager-apid program runs the Wazuh manager REST API service, which provides an HTTPS interface for managing the Wazuh platform.

.. _wazuh_manager_apid:

wazuh-manager-apid
=====================

The ``wazuh-manager-apid`` executable runs the Wazuh manager REST API service.

The Wazuh manager API provides an HTTPS REST interface for interacting with the Wazuh manager. It uses JSON Web Token (JWT) authentication and Role-Based Access Control (RBAC) to authenticate and authorize API requests.

The API enables applications, the Wazuh dashboard, and other clients to securely manage and monitor the Wazuh manager through REST endpoints.

+---------------+-------------------------------------------------------------------------------------------+
| Option        | Description                                                                               |
+===============+===========================================================================================+
| -c <config>   | Uses the specified configuration file.                                                    |
+---------------+-------------------------------------------------------------------------------------------+
| -d            | Enables debug messages. Repeat the option (for example, -dd) to increase the verbosity.   |
+---------------+-------------------------------------------------------------------------------------------+
| -f            | Runs the service in the foreground.                                                       |
+---------------+-------------------------------------------------------------------------------------------+
| -h, --help    | Displays the help message and exits.                                                      |
+---------------+-------------------------------------------------------------------------------------------+
| -r            | Runs the service as the root user.                                                        |
+---------------+-------------------------------------------------------------------------------------------+
| -t            | Tests the configuration.                                                                  |
+---------------+-------------------------------------------------------------------------------------------+
| -V            | Displays version information.                                                             |
+---------------+-------------------------------------------------------------------------------------------+
