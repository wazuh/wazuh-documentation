.. Copyright (C) 2018 Wazuh, Inc.

.. _fim_migrate:

fim_migrate
===========

.. versionadded:: 3.7.0

The *fim_migrate* tool allows to migrate FIM databases older than Wazuh v3.7.0 to the new format included in Wazuh-DB.

Usage
-----

This tool is not included in the Wazuh installation, but you can download it from the Wazuh repository on GitHub:

.. code-block:: console

    # curl -so fim_migrate https://raw.githubusercontent.com/wazuh/wazuh/v3.7.0/tools/migration/fim_migrate.py

Add execution permission and run this tool as follows:

.. code-block:: console

    # chmod +x fim_migrate

    # ./fim_migrate

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

    # ./fim_migrate.py

    2018-10-03 11:22:44 INFO     Connected to WazuhDB socket (/var/ossec/queue/db/wdb)
    2018-10-03 11:22:44 INFO     Upgrading FIM database for manager...
    2018-10-03 11:22:44 INFO     Added 6964 file entries in manager database.
    2018-10-03 11:22:46 INFO     [1/3] Upgrading FIM database for agent '001'...
    2018-10-03 11:22:47 INFO     [1/3] 10000 file entries processed...
    2018-10-03 11:22:48 INFO     [1/3] 20000 file entries processed...
    2018-10-03 11:22:49 INFO     [1/3] 30000 file entries processed...
    2018-10-03 11:22:49 INFO     [1/3] Added 30580 file entries in agent '001' database.
    2018-10-03 11:22:49 INFO     [2/3] Upgrading FIM database for agent '010'...
    2018-10-03 11:22:51 INFO     [2/3] 10000 file entries processed...
    2018-10-03 11:22:52 INFO     [2/3] 20000 file entries processed...
    2018-10-03 11:22:53 INFO     [2/3] 30000 file entries processed...
    2018-10-03 11:22:53 INFO     [2/3] Added 30849 file entries in agent '010' database.
    2018-10-03 11:22:53 INFO     [2/3] Upgrading FIM database (syscheck-registry) for agent '010'...
    2018-10-03 11:22:55 INFO     [2/3] Added 3824 registry entries in agent '010' database.
    2018-10-03 11:22:55 INFO     [3/3] Upgrading FIM database for agent '034'...
    2018-10-03 11:22:57 INFO     [3/3] Added 5643 registry entries in agent '034' database.
    2018-10-03 11:22:57 INFO     Finished.
