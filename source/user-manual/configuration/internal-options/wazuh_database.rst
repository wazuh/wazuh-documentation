.. _reference_wazuh_database:


Wazuh_database
==============

Introduction
------------

The Wazuh core uses list-based databases to store information related to agent keys and FIM / Rootcheck event data. Such information is highly optimized to be handled by the core.

In order to provide well-structured data that could be accessed by the user or the Wazuh API, new **SQLite-based databases** have been introduced in the Wazuh manager. The Database Synchronization Module is a **user-transparent component** that collects the following information from the core:

- Agent's name, address, encryption key, last connection time, operating system, agent version and shared configuration hash.
- FIM data: creation, modification and deletion of regular files and Windows registry entries.
- Rootcheck detected defects: issue message, first detection date and last alert time.
- Static core settings, such as maximum permitted agents or SSL being enabled for Authd.

.. note::
    The Wazuh Database Synchronization Module starts automatically on the server and local profiles and requires no configuration, however, some optional settings are available.

The module uses *inotify* from Linux to monitor changes to every log file in real-time. Databases will be updated as soon as possible when a change is detected. **If inotify is not supported**, (for example, on operating systems other than Linux) every log file will be scanned continuously, looking for changes, with a default delay of one minute between scans.

+----------------------------------+---------------+----------------------------------------------+
| Options                          | Default value | Allowed values                               |
+==================================+===============+==============================================+
| `wazuh_database.sync_agents`_    | 1             | 0, 1                                         |
+----------------------------------+---------------+----------------------------------------------+
| `wazuh_database.sync_syscheck`_  | 1             | 0, 1                                         |
+----------------------------------+---------------+----------------------------------------------+
| `wazuh_database.sync_rootcheck`_ | 1             | 0, 1                                         |
+----------------------------------+---------------+----------------------------------------------+
| `wazuh_database.full_sync`_      | 0             | 0, 1                                         |
+----------------------------------+---------------+----------------------------------------------+
| `wazuh_database.sleep`_          | 60            | Any integer from 0 to 86400 (seconds)        |
+----------------------------------+---------------+----------------------------------------------+


How to disable the module
^^^^^^^^^^^^^^^^^^^^^^^^^

To disable the Wazuh Database Synchronization Module, the sync directives must be set to 0 in the ``etc/local_internal_options.conf`` file as shown below::

    wazuh_database.sync_agents=0
    wazuh_database.sync_syscheck=0
    wazuh_database.sync_rootcheck=0

Once these settings have been adjusted, save the file and **restart Wazuh**.  With the above settings, the Database Synchronization Module will not be loaded when Wazuh starts.


``wazuh_database.sync_agents``
------------------------------

Synchronize agent database with client.keys.

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable

``wazuh_database.sync_syscheck``
--------------------------------

Synchronize file integrity monitoring data with Syscheck database.

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable


``wazuh_database.sync_rootcheck``
---------------------------------

Synchronize policy monitoring data with Rootcheck database.

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable

``wazuh_database.full_sync``
----------------------------

Full data synchronization.

.. topic:: Default value

  0

.. topic:: Allowed values

	1
		Synchronize only new events
	0
		Synchronize complete Syscheck/Rootcheck database

    .. warning:

      Full data syncronization could take some time to complete. 


``wazuh_database.sleep``
------------------------

Time interval to sleep between cycles. This option is only necessary when *inotify* is not available.

.. topic:: Default value

  60

.. topic:: Allowed values

	Any integer from 0 to 86400 (seconds)
