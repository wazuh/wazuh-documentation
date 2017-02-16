
.. _syscheck_update:

syscheck_update
===============

Updates the integrity check database. This means that all information about files that were added to the integrity check database will be dismissed and leave an empty database which will be populated again the next time the syscheck daemon runs on agents or the server.

+---------+-------------------------------------+
| Options | Descriptions                        |
+=========+=====================================+
| `-h`_   | Display the help message            |
+---------+-------------------------------------+
| `-l`_   | List available agents               |
+---------+-------------------------------------+
| `-a`_   | Updates the database for all agents |
+---------+-------------------------------------+
| `-u`_   | Updates the databases               |
+---------+-------------------------------------+

``-h``
------

Display the help message.

``-l``
------

List available agents.

``-a``
------

Updates the database for all agents.

``-u``
------

Updates the database for the ``<agent_id>`` agent or the local database.

.. topic:: Arguments

  -u ``<agent_id>``

  -u ``local``
