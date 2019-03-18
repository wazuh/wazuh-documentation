.. Copyright (C) 2018 Wazuh, Inc.

.. _restful-api-register:

Using the Wazuh API
-------------------

Two requests are needed to register an agent using the API:

    - POST /agents :ref:`(reference) <api_reference>`
    - PUT /agents/:agent_name :ref:`(reference) <api_reference>`

1. Add the agent to the manager.

  .. code-block:: console

    # curl -u foo:bar -k -X POST -d '{"name":"NewAgent","ip":"10.0.0.8"}' -H 'Content-Type:application/json' "https://127.0.0.1:55000/agents?pretty"
    {
      "error": 0,
      "data": {
          "id": "001",
          "key": "MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM="
      }
    }

2. Copy the key to the agent.

  .. code-block:: console

      # /var/ossec/bin/manage_agents -i MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM=

  .. warning::

      If you paste the command directly into the terminal, the agent key will be saved in the bash history. Use ``manage_agents`` without arguments or from a script.

3. Edit the Wazuh agent configuration in ``/var/ossec/etc/ossec.conf`` to add the Wazuh manager IP address. In the ``<client><server>`` section, change the ``MANAGER_IP`` value to the Wazuh manager address:

  .. code-block:: xml

    <client>
      <server>
        <address>MANAGER_IP</address>
        ...
      </server>
    </client>

  or:

  .. code-block:: bash

    # sed -i 's/MANAGER_IP/NEW_MANAGER_IP/g' /var/ossec/etc/ossec.conf


4. Restart the agent.

  a. For Systemd:

    .. code-block:: console

      # systemctl restart wazuh-agent

  b. For SysV Init:

    .. code-block:: console

      # service wazuh-agent restart

We have prepared a few scripts in different programming languages to help with the task of registering an agent with the API:

    - `Register an agent using a shell script <https://raw.githubusercontent.com/wazuh/wazuh-api/3.9/examples/api-register-agent.sh>`_.
    - `Register an agent using a Python script <https://raw.githubusercontent.com/wazuh/wazuh-api/3.9/examples/api-register-agent.py>`_.
    - `Register an agent using a PowerShell script <https://raw.githubusercontent.com/wazuh/wazuh-api/3.9/examples/api-register-agent.ps1>`_.
