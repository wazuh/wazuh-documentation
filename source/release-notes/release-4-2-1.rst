.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
      :description: Wazuh 4.2.1 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_2_1:

4.2.1 Release notes - 3 September 2021
======================================

This section lists the changes in version 4.2.1. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.


Wazuh core
----------

Resolved issues
^^^^^^^^^^^^^^^

**Installer**

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#9973 <https://github.com/wazuh/wazuh/pull/9973>`_               An issue in the upgrade to 4.2.0 that disabled Eventchannel support on Windows agents is now fixed. 
==============================================================    =============

**Modules**

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#9975 <https://github.com/wazuh/wazuh/issues/9975>`_             An issue with Python-based integration modules causing the integrations to stop working in Wazuh v4.2.0 agents is now fixed.
==============================================================    =============


Wazuh Kibana plugin
-------------------

What's new
^^^^^^^^^^

- Wazuh Kibana plugin is now compatible with Wazuh 4.2.1.


Wazuh Splunk app
----------------

What's new
^^^^^^^^^^

- Wazuh Splunk app is now compatible with Wazuh 4.2.1.


Changelogs
----------

More details about these changes are provided in the changelog of each component:


- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.2.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v4.2.1-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.2.1-8.1.2/CHANGELOG.md>`_
