.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Keycloak is an open source identity and access management tool. Learn more about it in this section of the Wazuh documentation.

.. _keycloak:

Keycloak
========

`Keycloak <https://www.keycloak.org/>`_ is an open source identity and access management tool. It provides user federation, strong authentication, user management, and fine-grained authorization for modern applications and services. In this guide, we integrate the KeyCloak IdP to authenticate users into the Wazuh platform.
There are three stages in the single sign-on integration:

#. KeyCloak configuration
#. Wazuh indexer configuration
#. Wazuh dashboard configuration

KeyCloak configuration
----------------------

#. Create a new realm.

   Log in to the Keycloak admin console, expand the **master** drop-down menu and click **Add Realm**. Input a name in the **Realm name** field; in our case, this is named ``Wazuh``. Click on **Create** to apply this configuration.

   .. thumbnail:: /images/single-sign-on/keycloak/01-create-a-new-realm.png
      :title: Create a new realm
      :align: center
      :width: 80%    
 
#. Create a new client. 

   In the newly created realm, navigate to **Clients > Create Client** and  modify the following parameters:

      - **Client type**: select ``SAML`` from the drop-down menu. 
      - **Client ID**: input ``wazuh-saml``. This is the ``SP Entity ID`` value which will be used later in the ``config.yml`` on the Wazuh indexer instance.
     
   You can leave the rest of the values as default. Click **Save** to apply the configuration.

   .. thumbnail:: /images/single-sign-on/keycloak/02-create-a-new-client.png
      :title: Create a new client
      :align: center
      :width: 80%    

#. Configure client settings.

   #. Navigate to **Clients > Settings** and ensure the **Enabled** button is turned on. Complete the section with these parameters:

      - **Client ID**: ``wazuh-saml``
      - **Name**: ``Wazuh SSO``
      - **Valid redirect URIs**: ``https://<WAZUH_DASHBOARD_URL>/*``
      - **IDP-Initiated SSO URL name**: ``wazuh-dashboard``
      - **Name ID format**: ``username``
      - **Force POST binding**: ``ON``
      - **Include AuthnStatement**: ``ON``
      - **Sign documents**: ``ON``
      - **Sign assertions**: ``ON``
      - **Signature algorithm**: ``RSA_SHA256``
      - **SAML signature key name**: ``KEY_ID``
      - **Canonicalization method**: ``EXCLUSIVE``
      - **Front channel logout**: ``ON``

      Replace the ``WAZUH_DASHBOARD_URL`` field with the corresponding URL of your Wazuh dashboard instance.

      The configuration must be similar to the highlighted blue rectangles:   

      .. thumbnail:: /images/single-sign-on/keycloak/03-configure-client-settings.png
         :title: Configure client settings
         :align: center
         :width: 80%    
      
      .. thumbnail:: /images/single-sign-on/keycloak/04-configure-client-settings.png
         :title: Configure client settings
         :align: center
         :width: 80%    

      .. thumbnail:: /images/single-sign-on/keycloak/05-configure-client-settings.png
         :title: Configure client settings
         :align: center
         :width: 80%    

      .. thumbnail:: /images/single-sign-on/keycloak/06-configure-client-settings.png
         :title: Configure client settings
         :align: center
         :width: 80%    
            
      You can leave the rest of the values as default. Click **Save** to apply the configuration.

   #. Navigate to **Clients > Keys** and complete the section with these parameters:
   
      - **Client signature required**: Off

      .. thumbnail:: /images/single-sign-on/keycloak/07-client-signature-required.png
         :title: Client signature required
         :align: center
         :width: 80%  

   #. Navigate to **Clients > Advanced > Fine Grain SAML Endpoint Configuration** and complete the section with these parameters:

      - **Assertion Consumer Service POST Binding URL**: ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs/idpinitiated``
      - **Logout Service Redirect Binding URL**: ``https://<WAZUH_DASHBOARD_URL>/app/wazuh``

   You can leave the rest of the values as default. Click Save to apply the configuration.

      .. thumbnail:: /images/single-sign-on/keycloak/08-fine-grain-saml-endpoint-configuration.png
         :title: Fine Grain SAML Endpoint Configuration
         :align: center
         :width: 80%  

#. Create a new role
   
   Navigate to **Realm roles > Create role** and complete the section with these parameters:

   - **Role name**: Input  ``admin``. This will be our backend role in the Wazuh Indexer configuration.

      .. thumbnail:: /images/single-sign-on/keycloak/09-create-a-new-role.png
         :title: Create a new role
         :align: center
         :width: 80%  

   Click on Save to apply the configuration.

#. Create a new user 
