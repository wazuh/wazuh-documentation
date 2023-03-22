.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh helps organizations meet technical compliance requirements, including HIPAA. Learn how our capabilities assist with each of HIPAA standard requirements.

.. _hipaa:

Using Wazuh for HIPAA compliance
================================

The Health Insurance Portability and Accountability Act (HIPAA) has specifications and procedures for handling health information. This act aims to improve the effectiveness of healthcare services. It includes standards for electronic health care transactions and code sets. It also includes standards for security and unique health identifiers. Because changes in technology can impact the privacy and security of healthcare data, HIPAA provisions have sections that require the use of federal privacy protections for individually identifiable health information.

Part 164, subpart C (Security Standards For The Protection Of Electronic Protected Health Information), provides guidelines for the transmission, handling, storage, and protection of electronic healthcare information.

Wazuh has various capabilities that assist with HIPAA compliance such as log data analysis, file integrity monitoring, configuration assessment, threat detection and response.

Wazuh includes default rules and decoders for detecting security incidents, system errors, security misconfigurations, and policy violations. By default, these rules are mapped to the associated HIPAA standard. In addition to the default rule mapping provided by Wazuh, it’s possible to map your custom rules to one or more HIPAA standards by adding the compliance identifier in the ``<group>`` tag of the rule. The syntax used to map a rule to a HIPAA standard is ``hipaa_`` followed by the number of the requirement, for example, ``hipaa_164.312.b``. Refer to the :doc:`ruleset section </user-manual/ruleset/index>` for more information. 

The `Wazuh for HIPAA guide (PDF) <https://wazuh.com/resources/Wazuh-for-IPAA-guide-V2.0.pdf>`_ focuses on part 164, subpart C (Security Standards For The Protection Of Electronic Protected Health Information) of the HIPAA standard. This guide explains how the various Wazuh modules assist in complying with HIPAA standards.

We have use cases in the following sections that show how to use Wazuh capabilities and modules to comply with HIPAA standards:

.. toctree::
    :maxdepth: 1

    visualization-and-dashboard
    log-data-analysis
    configuration-assessment
    malware-detection
    file-integrity-monitoring
    vulnerability-detection
    active-response
