.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Visit the Wazuh installation guide and learn more about the deployment process, available installation alternatives, and requirements.
  
.. _installation_guide:


Installation guide
==================

In this section of our documentation, you will learn how to install Wazuh in your local infrastructure, having the option to install all its central components in the same server with an all-in-one deployment or on different servers as a distributed deployment. 

The Wazuh solution is based on three central components and the Wazuh agent. The :ref:`Wazuh server <wazuh_server_installation>`, the :ref:`Wazuh indexer <wazuh_indexer_installation>`, and the :ref:`Wazuh dashboard <wazuh_dashboard_installation>` are the three central components in charge of analyzing, processing, and storing the data. Complementary, the :ref:`Wazuh agent <installation_agents>` is a single and lightweight monitoring software deployed on the monitored endpoints to provide prevention, detection, and response capabilities.

The Wazuh server and the Wazuh indexer can each be installed as a single-node or multi-node cluster. If you are new to Wazuh and want to learn more about its components, architecture, and capabilities, you can check the :ref:`Getting started <getting_started>` section.  

Wazuh is a free and open source security platform that unifies XDR and SIEM capabilities. The Wazuh server and the Wazuh agent are licensed as `GNU GPL version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_, and the Wazuh indexer and the Wazuh dashboard are licensed as `Apache License 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`_. 

You also have the option of using the :ref:`Wazuh quickstart guide <quickstart>` for a quick and unattended installation. It will help you deploy Wazuh as an all-in-one, running all the central components in the same system.


Installing Wazuh in a local infrastructure
------------------------------------------

You can install Wazuh locally on your organization computers and servers as on-premise software. Alternatively, you can use our Cloud solution delivered as a service (SaaS) where no dedicated hardware is required, and everything is ready to use.

For deploying Wazuh locally, you can choose between two different options. All Wazuh central components are installed on the same host with an **all-in-one deployment**. On the other hand, each component is installed on a separate host as a single-node or multi-node cluster with a **distributed deployment**.


All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^

With this deployment, you install and configure all the Wazuh central components on the same host. Wazuh offers different all-in-one deployment options such as:

- :ref:`Wazuh quickstart <quickstart>`: Install all the central components on the same host using the unattended installation script.
- :ref:`Virtual Machine (OVA) <virtual_machine>`: It is a pre-built virtual machine with all Wazuh central components that you can directly import using `VirtualBox <https://www.virtualbox.org/>`_ or other OVA compatible virtualization systems.
- :ref:`Amazon Machine Images (AMI) <amazon-machine-images>`: It is a pre-built Amazon Machine Image with all Wazuh central components to be installed on an AWS cloud instance.


Distributed deployment
^^^^^^^^^^^^^^^^^^^^^^

Following this process, you can install and configure the Wazuh central components on separate hosts. The Wazuh dashboard can be installed either on the same server of the Wazuh indexer node or a separate one.

The Wazuh server and the Wazuh indexer can each be installed as a single-node or multi-node cluster depending on the environment needs. This type of deployment provides high availability and scalability of the product, and it is convenient for large working environments.

Small Wazuh deployments, which do not require processing large amounts of data, can easily be handled by a single-node cluster. Multi-node clusters are recommended when there is a large number of monitored endpoints, when a large volume of data is anticipated, or when high availability is required.

The Wazuh dashboard is not installed in a cluster mode because this component doesn't require to be escalated. 

===============================    ====================    ================
Component                          Cluster type            Description
===============================    ====================    ================
Wazuh server                       Single-node             This installation is performed on one host; it is easy to maintain, requires few resources, and does not demand a network load balancer.
Wazuh server                       Multi-node              This process involves installing several Wazuh servers on different nodes that communicate among them. This kind of installation provides high availability and requires a network load balancer.
Wazuh indexer                      Single-node             Wazuh indexer cluster is installed on one host with the single-node installation method. This approach requires few resources, does not demand a network load balancer, and is easier to maintain.
Wazuh indexer                      Multi-node              With this installation method, several Wazuh indexers are installers on different nodes that communicate among them. A multi-node cluster provides high availability, scalability, and load balancing for data indexing and searching.
===============================    ====================    ================


The diagram below represents a Wazuh deployment architecture. It shows the solution components and how the Wazuh server and the Wazuh indexer can be configured as a cluster, providing load balancing and high availability.

.. thumbnail:: ../images/installation/distributed.png
    :alt: Wazuh deployment
    :align: center
    :scale: 100 %


More deployment options
^^^^^^^^^^^^^^^^^^^^^^^

Wazuh allows other deployment options such as the listed below:

===============================    =============================================================    ================
Option                             Deployment type                                                  Description
===============================    =============================================================    ================
Containers                         :ref:`Deployment on Docker <wazuh_docker>`                       This allows you to install Wazuh with a single-host architecture using a set of Docker images.
Containers                         :ref:`Deployment on Kubernetes <wazuh_kubernetes>`               You can build an environment with a Wazuh cluster that offers high availability while securing your data. 
Orchestration tools                :ref:`Deployment with Ansible <wazuh_ansible>`                   Ansible is an open source platform designed for automating tasks. Its deployment tool is used to deploy the Wazuh infrastructure on AWS.
Orchestration tools                :ref:`Deployment with Puppet <wazuh_puppet>`                     Puppet is an open-source software tool that allows you to install and configure Wazuh in an easy way by letting you inspect, deliver, operate, and proof your software, no matter where it is executed.
Offline                            :ref:`Offline installation <wazuh-offline-installation>`         This offline solution involves downloading the Wazuh components to then install them on a system with no internet connection.
From sources                       :ref:`Installation from sources <installation_from_sources>`     Install the Wazuh manager and agent without using a package manager by compiling the source code and copying the binaries to your computer.
===============================    =============================================================    ================

For information about the different deployment types, check the :ref:`Deployment options <deployment>` section. Wazuh can also be installed with commercial options like Elastic Stack basic license or Splunk. See the :ref:`Installation alternatives <more_installation_alternatives>` section to learn more about these options.


Using Wazuh cloud
-----------------

Wazuh offers the `Wazuh Cloud <https://wazuh.com/cloud/>`_ that hosts and manages all the Wazuh components in one integrated platform. This service offers a highly flexible infrastructure to match your enterprise needs. The setting up of the Wazuh Cloud environment is streamlined. With Wazuh cloud, no dedicated hardware is required, and everything is ready to use. 

Within the Wazuh Cloud all components are hosted on our PCI-DSS, and SOC 2 Type 2 certified SaaS solution, which is maintained by our team. Installing and updating the Wazuh components and defining scalability is all handled by the Wazuh Cloud. You can check our :ref:`Wazuh Cloud environment <cloud_your_environment>` section to learn how to create a cloud environment and explore the Wazuh Cloud services.


Upgrade instructions
--------------------

To upgrade any of the Wazuh components, you need to check the​ :ref:`Upgrade guide <upgrade_guide>`. There you can find information about the upgrade process of the Wazuh server, Open Distro for Elasticsearch, Elastic Stack, and the Wazuh agents. 

In addition, you can check the :ref:`compatibility matrix <compatibility_matrix>` section if you have any doubt about operating system compatibility, as well as the compatibility between the different Wazuh components.


Wazuh agent deployment
----------------------

The :ref:`Wazuh agent <wazuh_agent>` is a single and lightweight monitoring software. It is a multi-platform component that runs on Linux, Windows, macOS, and other operating systems. It provides visibility into the endpoint's security by collecting critical system and application records, inventory data, and detecting potential anomalies. 

The Wazuh agent can be deployed to laptops, desktops, servers, cloud instances, containers, or virtual machines. The agent helps to protect your system by providing threat prevention, detection, and response capabilities. It is also used to collect different types of system and application data that it forwards to the :ref:`Wazuh server <wazuh_server>` through an encrypted and authenticated channel.

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



.. toctree::
    :hidden:
    :maxdepth: 1

    wazuh-indexer/index
    wazuh-server/index
    wazuh-dashboard/index
    wazuh-agent/index
    packages-list
