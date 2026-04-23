.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.14.5 has been released. Check out our release notes to discover the changes and additions of this release.

4.14.5 Release notes - TBD
==========================

This section lists the changes in version 4.14.5. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh agent
^^^^^^^^^^^

-  `#34563 <https://github.com/wazuh/wazuh/pull/34563>`__ Changed the RHEL init script with the SUSE variant on SLES 11.
-  `#34543 <https://github.com/wazuh/wazuh/pull/34543>`__ Changed the service check from WMI to ``sc.exe``.
-  `#34727 <https://github.com/wazuh/wazuh/pull/34727>`__ Changed Windows **Syscollector** to include command arguments.

Other
^^^^^

-  `#34907 <https://github.com/wazuh/wazuh/pull/34907>`__ Updated the ``cryptography`` dependency to 46.0.5, the ``Werkzeug`` dependency to 3.1.6, the ``pip`` dependency to 26.0.1, and the ``wheel`` dependency to 0.46.3.
-  `#35135 <https://github.com/wazuh/wazuh/pull/35135>`__ Updated the embedded Python to 3.10.20 and the ``pyjwt`` and ``pyasn1`` dependencies.
-  `#35331 <https://github.com/wazuh/wazuh/pull/35331>`__ Updated the ``cryptography`` and ``requests`` dependencies.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#34889 <https://github.com/wazuh/wazuh/pull/34889>`__ Fixed DAPI callable resolution to restrict invocations to exposed resources only.
-  `#35173 <https://github.com/wazuh/wazuh/pull/35173>`__ `#35412 <https://github.com/wazuh/wazuh/pull/35412>`__ Fixed uncontrolled memory allocation in the cluster caused by a crafted packet length.
-  `#35077 <https://github.com/wazuh/wazuh/pull/35077>`__ Fixed rate limit bypass for the ``/events`` endpoint.
-  `#35106 <https://github.com/wazuh/wazuh/pull/35106>`__ Fixed a buffer overflow in **Analysisd** regex match processing.
-  `#35230 <https://github.com/wazuh/wazuh/pull/35230>`__ Fixed a path traversal in **Authd** via agent group name validation.
-  `#35193 <https://github.com/wazuh/wazuh/pull/35193>`__ Fixed a ``size_t`` underflow in **Remoted** ``ReadSecMSG`` causing a potential heap overflow.
-  `#35307 <https://github.com/wazuh/wazuh/pull/35307>`__ Fixed an RBAC bypass in DAPI allowing privilege escalation.
-  `#35176 <https://github.com/wazuh/wazuh/pull/35176>`__ Fixed **Analysisd** plugin decoder argument alignment.

Wazuh agent
^^^^^^^^^^^

-  `#34734 <https://github.com/wazuh/wazuh/pull/34734>`__ Fixed a **Rootcheck** false positive for ``/dev/.blkid.tab``.
-  `#34735 <https://github.com/wazuh/wazuh/pull/34735>`__ Fixed ``ORDER_REVERSAL`` deadlocks in **FIM**.
-  `#34793 <https://github.com/wazuh/wazuh/pull/34793>`__ Fixed the Roundcube decoder regex to prevent ``srcip`` truncation in ``Failed login ... in session`` logs.
-  `#34693 <https://github.com/wazuh/wazuh/pull/34693>`__ Fixed macOS Ventura SCA policy incorrectly passing ``pmset`` checks.
-  `#34673 <https://github.com/wazuh/wazuh/pull/34673>`__ Fixed Office 365 integration pagination by trimming HTTP header values.
-  `#34880 <https://github.com/wazuh/wazuh/pull/34880>`__ Fixed **FIM** false positives caused by a double ``readdir`` check.
-  `#35285 <https://github.com/wazuh/wazuh/pull/35285>`__ Fixed the audit log cache overflow for events with many records in **Logcollector**.
-  `#35110 <https://github.com/wazuh/wazuh/pull/35110>`__ Fixed the daily marker for the GuardDuty log collector.
-  `#35297 <https://github.com/wazuh/wazuh/pull/35297>`__ Fixed **Rootcheck** not generating findings.
-  `#35287 <https://github.com/wazuh/wazuh/pull/35287>`__ Fixed a heap buffer overflow in **Syscheck** registry wildcard expansion.

RESTful API
^^^^^^^^^^^

-  `#34905 <https://github.com/wazuh/wazuh/pull/34905>`__ Fixed ``allow_higher_versions`` validation in the API ``upload_configuration``.
-  `#35224 <https://github.com/wazuh/wazuh/pull/35224>`__ Fixed the nested JSON depth limit in API request processing.
-  `#35141 <https://github.com/wazuh/wazuh/pull/35141>`__ Fixed the upload size limit config mismatch.

Ruleset
^^^^^^^

-  `#35088 <https://github.com/wazuh/wazuh/pull/35088>`__ Fixed a bug in CIS SCA checks ``35675`` and ``35689`` for Ubuntu 24.04.
-  `#35089 <https://github.com/wazuh/wazuh/pull/35089>`__ Fixed Dovecot decoders to correctly extract the ``rip`` and ``lip`` fields.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#8130 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8130>`__ Fixed the ``wazuh-core`` plugin startup timeout when configured API hosts are unreachable by making ``manageHosts.start()`` non-blocking.
-  `#8133 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8133>`__ Fixed security tables pagination to load all items beyond the 500-item limit (Users, Roles, Policies, Roles Mapping).

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.14.5/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.14.5/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.14.5/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.14.5/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.14.5/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.14.5/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.14.5/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.14.5/CHANGELOG.md>`__
