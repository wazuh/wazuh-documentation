.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Wazuh 4.1.3 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_1_3:

4.1.3 Release notes - 23 March 2021
===================================

This section lists the changes in version 4.1.3. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.1.3/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/4.1-7.10/CHANGELOG.md>`_


Wazuh core
----------

What's new
^^^^^^^^^^

This release includes new features or enhancements. 

**External dependencies:**

- `#7943 <https://github.com/wazuh/wazuh/pull/7943>`_ Python is upgraded from 3.8.6 to 3.9.2. This upgrading includes several Python dependencies to be compatible with the latest stable version. 

Resolved issues
^^^^^^^^^^^^^^^

This release resolves known issues. 

**Core**

======================================================  =============
Reference                                                Description
======================================================  =============
`#7870 <https://github.com/wazuh/wazuh/pull/7870>`_     In File Integrity Monitoring, the issue with files' modification time on Windows is fixed. That prevents the agent from producing this error: ``ERROR: (6716): Could not open handle for 'c:\test\untitled spreadsheet.xlsx'. Error code: 32``
`#7873 <https://github.com/wazuh/wazuh/pull/7873>`_     Issue in Wazuh DB that truncated the output of the agents' status query towards the cluster is fixed.
======================================================  =============

**API** 

======================================================  =============
Reference                                                Description
======================================================  =============
`#7906 <https://github.com/wazuh/wazuh/pull/7906>`_     Validation for absolute and relative paths is modified to avoid inconsistencies. These changes in the ``validator.py`` module improve security verifications of paths.
======================================================  =============

Wazuh Kibana plugin
-------------------

What's new
^^^^^^^^^^

This release includes new features or enhancements. 

- `#2985 <https://github.com/wazuh/wazuh-kibana-app/pull/2985>`_ In the Settings module, you can now create and configure a new index pattern after changing the default one. This improves user experience when retrieving data from indices for queries and visualizations. 
- `#3039 <https://github.com/wazuh/wazuh-kibana-app/pull/3039>`_ In the Agents module, the node name information is now detailed in the agents' list and in the agent information section. With this enhancement, you can better visualize the cluster node to which each agent is reporting.  
- `#3041 <https://github.com/wazuh/wazuh-kibana-app/pull/3041>`_ A new loading view is displayed when the user is logging some tabs. This improves user experience since permission prompts are no longer shown while updating a tab.  
- `#3047 <https://github.com/wazuh/wazuh-kibana-app/pull/3047>`_ All date labels are changed to Kibana formatting time zone for consistency.
- `#3048 <https://github.com/wazuh/wazuh-kibana-app/pull/3048>`_ Custom messages are now added for each possible ``run_as`` setup. This improves the warning messages whenever ``run_as`` is not allowed.
- `#3049 <https://github.com/wazuh/wazuh-kibana-app/pull/3049>`_ When selecting a default API, the toast message is cleaner and shows the API host ID.


Resolved issues
^^^^^^^^^^^^^^^

This release resolves known issues. 

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#3028 <https://github.com/wazuh/wazuh-kibana-app/pull/3028>`_    In Role mapping, the issue that caused unnecessary operators to be added when editing the role mapping is now fixed and no longer affects usability.
`#3057 <https://github.com/wazuh/wazuh-kibana-app/pull/3057>`_    Issue with rule filter not applied when selecting a Rule ID in another module is now fixed. Now, the selected Rule ID is correctly applied throughout all modules.
`#3062 <https://github.com/wazuh/wazuh-kibana-app/pull/3062>`_    Issue with changing master node configuration is now fixed. Now, the Wazuh API connection checking is completed successfully and no longer triggers an error when changing the configuration of the master node.
`#3063 <https://github.com/wazuh/wazuh-kibana-app/pull/3063>`_    Issue with Wazuh crashing after reloading due to caching bundles is now fixed. Improved validations now prevent this issue from reoccurring.
`#3066 <https://github.com/wazuh/wazuh-kibana-app/pull/3066>`_    Wrong variable declaration for macOS agents is now fixed.
`#3084 <https://github.com/wazuh/wazuh-kibana-app/pull/3084>`_    Improved error handling when an invalid rule is configured. The file saving algorithm now prevents files with incorrect configurations from being saved.
`#3086 <https://github.com/wazuh/wazuh-kibana-app/pull/3086>`_    Some errors in the Events table are now fixed. Action buttons of the ``rule.mitre.tactic`` column are repositioned correctly and Event links work after you add, remove, or move a column.
==============================================================    =============
