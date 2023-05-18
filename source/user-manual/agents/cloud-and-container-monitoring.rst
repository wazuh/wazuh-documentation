.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Learn more about the agent management in Wazuh. In this section, we will show you how to configure an agent to monitor cloud and containers.

.. _cloud_and_container_monitoring:

Cloud and container monitoring
==============================

Wazuh offers the ability to monitor your cloud and container infrastructure, helping you maintain the highest levels of
security. In this section, we will show how to configure your Wazuh agent to monitor various cloud providers and container technologies.

To learn more about cloud security, check out :doc:`this section </monitoring>`.

To learn more about container security, check out :doc:`this section </container-security/index>`.

.. note::
  Cloud and containers monitoring can be configured in both the Wazuh manager and the agent. The choice merely depends on how you want to access your cloud and container infrastructure and based on your needs.

Python
------

Cloud and container modules require `Python 3 <https://www.python.org/>`_. They are compatible with
`Python 3.7+ <https://www.python.org/downloads/>`_.

.. warning::
  Future Python releases should maintain compatibility although it is not guaranteed.

Dependencies
------------

All cloud and container providers require specific dependencies.
`Pip <https://pypi.org/project/pip/>`_ is the package installer for Python and we will use it to install the required
dependencies for each module.

- :doc:`AWS dependencies </amazon/services/prerequisites/dependencies>`
- :doc:`AZURE dependencies </azure/activity-services/prerequisites/dependencies>`
- :doc:`GCP dependencies </gcp/prerequisites/dependencies>`
- :doc:`Docker listener dependencies </container-security/docker-monitor/dependencies>`
