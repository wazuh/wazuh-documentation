.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Visit the Wazuh installation guide and learn more about the deployment process, available installation alternatives, and requirements.
  
.. _installation_guide:


Installation guide
==================

Wazuh is a free and open source security platform that unifies XDR and SIEM capabilities. It is based on the Wazuh agent, which is deployed on the monitored endpoints, and on three central components in charge of analyzing, processing, and storing the data: the Wazuh server, the Wazuh indexer, and the Wazuh dashboard. If you are new to Wazuh and want to learn more about its components, architecture, and capabilities, you can check the :ref:`Getting started <getting_started>` section.  

The Wazuh server and the Wazuh agent abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_ and the Wazuh indexer and the Wazuh dashboard by the `Apache License 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`_. These make sure the software is free for all its users and that they do not have to worry about infringing any patents by using it. 


With this installation guide, you will learn how to install in your system each central component on the same server, as an all-in-one deployment, or on different servers as a distributed deployment. Alternatively, Wazuh also offers Wazuh Cloud, our software as a service (SaaS) solution.

Installing Wazuh in your infrastructure
---------------------------------------

For deploying Wazuh on-premises, you can choose between two different options:

- All-in-one deployment: all Wazuh central components are installed on the same host.
- Distributed deployment: each component is installed on a separate host as a single-node or multi-node cluster.

This installation guide provides instructions for you to install each Wazuh central component in unattended mode or following a step-by-step installation. 

This is the installation workflow you need to follow:

.. thumbnail:: ../images/installation/Wazuh-Installation-workflow.png
  :title: Wazuh installation workflow
  :align: center
  :width: 100%

All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^

With all-in-one deployment, you install and configure all the Wazuh central components on the same host to later deploy the Wazuh agent to your endpoints. Go to the :ref:`Wazuh indexer <wazuh_indexer_installation>` section to start installing the first component.

Wazuh also offers all-in-one deployment options. These are complementary to the ones presented in this installation guide.

- :ref:`Wazuh quickstart <quickstart>`: This is a quick and unattended installation. With it you deploy the solution as an all-in-one, running all the central components in the same system.
- :ref:`Virtual Machine (OVA) <virtual_machine>`: It is a pre-built virtual machine with all Wazuh central components that you can directly import using `VirtualBox <https://www.virtualbox.org/>`_ or other OVA compatible virtualization systems.
- :ref:`Amazon Machine Images (AMI) <amazon-machine-images>`: It is a pre-built Amazon Machine Image with all Wazuh central components to be installed on an AWS cloud instance.


Distributed deployment
^^^^^^^^^^^^^^^^^^^^^^

This type of deployment provides high availability and scalability of the product, and it is convenient for large working environments. Following a distributed deployment process, you can install and configure the Wazuh central components on separate hosts. 

The Wazuh indexer and the Wazuh server can each be installed as a single-node or multi-node cluster depending on the environment needs. Small Wazuh deployments, which do not require processing large amounts of data, can easily be handled by a single-node cluster. Multi-node clusters are recommended when there is a large number of monitored endpoints, when a large volume of data is anticipated, or when high availability is required. 

The Wazuh dashboard can be installed either on the same server of the Wazuh indexer node or a separate one. This component is not installed in cluster mode because it doesn't require to be escalated. 


==============================================================    =============
Wazuh indexer                                                     Description
==============================================================    =============
Single-node cluster                                               The Wazuh indexer cluster is installed on one host with the single-node installation method. This approach requires few resources, does not demand a network load balancer, and is easier to maintain.

Multi-node cluster                                                With the multi-node installation method, several Wazuh indexers are installers on different nodes that communicate among them. A multi-node cluster provides high availability, scalability, and load balancing for data indexing and searching.
==============================================================    =============

==============================================================    =============
Wazuh server                                                      Description
==============================================================    =============
Single-node cluster                                               The Wazuh server single-node installation is performed on one host. This method is easy to maintain, requires few resources, and does not require a network load balancer.

Multi-node cluster                                                The multi-node installation process involves installing several Wazuh servers on different nodes that communicate among them. This kind of installation provides high availability and requires a network load balancer.
==============================================================    =============



The diagram below represents a Wazuh deployment architecture. It shows the solution components and how the Wazuh server and the Wazuh indexer can be configured as a cluster, providing load balancing and high availability.

.. thumbnail:: ../images/installation/distributed.png
    :alt: Wazuh deployment
    :align: center
    :scale: 100 %


More deployment options
^^^^^^^^^^^^^^^^^^^^^^^

Wazuh allows other deployment options such as the listed below:
  
- :ref:`Deployment on Docker <wazuh_docker>`: This allows you to install Wazuh with a single-host architecture using a set of Docker images.
- :ref:`Deployment on Kubernetes <wazuh_kubernetes>`: You can build an environment with a Wazuh cluster that offers high availability while securing your data. 
- :ref:`Deployment with Ansible <wazuh_ansible>`: Ansible is an open source platform designed for automating tasks. Its deployment tool is used to deploy the Wazuh infrastructure on AWS.
- :ref:`Deployment with Puppet <wazuh_puppet>`: Puppet is an open-source software tool that allows you to install and configure Wazuh in an easy way by letting you inspect, deliver, operate, and proof your software, no matter where it is executed.    
- :ref:`Offline installation <wazuh-offline-installation>`: This offline solution involves downloading the Wazuh components to then install them on a system with no internet connection.
- :ref:`Installation from sources <installation_from_sources>`: Install the Wazuh manager and agent without using a package manager by compiling the source code and copying the binaries to your computer.

For information about the different deployment types, check the :ref:`Deployment options <deployment>` section. Wazuh can also be installed with commercial options like Elastic Stack basic license or Splunk. See the :ref:`Installation alternatives <more_installation_alternatives>` section to learn more about these options.

Wazuh Cloud
-----------

Wazuh offers `Wazuh Cloud <https://wazuh.com/cloud/>`_, our software as a service (SaaS) solution. This means that instead of installing and maintaining software, you simply access it via the Wazuh Cloud Console, a web application to manage Wazuh where all processes are greatly simplified. This service provides a highly flexible infrastructure to match your enterprise needs. With Wazuh Cloud, no dedicated hardware is required, the Wazuh components maintenance is done by the Wazuh team, and everything is ready to use. 

To get the most out of the Wazuh Cloud service, we provide a `14-day free trial <https://console.cloud.wazuh.com/sign-up?landing=trial>`_ for you to create a cloud environment, a deployment that contains all the Wazuh components ready to be used.

Upgrade instructions
--------------------

To upgrade any of the Wazuh components, you need to check the​ :ref:`Upgrade guide <upgrade_guide>`. There you can find information about the upgrade process of the Wazuh server, the Wazuh agents and how to upgrade from a legacy version. 

In addition, you can check the :ref:`compatibility matrix <compatibility_matrix>` section for information on operating system compatibility.


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



.. toctree::
    :hidden:
    :maxdepth: 1

    wazuh-indexer/index
    wazuh-server/index
    wazuh-dashboard/index
    wazuh-agent/index
    packages-list
