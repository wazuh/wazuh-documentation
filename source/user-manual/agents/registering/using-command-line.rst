.. Copyright (C) 2018 Wazuh, Inc.

.. _command-line-register:

Using the CLI
-------------

To register an agent using the command line, follow these steps:

1. Add a new agent:

	In this example, we'll add an agent with name "Example", dynamic IP (`any`) and automatic ID:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -a any -n Example

			****************************************
			* Wazuh v3.9.0 Agent manager.          *
			* The following options are available: *
			****************************************
			(A)dd an agent (A).
			(E)xtract key for an agent (E).
			(L)ist already added agents (L).
			(R)emove an agent (R).
			(Q)uit.
			Choose your action: A,E,L,R or Q: 
			- Adding a new agent (use '\q' to return to the main menu).
			Please provide the following:
			* A name for the new agent:    * The IP Address of the new agent: Confirm adding it?(y/n): Agent added with ID 002.


2. Extract the new agent's key. You will need it for the agent:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -e 001 

		Agent key information for '001' is:
		MDAxIDE4NWVlNjE1Y2YzYiBhbnkgMGNmMDFiYTM3NmMxY2JjNjU0NDAwYmFhZDY1ZWU1YjcyMGI2NDY3ODhkNGQzMjM5ZTdlNGVmNzQzMGFjMDA4Nw==

3. Import the key to the agent:

	.. code-block:: console

		# /var/ossec/bin/manage_agents -i MDAxIDE4NWVlNjE1Y2YzYiBhbnkgMGNmMDFiYTM3NmMxY2JjNjU0NDAwYmFhZDY1ZWU1YjcyMGI2NDY3ODhkNGQzMjM5ZTdlNGVmNzQzMGFjMDA4Nw

		Agent information:
			ID:001
			Name:Example
			IP Address:any

		Confirm adding it?(y/n): y
		Added.

4. Edit the Wazuh agent configuration in ``/var/ossec/etc/ossec.conf`` to add the Wazuh manager IP address. In the ``<client><server>`` section, change the ``MANAGER_IP`` value to the Wazuh manager address:

	.. code-block:: xml

		<client>
		  <server>
		    <address>MANAGER_IP</address>
		    ...
		  </server>
		</client>

	As an example for making this change with a line we are setting this variable to ``10.0.0.4``:

	.. code-block:: bash

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

The agent named *Server1* at IP 10.0.0.10 was installed and given the ID 005. If we assume that we had to reinstall the server, we would have to reinstall a new agent and connect it to the manager. In this case, we can use the argument *-F 0* meaning that the previous agent (005) will be removed (with a backup) and a new agent will be created re-using the IP. The new agent will have a new ID::

    /var/ossec/bin/manage_agents -n Server1 -a 10.10.10.10 -F 0
