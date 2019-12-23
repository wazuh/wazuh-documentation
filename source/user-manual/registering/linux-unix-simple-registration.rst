.. Copyright (C) 2019 Wazuh, Inc.

.. _linux-unix-simple-registration:

Linux and Unix hosts
====================

Open a session in your Linux/Unix agent host as a root user. After that, you can register the Wazuh agent using ``agent-auth`` program as follows:

1. On the agent, run the ``agent-auth`` program.
   It allows agent registration by simply providing the manager's IP address. In this case, as the agent’s name is not provided, the name is set automatically using hostname:

  .. code-block:: console

    # /var/ossec/bin/agent-auth -m <MANAGER_IP>

  You can set the agent's name by adding ``-A`` flag to the command:

  .. code-block:: console

     # /var/ossec/bin/agent-auth -m <MANAGER_IP> -A <AGENT_NAME>

  You can adjust the agent registration according to your requirements choosing from available :ref:`agent-auth` options.

2. Edit the agent configuration file. In ``/var/ossec/etc/ossec.conf``, in the ``<client><server>`` section, repalce the ``MANAGER_IP`` with the manager IP address:

  .. code-block:: xml

    <client>
      <server>
        <address>MANAGER_IP</address>
        ...
      </server>
    </client>

3. Start the agent.

  a) For Systemd:

    .. code-block:: console

      # systemctl start wazuh-agent

  b) For SysV Init:

    .. code-block:: console

      # service wazuh-agent start
