.. _getting_started:

Getting started
===============

Wazuh is an Open Source project for security visibility, compliance and infrastructure monitoring. It is born as an OSSEC HIDS fork that, based on the integration with Elastic Stack and OpenSCAP, evolves into a more comprehensive solution. Below is a brief description of these tools and what they do:

.. image:: ../images/ossec_openscap_elastic_1024x445.png
   :align: center
   :width: 100%

- `OSSEC HIDS <http://ossec.github.io>`_ is a Host based Intrusion Detection System used both to get security visibility and for compliance purposes. Its architecture is based on a multi-platform agent that do forward system data (e.g log messages, file hashes, detected anomalies) to a central system, where it is further analyzed and processed, resulting in security alerts.

+ `OpenSCAP <https://www.open-scap.org>`_ is an OVAL (Open Vulnerability Assessment Language) and XCCDF (Extensible Configuration Checklist Description Format) interpreter used to check system configuration and detect vulnerable applications. It is recognized as a standardized compliance and hardening checking solution for enterprise-level infrastructure.

- `Elastic Stack <https://www.elastic.co>`_ is collection of tools (Filebeat, Logstash, Elasticsearch, Kibana) to collect, parse, index, store and search log data. It provides a browser-based visualization frontend interface to easily consume data.


The solution relies on a multi-platform agent used to scan the monitored host looking for anomalies, indicators of compromise or applications that have not been hardened correctly (or are known to be vulnerable). The agent is also used to collect log messages, file hashes and other useful system information (e.g. applications installed, open ports, running processes).

Agents collected data is forwarded to a central manager, through a secure and authenticated channel, where it is analyzed and processed, resulting in security alerts.

This diverse set of capabilities is provided by integrating OSSEC, OpenSCAP and Elastic, making them work together as a single solution, and simplifying their configuration and management.

Wazuh also provides a centralized Web User Interface (fully integrated in Elastic), an updated log analysis ruleset, and a RESTful API that allows user to monitor deployment status and configuration.

.. topic:: Documentation structure

   This document will help you understand Wazuh components, functionality and architecture.

.. toctree::
   :maxdepth: 2

   components
   architecture
   use_cases
