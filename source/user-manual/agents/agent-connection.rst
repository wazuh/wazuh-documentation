.. _agent-connection:

Checking connection with Manager
================================

First you need to be sure that the Agent is poiting to Manager Address this is set on ``ossec.conf`` using ``<client>`` XML tag, for more see :ref:`Client reference <reference_ossec_client>`.

::

  <ossec_config>
    <client>
      <server>
        <address>10.0.0.10</address>
        <protocol>udp</protocol>
      </server>
    </client>
  </ossec_config>

This will set 10.0.0.10 as Wazuh Manager server, after you need restart the Agent:

a. For Systemd:

.. code-block:: console

  # systemctl restart wazuh-agent

b. For SysV Init:

.. code-block:: console

  # service wazuh-agent restart

After you register the agent and it be successfully connected, you could see a list of connected agents into Manager with:

.. code-block:: console

  # /var/ossec/bin/agent_control -lc

This will display every registered Agent, also you can check if a Agent is correctly connected verifying if the UDP connection to Manager is established:

.. code-block:: console

  # netstat -vatunp|grep ossec-agentd

This could match with the Agent and Manager ip addresses.

In the :doc:`agent_control section <../reference/tools/agent_control>` it can be found information about the different states in which agents registered in a manager are.
