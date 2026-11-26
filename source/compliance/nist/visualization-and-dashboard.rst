.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the Wazuh dashboard provides security analytics and reporting that support NIST 800-53 controls AU-6 and CA-7.

Security analytics and reporting
================================

Wazuh provides security analytics and reporting capabilities through the Wazuh dashboard, a web interface for continuous data visualization and analysis. The Wazuh dashboard comes with out-of-the-box modules for security events, regulatory compliance, detected vulnerable applications, file integrity monitoring, configuration assessment results, and cloud infrastructure monitoring. It helps you perform forensic and historical analysis of findings.

The :doc:`Wazuh dashboard </user-manual/wazuh-dashboard/index>` assists in meeting the following NIST 800-53 controls:

-  **AU-6 Audit record review, analysis, and reporting:** Review and analyze audit records regularly for unusual or suspicious activity, and report the results to the people responsible.

-  **CA-7 Continuous monitoring:** Monitor your security and privacy controls on an ongoing basis, often enough to support timely risk decisions.

The Wazuh dashboard module provides dashboards for continuously monitoring and reviewing security incidents and generating reports of security and audit events. The Wazuh dashboard and its Regulatory Compliance application help you meet the above NIST 800-53 controls.

Use cases
---------

Generate a report of successful authentications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh helps meet the CA-7 Continuous monitoring NIST requirement by providing security reporting to administrators. Use the Wazuh dashboard to generate a report of all successful authentications in the last 30 days:

#. Click the upper-left menu icon (**☰**) and navigate to **Explore** > **Discover**.

   .. thumbnail:: /images/compliance/nist/select-discover.png
      :title: Select Discover
      :alt: Select Discover
      :align: center
      :width: 80%

#. In the search bar, enter the ``event.action:logged-in`` query to find user login events. Set the time to **Last 30 days**, then click **Update**.

   .. thumbnail:: /images/compliance/nist/add-a-filter.png
      :title: Add a query for user login events
      :alt: Add a query for user login events
      :align: center
      :width: 80%

#. Click **Save** in the top menu of **Discover** and save the search with any name of your choice.

   .. thumbnail:: /images/compliance/nist/save-the-results.png
      :title: Save the results
      :alt: Save the results
      :align: center
      :width: 80%

   .. thumbnail:: /images/compliance/nist/save-search.png
      :title: Save search
      :alt: Save search
      :align: center
      :width: 80%

#. Click **Reporting** in the top menu of **Discover**, then click **Generate CSV**. The Wazuh dashboard creates a CSV report of all successful authentication events, and your browser downloads it for your review.

   .. thumbnail:: /images/compliance/nist/select-reporting.png
      :title: Select Reporting
      :alt: Select Reporting
      :align: center
      :width: 80%

Review NIST 800-53 findings
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh helps security administrators meet AU-6 Audit record review, analysis, and reporting by displaying NIST 800-53 compliance findings on the dashboard.

#. Click the upper-left menu icon (**☰**) and go to **Security operations > Regulatory Compliance**, then click the **NIST 800-53** tab.

#. Click the **Dashboard** tab for a top-line overview: top agents, top NIST 800-53 requirements, and requirements over time.

   .. thumbnail:: /images/compliance/nist/nist-800-53-dashboard-tab.png
      :title: NIST 800-53 Dashboard tab
      :alt: NIST 800-53 Dashboard tab
      :align: center
      :width: 80%

#. Click the **Controls** tab to view the NIST 800-53 requirements breakdown.

   .. thumbnail:: /images/compliance/nist/nist-800-53-controls-tab.png
      :title: NIST 800-53 Controls tab
      :alt: NIST 800-53 Controls tab
      :align: center
      :width: 80%

#. Click the **Findings** tab to see the individual findings related to NIST 800-53 requirements, generated within your environment regardless of log source.

   .. thumbnail:: /images/compliance/nist/nist-800-53-findings-tab.png
      :title: NIST 800-53 Findings tab
      :alt: NIST 800-53 Findings tab
      :align: center
      :width: 80%

The **Controls** tab of the Regulatory Compliance page shows multiple NIST 800-53 controls and the related findings. For ease of navigation, the Wazuh dashboard groups findings according to the NIST 800-53 control they meet or violate.
