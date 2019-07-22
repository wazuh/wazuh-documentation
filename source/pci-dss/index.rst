.. Copyright (C) 2019 Wazuh, Inc.

.. _pci_dss:

Using Wazuh for PCI DSS
=======================

.. meta::
  :description: Learn about the PCI DSS compliance and how Wazuh helps you to implement it.

The **Payment Card Industry Data Security Standard (PCI DSS)** is a proprietary information security standard for organizations that handle branded credit cards from the major card companies including *Visa*, *MasterCard*, *American Express*, *Discover*, and *JCB*. The standard was created to increase controls around cardholder data to reduce credit card fraud.

Wazuh helps to implement PCI DSS by performing log analysis, file integrity checking, policy monitoring, intrusion detection, real-time alerting and active response. This guide explains how these capabilities help with each of the standard requirements:

* `Wazuh for PCI DSS Guide (PDF) <https://wazuh.com/resources/Wazuh_PCI_DSS_Guide.pdf>`_

In the following section, we will elaborate on some specific use cases. They explain how to use Wazuh capabilities to meet the standard requirements.

.. toctree::
    :maxdepth: 1
    :caption: Contents

    log-analysis
    policy-monitoring
    rootkit-detection
    file-integrity-monitoring
    active-response
    elastic
