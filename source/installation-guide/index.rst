.. Copyright (C) 2020 Wazuh, Inc.

.. _installation_guide:

Installation guide
==================

.. meta::
  :description: Find useful technical documentation about how Wazuh works, suitable for developers and tech enthusiasts.

This section aims to guide the user through the process of installing Wazuh and Open Distro for Elasticsearch or Elastic Stack. 

Elasticsearch flavor
---------------------

The user can select among these two flavors of Elasticsearch the one that better suits their environment:

- `Open Distro for Elasticsearch <https://opendistro.github.io/for-elasticsearch/>`_ is an Apache 2.0-licensed distribution of Elasticsearch enhanced with enterprise security, alerting, SQL support, automated index management, deep performance analysis, among other features. Open Distro for Elasticsearch is 100% open source and community driven.

- `Elastic Stack <https://www.elastic.co/elastic-stack>`_ includes Elasticsearch, Kibana and Filebeat. In this installation guide the basic license option will be used, this includes everything in the Open Source under Apache 2.0 version plus some extra capabilities like core Elastic Stack Security features, Kibana alerting and more.

Type of deployment
------------------

Two types of deployments can be made: 

- All-in-one deployment: In this case, Wazuh and Open Distro for Elasticsearch or Elastic Stack are installed in the same host, this type of deployment is suitable for testing and small working environments. 

- Distributed deployment: Each component is installed in a separate host and can also be installed in a multi-node cluster. This type of deployment allows the high availability and scalability of the product and is suitable for large working environments.  

Type of installation
---------------------

Once the desired configuration is selected the user can choose between two types of installations:

- Unattended installation: Done using an automated script.
- Step-by-step installation: A manual way of doing the installation that includes a detailed explanation of every step of the installation process.

Requirements
------------

This guide also includes a requirements section that specifies the supported operating systems and the minimum recommended hardware specifications to guarantee the expected performance.    

.. toctree::
    :maxdepth: 1
    
    requirements
    open-distro/index
    basic/index
    compatibility_matrix/index
