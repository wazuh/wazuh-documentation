.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: You can generate two types of reports from the Wazuh dashboard. Learn more about it in this section of the Wazuh documentation.

Generating system inventory reports
===================================

You can generate two types of reports from the Wazuh dashboard. These reports are the IT Hygiene report and the property-specific report.

IT Hygiene report
-----------------

You can export a summary of the properties collected by the Wazuh Syscollector module for a specific endpoint or all monitored endpoints. The report is generated in PDF format. To download the IT Hygiene report:

-  To report on one endpoint, first click **Explore agent** and select the endpoint. Then click **Generate Report** in the **Dashboard** section of the **IT Hygiene** page.

   .. thumbnail:: /images/manual/system-inventory/generate-report.png
      :title: IT Hygiene report
      :alt: IT Hygiene report
      :align: center
      :width: 80%

-  The report downloads automatically when the generation completes. You can also generate the report again later from **Explore** > **Reporting** on the Wazuh dashboard. Wazuh keeps a record of generated reports in this section, and the **Generate** action creates a new report with current data.

   .. thumbnail:: /images/manual/system-inventory/generate-saved-reports.png
      :title: Generate saved reports
      :alt: Generate saved reports
      :align: center
      :width: 80%

Property-specific report
------------------------

You can export ``CSV`` reports of a specific property of an endpoint. For example, you can generate a report of the installed software on an endpoint. The report is available in every IT Hygiene category.

To download this report, click **Export Formatted** on the **IT Hygiene** page for the specific property you are interested in. In the image below, we download the software inventory data for all monitored endpoints.

.. thumbnail:: /images/manual/system-inventory/export-formatted.png
   :title: Property-specific report
   :alt: Property-specific report
   :align: center
   :width: 80%

To streamline the report to a specific endpoint, click **Explore agent** and select an endpoint. In the image below, we download the software inventory data for a Windows Server 2022 endpoint.

.. thumbnail:: /images/manual/system-inventory/explore-agent.png
   :title: Export Formatted - Explore agent
   :alt: Export Formatted - Explore agent
   :align: center
   :width: 80%
