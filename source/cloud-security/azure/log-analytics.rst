.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: 

Microsoft Azure Log Analytics
=============================

`Microsoft Azure Log Analytics <https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-overview>`__ is a service that monitors your Microsoft Azure infrastructure, offering query capabilities that allow you to perform advanced searches specific to your data.

The Azure Log Analytics solution helps you to analyze and search Azure activity logs in all your Azure subscriptions, providing information about the operations performed with the resources of your subscriptions.

.. thumbnail:: /images/cloud-security/azure/log-analytics-activity-send.png
   :align: center
   :width: 80%

You can query data collected by Log Analytics using the Azure Log Analytics REST API, which uses the Microsoft Entra ID authentication scheme. You need a qualified application or client to use the Azure Log Analytics REST API. You must configure this manually on the Microsoft Azure portal. The section below shows how to set up the application and gives a use case:

-  `Setting up the application`_
-  `Azure Log Analytics use case`_

Configuration
-------------

Azure
^^^^^

Setting up the application
~~~~~~~~~~~~~~~~~~~~~~~~~~

The process below details creating an application using the Azure Log Analytics REST API. It is also possible to configure an existing application. Please skip the `Creating the application`_ step if you already have an existing application.

Creating the application
........................

We navigate to the Microsoft Entra ID panel on the Microsoft Azure portal to create a new application for Azure Log Analytics.

#. Select the **App registrations** option from the **Microsoft Entra ID** panel. Then, select **New registration**.

   .. thumbnail:: /images/cloud-security/azure/new-app-registration.png
      :align: center
      :width: 80%

#. Define the user-facing display name for the application and select **Register**.

   .. thumbnail:: /images/cloud-security/azure/register-an-application.png
      :align: center
      :width: 80%

#. 























Alert visualization
^^^^^^^^^^^^^^^^^^^

Once the Wazuh configuration is set and the ``azure-logs`` module is running using the previous configuration, the event will be processed. The results can be checked in the Wazuh dashboard:

.. thumbnail:: /images/cloud-security/azure/new-user-event.png
    :title: Log Analytics App
    :align: center
    :width: 100%
