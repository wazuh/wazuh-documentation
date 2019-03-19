.. Copyright (C) 2018 Wazuh, Inc.

.. _command-line-register:

Using the CLI
=============

To register an agent using the command line, follow these steps:

1. Add the agent to the manager:

	This example how to add an agent with *ubuntu-ag* as name and *any* as origin IP:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -a any -n ubuntu-ag

2. Extract the new agent's key. You will need it for the agent:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -e 001 

		Agent key information for '001' is:
		MDAxIDE4NWVlNjE1Y2YzYiBhbnkgMGNmMDFiYTM3NmMxY2JjNjU0NDAwYmFhZDY1ZWU1YjcyMGI2NDY3ODhkNGQzMjM5ZTdlNGVmNzQzMGFjMDA4Nw==

3. Import the key to the agent:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -i MDAxIDE4NWVlNjE1Y2YzYiBhbnkgMGNmMDFiYTM3NmMxY2JjNjU0NDAwYmFhZDY1ZWU1YjcyMGI2NDY3ODhkNGQzMjM5ZTdlNGVmNzQzMGFjMDA4Nw

4. Edit the Wazuh agent configuration in ``/var/ossec/etc/ossec.conf`` to add the Wazuh manager IP address. In the ``<client><server>`` section, change the *MANAGER_IP* value to the Wazuh manager address:

	.. code-block:: xml

		<client>
		  <server>
		    <address>MANAGER_IP</address>
		    ...
		  </server>
		</client>

	Or using ``sed`` to replace it with the Wazuh manager IP, using ``10.0.0.4`` as an example IP:

	.. code-block:: console

		# sed -i 's/MANAGER_IP/10.0.0.4/g' /var/ossec/etc/ossec.conf


5. Restart the agent:

	a. For Systemd:

		.. code-block:: console

			# systemctl restart wazuh-agent

	b. For SysV Init:

		.. code-block:: console

			# service wazuh-agent restart

Forcing insertion
^^^^^^^^^^^^^^^^^

If you try to add an agent with an IP address that was already registered to another agent, the ``manage_agents`` command will return an error. You can still force the addition by using the *-F* option.

Example
~~~~~~~

The agent named *nginx_service* at IP 10.0.0.10 was installed and given the ID 005. If we assume that we had to reinstall the server, we would have to reinstall a new agent and connect it to the manager. In this case, we can use the argument *-F 0* meaning that the previous agent (005) will be removed (with a backup) and a new agent will be created re-using the IP. The new agent will have a new ID

.. code-block:: console

	# /var/ossec/bin/manage_agents -n nginx_service -a 10.10.10.10 -F 0
