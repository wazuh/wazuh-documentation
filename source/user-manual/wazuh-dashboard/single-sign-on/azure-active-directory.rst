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

   .. thumbnail:: /images/single-sign-on/azure-active-directory/01-go-to-azure-active-directory.png
      :title: Go to Azure Active Directory
      :align: center
      :width: 80%

#. Create a role for your application.

   Go back to Azure Active Directory and click on App registrations:

   .. thumbnail:: /images/single-sign-on/azure-active-directory/02-click-on-app-registrations.png
      :title: Click on App registrations
      :align: center
      :width: 80%

   Select your new app under **All applications** and **click Manifest**.

   .. thumbnail:: /images/single-sign-on/azure-active-directory/03-select-your-new-apps.png
      :title: Select your new app
      :align: center
      :width: 80%

   Add a new role to your application's Manifest:

    .. code-block:: console

      {
               "allowedMemberTypes": [
                  "User"
               ],
               "description": "Wazuh role",
               "displayName": "Wazuh_role",
               "id": "<application_id>",
               "isEnabled": true,
               "lang": null,
               "origin": "Application",
               "value": "Wazuh_role"
            },

   - ``description``: can be any value that you want.
   - ``id`` should be the ID of your application. You can find it in the application's overview menu or at the top of the Manifest in the field ``appId``.
   - ``value`` will define the name of the role. In this case ``Wazuh_role``, which will be the value for the role to be mapped on the ``roles_mapping.yml`` file.
   - ``displayName`` can be the same as ``value``.

   .. thumbnail:: /images/single-sign-on/azure-active-directory/04-add-a-new-role.png
      :title: Add a new role to your application's Manifest
      :align: center
      :width: 80%

   Save the changes and proceed to the next step.

#. Assign a user to the app.

   In **Azure Active Directory**, go to **Enterprise applications** → **<YOUR APPLICATION>** → **Assign users and groups** (or **Users and Groups** in the panel to the left):

   .. thumbnail:: /images/single-sign-on/azure-active-directory/05-assign-a-user-to-the-app.png
      :title: Assign a user to the app
      :align: center
      :width: 80%

   Click on **Add user/group**, assign a **user** and select the role we created in **Manifest**.

   .. thumbnail:: /images/single-sign-on/azure-active-directory/06-click-on-add-user-group.png
      :title: Click on Add user/group
      :align: center
      :width: 80%

#. Configure Single sign-on.

   Go to **Enterprise applications** → **<YOUR APPLICATION>** → **Set up single sign on -> SAML**.

   .. thumbnail:: /images/single-sign-on/azure-active-directory/07-configure-single-sign-on.png
      :title: Configure Single sign-on
      :align: center
      :width: 80%

   .. thumbnail:: /images/single-sign-on/azure-active-directory/08-set-up-single-sign-on-SAML.png
      :title: Set up single sign on -> SAML
      :align: center
      :width: 80%

   .. thumbnail:: /images/single-sign-on/azure-active-directory/09-set-up-single-sign-on-SAML.png
      :title: Set up single sign on -> SAML 
      :align: center
      :width: 80%

   .. thumbnail:: /images/single-sign-on/azure-active-directory/10-set-up-single-sign-on-SAML.png
      :title: Set up single sign on -> SAML
      :align: center
      :width: 80%

   - In option 1, under  **Basic SAML Configuration**, click **edit** and set ``wazuh-saml`` as **Identifier (Entity ID)** and ``https://WAZUH_DASHBOARD_URL/_opendistro/_security/saml/acs`` as **Reply URL (Assertion Consumer Service URL)**. Save and proceed to the next step.
