.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.5.4 has been released. Check out our release notes to discover the changes and additions of this release.

4.5.4 Release notes - TBD
=========================

This section lists the changes in version 4.5.4. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.


What's new
----------

This version includes new features or improvements, such as the following:

Manager
^^^^^^^

- `#19729 <https://github.com/wazuh/wazuh/pull/19729>`__ Added a timeout on requests between components through the cluster.


Resolved issues
---------------

This release resolves known issues as the following: 

Manager
^^^^^^^

========================================================    ========================================================================================================
Reference                                                   Description
========================================================    ========================================================================================================
`#19702 <https://github.com/wazuh/wazuh/pull/19702>`__      Fixed a bug that might leave some worker's services hanging if the connection to the master was broken.
`#19706 <https://github.com/wazuh/wazuh/pull/19706>`__      Fixed vulnerability scan on Windows agent when the OS version has no release data. 
========================================================    ========================================================================================================


Changelogs
----------

More details about these changes are provided in the changelog of each component:

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.5.4/CHANGELOG.md>`_
-  `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.5.4-2.6.0/CHANGELOG.md>`_
-  `wazuh/wazuh-dashboard-plugins 7.10.2 <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.5.4-7.10.2/CHANGELOG.md>`_
-  `wazuh/wazuh-dashboard-plugins 7.16.x <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.5.4-7.16.3/CHANGELOG.md>`_
-  `wazuh/wazuh-dashboard-plugins 7.17.x <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.5.4-7.17.13/CHANGELOG.md>`_
-  `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.5.4-8.2/CHANGELOG.md>`_
-  `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.5.4>`_