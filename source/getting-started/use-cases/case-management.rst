.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh case management tracks the investigation of security findings from detection to resolution, so security teams can triage, prioritize, and document cases on the Wazuh dashboard.

Case management
===============

Case management tracks the investigation of security findings from detection to resolution. It gives security teams a shared record of who reviewed each finding, what they found, and what remains open.

Wazuh stores each case with its finding in the Wazuh indexer, so analysts triage and document findings without leaving the Wazuh dashboard. The :ref:`Case Management <wazuh_dashboard_navigating_the_wazuh_dashboard_case_management>` dashboard is under **Threat intelligence** in the Wazuh dashboard menu.

Opening a case from a finding
-----------------------------

The document details of every finding have a **Case** tab, in dashboards such as **Threat Hunting**, **Malware Detection**, and **File Integrity Monitoring**. From this tab, analysts create a case with a title, a status, and a severity. They can also add a description, a priority, a Traffic Light Protocol (TLP) sharing level, and tags.

.. thumbnail:: /images/getting-started/use-cases/case-management/opening-a-case-from-a-finding.png
   :title: Opening a case from a finding
   :alt: Opening a case from a finding
   :align: center
   :width: 80%

After an analyst saves the case, the **Case** tab of the finding shows the case details and the investigation comments.

.. thumbnail:: /images/getting-started/use-cases/case-management/opening-a-case-from-a-finding-2.png
   :title: Opening a case from a finding
   :alt: Opening a case from a finding
   :align: center
   :width: 80%

Tracking the status of an investigation
---------------------------------------

Each case has a status that reflects the investigation lifecycle. **Active** means the case is open and no one is working on it yet. An analyst changes it to **Acknowledged** while someone works on the investigation, and to **Completed** when no more work is needed. **Audit** keeps a case for review or compliance, and **Error** marks a mistake, such as a false positive. **Deleted** marks a case as removed but keeps it for history.

Wazuh records the user who last updated each case, and when the case was created and last updated. These fields give security teams an audit trail of every investigation.

Documenting investigation findings
----------------------------------

Analysts add comments to a case to record evidence, decisions, and next steps. Analysts can edit or delete their own comments. Tags group related cases, for example by campaign, affected asset, or attack technique.

Prioritizing cases
------------------

Severity and priority help security teams decide which cases to handle first. Severity describes the impact of the case, from informational to critical. Priority sets the triage order, from low to urgent. The TLP level, from TLP:CLEAR to TLP:RED, tells analysts how widely they can share the case information.

The **Cases** tab of the **Case Management** dashboard lists the cases across your environment. Analysts filter the list by status, severity, priority, and user to focus on the cases that need attention.

.. thumbnail:: /images/getting-started/use-cases/case-management/prioritizing-cases.png
   :title: Prioritizing cases
   :alt: Prioritizing cases
   :align: center
   :width: 80%

Reviewing case activity
-----------------------

Security teams need an overview of open and closed investigations to manage their workload. The **Dashboard** tab of the **Case Management** dashboard summarizes case activity across your environment.

.. thumbnail:: /images/getting-started/use-cases/case-management/reviewing-case-activity.png
   :title: Reviewing case activity
   :alt: Reviewing case activity
   :align: center
   :width: 80%
