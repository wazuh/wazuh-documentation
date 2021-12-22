.. Copyright (C) 2021 Wazuh, Inc.

.. _deployment:

Deployment alternatives
=======================

You can deploy Wazuh to your environments using multiple deployment options. These alternatives complement to the standard deployment types that you can find in the :ref:`Installation guide <installation_guide>`.


**Ready-to-use machines:**

- :ref:`Virtual Machine (OVA) <virtual_machine>`: Wazuh provides a pre-built virtual machine image (OVA) that you can directly import using `VirtualBox <https://www.virtualbox.org/>`_ or other OVA compatible virtualization systems. 
  
- :ref:`Amazon Machine Images (AMI) <amazon-machine-images>`: This is a pre-built Amazon Machine Image (AMI) you can directly launch on an AWS cloud instance.

.. raw:: html

    :hr:
    :width: 100%;
    :border-color: black;
    :clear: both;
  

**Containers:**

- :ref:`Deployment on Docker <wazuh_docker>`: You can install Wazuh with a single-host architecture using a set of Docker images that contains the `Wazuh manager <https://github.com/wazuh/wazuh>`_, `Filebeat <https://www.elastic.co/products/beats/filebeat>`_, `Elasticsearch <https://registry.hub.docker.com/_/elasticsearch/>`_, `Kibana <https://registry.hub.docker.com/_/kibana/>`_, and optionally `Nginx <https://hub.docker.com/_/nginx/>`_. `Open Distro for Elasticsearch <https://opendistro.github.io/for-elasticsearch/>`_ is fully supported as well.
  
- :ref:`Deployment on Kubernetes <wazuh_kubernetes>`: Kubernetes is an open-source system for automating deployment, scaling, and managing containerized applications. This deployment type uses Wazuh images from Docker and allows you to build an environment composed of a Wazuh cluster integrated with the Elastic Stack. 

**Orchestration tools:**

- :ref:`Deployment with Ansible <wazuh_ansible>`: Ansible is an open source platform designed for automating tasks. Its deployment tool is used to deploy the Wazuh infrastructure on AWS. The Wazuh environment consists of a Wazuh server, an Elastic Stack server, and a Wazuh agent.

- :ref:`Deployment with Puppet <wazuh_puppet>`: Puppet is an open-source software tool that gives you an automatic way to inspect, deliver, operate, and future-proof all of your software, no matter where it is executed. It is very simple to use and allows you to install and configure Wazuh easily.

**Offline:**

- :ref:`Offline installation <wazuh-offline-installation>`: Installing the solution offline involves downloading the Wazuh components to later install them on a system with no internet connection. 

**From sources:**

- :ref:`Installation from sources <installation_from_sources>`: Installing Wazuh from source means installing the Wazuh manager and agent without using a package manager. You compile the source code and copy the binaries to your computer instead.

**Integrations:**

- :ref:`Integration with Elastic Stack basic license <basic_installation_guide>`: As an alternative to Open Distro for Elasticsearch, you can install Wazuh using the Elastic Stack basic license option. It contains everything included in the open source version under the Apache 2.0 license, plus some additional capabilities such as Elastic Stack Security features, Kibana alerting, and others. According to your chosen configuration, Wazuh and Elastic Stack are installed on the same host, as an all-in-one deployment, on a separate host as a single-node or multi-node cluster.


- :ref:`Integration with Splunk <installation_splunk>`: You install Wazuh along with Splunk Enterprise, including the Splunk forwarder and the Wazuh Splunk app. This can be done as a single instance or as a multi-instance cluster, depending on the size of your environment.


.. toctree::
    :hidden:
    :maxdepth: 1
    
    virtual-machine/virtual-machine
    amazon-machine-images/amazon-machine-images
    docker/index 
    deploying-with-kubernetes/index
    deploying-with-ansible/index
    deploying-with-puppet/index
    offline-installation
    wazuh-from-sources/index
    elastic-stack/index
    splunk/index
