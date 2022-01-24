.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Wazuh 3.9.5 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_3_9_5:

3.9.5 Release notes
===================

This section shows the most relevant improvements and fixes in version 3.9.5. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.9.5/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.9.5-7.3.0/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.9.5-7.3.0/CHANGELOG.md>`_

Wazuh manager
-------------

- Fixed a bug in the Framework that prevented Cluster and API from handling the file *client.keys* if it's mounted as a volume on Docker.
- Fixed a bug in Analysisd that printed the millisecond part of the alerts' timestamp without zero-padding. That prevented Elasticsearch 7 from indexing those alerts.

Wazuh Kibana app
----------------

- Fixed a bug present in Kibana v7.3.0, affecting Firefox browser, which creates an endless loop if two or more query filters are added.
