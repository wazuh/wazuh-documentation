.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.10.1 has been released. Check out our release notes to discover the changes and additions of this release.

4.10.1 Release notes - 16 January 2025
==========================

This section lists the changes in version 4.10.1. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7233 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7233>`__ Added comma separators to numbers.
-  `#7226 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7226>`__ Moved the ability to manage the visibility of fields in **Events** and **Vulnerability Detection** > **Inventory** tables from the **Columns** button to a new **Available fields** button, enhancing the performance of the view.
-  `#7226 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7226>`__ Changed the color of the **Export formatted** button in data grid tables to match the color of the rest of the table buttons.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#27502 <https://github.com/wazuh/wazuh/pull/27502>`__ Handled HTTP ``413`` response code in the Indexer connector.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.10.1/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.10.1/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.10.1/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.10.1/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.10.1/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.10.1/CHANGELOG.md>`__

-  `wazuh/wazuh-qa <https://github.com/wazuh/wazuh-qa/blob/v4.10.1/CHANGELOG.md>`__
-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.10.1/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.10.1/CHANGELOG.md>`__
