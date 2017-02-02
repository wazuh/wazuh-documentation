.. _log_retention:

Log Retention Time
===============================

By default, Wazuh will generate alerts on events that are important. Most of the events that came from the log messages are just informational and they will not be stored.

The log retention time is configurable by the user. This means that the individual entity, being a corporation or financial institution, needs to define its own log retention policy due to their legal and regulatory needs.

To store all the alerts, you need to enable the ``<log_all>`` option. The logs indefinitely until they are deleted manually. Wazuh uses log-rotation and stores the archived logs in ``/var/ossec/logs/archives/`` and creates an individual directory for each year and month.


This is a requirement for:

- PCI DSS Compliance
- HIPAA Compliance
- FISMA Compliance
- SOX Compliance
