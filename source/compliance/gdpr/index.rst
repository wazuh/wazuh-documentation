.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section to learn more about how to use Wazuh for GDPR (The General Data Protection Regulation of the European Union).

Using Wazuh for GDPR compliance
===============================

The European Union's General Data Protection Regulation (GDPR) was created to establish a harmonized data privacy framework across Europe. Its primary focus is protecting the data of European Union citizens. The regulation aims to improve user data privacy and reform the way European Union organizations approach data privacy.

Wazuh helps with GDPR compliance by performing log collection, file integrity monitoring, configuration assessment, intrusion detection, and automated threat response. To view the GDPR related data on the Wazuh dashboard:

#. Click the menu icon, then navigate to **Security operations** > **Regulatory Compliance** > **GDPR**.

#. Click **Dashboard** to get an overview such as the top 10 agents, GDPR requirements, and top requirements over time.

   .. thumbnail:: /images/compliance/gdpr/gdpr-dashboard.png
      :title: GDPR Dashboard
      :align: center
      :width: 80%

#. Switch to the **Controls** tab to view the GDPR requirements breakdown.

   .. thumbnail:: /images/compliance/gdpr/gdpr-controls.png
      :title: GDPR Controls
      :align: center
      :width: 80%

#. Switch to the **Findings** tab to view the findings related to the GDPR requirements. This shows GDPR findings generated within your environment regardless of the log source.

   .. thumbnail:: /images/compliance/gdpr/gdpr-findings.png
      :title: GDPR Findings
      :align: center
      :width: 80%

Wazuh includes default rules and decoders that detect attacks, system errors, security misconfigurations, and policy violations. By default, these rules map to the associated GDPR requirements. In Wazuh 5.0, :doc:`rules </user-manual/data-analysis/rules>` use the Sigma format. You can map a custom rule to one or more GDPR requirements. To do this, add the requirement to the ``gdpr`` list under the ``compliance`` field of the rule. For example, ``II_5.1.f``.

.. code-block:: yaml

   compliance:
     gdpr:
       - II_5.1.f
       - IV_32.1.a
       - IV_33.1

The `Wazuh for GDPR white paper (PDF) <https://wazuh.com/resources/Wazuh_GDPR_White_Paper.pdf>`__ explains how Wazuh modules help with GDPR compliance. This document does not cover the formal GDPR requirements, because they fall outside its technical scope.

You can find technical requirements that Wazuh supports in the following sections:

.. toctree::
   :maxdepth: 1

   gdpr-II
   gdpr-III
   gdpr-IV
