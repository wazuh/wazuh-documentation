.. Copyright (C) 2022 Wazuh, Inc.
.. meta::
  :description: Check out how to install Wazuh with Elastic Stack basic license, deployment types, installation methods, and more. 
  
.. _basic_installation_guide:

Installing Wazuh with Elastic Stack basic license
=================================================

This section aims to guide the user through the installation process of Wazuh. This installation guide will use the Elastic Stack basic license option, which contains everything included in the open-source version under the Apache 2.0 license, plus additional capabilities such as Elastic Stack Security features, Kibana alerting, and others. More information about the Wazuh components, including a brief description of each one, can be found :doc:`here </installation-guide/index>`.


Deployment types
----------------

The installation guide is divided into two independent sections: all-in-one deployment and distributed deployment, according to the chosen configuration. The installation requirements for the Wazuh server and Elastic Stack are similar to those described in the :ref:`requirements <installation_requirements>` section.


All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^
  
Wazuh server and Elastic Stack are installed on the same host. This type of deployment is appropriate for testing and small working environments. 

      .. thumbnail:: ../../images/installation/all-in-one-deployment.png
        :title: All-in-one deployment
        :align: center
        :width: 80%

    The following components will be installed:

    - The Wazuh server, including the Wazuh manager as a single-node cluster, and Filebeat. 

    - Elastic Stack, including Elasticsearch as a single-node cluster, and Kibana, including the Wazuh Kibana plugin.

    The communication is be encrypted using certificates. Follow the installation guide to install and configure all the required components.



Distributed deployment
^^^^^^^^^^^^^^^^^^^^^^

Each component is installed in a separate host as a single-node or multi-node cluster. This type of deployment allows high availability and scalability of the product and is convenient for large working environments.

Kibana can be installed on the same server as the Elasticsearch node, or on a separate one. This type of deployment is appropriate for production environments as it provides high availability and scalability of the services.

      .. thumbnail:: ../../images/installation/distributed-no-title.png
        :title: Distributed deployment
        :align: center
        :width: 80%

    The following components will be installed:

    - The Wazuh server, including the Wazuh manager as a single-node cluster or as a multi-node cluster, and Filebeat.

    - Elastic Stack as a single-node cluster or as a multi-node cluster, and Kibana, including the Wazuh Kibana plugin, on the same host as Elasticsearch node or on a separate one.

    The communication will be encrypted using certificates, and the user can follow the installation steps guide to install all required components.



Start deploying Wazuh and Elastic Stack
---------------------------------------

.. toctree::
    :maxdepth: 2

    all-in-one-deployment/index
    distributed-deployment/index
