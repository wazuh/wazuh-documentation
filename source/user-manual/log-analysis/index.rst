.. _manual_log_analysis:

Log analysis
================

.. warning::
	Draft section.

Wazuh agents read operating system logs and events, forwarding them to a central manager for analysis and storage. Logs are monitored in real time. The purpose of this process is the identification of application or system errors, misconfigurations, intrusion attempts, policy violations or security issues.

Log analysis engine takes a log message and:

- Extract important fields
- Identify & evaluate the content
- Categorize it by matching specific rules
- Generate an alert for the log message.


.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        log_flow
        how_to_log
        faqs_log
        log_references
