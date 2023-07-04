.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section to learn more about how to use Wazuh for NIST 800-53 compliance.

:orphan:

Using Wazuh for NIST 800-53 compliance
======================================

NIST 800-53 is a cybersecurity framework developed by the National Institute of Standards and Technology (NIST). NIST 800-53 specifies security and privacy mechanisms and controls that U.S. federal information systems must implement and meet. The U.S. government makes compliance with these requirements mandatory for organizations and entities that process and handle federal data. 

While NIST guidelines and recommendations are primarily targeted at federal agencies in the United States, they are widely used and respected by organizations in other sectors and countries as well. In fact, many industries and organizations have adopted the NIST Cybersecurity Framework as a basis for their own cybersecurity practices.

Wazuh has various capabilities and modules, such as log data analysis, file integrity monitoring, configuration assessment, threat detection, and autonomous response, that help improve organizations' cybersecurity posture. These Wazuh modules and capabilities also assist organizations in complying with NIST 800-53 controls. 

Wazuh includes default rules and decoders for detecting security incidents, system errors, security misconfigurations, and policy violations. These rules are mapped to the NIST 800-53 controls by default. In addition to the default rule mapping provided by Wazuh, it’s possible to map your custom rules to one or more NIST 800-53 controls. For this, you need to add their compliance identifier in the ``<group>`` tag of the rule. The syntax used to map a rule to a NIST 800-53 control is ``nist_800_53_`` followed by the acronym of the control and the specific control number. For example, the syntax ``nist_800_53_AU.12`` maps a rule to the AU-12 Audit Record Generation control. Refer to the :doc:`Rules syntax section </user-manual/ruleset/ruleset-xml-syntax/rules>` for more information. 

In the `Wazuh for NIST 800-53 revision 5 guide (PDF) <https://wazuh.com/resources/Wazuh-NIST-800-53-guide.pdf>`_, we explain how the various Wazuh modules assist in meeting and implementing NIST 800-53 controls.

We have some use cases in the following sections that show how to use Wazuh capabilities and modules to comply with NIST 800-53 controls:

.. toctree::
   :maxdepth: 1

   visualization-and-dashboard
   log-data-analysis
   configuration-assessment
   malware-detection
   file-integrity-monitoring
   system-inventory
   vulnerability-detection
   active-response
   threat-intelligence