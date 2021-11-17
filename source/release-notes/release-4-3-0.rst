.. meta::
      :description: Wazuh 4.3.0 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_3_0:

4.3.0 Release notes
===================

This section lists the changes in version 4.3.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------


^^^^^^^

Resolved issues
---------------

This release resolves known issues. 

Manager
^^^^^^^


- Added support for Arch Linux OS in Vulnerability Detector. Thanks to Aviel Warschawski (@avielw). `#8178 <https://github.com/wazuh/wazuh/pull/8178>`_
- Added a log message in the `cluster.log` file to notify that wazuh-clusterd has been stopped. `#8749 <https://github.com/wazuh/wazuh/pull/8749>`_
- Added message with the PID of `wazuh-clusterd` process when launched in foreground mode. `#9077 <https://github.com/wazuh/wazuh/pull/9077>`_
- Added time calculation when extra information is requested to the `cluster_control` binary. `#10492 <https://github.com/wazuh/wazuh/pull/10492>`_
- Added a context variable to indicate origin module in socket communication messages. `#9209 <https://github.com/wazuh/wazuh/pull/9209>`_
- Added unit tests for framework/core files to increase coverage. `#9733 <https://github.com/wazuh/wazuh/pull/9733>`_
- Added a verbose mode in the wazuh-logtest tool. `#9204 <https://github.com/wazuh/wazuh/pull/9204>`_
- Added Vulnerability Detector support for Amazon Linux. `#8830 <https://github.com/wazuh/wazuh/pull/8830>`_
- Introduced new option `<force>` to set the behavior when Authd finds conflicts on agent enrollment requests. `#10693 <https://github.com/wazuh/wazuh/pull/10693>`_
- Added saniziters to the unit tests execution. `#9099 <https://github.com/wazuh/wazuh/pull/9099>`_
- Vulnerability Detector introduces vulnerability inventory. `#8237 <https://github.com/wazuh/wazuh/pull/8237>`_
- The manager will only deliver alerts when new vulnerabilities are detected in agents or when they stop applying.



^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============

==============================================================    =============


^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
==============================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <xxxx>`_
- `wazuh/wazuh-kibana-app <xxx>`_
- `wazuh/wazuh-splunk <xxxx>`_