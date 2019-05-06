.. Copyright (C) 2019 Wazuh, Inc.

.. _api-register-linux-unix:

Linux and UNIX hosts
====================

Open a session in your Linux/Unix agent host as root user. Then, follow these steps:

1. Add the agent to the manager.

  .. code-block:: console

    # curl -u foo:bar -k -X POST -d '{"name":"ubuntu-ag","ip":"10.0.0.8"}' -H 'Content-Type:application/json' "https://192.168.1.2:55000/agents?pretty"

  .. code-block:: json

    {
      "error": 0,
      "data": {
          "id": "001",
          "key": "MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM="
      }
    }

2. Import the key to the agent:

  .. code-block:: console

      # /var/ossec/bin/manage_agents -i MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM=

  .. warning::

      If you paste the command directly into the terminal, the agent key will be saved in the bash history. Use ``manage_agents`` without arguments or from a script.

3. Edit the Wazuh Agent configuration in ``/var/ossec/etc/ossec.conf`` to add the Wazuh Manager IP address. In the ``<client><server>`` section, change the *MANAGER_IP* value to the Wazuh Manager address:

  .. code-block:: xml

    <client>
      <server>
        <address>MANAGER_IP</address>
        ...
      </server>
    </client>

4. Start the agent.

  a) For Systemd:

    .. code-block:: console

      # systemctl start wazuh-agent

  b) For SysV Init:

    .. code-block:: console

      # service wazuh-agent start

  c) Other cases:

    .. code-block:: console

      # /var/ossec/bin/ossec-control start
