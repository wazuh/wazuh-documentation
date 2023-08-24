.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Discover how Wazuh helps you monitor the Microsoft Graph API for your organization. Learn more about it in this section of our documentation.
  
.. _ms-graph:

Using Wazuh to monitor Microsoft Graph
======================================

.. versionadded:: 4.6.0

This section provides instructions for monitoring **Microsoft Graph API** `resources` and `relationships` within your organization.

Currently, the module allows you to monitor the following with Wazuh:

- Azure Active Directory Identity Protection
- Microsoft 365 Defender
- Microsoft Defender for Cloud Apps
- Microsoft Defender for Endpoint
- Microsoft Defender for Identity
- Microsoft Defender for Office 365
- Microsoft Purview eDiscovery
- Microsoft Purview Data Loss Prevention (DLP)

While these are centric to the security resource, the Microsoft Graph REST API contains a large number of additional resources that can be monitored. See the `Overview of Microsoft Graph <https://learn.microsoft.com/en-us/graph/overview?view=graph-rest-1.0>`_ documentation to learn more.

.. note:: Currently, only the `security` resource can be considered mature as it's the only one tested and with pre-made rules. However, the logs of other resources can still be ingested at your organization's discretion.

.. topic:: Contents

  .. toctree::
    :maxdepth: 2

    monitoring-ms-graph-activity
