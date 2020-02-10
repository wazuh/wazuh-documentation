.. Copyright (C) 2019 Wazuh, Inc.

.. _api-register-macos:

API registration for MacOS X hosts
==================================

Open a session in your MacOS X agent host as root user. Then, follow these steps:

1. Add the Wazuh agent to the Wazuh manager using following template:

  .. code-block:: console

    # curl -u <API-USER>:<API-PASSWORD> -k -X POST -d '{"name":"<AGENT-NAME>","ip":"<AGENT_IP>"}' -H 'Content-Type:application/json' "<https/http>://<MANAGER-IP>:55000/agents?pretty"

  An example API request looks as follows:

  .. code-block:: console

    # curl -u foo:bar -k -X POST -d '{"name":"macos-agent","ip":"10.0.0.8"}' -H 'Content-Type:application/json' "https://192.168.1.2:55000/agents?pretty"

  .. code-block:: json

    {
      "error": 0,
      "data": {
          "id": "001",
          "key": "MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM="
      }
    }

  For more information about API credentials and HTTPS support follow the :ref:`Wazuh API configuration<api_configuration>`.

2. Import the key to the agent:

  .. code-block:: console

      # /Library/Ossec/bin/manage_agents -i MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM=

  .. warning::

      If you paste the command directly into the terminal, the agent key will be saved in the bash history. Use ``manage_agents`` without arguments or from a script.

3. Edit the agent configuration in ``/Library/Ossec/etc/ossec.conf`` to add the Wazuh manager IP address in the ``<client><server>`` section:

  .. code-block:: xml

    <client>
      <server>
        <address>MANAGER_IP</address>
        ...
      </server>
    </client>

4. Start the agent.

  .. code-block:: console

    # /Library/Ossec/bin/ossec-control start
