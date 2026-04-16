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

Wazuh server
^^^^^^^^^^^^

-  `#31295 <https://github.com/wazuh/wazuh/issues/31295>`__ Added cluster-by-default deployment: all Wazuh server installations now run as a cluster node, removing the distinction between clustered and non-clustered deployments. The ``cluster.disabled`` configuration option has been removed.
-  `#33269 <https://github.com/wazuh/wazuh/issues/33269>`__ Added stateless metadata enrichment in ``remoted``, centralizing event metadata handling for stateless messages and removing the dependency on ``wazuh-db`` for that ingestion path.
-  `#33493 <https://github.com/wazuh/wazuh/issues/33493>`__ Added Engine enrichment support: IOC matching, GeoIP lookup, and event filters.
-  `#34477 <https://github.com/wazuh/wazuh/issues/34477>`__ Added Engine adaptation tier 2: raw archives handling, uncategorized event routing, input-level throttling, and internal metrics exposure.
-  `#31906 <https://github.com/wazuh/wazuh/pull/31906>`__ Added Wazuh instance registration status to reflect CTI ``access_token`` availability (``Pending``, ``Polling``, ``Denied``, ``Available``), allowing the Wazuh dashboard to query the subscription state.
-  `#33377 <https://github.com/wazuh/wazuh/issues/33377>`__, `#33570 <https://github.com/wazuh/wazuh/issues/33570>`__ Upgraded the embedded Python interpreter from 3.10 to 3.12.
-  `#30535 <https://github.com/wazuh/wazuh/issues/30535>`__ Adapted the Vulnerability Detector input pipeline to the new Wazuh 5.0 synchronization algorithm, covering first-scan, inventory-change, and feed-update scenarios.
-  `#27706 <https://github.com/wazuh/wazuh/issues/27706>`__ Revamped Role-Based Access Control (RBAC) management and introduced an upgrade mechanism for existing RBAC configurations.
-  `#34608 <https://github.com/wazuh/wazuh/issues/34608>`__ Removed legacy configuration surfaces, database schemas, build targets, and compatibility layers in the second server cleanup phase.
-  `#33124 <https://github.com/wazuh/wazuh/pull/33124>`__ Removed Filebeat as the log-shipping component; event forwarding now uses native Wazuh server connectivity to the Wazuh indexer via ``indexer-connector``.
-  `#30922 <https://github.com/wazuh/wazuh/issues/30922>`__ Removed deprecated manager daemons: ``ossec-authd``, ``wazuh-agentlessd``, ``wazuh-maild``, and ``wazuh-dbd``.
-  `#30924 <https://github.com/wazuh/wazuh/issues/30924>`__ Removed deprecated C CLI tools: ``manage_agents`` and ``agent-auth``.
-  `#31028 <https://github.com/wazuh/wazuh/issues/31028>`__ Removed the OpenSCAP server-side module.
-  `#31299 <https://github.com/wazuh/wazuh/issues/31299>`__ Removed inventory-related API endpoints.
-  `#28425 <https://github.com/wazuh/wazuh/issues/28425>`__ Removed legacy API security configuration endpoints.

Wazuh agent
^^^^^^^^^^^

-  `#29533 <https://github.com/wazuh/wazuh/issues/29533>`__, `#31838 <https://github.com/wazuh/wazuh/issues/31838>`__ Added local state persistence for agent modules (FIM, system inventory, SCA), removing the dependency on ``rsync`` with the Wazuh server and reducing network traffic and server-side processing overhead.
-  `#33378 <https://github.com/wazuh/wazuh/issues/33378>`__ Changed the Wazuh manager installation path to ``/var/wazuh-manager`` (replacing ``/var/ossec``) and removed agent ID ``000``, fully decoupling agent and manager processes on shared hosts.
-  `#34849 <https://github.com/wazuh/wazuh/issues/34849>`__ Changed Vulnerability Detection to use the Wazuh indexer as the sole authoritative CVE data source, removing direct CTI network access from the agent-side Vulnerability Detector.
-  `#33199 <https://github.com/wazuh/wazuh/issues/33199>`__ Adjusted agent-side Vulnerability Detector inventory emission and synchronization (OS, packages, hotfixes) to align with the updated Vulnerability Detection behavior in Wazuh 5.0.
-  `#31478 <https://github.com/wazuh/wazuh/issues/31478>`__ Simplified Rootcheck by removing the server-side database, sync path, and API surface. Findings are now indexed through the standard alert pipeline.
-  `#33382 <https://github.com/wazuh/wazuh/issues/33382>`__ Updated the Logcollector file-tailing initial read strategy for more consistent behavior across log rotation scenarios.
-  `#34462 <https://github.com/wazuh/wazuh/issues/34462>`__ Updated Windows event channel log collection to emit native XML from ``EvtRender()`` without an XML declaration header.
-  `#35330 <https://github.com/wazuh/wazuh/issues/35330>`__ Increased default limits for agent event throughput and inventory message sizes.
-  `#30435 <https://github.com/wazuh/wazuh/issues/30435>`__ Removed deprecated agent binaries and legacy modules as part of the Wazuh 5.0 agent cleanup.
-  `#31582 <https://github.com/wazuh/wazuh/issues/31582>`__ Removed the NSIS-based Windows agent installer. The Windows agent now ships exclusively as an MSI package.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7827 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7827>`__ Added default notification channels through the health check.
-  `#7597 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7597>`__ Added sample data generators for agent monitoring and server statistics.
-  `#7662 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7662>`__ Added ``"form-data": "^4.0.4"`` to the resolutions section to enforce the required dependency version.
-  `#7694 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7694>`__ Added prompts to views related to Wazuh server API connectivity and alerts index pattern issues.
-  Added a **Not applicable** status to the SCA ``CheckResult`` enum, including color mapping (``#B9A888``) and sample data support.
-  `#7833 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7833>`__ Added alerting sample monitors to the health check.
-  `#7924 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7924>`__ Added the default ``wazuh-events*`` index pattern.
-  `#8015 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8015>`__, `#8212 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8212>`__ Added SSL certificate support for Wazuh server API connections, allowing the Wazuh dashboard to use client certificates and CA certificate validation when connecting to Wazuh server APIs configured with custom SSL certificates. The ``verify_ca`` value is automatically calculated based on whether the certificate paths (``key``, ``cert``, ``ca``) are configured.
-  `#8015 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8015>`__ Added a **Verify CA** column in the **API connections** table to display whether CA certificate verification is enabled for each API host.
-  `#8050 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8050>`__ Added a ``server-api:run_as`` health check to warn when ``allow_run_as`` is disabled for configured API hosts.
-  `#8064 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8064>`__ Fixed styling issues for the v9 theme.
-  `#8206 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8206>`__ Added the Wazuh indexer management **Settings**.
-  `#8233 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8233>`__ Added the ``wazuh-findings`` index patterns.
-  `#8264 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8264>`__ Added ``policy.name``, ``policy.description``, ``policy.file``, and ``event.outcome`` columns to the **Configuration Assessment** findings table.
-  `#8248 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8248>`__ Added the ``wazuh-state-fim*`` index pattern.
-  `#8066 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8066>`__ Changed the default index pattern settings key from ``defaultIndex`` to ``wazuh-events*``.
-  `#7848 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7848>`__ Adapted alerts sample data to the Wazuh Common Schema.
-  `#7701 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7701>`__, `#8147 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8147>`__ Set cluster mode as the default for all Wazuh installations, including single-node deployments, and updated RBAC permissions to ``cluster:*`` actions.
-  `#7602 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7602>`__, `#7929 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7929>`__, `#7974 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7974>`__, `#7979 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7979>`__, `#8242 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8242>`__, `#8306 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8306>`__ Reworked SCA module visualizations, enabled global details for all agents without pinning, replaced the ``/sca`` endpoint with the ``wazuh-states-sca-*`` index pattern, and added sample data support.
-  `#7604 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7604>`__ Split the FIM registry inventory into two index patterns and updated fields in FIM file and registry sample data.
-  `#7622 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7622>`__, `#7694 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7694>`__, `#7756 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7756>`__, `#7829 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7829>`__ Reworked the health check.
-  `#7622 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7622>`__ Reworked several view components to use data sources.
-  `#7754 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7754>`__ Fixed date and format errors across multiple views.
-  `#7812 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7812>`__ Upgraded the ``brace-expansion`` dependency to versions ``1.1.12`` and ``2.0.2``.
-  `#7812 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7812>`__ Upgraded the ``tar-fs`` dependency to version ``2.1.4``.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Migrated ``wazuh.yml`` settings to ``opensearch_dashboards.yml`` and advanced settings.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Changed sample data index names.
-  `#7900 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7900>`__ Reworked the **Generate report** button.
-  `#7842 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7842>`__, `#7847 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7847>`__, `#7916 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7916>`__, `#7938 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7938>`__, `#8310 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8310>`__ Changed the dashboard renderer to use saved objects.
-  `#7934 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7934>`__ Changed the ``rule.groups`` filter to ``wazuh.integration.decoders``.
-  `#7981 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7981>`__ Applied the new home page navigation style to all dashboards.
-  `#8081 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8081>`__ Updated the Office 365 dashboards to use the new index pattern.
-  `#8072 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8072>`__ Updated the GitHub dashboards to use the new index pattern.
-  `#8074 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8074>`__, `#8247 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8247>`__ Updated the File Integrity Monitoring dashboards to use the new index pattern.
-  `#8069 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8069>`__ Updated the Google Cloud dashboard to use the new index pattern.
-  `#8065 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8065>`__ Updated the Amazon Web Services dashboard to use the new index pattern.
-  `#8073 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8073>`__ Updated the Microsoft Graph API dashboard to use the new index pattern.
-  `#8063 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8063>`__ Updated the Threat Hunting dashboard with the new index pattern definition.
-  `#8125 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8125>`__ Upgraded the ``axios`` dependency to ``1.13.3``.
-  `#8179 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8179>`__ Upgraded the ``axios`` dependency to ``1.13.5``.
-  `#8125 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8125>`__ Upgraded the ``loglevel`` dependency to ``1.9.2``.
-  `#8128 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8128>`__ Updated the Docker module under **Cloud Security** with the new index pattern definition.
-  `#8136 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8136>`__ Changed OSSEC references to ``wazuh-manager``.
-  `#8137 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8137>`__ Changed the default **Dev Tools** request from the deprecated ``GET /manager/info`` to ``GET /cluster/<NODE_NAME>/info``.
-  `#8145 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8145>`__ Upgraded ESLint from version 8 to version 10 and migrated the configuration from the legacy ``.eslintrc.json`` to the new flat config format (``eslint.config.mjs``).
-  `#8157 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8157>`__ Updated the Malware Detection dashboard with the new index pattern definition.
-  `#8175 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8175>`__, `#8209 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8209>`__ Removed the Wazuh manager UUID from the **Server APIs** table and added the cluster UUID to the **About** page.
-  `#8146 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8146>`__ Updated the **Security Operations** dashboards with the new index pattern definition.
-  `#8224 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8224>`__ Changed the monitoring and statistics index patterns to ``wazuh-metrics-agents*`` and ``wazuh-metrics-comms*``.
-  `#8231 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8231>`__ Renamed the **Events** tab to **Findings**.
-  `#8232 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8232>`__ Replaced the broken visualization in **Configuration Assessment**.
-  `#8230 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8230>`__ Swapped menu positions of **Vulnerability Detection** and **MITRE ATT&CK**.
-  `#8236 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8236>`__ Changed the default value of ``wazuh.updates.disabled`` from ``false`` to ``true``.
-  `#8239 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8239>`__, `#8303 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8303>`__ Centralized regulatory compliance modules (PCI DSS, GDPR, HIPAA, NIST 800-53, and TSC) into a single **Regulatory Compliance** application.
-  `#8262 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8262>`__, `#8283 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8283>`__, `#8292 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8292>`__ Updated **Vulnerability Detection** Discover tab filters and inventory columns.
-  `#8269 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8269>`__ Changed FIM table columns and index source in the agent view.
-  `#8313 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8313>`__ Changed the IT Hygiene memory visualization.
-  `#8320 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8320>`__ Changed default columns in **Configuration Assessment**.
-  `#7701 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7701>`__ Removed manager-specific logic in favor of cluster-based management.
-  `#7597 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7597>`__ Removed backend monitoring and statistics jobs.
-  `#7597 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7597>`__, `#7698 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7698>`__ Removed monitoring and statistics job settings from the configuration.
-  `#7597 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7597>`__ Removed the prompt related to disabled statistics jobs in the **Statistics** application.
-  `#7612 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7612>`__ Removed configuration for modules relying on deprecated daemons: ``wazuh-agentlessd``, ``wazuh-csyslogd``, ``wazuh-dbd``, ``wazuh-integratord``, ``wazuh-maild``, and ``wazuh-reportd``.
-  `#7645 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7645>`__ Removed deprecated modules: OpenSCAP, CIS-CAT, and Osquery.
-  `#7622 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7622>`__ Removed the ``/health-check`` and ``/blank-screen`` frontend routes.
-  `#7622 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7622>`__ Removed the **Miscellaneous** section from **App Settings**.
-  `#7622 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7622>`__ Removed deprecated ``customization.logo.healthcheck``, ``checks.api``, ``checks.fields``, ``checks.maxBuckets``, ``checks.metaFields``, ``checks.pattern``, ``checks.setup``, ``checks.template``, and ``checks.timeFilter`` settings.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Removed ``customization.*``, ``alerts.sample.prefix``, ``configuration.ui_api_editable``, and ``ip.selector`` settings.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Removed the **App Settings** application.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Removed ``GET /elastic/alerts`` and ``/utils/configuration*`` endpoints.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Removed tasks related to custom logo sanitization and reports directory migration.
-  `#7901 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7901>`__ Removed the **Rules**, **Decoders**, **CDB List**, and **Ruleset test** applications.
-  `#7899 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7899>`__ Removed the legacy reporting application, including server routes, UI, PDF generation logic, and related customization settings.
-  `#7932 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7932>`__, `#8271 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8271>`__ Removed several sections from **Server Management** > **Settings** and agent configuration.
-  `#7933 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7933>`__ Removed the ``wazuh-alerts*`` index pattern and replaced it with ``wazuh-events*`` as the default. Index pattern selection is now handled per module.
-  `#7933 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7933>`__ Removed deprecated ``ip.ignore`` and ``pattern`` settings.
-  `#7977 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7977>`__ Removed references to alerts and archives templates.
-  `#7857 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7857>`__, `#7868 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7868>`__, `#7891 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7891>`__, `#7982 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7982>`__ Removed indexer resource files from the source code and dependency installation process.
-  `#8049 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8049>`__ Removed deprecated **Policy monitoring** settings.
-  `#8060 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8060>`__ Removed the UI permission validation for the upgrade and remove agent actions on **Agent management** > **Summary**.
-  `#8102 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8102>`__ Removed the ``hideManagerAlerts`` setting.
-  `#8104 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8104>`__, `#8105 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8105>`__, `#8117 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8117>`__ Removed usage of agent ``000``.
-  `#8125 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8125>`__ Removed the ``needle`` dependency.
-  `#8125 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8125>`__ Removed the ``read-last-lines`` dependency.
-  `#8195 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8195>`__ Removed Key Request configuration options from the **Registration Service** view.
-  `#8214 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8214>`__ Removed the **Sample Data** application and related endpoints.
-  `#8215 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8215>`__ Removed the **Docker** application.
-  `#8218 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8218>`__ Removed the **Statistics** application.
-  `#8220 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8220>`__ Removed the **Cluster** application and relocated some panels to the **Status** application.
-  `#8243 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8243>`__ Removed several options from the Wazuh manager and agent configuration.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh server
^^^^^^^^^^^^

-  `#31746 <https://github.com/wazuh/wazuh/issues/31746>`__ Fixed Vulnerability Detector version matcher logic for improved detection accuracy.
-  `#33108 <https://github.com/wazuh/wazuh/issues/33108>`__ Fixed CloudTrail log ingestion parsing errors.

Wazuh agent
^^^^^^^^^^^

-  `#29668 <https://github.com/wazuh/wazuh/issues/29668>`__ Fixed FIM checksum calculation that incorrectly ignored some file fields.
-  `#30513 <https://github.com/wazuh/wazuh/issues/30513>`__ Fixed Syscollector reporting duplicate and bogus packages on macOS arm64.
-  `#32915 <https://github.com/wazuh/wazuh/issues/32915>`__ Fixed ``agent_control`` not displaying agent status information.
-  `#35071 <https://github.com/wazuh/wazuh/issues/35071>`__ Fixed SCA handling of invalid operators and missing values in regex patterns.
-  `#35156 <https://github.com/wazuh/wazuh/issues/35156>`__ Fixed agent modules initializing before agent metadata was fully ready.
-  `#35162 <https://github.com/wazuh/wazuh/issues/35162>`__ Fixed FIM inventory reporting file modification time as 1970-01-01.
-  `#35169 <https://github.com/wazuh/wazuh/issues/35169>`__ Fixed agent automatic reload failing after receiving centralized configuration.
-  `#35248 <https://github.com/wazuh/wazuh/issues/35248>`__ Fixed Syscollector false positive package detection on macOS.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7923 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7923>`__ Fixed a hardcoded version value in the **Deploy agent** wizard.
-  `#8099 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8099>`__ Fixed a visual bug in SCA score decimal precision in the agent overview.
-  `#8150 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8150>`__ Fixed the agent stats view being inaccessible for some version combinations.
-  `#8196 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8196>`__ Fixed a tooltip showing an administrator role requirement where it was not needed.
-  `#8216 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8216>`__ Fixed a misleading message in the group selector of the **Deploy new agent** guide when no groups were available or could not be obtained.
-  `#8252 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8252>`__ Fixed the under-evaluation filter being removed on filter addition in **Vulnerability Detection**.
-  `#8267 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8267>`__, `#8285 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8285>`__ Fixed home KPIs not being vertically centered.
-  `#8311 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8311>`__ Fixed **MITRE ATT&CK** findings data grid not spanning the full available width.

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
