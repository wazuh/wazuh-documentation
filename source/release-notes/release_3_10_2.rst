.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_10_2:

3.10.2 Release notes
====================

This section lists the changes in version 3.10.2. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.10.2/CHANGELOG.md>`_

Wazuh core
----------

- Fixed the unexpected log collection module behaviour when several hard links point to the same file. The duplicate file detection method has changed: Instead of finding duplicate files on startup and removing one of the entries, now the log collection module searches for duplicate files on file checking.
