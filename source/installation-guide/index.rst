.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Visit the Wazuh installation guide and learn more about the deployment process, available installation alternatives, and requirements.

.. _installation_guide:


Installation guide
==================

Wazuh is a security platform that provides unified XDR and SIEM protection for endpoints and cloud workloads. The solution is composed of the :doc:`Wazuh agent </getting-started/components/wazuh-agent>` and three central components: the :doc:`Wazuh server </getting-started/components/wazuh-server>`, the :doc:`Wazuh indexer </getting-started/components/wazuh-indexer>`, and the :doc:`Wazuh dashboard </getting-started/components/wazuh-dashboard>`. For more information, check the :doc:`Getting Started </getting-started/index>` documentation.

Wazuh is free and open source. Its components abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_, and the `Apache License, Version 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`_ (ALv2).

In this installation guide, you will learn how to install Wazuh in your infrastructure. We also offer `Wazuh Cloud <https://wazuh.com/cloud/>`_, our software as a service (SaaS) solution. Wazuh Cloud is ready to use, with no additional hardware or software required, reducing the cost and complexity. Check the :doc:`Wazuh Cloud service </cloud-service/index>` documentation for more information and take advantage of the `Wazuh Cloud trial <https://console.cloud.wazuh.com/sign-up?landing=trial>`_ to explore this service.


Installing the Wazuh central components
---------------------------------------

You can install the Wazuh indexer, Wazuh server, and Wazuh dashboard on a single host or distribute them in cluster configurations. Each Wazuh central component supports two installation methods and both methods provide instructions to install the central components on a single host or on separate hosts.

You can check our :doc:`Quickstart </quickstart>` documentation to perform an all-in-one installation. This is the fastest way to get the Wazuh central components up and running.

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
        <p class="link-boxes-label">Install the Wazuh server</p>

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

.. warning::

   Support for the following operating systems ends in Wazuh 5.0.0: Red Hat 5, CentOS 5, Oracle Linux 5, SUSE Linux Enterprise Server 11, Windows XP, Windows Vista, Windows Server 2003, Solaris, AIX, and HP-UX.

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
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent/wazuh-agent-package-solaris.html">
        <p class="link-boxes-label">Solaris</p>

.. image:: /images/installation/solaris.png
      :align: center
      :width: 150px

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent/wazuh-agent-package-aix.html">
        <p class="link-boxes-label">AIX</p>

.. image:: /images/installation/AIX.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent/wazuh-agent-package-hpux.html">
        <p class="link-boxes-label">HP-UX</p>

.. image:: /images/installation/hpux.png
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

Installation alternatives
-------------------------

Wazuh provides other :doc:`installation alternatives </deployment-options/index>` as well. These are complementary to the installation methods of this installation guide. You will find instructions on how to deploy Wazuh using ready-to-use machines, containers, and orchestration tools. There is also information on how to install the solution offline, from sources, and with alternative components.


.. toctree::
   :maxdepth: 1

   wazuh-indexer/index
   wazuh-server/index
   wazuh-dashboard/index
   wazuh-agent/index
   packages-list
   uninstalling-wazuh/index