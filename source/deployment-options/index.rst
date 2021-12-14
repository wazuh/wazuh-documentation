.. Copyright (C) 2021 Wazuh, Inc.

.. _deployment:

Deployment options
==================

You can deploy Wazuh to your environments using multiple deployment options. These alternatives are complementary to the standard deployment types that you can find in the :ref:`Installation Guide <installation_guide>`.

**Ready to use machines:**

- :ref:`Virtual Machine (OVA) <virtual_machine>`: Wazuh provides a pre-built virtual machine image (OVA) that you can directly import using VirtualBox or other OVA compatible virtualization systems. 
  
- :ref:`Amazon Machine Images (AMI) <amazon-machine-images>`: A pre-built Amazon Machine Image that can be directly launched on an AWS cloud instance.

**Containers**

- Docker
  
- :ref:`Deployment on Kubernetes <wazuh_kubernetes>`: Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications. This deployment type uses Wazuh images from Docker and allows you to build an environment composed of a Wazuh cluster integrated with the Elastic Stack. 

**Orchestration tools**

- :ref:`Deployment with Ansible <wazuh_ansible>`: Ansible is an open source platform designed for automating tasks. Its deployment tool is used to deploy the Wazuh infrastructure on AWS. The Wazuh environment consists of a Wazuh server, an Elastic Stack server, and a Wazuh agent.

- :ref:`Deployment with Puppet <wazuh_puppet>`: Puppet is an open-source software tool that gives you an automatic way to inspect, deliver, operate and future-proof all of your software, no matter where it is executed. It is very simple to use and allows you to install and configure Wazuh easily.

**Offline**

- :ref:`Offline installation <wazuh-offline-installation>`: Installing the solution offline involves downloading the Wazuh components to later install them on a system with no internet connection. 

**From sources**

- :ref:`Installation from sources <installation_from_sources>`: Installing Wazuh from source means installing the Wazuh manager and agent without using a package manager. You compile the source code and copy the binaries to your computer instead.


.. toctree::
    :hidden:
    :maxdepth: 1

    deploying-with-kubernetes/index
    deploying-with-ansible/index
    deploying-with-puppet/index
    virtual-machine/virtual-machine
    amazon-machine-images/amazon-machine-images
    offline-installation
    wazuh-from-sources/index