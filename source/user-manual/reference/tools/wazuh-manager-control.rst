.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-manager-control tool manages the Wazuh manager services. Learn more about it in this section of the documentation.

.. _wazuh_manager_control:

wazuh-manager-control
========================

The ``wazuh-manager-control`` tool manages the Wazuh manager services.

Use this tool to start, stop, restart, enable, disable, or check the status of the Wazuh manager services. It can also display information about the current Wazuh manager installation.

Options
-------

+------+-----------------------------------------------+
| -j   | Displays the command output in JSON format.   |
+------+-----------------------------------------------+

Commands
--------

+-------------------+----------------------------------------------------------------------------------------------+
| Command           | Description                                                                                  |
+===================+==============================================================================================+
| start             | Starts the Wazuh manager services.                                                           |
+-------------------+----------------------------------------------------------------------------------------------+
| stop              | Stops the Wazuh manager services.                                                            |
+-------------------+----------------------------------------------------------------------------------------------+
| restart           | Restarts the Wazuh manager services.                                                         |
+-------------------+----------------------------------------------------------------------------------------------+
| status            | Displays the status of the Wazuh manager services.                                           |
+-------------------+----------------------------------------------------------------------------------------------+
| info [-v -r -t]   | Displays information about the Wazuh manager installation. Specify only one option to        |
|                   | display the version (-v), revision (-r), or installation type (-t).                          |
+-------------------+----------------------------------------------------------------------------------------------+
| enable debug      | Run all Wazuh daemons in debug mode.                                                         |
+-------------------+----------------------------------------------------------------------------------------------+
| disable debug     | Disables debug mode for all Wazuh manager daemons.                                           |
+-------------------+----------------------------------------------------------------------------------------------+

Examples
--------

Show status of Wazuh processes:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-control status

The command output looks similar to this:

.. code-block:: none
   :class: output

   wazuh-manager-clusterd is running...
   wazuh-manager-modulesd is running...
   wazuh-manager-monitord is running...
   wazuh-manager-remoted is running...
   wazuh-manager-analysisd is running...
   wazuh-manager-db is running...
   wazuh-manager-authd is running...
   wazuh-manager-apid is running...

Print the value of Wazuh version:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-control info -v

The command output looks similar to this:

.. code-block:: none
   :class: output

   v5.0.0
