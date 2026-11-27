.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps you meet ISO/IEC 27001:2022 Annex A controls with use cases for threat intelligence, incident response, logging, vulnerability management, and more.

Using Wazuh for ISO 27001 compliance
====================================

ISO/IEC 27001 is an international standard that defines the requirements for an information security management system (ISMS).

This document outlines use cases that show how Wazuh helps you meet ISO/IEC 27001:2022 Annex A controls. Each section describes a control, explains how Wazuh supports it, and shows one or more use cases with step-by-step instructions.

.. note::

   These rules and control mappings are indicative and do not by themselves certify compliance. See :doc:`Regulatory compliance </compliance/index>` for more details.

ISO/IEC 27001:2022 Annex A controls
-----------------------------------

Annex A of ISO/IEC 27001:2022 lists 93 information security controls.

The controls are organized into four themes:

-  A.5: Organizational controls (37 controls)
-  A.6: People controls (8 controls)
-  A.7: Physical controls (14 controls)
-  A.8: Technological controls (34 controls)

Wazuh rules map findings to the control identifiers of the 2022 revision.

The Wazuh ISO 27001 dashboard
-----------------------------

To view the ISO 27001 data on the Wazuh dashboard:

#. Open the menu (**☰**), go to **Security operations** > **Regulatory Compliance**, and click the **ISO 27001** tab. The **Dashboard** tab shows an overview of the ISO 27001 requirements in your environment, the top agents, and the requirements over time.

   .. thumbnail:: /images/compliance/iso-27001/dashboard-tab.png
      :title: ISO 27001 Dashboard tab
      :alt: ISO 27001 Dashboard tab
      :align: center
      :width: 80%

#. Switch to the **Controls** tab to see how many findings map to each ISO 27001 requirement in the selected time range. Turn on **Hide requirements with no findings** to list only the requirements that have findings.

   .. thumbnail:: /images/compliance/iso-27001/controls-tab.png
      :title: ISO 27001 Controls tab
      :alt: ISO 27001 Controls tab
      :align: center
      :width: 80%

#. Switch to the **Findings** tab to see the individual findings mapped to ISO 27001 requirements, regardless of their log source. The **Requirements** column shows the requirements of each finding.

   .. thumbnail:: /images/compliance/iso-27001/findings-tab.png
      :title: ISO 27001 Findings tab
      :alt: ISO 27001 Findings tab
      :align: center
      :width: 80%

Mapping custom rules to Annex A controls
----------------------------------------

Wazuh rules and Security Configuration Assessment (SCA) policies map findings to ISO/IEC 27001:2022 Annex A controls. You can also map custom rules to one or more Annex A controls. In Wazuh 5.0, rules use the Sigma format. To map a custom rule to a control, add the control identifier to the ``iso_27001`` list under the ``compliance`` field of the rule. For example:

.. code-block:: yaml

   compliance:
     iso_27001:
       - A.8.15
       - A.8.16

Refer to the :doc:`Rules </user-manual/data-analysis/rules>` section for more information. To create a custom rule and put it into production, see :ref:`Create a custom rule <data_analysis_create_custom_rule>`.

.. toctree::
   :maxdepth: 1

   organizational-controls
   people-controls
   technological-controls
