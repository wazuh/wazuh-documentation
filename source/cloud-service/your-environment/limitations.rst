.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh Cloud is designed as a managed service with intentionally limited access to certain platform components. Learn more in this section.

Limitations
===========

Wazuh Cloud is designed as a managed service, meaning that the Wazuh team takes responsibility for infrastructure management, scaling, updates, and security hardening. While this reduces operational overhead for users, it also means that access to certain components of the platform is intentionally limited. These safeguards ensure multi-tenant security, platform stability, and compliance with industry standards.

Dashboard access only
---------------------

Users interact with Wazuh Cloud exclusively through the Wazuh dashboard and the ports required for agent communication.

Restricted API access
---------------------

* The Wazuh Server API and Wazuh indexer API are not accessible by default.
* Access to these APIs can be enabled on request through Wazuh Support.
* Even when enabled, only read operations are supported; direct write operations to the indexer API are not permitted.

No CLI access
-------------

Users do not have direct command-line or shell access to the underlying cloud infrastructure. This ensures that the environment remains secure, stable, and consistent across tenants.

These restrictions are in place to protect the integrity of the platform and to provide a reliable managed service experience. If you need functionality beyond these defaults, contact `Wazuh support <https://wazuh.com/services/professional-support/>`__ to discuss available options.

