.. Copyright (C) 2019 Wazuh, Inc.

.. _api-register-windows:

Windows hosts
=============

To register the Windows Agent, you need to start a CMD or a Powershell as **Administrator**. The installation directory of the Wazuh Agent in Windows host depends on the architecture of the host.

	- ``C:\Program Files (x86)\ossec-agent`` for ``x86_64`` hosts.
	- ``C:\Program Files\ossec-agent`` for ``x64`` hosts.

This guide suppose that the Wazuh Agent is installed in a ``x86_64`` host, so the installation path will be: ``C:\Program Files (x86)\ossec-agent``.

1. Add the agent to the manager.

  .. code-block:: console

    # To do

  .. code-block:: json

    {
      "error": 0,
      "data": {
          "id": "001",
          "key": "MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM="
      }
    }

2. Import the key using ``manage_agents``:

	  .. code-block:: console

	      # 'C:\Program Files (x86)\ossec-agent\manage_agents' -i MDAxIG1hY29zLW1vamF2ZSBhbnkgZjcwMTI0MjQ5NDMwNzA3N2IyN2NlZjRmZDQ1NzlmYzkwYzcyMzcyZDMxMTM5ZTBkZjZiYzdmODMyODBjZjA4YQ

	      Agent information:
	         ID:001
	         Name:windows-server
	         IP Address:any

	      Confirm adding it?(y/n): y
	      Added.

3. Edit the Wazuh agent configuration to add the Wazuh manager IP address.

  In the file ``C:\Program Files (x86)\ossec-agent\ossec.conf``, in the ``<client><server>`` section, change the *MANAGER_IP* value to the Wazuh manager address:

  .. code-block:: xml

    <client>
      <server>
        <address>MANAGER_IP</address>
        ...
      </server>
    </client>

4. Start the agent.

	a) Using Powershell with administrator access:

		.. code-block:: console

			# Restart-Service -Name wazuh

	b) Using Windows cmd with administrator access:

		.. code-block:: console

			# net stop wazuh
			# net start wazuh
