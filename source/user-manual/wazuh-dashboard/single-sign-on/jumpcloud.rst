.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Jumpcloud is a Unified Device and Identity Access Management platform that provides services such as Multi-Factor Authentication (MFA).

.. _jumpcloud:

Jumpcloud
=========

`Jumpcloud <https://jumpcloud.com/>`_, is a Unified Device and Identity Access Management platform that provides services such as Multi-Factor Authentication (MFA), Single Sign-On, password management and cloud directory. In this guide, we integrate the Jumpcloud SSO to authenticate users into the Wazuh platform.

The single sign-on integration process is divided into three stages.

#. Jumpcloud Configuration
#. Wazuh indexer configuration
#. Wazuh dashboard configuration

Jumpcloud Configuration
-----------------------

#. Create an account in Jumpcloud. Request a free trial if you don't have a paid license.
#. Create a new user. This step can be skipped if you are just testing, you can use your Jumpcloud ``admin`` user for example.

    Go to **User Management**, click on **Users**, **(+)**,  **Manual user entry**,  fill in the user information, activate the user and click on **save user**. 

    .. thumbnail:: /images/single-sign-on/jumpcloud/01-go-to-user-management-and-click-on-users.png
        :title: Go to User Management and click on Users
        :align: center
        :width: 80%

#. Create a new group and assign the user.

   Go to **User Management** -> **User Groups** -> **(+)** and give a name to the group. In our case, this is ``Wazuh admins``.

    .. thumbnail:: /images/single-sign-on/jumpcloud/02-go-to-user-management-user-groups.png
        :title: Go to User Management - User Groups
        :align: center
        :width: 80%

   The name you give to your group will be used in the configuration. It will be our ``backend_roles`` in ``roles_mapping.yml``.

   In the selected **User Groups**,  go to the **Users** tab and select the newly created user and Save the changes.

    .. thumbnail:: /images/single-sign-on/jumpcloud/03-go-to-users-tab.png
        :title: Go to the Users tab and select the newly created user 
        :align: center
        :width: 80%

#. Create a new app. Configure the SAML settings while you create the app.

   Under the User Authentication section, go to **SSO**, select **(+)**  and click on **Custom SAML App** and add a **Display Label**.

    .. thumbnail:: /images/single-sign-on/jumpcloud/04-go-to-SSO.png
        :title: Under the User Authentication section, go to SSO 
        :align: center
        :width: 80%

    .. thumbnail:: /images/single-sign-on/jumpcloud/05-click-on-custom-saml.png
        :title: Click on Custom SAML App and add a Display Label
        :align: center
        :width: 80%        

   Complete the SSO tab with the appropriate information.

   - **IdP Entity ID**: ``wazuh`` (this will be the ``idp.entity_id`` in our Wazuh indexer configuration).
   - **SP Entity ID**: ``wazuh-saml`` (this will be the ``sp.entity_id`` in our Wazuh indexer configuration).
   - **ACS URL**: ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs``
   - Check **Sign Assertion**.
   - Check **Declare Redirect Endpoint**.
   - Check **include group attribute** and add **Roles** as the attribute. This will be used later in the ``config.yml`` configuration file.

   The rest of the options can be left as their default values.

    .. thumbnail:: /images/single-sign-on/jumpcloud/06-complete-the-sso-tab.png
        :title: Complete the SSO tab
        :align: center
        :width: 80%        
