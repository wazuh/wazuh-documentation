.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 3.7.1 has been released. Check out our release notes to discover the changes and additions of this release.
  
.. _release_3_7_1:

3.7.1 Release notes - 5 December 2018
=====================================

This section shows the most relevant improvements and fixes in version 3.7.1. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.7.1/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.7.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.7.1-6.5.1/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.7.1-7.2.1/CHANGELOG.md>`_

Improved who data capabilities for FIM
--------------------------------------

This version comes with a new option for the FIM configuration. Now is possible to add extra Audit keys using ``<audit_key>`` tag. It allows the who data engine to capture Audit events related to the key.


Other minor improvements
------------------------

Wazuh 3.7.1 includes some other improvements:

- Restored the support for Amazon Linux on the :doc:`Vulnerability detector </user-manual/capabilities/vulnerability-detection/index>`.
- Improved performance of the *Remote* service.
- Added IPv6 support for the ``host-deny.sh`` script from :doc:`Active Response </user-manual/capabilities/active-response/index>`.
- Included more tracing information to the logs generated on debugging mode.
- The FIM engine now gives more descriptive messages when a file is not reachable.


New features for Kibana plugin
------------------------------

The main highlights for the Wazuh app for Kibana include a new **auto-complete feature** for the Dev tools tab, so now the user can start typing an API request to see a list of suggestions.

.. thumbnail:: ../images/release-notes/3.7.1/kibana-features.png
  :title: New auto-complete feature for Kibana app
  :align: center

In addition to this, some refinements and bugfixes were added for better stability and overall performance.

New features for Splunk plugin
------------------------------

The main highlights for the Wazuh app for Splunk include support for **extensions**, new tabs for **VirusTotal** and **CIS-CAT** alerts, the **Export as CSV** button for several tables and the ability to execute ``PUT``, ``POST`` and ``DELETE`` requests on the **Dev tools** tab, along with ``GET`` requests.

.. thumbnail:: ../images/release-notes/3.7.1/splunk-features.png
  :title: New methods for Dev tools on Splunk app
  :align: center

In addition to this, code refactoring, visual/ UI adjustments, and bugfixes were added for better stability and overall performance.
