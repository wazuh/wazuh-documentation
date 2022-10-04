.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Google Workspace is a collection of cloud computing, productivity and collaboration tools..

.. _google:

Google
======

`Google Workspace <https://workspace.google.com/>`_, developed and marketed by Google, is a collection of cloud computing, productivity, and collaboration tools.  In this guide, we integrate the Google IdP to authenticate users into the Wazuh platform. 

The single sign-on integration process is divided into three stages.

#. Google Configuration
#. Wazuh indexer configuration
#. Wazuh dashboard configuration

Google Configuration
--------------------

#. Create an account in Google Workspace.

   A Google Workspace account is required for this configuration. Request a free trial if you don't have a paid license.

#. Go to https://admin.google.com/ac/apps/unified and sign in with your Google Admin account.
#. Create an app with **Add custom SAML app**.

   Go to **Apps** → **Website and mobile apps** →  **Add App**, then **Add custom SAML app**. Enter an **App name** and click **CONTINUE**.

   .. thumbnail:: /images/single-sign-on/google/01-go-to-apps.png
      :title: Go to Apps → Website and mobile apps
      :align: center
      :width: 80%

   Take note of the following parameters, as they will be used during the Wazuh indexer configuration:

   - **Entity ID**: This will be used later as the ``idp.entity_id``
   - Select **DOWNLOAD METADATA** and place the metadata file in the ``configuration`` directory of Wazuh indexer. The path to the directory is ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/``.

   .. thumbnail:: /images/single-sign-on/google/02-take-note-of-the-parameters.png
      :title: Take note of the parameters
      :align: center
      :width: 80%
   
   After this, select CONTINUE and configure the following:

   - **ACS URL**: ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs``. Replace the Wazuh dashboard URL field with the appropriate URL or IP address.
   - **Entity ID**: Use any name here. This will be the ``sp.entity_id`` in the Wazuh indexer configuration file. In our case, the value is ``wazuh-saml``.
   - **Certificate**: Copy the blob of the certificate excluding the ``-----BEGIN CERTIFICATE-----`` and ``-----END CERTIFICATE-----`` lines. This will be our ``exchange_key`` in the Wazuh indexer configuration file.

   .. thumbnail:: /images/single-sign-on/google/03-select-continue-and-configure.png
      :title: Select CONTINUE and configure
      :align: center
      :width: 80%
   