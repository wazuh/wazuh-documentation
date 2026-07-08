.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to deploy a new Wazuh 5.x environment using an existing Wazuh 4.x deployment as the source for supported configuration and security settings.

Transitioning from Wazuh 4.x to 5.x
===================================

This guide describes how to deploy a new Wazuh 5.x environment, using an existing Wazuh 4.x deployment as the source for supported configuration and security settings.

Wazuh 5.x introduces significant architectural and platform changes across the Wazuh indexer, manager, and dashboard. These changes prevent in-place upgrades from Wazuh 4.x. Instead, deploy a new Wazuh 5.x environment and recreate the supported configuration, certificates, and security settings.

While many configuration and security settings can be recreated in Wazuh 5.x, indexed data cannot be migrated from Wazuh 4.x. Wazuh 5.x introduces new index schemas, templates, and mappings that are incompatible with the data structures used in previous releases. Organizations that require access to historical data should retain their Wazuh 4.x deployment as a separate read-only environment until it is no longer needed.

.. toctree::
   :maxdepth: 1

   transition-plan
   wazuh-indexer
   wazuh-manager
   wazuh-dashboard
