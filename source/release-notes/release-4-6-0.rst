.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.6.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.6.0 Release notes - TBD
=========================

This section lists the changes in version 4.6.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

- `#13559 <https://github.com/wazuh/wazuh/pull/13559>`_ ``wazuh-authd`` can now generate X509 certificates.
- `#13797 <https://github.com/wazuh/wazuh/pull/13797>`_ Introduced a new CLI to manage features related to the Wazuh API RBAC resources.
- `#13034 <https://github.com/wazuh/wazuh/issue/13034>`_ Added support for Amazon Linux 2022 in Vulnerability Detector.
- `#16343 <https://github.com/wazuh/wazuh/pull/16343>`_ Added support for Alma Linux in Vulnerability Detector.
- `#18542 <https://github.com/wazuh/wazuh/pull/18542>`_ Added support for Debian 12 in Vulnerability Detector.
- `#14953 <https://github.com/wazuh/wazuh/pull/14953>`_ Added mechanism in ``wazuh-db`` to identify fragmentation and perform vacuum.
- `#18333 <https://github.com/wazuh/wazuh/pull/18333>`_ Added an option to set whether the manager should ban newer agents.
- `#15661 <https://github.com/wazuh/wazuh/pull/15661>`_ Added mechanism to prevent Wazuh agents connections to lower manager versions.
- `#14659 <https://github.com/wazuh/wazuh/pull/14659>`_ ``wazuh-remoted`` now checks the size of the files to avoid malformed ``merged.mg``.
- `#14024 <https://github.com/wazuh/wazuh/pull/14024>`_ Added a limit option for the Rsync dispatch queue size.
- `#14026 <https://github.com/wazuh/wazuh/pull/14026>`_ Added a limit option for the Rsync thread pool.
- `#14549 <https://github.com/wazuh/wazuh/pull/14549>`_ ``wazuh-authd`` now shows a warning when deprecated forcing options are present in the configuration.
- `#14804 <https://github.com/wazuh/wazuh/pull/14804>`_ The agent now notifies the manager when Active Response fails to run ``netsh``.
- `#13906 <https://github.com/wazuh/wazuh/pull/13906>`_ Use a new broadcast system to send agent group information from the master node of a cluster.
- `#15220 <https://github.com/wazuh/wazuh/pull/15220>`_ Changed cluster ``send_request`` method so that timeouts are treated as exceptions and not as responses.
- `#13065 <https://github.com/wazuh/wazuh/pull/13065>`_ Refactored methods responsible for file synchronization within the cluster.
- `#16065 <https://github.com/wazuh/wazuh/pull/16065>`_ Changed schema constraints for ``sys_hwinfo`` table.
- `#15709 <https://github.com/wazuh/wazuh/pull/15709>`_ The Auth process does not start when the registration password is empty.

Agent
^^^^^

- `#15226 <https://github.com/wazuh/wazuh/pull/15226>`_ Added GuardDuty Native support to the AWS integration.
- `#14768 <https://github.com/wazuh/wazuh/pull/14768>`_ Added ``--prefix`` parameter to Azure Storage integration.
- `#16493 <https://github.com/wazuh/wazuh/pull/16493>`_ Added validations for empty and invalid values in AWS integration.
- `#13573 <https://github.com/wazuh/wazuh/pull/13573>`_ Added new unit tests for GCloud integration and increased coverage to 99%.
- `#14104 <https://github.com/wazuh/wazuh/pull/14104>`_ Added new unit tests for Azure Storage integration and increased coverage to 99%.
- `#14177 <https://github.com/wazuh/wazuh/pull/14177>`_ Added new unit tests for Docker Listener integration.
- `#18116 <https://github.com/wazuh/wazuh/pull/18116>`_ Added support for Microsoft Graph security API.
- `#15852 <https://github.com/wazuh/wazuh/pull/15852>`_ Added wildcard support in FIM Windows registers.
- `#15973 <https://github.com/wazuh/wazuh/pull/15973>`_ Added wildcards support for folders in the localfile configuration on Windows.
- `#14782 <https://github.com/wazuh/wazuh/pull/14782>`_ Added new settings ``ignore`` and ``restrict`` to logcollector.
- `#12745 <https://github.com/wazuh/wazuh/pull/12745>`_ Added RSync and DBSync to FIM.
- `#17124 <https://github.com/wazuh/wazuh/pull/17124>`_ Added PCRE2 regex for SCA policies.
- `#14763 <https://github.com/wazuh/wazuh/pull/14763>`_ Added mechanism to detect policy changes.
- `#13264 <https://github.com/wazuh/wazuh/pull/13264>`_ FIM option ``fim_check_ignore`` now applies to files and directories.
- `#16531 <https://github.com/wazuh/wazuh/pull/16531>`_ Changed AWS integration to take into account user config found in the ``.aws/config`` file.
- `#14537 <https://github.com/wazuh/wazuh/pull/14537>`_ Changed the calculation of timestamps in AWS and Azure modules by using UTC timezone.
- `#15009 <https://github.com/wazuh/wazuh/pull/15009>`_ Changed the AWS integration to only show the ``Skipping file with another prefix`` message in debug mode.
- `#14999 <https://github.com/wazuh/wazuh/pull/14999>`_ Changed debug level required to display CloudWatch Logs event messages.
- `#17447 <https://github.com/wazuh/wazuh/pull/17447>`_ Changed syscollector database default permissions.
- `#17161 <https://github.com/wazuh/wazuh/pull/17161>`_ Changed agent IP lookup algorithm.
- `#14499 <https://github.com/wazuh/wazuh/pull/14499>`_ Changed InstallDate origin in windows installed programs.
- `#14524 <https://github.com/wazuh/wazuh/pull/14524>`_ Enhanced clarity of certain error messages in the AWS integration for better exception tracing.
- `#13420 <https://github.com/wazuh/wazuh/pull/13420>`_ Improved external integrations SQLite queries.
- `#16325 <https://github.com/wazuh/wazuh/pull/16325>`_ Improved items iteration for ``Config`` and ``VPCFlow`` AWS integrations.
- `#14784 <https://github.com/wazuh/wazuh/pull/14784>`_ Unit tests have been added to the shared JSON handling library.
- `#14476 <https://github.com/wazuh/wazuh/pull/14476>`_ Unit tests have been added to the shared SQLite handling library.
- `#15032 <https://github.com/wazuh/wazuh/pull/15032>`_ Improved command to change user and group from version 4.2.x to 4.x.x.
- `#15647 <https://github.com/wazuh/wazuh/pull/15647>`_ Changed the internal value of the open_attemps configuration.
- `#13878 <https://github.com/wazuh/wazuh/pull/13878>`_ Unused option ``local_ip`` for agent configuration has been deleted.
- `#14684 <https://github.com/wazuh/wazuh/pull/14684>`_ Removed unused migration functionality from the AWS integration.
- `#17655 <https://github.com/wazuh/wazuh/pull/17655>`_ Deleted definitions of repeated classes in the AWS integration.
- `#15031 <https://github.com/wazuh/wazuh/pull/15031>`_ Removed duplicate methods in ``AWSBucket`` and reuse inherited ones from `WazuhIntegration`.

RESTful API
^^^^^^^^^^^

- `#17670 <https://github.com/wazuh/wazuh/pull/17670>`_ Added ``POST /events`` API endpoint to ingest logs through the API.
- `#17865 <https://github.com/wazuh/wazuh/pull/17865>`_ Added ``query``, ``select`` and ``distinct`` parameters to multiple endpoints.
- `#13919 <https://github.com/wazuh/wazuh/pull/13919>`_ Added a new upgrade and migration mechanism for the RBAC database.
- `#13654 <https://github.com/wazuh/wazuh/pull/13654>`_ Added new API configuration option to rotate log files based on a given size.
- `#15994 <https://github.com/wazuh/wazuh/issues/15994>`_ Added ``relative_dirname`` parameter to GET, PUT and DELETE methods of the ``/decoder/files/{filename}`` and ``/rule/files/{filename}`` endpoints.
- `#18212 <https://github.com/wazuh/wazuh/pull/18212>`_ Added new config option to disable uploading configurations containing the new ``allow_higher_version`` setting.
- `#13615 <https://github.com/wazuh/wazuh/pull/13615>`_ Added API integration tests documentation.
- `#13646 <https://github.com/wazuh/wazuh/pull/13646>`_ Changed the API's response status code for Wazuh cluster errors from 400 to 500.
- `#15934 <https://github.com/wazuh/wazuh/pull/15934>`_ Removed legacy code related to agent databases in ``/var/agents/db``.

Ruleset
^^^^^^^

- `#14138 <https://github.com/wazuh/wazuh/pull/14138>`_ The SSHD decoder has been improved to catch disconnection events.


Resolved issues
---------------

This release resolves known issues as the following: 

Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13979 <https://github.com/wazuh/wazuh/pull/13979>`_             Fixed ``wazuh-remoted`` not updating total bytes sent in UDP.
`#14356 <https://github.com/wazuh/wazuh/pull/14356>`_             Fixed translation of packages with a missing version in CPE Helper for Vulnerability Detector.
`#14174 <https://github.com/wazuh/wazuh/pull/14174>`_             Fixed undefined behavior issues in Vulnerability Detector unit tests.
`#14019 <https://github.com/wazuh/wazuh/pull/14019>`_             Fixed permission error when producing FIM alerts.
`#15164 <https://github.com/wazuh/wazuh/pull/15164>`_             Fixed memory leaks ``wazuh-authd``.
`#14763 <https://github.com/wazuh/wazuh/pull/14763>`_             Fixed Audit policy change detection in FIM for Windows.
`#14408 <https://github.com/wazuh/wazuh/pull/14408>`_             Fixed ``origin_module`` variable value when sending API or framework messages to core sockets.
`#15715 <https://github.com/wazuh/wazuh/pull/15715>`_             Fixed an issue where an erroneous tag appeared in the cluster logs.
`#15250 <https://github.com/wazuh/wazuh/issues/15250>`_           Fixed log error displayed when there's a duplicate worker node name within a cluster.
`#15487 <https://github.com/wazuh/wazuh/pull/15487>`_             Resolved an issue in the ``agent_upgrade`` CLI when used from worker nodes.
`#18047 <https://github.com/wazuh/wazuh/issues/18047>`_           Fixed error in the ``agent_upgrade`` CLI when displaying upgrade result.
`#15277 <https://github.com/wazuh/wazuh/pull/15277>`_             Fixed error in which the connection with the cluster was broken in local clients for not sending keepalives messages.
`#15298 <https://github.com/wazuh/wazuh/pull/15298>`_             Fixed error in which exceptions were not correctly handled when ``dapi_err`` command could not be sent to peers.
`#16257 <https://github.com/wazuh/wazuh/pull/16257>`_             Fixed error in worker's Integrity sync task when a group folder was deleted in master.
`#16506 <https://github.com/wazuh/wazuh/pull/16506>`_             Fixed error when trying tu update an agent through the API or the CLI while pointing to a WPK file.  
`#15074 <https://github.com/wazuh/wazuh/pull/15074>`_             Fixed ``wazuh-remoted`` high CPU usage in master node without agents.
`#16101 <https://github.com/wazuh/wazuh/pull/16101>`_             Fixed race condition in ``wazuh-analysisd`` handling rule ignore option.
`#16000 <https://github.com/wazuh/wazuh/pull/16000>`_             Fixed missing rules and decoders in Analysisd JSON report.
`#14356 <https://github.com/wazuh/wazuh/pull/14356>`_             Fixed translation of packages with missing version in CPE Helper.
`#15826 <https://github.com/wazuh/wazuh/pull/15826>`_             Fixed log date parsing at predecoding stage.
`#14019 <https://github.com/wazuh/wazuh/pull/14019>`_             Fixed permission error in JSON alert.
==============================================================    =============

Agent
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13534 <https://github.com/wazuh/wazuh/pull/13534>`_             Fixed the architecture of the dependency URL for macOS.
`#13588 <https://github.com/wazuh/wazuh/pull/13588>`_             Fixed a path length limitation that prevented FIM from reporting changes on Windows.
`#14993 <https://github.com/wazuh/wazuh/pull/14993>`_             Updated the AWS integration to use the regions specified in the AWS config file when no regions are provided in ``ossec.conf``.
`#14850 <https://github.com/wazuh/wazuh/pull/14850>`_             Corrected the error code ``#2`` for the SIGINT signal within the AWS integration.
`#14740 <https://github.com/wazuh/wazuh/pull/14740>`_             Fixed the ``discard_regex`` functionality for the AWS GuardDuty integration.
`#14500 <https://github.com/wazuh/wazuh/pull/14500>`_             Fixed error messages in the AWS integration when there is a ``ClientError``.
`#14493 <https://github.com/wazuh/wazuh/pull/14493>`_             Fixed error that could lead to duplicate logs when using the same dates in the AWS integration.
`#16116 <https://github.com/wazuh/wazuh/pull/16116>`_             Fixed ``check_bucket`` method in AWS integration to be able to find logs without a folder in root.
`#16360 <https://github.com/wazuh/wazuh/pull/16360>`_             Added field validation for ``last_date.json`` in Azure Storage integration.
`#15763 <https://github.com/wazuh/wazuh/pull/15763>`_             Improved handling of invalid regions given to the VPCFlow AWS integration, enhancing exception clarity.
`#16070 <https://github.com/wazuh/wazuh/pull/16070>`_             Fixed error in the GCloud Subscriber unit tests.
`#16410 <https://github.com/wazuh/wazuh/pull/16410>`_             Fixed the marker that AWS custom integrations use.
`#16365 <https://github.com/wazuh/wazuh/pull/16365>`_             Fixed error messages when there are no logs to process in the WAF and Server Access AWS integrations.
`#16463 <https://github.com/wazuh/wazuh/pull/16463>`_             Added region validation before instantiating AWS service class in the AWS integration.
`#14161 <https://github.com/wazuh/wazuh/pull/14161>`_             Fixed InstallDate format in Windows installed programs.
`#15428 <https://github.com/wazuh/wazuh/issues/15428>`_           Fixed syscollector default interval time when the configuration is empty.
`#16268 <https://github.com/wazuh/wazuh/pull/16268>`_             Fixed agent starts with an invalid fim configuration.
`#15719 <https://github.com/wazuh/wazuh/pull/15719>`_             Fixed rootcheck scan trying to read deleted files.
`#15739 <https://github.com/wazuh/wazuh/pull/15739>`_             Fixed compilation and build in Gentoo.
==============================================================    =============

RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`13421 <https://github.com/wazuh/wazuh/pull/13421>`_              Fixed an unexpected behavior when using the ``q`` and ``select`` parameters in some endpoints.
`#15203 <https://github.com/wazuh/wazuh/pull/15203>`_             Resolved an issue in the ``GET /manager/configuration`` API endpoint when retrieving the vulnerability detector configuration section.
`#15152 <https://github.com/wazuh/wazuh/pull/15152>`_             Fixed ``GET /agents/upgrade_result`` endpoint internal error with code 1814 in large environments.
`#16756 <https://github.com/wazuh/wazuh/pull/16756>`_             Enhanced the alphanumeric_symbols regex to better accommodate specific SCA remediation fields.
`#15967 <https://github.com/wazuh/wazuh/pull/15967>`_             Fixed bug that would not allow retrieving the Wazuh logs if only the JSON format was configured.
`#16310 <https://github.com/wazuh/wazuh/pull/16310>`_             Fixed error in ``GET /rules`` when variables are used inside ``id`` or ``level`` ruleset fields.
`#16248 <https://github.com/wazuh/wazuh/pull/16248>`_             Fixed ``PUT /syscheck`` and ``PUT /rootcheck`` endpoints to exclude exception codes properly.
`#16347 <https://github.com/wazuh/wazuh/issues/16347>`_           Adjusted ``test_agent_PUT_endpoints.tavern.yaml`` to resolve a race condition error.
`#16844 <https://github.com/wazuh/wazuh/pull/16844>`_             Fixed some errors in API integration tests for RBAC white agents.
==============================================================    =============

Wazuh dashboard
^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4828 <https://github.com/wazuh/wazuh-kibana-app/pull/4828>`_    Fixed trailing hyphen character for OS value in the list of agents.
`#4909 <https://github.com/wazuh/wazuh-kibana-app/pull/4909>`_    Fixed an issue that caused incorrect visualization of IPv6 addresses.
`#4911 <https://github.com/wazuh/wazuh-kibana-app/pull/4911>`_    Fixed several typos in the code.
`#4917 <https://github.com/wazuh/wazuh-kibana-app/pull/4917>`_    Fixed the display of more than one protocol in the Global configuration section.
`#4918 <https://github.com/wazuh/wazuh-kibana-app/pull/4918>`_    Handling endpoint response is done when there is no data to show.
`#4894 <https://github.com/wazuh/wazuh-kibana-app/pull/4894>`_    Fixed references to Elasticsearch in Wazuh-stack plugin.
`#5135 <https://github.com/wazuh/wazuh-kibana-app/pull/5135>`_    Fixed two errors that appeared in the console in **Settings > Configuration** section.
`#5376 <https://github.com/wazuh/wazuh-kibana-app/pull/5376>`_    Fixed the GitHub and Office 365 module visibility configuration for each API host was not kept when changing/upgrading the plugin.
`#5376 <https://github.com/wazuh/wazuh-kibana-app/pull/5376>`_    Fixed the GitHub and Office 365 modules that appeared in the main menu when they were not configured.
`#5364 <https://github.com/wazuh/wazuh-kibana-app/pull/5364>`_    Fixed TypeError in FIM Inventory using a new error handler.
`#5423 <https://github.com/wazuh/wazuh-kibana-app/pull/5423>`_    Fixed error when using invalid group configuration.
`#5460 <https://github.com/wazuh/wazuh-kibana-app/pull/5460>`_    Fixed repeated requests in inventory data and configurations of an agent.
`#5465 <https://github.com/wazuh/wazuh-kibana-app/pull/5465>`_    Fixed repeated requests in the group table when adding a group or refreshing the table.
`#5521 <https://github.com/wazuh/wazuh-kibana-app/pull/5521>`_    Fixed an error in the request body suggestions of API Console.
==============================================================    =============



Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.6.0/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.6.0-2.6.0/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.6.0>`_
