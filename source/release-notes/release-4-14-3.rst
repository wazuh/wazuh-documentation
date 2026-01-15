.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.14.3 has been released. Check out our release notes to discover the changes and additions of this release.

4.14.3 Release notes - TBD
==========================

This section lists the changes in version 4.14.3. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh agent
^^^^^^^^^^^

-  `#33831 <https://github.com/wazuh/wazuh/pull/33831>`__ Added hostname and architecture metadata to Windows keep-alive messages.

RESTful API
^^^^^^^^^^^

-  `#33702 <https://github.com/wazuh/wazuh/pull/33702>`__ Improved authentication performance by caching generated key pairs and clearing the cache when key files change.

Ruleset
^^^^^^^

-  `#33492 <https://github.com/wazuh/wazuh/pull/33492>`__ Added a CIS SCA policy for macOS 26 Tahoe.

Other
^^^^^

-  `#33569 <https://github.com/wazuh/wazuh/pull/33569>`__ Updated the ``werkzeug`` dependency to version ``3.1.4``.
-  `#33927 <https://github.com/wazuh/wazuh/pull/33927>`__ Updated the ``urllib3`` dependency to version ``2.6.3``.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#8025 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8025>`__ Added the ability to remove agents from **Agents management** > **Summary**.
-  `#8026 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8026>`__ Set ``run_as`` to ``true`` by default in the ``wazuh.yml`` file.
-  `#8026 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8026>`__ Added an API selector warning when ``run_as`` is set to ``false`` in the ``wazuh.yml`` file.
-  `#7958 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7958>`__ Upgraded the ``js-yaml`` dependency to version ``4.1.1``.
-  `#8008 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8008>`__ Upgraded the ``swagger-client`` dependency to version ``3.36.0``.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#33464 <https://github.com/wazuh/wazuh/pull/33464>`__ Escaped document IDs when necessary before sending documents to the indexer.
-  `#33551 <https://github.com/wazuh/wazuh/pull/33551>`__ Extended timestamp conversion helpers to support additional input formats and normalize ISO 8601 strings.
-  `#33705 <https://github.com/wazuh/wazuh/pull/33705>`__ Restricted cluster file transfer write paths.
-  `#33910 <https://github.com/wazuh/wazuh/pull/33910>`__ Hardened cluster deserialization by restricting callable decoding to Wazuh modules and improving error handling.
-  `#33803 <https://github.com/wazuh/wazuh/pull/33803>`__ Added query size checks to Syscollector delta sync SQL generation to prevent buffer overflows.
-  `#33756 <https://github.com/wazuh/wazuh/pull/33756>`__ Replaced unsafe ``sprintf`` calls in the SCA decoder to prevent buffer overflows.
-  `#33739 <https://github.com/wazuh/wazuh/pull/33739>`__ Fixed a memory leak in the CIS-CAT decoder when database operations fail.

Wazuh agent
^^^^^^^^^^^

-  `#33495 <https://github.com/wazuh/wazuh/pull/33495>`__ Fixed UTF-16 casting when updating ``report_changes``.
-  `#33665 <https://github.com/wazuh/wazuh/pull/33665>`__ Improved Active Response key handling in ``wazuh-execd``.
-  `#33926 <https://github.com/wazuh/wazuh/pull/33926>`__ Hardened Logcollector multiline backup handling by using full-buffer copies.
-  `#33708 <https://github.com/wazuh/wazuh/pull/33708>`__ Fixed label formatting edge cases in keep-alive notify messages.
-  `#33922 <https://github.com/wazuh/wazuh/pull/33922>`__ Fixed incorrect permissions on router and socket UNIX sockets.
-  `#33583 <https://github.com/wazuh/wazuh/pull/33583>`__ Fixed a false positive in vulnerability detection for Oracle Linux 8.

RESTful API
^^^^^^^^^^^

-  `#33683 <https://github.com/wazuh/wazuh/pull/33683>`__ Improved configuration upload validation by reliably parsing and comparing Wazuh XML configurations.
-  `#33807 <https://github.com/wazuh/wazuh/pull/33807>`__ Fixed protected settings checks when multiple ``<ossec_config>`` blocks are present.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#8018 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8018>`__ Fixed a TypeError when using the ``exists`` or ``does not exist`` operators on the ``vulnerability.under_evaluation`` filter.
-  `#8032 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8032>`__ Fixed the editing of XML content in **Server management** > **Settings** on **Edit configuration**.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.14.3/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.14.3/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.14.3/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.14.3/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.14.3/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.14.3/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.14.3/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.14.3/CHANGELOG.md>`__
