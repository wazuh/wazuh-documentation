.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.14.7 has been released. Check out our release notes to discover the changes and additions of this release.

4.14.7 Release notes - TBD
==========================

This section lists the changes in version 4.14.7. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#37035 <https://github.com/wazuh/wazuh/pull/37035>`__ Removed deprecated ``wazuh-dbd`` daemon and ``database_output`` configuration.

Other
^^^^^

-  `#37361 <https://github.com/wazuh/wazuh/pull/37361>`__ Updated ``aiohttp``, ``cryptography``, ``PyJWT``, ``python-multipart``, and ``starlette`` Python dependencies.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#8713 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8713>`__ Added sanitization in the markdown component.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#37280 <https://github.com/wazuh/wazuh/pull/37280>`__ Improved cluster payload buffer allocation strategy.
-  `#37119 <https://github.com/wazuh/wazuh/pull/37119>`__ Improved cluster archive decompression limits.
-  `#36998 <https://github.com/wazuh/wazuh/pull/36998>`__ Improved cluster worker file path validation.
-  `#37034 <https://github.com/wazuh/wazuh/pull/37034>`__ Improved API authentication stability with bounded thread pools, regex timeouts, and payload size limits.

Wazuh agent
^^^^^^^^^^^

-  `#36791 <https://github.com/wazuh/wazuh/pull/36791>`__ Fixed AWS SQS subscriber wodle resolving the wrong AWS account for cross-account ``iam_role_arn`` configurations.
-  `#36338 <https://github.com/wazuh/wazuh/pull/36338>`__ Fixed agent keepalive scheduling after a system clock rollback causing false ``Disconnected`` status.
-  `#37014 <https://github.com/wazuh/wazuh/pull/37014>`__ Fixed eBPF FIM whodata dropping file events on older kernels such as Amazon Linux 2 and 2023.
-  `#37023 <https://github.com/wazuh/wazuh/pull/37023>`__ Fixed eBPF FIM whodata missing file move/rename events into monitored folders.
-  `#36730 <https://github.com/wazuh/wazuh/pull/36730>`__ Added IP address validation to the ``ip-customblock`` active response to prevent malformed input in file path operations.
-  `#37245 <https://github.com/wazuh/wazuh/pull/37245>`__ Added a null check for inode and device fields in the FIM whodata event handler.

RESTful API
^^^^^^^^^^^

-  `#37323 <https://github.com/wazuh/wazuh/pull/37323>`__ Fixed TypeError when sorting agents by version with empty version strings.
-  `#37039 <https://github.com/wazuh/wazuh/pull/37039>`__ Improved sensitive data masking in cluster configuration endpoint.

Ruleset
^^^^^^^

-  `#37385 <https://github.com/wazuh/wazuh/pull/37385>`__ Fixed multiple Debian, Ubuntu, and Windows SCA checks generating incorrect results.
-  `#36361 <https://github.com/wazuh/wazuh/pull/36361>`__ Fixed a typo in the SELinux SCA check causing false failures on CentOS 8, 9, and 10 systems configured as ``permissive``.
-  `#36396 <https://github.com/wazuh/wazuh/pull/36396>`__ Fixed the AlmaLinux 9 and 10 bootloader permissions SCA check regex and optional file handling.
-  `#36795 <https://github.com/wazuh/wazuh/pull/36795>`__ Fixed the ``/etc/gshadow-`` permissions SCA check always failing due to an incorrect ``all`` condition.
-  `#36783 <https://github.com/wazuh/wazuh/pull/36783>`__ Fixed a macOS SCA PolicyBanner check false failure by wrapping the command in ``sh -c`` for glob expansion.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.14.7/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.14.7/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.14.7/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.14.7/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.14.7/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.14.7/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.14.7/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.14.7/CHANGELOG.md>`__