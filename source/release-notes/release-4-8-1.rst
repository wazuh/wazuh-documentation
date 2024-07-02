.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.8.1 has been released. Check out our release notes to discover the changes and additions of this release.

4.8.1 Release notes - TBD
=========================

This section lists the changes in version 4.8.1. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Manager
^^^^^^^

-  `#24357 <https://github.com/wazuh/wazuh/pull/24357>`__ Added dedicated RSA keys for keystore encryption.

RESTful API
^^^^^^^^^^^

-  `#24173 <https://github.com/wazuh/wazuh/pull/24173>`__ Updated the ``GET /manager/version/check`` endpoint response to always include the ``uuid`` field.

Other
^^^^^

-  `#24292 <https://github.com/wazuh/wazuh/pull/24292>`__ Added external ``azure-core`` and ``isodate`` library dependencies.
-  `#24108 <https://github.com/wazuh/wazuh/pull/24108>`__ Upgraded external ``Jinja2`` library dependency version to ``3.1.4``.
-  `#23925 <https://github.com/wazuh/wazuh/pull/23925>`__ Upgraded external ``requests`` library dependency version to ``2.32.2``.
-  `#24292 <https://github.com/wazuh/wazuh/pull/24292>`__ Upgraded external ``azure-storage-blob`` library dependency version to ``12.19.1``.
-  `#24292 <https://github.com/wazuh/wazuh/pull/24292>`__ Upgraded external ``typing-extensions`` library dependency version to ``4.12.2``.

Packages
^^^^^^^^

-  `#3005 <https://github.com/wazuh/wazuh-packages/pull/3005>`__ Added ``-A|--api`` option validation to the ``wazuh-passwords-tool.sh`` script for changing API user credentials.

Resolved issues
---------------

This release resolves known issues as the following:

Manager
^^^^^^^

-  `#24308 <https://github.com/wazuh/wazuh/pull/24308>`__ Fixed a bug in ``upgrade_agent`` CLI where it occasionally hung without showing a response.
-  `#24341 <https://github.com/wazuh/wazuh/pull/24341>`__ Fixed a bug in ``upgrade_agent`` CLI where it occasionally raised an unhandled exception.

Agent
^^^^^

-  `#23989 <https://github.com/wazuh/wazuh/pull/23989>`__ Fixed the macOS agent to retrieve correct CPU name.

Dashboard plugin
^^^^^^^^^^^^^^^^

-  `#6778 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6778>`__ Removed the unnecessary ``delay`` body parameter on server API requests.
-  `#6777 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6777>`__ Fixed home KPI links with custom or index pattern where the title is different from the ID.
-  `#6793 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6793>`__ Fixed the colors related to vulnerability severity levels on the Vulnerability Detection dashboard.

Changelogs
----------

More details about these changes are provided in the changelog of each component:

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.8.1/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.8.1-2.10.0/CHANGELOG.md>`__
-  `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.8.1>`__

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.8.1/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.8.1/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.8.1/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.8.1/CHANGELOG.md>`__

-  `wazuh/wazuh-qa <https://github.com/wazuh/wazuh-qa/blob/v4.8.1/CHANGELOG.md>`__
-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.8.1/CHANGELOG.md>`__
-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.8.1/CHANGELOG.md>`__
