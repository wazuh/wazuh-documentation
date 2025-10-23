.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.14.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.14.0 Release notes - 23 October 2025
======================================

This section lists the changes in version 4.14.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

Highlights
----------

The 4.14.0 release enhances configuration flexibility, expands cloud visibility, and strengthens endpoint inventory capabilities. Key updates include agent hot reload configuration, which allows agents to apply configuration changes without breaking connectivity; a new Azure dashboard to monitor Microsoft cloud events; and expanded inventory categories covering browser extensions, services, and users & groups. This version also introduces multiple stability, performance, and security improvements across the platform.

-  `Agent hot reload configuration <https://github.com/wazuh/wazuh/issues/29641>`__: The Wazuh Agent can now apply remote configuration changes dynamically without breaking its connection to the server. All daemons except ``agentd`` are restarted during reload, improving resilience and reducing disruptions across large deployments.
-  `Azure dashboard <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7451>`__: A new dashboard has been added to visualize and query Microsoft Azure cloud events. This includes built-in queries, CSV export, GeoIP processing, and geolocation maps, aligning with AWS and Google Cloud dashboards for a consistent multi-cloud experience.
-  `Inventory – Browser Extensions <https://github.com/wazuh/wazuh/issues/29690>`__: Added a unified inventory model to track browser extensions across Windows, macOS, and Linux systems. Enables security auditing and compliance monitoring for Chrome, Firefox, Safari, and other browsers.
-  `Inventory – Services <https://github.com/wazuh/wazuh/issues/29692>`__: Introduced a normalized inventory of Windows services and Linux systemd units. Provides visibility into service states, startup types, and critical services across endpoints.
-  `Inventory – Users & Groups <https://github.com/wazuh/wazuh/issues/30223>`__: Implemented a cross-platform inventory for system users and groups. Supports normalized data structures, relationships, and consistent queries across agents, Wazuh-DB, and the Dashboard.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

- `#30848 <https://github.com/wazuh/wazuh/pull/30848>`__ Added system users and groups to the inventory data.
- `#31614 <https://github.com/wazuh/wazuh/pull/31614>`__ Added browser extensions and services to the inventory data.
- `#31731 <https://github.com/wazuh/wazuh/pull/31731>`__ Added IPv6 support to the Maltiverse integration.
- `#30192 <https://github.com/wazuh/wazuh/pull/30192>`__ Improved ``databaseFeedManagerTesttool``.
- `#30793 <https://github.com/wazuh/wazuh/pull/30793>`__ Adapted ``wazuh-maild`` to the RFC5322 standard.
- `#31218 <https://github.com/wazuh/wazuh/pull/31218>`__ Improved the Active Response endpoint performance.

Wazuh agent
^^^^^^^^^^^

- `#30235 <https://github.com/wazuh/wazuh/pull/30235>`__ Added support for Parquet version 2 in the AWS wodle.
- `#30797 <https://github.com/wazuh/wazuh/pull/30797>`__ Added hot configuration reload support for Linux agents.
- `#31163 <https://github.com/wazuh/wazuh/pull/31163>`__ Added support for Amazon Inspector v2.
- `#30369 <https://github.com/wazuh/wazuh/pull/30369>`__ Added system users and groups to the inventory data.
- `#805 <https://github.com/wazuh/wazuh-agent/issues/805>`__ Added browser extensions to the inventory data.
- `#807 <https://github.com/wazuh/wazuh-agent/issues/807>`__ Added services to the inventory data.
- `#31418 <https://github.com/wazuh/wazuh/pull/31418>`__ Added missing AWS regions ``us-gov-west-1`` and ``us-gov-east-1`` to the AWS wodle.
- `#32413 <https://github.com/wazuh/wazuh/pull/32413>`__ Added Windows kernel version information to IT Hygiene.
- `#31640 <https://github.com/wazuh/wazuh/pull/31640>`__ Changed rootkit error messages to warnings due to future deprecation.

RESTful API
^^^^^^^^^^^

- `#30913 <https://github.com/wazuh/wazuh/pull/30913>`__ Added Syscollector users and groups endpoints.
- `#31513 <https://github.com/wazuh/wazuh/pull/31513>`__ Added Syscollector services and ``browser_extensions`` endpoints.

Ruleset
^^^^^^^

- `#30745 <https://github.com/wazuh/wazuh/pull/30745>`__ Added SCA content for Rocky Linux 10.
- `#31747 <https://github.com/wazuh/wazuh/pull/31747>`__ Added SCA content for Debian 13.

Other
^^^^^

- `#31272 <https://github.com/wazuh/wazuh/pull/31272>`__ Updated ``packaging`` dependency to 25.0.
- `#30536 <https://github.com/wazuh/wazuh/pull/30536>`__ Updated ``requests`` to version 2.32.4.
- `#30624 <https://github.com/wazuh/wazuh/pull/30624>`__ Updated ``urllib3`` to version 2.5.0 and ``protobuf`` to version 5.29.5.
- `#30916 <https://github.com/wazuh/wazuh/pull/30916>`__ Upgraded Python embedded interpreter to 3.10.18.
- `#31779 <https://github.com/wazuh/wazuh/pull/31779>`__ Updated OpenSSL to 3.0.15 and ``cpp-httplib`` to v0.25.0.
- `#29586 <https://github.com/wazuh/wazuh/issues/29586>`__ Updated SQLite dependency to version 3.50.4.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7777 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7777>`__ Added visualizations field validations when creating ``wazuh-states`` index patterns.
-  `#7554 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7554>`__ Created **Users & Groups** inventories. `#7587 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7587>`__ `#7792 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7792>`__ `#7787 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7787>`__
-  `#7586 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7586>`__ Added the ability to set the Wazuh data path (``wazuh`` directory) within the directory defined through the ``path.data`` setting.
-  `#7641 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7641>`__ Added a new **Browser Extensions** tab in **IT Hygiene**. `#7696 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7696>`__ `#7729 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7729>`__ `#7774 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7774>`__ `#7785 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7785>`__
-  `#7516 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7516>`__ Added Microsoft Graph API module. `#7644 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7644>`__ `#7661 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7661>`__
-  `#7646 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7646>`__ Added a new **Services** tab in **IT Hygiene**. `#7695 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7695>`__ `#7729 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7729>`__ `#7773 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7773>`__ `#7790 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7790>`__
-  `#7711 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7711>`__ Added a final step in the **Deploy new agent** section to navigate back to the agent list.
-  `#7712 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7712>`__ Updated OS logos.
-  `#7742 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7742>`__ Changed the **Services** tab label to **Listeners** in **IT Hygiene** > **Networks**.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

- `#29663 <https://github.com/wazuh/wazuh/pull/29663>`__ Fixed internal decoder RC startup.
- `#29673 <https://github.com/wazuh/wazuh/pull/29673>`__ Fixed queue stats RC over ``wazuh-analysisd``.
- `#29672 <https://github.com/wazuh/wazuh/pull/29672>`__ Fixed race condition in the event queue.
- `#29699 <https://github.com/wazuh/wazuh/pull/29699>`__ Fixed ``regexCompile`` race condition.
- `#30653 <https://github.com/wazuh/wazuh/pull/30653>`__ Fixed malformed alerts in ``alerts.log`` when the ``<group>`` tag contains newline characters.
- `#31599 <https://github.com/wazuh/wazuh/pull/31599>`__ Fixed and improved ``dpkg`` version comparison algorithm in Vulnerability Detector.

Wazuh agent
^^^^^^^^^^^

- `#30831 <https://github.com/wazuh/wazuh/pull/30831>`__ Fixed errors in Azure Graph event fields.
- `#30877 <https://github.com/wazuh/wazuh/pull/30877>`__ Added the missing `prov`i`der` field to the ``whodata`` section in the ``syscheckd`` JSON configuration.
- `#31700 <https://github.com/wazuh/wazuh/pull/31700>`__ Fixed ``journald`` disabled filters when both configuration blocks have no filters.
- `#30215 <https://github.com/wazuh/wazuh/pull/30215>`__ Fixed ``whodata`` FIM compatibility with the latest ``audit`` versions.
- `#31875 <https://github.com/wazuh/wazuh/pull/31875>`__ Fixed mismatch between MTU values in the database and indexer for Windows agents.

RESTful API
^^^^^^^^^^^

- `#31046 <https://github.com/wazuh/wazuh/pull/31046>`__ Fixed secure headers configuration.
- `#31315 <https://github.com/wazuh/wazuh/pull/31315>`__ Fixed display of sensitive information for non-privileged users.

Ruleset
^^^^^^^

- `#29976 <https://github.com/wazuh/wazuh/pull/29976>`__ Fixed multiple Rocky Linux SCA checks generating incorrect results.
- `#30173 <https://github.com/wazuh/wazuh/pull/30173>`__ Fixed missing check (2.3.7.6) in Windows Server 2019 v2.0.0.
- `#30276 <https://github.com/wazuh/wazuh/pull/30276>`__ Fixed camel casing in ownCloud ruleset header.
- `#30489 <https://github.com/wazuh/wazuh/pull/30489>`__ Fixed false positive in check 2.3.3.2 for macOS 13, 14, and 15 SCA.
- `#30529 <https://github.com/wazuh/wazuh/pull/30529>`__ Fixed bug in rule ``92657``.
- `#30528 <https://github.com/wazuh/wazuh/pull/30528>`__ Fixed field names in Office 365 rules.
- `#30515 <https://github.com/wazuh/wazuh/pull/30515>`__ Fixed action field in Fortigate rules.
- `#30612 <https://github.com/wazuh/wazuh/pull/30612>`__ Fixed Auditd EXECVE sibling decoders.
- `#31227 <https://github.com/wazuh/wazuh/pull/31227>`__ Fixed issues with Windows OS languages other than English.
- `#30717 <https://github.com/wazuh/wazuh/pull/30717>`__ Reworked SCA policy for Debian Linux 12.
- `#32025 <https://github.com/wazuh/wazuh/pull/32025>`__ Fixed missing comma in ``0393-fortiauth_rules.xml``.
- `#32102 <https://github.com/wazuh/wazuh/pull/32102>`__ Fixed Windows SCA user account checks.
- `#32106 <https://github.com/wazuh/wazuh/pull/32106>`__ Fixed inaccuracies in Ubuntu 24.04 SCA policy.
- `#32143 <https://github.com/wazuh/wazuh/pull/32143>`__ Fixed incorrect service name in Ubuntu firewall service check.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7811 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7811>`__ Fixed missing scan settings in **Inventory Data**.
-  `#7796 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7796>`__ Fixed the **Endpoint summary** to correctly display outdated agents without filters, resolving previous inconsistencies.
-  `#7596 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7596>`__ Fixed missing ``provider`` and ``queue_size`` fields in whodata configuration.
-  `#7630 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7630>`__ Fixed an error that caused PDF report tables to overflow the page width.
-  `#7611 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7611>`__ Fixed ``TypeError`` when changing API host ID in ``wazuh.yml`` configuration.
-  `#7669 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7669>`__ Fixed behavior and appearance alignment with OpenSearch (Wazuh Indexer) **Dev Tools**.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.14.0/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.14.0/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.14.0/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.14.0/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.14.0/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.14.0/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.14.0/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.14.0/CHANGELOG.md>`__
