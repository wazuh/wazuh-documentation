.. Copyright (C) 2019 Wazuh, Inc.

.. _windows-simple-registration:

Windows hosts
=============

To register the Windows agent, open a session in your Windows agent host and start a CMD or a Powershell as Administrator. The agent’s installation directory depends on the architecture of the host.

	- ``C:\Program Files (x86)\ossec-agent`` for ``x86_64`` hosts.
	- ``C:\Program Files\ossec-agent`` for ``x64`` hosts.

.. note::
  In this example, we will register the agent installed on a ``x86_64`` host. The installation path will be: ``C:\Program Files (x86)\ossec-agent``.

1. On the agent, run the ``agent-auth.exe`` program, using the manager's IP address. If the agent's name is omitted the registration service will use the hostname as the agent's name:

   .. code-block:: console

      # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <MANAGER_IP> -A <AGENT_NAME>

   You can adjust the agent registration according to your requirements choosing from available :ref:`agent-auth` options.

2. Edit the agent configuration file. In ``C:\Program Files (x86)\ossec-agent\ossec.conf``, in the ``<client><server>`` section, repalce the ``MANAGER_IP`` with the manager IP address:

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

      # Start-Service -Name wazuh

    b) Using Windows cmd with administrator access:

    .. code-block:: console

      # net stop wazuh
      # net start wazuh
