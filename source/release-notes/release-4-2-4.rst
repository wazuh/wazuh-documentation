.. meta::
      :description: Wazuh 4.2.4 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_2_4:

4.2.4 Release notes
===================

This section lists the changes in version 4.2.4. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements.

[add component]
^^^^^^^^^^^^^^^

- `#xxxx <xxx>`_ xxx

Resolved issues
---------------

This release resolves known issues. 

Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#9158 <https://github.com/wazuh/wazuh/pull/9158>`_               This fix prevents files belonging to deleted agents from remaining in the manager.
`#10432 <https://github.com/wazuh/wazuh/pull/10432>`_             Fixed inaccurate agent group file cleanup in the database sync module. Now, the module syncs up the agent database from ``client.keys`` before cleaning up the groups folder.
`#10479 <https://github.com/wazuh/wazuh/pull/10479>`_             This fix prevents the manager from corrupting the agent data integrity when the disk gets full.
==============================================================    =============


Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.2.4/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <xxxxx>`_
- `wazuh/wazuh-splunk <xxxxx>`_