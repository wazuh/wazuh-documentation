.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.3.8 has been released. Check out our release notes to discover the changes and additions of this release.

4.3.8 Release notes - 19 September 2022
=======================================

This section lists the changes in version 4.3.8. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh agent
^^^^^^^^^^^

- `#14842 <https://github.com/wazuh/wazuh/pull/14842>`_ Updated root CA certificate in agents to validate WPK upgrades.

  
Wazuh dashboard
^^^^^^^^^^^^^^^

- Wazuh dashboard is now compatible with Wazuh 4.3.8.

Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Wazuh Kibana plugin is now compatible with Wazuh 4.3.8.

Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Wazuh Kibana plugin is now compatible with Wazuh 4.3.8.

Wazuh Splunk app
^^^^^^^^^^^^^^^^

- Wazuh Splunk app is now compatible with Wazuh 4.3.8.


Resolved issues
---------------

This release resolves known issues as the following: 

Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14752 <https://github.com/wazuh/wazuh/pull/14752>`_             Fixed wrong field assignation in Audit decoders (thanks to @pyama86).
`#14825 <https://github.com/wazuh/wazuh/pull/14825>`_             Prevented wazuh-remoted from cleaning the multigroup folder in worker nodes.
`#14772 <https://github.com/wazuh/wazuh/pull/14772>`_             Fixed rule skipping in wazuh-analysisd when the option if_sid is invalid.
==============================================================    =============

Wazuh agent
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14801 <https://github.com/wazuh/wazuh/pull/14801>`_             Fixed a path traversal flaw in Active Response affecting agents from v3.6.1 to v4.3.7 (reported by @guragainroshan0).
==============================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.3.8/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.8-1.2.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.8-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.8-7.17.5/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.3.8-8.2.6/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.3.8>`_
