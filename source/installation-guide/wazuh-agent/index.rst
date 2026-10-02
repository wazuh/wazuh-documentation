.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find out in this section more about the Wazuh agent, its capabilities, and the options for installing the agent on different operating systems.

Wazuh agent
===========

The Wazuh agent is multi-platform and runs on the endpoints that you want to monitor. It communicates with the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel.

The Wazuh agent was developed considering the need to monitor a wide variety of different endpoints without impacting their performance. It is supported on the most popular operating systems, and it requires 35 MB of RAM on average.

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
  </div>


If you are deploying Wazuh in a large environment, with a high number of servers or endpoints, keep in mind that this deployment might be easier using automation tools such as SCCM or :doc:`Ansible </deployment-options/deploying-with-ansible/guide/index>`.

.. note:: Compatibility between the Wazuh agent and the Wazuh manager is guaranteed when the Wazuh manager version is later than or equal to that of the Wazuh agent.

You can also deploy a new agent following the instructions in the Wazuh dashboard. Go to **Agents management** > **Summary**, and click on **Deploy new agent**.

.. thumbnail:: /images/installation/deploy-new-agent-from-ui.png
   :align: center
   :width: 80%
   :title: Deploy new agent button
   :alt: Deploy new agent button

Then follow the steps on the Wazuh dashboard to deploy a new agent.

.. thumbnail:: /images/installation/deploy-new-agent-from-ui-options.png
   :align: center
   :width: 80%
   :title: Deploy a new agent instructions
   :alt: Deploy a new agent instructions

.. thumbnail:: /images/installation/deploy-new-agent-from-ui-options-2.png
   :align: center
   :width: 80%
   :title: Deploy a new agent instructions
   :alt: Deploy a new agent instructions

.. thumbnail:: /images/installation/deploy-new-agent-from-ui-options-3.png
   :align: center
   :width: 80%
   :title: Deploy a new agent instructions
   :alt: Deploy a new agent instructions

.. _agent-installation-requirements:

Prerequisite
------------

During enrollment, the Wazuh agent authenticates to the Wazuh manager using an enrollment token. The token identifies the Wazuh manager, includes the enrollment credential, and pins the certificate authority that signs the manager's agent-facing certificate. Create the token on the manager that will issue it. In a cluster, create it on the master node. A worker node cannot create it.

.. _generate_enrollment_token:

Generate the enrollment token
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Complete the following steps to generate the enrollment token.

#. Run the following command to create an enrollment token. Replace ``<MANAGER_ADDRESS>`` with the address that agents use to connect to the Wazuh manager. This address must match an address configured for the manager certificate during installation, that is, either the address defined in ``config.yml`` or an address specified with ``-as|--agent-san``.

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <MANAGER_ADDRESS>

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      eyJ2ZXIiO***********TM3IiwicGluIjoiWThMTGU5SHVpM3RMZ0xL****************WZyIs0tem5ERVI0Qm9NSVR********dNRXcifQ
      id: 6WKOJawvF--znDE***IQ
      endpoint: 192.168.33.137
      expires: 2026-11-01T02:49:26Z (1793501366)
      pin: 63c2cb7bd1******6cd8ea****02158
      credential: yes

#. Copy the generated token and use it as the value of the ``WAZUH_ENROLLMENT_TOKEN`` variable. Then install the Wazuh agent with the token. For example, on a Debian-based endpoint, run:

   .. code-block:: console

      # WAZUH_ENROLLMENT_TOKEN='<ENROLLMENT_TOKEN>' WAZUH_AGENT_NAME='<AGENT_NAME>' dpkg -i wazuh-agent_*.deb

   The installation doesn't start the Wazuh agent. Start it as the section for your operating system describes. The agent enrolls with the Wazuh manager when it first starts.

.. note::

   If a Wazuh agent already has a key, ``wazuh-agent-auth`` refuses a new token with "this agent already has a key". You see the refusal when you move the agent to another Wazuh manager or after you reinstall the central components. Deleting the agent on the Wazuh manager doesn't clear the key, because the check reads the agent's own ``client.keys`` file.

   To enroll the agent again, stop it, save the new token to a file, and run ``wazuh-agent-auth --force-enroll --token-file <TOKEN_FILE_PATH>``. The tool is ``/var/ossec/bin/wazuh-agent-auth`` on Linux and ``C:\Program Files (x86)\ossec-agent\wazuh-agent-auth.exe`` on Windows. The agent gets a new ID and the new CA, and keeps its name. Delete the token file, then start the agent.

.. rst-class:: d-none

.. toctree::
    :hidden:
    :maxdepth: 2

    Linux <wazuh-agent-package-linux>
    Windows <wazuh-agent-package-windows>
    macOS <wazuh-agent-package-macos>

