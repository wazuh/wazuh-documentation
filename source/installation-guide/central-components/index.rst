.. Copyright (C) 2021 Wazuh, Inc.

.. _central_components:

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Central components
==================

This section aims to guide the user through the process of installing Wazuh and its multiple components. A brief explanation about each component and its capabilities can be found in the :ref:`getting started <components>` section.

- Wazuh indexer: A highly scalable, full-text search and analytics engine. Wazuh indexer is distributed, meaning the data indices are divided into shards and each shard can have zero or more replicas. Wazuh uses different indices for alerts data, raw events, and status monitoring information.

- Wazuh manager: Is in charge of analyzing the data received from the :ref:`agents <wazuh_agent>`, triggering alerts when threats or anomalies are detected. It is also used to manage the agents configuration remotely and to monitor their status.

  The Wazuh manager runs the analysis engine, the Wazuh RESTful API, the agents registration service, the agents connection service, the Wazuh cluster daemon, and the Wazuh forwarder.

- Wazuh WUI: A flexible and intuitive web interface for mining, analyzing, and visualizing data. It includes out-of-the-box dashboards for security events, regulatory compliance (e.g. PCI DSS, GDPR, CIS, HIPAA, NIST 800-53), detected vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, and others. This interface is also used to manage Wazuh configuration and to monitor its status.

.. toctree::
    :hidden:
    :maxdepth: 1

    wazuh-indexer
    wazuh-server
    wazuh-wui






