.. Copyright (C) 2018 Wazuh, Inc.

.. _verifying_configuration:

Verifying configuration
========================

+--------------------------------------+----------------------------------------+
| Configuration section                | command                                |
+======================================+========================================+
| Syscheck/Rootcheck                   | /var/ossec/bin/ossec-syscheckd -t      |
+--------------------------------------+----------------------------------------+
| local files                          | /var/ossec/bin/ossec-logcollector -t   |
+--------------------------------------+----------------------------------------+
| Wodles                               | /var/ossec/bin/wazuh-modulesd -t       |
+--------------------------------------+----------------------------------------+
| global/rules/decoders (manager only) | /var/ossec/bin/ossec-analysisd -t      |
+--------------------------------------+----------------------------------------+
| Client (agent only)                  | /var/ossec/bin/ossec-agentd -t         |
+--------------------------------------+----------------------------------------+
