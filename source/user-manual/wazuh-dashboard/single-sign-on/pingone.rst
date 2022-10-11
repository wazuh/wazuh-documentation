.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: PingOne is a platform that enables enterprises to give their users federated access to applications. Learn more about it in this section of our documentation.

PingOne
=======

`PingOne for Enterprise <https://www.pingidentity.com/>`_ is an identity-as-a-service (IDaaS) and single sign-on (SSO) platform. It allows enterprises to give their users federated access to applications. In this guide, we integrate the PingOne IdP to authenticate users into the Wazuh platform.

The single sign-on integration process is divided into three stages.

#. PingOne Configuration
#. Wazuh indexer configuration
#. Wazuh dashboard configuration

PingOne Configuration
---------------------

PingOne Configuration

#. Create an account in Ping Identity. Request a free trial if you don't have a paid license.
#. Go to `PingOne <https://admin.pingone.com/>`_ and sign in with your Ping Identity account.
#. Create an application in Connections

    Navigate to **Connections** > **Applications** > **Add Application** and give it a name. In our case, the name is ``wazuh-sso``.

    Proceed to the **Choose Application Type** section, select  **SAML Application** > **Configure**.

        .. thumbnail:: /images/single-sign-on/pingone/01-proceed-to-the-choose-application-type-section.png
            :title: Proceed to the Choose Application Type section
            :align: center
            :width: 80%

    Select **Manually Enter** on the **Provide App Metadata** page and add the following configuration, replacing ``WAZUH_DASHBOARD_URL`` with the corresponding value:

    - ACS URLs: ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs``
    - ENTITY ID: ``wazuh-saml``

        .. thumbnail:: /images/single-sign-on/pingone/02-select-manually-enter-on-the-provide-app-metadata.png
            :title: Select Manually Enter on the Provide App Metadata
            :align: center
            :width: 80%

    On the **Configuration** tab, click on the edit icon and add the following information:

    - SLO ENDPOINT: ``https://<WAZUH_DASHBOARD_URL>/``
    - SLO BINDING: ``HTTP Redirect``
    - ASSERTION VALIDITY DURATION: ``3600`` (for 1 hour token validity)
    - VERIFICATION CERTIFICATE (OPTIONAL): Load a PUBLIC CERTIFICATE that corresponds to the PRIVATE KEY that is going to be used on the ``sp.signature_private_key_filepath`` of the ``config.yml`` configuration file on the Wazuh indexer instance. This is necessary as all the logout requests must be signed.

        .. thumbnail:: /images/single-sign-on/pingone/03-on-the-configuration-tab.png
            :title: On the Configuration tab
            :align: center
            :width: 80%

    Click on the **Attribute Mappings** tab,  select the edit icon, click on **Add** and insert the following configuration:

    ``Roles`` = ``Group Names`` 

        .. thumbnail:: /images/single-sign-on/pingone/04-click-on-the-attribute-mappings-tab.png
            :title: Click on the Attribute Mappings tab
            :align: center
            :width: 80%

    The ``Roles`` attribute will be used later as the ``sp.entity_id`` in the Wazuh indexer configuration file.

    Click on **Required** checkbox, and click on **save**.

#. Create a group and assign users
 
    Navigate to **Identities** > **Groups**, and click on the **+** sign. Select the name of the **Group**, in this case, ``Role``.

        .. thumbnail:: /images/single-sign-on/pingone/05-navigate-to-identities-groups.png
            :title: Navigate to Identities > Groups
            :align: center
            :width: 80%

    To assign users, open the created **Group** and go to the **Users** tab and select **Add Users Individually**. Add all the members that must log in to the Wazuh dashboard, and click on save when done.

        .. thumbnail:: /images/single-sign-on/pingone/06-assign-users.png
            :title: Assign users
            :align: center
            :width: 80%

        .. thumbnail:: /images/single-sign-on/pingone/07-assign-users.png
            :title: Assign users
            :align: center
            :width: 80%

#. Activate the application and note the necessary parameters.

    Navigate to **Connections**, select **Applications** and enable the application.

        .. thumbnail:: /images/single-sign-on/pingone/08-navigate-to-connections.png
            :title: Navigate to Connections
            :align: center
            :width: 80%
    
    Now we must take note of the following parameters from the configuration page of the application, this will be used in the next step:

    - **ISSUER ID**: It'll be in the form “https://auth.pingone.com/....”
    - **IDP METADATA URL**: It’ll be in the form “https://auth.pingone.com/....”
    - ``exchange_key``: If you open IDP **IDP METADATA URL** you'll find the X509 Certificate  section, this will be used as the ``exchange_key``.

        .. thumbnail:: /images/single-sign-on/pingone/09-take-note-of-parameters.png
            :title: Take note of parameters from the configuration page
            :align: center
            :width: 80%
