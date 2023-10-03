.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Discover the tools Wazuh provides to monitor Microsoft Entra ID in this section of the documentation.

.. _azure_monitoring_services:

Monitoring Microsoft Entra ID
=============================

`Microsoft Entra ID <https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-whatis>`_ is the identity and directory management service that combines basic directory services, application access management, and identity protection in a single solution. The Wazuh ``azure-logs`` module requires dependencies to work as well as the right credentials to access the logs. Take a look at the :doc:`prerequisites </cloud-security/azure/activity-services/prerequisites/index>` section before proceeding. 

.. thumbnail:: /images/cloud-security/azure/aad-graph-intro.png
    :title: AAD
    :align: center
    :width: 100%

Wazuh is able to monitor the Microsoft Entra ID (ME-ID) service using the Activity reports provided by the `Microsoft Graph REST API <https://docs.microsoft.com/en-us/graph/overview>`_. Microsoft Entra ID applications can make use of the Microsoft Graph API to perform read operations on directory data and objects.


.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       graph