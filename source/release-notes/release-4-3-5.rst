.. Copyright (C) 2022 Wazuh, Inc.


.. meta::
  :description: Wazuh 4.3.5 has been released. Check out our release notes to discover the changes and additions of this release.


4.3.5 Release notes - 29 June 2022
==================================

This section lists the changes in version 4.3.5. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements.


Wazuh manager
^^^^^^^^^^^^^

- `#13437 <https://github.com/wazuh/wazuh/pull/13437>`_ Integratord now tries to read alerts indefinitely, instead of performing 3 attempts.


Wazuh dashboard
^^^^^^^^^^^^^^^


Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Wazuh Splunk app
^^^^^^^^^^^^^^^^


Packages
^^^^^^^^



Resolved issues
---------------

This release resolves known issues. 

Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13621 <https://github.com/wazuh/wazuh/pull/13621>`_             A bug in ``agent_groups`` CLI when removing agent groups is fixed.
==============================================================    =============


RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13550 <https://github.com/wazuh/wazuh/pull/13550>`_             The default timeouts for ``GET /mitre/software`` and ``GET /mitre/techniques`` are updated to avoid timing out in slow environments.
==============================================================    =============

Ruleset
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13560 <https://github.com/wazuh/wazuh/pull/13560>`_             The prematch criteria of ``sshd-disconnect`` decoder is fixed.
==============================================================    =============


Wazuh dashboard
^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    When the platform visualizations didn't use some definitions related to the UI on Kibana 7.10.2 is now fixed.
==============================================================    =============


Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    When the platform visualizations didn't use some definitions related to the UI on Kibana 7.10.2 is now fixed.
==============================================================    =============


Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    When the platform visualizations didn't use some definitions related to the UI on Kibana 7.10.2 is now fixed.
==============================================================    =============


Wazuh Splunk app
^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1329 <https://github.com/wazuh/wazuh-splunk/pull/1329>`_        Unhandled expired session when requesting Splunk DB documents is fixed.
==============================================================    =============


Packages
^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1613 <https://github.com/wazuh/wazuh-packages/pull/1613>`_      Suse init script installation in agent is fixed. 
==============================================================    =============


Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.3.5/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.5-1.2.0-wzd/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.5-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.5-7.17.4/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.3.5-8.2.6/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.3.5>`_
