.. _getting_started:

Getting started
=====================

Wazuh is an Open Source project for security visibility, compliance and infrastructure monitoring. It can be used to monitor both your hosts and endpoints, providing the following main capabilities:

- **Log management and analysis**: Wazuh agents read operating system logs and events, forwarding them to a central manager for analysis and storage. The purpose of this process is the identification of application or system errors, misconfigurations, intrusion attempts, policy violations or security issues.
- **File integrity monitoring**: Wazuh monitors the file system, identifying changes in permissions, attributes, contents or ownership.
- **Intrusion and anomalies detection**: Agents do scan the system looking for malware, rootkits or anomalies. They can detect hidden files, processes or open ports, as well as inconsistencies in system call responses.
- **Policy and compliance monitoring**: Wazuh monitors configuration files to ensure they are compliant with your security policies, standards or hardening guides. Agents perform periodic scans to detect applications that are known to be vulnerable, not patched, or not properly configured.

Wazuh relies on a multi-platform agent used to scan the monitored host looking for anomalies, indicators of compromise or applications that have not been hardened correctly (or are known to be vulnerable). The agent is also used to collect log messages, file hashes and other useful system information (e.g. applications installed, open ports, running processes).

Agents collected data is forwarded to a central manager, through a secure and authenticated channel, where it is analyzed and processed, resulting in security alerts.

This diverse set of capabilities is provided by integrating OSSEC, OpenSCAP and Elastic, making them work together as a single solution, and simplifying their configuration and management.

Wazuh also provides a centralized Web User Interface (fully integrated in Elastic), an updated log analysis ruleset, and a RESTful API that allows user to monitor deployment status and configuration.

.. topic:: Documentation structure

   This document will help you understand Wazuh components, functionality, architecture and use cases.

.. toctree::
   :maxdepth: 2

   components
   architecture
   use_cases
