.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: OneLogin is a cloud-based identity and access management provider. Learn more about it in this section of the Wazuh documentation.

.. _onelogin:

OneLogin
========

`OneLogin <https://www.onelogin.com>`__ is a cloud-based identity and access management provider that provides a unified access management platform to enterprise-level businesses and organizations. In this guide, we integrate the OneLogin SSO to authenticate users into the Wazuh platform. 

There are three stages in the single sign-on integration.

#. OneLogin Configuration
#. Wazuh indexer configuration
#. Wazuh dashboard configuration
   
OneLogin Configuration
----------------------

#. Create an account in OneLogin. Request a free trial if you don't have a paid license.
#. Add the OneLogin extension to your browser.
#. Create a new user. 

   #. Log in to **OneLogin** web console, and select **Administration** > **Users** > **New User**.

      .. thumbnail:: /images/single-sign-on/onelogin/01-log-in-to-onelogin-web-console.png
         :title: Log in to OneLogin web console
         :align: center
         :width: 80%

   #. Complete the mandatory fields, assign a value in the **Department** field and click on **Save User**. In our case, the department is ``wazuh-admin``. This field will be used later in the Wazuh indexer configuration as the backend role.

      .. thumbnail:: /images/single-sign-on/onelogin/02-complete-the-mandatory-fields.png
         :title: Complete the mandatory fields
         :align: center
         :width: 80%

   #. Select the user, navigate to **More Actions** and click on **Change Password** to assign a password to the user.

      .. thumbnail:: /images/single-sign-on/onelogin/03-click-on-save-user.png
         :title: Click on Save User
         :align: center
         :width: 80%

#. Create a new app using the **SAML Custom Connector (Advanced)** template and configure the SAML settings.

   #. Go to **Applications** tab > **Applications** and then click on **Add app**.

      .. thumbnail:: /images/single-sign-on/onelogin/04-create-a-new-app.png
         :title: Create a new app using the SAML Custom Connector (Advanced)
         :align: center
         :width: 80%

   #. Search for **SAML Custom Connector (Advanced)** application. In **Display Name**,  assign a name. In our case, we assigned the name ``Wazuh``. Navigate to the **Configuration** tab and fill in the information:

      - **Audience (EntityID)**: ``wazuh-saml``
      - **Recipient**: ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs``
      - **ACS (Consumer) URL Validator**: ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs``
      - **ACS (Consumer) URL**: ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs``
      - **Login URL**: ``https://<WAZUH_DASHBOARD_URL>/app/wazuh``
      - **SAML initiator**: ``Service Provider``
      - **SAML nameID format**: ``Unspecified``
      - **SAML issuer type**: ``Specific``
      - **SAML signature element**: ``Response``
   
      Replace the ``<WAZUH_DASHBOARD_URL>`` field with the corresponding URL of your Wazuh dashboard instance.

      The configuration must be similar to the highlighted blue rectangles:

      .. thumbnail:: /images/single-sign-on/onelogin/05-search-for-saml-custom-connector.png
         :title: Search for SAML Custom Connector (Advanced) application
         :align: center
         :width: 80%   

      .. thumbnail:: /images/single-sign-on/onelogin/06-search-for-saml-custom-connector.png
         :title: Search for SAML Custom Connector (Advanced) application
         :align: center
         :width: 80%   

   #. Go to the **Parameters** tab and click on **+** to add a new parameter to the app:

      .. thumbnail:: /images/single-sign-on/onelogin/07-go-to-the-parameters-tab.png
         :title: Go to the Parameters tab
         :align: center
         :width: 80%   

   #. Edit the parameter details. In our own case, we named the new parameter as **Roles**, then we selected the value **Department** and marked the  **Include in SAML assertion** checkbox. The rest of the app configuration is left as default. 

      .. thumbnail:: /images/single-sign-on/onelogin/08-we-named-the-new-parameter-as-roles.png
         :title: We named the new parameter as Roles
         :align: center
         :width: 80%   

   #. Click on **Save** to apply the configuration.

#. Add the created user to the new app.

   #. Go to **Users** and select the created user. Go to **Applications** and click on **+**, select the **Allow the user to sign in** checkbox, and click on **Save**.

      .. thumbnail:: /images/single-sign-on/onelogin/09-add-the-created-user-to-the-new-app.png
         :title: Add the created user to the new app
         :align: center
         :width: 80%    

#. Get the ``metada_onelogin.xml`` file and ``X.509 certificate`` from the application.

   #. Go to **Applications** >  **Applications** then select the **Wazuh** app. Click on **More Actions** and then select **SAML Metadata**.

      .. thumbnail:: /images/single-sign-on/onelogin/10-click-on-more-actions.png
         :title: Click on More Actions and then select SAML Metadata
         :align: center
         :width: 80%
   
   #. Save the file as ``XML``. This will be the ``idp.metadata_file`` in the Wazuh indexer security configuration.

   #. The **Issuer URL** will be the ``idp.entity_id`` in the Wazuh indexer security configuration.

      .. thumbnail:: /images/single-sign-on/onelogin/11-save-the-file-as-xml.png
         :title: Save the file as XML
         :align: center
         :width: 80%
   
   #. The **Audience (EntityID)** will be the ``sp.entity_id`` in  the Wazuh indexer security configuration.

      .. thumbnail:: /images/single-sign-on/onelogin/12-the-Audience-entityid.png
         :title: The Audience (EntityID) will be the sp.entity_id in  the Wazuh indexer security configuration
         :align: center
         :width: 80%


   #. The ``roles_key`` is the name of the parameter added in the **Wazuh** app. In our example, this is ``Roles``. 

   #. Finally, to obtain the ``exchange_key``, go to the **SSO** tab of the **Wazuh** app and select **View Details** in **X.509 Certificate**. Copy the blob of the certificate excluding the ``-----BEGIN CERTIFICATE-----`` and ``-----END CERTIFICATE-----`` lines:

      .. thumbnail:: /images/single-sign-on/onelogin/13-go-to-the-sso-tab.png
         :title: Go to the SSO tab of the Wazuh app and select View Details in X.509 Certificate
         :align: center
         :width: 80%

Wazuh indexer configuration
---------------------------

Edit the Wazuh indexer security configuration files. We recommend that you back up these files before you carry out the configuration.

#. Place the ``metadata_onelogin.xml`` file within the ``/etc/wazuh-indexer/opensearch-security/`` directory. Set the file ownership to ``wazuh-indexer`` using the following command:

   .. code-block:: console
   
      # chown wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/opensearch-security/metadata_onelogin.xml

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
            saml_auth_domain2:
              http_enabled: true
              transport_enabled: true
              order: 1
              http_authenticator:
                type: saml
                challenge: true
                config:
                  idp:
                    metadata_file: "/etc/wazuh-indexer/opensearch-security/metadata_onelogin.xml"
                    entity_id: "https://app.onelogin.com/saml/metadata/xxxxxxx"
                  sp:
                    entity_id: wazuh-saml
                  kibana_url: https://<WAZUH_DASHBOARD_URL>
                  roles_key: Roles
                  exchange_key: 'MIIBkjCB/AIBADBTMQswCQ......'
              authentication_backend:
                type: noop
      ...

   
   Ensure to change the following parameters to their corresponding value:

   - ``idp.metadata_file``
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
     
   To configure the ``roles_mapping.yml`` file, we map the ``Department`` field from step 3 to the ``all_access`` role on the Wazuh indexer. In this case, ``wazuh-admin``:

   .. code-block:: console
      :emphasize-lines: 7

      ...
      all_access:
        reserved: false
        hidden: false
        backend_roles:
        - "admin"
        - "wazuh-admin"
        description: "Maps admin to all_access"
      ...

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

#. Test the configuration. Go to your Wazuh dashboard URL and log in with your OneLogin account.
