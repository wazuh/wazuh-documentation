.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh indexer provides its core Wazuh-specific capabilities through a set of plugin modules. Find more information in this section of the documentation.

Wazuh indexer modules
=====================

The Wazuh indexer provides its core Wazuh-specific capabilities through a set of plugin modules. These modules initialize and manage index resources, manage detection content, enforce access control, deliver notifications, and generate reports. Together, they support Wazuh detection, investigation, and operational workflows.

+-------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| Module                                                | Description                                                                                                                                              |
+=======================================================+==========================================================================================================================================================+
| :doc:`Setup module <setup>`                           | Prepares and maintains the storage resources required by the Wazuh indexer, including index templates, data streams, ISM policies, and internal indices. |
+-------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| :doc:`Content Manager module <content-manager>`       | Manages detection content, including content spaces, CTI synchronization, content validation, promotion, and rollback.                                   |
+-------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| :doc:`Reporting module <reporting>`                   | Generates customizable reports from data stored in the Wazuh indexer, with scheduled and on-demand generation and delivery.                              |
+-------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| :doc:`Security Analytics module <security-analytics>` | Evaluates events against Sigma detection rules and generates findings for investigation.                                                                 |
+-------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| :doc:`Notifications module <notifications>`           | Delivers notifications through configurable channels when Wazuh components generate alerts or events.                                                    |
+-------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| :doc:`Alerting module <alerting>`                     | Monitors data for conditions that require attention and triggers notifications and workflows.                                                            |
+-------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+

.. toctree::
   :hidden:
   :maxdepth: 1

   setup
   content-manager
   reporting
   security-analytics
   notifications
   alerting
