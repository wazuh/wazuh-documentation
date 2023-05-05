.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Discover how Wazuh helps you monitor the Microsoft Graph API for your organization. Learn more about it in this section of our documentation.
  
.. _ms-graph:

Using Wazuh to monitor Microsoft Graph
======================================

.. versionadded:: 4.6.0

This section provides instructions for monitoring **Microsoft Graph API** `resources` and `relationships` within your organization.

The module currently allows for monitoring the following with Wazuh:

- Azure Active Directory Identity Protection
- Microsoft 365 Defender
- Microsoft Defender for Cloud Apps
- Microsoft Defender for Endpoint
- Microsoft Defender for Identity
- Microsoft Defender for Office 365
- Microsoft Purview eDiscovery
- Microsoft Purview Data Loss Prevention (DLP)

While these are centric to the security resoruce, the Microsoft Graph REST API contains a large number of additional resources that can be monitored: learn more `here <https://learn.microsoft.com/en-us/graph/overview?view=graph-rest-1.0>`_.

.. note:: Only the `security` resource can be considered mature at this time, as it is the only resource tested & with pre-made rules for now, but the logs of other resources can still be ingested at your organization's discretion.

.. topic:: Contents

  .. toctree::
    :maxdepth: 2

    monitoring-ms-graph-activity