.. Copyright (C) 2015, Wazuh, Inc.


.. meta::
  :description: Wazuh 4.3.7 has been released. Check out our release notes to discover the changes and additions of this release.


4.3.7 Release notes - 5 August 2022
===================================

This section lists the changes in version 4.3.7. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:


Wazuh manager
^^^^^^^^^^^^^

- `#14540 <https://github.com/wazuh/wazuh/pull/14540>`_ Added cluster command to obtain custom ruleset files and their hash.


Wazuh agent
^^^^^^^^^^^

- `#13958 <https://github.com/wazuh/wazuh/pull/13958>`_ Improved Office365 integration module logs.
  

RESTful API
^^^^^^^^^^^

- `#14551 <https://github.com/wazuh/wazuh/pull/14551>`_ Added endpoint GET /cluster/ruleset/synchronization to check ruleset synchronization status in a cluster.


Ruleset
^^^^^^^

- `#13087 <https://github.com/wazuh/wazuh/pull/13087>`_ Added SCA Policy for CIS Microsoft Windows 11 Enterprise Benchmark v1.0.0.
- `#13191 <https://github.com/wazuh/wazuh/pull/13191>`_ Added SCA Policy for CIS Microsoft Windows 10 Enterprise Release 21H2 Benchmark v1.12.0.
- `#13756 <https://github.com/wazuh/wazuh/pull/13756>`_ Added SCA policy for Red Hat Enterprise Linux 9 (RHEL9).
- `#13895 <https://github.com/wazuh/wazuh/pull/13895>`_ Added SCA policy for CIS Microsoft Windows Server 2022 Benchmark 1.0.0.


Wazuh Splunk app
^^^^^^^^^^^^^^^^

- `#1351 <https://github.com/wazuh/wazuh-splunk/pull/1351>`_ aaa


Packages
^^^^^^^^

-  `#1706 <https://github.com/wazuh/wazuh-packages/pull/1706>`__ aaa


Other
^^^^^

- `#14121 <https://github.com/wazuh/wazuh/pull/14121>`_ aaa

Resolved issues
---------------

This release resolves known issues as the following: 

Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13956 <https://github.com/wazuh/wazuh/pull/13956>`_             Fixed a bug in Analysisd that may make it crash when decoding regexes with more than 14 or-ed subpatterns.
`#14366 <https://github.com/wazuh/wazuh/pull/14366>`_             Fixed a crash hazard in Vulnerability Detector when parsing OVAL feeds.
`#14436 <https://github.com/wazuh/wazuh/pull/14436>`_             Fixed busy-looping in wazuh-maild when monitoring alerts.json.
`#14417 <https://github.com/wazuh/wazuh/pull/14417>`_             Fixed a segmentation fault in wazuh-maild when parsing alerts exceeding the nesting limit.
==============================================================    =============

Wazuh agent
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14368 <https://github.com/wazuh/wazuh/pull/14368>`_             Fixed a code defect in the GitHub integration module reported by Coverity.
`#14518 <https://github.com/wazuh/wazuh/pull/14518>`_             Fixed an undefined behavior in the agent unit tests.
==============================================================    =============

RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14208 <https://github.com/wazuh/wazuh/pull/14208>`_             Improved performance for MITRE API endpoints.
==============================================================    =============

Ruleset
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14235 <https://github.com/wazuh/wazuh/pull/14235>`_             Fixed rule regular expression bug on Ubuntu 20.04 Linux SCA policy control ID 19137.
`#14258 <https://github.com/wazuh/wazuh/pull/14258>`_             Fixed AWS Amazon Linux SCA policy. Fixed bug when wazuh-agent tries to run the policy.
`#13949 <https://github.com/wazuh/wazuh/pull/13949>`_             Fixed AWS Amazon Linux 2 SCA policy. Limit journalctl to kernel events and only since boot.
`#14481 <https://github.com/wazuh/wazuh/pull/14481>`_             Added missing SCA files during Wazuh-manager installation.
==============================================================    =============


Wazuh dashboard
^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4326 <https://github.com/wazuh/wazuh-kibana-app/pull/4326>`_    aaa
==============================================================    =============

Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4326 <https://github.com/wazuh/wazuh-kibana-app/pull/4326>`_    aaa
==============================================================    =============

Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4326 <https://github.com/wazuh/wazuh-kibana-app/pull/4326>`_    aaa
==============================================================    =============

Wazuh Splunk app
^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1351 <https://github.com/wazuh/wazuh-splunk/pull/1351>`_        aaa
==============================================================    =============

Packages
^^^^^^^^
==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1713 <https://github.com/wazuh/wazuh-packages/pull/1713>`__     aaa
==============================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.3.7/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.7-1.2.0-wzd/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.7-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.7-7.17.5/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.3.7-8.2.6/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.3.7>`_
