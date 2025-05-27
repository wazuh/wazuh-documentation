.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.12.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.12.0 Release notes - 7 May 2025
=================================

This section lists the changes in version 4.12.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

Highlights
----------

Wazuh 4.12.0 introduces functional improvements that expand the platform’s capabilities and compatibility. This release supports ARM architecture in central components, allowing Wazuh to run on a wider range of hardware. It also enhances threat intelligence by adding CTI references to the CVE data, providing better context for vulnerabilities. Additionally, it introduces eBPF support for the File Integrity Monitoring (FIM) module, enabling more efficient and modern monitoring on Linux endpoints.

-  `ARM architecture support in central components <https://github.com/wazuh/wazuh/issues/26083>`__: The Wazuh manager, indexer, and dashboard now support ARM-based systems, offering greater deployment flexibility.
-  `CTI links to CVE information <https://github.com/wazuh/wazuh/issues/28220>`__: Vulnerability Detection module now includes CTI references within the CVE details, offering enriched context and threat intelligence to aid in vulnerability assessment.
-  `Improved file integrity monitoring with eBPF support <https://github.com/wazuh/wazuh/issues/27598>`__: The file integrity monitoring module now supports eBPF on Linux, improving who-data monitoring and system visibility.
-  `New SCA policy for Distribution Independent Linux endpoints <https://github.com/wazuh/wazuh/issues/26837>`__: A new Security Configuration Assessment (SCA) policy is now available for Wazuh Linux agents.

Breaking changes
----------------

-  OpenSearch 2.19.1 and Apache Lucene upgrade: Wazuh 4.12.0 upgrades to OpenSearch 2.19.1 and updates the Apache Lucene version. This change affects compatibility with previous versions. As a result, **downgrades are not supported**. Once you upgrade the Wazuh indexer to version 4.12.0, you cannot revert to an earlier version.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#26652 <https://github.com/wazuh/wazuh/pull/26652>`__ Added new compilation flags for the Vulnerability Detection module.
-  `#26083 <https://github.com/wazuh/wazuh/issues/26083>`__ Added support for central components in ARM architectures.
-  `#28220 <https://github.com/wazuh/wazuh/issues/28220>`__ Added functionality to navigate to CTI links related to specific CVE detections from states and alerts.
-  `#27614 <https://github.com/wazuh/wazuh/pull/27614>`__ Updated ``curl`` dependency to ``8.11.0``.
-  `#28298 <https://github.com/wazuh/wazuh/pull/28298>`__ Upgraded ``cryptography`` package to version ``44.0.1``.
-  `#28047 <https://github.com/wazuh/wazuh/pull/28047>`__ Converted server logs timestamp to UTC.
-  `#28149 <https://github.com/wazuh/wazuh/pull/28149>`__ Removed restriction for ``aws_profile`` in Security Lake.
-  `#28038 <https://github.com/wazuh/wazuh/pull/28038>`__ Removed error logs when the response is ``409`` for certain OpenSearch calls.
-  `#27451 <https://github.com/wazuh/wazuh/pull/27451>`__ Upgraded packages: ``python-multipart`` to ``0.0.20``, ``starlette`` to ``0.42.0``, and ``Werkzeug`` to ``3.1.3``.
-  `#27990 <https://github.com/wazuh/wazuh/pull/27990>`__ Removed warning about events in ``cloudwatchlogs``.
-  `#27603 <https://github.com/wazuh/wazuh/pull/27603>`__ Added package condition field in indexed vulnerabilities.

Wazuh agent
^^^^^^^^^^^

-  `#27956 <https://github.com/wazuh/wazuh/pull/27956>`__ Added eBPF-based integration to support *whodata* in FIM.
-  `#28416 <https://github.com/wazuh/wazuh/pull/28416>`__ Added support for the ``riskDetections`` relationship in MS Graph.
-  `#28389 <https://github.com/wazuh/wazuh/pull/28389>`__ Added time delay option in MS Graph integration to prevent log loss.
-  `#28276 <https://github.com/wazuh/wazuh/pull/28276>`__ Added page size option to MS Graph integration.
-  `#28388 <https://github.com/wazuh/wazuh/pull/28388>`__ Implemented Journald rotation detection in *Logcollector*.

Ruleset
^^^^^^^

-  `#26732 <https://github.com/wazuh/wazuh/issues/26732>`__ Added SCA content for Windows Server 2025.
-  `#26736 <https://github.com/wazuh/wazuh/issues/26736>`__ Added SCA content for Fedora 41.
-  `#26837 <https://github.com/wazuh/wazuh/issues/26837>`__ Created SCA policy for Distribution Independent Linux.
-  `#23194 <https://github.com/wazuh/wazuh/issues/23194>`__ Created SCA policy for Ubuntu 24.04 LTS.
-  `#26982 <https://github.com/wazuh/wazuh/issues/26982>`__ Improved SCA rule for macOS 15.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7182 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7182>`__ Added setting to limit the number of rows in CSV reports.
-  `#7306 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7306>`__ Added ``vulnerability.scanner.reference`` field containing the CTI reference of the vulnerability.
-  `#7192 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7192>`__ Refined queue usage visualizations in **Statistics**.
-  `#7390 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7390>`__ Removed revision number from **About** page.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#26720 <https://github.com/wazuh/wazuh/pull/26720>`__ Fixed inconsistent vulnerability severity categorization by correcting CVSS version prioritization.
-  `#26769 <https://github.com/wazuh/wazuh/pull/26769>`__ Fixed a potential crash in *Wazuh-DB* by improving the PID parsing method.
-  `#28185 <https://github.com/wazuh/wazuh/pull/28185>`__ Fixed concurrent mechanism on column family ``RocksDB``.
-  `#28503 <https://github.com/wazuh/wazuh/pull/28503>`__ Fixed unused variables in *Analysisd*.
-  `#29050 <https://github.com/wazuh/wazuh/pull/29050>`__ Fixed *Analysisd* startup failure caused by mixing static and dynamic rules with the same ID.
-  `#27834 <https://github.com/wazuh/wazuh/pull/27834>`__ Fixed crash in Vulnerability Scanner when processing delayed events during agent re-scan.
-  `#26679 <https://github.com/wazuh/wazuh/pull/26679>`__ Improved signal handling during process stop.
-  `#27750 <https://github.com/wazuh/wazuh/pull/27750>`__ Improved cleanup logic for the content folder in the VD module.
-  `#27806 <https://github.com/wazuh/wazuh/pull/27806>`__ Sanitized invalid size values from package data provider events.
-  `#26704 <https://github.com/wazuh/wazuh/pull/26704>`__ Fixed crash when reading email alerts missing the ``email_to`` attribute.
-  `#29179 <https://github.com/wazuh/wazuh/pull/29179>`__ Fixed offset errors by updating the DB only after processing events.

Wazuh agent
^^^^^^^^^^^

-  `#26647 <https://github.com/wazuh/wazuh/pull/26647>`__ Fixed a bug that could cause *wazuh-modulesd* to crash at startup.
-  `#26289 <https://github.com/wazuh/wazuh/pull/26289>`__ Fixed incorrect UTF-8 character validation in FIM. Thanks to `@zbalkan <https://github.com/zbalkan>`__.
-  `#27100 <https://github.com/wazuh/wazuh/pull/27100>`__ Improved URL validation in *Maltiverse* integration.
-  `#28005 <https://github.com/wazuh/wazuh/pull/28005>`__ Fixed issue in *Syscollector* where package sizes were reported as negative.
-  `#29161 <https://github.com/wazuh/wazuh/pull/29161>`__ Fixed enrollment failure on Solaris 10 caused by unsupported socket timeout.
-  `#29214 <https://github.com/wazuh/wazuh/pull/29214>`__ Fixed memory issue in the *wazuh-agentd* argument parser.
-  `#28928 <https://github.com/wazuh/wazuh/pull/28928>`__ Fixed *WPK* package upgrades for DEB when upgrading from version 4.3.11 or earlier.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7185 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7185>`__ Fixed issue where adding the same filter twice wouldn't display it in the search bar.
-  `#7171 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7171>`__ Fixed rendering of rows in **CDB list** table when they start with quotes.
-  `#7206 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7206>`__ Fixed width of long fields in the document detail flyout.
-  `#7267 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7267>`__ Fixed logging of UI logs due to an undefined logger property.
-  `#7278 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7278>`__ Fixed **TOP-5-SO** filter management in **Endpoints** > **Summary**.
-  `#7304 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7304>`__ Fixed CSV export not filtering by time range.
-  `#7336 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7336>`__ Fixed agent view not displaying the latest agent state.
-  `#7377 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7377>`__ Fixed saved queries not appearing in the search bar.
-  `#7401 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7401>`__ Fixed monitoring cronjob infinite retries in case of a request exception.
-  `#7399 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7399>`__ Fixed double scroll bar in **Discover**.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.12.0/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.12.0/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.12.0/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.12.0/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.12.0/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.12.0/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.12.0/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.12.0/CHANGELOG.md>`__
