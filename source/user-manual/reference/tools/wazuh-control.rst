.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-control tool manages the Wazuh agent services. Learn more about it in this section of the documentation.

.. _wazuh_control:

wazuh-control
=============

The ``wazuh-control`` tool manages the Wazuh agent services.

Use this tool to start, stop, restart, reload, or check the status of the Wazuh agent services. It can also display information about the current Wazuh agent installation.

Commands
--------

+-------------------+----------------------------------------------------------------------------------------------+
| Command           | Description                                                                                  |
+===================+==============================================================================================+
| start             | Starts the Wazuh agent services.                                                             |
+-------------------+----------------------------------------------------------------------------------------------+
| stop              | Stops the Wazuh agent services.                                                              |
+-------------------+----------------------------------------------------------------------------------------------+
| restart           | Restarts the Wazuh agent services.                                                           |
+-------------------+----------------------------------------------------------------------------------------------+
| reload            | Reloads the Wazuh agent configuration.                                                       |
+-------------------+----------------------------------------------------------------------------------------------+
| status            | Displays the status of the Wazuh agent services.                                             |
+-------------------+----------------------------------------------------------------------------------------------+
| info [-v -r -t]   | Displays information about the Wazuh agent installation. Specify only one option to display  |
|                   | the version (-v), revision (-r), or installation type (-t).                                  |
+-------------------+----------------------------------------------------------------------------------------------+
| enable debug      | Run all Wazuh daemons in debug mode.                                                         |
+-------------------+----------------------------------------------------------------------------------------------+
| disable debug     | Disables debug mode for all Wazuh agent daemons.                                             |
+-------------------+----------------------------------------------------------------------------------------------+

Examples
--------

Show status of Wazuh processes:

.. code-block:: console

   # /var/ossec/bin/wazuh-control status

The command output looks similar to this:

.. code-block:: none
   :class: output

   wazuh-modulesd is running...
   wazuh-logcollector is running...
   wazuh-syscheckd is running...
   wazuh-agentd is running...
   wazuh-execd is running...

Print the value of Wazuh version:

.. code-block:: console

   # /var/ossec/bin/wazuh-control info -v

The command output looks similar to this:

.. code-block:: none
   :class: output

   v5.0.0
