.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section to learn more about how to use Wazuh for GDPR III (The General Data Protection Regulation of the European Union).

GDPR III, Rights of the data subject
======================================

In this chapter, the GDPR sets out individuals' rights regarding the management of their personal data by third parties.

Chapter III, Article 18, Head 2
---------------------------------

**Right to restriction of processing, Head 2**: *“Where processing has been restricted under paragraph 1, such personal data shall, with the exception of storage, only be processed with the data subject's consent or for the establishment, exercise or defence of legal claims or for the protection of the rights of another natural or legal person or for reasons of important public interest of the Union or of a Member State.”*

This article requires that when an individual requests a temporary restriction on processing their personal data, no one accesses that data without explicit consent.

With the FIM module and the Wazuh dashboard, you can perform searches to confirm that no user data is modified or deleted during the specified restriction period.

Use case: Search for FIM events within a certain time frame
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Click the menu icon, then navigate to **Threat intelligence** > **Threat Hunting** and switch to the **Findings** tab. Confirm that no modification or deletion of restricted data occurred during a specific time interval. The **GDPR** dashboard also shows this information.

.. thumbnail:: /images/compliance/gdpr/syscheck-no-alerts.png
   :title: File modification finding visualization within specific time frame
   :alt: GDPR Findings tab showing the file modification finding within a specific time range
   :align: center
   :width: 80%

You can see a finding from an earlier use case.
