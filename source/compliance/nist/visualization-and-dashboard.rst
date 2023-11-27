.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh offers a web dashboard for continuous data visualization and analysis. Learn more about it in this section of the documentation.

Visualization and dashboard
===========================

Wazuh offers a web dashboard for continuous data visualization and analysis. The Wazuh dashboard comes with out-of-the-box modules for: threat hunting, regulatory compliance, detected vulnerable applications, file integrity monitoring, configuration assessment results, and cloud infrastructure monitoring. It helps perform forensic and historical alert analyses.

The :doc:`Wazuh dashboard </getting-started/components/wazuh-dashboard>` assists in meeting the following NIST 800-53 controls:

- **AU-6 Audit record review, analysis, and reporting**: *“Audit record review, analysis, and reporting covers information security and privacy-related logging performed by organizations, including logging that results from the monitoring of account usage, remote access, wireless connectivity, mobile device connection, configuration settings, system component inventory, use of maintenance tools and non-local maintenance, physical access, temperature and humidity, equipment delivery and removal, communications at system interfaces, and use of mobile code or Voice over Internet Protocol (VoIP). Findings can be reported to organizational entities that include the incident response team, help desk, and security or privacy offices. If organizations are prohibited from reviewing and analyzing audit records or unable to conduct such activities, the review or analysis may be carried out by other organizations granted such authority. The frequency, scope, and/or depth of the audit record review, analysis, and reporting may be adjusted to meet organizational needs based on new information received.”*

- **CA-7 Continuous monitoring**: *“Continuous monitoring at the system level facilitates ongoing awareness of the system security and privacy posture to support organizational risk management decisions. The terms continuous and ongoing imply that organizations assess and monitor their controls and risks at a frequency sufficient to support risk-based decisions. Different types of controls may require different monitoring frequencies. The results of continuous monitoring generate risk response actions by organizations. When monitoring the effectiveness of multiple controls that have been grouped into capabilities, a root-cause analysis may be needed to determine the specific control that has failed. Continuous monitoring programs allow organizations to maintain the authorizations of systems and common controls in highly dynamic environments of operation with changing mission and business needs, threats, vulnerabilities, and technologies. Having access to security and privacy information on a continuing basis through reports and dashboards gives organizational officials the ability to make effective and timely risk management decisions, including ongoing authorization decisions.”*

The Wazuh dashboard module provides dashboards for continuously monitoring and reviewing security incidents and generating reports of security and audit events. The Wazuh dashboard and its NIST 800-53 module help you meet the above NIST 800-53 controls.

Use cases
---------

Generate a report of successful authentications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how Wazuh helps meet the **CA-7 Continuous monitoring** NIST requirement by providing security reporting to administrators. Use the Wazuh dashboard to generate a report of all successful authentications in the last 24 hours:

#. Go to the Wazuh dashboard menu and select **Discover** under **Explore**.

   .. thumbnail:: /images/compliance/nist/select-discover.png    
      :title: Select Discover
      :alt: Select Discover
      :align: center
      :width: 80%


#. Add a filter for the ``authentication_success`` rule group and click **Save**.

   .. thumbnail:: /images/compliance/nist/add-a-filter.png    
      :title: Add a filter
      :alt: Add a filter
      :align: center
      :width: 80%


#. Save the results of the search using any name of your choice.

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


#. Select **Reporting**, then choose **Generate CSV**. This downloads a report of all successful authentication events as a CSV file for your review.

   .. thumbnail:: /images/compliance/nist/select-reporting.png    
      :title: Select Reporting
      :alt: Select Reporting
      :align: center
      :width: 80%


Review NIST 800-53 alerts
^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, Wazuh assists security administrators in meeting the **AU-6 Audit record review, analysis, and reporting** requirement by providing a NIST 800-53 compliance dashboard.

#. Select the **NIST 800-53** module from your Wazuh dashboard.

   .. thumbnail:: /images/compliance/nist/select-nist-800-53-moduleg.png    
      :title: Select the NIST 800-53 module
      :alt: Select the NIST 800-53 module
      :align: center
      :width: 80%


#. Select the **Events** tab to see all alerts related to NIST 800-53 controls.

   .. thumbnail:: /images/compliance/nist/select-the-events-tab.png    
      :title: Select the Events tab
      :alt: Select the Events tab
      :align: center
      :width: 80%


#. Select the **Controls** tab to view available control requirements. 

   The **Controls** section of the NIST 800-53 compliance dashboard shows the various NIST 800-53 controls and the related events. For ease of navigation, the Wazuh dashboard groups events according to the NIST 800-53 control they meet or violate.

   .. thumbnail:: /images/compliance/nist/select-the-controls-tab.png    
      :title: Select the Controls tab
      :alt: Select the Controls tab
      :align: center
      :width: 80%

   .. thumbnail:: /images/compliance/nist/recent-events.png    
      :title: Recent events
      :alt: Recent events
      :align: center
      :width: 80%