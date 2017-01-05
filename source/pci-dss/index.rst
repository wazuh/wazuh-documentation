.. _pci_dss:

Wazuh PCI DSS guide
===================

.. rubric:: Introduction

The **Payment Card Industry Data Security Standard (PCI DSS)** is a proprietary information security standard for organizations that handle branded credit cards from the major card schemes including *Visa*, *MasterCard*, *American Express*, *Discover*, and *JCB*. The standard was created to increase controls around cardholder data to reduce credit card fraud.

OSSEC helps to implement PCI DSS by performing log analysis, file integrity checking, policy monitoring, intrusion detection, real-time alerting and active response. This guide (`PDF <http://ossec.wazuh.com/ruleset/PCI_Guide.pdf>`_, `Excel <http://ossec.wazuh.com/ruleset/PCI_Guide.xlsx>`_) explains how these capabilities help with each of the standard requirements.

In the following section we will elaborate on some specific use cases. They explain how to use OSSEC capabilities to meet the standard requirements.

.. rubric:: Documentation sections

- :ref:`pci_dss_log_analysis`
- :ref:`pci_dss_policy_monitoring`
- :ref:`pci_dss_rootkit_detection`
- :ref:`pci_dss_file_integrity_monitoring`
- :ref:`pci_dss_active_response`
- :ref:`pci_dss_elastic`

.. toctree::
    log-analysis
    policy-monitoring
    rootkit-detection
    file-integrity-monitoring
    active-response
    elastic

What's next
-----------

Once you know how OSSEC can help with PCI DSS, we encourage you to move forward and try out Elastic integration or the OSSEC Wazuh ruleset, check them out at:

* :ref:`Elastic Stack integration guide <installation_elastic>`
* :ref:`OSSEC Wazuh Ruleset <ruleset>`
