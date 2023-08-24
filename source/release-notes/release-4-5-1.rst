.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.5.1 has been released. Check out our release notes to discover the changes and additions of this release.

4.5.1 Release notes - 24 August 2023
====================================

This section lists the changes in version 4.5.1. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

Highlights
----------

-  Native support for Mac computers with Apple silicon. This release provides an ARM-ready Wazuh agent for macOS package.

Breaking changes
----------------

This release includes some breaking changes, such as the following:

Agent
^^^^^

-  `#17748 <https://github.com/wazuh/wazuh/pull/17748>`_ Added the ``discard_regex`` functionality to Inspector and CloudWatchLogs AWS integrations.

   -  With this change, execution stops without warning if you don't use the ``field`` parameter when mandatory.

What's new
----------

This version includes new features or improvements, such as the following:

Manager
^^^^^^^

-  `#18142 <https://github.com/wazuh/wazuh/pull/18142>`_ Vulnerability Detector now fetches the RHEL 5 feed URL from *https://feed.wazuh.com* by default.
-  `#16846 <https://github.com/wazuh/wazuh/pull/16846>`_ The Vulnerability Detector CPE helper has been updated.

Agent
^^^^^

-  `#2224 <https://github.com/wazuh/wazuh-packages/pull/2224>`_ Added native agent support for Apple silicon.
-  `#17673 <https://github.com/wazuh/wazuh/pull/17673>`_ Added new validations for the AWS integration arguments.
-  `#16607 <https://github.com/wazuh/wazuh/pull/16607>`_ The agent for Windows now loads its shared libraries after running the verification.

Ruleset
^^^^^^^

-  `#17794 <https://github.com/wazuh/wazuh/pull/17794>`_ The SCA policy for Ubuntu Linux 20.04 (CIS v2.0.0) has been remade.
-  `#17812 <https://github.com/wazuh/wazuh/pull/17812>`_ Removed check 1.1.5 from Windows 10 SCA policy.

Other
^^^^^

-  `#16990 <https://github.com/wazuh/wazuh/pull/16990>`_ The CURL library has been updated to v7.88.1.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#5478 <https://github.com/wazuh/wazuh-kibana-app/pull/5478>`_ Added Apple Silicon architecture button to the register Agent wizard.
-  `#5497 <https://github.com/wazuh/wazuh-kibana-app/pull/5497>`_ Removed the agent name in the agent info ribbon.
-  `#5539 <https://github.com/wazuh/wazuh-kibana-app/pull/5539>`_ Changed method to perform redirection on agent table buttons.
-  `#5538 <https://github.com/wazuh/wazuh-kibana-app/pull/5538>`_ Changed Windows agent service name in the deploy agent wizard.
-  `#5687 <https://github.com/wazuh/wazuh-kibana-app/pull/5687>`_ Changed the requests to get the agent labels from the managers.

Wazuh Kibana plugin for Kibana 7.10.2, 7.16.x, and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

-  `#5478 <https://github.com/wazuh/wazuh-kibana-app/pull/5478>`_ Added Apple Silicon architecture button to the register Agent wizard.
-  `#5497 <https://github.com/wazuh/wazuh-kibana-app/pull/5497>`_ Removed the agent name in the agent info ribbon.
-  `#5539 <https://github.com/wazuh/wazuh-kibana-app/pull/5539>`_ Changed method to perform redirection on agent table buttons.
-  `#5538 <https://github.com/wazuh/wazuh-kibana-app/pull/5538>`_ Changed Windows agent service name in the deploy agent wizard.
-  `#5687 <https://github.com/wazuh/wazuh-kibana-app/pull/5687>`_ Changed the requests to get the agent labels from the managers.

Resolved issues
---------------

This release resolves known issues as the following: 

Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#17866 <https://github.com/wazuh/wazuh/pull/17866>`_             Fixed a race condition in some RBAC unit tests by clearing the SQLAlchemy mappers.
`#17490 <https://github.com/wazuh/wazuh/pull/17490>`_             Fixed a bug in wazuh-analysisd that could exceed the maximum number of fields when loading a rule.
`#17126 <https://github.com/wazuh/wazuh/pull/17126>`_             Fixed a race condition in wazuh-analysisd FTS list.
`#17143 <https://github.com/wazuh/wazuh/pull/17143>`_             Fixed a crash in Analysisd when parsing an invalid decoder.
`#17701 <https://github.com/wazuh/wazuh/pull/17701>`_             Fixed a segmentation fault in wazuh-modulesd due to duplicate Vulnerability Detector configuration.
`#16978 <https://github.com/wazuh/wazuh/pull/16978>`_             Fixed Vulnerability Detector configuration for unsupported SUSE systems.
==============================================================    =============

Agent
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#17524 <https://github.com/wazuh/wazuh/pull/17524>`_             Fixed ``InvalidRange`` error in Azure Storage integration when trying to get data from an empty blob.
`#17586 <https://github.com/wazuh/wazuh/pull/17586>`_             Fixed a memory corruption hazard in the FIM Windows Registry scan.
`#17179 <https://github.com/wazuh/wazuh/pull/17179>`_             Fixed an error in Syscollector reading the CPU frequency on Apple M1.
`#16659 <https://github.com/wazuh/wazuh/pull/16659>`_             Fixed agent WPK upgrade for Windows that might leave the previous version in the Registry.
`#17176 <https://github.com/wazuh/wazuh/pull/17176>`_             Fixed agent WPK upgrade for Windows to get the correct path of the Windows folder.
==============================================================    =============

RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#17632 <https://github.com/wazuh/wazuh/pull/17632>`_             Fixed ``PUT /agents/upgrade_custom`` endpoint to validate that the file extension is ``.wpk``.
`#17660 <https://github.com/wazuh/wazuh/pull/17660>`_             Fixed errors in API endpoints to get labels and reports active configuration from managers.
==============================================================    =============

Ruleset
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#17941 <https://github.com/wazuh/wazuh/pull/17941>`_             Fixed CredSSP encryption enforcement at Windows Benchmarks for SCA.
`#17940 <https://github.com/wazuh/wazuh/pull/17940>`_             Fixed an inverse logic in MS Windows Server 2022 Benchmark for SCA.
`#17779 <https://github.com/wazuh/wazuh/pull/17779>`_             Fixed a false positive in Windows Eventchannel rule due to substring false positive.
`#17813 <https://github.com/wazuh/wazuh/pull/17813>`_             Fixed missing whitespaces in SCA policies for Windows.
`#17798 <https://github.com/wazuh/wazuh/pull/17798>`_             Fixed the description of a Fortigate rule.
==============================================================    =============

Wazuh dashboard
^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#5471 <https://github.com/wazuh/wazuh-kibana-app/pull/5471>`_    Fixed the rendering of tables that contain IPs and agent overview.
`#5490 <https://github.com/wazuh/wazuh-kibana-app/pull/5490>`_    Fixed the agents active coverage stat as ``NaN`` in **Details** panel of **Agents** section.
`#5687 <https://github.com/wazuh/wazuh-kibana-app/pull/5687>`_    Fixed a broken documentation link to agent labels.
`#5714 <https://github.com/wazuh/wazuh-kibana-app/pull/5714>`_    Fixed the PDF report filters applied to tables.
==============================================================    =============

Wazuh Kibana plugin for Kibana 7.10.2, 7.16.x, and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#5471 <https://github.com/wazuh/wazuh-kibana-app/pull/5471>`_    Fixed the rendering of tables that contain IPs and agent overview.
`#5490 <https://github.com/wazuh/wazuh-kibana-app/pull/5490>`_    Fixed the agents active coverage stat as ``NaN`` in **Details** panel of **Agents** section.
`#5687 <https://github.com/wazuh/wazuh-kibana-app/pull/5687>`_    Fixed a broken documentation link to agent labels.
`#5714 <https://github.com/wazuh/wazuh-kibana-app/pull/5714>`_    Fixed the PDF report filters applied to tables.
==============================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.5.1/CHANGELOG.md>`_
-  `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.5.1-2.6.0/CHANGELOG.md>`_
-  `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.5.1-7.10.2/CHANGELOG.md>`_
-  `wazuh/wazuh-kibana-app 7.16.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.5.1-7.16.3/CHANGELOG.md>`_
-  `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.5.1-7.17.11/CHANGELOG.md>`_
-  `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.5.1-8.2/CHANGELOG.md>`_
-  `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.5.1>`_