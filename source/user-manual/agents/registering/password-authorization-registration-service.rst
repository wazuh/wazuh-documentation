.. Copyright (C) 2019 Wazuh, Inc.

.. _password-authorization-registration-service:

Using the registration service with password authorization
==========================================================

You can protect the manager from unauthorized registrations by using a password. Choose one by yourself, or let the registration service generate a random password. To register an agent using the registration service and a password, first follow the steps from the **Manager** section and then, follow the steps from the correspondig OS.

Manager
^^^^^^^

To allow this option, change the value to *yes* in the ``/var/ossec/etc/ossec.conf`` file:

    .. code-block:: xml

      <auth>
        ...
        <use_password>yes</use_password>
        ...
      </auth>

After changing the ``ossec.conf`` file, you can use a custom password or let the registration process to generate a random password:

  a) **Using a custom password**: create this file ``/var/ossec/etc/authd.pass`` and write in it your custom password. For example, if we want to use *TopSecret* as a password:

    .. code-block:: console

      # echo "TopSecret" > /var/ossec/etc/authd.pass

  b) **Using a random password**: If no password is specified on ``/var/ossec/etc/authd.pass``, the registration service will create a random password. You can find the password in ``/var/ossec/logs/ossec.log``.

    .. code-block:: console

      # grep "Random password" /var/ossec/logs/ossec.log 
        2019/04/25 15:09:50 ossec-authd: INFO: Accepting connections on port 1515. Random password chosen for agent authentication: 3027022fa85bb4c697dc0ed8274a4554


To enable this changes, you need to **restart** the Wazuh Manager:

  a) For Systemd:

    .. code-block:: console

      # systemctl start wazuh-agent

  b) For SysV Init:

    .. code-block:: console

      # service wazuh-agent start

.. note::
    In this example, the password to registering the Wazuh Agent is *TopSecret*.

Linux and Unix agents
^^^^^^^^^^^^^^^^^^^^^

Open a session in your Linux/Unix agent host as root user. After that, you can register the Agent using ``agent-auth`` and a password as follows:

1. Register the agent using the password. The agents can use the password by storing it on a file or as a command line argument, so you can use any of these two options: 

  a) Write the password on ``/var/ossec/etc/authd.pass`` and run the ``agent-auth`` program:

    .. code-block:: console

      # echo "TopSecret" > /var/ossec/etc/authd.pass
      # /var/ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS>


  b) Run the program with the ``-P`` flag, and insert the password:

    .. code-block:: console

      # /var/ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS> -P "TopSecret"


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


MacOS X agents
^^^^^^^^^^^^^^

Open a session in your MacOS X agent host as root user. After that, you can register the Agent using ``agent-auth`` and a password as follows:

1. Register the agent using the password. The agents can use the password by storing it on a file or as a command line argument, so you can use any of these two options: 

  a) Write the password on ``/Library/Ossec/etc/authd.pass`` and run the ``agent-auth`` program:

    .. code-block:: console

      # echo "TopSecret" > /Library/Ossec/etc/authd.pass
      # /Library/Ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS>


  b) Run the program with the ``-P`` flag, and insert the password:

    .. code-block:: console

      # /Library/Ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS> -P "TopSecret"


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