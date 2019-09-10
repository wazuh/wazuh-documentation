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

+----------------------------------------------------------+-----------------------------------------------------+
| Type                                                     | Description                                         |
+==========================================================+=====================================================+
| :ref:`AIX installer <wazuh_agent_package_aix>`           | Install Wazuh agents on AIX.                        |
+----------------------------------------------------------+-----------------------------------------------------+
| :ref:`HP-UX installer <wazuh_agent_package_hpux>`        | Install Wazuh agents on HP-UX.                      |
+----------------------------------------------------------+-----------------------------------------------------+
| :ref:`Linux installer <wazuh_agent_linux>`               | Install Wazuh agents on Linux.                      |
+----------------------------------------------------------+-----------------------------------------------------+
| :ref:`macOS installer <wazuh_agent_package_macos>`       | Install Wazuh agents on macOS.                      |
+----------------------------------------------------------+-----------------------------------------------------+
| :ref:`Solaris installer <wazuh_agent_solaris>`           | Install Wazuh agents on Solaris.                    |
+----------------------------------------------------------+-----------------------------------------------------+
| :ref:`Windows installer <wazuh_agent_package_windows>`   | Install Wazuh agents on Windows.                    |
+----------------------------------------------------------+-----------------------------------------------------+

.. note:: The compatibility between Wazuh agent and Wazuh manager is guaranteed when the Wazuh manager has a newer or equal version than the Wazuh agent.

.. note:: Deploying agents to a large number of servers or endpoints can be easier using automation tools like Puppet, Chef, SCCM or Ansible. Consider exploring these options if you are deploying Wazuh in a larger environment.

.. rst-class:: d-none

.. toctree::
    :hidden:
    :maxdepth: 2

    wazuh_agent_package_aix
    wazuh_agent_package_hpux
    linux/index
    wazuh_agent_package_macos
    solaris/index
    wazuh_agent_package_windows
    deployment_variables
