.. Copyright (C) 2021 Wazuh, Inc.

.. _central_components:

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Central components
==================

Install Wazuh and its central components by following a step-by-step process that includes configuration options to suit your needs. If you want to proceed with an unattended installation, see the :ref:`quickstart <quickstart>` section.

Wazuh central components installation workflow:

.. thumbnail:: ../../images/installation/installation_workflow.png
  :align: center
  :width: 100%

- :ref:`Wazuh indexer <wazuh_indexer>`: A highly scalable, full-text search and analytics engine. Wazuh indexer is distributed, meaning the data indices are divided into shards and each shard can have zero or more replicas. Wazuh uses different indices for alerts data, raw events, and status monitoring information.

- :ref:`Wazuh manager <wazuh_manager>`: An orchestrator in charge of analyzing the data received from the :ref:`agents <wazuh_agent>`, triggering alerts when threats or anomalies are detected. It is also used to manage the agents' configuration remotely and to monitor their status.

  The Wazuh manager runs the analysis engine, the Wazuh RESTful API, the agent registration service, the agent connection service, the Wazuh cluster daemon, and the Wazuh forwarder.

- :ref:`Wazuh WUI <wazuh_wui>`: A flexible and intuitive web interface for mining, analyzing, and visualizing data. It includes out-of-the-box dashboards for security events, regulatory compliance (e.g. PCI DSS, GDPR, CIS, HIPAA, NIST 800-53), detected vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, and others. This interface is also used to manage Wazuh configuration and to monitor its status.

Wazuh distributed architecture:

.. thumbnail:: ../../images/installation/distributed_installation.png
  :align: center
  :width: 100%

Follow the installation workflow to complete the Wazuh central components installation. If you have already installed the Wazuh central components and want to deploy the agents, see the :ref:`Wazuh agent <wazuh_agent>` section.

