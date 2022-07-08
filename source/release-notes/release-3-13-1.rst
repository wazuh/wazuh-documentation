.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 3.13.1 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_3_13_1:

3.13.1 Release notes - 15 July 2020
===================================

This section lists the changes in version 3.13.1. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.13.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/3.13.1-7.8.0/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/3.13/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/3.13-8.0/CHANGELOG.md>`_

Wazuh core
----------

- Added the settings ``<max_retries>`` and ``<retry_interval>`` to adjust the amount of connection retries and the agent failover interval.
- Fixed ``Modulesd`` crash caused by Vulnerability Detector when OS inventory is disabled for the agent.

Wazuh Kibana app
----------------

- Support for Wazuh v3.13.1.

Wazuh API
---------

- New validator added to the endpoint ``/sca/:agent_id/checks/:policy_id`` that allows using filter the SCA checks by ``reason``, ``status``, and ``command``.

Wazuh Splunk
------------

- Support for Wazuh v3.13.1.
- Support for Splunk v8.0.4.
- Updated references of the field ``vulnerability.reference`` to ``vulnerability.references``.
- Fixed ``wazuh-monitoring`` indices on Splunk 8.0+ version.
