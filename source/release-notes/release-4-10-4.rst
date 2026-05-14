.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.10.4 has been released. Check out our release notes to discover the changes and additions of this release.

4.10.4 Release notes - TBD
==========================

This section lists the changes in version 4.10.4. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#34128 <https://github.com/wazuh/wazuh/pull/34128>`__ Masked ``authd.pass`` in configuration API responses for users without update permissions.

Wazuh agent
^^^^^^^^^^^

-  `#34661 <https://github.com/wazuh/wazuh/pull/34661>`__ Added detection of the ``-a never,task`` Audit rule in FIM whodata for Linux.
-  `#34680 <https://github.com/wazuh/wazuh/pull/34680>`__ Changed sync primitive disposal to stop and soften teardown failures.

Other
^^^^^

-  `#34687 <https://github.com/wazuh/wazuh/pull/34687>`__ Updated ``curl`` dependency to version 8.12.1.
-  `#33383 <https://github.com/wazuh/wazuh/pull/33383>`__ Updated ``starlette`` dependency to version 0.49.1.
-  `#32790 <https://github.com/wazuh/wazuh/pull/32790>`__ Upgraded the embedded Python interpreter to version 3.10.19.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#8135 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8135>`__ Added an API selector warning when ``run_as`` is set to ``false`` in the ``wazuh.yml`` file.
-  `#8135 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8135>`__ Set ``run_as`` to ``true`` by default in the ``wazuh.yml`` file.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#35222 <https://github.com/wazuh/wazuh/pull/35222>`__ Fixed analysisd plugin decoder argument alignment.
-  `#35258 <https://github.com/wazuh/wazuh/pull/35258>`__ Fixed path traversal in authd through agent group name validation.
-  `#35256 <https://github.com/wazuh/wazuh/pull/35256>`__ Hardened cluster deserialization by restricting callable decoding to Wazuh modules and improving error handling.
-  `#35256 <https://github.com/wazuh/wazuh/pull/35256>`__ Fixed DAPI callable resolution to restrict invocations to exposed resources only.
-  `#35469 <https://github.com/wazuh/wazuh/pull/35469>`__ Fixed admin protection in the update user endpoint.
-  `#34690 <https://github.com/wazuh/wazuh/pull/34690>`__ Fixed protected settings checks when multiple ``<ossec_config>`` blocks are present.
-  `#34659 <https://github.com/wazuh/wazuh/pull/34659>`__ Restricted cluster file transfer write paths.
-  `#35008 <https://github.com/wazuh/wazuh/pull/35008>`__ Improved cluster file synchronization path handling by adding safe path joins.
-  `#31901 <https://github.com/wazuh/wazuh/pull/31901>`__ Fixed Vulnerability Detector offset database updates to occur only after processing (backport from 4.12.0).

Wazuh agent
^^^^^^^^^^^

-  `#34679 <https://github.com/wazuh/wazuh/pull/34679>`__ Fixed Windows FIM Registry scan crash on non-null-terminated values.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.10.4/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.10.4/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.10.4/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.10.4/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.10.4/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.10.4/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.10.4/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.10.4/CHANGELOG.md>`__