.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh in production environment

.. _production_environment_guide:

Production environment guide
============================


This section covers different options to set up Wazuh with Elastic Stack in a production environment. Although the guide :ref:`Quick start environment guide<installation_guide>` could be used in smalls production environments, it not designed for high availability, scalability, etc. This guide will help you to configure an environment with different levels of distribution and so, scalable environments with high availability.

You also have the following resources available, in case you have questions or need assistance:

- `Mailing list <wazuh+subscribe@googlegroups.com>`_: in `our Google group <https://groups.google.com/forum/#!forum/wazuh>`_ you can share your questions and thoughts with our users community.
- `GitHub repositories <https://github.com/wazuh>`_: here you can submit issues and contribute to the project development. We happily review and accept pull requests.
- `Slack channel <https://wazuh.com/community/join-us-on-slack>`_: join users community channel to chat with our team members and other users.

In addition, we also provide `professional support, training and consulting services <https://wazuh.com/professional-services/>`_.

Supported platforms
-------------------
- Operating systems: linux.
- Cloud providers VM: Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP), Digital Ocean, Wazuh.
- Virtualization: VMware, Virtualbox, OpenStack.
- Containers: Docker, Kubernetes.

.. note::  You can run Wazuh and Elastic Stack on your own hardware, or use our hosted Wazuh Service on Wazuh Cloud. `Try out the Wazuh Cloud Service for free <https://wazuh.com/cloud/>`_.

Basic concepts
--------------

- **Wazuh agent**: runs on the monitored endpoint. Collects log data and security events. It also performs inventory and hardening scans, detects malware and system anomalies, and executes active responses.

+ **Wazuh server**: collects and analyzes data from deployed agents. It runs the Wazuh manager, the Wazuh API and Filebeat.

- **Elastic Stack**: ingests and indexes data from the Wazuh server. It provides a search engine and a Wazuh user interface for configuration management and data visualization. It runs Elasticsearch and Kibana with the Wazuh plugin. Logstash is optional.

+ **Wazuh single-node cluster**:  is a single Wazuh server host.

- **Wazuh multi-node cluster**: is a group of Wazuh servers, that works together to provide high availability and load balancing. With a cluster configuration, your Wazuh infrastructure can scale as much as you need.

+ **Elasticsearch single-node cluster**: is a single Elasticsearch node.

- **Elasticsearch multi-node cluster**: is a group of Elasticsearch nodes configured to work together. It provides high availability, scalability and load balancing for data indexing and searching.

The following image resume the architecture possibilities referring to single-node or multi-node cluster in Wazuh and Elasticsearch.

.. thumbnail:: ../images/getting_started/architecture_ports_elastic.png
    :title: Elastic ports diagram
    :align: center
    :width: 100%

Start deploying the Elasticsearch cluster by choosing one of the following guide depending of your needs:

+----------------------------+-----------------------------------------------------------------------------+
| Elasticsearch cluster type | Guide                                                                       |
+============================+=============================================================================+
| Single-node cluster        | :ref:`Elasticsearch single-node cluster<elasticsearch_single_node_cluster>` |
+----------------------------+-----------------------------------------------------------------------------+
| Multi-node cluster         | :ref:`Elasticsearch multi-node cluster<elasticsearch_multi_node_cluster>`   |
+----------------------------+-----------------------------------------------------------------------------+

.. toctree::
    :maxdepth: 1
    :hidden:

    elasticsearch-single-node/index
    elasticsearch-multi-node/index


