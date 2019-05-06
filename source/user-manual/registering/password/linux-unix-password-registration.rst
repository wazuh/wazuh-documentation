.. Copyright (C) 2019 Wazuh, Inc.

.. _linux-unix-password-registration:

Linux and Unix agents
=====================


Open a session in your Linux/Unix agent host as root user. After that, you can register the Agent using ``agent-auth`` and a password as follows:

1. Register the agent using the password. The agents can use the password by storing it on a file or as a command line argument, so you can use any of these two options: 

  a) Write the password on ``/var/ossec/etc/authd.pass`` and run the ``agent-auth`` program:

    .. code-block:: console

      # echo "TopSecret" > /var/ossec/etc/authd.pass
      # /var/ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS>


  b) Run the program with the ``-P`` flag, and insert the password:

    .. code-block:: console

      # /var/ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS> -P "TopSecret"


2. Edit the Wazuh Agent configuration to add the Wazuh Manager IP address.

  In the file ``/var/ossec/etc/ossec.conf``, in the ``<client><server>`` section, change the *MANAGER_IP* value to the Wazuh Manager address:

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