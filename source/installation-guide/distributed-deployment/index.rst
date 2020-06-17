.. Copyright (C) 2020 Wazuh, Inc.

.. _distributed_index:

Distributed deployment
======================

This section guides through the distributed installation and configuration of the Wazuh server and Elastic Stack. The components will be installed on separate hosts. Kibana can be installed on the same server as the Elasticsearch node, or on the separate one. This type of deployment is appropriate for big production environments as it provides the high availability and scalability of the services.

The following components will be installed:

- The Wazuh server, including the Wazuh manager as a single-node cluster or as a multi-node cluster and the Wazuh API.

- Elastic Stack, including Open Distro for Elasticesearch as a single-node cluster or as a multi-node cluster, Filebeat and Open Distro for Kibana, including the Wazuh Kibana plugin, on the same host as Elasticsearch node or on a separate one.

To protect the data in the Elastic Stack the certificates will be deployed using the `Search Guard offline TLS tool <https://docs.search-guard.com/latest/offline-tls-tool>`_. The guide will also refer to the section explaining how to secure communication between the Wazuh API and the Wazuh Kibana plugin. In addition, in order to use the Wazuh Kibana plugin properly, the extra Elasticsearch roles and users will be added.

To allow the installation process and guarantee the expected performance of the Wazuh-Elastic Stack components all hosts must meet the hardware requirements described in the :ref:`Requirements <distributed_requirements>` section.

The user can choose between Step by step installation, a manual way of carrying out the process, or Unattended installation, an automated way using script:

.. toctree::
    :maxdepth: 1
    :hidden:

    requirements

.. toctree::
    :maxdepth: 2

    unattended-installation
    step-by-step-installation/index
