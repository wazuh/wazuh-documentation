.. Copyright (C) 2019 Wazuh, Inc.

.. _linux-unix-password-registration:

Registration with password authorization for Linux and Unix hosts
=================================================================

Open a session in your Linux/Unix agent host as a root user. After that, you can register the Wazuh agent using ``agent-auth`` program and a password as follows:

1. Register the agent using the password. It can be stored in a file or provided as a command-line argument:

   a) **Using a stored password**: write the password on ``/var/ossec/etc/authd.pass`` file and run the ``agent-auth`` program. It allows agent registration by simply providing the manager’s IP address. If the agent's name is omitted the registration service will use the hostname as the agent's name:

   .. code-block:: console

      # echo "TopSecret" > /var/ossec/etc/authd.pass
      # /var/ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS> -A <AGENT_NAME>


   b) **Using a password as a command-line argument**: run the ``agent-auth`` program, provide the manager’s IP address together with the password following the ``-P`` flag. If the agent's name is omitted the registration service will use the hostname as the agent's name:

   .. code-block:: console

      # /var/ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS> -A <AGENT_NAME> -P "TopSecret"

   You can adjust the agent registration according to your requirements choosing from available :ref:`agent-auth` options.

2. Edit the agent configuration file. In ``/var/ossec/etc/ossec.conf``, in the ``<client><server>`` section, repalce the ``MANAGER_IP`` with the Wazuh manager IP address:

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
