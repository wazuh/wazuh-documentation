.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Visit the Wazuh installation guide and learn more about the deployment process, available installation alternatives, and requirements.
  
.. _installation_guide:


Installation guide
==================

Wazuh is a security platform that provides unified XDR and SIEM protection for endpoints and cloud workloads. The solution is composed of a single universal agent and three central components: the Wazuh server, the Wazuh indexer, and the Wazuh dashboard. For more information, check the :doc:`Getting Started </getting-started/index>` documentation. 

Wazuh is free and open source. Its components abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_ and the `Apache License, Version 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`_ (ALv2). 

In this installation guide, you will learn how to install Wazuh in your infrastructure. We also offer `Wazuh Cloud <https://wazuh.com/cloud/>`_, our software as a service (SaaS) solution. Check the :ref:`Cloud service <cloud_service>` documentation for more information.


.. _admonition: Wazuh Cloud
  :class: note

  We also offer `Wazuh Cloud <https://wazuh.com/cloud/>`_, our software as a service (SaaS) solution. Check the :ref:`Cloud service <cloud_service>` documentation for more information.


Installing the Wazuh central components
---------------------------------------

You can choose between two installation methods for each Wazuh central component. Both options provide you with instructions to install the central components on a single host or on separate hosts. You can also check our :ref:`Quickstart <quickstart>` to get started with Wazuh in just a few minutes.

The Wazuh indexer and Wazuh server can be installed on a single host or be distributed in cluster configurations. To check the requirements and start installing the first of the Wazuh central components, go to the :doc:`Wazuh indexer <wazuh-indexer/index>` section.

This is the installation workflow you will follow:

.. thumbnail:: ../images/installation/Wazuh-Installation-workflow.png
  :title: Wazuh installation workflow
  :align: center
  :width: 100%


Installing the Wazuh agent
--------------------------

The Wazuh agent is a single and lightweight monitoring software. It is a multi-platform component that can be deployed to laptops, desktops, servers, cloud instances, containers, or virtual machines. It provides visibility into the endpoint's security by collecting critical system and application records, inventory data, and detecting potential anomalies. 

If the Wazuh central components are already installed in your environment, select your operating system below and follow the installation steps to deploy the agent on the endpoints. 


.. raw:: html

  <div class="agent-os">
      <div class="item-agent">
          <a href="./wazuh-agent/wazuh-agent-package-linux.html" class="d-flex align-items-center">
            <p>Linux</p>

.. image:: ../images/installation/linux.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent/wazuh-agent-package-windows.html" class="d-flex align-items-center">
                    <p>Windows</p>

.. image:: ../images/installation/windows_icon.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent/wazuh-agent-package-macos.html" class="d-flex align-items-center">
            <p>macOS</p>

.. image:: ../images/installation/macOS_logo.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent" id="solaris-logo">
        <a href="./wazuh-agent/wazuh-agent-package-solaris.html" class="d-flex align-items-center">
            <p>Solaris</p>

.. image:: ../images/installation/solaris.png
      :align: center      

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent/wazuh-agent-package-aix.html" class="d-flex align-items-center">
            <p>AIX</p>

.. image:: ../images/installation/AIX.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent/wazuh-agent-package-hpux.html" class="d-flex align-items-center">
            <p>HP-UX</p>

.. image:: ../images/installation/hpux.png
      :align: center

.. raw:: html

          </a>
      </div>
  </div>



Packages list
-------------

In the :ref:`Packages list <packages>` section, you will find all the packages required for the installation of Wazuh |WAZUH_LATEST|.

Other installation alternatives
-------------------------------

Wazuh provides other :ref:`installation alternatives <deployment>`. These are complementary to the installation methods of this installation guide. You will find instructions on how to deploy Wazuh using ready-to-use machines, containers, and orchestration tools. There is also information on how to install the solution offline, from sources, and with commercial options.


.. toctree::
    :hidden:
    :maxdepth: 1

    wazuh-indexer/index
    wazuh-server/index
    wazuh-dashboard/index
    wazuh-agent/index
    packages-list
