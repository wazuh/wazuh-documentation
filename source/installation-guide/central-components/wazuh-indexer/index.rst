.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_indexer_installation:

.. meta::
  :description: Wazuh is a free, open source, and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh indexer
=============

The Wazuh indexer is a highly scalable, full-text search and analytics engine based on Open Distro for Elasticsearch. The Wazuh indexer is distributed, meaning the data indices are divided into shards and each shard can have zero or more replicas. Wazuh uses different indices for alerts data, raw events, and status monitoring information.

Requirements
------------

Check the supported operating systems and the recommended hardware requirements for the Wazuh indexer installation. Make sure that your system environment meets all requirements and that you have root user privileges.

Supported operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh indexer can be installed on the following Linux operating systems:

- Amazon Linux 1 and 2

- CentOS 6 or later

- Debian 7 or later

- Fedora 31 or later

- Oracle Linux 6 or later

- Red Hat Enterprise Linux 6 or later

- Ubuntu 12 or later




Hardware recommendations
^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh indexer can be installed as a single-node or as a multi-node cluster. For the installation, a 64-bit operating system is necessary. 

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

Wazuh indexer installation
--------------------------

Choose an installation method to install this Wazuh central component.

- :ref:`Unattended installation <wazuh_indexer_unattended>`: Install the Wazuh indexer by using a script that automates the installation process.  

- :ref:`Step-by-step installation <wazuh_indexer_step_by_step>`: Install the Wazuh indexer manually following detailed step-by-step instructions.

.. toctree::
    :hidden:
    :maxdepth: 1

    Unattended installation <unattended>
    Step-by-step installation <step-by-step>

