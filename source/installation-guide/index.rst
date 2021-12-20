.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Visit the Wazuh installation guide and learn more about the deployment process, available installation alternatives, and requirements.
  
.. _installation_guide:


Installation guide
==================

Wazuh is a free and open source security platform that unifies XDR and SIEM capabilities. It is based on the Wazuh agent, which is deployed on the monitored endpoints, and on three central components in charge of analyzing, processing, and storing the data: the Wazuh server, the Wazuh indexer, and the Wazuh dashboard. If you are new to Wazuh and want to learn more about its components, architecture, and capabilities, you can check the :ref:`Getting started <getting_started>` section.  

The Wazuh server and the Wazuh agent abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_ and the Wazuh indexer and the Wazuh dashboard by the `Apache License 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`_. These make sure the software is free for all its users and that they do not have to worry about infringing any patents by using it. 

With this installation guide, you will learn how to install in your system each central component on the same server, as an single-node deployment, or on different servers as a distributed deployment. The latter provides high availability and scalability of the product, and it is convenient for large working environments. Small Wazuh deployments, which do not require processing large amounts of data, can easily be handled by a single-node cluster.

Standard installation
---------------------

This installation guide provides instructions for you to install each Wazuh central component in unattended mode or following a step-by-step installation. When intalling, you will follow this standard installation workflow:

.. thumbnail:: ../images/installation/Wazuh-Installation-workflow.png
  :title: Wazuh installation workflow
  :align: center
  :width: 100%

Unatteneded installation
^^^^^^^^^^^^^^^^^^^^^^^^


Step-by-step installation
^^^^^^^^^^^^^^^^^^^^^^^^^^


Deployment alternatives
-----------------------
Wazuh also offers all-in-one deployment options. These are complementary to the ones presented in this installation guide. Wazuh allows other deployment options such as the listed below:
  
- :ref:`Deployment on Docker <wazuh_docker>`: This allows you to install Wazuh with a single-host architecture using a set of Docker images.
- :ref:`Deployment on Kubernetes <wazuh_kubernetes>`: You can build an environment with a Wazuh cluster that offers high availability while securing your data. 
- :ref:`Deployment with Ansible <wazuh_ansible>`: Ansible is an open source platform designed for automating tasks. Its deployment tool is used to deploy the Wazuh infrastructure on AWS.
- :ref:`Deployment with Puppet <wazuh_puppet>`: Puppet is an open-source software tool that allows you to install and configure Wazuh in an easy way by letting you inspect, deliver, operate, and proof your software, no matter where it is executed.    
- :ref:`Offline installation <wazuh-offline-installation>`: This offline solution involves downloading the Wazuh components to then install them on a system with no internet connection.
- :ref:`Installation from sources <installation_from_sources>`: Install the Wazuh manager and agent without using a package manager by compiling the source code and copying the binaries to your computer.

For information about the different deployment types, check the :ref:`Deployment alternatives <deployment>` section.

Wazuh agent deployment
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

This download page contains packages required for the Wazuh installation with the Wazuh version |WAZUH_LATEST|:

.. toctree::
    :hidden:
    :maxdepth: 1

    standard-installation/index
    deployment-options/index
    wazuh-agent/index
    packages-list
