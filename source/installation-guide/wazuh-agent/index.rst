.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out in this section more about the Wazuh agent, its capabilities, and the options for installing the agent on different operating systems.

.. _installation_agents:

Wazuh agent
===========

The Wazuh agent is multi-platform and runs on the endpoints that the user wants to monitor. It communicates with the Wazuh server, sending data in near real-time through an encrypted and authenticated channel.

The agent was developed considering the need to monitor a wide variety of different endpoints without impacting their performance. It is supported on the most popular operating systems, and it requires 35 MB of RAM on average.

The Wazuh agent provides :ref:`key features <agents_modules>` to enhance your system’s security.

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
     - Container security
   * - Cloud security
     -

To install a Wazuh agent, select your operating system and follow the instructions.

.. raw:: html

  <div class="link-boxes-group layout-6">
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
      :width: 150px

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


If you are deploying Wazuh in a large environment, with a high number of servers or endpoints, keep in mind that this deployment might be easier using automation tools such as :doc:`Puppet </deployment-options/deploying-with-puppet/index>`, `Chef <https://github.com/wazuh/wazuh-chef>`_, SCCM, or :doc:`Ansible </deployment-options/deploying-with-ansible/installation-guide>`.

.. note:: Compatibility between the Wazuh agent and the Wazuh manager is guaranteed when the Wazuh manager version is later than or equal to that of the Wazuh agent.

You can also deploy a new agent following the instructions in the Wazuh dashboard. Go to **Agents management** > **Summary**, and click on **Deploy new agent**.

  .. thumbnail::  /images/installation/deploy-new-agent-from-ui.png
    :align: center
    :width: 80%
    :title: Deploy new agent button
    :alt: Deploy new agent button

Then the Wazuh dashboard will show you the steps to deploy a new agent.

  .. thumbnail::  /images/installation/deploy-new-agent-from-ui-options.png
    :align: center
    :width: 80%
    :title: Deploy a new agent instructions
    :alt: Deploy a new agent instructions

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

