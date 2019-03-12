.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_5_0:

3.5.0 Release notes
===================

This section shows the most relevant improvements and fixes in version 3.5.0. More details about these changes are provided in each component changelog.

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.5.0/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.5.0/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.5.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.5.0-6.3.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.5.0-7.1.2/CHANGELOG.md>`_

Wazuh core
----------

- A new integration with osquery is shown, this will provide new scheduled results for the manager:

    - The osquery daemon will be launched in background.
    - Filter events by osquery by adding a new option in ``<location>`` rules.
    - Enrich osquery configuration with pack files aggregation and agent labels.
    - Support folders in shared configuration.

- Parallelized remoted daemon:

    - Up to 16 parallel threads to decrypt messages from agents.
    - Frequency of agent keys reloading limited.
    - Message input buffer in Analysisd to prevent control messages starvation in Remoted.

- Vulnerability Detector has been enhanced, adding support for other operating systems and improving the configuration of OVAL updates.

    - Added ``feed`` tag for updating each operating system OVAL, allowing to set a different configuration for each of them.
    - Packages already scanned won't be checked unless no Syscollector scans are detected in a period longer than 24 hours.
    - Added arch check for Red Hat's OVAL.
    - Force the vulnerability detection in unsupported OS with the ``<allow>`` attribute.

- Fixed alerts format in Vulnerability Detector. When showing Vulnerability Detector alerts from a Red Hat agent, an RHSA patch was shown instead of a CVE. This patch consists in various CVEs compressed. The RHSA patches are unpackaged and alerts manifest that the system is vulnerable to each of the CVEs contained in that RHSA.

- Added new support for AES encryption for manager and agent.

- Enhanced active response process. Added a new feature which allows the user to customize the parameters sent to the agent's active response script.

- Added synchronization for remoted counters (rids), being reloaded if the inode of the file has changed.

- Windows deletes pending active-responses when an output signal is received.

- Rootcheck searchs for 32-bit and 64-bit keys. As Windows agent only runs in 32-bit mode, by default Rootcheck was searching only for 32-bit keys.

- Get Linux packages, DEB and RPM, for Syscollector.

- Added a new module for downloading shared files for agent groups dynamically.

- Get running processes, opened ports, network interfaces, Linux (DEB/RPM) and Windows inventories natively for Syscollector.

    - Added field to the hardware inventory about the RAM usage, without using ``wmic``.
    - Storage of multiple addresses/netmasks/broadcasts per interface in the DB.
    - CentOS 5 compatibility to run the network scan.

Wazuh API
---------

- Added information about the user who made the request in the API logs.
- New option for downloading the wpk using HTTP in ``agent_upgrade``.
- Rotation of log files at midnight.
- Added new API requests for syscollector.
- Ignore uppercase and lowercase sorting an array.

Wazuh ruleset
-------------

- Added rules for the new osquery integration.
- Improved CIS-CAT rules.
- Ingoring syscollector events rule added.

Wazuh app for Kibana
--------------------

- As part of the Elastic Stack v6.3.x compatibility process, now we have support for Kuery as query language for the app search bars.
- Added new tab on Configuration to show the current Wazuh app configuration file values.
- Added new tab on Configuration to show the latest Wazuh app logs.
- Added XML/JSON viewer to Management → Configuration.
- Improved reports, now with a better design and document structure.
- Human-readability improvements for visualizations, tables and CSV files.
- Now it’s possible to remove all the API entries from Settings.
- More design improvements for the Welcome tab on some app sections.
- More bug fixes, code refactoring and performance improvements.

In addition to this, the documentation now has a :ref:`dedicated section <kibana_app>` for the Wazuh app, where you can learn more about its capabilities, how to configure it and install the X-Pack Security plugin.
