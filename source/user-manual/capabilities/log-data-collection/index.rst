.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh collects logs from monitored endpoints, applications, and network devices. Dive into the Log data collection capability: how it works, how to configure it, use cases, and more in this documentation section.
  
.. _manual_log_analysis:

Log data collection
===================

Log data collection involves gathering and consolidating logs from different log sources within a network. Log data collection helps security teams to meet regulatory compliance, detect and remediate threats, and identify application errors and other security issues.

Wazuh collects, analyzes, and stores logs from endpoints, network devices, and applications. The Wazuh agent, running on a monitored endpoint, collects and forwards system and application logs to the Wazuh server for analysis. Additionally, you can send log messages to the Wazuh server via syslog, or third-party API integrations.


.. topic:: Contents

   .. toctree::
      :maxdepth: 2

      how-it-works
      monitoring-log-files
      syslog
      journald
      multiple-socket-outputs
      configuration
      log-data-analysis
      use-cases
