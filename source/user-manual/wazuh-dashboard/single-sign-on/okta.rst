.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Okta Inc. provides technologies that enable secure user authentication into applications. Learn more about it in this section of the Wazuh documentation.

.. _okta:

Okta
====

`Okta Inc. <https://www.okta.com/>`_ is an identity and access management company that provides technologies which enable secure user authentication into applications. In this guide, we integrate the Okta IdP to authenticate users into the Wazuh platform.

The single sign-on integration process is divided into three stages.

#. Okta Configuration
#. Wazuh indexer configuration
#. Wazuh dashboard configuration

Okta Configuration
------------------

#. Create an account on Okta. Request a free trial if you don't have a paid license.
#. Create a new user: 

    To create a new user, from your okta admin console page, navigate to **Directory** → **People**   

    .. thumbnail:: /images/single-sign-on/okta/01-navigate-to-directory-people.png
        :title: Navigate to Directory - People
        :align: center
        :width: 80%
     
    From the **People** section, select **Add Person**, fill in the details of the new user and click **Save** as seen in the following screenshots.

    .. thumbnail:: /images/single-sign-on/okta/02-select-add-person.png
        :title: Select add person
        :align: center
        :width: 80%
     
  
    .. thumbnail:: /images/single-sign-on/okta/03-click-save.png
        :title: Click save
        :align: center
        :width: 80%
         
#. Create a new group.
    
    To create a new group where the user will be added, navigate to **Directory** → **Groups** and add a group.
   
     .. thumbnail:: /images/single-sign-on/okta/04-navigate-to-directory-groups.png
        :title: Navigate to directory groups
        :align: center
        :width: 80%    
 
    Create a new group using any name, in our case, we name it ``wazuh-admin``. This name will be used as our ``backend_roles`` in ``roles_mapping.yml``

#. Add the new user to the new group.
   
   Navigate to **Directory** → **Groups** → **<YOUR GROUP>**. To add a user to the group, click on **Assign People** and add the user to the group created.


     .. thumbnail:: /images/single-sign-on/okta/05-navigate-to-directory-groups.png
        :title: Navigate to Directory - Groups - <YOUR GROUP>
        :align: center
        :width: 80%   

#. Create a new app. Configure the SAML settings while you create the app.
   
   To create a new app, navigate to the **Applications** section in Okta. Select **Create App Integration**.

     .. thumbnail:: /images/single-sign-on/okta/06-navigate-to-applications-section.png
        :title: Navigate to the Applications section in Okta
        :align: center
        :width: 80%   

   In the ``Create a new application integration`` window, select ``SAML 2.0`` and click on next.

     .. thumbnail:: /images/single-sign-on/okta/07-create-new-application.png
        :title: Create a new application integration
        :align: center
        :width: 80%   

   This leads to the application configuration page. Assign a name to the application, in our case, we assign the name ``wazuh-sso-app``:

     .. thumbnail:: /images/single-sign-on/okta/08-assign-name.png
        :title: Assign a name to the application
        :align: center
        :width: 80%   

   - In the SAML settings section, for **Single sign on URL**: input ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs/idpinitiated`` and replace the ``WAZUH_DASHBOARD_URL`` field with the corresponding URL. 
   - Select the **"Allow this app to request other SSO URLs"** option.
   - **Requestable SSO URLs**: input ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs`` and replace the ``WAZUH_DASHBOARD_URL`` field with the corresponding URL.
   - **Audience URI (SP Entity ID)** is the ``SP Entity ID`` (wazuh-saml) which will be used later in the ``config.yml`` on the Wazuh indexer instance.
   
   The rest of the values can be left as default.

     .. thumbnail:: /images/single-sign-on/okta/09-saml-settings-section.png
        :title: SAML settings section
        :align: center
        :width: 80%   

   In the **Group Attribute Statements** section put ``Roles`` as the name. The value for ``Roles`` will be used as the ``roles_key`` parameter in the Wazuh indexer configuration. For  the filter field, select **Matches regex** and type ``.*``. 

     .. thumbnail:: /images/single-sign-on/okta/10-group-attribute-statements-section.png
        :title: Group Attribute Statements section
        :align: center
        :width: 80%   

   Proceed by clicking next and on the feedback page, select the options seen in the screenshot below. Click on **Finish** and proceed to the next step.

     .. thumbnail:: /images/single-sign-on/okta/11-click-on-finish.png
        :title: Click on Finish and proceed to the next step
        :align: center
        :width: 80%   

#. Add the new app to the new group.

   Navigate to **Directory** → **Groups** → **<YOUR GROUP>**. Click on **Applications**, select **Assign Applications**, from here, assign the app created in step 5 and click on **Done** to save the changes.
   
     .. thumbnail:: /images/single-sign-on/okta/12-navigate-to-directory-groups.png
        :title: Navigate to Directory - Groups - <YOUR GROUP>
        :align: center
        :width: 80%

     .. thumbnail:: /images/single-sign-on/okta/13-select-assign-applications.png
        :title: Select Assign Applications
        :align: center
        :width: 80%

#. Note the necessary parameters from the SAML settings of the new app.

   The parameters already obtained during the integration are:

   - ``sp.entity_id``
   - ``roles_key``
   - ``kibana_url``

   To obtain the remaining parameters navigate to **Applications** → **Applications** → **<YOUR APP>** → **Sign On**. 

   Under **SAML Signing Certificates**, select **View IdP metadata** of the active certificate. This will open in a new tab, copy the URL as this will be the ``idp.metadata_url``.

   Now, on the same page, click on  **View SAML setup instructions**. Copy the **Identity Provider Issuer URL**, it will be the ``idp.entity_id``.

   The **X.509 Certificate** will be used as the ``exchange_key``:

     .. thumbnail:: /images/single-sign-on/okta/14-navigate-to-applications.png
        :title: Navigate to Applications - Applications - <YOUR APP> - Sign On
        :align: center
        :width: 80%

   This information can also be found in the metadata XML file.

Wazuh indexer configuration
---------------------------

#. Configure Wazuh indexer security configuration files.

   The file path to the Wazuh indexer security configuration is ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/``. The files to configure are ``config.yml`` and ``roles_mapping.yml``. It is recommended to back up these files before the configuration is carried out.

   #. ``config.yml``
      
      To configure the ``config.yml`` file, the ``order`` in ``basic_internal_auth_domain`` should be set to ``0``, and the ``challenge`` flag must be set to ``false``. Include a ``saml_auth_domain`` configuration under the ``authc`` section similar to the following:

      .. code-block:: console
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
                     metadata_url: ""
                     entity_id: ""
                  sp:
                     entity_id: wazuh-saml
                  kibana_url: https://<WAZUH_DASHBOARD_URL>
                  roles_key: Roles
                  exchange_key: ''
               authentication_backend:
               type: noop


      Ensure to change the following parameters to their corresponding value 

      - ``idp.metadata_url``  
      - ``idp.entity_id``
      - ``sp.entity_id``
      - ``kibana_url``
      - ``roles_key``
      - ``exchange_key``
      
      After modifying the ``config.yml`` file, it is necessary to use the ``securityadmin`` script to load the configuration changes with the following command:

      .. code-block:: console
      
         # export JAVA_HOME=/usr/share/wazuh-indexer/jdk/ && bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -f /usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/config.yml -icl -key /etc/wazuh-indexer/certs/admin-key.pem -cert /etc/wazuh-indexer/certs/admin.pem -cacert /etc/wazuh-indexer/certs/root-ca.pem -h localhost -nhnv

      The "-h" flag is used to specify the hostname or the IP address of the Wazuh indexer node.

      The command output must be similar to the following:

      .. code-block:: console
         :class: output

         Will connect to localhost:9300 ... done
         Connected as CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US
         OpenSearch Version: 1.2.4
         OpenSearch Security Version: 1.2.4.0
         Contacting opensearch cluster 'opensearch' and wait for YELLOW clusterstate ...
         Clustername: wazuh-cluster
         Clusterstate: GREEN
         Number of nodes: 1
         Number of data nodes: 1
         .opendistro_security index already exists, so we do not need to create one.
         Populate config from /home/wazuh
         Will update '_doc/config' with /usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/config.yml 
            SUCC: Configuration for 'config' created or updated
         Done with success

   #. ``roles_mapping.yml``
   
      Configure the ``roles_mapping.yml`` file to map the Okta group to the appropriate Wazuh indexer role, in our case, we map it to the  ``all_access`` role:

      .. code-block:: console
         :emphasize-lines: 6

         all_access:
         reserved: false
         hidden: false
         backend_roles:
         - "admin"
         - "<GROUP_NAME>"

      Replace ``<GROUP_NAME>`` with the name you gave to your group in Step 3, in our case, this is ``wazuh-admin``.

      After modifying the ``roles_mapping.yml`` file, it is necessary to use the ``securityadmin`` script to load the configuration changes with the following command:

      .. code-block:: console

         # export JAVA_HOME=/usr/share/wazuh-indexer/jdk/ && bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -f /usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/roles_mapping.yml -icl -key /etc/wazuh-indexer/certs/admin-key.pem -cert /etc/wazuh-indexer/certs/admin.pem -cacert /etc/wazuh-indexer/certs/root-ca.pem -h localhost -nhnv

      The "-h" flag is used to specify the hostname or the IP address of your Wazuh indexer node.

      The command output must be similar to the following:

      .. code-block:: console
         :class: output

         Security Admin v7
         Will connect to localhost:9300 ... done
         Connected as CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US
         OpenSearch Version: 1.2.4
         OpenSearch Security Version: 1.2.4.0
         Contacting opensearch cluster 'opensearch' and wait for YELLOW clusterstate ...
         Clustername: wazuh-cluster
         Clusterstate: GREEN
         Number of nodes: 1
         Number of data nodes: 1
         .opendistro_security index already exists, so we do not need to create one.
         Populate config from /home/wazuh
         Will update '_doc/rolesmapping' with /usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/roles_mapping.yml 
            SUCC: Configuration for 'rolesmapping' created or updated
         Done with success

Wazuh dashboard configuration
-----------------------------

#. Configure the Wazuh dashboard configuration file.

   Add these configurations to the ``opensearch_dashboards.yml``, the file path is ``/etc/wazuh-dashboard/opensearch_dashboards.yml``. It is recommended to back up this file before the configuration is made.

   .. code-block:: console

      opensearch_security.auth.type: "saml"
      server.xsrf.whitelist: ["/_plugins/_security/saml/acs", "/_plugins/_security/saml/logout", "/_opendistro/_security/saml/acs", "/_opendistro/_security/saml/logout", "/_opendistro/_security/saml/acs/idpinitiated"]

#. Change the logout configuration in the Wazuh dashboard. 
   
   To change the logout configuration, replace the ``this.router.get({path: `auth/logout``` section of the ``route.js`` file with the following setting. The file path is ``/usr/share/wazuh-dashboard/plugins/securityDashboards/server/auth/types/saml/routes.js``. It is recommended to back up this file before the configuration is made.

   .. code-block:: console

         this.router.get({
            path: `/logout`,
            validate: false
         }, async (context, request, response) => {
            try {
            const authInfo = await this.securityClient.authinfo(request);
            this.sessionStorageFactory.asScoped(request).clear(); // TODO: need a default logout page
            const redirectUrl = `${this.coreSetup.http.basePath.serverBasePath}/app/wazuh`
            return response.redirected({
               headers: {
                  location: redirectUrl
               }
            });
            } catch (error) {
            context.security_plugin.logger.error(`SAML logout failed: ${error}`);
            return response.badRequest();
            }
         });
         this.router.get({
            path: `/auth/logout`,
            validate: false
         }, async (context, request, response) => {
            try {
            const authInfo = await this.securityClient.authinfo(request);
            this.sessionStorageFactory.asScoped(request).clear(); // TODO: need a default logout page
            const redirectUrl = `${this.coreSetup.http.basePath.serverBasePath}/app/wazuh`
            return response.redirected({
               headers: {
                  location: redirectUrl
               }
            });
            } catch (error) {
            context.security_plugin.logger.error(`SAML logout failed: ${error}`);
            return response.badRequest();
            }
         });
      }
      }

#. Restart the Wazuh dashboard service using this command:

       .. include:: /_templates/common/restart_dashboard.rst

#. Test the configuration.

   To test the Okta SSO configuration, go to your Wazuh dashboard URL and log in with your Okta account.


