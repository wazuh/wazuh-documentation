.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.13.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.13.0 Release notes - TBD
==========================

This section lists the changes in version 4.13.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

Highlights
----------

The 4.13.0 release improves deployment flexibility, enhances centralized data access, and strengthens platform resilience. Key updates include a more stable and secure Docker deployment process and support for global queries in the File Integrity Monitoring (FIM) and system inventory modules among others.

-  `Agent Docker images <https://github.com/wazuh/wazuh-docker/issues/1790>`__: Docker images for the Wazuh agent are now available.
-  `Global queries for FIM and system inventory <https://github.com/wazuh/wazuh/issues/27894>`__: Added support for global queries on data collected by the Wazuh agent. The FIM and inventory modules can now perform advanced searches and filtering on data stored in the Wazuh indexer. This enhances Wazuh's security and compliance capabilities and provides deeper insights into system status and configuration.
-  Reliability and performance improvements across the platform.
-  Multiple bug fixes in core components and the UI.
-  Updates based on recent security scans.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

- `#29232 <https://github.com/wazuh/wazuh/pull/29232>`__ Improved reports functionality to avoid duplicated daily FIM reports.
- `#29363 <https://github.com/wazuh/wazuh/pull/29363>`__ Optimized agent query endpoints.
- `#29406 <https://github.com/wazuh/wazuh/pull/29406>`__ Implemented RBAC resource cache with TTL support.
- `#29514 <https://github.com/wazuh/wazuh/pull/29514>`__ Improved Wazuh-DB protocol to support large HTTP requests and remove pagination.
- `#29515 <https://github.com/wazuh/wazuh/pull/29515>`__ Added HTTP client implementation to wazuh-db.
- `#29458 <https://github.com/wazuh/wazuh/pull/29458>`__ Added hot ruleset reload support to Analysisd.
- `#29916 <https://github.com/wazuh/wazuh/pull/29916>`__ Enabled CVE re-indexing when documents change in Vulnerability Detector.
- `#29153 <https://github.com/wazuh/wazuh/pull/29153>`__ Separated control messages from remoted's connection handling.
- `#30504 <https://github.com/wazuh/wazuh/pull/30504>`__ Added sanity checks for hotfix values in Vulnerability Detector.
- `#27894 <https://github.com/wazuh/wazuh/issues/27894>`__ Added support for global queries of FIM and system inventory data.
- `#30851 <https://github.com/wazuh/wazuh/pull/30851>`__ Improved exception handling in the ``run_local`` SDK function.
- `#29135 <https://github.com/wazuh/wazuh/pull/29135>`__ Improved Authd connection management using epoll to handle concurrent agent registration requests more efficiently.
- `#31114 <https://github.com/wazuh/wazuh/pull/31114>`__ Added a single writer buffer manager instance for each indexer connector instance.

Wazuh agent
^^^^^^^^^^^

- `#29391 <https://github.com/wazuh/wazuh/pull/29391>`__ Added support for Rocky Linux and AlmaLinux in the upgrade module.
- `#29393 <https://github.com/wazuh/wazuh-packages/pull/29393>`__ Added handling of CentOS 9 SCA files in package specs.
- `#29139 <https://github.com/wazuh/wazuh/pull/29139>`__ Added SCA support for Oracle Linux 10.
- `#30556 <https://github.com/wazuh/wazuh/pull/30556>`__ Added Rootcheck rule to detect root-owned files with world-writable permissions.
- `#29426 <https://github.com/wazuh/wazuh/pull/29426>`__ Improved agent synchronization to reduce redundant payload transfers.
- `#28688 <https://github.com/wazuh/wazuh/pull/28688>`__ Improved Syscollector to report only Python packages managed by ``dpkg``.
- `#29399 <https://github.com/wazuh/wazuh/issues/29399>`__ Improved ``wazuh-db`` JSON handling performance.
- `#29930 <https://github.com/wazuh/wazuh/pull/29930>`__ Enhanced Azure module logging.
- `#29940 <https://github.com/wazuh/wazuh/pull/29940>`__ Improved restart behavior on macOS agents after upgrade.
- `#29443 <https://github.com/wazuh/wazuh/pull/29443>`__ Standardized service timeouts across components.
- `#30377 <https://github.com/wazuh/wazuh/pull/30377>`__ Added MS Graph token validation before performing requests.
- `#30763 <https://github.com/wazuh/wazuh/pull/30763>`__ Added support for UTF-8 characters in file paths in FIM.
- `#30637 <https://github.com/wazuh/wazuh/pull/30637>`__ Removed ``internal_key`` from query filters.

RESTful API
^^^^^^^^^^^

- `#29524 <https://github.com/wazuh/wazuh/pull/29524>`__ Added server UUID to the ``/manager/info`` endpoint.
- `#29589 <https://github.com/wazuh/wazuh/pull/29589>`__ Added ``/agents/summary`` endpoint.
- `#31459 <https://github.com/wazuh/wazuh/pull/31459>`__ Added ruleset reload endpoints.

Ruleset
^^^^^^^

- `#29269 <https://github.com/wazuh/wazuh/pull/29269>`__ Added SCA content for CentOS Stream 9.
- `#29653 <https://github.com/wazuh/wazuh/pull/29653>`__ Added IOCs and new rules to improve the 4.x ruleset.
- `#29139 <https://github.com/wazuh/wazuh/pull/29139>`__ Added SCA content for Oracle Linux 10.
- `#28790 <https://github.com/wazuh/wazuh/pull/28790>`__ Added rule to minimize Windows event flooding on the manager.

Other
^^^^^

- `#29610 <https://github.com/wazuh/wazuh/pull/29610>`__ Updated Python dependencies: ``setuptools``, ``Jinja2``, and ``PyJWT``.
- `#28646 <https://github.com/wazuh/wazuh/pull/28646>`__ Upgraded embedded Python interpreter to 3.10.16.
- `#29735 <https://github.com/wazuh/wazuh/pull/29735>`__ Upgraded ``h11`` to 0.16.0 and ``httpcore`` to 1.0.9.
- `#28564 <https://github.com/wazuh/wazuh/pull/28564>`__ Removed unused Azure Python dependencies.

Wazuh dashboard
^^^^^^^^^^^^^^^

- `#7368 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7368>`__ Added ``It Hygiene`` application. `#7461 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7461>`__ `#7476 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7476>`__ `#7475 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7475>`__ `#7513 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7513>`__ `#7582 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7582>`__ `#7588 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7588>`__
- `#7368 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7368>`__ Added hardware and system information to the agent overview.
- `#7379 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7379>`__ `#7513 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7513>`__ Added persistence for selected columns and page size in data grid settings.
- `#7373 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7373>`__ `#7449 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7449>`__ `#7475 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7475>`__ Added the ability to manage the sample data from FIM, IT Hygiene and vulnerabilities inventories prefixes.
- `#7443 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7443>`__ Added back button to Deploy Agent page that redirects to Endpoints Summary.
- `#7412 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7412>`__ Added UUID field to the APIs table.
- `#7373 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7373>`__ Moved ``/elastic/samplealerts`` API endpoints to ``/indexer/samplealerts``.
- `#7368 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7368>`__ `#7482 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7482>`__ `#7538 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7538>`__ Changed FIM inventory to display information ingested by the indexer.
- `#7430 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7430>`__ Changed macOS agent startup command.
- `#7368 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7368>`__ Removed ``Inventory data`` view from agent overview.
- `#7475 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7475>`__ Removed ``vulnerability.pattern`` setting.
- `#7368 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7368>`__ Removed ``GET /api/syscollector`` API endpoint.
- `#7368 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7368>`__ Removed inventory data report and ``POST /reports/agents/{agentID}/inventory`` API endpoint.
- `#7483 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7483>`__ Removed the ``enrollment.password`` field from the ``/utils/configuration`` endpoint response to prevent unauthorized agent registration by users with read-only API roles.
- `#7620 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7620>`__ Removed the cluster restart warning from **Rules**, **Decoders**, and **CDB lists**.
- `#7657 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7657>`__ Changed the manager reset button to reload in **Rules**, **Decoders**, and **CDB list**. `#7677 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7677>`__
- `#7484 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7484>`__ Reduced the number of API calls to retrieve agent summary information.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

- `#29181 <https://github.com/wazuh/wazuh/pull/29181>`__ Fixed missing agent version handling in Vulnerability Detector.
- `#29624 <https://github.com/wazuh/wazuh/pull/29624>`__ Fixed race condition in agent status synchronization between worker and master.
- `#30534 <https://github.com/wazuh/wazuh/pull/30534>`__ Fixed agent-group assignment for missing agents with improved error handling.
- `#30818 <https://github.com/wazuh/wazuh/pull/30818>`__ Fixed missing OS info updates in global inventory after first scan.
- `#31048 <https://github.com/wazuh/wazuh/pull/31048>`__ Fixed wazuh-db failure during agent restarts by switching the restart query to HTTP.
- `#30627 <https://github.com/wazuh/wazuh/pull/30627>`__ Fixed DFM graceful shutdown.
- `#30718 <https://github.com/wazuh/wazuh/pull/30718>`__ Fixed ``inode`` field as string in FIM JSON messages to ensure schema consistency.
- `#30837 <https://github.com/wazuh/wazuh/pull/30837>`__ Fixed duplicate OS vulnerabilities detected after an OS version change.

Wazuh agent
^^^^^^^^^^^

- `#29312 <https://github.com/wazuh/wazuh/pull/29312>`__ Fixed incorrect event handling in the Custom logs bucket.
- `#29317 <https://github.com/wazuh/wazuh/pull/29317>`__ Fixed Azure blob download race condition.
- `#28962 <https://github.com/wazuh/wazuh/pull/28962>`__ Fixed false FIM reports and configuration upload issues.
- `#29502 <https://github.com/wazuh/wazuh/pull/29502>`__ Fixed incorrect IPv6 format reported by WindowsHelper.
- `#29561 <https://github.com/wazuh/wazuh/pull/29561>`__ Fixed hidden port detection and netstat fallback.
- `#29905 <https://github.com/wazuh/wazuh/pull/29905>`__ Replaced ``select()`` with ``sleep()`` in Logcollector to avoid Docker-related errors.
- `#30060 <https://github.com/wazuh/wazuh/pull/30060>`__ Fixed NetNTLMv2 exposure by filtering UNC paths and mapped drives in Windows agent.
- `#29820 <https://github.com/wazuh/wazuh/pull/29820>`__ Fixed Windows agent not starting after manual upgrade by deferring service start to post-install.
- `#30552 <https://github.com/wazuh/wazuh/pull/30552>`__ Fixed precision loss in the FIM ``inode`` field for values greater than 2^53.
- `#30614 <https://github.com/wazuh/wazuh/pull/30614>`__ Fixed expanded file list in the logcollector ``getconfig`` output.
- `#31187 <https://github.com/wazuh/wazuh/pull/31187>`__ Fixed ``authd.pass`` ACL permissions to match ``client.keys`` security level in the Windows agent installer.

RESTful API
^^^^^^^^^^^

- `#29166 <https://github.com/wazuh/wazuh/pull/29166>`__ Fixed version sorting in agent list endpoint.
- `#28962 <https://github.com/wazuh/wazuh/pull/28962>`__ Fixed false positive detection during configuration uploading.

Ruleset
^^^^^^^

- `#29221 <https://github.com/wazuh/wazuh/pull/29221>`__ Fixed bugs in Windows 11 Enterprise SCA policy.
- `#29040 <https://github.com/wazuh/wazuh/pull/29040>`__ Fixed multiple SCA check errors in RHEL 9/10 and Rocky Linux 8/9.
- `#28982 <https://github.com/wazuh/wazuh/pull/28982>`__ Fixed diff logic in rootcheck that caused false negatives.
- `#28711 <https://github.com/wazuh/wazuh/pull/28711>`__ Fixed incorrect SCA results for RHEL 8 and CentOS 7.
- `#30827 <https://github.com/wazuh/wazuh/pull/30827>`__ Fixed false positives in Ubuntu 24.04 benchmark.

Wazuh dashboard
^^^^^^^^^^^^^^^

- `#7368 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7368>`__ Fixed a problem in **Vulnerabilities** > **Dashboard and Inventory** when there are no indices matching with the index pattern.
- `#7425 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7425>`__ Fixed double backslash warning on xml editor.
- `#7422 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7422>`__ Fixed the X-axis label in the ``Vulnerabilities by year of publication`` visualization.
- `#7501 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7501>`__ Fixed a bug in Rule details flyout, where it didn't map all the compliances.
- `#7540 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7540>`__ Fixed the Windows service name in Deploy new agent.
- `#7552 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7552>`__ Fixed an issue where filter values could change on navigation or pin/unpin actions, causing unexpected search results.
- `#7544 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7544>`__ Fixed an issue in the expanded table row where outdated information could appear when using the refresh button.
- `#7550 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7550>`__ Fixed a bug causing format issues in CSV reports.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.13.0/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.13.0/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.13.0/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.13.0/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.13.0/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.13.0/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.13.0/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.13.0/CHANGELOG.md>`__
