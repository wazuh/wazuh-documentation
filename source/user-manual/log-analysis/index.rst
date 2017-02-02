.. _manual_log_analysis:

Log analysis
================

Introduction
----------------

Wazuh agents read operating system logs and events, forwarding them to a central manager for analysis and storage. The purpose of this process is the identification of application or system errors, misconfigurations, intrusion attempts, policy violations or security issues.

.. note::
    Logs are monitored in real time.

Log analysis engine takes a log message and:

- Extract important fields
- Identify & evaluate the content
- Categorize it by matching specific rules
- Generate an alert for the log message.


.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        log_flow
        log_retention
        references
