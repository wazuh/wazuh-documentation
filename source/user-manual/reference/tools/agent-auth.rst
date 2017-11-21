
.. _agent-auth:

agent-auth
=============

The agent-auth program is the client application used with :ref:`ossec-authd` to automatically add agents to a Wazuh manager.

.. warning::

    By default there is no authentication or authorization involved in this transaction, so it is recommended that
    this daemon only be run when a new agent is being added.

+---------------------+-------------------------------------------------------------------------------+
| **-A <agent_name>** | Agent name to be used.                                                        |
+                     +---------------------------------------+---------------------------------------+
|                     | Default Value                         | hostname                              |
+---------------------+---------------------------------------+---------------------------------------+
| **-a**              | Auto negotiate the most secure common SSL/TLS method with the client.         |
+                     +-------------+-----------------------------------------------------------------+
|                     | **Default** | TLS v1.2 only (if supported by the server).                     |
+---------------------+-------------+-----------------------------------------------------------------+
| **-D**              | Directory where Wazuh is installed.                                           |
+                     +---------------------------------------+---------------------------------------+
|                     | Default Value                         | /var/ossec                            |
+---------------------+---------------------------------------+---------------------------------------+
| **-d**              | Run in debug mode, can be repeated to increase the verbosity of messages.     |
+---------------------+-------------------------------------------------------------------------------+
| **-g <group>**      | Run as a group.                                                               |
+---------------------+-------------------------------------------------------------------------------+
| **-h**              | Display the help message                                                      |
+---------------------+-------------------------------------------------------------------------------+
| **-k <path>**       | Display the full path to the agent key.                                       |
+---------------------+-------------------------------------------------------------------------------+
| **-m <manager_ip>** | IP address of the manager.                                                    |
+---------------------+-------------------------------------------------------------------------------+
| **-P <password>**   | Use the specified password instead of searching for it at ``authd.pass``.     |
|                     |                                                                               |
|                     |                                                                               |
|                     | If not provided in the file nor on the console,                               |
|                     |                                                                               |
|                     | the client will connect to the server without a password (insecure mode).     |
+---------------------+-------------------------------------------------------------------------------+
| **-p <port>**       | Port ossec-authd is running on.                                               |
+                     +---------------------------------------+---------------------------------------+
|                     | Default Value                         | 1515                                  |
+---------------------+---------------------------------------+---------------------------------------+
| **-c <ciphers>**    | SSL cipher list. The format of this parameter is described in `SSL ciphers`_. |
+                     +-------------+-----------------------------------------------------------------+
|                     | **Default** | HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH              |
+---------------------+-------------+-----------------------------------------------------------------+
| **-t**              | Test configuration.                                                           |
+---------------------+-------------------------------------------------------------------------------+
| **-V**              | Display version and license information.                                      |
+---------------------+-------------------------------------------------------------------------------+
| **-v <path>**       | Display the full path to the CA certificate used to verify the server.        |
+---------------------+-------------------------------------------------------------------------------+
| **-x <path>**       | Display the full path to the agent certificate.                               |
+---------------------+-------------------------------------------------------------------------------+

.. _`SSL ciphers`: https://www.openssl.org/docs/man1.1.0/apps/ciphers.html
