.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Visit the Wazuh installation guide and learn more about the deployment process, available installation alternatives, and requirements.
  
.. _installation_guide:


Installation guide
==================

Wazuh is a free and open source security platform that unifies XDR and SIEM capabilities. The solution is composed of a single universal agent and three central components: the Wazuh server, the Wazuh indexer, and the Wazuh dashboard. For more information about its components, architecture, and capabilities, you can check the :ref:`Getting started <getting_started>` section.  

The Wazuh server and the Wazuh agent abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_ and the Wazuh indexer and the Wazuh dashboard by the `Apache License, Version 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`_ (ALv2). 

In this installation guide, you will learn how to install Wazuh in your infrastructure. Alternatively, We offer `Wazuh Cloud <https://wazuh.com/cloud/>`_, our software as a service (SaaS) solution. 


Installing Wazuh central components
-----------------------------------

You can install all the Wazuh central components on a single host in an unattended way by following the :ref:`Quickstart <quickstart>` section,  or you can manually install each component following step-by-step directions.  Small Wazuh deployments, which do not require processing large amounts of data, can easily be handled by an all-in-one deployment. 

The Wazuh central components can also be installed on separate hosts in a distributed deployment. The Wazuh server and the Wazuh indexer can each be installed as a single-node or multi-node cluster. This type of deployment provides high availability and scalability of the product, and it is convenient for large working environments. 
 
You can choose between two installation methods for each Wazuh central component. Use wazuh-install, a script that automates the installation and configuration process or do the installation manually by following detailed step-by-step instructions.

The standard installation provides instructions for you to install each Wazuh central component following this standard installation workflow: 

.. thumbnail:: ../images/installation/Wazuh-Installation-workflow.png
  :title: Wazuh installation workflow
  :align: center
  :width: 100%

To check the requirements and start installing Wazuh, go to the :ref:`Wazuh indexer <wazuh_indexer_installation>` section. 

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

Deployment alternatives
-----------------------
Wazuh allows other deployment options such as the listed below. These are complementary to the standard installation of the Wazuh components.
  
- :ref:`Deployment on Docker <wazuh_docker>`
- :ref:`Deployment on Kubernetes <wazuh_kubernetes>`
- :ref:`Deployment with Ansible <wazuh_ansible>`
- :ref:`Deployment with Puppet <wazuh_puppet>`
- :ref:`Offline installation <wazuh-offline-installation>`
- :ref:`Installation from sources <installation_from_sources>`
- :ref:`Integration with Elastic Stack basic license <basic_installation_guide>`
- :ref:`Integration with Splunk <installation_splunk>`


For information about the different deployment types, check the :ref:`Deployment alternatives <deployment>` section.





Packages list
-------------

In the :ref:`Packages list <packages>` section you will find all the packages required for the Wazuh installation with the Wazuh version |WAZUH_LATEST|.


.. toctree::
    :hidden:
    :maxdepth: 1

    wazuh-indexer/index
    wazuh-server/index
    wazuh-dashboard/index
    wazuh-agent/index
    deployment-options/index
    packages-list
