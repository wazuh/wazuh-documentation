.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: You can generate two types of reports from the Wazuh dashboard. Learn more about it in this section of the Wazuh documentation.

Generating system inventory reports
===================================

You can generate two types of reports from the Wazuh dashboard. These reports are the IT Hygiene report and the property-specific report.

IT Hygiene report
-----------------

This feature allows you to export a summary of the properties collected by the Wazuh Syscollector module for a specific endpoint or all monitored endpoints. This report is generated in PDF format and can serve a variety of uses. To download the IT hygiene report:

-  Click **Generate Report** in the **Dashboard** section of the **IT Hygiene** page.

   .. thumbnail:: /images/manual/system-inventory/generate-report.png
      :title: Generate report
      :alt: Generate report
      :align: center
      :width: 80%

-  When the report is ready, click **Open report** to download it immediately, or go to **Dashboard Management** > **Reporting** to download it later.

Property-specific report
------------------------

This feature allows you to export ``CSV`` reports of a specific property of an endpoint. For example, you can generate a report of the installed software on an endpoint. This kind of report is only available for system, software, processes, and network categories.

To download this report, click **Export Formatted** in the **IT Hygiene** page for the specific property you are interested in. In the image below, we download the software inventory data for all monitored endpoints.

.. thumbnail:: /images/manual/system-inventory/export-formatted.png
   :title: Export formatted
   :alt: Export formatted
   :align: center
   :width: 80%

To streamline the report to a specific endpoint, click **Explore agent** and select an endpoint. In the image below, we download the software inventory data for a Windows 11 endpoint.

.. thumbnail:: /images/manual/system-inventory/explore-agent.png
   :title: Explore agent
   :alt: Explore agent
   :align: center
   :width: 80%
