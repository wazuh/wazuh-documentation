.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Find out in this section more about the Wazuh agent, its capabilities, and the options for installing the agent on different operating systems.

.. _installation_agents:

Wazuh agent
===========

The Wazuh agent is multi-platform and runs on the hosts that the user wants to monitor. It communicates with the Wazuh manager, sending data in near real time through an encrypted and authenticated channel.

The agent was developed considering the need to monitor a wide variety of different endpoints without impacting their performance. It requires 35 MB of RAM on average. Therefore, it is supported on the most popular operating systems.

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

  <div class="link-boxes-group">
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent-package-linux.html">
        <p class="link-boxes-label">Linux</p>

.. image:: /images/installation/linux.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent-package-windows.html">
        <p class="link-boxes-label">Windows</p>

.. image:: /images/installation/windows-logo.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent-package-macos.html">
        <p class="link-boxes-label">macOS</p>

.. image:: /images/installation/macOS-logo.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent-package-solaris.html">
        <p class="link-boxes-label">Solaris</p>

.. image:: /images/installation/solaris.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent-package-aix.html">
        <p class="link-boxes-label">AIX</p>

.. image:: /images/installation/AIX.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent-package-hpux.html">
        <p class="link-boxes-label">HP-UX</p>

.. image:: /images/installation/hpux.png
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
    Solaris <wazuh-agent-package-solaris>
    AIX <wazuh-agent-package-aix>
    HP-UX <wazuh-agent-package-hpux>
       
