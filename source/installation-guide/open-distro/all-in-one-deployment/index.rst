.. Copyright (C) 2021 Wazuh, Inc.
.. meta::
  :description: Find out how to install Wazuh and OpenDistro components for Elasticsearch in an all-in-one deployment, appropriate for testing and small working environments.
  
.. _all_in_one_index:

All-in-one deployment
=====================

With all-in-one deployment, you install and configure the Wazuh server and Elastic Stack on the same host. This type of deployment is appropriate for testing and small production environments.

   .. thumbnail:: ../../../images/installation/all_in_one_no_title.png
     :align: center
     :width: 100%

The following components are installed:

- The Wazuh server, including the Wazuh manager as a single-node cluster and the Wazuh API.

- Elastic Stack, including Open Distro for Elasticsearch as a single-node cluster, Filebeat, Kibana, and the Wazuh Kibana plugin.

The communication is encrypted using SSL certificates. These certificates are generated using the Search Guard offline TLS tool. 

Also, to use the Wazuh Kibana plugin correctly, the extra Elasticsearch roles and users are added.

To guarantee the expected performance of the Wazuh components, make sure the host meets the hardware requirements described in the :ref:`requirements <installation_requirements>` section.

You can choose between unattended installation, an automated way using a script, or step-by-step installation, a manual way of carrying out the process.


.. toctree::
    :maxdepth: 1
    :glob:

    unattended-installation
    all_in_one
