.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.10.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.10.0 Release notes - TBD
==========================

This section lists the changes in version 4.10.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#24333 <https://github.com/wazuh/wazuh/pull/24333>`__ Added self-recovery mechanism for rocksDB databases.
-  `#25189 <https://github.com/wazuh/wazuh/pull/25189>`__ Improve logging for indexer connector monitoring class.
-  `#23760 <https://github.com/wazuh/wazuh/pull/23760>`__ Added generation of debug symbols.
-  `#27320 <https://github.com/wazuh/wazuh/pull/27320>`__ Improved Vulnerability Scanner performance by optimizing the PEP440 version matcher.
-  `#27324 <https://github.com/wazuh/wazuh/pull/27324>`__ Improved Vulnerability Scanner performance by optimizing version matcher object creation.
-  `#27321 <https://github.com/wazuh/wazuh/pull/27321>`__ Improved Vulnerability Scanner performance by optimizing global data handling.

Wazuh agent
^^^^^^^^^^^

-  `#23760 <https://github.com/wazuh/wazuh/pull/23760>`__ Added generation of debug symbols.
-  `#23998 <https://github.com/wazuh/wazuh/pull/23998>`__ Changed how the AWS module handles non-existent regions.
-  `#2006 <https://github.com/wazuh/wazuh-packages/issues/2006>`__ Changed macOS packages building tool.
-  `#7498 <https://github.com/wazuh/wazuh-documentation/pull/7498>`__ Enhanced Wazuh macOS agent installation instructions.
-  `#2826 <https://github.com/wazuh/wazuh-packages/issues/2826>`__ Enhanced Windows agent signing procedure.
-  `#23466 <https://github.com/wazuh/wazuh/issues/23466>`__ Enhanced security by implementing a mechanism to prevent unauthorized uninstallation of the Wazuh agent on Linux endpoints.
-  `#24498 <https://github.com/wazuh/wazuh/issues/24498>`__ Enhanced integration with Microsoft Intune MDM to pull audit logs for security alert generation.
-  `#26137 <https://github.com/wazuh/wazuh/issues/26137>`__ Updated rootcheck old signatures.

RESTful API
^^^^^^^^^^^

-  `#24621 <https://github.com/wazuh/wazuh/pull/24621>`__ Created new endpoint for agent uninstall process.

Ruleset
^^^^^^^
-  `#21794 <https://github.com/wazuh/wazuh/pull/21794>`__ Created SCA policy for Microsoft Windows Server 2012 (non-R2).
-  `#21434 <https://github.com/wazuh/wazuh/pull/21434>`__ Reworked SCA policy for Microsoft Windows Server 2019.
-  `#24667 <https://github.com/wazuh/wazuh/pull/24667>`__ Reworked SCA policy for Red Hat Enterprise Linux 9.
-  `#24991 <https://github.com/wazuh/wazuh/pull/24991>`__ Reworked SCA policy for Microsoft Windows Server 2012 R2.
-  `#24957 <https://github.com/wazuh/wazuh/pull/24957>`__ Reworked SCA policy for Ubuntu 18.04 LTS and fixed incorrect checks in Ubuntu 22.04 LTS.
-  `#24969 <https://github.com/wazuh/wazuh/pull/24969>`__ Reworked SCA policy for Amazon Linux 2.
-  `#24975 <https://github.com/wazuh/wazuh/pull/24975>`__ Reworked SCA policy for SUSE Linux Enterprise 15.
-  `#24992 <https://github.com/wazuh/wazuh/pull/24992>`__ Reworked SCA policy for Apple macOS 13.0 Ventura.
-  `#25710 <https://github.com/wazuh/wazuh/pull/25710>`__ Reworked SCA policy for Microsoft Windows 11 Enterprise.

Other
^^^^^

-  `#25374 <https://github.com/wazuh/wazuh/issues/25374>`__ Updated the embedded Python version up to 3.10.15.
-  `#25324 <https://github.com/wazuh/wazuh/pull/25324>`__ Upgraded ``certifi`` and removed unused packages.
-  `#25893 <https://github.com/wazuh/wazuh/pull/25893>`__ Upgraded external ``cryptography`` library dependency version to 43.0.1.
-  `#26252 <https://github.com/wazuh/wazuh/pull/26252>`__ Upgraded external ``starlette`` and ``uvicorn`` dependencies.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#6964 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/6964>`__ Added sample data for YARA.
-  `#6963 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/6963>`__ Updated malware detection group values in data sources.
-  `#6938 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6938>`__ Changed the registration ID of the Settings application for compatibility with OpenSearch Dashboards 2.16.0.
-  `#6964 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/6964>`__ Changed Malware detection dashboard visualizations.
-  `#6945 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6945>`__ Removed agent RBAC filters from dashboard queries.
-  `#7001 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7001>`__ Removed ``GET /elastic/statistics`` API endpoint.
-  `#6968 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/6968>`__ Added a custom filter and visualization for ``vulnerability.under_evaluation`` field. `#7044 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7044>`__ `#7046 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7046>`__
-  `#7032 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7032>`__ Changed MITRE ATT&CK overview description.
-  `#7041 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7041>`__ Changed the agents summary in overview with no results to an agent deployment help message.
-  `#7036 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7036>`__ Changed malware feature description.
-  `#7033 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7033>`__ Changed the font size of the KPI subtitles and the features descriptions.
-  `#7059 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7059>`__ Changed the initial width of the default columns for each selected field.
-  `#7038 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7038>`__ Removed VirusTotal application in favor of Malware Detection.
-  `#7058 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7058>`__ Add vulnerabilities card to agent details page.
-  `#7112 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7112>`__ Added an **Agents management** menu and moved the sections: **Endpoint Groups** and **Endpoint Summary** which changed its name to **Summary**.
-  `#7119 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7119>`__ Added ability to filter from File Integrity Monitoring registry inventory.
-  `#7119 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7119>`__ Added new field columns and ability to select the visible fields in the File Integrity Monitoring Files and Registry tables.
-  `#7081 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7081>`__ Added filter by value to document details fields.
-  `#7135 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7135>`__ Added pinned agent mechanic to inventory data, stats, and configuration for consistent functionality.
-  `#7057 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7057>`__ Changed the warning icon in events view to an info icon.
-  `#7034 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7034>`__ Changed feature container margins to ensure consistent separation and uniform design.
-  `#7089 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7089>`__ Changed inventory, stats and configuration page to use tabs.
-  `#7156 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7156>`__ Added ability to edit the ``wazuh.updates.disabled`` configuration setting from the UI.
-  `#7149 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7149>`__ Changed styles in the register agent view for consistency of styles across views.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#24620 <https://github.com/wazuh/wazuh/pull/24620>`__ Added support for multiple Certificate Authorities files in the indexer connector.
-  `#24529 <https://github.com/wazuh/wazuh/pull/24529>`__ Removed hardcoded cipher text size from the RSA decryption method.
-  `#25094 <https://github.com/wazuh/wazuh/pull/25094>`__ Avoided infinite loop while updating the vulnerability detector content.
-  `#26223 <https://github.com/wazuh/wazuh/pull/26223>`__ Fixed repeated OS vulnerability reports.
-  `#25479 <https://github.com/wazuh/wazuh/issues/25479>`__ Fixed inconsistencies between reported context and vulnerability data.
-  `#26073 <https://github.com/wazuh/wazuh/pull/26073>`__ Fixed concurrency issues in LRU caches.
-  `#26232 <https://github.com/wazuh/wazuh/pull/26232>`__ Removed all CVEs related to a deleted agent from the indexer.
-  `#26922 <https://github.com/wazuh/wazuh/pull/26922>`__ Prevented an infinite loop when indexing events in the Vulnerability Detector.
-  `#26842 <https://github.com/wazuh/wazuh/pull/26842>`__ Fixed segmentation fault in ``DescriptionsHelper::vulnerabilityDescription``.
-  `#24034 <https://github.com/wazuh/wazuh/pull/24034>`__ Fixed vulnerability scanner re-scan triggers in cluster environment.
-  `#23266 <https://github.com/wazuh/wazuh/issues/23266>`__ Updated CURL version to 8.10.0.
-  `#27145 <https://github.com/wazuh/wazuh/pull/27145>`__ Fixed an issue where elements in the delayed list were not purged when changing nodes.
-  `#27145 <https://github.com/wazuh/wazuh/pull/27145>`__ Added logic to avoid re-scanning disconnected agents.

Wazuh agent
^^^^^^^^^^^

-  `#25452 <https://github.com/wazuh/wazuh/pull/25452>`__ Fixed macOS agent upgrade timeout.
-  `#24531 <https://github.com/wazuh/wazuh/pull/24531>`__ Fixed macOS agent startup error by properly redirecting ``cat`` command errors in ``wazuh-control``.
-  `#24516 <https://github.com/wazuh/wazuh/pull/24516>`__ Fixed inconsistent package inventory size information in Syscollector across operating systems.
-  `#24125 <https://github.com/wazuh/wazuh/pull/24125>`__ Fixed missing Python path locations for macOS in Data Provider.
-  `#25429 <https://github.com/wazuh/wazuh/pull/25429>`__ Fixed permission error on Windows 11 agents after remote upgrade.
-  `#24387 <https://github.com/wazuh/wazuh/pull/24387>`__ Fixed increase of the variable containing file size in FIM for Windows.
-  `#25699 <https://github.com/wazuh/wazuh/pull/25699>`__ Fixed timeout issue when upgrading Windows agent via WPK.
-  `#26748 <https://github.com/wazuh/wazuh/pull/26748>`__ Allowed unknown syslog identifiers in Logcollector's journald reader.
-  `#26828 <https://github.com/wazuh/wazuh/pull/26828>`__ Prevented agent termination during package upgrades in containers by removing redundant kill commands.
-  `#26861 <https://github.com/wazuh/wazuh/pull/26861>`__ Fixed handle leak in FIM's realtime mode on Windows.
-  `#26900 <https://github.com/wazuh/wazuh/pull/26900>`__ Fixed errors on AIX 7.2 by adapting the ``blibpath`` variable.
-  `#26944 <https://github.com/wazuh/wazuh/pull/26944>`__ Sanitized agent paths to prevent issues with parent folder references.
-  `#26633 <https://github.com/wazuh/wazuh/pull/26633>`__ Fixed an issue in the DEB package that prevented the agent from restarting after an upgrade.
-  `#26944 <https://github.com/wazuh/wazuh/pull/26944>`__ Improved file path handling in agent communications to avoid references to parent folders.
-  `#27054 <https://github.com/wazuh/wazuh/pull/27054>`__ Set RPM package vendor to ``UNKNOWN_VALUE`` when the value is missing.
-  `#27059 <https://github.com/wazuh/wazuh/issues/27059>`__ Updated Solaris package generation to use the correct ``wazuh-packages`` reference.

Ruleset
^^^^^^^

-  `#22597 <https://github.com/wazuh/wazuh/pull/22597>`__ Fixed logical errors in Windows Server 2022 SCA checks.
-  `#25224 <https://github.com/wazuh/wazuh/pull/25224>`__ Fixed incorrect regulatory compliance in several Windows rules.
-  `#24733 <https://github.com/wazuh/wazuh/pull/24733>`__ Fixed incorrect checks in Ubuntu 22.04 LTS.
-  `#25190 <https://github.com/wazuh/wazuh/pull/25190>`__ Removed a check with high CPU utilization in multiple SCA policies.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7001 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7001>`__ Fixed issue where read-only users could not access the Statistics application.
-  `#7047 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7047>`__ Fixed the filter being displayed cropped on screens of 575px to 767px in the vulnerability detection module.
-  `#7029 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7029>`__ Fixed no-agent alert appearing with a selected agent in the agent-welcome view.
-  `#7042 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7042>`__ Fixed security policy exception when it contained deprecated actions.
-  `#7048 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7048>`__ Fixed export of formatted CSV data with special characters from tables.
-  `#7077 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7077>`__ Fixed filter management to prevent hiding when adding multiple filters.
-  `#7120 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7120>`__ Fixed loading state of the agents status chart in the home overview.
-  `#7075 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7075>`__ Fixed border on cells in events that disappear when clicked.
-  `#7116 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7116>`__ Fixed the Mitre ATT&CK exception in the agent view, the redirections of **ID**, **Tactics**, **Dashboard Icon** and **Event Icon** in the drop-down menu, and the card not displaying information when the flyout was opened.
-  `#7047 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7047>`__ Fixed the filter displaying cropped on screens of 575px to 767px in vulnerability detection module.
-  `#7119 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7119>`__ Fixed ability to filter from files inventory details flyout of File Integrity Monitoring.
-  `#7122 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7122>`__ Removed processes state column in macOS agents.
-  `#7160 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7160>`__ Fixed invalid date filter applied on FIM details flyout.
-  `#7156 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7156>`__ Fixed the **Check updates** UI being displayed despite being configured as disabled.
-  `#7151 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7151>`__ Fixed filter by value in document details not working in Safari.
-  `#7167 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7167>`__ Fixed error message to prevent passing non-string values to the Wazuh logger.
-  `#7177 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7177>`__ Fixed the rendering of the ``data.vulnerability.reference`` field in the table and flyout.
-  `#7072 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7072>`__ Fixed column reordering feature.
-  `#7161 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7161>`__ Fixed endpoint group module name and indexer management order.
-  `#440 <https://github.com/wazuh/wazuh-dashboard/issues/440>`__ Fixed incorrect or empty Wazuh API version displayed after upgrade.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.10.0/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.10.0/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.10.0/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.10.0/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.10.0/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.10.0/CHANGELOG.md>`__

-  wazuh/wazuh-qa-automation
-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.10.0/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.10.0/CHANGELOG.md>`__
