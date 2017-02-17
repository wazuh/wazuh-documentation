
.. _syscheck_control:

syscheck_control
================

``syscheck_control`` provides an interface for managing and viewing the integrity checking database.

+--------------------------+---------------------------------------------------+
| Options                  | Descriptions                                      |
+==========================+===================================================+
| `-h`_                    | Display the help message                          |
+--------------------------+---------------------------------------------------+
| `-l`_                    | List available agents                             |
+--------------------------+---------------------------------------------------+
| `-lc`_                   | List only currently connected agents              |
+--------------------------+---------------------------------------------------+
| `-u`_                    | Updates the database of the agents                |
+--------------------------+---------------------------------------------------+
| `-i`_                    | Prints database for the agent                     |
+--------------------------+---------------------------------------------------+
| `-r`_                    | List modified registry entries for windows agents |
+--------------------------+---------------------------------------------------+
| `-f`_                    | Prints information about a modified file          |
+--------------------------+---------------------------------------------------+
| `-z`_                    | With `-f`_ zeroes the auto-ignore counter         |
+--------------------------+---------------------------------------------------+
| `-d`_                    | With `-f`_ ignores the file                       |
+--------------------------+---------------------------------------------------+
| `-s`_                    | Changes the output to CSV format                  |
+--------------------------+---------------------------------------------------+

``-h``
------

Display the help message.

``-l``
------

List available agents.

``-lc``
-------

List only currently connected agents.

``-u``
------

Updates the database for the <id> agent or all of them.

.. topic:: Arguments

  ``-u <id>``

  ``-u all``

``-i``
------

Prints database for the agent.

.. topic:: Arguments

  ``-i <agent_id>``

``-r``
------

List modified registry entries for the agent.

.. topic:: Arguments

  ``-r -i``

.. topic:: Supported installations

  Windows agents


``-f``
------

Used with -i. Prints information about a modified file.

.. topic:: Arguments

  ``-f <file>``


``-z``
------

Used with -f, zeroes the auto-ignore counter.

``-d``
------

Used with -f, ignores that file.

``-s``
------

Changes the output to CSV format.
