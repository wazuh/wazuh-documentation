.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
      :description: Wazuh 4.2.5 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_2_5:

4.2.5 Release notes - 15 November 2021
======================================

This section lists the changes in version 4.2.5. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements.

Manager
^^^^^^^

- `#10809 <https://github.com/wazuh/wazuh/pull/10809>`_ Active response requests for agents between versions 4.2.0 and 4.2.4 are now sanitized to prevent unauthorized code execution.

Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

- Wazuh Kibana plugin is now compatible with Wazuh 4.2.5.
- Support for Kibana 7.13.4.
- Support for Kibana 7.14.2.


Wazuh Splunk app
^^^^^^^^^^^^^^^^

- Wazuh Splunk app is now compatible with Wazuh 4.2.5.

Resolved issues
---------------

This release resolves known issues. 

Agent
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#10809 <https://github.com/wazuh/wazuh/pull/10809>`_             A bug in the Active Response tools that might allow unauthorized code execution has been mitigated.
==============================================================    =============


Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#3653 <https://github.com/wazuh/wazuh-kibana-app/pull/3653>`_    A compatibility issue between Wazuh 4.2 and the kibana 7.13.4 is now fixed. In addition, this fix is compatible with Kibana 7.10. 
`#3654 <https://github.com/wazuh/wazuh-kibana-app/pull/3654>`_    This fix resolves an error that produced the interactive screen of a new agent to break when selecting the Windows OS option. This fix is compatible with Kibana 7.10. 
`#3668 <https://github.com/wazuh/wazuh-kibana-app/pull/3668>`_    A style compatibility issue of the breadcrumb navigation inside Kibana 7.14.2 is now fixed. 
`#3670 <https://github.com/wazuh/wazuh-kibana-app/pull/3670>`_    This fix resolves the Wazuh API token not being deprecated after logout with Kibana 7.13 and 7.14. 
`#3672 <https://github.com/wazuh/wazuh-kibana-app/pull/3672>`_    A Group Configuration and Management Configuration error is now fixed when the user tries to go back after saving.
`#3674 <https://github.com/wazuh/wazuh-kibana-app/pull/3674>`_    With this fix, the panels and their titles are correctly displayed in the Welcome Overview and the Management Directory. In addition, it resolves that all the Wazuh menus are consistent without titles in gray. 
`#3676 <https://github.com/wazuh/wazuh-kibana-app/pull/3676>`_    An issue with double flyout appearing when clicking a policy is now fixed.
`#3678 <https://github.com/wazuh/wazuh-kibana-app/pull/3678>`_    Kibana settings conflict in health check is now fixed.
`#3681 <https://github.com/wazuh/wazuh-kibana-app/pull/3681>`_    Compatibility to get the valid index patterns and refresh fields for Kibana 7.10.2-7.13.4 is now fixed.
==============================================================    =============


Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.2.5/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v4.2.5-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.2.5-8.1.4/CHANGELOG.md>`_