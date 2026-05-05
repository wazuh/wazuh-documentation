.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Visit the Wazuh installation guide and learn more about the deployment process, available installation alternatives, and requirements.

.. _installation_guide:


Installation guide
==================

Wazuh is a security platform that provides unified XDR and SIEM protection for endpoints and cloud workloads. The solution is composed of the :doc:`Wazuh agent </getting-started/components/wazuh-agent>` and three central components: the :doc:`Wazuh manager </getting-started/components/wazuh-server>`, the :doc:`Wazuh indexer </getting-started/components/wazuh-indexer>`, and the :doc:`Wazuh dashboard </getting-started/components/wazuh-dashboard>`.

Wazuh is a free and open source platform. Its components abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_, and the `GNU Affero General Public License version 3 <https://www.gnu.org/licenses/agpl-3.0.en.html>`_ (AGPLv3).

In this installation guide, you will learn how to install Wazuh in your infrastructure. We also offer `Wazuh Cloud <https://wazuh.com/cloud/>`_, our software as a service (SaaS) solution. Wazuh Cloud is ready to use, with no additional hardware or software required, reducing the cost and complexity. Check the `Wazuh Cloud service </cloud-service/index>`__ documentation for more information and take advantage of the `Wazuh Cloud trial <https://console.cloud.wazuh.com/sign-up?landing=trial>`_ to explore this service.


Installing the Wazuh central components
---------------------------------------

You can install the Wazuh indexer, Wazuh manager, and Wazuh dashboard on a single host or distribute them in cluster configurations. Each Wazuh central component supports two deployment methods: Assisted installation, and Step-by-step installation. Both methods provide instructions to install the central components on a single host or on separate hosts.

Check our :doc:`Quickstart </quickstart>` documentation to perform an all-in-one installation of the Wazuh central components. This is the fastest way to get the Wazuh central components up and running.

For more deployment flexibility and customization, install the Wazuh central components by starting with the :doc:`Wazuh indexer <wazuh-indexer/index>` deployment. This deployment method supports both an all-in-one installation and installing components on separate hosts.

Follow this installation workflow:

.. raw:: html

  <div class="link-boxes-group layout-3" data-step="0">
    <div class="steps-line">
      <div class="steps-number future-step">1</div>
      <div class="steps-number future-step">2</div>
      <div class="steps-number future-step">3</div>
    </div>
    <div class="link-boxes-item future-step">
      <a class="link-boxes-link" href="wazuh-indexer/index.html">
        <p class="link-boxes-label">Install the Wazuh indexer</p>

.. image:: ../images/installation/Indexer-noBG.png
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>

    <div class="link-boxes-item future-step">
      <a class="link-boxes-link" href="wazuh-server/index.html">
        <p class="link-boxes-label">Install the Wazuh manager</p>

.. image:: ../images/installation/Server-noBG.png
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>

    <div class="link-boxes-item future-step">
      <a class="link-boxes-link" href="wazuh-dashboard/index.html">
        <p class="link-boxes-label">Install the Wazuh dashboard</p>

.. image:: ../images/installation/Dashboard-noBG.png
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>
  </div>

.. _installing_the_wazuh_agent:

Installing the Wazuh agent
--------------------------

The Wazuh agent is a single, lightweight monitoring software. It is a multi-platform component that you can deploy to laptops, desktops, servers, cloud instances, containers, or virtual machines. It provides visibility into the monitored endpoint by collecting critical system and application records, inventory data, and detecting potential anomalies.

Select your endpoint operating system below and follow the installation steps to deploy the Wazuh agent.

.. raw:: html

  <div class="link-boxes-group layout-6">
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent/wazuh-agent-package-linux.html">
        <p class="link-boxes-label">Linux</p>

.. image:: /images/installation/linux.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent/wazuh-agent-package-windows.html">
        <p class="link-boxes-label">Windows</p>

.. image:: /images/installation/windows-logo.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent/wazuh-agent-package-macos.html">
        <p class="link-boxes-label">macOS</p>

.. image:: /images/installation/macOS-logo.png
      :align: center

.. raw:: html

      </a>
    </div>
  </div>

Packages list
-------------

The :doc:`Packages list <packages-list>` section contains all the packages required for installing Wazuh.

Uninstalling Wazuh
------------------

In the :doc:`Uninstalling Wazuh <uninstalling-wazuh/index>` section, you will find instructions on how to uninstall the Wazuh central components and the Wazuh agent.

.. toctree::
   :maxdepth: 1

   wazuh-indexer/index
   wazuh-server/index
   wazuh-dashboard/index
   wazuh-agent/index
   packages-list
   uninstalling-wazuh/index