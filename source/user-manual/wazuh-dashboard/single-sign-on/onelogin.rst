.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: OneLogin is a cloud-based identity and access management provider that provides a unified access management platform to enterprise-level businesses and organizations.

.. _onelogin:

OneLogin
========

Website: https://www.onelogin.com
OneLogin is a cloud-based identity and access management provider that provides a unified access management platform to enterprise-level businesses and organizations. In this guide, we integrate the OneLogin SSO to authenticate users into the Wazuh platform. 
The single sign-on integration process is divided into three stages.

#. OneLogin Configuration
#. Wazuh indexer configuration
#. Wazuh dashboard configuration
   
OneLogin Configuration
----------------------

#. Create an account in OneLogin. Request a free trial if you don't have a paid license.
#. Add the OneLogin extension in your browser.
#. Create a new user. 

   Log in to **OneLogin** web console, select **Administration** → **Users** → **New User**

      .. thumbnail:: /images/single-sign-on/onelogin/01-log-in-to-onelogin-web-console.png
         :title: Log in to OneLogin web console
         :align: center
         :width: 80%

   On the created user complete the mandatory fields, and assign a value in the **Department** field. In our case, this is ``wazuh-admin``. This field will be used later in the Wazuh indexer configuration as the backend role.

      .. thumbnail:: /images/single-sign-on/onelogin/02-complete-the-mandatory-fields.png
         :title: Complete the mandatory fields
         :align: center
         :width: 80%

   Click on **Save User**, select the user, navigate to **More Actions** and click on **Change Password** to assign a password to the user.

      .. thumbnail:: /images/single-sign-on/onelogin/03-click-on-save-user.png
         :title: Click on Save User
         :align: center
         :width: 80%

#. Create a new app using the **SAML Custom Connector (Advanced)** template and configure the SAML settings.

   Go to **Applications** tab → **Applications** and then click on **Add app**.

      .. thumbnail:: /images/single-sign-on/onelogin/04-create-a-new-app.png
         :title: Create a new app using the SAML Custom Connector (Advanced)
         :align: center
         :width: 80%

   Search for **SAML Custom Connector (Advanced)** application. In **Display Name**,  assign a name, in our case, we assigned the name ``Wazuh``. Navigate to the Configuration tab and fill in the information:

   - **Audience (EntityID)**: ``wazuh-saml``
   - **Recipient**: ``https://WAZUH_DASHBOARD_URL/_opendistro/_security/saml/acs``
   - **ACS (Consumer) URL Validator**: ``https://WAZUH_DASHBOARD_URL/_opendistro/_security/saml/acs``
   - **ACS (Consumer) URL**: ``https://WAZUH_DASHBOARD_URL/_opendistro/_security/saml/acs``
   - **Login URL**: ``https://WAZUH_DASHBOARD_URL/app/wazuh``
   - **SAML initiator**: ``Service Provider``
   - **SAML nameID format**: ``Unspecified``
   - **SAML issuer type**: ``Specific``
   - **SAML signature element**: ``Response``
   
   Replace the ``WAZUH_DASHBOARD_URL`` field with the corresponding URL of your Wazuh dashboard instance.

   The configuration must be similar to the highlighted blue rectangles:

      .. thumbnail:: /images/single-sign-on/onelogin/05-search-for-saml-custom-connector.png
         :title: Search for SAML Custom Connector (Advanced) application
         :align: center
         :width: 80%   
      