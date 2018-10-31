.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_3_1:

3.3.1 Release Notes
===================

This section shows the most relevant improvements and fixes in version 3.3.1. More details about these changes are provided in each component changelog.

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.3.1/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.3.1/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.3.1/CHANGELOG.md>`_

Bugfixes and improvements for Wazuh core
----------------------------------------

Most of the fixes introduced in this new version are focused on the user experience when dealing with the Wazuh management. Improving log messages and
configuration issues among other things. There are a few changes which are worth highlighting:

- Fixed a bug that prevented the remote upgrades for Ubuntu agents.
- An alert has been added to be aware when the process of unmerging the centralized configuration fails.
- Prevent interferences between the Windows Defender antivirus and the Wazuh agent when managing temporary bookmark files.
- It is now possible to set up empty blocks of configuration for some modules. For example, the vulnerability detector module can be enabled by typing ``<wodle name="vulnerability-detector"/>``, applying it the default configuration for that module.

Bugfixes and improvements for Wazuh API
---------------------------------------

- The request to delete agents includes two new fields with the affected agents by the deletion request, as well as the failed IDs.
- Fixed error when trying to upgrade `Never connected` agents by the API.
