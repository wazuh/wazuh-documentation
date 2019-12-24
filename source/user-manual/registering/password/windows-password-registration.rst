.. Copyright (C) 2019 Wazuh, Inc.

.. _windows-password-registration:

Windows hosts
=============

To register the Windows agent, you need to start a CMD or a Powershell as Administrator The agent's installation directory depends on the architecture of the host.

	- ``C:\Program Files (x86)\ossec-agent`` for ``x86_64`` hosts.
	- ``C:\Program Files\ossec-agent`` for ``x64`` hosts.

.. note::
	 In this example, we will register the agent installed on a ``x86_64`` host. The installation path will be: ``C:\Program Files (x86)\ossec-agent``.

1. Register the agent using the password. It can be stored in a file or provided as a command-line argument:

   a) **Using a stored password**: write the password on ``C:\Program Files (x86)\ossec-agent\authd.pass`` file and run the ``agent-auth`` program. It allows agent registration by simply providing the manager’s IP address. If the agent's name is omitted the registration service will use the hostname as the agent's name:

   .. code-block:: none

      PS echo TopSecret > "C:\Program Files (x86)\ossec-agent\authd.pass"
      PS C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <MANAGER_IP> -A <AGENT_NAME>

   The agent assumes the input file is in ``UTF-8 encoding``, without ``byte-order mark (BOM)``. If your file is created in an incorrect encoding you can change it by opening the ``authd.pass`` file in a Notepad and Save As ``ANSI`` encoding.

   b)  **Using a password as a command-line argument**: run the ``agent-auth`` program, provide the manager’s IP address together with the password following the ``-P`` flag. If the agent's name is omitted the registration service will use the hostname as the agent's name:

   .. code-block:: none

      PS C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <MANAGER_IP> -A <AGENT_NAME> -P "TopSecret"

   You can adjust the agent registration according to your requirements choosing from available :ref:`agent-auth` options.

2. Edit the Wazuh agent configuration file. In ``C:\Program Files (x86)\ossec-agent\ossec.conf``, in the ``<client><server>`` section, repalce the ``MANAGER_IP`` with the Wazuh manager IP address:

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
