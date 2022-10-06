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

      .. thumbnail:: /images/single-sign-on/onelogin/06-search-for-saml-custom-connector.png
         :title: Search for SAML Custom Connector (Advanced) application
         :align: center
         :width: 80%   

   Go to the **Parameters** tab and click on **+** to add a new parameter to the app:

      .. thumbnail:: /images/single-sign-on/onelogin/07-go-to-the-parameters-tab.png
         :title: Go to the Parameters tab and click on +
         :align: center
         :width: 80%   

   In our own case, we named the new parameter as **Roles**, then we select the value **Department** and **Include in SAML assertion**.

      .. thumbnail:: /images/single-sign-on/onelogin/08-we-named-the-new-parameter-as-roles.png
         :title: We named the new parameter as Roles
         :align: center
         :width: 80%   

   The rest of the app configuration is left as default. Click on **Save** to apply the configuration.

#. Add the created user to the new app.

   Go to **Users** and select the created user. Go to **Applications** and click on **+**, select the **Allow the user to sign in** checkbox, and click on **Save**:

      .. thumbnail:: /images/single-sign-on/onelogin/09-add-the-created-user-to-the-new-app.png
         :title: Add the created user to the new app
         :align: center
         :width: 80%    

#. Get the ``metada_onelogin.xml`` file and ``X.509 certificate`` from the application.

   Go to **Applications**, →  **Applications** then select the **Wazuh** app. Click on **More Actions** and then select **SAML Metadata**.

      .. thumbnail:: /images/single-sign-on/onelogin/10-click-on-more-actions.png
         :title: Click on More Actions and then select SAML Metadata
         :align: center
         :width: 80%
   
   Save the file as ``XML``. This will be the ``idp.metadata_file`` in the Wazuh indexer security configuration.

   The **Issuer URL** will be the ``idp.entity_id`` in the Wazuh indexer security configuration.

      .. thumbnail:: /images/single-sign-on/onelogin/11-save-the-file-as-xml.png
         :title: Save the file as XML
         :align: center
         :width: 80%
   
   The **Audience (EntityID)** will be the ``sp.entity_id`` in  the Wazuh indexer security configuration.

      .. thumbnail:: /images/single-sign-on/onelogin/12-the-Audience-entityid.png
         :title: The Audience (EntityID) will be the sp.entity_id in  the Wazuh indexer security configuration
         :align: center
         :width: 80%


   The ``roles_key`` is the name of the parameter added in the **Wazuh** app. In our example, this is ``Roles``. 

   Finally, to obtain the ``exchange_key``, go to the **SSO** tab of the **Wazuh** app and select **View Details** in ``X.509 Certificate``. Copy the blob of the certificate excluding the ``-----BEGIN CERTIFICATE-----`` and ``-----END CERTIFICATE-----`` lines:

      .. thumbnail:: /images/single-sign-on/onelogin/13-go-to-the-sso-tab.png
         :title: Go to the SSO tab of the Wazuh app and select View Details in X.509 Certificate
         :align: center
         :width: 80%

Wazuh indexer configuration
---------------------------