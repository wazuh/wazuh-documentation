.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.12.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.12.0 Release notes - TBD
==========================

This section lists the changes in version 4.12.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

Highlights
----------

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

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#26720 <https://github.com/wazuh/wazuh/pull/26720>`__ Fixed inconsistent vulnerability severity categorization by correcting CVSS version prioritization.
-  `#26769 <https://github.com/wazuh/wazuh/pull/26769>`__ Fixed a potential crash in Wazuh-DB by improving the PID parsing method.
-  `#28185 <https://github.com/wazuh/wazuh/pull/28185>`__ Fixed concurrent mechanism on column family ``RocksDB``.
-  `#28503 <https://github.com/wazuh/wazuh/pull/28503>`__ Fixed unused variables in ``Analysisd``.

Wazuh agent
^^^^^^^^^^^

-  `#26647 <https://github.com/wazuh/wazuh/pull/26647>`__ Fixed a bug that might cause ``wazuh-modulesd`` to crash on startup.
-  `#26289 <https://github.com/wazuh/wazuh/pull/26289>`__ Fixed invalid UTF-8 character checking in FIM. Thanks to `@zbalkan <https://github.com/zbalkan>`__.
-  `#27100 <https://github.com/wazuh/wazuh/pull/27100>`__ Improved URL validations in ``Maltiverse`` integration.

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
