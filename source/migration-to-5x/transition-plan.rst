.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Review the supported migration scenarios, known limitations, and prerequisites before migrating from an existing Wazuh 4.x deployment to Wazuh 5.x.

Migration planning
===================

Before migrating to Wazuh 5.x, review the supported migration scenarios, limitations, and prerequisites. This helps you determine which components and data you can migrate or recreate and prepare the Wazuh 5.x environment for the migration. Keep the existing Wazuh 4.x environment running until you complete and validate the migration to Wazuh 5.x.

.. note::

   This guide covers package-based Wazuh deployments, all-in-one and distributed. A Wazuh 4.x virtual machine (OVA) is an all-in-one installation, so the all-in-one steps apply to it. The steps use package commands and host paths, so they don't apply as written to Docker or Kubernetes deployments of Wazuh 4.x.

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
.. |agent_groups_ref| replace:: :ref:`Agent groups <migration_migrate_agent_registrations>`

+------------------------------------------+--------------------------------------------------------------------------------------------+
| Configuration                            | Notes                                                                                      |
+==========================================+============================================================================================+
| |wazuh_indexer_configuration_ref|        | Recreate the configuration in the Wazuh 5.x deployment.                                    |
+------------------------------------------+--------------------------------------------------------------------------------------------+
| |indexed_data_ref|                       | Restore the required Wazuh 4.x indices using snapshots and a shared snapshot repository.   |
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
|                                          | agent IDs and authentication keys. Only the manual procedure keeps the registration dates  |
|                                          | and the exact group memberships.                                                           |
+------------------------------------------+--------------------------------------------------------------------------------------------+
| |agent_groups_ref|                       | Migrated with the agent registrations, including group configuration and agent             |
|                                          | assignments. The migration tool migrates only the ``agent.conf`` file of each group.       |
+------------------------------------------+--------------------------------------------------------------------------------------------+

Limitations
-----------

Wazuh 5.x introduces architectural and configuration changes that prevent some Wazuh 4.x components from being migrated directly. Review the following limitations before starting the migration:

-  You cannot migrate Wazuh 4.x configuration files to Wazuh 5.x. Review the existing settings and recreate the supported configuration in the corresponding Wazuh 5.x configuration files.

-  You cannot migrate custom Wazuh 4.x rules and decoders in XML format to Wazuh 5.x. Recreate the required detection content using the Wazuh 5.x :ref:`content management <content_management>`.

-  Index data migration is supported from Wazuh 4.4.0 or later. Indices created before Wazuh 4.4.0 can't be restored, even if the deployment was later upgraded. Restored Wazuh 4.x indices retain their original mappings and field structure and remain separate from the indices and data streams created by Wazuh 5.x.

-  The Wazuh 5.x manager doesn't monitor its own host as agent 000, as Wazuh 4.x did. To keep collecting the Wazuh manager host's logs, inventory, SCA, and FIM data, install a Wazuh agent on the Wazuh manager host. Enroll it with a token for the host's own address. Install it after you migrate the agent registrations, so that its agent ID doesn't conflict with a migrated agent.

-  Wazuh 5.x doesn't support frequency or threshold rules. Each matching event produces its own finding. Repeated events, such as a burst of failed SSH logins, don't escalate to a higher-level finding as rules 5712 and 5763 did in Wazuh 4.x. Correlation across events is planned for a later minor release.

-  Wazuh 4.x agents can connect to a Wazuh 5.x manager, but they send only log events and findings. They do not send FIM, SCA, system inventory, or vulnerability detection data. As a result, their data does not appear in the corresponding dashboards until you upgrade the agents to Wazuh 5.x. Plan the agent upgrade as part of the migration.

-  A Wazuh 5.x agent connects to one Wazuh manager address only. If a Wazuh 4.x agent lists several ``<server>`` addresses for failover, the upgraded agent connects only to the last one.

-  You cannot recreate previously generated PDF reports or report branding settings in Wazuh 5.x. Download the Wazuh 4.x reports you need before you retire the Wazuh 4.x deployment.

Prerequisites
-------------

Before migrating to Wazuh 5.x, complete the following prerequisites:

#. Deploy a new Wazuh 5.x environment that matches your deployment architecture. Do not reuse or upgrade an existing Wazuh 4.x deployment in place. Refer to the :doc:`Wazuh installation guide </installation-guide/index>` for your deployment.

#. Ensure that the existing deployment runs Wazuh 4.4.0 or later. Index data migration to Wazuh 5.x requires Wazuh 4.4.0 or later due to snapshot compatibility requirements. If the deployment was upgraded from an earlier version, indices created before the upgrade to Wazuh 4.4.0 can't be restored.

#. Verify network connectivity between the Wazuh 4.x and Wazuh 5.x environments. This includes connectivity required to migrate agent registrations and access shared migration resources.

#. Provision a shared server for index data migration. The source Wazuh 4.x and destination Wazuh 5.x indexer clusters must be able to access the shared server used to store the index snapshots. Ensure that the server has sufficient storage capacity for the data you plan to migrate.

#. Back up your existing Wazuh 4.x deployment before starting the migration to preserve the current configuration and data.

#. Plan to stop the Wazuh 4.x manager while exporting agent data, as both agent registration procedures require it to be stopped.

#. Don't enroll any Wazuh agent on the Wazuh 5.x manager, and keep the Wazuh 4.x agents connected to the Wazuh 4.x manager, until you import the agent registrations and verify the import. An agent that enrolls before the import can conflict with a migrated agent ID.

#. If the Wazuh 5.x deployment has several Wazuh manager nodes, set up a load balancer in front of them, or choose the node that each agent must use, before you upgrade any Wazuh agent.
