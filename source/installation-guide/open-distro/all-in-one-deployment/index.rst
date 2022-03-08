.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Find out in this section how to install Wazuh and OpenDistro components for Elasticsearch on the same host, following an all-in-one deployment process.

.. _all_in_one_index:

All-in-one deployment
=====================

With all-in-one deployment, you install and configure the Wazuh server and Elastic Stack on the same host. 

The following components are installed:

- The Wazuh server, including the Wazuh manager as a single-node cluster, and the Wazuh API.

- Elastic Stack, including Open Distro for Elasticsearch as a single-node cluster, as well as Filebeat, Kibana, and the Wazuh Kibana plugin.


   .. thumbnail:: ../../../images/installation/all-in-one-deployment.png
     :align: center
     :width: 100%


In a all-in-one deployment, the communication is encrypted using SSL certificates generated with the ``wazuh-cert-tool.sh``. Also, extra Elasticsearch roles and users are added to make sure that the Wazuh Kibana plugin works correctly.

To guarantee the expected performance of the Wazuh components, the host must meet the hardware requirements described in the :ref:`Requirements <installation_requirements>` section.

Installation methods
---------------------

You can choose between unattended installation, an automated way of installing Wazuh using a script, or step-by-step installation, a manual way of carrying out the process.


.. toctree::
    :maxdepth: 1
    :glob:

    unattended-installation
    all-in-one
