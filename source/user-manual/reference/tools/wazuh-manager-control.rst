.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-manager-control tool manages the Wazuh manager services. Learn more about it in this section of the documentation.

.. _wazuh_manager_control:

wazuh-manager-control
========================

The ``wazuh-manager-control`` tool manages the Wazuh manager services.

Use this tool to start, stop, restart, reload, enable, disable, or check the status of the Wazuh manager services. It can also display information about the current Wazuh manager installation.

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
| reload            | Restarts all Wazuh manager daemons except ``wazuh-manager-remoted``, which keeps running.    |
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
| help              | Displays the usage message.                                                                  |
+-------------------+----------------------------------------------------------------------------------------------+

Start checks
------------

Before it starts any daemon, the ``start``, ``restart``, and ``reload`` commands run these checks, in this order, and stop at the first failure:

#. The configuration file: XML syntax, schema, and the rules between options (``wazuh-manager-conf --skip-file-checks validate``). Error 20.
#. The credentials, read-only (``wazuh-manager-resolve-credentials --check``). Error 22 when an entry is unsafe or invalid, or when the check can't run. Error 21 when something is missing.
#. The files the configuration names, and each daemon's own configuration test (``-t``). Error 20.
#. The credentials step that completes what's missing, such as the keystore or an import from the Wazuh indexer (``wazuh-manager-resolve-credentials --prestart``). Error 21.

On ``restart``, the first three checks run before anything is stopped, so a refused restart leaves the running daemons as they are.

The error numbers appear only in the JSON output, when ``-j`` is the first argument, for example ``{"error":21,"message":"Unresolved credentials."}``. Without ``-j``, the tool prints a message such as ``Unresolved credentials. Exiting``. In both cases it exits with status 1, and it writes the reason to ``/var/wazuh-manager/logs/wazuh-manager.log``.

-  ``status`` exits with 1 when a daemon is not running. It can also report that a daemon refused its configuration or failed to start.
-  ``wazuh-manager-apid`` is listed and started only on a master node. ``wazuh-manager-authd`` is skipped when ``<auth><disabled>`` is ``yes``.
-  ``enable debug`` and ``disable debug`` take effect at the next start.
-  ``help`` exits with 1.

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
