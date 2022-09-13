.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.3.8 has been released. Check out our release notes to discover the changes and additions of this release.

4.3.8 Release notes - 15 September 2022
=======================================

This section lists the changes in version 4.3.8. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh agent
^^^^^^^^^^^

- `#14842 <https://github.com/wazuh/wazuh/pull/14842>`_ Updated root CA certificate in agents to validate WPK upgrades.

RESTful API
^^^^^^^^^^^

- `#14551 <https://github.com/wazuh/wazuh/pull/14551>`_ Text

Ruleset
^^^^^^^

- `#13806 <https://github.com/wazuh/wazuh/pull/13806>`_ Text
  
Wazuh dashboard
^^^^^^^^^^^^^^^

- `#4350 <https://github.com/wazuh/wazuh-kibana-app/pull/4350>`_ Text

Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- `#4350 <https://github.com/wazuh/wazuh-kibana-app/pull/4350>`_ Text

Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- `#4350 <https://github.com/wazuh/wazuh-kibana-app/pull/4350>`_ Text

Wazuh Splunk app
^^^^^^^^^^^^^^^^

- Wazuh Splunk app is now compatible with Wazuh 4.3.8.

Packages
^^^^^^^^

-  `#1737 <https://github.com/wazuh/wazuh-packages/pull/1737>`_ Text


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

Ruleset
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14513 <https://github.com/wazuh/wazuh/pull/14513>`_             Text 
==============================================================    =============

Wazuh dashboard
^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4378 <https://github.com/wazuh/wazuh-kibana-app/pull/4378>`_    Text
==============================================================    =============

Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4378 <https://github.com/wazuh/wazuh-kibana-app/pull/4378>`_    Text
==============================================================    =============

Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4378 <https://github.com/wazuh/wazuh-kibana-app/pull/4378>`_    Text
==============================================================    =============

Wazuh Splunk app
^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1359 <https://github.com/wazuh/wazuh-splunk/pull/1359>`_        Text
==============================================================    =============

Packages
^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1762 <https://github.com/wazuh/wazuh-packages/pull/1762>`__     Text
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
