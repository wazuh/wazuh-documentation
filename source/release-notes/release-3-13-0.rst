.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Wazuh 3.13.0 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_3_13_0:

3.13.0 Release notes - 22 June 2020
===================================

This section lists the changes in version 3.13.0. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.13.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/3.13-7.7/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/3.13/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/3.13/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/3.13-8.0/CHANGELOG.md>`_

Wazuh core
----------

**Added**

- Included the NVD as a feed for Linux agents in vulnerability detector.
- Improved the vulnerability detector engine to correlate alerts between different feeds.
- Added vulnerability detector module unit testing for Unix source code.
- Added a timeout to the updates of the vulnerability detector's feeds to prevent hangings.
- Added option for the JSON decoder to choose the treatment of array structures.
- Added ``mode`` value (real-time, Who-data, or scheduled) as a dynamic field in FIM alerts. 
- Added a field to configure the maximum files to be monitored by the FIM module.
- New module to pull and process logs from Google Cloud Pub/Sub service.
- Added support for mapping rules with MITRE ATT&CK framework.
- Added as a dependency Microsoft's Software Update Catalog used by vulnerability detector.
- Added support for ``aarch64`` and ``armhf`` architectures.

**Changed**

- Decreased event fetching delay from 10 miliseconds to 5 miliseconds in FIM modes real-time and whodata (``rt_delay``).
- Who-data includes new fields: process CWD, parent process id, and CWD of parent process.
- FIM now allows to rename/delete files while calculating their hash.
- Extended the statics fields comparison in the ruleset options.
- The state field has been removed from vulnerability alerts.
- The NVD is now the primary feed for the vulnerability detector in Linux.
- Removed OpenSCAP policies installation and configuration block.
- Changed ``same/different_systemname`` for ``same/different_system_name`` in Analysisd static filters.
- Updated the internal Python interpreter from v3.7.2 to v3.8.2.

**Other fixes and improvements**

- Fixed a bug that occasionally, kept the memory reserved when deleting monitored directories in FIM.
- Fixed and issue regarding inotify watchers allocation when modifying directories in FIM real-time.
- Fixed an error that caused the alerts deletion with a wrong path in Who-data mode.
- Fixed an issue that did not generate alerts in Who-data mode when a subdirectory was added to the monitored directory in Windows.
- Avoided the truncation of the full log field of the alert when the path is too long.
- When there is a failure setting policies in Windows, FIM will automatically change from Who-data to real-time mode.
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

**Added**

- Support for Wazuh v3.13.0.
- Support for Kibana v7.7.1
- Support for Open Distro 1.8
- Added new navigation experience with a global menu.
- Added a breadcrumb in Kibana top nav.
- Added a new Agents Summary Screen.
- Added a new feature to add sample data to dashboards.
- Added MITRE integration.
- Added Google Cloud Platform integration.
- Added TSC integration.
- Added a new integrity monitoring state view for agent.
- Added a new integrity monitoring files detail view.
- Added a new component to explore compliance requirements.

**Changed**

- Code migration to React.js.
- Global review of styles.
- Unified Overview and Agent dashboards into new Modules.
- Changed vulnerabilities' dashboard visualizations.

**Fixed**

- Fixed Open Distro tenants to be functional.
- Improved navigation performance.
- Avoid creating the ``wazuh-monitoring`` index pattern if it is disabled.
- SCA checks without compliance field could not be expanded.

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

**Fixed**

- Fixed the provider name so that Windows Eventlog's logs match with the Wazuh rules.
- Fixed static filters related to the ``system_name`` field.
- Removed trailing whitespaces in the group name section of the ruleset.
- Removed invalid zeroes from rules id.

Wazuh Splunk
------------

- Support for Wazuh v3.13.0

