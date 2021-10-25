.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_indexer_installation:

.. meta::
  :description: Wazuh is a free, open source, and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh indexer
=============

The Wazuh indexer is a highly scalable, full-text search and analytics engine based on Open Distro for Elasticsearch. The Wazuh indexer is distributed, meaning the data indices are divided into shards and each shard can have zero or more replicas. Wazuh uses different indices for alerts data, raw events, and status monitoring information.

This central component can be installed as a single-node or multi-node cluster depending on the environment needs. Small Wazuh deployments, which do not require processing large amounts of data, can easily be handled by a single-node cluster. Multi-node clusters are recommended when there is a large number of monitored endpoints, when a large volume of data is anticipated, or when high availability is required.

You can now choose an installation method and start installing the Wazuh indexer.

- :ref:`Unattended installation <wazuh_indexer_unattended>`: Install this component by using a script that automates the installation process.  

- :ref:`Step-by-step installation <wazuh_indexer_step_by_step>`: Install this component manually following detailed step-by-step instructions.

.. thumbnail:: /images/installation/Wazuh-Installation-indexer-2.png
    :alt: Wazuh indexer installation
    :align: center
    :width: 100%

Requirements
------------

Check the supported operating systems and the recommended hardware requirements for the Wazuh indexer installation. Make sure that your system environment meets all requirements and that you have root user privileges.

Supported operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh indexer can be installed on a 64-bit Linux operating system.

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

The Wazuh indexer can be installed as a single-node or as a multi-node cluster.

- Hardware recommendations for each node
                          
  +-------------------------+-------------------------+-------------------------------+
  |                         |  Minimum                |   Recommended                 |
  +-------------------------+----------+--------------+--------------+----------------+
  | Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
  +=========================+==========+==============+==============+================+
  | Wazuh indexer           |     4    |     2        |     16       |       8        |
  +-------------------------+----------+--------------+--------------+----------------+


- Disk space requirements

  The amount of data depends on the generated alerts per second (APS). This table details the estimated disk space needed per agent to store 90 days of alerts on a Wazuh indexer server, depending on the type of monitored endpoints.

  +-------------------------------------------------+-----+---------------------------+
  | Monitored endpoints                             | APS | Storage in Wazuh indexer  |
  |                                                 |     |  (GB/90 days)             |
  +=================================================+=====+===========================+
  | Servers                                         | 0.25|           3.7             |
  +-------------------------------------------------+-----+---------------------------+
  | Workstations                                    | 0.1 |           1.5             |
  +-------------------------------------------------+-----+---------------------------+
  | Network devices                                 | 0.5 |           7.4             |
  +-------------------------------------------------+-----+---------------------------+

  For example, for an environment with 80 workstations, 10 servers, and 10 network devices, the storage needed on the Wazuh indexer server for 90 days of alerts is 230 GB. 





.. toctree::
    :hidden:
    :maxdepth: 1

    Unattended installation <unattended>
    Step-by-step installation <step-by-step>

