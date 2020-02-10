.. Copyright (C) 2019 Wazuh, Inc.

.. _api-register-linux-unix:

API registration for Linux and UNIX hosts
=========================================

Open a session in your Linux/Unix agent host as a root user and follow these steps:

1. Add the Wazuh agent to the Wazuh manager using following template:

   .. code-block:: console

    # curl -u <API-USER>:<API-PASSWORD> -k -X POST -d '{"name":"<AGENT-NAME>","ip":"<AGENT_IP>"}' -H 'Content-Type:application/json' "<https/http>://<MANAGER_IP>:55000/agents?pretty"

   An example API request looks as follows:

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

   For more information about API credentials and HTTPS support follow the :ref:`Wazuh API configuration<api_configuration>`.

2. Import the key to the agent:

   .. code-block:: console

      # /var/ossec/bin/manage_agents -i MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM=

   .. warning::

      If you paste the command directly into the terminal, the agent key will be saved in the bash history. Use ``manage_agents`` without arguments or from a script.

3. Edit the agent configuration file. In ``/var/ossec/etc/ossec.conf``, in the ``<client><server>`` section, repalce the ``MANAGER_IP`` with the Wazuh manager IP address:

   .. code-block:: xml

    <client>
      <server>
        <address>MANAGER_IP</address>
        ...
      </server>
    </client>

4. Start the agent:

   a) For Systemd:

   .. code-block:: console

      # systemctl start wazuh-agent

   b) For SysV Init:

   .. code-block:: console

      # service wazuh-agent start
      
