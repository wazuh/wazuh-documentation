.. Copyright (C) 2018 Wazuh, Inc.

.. _azure:

Using Wazuh to Monitor Microsoft Azure
======================================

.. versionadded:: 3.7.0

From a broad point of view, we can divide the resources of the **Microsoft Azure** infrastructure into two general types of logs. These are the Activity logs and the Diagnostic logs.  

.. thumbnail:: ../images/azure/Resources.png
    :title: Microsoft Azure resources
    :align: center
    :width: 25%

Operations performed on a resource from outside the infrastructure are stored in the Activity logs, providing information on those operations. On the other hand, the data referring to the operation of a resource is stored in the Diagnostic records. 

Wazuh has the ability to obtain and read Microsoft Azure logs through **Azure Log Analytics, Azure Active Directory Graph and Azure Storage**. Microsoft Azure support is now a built-in capability of Wazuh, giving you the ability to search, analyze and alert on Microsoft Azure log data.

`Azure Log Analytics <https://docs.microsoft.com/en-us/azure/log-analytics/log-analytics-overview>`_ is a service that monitors your infrastructure offering query capabilities that allow you to perform advanced searches specific to your data. 

`The Azure Active Directory Graph API <https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-graph-api-quickstart>`_ provides  access to Azure AD through REST API endpoints. Applications can use Azure AD Graph API to perform read operations on directory data and objects.

`Azure Storage <https://docs.microsoft.com/en-us/azure/storage/common/storage-introduction>`_ refers to Microsoft Azure cloud storage by providing a massively scalable object store for data objects, a messaging store for reliable messaging, a file system service for the cloud, and a NoSQL store.

This section provides instructions for configuring the integration with Microsoft Azure, explaining how to configure each integration module and explaining related use cases.

.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       installation
       azure log analytics
       azure active directory graph
       azure storage
       troubleshooting
