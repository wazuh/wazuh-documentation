.. _reference_wazuh_database:


Wazuh_database
==============


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

      This could take so much time


``wazuh_database.sleep``
------------------------

Time interval to sleep between cycles. It has to be used only if inotify is disabled.

.. topic:: Default value

  60

.. topic:: Allowed values

	Any integer from 0 to 86400 (seconds)
