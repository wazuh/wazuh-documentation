.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Recreate the supported Wazuh dashboard configuration, custom dashboards, and visualizations when transitioning from Wazuh 4.x to Wazuh 5.x.

Wazuh dashboard
===============

The Wazuh dashboard in Wazuh 5.x introduces changes to its configuration, navigation, reporting, health checks, branding, and support for multi-manager environments. These changes prevent Wazuh 4.x dashboard deployments from being upgraded in place. Transitioning to the Wazuh 5.x dashboard requires deploying a new dashboard instance and recreating the supported configuration from the existing Wazuh 4.x deployment. For Docker or Kubernetes deployments, see :doc:`Docker and Kubernetes deployments <docker-kubernetes-deployments>`.

After the transition, the Wazuh 5.x dashboard has:

-  Your supported Wazuh 4.x settings, in their Wazuh 5.x locations.
-  Your custom dashboards, visualizations, and saved searches, rewritten to Wazuh 5.x index patterns and WCS fields. They show data after the Wazuh agents report to the Wazuh 5.x manager.

.. note::

   Previously generated PDF reports aren't carried over to Wazuh 5.x. Download the ones that you need from Wazuh 4.x before you retire it.

Prerequisites
-------------

Perform the following steps on the Wazuh 4.x deployment:

#. Copy ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml``, ``/etc/wazuh-dashboard/opensearch_dashboards.yml``, and the logo files in ``/usr/share/wazuh-dashboard/plugins/wazuh/public/assets/custom/images/`` to a location outside the Wazuh 4.x deployment.

#. Note the Advanced settings that you changed. In **Dashboards Management** > **Advanced settings**, each changed setting shows **Reset to default**.

#. Export the custom saved objects of each tenant, as described in :ref:`Migrate custom dashboards and visualizations <migration_wazuh_dashboard_migrate_custom_dashboards_and_visualizations>`.

#. Download the Wazuh 4.x reports that you need.

   .. note::

      If multitenancy is enabled in the Wazuh 4.x deployment, export and import saved objects separately for each tenant. Saved objects are tenant-specific and aren't shared across tenants. Import objects that you exported from a tenant in the Wazuh 4.x deployment into the corresponding tenant in the Wazuh 5.x deployment to preserve access and ownership. Before you import into a custom tenant, switch to it and create the Wazuh 5.x index patterns that the objects use, such as ``wazuh-findings-v5*``. To turn multitenancy on in Wazuh 5.x, set ``kibana.multitenancy_enabled: true`` in ``/etc/wazuh-indexer/opensearch-security/config.yml``, add the tenants to ``/etc/wazuh-indexer/opensearch-security/tenants.yml``, and apply both files with ``indexer-security-init.sh``. Then set ``opensearch_security.multitenancy.enabled: true`` in ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` and restart the Wazuh dashboard.

.. _migration_wazuh_dashboard_configuration:

Wazuh dashboard configuration
-----------------------------

The Wazuh dashboard configuration defines how the dashboard connects to the Wazuh manager, and it configures dashboard behavior, custom branding, health checks, and user preferences.

Review the existing Wazuh 4.x configuration and recreate the supported settings manually in the Wazuh 5.x deployment. Don't copy the Wazuh 4.x ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` configuration directly, because Wazuh 5.x stores dashboard configuration in different locations.

The following configuration locations are commonly reviewed during the transition.

+----------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------+
| **Location**                                       | **Purpose**                                                                                                                |
+====================================================+============================================================================================================================+
| ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` | Wazuh manager API connections, branding, health checks, and dashboard configuration                                        |
+----------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------+
| **Dashboards Management** > **Advanced settings**  | Tenant-specific dashboard settings, including request timeout, enrollment DNS, CSV export limits, and update notifications |
+----------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------+

By default, you manage Advanced settings per tenant through the Wazuh dashboard. You can also configure them globally using ``uiSettings.overrides`` in ``opensearch_dashboards.yml``.

Configuration changes
---------------------

Review the following configuration changes before you recreate the Wazuh dashboard configuration.

Configuration and connections
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Area**                        | **Wazuh 5.x change**                                                                                                                                                                                      |
+=================================+===========================================================================================================================================================================================================+
| Configuration file              | ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` is replaced by ``/etc/wazuh-dashboard/opensearch_dashboards.yml``.                                                                             |
+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Wazuh manager API configuration | ``hosts`` is replaced by ``wazuh_core.hosts``. Several entries require `cross-cluster search <https://docs.opensearch.org/latest/search-plugins/cross-cluster-search/>`__ on the Wazuh indexer.           |
+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Default index pattern           | ``wazuh-alerts-*`` is replaced by the Wazuh 5.x index patterns.                                                                                                                                           |
+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Health checks                   | Individual ``checks.*`` settings are replaced by ``healthcheck.checks_enabled``. Wazuh 4.x checks, such as ``fields``, ``maxBuckets``, ``metaFields``, ``template``, and ``timeFilter``, no longer exist. |
+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Removed features
^^^^^^^^^^^^^^^^

+-----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Area**              | **Wazuh 5.x change**                                                                                                                                                                                                          |
+=======================+===============================================================================================================================================================================================================================+
| Statistics collection | ``cron.*`` settings are removed. Use the Server statistics dashboards and the ``wazuh-metrics-*`` index patterns.                                                                                                             |
+-----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Agent monitoring      | ``wazuh.monitoring.*`` settings are removed. Use the ``wazuh-metrics-agents*`` and ``wazuh-agent-stats*`` index patterns. Custom objects that use ``wazuh-monitoring-*`` or ``wazuh-statistics-*`` show no data in Wazuh 5.x. |
+-----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Branding
^^^^^^^^

+-----------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Area**        | **Wazuh 5.x change**                                                                                                                                                                                                                                                                                                  |
+=================+=======================================================================================================================================================================================================================================================================================================================+
| Branding        | Wazuh 5.x doesn't upload logos. Copy the Wazuh 4.x logos from ``/usr/share/wazuh-dashboard/plugins/wazuh/public/assets/custom/images/`` to a web server that the Wazuh 5.x dashboard can reach. Then set their URLs as described in :doc:`Setting up custom branding </user-manual/wazuh-dashboard/custom-branding>`. |
+-----------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Report branding | Reports don't support a custom logo. You can add a header or footer to a report instead.                                                                                                                                                                                                                              |
+-----------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Recreate the Wazuh dashboard configuration
------------------------------------------

Perform the following steps to recreate the Wazuh dashboard configuration in Wazuh 5.x.

#. Review the Wazuh 4.x dashboard configuration file ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` and identify any settings that differ from the default values.

#. Compare the Wazuh 4.x ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file with the Wazuh 5.x file. Copy only the lines that you changed, such as ``opensearch.requestTimeout``. Keep the Wazuh 5.x certificate paths and ``opensearch.ssl.verificationMode``.

#. Edit the Wazuh 5.x dashboard configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to recreate the supported Wazuh manager API configuration. Set the URL to the Wazuh 5.x manager address. In a Wazuh manager cluster, use the master node address, because only the master node runs the Wazuh manager API. Use the port and ``run_as`` values from the Wazuh 4.x deployment. Keep the ``wazuh-internal-client`` user, which replaces ``wazuh-wui`` in Wazuh 5.x. Keep the ``ca`` setting of the default block, so that the Wazuh dashboard verifies the Wazuh manager API certificate. Leave out the ``password`` setting, because the Wazuh dashboard reads the password from its keystore:

   .. code-block:: yaml
      :emphasize-lines: 3, 4

      wazuh_core.hosts:
        default:
          url: https://<WAZUH_MANAGER_IP_OR_HOSTNAME>
          port: <PORT>
          username: wazuh-internal-client
          run_as: true
          ca: '/etc/wazuh-dashboard/certs/manager-ca.pem'

   .. note::

      Wazuh 5.x dashboard uses only the first entry of ``wazuh_core.hosts`` and ignores the others without a warning. Leave out the other Wazuh 4.x entries. To use several Wazuh manager API entries, configure :doc:`cross-cluster search </user-manual/wazuh-indexer-cluster/cluster-architecture-and-node-types>` on the Wazuh indexer, and store the password of each extra entry in the Wazuh dashboard keystore as ``wazuh_core.hosts.<HOST_ID>.password``.

#. Navigate to **Dashboards Management** > Advanced settings on the Wazuh dashboard to reconfigure advanced settings. Recreate the settings that you changed in Wazuh 4.x. Don't export the **Advanced Settings** saved object. Wazuh 5.x ignores it. Review the following settings:

   +----------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | **Setting**                | **Description**                                                                                                                                                       |
   +============================+=======================================================================================================================================================================+
   | ``timeout``                | Request timeout in milliseconds.                                                                                                                                      |
   +----------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``enrollment.dns``         | Wazuh manager DNS name used in the agent deployment guide. Set this value to the Wazuh 5.x manager address.                                                           |
   +----------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``reports.csv.maxRows``    | Maximum rows allowed in exported CSV files.                                                                                                                           |
   +----------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``check_updates.enabled``  | Replaces ``wazuh.updates.disabled``, with the meaning inverted. Enables the check for updates (**Check for updates** in Advanced settings). The default is ``false``, |
   |                            | which means the Wazuh dashboard doesn't check for updates. The Wazuh 4.x value isn't carried over. If you had update notifications enabled in Wazuh 4.x, turn on      |
   |                            | **Check for updates**.                                                                                                                                                |
   +----------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#. Restart the Wazuh dashboard service:

   .. code-block:: console

      # systemctl restart wazuh-dashboard

#. Verify that the Wazuh manager API connection succeeds. Navigate to **Dashboard management** > **Health Check**.

.. _migration_custom_dashboards_and_visualization:

Custom dashboards and visualizations
------------------------------------

The Wazuh dashboard stores dashboards, visualizations, saved searches, and index patterns as saved objects in the Wazuh indexer. You can export these objects from a Wazuh 4.x deployment and import them into a Wazuh 5.x deployment.

This migration applies only to custom dashboards, visualizations, saved searches, and index patterns that users create or modify.

.. important::

   Don't export the Wazuh 4.x index patterns ``wazuh-alerts-*``, ``wazuh-monitoring-*``, ``wazuh-statistics-*``, and ``wazuh-states-*-*``, or the **Advanced Settings** object. Wazuh 5.x provides its own. The default dashboards that Wazuh 5.x provides have the description **Provided by Wazuh**.

You can recreate the following saved object types in the Wazuh 5.x deployment.

+-----------------+--------------------------------------------------------------------------+
| **Object type** | **Description**                                                          |
+=================+==========================================================================+
| Dashboards      | Collections of visualizations and panels.                                |
+-----------------+--------------------------------------------------------------------------+
| Visualizations  | Charts, tables, maps, metrics, and other visual representations of data. |
+-----------------+--------------------------------------------------------------------------+
| Saved searches  | Reusable queries and filters.                                            |
+-----------------+--------------------------------------------------------------------------+
| Index patterns  | Definitions used to query and visualize indexed data.                    |
+-----------------+--------------------------------------------------------------------------+

.. _migration_wazuh_dashboard_migrate_custom_dashboards_and_visualizations:

Migrate custom dashboards and visualizations
--------------------------------------------

Perform the following steps to recreate custom dashboards and visualizations in the Wazuh 5.x deployment.

#. Export the custom saved objects from the Wazuh 4.x dashboard deployment. Click the **☰** menu and navigate to **Dashboards Management** > **Saved objects**. Select the objects to export and click **Export**.

   .. note::

      Disable **Include related objects** before exporting the saved objects. Otherwise, the export includes the Wazuh 4.x ``wazuh-alerts-*`` index pattern, and the imported panels display no data.

#. Import the exported saved objects into the new deployment. Click the **☰** menu and navigate to **Dashboards Management** > **Saved objects**. Click **Import** and select the exported ``.ndjson`` file.

   .. note::

      When you import objects, select **Check for existing objects** and then **Request action on conflict**. When the Wazuh dashboard reports index pattern conflicts, select ``wazuh-findings-v5*`` for ``wazuh-alerts-*`` and ``wazuh-events-v5*`` for ``wazuh-archives-*``, and click **Confirm all changes**. This option preserves the default objects that the Wazuh 5.x dashboard provisions. The **Automatically overwrite conflicts** option replaces existing objects that have the same IDs.

#. If an object still references ``wazuh-alerts-*`` or ``wazuh-archives-*`` after the import, change its index pattern to ``wazuh-findings-v5*`` or ``wazuh-events-v5*``.

Update the field references
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh 5.x uses the Wazuh Common Schema (WCS) to standardize event fields. When recreating visualizations, review the fields referenced by the Wazuh 4.x visualization and identify the appropriate WCS fields for the data you want to display.

To change a field, click the **☰** menu, navigate to **Dashboards Management** > **Saved objects**, and click **Inspect** for the object. Replace the field names in ``visState``, ``searchSourceJSON``, ``columns``, and ``sort``, and click **Save**. You can also replace the field names in the exported ``.ndjson`` file before you import it. Panels that use a Wazuh 4.x field show no data and no error. For example, in ``searchSourceJSON``, replace ``rule.level >= 7`` with ``wazuh.rule.level:(medium or high or critical)``. If most fields of a visualization change, rebuild the visualization in Wazuh 5.x instead.

The following table provides examples of Wazuh 4.x fields and related WCS fields in Wazuh 5.x. For the complete list of WCS fields, refer to the :ref:`Wazuh Common Schema (WCS) <wazuh_common_schema>` documentation. Fields under ``data.*`` depend on the decoder. Check the WCS field that the Wazuh 5.x decoder writes.

+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Wazuh 4.x field**         | **Wazuh 5.x field**         | **Notes**                                                                                                                                                                                                                                                                                                                                                                      |
+=============================+=============================+================================================================================================================================================================================================================================================================================================================================================================================+
| ``rule.level``              | ``wazuh.rule.level``        | Type changed from integer values 0–16 to values such as low, medium, high, critical, and informational. Rewrite range queries, for example, replace ``rule.level >= 5`` with ``wazuh.rule.level:(medium or high or critical)``. Wazuh 4.x levels 1 to 3 map to ``informational``, 4 to 6 to ``low``, 7 to 9 to ``medium``, 10 to 13 to ``high``, and 14 to 16 to ``critical``. |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rule.description``        | ``wazuh.rule.title``        | Use this field for the rule title or description shown in migrated visualizations.                                                                                                                                                                                                                                                                                             |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rule.id``                 | ``wazuh.rule.id``           | Use this field to filter or aggregate by rule ID. Wazuh 5.x rule IDs are UUIDs. Filters on Wazuh 4.x numeric rule IDs don't match.                                                                                                                                                                                                                                             |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``agent.name``              | ``wazuh.agent.name``        | Use this field to filter or group by agent name.                                                                                                                                                                                                                                                                                                                               |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``agent.id``                | ``wazuh.agent.id``          | Use this field to filter or group by Wazuh agent ID.                                                                                                                                                                                                                                                                                                                           |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``rule.groups``             | ``wazuh.integration.name``  | Use this field to filter or group by the integration that generated the event. A Wazuh 4.x rule group, such as ``authentication_failed``, isn't an integration. Use the WCS ``event.*`` fields instead, for example ``event.category:authentication`` and ``event.outcome:failure`` for ``authentication_failed``.                                                             |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``data.srcip``              | ``source.ip``               | Source IP address of the event.                                                                                                                                                                                                                                                                                                                                                |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``data.dstip``              | ``destination.ip``          | Destination IP address of the event.                                                                                                                                                                                                                                                                                                                                           |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``data.srcuser``            | ``user.name``               | User name of the event.                                                                                                                                                                                                                                                                                                                                                        |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``timestamp``               | ``@timestamp``              | Time of the event. Update the sort order of saved searches.                                                                                                                                                                                                                                                                                                                    |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``agent.labels.*``          | No Wazuh 5.x field          | Wazuh 5.x doesn't support agent labels and has no replacement field. Remove filters and aggregations on these fields.                                                                                                                                                                                                                                                          |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``full_log``                | ``event.original``          | This field isn't searchable or aggregatable.                                                                                                                                                                                                                                                                                                                                   |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``location``                | ``wazuh.protocol.location`` | Where the Wazuh agent read the event, such as a log file path.                                                                                                                                                                                                                                                                                                                 |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``predecoder.program_name`` | ``process.name``            | Program name from the log header.                                                                                                                                                                                                                                                                                                                                              |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``predecoder.hostname``     | ``observer.hostname``       | Host name from the log header.                                                                                                                                                                                                                                                                                                                                                 |
+-----------------------------+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

.. note::

   Field names, data types, and semantics can differ between Wazuh 4.x and Wazuh 5.x. Review the applicable WCS field before updating filters, aggregations, or saved searches in migrated visualizations.

Verify the migrated objects
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Migrated dashboards show only Wazuh 5.x data. Their panels stay empty until the Wazuh agents report to the Wazuh 5.x manager and the Wazuh 5.x detection content exists. Check that the panels show data after you migrate the Wazuh agents. Now, verify the following:

-  Click the **☰** menu, navigate to **Dashboards Management** > **Saved objects**, and verify that the expected objects are present.
-  Open each migrated dashboard and confirm that all panels load correctly.
-  Confirm that all filters, aggregations, and searches use valid Wazuh 5.x field names.
