.. Copyright (C) 2018 Wazuh, Inc.

.. _user_manual_manager:

Wazuh server administration
===========================

The Wazuh manager is the system that analyzes the data received from all registered agents triggering alerts when an event matches a rule, for example: intrusion detected, file modified, configuration not compliant with policy, possible rootkit, etc. The manager also operates as an agent on the local machine, so it has all the features that an agent has. Also, the manager can forward the alerts it triggers through syslog, emails or integrated external APIs.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        remote-service
        alert-threshold
        manual-integration
        manual-syslog-output
        automatic-reports
        manual-email-report/index
        manual-email-report/smtp_authentication
        wazuh-cluster
