.. Copyright (C) 2018 Wazuh, Inc.

.. _azure_module_log_analytics:

Getting logs form Log Analytic
==============================

The Log Analytics solution helps you to analyze and search the Azure activity log in all your Azure subscriptions by providing information about the operations performed with the resources of your subscriptions.

.. thumbnail:: ../images/azure/la_activity_send.png
    :title: Microsoft Azure resources
    :align: center
    :width: 60%

Many Azure resources that are able to write **diagnostic logs** and metrics directly to Log Analytics and this is the preferred way to collect data for analysis. 

.. thumbnail:: ../images/azure/la_diag_send.png
    :title: Microsoft Azure resources
    :align: center
    :width: 60%

We can consult all the data collected by Log Analytics through the **Azure Log Analytics REST API**. The Azure Log Analytics API uses the Azure Active Directory authentication scheme.  Part of the installation guide is based on this `tutorial <https://dev.loganalytics.io/documentation/1-Tutorials/Direct-API>`_.


In order to use Azure Log Analytics, we need to perform additional configuration on the Microsoft Azure portal. The goal is to have an application or client qualified to use the Azure Log Analytics REST API. 


Register the Application
------------------------

.. note::

        The process explained below details the creation of the application that will use the of Azure Log Analytics REST API. You can also configure an existing application, the process is similar from the creation of the application. 

In the ``Azure Active Directory`` section select the option ``App registrations`` and once inside, select ``New application registration``.

.. thumbnail:: ../images/azure/la_app_registration.png
    :title: Log Analytics App
    :align: center
    :width: 100%

Proceed to create our application

.. thumbnail:: ../images/azure/la_create_app.png
    :title: Log Analytics App
    :align: center
    :width: 40%

Whether we have created a new application or are using one we already have, we need to access the application ``settings`` and select ``Required permissions``. Note that we can also see the ``application ID``, a necessary field to authenticate the application later. 

.. thumbnail:: ../images/azure/la_permissions.png
    :title: Log Analytics App
    :align: center
    :width: 100%

We choose the Api we want to access.

.. thumbnail:: ../images/azure/la_select_api.png
    :title: Log Analytics App
    :align: center
    :width: 100%

Select the permissions. Choose the permissions you want to provide to the application. 

.. thumbnail:: ../images/azure/la_select_permissions.png
    :title: Log Analytics App
    :align: center
    :width: 100%

Then select ``Keys`` and fill in the ``DESCRIPTION`` and ``EXPIRES`` fields. Once we ``save`` the key we will get its ``value``. This will be the key with which we will authenticate our application in order to use the API.

.. thumbnail:: ../images/azure/la_create_key.png
    :title: Log Analytics App
    :align: center
    :width: 100%