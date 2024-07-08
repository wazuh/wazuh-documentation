.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Proof of Concept guide explains how to set up the Wazuh environment to test the different product capabilities. Learn more about it in our documentation.

Proof of Concept guide
======================

In this section of the documentation, we provide a set of use cases to explore different Wazuh capabilities. We describe how Wazuh can be configured for threat prevention, detection, and response. Each use case represents a real-world scenario that users can deploy using specific configurations.

Preparing your lab environment
------------------------------

The Wazuh solution consists of security agents, which are deployed on monitored endpoints, and the Wazuh central components, which collect and analyze data gathered by the agents.

We recommend that you use virtual machines and take snapshots immediately after setting up the infrastructure. Doing this you can get a clean environment whenever you want to test a new use case. A clean environment is important because it prevents the different tests from interfering with each other.

The diagram below illustrates the architecture of the Wazuh lab environment that is required to test the use cases described in this document.

.. thumbnail:: /images/poc/poc-lab-env-arch.png
   :title: Wazuh lab environment architecture
   :align: center
   :width: 80%

Wazuh central components
^^^^^^^^^^^^^^^^^^^^^^^^

In these use cases, the Wazuh central components (server, indexer, and dashboard) run on one system. This is because you’re monitoring a small scale environment and there’s no need for a distributed architecture.

To install the Wazuh central components on a single system, it’s recommended to use one of the following options:

-  The :doc:`Quickstart guide </quickstart>`: Using this guide, you can install all the components on the same system in approximately 5 minutes.
-  Our preconfigured :doc:`Virtual Machine </deployment-options/virtual-machine/virtual-machine>`: Wazuh provides a pre-built virtual machine image in Open Virtual Appliance (OVA) format. It can be imported to VirtualBox or other OVA-compatible virtualization systems.

Monitored endpoints
^^^^^^^^^^^^^^^^^^^

The Wazuh agent monitors the following endpoints. Depending on the use case, the endpoints act as victims of an attack, or as malicious actors (attackers).

+-----------+--------------------------------+-------------+--------+--------+
| Endpoint  | Operating system (64-bits)     | CPU cores   | RAM    | Disk   |
+===========+================================+=============+========+========+
| Ubuntu    | Ubuntu 22.04 LTS               | 1 vCPU      | 2 GB   | 10 GB  |
+-----------+--------------------------------+-------------+--------+--------+
| RHEL      | Red Hat Enterprise Linux 9.0   | 1 vCPU      | 2 GB   | 10 GB  |
+-----------+--------------------------------+-------------+--------+--------+
| Windows   | Windows 11                     | 2 vCPU      | 4 GB   | 25 GB  |
+-----------+--------------------------------+-------------+--------+--------+

You can see our :doc:`installation guide </installation-guide/wazuh-agent/index>` for information on how to install the Wazuh agent on these endpoints. You need Internet access to perform some integrations and download the software used in these use cases.

Use cases
---------

.. toctree::
   :maxdepth: 1

   block-malicious-actor-ip-reputation
   poc-file-integrity-monitoring
   detect-brute-force-attack
   monitoring-docker
   aws-infrastructure-monitoring
   detect-unauthorized-processes-netcat
   integrate-network-ids-suricata
   detect-web-attack-sql-injection
   poc-detect-trojan
   detect-remove-malware-virustotal
   poc-vulnerability-detection
   detect-malware-yara-integration
   poc-detect-hidden-process
   audit-commands-run-by-user
   detect-web-attack-shellshock
   leveraging-llms-for-alert-enrichment