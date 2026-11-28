.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh AI Analyst writes a weekly AI report on the security posture of your Wazuh Cloud environment. Learn how to enable and download the reports.

AI Analyst
==========

The Wazuh AI Analyst writes a weekly report on what your Wazuh Cloud environment saw, with insights into your security posture and recommendations to remediate the threats it detected. This page explains what the reports contain and how to enable, find, and download them in Wazuh Console.

The AI Analyst provides:

-  Automated security analysis without manual work.
-  Insights aggregated from alerts, vulnerabilities, and endpoint activity.
-  Structured recommendations to improve your security posture.
-  A fresh assessment every week.

AI reports are available for paid environments. They aren't available for trials. They start once a trial becomes a paid environment.

Enabling and disabling AI reports
---------------------------------

AI reports are enabled by default. You need the Editor role to enable or disable them.

To stop receiving reports:

#. In the sidebar, under **Wazuh Cloud**, select **Environments** and open the details page of the environment.
#. Click **Manage** and select **Disable AI Report**.

The reports already issued stay available.

To receive reports again, click **Manage** and select **Enable AI Report**. Reports are generated weekly, so the next report can take up to a week to appear.

Finding and downloading reports
-------------------------------

The **AI Reports** card on the :doc:`environment details </cloud-service/your-environment/environment-details>` page shows the five most recent reports. For each report, it shows the **Report name**, **Start period**, and **End period**.

-  Click the download icon of a report to download it as a PDF file.
-  Click **See more** to open the **Cloud Environment AI Reports** page with every report of the environment.

The card also shows a message when there are no reports to list, for example when AI reports are disabled, when the environment is a trial, or when no report has been issued yet. After an environment is terminated, it issues no more reports, but the reports it already produced stay listed.

AI Analyst email
----------------

When a report is issued, the organization members who are subscribed to AI report notifications receive an email with key indicators and a summary of your security posture. To choose the notifications you receive, see :doc:`User settings </cloud-service/account-billing/user-settings>`. The email includes:

-  A histogram of the number of protected endpoints.
-  The volume of alerts received by the Wazuh server.
-  The number of active vulnerabilities.
-  A summary of the security posture.
-  The AI report attached as a PDF file.

AI report content
-----------------

The report contains AI-generated insights based on the data of your environment, in the following sections.

Overall assessment
^^^^^^^^^^^^^^^^^^

A summary of the security posture of your organization during the reporting period.

Alert analysis
^^^^^^^^^^^^^^

Wazuh evaluates the log data collected across your monitored infrastructure against its security rules, each with a criticality level. This section analyzes the alerts by MITRE ATT&CK technique and alert level, and summarizes the recommended actions.

Vulnerability analysis
^^^^^^^^^^^^^^^^^^^^^^

An analysis of the software vulnerabilities detected on your endpoints. Attackers commonly exploit vulnerable applications to compromise endpoints and gain a persistent presence on a network.

Endpoint analysis
^^^^^^^^^^^^^^^^^

The ten most active endpoints by alert volume, to help you identify the areas with the most security activity.

Data privacy and security FAQ
-----------------------------

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Is data from Wazuh Cloud environments shared with third parties?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

No. Your data is processed by AWS Bedrock and Anthropic's Claude model only within the AI pipeline and isn't shared beyond that scope. Both providers follow strict data protection policies that prevent sharing customer data with external parties.

Is data used to train AI models?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

No. Customer data isn't used for model training or improvement, as stated in Anthropic's terms of service under AWS Bedrock. Your data is used only to generate your security analysis reports and isn't retained or used for any other purpose.

Can data leak to third parties?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The service uses several layers of security to prevent data leaks:

-  Encrypted data transmission.
-  Enterprise-grade security controls in AWS Bedrock.
-  Isolated processing environments for Claude.
-  No permanent data storage during processing.
-  Access restricted to authorized Wazuh service components.

How should I use the recommendations in the AI report?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Treat AI-generated recommendations as advisory. You are responsible for:

-  Reviewing and validating all AI-generated recommendations.
-  Acting according to your internal security policies and risk assessments.
-  Consulting security professionals when necessary.

The service is subject to the limitations and disclaimers in the `AWS service terms (Section 50) <https://aws.amazon.com/service-terms/>`__ and `Anthropic's commercial terms of service <https://www-cdn.anthropic.com/6b68a6508f0210c5fe08f0199caa05c4ee6fb4dc/Anthropic-on-Bedrock-Commercial-Terms-of-Service_Dec_2023.pdf>`__.

Service operations FAQ
----------------------

.. contents::
   :local:
   :depth: 1
   :backlinks: none

How often are reports generated?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once a week, while AI reports are enabled for the environment.

Can I customize the analysis parameters?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

No. The service uses predefined parameters designed for a comprehensive security assessment.

What happens if the AI service is unavailable?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Report generation pauses during the outage and resumes automatically when the service is restored.

What data is included in the analysis?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The analysis includes:

-  Security alerts and their MITRE ATT&CK mappings.
-  Vulnerability detection results.
-  High-priority rule matches.
-  Endpoint activity patterns.
-  Operating system and package vulnerability data.

Can I opt out of the AI Analyst?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Yes. Click **Manage** on the environment details page and select **Disable AI Report**.
