.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Proof of Concept guide explains how to set up the Wazuh environment to test the different product capabilities. Learn more about it in our documentation.

Proof of Concept guide
======================

Wazuh 5.0 detects, investigates, and responds to common security threats on monitored endpoints. Each use case provides a short, hands-on exercise. You configure Wazuh on a lab endpoint, generate a real event, and examine the results in the Wazuh dashboard. The use cases are independent, so you can complete them in any order.

Before you start
----------------

Before running a use case, review its structure and prepare the required lab environment. The following sections explain what to expect from each exercise.

How each use case is organized
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Every use case follows the same structure, making it easy to find the information you need. Each use case includes the following sections. Verify data ingestion and Clean up appear only in the use cases that need them:

-  **Endpoints**: Lists the lab endpoints required for the use case and describes the role of each one.
-  **Configuration**: Describes the changes to make on the endpoints and in the Wazuh dashboard.
-  **Verify data ingestion**: Provides a quick check to confirm that Wazuh receives data from the endpoint before you run the test.
-  **Test the configuration** or **Attack emulation**: Describes the actions that generate the events Wazuh detects.
-  **View the findings**: Explains where to find the results in the Wazuh dashboard and which findings to expect.
-  **Troubleshooting**: Lists checks to perform when an expected finding does not appear.
-  **Clean up**: Explains how to undo the changes when restoring the lab snapshot is not sufficient.

Command conventions
^^^^^^^^^^^^^^^^^^^

The first character of each command indicates where and how to run it. Do not type this character.

+--------+---------------------------------------------------------------------------------------------------------+
| Prompt | Meaning                                                                                                 |
+========+=========================================================================================================+
| ``$``  | Run the command on a Linux endpoint as a regular user. Commands that need root privileges use ``sudo``. |
+--------+---------------------------------------------------------------------------------------------------------+
| ``#``  | Run the command on a Linux endpoint as the root user.                                                   |
+--------+---------------------------------------------------------------------------------------------------------+
| ``>``  | Run the command in a PowerShell terminal with administrator privileges on the Windows endpoint.         |
+--------+---------------------------------------------------------------------------------------------------------+

Placeholders
^^^^^^^^^^^^

Replace these placeholders with the values from your lab. Placeholders used in only one use case are explained where they appear.

+--------------------+-------------------------------------------------------------+
| Placeholder        | Value                                                       |
+====================+=============================================================+
| ``<UBUNTU_IP>``    | IP address of the Ubuntu endpoint.                          |
+--------------------+-------------------------------------------------------------+
| ``<WINDOWS_IP>``   | IP address of the Windows endpoint.                         |
+--------------------+-------------------------------------------------------------+
| ``<RHEL_IP>``      | IP address of the Red Hat Enterprise Linux (RHEL) endpoint. |
+--------------------+-------------------------------------------------------------+
| ``<WEBSERVER_IP>`` | IP address of the Ubuntu or Windows web server.             |
+--------------------+-------------------------------------------------------------+
| ``<USER_NAME>``    | Name of the user on the Windows endpoint.                   |
+--------------------+-------------------------------------------------------------+

Preparing your lab environment
------------------------------

A Wazuh lab has two main parts: the Wazuh agent and the Wazuh central components. It also includes the endpoints that the use cases monitor or use as attack sources. Each part has a specific role:

-  **Wazuh agent**: Lightweight software installed on the endpoints you want to monitor.
-  **Wazuh central components**: The Wazuh manager, Wazuh indexer, and Wazuh dashboard. Together, they receive, analyze, and display data from the agents.

The following diagram shows the recommended lab architecture.

.. thumbnail:: /images/poc/poc-lab-env-arch.png
   :title: Wazuh lab environment architecture
   :alt: Diagram of the lab architecture: Linux and Windows endpoints with Wazuh agents connected to the Wazuh manager, API, dashboard, and indexer
   :align: center
   :width: 80%

.. note::

   Use virtual machines for your lab, and take a snapshot right after the initial setup. Restore the snapshot before each use case, so that earlier tests don't interfere with new ones.

Wazuh central components
^^^^^^^^^^^^^^^^^^^^^^^^

Install all the Wazuh central components on a single system. A single-node deployment is enough for a lab. Use one of these options:

-  :doc:`Quickstart guide </quickstart>`: installs all the components on the same system in about 5 to 10 minutes.
-  :doc:`Preconfigured virtual machine </deployment-options/virtual-machine/virtual-machine>`: a pre-built Open Virtual Appliance (OVA) image that you can import into VirtualBox or another OVA-compatible virtualization system.

Endpoints
^^^^^^^^^

The use cases use three endpoints. The Wazuh agent monitors the Ubuntu and Windows endpoints, which act as the victims of the simulated attacks. The RHEL endpoint acts as the attacker and doesn't need a Wazuh agent.

+----------+------------------------------+--------+------+-------+--------------------+
| Endpoint | Operating system (64-bit)    | CPU    | RAM  | Disk  | Role               |
+==========+==============================+========+======+=======+====================+
| Ubuntu   | Ubuntu 24.04 LTS             | 1 vCPU | 2 GB | 10 GB | Monitored endpoint |
+----------+------------------------------+--------+------+-------+--------------------+
| Windows  | Windows 11                   | 2 vCPU | 4 GB | 25 GB | Monitored endpoint |
+----------+------------------------------+--------+------+-------+--------------------+
| RHEL     | Red Hat Enterprise Linux 9.0 | 1 vCPU | 2 GB | 10 GB | Attacker           |
+----------+------------------------------+--------+------+-------+--------------------+

Prerequisites
^^^^^^^^^^^^^

Complete the following before you start the use cases:

#. Install the Wazuh agent on the Ubuntu and Windows endpoints. Follow the :doc:`installation guide </installation-guide/index>`.

#. In the Wazuh dashboard, go to **Agents management** > **Summary** and check that both agents are **Active**.

   .. thumbnail:: /images/poc/poc-agents-summary-active.png
      :title: Active Wazuh agents
      :alt: Wazuh dashboard Agents management Summary page showing the Ubuntu and Windows agents with the Active status
      :align: center
      :width: 80%

#. Make sure all the endpoints have internet access. Multiple use cases download software or connect to external services.

#. Make sure the RHEL endpoint can reach the Ubuntu and Windows endpoints. The web attack use cases send HTTP requests from it.

#. In **Ruleset management** > **Overview**, check that the integration each use case needs is enabled. If an integration is off, Wazuh drops its events without any message.

Wazuh dashboard concepts
^^^^^^^^^^^^^^^^^^^^^^^^

The use cases rely on Wazuh dashboard terms for detection content and its results. You see the following terms throughout the guide:

-  **Findings**: Security events detected by Wazuh. Most use cases display findings under **Threat intelligence** > **Threat Hunting** > **Findings**, or in the **Findings** tab of a module dashboard.
-  **Integrations and detectors**: In **Ruleset management**, an :doc:`integration </user-manual/data-analysis/integration>` groups the decoders, rules, and :doc:`key-value databases (KVDBs) </user-manual/data-analysis/key-value-databases>` associated with a data source. A :doc:`detector </user-manual/data-analysis/detectors>` executes those rules to generate findings. Several use cases require you to enable an integration or start a detector.
-  **Spaces**: Ruleset content moves through different spaces as you develop and deploy it. You create and edit assets in the **Draft** space, promote them to **Test**, and then promote them to **Custom**. Custom content runs alongside the **Standard** content. See :doc:`Spaces </user-manual/data-analysis/space>`.

Use cases
---------

Each use case is independent. Restore your lab snapshot before you start a new one.

+-------------------------------------------+-----------------------------------------------------------------------------------------------------------+-----------------------+
| Use case                                  | What you do                                                                                               | Endpoints             |
+===========================================+===========================================================================================================+=======================+
| |poc_file_integrity_monitoring|           | Detect file creation, changes, and deletion, with the user and process that made them.                    | Ubuntu, Windows       |
+-------------------------------------------+-----------------------------------------------------------------------------------------------------------+-----------------------+
| |poc_vulnerability_detection|             | Detect vulnerable OpenSSH packages, then see the vulnerabilities resolved after an upgrade.               | Ubuntu                |
+-------------------------------------------+-----------------------------------------------------------------------------------------------------------+-----------------------+
| |poc_security_configuration_assessment|   | Review Center for Internet Security (CIS) benchmark results and add a custom web server hardening policy. | Ubuntu                |
+-------------------------------------------+-----------------------------------------------------------------------------------------------------------+-----------------------+
| |poc_monitoring_docker|                   | Monitor container activity on a Docker host.                                                              | Ubuntu                |
+-------------------------------------------+-----------------------------------------------------------------------------------------------------------+-----------------------+
| |poc_detect_web_attack_sql_injection|     | Detect an SQL injection attempt in Apache access logs.                                                    | Ubuntu, RHEL          |
+-------------------------------------------+-----------------------------------------------------------------------------------------------------------+-----------------------+
| |poc_aws_infrastructure_monitoring|       | Collect and analyze AWS CloudTrail logs.                                                                  | Ubuntu, AWS account   |
+-------------------------------------------+-----------------------------------------------------------------------------------------------------------+-----------------------+
| |poc_network_ids_integration|             | Analyze Suricata alerts about network traffic.                                                            | Ubuntu                |
+-------------------------------------------+-----------------------------------------------------------------------------------------------------------+-----------------------+
| |poc_detect_web_attack_xss|               | Detect an XSS attempt in Apache access logs.                                                              | Ubuntu, RHEL          |
+-------------------------------------------+-----------------------------------------------------------------------------------------------------------+-----------------------+
| |poc_detect_hidden_process|               | Detect processes hidden by a kernel-mode rootkit.                                                         | Ubuntu                |
+-------------------------------------------+-----------------------------------------------------------------------------------------------------------+-----------------------+
| |poc_detect_known_malicious_file|         | Detect a known malicious file hash with the Wazuh CTI threat-indicator feed.                              | Ubuntu, Windows       |
+-------------------------------------------+-----------------------------------------------------------------------------------------------------------+-----------------------+
| |poc_block_malicious_actor_ip_reputation| | Flag an IP address as malicious and block it automatically with Active Response.                          | Ubuntu, Windows, RHEL |
+-------------------------------------------+-----------------------------------------------------------------------------------------------------------+-----------------------+
| |poc_detect_vulnerable_driver_loading|    | Detect a known vulnerable driver load with Sysmon and a custom rule of driver hashes.                     | Windows               |
+-------------------------------------------+-----------------------------------------------------------------------------------------------------------+-----------------------+

.. |poc_file_integrity_monitoring| replace:: :doc:`File integrity monitoring <poc-file-integrity-monitoring>`
.. |poc_vulnerability_detection| replace:: :doc:`Vulnerability detection <poc-vulnerability-detection>`
.. |poc_security_configuration_assessment| replace:: :doc:`Security Configuration Assessment <poc-security-configuration-assessment>`
.. |poc_monitoring_docker| replace:: :doc:`Monitoring Docker events <monitoring-docker>`
.. |poc_detect_web_attack_sql_injection| replace:: :doc:`Detecting an SQL injection attack <detect-web-attack-sql-injection>`
.. |poc_aws_infrastructure_monitoring| replace:: :doc:`Monitoring AWS infrastructure <aws-infrastructure-monitoring>`
.. |poc_network_ids_integration| replace:: :doc:`Network IDS integration <network-ids-integration>`
.. |poc_detect_web_attack_xss| replace:: :doc:`Detecting a cross-site scripting (XSS) attack <detect-web-attack-xss>`
.. |poc_detect_hidden_process| replace:: :doc:`Detecting hidden processes <poc-detect-hidden-process>`
.. |poc_detect_known_malicious_file| replace:: :doc:`Detecting a known malicious file <detect-known-malicious-file>`
.. |poc_block_malicious_actor_ip_reputation| replace:: :doc:`Blocking a known malicious actor <block-malicious-actor-ip-reputation>`
.. |poc_detect_vulnerable_driver_loading| replace:: :doc:`Detecting vulnerable driver loading <detect-vulnerable-driver-loading>`

.. toctree::
   :hidden:
   :maxdepth: 1

   poc-file-integrity-monitoring
   poc-vulnerability-detection
   poc-security-configuration-assessment
   monitoring-docker
   detect-web-attack-sql-injection
   aws-infrastructure-monitoring
   network-ids-integration
   detect-web-attack-xss
   poc-detect-hidden-process
   detect-known-malicious-file
   block-malicious-actor-ip-reputation
   detect-vulnerable-driver-loading

.. Pages not yet updated for this release - kept out of the build until refreshed
..
   detect-unauthorized-processes-netcat
   poc-detect-trojan
   detect-brute-force-attack
   detect-remove-malware-virustotal
   detect-malware-yara-integration
   audit-commands-run-by-user
   detect-web-attack-shellshock
   leveraging-llms-for-alert-enrichment
