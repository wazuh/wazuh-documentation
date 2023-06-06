.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Learn more about the agent management in Wazuh. In this section, we will show you how to configure an agent to monitor cloud and containers.

.. _cloud_and_container_monitoring:

Cloud and container monitoring
==============================

Wazuh offers the ability to monitor your cloud and container infrastructure, helping you maintain the highest levels of
security. In this section, we will show how to configure your Wazuh agent to monitor various cloud providers and container technologies.

See the :doc:`Cloud security </monitoring>` and :doc:`Container security </container-security/index>` sections to learn more.

.. note::
  Cloud and containers monitoring can be configured in both the Wazuh manager and the agent. The choice merely depends on how you want to access your cloud and container infrastructure and based on your needs.

Dependencies
------------

All cloud and container providers require specific dependencies. Check each section to learn more.
We use `Pip <https://pypi.org/project/pip/>`_, the package installer for Python, to install the required dependencies.

- :doc:`AWS dependencies </amazon/services/prerequisites/dependencies>`
- :doc:`AZURE dependencies </azure/activity-services/prerequisites/dependencies>`
- :doc:`GCP dependencies </gcp/prerequisites/dependencies>`
- :doc:`Docker listener dependencies </container-security/docker-monitor/dependencies>`
