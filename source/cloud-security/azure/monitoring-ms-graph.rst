.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section provides instructions for monitoring your organization's Microsoft Graph API resources and relationships using the Wazuh module for Microsoft Graph.

Monitoring Microsoft Graph services with Wazuh
==============================================

The Microsoft Graph API is a comprehensive API system that provides access to data across the full suite of Microsoft cloud services, including but not limited to Microsoft 365, Azure, Dynamics 365, and various other Microsoft cloud components. It is an endpoint for accessing structured data, insights, and rich relationships from the Microsoft Cloud ecosystem.

This section provides instructions for monitoring your organization's Microsoft Graph API resources and relationships using the Wazuh module for Microsoft Graph.

Currently, the Wazuh module for Microsoft Graph allows you to monitor the following with Wazuh:

-  Microsoft Entra ID Protection
-  Microsoft 365 Defender
-  Microsoft Defender for Cloud Apps
-  Microsoft Defender for Endpoint
-  Microsoft Defender for Identity
-  Microsoft Defender for Office 365
-  Microsoft Purview eDiscovery
-  Microsoft Purview Data Loss Prevention (DLP)

While these are fundamental to the security resource, you can monitor many additional resources using the Microsoft Graph API. See the `Overview of Microsoft Graph <https://learn.microsoft.com/en-us/graph/overview?view=graph-rest-1.0>`__ documentation to learn more.

.. note::

   The security resource can be considered mature, as it has been tested with pre-made rules. However, your organization can ingest logs from other resources to your Wazuh deployment.

.. _retrieving_content:

**Retrieving content**

To retrieve a set of logs from Microsoft Graph, make a ``GET`` request using the URL below:

.. code-block:: none

   GET https://graph.microsoft.com/{version}/{resource}/{relationship}?{query-parameters}

A description of the current production version of the Microsoft Graph API can be found in the `Overview of Microsoft Graph <https://learn.microsoft.com/en-us/graph/overview?view=graph-rest-1.0>`__.

Alternatively, the API can be directly experimented with through `Microsoft Graph Explorer <https://developer.microsoft.com/graph/graph-explorer>`__.

.. toctree::
   :maxdepth: 2

   ms-graph-api-setup
