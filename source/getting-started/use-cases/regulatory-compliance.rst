.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Wazuh helps organizations meet PCI DSS, GDPR, HIPAA, NIST 800-53, and TSC standards. Learn more about regulatory compliance in this use case.
    
Regulatory compliance
=====================

Regulatory compliance means following laws, rules, regulations, and standards set by government bodies, industry regulators, or other authorities. Organizations need to adhere to regulatory compliance to uphold the integrity of business operations and protect sensitive data.

Adhering to regulatory requirements constitutes a crucial component within an organization's cybersecurity framework. Through alignment with relevant  laws, rules, and benchmarks, entities can safeguard their information resources and mitigate the likelihood of security breaches.

Wazuh provides several :doc:`capabilities </user-manual/capabilities/index>` for implementing  compliance, including:

-  File Integrity Monitoring (FIM).
-  Security Configuration Assessment (SCA).
-  Vulnerability detection.
-  Malware detection.
-  Incidence response.

Wazuh provides out-of-the-box rulesets mapped against compliance tags for PCI DSS, HIPAA, NIST 800-53, TSC, and GDPR frameworks and standards.

.. thumbnail:: /images/getting-started/use-cases/regulatory-compliance/regulatory-compliance-modules.png
   :title: Regulatory compliance modules
   :alt: Regulatory compliance modules
   :align: center
   :width: 80%

Wazuh allows you to create :doc:`custom rules </user-manual/ruleset/custom>` and tag them to compliance standards that suit your needs. The following section details use cases for the supported standards.

PCI DSS
-------

PCI DSS (Payment Card Industry Data Security Standard) outlines the security criteria that businesses that process, store, and transmit card data must adhere to. This standard is designed to tighten security measures surrounding cardholder data and lessen fraud within the payment card industry.

Payment card industries can leverage Wazuh capabilities to reinforce PCI DSS adherence. Users can customize these capabilities to align with specific business needs as stipulated by the standard. For example, you can use `Wazuh to conduct a PAN scan <https://wazuh.com/blog/conducting-primary-account-number-scan-with-wazuh/>`__ by creating customs rules that detect the presence of an unmasked Primary Account Number(PAN).

.. thumbnail:: /images/getting-started/use-cases/regulatory-compliance/unmasked-pan-alert.png
   :title: Alert of unmasked Primary Account Number (PAN)
   :alt: Alert of unmasked Primary Account Number (PAN)
   :align: center
   :width: 80%

You can find more information on how :doc:`Wazuh helps organizations meet the PCI DSS </compliance/pci-dss/index>` standard.

GDPR
----

The General Data Protection Regulation (GDPR), developed by the European Union, aims to harmonize data privacy laws throughout the continent. The protection of the data of citizens of the European Union is its main priority. The GDPR framework intends to enhance user data privacy and change how the European Union, and organizations that process EU citizens data handle data privacy.

.. thumbnail:: /images/getting-started/use-cases/regulatory-compliance/gdpr-dashboard.png
   :title: GDPR module dashboard
   :alt: GDPR module dashboard
   :align: center
   :width: 80%

Wazuh comes with default rules and decoders to identify different kinds of cyberattacks, misconfigured systems, security vulnerabilities, and policy violations. These events are tagged to the relevant GDPR requirements. You can find more information on how :doc:`Wazuh helps organizations meet the GDPR regulatory compliance </compliance/gdpr/index>`.

HIPAA
-----

The Health Insurance Portability and Accountability Act is a legal framework that enables healthcare institutions and organizations to prevent the unauthorized disclosure of sensitive patient health information. The Health Insurance Portability and Accountability Act (HIPAA) sets guidelines and procedures for processing health information to increase the efficiency of healthcare services. It entails guidelines for electronic healthcare transactions and standards for security and distinctive health identification.

The HIPAA framework requires federal privacy protections for health information due to technological advancements, which have an influence on the privacy and security of this information.

Organizations can monitor access and changes made to PII (personally identifiable information) and other confidential documents using the :doc:`Wazuh FIM </proof-of-concept-guide/poc-file-integrity-monitoring>` module. 

You can find more information on how :doc:`Wazuh helps organizations meet the HIPAA framework </compliance/hipaa/index>`.

The image below shows the creation and deletion of a file on a monitored endpoint.

.. thumbnail:: /images/getting-started/use-cases/regulatory-compliance/added-deleted-fim-alerts.png
   :title: FIM alert of file created and deleted
   :alt: FIM alert of file created and deleted
   :align: center
   :width: 80%

NIST 800-53
-----------

The  National Institute of Standards and Technology (NIST) 800-53 is known as Security and Privacy Controls for Federal Information Systems and Organizations. It is a crucial component of the larger NIST Special Publication 800 series.

NIST 800-53 offers recommendations for managing information security and privacy for federal organizations and agencies. It helps organizations safeguard sensitive data while protecting their information systems and data from various threats.

.. thumbnail:: /images/getting-started/use-cases/regulatory-compliance/nist-dashboard.png
   :title: NIST 800-53 module dashboard
   :alt: NIST 800-53 module dashboard
   :align: center
   :width: 80%

The :doc:`Vulnerability Detector </user-manual/capabilities/vulnerability-detection/how-it-works>` module runs scans when enabled on startup or periodically as defined. You can view the vulnerability scan results on the Wazuh dashboard which includes the time and date of the scan, vulnerable applications, and packages on the monitored endpoint. You can find more information on how :doc:`Wazuh helps organizations meet the NIST 800-53 standard </compliance/nist/index>`.

.. thumbnail:: /images/getting-started/use-cases/regulatory-compliance/vulnerabilities-module-inventory.png
   :title: Vulnerability Detection module inventory
   :alt: Vulnerability Detection module inventory
   :align: center
   :width: 80%

TSC
---

The Trust Services Criteria were developed by the Assurance Services Executive Committee (ASEC) of the AICPA. The TSC has five trust service areas which are security, availability, processing integrity, confidentiality, and privacy. Organizations implement TSC to protect customer data from unauthorized access, use, disclosure, modification or destruction.

Wazuh provides out-of-the-box tags for TSC Common Criterias that give organizations a standardized way to evaluate and report on the effectiveness of their information security policies. You can find more information on how :doc:`Wazuh helps organizations meet TSC compliance </compliance/tsc/index>`.

The image below shows some of the Common criteria Wazuh helps organizations meet *CC7.2 - Requiring ongoing monitoring for all irregular activity indicative of incidents*.

.. thumbnail:: /images/getting-started/use-cases/regulatory-compliance/tsc-cc-compliance.png
   :title: TSC common criteria compliance
   :alt: TSC common criteria compliance
   :align: center
   :width: 80%
