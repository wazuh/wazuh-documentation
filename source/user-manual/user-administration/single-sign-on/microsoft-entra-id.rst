.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Microsoft Entra ID is a cloud-based identity and access management service by Microsoft. Learn more about it and the administrator role in this section of the Wazuh documentation.

Microsoft Entra ID
==================

`Microsoft Entra ID <https://portal.azure.com/>`_ (ME-ID) is a cloud-based identity and access management service by Microsoft. It provides single sign-on, multifactor authentication, and access to internal and cloud developed applications. In this guide, we integrate the Microsoft Entra ID IdP to authenticate users into the Wazuh platform.

Learn how to create administrator and read-only roles on Microsoft Entra ID and map them with Wazuh in the sections below.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Setup Microsoft Entra ID single sign-on with administrator role
---------------------------------------------------------------

Follow these steps to integrate Microsoft Entra ID IdP with Wazuh for single sign-on and grant administrator role to the authenticated Microsoft Entra ID users on the Wazuh platform:

#. :ref:`configuration_entra_id_admin`
#. :ref:`indexer_configuration_entra_id_admin`
#. :ref:`dashboard_configuration_entra_id_admin`

.. note::

   You may have to request a free trial at least to complete the configuration.

.. _configuration_entra_id_admin:

Microsoft Entra ID Configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Go to `Microsoft Azure Portal <https://portal.azure.com/>`__, sign up or sign in if you already have an Azure Portal account.
#. Create an app in **Microsoft Entra ID**.

   #. Go to **Microsoft Entra ID** > **Enterprise applications** > **New application** and **Create your own application**.
   #. Select **Integrate any other application you don't find in the gallery**. Give a name to your application and click **Add**. In our case, we name this application ``wazuh-sso``.

   .. thumbnail:: /images/single-sign-on/azure-active-directory/01-go-to-azure-active-directory.png
      :title: Create an app in Microsoft Entra ID
      :align: center
      :width: 80%

#. Create a role for your application.

   #. Go back to **Microsoft Entra ID** and click on **App registrations**.

      .. thumbnail:: /images/single-sign-on/azure-active-directory/02-click-on-app-registrations.png
         :title: Click on App registrations
         :align: center
         :width: 80%

   #. 