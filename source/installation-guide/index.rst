.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Visit the Wazuh installation guide and learn more about the deployment process, available installation alternatives, and requirements.

.. _installation_guide:


Installation guide
==================

Wazuh is a security platform that provides unified XDR and SIEM protection for endpoints and cloud workloads. The solution is composed of the :doc:`Wazuh agent </getting-started/components/wazuh-agent>` and three central components: the :doc:`Wazuh manager </getting-started/components/wazuh-manager>`, the :doc:`Wazuh indexer </getting-started/components/wazuh-indexer>`, and the :doc:`Wazuh dashboard </getting-started/components/wazuh-dashboard>`.

Wazuh is a free and open source platform. Its components abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_, and the `GNU Affero General Public License version 3 <https://www.gnu.org/licenses/agpl-3.0.en.html>`_ (AGPLv3).

This guide shows how to install Wazuh on your own infrastructure. To use Wazuh without installing anything, try `Wazuh Cloud <https://wazuh.com/cloud/>`__, our SaaS solution: see the Wazuh Cloud service documentation or start a `free trial <https://console.cloud.wazuh.com/sign-up?landing=trial>`__.


Installing the Wazuh central components
---------------------------------------

You can install the Wazuh indexer, Wazuh manager, and Wazuh dashboard on a single host or distribute them in cluster configurations. Each Wazuh central component supports two deployment methods: Assisted installation and Step-by-step installation. Both methods provide instructions to install the central components on a single host or on separate hosts.

Check our :doc:`Quickstart </quickstart>` documentation to perform an all-in-one installation of the Wazuh central components. This is the fastest way to get the Wazuh central components up and running.

For more deployment flexibility and customization, install the Wazuh central components by starting with the :doc:`Wazuh indexer <wazuh-indexer/index>` deployment. This deployment method supports both an all-in-one installation and installing components on separate hosts.

Before you start, choose the name and IP address of every Wazuh indexer, Wazuh manager, and Wazuh dashboard node. You create the certificates and passwords for all of them on one host, usually the first Wazuh indexer node, then copy one archive to every other node.

+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| **I want to...**                           | **Use**                                                                                                                   |
+============================================+===========================================================================================================================+
| Try Wazuh on one Linux host                | :doc:`Quickstart </quickstart>`                                                                                           |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| Install on one or more hosts with a script | :doc:`Assisted installation <wazuh-indexer/installation-assistant>`                                                       |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| Control every step                         | :doc:`Step-by-step installation <wazuh-indexer/step-by-step>`                                                             |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| Install without internet access            | :doc:`Offline installation </deployment-options/offline-installation/index>`                                              |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| Import a ready virtual machine             | :doc:`Virtual machine (OVA) </deployment-options/virtual-machine/virtual-machine>`                                        |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| Run in containers                          | :doc:`Docker </deployment-options/docker/index>`, :doc:`Kubernetes </deployment-options/deploying-with-kubernetes/index>` |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| Automate with Ansible                      | :doc:`Ansible </deployment-options/deploying-with-ansible/index>`                                                         |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+

The assisted and step-by-step methods install one component at a time, and both start on the Wazuh indexer page. Use the same method for the three components.

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
     :alt: Wazuh indexer logo
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>

    <div class="link-boxes-item future-step">
      <a class="link-boxes-link" href="wazuh-manager/index.html">
        <p class="link-boxes-label">Install the Wazuh manager</p>

.. image:: ../images/installation/Server-noBG.png
     :alt: Wazuh manager logo
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>

    <div class="link-boxes-item future-step">
      <a class="link-boxes-link" href="wazuh-dashboard/index.html">
        <p class="link-boxes-label">Install the Wazuh dashboard</p>

.. image:: ../images/installation/Dashboard-noBG.png
     :alt: Wazuh dashboard logo
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>
  </div>

All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^

To install the Wazuh indexer, Wazuh manager, and Wazuh dashboard on one host with the step-by-step method:

-  Follow the Wazuh indexer, Wazuh manager, and Wazuh dashboard step-by-step sections in that order, as root, from the same directory.
-  In ``config.yml``, use the same IP address for the indexer, manager, and dashboard nodes.
-  In the ``<indexer>`` block of the Wazuh manager and in ``opensearch.hosts`` of the Wazuh dashboard, replace ``127.0.0.1`` and ``localhost`` with the IP address you set in ``config.yml``. The Wazuh indexer listens only on that address. Keep ``https://localhost`` in ``wazuh_core.hosts``.
-  Skip the steps for other nodes, and skip **Adding the Wazuh repository** in the Wazuh manager and Wazuh dashboard sections, because the repository is already added.
-  Keep ``wazuh-certificates.tar`` until you install the Wazuh dashboard.
-  Run **Disable Wazuh updates** once, after you install all three components.
-  For hardware requirements, see the all-in-one requirements in the Quickstart.

.. _installing_the_wazuh_agent:

Installing the Wazuh agent
--------------------------

The Wazuh agent is a single, lightweight monitoring software. It is a multi-platform component that you can deploy to laptops, desktops, servers, cloud instances, containers, or virtual machines. It provides visibility into the monitored endpoint by collecting critical system and application records, inventory data, and detecting potential anomalies.

Before you install a Wazuh agent, create an enrollment token on the Wazuh manager, as described in **Generate the enrollment token**. Then select your endpoint operating system below and follow the installation steps.

.. raw:: html

  <div class="link-boxes-group layout-6">
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent/wazuh-agent-package-linux.html">
        <p class="link-boxes-label">Linux</p>

.. image:: /images/installation/linux.png
      :alt: Linux penguin mascot logo
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent/wazuh-agent-package-windows.html">
        <p class="link-boxes-label">Windows</p>

.. image:: /images/installation/windows-logo.png
      :alt: Windows logo
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent/wazuh-agent-package-macos.html">
        <p class="link-boxes-label">macOS</p>

.. image:: /images/installation/macOS-logo.png
      :alt: macOS Apple logo
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

Wazuh provides other :doc:`installation alternatives </deployment-options/index>` as well. These are complementary to the installation methods of this installation guide. You will find instructions on how to deploy Wazuh using ready-to-use machines, containers, and orchestration tools. There is also information on how to install Wazuh offline.

.. toctree::
   :maxdepth: 1

   wazuh-indexer/index
   wazuh-manager/index
   wazuh-dashboard/index
   wazuh-agent/index
   packages-list
   uninstalling-wazuh/index