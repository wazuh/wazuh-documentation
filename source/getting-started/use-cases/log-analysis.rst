.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: 
  
Log data analysis
=================

Log data analysis is a crucial process that involves examining and extracting valuable insights from log files created by different systems, applications, or devices. These logs contain records of events that provide useful information for troubleshooting, security analysis and monitoring,  and optimizing performance. Log data analysis is an essential practice that contributes to a secure, efficient, and reliable IT ecosystem.

Wazuh collects, analyzes, and stores logs from endpoints, network devices, and applications. The Wazuh agent, running on a monitored endpoint collects and forwards system and application logs to the Wazuh server for analysis. Additionally, you can send log messages to the Wazuh server via syslog or third-party API integrations.

Log data collection
-------------------

Wazuh collects logs from a wide range of sources, enabling comprehensive monitoring of various aspects of your IT environment. You can check our documentation on :doc:`Log data collection </user-manual/capabilities/log-data-collection/index>` to understand better how Wazuh collects and analyzes logs from monitored endpoints. Some of the common log sources supported by Wazuh include:

-  **Operating system logs**: Wazuh collects logs from several operating systems, including :ref:`Linux <how-to-collect-linuxlogs>`, :ref:`Windows <how-to-collect-windowslogs>`, and :ref:`macOS <how-to-collect-macoslogs>`. Wazuh can collect syslog, auditd, application logs, and others from Linux endpoints. Wazuh collects logs on Windows endpoints using the Windows event channel and Windows event log format. By default, the Wazuh agent monitors the System, Application, and Security Windows event channels on Windows endpoints. The Wazuh agent offers the flexibility to configure and monitor other :ref:`Windows event channels <windows_event_channel_log_collection>`. Wazuh utilizes the unified logging system (ULS) to collect logs on macOS endpoints. The macOS ULS centralizes the management and storage of logs across all the system levels.

   The image below shows an event collected from the ``Microsoft-Windows-Sysmon/Operational`` event channel on a Windows endpoint.

   .. thumbnail:: /images/getting-started/use-cases/log-data-analysis/sysmon-operational-event-channel-alert.png
      :title: Sysmon operational Event channel alert
      :alt: Sysmon operational Event channel alert
      :align: center
      :width: 80%

-  **Syslog events**: Wazuh gathers logs from :doc:`syslog-enabled </user-manual/capabilities/log-data-collection/how-it-works>` devices, encompassing a wide array of sources including Linux/Unix systems and network devices that do not support agent installation. The image below shows an alert triggered when a new user is created on the Linux endpoint and the log is forwarded to the Wazuh server via rsyslog.

   .. thumbnail:: /images/getting-started/use-cases/log-data-analysis/new-user-added-alert.png
      :title: New user added to the system alert
      :alt: New user added to the system alert
      :align: center
      :width: 80%

-  