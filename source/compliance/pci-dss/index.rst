.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh helps organizations meet technical compliance requirements, including PCI DSS. Learn how our capabilities assist with each of PCI standard requirements.

.. _pci_dss:

Using Wazuh for PCI DSS compliance
==================================

The Payment Card Industry Data Security Standard (PCI DSS) is a proprietary information security standard for organizations that process credit card payments. The standard was created to increase controls around cardholder data to reduce credit card fraud.

Wazuh helps ensure PCI DSS compliance by performing log data collection, file integrity monitoring, security configuration assessment, system inventory, real-time alerting, and active response. The Wazuh dashboard displays information in real-time, allowing filtering by alert field types, including compliance controls. We have also developed a couple of PCI DSS dashboards to make relevant alerts easier to view. The syntax used for tagging PCI DSS-relevant rules is ``pci_dss`` followed by the requirement number (e.g., ``pci_dss_10.2.4`` and ``pci_dss_10.2.5``).

This guide explains how Wazuh capabilities and modules assist with meeting **PCI DSS version 4.0** requirements:

-  `Wazuh for PCI DSS V4.0 Guide (PDF) <https://wazuh.com/resources/WAZUH-PCI-DSS-V4.0-guide.pdf>`_

In the following sections, we present use cases that demonstrate how to leverage Wazuh capabilities and modules to meet **PCI DSS version 4.0** requirements.

.. toctree::
   :maxdepth: 1

   log-analysis
   configuration-assessment
   malware-detection
   file-integrity-monitoring
   vulnerability-detection
   active-response
   system-inventory
   dashboard

