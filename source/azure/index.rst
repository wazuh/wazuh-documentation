.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Learn more about how to use Wazuh to monitor Microsoft Azure infrastructures in this section of the Wazuh documentation. 
  
.. _azure:

Using Wazuh to monitor Microsoft Azure
======================================


.. versionadded:: 3.7.0

Wazuh helps to increase the security of an Azure infrastructure in three different, complementary ways:

- **Installing the Wazuh agent on the instances** that form the infrastructure, which will send events to the Wazuh manager for analysis in order to classify the event with a range of alerts that can be easily viewed.
- **Monitoring the activity** happening in the infrastructure, for instance, changes that occur in virtual machines, activation of alerts, health data information as well as control data.
- **Monitoring the services** such as Azure Active Directory (AAD).

From a wider perspective, the Microsoft Azure infrastructure resources can be divided into two types of logs, the **Activity logs** and the **Diagnostic logs**.

.. image:: ../images/azure/Resources.png
    :align: center

The operations performed on a resource outside of the infrastructure are stored in the Activity logs, providing information on those operations. On the other hand, the data referring to the operation of a resource is stored in the Diagnostic logs.

Wazuh has the ability to obtain and read Microsoft Azure logs through:

- :ref:`Azure Log Analytics <azure_log_analytics>`
- :ref:`Azure Storage <azure_storage>`
- :ref:`Microsoft Graph <azure_graph>`


As a built-in Wazuh feature, now you can search, analyze and trigger alerts from Microsoft Azure log data.

.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       prerequisites/index
       monitoring-instances
       activity-services/index
