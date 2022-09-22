.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.1.5 has been released. Check out our release notes to discover the changes and additions of this release.
  
.. _release_4_1_5:

4.1.5 Release notes - 22 April 2021
===================================

This section lists the changes in version 4.1.5. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.1.5/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/4.1-7.10/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/4.1-8.1/CHANGELOG.md>`_


Wazuh core
----------

Resolved issues
^^^^^^^^^^^^^^^

=============================================================================================  =============
Reference                                                                                      Description
=============================================================================================  =============
`4cbd1e8 <https://github.com/wazuh/wazuh/commit/4cbd1e85eeee0eb0d8247fa7228f590a9dd24153>`_    Issue is fixed in Vulnerability Detector that made ``modulesd`` crash while updating the NVD feed due to a missing CPE entry.
=============================================================================================  =============

Wazuh Kibana plugin
-------------------

What's new
^^^^^^^^^^

- Wazuh Kibana plugin is now compatible with Wazuh 4.1.5.


Wazuh Splunk app
----------------

What's new
^^^^^^^^^^

- Wazuh Splunk app is now compatible with Wazuh 4.1.5.
