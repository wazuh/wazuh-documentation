.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent

.. _installation_agents:

Wazuh agent
===========

The Wazuh agent is multi-platform and runs on the hosts that the user wants to monitor. It provides the following capabilities:

- Log and data collection
- File integrity monitoring
- Rootkit and malware detection
- Security policy monitoring
- Configuration assessments
- Software inventory

The Wazuh agent communicates with Wazuh manager, sending data in near real time through an encrypted and authenticated channel.

The Wazuh agent was developed considering the need to monitor a wide variety of different endpoints without impacting their performance. Therefore, the Wazuh agent is supported on the most popular operating systems and only requires about 0.1 GB of RAM.

There are several options to install a Wazuh agent, depending on the operating system and whether you would like to build from source or not. Check the following table and choose how to proceed for a given agent:

To install a Wazuh agent select your operating system and follow the instructions:

.. raw:: html

  <div class="agent-os">
      <div class="item-agent">
          <a href="./wazuh_agent_package_linux.html" class="d-flex align-items-center">
            <p>Linux</p>

.. image:: ../../images/installation/linux.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh_agent_package_windows.html" class="d-flex align-items-center">
                    <p>Windows</p>

.. image:: ../../images/installation/windows_icon.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh_agent_package_macos.html" class="d-flex align-items-center">
            <p>macOS</p>

.. image:: ../../images/installation/macOS_logo.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh_agent_package_aix.html" class="d-flex align-items-center">
            <p>AIX</p>

.. image:: ../../images/installation/AIX.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh_agent_package_hpux.html" class="d-flex align-items-center">
            <p>HP-UX</p>

.. image:: ../../images/installation/hpux.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent" id="solaris-logo">
        <a href="./wazuh_agent_package_solaris.html" class="d-flex align-items-center">
            <p>Solaris</p>

.. image:: ../../images/installation/solaris.png
      :align: center

.. raw:: html

          </a>
      </div>
  </div>




Each operating system section describes how to deploy the agent using the deployment variables, which facilitates the task of deploying, logging and configuring the agent in a single command. Check the complete guide in the :ref:`deployment variables page <deployment_variables>`.

If you are deploying Wazuh in a large environment, with a high number of servers or endpoints, keep in mind that this deployment may be easier using automation tools such as :ref:`Puppet <wazuh_puppet>`, `Chef <https://github.com/wazuh/wazuh-chef>`_, SCCM or :ref:`Ansible <wazuh_ansible_guide>`.

.. note:: Compatibility between the Wazuh agent and the Wazuh manager is guaranteed when the Wazuh manager has a newer or equal version than the Wazuh agent.

.. rst-class:: d-none

.. toctree::
    :hidden:
    :maxdepth: 2

    Linux <wazuh_agent_package_linux>
    Windows <wazuh_agent_package_windows>
    macOS <wazuh_agent_package_macos>
    AIX <wazuh_agent_package_aix>
    HP-UX <wazuh_agent_package_hpux>
    Solaris <wazuh_agent_package_solaris>   
    deployment_variables/deployment_variables
