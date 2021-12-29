.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Visit the Wazuh installation guide and learn more about the deployment process, available installation alternatives, and requirements.
  
.. _installation_guide:


Installation guide
==================

Wazuh is a free and open source security platform that unifies XDR and SIEM capabilities. The solution is composed of a single universal agent and three central components: the :ref:`Wazuh server <wazuh_server>`, the :ref:`Wazuh indexer <wazuh_indexer>`, and the :ref:`Wazuh dashboard <wazuh_dashboard>`. For more information about its components, architecture, and capabilities, you can check the :ref:`Getting started <getting_started>` section.  

The Wazuh server and the Wazuh agent abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_ and the Wazuh indexer and the Wazuh dashboard by the `Apache License, Version 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`_ (ALv2). 


Installing the Wazuh central components
---------------------------------------

In this installation guide, you will learn how to install Wazuh in your infrastructure. You can choose between two installation modes for each Wazuh central component. Both options provide you with instructions to install the central components on a single host or on separate hosts. You can also check our :ref:`Quickstart <quickstart>` to get started with Wazuh in just a few minutes.

You install one by one the central components choosing between two installation methods: Unattended or Step-by-step.

- Unattended: You can install Wazuh using a script that automates the installation and configuration process. 

- Step by step: This is a manual, supervised way of carrying out the installation.

The Wazuh indexer and Wazuh server can be installed on a single host or be distributed in cluster configurations. To check the requirements and start installing the first of the Wazuh central components, go to the :doc:`Wazuh indexer <wazuh-indexer/index>` section.

This is the installation workflow you will follow:

.. thumbnail:: ../images/installation/Wazuh-Installation-workflow.png
  :title: Wazuh installation workflow
  :align: center
  :width: 100%


Wazuh also offers `Wazuh Cloud <https://wazuh.com/cloud/>`_, our software as a service (SaaS) solution. This means that instead of installing and maintaining software, you simply access it via the Wazuh Cloud Console, a web application to manage Wazuh. This service provides a highly flexible infrastructure to match your enterprise needs. With Wazuh Cloud, no dedicated hardware is required, the Wazuh components maintenance is done by the Wazuh team, and everything is ready to use.

Installing Wazuh agent
----------------------

The :ref:`Wazuh agent <wazuh_agent>` is a single and lightweight monitoring software. It is a multi-platform component that can be deployed to laptops, desktops, servers, cloud instances, containers, or virtual machines. It provides visibility into the endpoint's security by collecting critical system and application records, inventory data, and detecting potential anomalies. 

If the Wazuh central components are already installed in your environment, select your operating system below and follow the installation steps to deploy the agent into the endpoints. 


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

Other installation methods
--------------------------

Wazuh allows other deployment options inthe :ref:`Deployment alternatives <deployment>` section. These are complementary to the installation methods found in this installation guide. You will find instructions on how to deploy Wazuh using ready-to-use machines, containers, and orchestration tools. There is also information on how to install the solution offline, from sources, and with commercial options.


.. toctree::
    :hidden:
    :maxdepth: 1

    wazuh-indexer/index
    wazuh-server/index
    wazuh-dashboard/index
    wazuh-agent/index
    packages-list
