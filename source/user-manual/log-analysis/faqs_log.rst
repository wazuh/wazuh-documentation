.. _faqs_log:

FAQs
===============================

1. `Are the logs analyzed on each server?`_
2. `How often the manager monitor the logs?`_
3. `How long are the logs stored on the server?`_
4. `How this help me with the compliance regulations?`_
5. `Which is the CPU usage on the servers?`_
6. `Where can Wazuh read the messages?`_

``Are the logs analyzed on each server?``
---------------------------------------------------------

No, the manager gets the logs from all the servers and then analyze the messages.

``How often the manager monitor the logs?``
---------------------------------------------------------
Manager monitorize the log in real time.

``How long are the logs stored on the server?``
---------------------------------------------------------

The log retention time is configurable by the user. This means that the individual entity, being a corporation or financial institution, needs to define its own log retention policy due to their legal and regulatory needs.

``How this help me with the compliance regulations?``
---------------------------------------------------------

Log Analysis is a requirement for : :ref:`PCI DSS Compliance <pci_dss_log_analysis>`,  HIPAA Compliance, FISMA Compliance and SOX Compliance.

``Which is the CPU usage on the servers?``
---------------------------------------------------------

The memory and CPU usage of the agent is insignificant because it only forwards events to the manager, however on the master CPU and memory consumption can increase quickly depending on the events per second (EPS) that the master has to analyze.

``Where can Wazuh read the messages?``
---------------------------------------------------------

Wazuh can read logs messages from: Log files, Windows event log or receive them by remote syslog, forwarding them to a central manager for analysis and storage. Logs are monitored in real time.
