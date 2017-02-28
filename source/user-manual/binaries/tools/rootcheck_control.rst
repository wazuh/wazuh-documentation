
.. _rootcheck_control:

rootcheck_control
=================

The ``rootcheck_control`` tool allows for the management of the policy monitoring and system auditing database that is stored on the server side.

Anomalies detected by the rootcheck functionality can be listed, and categorized into resolved and outstanding issues.

This tool can also display the last time that ossec-rootcheck was run.

+--------------------------+--------------------------------------+
| Options                  | Descriptions                         |
+==========================+======================================+
| `-h`_                    | Display the help message             |
+--------------------------+--------------------------------------+
| `-l <#rootcheck-list>`__ | List available agents                |
+--------------------------+--------------------------------------+
| `-lc`_                   | List only currently connected agents |
+--------------------------+--------------------------------------+
| `-u`_                    | Update the database of the agents    |
+--------------------------+--------------------------------------+
| `-i`_                    | Print database for the agent         |
+--------------------------+--------------------------------------+
| `-r`_                    | Print the resolved issues            |
+--------------------------+--------------------------------------+
| `-q`_                    | Print the outstanding issues         |
+--------------------------+--------------------------------------+
| `-L <#rootcheck-scan>`__ | Print the last scan                  |
+--------------------------+--------------------------------------+
| `-s`_                    | Change the output to CSV format      |
+--------------------------+--------------------------------------+


``-h``
------

Display the help message.


.. _rootcheck-list:

``-l``
------

List the available agents.

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

Used with -i to print all the resolved issues.

``-q``
------

Used with -i to print all the outstanding issues.

.. _rootcheck-scan:

``-L``
------

Used with -i print the last scan.

``-s``
------

Change the output to CSV format.
