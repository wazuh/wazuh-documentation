.. Copyright (C) 2019 Wazuh, Inc.

.. _macos-agent-verification:

MacOS X hosts
==============

Open a session in your MacOS X agent host as a root user, you will use the certificate (``.cert`` file) and its key (``.key`` file) previously created on the manager:

1. Copy the certificate (``.cert`` file) and its key (``.key`` file) to the ``/Library/Ossec/etc`` folder:

   .. code-block:: console

      # cp sslagent.cert sslagent.key /Library/Ossec/etc

   Run the ``agent-auth`` program which automatically add the agent to the manager. If the agent’s name is omitted the registration service will use the hostname as the agent’s name. In the below command repalce the ``MANAGER_IP`` with the Wazuh manager IP address:

   .. code-block:: console

      # /Library/Ossec/bin/agent-auth -m <MANAGER_IP> -A <AGENT_NAME> -x /Library/Ossec/etc/sslagent.cert -k /Library/Ossec/etc/sslagent.key

2. Edit the Wazuh agent configuration file. In ``/Library/Ossec/etc/ossec.conf``, in the ``<client><server>`` section, repalce the ``MANAGER_IP`` with the Wazuh manager IP address:

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
