.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_indexer_installation:

.. meta::
  :description: Wazuh is a free, open source, and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Elasticsearch
=============

Elasticsearch is a highly scalable, full-text search and analytics engine. Elasticsearch is distributed, meaning the data indices are divided into shards and each shard can have zero or more replicas. Wazuh uses different indices for alerts data, raw events, and status monitoring information.

This central component can be installed as a single-node or multi-node cluster depending on the environment needs. Small Wazuh deployments, which do not require processing large amounts of data, can easily be handled by a single-node cluster. Multi-node clusters are recommended when there is a large number of monitored endpoints, when a large volume of data is anticipated, or when high availability is required.

You can now choose an installation method and start installing Elasticsearch.

- :ref:`Unattended installation <wazuh_indexer_unattended>`: Install this component by using a script that automates the installation process.  

- :ref:`Step-by-step installation <wazuh_indexer_step_by_step>`: Install this component manually following detailed step-by-step instructions.

.. thumbnail:: /images/installation/Wazuh-Installation-Elasticsearch.png
    :alt: Elasticsearch installation
    :align: center
    :width: 100%

Requirements
------------

Check the supported operating systems and the recommended hardware requirements for the Elasticsearch installation. Make sure that your system environment meets all requirements and that you have root user privileges.

Supported operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Elasticsearch can be installed on a 64-bit Linux operating system.

.. list-table::
   :width: 50%
   
   * - Amazon Linux 2
   * - CentOS 7 and later
   * - Debian 8 ELTS and later
   * - Fedora Linux 33 and later
   * - openSUSE Tumbleweed, Leap 15.2 and later
   * - Oracle Linux 6 Extended and later
   * - Red Hat Enterprise Linux 6 ELS and later
   * - SUSE Linux enterprise server 11 LTSS and later
   * - Ubuntu 14.04 ESM and later




Hardware recommendations
^^^^^^^^^^^^^^^^^^^^^^^^

Elasticsearch can be installed as a single-node or as a multi-node cluster.

- Hardware recommendations for each node
                          
  +-------------------------+-------------------------+-------------------------------+
  |                         |  Minimum                |   Recommended                 |
  +-------------------------+----------+--------------+--------------+----------------+
  | Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
  +=========================+==========+==============+==============+================+
  | Elasticsearch           |     4    |     2        |     16       |       8        |
  +-------------------------+----------+--------------+--------------+----------------+


- Disk space requirements

  The amount of data depends on the generated alerts per second (APS). This table details the estimated disk space needed per agent to store 90 days of alerts on a Elasticsearch server, depending on the type of monitored endpoints.

  +-------------------------------------------------+-----+---------------------------+
  | Monitored endpoints                             | APS | Storage in Elasticsearch  |
  |                                                 |     |  (GB/90 days)             |
  +=================================================+=====+===========================+
  | Servers                                         | 0.25|           3.7             |
  +-------------------------------------------------+-----+---------------------------+
  | Workstations                                    | 0.1 |           1.5             |
  +-------------------------------------------------+-----+---------------------------+
  | Network devices                                 | 0.5 |           7.4             |
  +-------------------------------------------------+-----+---------------------------+

  For example, for an environment with 80 workstations, 10 servers, and 10 network devices, the storage needed on the Elasticsearch server for 90 days of alerts is 230 GB. 





.. toctree::
    :hidden:
    :maxdepth: 1

    Unattended installation <unattended>
    Step-by-step installation <step-by-step>

