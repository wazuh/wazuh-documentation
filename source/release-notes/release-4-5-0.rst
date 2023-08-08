.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.5.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.5.0 Release notes - TBD
=========================

This section lists the changes in version 4.5.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This version includes new features or improvements, such as the following:

Manager
^^^^^^^

- `#17954 <https://github.com/wazuh/wazuh/pull/17954>`_ Vulnerability Detector now fetches the NVD feed from `https://feed.wazuh.com`, based on the NVD API 2.0.

   - The ``<update_from_year>`` option has been deprecated.

RESTful API
^^^^^^^^^^^

- `#17703 <https://github.com/wazuh/wazuh/pull/17703>`_ Modified the API integration tests to include Nginx LB logs in case of test failures.

Resolved issues
---------------

This release resolves known issues as the following: 

Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#17656 <https://github.com/wazuh/wazuh/pull/17656>`_             Fixed an error in the installation commands of the API and Framework modules when upgrading from sources.
`#18123 <https://github.com/wazuh/wazuh/issues/18123>`_           Fixed embedded Python interpreter to remove old Wazuh packages from it.
==============================================================    =============

RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#17703 <https://github.com/wazuh/wazuh/pull/17703>`_             Fixed an error in the Nginx LB entrypoint of the API integration tests.
==============================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.5.0/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.5.0-2.6.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.5.0-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.5.0-7.17.9/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.5.0-8.2/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.5.0>`_