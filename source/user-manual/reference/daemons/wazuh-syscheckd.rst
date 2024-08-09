.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-syscheckd program checks files for changes to the checksums, permissions and ownership. Learn more in this section. 

.. _wazuh-syscheckd:

wazuh-syscheckd
===============

The wazuh-syscheckd program checks configured files for changes to the checksums, permissions and ownership.  It is run using wazuh-control.

+-----------------+-------------------------------------------------------------------------------------------------+
| **-c <config>** | Run using <config> as the configuration file.                                                   |
+                 +-------------------------------------------+-----------------------------------------------------+
|                 | Default value                             | /var/ossec/etc/ossec.conf                           |
+-----------------+-------------------------------------------+-----------------------------------------------------+
| **-d**          | Run in debug mode. This option may be repeated to increase the verbosity of the debug messages. |
+-----------------+-------------------------------------------------------------------------------------------------+
| **-f**          | Run in the foreground.                                                                          |
+-----------------+-------------------------------------------------------------------------------------------------+
| **-h**          | Display the help message.                                                                       |
+-----------------+-------------------------------------------------------------------------------------------------+
| **-t**          | Test configuration.                                                                             |
+-----------------+-------------------------------------------------------------------------------------------------+
| **-V**          | Display the version and license information                                                     |
+-----------------+-------------------------------------------------------------------------------------------------+
