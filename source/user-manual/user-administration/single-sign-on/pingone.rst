.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: PingOne is a platform that enables enterprises to give their users federated access to applications. Learn more about it and the administrator role in this section of our documentation.

PingOne
=======

`PingOne for Enterprise <https://www.pingidentity.com/>`_ is an identity-as-a-service (IDaaS) and single sign-on (SSO) platform. It allows enterprises to give their users federated access to applications. In this guide, we integrate the PingOne IdP to authenticate users into the Wazuh platform.

Learn how to create administrator and read-only roles on PingOne and map them with Wazuh in the sections below.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Setup PingOne single sign-on with administrator role
----------------------------------------------------

Follow these steps to integrate PingOne IdP with Wazuh for single sign-on and grant administrator role to the authenticated PingOne users on the Wazuh platform:

#. :ref:`configuration_pingone_admin`
#. :ref:`indexer_configuration_pingone_admin`
#. :ref:`dashboard_configuration_pingone_admin`

.. _configuration_pingone_admin:

PingOne Configuration
^^^^^^^^^^^^^^^^^^^^^

#. Create an account in Ping Identity. Request a free trial if you don't have a paid license.
#. Go to `PingOne <https://admin.pingone.com/>`_ and sign in with your Ping Identity account.
#. Create an application.

   #. Navigate to **Applications** > **Applications** > **Add Application** and give it a name. In our case, the name is ``wazuh-sso``.

   #. Proceed to the **Choose Application Type** section, and select  **SAML Application** > **Configure**.

      .. thumbnail:: /images/single-sign-on/pingone/01-proceed-to-the-choose-application-type-section.png
          :title: Proceed to the Choose Application Type section
          :align: center
          :width: 80%

   #. Select **Manually Enter** on the **SAML Configuration** section and add the following configuration, replacing ``<WAZUH_DASHBOARD_URL>`` with the corresponding value:

      - ACS URLs: ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs``
      - Entity ID: ``wazuh-saml``

      .. thumbnail:: /images/single-sign-on/pingone/02-select-manually-enter-on-the-provide-app-metadata.png
          :title: Select Manually Enter on the Provide App Metadata
          :align: center
          :width: 80%

   #. On the **Configuration** tab, click on the edit icon and add the following information:

      -  SLO ENDPOINT: ``https://<WAZUH_DASHBOARD_URL>/``
      -  SLO BINDING: ``HTTP Redirect``
      -  ASSERTION VALIDITY DURATION: ``3600`` (for 1 hour token validity)
      -  VERIFICATION CERTIFICATE: Upload a certificate containing a public key that is associated with a private key to be used for signing. If you do not have a certificate signed by a trusted Certificate Authority, you may use a self-signed certificate.

         Run the command below on the Wazuh indexer instance to generate a new unencrypted 2048‑bit RSA private key and a self‑signed certificate valid for 365 days.

         .. code-block:: console

            # openssl req -x509 -newkey rsa:2048 -keyout private.key -out certificate.pem -days 365 -nodes

         The private key will be the ``sp.signature_private_key_filepath`` of the ``config.yml`` configuration file on the Wazuh indexer instance. This is necessary as all the logout requests must be signed.

      .. thumbnail:: /images/single-sign-on/pingone/03-on-the-configuration-tab.png
          :title: On the Configuration tab
          :align: center
          :width: 80%

   #. Click on the **Attribute Mappings** tab,  select the edit icon, click on **Add** and insert the following configuration:

      ``Roles`` = ``Group Names``

      .. thumbnail:: /images/single-sign-on/pingone/04-click-on-the-attribute-mappings-tab.png
          :title: Click on the Attribute Mappings tab
          :align: center
          :width: 80%

      The ``Roles`` attribute will be used later as the ``sp.entity_id`` in the Wazuh indexer configuration file.

   #. Click on the **Required** checkbox, and click on **Save**.

#. Create a group and assign users.

   #. Navigate to **Directory** > **Groups**, and click on the **+** sign. Select the name of the **Group**, in this case, ``wazuh-admins``.

      .. thumbnail:: /images/single-sign-on/pingone/05-navigate-to-identities-groups.png
          :title: Navigate to Identities > Groups
          :align: center
          :width: 80%

   #. To assign users, open the created **Group**, go to the **Users** tab and select **Add Individually**. Add all the members that must log in to the Wazuh dashboard, and click on **Save** when done.

      .. thumbnail:: /images/single-sign-on/pingone/06-assign-users.png
          :title: Assign users
          :align: center
          :width: 80%

      .. thumbnail:: /images/single-sign-on/pingone/07-assign-users.png
          :title: Assign users
          :align: center
          :width: 80%


.. _indexer_configuration_pingone_admin:

Wazuh indexer configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^


.. _dashboard_configuration_pingone_admin:

Wazuh dashboard configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Setup PingOne single sign-on with read-only role
------------------------------------------------