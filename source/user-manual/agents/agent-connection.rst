.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Find out more about how to check the connection to the Wazuh Manager in this section of our documentation. 
  
.. _agent-connection:

Checking connection with Manager
================================

Before you check the agent's connection with the manager, first ensure the agent is pointing to the manager's IP address. This is set in ``ossec.conf`` using the ``<client>`` XML tag. For more on this, see :ref:`Client reference <reference_ossec_client>`.

.. code-block:: xml

  <ossec_config>
    <client>
      <server>
        <address>10.0.0.10</address>
        <protocol>tcp</protocol>
      </server>
    </client>
  </ossec_config>

This will set 10.0.0.10 as the Wazuh server. Once this is done, you will need to restart the Agent:

  a. For Systemd:

    .. code-block:: console

      # systemctl restart wazuh-agent

  b. For SysV Init:

    .. code-block:: console

      # service wazuh-agent restart

After you register the agent and it has successfully connected, you can see a list of agents that are connected to the manager with:

.. code-block:: console

  # /var/ossec/bin/agent_control -lc

You can also check to see if an agent connected correctly by verifying if the TCP connection to the manager is established:

.. code-block:: console

  # netstat -vatunp | grep wazuh-remote

The result should match the agent and manager IP addresses.

In the :doc:`agent_control section <../reference/tools/agent-control>`, you can find information about the status of the agents that are registered with the manager.
