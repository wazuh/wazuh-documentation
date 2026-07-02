.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.14.6 has been released. Check out our release notes to discover the changes and additions of this release.

4.14.6 Release notes - 1 July 2026
==================================

This section lists the changes in version 4.14.6. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#35648 <https://github.com/wazuh/wazuh/pull/35648>`__ Removed unused SSL/TLS transport option from the cluster.

Other
^^^^^

-  `#35982 <https://github.com/wazuh/wazuh/pull/35982>`__ Updated the ``cryptography``, ``urllib3``, and ``python-multipart`` Python dependencies.
-  `#36467 <https://github.com/wazuh/wazuh/pull/36467>`__ Updated eBPF libraries: ``libbpf`` to version 1.7.0 and ``bpftool`` to version 7.7.0.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#35773 <https://github.com/wazuh/wazuh/pull/35773>`__ Improved message decompression handling in *remoted*.
-  `#35833 <https://github.com/wazuh/wazuh/pull/35833>`__ Improved agent name validation to reject names starting with a dot.
-  `#36011 <https://github.com/wazuh/wazuh/pull/36011>`__ Fixed segmentation fault in the Vulnerability Scanner module shutdown when disabled.
-  `#36059 <https://github.com/wazuh/wazuh/pull/36059>`__ Fixed string buffer handling in the version comparison function.
-  `#36060 <https://github.com/wazuh/wazuh/pull/36060>`__ Improved cluster file synchronization security.
-  `#36129 <https://github.com/wazuh/wazuh/pull/36129>`__ Improved cluster file synchronization error handling for invalid task identifiers.
-  `#36204 <https://github.com/wazuh/wazuh/pull/36204>`__ Improved cluster merged file parameter validation to prevent directory escape.
-  `#36246 <https://github.com/wazuh/wazuh/pull/36246>`__ Improved ``tmp_file`` path validation in cluster DAPI.
-  `#36296 <https://github.com/wazuh/wazuh/pull/36296>`__ Improved cluster non-merged file path validation during worker file processing.
-  `#36460 <https://github.com/wazuh/wazuh/pull/36460>`__ Improved cluster node name format validation in the hello handler.
-  `#35475 <https://github.com/wazuh/wazuh/pull/35475>`__ Fixed missing ``agent.host.ip`` field in inventory documents when the agent IP is empty.
-  `#6726 <https://github.com/wazuh/external-devel-requests/issues/6726>`__ Fixed stale agent ``synced`` status after hot reload on cluster worker nodes.

Wazuh agent
^^^^^^^^^^^

-  `#35727 <https://github.com/wazuh/wazuh/pull/35727>`__ Fixed agent registration not running after reinstalling the agent with ``apt-get remove``.
-  `#35431 <https://github.com/wazuh/wazuh/pull/35431>`__ Fixed MS-Graph integration handling for relationships containing ``/``.
-  `#35380 <https://github.com/wazuh/wazuh/pull/35380>`__ Fixed macOS Syscollector to skip package receipts whose payload is no longer installed.
-  `#35838 <https://github.com/wazuh/wazuh/pull/35838>`__ Fixed missing eBPF create, modify, and delete events on Ubuntu 24 and 26, and improved FIM whodata health check.
-  `#36399 <https://github.com/wazuh/wazuh/pull/36399>`__ Hardened FIM database path lookups by migrating to parameterized SQL queries.

RESTful API
^^^^^^^^^^^

-  `#35866 <https://github.com/wazuh/wazuh/pull/35866>`__ Escaped control characters in API usernames in access logs.
-  `#35757 <https://github.com/wazuh/wazuh/pull/35757>`__ Added input validation in cluster result handling and authentication.
-  `#35442 <https://github.com/wazuh/wazuh/pull/35442>`__ Fixed current user resolution in the ``update-user`` endpoint to enforce admin protection.

Ruleset
^^^^^^^

-  `#35927 <https://github.com/wazuh/wazuh/pull/35927>`__ Updated Rootcheck trojan signatures to avoid false positives on modern distributions, including Debian 13, Ubuntu 26, and Arch Linux.

Other
^^^^^

-  `#36782 <https://github.com/wazuh/wazuh/pull/36782>`__ Fixed ``wazuh-manager`` startup failure on RHEL 10 by removing the ``libcrypt`` dependency from the embedded Python interpreter.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#8447 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8447>`__ Fixed the message displayed when the server cluster is disabled and accessing the Cluster app.
-  `#8464 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8464>`__ Fixed authorization for agent removal, group editing, upgrading, and upgrade task details by delegating RBAC enforcement to the API instead of the UI, and avoiding duplicated permission error toasts in upgrade task queries.
-  `#8522 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8522>`__ `#8555 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8555>`__ Fixed deployment and start commands being displayed in the agent registration flow when the user lacks ``manager:update_config`` or ``cluster:update_config`` permissions required to read the registration password.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.14.6/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.14.6/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.14.6/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.14.6/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.14.6/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.14.6/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.14.6/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.14.6/CHANGELOG.md>`__