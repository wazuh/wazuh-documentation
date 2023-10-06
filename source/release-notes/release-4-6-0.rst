.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.6.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.6.0 Release notes - TBD
=========================

This section lists the changes in version 4.6.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

Highlights
----------

- Included support for the Microsoft Graph Security API. This addition enables users to integrate and fetch security alerts from multiple Microsoft products. It provides a cohesive security perspective.

- Added the Webhook input API endpoint. It paves the way to dynamic integrations and real-time responses. It enhances automation capabilities and responsiveness.

- Incorporated Office 365 support for GCC/GCCH. This addition extends monitoring coverage for organizations with a strong reliance on Office 365, particularly in GCC/GCCH environments. It ensures comprehensive compliance and security.

- Support for AlmaLinux OS, Debian 12, and Amazon Linux 2022 is now included in Vulnerability Detector. Expanding support to newer OS versions demonstrates the platform adaptability to the evolving Linux ecosystem. It also highlights our commitment to user safety across diverse environments.

- Included PCRE2 support in Security Configuration Assessment (SCA). This addition provides users with a more powerful pattern-matching tool. It enhances the software auditing and compliance capabilities


What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

- `#13559 <https://github.com/wazuh/wazuh/pull/13559>`__ ``wazuh-authd`` can now generate X509 certificates.
- `#13797 <https://github.com/wazuh/wazuh/pull/13797>`__ Introduced a new CLI to manage features related to the Wazuh API RBAC resources.
- `#13034 <https://github.com/wazuh/wazuh/issues/13034>`__ Added support for Amazon Linux 2022 in Vulnerability Detector.
- `#16343 <https://github.com/wazuh/wazuh/pull/16343>`__ Added support for Alma Linux in Vulnerability Detector.
- `#18542 <https://github.com/wazuh/wazuh/pull/18542>`__ Added support for Debian 12 in Vulnerability Detector.
- `#14953 <https://github.com/wazuh/wazuh/pull/14953>`__ Added mechanism in ``wazuh-db`` to identify fragmentation and perform vacuum.
- `#18333 <https://github.com/wazuh/wazuh/pull/18333>`__ Added an option to set whether the manager should ban newer agents.
- `#15661 <https://github.com/wazuh/wazuh/pull/15661>`__ Added mechanism to prevent Wazuh agents connections to lower manager versions.
- `#14659 <https://github.com/wazuh/wazuh/pull/14659>`__ ``wazuh-remoted`` now checks the size of the files to avoid malformed ``merged.mg``.
- `#14024 <https://github.com/wazuh/wazuh/pull/14024>`__ Added a limit option for the Rsync dispatch queue size.
- `#14026 <https://github.com/wazuh/wazuh/pull/14026>`__ Added a limit option for the Rsync thread pool.
- `#14549 <https://github.com/wazuh/wazuh/pull/14549>`__ ``wazuh-authd`` now shows a warning when deprecated forcing options are present in the configuration.
- `#14804 <https://github.com/wazuh/wazuh/pull/14804>`__ The agent now notifies the manager when Active Response fails to run ``netsh``.
- `#13906 <https://github.com/wazuh/wazuh/pull/13906>`__ Use a new broadcast system to send agent group information from the master node of a cluster.
- `#15220 <https://github.com/wazuh/wazuh/pull/15220>`__ Changed cluster ``send_request`` method so that timeouts are treated as exceptions and not as responses.
- `#13065 <https://github.com/wazuh/wazuh/pull/13065>`__ Refactored methods responsible for file synchronization within the cluster.
- `#16065 <https://github.com/wazuh/wazuh/pull/16065>`__ Changed schema constraints for ``sys_hwinfo`` table.
- `#15709 <https://github.com/wazuh/wazuh/pull/15709>`__ The Auth process does not start when the registration password is empty.

Agent
^^^^^

- `#15226 <https://github.com/wazuh/wazuh/pull/15226>`__ Added GuardDuty Native support to the AWS integration.
- `#14768 <https://github.com/wazuh/wazuh/pull/14768>`__ Added ``--prefix`` parameter to Azure Storage integration.
- `#16493 <https://github.com/wazuh/wazuh/pull/16493>`__ Added validations for empty and invalid values in AWS integration.
- `#13573 <https://github.com/wazuh/wazuh/pull/13573>`__ Added new unit tests for GCloud integration and increased coverage to 99%.
- `#14104 <https://github.com/wazuh/wazuh/pull/14104>`__ Added new unit tests for Azure Storage integration and increased coverage to 99%.
- `#14177 <https://github.com/wazuh/wazuh/pull/14177>`__ Added new unit tests for Docker Listener integration.
- `#18116 <https://github.com/wazuh/wazuh/pull/18116>`__ Added support for Microsoft Graph security API.
- `#15852 <https://github.com/wazuh/wazuh/pull/15852>`__ Added wildcard support in FIM Windows registers.
- `#15973 <https://github.com/wazuh/wazuh/pull/15973>`__ Added wildcards support for folders in the localfile configuration on Windows.
- `#14782 <https://github.com/wazuh/wazuh/pull/14782>`__ Added new settings ``ignore`` and ``restrict`` to logcollector.
- `#12745 <https://github.com/wazuh/wazuh/pull/12745>`__ Added RSync and DBSync to FIM.
- `#17124 <https://github.com/wazuh/wazuh/pull/17124>`__ Added PCRE2 regex for SCA policies.
- `#14763 <https://github.com/wazuh/wazuh/pull/14763>`__ Added mechanism to detect policy changes.
- `#13264 <https://github.com/wazuh/wazuh/pull/13264>`__ FIM option ``fim_check_ignore`` now applies to files and directories.
- `#16531 <https://github.com/wazuh/wazuh/pull/16531>`__ Changed AWS integration to take into account the user configuration found in the ``.aws/config`` file.
- `#14537 <https://github.com/wazuh/wazuh/pull/14537>`__ Changed the calculation of timestamps in AWS and Azure modules by using UTC timezone.
- `#15009 <https://github.com/wazuh/wazuh/pull/15009>`__ Changed the AWS integration to only show the ``Skipping file with another prefix`` message in debug mode.
- `#14999 <https://github.com/wazuh/wazuh/pull/14999>`__ Changed debug level required to display CloudWatch Logs event messages.
- `#17447 <https://github.com/wazuh/wazuh/pull/17447>`__ Changed syscollector database default permissions.
- `#17161 <https://github.com/wazuh/wazuh/pull/17161>`__ Changed agent IP lookup algorithm.
- `#14499 <https://github.com/wazuh/wazuh/pull/14499>`__ Changed InstallDate origin in Windows installed programs.
- `#14524 <https://github.com/wazuh/wazuh/pull/14524>`__ Enhanced clarity of certain error messages in the AWS integration for better exception tracing.
- `#13420 <https://github.com/wazuh/wazuh/pull/13420>`__ Improved external integrations SQLite queries.
- `#16325 <https://github.com/wazuh/wazuh/pull/16325>`__ Improved items iteration for ``Config`` and ``VPCFlow`` AWS integrations.
- `#14784 <https://github.com/wazuh/wazuh/pull/14784>`__ Unit tests have been added to the shared JSON handling library.
- `#14476 <https://github.com/wazuh/wazuh/pull/14476>`__ Unit tests have been added to the shared SQLite handling library.
- `#15032 <https://github.com/wazuh/wazuh/pull/15032>`__ Improved command to change user and group from version 4.2.x to 4.x.x.
- `#15647 <https://github.com/wazuh/wazuh/pull/15647>`__ Changed the internal value of the ``open_attemps`` configuration.
- `#13878 <https://github.com/wazuh/wazuh/pull/13878>`__ The unused option ``local_ip`` for agent configuration has been deleted.
- `#14684 <https://github.com/wazuh/wazuh/pull/14684>`__ Removed unused migration functionality from the AWS integration.
- `#17655 <https://github.com/wazuh/wazuh/pull/17655>`__ Deleted definitions of repeated classes in the AWS integration.
- `#15031 <https://github.com/wazuh/wazuh/pull/15031>`__ Removed duplicate methods in ``AWSBucket`` and reuse inherited ones from ``WazuhIntegration``.
- `#16547 <https://github.com/wazuh/wazuh/pull/16547>`__ Added support for Office365 MS/Azure Government Community Cloud (GCC) and Government Community Cloud High (GCCH) API.

RESTful API
^^^^^^^^^^^

- `#17670 <https://github.com/wazuh/wazuh/pull/17670>`__ Added ``POST /events`` API endpoint to ingest logs through the API.
- `#17865 <https://github.com/wazuh/wazuh/pull/17865>`__ Added ``query``, ``select`` and ``distinct`` parameters to multiple endpoints.
- `#13919 <https://github.com/wazuh/wazuh/pull/13919>`__ Added a new upgrade and migration mechanism for the RBAC database.
- `#13654 <https://github.com/wazuh/wazuh/pull/13654>`__ Added a new API configuration option to rotate log files based on a given size.
- `#15994 <https://github.com/wazuh/wazuh/issues/15994>`__ Added ``relative_dirname`` parameter to GET, PUT and DELETE methods of the ``/decoder/files/{filename}`` and ``/rule/files/{filename}`` endpoints.
- `#18212 <https://github.com/wazuh/wazuh/pull/18212>`__ Added a new configuration option to disable uploading configurations containing the new ``allow_higher_version`` setting.
- `#13615 <https://github.com/wazuh/wazuh/pull/13615>`__ Added API integration tests documentation.
- `#13646 <https://github.com/wazuh/wazuh/pull/13646>`__ Changed the API's response status code for Wazuh cluster errors from 400 to 500.
- `#15934 <https://github.com/wazuh/wazuh/pull/15934>`__ Removed legacy code related to agent databases in ``/var/agents/db``.
- `#19001 <https://github.com/wazuh/wazuh/pull/19001>`__ Changed Operational API error messages to include additional information.

Ruleset
^^^^^^^

- `#14138 <https://github.com/wazuh/wazuh/pull/14138>`__ The SSHD decoder has been improved to catch disconnection events.

Wazuh dashboard
^^^^^^^^^^^^^^^

- `#5197 <https://github.com/wazuh/wazuh-kibana-app/pull/5197>`__ `#5274 <https://github.com/wazuh/wazuh-kibana-app/pull/5274>`__ `#5298 <https://github.com/wazuh/wazuh-kibana-app/pull/5298>`__ `#5409 <https://github.com/wazuh/wazuh-kibana-app/pull/5409>`__ Added ``rel="noopener noreferrer"`` in documentation links.
- `#5203 <https://github.com/wazuh/wazuh-kibana-app/pull/5203>`__ Added ``ignore`` and ``restrict`` options to Syslog configuration.
- `#5376 <https://github.com/wazuh/wazuh-kibana-app/pull/5376>`__ Added the ``extensions.github`` and ``extensions.office`` settings to the default configuration file.
- `#4163 <https://github.com/wazuh/wazuh-kibana-app/pull/4163>`__ Added new global error treatment (client-side).
- `#5519 <https://github.com/wazuh/wazuh-kibana-app/pull/5519>`__ Added new CLI to generate API data from specification file.
- `#5551 <https://github.com/wazuh/wazuh-kibana-app/pull/5551>`__ Added specific RBAC permissions to the Security section.
- `#5443 <https://github.com/wazuh/wazuh-kibana-app/pull/5443>`__ Added **Refresh** and **Export formatted** button to panels in **Agents > Inventory data**.
- `#5491 <https://github.com/wazuh/wazuh-kibana-app/pull/5491>`__ Added **Refresh** and **Export formatted** buttons to **Management > Cluster > Nodes**.
- `#5201 <https://github.com/wazuh/wazuh-kibana-app/pull/5201>`__ Changed of regular expression in RBAC.
- `#5384 <https://github.com/wazuh/wazuh-kibana-app/pull/5384>`__ Migrated the ``timeFilter``, ``metaFields``, and ``maxBuckets`` health checks inside the ``pattern`` check.
- `#5485 <https://github.com/wazuh/wazuh-kibana-app/pull/5485>`__ Changed the query to search for an agent in **Management > Configuration**.
- `#5476 <https://github.com/wazuh/wazuh-kibana-app/pull/5476>`__ Changed the search bar in ``management/log`` to the one used in the rest of the app.
- `#5457 <https://github.com/wazuh/wazuh-kibana-app/pull/5457>`__ Changed the design of the wizard to add agents.
- `#5363 <https://github.com/wazuh/wazuh-kibana-app/pull/5363>`__ `#5442 <https://github.com/wazuh/wazuh-kibana-app/pull/5442>`__ `#5443 <https://github.com/wazuh/wazuh-kibana-app/pull/5443>`__ `#5444 <https://github.com/wazuh/wazuh-kibana-app/pull/5444>`__ `#5445 <https://github.com/wazuh/wazuh-kibana-app/pull/5445>`__ `#5447 <https://github.com/wazuh/wazuh-kibana-app/pull/5447>`__ `#5452 <https://github.com/wazuh/wazuh-kibana-app/pull/5452>`__ `#5491 <https://github.com/wazuh/wazuh-kibana-app/pull/5491>`__ `#5785 <https://github.com/wazuh/wazuh-kibana-app/pull/5785>`__  Introduced a new, enhanced search bar. It adds new features to all the searchable tables which leverages the Wazuh API. It also addresses some of the issues found in the previous version.
- `#5451 <https://github.com/wazuh/wazuh-kibana-app/pull/5451>`__ Removed deprecated request and code in agent's view.
- `#5453 <https://github.com/wazuh/wazuh-kibana-app/pull/5453>`__ Removed unnecessary dashboard queries caused by the deploy agent view.
- `#5500 <https://github.com/wazuh/wazuh-kibana-app/pull/5500>`__ Removed repeated and unnecessary requests in the Security section.
- `#5519 <https://github.com/wazuh/wazuh-kibana-app/pull/5519>`__ Removed scripts to generate API data from live Wazuh manager.
- `#5532 <https://github.com/wazuh/wazuh-kibana-app/pull/5532>`__ Removed the ``pretty`` parameter from cron job requests.
- `#5528 <https://github.com/wazuh/wazuh-kibana-app/pull/5528>`__ Removed unnecessary requests in the **Management > Status** section.
- `#5485 <https://github.com/wazuh/wazuh-kibana-app/pull/5485>`__ Removed obsolete code that caused duplicate requests to the API in **Management**.
- `#5592 <https://github.com/wazuh/wazuh-kibana-app/pull/5592>`__ Removed unused embedded ``jquery-ui``.

Resolved issues
---------------

This release resolves known issues as the following: 

Wazuh manager
^^^^^^^^^^^^^

==============================================================     =============
Reference                                                          Description
==============================================================     =============
`#13979 <https://github.com/wazuh/wazuh/pull/13979>`__             Fixed ``wazuh-remoted`` not updating total bytes sent in UDP.
`#14356 <https://github.com/wazuh/wazuh/pull/14356>`__             Fixed translation of packages with a missing version in CPE Helper for Vulnerability Detector.
`#14174 <https://github.com/wazuh/wazuh/pull/14174>`__             Fixed undefined behavior issues in Vulnerability Detector unit tests.
`#14019 <https://github.com/wazuh/wazuh/pull/14019>`__             Fixed permission error when producing FIM alerts.
`#15164 <https://github.com/wazuh/wazuh/pull/15164>`__             Fixed memory leaks in ``wazuh-authd``.
`#14763 <https://github.com/wazuh/wazuh/pull/14763>`__             Fixed Audit policy change detection in FIM for Windows.
`#14408 <https://github.com/wazuh/wazuh/pull/14408>`__             Fixed ``origin_module`` variable value when sending API or framework messages to core sockets.
`#15715 <https://github.com/wazuh/wazuh/pull/15715>`__             Fixed an issue where an erroneous tag appeared in the cluster logs.
`#15250 <https://github.com/wazuh/wazuh/issues/15250>`__           Fixed log error displayed when there's a duplicate worker node name within a cluster.
`#15487 <https://github.com/wazuh/wazuh/pull/15487>`__             Resolved an issue in the ``agent_upgrade`` CLI when used from worker nodes.
`#18047 <https://github.com/wazuh/wazuh/issues/18047>`__           Fixed error in the ``agent_upgrade`` CLI when displaying upgrade result.
`#15277 <https://github.com/wazuh/wazuh/pull/15277>`__             Fixed error in which the connection with the cluster was broken in local clients for not sending keepalives messages.
`#15298 <https://github.com/wazuh/wazuh/pull/15298>`__             Fixed error in which exceptions were not correctly handled when ``dapi_err`` command could not be sent to peers.
`#16257 <https://github.com/wazuh/wazuh/pull/16257>`__             Fixed error in worker's Integrity sync task when a group folder was deleted in master.
`#16506 <https://github.com/wazuh/wazuh/pull/16506>`__             Fixed error when trying to update an agent through the API or the CLI while pointing to a WPK file.
`#15074 <https://github.com/wazuh/wazuh/pull/15074>`__             Fixed ``wazuh-remoted`` high CPU usage in a master node without agents.
`#16101 <https://github.com/wazuh/wazuh/pull/16101>`__             Fixed race condition in ``wazuh-analysisd`` handling the rule ignore option.
`#16000 <https://github.com/wazuh/wazuh/pull/16000>`__             Fixed missing rules and decoders in Analysisd JSON report.
`#14356 <https://github.com/wazuh/wazuh/pull/14356>`__             Fixed translation of packages with missing version in CPE Helper.
`#15826 <https://github.com/wazuh/wazuh/pull/15826>`__             Fixed log date parsing at predecoding stage.
`#14019 <https://github.com/wazuh/wazuh/pull/14019>`__             Fixed permission error in JSON alert.
==============================================================     =============

Agent
^^^^^

==============================================================     =============
Reference                                                          Description
==============================================================     =============
`#13534 <https://github.com/wazuh/wazuh/pull/13534>`__             Fixed the architecture of the dependency URL for macOS.
`#13588 <https://github.com/wazuh/wazuh/pull/13588>`__             Fixed a path length limitation that prevented FIM from reporting changes on Windows.
`#14993 <https://github.com/wazuh/wazuh/pull/14993>`__             Updated the AWS integration to use the regions specified in the AWS config file when no regions are provided in ``ossec.conf``.
`#14850 <https://github.com/wazuh/wazuh/pull/14850>`__             Corrected the error code ``#2`` for the SIGINT signal within the AWS integration.
`#14740 <https://github.com/wazuh/wazuh/pull/14740>`__             Fixed the ``discard_regex`` functionality for the AWS GuardDuty integration.
`#14500 <https://github.com/wazuh/wazuh/pull/14500>`__             Fixed error messages in the AWS integration when there is a ``ClientError``.
`#14493 <https://github.com/wazuh/wazuh/pull/14493>`__             Fixed error that could lead to duplicate logs when using the same dates in the AWS integration.
`#16116 <https://github.com/wazuh/wazuh/pull/16116>`__             Fixed ``check_bucket`` method in AWS integration to be able to find logs without a folder in root.
`#16360 <https://github.com/wazuh/wazuh/pull/16360>`__             Added field validation for ``last_date.json`` in Azure Storage integration.
`#15763 <https://github.com/wazuh/wazuh/pull/15763>`__             Improved handling of invalid regions given to the VPCFlow AWS integration, enhancing exception clarity.
`#16070 <https://github.com/wazuh/wazuh/pull/16070>`__             Fixed error in the GCloud Subscriber unit tests.
`#16410 <https://github.com/wazuh/wazuh/pull/16410>`__             Fixed the marker that AWS custom integrations use.
`#16365 <https://github.com/wazuh/wazuh/pull/16365>`__             Fixed error messages when there are no logs to process in the WAF and Server Access AWS integrations.
`#16463 <https://github.com/wazuh/wazuh/pull/16463>`__             Added region validation before instantiating AWS service class in the AWS integration.
`#14161 <https://github.com/wazuh/wazuh/pull/14161>`__             Fixed ``InstallDate`` format in Windows installed programs.
`#15428 <https://github.com/wazuh/wazuh/issues/15428>`__           Fixed syscollector default interval time when the configuration is empty.
`#16268 <https://github.com/wazuh/wazuh/pull/16268>`__             Fixed agent starts with an invalid FIM configuration.
`#15719 <https://github.com/wazuh/wazuh/pull/15719>`__             Fixed rootcheck scan trying to read deleted files.
`#15739 <https://github.com/wazuh/wazuh/pull/15739>`__             Fixed compilation and build in Gentoo.
`#19375 <https://github.com/wazuh/wazuh/pull/19375>`__             Fixed a crash when FIM scanned long Windows paths.
==============================================================     =============

RESTful API
^^^^^^^^^^^

==============================================================     =============
Reference                                                          Description
==============================================================     =============
`#13421 <https://github.com/wazuh/wazuh/pull/13421>`__             Fixed an unexpected behavior when using the ``q`` and ``select`` parameters in some endpoints.
`#15203 <https://github.com/wazuh/wazuh/pull/15203>`__             Resolved an issue in the ``GET /manager/configuration`` API endpoint when retrieving the vulnerability detector configuration section.
`#15152 <https://github.com/wazuh/wazuh/pull/15152>`__             Fixed ``GET /agents/upgrade_result`` endpoint internal error with code ``1814`` in large environments.
`#16756 <https://github.com/wazuh/wazuh/pull/16756>`__             Enhanced the ``alphanumeric_symbols`` regex to better accommodate specific SCA remediation fields.
`#15967 <https://github.com/wazuh/wazuh/pull/15967>`__             Fixed bug that would not allow retrieving the Wazuh logs if only the JSON format was configured.
`#16310 <https://github.com/wazuh/wazuh/pull/16310>`__             Fixed error in ``GET /rules`` when variables are used inside ``id`` or ``level`` ruleset fields.
`#16248 <https://github.com/wazuh/wazuh/pull/16248>`__             Fixed ``PUT /syscheck`` and ``PUT /rootcheck`` endpoints to exclude exception codes properly.
`#16347 <https://github.com/wazuh/wazuh/issues/16347>`__           Adjusted ``test_agent_PUT_endpoints.tavern.yaml`` to resolve a race condition error.
`#16844 <https://github.com/wazuh/wazuh/pull/16844>`__             Fixed some errors in API integration tests for RBAC white agents.
==============================================================     =============

Wazuh dashboard
^^^^^^^^^^^^^^^

===============================================================    =============
Reference                                                          Description
===============================================================    =============
`#4828 <https://github.com/wazuh/wazuh-kibana-app/pull/4828>`__    Fixed trailing hyphen character for OS value in the list of agents.
`#4911 <https://github.com/wazuh/wazuh-kibana-app/pull/4911>`__    Fixed several typos in the code.
`#4917 <https://github.com/wazuh/wazuh-kibana-app/pull/4917>`__    Fixed the display of more than one protocol in the Global configuration section.
`#4918 <https://github.com/wazuh/wazuh-kibana-app/pull/4918>`__    Fixed uncaught error and wrong error message in the PCI DSS Control tab.
`#4894 <https://github.com/wazuh/wazuh-kibana-app/pull/4894>`__    Fixed references to Elasticsearch in Wazuh-stack plugin.
`#5135 <https://github.com/wazuh/wazuh-kibana-app/pull/5135>`__    Fixed the 2 errors that appeared in console in **Settings > Configuration** section.
`#5376 <https://github.com/wazuh/wazuh-kibana-app/pull/5376>`__    Fixed the GitHub and Office 365 module visibility configuration for each API host that was not kept when changing/upgrading the plugin.
`#5376 <https://github.com/wazuh/wazuh-kibana-app/pull/5376>`__    Fixed the GitHub and Office 365 modules appearing in the main menu when they were not configured.
`#5364 <https://github.com/wazuh/wazuh-kibana-app/pull/5364>`__    Fixed TypeError in FIM Inventory using a new error handler.
`#5423 <https://github.com/wazuh/wazuh-kibana-app/pull/5423>`__    Fixed error when using invalid group configuration.
`#5460 <https://github.com/wazuh/wazuh-kibana-app/pull/5460>`__    Fixed repeated requests in inventory data and configurations of an agent.
`#5465 <https://github.com/wazuh/wazuh-kibana-app/pull/5465>`__    Fixed repeated requests in the group table when adding a group or refreshing the table.
`#5521 <https://github.com/wazuh/wazuh-kibana-app/pull/5521>`__    Fixed an error in the request body suggestions of API Console.
`#5734 <https://github.com/wazuh/wazuh-kibana-app/pull/5734>`__    Fixed some errors related to relative dirname of rule and decoder files.
`#5879 <https://github.com/wazuh/wazuh-kibana-app/pull/5879>`__    Fixed package URLs in the ``aarch64`` commands.
`#5888 <https://github.com/wazuh/wazuh-kibana-app/pull/5888>`__    Fixed the install macOS agent commands.
===============================================================    =============



Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.6.0/CHANGELOG.md>`__
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.6.0-2.8.0/CHANGELOG.md>`__
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.6.0>`__
