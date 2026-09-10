.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh helps organizations meet HIPAA compliance requirements. Learn how Wazuh capabilities support each HIPAA technical requirement.

.. _hipaa:

Using Wazuh for HIPAA compliance
=================================

The Health Insurance Portability and Accountability Act (HIPAA) establishes standards to protect health information and improve healthcare efficiency. Technology can impact healthcare data privacy and security, so HIPAA creates federal protections for individually identifiable health information held by covered entities and business associates. Part 164, Subpart C (Security Standards for the Protection of Electronic Protected Health Information), provides standards for transmitting, handling, storing, and safeguarding electronic protected health information.

Wazuh supports HIPAA compliance by performing log data analysis, configuration assessment, malware detection, file integrity monitoring, vulnerability detection, and active response. Follow these steps to view the HIPAA-related data on the Wazuh dashboard:

#. Navigate to **Regulatory Compliance** from the Wazuh **Overview** dashboard, then click **HIPAA**.

   .. thumbnail:: /images/compliance/hipaa/hipaa-overview-card.png
      :title: Wazuh Overview dashboard - Regulatory Compliance
      :alt: Wazuh Overview dashboard - Regulatory Compliance
      :align: center
      :width: 80%

#. Click **Dashboard** to view requirement volume by agent, top requirements, active agents, and how HIPAA requirements change over time.

   .. thumbnail:: /images/compliance/hipaa/hipaa-dashboard-tab.png
      :title: HIPAA Dashboard tab
      :alt: HIPAA Dashboard tab
      :align: center
      :width: 80%

#. Switch to the **Controls** tab to view the HIPAA requirements breakdown.

   .. thumbnail:: /images/compliance/hipaa/hipaa-controls-tab.png
      :title: HIPAA Controls tab
      :alt: HIPAA Controls tab
      :align: center
      :width: 80%

#. Switch to the **Findings** tab to see HIPAA findings generated within your environment regardless of the log source.

   .. thumbnail:: /images/compliance/hipaa/hipaa-findings-tab.png
      :title: HIPAA Findings tab
      :alt: HIPAA Findings tab
      :align: center
      :width: 80%

Wazuh has standard policies that include decoders, Key-Value Databases (KVDBs), and rules that detect attacks, system errors, security misconfigurations, and policy violations. By default, these rules map to the associated HIPAA requirements. In Wazuh 5.0, :doc:`rules </user-manual/data-analysis/rules>` use the Sigma format. You can map a custom rule to one or more HIPAA requirements. To do this, add the requirement to the ``hipaa`` list under the ``compliance`` field of the rule. For example:

.. code-block:: yaml

   compliance:
     hipaa:
       - 164.308.a.1.ii.D
       - 164.308.a.3
       - 164.312.d

See the :ref:`compliance <data_analysis_rules_compliance>` section for more information about configuring compliance mappings for Wazuh rules.

The `Wazuh for HIPAA guide (PDF) <https://wazuh.com/resources/Wazuh-for-HIPAA-guide-V2.0.pdf>`__ maps HIPAA compliance requirements to the Wazuh capabilities and modules that help address them. You can find examples of technical requirements that Wazuh supports in the following sections:

.. toctree::
   :maxdepth: 1

   164.308.a.1.ii.a
   164.308.a.5.ii.b
   164.308.a.6.ii
   164.308.a.8
   164.312.a.2.iii
   164.312.b
   164.312.c.2
   164.312.d
