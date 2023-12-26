.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.8.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.8.0 Release notes - TBD
=========================

This section lists the changes in version 4.8.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Manager
^^^^^^^

- `#16058 <https://github.com/wazuh/wazuh/pull/16058>`__ Added new ``rollback`` query to ``wazuh-db``.
- `#18476 <https://github.com/wazuh/wazuh/pull/18476>`__ Improved ``wazuh-db`` detection of deleted database files.
- `#16893 <https://github.com/wazuh/wazuh/pull/16893>`__ Added ``timeout`` and ``retry`` parameters to the VirusTotal integration.
- `#18988 <https://github.com/wazuh/wazuh/pull/18988>`__ Extended ``wazuh-analysisd`` EPS metrics with events dropped by overload and remaining credits in the previous cycle.
- `#19819 <https://github.com/wazuh/wazuh/pull/19819>`__ Replaced Filebeat date index name processor to ensure the indices are identifiable by the index alias for auto-rollover.
- `#18466 <https://github.com/wazuh/wazuh/pull/18466>`__ Updated API and framework packages installation commands to use ``pip`` instead of direct invocation of ``setuptools``.
- `#17015 <https://github.com/wazuh/wazuh/pull/17015>`__ Refactored how cluster status dates are treated in the cluster.

Agent
^^^^^

- `#15740 <https://github.com/wazuh/wazuh/pull/15740>`__ Added snap package manager support to Syscollector.
- `#18574 <https://github.com/wazuh/wazuh/pull/18574>`__ Disabled host's IP query by Logcollector when ``ip_update_interval=0``.
- `#17932 <https://github.com/wazuh/wazuh/pull/17932>`__ Added event size validation for the external integrations.
- `#17623 <https://github.com/wazuh/wazuh/pull/17623>`__ Refactored and modularized the AWS integration code.
- `#19064 <https://github.com/wazuh/wazuh/pull/19064>`__ Added multiple tenants support to the MS Graph integration module.
- `#16200 <https://github.com/wazuh/wazuh/pull/16200>`__ FIM now buffers the Linux audit events for who-data to prevent side effects in other components.
- `#19720 <https://github.com/wazuh/wazuh/pull/19720>`__ The sub-process execution implementation has been improved.
- `#20649 <https://github.com/wazuh/wazuh/pull/20649>`__ Added geolocation mapping for the AWS WAF events.

RESTful API
^^^^^^^^^^^

- `#19952 <https://github.com/wazuh/wazuh/pull/19952>`__ Added new ``GET /manager/version/check`` API endpoint to obtain information about new releases of Wazuh.
- `#20119 <https://github.com/wazuh/wazuh/pull/20119>`__ Removed ``PUT /vulnerability``, ``GET /vulnerability/{agent_id}``, ``GET /vulnerability/{agent_id}/last_scan`` and ``GET /vulnerability/{agent_id}/summary/{field}`` API endpoints as they were deprecated in version 4.7.0. Use the Wazuh indexer REST API instead.
- `#20420 <https://github.com/wazuh/wazuh/pull/20420>`__ Added the ``auto`` option to the ``ssl_protocol`` setting in the API configuration. This option enables automatic negotiation of the TLS certificate.

Other
^^^^^

- `#20003 <https://github.com/wazuh/wazuh/pull/20003>`__ Upgraded external ``aiohttp`` library dependency version to ``3.8.5``.
- `#20003 <https://github.com/wazuh/wazuh/pull/20003>`__ Upgraded external ``cryptography`` library dependency version to ``41.0.4``.
- `#20003 <https://github.com/wazuh/wazuh/pull/20003>`__ Upgraded external ``numpy`` library dependency version to ``1.26.0``.
- `#20003 <https://github.com/wazuh/wazuh/pull/20003>`__ Upgraded external ``pyarrow`` library dependency version to ``14.0.1``.
- `#20003 <https://github.com/wazuh/wazuh/pull/20003>`__ Upgraded external ``grpcio`` library dependency version to ``1.58.0``.
- `#20003 <https://github.com/wazuh/wazuh/pull/20003>`__ Upgraded embedded Python version to ``3.10.13``.

Wazuh dashboard
^^^^^^^^^^^^^^^

- `#5791 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/5791>`__ Added remember server address check.
- `#6093 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6093>`__ Added a notification about new Wazuh updates and a button to check their availability.
- `#6083 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6083>`__ Added the ``ssl_agent_ca`` configuration to the **SSL Settings** form.
- `#5896 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/5896>`__ Added global vulnerability dashboards.
- `#6179 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6179>`__ Added global vulnerability dashboards. `#6173 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6173>`__ `#6147 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6147>`__
- `#5840 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/5840>`__ Added an agent selector to the IT Hygiene module.
- `#5840 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/5840>`__ Moved the Wazuh menu into the side menu. `#6226 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6226>`__
- `#5840 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/5840>`__ Removed the ``disabled_roles`` and ``customization.logo.sidebar`` settings.
- `#5840 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/5840>`__ Removed module visibility configuration and removed the ``extensions.*`` settings.
- `#6106 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6106>`__ Added query results limit of 10000 hits.
- `#6035 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6035>`__ Improved the implementation of module dashboards.
- `#6067 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6067>`__ Reorganized tabs order in all modules.
- `#6174 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6174>`__ Removed the implicit filter of WQL language of the search bar UI.
- `#6176 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6176>`__ Added a redirection button to Endpoint Summary from IT Hygiene application.
- `#6176 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6176>`__ Removed the application menu in the IT Hygiene application.

Packages 
^^^^^^^^

- `#2332 <https://github.com/wazuh/wazuh-packages/pull/2332>`_ Added check into the installation assistant to prevent the use of public IP addresses.
- `#2582 <https://github.com/wazuh/wazuh-packages/pull/2582>`_ Added the ISM init script to the Wazuh indexer package to handle the creation of ISM policies.
- `#2584 <https://github.com/wazuh/wazuh-packages/pull/2584>`_ Added ISM init script to the installation assistant.
- `#2365 <https://github.com/wazuh/wazuh-packages/pull/2365>`_ Removed the ``postProvision.sh`` script. It's no longer used in OVA generation.
- `#2364 <https://github.com/wazuh/wazuh-packages/pull/2364>`_ Added ``curl`` error messages in downloads.
- `#2469 <https://github.com/wazuh/wazuh-packages/pull/2469>`_ Improved debug output in the installation assistant.
- `#2422 <https://github.com/wazuh/wazuh-packages/pull/2422>`_ Enabled ``localhost`` domain registration in the installation assistant and ``cert-tool``.
- `#2300 <https://github.com/wazuh/wazuh-packages/pull/2300>`_ Added SCA policy for Rocky Linux 8 in SPECS.
- `#2557 <https://github.com/wazuh/wazuh-packages/pull/2557>`_ Added SCA policy for Amazon Linux 2023 in SPECS.
- `#2558 <https://github.com/wazuh/wazuh-packages/pull/2558>`_ Wazuh password tool now recognizes UI created users.
- `#2562 <https://github.com/wazuh/wazuh-packages/pull/2562>`_ Bumped Wazuh indexer to OpenSearch 2.10.0.
- `#2563 <https://github.com/wazuh/wazuh-packages/pull/2563>`_ Bumped Wazuh dashboard to OpenSearch Dashboards 2.10.0.
- `#2577 <https://github.com/wazuh/wazuh-packages/pull/2577>`_ Addedd APT and YUM lock logic to the Wazuh instalaltion assistant.
- `#2553 <https://github.com/wazuh/wazuh-packages/pull/2553>`_ Added new role to grant ISM API permissions.
- `#2164 <https://github.com/wazuh/wazuh-packages/pull/2164>`_ Deprecated CentOS 6 and Debian 7 for the Wazuh manager compilation, while still supporting them in the Wazuh agent compilation.
- `#2588 <https://github.com/wazuh/wazuh-packages/pull/2588>`_ Added logic to the installation assistant to check for clean Wazuh central components removal.
- `#2615 <https://github.com/wazuh/wazuh-packages/pull/2615>`_ Added branding images to the header of Wazuh dashboard.

Resolved issues
---------------

This release resolves known issues as the following: 

Wazuh manager
^^^^^^^^^^^^^

==============================================================     =============
Reference                                                          Description
==============================================================     =============
`#17886 <https://github.com/wazuh/wazuh/pull/17886>`__             Updated cluster connection cleanup to remove temporary files when the connection between a worker and a master is broken.
==============================================================     =============

Agent
^^^^^

==============================================================     =============
Reference                                                          Description
==============================================================     =============
`#16839 <https://github.com/wazuh/wazuh/pull/16839>`__             Fixed process path retrieval in Syscollector on Windows XP.
`#16056 <https://github.com/wazuh/wazuh/pull/16056>`__             Fixed the OS version detection on Alpine Linux.
`#18642 <https://github.com/wazuh/wazuh/pull/18642>`__             Fixed Solaris 10 name not showing in the dashboard.
==============================================================     =============

RESTful API
^^^^^^^^^^^

==============================================================     =============
Reference                                                          Description
==============================================================     =============
`#20527 <https://github.com/wazuh/wazuh/pull/20527>`__             Fixed a warning from SQLAlchemy involving detached Roles instances in RBAC.
==============================================================     =============

Wazuh dashboard
^^^^^^^^^^^^^^^

=========================================================================    =============
Reference                                                                    Description
=========================================================================    =============
`#5840 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/5840>`__       Fixed a problem with the agent menu header when the side menu is docked.
`#6102 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6102>`__       Fixed how the query filters apply on the Security Alerts table.
`#6177 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6177>`__       Fixed exception in **IT-Hygiene** when an agent doesn't have policies.
`#6177 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6177>`__       Fixed exception in **Inventory** when agents don't have operating system information.
`#6177 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6177>`__       Fixed pinned agent state in URL.
`#6234 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6234>`__       Fixed invalid date format in **About** and **Agents** views.
=========================================================================    =============

Packages
^^^^^^^^

=====================================================================     =============
Reference                                                                 Description
=====================================================================     =============
`#2381 <https://github.com/wazuh/wazuh-packages/pull/2381>`_              Fixed DNS validation in the Installation Assistant.
`#2401 <https://github.com/wazuh/wazuh-packages/pull/2401>`_              Fixed debug redirection in Installation Assistant.
=====================================================================     =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.8.0/CHANGELOG.md>`__
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.8.0-2.10.0/CHANGELOG.md>`__
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.8.0>`__
