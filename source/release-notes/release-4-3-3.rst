.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
      :description: Wazuh 4.3.3 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_3_3:

4.3.3 Release notes
===================

This section lists the changes in version 4.3.3. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements.

Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

- Wazuh Kibana plugin is now compatible with Wazuh 4.3.3.

Wazuh Splunk app
^^^^^^^^^^^^^^^^

- Wazuh Splunk app is now compatible with Wazuh 4.3.3. 


Resolved issues
---------------

This release resolves known issues. 


==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13642 <https://github.com/wazuh/wazuh/pull/13642>`_             Prevent `Agentd` from resetting its configuration on ``<client>`` block re-definition.
`#13651 <https://github.com/wazuh/wazuh/pull/13651>`_             Avoid creating duplicated ``<client>`` configuration blocks during deployment. 
==============================================================    =============


Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.3.3/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.3-1.2.0-wzd/CHANGELOG.md>`_
- `wazuh/wazuh-kibana <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.3-7.17.3/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.3.3-8.2.6/CHANGELOG.md>`_