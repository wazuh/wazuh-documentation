.. Copyright (C) 2019 Wazuh, Inc.

.. _linux-unix-manager-verification:

Linux and Unix agent hosts
==========================

Open a session in your Linux/Unix agent host as a root user.

1. Copy the CA (**.pem file**) to the ``/var/ossec/etc`` folder:

  .. code-block:: console

    # cp rootCA.pem /var/ossec/etc

  Run the ``agent-auth`` program which automatically add the agent to the manager. In the below command repalce the ``MANAGER_IP`` with the Wazuh manager IP address:

  .. code-block:: console

    # /var/ossec/bin/agent-auth -m <MANAGER_IP> -v /var/ossec/etc/rootCA.pem

  .. note:: Note that this method must include the -v option that indicates the location of the CA. If this option is not included, a warning message will be displayed and the connection will be established without verifying the manager.

  You can adjust the agent registration according to your requirements choosing from available :ref:`agent-auth` options.

2. Edit the Wazuh agent configuration to add the Wazuh server IP address.

  In the file ``/var/ossec/etc/ossec.conf``, in the ``<client><server>`` section, change the *MANAGER_IP* value to the Wazuh server address:

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
