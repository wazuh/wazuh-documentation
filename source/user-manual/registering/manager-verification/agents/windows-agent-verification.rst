.. Copyright (C) 2019 Wazuh, Inc.

.. _windows-agent-verification:

Windows hosts
==============

Open a session in your Windows agent host and start a CMD or a Powershell as Administrator, you will use the certificate (``.cert`` file) and its key (``.key`` file) previously created on the manager.

The agent’s installation directory depends on the architecture of the host.

	- ``C:\Program Files (x86)\ossec-agent`` for ``x86_64`` hosts.
	- ``C:\Program Files\ossec-agent`` for ``x64`` hosts.

.. note::
	 In this example, we will register the agent installed on a ``x86_64`` host. The installation path will be: ``C:\Program Files (x86)\ossec-agent``.

1. Copy the certificate (``.cert`` file) and its key (``.key`` file) to the ``C:\Program Files (x86)\ossec-agent`` folder:

   .. code-block:: console

     # cp sslagent.cert sslagent.key C:\Program Files (x86)\ossec-agent

   Run the ``agent-auth`` program which automatically adds the agent to the manager. If the agent's name is omitted the registration service will use the hostname as the agent's name. In the below command replace the ``MANAGER_IP`` with the Wazuh manager IP address:

   .. code-block:: console

		 # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <MANAGER_IP> -A <AGENT_NAME> -x C:\Program Files (x86)\ossec-agent\sslagent.cert -k C:\Program Files (x86)\ossec-agent\sslagent.key

2. Edit the agent configuration file. In ``C:\Program Files (x86)\ossec-agent\ossec.conf``, in the ``<client><server>`` section, repalce the ``MANAGER_IP`` with the Wazuh manager IP address:

   .. code-block:: xml

    <client>
      <server>
        <address>MANAGER_IP</address>
        ...
      </server>
    </client>

3. Start the agent.

   a) Using Powershell with Administrator access:

   .. code-block:: console

      # Restart-Service -Name wazuh

   b) Using Windows cmd with Administrator access:

   .. code-block:: console

      # net stop wazuh
      # net start wazuh
