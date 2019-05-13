.. Copyright (C) 2019 Wazuh, Inc.

.. _macos-simple-registration:

MacOS X agents
==============

Open a session in your MacOS X agent host as root user. After that, you can register the Agent using ``agent-auth`` as follows:

1. On the agent, run the ``agent-auth`` program, using the manager's IP address.

  .. code-block:: console

    # /Library/Ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS>


2. Edit the Wazuh Agent configuration to add the Wazuh Manager IP address.

  In the file ``/Library/Ossec/etc/ossec.conf``, in the ``<client><server>`` section, change the *MANAGER_IP* value to the Wazuh Manager address:

  .. code-block:: xml

    <client>
      <server>
        <address>MANAGER_IP</address>
        ...
      </server>
    </client>

3. Start the agent.

  .. code-block:: console

    # /Library/Ossec/bin/ossec-control start