
.. meta::
  :description: The Proof of Concept guide explains how to set up the Wazuh environment to test the different product capabilities. Learn more about it in our documentation.

.. _poc_guide:

Proof of Concept guide
======================

The Proof of Concept (PoC) guide explores how to set up the Wazuh environment to test or demo the different product capabilities. Each PoC represents real-world scenarios that users can deploy using specific configurations. In addition, further information is provided to verify the feasibility of the product on how to generate and query the alerts, and the affected endpoints resulting from each PoC.


Prerequisites
-------------

You need to have these components already installed and running to test the PoCs.

  * The Wazuh central components: server, indexer, and dashboard
  * A Wazuh agent running on a Ubuntu 20 LTS system
  * A Wazuh agent running on a Windows system

For an easy installation and setup of the Wazuh central components, we recommend downloading our ready-to-use :ref:`OVA <virtual_machine>`, launching an EC2 Instance with our :ref:`AMI <amazon-machine-images>`, or using our :ref:`Wazuh installation assistant <unattended_all_in_one>`.

For more information on how to install the Wazuh components, see the :ref:`Installation guide <installation_guide>`. Note that a Wazuh agent cannot be installed on the same machine as the Wazuh manager.


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

