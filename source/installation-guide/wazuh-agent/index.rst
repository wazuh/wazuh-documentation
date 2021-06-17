.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent

.. _installation_agents:

Wazuh agent
===========

The Wazuh agent is multi-platform and runs on the hosts that the user wants to monitor. It communicates with the Wazuh manager, sending data in near real time through an encrypted and authenticated channel.

The agent was developed considering the need to monitor a wide variety of different endpoints without impacting their performance. Therefore, it is supported on the most popular operating systems and only requires about 0.1 GB of RAM.

The wazuh agent provides key features to enhance your system’s security. 

- **Log and data collection** - It reads operating system and application logs, and then securely forwards them to a central manager for rule-based analysis and storage.

- **File integrity monitoring** - It monitors the file system, identifying changes in content, permissions, ownership, and attributes of files that need attention.

- **Rootkit and malware detection** -  it scans the monitored systems looking for malware, rootkits, and suspicious anomalies. It can detect hidden files, cloaked processes, or unregistered network listeners as well as inconsistencies in system call responses.

- **Security policy monitoring** -  It monitors system and application configuration settings to ensure they are compliant with your security policies, standards, and hardening guides. 

- **Configuration assessments** - It performs periodic scans to detect applications that are known to be vulnerable, unpatched, or insecurely configured. These configuration checks can be customized to properly align with your organization. Alerts include recommendations for better configuration, references, and mapping with regulatory compliance.

- **Software inventory** -  It pulls software inventory data and sends this information to the server, where it is correlated with continuously updated Common Vulnerabilities and Exposure (CVE) databases, in order to identify well-known vulnerable software.

To install a Wazuh agent, select your operating system and follow the instructions.

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


If you are deploying Wazuh in a large environment, with a high number of servers or endpoints, keep in mind that this deployment might be easier using automation tools such as :ref:`Puppet <wazuh_puppet>`, `Chef <https://github.com/wazuh/wazuh-chef>`_, SCCM, or :ref:`Ansible <wazuh_ansible_guide>`.

.. note:: Compatibility between the Wazuh agent and the Wazuh manager is guaranteed when the Wazuh manager version is later than or equal to that of the Wazuh agent.

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
