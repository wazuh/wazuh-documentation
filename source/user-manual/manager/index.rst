.. _user_manual_manager:

Manager
================

Wazuh manager is the system that analyzes the data received from all the agents, triggering alerts when an event matches a rule for example: intrusion detected, file changed, configuration not compliant with policy, possible rootkit, etc. It is also an agent, so it has all the features that an agent has.

Also, the manager contain specific features:

- **Output options**: This section explains how the manager can forward the alerts it triggered through syslog, emails or integration with external APIs.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        output-options/index
