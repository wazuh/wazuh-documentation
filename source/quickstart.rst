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

   -  **Manager API address:** If Wazuh manager API clients, such as scripts or a Wazuh dashboard on another host, reach this server through an address it cannot know, add it with ``-ap|--api-san <MANAGER_API_ADDRESS>``. Replace ``<MANAGER_API_ADDRESS>`` with that address. To add more than one address, repeat the option for each. You can use ``-as`` and ``-ap`` in the same command.

      .. code-block:: console

         $ wget https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh && sudo bash ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -a -id -d pre-release -ap <MANAGER_API_ADDRESS>

   When the installation finishes, the assistant prints the address of the Wazuh dashboard, one URL for each IP address of the host, then the username, the password, and the command to read the password again:

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
      INFO: Installation finished.

#. The summary shows the password only when the assistant runs in an interactive terminal. If you redirect its output, for example to a file or a cloud-init log, the summary shows only the command. The password is never written to ``/var/log/wazuh-install.log``. The Wazuh packages generate the passwords during the installation: the Wazuh indexer users are in ``/etc/wazuh-indexer/export/credentials.env``, and the Wazuh manager API users are in ``/etc/wazuh-manager/export/credentials.env``. Only root can read these files. To show the ``admin`` password again, run:

   .. code-block:: console

      $ sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh-indexer/export/credentials.env | cut -d= -f2-

#. Open the Wazuh dashboard at ``https://<WAZUH_DASHBOARD_ADDRESS>`` in a browser. Replace ``<WAZUH_DASHBOARD_ADDRESS>`` with an address of this host that your browser can reach, such as one of the URLs the assistant printed. Log in with the following credentials:

   -  **Username:** ``admin``
   -  **Password:** the ``admin`` password from step 2

The browser warns that the certificate wasn't issued by a trusted authority, because Wazuh creates its own certificate authority. Add an exception in the browser, or, for better security, import ``/etc/wazuh-dashboard/ca/root-ca.pem`` into the browser's certificate manager. You can also :doc:`configure a certificate </user-manual/wazuh-dashboard/configuring-third-party-certs/index>` from a trusted authority.

The Wazuh packages create the certificate authorities, the certificates, and the passwords of the Wazuh users during the installation. Store the passwords in a safe place, and keep the ``/etc/wazuh-indexer/export/credentials.env`` and ``/etc/wazuh-manager/export/credentials.env`` files on a host with more than one central component; the Wazuh manager and the Wazuh dashboard read their passwords from them. To change a password, see :doc:`Password management </user-manual/user-administration/password-management>`.

Each package keeps its certificate authority and the private key of that authority in its ``ca/`` directory: ``/etc/wazuh-indexer/ca``, ``/etc/wazuh-manager/ca``, and ``/etc/wazuh-dashboard/ca``. Back up these three directories in a safe place. You need them to renew certificates.

To remove the Wazuh central components and all their data, run the Wazuh installation assistant using the option ``-u`` or ``--uninstall``. See :doc:`Uninstalling the Wazuh central components </installation-guide/uninstalling-wazuh/central-components>` for details.

Next steps
----------

Now that your Wazuh installation is ready, you can start deploying the Wazuh agent. This can be used to protect laptops, desktops, servers, cloud instances, containers, or virtual machines. The Wazuh agent is lightweight and multi-purpose, providing a variety of security capabilities.

Next, deploy Wazuh agents. Each agent enrolls with a token that you create on this server for the address agents connect to. To deploy agents, follow the instructions for your operating system below, or go to **Agents management** > **Summary** > **Deploy new agent** in the Wazuh dashboard.

.. raw:: html

  <div class="link-boxes-group layout-6">
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="installation-guide/wazuh-agent/index.html#generate-enrollment-token">
        <p class="link-boxes-label">Linux</p>

.. image:: /images/installation/linux.png
      :align: center
      :alt: Tux, the Linux penguin mascot logo

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="installation-guide/wazuh-agent/index.html#generate-enrollment-token">
        <p class="link-boxes-label">Windows</p>

.. image:: /images/installation/windows-logo.png
      :align: center
      :alt: Windows logo

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="installation-guide/wazuh-agent/index.html#generate-enrollment-token">
        <p class="link-boxes-label">macOS</p>

.. image:: /images/installation/macOS-logo.png
      :align: center
      :alt: Apple logo representing macOS

.. raw:: html

      </a>
    </div>
  </div>
