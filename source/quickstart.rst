.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Install and configure Wazuh, the open source security platform, in just a few minutes using the Wazuh installation assistant. 

Quickstart
==========

Wazuh is a security platform that provides unified XDR and SIEM protection for endpoints and cloud workloads. The solution is composed of a single universal agent and three central components: the Wazuh manager, the Wazuh indexer, and the Wazuh dashboard. For more information, check the :doc:`Getting Started </getting-started/index>` documentation.

Wazuh is free and open source. Its components abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_, and the `Apache License, Version 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`_ (ALv2).

This quickstart shows you how to install the Wazuh central components on the same host, using our installation assistant. You can check our :doc:`Installation guide</installation-guide/index>` for more details and other installation options.

Below you can find a section about the requirements needed to install Wazuh. It will help you learn about the hardware requirements and the supported operating systems for your Wazuh installation.

.. _installation_requirements:

Requirements
------------

Hardware
^^^^^^^^

Hardware requirements highly depend on the number of protected endpoints and cloud workloads. This number can help estimate how much data will be analyzed and how many security alerts will be stored and indexed.

Following this quickstart implies deploying the Wazuh manager, the Wazuh indexer, and the Wazuh dashboard on the same host. This is usually enough for monitoring up to 100 endpoints and for 90 days of queryable/indexed alert data. The table below shows the recommended hardware for a quickstart deployment:

.. table::
  :align: center

  +-------------+---------+---------+-----------------------+
  | **Agents**  | **CPU** | **RAM** | **Storage (90 days)** |
  +=============+=========+=========+=======================+
  | **1–25**    | 4 vCPU  | 8 GiB   | 50 GB                 |
  +-------------+---------+---------+-----------------------+
  | **25–50**   | 8 vCPU  | 8 GiB   | 100 GB                |
  +-------------+---------+---------+-----------------------+
  | **50–100**  | 8 vCPU  | 8 GiB   | 200 GB                |
  +-------------+---------+---------+-----------------------+


For larger environments, we recommend a distributed deployment. Multi-node cluster configuration is available for the Wazuh manager and for the Wazuh indexer, providing high availability and load balancing.

Operating system
^^^^^^^^^^^^^^^^

You can install the Wazuh central components on 64-bit Linux systems using Intel, AMD, or ARM architectures (x86_64/AMD64 or AARCH64/ARM64). Wazuh recommends any of the following operating system versions:

.. include:: /_templates/installations/wazuh/recommended-operating-systems.rst

.. note::

   Firewalls can block communication between Wazuh components. Refer to the :ref:`Required ports <default_ports>` section and ensure the necessary ports are open.

.. _quickstart_installing_wazuh:

Installing Wazuh
----------------

#. Download the installation artifacts.

   .. code-block:: console

      # wget -O artifact_urls.yaml https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/artifact_urls_5.0.0-beta1.yaml

#. Download the installation assistant.

   .. code-block:: console

      # wget -O wazuh-install.sh https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-5.0.0-beta1.sh

#. Run the installation assistant.

   .. code-block:: console

      # bash ./wazuh-install.sh -a -d local -id

   The installation assistant deploys the Wazuh central components and generates access credentials.

   Once the assistant finishes the installation, the output shows the access credentials and a message that confirms that the installation was successful. The default password is ``admin``.

   .. code-block:: none
      :emphasize-lines: 4

      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_IP_ADDRESS>
          User: admin
          Password: <ADMIN_PASSWORD>
      INFO: Installation finished.

   You have now installed and configured Wazuh.

#. Access the Wazuh web interface with ``https://<WAZUH_DASHBOARD_IP_ADDRESS>`` and your credentials:

   -  **Username**: ``admin``
   -  **Password**: ``<ADMIN_PASSWORD>``

When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that a trusted authority did not issue the certificate. This is expected, and the user can either accept the certificate as an exception or configure the system to use a certificate from a trusted authority.

If you want to uninstall the Wazuh central components, run the Wazuh installation assistant using the option ``-u`` or ``–-uninstall``.

.. include:: /_templates/installations/disable-wazuh-updates-quickstart.rst

Next steps
----------

Now that your Wazuh installation is ready, you can start deploying the Wazuh agent. This can be used to protect laptops, desktops, servers, cloud instances, containers, or virtual machines. The agent is lightweight and multi-purpose, providing a variety of security capabilities.

Instructions on how to deploy the Wazuh agent can be found in the Wazuh web user interface or in our :doc:`documentation </installation-guide/wazuh-agent/index>`.

.. raw:: html

  <div class="link-boxes-group layout-6">
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="installation-guide/wazuh-agent/wazuh-agent-package-linux.html">
        <p class="link-boxes-label">Linux</p>

.. image:: /images/installation/linux.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="installation-guide/wazuh-agent/wazuh-agent-package-windows.html">
        <p class="link-boxes-label">Windows</p>

.. image:: /images/installation/windows-logo.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="installation-guide/wazuh-agent/wazuh-agent-package-macos.html">
        <p class="link-boxes-label">macOS</p>

.. image:: /images/installation/macOS-logo.png
      :align: center

.. raw:: html

      </a>
    </div>
  </div>
