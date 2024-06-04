.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh server can collect logs via syslog from endpoints such as firewalls, switches and routers. Check out this section of the documentation to learn more.

Journald log collection
=======================

Journald is a system service that offers a modern approach to system logging. It provides powerful tools for managing and analyzing log data on Linux endpoints. Journald replaces traditional syslog daemons and provides a centralized and structured approach to logging. 

Wazuh :doc:`Logcollector <how-it-works>` capability collects logs from sources such as kernel messages, applications, and system services using the journald service. This enables the Wazuh :doc:`agentd </user-manual/reference/daemons/wazuh-agentd>` daemon to forward the collected logs to the Wazuh server. 

In this document, we cover the basic configuration needed to forward logs from the journald service to the Wazuh server. Additionally, we show real world use cases that demonstrate the value of journald log collection.

.. contents:: Content
   :local:
   :depth: 1
   :backlinks: none

How this works
--------------