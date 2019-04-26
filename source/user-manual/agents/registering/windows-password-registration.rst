.. Copyright (C) 2019 Wazuh, Inc.

.. _windows-password-registration:

Windows agents
==============

To register the Windows Agent, you need to start a CMD or a Powershell as **Administrator**. The installation directory of the Wazuh Agent in Windows host depends on the architecture of the host.

	- ``C:\Program Files (x86)\ossec-agent`` for ``x86_64`` hosts.
	- ``C:\Program Files\ossec-agent`` for ``x64`` hosts.

This guide suppose that the Wazuh Agent is installed in a ``x86_64`` host, so the installation path will be: ``C:\Program Files (x86)\ossec-agent``.

After that, you can register the agent using ``agent-auth.exe`` and your password:

1. Register the agent using the password. The agents can use the password by storing it on a file or as a command line argument, so you can use any of these two options:

    a) Write the password on ``/var/ossec/etc/authd.pass`` and run the ``agent-auth`` program:

    .. code-block:: console

      # echo TopSecret > C:\Program Files (x86)\ossec-agent\authd.pass
      # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <MANAGER_IP_ADDRESS>

    b) Run the program with the ``-P`` flag, and insert the password:

    .. code-block:: none

      # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <MANAGER_IP_ADDRESS> -P "TopSecret"

2. Edit the Wazuh agent configuration to add the Wazuh manager IP address.

  In the file ``/var/ossec/etc/ossec.conf``, in the ``<client><server>`` section, change the *MANAGER_IP* value to the Wazuh manager address:

  .. code-block:: xml

    <client>
      <server>
        <address>MANAGER_IP</address>
        ...
      </server>
    </client>

3. Start the agent.

	a) Using Powershell with administrator access:

		.. code-block:: console

			# Restart-Service -Name wazuh

	b) Using Windows cmd with administrator access:

		.. code-block:: console

			# net stop wazuh
			# net start wazuh

