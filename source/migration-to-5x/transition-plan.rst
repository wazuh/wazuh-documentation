.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Review the supported migration scenarios, known limitations, and prerequisites before migrating from an existing Wazuh 4.x deployment to Wazuh 5.x.

Migration planning
===================

Before migrating to Wazuh 5.x, review the supported migration scenarios, limitations, and prerequisites. This helps you determine which components and data you can migrate or recreate and prepare the Wazuh 5.x environment for the migration. Keep the existing Wazuh 4.x environment running until you complete and validate the migration to Wazuh 5.x.

Supported migration
--------------------

The following table summarizes the Wazuh data and configurations that you can migrate or recreate when migrating from Wazuh 4.x to Wazuh 5.x.

.. |wazuh_indexer_configuration_ref| replace:: :ref:`Wazuh indexer configuration <migration_wazuh_indexer_configuration>`
.. |indexed_data_ref| replace:: :ref:`Indexed data <migration_indexer_data_migration>`
.. |wazuh_manager_configuration_ref| replace:: :ref:`Wazuh manager configuration <migration_wazuh_manager_configuration>`
.. |wazuh_dashboard_configuration_ref| replace:: :ref:`Wazuh dashboard configuration <migration_wazuh_dashboard_configuration>`
.. |security_configuration_ref| replace:: :ref:`Security configuration <migration_wazuh_indexer_security_configuration>`
.. |custom_dashboards_visualizations_ref| replace:: :ref:`Custom dashboards and visualizations <migration_custom_dashboards_and_visualization>`
.. |agent_registration_ref| replace:: :ref:`Agent registration <migration_agent_registration>`
.. |agent_groups_ref| replace:: :ref:`Agent groups <migration_agent_groups>`

+------------------------------------------+--------------------------------------------------------------------------------------------+
| Configuration                            | Notes                                                                                      |
+==========================================+============================================================================================+
| |wazuh_indexer_configuration_ref|        | Recreate the configuration in the Wazuh 5.x deployment.                                    |
+------------------------------------------+--------------------------------------------------------------------------------------------+
| |indexed_data_ref|                       | Migrate the required Wazuh indices using snapshots and a shared snapshot repository.       |
|                                          | Restored indices retain their Wazuh 4.x mappings and are used to access historical data.   |
|                                          | Wazuh 5.x does not write new data to them.                                                 |
+------------------------------------------+--------------------------------------------------------------------------------------------+
| |wazuh_manager_configuration_ref|        | Review and recreate supported configuration settings.                                      |
+------------------------------------------+--------------------------------------------------------------------------------------------+
| |wazuh_dashboard_configuration_ref|      | Review and recreate supported configuration settings.                                      |
+------------------------------------------+--------------------------------------------------------------------------------------------+
| |security_configuration_ref|             | Recreate users, roles, role mappings, and authentication settings.                         |
+------------------------------------------+--------------------------------------------------------------------------------------------+
| |custom_dashboards_visualizations_ref|   | Export from Wazuh 4.x and import into Wazuh 5.x.                                           |
+------------------------------------------+--------------------------------------------------------------------------------------------+
| |agent_registration_ref|                 | Migrate existing Wazuh agent registrations to the Wazuh 5.x manager while preserving their |
|                                          | agent IDs and authentication keys.                                                         |
+------------------------------------------+--------------------------------------------------------------------------------------------+
| |agent_groups_ref|                       | Restore group configuration and reassign agents where required.                            |
+------------------------------------------+--------------------------------------------------------------------------------------------+

Limitations
-----------

Wazuh 5.x introduces architectural and configuration changes that prevent some Wazuh 4.x components from being migrated directly. Review the following limitations before starting the migration:

-  You cannot migrate Wazuh 4.x configuration files to Wazuh 5.x. Review the existing settings and recreate the supported configuration in the corresponding Wazuh 5.x configuration files.

-  You cannot migrate custom Wazuh 4.x rules and decoders in XML format to Wazuh 5.x. Recreate the required detection content using the Wazuh 5.x :ref:`content management <content_management>`.

-  Index data migration is supported from Wazuh 4.4.0 or later. Restored Wazuh 4.x indices retain their original mappings and field structure and remain separate from the indices and data streams created by Wazuh 5.x.

Prerequisites
-------------

Before migrating to Wazuh 5.x, complete the following prerequisites:

#. Deploy a new Wazuh 5.x environment that matches your deployment architecture. Do not reuse or upgrade an existing Wazuh 4.x deployment in place. Refer to the :doc:`Wazuh installation guide </installation-guide/index>` for your deployment.

#. Ensure that the existing deployment runs Wazuh 4.4.0 or later. Index data migration to Wazuh 5.x requires Wazuh 4.4.0 or later due to snapshot compatibility requirements.

#. Verify network connectivity between the Wazuh 4.x and Wazuh 5.x environments. This includes connectivity required to migrate agent registrations and access shared migration resources.

#. Provision a shared server for index data migration. The source Wazuh 4.x and destination Wazuh 5.x indexer clusters must be able to access the shared server used to store the index snapshots. Ensure that the server has sufficient storage capacity for the data you plan to migrate.

#. Back up your existing Wazuh 4.x deployment before starting the migration to preserve the current configuration and data.
