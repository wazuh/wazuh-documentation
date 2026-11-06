.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The wazuh-manager-service-control tool restarts or reloads the Wazuh manager service. Learn more about it in this section of the documentation.

.. _wazuh_manager_service_control:

wazuh-manager-service-control
=============================

The ``wazuh-manager-service-control`` tool restarts or reloads the Wazuh manager service. The Wazuh manager API uses it for its restart and reload operations.

The tool is located at ``/var/wazuh-manager/bin/wazuh-manager-service-control``. It's available on Linux only, and it's installed set-user-ID root with owner ``root:wazuh-manager`` and mode ``4750``. Only root and the ``wazuh-manager`` user can run it.

Usage
-----

.. code-block:: none

   wazuh-manager-service-control {restart|reload}
   wazuh-manager-service-control -h

Commands
--------

+-------------+-------------------------------------------------------------------+
| Command     | Description                                                       |
+=============+===================================================================+
| ``restart`` | Restarts the Wazuh manager service.                               |
+-------------+-------------------------------------------------------------------+
| ``reload``  | Reloads the Wazuh manager while keeping agent connections active. |
+-------------+-------------------------------------------------------------------+

Options
-------

+--------+--------------------------------------+
| Option | Description                          |
+========+======================================+
| ``-h`` | Displays the help message and exits. |
+--------+--------------------------------------+

Restart and reload checks
-------------------------

When systemd manages the Wazuh manager, the tool first runs ``wazuh-manager-control check``, the checks that a start runs, while the Wazuh manager is still running. If the checks fail, the tool stops and the Wazuh manager keeps running. If they pass, the tool runs ``systemctl restart wazuh-manager.service`` or ``systemctl reload wazuh-manager.service``.

For ``reload``, the tool first waits up to 60 seconds for the service to be active or stopped. If the service is stopped or failed, the tool runs ``wazuh-manager-control reload`` without the checks.

Without systemd, the tool runs ``wazuh-manager-control restart`` or ``wazuh-manager-control reload``.

Exit codes
----------

The tool exits with ``1`` when it refuses the action, and prints ``wazuh-manager-service-control: <reason>`` on standard error. Otherwise it hands over to ``systemctl`` or ``wazuh-manager-control`` and exits with the code of that command. With ``-h``, it exits with ``0``.

+------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| Reason                                                                                   | Meaning                                                                                     |
+==========================================================================================+=============================================================================================+
| ``expected restart, reload, or -h``                                                      | The command line has no valid command.                                                      |
+------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| ``unauthorized caller``                                                                  | The caller isn't root or the ``wazuh-manager`` user.                                        |
+------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| ``service control is not installed set-user-ID``                                         | The tool lost its set-user-ID bit.                                                          |
+------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| ``unsafe privileged path ownership or permissions``                                      | The tool, the installation directory, its ``bin`` directory, ``wazuh-manager-control``,     |
|                                                                                          | ``bin/.process_list``, or ``systemctl`` isn't owned by root, or is writable by its group or |
|                                                                                          | by others.                                                                                  |
+------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| ``the manager configuration or credentials check failed; the manager was not restarted`` | The checks failed. The Wazuh manager keeps running. The check output is on standard error   |
|                                                                                          | and in the Wazuh manager log.                                                               |
+------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| ``cannot determine a safe manager service state``                                        | For ``reload``, the service didn't become active or stopped within 60 seconds, or its state |
|                                                                                          | couldn't be read.                                                                           |
+------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+

Examples
--------

Restart the Wazuh manager:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-service-control restart

When systemd manages the Wazuh manager, the command prints ``Configuration and credentials checks passed.`` before it hands over to systemd.

Reload the Wazuh manager and keep agent connections active:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-service-control reload
