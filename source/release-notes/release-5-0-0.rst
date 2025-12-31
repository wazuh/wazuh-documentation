.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 5.0.0 has been released. Check out our release notes to discover the changes and additions of this release.

5.0.0 Release notes - TBD
=========================

This section lists the changes in version 5.0.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

Highlights
----------

Breaking changes
----------------

What's new
----------

This release includes new features or enhancements as the following:

-  `#7827 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7827>`__ Added default notification channels through the health check.
-  `#7597 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7597>`__ Added sample data generators for agent monitoring and server statistics.
-  `#7662 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7662>`__ Added ``"form-data": "^4.0.4"`` to the resolutions section to enforce the required dependency version.
-  `#7694 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7694>`__ Added prompts to views related to Server API connectivity and alerts index pattern issues.
-  Added a **Not applicable** status to the SCA ``CheckResult`` enum, including color mapping (``#B9A888``) and sample data support.
-  `#7833 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7833>`__ Added alerting sample monitors to the health check.
-  `#7917 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7917>`__, `#7975 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7975>`__, `#7990 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7990>`__, `#7994 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7994>`__ Added the **Normalization** application.
-  `#7924 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7924>`__ Added the default ``wazuh-events*`` index pattern.
-  `#7839 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7839>`__ Adapted alerts sample data to the Wazuh Common Schema.
-  `#7688 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7688>`__ Set cluster mode as the default for all Wazuh installations, including single-node deployments, and updated RBAC permissions to ``cluster:*`` actions.
-  `#7578 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7578>`__, `#7929 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7929>`__, `#7974 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7974>`__, `#7979 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7979>`__ Reworked SCA module visualizations, enabled global details for all agents without pinning, replaced the ``/sca`` endpoint with the ``wazuh-states-sca-*`` index pattern, and added sample data support.
-  `#7604 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7604>`__ Split the FIM registry inventory into two index patterns and updated fields in FIM file and registry sample data.
-  `#7622 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7622>`__, `#7694 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7694>`__, `#7756 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7756>`__, `#7829 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7829>`__ Reworked the health check.
-  `#7622 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7622>`__ Reworked several view components to use data sources.
-  `#7754 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7754>`__ Fixed date and format errors across multiple views.
-  `#7812 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7812>`__ Upgraded the ``brace-expansion`` dependency to versions ``1.1.12`` and ``2.0.2``.
-  `#7812 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7812>`__ Upgraded the ``tar-fs`` dependency to version ``2.1.4``.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Migrated ``wazuh.yml`` settings to ``opensearch_dashboards.yml`` and advanced settings.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Changed sample data index names.
-  `#7900 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7900>`__ Reworked the **Generate report** button.
-  `#7842 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7842>`__, `#7847 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7847>`__, `#7916 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7916>`__, `#7938 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7938>`__ Changed the dashboard renderer to use saved objects.
-  `#7934 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7934>`__ Changed the ``rule.groups`` filter to ``wazuh.integration.decoders``.
-  `#7981 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7981>`__ Applied the new home page navigation style to all dashboards.
-  `#7688 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7688>`__ Removed manager-specific logic in favor of cluster-based management.
-  `#7597 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7597>`__ Removed backend monitoring and statistics jobs.
-  `#7597 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7597>`__, `#7698 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7698>`__ Removed monitoring and statistics job settings from the configuration.
-  `#7597 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7597>`__ Removed the prompt related to disabled statistics jobs in the **Statistics** application.
-  `#7612 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7612>`__ Removed configuration for modules relying on deprecated daemons: ``wazuh-agentlessd``, ``wazuh-csyslogd``, ``wazuh-dbd``, ``wazuh-integratord``, ``wazuh-maild``, and ``wazuh-reportd``.
-  `#7645 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7645>`__ Removed deprecated modules: OpenSCAP, CIS-CAT, and Osquery.
-  `#7622 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7622>`__ Removed the ``/health-check`` and ``/blank-screen`` frontend routes.
-  `#7622 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7622>`__ Removed the **Miscellaneous** section from **App Settings**.
-  `#7622 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7622>`__ Removed deprecated health check and customization settings.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Removed legacy customization, alerts sample, and UI API editable settings.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Removed the **App Settings** application.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Removed ``GET /elastic/alerts`` and ``/utils/configuration*`` endpoints.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Removed tasks related to custom logo sanitization and reports directory migration.
-  `#7901 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7901>`__ Removed the **Rules**, **Decoders**, **CDB List**, and **Ruleset test** applications.
-  `#7899 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7899>`__ Removed the legacy reporting application, including server routes, UI, PDF generation logic, and related customization settings.
-  `#7932 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7932>`__ Removed several sections from **Server Management** > **Settings** and agent configuration.
-  `#7933 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7933>`__ Removed the ``wazuh-alerts*`` index pattern and replaced it with ``wazuh-events*`` as the default. Index pattern selection is now handled per module.
-  `#7933 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7933>`__ Removed deprecated ``ip.ignore`` and ``pattern`` settings.
-  `#7977 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7977>`__ Removed references to alerts and archives templates.
-  `#7857 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7857>`__, `#7868 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7868>`__, `#7891 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7891>`__, `#7982 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7982>`__ Removed indexer resource files from the source code and dependency installation process.

Resolved issues
---------------

This release resolves known issues as the following:

-  `#7923 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7923>`__ Fixed a hardcoded version value in the **Deploy agent** wizard.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v5.0.0/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v5.0.0/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v5.0.0/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v5.0.0/CHANGELOG.md>`__
