.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_2_3:

3.2.3 Release notes
===================

This section shows the most relevant improvements and fixes in version 3.2.3. More details about these changes are provided in each component changelog.

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.2.3/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.2.3/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.2.3/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.2.3-6.2.4/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.2.3-7.1.0/CHANGELOG.md>`_

GDPR Support
------------

The `General Data Protection Regulation <https://www.eugdpr.org/>`_ took effect on 25th May 2018. Wazuh helps with most technical requirements, taking advantage of features such as File Integrity or Policy monitoring. In addition, the entire Ruleset has been mapped following the GDPR regulation, enriching all the alerts related to this purpose.

You can read more information about the GDPR regulation and how Wazuh faces it on the this section: :ref:`gdpr`.

Wazuh cluster
-------------

This version fixes several performance issues (like CPU usage) and synchronization errors. The communications and synchronization algorithm have been redesigned in order to improve the cluster performance and reliability.

Now, the client nodes initialize the communication and only the master node is included in the client configuration.

The number of daemons has been reduced to one: ``wazuh-clusterd``.

You can check our documentation for Wazuh cluster in the following :ref:`link <wazuh-cluster>`.

Core improvements
-----------------

These are the most relevant changes in the Wazuh core:

- :ref:`Vulnerability-detector <vulnerability-detection>` continues to expand its scope, now adding support for Amazon Linux. A bug when comparing epoch versions has also been fixed.
- The agent limit has been increased to ``14000`` by default, improving the manager availability in large environments.
- More internal bugs reported by the community have been fixed for this version.

Wazuh app for Splunk
--------------------

New section describing the installation process for the :ref:`Wazuh app for Splunk <installation_splunk>`.

Wazuh app for Kibana
--------------------

The **Dev tools** tab has been added in this version. You can use it to interact with the managers by API requests.

Similar to PCI DSS, a new tab for **GDPR** is included in order to visualize the related alerts.

Other relevant changes in the Wazuh app are:

- New button for downloading lists on a *CSV* format. Currently available for the Ruleset, Logs and Groups sections on the Manager tab and also the Agents tab.
- New option on the configuration file for enabling or disabling the ``wazuh-monitoring`` indices creation/visualization.
- Design improvements for the Ruleset tab.
- Performance improvements on visualization filters.
- And many bugfixes for the overall app.
