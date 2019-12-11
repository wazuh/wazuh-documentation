.. Copyright (C) 2019 Wazuh, Inc.

.. _command-line-register-windows:

Windows hosts
=============

To register an agent using the command line, first follow the steps from the **Manager** section and then, from the **Agent** section.

Manager
^^^^^^^
1. On the CLI of the Wazuh manager host add a new agent by running ``manage_agents`` program and providing agent's name and IP address:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -a <AGENT_IP> -n <AGENT_NAME>

	In this example, we will add an agent under the name ``windows-server`` and with the IP address ``any``.

	.. code-block:: console

		# /var/ossec/bin/manage_agents -a any -n windows-server

2. List the agents to obtain the ID of the ``windows-server`` agent:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -l

		Available agents:
		    ID: 001, Name: windows-server, IP: any

3. Extract the agent's key using the ID found in the output of the previous command:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -e 001

		Agent key information for '001' is:
		MDAxIG1hY29zLW1vamF2ZSBhbnkgZjcwMTI0MjQ5NDMwNzA3N2IyN2NlZjRmZDQ1NzlmYzkwYzcyMzcyZDMxMTM5ZTBkZjZiYzdmODMyODBjZjA4YQ==

  Copy the key, you will import it to the agent to enable the communication to the manager.

Agent
^^^^^
Once you have added the agent in the manager, open a session in your Windows agent host and start a CMD or a Powershell as **Administrator**. The agent’s installation directory depends on the architecture of the host.

	- ``C:\Program Files (x86)\ossec-agent`` for ``x86_64`` hosts.
	- ``C:\Program Files\ossec-agent`` for ``x64`` hosts.

.. note::
		In this example we will register the agent installed on a ``x86_64`` host. The installation path will be: ``C:\Program Files (x86)\ossec-agent``.
|

1. Import the key using ``manage_agents`` program:

	  .. code-block:: console

	      # 'C:\Program Files (x86)\ossec-agent\manage_agents' -i MDAxIG1hY29zLW1vamF2ZSBhbnkgZjcwMTI0MjQ5NDMwNzA3N2IyN2NlZjRmZDQ1NzlmYzkwYzcyMzcyZDMxMTM5ZTBkZjZiYzdmODMyODBjZjA4YQ

	      Agent information:
	         ID:001
	         Name:windows-server
	         IP Address:any

	      Confirm adding it?(y/n): y
	      Added.


2. Edit the agent configuration file. In ``C:\Program Files (x86)\ossec-agent\ossec.conf``, in the ``<client><server>`` section, repalce the ``MANAGER_IP`` with the manager IP address or a DNS name:

	.. code-block:: xml

		<client>
		  <server>
		    <address>MANAGER_IP</address>
		    ...
		  </server>
		</client>

3. Start the agent:

	* Using Powershell with administrator access:

		.. code-block:: console

			# Restart-Service -Name wazuh

	* Using Windows cmd with administrator access:

		.. code-block:: console

			# net stop wazuh
			# net start wazuh

4. Additionally, you can check if the agent is successfully registered and connected to the manager by executing following command on the manager:

		.. code-block:: console

			# /var/ossec/bin/agent_control -i <AGENT-ID>

    The output of the program will display information about the newly registered agent.
