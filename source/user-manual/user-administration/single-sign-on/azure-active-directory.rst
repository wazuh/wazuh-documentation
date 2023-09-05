.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Azure Active Directory is a cloud-based identity and access management service by Microsoft. Learn more about it in this section of the Wazuh documentation.

.. _azure-active-directory:

Azure Active Directory
======================

`Azure Active Directory <https://portal.azure.com/>`_ (Azure AD) is a cloud-based identity and access management service by Microsoft. It provides single sign-on, multifactor authentication, and access to internal and cloud developed applications. In this guide, we integrate the Azure Active Directory IdP to authenticate users into the Wazuh platform.

There are three stages in the single sign-on integration.

#. Azure Active Directory Configuration
#. Wazuh indexer configuration
#. Wazuh dashboard configuration
   
 .. note::
    You may have to request a free trial at least to complete the configuration. 

Azure Active Directory Configuration
------------------------------------

#. Create a Microsoft account or use your own if you already have one.
#. Go to `Azure Active Directory <https://portal.azure.com/>`_ and sign in with your Microsoft account.
#. Create an app in **Azure Active Directory**.

   #. Go to **Azure Active Directory** > **Enterprise applications** > **New application** and **Create your own application**. 

   #. Select **Integrate any other application you don't find in the gallery**. Give a name to your application and click **Add**. In our case, we name this application ``wazuh-sso``.

   .. thumbnail:: /images/single-sign-on/azure-active-directory/01-go-to-azure-active-directory.png
      :title: Create an app in Azure Active Directory
      :align: center
      :width: 80%

#. Create a role for your application.

   #. Go back to **Azure Active Directory** and click on **App registrations**.

      .. thumbnail:: /images/single-sign-on/azure-active-directory/02-click-on-app-registrations.png
         :title: Click on App registrations
         :align: center
         :width: 80%

   #. Select your new app under **All applications** and **click Manifest**.

      .. thumbnail:: /images/single-sign-on/azure-active-directory/03-select-your-new-apps.png
         :title: Select your new app
         :align: center
         :width: 80%

   #. Add a new role to your application's **Manifest**:

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
      - ``id``: should be the ID of your application. You can find it in the application's overview menu or at the top of the Manifest in the field ``appId``.
      - ``value``: defines the name of the role. In this case, ``Wazuh_role``, which will be the value for the role to be mapped on the ``roles_mapping.yml`` file.
      - ``displayName``: can be the same as ``value``.

      .. thumbnail:: /images/single-sign-on/azure-active-directory/04-add-a-new-role.png
         :title: Add a new role to your application's Manifest
         :align: center
         :width: 80%

   #. Save the changes and proceed to the next step.

#. Assign a user to the app.

   #. In **Azure Active Directory**, go to **Enterprise applications**, select your application and then click on **Assign users and groups** (or **Users and Groups** in the panel to the left).

      .. thumbnail:: /images/single-sign-on/azure-active-directory/05-assign-a-user-to-the-app.png
         :title: Assign a user to the app
         :align: center
         :width: 80%

   #. Click on **Add user/group**, assign a **user** and select the role we created in **Manifest**.

      .. thumbnail:: /images/single-sign-on/azure-active-directory/06-click-on-add-user-group.png
         :title: Click on Add user/group
         :align: center
         :width: 80%

#. Configure Single sign-on.

   #. Go to **Enterprise applications**, select your application and then click on **Set up single sign-on > SAML**.

      .. thumbnail:: /images/single-sign-on/azure-active-directory/07-configure-single-sign-on.png
         :title: Configure Single sign-on
         :align: center
         :width: 80%

      .. thumbnail:: /images/single-sign-on/azure-active-directory/08-set-up-single-sign-on-SAML.png
         :title: Set up single sign-on > SAML
         :align: center
         :width: 80%
    
      .. thumbnail:: /images/single-sign-on/azure-active-directory/09-set-up-single-sign-on-SAML.png
         :title: Set up single sign-on > SAML 
         :align: center
         :width: 80%
    
      .. thumbnail:: /images/single-sign-on/azure-active-directory/10-set-up-single-sign-on-SAML.png
         :title: Set up single sign-on > SAML
         :align: center
         :width: 80%

   #. In option 1, under  **Basic SAML Configuration**, click **edit** and set ``wazuh-saml`` as **Identifier (Entity ID)** and ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs`` as **Reply URL (Assertion Consumer Service URL)**. Replace ``<WAZUH_DASHBOARD_URL>`` with the corresponding value. Save and proceed to the next step.

      .. thumbnail:: /images/single-sign-on/azure-active-directory/11-click-edit-and-set-wazuh-saml.png
         :title: Click edit and set wazuh-saml
         :align: center
         :width: 80%

   #. In option 2 under **User Attributes & Claims**, click **edit** and select **Add new claim**. Select **Roles** as the name and **user.assignedroles** as **Source attribute**. This claim will be mapped with ``roles_key`` on the Wazuh indexer configuration.

      .. thumbnail:: /images/single-sign-on/azure-active-directory/12-click-edit-and-select-add-new-claim.png
         :title: Click edit and select Add new claim
         :align: center
         :width: 80%

#. Note the necessary parameters. In the **Enterprise applications** menu, select your application and then click on **Single sign-on**. Note some parameters that will be used in the Wazuh indexer configuration.

   - In option 3 **SAML Certificate**, the **App Federation Metadata Url** will be the ``idp.metadata_url`` in the Wazuh indexer configuration file.

   - Go to the metadata URL using your web browser. Copy the value of the ``<X509Certificate>`` field. It’s your ``exchange_key`` parameter:

   .. thumbnail:: /images/single-sign-on/azure-active-directory/13-go-to-the-metadata-url.png
      :title: Go to the metadata URL
      :align: center
      :width: 80%

   - In option 4 **Set up <YOUR APPLICATION>**, the **Azure AD Identifier** will be our ``idp.entity_id``.

Wazuh indexer configuration
---------------------------

Edit the Wazuh indexer security configuration files. We recommend that you back up these files before you carry out the configuration.

#. Edit the ``/etc/wazuh-indexer/opensearch-security/config.yml`` file and change the following values:

   - Set the ``order`` in ``basic_internal_auth_domain`` to ``0`` and the ``challenge`` flag to ``false``. 

   - Include a ``saml_auth_domain`` configuration under the ``authc`` section similar to the following:

   .. code-block:: yaml
      :emphasize-lines: 7,10,22,23,25,26,27,28

          authc:
      ...
            basic_internal_auth_domain:
              description: "Authenticate via HTTP Basic against internal users database"
              http_enabled: true
              transport_enabled: true
              order: 0
              http_authenticator:
                type: "basic"
                challenge: false
              authentication_backend:
                type: "intern"
            saml_auth_domain:
              http_enabled: true
              transport_enabled: false
              order: 1
              http_authenticator:
                type: saml
                challenge: true
                config:
                  idp:
                    metadata_url: https://login.microsoftonline.com/...
                    entity_id: https://sts.windows.net/...
                  sp:
                    entity_id: wazuh-saml
                  kibana_url: https://<WAZUH_DASHBOARD_URL>
                  roles_key: Roles
                  exchange_key: 'MIIC8DCCAdigAwIBAgIQXzg.........'
              authentication_backend:
                type: noop


   Ensure to change the following parameters to their corresponding value: 

   - ``idp.metadata_url`` 
   - ``idp.entity_id``
   - ``sp.entity_id``
   - ``kibana_url``
   - ``roles_key``
   - ``exchange_key``

#. Run the ``securityadmin`` script to load the configuration changes made in the ``config.yml`` file.

   .. code-block:: console

      # export JAVA_HOME=/usr/share/wazuh-indexer/jdk/ && bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -f /etc/wazuh-indexer/opensearch-security/config.yml -icl -key /etc/wazuh-indexer/certs/admin-key.pem -cert /etc/wazuh-indexer/certs/admin.pem -cacert /etc/wazuh-indexer/certs/root-ca.pem -h localhost -nhnv

   The ``-h`` flag specifies the hostname or the IP address of the Wazuh indexer node. Note that this command uses localhost, set your Wazuh indexer address if necessary.

   The command output must be similar to the following:

   .. code-block:: console
      :class: output

      Security Admin v7
      Will connect to localhost:9200 ... done
      Connected as "CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US"
      OpenSearch Version: 2.8.0
      Contacting opensearch cluster 'opensearch' and wait for YELLOW clusterstate ...
      Clustername: wazuh-cluster
      Clusterstate: GREEN
      Number of nodes: 1
      Number of data nodes: 1
      .opendistro_security index already exists, so we do not need to create one.
      Populate config from /etc/wazuh-indexer/opensearch-security
      Will update '/config' with /etc/wazuh-indexer/opensearch-security/config.yml 
         SUCC: Configuration for 'config' created or updated
      SUCC: Expected 1 config types for node {"updated_config_types":["config"],"updated_config_size":1,"message":null} is 1 (["config"]) due to: null
      Done with success

#. Edit the ``/etc/wazuh-indexer/opensearch-security/roles_mapping.yml`` file and change the following values:

   Configure the ``roles_mapping.yml`` file to map the role we have in Azure AD to the appropriate Wazuh indexer role. In this case, we map the ``Wazuh_role`` in Azure AD to the ``all_access`` role in Wazuh indexer:

   .. code-block:: console
      :emphasize-lines: 6

      all_access:
        reserved: false
        hidden: false
        backend_roles:
        - "admin"
        - "Wazuh_role"
        description: "Maps admin to all_access"

#. Run the ``securityadmin`` script to load the configuration changes made in the ``roles_mapping.yml`` file.       

   .. code-block:: console

      # export JAVA_HOME=/usr/share/wazuh-indexer/jdk/ && bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -f /etc/wazuh-indexer/opensearch-security/roles_mapping.yml -icl -key /etc/wazuh-indexer/certs/admin-key.pem -cert /etc/wazuh-indexer/certs/admin.pem -cacert /etc/wazuh-indexer/certs/root-ca.pem -h localhost -nhnv

   The ``-h`` flag specifies the hostname or the IP address of the Wazuh indexer node. Note that this command uses localhost, set your Wazuh indexer address if necessary.

   The command output must be similar to the following:

   .. code-block:: console
      :class: output        

      Security Admin v7
      Will connect to localhost:9200 ... done
      Connected as "CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US"
      OpenSearch Version: 2.8.0
      Contacting opensearch cluster 'opensearch' and wait for YELLOW clusterstate ...
      Clustername: wazuh-cluster
      Clusterstate: GREEN
      Number of nodes: 1
      Number of data nodes: 1
      .opendistro_security index already exists, so we do not need to create one.
      Populate config from /etc/wazuh-indexer/opensearch-security
      Will update '/rolesmapping' with /etc/wazuh-indexer/opensearch-security/roles_mapping.yml 
         SUCC: Configuration for 'rolesmapping' created or updated
      SUCC: Expected 1 config types for node {"updated_config_types":["rolesmapping"],"updated_config_size":1,"message":null} is 1 (["rolesmapping"]) due to: null
      Done with success

Wazuh dashboard configuration
-----------------------------

#. Edit the Wazuh dashboard configuration file. Add these configurations to ``/etc/wazuh-dashboard/opensearch_dashboards.yml``. We recommend that you back up these files before you carry out the configuration.

   .. code-block:: console  

      opensearch_security.auth.type: "saml"
      server.xsrf.allowlist: ["/_opendistro/_security/saml/acs", "/_opendistro/_security/saml/logout", "/_opendistro/_security/saml/acs/idpinitiated"]

   .. note::
      :class: not-long

      *For versions 4.3.9 and earlier*, also replace ``path: `/auth/logout``` with ``path: `/logout``` in ``/usr/share/wazuh-dashboard/plugins/securityDashboards/server/auth/types/saml/routes.js``. We recommend that you back up these files before you carry out the configuration.

      .. code-block:: console
         :emphasize-lines: 3

         ...
            this.router.get({
               path: `/logout`,
               validate: false
         ...

#. Restart the Wazuh dashboard service.

   .. include:: /_templates/common/restart_dashboard.rst

#. Test the configuration. Go to your Wazuh dashboard URL and log in with your Microsoft account. 
