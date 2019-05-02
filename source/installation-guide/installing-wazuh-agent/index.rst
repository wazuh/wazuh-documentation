.. Copyright (C) 2019 Wazuh, Inc.

.. _installation_agents:

Installing Wazuh agent
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

+-------------------------------------------------+--------------------------------------------------+
| Type                                            | Description                                      |
+=================================================+==================================================+
| :doc:`Linux packages <wazuh_agent_rpm>`         | Install Wazuh agents on Linux.                   |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`Windows installer <wazuh_agent_windows>`  | Install Wazuh agents on Windows.                 |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`Mac OS installer <wazuh_agent_macos>`     | Install Wazuh agents on Mac OS                   |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`Solaris installer <wazuh_agent_solaris>`  | Install Wazuh agents on Solaris                  |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`HP-UX installer <wazuh_agent_hpux>`       | Install Wazuh agents on HP-UX                    |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`AIX installer <wazuh_agent_aix>`          | Install Wazuh agents on AIX                      |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`Sources <wazuh_agent_sources>`            | Install Wazuh agents from source code.           |
+-------------------------------------------------+--------------------------------------------------+

.. note:: Deploying agents to a large number of servers or endpoints can be easier using automation tools like Puppet, Chef, SCCM or Ansible. Consider exploring these options if you are deploying Wazuh in a larger environment.

.. toctree::
    :hidden:
    :maxdepth: 2

    wazuh_agent_linux
    wazuh_agent_windows
    wazuh_agent_macos
    wazuh_agent_solaris
    wazuh_agent_hpux
    wazuh_agent_aix
    wazuh_agent_sources
    automated_deployment_variables
