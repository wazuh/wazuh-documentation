.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_indexer_installation:

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh indexer
=============

The Wazuh indexer is a highly scalable, full-text search and analytics engine based on Open Distro for Elasticsearch. The Wazuh indexer is distributed, meaning the data indices are divided into shards and each shard can have zero or more replicas. Wazuh uses different indices for alerts data, raw events, and status monitoring information.

Choose between two installation methods:

- :ref:`Unattended <wazuh_indexer_unattended>`: You can install the Wazuh indexer by using scripts that automate the installation process.  

- :ref:`Step by step <wazuh_indexer_step_by_step>`: This is a manual way of carrying out the installation that includes a detailed description of each step of the process.

.. toctree::
    :hidden:
    :maxdepth: 1

    Unattended <unattended>
    Step-by-step <step-by-step>

