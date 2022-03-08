.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about how to install and configure the Wazuh server and Elastic Stack by following a step-by-step deployment process. 

.. _distributed_index:

Distributed deployment
======================

You install and configure the Wazuh server and Elastic Stack, following a distributed deployment process. In this type of deployment, the components are installed on separate hosts. Kibana can be installed either on the same server of an Elasticsearch node or on a separate one.

The following components are installed:

- The Wazuh server, including the Wazuh manager as a single-node cluster or as a multi-node cluster, the Wazuh API, and Filebeat.

- Elastic Stack, including Open Distro for Elasticsearch as a single-node cluster or as a multi-node cluster. Installing Elastic Stack also includes the installation of Kibana, and the Wazuh Kibana plugin, on the same host as the Elasticsearch node or on a separate one.


   .. thumbnail:: ../../../images/installation/distributed-no-title.png
     :align: center
     :width: 100%



In a distributed deployment, the communication is encrypted using SSL certificates generated with the ``wazuh-cert-tool.sh``. Also, extra Elasticsearch roles and users are added to make sure that the Wazuh Kibana plugin works correctly.

To guarantee the expected performance of the Wazuh and Elastic Stack components, all hosts must meet the hardware requirements described in the :ref:`Requirements <installation_requirements>` section.

Installation methods
---------------------

You can choose between unattended installation, an automated way of installing Wazuh using scripts, or step-by-step installation, a manual way of carrying out the process.


.. toctree::
    :maxdepth: 1

    unattended/index
    step-by-step-installation/index
