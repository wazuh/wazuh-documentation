.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to view CMMC data on the Wazuh dashboard and how to map custom Wazuh rules to CMMC requirements.

Wazuh CMMC dashboard
====================

Complete these steps to view the CMMC data on the Wazuh dashboard.

#. Open the menu (☰), go to **Security operations** > **Regulatory Compliance**, and click the **CMMC** tab. The **Dashboard** tab shows an overview of the CMMC requirements in your environment and the most active agents. Scroll down to see the requirements over time.

   .. thumbnail:: /images/compliance/cmmc/cmmc-dashboard-tab.png
      :title: CMMC Dashboard tab
      :alt: CMMC Dashboard tab
      :align: center
      :width: 80%

#. Switch to the **Controls** tab to see how many findings map to each CMMC requirement in the selected time range. Turn on **Hide requirements with no findings** to list only the requirements that have findings.

   .. thumbnail:: /images/compliance/cmmc/cmmc-controls-tab.png
      :title: CMMC Controls tab
      :alt: CMMC Controls tab
      :align: center
      :width: 80%

#. Switch to the **Findings** tab to see the individual findings mapped to CMMC requirements, regardless of their log source. The **Requirements** column shows the requirements of each finding.

   .. thumbnail:: /images/compliance/cmmc/cmmc-findings-tab.png
      :title: CMMC Findings tab
      :alt: CMMC Findings tab
      :align: center
      :width: 80%

Wazuh rules and Security Configuration Assessment (SCA) policies map findings to CMMC requirements. You can also map custom rules to one or more requirements. In Wazuh 5.0, rules use the Sigma format. To map a custom rule, add the requirement identifiers to the ``cmmc`` list under the ``compliance`` field of the rule. For example:

.. code-block:: yaml

   compliance:
     cmmc:
       - AC.L2-3.1.6
       - AU.L2-3.3.1
       - SI.L2-3.14.7

Refer to the :doc:`Rules </user-manual/data-analysis/rules>` section for more information. To create a custom rule and put it into production, see :ref:`Create a custom rule <data_analysis_create_custom_rule>`.
