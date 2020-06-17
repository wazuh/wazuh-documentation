.. Copyright (C) 2020 Wazuh, Inc.

.. _all_in_one_index:

All-in-one deployment
=====================

This section guides through the installation and configuration of the Wazuh server and Elastic Stack on the same host. This type of deployment is appropriate for testing and small production environments.

The following components will be installed:

- The Wazuh server, including the Wazuh manager as a single-node cluster, the Wazuh API and Filebeat OSS.

- Elastic Stack, including Open Distro for Elasticesearch as a single-node cluster, Open Distro for Kibana and the Wazuh Kibana plugin.

To protect the data in the Elastic Stack the certificates will be deployed using the `Search Guard offline TLS tool <https://docs.search-guard.com/latest/offline-tls-tool>`_. The guide will also refer to the section explaining how to secure communication between the Wazuh API and the Wazuh Kibana plugin.
In addition, in order to use the Wazuh Kibana plugin properly, the extra Elasticsearch roles and users will be added.

To allow the installation process and guarantee the expected performance of the Wazuh-Elastic Stack components the host must meet the hardware requirements described in the :ref:`Requirements <all_in_one_requirements>` section.

The user can choose between Step-by-step installation, a manual way of carrying out the process, and Unattended installation, an automated way using a script:

.. toctree::
    :maxdepth: 1
    :hidden:

    requirements

.. toctree::
    :maxdepth: 1
    :glob:

    unattended-installation
    all_in_one
