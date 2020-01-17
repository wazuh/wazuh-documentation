.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_11_2:

3.11.2 Release notes
====================

This section lists the changes in version 3.11.2. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.11.2/CHANGELOG.md>`_

Wazuh core
----------

**Security Configuration Assessment**

- Fixed handler leaks on SCA module for Windows agents.

**Vulnerability detector**

- Optimized memory usage during the NVD feed fetch.


**Rootcheck**

- Fixed bug on Rootcheck scan that led to 100% CPU usage spikes. The ``<readall>`` option was applied even when disabled.
- Fixed handler leaks on Rootcheck module for Windows agents.

**Other fixes and improvements**

- Fixed a memory leak in Clusterd.
- Fixed ``VERSION`` file permissions.
- The Slack integration can now handle alerts with no description.

Wazuh UI for Kibana
-------------------

Wazuh UI for Splunk
-------------------