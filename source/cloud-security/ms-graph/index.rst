.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Discover how Wazuh helps you monitor the Microsoft Graph API for your organization. Learn more about it in this section of our documentation.

.. _ms-graph:

Using Wazuh to monitor Microsoft Graph
======================================

.. versionadded:: 4.6.0

This section provides instructions for monitoring **Microsoft Graph API** `resources` and `relationships` within your organization.

Currently, the module allows you to monitor the following with Wazuh:

- Microsoft Entra ID Protection
- Microsoft 365 Defender
- Microsoft Defender for Cloud Apps
- Microsoft Defender for Endpoint
- Microsoft Defender for Identity
- Microsoft Defender for Office 365
- Microsoft Purview eDiscovery
- Microsoft Purview Data Loss Prevention (DLP)
- Microsoft MDM Intune

While these are centric to the security resource, the Microsoft Graph REST API contains a large number of additional resources that can be monitored. See the `Overview of Microsoft Graph <https://learn.microsoft.com/en-us/graph/overview?view=graph-rest-1.0>`_ documentation to learn more.

.. note::

   We've only developed Wazuh rules and conducted tests for the ``security`` and ``deviceManagement`` resources. However, you can still ingest logs from other resources at your organization's discretion.

.. topic:: Contents

  .. toctree::
    :maxdepth: 2

    monitoring-ms-graph-activity
