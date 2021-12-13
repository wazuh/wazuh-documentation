.. Copyright (C) 2021 Wazuh, Inc.

.. _deployment:

Deployment options
==================

You can deploy Wazuh to your environments using multiple deployment options.

- :ref:`Deployment on Kubernetes <wazuh_kubernetes>`: Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications. This deployment type uses Wazuh images from Docker and allows you to build an environment composed of a Wazuh cluster integrated with the Elastic Stack. 

- :ref:`Deployment with Ansible <wazuh_ansible>`: Ansible is an open source platform designed for automating tasks. Its deployment tool is used to deploy the Wazuh infrastructure on AWS. The Wazuh environment consists of a Wazuh server, an Elastic Stack server, and a Wazuh agent.

- :ref:`Deployment with Puppet <wazuh_puppet>`: Puppet is an open-source software tool that gives you an automatic way to inspect, deliver, operate and future-proof all of your software, no matter where it is executed. It is very simple to use and allows you to install and configure Wazuh easily.

- :ref:`Virtual Machine (OVA) <virtual_machine>`: Wazuh provides a pre-built virtual machine image (OVA) that you can directly import using VirtualBox or other OVA compatible virtualization systems. 
  
- :ref:`Amazon Machine Images (AMI) <amazon-machine-images>`: Wazuh provides a pre-built Amazon Machine Image that can be directly launched on an AWS cloud instance.

- :ref:`Offline installation <wazuh-offline-installation>`: Installing the solution offline involves downloading the Wazuh components to later install them on a system with no internet connection. 

- :ref:`Installation from sources <installation_from_sources>`: The Wazuh manager and agent can be installed via sources as an alternative to the installation from packages.


These alternatives are complementary to the standard deployment types that you can find in the :ref:`Installation Guide <installation_guide>`. See this documentation to learn how to install each component on the same server, as an all-in-one deployment, or on different servers as a distributed deployment depending on the environment needs.










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