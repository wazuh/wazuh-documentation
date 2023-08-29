.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.5.2 has been released. Check out our release notes to discover the changes and additions of this release.

4.5.2 Release notes - TBD
=========================

This section lists the changes in version 4.5.2. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This version includes new features or improvements, such as the following:

Manager
^^^^^^^

-  `#18085 <https://github.com/wazuh/wazuh/pull/18085>`__ ``wazuh-remoted`` now allows connection overtaking if the older agent doesn't respond for a while.
-  `#18468 <https://github.com/wazuh/wazuh/pull/18468>`__ ``wazuh-remoted`` now prints the connection family when an unknown client gets connected.
-  `#18437 <https://github.com/wazuh/wazuh/pull/18437>`__ The manager stops restricting the possible package formats in the inventory, to increase compatibility.
-  `#18545 <https://github.com/wazuh/wazuh/pull/18545>`__ The manager stops blocking updates by WPK to macOS agents on ARM64, allowing custom updates.

Packages
^^^^^^^^

-  `#2337 <https://github.com/wazuh/wazuh-packages/pull/2337>`__ Provided port number option to ``wazuh-install.sh`` script.

Resolved issues
---------------

This release resolves known issues as the following: 

Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#18472 <https://github.com/wazuh/wazuh/pull/18472>`__            Fixed a bug in ``wazuh-csyslogd`` that causes it to consume 100% of CPU while expecting new alerts.
==============================================================    =============

Wazuh dashboard
^^^^^^^^^^^^^^^

===============================================================    =============
Reference                                                          Description
===============================================================    =============
`#5764 <https://github.com/wazuh/wazuh-kibana-app/pull/5764>`__    Fixed an error with the commands in **Deploy new agent** for **Oracle Linux 6+** agents.
`#5796 <https://github.com/wazuh/wazuh-kibana-app/pull/5796>`__    Fixed broken documentation links in **Management** > **Configuration**.
===============================================================    =============

Wazuh Kibana plugin for Kibana 7.10.2, 7.16.x, and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

===============================================================    =============
Reference                                                          Description
===============================================================    =============
`#5764 <https://github.com/wazuh/wazuh-kibana-app/pull/5764>`__    Fixed an error with the commands in **Deploy new agent** for **Oracle Linux 6+** agents.
`#5796 <https://github.com/wazuh/wazuh-kibana-app/pull/5796>`__    Fixed broken documentation links in **Management** > **Configuration**.
===============================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.5.2/CHANGELOG.md>`_
-  `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.5.2-2.6.0/CHANGELOG.md>`_
-  `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.5.2-7.10.2/CHANGELOG.md>`_
-  `wazuh/wazuh-kibana-app 7.16.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.5.2-7.16.3/CHANGELOG.md>`_
-  `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.5.2-7.17.12/CHANGELOG.md>`_
-  `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.5.2-8.2/CHANGELOG.md>`_
-  `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.5.2>`_