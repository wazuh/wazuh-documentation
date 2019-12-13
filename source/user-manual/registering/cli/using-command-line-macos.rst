.. Copyright (C) 2019 Wazuh, Inc.

.. _command-line-register-macos:

MacOS X hosts
=============

To register an agent using the command line, first, follow the steps from the **Manager** section and then, from the **Agent** section.

Manager
^^^^^^^

1. On the CLI of the Wazuh manager host add a new agent by running ``manage_agents`` program and providing the agent's name and IP address:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -a <AGENT_IP> -n <AGENT_NAME>

	In this example, we will add an agent under the name ``macos-mojave`` and with the IP address ``any``.

	.. code-block:: console

		# /var/ossec/bin/manage_agents -a any -n macos-mojave


2. List the agents to obtain the ID of the ``macos-mojave`` agent:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -l

		Available agents:
		    ID: 001, Name: macos-mojave, IP: any

3. Extract the agent's key using the ID found in the output of the previous command:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -e 001

		Agent key information for '001' is:
		MDAxIG1hY29zLW1vamF2ZSBhbnkgZjcwMTI0MjQ5NDMwNzA3N2IyN2NlZjRmZDQ1NzlmYzkwYzcyMzcyZDMxMTM5ZTBkZjZiYzdmODMyODBjZjA4YQ==

  Copy the key, you will import it to the agent to enable the communication to the manager.

Agent
^^^^^
Once you have added the agent in the manager, open a session in your MacOS X agent host as a root user.

1. Import the key using ``manage_agents`` program:

	  .. code-block:: console

	      # /Library/Ossec/bin/manage_agents -i MDAxIG1hY29zLW1vamF2ZSBhbnkgZjcwMTI0MjQ5NDMwNzA3N2IyN2NlZjRmZDQ1NzlmYzkwYzcyMzcyZDMxMTM5ZTBkZjZiYzdmODMyODBjZjA4YQ

	      Agent information:
	         ID:001
	         Name:macos-mojave
	         IP Address:any

	      Confirm adding it?(y/n): y
	      Added.


2. Edit the agent configuration file. In ``/Library/Ossec/etc/ossec.conf``, in the ``<client><server>`` section, repalce the ``MANAGER_IP`` with the manager IP address or a DNS name:

	.. code-block:: xml

		<client>
		  <server>
		    <address>MANAGER_IP</address>
		    ...
		  </server>
		</client>

3. Start the agent:

	.. code-block:: console

		# /Library/Ossec/bin/ossec-control start
