.. Copyright (C) 2020 Wazuh, Inc.

.. _fim_migrate:

fim_migrate
===========

The *fim_migrate* tool allows to migrate FIM databases older than Wazuh v3.7.0 to the new format included in Wazuh-DB. This tool must be executed after the :ref:`upgrading process <upgrading_wazuh>` has been completed.

.. note::
    The new database will be available at ``/var/ossec/queue/db``.

Usage
-----

This tool is not included in the Wazuh installation, but you can download it from the Wazuh repository on GitHub:

.. code-block:: console

    # curl -so fim_migrate https://raw.githubusercontent.com/wazuh/wazuh/3.8/tools/migration/fim_migrate.py

Add execution permission and run this tool on the manager instance as follows:

.. code-block:: console

    # chmod +x fim_migrate

    # ./fim_migrate

.. warning::
    After completing the migration process, the old FIM databases won't be removed automatically. To do so, remove the ``/var/ossec/queue/syscheck`` folder.

Options
-------

+--------------------------+----------------------------------------------------------------------------------------+
| Option name              | Option description                                                                     |
+==========================+========================================================================================+
| ``-h``                   | Display the help message.                                                              |
+--------------------------+----------------------------------------------------------------------------------------+
| ``-p <path>``            | Change the default installation path *(/var/ossec)*.                                   |
+--------------------------+----------------------------------------------------------------------------------------+
| ``-f``                   | Force insertion. By default, the tool checks if the file or registry is already added  |
|                          | and skips the insertion. Using this option, the tool adds and overwrites the entry.    |
+--------------------------+----------------------------------------------------------------------------------------+
| ``-q``                   | Quiet mode.                                                                            |
+--------------------------+----------------------------------------------------------------------------------------+
| ``-d``                   | Debug mode.                                                                            |
+--------------------------+----------------------------------------------------------------------------------------+

Example of use
--------------

.. code-block:: console

    # ./fim_migrate

.. code-block:: none
    :class: output

    2018-10-25 15:18:20 [INFO] Upgrading FIM database for manager...
    2018-10-25 15:18:20 [INFO] Added 4734 file entries in manager database.
    2018-10-25 15:18:20 [INFO] [1/3] Upgrading FIM database for agent '001'...
    2018-10-25 15:18:20 [INFO] [1/3] Added 16 file entries in agent '001' database.
    2018-10-25 15:18:20 [INFO] [1/3] Upgrading FIM database (syscheck-registry) for agent '001'...
    2018-10-25 15:18:21 [INFO] [1/3] Added 4627 registry entries in agent '001' database.
    2018-10-25 15:18:21 [INFO] [2/3] Upgrading FIM database for agent '002'...
    2018-10-25 15:18:22 [INFO] [2/3] Added 3121 file entries in agent '002' database.
    2018-10-25 15:18:22 [INFO] [3/3] Upgrading FIM database for agent '003'...
    2018-10-25 15:18:22 [INFO] [3/3] Added 3 file entries in agent '003' database.
    2018-10-25 15:18:22 [INFO] [3/3] Upgrading FIM database (syscheck-registry) for agent '003'...
    2018-10-25 15:18:22 [INFO] [3/3] Added 4611 registry entries in agent '003' database.
    2018-10-25 15:18:22 [INFO] Finished.
