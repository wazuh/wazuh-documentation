.. _manual_log_analysis:

Log analysis
================

.. warning::
	Draft section.

Wazuh agents read operating system logs and events, forwarding them to a central manager for analysis and storage. The purpose of this process is the identification of application or system errors, misconfigurations, intrusion attempts, policy violations or security issues.

Log analysis engine takes a log message and:

- Extract important fields
- Identify & evaluate the content
- Categorize it by matching specific rules
- Generate an alert for the log message.

.. note::
    Logs are monitored in real time.

Wazuh can read messages from:

- internal logs
- Windows event log
- receive them by remote syslog.

The memory and CPU usage of the agent is insignificant because it only forwards events to the manager, however on the master CPU and memory consumption can increase quickly depending on the events per second (EPS) that the master has to analyse.



.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        log_flow
        log_retention
        log_references
