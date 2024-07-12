.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.9.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.9.0 Release notes - TBD
=========================

This section lists the changes in version 4.9.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

Highlights
----------

This release introduces several significant updates aimed at enhancing functionality, compatibility, and user experience. Key updates include support for journald logs in Logcollector, improved compatibility with OpenSearch 2.11.0, and integration with AWS Security Hub. Additionally, there are improvements to WPK packages and enhancements in the Wazuh-API with Connexion 3.0 and Uvicorn support. The release also addresses numerous bugs, further stabilizing the platform and improving overall performance.

-  `Journald support in Logcollector <https://github.com/wazuh/wazuh/issues/12862>`__: Systemd's journald logging is now supported, enabling Logcollector to monitor these logs, which can provide valuable information for users.
-  `Integrate Wazuh with AWS Security Hub <https://github.com/wazuh/wazuh/issues/21209>`__: Wazuh now integrates with AWS Security Hub, enabling users to manage security and assess compliance with best practices directly within AWS.
-  `Improve WPKs <https://github.com/wazuh/wazuh/issues/21152>`__: The WPK packages' logic has been streamlined, reducing complexity, especially in the backup/rollback process, and ensuring smoother updates.
-  `Refactoring and redesign Endpoints Summary charts <https://github.com/wazuh/wazuh-dashboard-plugins/issues/6258>`__: The Endpoints Summary charts have been refactored and redesigned for improved clarity and usability.
-  **New or updated SCA policies**: Added support for Oracle Linux 9, Alma Linux 9, and Rocky Linux 9, and updated policies for RedHat 7, CentOS 7, RedHat 8, and CentOS 8.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#17306 <https://github.com/wazuh/wazuh/pull/17306>`__ Added alert forwarding to Fluentd.
-  `#20285 <https://github.com/wazuh/wazuh/pull/20285>`__ Changed logging level of  wazuh-db ``recv()`` messages from error to debug.
-  `#16666 <https://github.com/wazuh/wazuh/pull/16666>`__ Fixed malformed JSON error in wazuh-analysisd.
-  `#23727 <https://github.com/wazuh/wazuh/pull/23727>`__ Added missing functionality for vulnerability scanner translations.
-  `#23722 <https://github.com/wazuh/wazuh/pull/23722>`__ Improved performance for vulnerability scanner translations.
-  `#24536 <https://github.com/wazuh/wazuh/pull/24536>`__ Enhanced vulnerability scanner logging to be more expressive.
-  `#17306 <https://github.com/wazuh/wazuh/pull/17306>`__ The manager now supports alert forwarding to Fluentd.
-  `#23513 <https://github.com/wazuh/wazuh/pull/23513>`__ Added the HAProxy helper to manage load balancer configuration and automatically balance agents.

Wazuh agent
^^^^^^^^^^^

-  `#19753 <https://github.com/wazuh/wazuh/pull/19753>`__ Removed the directory ``/boot`` from the default FIM settings for AIX.
-  `#21690 <https://github.com/wazuh/wazuh/pull/21690>`__ Improved debugging logs for Windows registry monitoring configuration. Now the ``Wrong registry value type`` warnings include the registry path to help troubleshooting. Thanks to Zafer Balkan (`@zbalkan <https://github.com/zbalkan>`__).
-  `#21287 <https://github.com/wazuh/wazuh/pull/21287>`__ Added Amazon Linux 1 and Amazon Linux 2023 support for the Wazuh installation assistant.
-  `#23137 <https://github.com/wazuh/wazuh/pull/23137>`__ Added Journald support in Logcollector.
-  `#20727 <https://github.com/wazuh/wazuh/pull/20727>`__ Fixed Windows Agent 4.8.0 permission errors on Windows 11 after upgrade.
-  `#22440 <https://github.com/wazuh/wazuh/pull/22440>`__ Fixed Syscollector not checking if there's a scan in progress before starting a new one.
-  `#16487 <https://github.com/wazuh/wazuh/pull/16487>`__ Fixed alerts are created when syscheck diff DB is full.
-  `#2195 <https://github.com/wazuh/wazuh/pull/2195>`__ Fixed Wazuh deb uninstallation to remove non-config files.
-  `#23273 <https://github.com/wazuh/wazuh/pull/23273>`__ Fixed improper Windows agent ACL on non-default installation directory.
-  `#17664 <https://github.com/wazuh/wazuh/pull/17664>`__ Fixed socket configuration of an agent is displayed.
-  `#18494 <https://github.com/wazuh/wazuh/pull/18494>`__ Fixed wazuh-modulesd printing child process not found error.
-  `#23848 <https://github.com/wazuh/wazuh/pull/23848>`__ Fixed issue with an agent starting automatically without reason.
-  `#17415 <https://github.com/wazuh/wazuh/pull/17415>`__ Fixed GET /syscheck to properly report size for files larger than 2GB.
-  `#23203 <https://github.com/wazuh/wazuh/pull/23203>`__ Added support for Amazon Security Hub via AWS SQS.

RESTful API
^^^^^^^^^^^

-  `#23199 <https://github.com/wazuh/wazuh/pull/23199>`__ Replaced ``aiohttp`` server with ``uvicorn``.
-  `#23199 <https://github.com/wazuh/wazuh/pull/23199>`__ Changed the ``PUT /groups/{group_id}/configuration`` endpoint response error code when uploading an empty file.
-  `#23199 <https://github.com/wazuh/wazuh/pull/23199>`__ Changed the ``GET``, ``PUT`` and ``DELETE /lists/files/{filename}`` endpoints response status code when an invalid file is used.
-  `#23199 <https://github.com/wazuh/wazuh/pull/23199>`__ Changed the ``PUT /manager/configuration`` endpoint response status code when uploading a file with invalid content-type.

Ruleset
^^^^^^^

-  `#19754 <https://github.com/wazuh/wazuh/pull/19754>`__ Clarified the description for rule ID ``23502`` about solved vulnerabilities.

Other
^^^^^

-  `#20778 <https://github.com/wazuh/wazuh/pull/20778>`__ Upgraded external OpenSSL library dependency version used by Wazuh from ``V1`` to ``V3``.
-  `#23199 <https://github.com/wazuh/wazuh/pull/23199>`__ Upgraded external ``connexion`` library dependency version to ``3.0.5`` and its related interdependencies.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#6145 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6145>`__ Added AngularJS dependencies.
-  `#6580 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6580>`__ Migrated from AngularJS to ReactJS. `#6555 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6555>`__ `#6618 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6618>`__ `#6613 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6613>`__ `#6631 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6631>`__ `#6594 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6594>`__
-  `#6120 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/6120>`__ Removed embedded discover component. `#6235 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6235>`__ `#6254 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6254>`__ `#6285 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6285>`__ `#6288 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6288>`__ `#6286 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6286>`__ `#6459 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6459>`__ `#6438 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6438>`__ `#6434 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6434>`__ `#6537 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6537>`__ `#6528 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6528>`__ `#6558 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6558>`__ `#6734 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6734>`__ `#6771 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6771>`__ `#6756 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6756>`__
-  `#6268 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6268>`__ Refactored the **Endpoints Summary** charts.
-  `#6250 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6250>`__ Added agent groups edition to **Endpoints Summary**. `#6274 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6274>`__
-  `#6476 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6476>`__ Added a filter to select outdated agents and the **Upgrade** agent action to **Endpoints Summary**. `#6501 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6501>`__ `#6529 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6529>`__ `#6648 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6648>`__
-  `#6337 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6337>`__ Changed the way the configuration is managed in the backend side. `#6519 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6519>`__ `#6573 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6573>`__
-  `#6337 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6337>`__ Added a migration task to setup the configuration using a configuration file.
-  `#6337 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6337>`__ Moved the content of the **API is down** and **Check connection** views to the **Server APIs** view.
-  `#6545 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6545>`__ Added macOS log collection tab.
-  `#6481 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6481>`__ Removed the ``GET /api/timestamp`` API endpoint.
-  `#6481 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6481>`__ Removed the ``PUT /api/update-hostname/{id}`` API endpoint.
-  `#6481 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6481>`__ Removed the ``DELETE /hosts/remove-orphan-entries`` API endpoint.
-  `#6573 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6573>`__ Enhanced the validation for ``enrollment.dns`` on App Settings application.
-  `#6607 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6607>`__ Implemented the option to control configuration editing via API endpoints and UI.
-  `#6572 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6572>`__ Added the **Journald** log collector tab.
-  `#6482 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6482>`__ Implemented new data source feature on MITRE ATT&CK module.
-  `#6653 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6653>`__ Added HAProxy helper settings to cluster configuration.
-  `#6660 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6660>`__ Changed log collector socket configuration response property.
-  `#6558 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6558>`__ Added the ability to open the report file and the reporting application from toast message.
-  `#6558 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6558>`__ Added Office 365 support for agents.
-  `#6716 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6716>`__ Refactored the search bar to handle fixed and user-added filters correctly. `#6755 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6755>`__
-  `#6714 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6714>`__ Replaced the custom ``EuiSuggestItem`` component with the native component from OpenSearch UI.
-  `#6800 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6800>`__ Added pinned agent data validation when rendering the **Inventory data**, **Stats**, and **Configuration** tabs in Agent preview of **Endpoints Summary**.
-  `#6534 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6534>`__ Improvement of the filter management system by implementing new standard modules. `#6772 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6772>`__
-  `#6745 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6745>`__ Generate URL with predefined filters.
-  `#6782 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6782>`__ Removed unused API endpoints from creation of old visualizations: ``GET /elastic/visualizations/{tab}/{pattern}``.

Packages
^^^^^^^^
-  `#2989 <https://github.com/wazuh/wazuh-packages/pull/2989>`__ Updated Password Tool to add default user and password to the filebeat.yml when changing passwords
-  `#2991 <https://github.com/wazuh/wazuh-packages/pull/2991>`__ Allow installation on any OS
-  `#2970 <https://github.com/wazuh/wazuh-packages/pull/2970>`__ Added support for Rocky Linux 9.4 in Installation assistant
-  `#2944 <https://github.com/wazuh/wazuh-packages/pull/2944>`__ Update API script file name
-  `#2698 <https://github.com/wazuh/wazuh-packages/pull/2698>`__ Add new Azure module files
-  `#2945 <https://github.com/wazuh/wazuh-packages/pull/2945>`__ Added support for Ubuntu 24.04 in Installation assistant
-  `#2922 <https://github.com/wazuh/wazuh-packages/pull/2922>`__ Changed log message when not yum nor apt-get are found. Added clearer instructions on following steps
-  `#2911 <https://github.com/wazuh/wazuh-packages/pull/2911>`__ Cert-tool logfile added. Modified common_logger function to write on files without root permission
-  `#2908 <https://github.com/wazuh/wazuh-packages/pull/2908>`__ Add bash dependency to Wazuh agent RPM for AIX
-  `#2909 <https://github.com/wazuh/wazuh-packages/pull/2909>`__ Prevent failed checks related to dashboard and indexer
-  `#2900 <https://github.com/wazuh/wazuh-packages/pull/2900>`__ Installation Assistant language agnostic
-  `#2882 <https://github.com/wazuh/wazuh-packages/pull/2882>`__ Added rollBack to several exit points
-  `#2753 <https://github.com/wazuh/wazuh-packages/pull/2753>`__ Adding support for Amazon Linux 1, 2, and 2023
-  `#2790 <https://github.com/wazuh/wazuh-packages/pull/2790>`__ Added support for AL2023 in WIA

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#20505 <https://github.com/wazuh/wazuh/pull/20505>`__ Fixed compilation issue for local installation.
-  `#24375 <https://github.com/wazuh/wazuh/pull/24375>`__ Fixed a warning when uninstalling the Wazuh manager if the vulnerability detection feed is missing.
-  `#24393 <https://github.com/wazuh/wazuh/pull/24393>`__ Ensured vulnerability detection scanner log messages end with a period.

Wazuh agent
^^^^^^^^^^^

-  `#19146 <https://github.com/wazuh/wazuh/pull/19146>`__ Fixed command monitoring on Windows to support UTF-8 characters.
-  `#21455 <https://github.com/wazuh/wazuh/pull/21455>`__ Fixed an error in Windows agents preventing whodata policies loading.
-  `#21595 <https://github.com/wazuh/wazuh/pull/21595>`__ Fixed an unexpected error where the manager received messages with a reported size not corresponding to the bytes received.
-  `#21729 <https://github.com/wazuh/wazuh/pull/21729>`__ Prevented backup failures during WPK upgrades. A dependency check for the tar package was added.
-  `#22210 <https://github.com/wazuh/wazuh/pull/22210>`__ Fixed a crash of the agent due to a library incompatibility.
-  `#21728 <https://github.com/wazuh/wazuh/pull/21728>`__ Fixed an error of the Osquery integration on Windows that prevented loading ``osquery.conf``.
-  `#22588 <https://github.com/wazuh/wazuh/pull/22588>`__ Fixed a crash in the agent Rootcheck component when using ``<ignore>``.
-  `#20425 <https://github.com/wazuh/wazuh/pull/20425>`__ Fixed the agent not deleting the ``wazuh-agent.state`` file in Windows when stopped.
-  `#24412 <https://github.com/wazuh/wazuh/pull/24412>`__ Fixed error in packages generation for CentOS 7.
-  `#22392 <https://github.com/wazuh/wazuh/pull/22392>`__ Fixed Azure auditLogs/signIns status parsing (thanks to `@Jmnis <https://github.com/jmnis>`__ for the contribution).

Ruleset
^^^^^^^

-  `#22178 <https://github.com/wazuh/wazuh/pull/22178>`__ Added parsing of the optional ``node=`` log heading field to Audit decoders.

Other
^^^^^

-  `#19794 <https://github.com/wazuh/wazuh/pull/19794>`__ Fixed a buffer overflow hazard in HMAC internal library.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#6237 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6237>`__ Fixed disappearing scripted fields when index pattern fields refreshed.
-  `#6667 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6667>`__ Fixed invalid IP address ranges and file hashes in sample alert scripts.
-  `#6558 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6558>`__ Fixed error of malformed table row in PDF report generation.
-  `#6730 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6730>`__ Fixed the validation of the maximum allowed time interval for cron jobs.
-  `#6747 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6747>`__ Fixed styles in small height viewports.
-  `#6770 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6770>`__ Fixed behavior in **Configuration Assessment** when changing API.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.9.0/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.9.0-2.11.0/CHANGELOG.md>`__
-  `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/blob/v4.9.0/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.9.0/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.9.0/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.9.0/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.9.0/CHANGELOG.md>`__

-  `wazuh/wazuh-qa <https://github.com/wazuh/wazuh-qa/blob/v4.9.0/CHANGELOG.md>`__
-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.9.0/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.9.0/CHANGELOG.md>`__
