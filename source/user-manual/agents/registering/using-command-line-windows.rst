.. Copyright (C) 2019 Wazuh, Inc.

.. _command-line-register-windows:

Using the CLI in Windows hosts
==============================

To register an agent using the command line, first follow the steps from the **Manager** section and then, from the **Agent** section.

Manager
^^^^^^^
1. In the CLI of the Wazuh Manager host, we will run ``manage_agents`` to add the agent. In this example, we are going to add a new agent. Its name will be ``windows-server`` and its address or IP is ``any``.

	.. code-block:: console

		# /var/ossec/bin/manage_agents -a any -n windows-server

2. Now, list the agents to get the ID of the ``windows-server`` agent:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -l

		Available agents:
		    ID: 001, Name: windows-server, IP: any

3. Using the ID from the previous command, extract the new agent’s key using. Copy this key because you will need it for the agent:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -e 001

		Agent key information for '001' is:
		MDAxIG1hY29zLW1vamF2ZSBhbnkgZjcwMTI0MjQ5NDMwNzA3N2IyN2NlZjRmZDQ1NzlmYzkwYzcyMzcyZDMxMTM5ZTBkZjZiYzdmODMyODBjZjA4YQ==

Agent
^^^^^
Once you have added the agent in the Wazuh Manager host, open a session in your Windows agent host and then, start a CMD or a Powershell as **Administrator**. The installation directory of the Wazuh Agent in Windows host depends on the architecture of the host.

	- ``C:\Program Files (x86)\ossec-agent`` for ``x86_64`` hosts.
	- ``C:\Program Files\ossec-agent`` for ``x64`` hosts.

This guide suppose that the Wazuh Agent is installed in a x86_64 host, so the installation path will be: ``C:\Program Files (x86)\ossec-agent``. After that, let's import the key and connect the agent to the manager.

1. First, import the key using ``manage_agents``:

	  .. code-block:: console

	      # 'C:\Program Files (x86)\ossec-agent\manage_agents' -i MDAxIG1hY29zLW1vamF2ZSBhbnkgZjcwMTI0MjQ5NDMwNzA3N2IyN2NlZjRmZDQ1NzlmYzkwYzcyMzcyZDMxMTM5ZTBkZjZiYzdmODMyODBjZjA4YQ

	      Agent information:
	         ID:001
	         Name:windows-server
	         IP Address:any

	      Confirm adding it?(y/n): y
	      Added.


2. Edit the Wazuh agent configuration in ``C:\Program Files (x86)\ossec-agent\ossec.conf`` to add the Wazuh manager IP address. In the ``<client><server>`` section, change the ``MANAGER_IP`` value to the Wazuh manager address. The address of the Wazuh Manager can be an IP address or a DNS name:

	.. code-block:: xml

		<client>
		  <server>
		    <address>MANAGER_IP</address>
		    ...
		  </server>
		</client>

3. Once you have complete the step 1 and 2, start the agent:

	* Using Powershell with administrator access:

		.. code-block:: console

			# Restart-Service -Name wazuh

	* Using Windows cmd with administrator access:

		.. code-block:: console

			# net stop wazuh
			# net start wazuh
