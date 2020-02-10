.. Copyright (C) 2019 Wazuh, Inc.

.. _linux-unix-manager-verification:

Registration with Manager varification for Linux and Unix hosts
===============================================================

Open a session in your Linux/Unix agent host as a root user, you will use the CA (``.pem`` file) previously created on the manager.

1. Copy the CA (``.pem`` file) to the ``/var/ossec/etc`` folder:

   .. code-block:: console

    # cp rootCA.pem /var/ossec/etc

   Run the ``agent-auth`` program which automatically add the agent to the manager. If the agent's name is omitted the registration service will use the hostname as the agent's name. In the below command repalce the ``MANAGER_IP`` with the Wazuh manager IP address:

   .. code-block:: console

    # /var/ossec/bin/agent-auth -m <MANAGER_IP> -A <AGENT_NAME> -v /var/ossec/etc/rootCA.pem

   .. note:: Note that this method must include the -v option that indicates the location of the CA. If this option is not included, a warning message will be displayed and the connection will be established without verifying the manager.

   You can adjust the agent registration according to your requirements choosing from available :ref:`agent-auth` options.

2. Edit the Wazuh agent configuration file. In ``/var/ossec/etc/ossec.conf``, in the ``<client><server>`` section, repalce the ``MANAGER_IP`` with the Wazuh manager IP address:

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
