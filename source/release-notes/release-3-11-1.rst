.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Wazuh 3.11.1 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_3_11_1:

3.11.1 Release notes
====================

This section lists the changes in version 3.11.1. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.11.1/CHANGELOG.md>`_

Wazuh core
----------

- Fixed a bug in the manager that made Analysisd max out the CPU usage when decoding logs from Windows Eventchannel.
