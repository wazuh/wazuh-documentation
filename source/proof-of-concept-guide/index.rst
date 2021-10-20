.. _poc_guide:

.. meta::
  :description: The Proof of Concept guide explains how to set up the Wazuh environment to test the different product capabilities. Learn more about it in our documentation.

Wazuh Proof of Concept Guide
============================

The POC (Proof of Concept) guide is a cheat-sheet on setting up the Wazuh environment to test the different product capabilities. It assumes that the following components are already installed:

- Elasticsearch + Kibana + Wazuh Kibana plugin
- Wazuh manager + Filebeat (for integration with Elasticsearch)
- Wazuh agent (RHEL 7)
- Wazuh agent (Windows)

A good guide on how to install these components can be found in the :ref:`Installation guide <installation_guide>` section. 


.. toctree::
    :titlesonly:
    :includehidden:
    :maxdepth: 1

    audit-commands-run-by-user
    aws-infrastructure-monitoring
    detect-brute-force-attack
    monitoring-docker
    poc-file-integrity-monitoring
    block-malicious-actor-ip-reputation
    detect-unauthorized-processes-netcat
    integrate-osquery
    integrate-network-ids-suricata
    detect-web-attack-shellshock
    detect-web-attack-sql-injection
    poc-integrate-slack
    poc-detect-trojan
    detect-remove-malware-virustotal
    poc-vulnerability-detection
    detect-malware-yara-integration
    
