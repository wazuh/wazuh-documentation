.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Visit the Wazuh installation guide and learn more about the deployment process, available installation alternatives, and requirements.
  
.. _installation_guide:


Installation guide
==================

Wazuh is a free and open source security platform that unifies XDR and SIEM capabilities. The solution is composed of a single universal agent and three central components: the Wazuh server, the Wazuh indexer, and the Wazuh dashboard. For more information about its components, architecture, and capabilities, you can check the :ref:`Getting started <getting_started>` section.  

The Wazuh server and the Wazuh agent abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_ and the Wazuh indexer and the Wazuh dashboard by the `Apache License, Version 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`_ (ALv2). 

In this installation guide, you will learn how to install Wazuh in your infrastructure. Alternatively, We offer `Wazuh Cloud <https://wazuh.com/cloud/>`_, our software as a service (SaaS) solution. 


Installing Wazuh in your infrastructure
---------------------------------------

You install one by one the central components choosing between two installation methods: Unattended or Step-by-step.

- Unattended: You can install Wazuh using a script that automates the installation and configuration process. This script also performs a health check to verify that the available system resources meet the minimal requirements.

- Step by step: This is a manual, supervised way of carrying out the installation that includes a detailed description of each step of the process.

When installing, you will follow this workflow:

.. thumbnail:: ../images/installation/Wazuh-Installation-workflow.png
  :title: Wazuh installation workflow
  :align: center
  :width: 100%

Wazuh indexer and Wazuh server can be installed in a single host or be distributed in cluster configurations. To check the requirements and start installing the first of the Wazuh central components, go to the :doc:`Wazuh indexer <wazuh-indexer/index>` section.

Deployment alternatives
^^^^^^^^^^^^^^^^^^^^^^^
Wazuh allows other deployment options. These are complementary to the installation methods found in the installation guide. The :ref:`Wazuh quickstart <quickstart>` allows you to easily deploy and configure the Wazuh solution in just minutes. This installation method will help you run all the central components in the same system. In the :ref:`Deployment alternatives <deployment>` section, you will find instructions on how to deploy Wazuh using ready-to-use machines, containers, and orchestration tools. There is also information on how to install the solution offline, from sources, and using integrations with commercial options.

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


.. toctree::
    :hidden:
    :maxdepth: 1

    wazuh-indexer/index
    wazuh-server/index
    wazuh-dashboard/index
    wazuh-agent/index
    packages-list
