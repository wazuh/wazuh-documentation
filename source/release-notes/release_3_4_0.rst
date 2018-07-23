.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_4_0:

3.4.0 Release Notes
===================

This section shows the most relevant improvements and fixes in version 3.4.0. More details about these changes are provided in each component changelog.

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.4.0/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.4.0/CHANGELOG.md>`_

Wazuh core
----------

The main feature introduced in this version is the ability to monitor the information relative to the user who
makes changes to any file monitored with FIM. This information (who-data) contains the user who makes the changes
and also the process used. This new functionality is available in Syscheck on Linux and Windows.


Many others improvements and fixes have been included in Syscheck in this new version:

- Added support for SHA256 checksum (by Arshad Khan @arshad01).
- Enhanced visualization of Syscheck alerts and include all the available fields in the Syscheck messages from the Wazuh configuration files.
- The value *xxx* (not enabled) was replaced for *n/a* if the hash couldn't be calculated.
- Fixed registry_ignore problem on syscheck for Windows when *arch="both"* was used.
- Allow more than 256 directories in real-time for Windows agent using recursive watchers.


Other important changes are the following:

- Added a new option to customize the output format per-target in Logcollector.
- Added support for unified WPK. Now the WPK files are compatible between versions for the same OS.
- The CA verification was fixed to allow with more than one *'ca_store'* definition.


Wazuh API
---------

- Added new API request: *GET/agents/stats/distinct*. This new request returns all the different combinations that agents have for the selected fields.
- Added *experimental_feature* option to enable new features in development.
