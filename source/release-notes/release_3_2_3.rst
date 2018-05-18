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
-------------

The new **General Data Protection Regulation** takes effect in the European Union on 25 May 2018. Accordingly, Wazuh has been upgraded to provide GDPR compliance.
Taking advance of Wazuh features such as FIM or Policy Monitoring, it helps with most technical requirements.

In addition to that, the entire Ruleset has been mapped following the GDPR regulation, enriching all the alerts related to this purpose.

More information about the GDPR regulation and how Wazuh faces it, read it dedicated section at: :doc:`Using Wazuh for GDPR <../gdpr/index>`.

Core improvements
------------------

The most relevant changes in the Wazuh core are the following:

- Vulnerability-detector continues to expand its scope, now adding support for Amazon Linux. It also has been solved a bug when comparing epoch versions.
- The agent limit has been increased to 14000 by default, improving the manager availability in large environments.
- More internal bugs reported by the community have been fixed for this version.

Wazuh cluster
--------------

XXXXXXXXXXXXXXXXXXXXx
