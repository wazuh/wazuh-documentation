.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Recreate the supported Wazuh dashboard configuration, custom dashboards, and visualizations when migrating from Wazuh 4.x to Wazuh 5.x.

Wazuh dashboard
===============

The Wazuh dashboard in Wazuh 5.x introduces changes to its configuration, navigation, reporting, health checks, branding, and support for multi-manager environments. These changes prevent Wazuh dashboard 4.x deployments from being upgraded in place. Migrating to Wazuh dashboard 5.x requires deploying a new dashboard instance and recreating the supported configuration from the existing Wazuh 4.x deployment.

You can recreate the following Wazuh dashboard components in Wazuh 5.x:

-  Dashboard configuration
-  Wazuh manager API connections
-  Custom dashboards
-  Custom visualizations
-  Saved searches
-  Index patterns
-  Advanced Settings
-  Custom application branding

.. note::

   You cannot recreate previously generated PDF reports or report branding settings in Wazuh 5.x.

.. _migration_wazuh_dashboard_configuration:

Wazuh dashboard configuration
-------------------------------

The Wazuh dashboard configuration defines how the dashboard connects to the Wazuh manager, and it configures dashboard behavior, custom branding, health checks, and user preferences.

Review the existing Wazuh 4.x configuration and recreate the supported settings manually in the Wazuh 5.x deployment. Do not copy the Wazuh 4.x ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` configuration directly, because Wazuh 5.x stores dashboard configuration in different locations.

The following configuration locations are commonly reviewed during the migration.

+----------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Location                                           | Purpose                                                                                                                    |
+====================================================+============================================================================================================================+
| ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` | Wazuh manager API connections, branding, health checks, and dashboard configuration                                        |
+----------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------+
| **Dashboard Management** > **Advanced Settings**   | Tenant-specific dashboard settings, including request timeout, enrollment DNS, CSV export limits, and update notifications |
+----------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------+

By default, you manage **Advanced Settings** per tenant through the Wazuh dashboard. You can also configure them globally using ``uiSettings.overrides`` in ``opensearch_dashboards.yml``.

Configuration changes
------------------------

Review the following configuration changes before you recreate the Wazuh dashboard configuration.

+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| Area                            | Wazuh 5.x change                                                                                                              |
+=================================+===============================================================================================================================+
| Configuration file              | ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` is replaced by ``/etc/wazuh-dashboard/opensearch_dashboards.yml``. |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| Wazuh manager API configuration | ``hosts`` is replaced by ``wazuh_core.hosts``.                                                                                |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| Default index pattern           | ``wazuh-alerts-*`` is replaced by the Wazuh 5.x index patterns.                                                               |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| Health checks                   | Individual ``checks.*`` settings are replaced by ``healthcheck.checks_enabled``.                                              |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| Statistics collection           | ``cron.*`` settings are removed.                                                                                              |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| Agent monitoring                | ``wazuh.monitoring.*`` settings are removed.                                                                                  |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| Branding                        | Branding settings are configured through ``opensearchDashboards.branding.*``.                                                 |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| Report branding                 | Report logo, header, and footer customization are no longer supported.                                                        |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------+

Recreate Wazuh dashboard configuration
------------------------------------------

Perform the following steps to recreate the Wazuh dashboard configuration in Wazuh 5.x.

#. Review the Wazuh dashboard 4.x configuration file ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` and identify any settings that differ from the default values.

#. Edit the Wazuh dashboard 5.x configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to recreate the supported Wazuh manager API configuration, using the values from the 4.x deployment:

   .. code-block:: yaml

      wazuh_core.hosts:
        - default:
            url: https://<WAZUH_MANAGER_IP_OR_HOSTNAME>
            port: <PORT>
            username: <USERNAME>
            password: <PASSWORD>
            run_as: true

#. Navigate to **Dashboard Management** > **Advanced Settings** on the Wazuh dashboard to reconfigure advanced settings. Recreate any customized settings from the Wazuh 4.x deployment. Review the following settings:

   +----------------------------+-----------------------------------------------------------+
   | Setting                    | Description                                               |
   +============================+===========================================================+
   | ``timeout``                | Request timeout in milliseconds.                          |
   +----------------------------+-----------------------------------------------------------+
   | ``enrollment.dns``         | Wazuh server DNS name used in the agent deployment guide. |
   +----------------------------+-----------------------------------------------------------+
   | ``reports.csv.maxRows``    | Maximum rows allowed in exported CSV files.               |
   +----------------------------+-----------------------------------------------------------+
   | ``wazuh.updates.disabled`` | Enables or disables update notifications.                 |
   +----------------------------+-----------------------------------------------------------+

#. Restart the Wazuh dashboard service:

   .. code-block:: console

      # systemctl restart wazuh-dashboard

#. Verify that the Wazuh manager API connection succeeds. Navigate to **Dashboard Management** > **Health Check**.

.. _migration_custom_dashboards_and_visualization:

Custom dashboards and visualization
--------------------------------------

The Wazuh dashboard stores dashboards, visualizations, saved searches, and index patterns as saved objects in the Wazuh indexer. You can export these objects from a Wazuh 4.x deployment and import them into a Wazuh 5.x deployment.

This migration applies only to custom dashboards, visualizations, saved searches, and index patterns that users create or modify.

.. important::

   Do not import the default Wazuh dashboards or visualizations from Wazuh 4.x. Importing these objects can overwrite the default Wazuh 5.x dashboards and introduce incompatible visualizations, outdated index patterns, and unsupported field references.

You can recreate the following saved object types in the Wazuh 5.x deployment.

+----------------+--------------------------------------------------------------------------+
| Object type    | Description                                                              |
+================+==========================================================================+
| Dashboards     | Collections of visualizations and panels.                                |
+----------------+--------------------------------------------------------------------------+
| Visualizations | Charts, tables, maps, metrics, and other visual representations of data. |
+----------------+--------------------------------------------------------------------------+
| Saved searches | Reusable queries and filters.                                            |
+----------------+--------------------------------------------------------------------------+
| Index patterns | Definitions used to query and visualize indexed data.                    |
+----------------+--------------------------------------------------------------------------+

Migrate custom dashboards and visualizations
------------------------------------------------

Perform the following steps to recreate custom dashboards and visualizations in the Wazuh 5.x deployment.

#. Export the custom saved objects from the Wazuh dashboard 4.x deployment. Click the **☰** menu and navigate to **Dashboard Management** > **Saved objects**. Select the objects to export and click **Export**.

   .. note::

      Enable **Include related objects** before exporting the saved objects.

#. Import the exported saved objects into the new deployment. Click the **☰** menu and navigate to **Dashboard Management** > **Saved objects**. Click **Import** and select the exported ``.ndjson`` file.

   .. note::

      When you import objects, select one of the following conflict resolution strategies:

      -  Check for existing objects (recommended)
      -  Automatically overwrite all conflicts

      The recommended option preserves the default objects that the Wazuh dashboard 5.x provisions.

#. Replace references to ``wazuh-alerts-*`` with an appropriate Wazuh 5.x index pattern. Wazuh 5.x stores events and findings in category specific data streams, while the Wazuh dashboard can use broader index patterns such as ``wazuh-events*`` and ``wazuh-findings*`` to query multiple categories. Select the index pattern that contains the data required by the migrated visualization.

#. Update field references where required. Wazuh 5.x uses the Wazuh Common Schema (WCS) to standardize event fields. When recreating visualizations, review the fields referenced by the Wazuh 4.x visualization and identify the appropriate WCS fields for the data you want to display.

   The following table provides examples of Wazuh 4.x fields and related WCS fields in Wazuh 5.x. For the complete list of WCS fields, refer to the :ref:`Wazuh Common Schema (WCS) <wazuh_common_schema>` documentation.

   +----------------------+----------------------+---------------------------------------------------------------------------------------------------------+
   | Wazuh 4.x field      | Wazuh 5.x field      | Notes                                                                                                   |
   +======================+======================+=========================================================================================================+
   | ``rule.level``       | ``wazuh.rule.level`` | Type changed from integer values 0–16 to values such as low, medium, high, critical, and informational. |
   +----------------------+----------------------+---------------------------------------------------------------------------------------------------------+
   | ``rule.description`` | ``wazuh.rule.title`` | Use this field for the rule title or description shown in migrated visualizations.                      |
   +----------------------+----------------------+---------------------------------------------------------------------------------------------------------+
   | ``rule.id``          | ``wazuh.rule.id``    | Use this field to filter or aggregate by rule ID.                                                       |
   +----------------------+----------------------+---------------------------------------------------------------------------------------------------------+
   | ``agent.name``       | ``wazuh.agent.name`` | Use this field to filter or group by agent name.                                                        |
   +----------------------+----------------------+---------------------------------------------------------------------------------------------------------+
   | ``agent.id``         | ``wazuh.agent.id``   | Use this field to filter or group by Wazuh agent ID.                                                    |
   +----------------------+----------------------+---------------------------------------------------------------------------------------------------------+

   .. note::

      Field names, data types, and semantics can differ between Wazuh 4.x and Wazuh 5.x. Review the applicable WCS field before updating filters, aggregations, or saved searches in migrated visualizations.

#. After you complete the migration, verify that dashboards and visualizations display data correctly:

   -  Navigate to **☰** Menu > **Dashboard Management** > **Saved objects** and verify that the expected objects are present.
   -  Open each migrated dashboard and confirm that all panels load correctly.
   -  Verify that visualizations return data from the expected index patterns.
   -  Confirm that all filters, aggregations, and searches use valid Wazuh 5.x field names.
   -  Verify that the selected time range contains data for the imported dashboards and visualizations.

   .. note::

      If multitenancy is enabled in the Wazuh 4.x deployment, export and import saved objects separately for each tenant. Saved objects are tenant-specific and are not shared across tenants. Import objects that you exported from a tenant in the Wazuh 4.x deployment into the corresponding tenant in the Wazuh 5.x deployment to preserve access and ownership.
