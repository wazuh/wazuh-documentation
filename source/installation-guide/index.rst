.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Visit the Wazuh installation guide and learn more about the deployment process, available installation alternatives, and requirements.
  
.. _installation_guide:


Installation guide
==================

Wazuh is a free and open source security platform that unifies XDR and SIEM capabilities. It is based on the Wazuh agent, which is deployed on the monitored endpoints, and on three central components in charge of analyzing, processing, and storing the data: the Wazuh server, the Wazuh indexer, and the Wazuh dashboard. If you are new to Wazuh and want to learn more about its components, architecture, and capabilities, you can check the :ref:`Getting started <getting_started>` section.  

The Wazuh server and the Wazuh agent abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_ and the Wazuh indexer and the Wazuh dashboard by the `Apache License 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`_. These make sure the software is free for all its users and that they do not have to worry about infringing any patents by using it. 

With this installation guide, you will learn how to install in your system each central component on the same server, as an single-node deployment, or on different servers as a distributed deployment. The latter provides high availability and scalability of the product, and it is convenient for large working environments. Small Wazuh deployments, which do not require processing large amounts of data, can easily be handled by a single-node cluster.

Installing Wazuh in your infrastructure
----------------------------------------

The :ref:`Standard installation <standard-installation>` provides instructions for you to install each Wazuh central component in unattended mode or following a step-by-step installation. Either way, you will follow this standard installation workflow: 

.. thumbnail:: ../images/installation/Wazuh-Installation-workflow.png
  :title: Wazuh installation workflow
  :align: center
  :width: 100%


Installation methods
^^^^^^^^^^^^^^^^^^^^
You can choose between two installation methods for each Wazuh central component.

**Unattended**: You can install Wazuh using scripts that automate the installation process. The scripts also perform health checks to verify that the available system resources meet the minimal requirements.

**Step by step**:This is a manual way of carrying out the installation that includes a detailed description of each step of the process.

Deployment types
^^^^^^^^^^^^^^^^

With either isntallation type, the instructions guide you to intall Wazuh as a single-node and a multi-node cluster. You just need to follow the steps depending on the chosen configuration.

**Single-node deployment**: You install and configure all the Wazuh central components on the same host to later deploy the Wazuh agent to your endpoints. Small Wazuh deployments, which do not require processing large amounts of data, can easily be handled by a single-node cluster.

**Multi-node deployment**: This type of deployment provides high availability and scalability of the product, and it is convenient for large working environments. Following a distributed deployment process, you can install and configure the Wazuh central components on separate hosts. 

More deployment options
-----------------------
Wazuh allows other deployment options such as the listed below. These are complementary to the standard installation of the Wazuh components.
  
- :ref:`Deployment on Docker <wazuh_docker>`: This allows you to install Wazuh with a single-host architecture using a set of Docker images.
- :ref:`Deployment on Kubernetes <wazuh_kubernetes>`: You can build an environment with a Wazuh cluster that offers high availability while securing your data. 
- :ref:`Deployment with Ansible <wazuh_ansible>`: Ansible is an open source platform designed for automating tasks. Its deployment tool is used to deploy the Wazuh infrastructure on AWS.
- :ref:`Deployment with Puppet <wazuh_puppet>`: Puppet is an open-source software tool that allows you to install and configure Wazuh in an easy way by letting you inspect, deliver, operate, and proof your software, no matter where it is executed.    
- :ref:`Offline installation <wazuh-offline-installation>`: This offline solution involves downloading the Wazuh components to then install them on a system with no internet connection.
- :ref:`Installation from sources <installation_from_sources>`: Install the Wazuh manager and agent without using a package manager by compiling the source code and copying the binaries to your computer.
- :ref:`Integration with Elastic Stack basic license <basic_installation_guide>`: As an alternative to Open Distro for Elasticsearch, you can install Wazuh using the Elastic Stack basic license option. It contains everything included in the open source version under the Apache 2.0 license, plus some additional capabilities such as Elastic Stack Security features, Kibana alerting, and others. According to your chosen configuration, Wazuh and Elastic Stack are installed on the same host, as an all-in-one deployment, on a separate host as a single-node or multi-node cluster.
- :ref:`Integration with Splunk <installation_splunk>`: You install Wazuh along with Splunk Enterprise, including the Splunk forwarder and the Wazuh Splunk app. This can be done as a single instance or as a multi-instance cluster, depending on the size of your environment.


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

In the :ref:`Packages list <packages>` section you will find all the packages required for the Wazuh installation with the Wazuh version |WAZUH_LATEST|.


.. toctree::
    :hidden:
    :maxdepth: 1

    wazuh-indexer/index
    wazuh-server/index
    wazuh-dashboard/index
    deployment-options/index
    wazuh-agent/index
    packages-list
