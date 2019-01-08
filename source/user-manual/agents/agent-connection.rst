.. _agent-connection:

Checking connection with Manager
================================

First you need to be sure that the Agent is pointing to Manager Address this is set on ``ossec.conf`` using ``<client>`` XML tag, for more see :ref:`Client reference <reference_ossec_client>`.

::

  <ossec_config>
    <client>
      <server-ip>10.0.0.10</server-ip>
      <protocol>udp</protocol>
    </client>
  </ossec_config>

This will set 10.0.0.10 as Wazuh Manager server, after you need restart the Agent:

a. For Systemd:

::

  systemctl restart wazuh-agent

b. For SysV Init:

::

  service wazuh-agent restart

After you register the agent and it be successfully connected, you could see a list of connected agents into Manager with:

::

  $ /var/ossec/bin/agent_control -lc

This will display every registered Agent, also you can check if a Agent is correctly connected verifying if the UDP connection to Manager is established:

::

  $ netstat -vatunp|grep ossec-agentd

This could match with the Agent and Manager ip addresses.
