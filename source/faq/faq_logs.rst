.. Copyright (C) 2019 Wazuh, Inc.

.. _faq_logs:

Logs
====

Where are Wazuh logs stored?
------------------------------
Wazuh does not store the logs sent to it by default. If a log does not trigger an alert it is discarded, and logs that do trigger alerts are stored with the alerts in /var/ossec/logs/alerts

The <log-all> option can be enabled in the <global> section (see: ossec.conf: Global options) of the manager’s ossec.conf. The Wazuh manager processes should be restarted. The raw logs will then be saved to files, organized by date, in /var/ossec/logs/archives.


Can wazuh ingest syslogs? How is that different from rsyslog or syslog-ng?
---------------------------------------------------------------------------

Wazuh can ingest syslogs from remoted devices configuring the log data collection module properly.

For more information: https://documentation.wazuh.com/3.x/user-manual/capabilities/log-data-collection/how-it-works.html#remote-syslog

Wazuh also could be used with rsyslog or syslog-ng just by installing one of them and configure Wazuh to analize the logs received by the module. What is the difference between using rsyslog/syslog-ng or use the Wazuh log collector remote module?
The Wazuh log collector remote module does not require additional installation but it is so much simple than, for example rsyslog. Nevertheless, due to all the capabilities of Wazuh itself, I would say that any need covered by rsyslog would be covered by Wazuh himself. Either way, you could use rsyslog or syslog-ng along with Wazuh without any problem.

Does the Wazuh agent have capabilities to fetch application logs in server?
----------------------------------------------------------------------------

A new <localfile> section is needed within your agent ossec.conf file.
Once you have pointed this localfile to the file where the logs are stored the agent will start to collect the events from the file.
These events will be sent to the manager and they will become an alert if they trigger a rule with a higher rule.level than the <log_alert_level> specified in your manager ossec.conf file.
