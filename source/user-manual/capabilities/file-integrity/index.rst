.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: File Integrity Monitoring (FIM) is a security process that monitors system, application, and sensitive data files, then reports any integrity changes. Learn more about FIM in this section.

.. _manual_file_integrity:

File integrity monitoring
=========================

File Integrity Monitoring (FIM) is a security process that monitors system, application, and sensitive data files, then reports any integrity changes. It helps organizations detect unauthorized changes to critical files and reduce the risk of data theft or compromise.

The Wazuh FIM module monitors files and directories for creation, modification, and deletion events. It establishes a baseline by saving each file's checksum and attributes, then detects changes through scheduled or real-time scans. When a file diverges from its baseline, the FIM module generates a finding.

The Wazuh FIM module supports several security and operational use cases, including:

.. rubric:: Change management
    :class: h2

The Wazuh FIM module helps verify that change management processes work as intended. It records what changed, when, and who or what caused it, helping teams flag unauthorized configuration changes and confirm approved updates were implemented correctly.

.. rubric:: Threat detection and response
    :class: h2

Combine FIM with other Wazuh capabilities to strengthen threat detection and response. It monitors file integrity, flags permission changes, and tracks user and file activity, giving security teams the detailed findings they need to investigate and respond to threats fast.

.. rubric:: Regulatory compliance
    :class: h2

FIM supports compliance with data security, privacy, and retention requirements by monitoring critical files for unauthorized changes, helping organizations meet standards such as PCI DSS, HIPAA, and GDPR.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        how-it-works
        how-to-configure-fim
        interpreting-fim-module-analysis
        basic-settings
        creating-custom-fim-rules
        advanced-settings
        use-cases/index
        windows-registry-monitoring
