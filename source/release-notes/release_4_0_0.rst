.. Copyright (C) 2020 Wazuh, Inc.

.. _release_4_0_0:

4.4.0 Release notes
===================

This section lists the changes in version 4.0.0. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/4.0/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/blob/master/CHANGELOG.md>`_

Highlights
----------

- The agent enrollment is now performed on the main daemon initialization. There is no need to request a key using an external CLI anymore. (Agents in v3.x version are still 100% compatible with v4.x)

- A deploy script has been created to download, install and configure the agent. Unique command to deploy the agents.

- Wazuh API is now embedded in the Wazuh manager. The API comes by default with the Manager installation.

- Wazuh cluster mode enabled by default.

- Wazuh API RBAC: Set up users, roles and policies to manage the access permissions. Wazuh WUI now restricts resources depending on permissions.

- Wazuh manager and agents will use TCP as default communication protocol.

- The Windows agent MSI installer is now signed using DigiCert instead of GlobalSign. DigiCert is known for being present on more Windows versions including oldest ones.

- FIM implements now a set of settings to control the module temporal files disk usage.


Breaking changes
----------------

- The agent-auth tool starts the deprecation cycle (to be deprecated in v5.0.0).

- Wazuh API has been deprecated. The API is now embedded in the Wazuh manager. No wazuh-api package will be installed anymore.

- Wazuh manager and agents are not longer using UDP as default communication protocol. TCP is enabled by default.

- OpenSCAP policies removed from RPM and DEB packages. Folder present policies in the agent installation will be removed.


Wazuh Kibana plugin
-------------------


**Added**

- Support for Wazuh v4.0.0

- Support for Kibana v7.9.0

- Support for Open Distro 1.8

- Added a RBAC security layer integrated with OpenDistro and x-pack

- Added remoted and analysisd statistics

- Expand supported deployment variables

- Added new configuration view settings for GCP integration


**Changed**

- Migrated the default index-pattern to wazuh-alerts-*

- Removed the known-fields functionality

- Security Events dashboard redesinged

- Redesigned the app settings configuration with categories

- Moved the wazuh-registry file to Kibana optimize folder 


**Fixed**

- Format options in wazuh-alerts index-pattern are not overwritten now

- Prevent blank page in detaill agent view

- Navigable agents name in Events

- Index pattern is not being refreshed

- Reporting fails when agent is pinned and compliance controls are visited

- Reload rule detail doesn't work properly with the related rules


Wazuh ruleset
-------------

- Changed compliance rules groups and removed ``alert_by_email`` option by default.

Wazuh packages
--------------

**Added**

- Added Open Distro for Elasticsearch packages to Wazuh's software repository.


**Changed**

- Wazuh services are no longer enabled nor started in a fresh install.
- Wazuh services will be restarted on upgrade if they were running before upgrading them.
- Wazuh API and Wazuh Manager services are unified in a single wazuh-manager service.
- Wazuh app for Splunk and Wazuh plugin for Kibana have been renamed.
- Wazuh VM now uses Wazuh and Open Distro for Elasticsearch.


**Fixed**

- Unit files for systemd are now installed on /usr/lib/systemd/system.
- Unit files are now correctly upgraded.
- ossec-init.conf file now shows the build date for any system.
- Fixed an error setting SCA file permissions on .deb packages.
- Removed
- Removed Wazuh API package has been removed. Now, the Wazuh API is embedded into the Wazuh Manager installation.
- Removed OpenSCAP files and integration.

Wazuh documentation
-------------------

- Added two different sections in the installation guide to install Wazuh alogn Elastic stack or Open Distro for Elasticsearch.
- Reorganized the installation guide to choose between all in one deployment or distributed deployment.
- Added scripts for unattended installations.
- Reorganized the upgrade guide.
