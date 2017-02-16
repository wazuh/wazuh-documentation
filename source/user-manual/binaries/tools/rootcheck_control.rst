
.. _rootcheck_control:

rootcheck_control
=================

The rootcheck_control tool allows you to manage the policy monitoring and system auditing database that is stored on the server (manager) side.

You can list anomalies detected by the rootcheck functionality, categorized into resolved and outstanding issues.

Moreover you can find out when ossec-rootcheck was run the last time.

+--------------------------+--------------------------------------+
| Options                  | Descriptions                         |
+==========================+======================================+
| `-h`_                    | Display the help message             |
+--------------------------+--------------------------------------+
| `-l <#rootcheck-list>`__ | List available agents                |
+--------------------------+--------------------------------------+
| `-lc`_                   | List only currently connected agents |
+--------------------------+--------------------------------------+
| `-u`_                    | Updates the database of the agents   |
+--------------------------+--------------------------------------+
| `-i`_                    | Prints database for the agent        |
+--------------------------+--------------------------------------+
| `-r`_                    | Prints the resolved issues           |
+--------------------------+--------------------------------------+
| `-q`_                    | Prints the outstanding issues        |
+--------------------------+--------------------------------------+
| `-L <#rootcheck-scan>`__ | Prints the last scan                 |
+--------------------------+--------------------------------------+
| `-s`_                    | Changes the output to CSV format     |
+--------------------------+--------------------------------------+


``-h``
------

Display the help message.


.. _rootcheck-list:

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

  -u <id>

  -u all

``-i``
------

Prints database for the agent.

.. topic:: Arguments

  -i <agent_id>


``-r``
------

Used with -i, prints all the resolved issues.

``-q``
------

Used with -i, prints all the outstanding issues.

.. _rootcheck-scan:

``-L``
------

Used with -i, prints the last scan.

``-s``
------

Changes the output to CSV format.
