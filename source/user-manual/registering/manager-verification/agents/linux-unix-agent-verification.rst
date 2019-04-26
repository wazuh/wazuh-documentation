.. Copyright (C) 2019 Wazuh, Inc.

.. _linux-unix-agent-verification:

Linux and Unix agents
=====================

Open a session in your Linux/Unix agent host as root user. After that, you can register the Agent using ``agent-auth``:

1. Copy the newly created certificate (``.cert`` file) and its key (``.key`` file) to the ``/var/ossec/etc`` folder and run the ``agent-auth`` program. For example, if the manager's IP address is 192.168.1.2:

    .. code-block:: console

      # cp sslagent.cert sslagent.key /var/ossec/etc
      # /var/ossec/bin/agent-auth -m 192.168.1.2 -x /var/ossec/etc/sslagent.cert -k /var/ossec/etc/sslagent.key


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