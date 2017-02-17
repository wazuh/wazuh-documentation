.. _manual_data_backup:

Data backup
===========

Before Wazuh removes an agent by forcing, it will backup the data of the old
agent in ``/var/ossec/backup/agents/<id> <name> <ip> <delete timestamp>``, in a
new folder with the agent's name and IP, and the current timestamp. The saved data is the following:

- Agent's operating system.
- Version of the agent.
- Timestamp when it was added.
- Syscheck database.
- Rootcheck database.

.. seealso::
    There is a compile option that allows a new agent to **inherit the ID** of
    the agent that was removed by forcing insertion. To learn more about this,
    please read :ref:`manual_reuse_id`.
