.. Copyright (C) 2018 Wazuh, Inc.

.. _agent-connection:

Checking connection with Manager
================================

Before you check the agent's connection with the manager, first ensure the agent is pointing to the manager's IP address. This is set in ``ossec.conf`` using the ``<client>`` XML tag. For more on this, see :ref:`Client reference <reference_ossec_client>`.

::

  <ossec_config>
    <client>
      <server>
        <address>10.0.0.10</address>
        <protocol>udp</protocol>
      </server>
    </client>
  </ossec_config>

This will set 10.0.0.10 as the Wazuh Manager server. Once this is done, you will need restart the Agent:

  a. For Systemd:

    .. code-block:: console

      # systemctl restart wazuh-agent

  b. For SysV Init:

    .. code-block:: console

      # service wazuh-agent restart

After you register the agent and it has successfully connected, you can see a list of agents that are connected to the manager with:

.. code-block:: console

  # /var/ossec/bin/agent_control -lc

You can also check to see if an agent connected correctly by verifying if the UDP connection to the manager is established:

.. code-block:: console

  # netstat -vatunp|grep ossec-agentd

The result should match the agent and manager IP addresses.

In the :doc:`agent_control section <../reference/tools/agent_control>`, you can find information about the status of the agents that are registered with the manager.
