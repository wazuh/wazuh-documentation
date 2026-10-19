.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh capabilities and modules help you implement and monitor security controls related to NIST SP 800-53.

.. _nist:

Using Wazuh for NIST 800-53 compliance
======================================

NIST SP 800-53 is a National Institute of Standards and Technology publication providing a catalog of security and privacy controls for information systems and organizations. Federal agencies use these controls to protect federal information and information systems. Organizations that process federal information may be required to meet applicable NIST requirements depending on their contractual or regulatory obligations.

Although NIST publications primarily target U.S. federal agencies, organizations in other sectors and countries also use NIST guidance to establish and assess cybersecurity practices. NIST SP 800-53 is commonly used as a reference for implementing and evaluating security and privacy controls.

Wazuh provides capabilities such as log analysis, file integrity monitoring, configuration assessment, vulnerability detection, threat detection, and automated response. These capabilities can help organizations implement and monitor security controls related to NIST SP 800-53.

Wazuh includes default rules and decoders for detecting security incidents, system errors, security misconfigurations, and policy violations. These rules include mappings to applicable NIST SP 800-53 controls. You can also map custom rules to one or more NIST SP 800-53 controls. In Wazuh 5.0, rules use the :doc:`Sigma format </user-manual/data-analysis/rules>`. To map a custom rule to a NIST SP 800-53 control, add the control identifier to the ``nist_800_53`` list under the ``compliance`` field of the rule. For example:

.. code-block:: yaml

   compliance:
     nist_800_53:
       - AC-2
       - IA-5
       - AU-6

Refer to the :doc:`Rules </user-manual/data-analysis/rules>` section for more information.

.. note::

   These rules and control mappings are indicative and do not by themselves certify compliance. See :doc:`Regulatory compliance </compliance/index>` for more details.

In the `Wazuh for NIST 800-53 revision 5 guide (PDF) <https://wazuh.com/resources/Wazuh-NIST-800-53-guide.pdf>`__, we explain how Wazuh modules assist in meeting and implementing NIST 800-53 controls.

We have use cases in the following sections that show how to use Wazuh capabilities and modules to comply with NIST 800-53 controls:

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
