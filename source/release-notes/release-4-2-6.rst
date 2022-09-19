.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
      :description: Wazuh 4.2.6 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_2_6:

4.2.6 Release notes - 28 March 2022
===================================

This section lists the changes in version 4.2.6. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements.

Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

- Wazuh Kibana plugin is now compatible with Wazuh 4.2.6.

Wazuh Splunk app
^^^^^^^^^^^^^^^^

- Wazuh Splunk app is now compatible with Wazuh 4.2.6.



Resolved issues
---------------

This release resolves known issues. 

Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#11974 <https://github.com/wazuh/wazuh/pull/11974>`_             This release resolves an integer overflow hazard in ``wazuh-remoted`` that caused it to drop incoming data after receiving 2^31 messages.
==============================================================    =============


Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.2.6/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v4.2.6-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.2.6-8.2.2/CHANGELOG.md>`_
