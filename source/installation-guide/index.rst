.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Visit the Wazuh installation guide and learn more about the deployment process, available installation alternatives, and requirements.
  
.. _installation_guide:

Installation guide
==================

Wazuh is a free and open source host-based intrusion detection system. Wazuh server and Wazuh agent are under `GNU GPL version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_ license. Elasticsearch and Kibana are under `Apache License 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`_. 

The Wazuh central components include the Wazuh server, Elasticsearch and Kibana. Thanks to this guided installation, you will learn how to install each component on the same server, as an all-in-one deployment, or on different servers as a distributed deployment, depending on the environment needs. 

To learn more about the Wazuh solution, its components, architecture, and capabilities, check the :ref:`Getting started <getting_started>` section. Alternatively, you can check our :ref:`Wazuh quickstart <quickstart>` to learn how to install all the central components on the same host using the unattended installation script. 


On-premises Wazuh deployment
----------------------------

For deploying Wazuh on-premises, you can choose between two different options. With an **all-in-one deployment** all Wazuh central components are installed on the same host. On the other hand, with a **distributed deployment** each component is installed on a separate host as a single-node or multi-node cluster. 


All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^

With all-in-one deployment, you install and configure all the Wazuh central components on the same host. These central components are the following:  

- :ref:`Elasticsearch <wazuh_indexer_installation>`: A highly scalable, full-text search and analytics engine.  
- :ref:`Wazuh server <wazuh_server_installation>`: This component includes the Wazuh manager and Filebeat. It is in charge of analyzing the data received from the Wazuh agents and triggering alerts when threats or anomalies are detected.  
- :ref:`Kibana <wazuh_dashboard_installation>`: A flexible and intuitive web interface for mining, analyzing, and visualizing data.


Wazuh offers different environment installation options such as:

- :ref:`Wazuh quickstart <quickstart>`: To install all the central components on the same host using the unattended installation script.
- :ref:`Virtual Machine (OVA) <virtual_machine>`: It is a pre-built virtual machine with all Wazuh central components that you can directly import using VirtualBox or other OVA compatible virtualization systems..
- :ref:`Amazon Machine Images (AMI) <amazon-machine-images>`: It is a pre-built Amazon Machine Image with all Wazuh core components to be installed on an AWS cloud instance.


Distributed deployment
^^^^^^^^^^^^^^^^^^^^^^

You can install and configure the Wazuh server, Elasticsearch, and Kibana following a distributed deployment process. In this type of deployment, the components are installed on separate hosts. Kibana can be installed either on the same server of an Elasticsearch node or on a separate one. 

The Wazuh server and Elasticsearch can each be installed as a single-node or multi-node cluster depending on the environment needs. This type of deployment provides high availability and scalability of the product, and it is convenient for large working environments.

Small Wazuh deployments, which do not require processing large amounts of data, can easily be handled by a single-node cluster. Multi-node clusters are recommended when there is a large number of monitored endpoints, when a large volume of data is anticipated, or when high availability is required.

==============================================================    =============
Wazuh server                                                      Description
==============================================================    =============
**Single-node cluster**                                           The Wazuh server single-node installation is performed on one host. This method is easy to maintain, requires few resources, and does not require a network load balancer.

**Multi-node cluster**                                            The multi-node installation process involves installing several Wazuh servers on different nodes that communicate among them. This kind of installation provides high availability and requires a network load balancer.
==============================================================    =============


==============================================================    =============
Elasticsearch                                                     Description
==============================================================    =============
**Single-node cluster**                                           The Elasticsearch cluster is installed on one host with the single-node installation method. This kind of approach requires few resources, does not demand a network load balancer, and is easier to maintain.

**Multi-node cluster**                                            With the multi-node installation method, several Elasticsearch are installers on different nodes that communicate among them. A multi-node cluster provides high availability, scalability, and load balancing for data indexing and searching.
==============================================================    =============


The diagram below represents a Wazuh deployment architecture. It shows the solution components and how the Wazuh servers and Elasticsearch can be configured as a cluster, providing load balancing and high-availability.

.. thumbnail:: ../images/installation/distributed.png
    :alt: Wazuh deployment
    :align: center
    :wrap_image: No


More deployment options
^^^^^^^^^^^^^^^^^^^^^^^

Wazuh allows others deployment options:

- Ready to use machines like OVA or AMI. 
- Containers such as Docker or Kubernetes. 
- Orchestration tools like Puppet or Ansible. 

Finally, you can perform an Offline installation or an installation from sources.For information about the different deployment types, check the :ref:`Deployment options <deployment>` section.

Wazuh can also be installed with commercial options like Elastic Stack basic license or Splunk. To learn more about these options and other installation alternatives, see the :ref:`Installation alternatives <more_installation_alternatives>` section.


Wazuh Cloud
-----------

Wazuh offers the `Wazuh Cloud <https://wazuh.com/cloud/>`_, where all components are hosted on our PCI-DSS and SOC 2 Type 2 certified SaaS solution, which is maintained by our team. With Wazuh cloud, no dedicated hardware is required and everything is ready to use. This service offers a highly flexible infrastructure to match your enterprise needs.

You can create and tailor your cloud environment to meet specific needs and upgrade it to the most appropriate tier. The setting up of the Wazuh Cloud environment is streamlined: installing and updating the Wazuh components, and defining scalability is all handled by the Wazuh Cloud. You can check our :ref:`Requirements <cloud_service>` to learn how to create a cloud environment and explore the Wazuh Cloud services.


Upgrade instructions
--------------------

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
