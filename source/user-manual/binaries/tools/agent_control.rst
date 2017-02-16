
.. _agent_control:

agent_control
=============

The agent_control tool allows you to query and get information from any agent you have configured
on your server and it also allows you to restart (run now) the syscheck/rootcheck scan on any agent.

Enabling active response will be necessary to start scans remotely and possibly other functions.

+--------------------------+------------------------------------------------+
| Options                  | Descriptions                                   |
+==========================+================================================+
| `-h`_                    | Display the help message                       |
+--------------------------+------------------------------------------------+
| `-l`_                    | List available agents                          |
+--------------------------+------------------------------------------------+
| `-lc`_                   | List active agents                             |
+--------------------------+------------------------------------------------+
| `-i`_                    | Extracts information from an agent             |
+--------------------------+------------------------------------------------+
| `-R <#control-restart>`__| Restarts the OSSEC processes on the agent      |
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

List available agents, active or not.

``-lc``
-------

List active agents


``-i``
------

Extracts information from an agent.

.. topic:: Arguments

  -i <agent_id>


.. _control-restart:

``-R``
------

Restarts the OSSEC processes on the agent.

.. topic:: Arguments

  -R <agent_id>

.. note::
   Requires active response to be enabled.

.. _control-check:

``-r``
------

Run the integrity/rootcheck checking on agents.  Must be utilized
with the option `-a`_ or `-u`_ .

.. note::
   Requires active response to be enabled.

``-a``
------

Utilizes all agents.


``-u``
------

<agent_id> that will perform the requested action.

.. topic:: Arguments

  -u <agent_id>
