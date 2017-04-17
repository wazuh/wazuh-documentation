
.. _ossec-authd:

ossec-authd
===========

The ossec-authd program will automatically add an agent to a Wazuh manager and provide the key to the agent. The :ref:`agent-auth` application is the client application used with ``ossec-authd``.  ``ossec-authd`` creates an agent with an ip address of "any" instead of using its actual IP.

.. warning::

    By default there is no authentication or authorization involved in this transaction, so it is recommended that this daemon only be run when a new agent is being added.


+------------------+-------------------------------------------------------------------------------------------------------+
| **-D <dir>**     | Chroot to <dir>                                                                                       |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-d**           | Run in debug mode. This option may be repeated to increase the verbosity of the debug messages.       |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-f <seconds>** | Remove old agents with the same IP if they were not connected since <seconds> .                       |
|                  |                                                                                                       |
|                  | Must be used in conjunction with option -i. Option -f forces the registration even if the requesting  |
|                  |                                                                                                       |
|                  | agent’s IP address is already registered. In that case the old registration is deleted.               |
|                  |                                                                                                       |
|                  | This can include a minimum threshold for time since last check-in by the to-be-deleted registration   |
|                  |                                                                                                       |
|                  | or the threshold can be set to 0 to always delete/replace.                                            |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-g <group>**   | Run as a group.                                                                                       |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-h**           | Display the help message.                                                                             |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-i**           | Add agents with a specific IP address.                                                                |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-k <path>**    | Specifies the full path to the server key.                                                            |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-P**           | Enable shared password authentication.                                                                |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-p <port>**    | Listen on port.                                                                                       |
+                  +--------------------------------------------------------------------+----------------------------------+
|                  | Default value                                                      | 1515                             |
+------------------+--------------------------------------------------------------------+----------------------------------+
| **-t**           | Test configuration.                                                                                   |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-V**           | Display the version and license information                                                           |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-v <path>**    | Specifies the full path to the CA certificate used to verify clients.                                 |
+------------------+-------------------------------------------------------------------------------------------------------+
| **-x <path>**    | Specifies the full path to the server certificate.                                                    |
+------------------+-------------------------------------------------------------------------------------------------------+
