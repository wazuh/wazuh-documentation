.. Copyright (C) 2019 Wazuh, Inc.

.. _simple-registration-service:

Using the simple registration service
=====================================

This is the easiest method to register agents. It doesn't require any kind of authorization or host verification. If the ``openssl`` package is installed before installing the wazuh-manager package, the package will create the certificate and key needed to run the authentication process: ``ossec-authd``.

Linux and Unix agents
^^^^^^^^^^^^^^^^^^^^^

Open a session in your Linux/Unix agent host as root user. After that, you can register the Agent using ``agent-auth`` as follows:

1. On the agent, run the ``agent-auth`` program, using the manager's IP address.

  .. code-block:: console

    # /var/ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS>


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

  a) For Systemd:

    .. code-block:: console

      # systemctl start wazuh-agent

  b) For SysV Init:

    .. code-block:: console

      # service wazuh-agent start

  c) Other cases:

    .. code-block:: console

      # /var/ossec/bin/ossec-control start

Windows agents
^^^^^^^^^^^^^^

To register the Windows Agent, you need to start a CMD or a Powershell as **Administrator**. The installation directory of the Wazuh Agent in Windows host depends on the architecture of the host.

	- ``C:\Program Files (x86)\ossec-agent`` for ``x86_64`` hosts.
	- ``C:\Program Files\ossec-agent`` for ``x64`` hosts.

This guide suppose that the Wazuh Agent is installed in a ``x86_64`` host, so the installation path will be: ``C:\Program Files (x86)\ossec-agent``.

After that, you can register the agent using ``agent-auth.exe``.

1. On the agent, run the ``agent-auth.exe`` program, using the manager's IP address.

  .. code-block:: console

    # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <MANAGER_IP_ADDRESS>


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


MacOS agents
^^^^^^^^^^^^

Open a session in your MacOS X agent host as root user. After that, you can register the Agent using ``agent-auth`` as follows:

1. On the agent, run the ``agent-auth`` program, using the manager's IP address.

  .. code-block:: console

    # /Library/Ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS>


2. Edit the Wazuh agent configuration to add the Wazuh manager IP address.

  In the file ``/Library/Ossec/etc/ossec.conf``, in the ``<client><server>`` section, change the *MANAGER_IP* value to the Wazuh manager address:

  .. code-block:: xml

    <client>
      <server>
        <address>MANAGER_IP</address>
        ...
      </server>
    </client>

3. Start the agent.

  .. code-block:: console

    # /Library/Ossec/bin/ossec-control start