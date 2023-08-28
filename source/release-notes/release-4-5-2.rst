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

-  `#18085 <https://github.com/wazuh/wazuh/pull/18085>`__ The wazuh-remoted service now allows connection overtaking. For TCP clients, the manager closes inactive sockets when the agent tries to establish a new connection depending on the configuration.
-  `#18468 <https://github.com/wazuh/wazuh/pull/18468>`__ Added connection family to the error log message in unsupported connections. The wazuh-remoted service now prints the type of an unknown connection for easier error analysis.
-  `#18437 <https://github.com/wazuh/wazuh/pull/18437>`__ Package inventory with better flexibility and improved efficiency. The manager allows more formats for increased compatibility and provides a faster look-up when accessing program-related data.


Packages
^^^^^^^^

-  `#2337 <https://github.com/wazuh/wazuh-packages/pull/2337>`__ Added port number option to ``wazuh-install.sh``. This new optional parameter allows choosing the Wazuh web interface port for the Wazuh dashboard and AIO installations.

Resolved issues
---------------

This release resolves known issues as the following: 

Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#18545 <https://github.com/wazuh/wazuh/pull/18545>`__            Fixed the manager blocking upgrades for macOS64 ARM64 agents. Now custom WPK upgrades in macOS ARM64 agents are possible.
`#18472 <https://github.com/wazuh/wazuh/pull/18472>`__            Fixed high CPU usage when using ``syslog_output`` with JSON format. A bug in wazuh-csyslogd causing over 90% CPU usage while expecting new alerts is fixed.
==============================================================    =============

Wazuh dashboard
^^^^^^^^^^^^^^^

===============================================================    =============
Reference                                                          Description
===============================================================    =============
`#5764 <https://github.com/wazuh/wazuh-kibana-app/pull/5764>`__    Fixed commands in **Deploy new agent** for **Oracle Linux 6+** agents.
`#5796 <https://github.com/wazuh/wazuh-kibana-app/pull/5796>`__    Fixed broken documentation links in **Management** > **Configuration**.
===============================================================    =============

Wazuh Kibana plugin for Kibana 7.10.2, 7.16.x, and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

===============================================================    =============
Reference                                                          Description
===============================================================    =============
`#5764 <https://github.com/wazuh/wazuh-kibana-app/pull/5764>`__    Fixed commands in **Deploy new agent** for **Oracle Linux 6+** agents.
`#5796 <https://github.com/wazuh/wazuh-kibana-app/pull/5796>`__    Fixed broken documentation links in **Management** > **Configuration**.
===============================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.5.2/CHANGELOG.md>`_
-  `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.5.2-2.6.0/CHANGELOG.md>`_
-  `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.5.2-7.10.2/CHANGELOG.md>`_
-  `wazuh/wazuh-kibana-app 7.16.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.5.2-7.16.3/CHANGELOG.md>`_
-  `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.5.2-7.17.11/CHANGELOG.md>`_
-  `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.5.2-8.2/CHANGELOG.md>`_
-  `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.5.2>`_