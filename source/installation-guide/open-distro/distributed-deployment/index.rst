.. Copyright (C) 2020 Wazuh, Inc.

.. _distributed_index:

Distributed deployment
======================

This section guides through the distributed installation and configuration of the Wazuh server and Elastic Stack.  In this type of deployment the components will be installed on separate hosts. Kibana can be installed on the same server of an Elasticsearch node, or on a separate one. This type of deployment is appropriate for production environments as it provides the high availability and scalability of the services.

The following components will be installed:

- The Wazuh server, including the Wazuh manager as a single-node cluster or as a multi-node cluster, and Filebeat.

- Elastic Stack, including Open Distro for Elasticsearch as a single-node cluster or as a multi-node cluster, and Kibana, including the Wazuh Kibana plugin, on the same host as Elasticsearch node or on a separate one.


The communication will be encrypted using SSL certificates. Those certificates will be generated using the `Search Guard offline TLS tool <https://docs.search-guard.com/latest/offline-tls-tool>`_. The guide will also refer to the section explaining how to secure communication between the Wazuh API and the Wazuh Kibana plugin. Futhermore, in order to use the Wazuh Kibana plugin properly, the extra Elasticsearch roles and users will be added.

To guarantee the expected performance of the Wazuh and Elastic Stack components all hosts must meet the hardware requirements described in the :ref:`requirements <installation_requirements>` section.

The user can choose between Step-by-step installation, a manual way of carrying out the process, or Unattended installation, an automated way using scripts:


.. toctree::
    :maxdepth: 1

    unattended/index
    step-by-step-installation/index
