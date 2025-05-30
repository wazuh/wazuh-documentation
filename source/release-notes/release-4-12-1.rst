.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.12.1 has been released. Check out our release notes to discover the changes and additions of this release.

4.12.1 Release notes - TBD
==========================

This section lists the changes in version 4.12.1. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

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

Wazuh agent
^^^^^^^^^^^

- `#29391 <https://github.com/wazuh/wazuh/pull/29391>`__ Added support for Rocky Linux and AlmaLinux in the agent upgrade module.
- `#29393 <https://github.com/wazuh/wazuh-packages/pull/29393>`__ Added handling of CentOS 9 SCA files in package specs.
- `#29426 <https://github.com/wazuh/wazuh/pull/29426>`__ Improved agent synchronization to reduce redundant payload transfers.
- `#28688 <https://github.com/wazuh/wazuh/pull/28688>`__ Improved Syscollector to report only Python packages managed by ``dpkg``.
- `#29399 <https://github.com/wazuh/wazuh/issues/29399>`__ Improved ``wazuh-db`` JSON handling performance by updating external dependencies.

RESTful API
^^^^^^^^^^^

- `#29524 <https://github.com/wazuh/wazuh/pull/29524>`__ Added the server UUID to the ``/manager/info`` endpoint.

Ruleset
^^^^^^^

- `#29269 <https://github.com/wazuh/wazuh/pull/29269>`__ Added SCA content for CentOS Stream 9.
- `#29653 <https://github.com/wazuh/wazuh/pull/29653>`__ Added IOCs and rules to improve the Wazuh 4.x ruleset.

Other
^^^^^

- `#29489 <https://github.com/wazuh/wazuh/pull/29489>`__ Updated Python dependencies: ``setuptools``, ``Jinja2``, and ``PyJWT``.

Wazuh dashboard
^^^^^^^^^^^^^^^

- `#7412 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7412>`__ Added UUID field to the APIs table.
- `#7430 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7430>`__ Changed macOS agent startup command.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

- `#29181 <https://github.com/wazuh/wazuh/pull/29181>`__ Fixed missing agent version handling in Vulnerability Detector.
- `#29624 <https://github.com/wazuh/wazuh/pull/29624>`__ Fixed race condition in agent status synchronization between worker and master.

Wazuh agent
^^^^^^^^^^^

- `#29312 <https://github.com/wazuh/wazuh/pull/29312>`__ Fixed incorrect handling of events in the Custom logs bucket.

Ruleset
^^^^^^^

- `#29221 <https://github.com/wazuh/wazuh/pull/29221>`__ Fixed bugs in the Microsoft Windows 11 Enterprise SCA policy.

Wazuh dashboard
^^^^^^^^^^^^^^^

- `#7422 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7422>`__ Fixed the X-axis label in the ``Vulnerabilities by year of publication`` visualization.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.12.1/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.12.1/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.12.1/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.12.1/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.12.1/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.12.1/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.12.1/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.12.1/CHANGELOG.md>`__
