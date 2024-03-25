.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out more about Wazuh server administration and its configurations in this section of our documentation.

.. _user_manual_manager:

Wazuh server
============

The Wazuh manager is the system that analyzes the data received from all registered agents and triggers alerts when an event coincides with a rule. For example, intrusion detected, file modified, configuration not in accordance with the policy, possible rootkit, among others. The manager also works as an agent on the local machine, which means that it has all the features that an agent has. In addition, the manager can forward the alerts that it triggers through Syslog, emails, or integrated external APIs.

.. topic:: Contents

   .. toctree::
      :maxdepth: 2

      alert-management/index
      manual-integration
      configuring-cluster/index
      remote-service
      ../certificates
