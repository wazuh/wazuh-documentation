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

RESTful API
^^^^^^^^^^^

-  `#24621 <https://github.com/wazuh/wazuh/pull/24621>`__ Created new endpoint for agent uninstall process.

Other
^^^^^

-  `#25374 <https://github.com/wazuh/wazuh/issues/25374>`__ Updated the embedded Python version up to 3.10.15.
-  `#25324 <https://github.com/wazuh/wazuh/pull/25324>`__ Upgraded ``certifi`` and removed unused packages.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#6964 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/6964>`__ Added sample data for YARA.
-  `#6963 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/6963>`__ Updated malware detection group values in data sources.
-  `#6938 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6938>`__ Changed the registration ID of the Settings application for compatibility with OpenSearch Dashboards 2.16.0.
-  `#6964 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/6964>`__ Changed Malware detection dashboard visualizations.
-  `#6945 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6945>`__ Removed agent RBAC filters from dashboard queries.
-  `#7001 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7001>`__ Removed ``GET /elastic/statistics`` API endpoint.

Packages
^^^^^^^^

-  `#3059 <https://github.com/wazuh/wazuh-packages/pull/3059>`__ Add a post-install validation for Wazuh manager and Filebeat in the WIA.
-  `#3088 <https://github.com/wazuh/wazuh-packages/pull/3088>`__ Removed OVA related files and references.
-  `#3089 <https://github.com/wazuh/wazuh-packages/pull/3089>`__ Deleted installation assistant related files and references.
-  `#3125 <https://github.com/wazuh/wazuh-packages/pull/3125>`__ Revert replace source branch in Installation Assistant.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#24620 <https://github.com/wazuh/wazuh/pull/24620>`__ Added support for multiple Certificate Authorities files in the indexer connector.
-  `#24529 <https://github.com/wazuh/wazuh/pull/24529>`__ Removed hardcoded cipher text size from the RSA decryption method.
-  `#25094 <https://github.com/wazuh/wazuh/pull/25094>`__ Avoided infinite loop while updating the vulnerability detector content.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7001 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7001>`__  Fixed issue where read-only users could not access the Statistics application.

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
