.. Copyright (C) 2021 Wazuh, Inc.

.. _verifying_configuration:

Verifying configuration
========================

+--------------------------------------+----------------------------------------+
| Configuration section                | command                                |
+======================================+========================================+
| Wodles                               | /var/ossec/bin/wazuh-modulesd -t       |
+--------------------------------------+----------------------------------------+
| global/rules/decoders (manager only) | /var/ossec/bin/wazuh-analysisd -t      |
+--------------------------------------+----------------------------------------+
| Client (agent only)                  | /var/ossec/bin/wazuh-agentd -t         |
+--------------------------------------+----------------------------------------+
