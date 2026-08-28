.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-manager-db program runs the Wazuh manager database service, which manages the manager's local databases.

.. _wazuh_manager_db:

wazuh-manager-db
===================

The ``wazuh-manager-db`` executable runs the Wazuh manager database service.

The manager database service manages the local databases used by the Wazuh manager. It provides storage and retrieval of manager and agent information for internal Wazuh components and services.

+----------+---------------------------------------------------------------------------------+
| Option   | Description                                                                     |
+==========+=================================================================================+
| -d       | Runs the daemon in debug mode. Repeat the option to increase the debug level.   |
+----------+---------------------------------------------------------------------------------+
| -f       | Runs the daemon in the foreground.                                              |
+----------+---------------------------------------------------------------------------------+
| -h       | Displays the help message and exits.                                            |
+----------+---------------------------------------------------------------------------------+
| -t       | Tests the configuration and exits.                                              |
+----------+---------------------------------------------------------------------------------+
| -V       | Displays version and license information.                                       |
+----------+---------------------------------------------------------------------------------+
