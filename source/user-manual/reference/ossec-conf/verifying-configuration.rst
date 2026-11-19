.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out how to verify sections of the Wazuh configuration in this section of the Wazuh documentation.

.. _verifying_configuration:

Verifying configuration
========================

+--------------------------------------+----------------------------------------+
| Configuration section                | command                                |
+======================================+========================================+
| Syscheck/Rootcheck                   | /var/ossec/bin/wazuh-syscheckd -t      |
+--------------------------------------+----------------------------------------+
| local files                          | /var/ossec/bin/wazuh-logcollector -t   |
+--------------------------------------+----------------------------------------+
| Wodles                               | /var/ossec/bin/wazuh-modulesd -t       |
+--------------------------------------+----------------------------------------+
| global/rules/decoders (manager only) | /var/ossec/bin/wazuh-analysisd -t      |
+--------------------------------------+----------------------------------------+
| Client (agent only)                  | /var/ossec/bin/wazuh-agentd -t         |
+--------------------------------------+----------------------------------------+
| remote (manager only)                | /var/ossec/bin/wazuh-remoted -t        |
+--------------------------------------+----------------------------------------+
| auth (manager only)                  | /var/ossec/bin/wazuh-authd -t          |
+--------------------------------------+----------------------------------------+
| active-response                      | /var/ossec/bin/wazuh-execd -t          |
+--------------------------------------+----------------------------------------+
| syslog_output (manager only)         | /var/ossec/bin/wazuh-csyslogd -t       |
+--------------------------------------+----------------------------------------+
| integration (manager only)           | /var/ossec/bin/wazuh-integratord -t    |
+--------------------------------------+----------------------------------------+
| email_alerts (manager only)          | /var/ossec/bin/wazuh-maild -t          |
+--------------------------------------+----------------------------------------+
| agentless (manager only)             | /var/ossec/bin/wazuh-agentlessd -t     |
+--------------------------------------+----------------------------------------+
