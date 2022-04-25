.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about the distributed installation and configuration of the Wazuh server and Elastic Stack in this section of the Wazuh documentation. 
  
.. _basic_distributed_index:

Distributed deployment
======================

This section guides through the distributed installation and configuration of the Wazuh server and Elastic Stack. The components will be installed on separate hosts. Kibana can be installed on the same server as the Elasticsearch node, or on a separate one. This type of deployment is appropriate for production environments as it provides high availability and scalability of the services.

   .. thumbnail:: ../../../images/installation/distributed-no-title.png
     :title: Distributed deployment
     :align: center
     :width: 80%

The following components will be installed:

- The Wazuh server, including the Wazuh manager as a single-node cluster or as a multi-node cluster, the Wazuh API, and Filebeat.

- Elastic Stack as a single-node cluster or as a multi-node cluster, and Kibana, including the Wazuh Kibana plugin, on the same host as Elasticsearch node or on a separate one.


The communication will be encrypted using certificates. To guarantee the expected performance of the Wazuh components, all hosts must meet the hardware requirements described in the :ref:`requirements <installation_requirements>` section. The user can follow the installation steps guide to install all required components.


.. toctree::
    :maxdepth: 1

    step-by-step-installation/index
