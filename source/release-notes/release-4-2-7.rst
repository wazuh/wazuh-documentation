.. meta::
      :description: Wazuh 4.2.7 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_2_7:

4.2.7 Release notes
===================

This section lists the changes in version 4.2.7. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements.

Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

- Wazuh Kibana plugin is now compatible with Wazuh 4.2.7.

Wazuh Splunk app
^^^^^^^^^^^^^^^^

- Wazuh Splunk app is now compatible with Wazuh 4.2.7.



Resolved issues
---------------

This release resolves known issues. 

Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13616 <https://github.com/wazuh/wazuh/pull/13616>`_             This release resolves the segmentation fault reported at `#13612 <https://github.com/wazuh/wazuh/issues/13612>`_, when reporting a vulnerability whose CWE reference is null (according to the NVD feed). This problem happens when scanning agents running on Windows.
==============================================================    =============


Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.2.7/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v4.2.7-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.2.7-8.2.2/CHANGELOG.md>`_
