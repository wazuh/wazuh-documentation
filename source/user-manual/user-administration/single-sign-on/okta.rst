.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Okta Inc. provides technologies that enable secure user authentication into applications. Learn more about it and the administrator role in this section of the Wazuh documentation.

Okta
====

`Okta Inc. <https://www.okta.com/>`_ is an identity and access management company that provides technologies that enable secure user authentication into applications. In this guide, we integrate the Okta IdP to authenticate users into the Wazuh platform.

Learn how to create administrator and read-only roles on Okta and map them with Wazuh in the sections below.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Setup Okta single sign-on with administrator role
-------------------------------------------------

Follow these steps to integrate Okta IdP with Wazuh for single sign-on and grant administrator role to the authenticated Okta users on the Wazuh platform:

#. `Okta Configuration`_
#. `Wazuh indexer configuration`_
#. `Wazuh dashboard configuration`_

Okta Configuration
^^^^^^^^^^^^^^^^^^

#. Create an account on Okta. Request a free trial if you don't have a paid license.

#. Create a new user.

   #. From your okta admin console page, navigate to **Directory** > **People**.

      .. thumbnail:: /images/single-sign-on/okta/01-navigate-to-directory-people.png
          :title: Navigate to Directory - People
          :align: center
          :width: 80%

   #. From the **People** section, select **Add Person**, fill in the details of the new user, and click **Save** as seen in the following screenshots.

      .. thumbnail:: /images/single-sign-on/okta/02-select-add-person.png
          :title: Select add person
          :align: center
          :width: 80%

      .. thumbnail:: /images/single-sign-on/okta/03-click-save.png
          :title: Click save
          :align: center
          :width: 80%

#. Create a new group. Navigate to **Directory** > **Groups** and add a group.

     .. thumbnail:: /images/single-sign-on/okta/04-navigate-to-directory-groups.png
        :title: Navigate to directory groups
        :align: center
        :width: 80%

    Create a new group using any name. In our case, we name it ``wazuh-admins``. This name will be used as our ``backend_roles`` for Wazuh role mapping.

#. Add the new user to the new group. Navigate to **Directory** > **Groups**  and select your group. Click on **Assign People** and add the user to the group created.


     .. thumbnail:: /images/single-sign-on/okta/05-navigate-to-directory-groups.png
        :title: Navigate to Directory - Groups - <YOUR_GROUP>
        :align: center
        :width: 80%

#. Create a new app. Configure the SAML settings while you create the app.

   #. Navigate to the **Applications** section in Okta. Select **Create App Integration**.

      .. thumbnail:: /images/single-sign-on/okta/06-navigate-to-applications-section.png
         :title: Navigate to the Applications section in Okta
         :align: center
         :width: 80%

   #. In the **Create a new application integration** window, select **SAML 2.0** and click **Next**.

      .. thumbnail:: /images/single-sign-on/okta/07-create-new-application.png
         :title: Create a new application integration
         :align: center
         :width: 80%

   #. Assign a name to the application and click on **Next**. In our case, we assign the name ``wazuh-sso-app``.

      .. thumbnail:: /images/single-sign-on/okta/08-assign-name.png
         :title: Assign a name to the application
         :align: center
         :width: 80%

   #. In the **Configure SAML** menu, you’ll find the **SAML Settings** section, modify the following parameters:

      - **Single sign on URL**: input ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs`` and replace the ``<WAZUH_DASHBOARD_URL>`` field with the corresponding URL.
      - **Audience URI (SP Entity ID)**: input ``wazuh-saml``. This is the ``SP Entity ID`` value which will be used later in the ``config.yml`` on the Wazuh indexer instance.
      - **Other Requestable SSO URLs**: click on **Show Advanced Settings** to access this option. Input ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs/idpinitiated`` and replace the ``<WAZUH_DASHBOARD_URL>`` field with the corresponding URL.

      You can leave the rest of the values as default.

      .. thumbnail:: /images/single-sign-on/okta/09-saml-settings-section.png
         :title: SAML settings section
         :align: center
         :width: 80%

      .. thumbnail:: /images/single-sign-on/okta/09b-other-requestable-sso-urls.png
         :title: Other Requestable SSO URLs
         :align: center
         :width: 80%

   #. In the **Group Attribute Statements** section put ``Roles`` as the name. The value for ``Roles`` will be used as the ``roles_key`` parameter in the Wazuh indexer configuration. For the filter field, select **Matches regex** and type ``.*``.

      .. thumbnail:: /images/single-sign-on/okta/10-group-attribute-statements-section.png
         :title: Group Attribute Statements section
         :align: center
         :width: 80%

   #. Proceed by clicking next and on the feedback page, select the options seen in the screenshot below. Click on **Finish** and proceed to the next step.

      .. thumbnail:: /images/single-sign-on/okta/11-click-on-finish.png
         :title: Click on Finish and proceed to the next step
         :align: center
         :width: 80%

#. Add the new app to the new group. Navigate to **Directory** > **Groups**  and select your group. Click on **Applications** and select **Assign Applications**. From here, assign the app created in step 5 and click on **Done** to save the changes.

   .. thumbnail:: /images/single-sign-on/okta/12-navigate-to-directory-groups.png
      :title: Navigate to Directory - Groups - <YOUR_GROUP>
      :align: center
      :width: 80%

   .. thumbnail:: /images/single-sign-on/okta/13-select-assign-applications.png
      :title: Select Assign Applications
      :align: center
      :width: 80%

#. Note the necessary parameters from the SAML settings of the new app. The parameters already obtained during the integration are:

   -  ``sp.entity_id``: ``wazuh-saml``
   -  ``roles_key``: ``Roles``
   -  ``kibana_url``: ``https://<WAZUH_DASHBOARD_URL>``
   -  ``backend_roles``: ``wazuh-admins``

   To obtain the remaining parameters, navigate to **Applications** > **Applications**, select your app and click **Sign On**.

   Under **SAML Signing Certificates**, select **View IdP metadata** of the active certificate. This will open in a new tab. Copy the URL as this will be the ``idp.metadata_url``.

   Now, on the same page, click on  **View SAML setup instructions**. Copy the **Identity Provider Issuer URL**, it will be the ``idp.entity_id``.

   .. thumbnail:: /images/single-sign-on/okta/14-needed-to-configure-wazuh-sso-app.png
      :title: View SAML setup instructions
      :align: center
      :width: 80%

Wazuh indexer configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^


Setup Okta single sign-on with read-only role
---------------------------------------------
