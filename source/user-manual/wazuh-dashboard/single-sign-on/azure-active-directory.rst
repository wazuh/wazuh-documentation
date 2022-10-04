.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Okta Inc. is an identity and access management company that provides technologies which enable secure user authentication into applications.

.. _azure-active-directory:

Azure Active Directory
======================

`Azure Active Directory <https://portal.azure.com/>`_ (Azure AD) is a cloud-based identity and access management service by Microsoft. It provides single sign-on, multifactor authentication, and access to internal and cloud developed applications. In this guide, we integrate the Azure Active Directory IdP to authenticate users into the Wazuh platform.
The single sign-on integration process is divided into three stages.

#. Azure Active Directory Configuration
#. Wazuh indexer configuration
#. Wazuh dashboard configuration
   
 .. note::
    You may have to request a free trial at least to complete the configuration. 

Azure Active Directory Configuration
------------------------------------

#. Create a Microsoft account or use your own if you already have one.
#. Go to `Azure Active Directory <https://portal.azure.com/>`_/ and sign in with your Microsoft account.
#. Create an app in **Azure Active Directory**:

Go to **Azure Active Directory** → **Enterprise applications** → **New application** and **create your own application**:

Select **Integrate any other application you don't find in the gallery**. Give a name to your application and click **Add**. In our case, we name this application ``wazuh-sso``.

.. thumbnail:: /images/manual/single-sign-on/azure-active-directory/01-go-to-azure-active-directory.png
    :title: Go to Azure Active Directory
    :align: center
    :width: 80%

