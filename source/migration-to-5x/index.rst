.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to migrate supported Wazuh data and configurations from an existing Wazuh 4.x deployment to a newly deployed Wazuh 5.x environment.

Migration guide
================

Wazuh 5.x introduces significant architectural and platform changes across the Wazuh indexer, Wazuh manager, Wazuh dashboard, and Wazuh agent. As a result, Wazuh 4.x environments cannot be upgraded in place to Wazuh 5.x. Instead, the transition to Wazuh 5.x requires a migration or recreation of 4.x data, configuration, certificates, and security settings.

This guide describes how to migrate supported Wazuh data and configurations from an existing 4.x deployment to a newly deployed Wazuh 5.x environment. It covers migrating indexed data and Wazuh agent registrations, as well as recreating supported indexer, manager, dashboard, security, agent group, and custom dashboard configurations.

.. toctree::
   :maxdepth: 1

   transition-plan
   wazuh-indexer
   wazuh-manager
   wazuh-dashboard
   wazuh-agents
