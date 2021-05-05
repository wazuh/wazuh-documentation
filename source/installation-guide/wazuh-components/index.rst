.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_components:

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh components
==================

Install Wazuh and its components by following a step-by-step process that includes configuration options to suit your needs. If you want to proceed with an unattended installation, see the :ref:`quickstart <quickstart>` section.

.. thumbnail:: ../../images/installation/wazuh_components_installation_workflow.png
  :align: center
  :width: 100%

- :ref:`Wazuh indexer <wazuh_indexer>`: A highly scalable, full-text search and analytics engine. Wazuh indexer is distributed, meaning the data indices are divided into shards and each shard can have zero or more replicas. Wazuh uses different indices for alerts data, raw events, and status monitoring information.

- :ref:`Wazuh manager <wazuh_manager>`: An orchestrator in charge of analyzing the data received from the agents, triggering alerts when threats or anomalies are detected. It is also used to manage the agents' configuration remotely and to monitor their status.

  The Wazuh manager runs the analysis engine, the Wazuh RESTful API, the agent registration service, the agent connection service, the Wazuh cluster daemon, and the Wazuh forwarder.

- :ref:`Wazuh WUI <wazuh_wui>`: A flexible and intuitive web interface for mining, analyzing, and visualizing data. It includes out-of-the-box dashboards for security events, regulatory compliance (e.g. PCI DSS, GDPR, CIS, HIPAA, NIST 800-53), detected vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, and others. This interface is also used to manage Wazuh configuration and to monitor its status.

- :ref:`Wazuh agent <installation_agents>`: A multi-platform software that runs on the hosts that the user wants to monitor. The Wazuh agent communicates with the Wazuh manager, sending data in near real time through an encrypted and authenticated channel. It is installed on endpoints and provides prevention, detection, and response capabilities. The Wazuh agent supports Windows, Linux, macOS, HP-UX, Solaris, and, AIX platforms.


.. thumbnail:: ../../images/installation/distributed_deployment.png
  :align: center
  :width: 100%

Follow the installation workflow to complete the Wazuh components installation. If you have already installed the Wazuh indexer, Wazuh manager, and Wazuh WUI components, and want to deploy the agents, see the :ref:`Wazuh agent <installation_agents>` section.

.. toctree::
  :hidden:
  :maxdepth: 1

  wazuh-indexer
  wazuh-manager
  wazuh-wui
