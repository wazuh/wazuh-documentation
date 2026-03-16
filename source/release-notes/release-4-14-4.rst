.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.14.4 has been released. Check out our release notes to discover the changes and additions of this release.

4.14.4 Release notes - TBD
==========================

This section lists the changes in version 4.14.4. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh agent
^^^^^^^^^^^

-  `#34541 <https://github.com/wazuh/wazuh/pull/34541>`__ Changed the ``msi_output`` extension from ``.txt`` to ``.log``.
-  `#34602 <https://github.com/wazuh/wazuh/pull/34602>`__ Changed the data type to ``unsigned char`` in ``print_hex_string``.
-  `#34552 <https://github.com/wazuh/wazuh/pull/34552>`__ Changed sync primitive disposal to stop and soften teardown failures.

Other
^^^^^

-  `#34154 <https://github.com/wazuh/wazuh/pull/34154>`__ Updated the ``azure-core`` dependency to 1.38.0 and the ``Werkzeug`` dependency to 3.1.5.
-  `#34403 <https://github.com/wazuh/wazuh/pull/34403>`__ Updated the ``protobuf`` dependency to 5.29.6 and the ``python-multipart`` dependency to 0.0.22.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#34658 <https://github.com/wazuh/wazuh/pull/34658>`__ Fixed heap-based null write buffer underflows.

Wazuh agent
^^^^^^^^^^^

-  `#34240 <https://github.com/wazuh/wazuh/pull/34240>`__ Fixed MS Graph default rules not triggering properly.
-  `#34473 <https://github.com/wazuh/wazuh/pull/34473>`__ Unified date formats in Active Response logs to ensure consistent timestamp formatting.
-  `#34376 <https://github.com/wazuh/wazuh/pull/34376>`__ Updated Docker integration rules to improve detection coverage and compatibility.
-  `#34501 <https://github.com/wazuh/wazuh/pull/34501>`__ Fixed a heap-based null write buffer underflow in ``GetAlertData``.
-  `#34517 <https://github.com/wazuh/wazuh/pull/34517>`__ Retained MSI installer logs after Windows agent upgrades to improve troubleshooting visibility.
-  `#34530 <https://github.com/wazuh/wazuh/pull/34530>`__ Fixed incorrect Windows 11 edition detection after upgrading the agent to version 4.14.3.
-  `#34274 <https://github.com/wazuh/wazuh/pull/34274>`__ Fixed a macOS agent crash during Syscollector reload caused by invalid ``pthread_cond_destroy()`` usage.
-  `#34540 <https://github.com/wazuh/wazuh/pull/34540>`__ Fixed Windows OS edition detection.

RESTful API
^^^^^^^^^^^

-  `#34176 <https://github.com/wazuh/wazuh/pull/34176>`__ Fixed timestamps in the ``/agents/upgrade_result`` endpoint to return accurate UTC time.
-  `#34464 <https://github.com/wazuh/wazuh/pull/34464>`__ Improved cluster file synchronization path handling by adding safe path joins.
-  `#34459 <https://github.com/wazuh/wazuh/pull/34459>`__ Fixed an API login race condition.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#8047 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8047>`__ Fixed ``indexDate`` function to correctly handle ISO week-year calculation for weekly indices.
-  `#8052 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8052>`__ Fixed the status code and body displayed in failed requests in **Server management** > **Dev tools**.
-  `#8087 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8087>`__ Fixed saving of valid Windows EventChannel ``QueryList`` queries in the ``agent.conf`` editor.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.14.4/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.14.4/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.14.4/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.14.4/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.14.4/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.14.4/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.14.4/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.14.4/CHANGELOG.md>`__