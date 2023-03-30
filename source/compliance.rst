.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh helps provide regulatory compliance support. Learn more about compliance with Wazuh in this section.

.. _compliance:

Regulatory compliance
=====================

Wazuh helps implement compliance requirements for regulatory compliance support and visibility. This is done by providing automation, improved security controls, log analysis, and incident response. 

The default Wazuh ruleset provides support for PCI DSS, HIPAA, NIST 800-53, TSC, and GDPR frameworks and standards. Wazuh rules and decoders are used to detect attacks, system errors, security misconfigurations, and policy violations. In addition to the default compliance frameworks and standards provided by Wazuh, it is possible to monitor for custom compliance standards by adding the compliance identifier in the ``<group>`` tag of rules. Refer to the :doc:`Ruleset section </user-manual/ruleset/index>` for more information.

Learn more about achieving compliance with Wazuh in the sections below:

.. toctree::
    :maxdepth: 1

    pci-dss/index
    gdpr/index
    hipaa/index
    nist/index

