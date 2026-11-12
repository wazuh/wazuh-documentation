.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Install and configure Wazuh, the open source security platform, in just a few minutes using the Wazuh installation assistant. 

Quickstart
==========

Wazuh is a security platform that provides unified XDR and SIEM protection for endpoints and cloud workloads. The solution is composed of a single universal agent and three central components: the Wazuh manager, the Wazuh indexer, and the Wazuh dashboard. For more information, check the :doc:`Getting started </getting-started/index>` documentation.

Wazuh is free and open source. Its components abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`__ (GPLv2), the `GNU Affero General Public License, version 3 <https://www.gnu.org/licenses/agpl-3.0.en.html>`__ (AGPLv3), and the `Apache License, Version 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`__ (ALv2).

This quickstart shows you how to install the Wazuh central components on the same host using the installation assistant, a script that downloads, installs, and configures them. You can check our :doc:`Installation guide </installation-guide/index>` for more details and other installation options.

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


For larger environments, we recommend a :doc:`distributed deployment </installation-guide/index>`. Multi-node cluster configuration is available for the Wazuh manager and for the Wazuh indexer, providing high availability and load balancing.

Operating system
^^^^^^^^^^^^^^^^

The Wazuh central components require a 64-bit Intel, AMD, or ARM Linux processor (x86_64/AMD64 or AARCH64/ARM64 architecture). Wazuh recommends the following operating system versions:

.. include:: /_templates/installations/wazuh/recommended-operating-systems.rst

.. _quickstart_installing_wazuh:

Installing Wazuh
----------------

You need a host that meets the requirements above, internet access, and a user with sudo privileges. The installation takes about 5 to 10 minutes.

#. Download and run the installation assistant to deploy the Wazuh central components and generate the credentials required to access the Wazuh dashboard.

   .. note::

      -  Allow incoming traffic on ports ``443/TCP`` and ``1517/TCP``, and on ``1514/TCP`` and ``1515/TCP`` for Wazuh 4.x agents, including in your cloud security group (see :ref:`required ports <default_ports>`).
      -  If agents will connect through an FQDN, a load balancer, or a public IP address, add it with ``-as <ADDRESS>``, for example, ``-as wazuh.example.com``. Otherwise, agents can't enroll through it.

   .. code-block:: console

      $ wget https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh && sudo bash ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -a -id -d pre-release

   When the installation finishes, the assistant prints a summary. It shows one Wazuh dashboard URL for each IP address of the host, the username, the password, and the command to read the password again. The password appears only when the assistant runs in an interactive terminal. If you redirect its output, for example to a file or a cloud-init log, the summary shows only the command to read it:

   .. code-block:: none
      :class: output
      :emphasize-lines: 5

      INFO: Wazuh dashboard web application initialized.
      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_ADDRESS>:443
      INFO:     User: admin (Wazuh dashboard login and Wazuh indexer administrator)
      INFO:     Password: <ADMIN_PASSWORD>
      INFO:     To read the password again, run:
      INFO:         sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh-indexer/export/credentials.env | cut -d= -f2-
      INFO: The passwords of the other users are in /etc/wazuh-indexer/export/credentials.env and /etc/wazuh-manager/export/credentials.env.
      ...

   .. note::

      On a cloud instance, open the dashboard at its public IP address or DNS name, not the private address the summary may show. The browser warns about the certificate the first time, because Wazuh uses its own certificate authority: add an exception, or :doc:`use a trusted certificate </user-manual/wazuh-dashboard/certificates>`.

#. Open the Wazuh dashboard at ``https://<WAZUH_DASHBOARD_ADDRESS>`` in a browser. Replace ``<WAZUH_DASHBOARD_ADDRESS>`` with an address of this host that your browser can reach, such as one of the URLs the assistant printed.

   Log in with the following credentials:

   -  Username: ``admin``
   -  Password: the admin password from the summary (to change a password, see :doc:`Password management </user-manual/user-administration/password-management>`).

Next steps
----------

Now that your Wazuh installation is ready, you can start deploying the Wazuh agent. This can be used to protect laptops, desktops, servers, cloud instances, containers, or virtual machines. The Wazuh manager doesn't monitor the server it runs on, so deploy an agent on it too if you want it monitored.

To add your first agent from the Wazuh dashboard:

#. In **Agents management** > **Summary**, click **Deploy new agent** and select the endpoint's package.
#. Enter the server's address (the one set with ``-as``, if you used it) and click **Generate token**.
#. Run the install and start commands on the endpoint.

For more options, see :doc:`Deploying Wazuh agents </installation-guide/wazuh-agent/index>`.
