.. Copyright (C) 2019 Wazuh, Inc.

.. _windows-agent-verification:

Windows agents
==============

To register the Windows Agent, you need to start a CMD or a Powershell as **Administrator**. The installation directory of the Wazuh Agent in Windows host depends on the architecture of the host.

	- ``C:\Program Files (x86)\ossec-agent`` for ``x86_64`` hosts.
	- ``C:\Program Files\ossec-agent`` for ``x64`` hosts.

This guide suppose that the Wazuh Agent is installed in a ``x86_64`` host, so the installation path will be: ``C:\Program Files (x86)\ossec-agent``.

After that, you can register the agent using ``agent-auth.exe``:

1. Copy the newly created certificate (``.cert`` file) and its key (``.key`` file) to the ``C:\Program Files (x86)\ossec-agent`` folder and run the ``agent-auth`` program. For example, if the manager's IP address is 192.168.1.2:

    .. code-block:: console

      # cp sslagent.cert sslagent.key C:\Program Files (x86)\ossec-agent
      # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m 192.168.1.2 -x C:\Program Files (x86)\ossec-agent\sslagent.cert -k C:\Program Files (x86)\ossec-agent\sslagent.key

2. Edit the Wazuh Agent configuration to add the Wazuh Manager IP address.

  In the file ``C:\Program Files (x86)\ossec-agent\ossec.conf``, in the ``<client><server>`` section, change the *MANAGER_IP* value to the Wazuh Manager address:

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

