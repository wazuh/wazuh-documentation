.. _manual_manage_agents:

manage_agents with forcing insertion
====================================

.. versionadded:: v1.0.4

.. seealso:: `OSSEC documentation: Managing agents`_

.. _`OSSEC documentation: Managing agents`: http://ossec-docs.readthedocs.org/en/latest/manual/agent/agent-management.html

Duplicated IPs are not longer allowed in OSSEC. ``manage_agents`` will fail on
adding agents with a specific IP if there is already another agent with the same
IP.

This application allows to force the insertion by removing the old agent. Such
forcing can be conditioned on the older agent's antiquity.

So we introduce a new option, ``-d <seconds>``, to perform this behavior.

Main options
------------

``manage_agents [-j] [-a <ip> -n <name>] [-d <seconds>]``

-j
-a <ip>
-n <name>
-d <secs>   Remove existing agents with duplicated IP if disconnected since <secs> seconds. With 0 it will remove every agent that collides.

.. note:: Option ``-d`` has only sense if agent is added with static IP (other than *any*).

Data backup
-----------

Before OSSEC removes an agent by forcing, it will backup the data about the old
agent at ``/backup/agents``, in a new folder with the agent's name and IP, and
the current timestamp. The saved data is the following:

- Agent's operating system.
- Version of the agent.
- Timestamp when it was added.
- Syscheck database.
- Rootcheck database.

.. seealso:: manual_reuse_id_
