.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_9_2:

3.9.2 Release notes
===================

This section shows the most relevant improvements and fixes in version 3.9.2. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.9.2/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.9.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.9.2-7.1.1/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.9.2-7.3.0/CHANGELOG.md>`_


Wazuh core
----------

- Fixed request for whitelists configuration failed when the block was empty.
- Fixed error deleting temporary files during cluster synchronization.
- Changes bad permissions on agent groups files when they are synchronized by the cluster.
- Severals memory errors fixed in CIS-CAT module.
- Fixed error checking agent version number in remote upgrades.
- Changed error message in agent connection timeout to debug message.
- Fixed race condition in analysis daemon when decoding SCA events. Using reentrant functions in order to maintain context between successive calls.
- Fixed a file descriptor leak in modulesd. This bug appeared when the timeout was exceeded when executing a command in the following modules.
  - OpenSCAP.
  - CIS-CAT.
  - Command.
  - Azure.
  - SCA.
  - AWS.
  - Docker.
- Fixed invalid content handling RedHat feed, causes unexpected exit in Wazuh modules daemon.


Wazuh apps
----------

- Fixed visualization in agent overview dashboard.
- Fix adding API data in an invalid format.
- Adapt request realized in DevTool to the API standars.
- Get same metrics security events dashboard that in the agents overview.
- Fixed SCA policy checks table.
- Added missing dependency for Discover.


Wazuh ruleset
-------------

- Fixed Windows rule about audit log.
- Fixed invalid check of the Solaris 11 SCA policy.


Elastic Stack 7
----------------

