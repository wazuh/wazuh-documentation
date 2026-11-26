.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh helps organizations meet technical compliance requirements. Learn how to use Wazuh for TSC compliance.

Using Wazuh for TSC compliance
==============================

SOC 2 reports use the AICPA Trust Services Criteria (TSC) to evaluate controls for security, availability, processing integrity, confidentiality, and privacy. Wazuh maps its default rules to TSC criteria and shows the matching findings on the **Regulatory Compliance** > **TSC** dashboard. The use cases below cover selected Common Criteria (CC) and the A1.1 availability criterion, and the `Using Wazuh for TSC (2022 revision) requirements guide <https://documentation.wazuh.com/resources/using-wazuh-for-TSC-2022-requirements-guide.pdf>`__ covers the rest.

.. note::

   These rules and control mappings are indicative and do not by themselves certify compliance. See :doc:`Regulatory compliance </compliance/index>` for more details.

To view the TSC-related data on the Wazuh dashboard:

#. Open the menu (**☰**) and go to **Security operations** > **Regulatory Compliance**, then click **TSC**.

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

To create a custom rule and put it into production, see :ref:`Create a custom rule <data_analysis_create_custom_rule>`.

You can find examples of technical requirements that Wazuh supports in the following sections:

.. toctree::
   :maxdepth: 1

   common-criteria/cc5.1
   common-criteria/cc6.1
   common-criteria/cc6.8
   common-criteria/cc7.1
   common-criteria/cc7.2
   common-criteria/cc8.1
   additional-criteria/a1.1
