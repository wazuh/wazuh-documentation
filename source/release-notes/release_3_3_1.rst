.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_3_1:

3.3.1 Release Notes
===================

This section shows the most relevant improvements and fixes in version 3.3.1. More details about these changes are provided in each component changelog.

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.3.1/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.3.1/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.3.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.3.1-6.2.4/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.3.1-7.1.1/CHANGELOG.md>`_

Wazuh core
----------

Most of the fixes introduced in this new version are focused on the user experience when dealing with the Wazuh management. Improving log messages,
configuration issues or version controls, among other things. We can highlight some of these changes:

- It is now possible to set up empty blocks of configuration for some modules. For example, the vulnerability detector module can be enabled by typing ``<wodle name="vulnerability-detector"/>``,
  applying it the default configuration for that module.

- An alert has been added to be aware when the process of unmerging the centralized configuration fails.

- Fixed a bug that blocked the remote upgrades for Ubuntu agents.

- Prevented interferences between the Windows Defender antivirus and the Wazuh agent when managing temporary bookmark files.


Wazuh API
---------

- The request to delete agents includes two new fields with the affected agents by the deletion request, as well as the failed IDs.

- Fixed error when trying to upgrade `Never connected` agents by the API.


Wazuh app for Kibana
--------------------

ToDo


Wazuh app for Splunk
--------------------

ToDo
