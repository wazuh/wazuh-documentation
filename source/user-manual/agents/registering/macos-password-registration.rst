.. Copyright (C) 2019 Wazuh, Inc.

.. _macos-password-registration:

MacOS X agents
==============

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