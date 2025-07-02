.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.13.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.13.0 Release notes - TBD
==========================

This section lists the changes in version 4.13.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

Highlights
----------




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

RESTful API
^^^^^^^^^^^

- `#29524 <https://github.com/wazuh/wazuh/pull/29524>`__ Added server UUID to the `/manager/info` endpoint.
- `#29954 <https://github.com/wazuh/wazuh/pull/29954>`__ Added support for hot ruleset reload via API.

Ruleset
^^^^^^^

- `#29269 <https://github.com/wazuh/wazuh/pull/29269>`__ Added SCA content for CentOS Stream 9.
- `#29653 <https://github.com/wazuh/wazuh/pull/29653>`__ Added IOCs and new rules to improve the 4.x ruleset.
- `#29139 <https://github.com/wazuh/wazuh/pull/29139>`__ Added SCA content for Oracle Linux 10.
- `#28790 <https://github.com/wazuh/wazuh/pull/28790>`__ Added rule to minimize Windows event flooding on the manager.

Other
^^^^^

- `#29489 <https://github.com/wazuh/wazuh/pull/29489>`__ Updated Python dependencies: `setuptools`, `Jinja2`, and `PyJWT`.
- `#28646 <https://github.com/wazuh/wazuh/pull/28646>`__ Upgraded embedded Python interpreter to 3.10.16.
- `#29735 <https://github.com/wazuh/wazuh/pull/29735>`__ Upgraded `h11` to 0.16.0 and `httpcore` to 1.0.9.
- `#28564 <https://github.com/wazuh/wazuh/pull/28564>`__ Removed unused Azure Python dependencies.

Wazuh dashboard
^^^^^^^^^^^^^^^

- `#7368 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7368>`__ `#7461 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7461>`__ `#7476 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7476>`__ `#7475 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7475>`__ `#7513 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7513>`__ Added ``It Hygiene`` application.
- `#7368 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7368>`__ Added hardware and system information to the agent overview.
- `#7379 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7379>`__ `#7513 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7513>`__ Added persistence for selected columns and page size in data grid settings.
- `#7373 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7373>`__ `#7449 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7449>`__ `#7475 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7475>`__ Added the ability to manage the sample data from FIM, IT Hygiene and vulnerabilities inventories prefixes.
- `#7443 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7443>`__ Added back button to Deploy Agent page that redirects to Endpoints Summary.
- `#7412 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7412>`__ Added UUID field to the APIs table.
- `#7373 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7373>`__ Moved ``/elastic/samplealerts`` API endpoints to ``/indexer/samplealerts``.
- `#7368 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7368>`__ `#7482 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7482>`__ `#7538 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7538>`__ Changed FIM inventory to display information ingested by the indexer.
- `#7430 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7430>`__ Changed macOS agent startup command.
- `#7489 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7489>`__ Removed the cluster restart warning on rules, decoders and CDB lists.
- `#7368 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7368>`__ Removed ``Inventory data`` view from agent overview.
- `#7475 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7475>`__ Removed ``vulnerability.pattern`` setting.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

- `#29181 <https://github.com/wazuh/wazuh/pull/29181>`__ Fixed missing agent version handling in Vulnerability Detector.
- `#29624 <https://github.com/wazuh/wazuh/pull/29624>`__ Fixed race condition in agent status synchronization between worker and master.
- `#30534 <https://github.com/wazuh/wazuh/pull/30534>`__ Fixed agent-group assignment for missing agents with improved error handling.

Wazuh agent
^^^^^^^^^^^

- `#29312 <https://github.com/wazuh/wazuh/pull/29312>`__ Fixed incorrect event handling in the Custom logs bucket.
- `#29317 <https://github.com/wazuh/wazuh/pull/29317>`__ Fixed Azure blob download race condition.
- `#28962 <https://github.com/wazuh/wazuh/pull/28962>`__ Fixed false FIM reports and configuration upload issues.
- `#29502 <https://github.com/wazuh/wazuh/pull/29502>`__ Fixed incorrect IPv6 format reported by WindowsHelper.
- `#29561 <https://github.com/wazuh/wazuh/pull/29561>`__ Fixed hidden port detection and netstat fallback.
- `#29905 <https://github.com/wazuh/wazuh/pull/29905>`__ Replaced `select()` with `sleep()` in Logcollector to avoid Docker-related errors.
- `#30060 <https://github.com/wazuh/wazuh/pull/30060>`__ Fixed NetNTLMv2 exposure by filtering UNC paths and mapped drives in Windows agent.
- `#29820 <https://github.com/wazuh/wazuh/pull/29820>`__ Fixed Windows agent not starting after manual upgrade by deferring service start to post-install.

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

Wazuh dashboard
^^^^^^^^^^^^^^^

- `#7368 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7368>`__ Fixed a problem in Vulnerabilities > Dashboard and Inventory when there are no indices matching with the index pattern.
- `#7425 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7425>`__ Fixed double backslash warning on xml editor.
- `#7422 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7422>`__ Fixed the X-axis label in the ``Vulnerabilities by year of publication`` visualization.
- `#7501 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7501>`__ Fixed a bug in Rule details flyout, where it didn't map all the compliances.
- `#7540 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7540>`__ Fixed the Windows service name in Deploy new agent.
- `#7368 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7368>`__ Removed ``GET /api/syscollector`` API endpoint.
- `#7368 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7368>`__ Removed inventory data report and ``POST /reports/agents/{agentID}/inventory`` API endpoint.
- `#7483 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7483>`__ Removed the ``enrollment.password`` field from the ``/utils/configuration`` endpoint response to prevent unauthorized agent registration by users with read-only API roles.

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
