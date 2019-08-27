.. Copyright (C) 2019 Wazuh, Inc.

.. _installation_agents:

Installing Wazuh Agent
======================

The Wazuh agent runs on the hosts that you want to monitor. It is multi-platform and provides the following capabilities:

- Log and data collection
- File integrity monitoring
- Rootkit and malware detection
- Security policy monitoring.
- Configuration assessments
- Software inventory

In addition, it communicates with the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel.

There are several options to install a Wazuh agent, depending on the operating system and whether or not you wish to build from source. Consult the table below and choose how to proceed for a given agent:

+-----------------------------------------------------------------+-----------------------------------------------------------------------+
| Type                                                            | Description                                                           |
+=================================================================+=======================================================================+
| :ref:`Installation from packages <wazuh_agent_packages>`        | Install Wazuh Manager from packages.                                  |
+-----------------------------------------------------------------+-----------------------------------------------------------------------+
| :ref:`Installation from sources <wazuh_agent_sources>`          | Install Wazuh Manager from source code.                               |
+-----------------------------------------------------------------+-----------------------------------------------------------------------+

.. note:: Deploying agents to a large number of servers or endpoints can be easier using automation tools like Puppet, Chef, SCCM or Ansible. Consider exploring these options if you are deploying Wazuh in a larger environment.

.. rst-class:: d-none

.. toctree::
    :hidden:
    :maxdepth: 2

    wazuh_agent_packages
    wazuh_agent_sources
    deployment_variables
    deployment_variables_windows
