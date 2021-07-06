.. Copyright (C) 2021 Wazuh, Inc.

.. _custom_installation:

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.

Central components
==================

- :ref:`Wazuh server <wazuh_server_installation>`: Is in charge of analyzing the data received from the Wazuh agents, triggering alerts when threats or anomalies are detected. It is also used to manage the agents configuration remotely and to monitor their status. 

- :ref:`Wazuh indexer <wazuh_indexer_installation>`: A highly scalable, full-text search and analytics engine. Wazuh indexer is distributed, meaning the data indices are divided into shards and each shard can have zero or more replicas. Wazuh uses different indices for alerts data, raw events, and status monitoring information.

- :ref:`Wazuh interface <wazuh_interface_installation>`: A flexible and intuitive web interface for mining, analyzing, and visualizing data. It includes out-of-the-box dashboards for security events, regulatory compliance (e.g. PCI DSS, GDPR, CIS, HIPAA, NIST 800-53), detected vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, and others.
  

  .. toctree::
      :hidden:
      :maxdepth: 2

      wazuh-indexer/index
      wazuh-server/index
      wazuh-interface/index