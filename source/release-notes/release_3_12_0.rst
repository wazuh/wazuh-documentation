.. Copyright (C) 2020 Wazuh, Inc.

.. _release_3_12_0:

3.12.0 Release notes
====================

This section lists the changes in version 3.11.4. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.12.0/CHANGELOG.md>`_


Wazuh core
----------

**File integrity monitoring**

- Add synchronization capabilities for FIM.
- Add SQL database for the FIM module. Its storage can be switched between disk and memory.
- Add FIM module unit testing for Unix source code.
- Add FIM module unit testing for Windows source code.
- Move the FIM logic engine to the agent.

**Logcollector**

- Avoid reopening the current socket when Logcollector fails to send a event.
- Prevent Logcollector from starving when has to reload files.
- Make Logcollector continuously attempt to reconnect with the agent daemon.



Wazuh API
---------

- Enabled HTTPS by default in installation script.
- Added distinct parameter to syscheck endpoints.
- Added `condition` field to SCA endpoints.
- Fixed a bug that made requests not being distributed to the selected node_id.
