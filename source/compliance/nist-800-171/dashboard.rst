.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to view NIST 800-171 data on the Wazuh dashboard and how to map custom rules to NIST 800-171 requirements.

The Wazuh NIST 800-171 dashboard
================================

Follow these steps to view the NIST 800-171 data on the Wazuh dashboard:

#. Open the menu (☰), go to **Security operations** > **Regulatory Compliance**, and click the **NIST 800-171** tab. The **Dashboard** tab shows an overview of the NIST 800-171 requirements in your environment, the most active agents, and the requirements over time.

   .. thumbnail:: /images/compliance/nist-800-171/nist-800-171-dashboard-tab.png
      :title: NIST 800-171 Dashboard tab
      :alt: NIST 800-171 Dashboard tab
      :align: center
      :width: 80%

#. Switch to the **Controls** tab to see how many findings map to each NIST 800-171 requirement in the selected time range. Turn on **Hide requirements with no findings** to list only the requirements that have findings.

   .. thumbnail:: /images/compliance/nist-800-171/nist-800-171-controls-tab.png
      :title: NIST 800-171 Controls tab
      :alt: NIST 800-171 Controls tab
      :align: center
      :width: 80%

#. Switch to the **Findings** tab to see the individual findings mapped to NIST 800-171 requirements, regardless of their log source. The **Requirements** column shows the requirements of each finding.

   .. thumbnail:: /images/compliance/nist-800-171/nist-800-171-findings-tab.png
      :title: NIST 800-171 Findings tab
      :alt: NIST 800-171 Findings tab
      :align: center
      :width: 80%

Wazuh rules and Security Configuration Assessment (SCA) policies map findings to NIST 800-171 requirements. You can also map custom rules to one or more requirements. In Wazuh 5.0, rules use the Sigma format. To map a custom rule, add the requirement identifiers to the ``nist_800_171`` list under the ``compliance`` field of the rule. For example:

.. code-block:: yaml

   compliance:
     nist_800_171:
       - 3.1.6
       - 3.3.1
       - 3.14.7

Refer to the :doc:`Rules </user-manual/data-analysis/rules>` section for more information. To create a custom rule and put it into production, see :ref:`Create a custom rule <data_analysis_create_custom_rule>`.
