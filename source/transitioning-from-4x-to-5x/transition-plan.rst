.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Review the supported transition scenarios, known limitations, and prerequisites before deploying Wazuh 5.x from an existing Wazuh 4.x deployment.

Transition plan
===============

Before deploying Wazuh 5.x, review the supported transition scenarios, known limitations, and prerequisites. Understanding these changes before you start helps minimize downtime and supports a successful deployment.

Supported transition
--------------------

The following table summarizes which Wazuh components and configurations you can transition from Wazuh 4.x to Wazuh 5.x.

+--------------------------------------+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| Component                            | Transition support | Notes                                                                                                                      |
+======================================+====================+============================================================================================================================+
| Wazuh indexer configuration          | Supported          | Recreate the configuration in the Wazuh 5.x deployment.                                                                    |
+--------------------------------------+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| Wazuh manager configuration          | Supported          | Review and recreate supported configuration settings.                                                                      |
+--------------------------------------+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| Wazuh dashboard configuration        | Supported          | Review and recreate supported configuration settings.                                                                      |
+--------------------------------------+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| TLS certificates                     | Supported          | Reuse existing certificates if they meet the Wazuh 5.x requirements.                                                       |
+--------------------------------------+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| Security configuration               | Supported          | Recreate users, roles, role mappings, and authentication settings.                                                         |
+--------------------------------------+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| Custom dashboards and visualizations | Supported          | Export from Wazuh 4.x and import into Wazuh 5.x.                                                                           |
+--------------------------------------+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| Agent groups                         | Supported          | Restore group configuration and reassign agents where required.                                                            |
+--------------------------------------+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| Indexed data, indices, and snapshots | Not supported      | Wazuh 5.x cannot restore or reindex Wazuh 4.x data. New index schemas and mappings are incompatible with earlier releases. |
+--------------------------------------+--------------------+----------------------------------------------------------------------------------------------------------------------------+

Limitations
-----------

Wazuh 5.x introduces new index schemas, templates, configuration models, and platform architecture that are incompatible with several Wazuh 4.x components. As a result, you must manually recreate some components, and you cannot transition others. The following limitations apply:

-  Wazuh 5.x cannot transition, restore, or reindex indexed data, indices, or snapshots from Wazuh 4.x.

-  Do not copy configuration files directly from Wazuh 4.x to Wazuh 5.x. Review the existing configuration and recreate the supported settings in the corresponding Wazuh 5.x files.

-  Recreate custom rules, decoders, and other engine-managed content using the Wazuh Engine content management system where applicable.

.. note::

   If historical data must remain accessible, retain the Wazuh 4.x deployment as a separate read-only environment until you no longer need it.

Prerequisites
-------------

Before transitioning to Wazuh 5.x, complete the following prerequisites:

#. Deploy a new Wazuh 5.x environment that matches your deployment architecture. Do not reuse or upgrade an existing Wazuh 4.x deployment in place. Refer to the :doc:`Wazuh installation guide </installation-guide/index>` for your deployment.
