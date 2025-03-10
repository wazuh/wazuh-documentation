.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: You can generate two types of reports from the Wazuh dashboard. Learn more about it in this section of the Wazuh documentation. 

Generating system inventory reports
===================================

You can generate two types of reports from the Wazuh dashboard. These reports are the property-specific report and the endpoint inventory report. 

Property-specific report
------------------------

This feature allows you to export ``CSV`` reports of a specific property of an endpoint. For example, you can generate a report of the installed software on an endpoint. 

To download this report, click **Export formatted** within the specific property you are interested in on the **Inventory Data** page of the endpoint.

.. thumbnail:: /images/manual/system-inventory/export-formatted.png
  :title: Export formatted
  :alt: Export formatted
  :align: center
  :width: 80%

Endpoint inventory report
-------------------------

This feature allows you to export a full report of all endpoint properties collected by the Wazuh Syscollector module. This report is generated in PDF format and can serve a variety of uses. To download the full endpoint report:

- Click **Generate report** on the **Inventory Data** page of the Wazuh agent.

.. thumbnail:: /images/manual/system-inventory/generate-report.png
  :title: Generate report
  :alt: Generate report
  :align: center
  :width: 80%

- When the report is ready, navigate to **Dashboard management** > **Reporting** and download the report.

.. Note::
   Both report types cover the inventory for only the monitored endpoint of interest.
