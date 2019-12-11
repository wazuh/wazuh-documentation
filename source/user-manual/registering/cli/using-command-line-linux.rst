.. Copyright (C) 2019 Wazuh, Inc.

.. _command-line-register-linux:

Linux hosts
===========

To register the Wazuh agent using the command line, first, follow the steps from the **Manager** section and then, from the **Agent** section.

Manager
^^^^^^^
1. On the CLI of the Wazuh manager host add a new agent by running ``manage_agents`` program and providing agent's name and IP address:

	.. code-block:: console

	  # /var/ossec/bin/manage_agents -a <AGENT_IP> -n <AGENT_NAME>

	In this example, we will add an agent under the name ``ubuntu-ag`` and with the IP address ``any``.

	.. code-block:: console

		# /var/ossec/bin/manage_agents -a any -n ubuntu-ag

2. List the agents to obtain the ID of the ``ubuntu-ag`` agent:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -l

		Available agents:
		    ID: 001, Name: ubuntu-ag, IP: any

3. Extract the agent's key using the ID found in the output of the previous command:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -e 001

		Agent key information for '001' is:
		MDAxIDE4NWVlNjE1Y2YzYiBhbnkgMGNmMDFiYTM3NmMxY2JjNjU0NDAwYmFhZDY1ZWU1YjcyMGI2NDY3ODhkNGQzMjM5ZTdlNGVmNzQzMGFjMDA4Nw==

  Copy the key, you will import it to the agent to enable the communication to the manager.


Agent
^^^^^
Once you have added the agent in the manager, open a session in your Linux agent host as a root user.

1. Import the key using ``manage_agents`` program:

	  .. code-block:: console

	      # /var/ossec/bin/manage_agents -i MDAxIDE4NWVlNjE1Y2YzYiBhbnkgMGNmMDFiYTM3NmMxY2JjNjU0NDAwYmFhZDY1ZWU1YjcyMGI2NDY3ODhkNGQzMjM5ZTdlNGVmNzQzMGFjMDA4Nw

	      Agent information:
	         ID:001
	         Name:ubuntu-ag
	         IP Address:any

	      Confirm adding it?(y/n): y
	      Added.


2.  Edit the agent configuration file. In ``/var/ossec/etc/ossec.conf``, in the ``<client><server>`` section, repalce the ``MANAGER_IP`` with the manager IP address or a DNS name:

	.. code-block:: xml

		<client>
		  <server>
		    <address>MANAGER_IP</address>
		    ...
		  </server>
		</client>

3. Start the agent:

	* For Systemd:

	  .. code-block:: console

		  # systemctl restart wazuh-agent

	* For SysV Init:

	  .. code-block:: console

		  # service wazuh-agent restart

4. Additionally, you can check if the agent is successfully registered and connected to the manager by executing following command on the manager:

		.. code-block:: console

			# /var/ossec/bin/agent_control -i <AGENT-ID>

		The output of the program will display information about the newly registered agent.	
