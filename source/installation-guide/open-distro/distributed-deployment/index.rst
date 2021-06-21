.. Copyright (C) 2021 Wazuh, Inc.

.. _distributed_index:

Distributed deployment
======================

You install and configure the Wazuh server and Elastic Stack, following a distributed deployment process. In this type of deployment, the components will be installed on separate hosts. Kibana can be installed either on the same server of an Elasticsearch node or on a separate one. Distributed installation of components is appropriate for production environments, as it provides  high availability and scalability of services.

   .. thumbnail:: ../../../images/installation/distributed_no_title.png
     :align: center
     :width: 100%

The following components will be installed:

- The Wazuh server, including the Wazuh manager as a single-node cluster or as a multi-node cluster, the Wazuh API, and Filebeat.

- Elastic Stack, including Open Distro for Elasticsearch as a single-node cluster or as a multi-node cluster, Kibana, and the Wazuh Kibana plugin, on the same host as Elasticsearch node or on a separate one.


The communication is encrypted using SSL certificates. These certificates are generated using the Wazuh cert tool.

Also, to use the Wazuh Kibana plugin correctly, the extra Elasticsearch roles and users are added.

To guarantee the expected performance of the Wazuh and Elastic Stack components, all hosts must meet the hardware requirements described in the :ref:`Requirements <installation_requirements>` section.

The user can choose between unattended installation, an automated way using a script, or step-by-step installation, a manual way of carrying out the process:


.. toctree::
    :maxdepth: 1

    unattended/index
    step-by-step-installation/index
