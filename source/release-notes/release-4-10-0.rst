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

Packages
^^^^^^^^

-  `#3059 <https://github.com/wazuh/wazuh-packages/pull/3059>`__ Add a post-install validation for Wazuh manager and Filebeat in the WIA.
-  `#3088 <https://github.com/wazuh/wazuh-packages/pull/3088>`__ Removed OVA related files and references.
-  `#3089 <https://github.com/wazuh/wazuh-packages/pull/3089>`__ Deleted installation assistant related files and references.
-  `#3141 <https://github.com/wazuh/wazuh-packages/pull/3141>`__ Reverted update of the source branch in the unattended installer.

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

Wazuh agent
^^^^^^^^^^^

-  `#25452 <https://github.com/wazuh/wazuh/pull/25452>`__ Fixed macOS agent upgrade timeout.
-  `#24531 <https://github.com/wazuh/wazuh/pull/24531>`__ Fixed macOS agent startup error by properly redirecting ``cat`` command errors in ``wazuh-control``.
-  `#24516 <https://github.com/wazuh/wazuh/pull/24516>`__ Fixed inconsistent package inventory size information in Syscollector across operating systems.
-  `#24125 <https://github.com/wazuh/wazuh/pull/24125>`__ Fixed missing Python path locations for macOS in Data Provider.
-  `#25429 <https://github.com/wazuh/wazuh/pull/25429>`__ Fixed permission error on Windows 11 agents after remote upgrade.
-  `#24387 <https://github.com/wazuh/wazuh/pull/24387>`__ Fixed increase of the variable containing file size in FIM for Windows.
-  `#25699 <https://github.com/wazuh/wazuh/pull/25699>`__ Fixed timeout issue when upgrading Windows agent via WPK.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7001 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7001>`__ Fixed issue where read-only users could not access the Statistics application.
-  `#7047 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7047>`__ Fixed the filter being displayed cropped on screens of 575px to 767px in the vulnerability detection module.
-  `#7029 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7029>`__ Fixed no-agent alert appearing with a selected agent in the agent-welcome view.
-  `#7042 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7042>`__ Fixed security policy exception when it contained deprecated actions.
-  `#7048 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7048>`__ Fixed export of formatted CSV data with special characters from tables.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.10.0/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.10.0/CHANGELOG.md>`__
-  `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/blob/v4.10.0/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.10.0/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.10.0/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.10.0/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.10.0/CHANGELOG.md>`__

-  `wazuh/wazuh-qa <https://github.com/wazuh/wazuh-qa/blob/v4.10.0/CHANGELOG.md>`__
-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.10.0/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.10.0/CHANGELOG.md>`__
