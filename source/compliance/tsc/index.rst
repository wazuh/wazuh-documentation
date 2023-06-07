.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh helps organizations meet technical compliance requirements. Learn how to use Wazuh for TSC compliance.

Using Wazuh for TSC compliance
==============================

The American Institute of Certified Professional Accountants (AICPA) developed the SOC 2 reporting framework to provide organizations with a uniform method to assess and report on the efficacy of their information security policies. SOC 2 reports focus on the five trust service categories of security, availability, processing integrity, confidentiality, and privacy.

The Trust Services Criteria (TSC) created by the Assurance Services Executive Committee (ASEC) of the AICPA presents control evaluation benchmarks. These evaluation benchmarks include metrics for security, availability, processing integrity, confidentiality, and privacy of information and systems across an entire entity. These metrics also relate to granular aspects of the entity, such as a division, an operational procedure, or a particular type of information used by the entity. The AICPA defines the common criteria as a set of controls that apply to the five Trust Services Criteria categories. 

-  **The COSO Principles and Common Criteria**

   The Committee of Sponsoring Organizations (COSO) internal control framework provides a systematic approach for organizations to manage risk and improve performance. It includes a detailed framework for evaluating and improving an entity's internal control structure.

   TSC common criteria (CC) provides a framework for assessing and certifying the security of information technology (IT) products and systems. It defines a set of security standards and evaluation guidelines that organizations can adopt to assess the security of IT products and systems.

   It's important to note that though both frameworks intersect, they are different. The TSC framework and COSO principles evaluate the effectiveness of an organization's internal controls and risk management processes. While the COSO principles prioritize the entity's overall internal control and risk management, the TSC common criteria focus primarily on the security of IT products and systems. It achieves this by providing a set of specific criteria for evaluating controls related to security, availability, processing integrity, confidentiality, and privacy.

   Providing security to IT products and systems is a key element in improving an entity's overall risk management strategy and internal control structure. These criteria focus on the logical and physical protection of information, systems, and networks. The common criteria (CC) are organized into nine subsections, which are:

   -  CC1: Control environment
   -  CC2: Communication and Information
   -  CC3: Risk Management and Design and Implementation of Controls
   -  CC4: Control Activities
   -  CC5: Monitoring of Controls
   -  CC6: Logical and Physical Access Controls
   -  CC7: System Operations
   -  CC8: Change Management
   -  CC9: Risk Mitigation

   In summary, SOC 2, TSC, COSO, and CC are all frameworks and standards organizations use to manage risks and ensure the effectiveness of their internal controls. SOC 2 and TSC focus on the security, availability, processing integrity, confidentiality, and privacy of an organization's systems and services. COSO provides a broader framework for enterprise risk management and internal control, while CC offers a method for evaluating the security features of IT products and systems. Organizations may use a combination of these frameworks and standards to develop a comprehensive risk management and compliance strategy.

-  **TSC additional criteria**

   The TSC additional criteria are an extension of the common criteria. Organizations can use these additional criteria to address precise security requirements not defined by the conventional TSC common criteria.

   Wazuh assists with these criteria by performing log collection, file integrity monitoring, configuration assessment, threat detection, vulnerability assessment, and automated threat response.

This document outlines use cases that show how Wazuh helps users comply with the TSC common criteria, and the additional criteria for availability, confidentiality, and processing integrity. We have also created the `Using Wazuh for TSC 2017 requirements guide <https://documentation.wazuh.com/resources/using-wazuh-for-TSC-2017-requirements-guide.pdf>`__, which complements this document. Please refer to the guide for more details on how Wazuh helps meet TSC requirements.

The following sections outline some of the technical requirements that Wazuh supports:

.. toctree::
   :caption: The COSO Principle and Common Criteria
   :maxdepth: 1

   common-criteria/cc2.1
   common-criteria/cc3.1
   common-criteria/cc5.1
   common-criteria/cc6.1
   common-criteria/cc7.1
   common-criteria/cc8.1

.. toctree::
   :caption: The additional criteria
   :maxdepth: 2

   additional-criteria/additional-criteria
