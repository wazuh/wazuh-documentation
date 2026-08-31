.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Know the Wazuh daemons that perform different actions between the different components of the Wazuh platform. Learn more about it in this section.

.. _daemons:

Daemons
=======

The Wazuh platform includes several daemons that work together to collect, process, store, and manage security data.

In Wazuh 5.0 and later, the manager binaries are installed under the ``/var/wazuh-manager`` directory and use the ``wazuh-manager-`` prefix. Agent binaries retain the existing installation layout under ``/var/ossec``.

The following sections describe the daemons available for the Wazuh manager and the Wazuh agent.

Wazuh manager daemons
------------------------

The Wazuh manager includes the following daemons:

+------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| Daemon                                                     | Description                                                                                  |
+============================================================+==============================================================================================+
| :doc:`wazuh-manager-analysisd <wazuh-manager-analysisd>`   | Processes, decodes, normalizes, correlates, and enriches events received from agents and     |
|                                                            | other data sources.                                                                          |
+------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wazuh-manager-apid <wazuh-manager-apid>`             | Provides the Wazuh RESTful API for managing the Wazuh platform.                              |
+------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wazuh-manager-authd <wazuh-manager-authd>`           | Handles secure enrollment and authentication of Wazuh agents.                                |
+------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wazuh-manager-clusterd <wazuh-manager-clusterd>`     | Coordinates communication and synchronization between nodes in a Wazuh cluster.              |
+------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wazuh-manager-db <wazuh-manager-db>`                 | Maintains the manager's local databases and provides database services to other manager      |
|                                                            | components.                                                                                  |
+------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wazuh-manager-modulesd <wazuh-manager-modulesd>`     | Executes manager modules such as vulnerability detection and other integrated services.      |
+------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wazuh-manager-monitord <wazuh-manager-monitord>`     | Monitors manager files and performs maintenance tasks such as log rotation and housekeeping. |
+------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wazuh-manager-remoted <wazuh-manager-remoted>`       | Receives events from Wazuh agents and forwards them to the Wazuh manager for processing.     |
+------------------------------------------------------------+----------------------------------------------------------------------------------------------+

Wazuh agent daemons
-----------------------

The Wazuh agent includes the following daemons:

+--------------------------------------------------+----------------------------------------------------------------------------------------------+
| Daemon                                           | Description                                                                                  |
+==================================================+==============================================================================================+
| :doc:`wazuh-agentd <wazuh-agentd>`               | Manages communication between the agent and the Wazuh manager.                               |
+--------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wazuh-execd <wazuh-execd>`                 | Executes active response commands triggered by security events.                              |
+--------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wazuh-logcollector <wazuh-logcollector>`   | Collects logs from configured sources and forwards them for analysis.                        |
+--------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wazuh-modulesd <wazuh-modulesd>`           | Executes agent-side modules and scheduled tasks.                                             |
+--------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wazuh-syscheckd <wazuh-syscheckd>`         | Performs file integrity monitoring (FIM) by monitoring changes to configured files and       |
|                                                  | directories.                                                                                 |
+--------------------------------------------------+----------------------------------------------------------------------------------------------+

.. toctree::
   :hidden:
   :maxdepth: 1

   wazuh-manager-analysisd
   wazuh-manager-apid
   wazuh-manager-authd
   wazuh-manager-clusterd
   wazuh-manager-db
   wazuh-manager-modulesd
   wazuh-manager-monitord
   wazuh-manager-remoted
   wazuh-agentd
   wazuh-execd
   wazuh-logcollector
   wazuh-modulesd
   wazuh-syscheckd
