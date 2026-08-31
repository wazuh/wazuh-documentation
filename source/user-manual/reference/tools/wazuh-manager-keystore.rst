.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-manager-keystore tool stores sensitive configuration values for the Wazuh manager. Learn more about it in this section of the documentation.

.. _wazuh_manager_keystore:

wazuh-manager-keystore
=========================

The ``wazuh-manager-keystore`` tool stores sensitive configuration values for the Wazuh manager.

Use this tool to securely store key-value pairs used by Wazuh components, such as credentials and connection settings.

Options
-------

+----------------------+----------------------------------------------------------------------------------------------+
| Option               | Description                                                                                  |
+======================+==============================================================================================+
| -f <column_family>   | Specifies the target column family.                                                          |
+----------------------+----------------------------------------------------------------------------------------------+
| -h                   | Displays the help message and exits.                                                         |
+----------------------+----------------------------------------------------------------------------------------------+
| -k <key>             | Specifies the key.                                                                           |
+----------------------+----------------------------------------------------------------------------------------------+
| -v <value>           | Specifies the value associated with the key.                                                 |
+----------------------+----------------------------------------------------------------------------------------------+
| -vp <path>           | Reads the value from the specified file. If neither -v nor -vp is provided, the value is     |
|                      | read from standard input.                                                                    |
+----------------------+----------------------------------------------------------------------------------------------+

You can use only one of the options ``-v`` or ``-vp`` at a time. If neither is specified, the tool reads the value from standard input.

When using ``-vp``, the file must contain a single line with the value.
