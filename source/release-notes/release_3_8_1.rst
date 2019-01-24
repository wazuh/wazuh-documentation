.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_8_1:

3.8.1 Release Notes
===================

This section shows the most relevant improvements and fixes in version 3.8.0. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.8.0/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.8.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.8.0-6.5.4/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.8.0-7.2.3/CHANGELOG.md>`_

Wazuh core
----------

- Improved Vulnerability detector module, fixed some false positives for Red Hat systems.
- We also fixed a problem with the Windows Wazuh agents. Affected packages didn't start the service properly, now it's fixed.

Wazuh API
---------

- Fixed an issue related to the log rotation module which may makes the Wazuh API unavailable on Debian systems.

Wazuh App
---------

- Improved auto-indent and XML error checker logic for group configuration editor. Now they are faster.
