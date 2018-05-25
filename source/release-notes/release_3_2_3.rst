.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_2_3:

3.2.3 Release Notes
===================

This section shows the most relevant improvements and fixes in version 3.2.3. More details about these changes are provided in each component changelog.

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.2.3/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.2.3/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.2.3/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.2.3-6.2.4/CHANGELOG.md>`_

GDPR Support
------------

The new **General Data Protection Regulation** takes effect in the European Union on 25 May 2018. Accordingly, Wazuh has been upgraded to provide GDPR compliance.
Taking advantage of Wazuh features such as File Integrity or Policy Monitoring, it helps with most technical requirements.

In addition to that, the entire Ruleset has been mapped following the GDPR regulation, enriching all the alerts related to this purpose.

You can read more information about the GDPR regulation and how Wazuh faces it on the dedicated section: :ref:`gdpr`.

Core improvements
-----------------

These are the most relevant changes in the Wazuh core:

- Vulnerability-detector continues to expand its scope, now adding support for Amazon Linux. A bug when comparing epoch versions has also been fixed.
- The agent limit has been increased to ``14000`` by default, improving the manager availability in large environments.
- More internal bugs reported by the community have been fixed for this version.

Wazuh cluster
-------------

The communications and synchronization algorithm have been redesigned in order to improve the cluster performance and reliability. Now, the client nodes initialize the communication and it's just necessary to specify the master node in the client configuration.

The number of daemons has been reduce to one: ``wazuh-clusterd``.

Wazuh app: Kibana
-----------------

The Wazuh app for Kibana also got several improvements and additions for this new version. Now you can execute Wazuh API calls on the new **Dev tools** tab, just like you can execute Elasticsearch calls on its own tab in Kibana.

Also, along with the GDPR compliance, the app now has a tab for visualizing these alerts. Similar to PCI DSS, you can see a description of the GDPR requirements and the latest alerts from your manager.

Other relevant changes in the Wazuh app are the following:

- New button for downloading lists on a *CSV* format. Currently available for the Ruleset, Logs and Groups sections on the Manager tab and also the Agents tab.
- New option on the configuration file for enabling or disabling the ``wazuh-monitoring`` indices creation/visualization.
- Design improvements for the Ruleset tab.
- Performance improvements on visualization filters.
- And many bugfixes for the overall app.
