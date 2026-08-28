.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-manager-authd program runs the Wazuh manager agent enrollment service, which registers Wazuh agents and generates client keys.

.. _wazuh_manager_authd:

wazuh-manager-authd
======================

The ``wazuh-manager-authd`` executable runs the Wazuh manager agent enrollment service.

The agent enrollment service registers Wazuh agents with the Wazuh manager and generates unique client keys for encrypted, authenticated communication between agents and the Wazuh manager.

By default, the service listens for agent enrollment requests on TCP port 1515. It supports additional security measures, including password authentication, Wazuh manager identity verification, and Wazuh agent identity verification.

For more information about agent enrollment and the available authentication methods, see the :doc:`Agent enrollment service </user-manual/manager/wazuh-manager-services>` section of the User Manual.

+------------------+----------------------------------------------------------------------------------------------+
| Option           | Description                                                                                  |
+==================+==============================================================================================+
| -a               | Negotiates the SSL/TLS method automatically. Without this option, only TLS 1.2 is used.      |
+------------------+----------------------------------------------------------------------------------------------+
| -B <bits>        | Specifies the size, in bits, of the generated certificate key.                               |
+------------------+----------------------------------------------------------------------------------------------+
| -c <ciphers>     | Specifies the SSL cipher list. The default is                                                |
|                  | HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH.                                          |
+------------------+----------------------------------------------------------------------------------------------+
| -C <days>        | Specifies the validity period, in days, of the generated certificate.                        |
+------------------+----------------------------------------------------------------------------------------------+
| -d               | Runs the daemon in debug mode. Repeat the option to increase the debug level.                |
+------------------+----------------------------------------------------------------------------------------------+
| -D <directory>   | Changes the working directory. The default is /var/wazuh-manager.                            |
+------------------+----------------------------------------------------------------------------------------------+
| -f               | Runs the daemon in the foreground.                                                           |
+------------------+----------------------------------------------------------------------------------------------+
| -g <group>       | Specifies the group under which the daemon runs. The default is wazuh-manager.               |
+------------------+----------------------------------------------------------------------------------------------+
| -h               | Displays the help message and exits.                                                         |
+------------------+----------------------------------------------------------------------------------------------+
| -k <path>        | Specifies the full path to the server private key. The default is etc/sslmanager.key.        |
+------------------+----------------------------------------------------------------------------------------------+
| -K <path>        | Specifies the path where the generated certificate key is stored.                            |
+------------------+----------------------------------------------------------------------------------------------+
| -p <port>        | Specifies the port used by the enrollment service. The default is 1515.                      |
+------------------+----------------------------------------------------------------------------------------------+
| -P               | Forces shared-password enrollment. This method is enabled by default. The password is read   |
|                  | from etc/authd.pass or generated automatically.                                              |
+------------------+----------------------------------------------------------------------------------------------+
| -s               | Enables source host verification. Use this option with -v.                                   |
+------------------+----------------------------------------------------------------------------------------------+
| -S <subject>     | Specifies the subject of the generated certificate.                                          |
+------------------+----------------------------------------------------------------------------------------------+
| -t               | Tests the configuration and exits.                                                           |
+------------------+----------------------------------------------------------------------------------------------+
| -v <path>        | Specifies the full path to the certificate authority certificate used to verify agents.      |
+------------------+----------------------------------------------------------------------------------------------+
| -V               | Displays version and license information.                                                    |
+------------------+----------------------------------------------------------------------------------------------+
| -x <path>        | Specifies the full path to the server certificate. The default is etc/sslmanager.cert.       |
+------------------+----------------------------------------------------------------------------------------------+
| -X <path>        | Specifies the path where the generated certificate is stored.                                |
+------------------+----------------------------------------------------------------------------------------------+
