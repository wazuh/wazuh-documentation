.. Copyright (C) 2021 Wazuh, Inc.

.. _azure_monitoring_services:

Monitoring Services
===================

.. meta::
  :description: Discover Wazuh provides to monitor your Microsoft Azure services.

`Azure Active Directory <https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-whatis>`_ is the identity and directory management service that combines basic directory services, application access management, and identity protection in a single solution.

.. thumbnail:: ../../../images/azure/graph_intro.png
    :title: AAD
    :align: center
    :width: 100%

Wazuh is able to monitor the Azure Active Directory (Azure AD) service and its activity using the Activity reports provided by the `Microsoft Graph REST API <https://docs.microsoft.com/en-us/graph/overview>`_. Azure AD applications can make use the Microsoft Graph API to perform read operations on directory data and objects.


.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       graph