
.. _agent_control:

agent_control
=============

The agent_control program allows you to query the manager for information about any agent and also allows you to initiate a syscheck/rootcheck scan on an agent the next time it checks in.

+--------------------------+------------------------------------------------+
| Options                  | Descriptions                                   |
+==========================+================================================+
| `-h`_                    | Display the help message                       |
+--------------------------+------------------------------------------------+
| `-l`_                    | List available agents                          |
+--------------------------+------------------------------------------------+
| `-lc`_                   | List active agents                             |
+--------------------------+------------------------------------------------+
| `-i`_                    | Extract information from an agent              |
+--------------------------+------------------------------------------------+
| `-R <#control-restart>`__| Restart the Wazuh processes on the agent       |
+--------------------------+------------------------------------------------+
| `-r <#control-check>`__  | Run the integrity/rootcheck checking on agents |
+--------------------------+------------------------------------------------+
| `-a`_                    | Utilizes all agents                            |
+--------------------------+------------------------------------------------+
| `-u`_                    | Indicate the agent that will perform an action |
+--------------------------+------------------------------------------------+


``-h``
------

Display the help message.

``-l``
------

List available agents whether they are active or not.

``-lc``
-------

List active agents.


``-i``
------

Extract information from an agent.

.. topic:: Arguments

  ``-i <agent_id>``


.. _control-restart:

``-R``
------

Restart the Wazuh processes on the agent.

.. topic:: Arguments

  ``-R <agent_id>``


.. _control-check:

``-r``
------

Run the integrity/rootcheck checking on agents.  This must be used in conjunction with options `-a`_ or `-u`_ .


``-a``
------

Utilize all agents.


``-u``
------

Perform the requested action on the specified agent.

.. topic:: Arguments

  ``-u <agent_id>``
