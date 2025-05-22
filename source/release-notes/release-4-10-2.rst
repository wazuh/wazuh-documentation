.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.10.2 has been released. Check out our release notes to discover the changes and additions of this release.

4.10.2 Release notes - 22 May 2025
==================================

This section lists the changes in version 4.10.2. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#29633 <https://github.com/wazuh/wazuh/pull/29633>`__ Improved SCA and Syscheck decoders. (Backport from 4.11.0)

Other
^^^^^

-  `#29669 <https://github.com/wazuh/wazuh/pull/29669>`__ Upgraded ``python-multipart`` to 0.0.20, ``starlette`` to 0.42.0, ``Werkzeug`` to 3.1.3 (backport from 4.12.0), ``h11`` to 0.16.0, and ``httpcore`` to 1.0.9.

Wazuh dashboard
^^^^^^^^^^^^^^^

- `#7433 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7433>`__ Added a test to verify that table column fields are known, and updated the known fields of the alerts index with new ones.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#29612 <https://github.com/wazuh/wazuh/pull/29612>`__ Enabled inventory synchronization in Vulnerability Detector when the Indexer module is disabled. (Backport from 4.11.0)
-  `#29613 <https://github.com/wazuh/wazuh/pull/29613>`__ Fixed OS CPE build for package scans with data from Wazuh-DB. (Backport from 4.11.1)
-  `#29599 <https://github.com/wazuh/wazuh/pull/29599>`__ Fixed heap buffer overflow in Analysisd rule parser. (Backport from 4.11.1)
-  `#29615 <https://github.com/wazuh/wazuh/pull/29615>`__ Improved signal handling during process stop. (Backport from 4.12.0)
-  `#29616 <https://github.com/wazuh/wazuh/pull/29616>`__ Fixed crash when reading email alerts missing the ``email_to`` attribute. (Backport from 4.12.0)

Wazuh agent
^^^^^^^^^^^

-  `#29598 <https://github.com/wazuh/wazuh/pull/29598>`__ Fixed a bug that could cause ``wazuh-modulesd`` to crash at startup. (Backport from 4.12.0)
-  `#29600 <https://github.com/wazuh/wazuh/pull/29600>`__ Fixed *WPK* package upgrades for DEB when upgrading from version 4.3.11 or earlier. (Backport from 4.12.0)
-  `#29635 <https://github.com/wazuh/wazuh/pull/29635>`__ Fixed error in event processing on the AWS Custom Logs Buckets module. (Backport from 4.11.0)
-  `#29604 <https://github.com/wazuh/wazuh/pull/29604>`__ Improved URL validation in the Maltiverse integration. (Backport from 4.12.0)

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.10.2/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.10.2/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.10.2/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.10.2/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.10.2/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.10.2/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.10.2/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.10.2/CHANGELOG.md>`__