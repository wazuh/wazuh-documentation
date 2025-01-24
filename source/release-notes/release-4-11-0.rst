.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.11.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.11.0 Release notes - TBD
==========================

This section lists the changes in version 4.11.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh agent
^^^^^^^^^^^

-  `#26706 <https://github.com/wazuh/wazuh/pull/26706>`__ Improved Syscollector hotfix coverage on Windows by integrating WMI and WUA APIs.
-  `#26782 <https://github.com/wazuh/wazuh/pull/26782>`__ Extended Syscollector capabilities to detect installed .pkg packages.
-  `#26236 <https://github.com/wazuh/wazuh/pull/26236>`__ Updated standard Python and NPM package location in Syscollector to align with common installation paths.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7193 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7193>`__ Refined the layout of the agent details view.
-  `#7195 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7195>`__ Changed the width of the command column, relocate argvs column and change the width of the rest of the columns in the table processes.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#25939 <https://github.com/wazuh/wazuh/pull/25939>`__ Fixed integration tests for Remoted to ensure proper execution.
-  `#26132 <https://github.com/wazuh/wazuh/pull/26132>`__ Enabled inventory synchronization in Vulnerability Detector when the Indexer module is disabled.
-  `#26378 <https://github.com/wazuh/wazuh/pull/26378>`__ Fixed concurrent access errors in the Vulnerability Detector's OS scan column family.

RESTful API
^^^^^^^^^^^

-  `#24621 <https://github.com/wazuh/wazuh/pull/24621>`__ Added the ``security:revoke`` action to the ``PUT /security/user/revoke`` endpoint.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.11.0/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.11.0/CHANGELOG.md>`__
-  `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/blob/v4.11.0/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.11.0/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.11.0/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.11.0/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.11.0/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.11.0/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.11.0/CHANGELOG.md>`__
