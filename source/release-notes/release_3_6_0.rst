.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_6_0:

3.6.0 Release Notes
===================

This section shows the most relevant improvements and fixes in version 3.6.0. More details about these changes are provided in each component changelog.

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.6.0/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.6.0/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.6.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.6.0-6.3.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.6.0-7.1.2/CHANGELOG.md>`_

Wazuh core
----------

This section shows the main features introduced in this new version for the Wazuh core. 
Some of this new improvements are related with Logcollector and Rootcheck, in adittion, some bugs have been fixed.

Rootcheck now runs independently from Syscheck (FIM) and it is parallelized; moreover, Logcollector has been enhanced with multithreaded input, which allows having a parallelized read of logs, a new wildcards support and improvement of its detection by enabling a periodically rescanning of files.

Besides, the download of OVAL files for Vulnerability Detector has been fixed since Red Hat has changed its protocol to send this files.
Furthermore, bug related with Wazuh DB has been fixed, the Vulnerability Detector module was requesting a package list timestamp update to Wazuh DB to mark all the packages reported by the agent as triaged, Vulnerability Detector was closing its connection when receiving the reply resulting in a Wazuh DB error.

Wazuh app for Splunk
--------------------

The Splunk app has been redesigned based on Material Design; besides, the SplunkJS framework (RequireJS + BackboneJS + JQuery) has been wrapped to AngularJS, the user experience has been improved with better visualizations
and a better way to navigate over the app with UX improvements. In addition, there are new features as dynamic query filters in real time.