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

You can install the Wazuh central components on 64-bit Linux systems using Intel, AMD, or ARM architectures (x86_64/AMD64 or AARCH64/ARM64). Wazuh recommends any of the following operating system versions:

.. include:: /_templates/installations/wazuh/recommended-operating-systems.rst

.. _quickstart_installing_wazuh:

Installing Wazuh
----------------

You need a host that meets the requirements above, internet access, and a user with sudo privileges. The installation takes about 5 to 10 minutes.

.. note::

   If a firewall such as firewalld or UFW is active on the endpoint, allow incoming traffic on the following ports. This lets Wazuh agents and users reach the Wazuh central components:

   -  **1517/TCP**: Wazuh 5.x agent enrollment and connection.
   -  **443/TCP**: Wazuh dashboard web interface.
   -  **1514/TCP and 1515/TCP**: only needed if Wazuh 4.x agents connect to this deployment.

   For example, with firewalld, run ``sudo firewall-cmd --permanent --add-port=443/tcp --add-port=1517/tcp && sudo firewall-cmd --reload``. With UFW, run ``sudo ufw allow 443/tcp && sudo ufw allow 1517/tcp``. To check whether a firewall is active, run ``sudo firewall-cmd --state`` or ``sudo ufw status``.

   See :ref:`required ports <default_ports>` for the full list of default ports.

#. Download and run the installation assistant to deploy the Wazuh central components and generate the credentials required to access the Wazuh dashboard. In the commands, ``-a`` installs all the central components on this host, ``-id`` installs missing operating system dependencies without asking, and ``-d pre-release`` downloads the release candidate packages.

   -  **Default address:** The assistant adds this server's hostname and all its IP addresses to the certificate that agents check. If agents connect to one of them, run:

      .. code-block:: console

         $ wget https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh && sudo bash ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -a -id -d pre-release

   -  **Alternative address:** If agents connect through an address this server cannot know, such as a public IP address, a NAT address, a DNS name, or a load balancer, add it with ``-as|--agent-san <ALTERNATE_ADDRESS>``. Replace ``<ALTERNATE_ADDRESS>`` with that address. To add more than one address, repeat the option for each.

      .. code-block:: console

         $ wget https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh && sudo bash ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -a -id -d pre-release -as <ALTERNATE_ADDRESS>

   When the installation finishes, the assistant prints the address of the Wazuh dashboard, one URL for each IP address of the host, then the user name and the command that shows the password:

   .. code-block:: none
      :class: output

      INFO: Wazuh dashboard web application initialized.
      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_ADDRESS>:443
      INFO:     User: admin (Wazuh dashboard login and Wazuh indexer administrator)
      INFO:     Password: to read it from the credentials file, run:
      INFO:         sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-
      INFO: The other users of the deployment are listed at the top of /etc/wazuh/credentials.env.
      INFO: Installation finished.

#. The installation assistant stores the passwords of all Wazuh users in ``/etc/wazuh/credentials.env``, which only root can read. Run the following command to show the ``admin`` password:

   .. code-block:: console

      $ sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-

#. Open the Wazuh dashboard at ``https://<WAZUH_DASHBOARD_ADDRESS>`` in a browser. Replace ``<WAZUH_DASHBOARD_ADDRESS>`` with an address of this host that your browser can reach, such as one of the URLs the assistant printed. Log in with the following credentials:

   -  **Username:** ``admin``
   -  **Password:** the ``admin`` password from step 2

When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that a trusted authority did not issue the certificate. This is expected because the installation assistant creates its own certificate authority. Accept the certificate as an exception, or :doc:`use a certificate from a trusted authority </user-manual/wazuh-dashboard/configuring-third-party-certs/index>`.

The ``/etc/wazuh/credentials.env`` file holds the passwords of all five Wazuh users, and no component reads it after the installation. Store the passwords in a safe place, then remove the file with ``sudo rm -f /etc/wazuh/credentials.env``. Keep ``/etc/wazuh/ca``, which holds the root CA private key you need to add nodes or renew certificates. The passwords tool writes new passwords to this file again, as described in :doc:`Password management </user-manual/user-administration/password-management>`.

To remove the Wazuh central components and all their data, run the Wazuh installation assistant using the option ``-u`` or ``--uninstall``. See :doc:`Uninstalling the Wazuh central components </installation-guide/uninstalling-wazuh/central-components>` for details.

Next steps
----------

Now that your Wazuh installation is ready, you can start deploying the Wazuh agent. This can be used to protect laptops, desktops, servers, cloud instances, containers, or virtual machines. The Wazuh agent is lightweight and multi-purpose, providing a variety of security capabilities.

Each agent enrolls with a token that you create on this server for the address agents connect to (see step 1). To deploy agents, follow the instructions for your operating system below, or go to **Agents management** > **Summary** > **Deploy new agent** in the Wazuh dashboard.

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
