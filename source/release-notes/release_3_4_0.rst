.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_4_0:

3.4.0 Release Notes
===================

This section shows the most relevant improvements and fixes in version 3.4.0. More details about these changes are provided in each component changelog.

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.4.0/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.4.0/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.4.0/CHANGELOG.md>`_

**New features:**

- `Who-data`_
- `Syscheck`_
- `Wazuh core`_
- `Wazuh API`_
- `Wazuh ruleset`_


Who-data
--------

The main feature introduced in this version is the ability to monitor the information relative to the user who
makes changes to any file monitored with FIM. This information (who-data) contains the user who makes the changes
and also the process used. This new functionality is available in Syscheck on Linux and Windows.
See the :doc:`Auditing who-data <../user-manual/capabilities/auditing-whodata>` section for further information.


Syscheck
--------

Many others improvements and fixes have been included in Syscheck in this new version:

- The level of recursiveness when scanning directories can be defined in the ``internal_options.conf`` file. By default, it's set to 256.
- Added support for SHA256 checksum (by Arshad Khan @arshad01).
- Enhanced visualization of Syscheck alerts and insertion of all the available fields in the Syscheck messages from the Wazuh configuration files.
- The value *xxx* (not enabled) was replaced for *n/a* if the hash couldn't be calculated.
- Fixed registry_ignore problem on syscheck for Windows when ``arch="both"`` was used.
- Allow more than 256 directories in real-time for Windows agent using recursive watchers.


Wazuh core
----------

- Added a new option to customize the output format per-target in Logcollector.
- Added support for unified WPK. Now the WPK files are compatible between versions for the same OS.
- The CA verification was fixed to allow with more than one *'ca_store'* definition.


Wazuh API
---------

- Added new API request: ``GET/agents/stats/distinct``. This new request returns all the different combinations that agents have for the selected fields.
- Added ``experimental_feature`` option to enable new features in development.


Wazuh ruleset
-------------

- In older versions, the frecuency attribute in rules was the number of hits + 2. In this version this value has been modified to match exactly the number of hits. By this way this value is more easy to understand.

Wazuh app for Kibana
--------------------

- Tables redesign.
- Improved reporting capabilities.
- Improved Discover performance.
- UI redesign, including simpler Welcome screen.
- New healthcheck design.
- Dev tools one liners.
- New inventory tab.
- Minor bugfixes.

Wazuh app for Splunk
--------------------

- Support for Splunk v7.1.2.
- Dashboard tabs redesign.
- Minor bugfixes.