.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_7_1:

3.7.1 Release Notes
===================

This section shows the most relevant improvements and fixes in version 3.7.1. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.7.1/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.7.1/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.7.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.7.1-6.5.1/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.7.1-7.2.1/CHANGELOG.md>`_

Collecting Audit events with custom keys
----------------------------------------

The Wazuh Integrity Monitoring engine (FIM engine) is capable of reading logs from the :ref:`Linux Audit events <system_call_monitoring>`. Each generated event is triggered by a defined rule and must have a key to be identified by Wazuh in order to perform a more accurate analysis.

In this new version, the FIM engine was improved and now can collect Audit events using custom keys. The new ``<audit_key>`` tag can be used to define the keys on the ``<syscheck><whodata>`` block from the :ref:`configuration file <reference_ossec_conf>`.

With this option, you can add other rule's keys generated manually or by other methods. It allows monitoring directories with Audit that have other associated rules. The Integrity Monitoring engine will filter the events looking for these keys.

Other minor improvements
------------------------

Wazuh 3.7.1 includes some other improvements to the main functionality. For instance:

- Restored the support for Amazon Linux on the :ref:`Vulnerability detector <vulnerability-detection>`.
- The performance of Remoted has been improved.
- Added IPv6 support for the ``host-deny.sh`` script from :ref:`Active Response <automatic_remediation>`.
- Included more tracing information to the logs generated on debugging mode.
- The FIM engine now gives more descriptive messages when a file is not reachable.

This release also includes several bugfixes and stability improvements to the core components.

New features for Kibana plugin
------------------------------

The main highlights for the Wazuh app for Kibana include a new **auto-complete feature** for the Dev tools tab, so now the user can start typing an API request to see a list of suggestions.

.. thumbnail:: ../images/release-notes/3.7.1/kibana_features.png
  :title: New auto-complete feature for Kibana app
  :align: center

In addition to this, some refinements and bugfixes were added for better stability and overall performance.

New features for Splunk plugin
------------------------------

The main highlights for the Wazuh app for Splunk include support for **extensions**, new tabs for **VirusTotal** and **CIS-CAT** alerts, the **Export as CSV** button for several tables and the ability to execute ``PUT``, ``POST`` and ``DELETE`` requests on the **Dev tools** tab, along with ``GET`` requests.

.. thumbnail:: ../images/release-notes/3.7.1/splunk_features.png
  :title: New methods for Dev tools on Splunk app
  :align: center

In addition to this, code refactoring, visual/ UI adjustments, and bugfixes were added for better stability and overall performance.
