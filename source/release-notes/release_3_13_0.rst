.. Copyright (C) 2020 Wazuh, Inc.

.. _release_3_13_0:

3.13.0 Release notes
====================

This section lists the changes in version 3.13.0. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/3.13/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/3.13-7.7/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/3.13/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/3.13/CHANGELOG.md>`_

Wazuh core
----------

**Added**

- Included the NVD as a feed for Linux agents in vulnerability detector.
- Improved the vulnerability detector engine to correlate alerts between different feeds.
- Added vulnerability detector module unit testing for Unix source code.
- Added a timeout to the updates of the vulnerability detector's feeds to prevent hangings.
- Added option for the JSON decoder to choose the treatment of array structures.
- Added ``mode`` value (real-time, Who-data, or scheduled) as a dynamic field in FIM alerts. 
- Added a configurable maximum limit of files to be monitored by FIM.
- New integration for pull logs from Google Cloud Pub/Sub.
- Added support for MITRE ATT&CK knowledge base.
- Added new configuration block for Windows Defender EventChannel.
- Added as a dependency Microsoft's Software Update Catalog used by vulnerability detector.
- Added support for ``aarch64`` and ``armhf`` architectures.

**Changed**

- Changed the internal variable ``rt_delay`` configuration to 5 miliseconds.
- Who-data includes new fields: process CWD, parent process id, and CWD of paren process.
- FIM opens files with shared deletion permission.
- Extended the statics fields comparison in the ruleset options.
- The state field has been removed from vulnerability alerts.
- The NVD is now the primary feed for the vulnerability detector in Linux.
- Removed OpenSCAP policies installation and configuration block.
- Changed the internal configuration of Analysisd to be able to register by default a number of agents higher than ``65536``.
- Changed ``same/different_systemname`` for ``same/different_system_name`` in Analysisd static filters.
- Updated the internal Python interpreter from v3.7.2 to v3.8.2.

**Other fixes and improvements**

- Fixed a bug that occasionally, kept the memory reserved when deleting monitored directories in FIM.
- Freed Inotify watches moving directories in the real-time mode of FIM.
- Fixed an error that caused the alerts' deletion with a wrong path in Who-data mode.
- Fixed generating alerts in Who-data mode when moving directories to the folder being monitored in Windows.
- Avoided the truncation of the full log field of the alert when the path is too long.
- Fixed the changing of monitoring from Who-data to real-time when there is a failure to set policies in Windows.
- Fixed an error that prevented from restarting Windows agents from the manager.
- Fixed an error that did not allow the usage of the tag ``URL`` by configuring the NVD in a vulnerability detector module.
- Fixed TOCTOU condition in Clusterd when merging agent-info files.
- Fixed race condition in Analysisd when handling accumulated events.
- Avoided to count links when generating alerts for ignored directories in Rootcheck.
- Fixed typo in the path used for logging when disabling an account.
- Fixed an error when receiving different Syslog events in the same TCP packet.
- Fixed a bug in vulnerability detector on Modulesd when comparing Windows software versions.
- Fixed a bug that caused an agent's disconnection time not to be displayed correctly.
- Optimized the function to obtain the default gateway.
- Fixed host verification when signing a certificate for the manager.
- Fixed possible duplicated ID on ``client.keys`` adding new agent through the API with a specific ID.
- Avoid duplicate descriptors using wildcards in ``localfile`` configuration.
- Guaranteed that all processes are killed when service stops.
- Fixed mismatch in integration scripts when the debug flag is set to active.

Wazuh Kibana App
----------------

- Support for Wazuh v3.13.0.
- Fixed an error that allowed having more than one instance of ``babel-polyfill``.

Wazuh API
---------

**Added**

- Added new API requests:
    - ``GET/mitre``
    - ``GET/rules/mitre``
    - ``GET/rules/tsc``

- Added new filters in request ``GET/rules``:
    - ``mitre``: Filters the rules by mitre requirement.
    - ``tsc``: Filters the rules by tsc requirement.

**Changed**

- Increased the maximum allowed size of the files to be uploaded from 1MB to 10MB. This change applies to: 

    - ``POST /manager/files``
    - ``POST /cluster/:node_id/files``
    - ``POST /agents/groups/:group_id/configuration``
    - ``POST /agents/groups/:group_id/files/:file_name``


Wazuh ruleset
-------------

**Added**

- Added rules and decoders for macOS sshd logs.
- Added TSC/SOC compliance mapping.
- Added rules and decoders for PaloAlto logs.
- Added rules and decoder to monitor the FIM database status.
- Added rules for WAF.


**Changed**

- Changed description of vulnerability detector rules.
- Changed squid decoders.



