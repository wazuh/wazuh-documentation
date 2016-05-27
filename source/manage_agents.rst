.. manage_agents:

Manage agents
====================================

.. versionadded:: v1.0.4

Introduction
---------------

We have introduced new features into ``manage_agents`` OSSEC binary to prevent adding two agents with the same IP address.

**manage_agents** will not allow us to add an Agent if the IP is assigned already to another agent, in that case it will generate a log and warn us about it.


Forcing insertion
------------------

In case you want to overwrite an existing agent, we have created a way to force the agent registration, option ``[-d <seconds>]`` will remove the old agent if it is disconnected since *<seconds>* value. Using ``0`` value will replace the agent in any case.

**Usage example**

Adding new agent called **MyNewAgent**, in case the IP **10.0.0.100** already exists, replace it if it was disconnected for the last 3600 seconds.

::

 /var/ossec/bin/manage_agents -a "10.0.0.100" -n "MyNewAgent" -d 3600



.. seealso::
    For a complete description of every manage_agents option, please read `OSSEC documentation: manage_agents`_.

    .. _`OSSEC documentation: manage_agents`: http://ossec-docs.readthedocs.org/en/latest/manual/agent/agent-management.html

Data backup
-----------

Before OSSEC removes an agent by forcing, it will backup the data of the old
agent in ``/backup/agents``, in a new folder with the agent's name and IP, and
the current timestamp. The saved data is the following:

- Agent's operating system.
- Version of the agent.
- Timestamp when it was added.
- Syscheck database.
- Rootcheck database.

.. seealso::
    There is a compile option that allows a new agent to **inherit the ID** of
    the agent that was removed by forcing insertion. To learn more about this,
    please read :ref:`manual_reuse_id`.
