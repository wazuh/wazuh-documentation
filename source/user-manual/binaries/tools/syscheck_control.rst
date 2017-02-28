
.. _syscheck_control:

syscheck_control
================

The syscheck_control program provides an interface for managing and viewing the integrity checking database.

+--------------------------+---------------------------------------------------+
| Options                  | Descriptions                                      |
+==========================+===================================================+
| `-h`_                    | Display the help message                          |
+--------------------------+---------------------------------------------------+
| `-l`_                    | List available agents                             |
+--------------------------+---------------------------------------------------+
| `-lc`_                   | List only currently connected agents              |
+--------------------------+---------------------------------------------------+
| `-u`_                    | Update the database of the agents                 |
+--------------------------+---------------------------------------------------+
| `-i`_                    | Print database for the agent                      |
+--------------------------+---------------------------------------------------+
| `-r`_                    | List modified registry entries for windows agents |
+--------------------------+---------------------------------------------------+
| `-f`_                    | Print information about a modified file           |
+--------------------------+---------------------------------------------------+
| `-z`_                    | Used with `-f`_ to zero the auto-ignore counter   |
+--------------------------+---------------------------------------------------+
| `-d`_                    | Used with `-f`_ to ignore the file                |
+--------------------------+---------------------------------------------------+
| `-s`_                    | Change the output to CSV format                   |
+--------------------------+---------------------------------------------------+

``-h``
------

Display the help message.

``-l``
------

List available agents.

``-lc``
-------

List only the currently connected agents.

``-u``
------

Update the database for the identified or all agents.

.. topic:: Arguments

  ``-u <id>``

  ``-u all``

``-i``
------

Print the database for the agent.

.. topic:: Arguments

  ``-i <agent_id>``

``-r``
------

List the modified registry entries for the agent.

.. topic:: Arguments

  ``-r -i``

.. topic:: Supported installations

  Windows agents


``-f``
------

Used with -i to print information about a modified file.

.. topic:: Arguments

  ``-f <file>``


``-z``
------

Used with -f to zero the auto-ignore counter.

``-d``
------

Used with -f to ignore that file.

``-s``
------

Change the output to CSV format.
