.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh helps organizations meet technical compliance requirements. Learn how to use Wazuh for TSC compliance.

Using Wazuh for TSC compliance
==============================

The American Institute of Certified Public Accountants (AICPA) developed the SOC 2 reporting framework. This framework provides a consistent basis for examining and reporting on controls relevant to the security, availability, processing integrity, confidentiality, and privacy of systems used to provide products or services. SOC 2 engagements use the AICPA Trust Services Criteria (TSC) to evaluate the design and operating effectiveness of those controls. The TSC Common Criteria are structurally aligned with the five components and 17 principles of the COSO Internal Control Integrated Framework, developed by the Committee of Sponsoring Organizations of the Treadway Commission (COSO). COSO is not a separate section of a SOC 2 report; instead, its internal-control concepts are reflected in the organization of the TSC Common Criteria.

This document outlines use cases that show how Wazuh supports compliance with the TSC common criteria and the additional criteria. We have also created the `Using Wazuh for TSC (2022 revision) requirements guide <https://documentation.wazuh.com/resources/using-wazuh-for-TSC-2022-requirements-guide.pdf>`__, which complements this document. Refer to the guide for more details on how Wazuh helps meet TSC requirements.

Trust Services Criteria (TSC)
------------------------------

The TSC Common Criteria (CC) are AICPA-defined control criteria for the SOC 2 Security category and serve as the common baseline for engagements that also address Availability, Processing Integrity, Confidentiality, or Privacy. When one or more of those additional Trust Services Categories are included in scope, the applicable category-specific criteria are evaluated alongside the Common Criteria. The Common Criteria define requirements for controls over the systems and services an entity uses to provide products or services. They address the control environment, communication and information, risk assessment, monitoring activities, control activities, logical and physical access controls, system operations, change management, and risk mitigation.

These common criteria address the logical and physical protection of information, systems, and networks. They are organized into nine categories, which are:

-  **CC1**: Control environment
-  **CC2**: Communication and Information
-  **CC3**: Risk Assessment
-  **CC4**: Monitoring Activities
-  **CC5**: Control Activities
-  **CC6**: Logical and Physical Access Controls
-  **CC7**: System Operations
-  **CC8**: Change Management
-  **CC9**: Risk Mitigation

COSO Principles and Common Criteria
-------------------------------------

The COSO Internal Control Integrated Framework sets out five components and 17 principles for designing, implementing, and evaluating an effective system of internal control. The AICPA TSC Common Criteria are structured around these COSO components and principles and apply them to controls over the systems and services used to meet trust services objectives.

Although the COSO framework and the Trust Services Criteria (TSC) are closely related, they serve different purposes. COSO focuses on an entity's overall internal control system, while the TSC Common Criteria apply those internal control concepts to the systems and services used to achieve objectives related to security, availability, processing integrity, confidentiality, and privacy. The TSC Common Criteria incorporate the 17 principles of the COSO framework and extend them with criteria specific to these trust services objectives.

To view the TSC-related data on the Wazuh dashboard:

#. Navigate to **Regulatory Compliance** from the Wazuh **Overview** dashboard and click on **TSC**.

   .. thumbnail:: /images/compliance/tsc/wazuh-overview-tsc-card.png
      :title: Wazuh Overview dashboard
      :alt: Wazuh Overview dashboard
      :align: center
      :width: 80%

   The **Dashboard** below shows an overview of TSC matched requirements within your environment. It also shows information about the TSC requirements for the top 10 agents, top requirements over time, and the most recent TSC events.

   .. thumbnail:: /images/compliance/tsc/tsc-dashboard-tab.png
      :title: TSC Dashboard tab
      :alt: TSC Dashboard tab
      :align: center
      :width: 80%

#. Switch to the **Controls** tab to view the **TSC** requirements breakdown.

   .. thumbnail:: /images/compliance/tsc/tsc-controls-tab.png
      :title: TSC Controls tab
      :alt: TSC Controls tab
      :align: center
      :width: 80%

#. Switch to the **Findings** tab to view the findings related to the **TSC** requirements. This shows TSC findings generated within your environment regardless of the log source.

   .. thumbnail:: /images/compliance/tsc/tsc-findings-tab.png
      :title: TSC Findings tab
      :alt: TSC Findings tab
      :align: center
      :width: 80%

Wazuh has standard policies that include decoders, KVDBs, and rules that detect attacks, system errors, security misconfigurations, and policy violations. By default, the rules within these policies map to the associated TSC requirements. In Wazuh 5.0, :doc:`rules </user-manual/data-analysis/rules>` use the Sigma format. You can map a custom rule to one or more TSC requirements. To do this, add the requirement to the ``tsc`` list under the ``compliance`` field of the rule. For example:

.. code-block:: yaml

   compliance:
     tsc:
       - CC6.8
       - CC7.1
       - CC7.2
       - CC7.3

You can find examples of technical requirements that Wazuh supports in the following sections:

.. toctree::
   :maxdepth: 1

   common-criteria/cc2.1
   common-criteria/cc3.1
   common-criteria/cc5.1
   common-criteria/cc6.1
   common-criteria/cc7.1
   common-criteria/cc8.1
   additional-criteria/additional-criteria
