.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how the ``wazuh-authd`` program can automatically add a Wazuh agent to a Wazuh manager and provide the key to the agent in this section.

.. _wazuh-authd:

wazuh-authd
===========

.. versionadded:: 4.2

The ``wazuh-authd`` program can automatically add a Wazuh agent to a Wazuh manager and provide the key to the agent. It's used along with the ``agent-auth`` application. The program creates an agent with an IP address of ``any`` instead of using a specific IP address.

.. warning::
  By default, there is no authentication or authorization involved in this transaction, so it is recommended that this daemon only be run when a new agent is being added.


``wazuh-authd`` is able to generate X.509 certificates used for manager verification. `OpenSSL` is not required.   

The certificate parameters are specified in the CLI:

   .. code-block:: console

     # wazuh-authd -C 265 -B 2048 -K /var/ossec/etc/sslmanager.key -X /var/ossec/etc/sslmanager.cert -S "/C=US/ST=California/CN=wazuh/"

If any of the parameters related to the certificate generation is missing, an error is triggered and the certificates are not generated.

+------------------+-------------------------------------------------------------------------------------------------------+
| **-V**           | Version and license message.                                                                          |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-h**           | This help message.                                                                                    |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-d**           | Debug mode. Use this parameter multiple times to increase the debug level.                            |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-t**           | Test configuration.                                                                                   |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-f**           | Run in foreground.                                                                                    |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-g <group>**   | Group to run as.                                                                                      |
+                  +-------------+-----------------------------------------------------------------------------------------+
|                  | **Default** | wazuh                                                                                   |
+------------------+-------------+-----------------------------------------------------------------------------------------+
| **-D <dir>**     | Directory to chroot into.                                                                             |
+                  +-------------+-----------------------------------------------------------------------------------------+
|                  | **Default** | /var/ossec                                                                              |
+------------------+-------------+-----------------------------------------------------------------------------------------+
| **-p <port>**    | Manager port.                                                                                         |
+                  +-------------+-----------------------------------------------------------------------------------------+
|                  | **Default** | 1515                                                                                    |
+------------------+-------------+-----------------------------------------------------------------------------------------+
| **-P**           | Enable shared password authentication, at ``etc/authd.pass`` or random.                               |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-c <ciphers>** | SSL cipher list. The format of this parameter is described in `SSL ciphers`_.                         |
+                  +-------------+-----------------------------------------------------------------------------------------+
|                  | **Default** | HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH                                      |
+------------------+-------------+-----------------------------------------------------------------------------------------+
| **-v <path>**    | Path to CA certificate used to verify clients.                                                        |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-s**           | Used with -v, enable source host verification.                                                        |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-x <path>**    | Path to server certificate.                                                                           |
+                  +-------------+-----------------------------------------------------------------------------------------+
|                  | **Default** | etc/sslmanager.cert.                                                                    |
+------------------+-------------+-----------------------------------------------------------------------------------------+
| **-k <path>**    | Path to server key.                                                                                   |
+                  +-------------+-----------------------------------------------------------------------------------------+
|                  | **Default** | etc/sslmanager.key.                                                                     |
+------------------+-------------+-----------------------------------------------------------------------------------------+
| **-a**           | Auto negotiate the most secure common SSL/TLS method with the client.                                 |
+                  +-------------+-----------------------------------------------------------------------------------------+
|                  | **Default** | TLS v1.2 only (if supported by the server).                                             |
+------------------+-------------+-----------------------------------------------------------------------------------------+
| **-L**           | Force insertion even though agent limit has been reached.                                             |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-C**           | Specify the number of days the certificate is valid for.                                              |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-B**           | Set the X.509 certificate key size in bits.                                                           |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-K**           | Path to store the X.509 certificate key.                                                              |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-X**           | Path to store the X.509 certificate.                                                                  |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-S**           | Subject of the X.509 certificate. The arg must be formatted as /type0=value0/type1=value1/type2=..    |
+------------------+-------------------------------------------------------------------------------------------------------+

.. note::
  Paths can be referred to as relative paths under the Wazuh installation directory or full paths.

.. _`SSL ciphers`: https://www.openssl.org/docs/man1.1.1/man1/ciphers.html
