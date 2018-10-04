.. Copyright (C) 2018 Wazuh, Inc.

.. _azure:

Using Wazuh to Monitor Microsoft Azure
======================================

.. versionadded:: 3.7.0

This section provides instructions for monitoring **Microsoft Azure** infrastructures. This section shows how to monitor all activity that occurs in the infrastructure such as changes that occur in virtual machines, activation of alerts, health data information as well as control data. We will show how to install Wazuh agents to monitor the virtual machines that make up the infrastructure, which will send events to the Wazuh manager for analysis in order to classify the event with a range of alerts that that can be easily viewed. This section shows how to monitor services of our infrastructure such as Azure Active Directory (AAD).

From a broad point of view, the resources of the Microsoft Azure infraestructure can be devided into two general types of logs. These are the Activity logs and the Diagnostic logs.  

.. thumbnail:: ../images/azure/Resources.png
    :title: Microsoft Azure resources
    :align: center
    :width: 25%

Operations performed on a resource from outside the infrastructure are stored in the Activity logs, providing information on those operations. On the other hand, the data referring to the operation of a resource is stored in the Diagnostic logs. 

Wazuh has the ability to obtain and read Microsoft Azure logs through **Azure Log Analytics, Azure Active Directory Graph and Azure Storage**. Microsoft Azure support is now a built-in capability of Wazuh, giving you the ability to search, analyze and alert on Microsoft Azure log data.

.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       installation
       monitoring instances
       monitoring activity
       monitoring services
