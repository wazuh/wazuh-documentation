.. _database_module:

Database Synchronization Module
===============================

.. warning::
	Move to internal options.

Introduction
------------

The Wazuh core uses list-based databases to store information related to agent keys and FIM / Rootcheck event data. Such information is highly optimized to be handled by the core.

In order to provide well-structured data that could be accessed by the user or the Wazuh API, new **SQLite-based databases** have been introduced on the Wazuh manager. The Database Synchronization Module is an **user-transparent component** that collects information from the core:

- Agent's name, address, encryption key, last connection time, operating system, agent version and shared configuration hash.
- FIM data: creation, modification and deletion of regular files and Windows registry entries.
- Rootcheck detected defects: issue message, first detection date and last alert time.
- Static core settings such maximum permitted agents or SSL enabling for Authd.

.. note::
    The Wazuh Database Synchronization Module starts automatically on server and local profiles, it doesn't need to be configured. Nevertheless you can do some optional settings. For more detailed information read the :ref:`reference manual <database_module_reference>`.

.. _database_module_reference:

Reference manual
----------------

The Wazuh Database Synchronization Module settings are at the file ``etc/internal_options.conf``:

wazuh_database.sync_agents
    | Synchronize agent database with client.keys.
    | Default value: 1

wazuh_database.sync_syscheck
    | Synchronize file integrity monitoring data with Syscheck database.
    | Default value: 1

wazuh_database.sync_rootcheck
    | Synchronize policy monitoring data with Rootcheck database.
    | Default value: 1

wazuh_database.full_sync
    | Full data synchronization. Allowed values:
    | **0**: Synchronize only new events (default).
    | **1**: Synchronize complete Syscheck/Rootcheck database. **This could take so much time.**

wazuh_database.sleep
    | Time interval, in seconds, to sleep between scan cycles (used only if *inotify* isn't supported).
    | Range: 0 - 86400 (1 day)
    | Default: 60 (1 minute)

The module uses *inotify* from Linux to monitor changes on every file in real-time. Databases will be updated as soon as possible when a change is detected. **If inotify is not supported** (for example, on operating systems other than Linux) every file will be scanned continuosly looking for changes, with a default delay of one minute between scans.

Changing setting values
^^^^^^^^^^^^^^^^^^^^^^^

In order to change any of these values, edit the file ``etc/local_internal_options.conf`` and write the option as appears at ``etc/internal_options.conf`` with the desired value.

For example, if you wish to enable full data synchronization, you should write on ``etc/local_internal_options.conf``::

    wazuh_database.full_sync=1

Then save that file and **restart Wazuh**.

How to disable the module
^^^^^^^^^^^^^^^^^^^^^^^^^

If you want to disable the Wazuh Database Synchronization Module, just set the sync directives to 0 at ``etc/local_internal_options.conf``::

    wazuh_database.sync_agents=0
    wazuh_database.sync_syscheck=0
    wazuh_database.sync_rootcheck=0

Then save that file and **restart Wazuh**. Next times that Wazuh starts the Database Synchronization Module won't be loaded.

.. warning::
    You should never modify the file ``etc/internal_options.conf`` since it will be overwritten by updates.
