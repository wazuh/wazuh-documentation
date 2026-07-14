.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Recreate the supported Wazuh dashboard configuration, custom dashboards, and visualizations when transitioning from Wazuh 4.x to Wazuh 5.x.

Wazuh dashboard
===============

The Wazuh dashboard in Wazuh 5.x is based on OpenSearch Dashboards 3.x and changes dashboard configuration, navigation, reporting, health checks, branding, and multi-manager environments. These changes prevent Wazuh dashboard 4.x deployments from being upgraded in place. Transitioning to the Wazuh dashboard 5.x requires deploying a new dashboard instance and manually recreating the supported configuration from the existing Wazuh 4.x deployment.

You can recreate the following Wazuh dashboard components in Wazuh 5.x:

-  Dashboard configuration
-  Wazuh manager API connections
-  Custom dashboards
-  Custom visualizations
-  Saved searches
-  Index patterns
-  Advanced Settings
-  Custom application branding

You cannot recreate previously generated PDF reports or report branding settings in Wazuh 5.x, because the OpenSearch Dashboards Reporting plugin replaces the built-in reporting feature that the Wazuh plugin provided.

Wazuh dashboard configuration
-----------------------------

The Wazuh dashboard configuration defines how the dashboard connects to the Wazuh manager, and it configures dashboard behavior, custom branding, health checks, and user preferences.

Review the existing Wazuh 4.x configuration and recreate the supported settings manually in the Wazuh 5.x deployment. Do not copy the Wazuh 4.x ``wazuh.yml`` configuration directly, because Wazuh 5.x stores dashboard configuration in different locations.

The following configuration locations are commonly reviewed during the transition.

+----------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Location                                           | Purpose                                                                                                                    |
+====================================================+============================================================================================================================+
| ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` | Wazuh manager API connections, branding, health checks, and dashboard configuration                                        |
+----------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------+
| **Dashboard Management** > **Advanced Settings**   | Tenant-specific dashboard settings, including request timeout, enrollment DNS, CSV export limits, and update notifications |
+----------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------+

By default, you manage Advanced Settings per tenant through the Wazuh dashboard. You can also configure them globally using ``uiSettings.overrides`` in ``opensearch_dashboards.yml``.

Configuration changes
---------------------

Review the following configuration changes before you recreate the Wazuh dashboard configuration.

+---------------------------------+----------------------------------------------------------------------------------+
| Area                            | Wazuh 5.x change                                                                 |
+=================================+==================================================================================+
| Configuration file              | ``wazuh.yml`` is replaced by ``opensearch_dashboards.yml``.                      |
+---------------------------------+----------------------------------------------------------------------------------+
| Wazuh manager API configuration | ``hosts`` is replaced by ``wazuh_core.hosts``.                                   |
+---------------------------------+----------------------------------------------------------------------------------+
| Default index pattern           | ``wazuh-alerts-*`` is replaced by the Wazuh 5.x index patterns.                  |
+---------------------------------+----------------------------------------------------------------------------------+
| Health checks                   | Individual ``checks.*`` settings are replaced by ``healthcheck.checks_enabled``. |
+---------------------------------+----------------------------------------------------------------------------------+
| Statistics collection           | ``cron.*`` settings are removed.                                                 |
+---------------------------------+----------------------------------------------------------------------------------+
| Agent monitoring                | ``wazuh.monitoring.*`` settings are removed.                                     |
+---------------------------------+----------------------------------------------------------------------------------+
| Branding                        | Branding settings are configured through ``opensearchDashboards.branding.*``.    |
+---------------------------------+----------------------------------------------------------------------------------+
| Report branding                 | Report logo, header, and footer customization are no longer supported.           |
+---------------------------------+----------------------------------------------------------------------------------+

Configuration procedure
-----------------------

Perform the following steps to recreate the Wazuh dashboard configuration in the Wazuh 5.x deployment.

#. Review the Wazuh dashboard 4.x configuration file ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` and identify any settings that differ from the default values.

#. Place the required TLS certificate files under ``/etc/wazuh-dashboard/certs/`` and update the corresponding certificate paths in ``/etc/wazuh-dashboard/opensearch_dashboards.yml``.

#. Edit the Wazuh dashboard 5.x configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to recreate the Wazuh server API configuration, using the values from the 4.x deployment.

   .. code-block:: yaml

      wazuh_core.hosts:
        default:
          url: https://<WAZUH_MANAGER_IP_OR_HOSTNAME>
          port: <PORT>
          username: <USERNAME>
          password: <PASSWORD>
          run_as: <RUN_AS>

   .. note::

      If the 4.x deployment configures multiple hosts, review the multi-manager migration procedure before you reconfigure.

#. Configure the default route. Verify that the following setting is present in ``opensearch_dashboards.yml``.

   .. code-block:: yaml

      uiSettings.overrides.defaultRoute: /app/wz-home

#. Navigate to **Dashboard Management** > **Advanced Settings** on the Wazuh dashboard to reconfigure advanced settings. Recreate any customized settings from the Wazuh 4.x deployment. Review the following settings:

   +----------------------------+----------------------------------------------------------+
   | Setting                    | Description                                              |
   +============================+==========================================================+
   | ``timeout``                | Request timeout in milliseconds                          |
   +----------------------------+----------------------------------------------------------+
   | ``enrollment.dns``         | Wazuh server DNS name used in the agent deployment guide |
   +----------------------------+----------------------------------------------------------+
   | ``reports.csv.maxRows``    | Maximum rows allowed in exported CSV files               |
   +----------------------------+----------------------------------------------------------+
   | ``wazuh.updates.disabled`` | Enables or disables update notifications                 |
   +----------------------------+----------------------------------------------------------+

#. Restart the Wazuh dashboard server.

   .. code-block:: console

      # systemctl restart wazuh-dashboard

#. Verify that the Wazuh manager API connection passes. Navigate to **Dashboard Management** > **Health Check**.

Custom dashboards and visualizations
------------------------------------

The Wazuh dashboard stores dashboards, visualizations, saved searches, and index patterns as saved objects in the Wazuh indexer. You can export these objects from a Wazuh 4.x deployment and import them into a Wazuh 5.x deployment.

This transition applies only to custom dashboards, visualizations, saved searches, and index patterns that users create or modify. Wazuh 5.x provisions the default dashboards and visualizations automatically, so do not import them from Wazuh 4.x.

.. warning::

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

Transition procedure
--------------------

Perform the following steps to recreate custom dashboards and visualizations in the Wazuh 5.x deployment.

#. Export the custom saved objects from the Wazuh dashboard 4.x deployment. Click the ☰ menu and navigate to **Dashboard Management** > **Dashboard Management** > **Saved objects**. Select the objects to export and click **Export**.

   .. note::

      Enable **Include related objects** and save the generated ``.ndjson`` file.

#. Import the exported saved objects into the new deployment. Click the ☰ menu and navigate to **Dashboard Management** > **Dashboard Management** > **Saved objects**. Click **Import** and select the exported ``.ndjson`` file.

   .. note::

      When you import objects, select one of the following conflict resolution strategies:

      -  Check for existing objects (recommended)
      -  Automatically overwrite all conflicts

      The recommended option preserves the default objects that the Wazuh dashboard 5.x provisions.

#. Replace references to ``wazuh-alerts-*`` with the appropriate Wazuh 5.x index pattern. Use ``wazuh-findings-v5*`` for rule-based alert data and ``wazuh-events-v5*`` for raw event data.

#. Update field references where required. Open each migrated visualization and update filters, aggregations, and saved searches that reference renamed fields, such as ``rule.level``, ``rule.description``, ``rule.id``, ``rule.groups``, ``agent.name``, and ``agent.id``.

   +----------------------+----------------------------+---------------------------------------------------------------------------------------------------------+
   | Wazuh 4.x field      | Wazuh 5.x field            | Notes                                                                                                   |
   +======================+============================+=========================================================================================================+
   | ``rule.level``       | ``wazuh.rule.level``       | Type changed from integer values 0–16 to values such as low, medium, high, critical, and informational. |
   +----------------------+----------------------------+---------------------------------------------------------------------------------------------------------+
   | ``rule.description`` | ``wazuh.rule.title``       | Use this field for the rule title or description shown in migrated visualizations.                      |
   +----------------------+----------------------------+---------------------------------------------------------------------------------------------------------+
   | ``rule.id``          | ``wazuh.rule.id``          | Use this field to filter or aggregate by rule ID.                                                       |
   +----------------------+----------------------------+---------------------------------------------------------------------------------------------------------+
   | ``rule.groups``      | ``wazuh.integration.name`` | Use this field when grouping events by integration name.                                                |
   +----------------------+----------------------------+---------------------------------------------------------------------------------------------------------+
   | ``agent.name``       | ``wazuh.agent.name``       | Use this field to filter or group by agent name.                                                        |
   +----------------------+----------------------------+---------------------------------------------------------------------------------------------------------+
   | ``agent.id``         | ``wazuh.agent.id``         | Use this field to filter or group by Wazuh agent ID.                                                    |
   +----------------------+----------------------------+---------------------------------------------------------------------------------------------------------+

#. After you complete the migration, verify that dashboards and visualizations display data correctly:

   -  Navigate to ☰ **Menu** > **Dashboard Management** > **Dashboard Management** > **Saved objects** and verify that the expected objects are present.
   -  Open each migrated dashboard and confirm that all panels load correctly.
   -  Verify that visualizations return data from the expected index patterns.
   -  Confirm that all filters, aggregations, and searches use valid Wazuh 5.x field names.
   -  Verify that the selected time range contains data for the imported dashboards and visualizations.

.. note::

   If the Wazuh 4.x deployment enables multitenancy, export and import saved objects separately for each tenant. Saved objects are tenant-specific and are not shared across tenants. Import objects that you exported from a tenant in the Wazuh 4.x deployment into the corresponding tenant in the Wazuh 5.x deployment to preserve access and ownership.
