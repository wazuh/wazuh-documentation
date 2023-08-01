.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Know more about the Wazuh Log Data Collection capability in this section of our documentation: how it works, how to configure it, FAQs, and more. 
  
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
        multiple-socket-outputs
