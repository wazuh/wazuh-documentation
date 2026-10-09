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

+----------------+----------------------------------------------------------------------------------------------+
| Option         | Description                                                                                  |
+================+==============================================================================================+
| -c <ciphers>   | Specifies the list of TLS 1.3 cipher suites. The default is                                  |
|                | TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256. The daemon exits |
|                | if the value is not a valid list of TLS 1.3 cipher suites.                                   |
+----------------+----------------------------------------------------------------------------------------------+
| -d             | Runs the daemon in debug mode. Repeat the option to increase the debug level.                |
+----------------+----------------------------------------------------------------------------------------------+
| -D <directory> | Specifies the Wazuh manager installation directory used to build the default server          |
|                | certificate and key paths. The default is /var/wazuh-manager. This option does not change    |
|                | the working directory of the daemon.                                                         |
+----------------+----------------------------------------------------------------------------------------------+
| -f             | Runs the daemon in the foreground.                                                           |
+----------------+----------------------------------------------------------------------------------------------+
| -g <group>     | Specifies the group under which the daemon runs. The default is wazuh-manager.               |
+----------------+----------------------------------------------------------------------------------------------+
| -h             | Displays the help message and exits.                                                         |
+----------------+----------------------------------------------------------------------------------------------+
| -k <path>      | Specifies the full path to the server private key. The default is etc/certs/remoted-key.pem. |
+----------------+----------------------------------------------------------------------------------------------+
| -p <port>      | Specifies the port used by the enrollment service. The default is 1515.                      |
+----------------+----------------------------------------------------------------------------------------------+
| -P             | Forces shared-password enrollment on. The daemon itself has this method disabled by default, |
|                | but the configuration shipped by the installer enables it. The password is read from         |
|                | etc/authd.pass or generated automatically.                                                   |
+----------------+----------------------------------------------------------------------------------------------+
| -s             | Enables source host verification. Use this option with -v.                                   |
+----------------+----------------------------------------------------------------------------------------------+
| -t             | Tests the configuration and exits.                                                           |
+----------------+----------------------------------------------------------------------------------------------+
| -u <user>      | Specifies the user under which the daemon runs. The default is wazuh-manager.                |
+----------------+----------------------------------------------------------------------------------------------+
| -v <path>      | Specifies the full path to the certificate authority certificate used to verify agents.      |
+----------------+----------------------------------------------------------------------------------------------+
| -V             | Displays version and license information.                                                    |
+----------------+----------------------------------------------------------------------------------------------+
| -x <path>      | Specifies the full path to the server certificate. The default is etc/certs/remoted.pem.     |
+----------------+----------------------------------------------------------------------------------------------+

Enrollment token commands
-------------------------

The ``wazuh-manager-authd`` executable also manages enrollment tokens. Except for ``--show-token``, which decodes a token locally, these commands connect to the running daemon, so the agent enrollment service must be running. Create and revoke tokens only on the master node. Each invocation accepts only one of ``--create-enrollment-token``, ``--list-enrollment-tokens``, ``--revoke-enrollment-token``, ``--purge-enrollment-tokens``, or ``--show-token``.

+--------------------------------+----------------------------------------------------------------------------------------------+
| Option                         | Description                                                                                  |
+================================+==============================================================================================+
| --create-enrollment-token      | Creates an enrollment token for the host set in ``--address`` and prints the token on        |
|                                | standard output.                                                                             |
+--------------------------------+----------------------------------------------------------------------------------------------+
| --address <host>               | Used with ``--create-enrollment-token``, where it is required. Specifies the name or IP      |
|                                | address the Wazuh agents connect to. The value must be in the Subject Alternative Name (SAN) |
|                                | of the listener certificate.                                                                 |
+--------------------------------+----------------------------------------------------------------------------------------------+
| --port <N>                     | Used with ``--create-enrollment-token``. Specifies the listener port to write into the token |
|                                | when it differs from the configured one.                                                     |
+--------------------------------+----------------------------------------------------------------------------------------------+
| --prefix <P>                   | Used with ``--create-enrollment-token``. Specifies the URL prefix to write into the token    |
|                                | when it differs from the configured one.                                                     |
+--------------------------------+----------------------------------------------------------------------------------------------+
| --ttl <duration>               | Used with ``--create-enrollment-token``. Specifies the token lifetime as a positive duration |
|                                | such as 30d, 12h, 45m, or 90s. The default is 30 days.                                       |
+--------------------------------+----------------------------------------------------------------------------------------------+
| --max-uses <N>                 | Used with ``--create-enrollment-token``. Specifies the number of enrollments the token       |
|                                | allows. The default is unlimited.                                                            |
+--------------------------------+----------------------------------------------------------------------------------------------+
| --description <text>           | Used with ``--create-enrollment-token``. Specifies free text shown by                        |
|                                | ``--list-enrollment-tokens``.                                                                |
+--------------------------------+----------------------------------------------------------------------------------------------+
| --embed-ca                     | Used with ``--create-enrollment-token``. Includes the CA certificate in the token instead of |
|                                | its pin, so the Wazuh agent does not fetch ``/cacerts``.                                     |
+--------------------------------+----------------------------------------------------------------------------------------------+
| --no-credential                | Used with ``--create-enrollment-token``. Creates a public token without a credential. The    |
|                                | token carries only the address and the pin.                                                  |
+--------------------------------+----------------------------------------------------------------------------------------------+
| --list-enrollment-tokens       | Lists the enrollment tokens. The output never includes their credentials.                    |
+--------------------------------+----------------------------------------------------------------------------------------------+
| --revoke-enrollment-token <id> | Revokes the enrollment token with the given ID.                                              |
+--------------------------------+----------------------------------------------------------------------------------------------+
| --purge-enrollment-tokens      | Removes the tokens that can no longer authorize an enrollment because they are revoked,      |
|                                | expired, or out of uses.                                                                     |
+--------------------------------+----------------------------------------------------------------------------------------------+
| --all                          | Used with ``--purge-enrollment-tokens``. Removes every token instead, including the ones     |
|                                | still in use.                                                                                |
+--------------------------------+----------------------------------------------------------------------------------------------+
| --force                        | Used with ``--purge-enrollment-tokens``. Skips the confirmation prompt. This option is       |
|                                | required for ``--all`` when no terminal is available.                                        |
+--------------------------------+----------------------------------------------------------------------------------------------+
| --show-token[=<token>]         | Decodes a token and prints its content without its credential. The token is read from the    |
|                                | argument, from the file set in ``--token-file <path>``, or from standard input.              |
+--------------------------------+----------------------------------------------------------------------------------------------+
