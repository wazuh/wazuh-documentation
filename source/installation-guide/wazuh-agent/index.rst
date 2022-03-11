.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent

.. _installation_agents:

Wazuh agent
===========

The Wazuh agent is multi-platform and runs on the hosts that the user wants to monitor. It provides the following capabilities:

- Log and data collection
- File integrity monitoring
- Rootkit and malware detection
- Security policy monitoring.
- Configuration assessments
- Software inventory

The Wazuh agent communicates with Wazuh's manager, sending data in near real time through an encrypted and authenticated channel.

The agent was developed considering the need to monitor a wide variety of different endpoints without impacting their performance. It requires 35 MB of RAM on average. Therefore, it is supported on the most popular operating systems.

There are several options to install a Wazuh agent, depending on the operating system and whether you would like to build from source or not. Check the following table and choose how to proceed for a given agent:

+----------------------------------------------------------+-----------------------------------------------------------------------+
| Operating system                                         | Description                                                           |
+==========================================================+=======================================================================+
| :ref:`AIX installer <wazuh_agent_package_aix>`           | Install Wazuh agents on AIX.                                          |
+----------------------------------------------------------+-----------------------------------------------------------------------+
| :ref:`HP-UX installer <wazuh_agent_package_hpux>`        | Install Wazuh agents on HP-UX.                                        |
+----------------------------------------------------------+-----------------------------------------------------------------------+
| :ref:`Linux installer <wazuh_agent_package_linux>`       | Install Wazuh agents on Linux.                                        |
+----------------------------------------------------------+-----------------------------------------------------------------------+
| :ref:`macOS installer <wazuh_agent_package_macos>`       | Install Wazuh agents on macOS.                                        |
+----------------------------------------------------------+-----------------------------------------------------------------------+
| :ref:`Solaris installer <wazuh_agent_solaris>`           | Install Wazuh agents on Solaris.                                      |
+----------------------------------------------------------+-----------------------------------------------------------------------+
| :ref:`Windows installer <wazuh_agent_package_windows>`   | Install Wazuh agents on Windows.                                      |
+----------------------------------------------------------+-----------------------------------------------------------------------+

Each operating system installer document describes how to deploy the agent using the deployment variables, which facilitates the task of deploying, logging and configuring the agent in a single command. Check the complete guide in the :ref:`deployment variables page <deployment_variables>`.

If you are deploying Wazuh in a large environment, with a high number of servers or endpoints, keep in mind that this deployment may be easier using automation tools such as :ref:`Puppet <wazuh_puppet>`, `Chef <https://github.com/wazuh/wazuh-chef>`_, SCCM or :ref:`Ansible <wazuh_ansible_guide>`.

.. note:: Compatibility between the Wazuh agent and the Wazuh manager is guaranteed when the Wazuh manager has a newer or equal version than the Wazuh agent.

.. rst-class:: d-none

.. toctree::
    :hidden:
    :maxdepth: 2

    wazuh_agent_package_aix
    wazuh_agent_package_hpux
    wazuh_agent_package_linux
    wazuh_agent_package_macos
    wazuh_agent_package_solaris
    wazuh_agent_package_windows
    deployment_variables/deployment_variables
