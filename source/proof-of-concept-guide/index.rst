.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Proof of Concept guide explains how to set up the Wazuh environment to test the different product capabilities. Learn more about it in our documentation.

Wazuh |WAZUH_CURRENT_MINOR| Proof of Concept guide
==================================================

In this section of the documentation, we provide a set of use cases to explore different Wazuh capabilities. We describe how Wazuh can be configured for threat prevention, detection, and response. Each use case represents a real-world scenario that users can deploy using specific configurations.

Preparing your lab environment
------------------------------

The Wazuh platform consists of two main parts:

-  Security agents: Lightweight software deployed on the endpoints you want to monitor.
-  Central components (Wazuh server, indexer, and dashboard): These components collect, analyze, and visualize data from agents.

We recommend using virtual machines for your lab. Take a snapshot of the environment immediately after the initial setup. This allows you to quickly restore a clean state before starting each new use case, preventing previous tests from interfering with new ones.

The diagram below shows the recommended lab architecture for testing the use cases in this guide.

.. thumbnail:: /images/poc/poc-lab-env-arch.png
   :title: Wazuh lab environment architecture
   :align: center
   :width: 80%

Wazuh central components
^^^^^^^^^^^^^^^^^^^^^^^^

For the use cases in this guide, all Wazuh central components (server, indexer, and dashboard) run on a single system. A single-node deployment is sufficient and recommended for a small-scale lab environment. To install the Wazuh central components on a single endpoint, use one of the following options:

-  The :doc:`Quickstart guide </quickstart>`: Using this guide, you can install all the components on the same system in approximately 5 minutes.
-  Our preconfigured :doc:`virtual machine </deployment-options/virtual-machine/virtual-machine>`: Wazuh provides a pre-built virtual machine image in Open Virtual Appliance (OVA) format. You can import it to VirtualBox or other OVA-compatible virtualization systems.

Monitored endpoints
^^^^^^^^^^^^^^^^^^^

The Wazuh agent monitors the following endpoints. Depending on the use case, the endpoints act as victims of an attack or as malicious actors (attackers).

+----------+------------------------------+-----------+------+-------+
| Endpoint | Operating system (64-bit)    | CPU cores | RAM  | Disk  |
+==========+==============================+===========+======+=======+
| Ubuntu   | Ubuntu 24.04 LTS             | 1 vCPU    | 2 GB | 10 GB |
+----------+------------------------------+-----------+------+-------+
| RHEL     | Red Hat Enterprise Linux 9.0 | 1 vCPU    | 2 GB | 10 GB |
+----------+------------------------------+-----------+------+-------+
| Windows  | Windows 11                   | 2 vCPU    | 4 GB | 25 GB |
+----------+------------------------------+-----------+------+-------+

Refer to our :doc:`installation guide </installation-guide/wazuh-agent/index>` for information on how to install the Wazuh agent on these endpoints. You need internet access to perform some integrations and download the software used in these use cases.

Use cases
---------

.. toctree::
   :maxdepth: 1

   poc-file-integrity-monitoring
   poc-vulnerability-detection
   poc-security-configuration-assessment
   monitoring-docker
   detect-web-attack-sql-injection
   aws-infrastructure-monitoring

.. Pages not yet updated for this release - kept out of the build until refreshed
..
   detect-unauthorized-processes-netcat
   poc-detect-trojan
   poc-detect-hidden-process
   integrate-network-ids-suricata
   block-malicious-actor-ip-reputation
   detect-brute-force-attack
   detect-remove-malware-virustotal
   detect-malware-yara-integration
   audit-commands-run-by-user
   detect-web-attack-shellshock
   leveraging-llms-for-alert-enrichment
