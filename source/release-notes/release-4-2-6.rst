.. meta::
      :description: Wazuh 4.2.6 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_2_6:

4.2.6 Release notes
===================

This section lists the changes in version 4.2.6. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

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
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v4.2.5-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.2.5-8.1.4/CHANGELOG.md>`_