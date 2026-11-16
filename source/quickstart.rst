.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Install and configure Wazuh, the open source security platform, in just a few minutes using the Wazuh installation assistant.

Quickstart
==========

Wazuh is a security platform that provides unified XDR and SIEM protection for endpoints and cloud workloads. The solution is composed of a single universal agent and three central components: the Wazuh manager, the Wazuh indexer, and the Wazuh dashboard. For more information, check the :doc:`Getting started </getting-started/index>` documentation.

Wazuh is free and open source. Its components abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`__ (GPLv2), the `GNU Affero General Public License, version 3 <https://www.gnu.org/licenses/agpl-3.0.en.html>`__ (AGPLv3), and the `Apache License, Version 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`__ (ALv2).

This quickstart shows you how to install the Wazuh manager, Wazuh indexer, and Wazuh dashboard on a single endpoint using the :doc:`installation assistant </user-manual/reference/installation-utilities/installation-assistant>`. For other installation options, see the :doc:`Installation guide </installation-guide/index>`.

.. _installation_requirements:

Requirements
------------

Hardware
^^^^^^^^

Hardware requirements highly depend on the number of protected endpoints and cloud workloads. This number helps determine how much data Wazuh analyzes and the number of findings the Wazuh indexer stores.

This quickstart deploys the Wazuh manager, Wazuh indexer, and Wazuh dashboard on the same endpoint. This deployment is usually enough to monitor up to 100 endpoints and keep 90 days of findings. The following table lists the recommended hardware for a quickstart deployment.

.. table::
   :align: center

   +------------+---------+---------+-----------------------+
   | **Agents** | **CPU** | **RAM** | **Storage (90 days)** |
   +============+=========+=========+=======================+
   | 1–25       | 4 vCPU  | 8 GB    | 50 GB                 |
   +------------+---------+---------+-----------------------+
   | 26–50      | 8 vCPU  | 16 GB   | 100 GB                |
   +------------+---------+---------+-----------------------+
   | 51–100     | 8 vCPU  | 16 GB   | 200 GB                |
   +------------+---------+---------+-----------------------+

For larger environments, we recommend a :doc:`distributed deployment </installation-guide/index>`. Multi-node cluster configuration is available for the Wazuh manager and for the Wazuh indexer, providing high availability and load balancing.

Operating system
^^^^^^^^^^^^^^^^

The Wazuh central components require a 64-bit Intel, AMD, or ARM Linux processor (x86_64/AMD64 or AARCH64/ARM64 architecture). We recommend the following operating system versions.

.. table::
   :align: center

   +--------------------------+--------------------------+
   | **Operating system**     | **Recommended versions** |
   +==========================+==========================+
   | Amazon Linux             | 2023                     |
   +--------------------------+--------------------------+
   | Ubuntu                   | 24.04 LTS, 26.04 LTS     |
   +--------------------------+--------------------------+
   | Red Hat Enterprise Linux | 9, 10                    |
   +--------------------------+--------------------------+

.. _quickstart_installing_wazuh:

Installing Wazuh
----------------

You need an endpoint that meets the requirements above, internet access, and a user with sudo privileges. The installation takes about 5 to 10 minutes.

#. Download and run the installation assistant to deploy the Wazuh central components and generate the credentials required to access the Wazuh dashboard.

   .. note::

      -  Allow incoming traffic on ports ``443/TCP`` and ``1517/TCP``. For Wazuh 4.x agents, also allow traffic on ``1514/TCP`` and ``1515/TCP``. Apply these rules to your cloud security group and to any active endpoint firewall as well. See :ref:`Required ports <default_ports>`.
      -  If :ref:`agents connect through another address <wazuh_manager_agent_connection_address>`, such as an FQDN, load balancer, or public IP address, add it with ``-as <ADDRESS>``, for example, ``-as wazuh.example.com``. Repeat ``-as`` for each extra address. Otherwise, agents cannot enroll through that address.

   .. code-block:: console

      $ wget https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh && sudo bash ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -a -id -d pre-release

   When the installation finishes, the assistant prints a summary. It shows one Wazuh dashboard URL for each IP address of the endpoint, the username, the password, and the command to read the password again. The assistant displays the password only when it runs in an interactive terminal. If you redirect its output, for example, to a file or cloud-init log, the summary displays only the password retrieval command:

   .. code-block:: none
      :class: output
      :emphasize-lines: 3,5

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

      On a cloud instance, open the Wazuh dashboard at its public IP address or DNS name, not the private address the summary might show. The browser warns about the certificate the first time, because Wazuh creates its own certificate authority. Add an exception in the browser, or :doc:`configure a certificate from a trusted authority </user-manual/wazuh-dashboard/configuring-third-party-certs/index>`.

#. Open the Wazuh dashboard at ``https://<WAZUH_DASHBOARD_ADDRESS>`` in a browser. Replace ``<WAZUH_DASHBOARD_ADDRESS>`` with an address of this endpoint that your browser can reach, such as one of the URLs the assistant printed.

   Log in with the following credentials:

   -  **Username**: ``admin``
   -  **Password**: The admin password from the summary

   For information about where passwords are saved and how to change them, see :doc:`Password management </user-manual/user-administration/password-management>`.

Next steps
----------

Now that your Wazuh installation is ready, you can start deploying Wazuh agents to protect laptops, desktops, servers, cloud instances, containers, and virtual machines. The Wazuh manager doesn't monitor the endpoint it runs on. To monitor that endpoint, deploy a Wazuh agent on it as well.

Complete these steps in the Wazuh dashboard to add your first agent.

#. Go to **Agents management** > **Summary**, click **Deploy new agent**, and select the package for your endpoint.
#. Enter the address the endpoint uses to reach the Wazuh manager, such as an address configured with ``-as``, then click **Generate token**.
#. Run the installation and start commands on the endpoint where you want to install the Wazuh agent.
#. Check that **Agents management** > **Summary** lists the agent as **Active**.

For more options, see :doc:`Deploying Wazuh agents </installation-guide/wazuh-agent/index>`.
