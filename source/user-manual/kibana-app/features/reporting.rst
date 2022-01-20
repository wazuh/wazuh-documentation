.. Copyright (C) 2022 Wazuh, Inc.

.. _kibana_reporting:

Reporting
=========

When you're navigating through the *Overview* or *Agents* tabs, you can generate a report of the current section when clicking on the printer icon button, on the top right corner in the interface. These reports are stored on the same machine where Kibana is installed, in the ``/usr/share/kibana/wazuh/downloads/reports`` folder. A status message will indicate if the report was generated successfully, or if the process was aborted.

.. thumbnail:: ../../../images/kibana-app/features/reporting/generate-report.png
  :align: center
  :width: 100%

The generated reports are available on *Management > Reporting*. From there, you can list them, refresh the list to scan for new generated reports, download or delete them. The reports are generated and downloaded in PDF format to your computer.

.. thumbnail:: ../../../images/kibana-app/features/reporting/list-reports.png
  :align: center
  :width: 100%

