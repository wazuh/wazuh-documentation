.. Copyright (C) 2015, Wazuh, Inc.

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


For an easy installation and setup of the Wazuh central components, we recommend downloading our ready-to-use :ref:`OVA <virtual_machine>`, launching an EC2 Instance with our :doc:`AMI </deployment-options/amazon-machine-images/amazon-machine-images>`, or using the :doc:`Wazuh installation assistant </quickstart>`.

For more information on how to install the Wazuh components, see the :ref:`Installation guide <installation_guide>`. Note that a Wazuh agent cannot be installed on the same machine as the Wazuh manager.


Proofs of concept
-----------------


.. list-table::
   :width: 100%
   :widths: 50 50

   * - :doc:`audit-commands-run-by-user`
     - :doc:`aws-infrastructure-monitoring`
   * - :doc:`detect-brute-force-attack`
     - :doc:`monitoring-docker`
   * - :doc:`poc-file-integrity-monitoring`
     - :doc:`block-malicious-actor-ip-reputation`
   * - :doc:`detect-unauthorized-processes-netcat`
     - :doc:`integrate-osquery`
   * - :doc:`integrate-network-ids-suricata`
     - :doc:`detect-web-attack-shellshock`
   * - :doc:`detect-web-attack-sql-injection`
     - :doc:`poc-integrate-slack`
   * - :doc:`poc-detect-trojan`
     - :doc:`detect-remove-malware-virustotal`
   * - :doc:`poc-vulnerability-detection`
     - :doc:`detect-malware-yara-integration`


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

