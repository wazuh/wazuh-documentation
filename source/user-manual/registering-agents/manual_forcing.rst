.. _manual_forcing:


Forcing insertion
------------------

In case you want to overwrite an existing agent you can use the ``-d`` option. :ref:`Reference <manage_agents>`

**Usage example**

Adding new agent called **MyNewAgent**, in case the IP **10.0.0.100** already exists, replace it if it was disconnected for the last 3600 seconds.

::

 /var/ossec/bin/manage_agents -a "10.0.0.100" -n "MyNewAgent" -d 3600

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
