.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.11.1 has been released. Check out our release notes to discover the changes and additions of this release.

4.11.1 Release notes - TBD
==========================

This section lists the changes in version 4.11.1. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh agent
^^^^^^^^^^^

-  `#28075 <https://github.com/wazuh/wazuh/pull/28075>`__ Changed ``ms-graph`` page size to ``50``.
-  `#28045 <https://github.com/wazuh/wazuh/pull/28045>`__ Removed ``ca.com`` domain filter from the Rootcheck malware ruleset.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7318 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7318>`__ Added missing fields to the default fields list of the alerts index pattern.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#28294 <https://github.com/wazuh/wazuh/pull/28294>`__ Fixed the OS CPE build for package scans with data from Wazuh-DB.
-  `#28292 <https://github.com/wazuh/wazuh/pull/28292>`__ Added delete by query logic when indexer is disabled.
-  `#28396 <https://github.com/wazuh/wazuh/pull/28396>`__ Fixed heap buffer overflow in Analysisd rule parser.

Wazuh agent
^^^^^^^^^^^

-  `#28339 <https://github.com/wazuh/wazuh/pull/28339>`__ Improved agent connectivity.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7299 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7299>`__ Fixed documentation links related to agent management.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.11.1/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.11.1/CHANGELOG.md>`__
-  `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/blob/v4.11.1/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.11.1/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.11.1/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.11.1/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.11.1/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.11.1/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.11.1/CHANGELOG.md>`__
