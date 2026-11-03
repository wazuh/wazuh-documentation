.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Install and configure Wazuh, the open source security platform, in just a few minutes using the Wazuh installation assistant. 

Quickstart
==========

Wazuh is a security platform that provides unified XDR and SIEM protection for endpoints and cloud workloads. The solution is composed of a single universal agent and three central components: the Wazuh manager, the Wazuh indexer, and the Wazuh dashboard. For more information, check the :doc:`Getting started </getting-started/index>` documentation.

Wazuh is a free and open source platform. Its components abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_, and the `GNU Affero General Public License version 3 <https://www.gnu.org/licenses/agpl-3.0.en.html>`_ (AGPLv3).

This quickstart installs the Wazuh manager, the Wazuh indexer, and the Wazuh dashboard on one host with the installation assistant, a script that downloads, installs, and configures them. For other installation options, see the :doc:`Installation guide </installation-guide/index>`.

.. _installation_requirements:

Requirements
------------

Hardware
^^^^^^^^

Hardware requirements highly depend on the number of protected endpoints and cloud workloads. This number can help estimate how much data will be analyzed and how many security alerts will be stored and indexed.

Following this quickstart implies deploying the Wazuh manager, the Wazuh indexer, and the Wazuh dashboard on the same endpoint. This is usually enough for monitoring up to 100 endpoints and for 90 days of queryable/indexed alert data. The table below shows the recommended hardware for a quickstart deployment:

.. table::
   :align: center

   +-------------+---------+---------+-----------------------+
   | **Agents**  | **CPU** | **RAM** | **Storage (90 days)** |
   +=============+=========+=========+=======================+
   | **1-25**    | 4 vCPU  | 8 GB    | 50 GB                 |
   +-------------+---------+---------+-----------------------+
   | **26-50**   | 8 vCPU  | 16 GB   | 100 GB                |
   +-------------+---------+---------+-----------------------+
   | **51-100**  | 8 vCPU  | 16 GB   | 200 GB                |
   +-------------+---------+---------+-----------------------+


For larger environments, we recommend a distributed deployment. Multi-node cluster configuration is available for the Wazuh manager and for the Wazuh indexer, providing high availability and load balancing.

Operating system
^^^^^^^^^^^^^^^^

The Wazuh central components require a 64-bit Intel, AMD, or ARM Linux processor (x86_64/AMD64 or AARCH64/ARM64 architecture). Wazuh recommends the following operating system versions:

.. include:: /_templates/installations/wazuh/recommended-operating-systems.rst

.. _quickstart_installing_wazuh:

Installing Wazuh
----------------

You need a host that meets the requirements above, internet access, and a user with sudo privileges. The installation takes about 5 to 10 minutes.

.. note::

   If a firewall such as firewalld or UFW is active on the endpoint, allow incoming traffic on the following ports. This lets Wazuh agents and users reach the Wazuh central components:

   -  **1517/TCP**: Wazuh 5.x agent enrollment and connection.
   -  **443/TCP**: Wazuh dashboard web interface.
   -  **1514/TCP and 1515/TCP**: only needed if Wazuh 4.x agents connect to this deployment. A Wazuh 4.x agent that enrolls for the first time also needs this server's enrollment password. Read it with ``sudo cat /etc/wazuh-manager/authd.pass`` and pass it as ``WAZUH_REGISTRATION_PASSWORD`` when you install the agent, or write it to ``/var/ossec/etc/authd.pass`` on the agent and restart it.

   For example, with firewalld, run ``sudo firewall-cmd --permanent --add-port=443/tcp --add-port=1517/tcp && sudo firewall-cmd --reload``. With UFW, run ``sudo ufw allow 443/tcp && sudo ufw allow 1517/tcp``. To check whether a firewall is active, run ``sudo firewall-cmd --state`` or ``sudo ufw status``.

   See :ref:`required ports <default_ports>` for the full list of default ports.

#. Download and run the installation assistant to deploy the Wazuh central components and generate the credentials required to access the Wazuh dashboard. In the commands, ``-a`` installs all the central components on this host, ``-id`` installs missing operating system dependencies without asking, and ``-d pre-release`` downloads the release candidate packages.

   -  **Default address:** If agents connect to this server's hostname or one of its IP addresses, run the following command.

      .. code-block:: console

         $ wget https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh && sudo bash ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -a -id -d pre-release

   -  **Alternative address:** If agents connect through an address this server can't detect, such as a public IP address, a NAT address, a DNS name, or a load balancer, add it with ``-as|--agent-san <ALTERNATE_ADDRESS>``. Repeat ``-as`` for each address, for example, ``-as 203.0.113.10 -as wazuh.example.com``.

      .. code-block:: console

         $ wget https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh && sudo bash ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -a -id -d pre-release -as <ALTERNATE_ADDRESS>

   -  **Manager API access:** If scripts or a Wazuh dashboard on other hosts will call the Wazuh manager API through an address this server can't detect, such as a public IP address or DNS name, add ``-ap|--api-san <MANAGER_API_ADDRESS>``. Replace ``<MANAGER_API_ADDRESS>`` with that address. The API then keeps listening on all network interfaces, and this address is added to its certificate. Repeat ``-ap`` for each address, for example, ``-ap 203.0.113.20 -ap api.example.com``. You can combine ``-as`` and ``-ap``.

      .. code-block:: console

         $ wget https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh && sudo bash ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -a -id -d pre-release -ap <MANAGER_API_ADDRESS>

   When the installation finishes, the assistant prints a summary. It shows one Wazuh dashboard URL for each IP address of the host, the username, and the password. It also shows the command to read the password again and how to enroll agents:

   .. code-block:: none
      :class: output

      INFO: Wazuh dashboard web application initialized.
      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_ADDRESS>:443
      INFO:     User: admin (Wazuh dashboard login and Wazuh indexer administrator)
      INFO:     Password: <ADMIN_PASSWORD>
      INFO:     To read the password again, run:
      INFO:         sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh-indexer/export/credentials.env | cut -d= -f2-
      INFO: The passwords of the other users are in /etc/wazuh-indexer/export/credentials.env and /etc/wazuh-manager/export/credentials.env.
      INFO: --- Next steps ---
      INFO: To enroll agents, use Deploy new agent in the Wazuh dashboard, or create an enrollment token on this server:
      INFO:     sudo /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <WAZUH_MANAGER_ADDRESS>
      INFO: For more information, see https://documentation.wazuh.com/5.0/installation-guide/wazuh-agent/index.html
      INFO: Installation finished.

#. The summary shows the password only when the assistant runs in an interactive terminal. If you redirect its output, for example to a file or a cloud-init log, the summary shows only the command to read it. The assistant never writes the password to ``/var/log/wazuh-install.log``. To show the ``admin`` password again, run:

   .. code-block:: console

      $ sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh-indexer/export/credentials.env | cut -d= -f2-

#. Open the Wazuh dashboard at ``https://<WAZUH_DASHBOARD_ADDRESS>`` in a browser. Replace ``<WAZUH_DASHBOARD_ADDRESS>`` with an address of this host that your browser can reach, such as one of the URLs the assistant printed. Log in with the following credentials:

   -  **Username:** ``admin``
   -  **Password:** the ``admin`` password from step 2

   The browser warns that the certificate wasn't issued by a trusted authority, because Wazuh creates its own certificate authority. Add an exception in the browser, or, for better security, import ``/etc/wazuh-dashboard/ca/root-ca.pem`` into the browser's certificate manager. You can also :doc:`configure a certificate </user-manual/wazuh-dashboard/configuring-third-party-certs/index>` from a trusted authority.

#. If you configured API access using the Manager API access option in step 1, skip this step. By default, the assistant makes the Wazuh manager API listen only on this host (``127.0.0.1`` and ``::1``). If scripts or a Wazuh dashboard on other hosts need to access the Wazuh manager API, set ``host: ['0.0.0.0', '::']`` in ``/var/wazuh-manager/api/configuration/api.yaml`` to allow external connections. Then run the following command to restart the Wazuh manager:

   .. code-block:: console

      $ sudo systemctl restart wazuh-manager

   The Wazuh manager API clients must then use this host's name or IP address.

The Wazuh packages create the certificate authorities, certificates, and Wazuh user passwords during installation. Store the passwords in a safe place. Keep the ``/etc/wazuh-indexer/export/credentials.env`` and ``/etc/wazuh-manager/export/credentials.env`` files, readable by root only. The Wazuh components take their passwords from their keystores. At every start, they check these files and refuse to start if one has the wrong owner or permissions. The command in step 2 reads the admin password from ``/etc/wazuh-indexer/export/credentials.env``. To change a password, see :doc:`Password management </user-manual/user-administration/password-management>`.

Each package keeps its certificate authority and the private key of that authority in its ``ca/`` directory: ``/etc/wazuh-indexer/ca``, ``/etc/wazuh-manager/ca``, and ``/etc/wazuh-dashboard/ca``. Back up these three directories in a safe place. You need them to renew certificates.

To remove the Wazuh central components and all their data, run the Wazuh installation assistant using the option ``-u`` or ``--uninstall``. See :doc:`Uninstalling the Wazuh central components </installation-guide/uninstalling-wazuh/central-components>` for details.

Next steps
----------

Now that your Wazuh installation is ready, you can start deploying the Wazuh agent. This can be used to protect laptops, desktops, servers, cloud instances, containers, or virtual machines. The Wazuh agent is lightweight and multi-purpose, providing a variety of security capabilities.

Next, deploy Wazuh agents. Each agent enrolls with a token that you create on this server for the address agents connect to. The assistant printed the command that creates it, under Next steps in its summary. Create the token first, as described in :ref:`Generate the enrollment token <generate_enrollment_token>`. Then follow the instructions for your operating system below. You can also go to **Agents management** > **Summary** > **Deploy new agent** in the Wazuh dashboard. Its wizard generates the token too. The Wazuh manager doesn't monitor the server it runs on. To monitor this server too, deploy a Wazuh agent on it with a token for this server's own address.

.. raw:: html

  <div class="link-boxes-group layout-6">
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="installation-guide/wazuh-agent/wazuh-agent-package-linux.html">
        <p class="link-boxes-label">Linux</p>

.. image:: /images/installation/linux.png
      :align: center
      :alt: Tux, the Linux penguin mascot logo

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="installation-guide/wazuh-agent/wazuh-agent-package-windows.html">
        <p class="link-boxes-label">Windows</p>

.. image:: /images/installation/windows-logo.png
      :align: center
      :alt: Windows logo

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="installation-guide/wazuh-agent/wazuh-agent-package-macos.html">
        <p class="link-boxes-label">macOS</p>

.. image:: /images/installation/macOS-logo.png
      :align: center
      :alt: Apple logo representing macOS

.. raw:: html

      </a>
    </div>
  </div>
