.. Copyright (C>`_ 2021 Wazuh, Inc.

.. _release_4_1_3:

4.1.3 Release notes
===================

This section lists the changes in version 4.1.3. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/4.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/4.1-7.10/CHANGELOG.md>`_


Wazuh core
----------

What's new
^^^^^^^^^^

This release includes new features or enhancements. 

**External dependencies:**

- `#7943 <https://github.com/wazuh/wazuh/pull/7943>`_ Upgraded Python version from 3.8.6 to 3.9.2 and several Python dependencies. 

Resolved issues
^^^^^^^^^^^^^^^

This release resolves known issues. 

**Core**

======================================================  =============
Reference                                                Resolution
======================================================  =============
`#7870 <https://github.com/wazuh/wazuh/pull/7870>`_     Fixed an error in FIM when getting the files' modification time on Windows due to wrong permission flags.
`#7873 <https://github.com/wazuh/wazuh/pull/7873>`_     Fixed a bug in Wazuh DB that truncated the output of the agents' status query towards the cluster.
======================================================  =============

**API** 

======================================================  =============
Reference                                                Resolution
======================================================  =============
`#7906 <https://github.com/wazuh/wazuh/pull/7906>`_     Fixed validation for absolute and relative paths.
======================================================  =============

Wazuh Kibana plugin
-------------------

What's new
^^^^^^^^^^

This release includes new features or enhancements. 

- `#2985 <https://github.com/wazuh/wazuh-kibana-app/pull/2985>`_ Creation of index pattern after the default one is changes in Settings. 
- `#3039 <https://github.com/wazuh/wazuh-kibana-app/pull/3039>`_ Added node name of agent list and detail.  
- `#3041 <https://github.com/wazuh/wazuh-kibana-app/pull/3041>`_ Added loading view while the user is logging to prevent permissions prompts.  
- `#3047 <https://github.com/wazuh/wazuh-kibana-app/pull/3047>`_ Change all dates labels to Kibana formatting time zone. 

Resolved issues
^^^^^^^^^^^^^^^

This release resolves known issues. 

==============================================================    =============
Reference                                                         Resolution
==============================================================    =============
`#3028 <https://github.com/wazuh/wazuh-kibana-app/pull/3028>`_    Fixed unexpected behaviour in Roles mapping
`#3049 <https://github.com/wazuh/wazuh-kibana-app/pull/3049>`_    Improve toast message when selecting a default API
`#3057 <https://github.com/wazuh/wazuh-kibana-app/pull/3057>`_    Fix rule filter is no applied when you click on a rule id in other module.
`#3062 <https://github.com/wazuh/wazuh-kibana-app/pull/3062>`_    Fixed bug changing master node configuration
`#3063 <https://github.com/wazuh/wazuh-kibana-app/pull/3063>`_    Improved validation and prevention for caching bundles in client side
`#3084 <https://github.com/wazuh/wazuh-kibana-app/pull/3084>`_    Rollback of invalid rule configuration file
==============================================================    =============
