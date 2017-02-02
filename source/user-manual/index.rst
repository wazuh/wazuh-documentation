.. _user_manual:

User manual
================

Wazuh helps to get security visibility into your infrastructure, by monitoring hosts at a system and application level. The solution, based on multi-platform and lightweight agents, provides the following capabilities:

+ Log management and analysis: Wazuh agents read operating system logs and events, forwarding them to a central manager for analysis and storage. The purpose of this process is the identification of application or system errors, misconfigurations, intrusion attempts, policy violations or security issues.

- File integrity monitoring: Wazuh monitors the file system, identifying changes in permissions, attributes, contents or ownership.

+ Intrusions and anomalies detection: Agents do scan the system looking for malware, rootkits or anomalies. They can detect hidden files, processes or open ports, as well as inconsistencies in system call responses.

- Policy and compliance monitoring: Wazuh monitors configuration files to ensure they are compliant with your security policies, standards or hardening guides. Agents perform periodic scans to detect applications that are known to be vulnerable, not patched, or not properly configured.

This diverse set of capabilities is provided by integrating OSSEC, OpenSCAP and Elastic, making them work together as a single solution, and simplifying their configuration and management.

Wazuh also provides a centralized Web User Interface (fully integrated in Elastic), an updated log analysis ruleset, and a RESTful API that allows user to monitor deployment status and configuration.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        configuration-files/index
        log-analysis/index
        file-integrity/index
        anomalies-detection/index
        policy-monitoring/index
        system-calls-monitoring/index
        ruleset/index
        api/index
