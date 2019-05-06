.. Copyright (C) 2019 Wazuh, Inc.

.. _macos-manager-verification:

MacOS X agents
==============

Open a session in your MacOS X agent host as root user. After that, you can register the Agent using ``agent-auth``:

1. Copy the CA (**.pem file**) to the ``/Library/Ossec/etc`` folder and run the ``agent-auth`` program:

  .. code-block:: console

    # cp rootCA.pem /Library/Ossec/etc
    # /Library/Ossec/bin/agent-auth -m 192.168.1.2 -v /Library/Ossec/etc/rootCA.pem

2. Edit the Wazuh Agent configuration to add the Wazuh Manager IP address.

  In the file ``/Library/Ossec/etc/ossec.conf``, in the ``<client><server>`` section, change the *MANAGER_IP* value to the Wazuh Manager address:

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