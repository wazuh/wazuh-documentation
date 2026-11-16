.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh helps provide regulatory compliance support. Learn more about compliance with Wazuh in this section.

Regulatory compliance
=====================

Wazuh helps implement compliance requirements for regulatory compliance support and visibility. This is done by providing automation, improved security controls, log analysis, and incident response.

The default Wazuh ruleset maps rules to PCI DSS, GDPR, HIPAA, NIST 800-53, NIST 800-171, TSC, CMMC, FedRAMP, ISO 27001, and NIS2. The Wazuh dashboard shows each framework under **Security operations** > **Regulatory Compliance**, with **Dashboard**, **Controls**, and **Findings** tabs. The guides in this section cover PCI DSS, GDPR, HIPAA, NIST 800-53, and TSC.

Wazuh rules and decoders detect attacks, system errors, security misconfigurations, and policy violations. You can also monitor custom compliance standards by adding a compliance identifier to a rule. See :ref:`Compliance <data_analysis_rules_compliance>` for the supported keys.

.. note::

   The rule and control mappings described in this section are indicative. They show how Wazuh capabilities can support the technical controls associated with each framework, but deploying Wazuh does not, by itself, certify or guarantee compliance with PCI DSS, HIPAA, NIST 800-53, GDPR, TSC, or any other regulatory framework. Formal compliance also depends on organizational policies, procedures, and evidence, and is ultimately determined by an independent qualified assessor or auditor.

Learn more about achieving compliance with Wazuh in the sections below:

.. toctree::
   :maxdepth: 1

   pci-dss/index
   gdpr/index
   hipaa/index
   nist/index
   tsc/index