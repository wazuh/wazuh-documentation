.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find out in this section more about the Wazuh agent, its capabilities, and the options for installing the agent on different operating systems.

Wazuh agent
===========

The Wazuh agent is multi-platform and runs on the endpoints that you want to monitor. It communicates with the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel.

The Wazuh agent was developed considering the need to monitor a wide variety of different endpoints without impacting their performance. It runs on the most popular operating systems. For the supported versions, see :doc:`Requirements </user-manual/agent/agent-enrollment/requirements>`.

The Wazuh agent provides :ref:`key features <agents_modules>` to enhance your system's security.

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

Before you install a Wazuh agent, create an enrollment token on the Wazuh manager, as described in **Prerequisite** below. Then select your operating system and follow the instructions.

.. raw:: html

  <div class="link-boxes-group layout-6">
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent-package-linux.html">
        <p class="link-boxes-label">Linux</p>

.. image:: /images/installation/linux.png
      :alt: Linux penguin mascot logo
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent-package-windows.html">
        <p class="link-boxes-label">Windows</p>

.. image:: /images/installation/windows-logo.png
      :alt: Windows logo
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent-package-macos.html">
        <p class="link-boxes-label">macOS</p>

.. image:: /images/installation/macOS-logo.png
      :alt: macOS Apple logo
      :align: center

.. raw:: html

      </a>
    </div>
  </div>


In a large environment with many servers or endpoints, automation tools such as SCCM or :doc:`Ansible </deployment-options/deploying-with-ansible/guide/index>` can make the deployment easier.

.. note:: The Wazuh agent is compatible with a Wazuh manager of the same version or later.

You can also deploy a new agent following the instructions in the Wazuh dashboard. Go to **Agents management** > **Summary** and click **Deploy new agent**.

.. thumbnail:: /images/installation/deploy-new-agent-from-ui.png
   :align: center
   :width: 80%
   :title: Deploy new agent button
   :alt: Deploy new agent button

Then follow the steps on the Wazuh dashboard to deploy a new agent. The wizard also generates the enrollment token.

.. thumbnail:: /images/installation/deploy-new-agent-from-ui-options.png
   :align: center
   :width: 80%
   :title: Deploy a new agent instructions
   :alt: Deploy a new agent instructions

.. _agent-installation-requirements:

Prerequisite
------------

During enrollment, the Wazuh agent authenticates to the Wazuh manager using an enrollment token. The token tells the agent which Wazuh manager to trust and lets it enroll. Create the token on the Wazuh manager. In a cluster, create it on the master node. A worker node can't create it. The agent connects only to the address of its token. To spread agents across the nodes of a cluster, use a token for a load balancer address, as :ref:`Agent connection address <wazuh_manager_agent_connection_address>` describes. The endpoint must reach the Wazuh manager on port 1517/TCP, which Wazuh 5.x agents use for enrollment and communication.

.. _generate_enrollment_token:

Generate the enrollment token
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Complete the following steps on the Wazuh manager master node to generate the enrollment token.

#. List the addresses that agents can use to reach the Wazuh manager:

   .. code-block:: console

      # openssl x509 -in /etc/wazuh-manager/certs/remoted.pem -noout -ext subjectAltName

   The list depends on how you installed the Wazuh manager.

   -  An assisted installation that uses ``config.yml`` puts the node's ``ip`` and ``dns`` values from ``config.yml`` in the list, followed by any address added with ``-as|--agent-san`` and the node name. The output looks similar to this:

      .. code-block:: none
         :class: output

         IP Address:192.168.33.155, DNS:wazuh-manager.lab.local, DNS:agents.lab.local, DNS:wazuh-1

   -  A step-by-step installation puts the addresses from ``WAZUH_MANAGER_REMOTED_CERT_SANS`` in the list or, without that setting, the server's host name and IP addresses. The list also holds ``localhost``, ``127.0.0.1``, and ``::1``. The output looks similar to this:

      .. code-block:: none
         :class: output

         IP Address:192.168.33.142, DNS:wazuh.example.com, DNS:localhost, IP Address:127.0.0.1, IP Address:0:0:0:0:0:0:0:1

   -  The :doc:`Quickstart </quickstart>` puts the server's host name, its fully qualified domain name, and its IP addresses in the list. The Wazuh manager issues its certificate itself, so the list also holds ``localhost``, ``127.0.0.1``, and ``::1``. The output looks similar to this:

      .. code-block:: none
         :class: output

         DNS:w50-qs, IP Address:192.168.33.146, DNS:localhost, IP Address:127.0.0.1, IP Address:0:0:0:0:0:0:0:1

   -  A Wazuh manager node that takes its certificates from ``wazuh-install-files.tar``, as in a distributed assisted installation, has no loopback address in the list. The output looks similar to this:

      .. code-block:: none
         :class: output

         IP Address:192.168.33.142, DNS:manager

   To enroll a Wazuh agent on that node, use the node's address from the list. A token for any other address fails with ``ERROR 9025: Enrollment token refused: address not in certificate SAN``.

   If an address that agents use isn't in the list, add it to the Wazuh manager certificate first, as :ref:`Agent connection address <wazuh_manager_agent_connection_address>` describes. Examples are a load balancer, a NAT address, or a public name.

#. Run the following command to create an enrollment token. Replace ``<WAZUH_MANAGER_ADDRESS>`` with an address from that list that the endpoints can resolve and reach. With an IP address, enrollment works, but the command prints a warning, because the token stops working if the Wazuh manager's IP address changes. Use a DNS name if agents must verify the Wazuh manager by name or its IP address can change.

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <WAZUH_MANAGER_ADDRESS>

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      eyJ2ZXIiO***********TM3IiwicGluIjoiWThMTGU5SHVpM3RMZ0xL****************WZyIs0tem5ERVI0Qm9NSVR********dNRXcifQ
      id: 6WKOJawvF--znDE***IQ
      endpoint: 192.168.33.137
      expires: 2026-11-01T02:49:26Z (1793501366)
      pin: 63c2cb7bd1******6cd8ea****02158
      credential: yes
      WARNING: the token address '192.168.33.137' is an IP address: the token stops working if the manager's address changes. Use a DNS name if the manager's IP address can change.

   The token is the long line starting with ``eyJ``. The ``id``, ``endpoint``, ``expires``, ``pin``, and ``credential`` lines describe the token. For an IP address, a ``WARNING`` line follows them. The command displays the token only once. By default, tokens are valid for 30 days and can enroll any number of agents. Treat the token like a password.

   To limit its validity or usage, add ``--ttl <DURATION>``, ``--max-uses <N>``, or both, for example ``--ttl 24h``. To recognize the token later, add ``--description '<TEXT>'``, for example ``--description 'Linux web servers'``. The output of ``--list-enrollment-tokens`` shows it in the ``DESCRIPTION`` column.

   To save the token to a file that only root can read, run the command this way instead. Only the token goes to the file.

   .. code-block:: console

      # (umask 077 && /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <WAZUH_MANAGER_ADDRESS> > <TOKEN_FILE_PATH>)

   List existing tokens with:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-authd --list-enrollment-tokens

   Revoke a token with:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-authd --revoke-enrollment-token <TOKEN_ID>

   Replace ``<TOKEN_ID>`` with the token's ``id`` value.

   You can also create, list, and revoke tokens in the Wazuh dashboard, under **Agents management** > **Enrollment tokens**. Click **Create token**, enter an address from the list, and click **Create**. The dashboard shows the token only once.

#. Copy the token. You pass it as ``WAZUH_ENROLLMENT_TOKEN`` when you install the Wazuh agent, as the section for your operating system describes. The installation doesn't start the Wazuh agent. The agent enrolls with the Wazuh manager when it first starts.

.. note::

   To enroll a Wazuh agent that already has a key, for example, after you move it to another Wazuh manager, see :ref:`Re-enrolling a Wazuh agent <reenrolling_wazuh_agent>`.

.. _reenrolling_wazuh_agent:

Re-enrolling a Wazuh agent
--------------------------

If a Wazuh agent already has a key, ``wazuh-agent-auth`` refuses a new token with "this agent already has a key". You see the refusal when you move the agent to another Wazuh manager or after you reinstall the central components. Deleting the agent on the Wazuh manager doesn't clear the key, because the check reads the agent's own ``client.keys`` file.

If the Wazuh manager still lists the agent, remove it there first, as :doc:`Remove agents </user-manual/agent/agent-management/remove-agents>` describes. Otherwise, the Wazuh manager refuses the enrollment with ``Duplicate name``.

To enroll the agent again, run these commands on the endpoint. Replace ``<ENROLLMENT_TOKEN>`` with a token from :ref:`Generate the enrollment token <generate_enrollment_token>`, and ``<TOKEN_FILE_PATH>`` with a file path, for example ``/root/wazuh-token`` or ``C:\wazuh-token.txt``. On Linux and macOS, the command that creates the file waits for the token. Paste it, press Enter, and then press Ctrl+D.

.. tabs::

   .. group-tab:: Linux

      .. code-block:: console
         :emphasize-lines: 2,3,4

         # systemctl stop wazuh-agent
         # (umask 077 && cat > <TOKEN_FILE_PATH>)
         # /var/ossec/bin/wazuh-agent-auth --force-enroll --token-file <TOKEN_FILE_PATH>
         # rm -f <TOKEN_FILE_PATH>
         # systemctl start wazuh-agent

   .. group-tab:: macOS

      .. code-block:: console
         :emphasize-lines: 2,3,4

         # launchctl bootout system /Library/LaunchDaemons/com.wazuh.agent.plist
         # (umask 077 && cat > <TOKEN_FILE_PATH>)
         # /Library/Ossec/bin/wazuh-agent-auth --force-enroll --token-file <TOKEN_FILE_PATH>
         # rm -f <TOKEN_FILE_PATH>
         # launchctl bootstrap system /Library/LaunchDaemons/com.wazuh.agent.plist

   .. group-tab:: Windows

      Run these commands in an administrator PowerShell:

      .. code-block:: ps1con
         :emphasize-lines: 2,3,4

         > Stop-Service WazuhSvc
         > Set-Content -Path "<TOKEN_FILE_PATH>" -Value '<ENROLLMENT_TOKEN>' -Encoding ascii
         > & "C:\Program Files (x86)\ossec-agent\wazuh-agent-auth.exe" --force-enroll --token-file "<TOKEN_FILE_PATH>"
         > Remove-Item "<TOKEN_FILE_PATH>"
         > Start-Service WazuhSvc

On Windows, you can also use **Manage** > **Enroll** in the agent GUI. It asks you to confirm that the agent gets a new ID.

The agent gets a new ID and the new CA, and keeps its name.

In the first minute after the start, the agent log can show ``credential rejected (401); re-enrolling.`` and ``Manager unreachable``, and the agent can be listed as disconnected while the Wazuh manager node loads the new key. The agent enrolls again by itself and connects. If it's still disconnected after a minute, check the agent log: ``/var/ossec/logs/ossec.log`` on Linux, ``/Library/Ossec/logs/ossec.log`` on macOS, or ``C:\Program Files (x86)\ossec-agent\ossec.log`` on Windows.

.. rst-class:: d-none

.. toctree::
    :hidden:
    :maxdepth: 2

    Linux <wazuh-agent-package-linux>
    Windows <wazuh-agent-package-windows>
    macOS <wazuh-agent-package-macos>
