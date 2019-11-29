.. Copyright (C) 2019 Wazuh, Inc.

.. _linux-unix-simple-registration:

Linux and Unix hosts
====================

Open a session in your Linux/Unix agent host as root user. After that, you can register the agent using ``agent-auth`` as follows:

1. On the agent, run the ``agent-auth`` program.
   It allows agent registration by simply providing the manager's IP address. In this case, as we do not specify the agent's name, the name will be set automatically using hostname:

  .. code-block:: console

    # /var/ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS>

  You can set the agent's name by adding ``-A`` parameter to the command:

  .. code-block:: console

     # /var/ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS> -A <AGENT_NAME>

  You can adjust the agent registration according to your requirements choosing from available :ref:`agent-auth` options.

2. Edit the agent configuration to add the manager IP address.

  In the file ``/var/ossec/etc/ossec.conf`` located on the agent, in the ``<client><server>`` section, change the *MANAGER_IP* value to the Wazuh server IP address:

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

  c) Other cases:

    .. code-block:: console

      # /var/ossec/bin/ossec-control start
