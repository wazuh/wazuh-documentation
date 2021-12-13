.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Visit the Wazuh installation guide and learn more about the deployment process, available installation alternatives, and requirements.
  
.. _installation_guide:

Installation guide
==================

Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response, and regulatory compliance. All installed components are open source. Wazuh server and Wazuh agent are under `GNU GPL version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_ license. Elasticsearch and Kibana are under `Apache License 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`_. 

The Wazuh central components include the Wazuh server, Elasticsearch and Kibana. With this guided installation, you install each component on the same server, as an all-in-one deployment, or on different servers as a distributed deployment depending on the environment needs. To learn more about the Wazuh solution, its components, architecture, and capabilities, check the :ref:`Getting started <getting_started>` section.

Alternatively, you can check our :ref:`Wazuh quickstart <quickstart>` to learn how to install all the central components on the same host using the unattended installation script. With Wazuh quickstart, you can install and configure the Wazuh in just a few minutes.


Wazuh Cloud
-----------

Wazuh protects your enterprise with *Security Information and Event Management* (SIEM) and *Endpoint Detection and Response* (EDR). Wazuh offers `Wazuh Cloud <https://wazuh.com/cloud/>`_, where all components are hosted on our PCI-DSS and SOC 2 Type 2 certified SaaS solution, which is maintained by our team. With Wazuh cloud, no dedicated hardware is required and everything is ready to use. This service offers a highly flexible infrastructure to match your enterprise needs.

You can create and tailor your cloud environment to meet specific needs and upgrade it to the most appropriate tier. The setting up of a Wazuh Cloud environment is streamlined: installing and updating the Wazuh components, and defining scalability is all handled by Wazuh Cloud. You can check our :ref:`Requirements <cloud_service>` to learn how to create a cloud environment and explore the Wazuh Cloud services.


On-premises wazuh deployment
----------------------------

There are two different options for deploying Wazuh on-premises:

- **All-in-one deployment**: All Wazuh central components are installed on the same host. 

- **Distributed deployment**: Each component is installed on a separate host as a single-node or multi-node cluster. This type of deployment provides high availability and scalability of the product, and it is convenient for large working environments.
  
For information on the minimum hardware requirements for the different types of deployment, check the :ref:`Requirements <installation_requirements>` section. 


All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^

With all-in-one deployment, you install and configure the Wazuh server and Elastic Stack on the same host. 

The following components are installed:

- The Wazuh server, including the Wazuh manager as a single-node cluster, and the Wazuh API.

- Elastic Stack, including Open Distro for Elasticsearch as a single-node cluster, as well as Filebeat, Kibana, and the Wazuh Kibana plugin.

Wazuh offers the following options:

- :ref:`Wazuh quickstart <quickstart>`: To install on a Linux server.
- :ref:`Virtual Machine (OVA) <virtual_machine>`: To install on a virtual machine.
- :ref:`Amazon Machine Images (AMI) <amazon-machine-images>`: To install on an AWS cloud instance.


Distributed deployment
^^^^^^^^^^^^^^^^^^^^^^

You can install and configure the Wazuh server and Elastic Stack, following a distributed deployment process. In this type of deployment, the components are installed on separate hosts. Kibana can be installed either on the same server of an Elasticsearch node or on a separate one. 

The Wazuh server and Elasticsearch can each be installed as a single-node or multi-node cluster depending on the environment needs. Small Wazuh deployments, which do not require processing large amounts of data, can easily be handled by a single-node cluster. Multi-node clusters are recommended when there is a large number of monitored endpoints, when a large volume of data is anticipated, or when high availability is required.

- **Single-node cluster**: The single-node installation is performed on only one host where the Wazuh manager, the Wazuh API, and Filebeat are installed. This method is easy to maintain, requires few resources, and does not require a network load balancer.

- **Multi-node cluster**: The multi-node installation process consists of installing several Wazuh server nodes on different hosts that communicate among them. This kind of installation provides high availability and requires a network load balancer.

The diagram below represents a Wazuh deployment architecture. It shows the solution components and how the Wazuh servers and Elasticsearch can be configured as a cluster, providing load balancing and high-availability.

.. thumbnail:: ../images/installation/distributed.png
    :alt: Wazuh deployment
    :align: center
    :wrap_image: No


More deployment options
^^^^^^^^^^^^^^^^^^^^^^^

Wazuh allows others deployment options such as Kubernetes, Ansible, Puppet, Offline and installation from sources. For information about the different types of deployment, check the :ref:`Deployment options <deployment>` section. 

Wazuh can also be installed with commercial options like Elastic Stack basic license or Splunk. To learn more about these options and other installation alternatives, see the :ref:`More installation alternatives <more_installation_alternatives>` section.


Upgrade instructions
^^^^^^^^^^^^^^^^^^^^

To upgrade any of the Wazuh components you need to check the​ :ref:`Upgrade guide <upgrade_guide>`.


Wazuh agent deployment
----------------------

The :ref:`Wazuh agent <wazuh_agent>` is a single and lightweight monitoring software. It is a multi-platform component that runs on Linux, Windows, macOS, Solaris, AIX, and other operating systems. It provides visibility into the endpoint's security by collecting critical system and application records, inventory data, and detecting potential anomalies. 

It can be deployed to laptops, desktops, servers, cloud instances, containers, or virtual machines. The agent helps to protect your system by providing threat prevention, detection, and response capabilities. It is also used to collect different types of system and application data that it forwards to the :ref:`Wazuh server <wazuh_server>` through an encrypted and authenticated channel.

If the Wazuh central components are already installed on your environment, select your operating system below and follow the installation steps to deploy the agent to the endpoints: 

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

    elasticsearch/index
    wazuh-server/index
    kibana/index
    wazuh-agent/index
    packages-list
