.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh helps you meet PCI DSS compliance requirements through log data analysis, configuration assessment, malware detection, file integrity monitoring, vulnerability detection, active response, and system inventory.

.. _pci_dss:

Using Wazuh for PCI DSS compliance
===================================

The Payment Card Industry Data Security Standard (PCI DSS) is a proprietary information security standard for organizations that process credit card payments. The standard was created to increase controls around cardholder data to reduce credit card fraud.

Wazuh helps you meet PCI DSS compliance by performing log data analysis, configuration assessment, malware detection, file integrity monitoring, vulnerability detection, active response, and system inventory. The Wazuh dashboard displays information in near real time, allowing you to filter by event field types, including compliance controls. Wazuh also provides PCI DSS dashboards that make relevant events easier to view. To view the PCI DSS-related data on the Wazuh dashboard:

#. Navigate to **Regulatory Compliance** from the Wazuh **Overview** dashboard, then click **PCI DSS**.

   .. thumbnail:: /images/compliance/pci/overview-regulatory-compliance-pci-dss.png
      :title: Wazuh Overview dashboard
      :alt: Wazuh Overview dashboard
      :align: center
      :width: 80%

#. Click the **Dashboard** tab to get an overview such as the top 10 agents, PCI DSS requirements, and top requirements over time.

   .. thumbnail:: /images/compliance/pci/pci-dss-dashboard-tab.png
      :title: PCI DSS Dashboard tab
      :alt: PCI DSS Dashboard tab
      :align: center
      :width: 80%

#. Click the **Controls** tab to view the PCI DSS requirements breakdown.

   .. thumbnail:: /images/compliance/pci/pci-dss-controls-tab.png
      :title: PCI DSS Controls tab
      :alt: PCI DSS Controls tab
      :align: center
      :width: 80%

#. Click the **Findings** tab to view the findings related to the PCI DSS requirements within your environment regardless of the log source.

   .. thumbnail:: /images/compliance/pci/pci-dss-findings-tab.png
      :title: PCI DSS Findings tab
      :alt: PCI DSS Findings tab
      :align: center
      :width: 80%

Wazuh has standard policies that include decoders, Key-Value Databases (KVDBs), and rules that detect attacks, system errors, security misconfigurations, and policy violations. By default, these rules map to the associated PCI DSS requirements. In Wazuh 5.0, :doc:`rules </user-manual/data-analysis/rules>` use the Sigma format. You can map a custom rule to one or more PCI DSS requirements. To do this, add the requirement to the ``pci_dss`` list under the ``compliance`` field of the rule. For example:

.. code-block:: yaml

   compliance:
     pci_dss:
       - "2.2.1"
       - "6.3.3"

The `Wazuh for PCI DSS V4.0 Guide (PDF) <https://wazuh.com/resources/WAZUH-PCI-DSS-V4.0-guide.pdf>`__ explains how Wazuh capabilities and modules assist with meeting PCI DSS 4.0 requirements.

The following sections describe Wazuh capabilities and modules and the technical requirements they support:

.. toctree::
   :maxdepth: 1

   log-analysis
   configuration-assessment
   malware-detection
   file-integrity-monitoring
   vulnerability-detection
   active-response
   system-inventory
