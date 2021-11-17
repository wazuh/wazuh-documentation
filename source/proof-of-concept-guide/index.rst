
.. meta::
  :description: The Proof of Concept guide explains how to set up the Wazuh environment to test the different product capabilities. Learn more about it in our documentation.

.. _poc_guide:  

Proof of Concept guide
======================

The Proof of Concept (POC) guide explores how to set up the Wazuh environment to test or demo the different product capabilities. Each POC represents real-world scenarios for which a specific configuration is needed to set up different use cases. To verify the feasibility of the product, further information is provided on how to generate and query the alerts, and the affected endpoints resulting from each POC.


Prerequisites
-------------

You need to have these components already installed and to test the POCs. For this, we recommend downloading our ready-to-use :ref:`OVA <virtual_machine>` or launching an EC2 Instance with our :ref:`AMI <amazon-machine-images>` for an easy all-in-one, unattended installation. Depending on the scenario, you might also need either a RHEL 7 or Windows system with a Wazuh agent installed on each of them.

  * Elasticsearch, Kibana, and Wazuh Kibana plugin
  * Wazuh manager and Filebeat (for integration with Elasticsearch)
  * A Wazuh agent running on a RHEL 7 system
  * A Wazuh agent running on a Windows system

For information on how to install these components, see the :ref:`Installation guide <installation_guide>`.

Proofs of concept
-----------------


.. list-table::
   :width: 100%
   :widths: 50 50
   
   * - :ref:`poc_audit_commands`
     - :ref:`poc_aws_monitoring`
   * - :ref:`poc_detect_bruteforce`
     - :ref:`poc_monitoring_docker`
   * - :ref:`poc_fim`
     - :ref:`poc_block_actor_IP_reputation`
   * - :ref:`poc_detect_unauthorized_process_netcat`
     - :ref:`poc_integrate_osquery`
   * - :ref:`poc_ids_integration_suricata`
     - :ref:`poc_detect_web_attack_shellshock`
   * - :ref:`poc_detect_web_attack_sql_injection`
     - :ref:`poc_slack_integration`
   * - :ref:`poc_trojan_detection`
     - :ref:`poc_detect_remove_malware_virustotal`
   * - :ref:`poc_vulnerability_detector`
     - :ref:`poc_detect_yara`



.. toctree::
    :hidden:
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
    
