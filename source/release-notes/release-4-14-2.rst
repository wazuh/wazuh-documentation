.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.14.2 has been released. Check out our release notes to discover the changes and additions of this release.

4.14.2 Release notes - TBD
==========================

This section lists the changes in version 4.14.2. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh agent
^^^^^^^^^^^

-  `#33313 <https://github.com/wazuh/wazuh/pull/33313>`__ Added detection of the ``-a never,task`` Audit rule in FIM whodata for Linux.

Ruleset
^^^^^^^

-  `#32856 <https://github.com/wazuh/wazuh/pull/32856>`__ Added SCA policy for Microsoft Windows Server 2025.

Other
^^^^^

-  `#33069 <https://github.com/wazuh/wazuh/pull/33069>`__ Upgraded the ``starlette`` dependency to 0.49.1.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7883 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7883>`__ Added persistence for page size and sorting in API tables.
-  `#7878 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7878>`__ Improved text size consistency and visual hierarchy across the Agent Overview page by implementing standardized typography styling.
-  `#7896 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7896>`__ Improved Agent Overview resilience by rendering each available system inventory field.
-  `#7897 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7897>`__ Upgraded ``cookie`` dependency to 0.7.0.
-  `#7963 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7963>`__ Removed the **SCA Agent** card subtitle.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#33046 <https://github.com/wazuh/wazuh/pull/33046>`__ Prevented Azure Log Analytics bookmarks from being overwritten across similar configurations.
-  `#33330 <https://github.com/wazuh/wazuh/pull/33330>`__ Fixed discrepancy in the API certificate files.
-  `#33589 <https://github.com/wazuh/wazuh/pull/33589>`__ Made analysisd ruleset reload endpoints fully asynchronous to avoid blocking the API event loop.
-  `#33580 <https://github.com/wazuh/wazuh/pull/33580>`__ Improved analysisd ruleset hot reload performance.
-  `#33602 <https://github.com/wazuh/wazuh/pull/33602>`__ Avoided using ``systemctl`` in restart scripts when systemd is not running as PID 1.

Wazuh agent
^^^^^^^^^^^

-  `#33171 <https://github.com/wazuh/wazuh/pull/33171>`__ Fixed Windows agent remote upgrade (WPK) when installed in a custom directory.
-  `#33182 <https://github.com/wazuh/wazuh/pull/33182>`__ Fixed a package issue causing upgrades to fail when the ``shared`` directory contained subdirectories.
-  `#33270 <https://github.com/wazuh/wazuh/pull/33270>`__ Fixed FIM issue preventing whodata from working on systems with ``/var`` and ``/etc`` mounted on different volumes.
-  `#33322 <https://github.com/wazuh/wazuh/pull/33322>`__ Optimized user and group inventory performance in Syscollector on Windows Domain Controllers.
-  `#33227 <https://github.com/wazuh/wazuh/pull/33227>`__ Fixed an agent bug that prevented directories from being received in the remote configuration.
-  `#33343 <https://github.com/wazuh/wazuh/pull/33343>`__ Silenced agent log message about failing to connect to Active Response when it is disabled.

Ruleset
^^^^^^^

-  `#33202 <https://github.com/wazuh/wazuh/pull/33202>`__ Fixed bug in multiple macOS SCA checks.
-  `#33361 <https://github.com/wazuh/wazuh/pull/33361>`__ Fixed indentation issue in the SCA policy for Windows 10 Enterprise that prevented its execution.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7883 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7883>`__ Removed sorting for Program name and Order columns in the Related decoders table, and the Groups column in the Related rules table, to prevent API errors.
-  `#7962 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7962>`__ Fixed text alignment and column distribution in the **System inventory** card within the Agent view.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.14.2/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.14.2/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.14.2/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.14.2/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.14.2/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.14.2/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.14.2/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.14.2/CHANGELOG.md>`__
