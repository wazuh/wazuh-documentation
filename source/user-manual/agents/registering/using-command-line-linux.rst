.. Copyright (C) 2019 Wazuh, Inc.

.. _command-line-register-linux:

Using the CLI in Linux hosts
============================

To register an agent using the command line, first follow the steps from the **Manager** section and then, from the **Agent** section.

Manager
^^^^^^^
1. In the CLI of the Wazuh Manager host, we will run ``manage_agents`` to add the agent. In this example, we are going to add a new agent. Its name will be ``ubuntu-ag`` and its address or IP is ``any``.

	.. code-block:: console

		# /var/ossec/bin/manage_agents -a any -n ubuntu-ag

2. Now, list the agents to get the ID of the ``ubuntu-ag`` agent:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -l

		Available agents:
		    ID: 001, Name: ubuntu-ag, IP: any

3. Using the ID from the previous command, extract the new agent’s key using. Copy this key because you will need it for the agent:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -e 001

		Agent key information for '001' is:
		MDAxIDE4NWVlNjE1Y2YzYiBhbnkgMGNmMDFiYTM3NmMxY2JjNjU0NDAwYmFhZDY1ZWU1YjcyMGI2NDY3ODhkNGQzMjM5ZTdlNGVmNzQzMGFjMDA4Nw==

Agent
^^^^^
Once you have added the agent in the Wazuh Manager host, open a session in your Linux agent host as root user. After that, let's import the key and connect the agent to the manager.

1. First, import the key using ``manage_agents``:

	  .. code-block:: console

	      # /var/ossec/bin/manage_agents -i MDAxIDE4NWVlNjE1Y2YzYiBhbnkgMGNmMDFiYTM3NmMxY2JjNjU0NDAwYmFhZDY1ZWU1YjcyMGI2NDY3ODhkNGQzMjM5ZTdlNGVmNzQzMGFjMDA4Nw

	      Agent information:
	         ID:001
	         Name:ubuntu-ag
	         IP Address:any

	      Confirm adding it?(y/n): y
	      Added.


2. Edit the Wazuh agent configuration in ``/var/ossec/etc/ossec.conf`` to add the Wazuh manager IP address. In the ``<client><server>`` section, change the ``MANAGER_IP`` value to the Wazuh manager address. The address of the Wazuh Manager can be an IP address or a DNS name:

	.. code-block:: xml

		<client>
		  <server>
		    <address>MANAGER_IP</address>
		    ...
		  </server>
		</client>

3. Once you have complete the step 1 and 2, start the agent:

	* For Systemd:

	  .. code-block:: console

		  # systemctl restart wazuh-agent

	* For SysV Init:

	  .. code-block:: console

		  # service wazuh-agent restart
