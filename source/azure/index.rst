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


`The Azure Active Directory Graph API <https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-graph-api-quickstart>`_ provides  access to Azure AD through REST API endpoints. Applications can use Azure AD Graph API to perform read operations on directory data and objects.

`Azure Storage <https://docs.microsoft.com/en-us/azure/storage/common/storage-introduction>`_ refers to Microsoft Azure cloud storage by providing a massively scalable object store for data objects, a messaging store for reliable messaging, a file system service for the cloud, and a NoSQL store.

This section provides instructions for monitoring Microsoft Azure infrastructures. We will see how to monitor all the activity that happens in the infrastructure, how to install Wazuh agents to monitor the virtual machines that make up the infrastructure and how to monitor services such as Azure Active Directory (AAD).

.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       installation
       monitoring instances
       monitoring activity
       monitoring services
       troubleshooting
