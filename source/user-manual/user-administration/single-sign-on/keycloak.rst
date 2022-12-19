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

   - **Role name**: Input ``admin``. This will be our backend role in the Wazuh Indexer configuration.

      .. thumbnail:: /images/single-sign-on/keycloak/09-create-a-new-role.png
         :title: Create a new role
         :align: center
         :width: 80%  

   Click on **Save** to apply the configuration.

#. Create a new user 

   #. Navigate to **Users > Add user** and fill in the required information.

      .. thumbnail:: /images/single-sign-on/keycloak/10-create-a-new-user.png
         :title: Create a new user
         :align: center
         :width: 80% 

      Click on Create to apply the configuration.

   #. Navigate to **Users > Credentials > Set password** and input a password for the newly created user. You will use these credentials to log in to the Wazuh dashboard.

      .. thumbnail:: /images/single-sign-on/keycloak/11-set-password.png
         :title: Set password
         :align: center
         :width: 80% 

      Click on **Save** to apply the configuration.

#. Create a new group and assign the user

   #. Go to **Groups > Create group** and assign a name to the group. In our case, this is ``Wazuh-admins``.
   
      .. thumbnail:: /images/single-sign-on/keycloak/12-create-a-new-group.png
         :title: Create a new group
         :align: center
         :width: 80% 

   #. Click on the newly created group, navigate to **Members > Add member** and select the user created in the previous step. Click on **Add** to add it to the group.
   
      .. thumbnail:: /images/single-sign-on/keycloak/13-add-member.png
         :title: Add member
         :align: center
         :width: 80% 

   #. In the newly created group details, go to **Role Mapping > Assign role** and select the admin role created in step 3. Click on **Assign** to apply the configuration. 

      .. thumbnail:: /images/single-sign-on/keycloak/14-assign-role.png
         :title: Assign role
         :align: center
         :width: 80% 

#. Configure protocol mapper

   #. Navigate to **Client scopes > role_list > Mappers > Configure a new mapper**. 

      .. thumbnail:: /images/single-sign-on/keycloak/15-configure-a-new-mapper.png
         :title: Configure a new mapper
         :align: center
         :width: 80% 

   #. Select **Role list** from the list as seen below:

      .. thumbnail:: /images/single-sign-on/keycloak/16-select-role-list.png
         :title: Select Role list
         :align: center
         :width: 80% 

   #. Complete the **Add mapper** section with these parameters:

      - **Mapper type**: ``Role list``
      - **Name**: ``wazuhRoleKey``. You can use any name here.
      - **Role attribute name**: ``Roles``. This will be the ``roles_key`` on the Wazuh Indexer configuration.
      - **SAML Attribute NameFormat**: ``Basic``  
      - **Single Role Attribute**: ``On``

      .. thumbnail:: /images/single-sign-on/keycloak/17-complete-the-add-mapper-section.png
         :title: Complete the Add mapper section
         :align: center
         :width: 80% 

   Click on **Save** to apply the configuration.

#. Note the necessary parameters from the SAML settings of Keycloak.

   #. The parameters already obtained during the integration are:

      - ``sp.entity_id``: ``wazuh-saml``
      - ``roles_key``: ``Roles``
      - ``kibana_url``: ``https://<WAZUH_DASHBOARD_URL>``

   #. To obtain the remaining parameters
   
      #. Navigate to **Clients** and select the name of your client. In our case, this is **wazuh-saml**. 
      #. Navigate to **Action > Download adapter config**, and ensure the Format option is Mod Auth Mellon files. 
      #. Click on **Download** to download the remaining files.

      .. thumbnail:: /images/single-sign-on/keycloak/18-download-adapter-config.png
         :title: Download adapter config
         :align: center
         :width: 80% 

   #. The downloaded files contain the ``idp.metadata.xml`` file and the ``sp.metadata.xml`` file.
   
      - The ``idp.entityID`` parameter is in the ``idp.metadata.xml`` file.
      - The ``exchange_key`` parameter is found in the ``ds:X509Certificate`` field in the ``idp.metadata.xml`` file.

      .. thumbnail:: /images/single-sign-on/keycloak/19-the-exchange_key-parameter.png
         :title: The exchange_key parameter
         :align: center
         :width: 80% 
