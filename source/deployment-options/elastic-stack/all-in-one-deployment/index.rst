.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: This section guides through the installation and configuration of the Wazuh server and Elastic Stack on the same host. Learn more here. 
  
.. _basic_all_in_one_index:

All-in-one deployment
=====================

This section guides through the installation and configuration of the Wazuh server and Elastic Stack on the same host. This type of deployment is appropriate for testing and small production environments.

   .. thumbnail:: ../../../images/installation/all-in-one-deployment.png
     :title: All-in-one deployment
     :align: center
     :width: 80%

The following components will be installed:

- The Wazuh server, including the Wazuh manager as a single-node cluster, and the Wazuh API.

- Elastic Stack, including Elasticsearch as a single-node cluster, Filebeat, and Kibana, including the Wazuh Kibana plugin.

The communication will be encrypted using certificates. To guarantee the expected performance of the Wazuh components, the host must meet the hardware requirements described in the :ref:`requirements <installation_requirements>` section. The user can follow the installation steps guide to install all required components.


.. toctree::
    :maxdepth: 1
    :glob:

    unattended-installation
    all-in-one
