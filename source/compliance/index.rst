.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh helps provide regulatory compliance support. Learn more about compliance with Wazuh in this section.

Regulatory compliance
=====================

Wazuh helps implement compliance requirements for regulatory compliance support and visibility. This is done by providing automation, improved security controls, log analysis, and incident response.

The default Wazuh ruleset supports the PCI DSS, HIPAA, NIST 800-53, TSC, and GDPR frameworks and standards. Wazuh rules and decoders are used to detect attacks, system errors, security misconfigurations, and policy violations. In addition to the default compliance frameworks and standards provided by Wazuh, it is possible to monitor for custom compliance standards by adding the compliance identifier to the ruleset.

.. note::

   The rule and control mappings described in this section are indicative. They show how Wazuh capabilities can support the technical controls associated with each framework, but deploying Wazuh does not, by itself, certify or guarantee compliance with PCI DSS, HIPAA, NIST 800-53, GDPR, TSC, or any other regulatory framework. Formal compliance also depends on organizational policies, procedures, and evidence, and is ultimately determined by an independent qualified assessor or auditor.

Learn more about achieving compliance with Wazuh in the sections below:

.. toctree::
   :maxdepth: 1

   pci-dss/index
   gdpr/index
   hipaa/index
   tsc/index
..
   nist/index