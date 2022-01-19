.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Learn more about how to use Wazuh to monitor Microsoft Azure infrastructures in this section of the Wazuh documentation. 
  
.. _azure:

Using Wazuh to monitor Microsoft Azure
======================================


.. versionadded:: 3.7.0

As a built-in Wazuh feature, it is possible to analyze and trigger alerts from Microsoft Azure log data. Wazuh helps to increase the security of an Azure infrastructure in three different, complementary ways:

- **Monitoring instances** by installing the Wazuh agent on them. This will send events to the Wazuh manager for analysis in order to classify the events within a range of alerts that can be easily viewed.
- **Monitoring the Azure Portal and its services**, including platform logs from Azure services, logs, and performance data from virtual machines and usage and performance data from the applications.
- **Monitoring the Azure Active Directory (Azure AD) activity** to discover how the Azure AD services are accessed and used.

.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       monitoring-instances
       activity-services/index
