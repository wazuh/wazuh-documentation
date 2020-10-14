.. Copyright (C) 2020 Wazuh, Inc.

.. _release_4_0_0:

4.0.0 Release notes
===================

This section lists the changes in version 4.0.0. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/4.0/CHANGELOG.md>`_
- `wazuh/ruleset <https://github.com/wazuh/wazuh-ruleset/blob/4.0/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/blob/master/CHANGELOG.md>`_

Highlights
----------

- The agent enrollment is now performed on the main daemon initialization. There is no need to request a key using an external CLI anymore. (Agents in ``3.x`` version are still 100% compatible with ``4.x`` version)

- A deploy script has been created to download, install, and configure the agent. A Unique command to deploy the agents.

- Wazuh API is now embedded in the Wazuh manager. The API comes by default with the Manager installation.

- Wazuh cluster mode enabled by default.

- Wazuh API RBAC: Set up users, roles, and policies to manage the access permissions. Wazuh WUI now restricts resources depending on permissions.

- Wazuh manager and agents will use TCP as the default communication protocol.

- The Windows agent MSI installer is now signed using DigiCert instead of GlobalSign. DigiCert is known for being present on more Windows versions including the oldest ones.

- FIM implements now a set of settings to control the module temporal files disk usage.


Breaking changes
----------------

- The agent-auth tool starts the deprecation cycle (to be deprecated in v5.0.0).

- Wazuh API has been deprecated. The API is now embedded in the Wazuh manager. No wazuh-api package will be installed anymore.

- Wazuh manager and agents are no longer using UDP as the default communication protocol. TCP is enabled by default.

- OpenSCAP policies removed from RPM and DEB packages. Folder present policies in the agent installation will be removed.


Wazuh core
----------

Added
^^^^^

**Wazuh API**

- Embedded Wazuh API with Wazuh Manager, there is no need to install Wazuh API.

- Migrated Wazuh API server from NodeJS to Python.

- Added asynchronous ``aiohttp`` server for the Wazuh API.

- New Wazuh API is approximately 5 times faster on average.

- Added OpenAPI based Wazuh API specification.

- Improved Wazuh API reference documentation based on OpenAPI spec using redoc.

- Added a new yaml Wazuh API configuration file.

- Added new endpoints to manage API configuration and deprecated ``configure_api.sh``.

- Added RBAC support to Wazuh API.

- Added new endpoints for Wazuh API security management.

- Added SQLAlchemy ORM based database for RBAC.

- Added a new JWT authentication method.

- Wazuh API up and running by default in all nodes for a clustered environment.

- Added new and improved error handling.

- Added tavern and docker based Wazuh API integration tests.

- Added new and unified Wazuh API response structure.

- Added new endpoints for Wazuh API users management.

- Added a new endpoint to restart agents that belong to a node.

- Added and improved ``q`` filter in several endpoints.

- Tested and improved Wazuh API security.

- Added DDOS blocking system.

- Added brute force attack blocking system.

- Added content-type validation.

- Added and updated framework unit tests to increase coverage.

- Added improved support for monitoring paths from environment variables.

- Added auto enrollment capability. Agents are now able to request a key from the manager if the current key is missing or wrong.

**Vulnerability Detector**

- Redhat vulnerabilities are now fetched from OVAL benchmarks.

- Debian vulnerable packages are now fetched from the Security Tracker.

- The Debian Security Tracker feed can be loaded from a custom location.

- Allow compressed feeds for offline updates.

- The manager now updates the MSU feed automatically.

- CVEs with no affected version defined in all the feeds are now reported.

- CVEs vulnerable for the vendor and missing in the NVD are now reported.

Changed
^^^^^^^
- Changed multiple Wazuh API endpoints.

- Refactored framework module in SDK and core.

- FIM Windows events handling refactored.

- Changed framework to access ``global.db`` using ``wazuh-db``.

- Changed ``agent-info`` synchronization task in Wazuh cluster.

Fixed
^^^^^

- Fixed an error with the last scan time in syscheck endpoints.

- Added support for monitoring directories that contain commas.

- Fixed a bug where configuring a directory to be monitored as realtime and whodata resulted in realtime prevailing.

- Fixed using an incorrect mutex while deleting inotify watches.

- Fixed a bug that could cause multiple FIM threads to request the same temporary file.

- Fixed a bug where deleting a file permanently in Windows would not trigger an alert.

- Fixed a typo in the file monitoring options log entry.

- Fixed an error where monitoring a drive in Windows under scheduled or realtime mode would generate alerts from the recycle bin.

- When monitoring a drive in Windows in the format ``U:``, it will monitor ``U:\`` instead of the agent's working directory.

- Fixed a bug where monitoring a drive in Windows with recursion_level set to 0 would trigger alerts from files inside its subdirectories.

- Fixed an Azure wodle dependency error. The package azure-storage-blob>12.0.0 does not include a component used.

**Vulnerability Detector**

- Vulnerabilities of Windows Server 2019 which do not affect to Windows 10 were not being reported.

- Vulnerabilities patched by a Microsoft update with no supersedence were not being reported.

- Vulnerabilities patched by more than one Microsoft update were not being evaluated against all the patches.

- Duplicated alerts in Windows 10.

- Syscollector now discards hotfixes that are not fully installed.

- Syscollector now collects hotfixes that were not being parsed.

Removed
^^^^^^^

- Removed Wazuh API cache endpoints.

- Removed Wazuh API rootcheck endpoints.

- Deprecated Debian Jessie and Wheezy for Vulnerability Detector (EOL).


Wazuh Kibana plugin
-------------------

Added
^^^^^

- Support for Wazuh v4.0.0.

- Support for Kibana v7.9.0.

- Support for Open Distro 1.8.

- Added a RBAC security layer integrated with Open Distro and X-Pack.

- Added remoted and analysisd statistics.

- Expand supported deployment variables.

- Added new configuration view settings for GCP integration.


Changed
^^^^^^^

- Migrated the default index-pattern to ``wazuh-alerts-*``.

- Removed the ``known-fields`` functionality.

- Security Events dashboard redesinged.

- Redesigned the app settings configuration with categories.

- Moved the wazuh-registry file to Kibana optimize folder.


Fixed
^^^^^

- Format options in ``wazuh-alerts`` index-pattern are not overwritten now.

- Prevent blank page in detaill agent view.

- Navigable agents name in Events.

- Index pattern is not being refreshed.

- Reporting fails when agent is pinned and compliance controls are visited.

- Reload rule detail doesn't work properly with the related rules.


Wazuh ruleset
-------------

- Changed compliance rules groups and removed ``alert_by_email`` option by default.

- Let the Ruleset update tool pick up the current version branch by default.


Wazuh packages
--------------

Added
^^^^^

- Added Open Distro for Elasticsearch packages to Wazuh's software repository.

Changed
^^^^^^^

- Wazuh services are no longer enabled nor started in a fresh install.

- Wazuh services will be restarted on upgrade if they were running before upgrading them.

- Wazuh API and Wazuh Manager services are unified in a single wazuh-manager service.

- Wazuh app for Splunk and Wazuh plugin for Kibana have been renamed.

- Wazuh VM now uses Wazuh and Open Distro for Elasticsearch.

Fixed
^^^^^

- Unit files for systemd are now installed on ``/usr/lib/systemd/system``.

- Improved the upgrade of unit files.

- ``ossec-init.conf`` file now shows the build date for any system.

- Fixed an error setting SCA file permissions on ``.deb`` packages.

Removed
^^^^^^^

- The Wazuh API package has been removed. Now, the Wazuh API is embedded into the Wazuh Manager installation.

- Removed OpenSCAP files and integration.


Wazuh documentation
-------------------

Added
^^^^^
- Added instructions to install Wazuh along with Open Distro.

- Added script for Wazuh unattended installation.

- Added tabs in the installation guide to ease the installation process.

- Added a more installation alternatives section that provides installation alternatives such as installation Wazuh along with Elastic Stack, Splunk or installing Wazuh from sources.

Changed
^^^^^^^

- Split the installation guide in All in one installation and distributed deployment.

- Reorganized the upgrade guide.
