.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Find out in this section more about the Wazuh agent, its capabilities, and the options for installing the agent on different operating systems.

.. _installation_agents:

Wazuh agent
===========

The Wazuh agent is multi-platform and runs on the hosts that the user wants to monitor. It communicates with the Wazuh manager, sending data in near real time through an encrypted and authenticated channel.

The agent was developed considering the need to monitor a wide variety of different endpoints without impacting their performance. Therefore, it is supported on the most popular operating systems and only requires about 0.1 GB of RAM.

The wazuh agent provides :ref:`key features <agents_modules>` to enhance your system’s security. 

.. list-table::
   :width: 100%
   :widths: 50 50

   * - Log collector
     - Command execution
   * - File integrity monitoring (FIM) 
     - Security configuration assessment (SCA) 
   * - System inventory 
     - Malware detection
   * - Active response
     - Containers security monitoring
   * - Cloud security monitoring
     -

To install a Wazuh agent, select your operating system and follow the instructions.

.. raw:: html

  <div class="agent-os">
      <div class="item-agent">
          <a href="./wazuh-agent-package-linux.html" class="d-flex align-items-center">
            <p>Linux</p>

.. image:: ../../images/installation/linux.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent-package-windows.html" class="d-flex align-items-center">
                    <p>Windows</p>

.. image:: ../../images/installation/windows_icon.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent-package-macos.html" class="d-flex align-items-center">
            <p>macOS</p>

.. image:: ../../images/installation/macOS_logo.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent-package-aix.html" class="d-flex align-items-center">
            <p>AIX</p>

.. image:: ../../images/installation/AIX.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent-package-hpux.html" class="d-flex align-items-center">
            <p>HP-UX</p>

.. image:: ../../images/installation/hpux.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent" id="solaris-logo">
        <a href="./wazuh-agent-package-solaris.html" class="d-flex align-items-center">
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

    Linux <wazuh-agent-package-linux>
    Windows <wazuh-agent-package-windows>
    macOS <wazuh-agent-package-macos>
    AIX <wazuh-agent-package-aix>
    HP-UX <wazuh-agent-package-hpux>
    Solaris <wazuh-agent-package-solaris>   
    deployment-variables/deployment-variables
