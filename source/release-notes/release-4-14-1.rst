.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.14.1 has been released. Check out our release notes to discover the changes and additions of this release.

4.14.1 Release notes - 12 November 2025
=======================================

This section lists the changes in version 4.14.1. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#32009 <https://github.com/wazuh/wazuh/pull/32009>`__ Added IAM role support for VPC flow logs in the AWS wodle.
-  `#32514 <https://github.com/wazuh/wazuh/pull/32514>`__ Added support for static and temporary AWS credentials in the Amazon Security Lake subscriber.
-  `#32401 <https://github.com/wazuh/wazuh/pull/32401>`__ Optimized wazuh-db startup by executing agent schema creation in a single transaction.
-  `#32463 <https://github.com/wazuh/wazuh/pull/32463>`__ Improved vulnerabilities index upgrade with hash-based mapping validation, automatic safe reindex, and backup cleanup.
-  `#32069 <https://github.com/wazuh/wazuh/pull/32069>`__ Improved C++ logging mechanism to avoid unnecessary heap allocations.
-  `#32521 <https://github.com/wazuh/wazuh/pull/32521>`__ Improved IndexerConnector error handling and response parsing to provide structured logging of 4xx/5xx errors.
-  `#32525 <https://github.com/wazuh/wazuh/pull/32525>`__ Reduced default verbosity of wazuh-authd when handling invalid connections.
-  `#32697 <https://github.com/wazuh/wazuh/pull/32697>`__ Remoted now reads internal options at process startup.

Wazuh agent
^^^^^^^^^^^

-  `#32746 <https://github.com/wazuh/wazuh/pull/32746>`__ Added support for Homebrew 2.0+ in IT Hygiene for macOS.
-  `#31080 <https://github.com/wazuh/wazuh/pull/31080>`__ Changed how the ``fim_check_ignore`` function works in negative regex cases.
-  `#31375 <https://github.com/wazuh/wazuh/pull/31375>`__ Changed how null values for hotfixes are handled in the Windows agent.
-  `#32874 <https://github.com/wazuh/wazuh/pull/32874>`__ Improved service shutdown procedure.

Ruleset
^^^^^^^

-  `#31449 <https://github.com/wazuh/wazuh/pull/31449>`__ Reworked SCA policy for Microsoft Windows 10 Enterprise.

Other
^^^^^

-  `#31422 <https://github.com/wazuh/wazuh/pull/31422>`__ Upgraded the ``starlette`` dependency to version 0.47.2.
-  `#32782 <https://github.com/wazuh/wazuh/pull/32782>`__ Upgraded the embedded Python interpreter to version 3.10.19.
-  `#32900 <https://github.com/wazuh/wazuh/pull/32900>`__ Updated ``curl`` dependency to version 8.12.1.
-  `#32294 <https://github.com/wazuh/wazuh/pull/32294>`__ Updated ``LUA`` to version 5.4.6.
-  `#32294 <https://github.com/wazuh/wazuh/pull/32294>`__ Updated ``libarchive`` to version 3.8.0.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7804 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7804>`__ Upgraded the ``axios`` dependency to version 1.12.2.
-  `#7841 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7841>`__ Improved column order in **IT Hygiene** > **Network** > **Traffic** view to follow a logical source-to-destination flow.
-  `#7639 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7639>`__ Improved integrity monitoring settings terminology by clarifying file and registry labels, and updating component names for better user understanding.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#32045 <https://github.com/wazuh/wazuh/pull/32045>`__ Fixed manager vulnerability scan not triggering due to incorrect Syscollector event provider topic name.
-  `#32787 <https://github.com/wazuh/wazuh/pull/32787>`__ Fixed IndexerConnector abuse control to prevent data loss on failed syncs.
-  `#32107 <https://github.com/wazuh/wazuh/pull/32107>`__ Fixed user tag handling by adding ``user`` as an alias for the ``dstuser`` static field.
-  `#32057 <https://github.com/wazuh/wazuh/pull/32057>`__ Fixed JSON validation issues in Analysisd and SCA components.
-  `#32829 <https://github.com/wazuh/wazuh/pull/32829>`__ Fixed a bug in Vulnerability Scanner where the database offset was updated even in error cases.

Wazuh agent
^^^^^^^^^^^

-  `#32383 <https://github.com/wazuh/wazuh/pull/32383>`__ Fixed indefinite waiting in FIM whodata health check.
-  `#31241 <https://github.com/wazuh/wazuh/pull/31241>`__ Fixed graceful shutdown in FIM.
-  `#32049 <https://github.com/wazuh/wazuh/pull/32049>`__ Verified the SHA256 of commands on every execution.
-  `#32528 <https://github.com/wazuh/wazuh/pull/32528>`__ Fixed duplicate ``<ca_store>`` configuration block during RPM package upgrades.
-  `#31144 <https://github.com/wazuh/wazuh/pull/31144>`__ Fixed a bug that prevented overwriting ``<registry_limit>`` or ``<file_limit>`` options from remote configuration.
-  `#29853 <https://github.com/wazuh/wazuh/pull/29853>`__ Fixed a bug in Logcollector that prevented following symlinks when resolving wildcarded files.
-  `#31222 <https://github.com/wazuh/wazuh/pull/31222>`__ Unified detection logs for wildcarded files in Logcollector.
-  `#32027 <https://github.com/wazuh/wazuh/pull/32027>`__ Fixed a bug in FIM that did not recognize Registry keys unless they were UTF-8.
-  `#32731 <https://github.com/wazuh/wazuh/pull/32731>`__ Fixed a bug in Logcollector that ignored all files with ``<age>`` filter on Windows.
-  `#32812 <https://github.com/wazuh/wazuh/pull/32812>`__ Reverted IT Hygiene package vendor format on Debian to include name and email again.
-  `#32785 <https://github.com/wazuh/wazuh/pull/32785>`__ Fixed a bug in IT Hygiene that reported duplicated Edge browser extensions.
-  `#32838 <https://github.com/wazuh/wazuh/pull/32838>`__ Fixed reload of the ``<labels>`` block via remote configuration.
-  `#32836 <https://github.com/wazuh/wazuh/pull/32836>`__ Fixed Windows installer to deploy SCA policies for Windows 2022 instead of Windows Server 2025.

Ruleset
^^^^^^^

-  `#31349 <https://github.com/wazuh/wazuh/pull/31349>`__ Fixed bug in Windows SCA.
-  `#31102 <https://github.com/wazuh/wazuh/pull/31102>`__ Fixed mistaken alert.
-  `#31886 <https://github.com/wazuh/wazuh/pull/31886>`__ Fixed SCA checks in Oracle Linux 9.
-  `#32509 <https://github.com/wazuh/wazuh/pull/32509>`__ Fixed bugs in Windows Server 2016 SCA.
-  `#32523 <https://github.com/wazuh/wazuh/pull/32523>`__ Fixed bugs in PAM decoder.
-  `#32480 <https://github.com/wazuh/wazuh/pull/32480>`__ Fixed macOS Sequoia SCA scans that produced errors.
-  `#32802 <https://github.com/wazuh/wazuh/pull/32802>`__ Fixed Windows Server 2016 SCA policy configuration issue.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7689 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7689>`__ Fixed navigation issue in the MITRE ATT&CK framework details flyout.
-  `#7710 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7710>`__ Fixed event count evolution visualization in the Endpoint Details view to use the server API context filter.
-  `#7783 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7783>`__ Fixed sorting by agent count in **Top 5 Groups** visualization in **Endpoints** summary.
-  `#7803 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7803>`__ Fixed System Inventory displaying incorrect agent data after switching agents in the Endpoint Details view.
-  `#7838 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7838>`__ Replaced the Microsoft Graph API module icon with the official Microsoft Graph API logo for better specificity.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.14.1/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.14.1/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.14.1/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.14.1/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.14.1/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.14.1/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.14.1/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.14.1/CHANGELOG.md>`__
