.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Keycloak is an open source identity and access management tool. Learn more about it and the read-only role in this section of the Wazuh documentation.

Keycloak
========

`Keycloak <https://www.keycloak.org/>`_ is an open source identity and access management tool. It provides user federation, strong authentication, user management, and fine-grained authorization for modern applications and services. In this guide, we integrate the KeyCloak IdP to authenticate users into the Wazuh platform.

There are three stages in the single sign-on integration:

#. `KeyCloak configuration`_
#. `Wazuh indexer configuration`_
#. `Wazuh dashboard configuration`_

KeyCloak configuration
----------------------

#. Create a new realm. Log in to the Keycloak admin console, expand the **master** drop-down menu and click **Add Realm**. Input a name in the **Realm name** field; in our case, this is named ``Wazuh``. Click on **Create** to apply this configuration.

   .. thumbnail:: /images/single-sign-on/keycloak/01-create-a-new-realm.png
      :title: Create a new realm
      :align: center
      :width: 80%    
 
#. Create a new client. In the newly created realm, navigate to **Clients > Create Client** and  modify the following parameters:

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

      Replace the ``<WAZUH_DASHBOARD_URL>`` field with the corresponding URL of your Wazuh dashboard instance.

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
   
      - **Client signature required**: ``Off``

      .. thumbnail:: /images/single-sign-on/keycloak/07-client-signature-required.png
         :title: Client signature required
         :align: center
         :width: 80%  

   #. Navigate to **Clients > Advanced > Fine Grain SAML Endpoint Configuration** and complete the section with these parameters:

      - **Assertion Consumer Service POST Binding URL**: ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs/idpinitiated``
      - **Logout Service Redirect Binding URL**: ``https://<WAZUH_DASHBOARD_URL>``

      .. thumbnail:: /images/single-sign-on/keycloak/08-fine-grain-saml-endpoint-configuration.png
         :title: Fine Grain SAML Endpoint Configuration
         :align: center
         :width: 80%  

      You can leave the rest of the values as default. Click **Save** to apply the configuration.

#. Create a new role. Navigate to **Realm roles > Create role** and complete the section with these parameters:

   - **Role name**: Input ``wazuh-readonly``. This will be our backend role in the Wazuh Indexer configuration.

      .. thumbnail:: /images/single-sign-on/keycloak/read-only/09-create-a-new-role-RO.png
         :title: Create a new role
         :align: center
         :width: 80%  

   Click on **Save** to apply the configuration.

#. Create a new user. 

   #. Navigate to **Users > Add user** and fill in the required information.

      .. thumbnail:: /images/single-sign-on/keycloak/10-create-a-new-user.png
         :title: Create a new user
         :align: center
         :width: 80% 

      Click on **Create** to apply the configuration.

   #. Navigate to **Users > Credentials > Set password** and input a password for the newly created user. You will use these credentials to log in to the Wazuh dashboard.

      .. thumbnail:: /images/single-sign-on/keycloak/11-set-password.png
         :title: Set password
         :align: center
         :width: 80% 

      Click on **Save** to apply the configuration.

#. Create a new group and assign the user.

   #. Go to **Groups > Create group** and assign a name to the group. In our case, this is **Wazuh read only**.
   
      .. thumbnail:: /images/single-sign-on/keycloak/read-only/12-create-a-new-group-RO.png
         :title: Create a new group
         :align: center
         :width: 80% 

   #. Click on the newly created group, navigate to **Members > Add member** and select the user created in the previous step. Click on **Add** to add it to the group.
   
      .. thumbnail:: /images/single-sign-on/keycloak/read-only/13-add-member-RO.png
         :title: Add member
         :align: center
         :width: 80% 

   #. In the newly created group details, go to **Role Mapping > Assign role** and select the ``wazuh-readonly`` role created in step 3. Click on **Assign** to apply the configuration. 

      .. thumbnail:: /images/single-sign-on/keycloak/read-only/14-assign-role-RO.png
         :title: Assign role
         :align: center
         :width: 80% 

#. Configure protocol mapper.

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

   #. To obtain the remaining parameters.
   
      #. Navigate to **Clients** and select the name of your client. In our case, this is **wazuh-saml**. 
      #. Navigate to **Action > Download adapter config**, and ensure the Format option is **Mod Auth Mellon files**. 
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


Wazuh indexer configuration
---------------------------

Edit the Wazuh indexer security configuration files. We recommend that you back up these files before you carry out the configuration.

#. Place the ``idp.metadata.xml`` and ``sp.metadata.xml`` files within the ``/etc/wazuh-indexer/opensearch-security/`` directory. Set the file ownership to wazuh-indexer using the following command:

   .. code-block:: console

      chown wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/opensearch-security/idp.metadata.xml
      chown wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/opensearch-security/sp.metadata.xml

#. Edit the ``/etc/wazuh-indexer/opensearch-security/config.yml`` file and change the following values:
 
   - Set the ``order`` in ``basic_internal_auth_domain`` to ``0``, and set the ``challenge`` flag to ``false``.  
   - Include a ``saml_auth_domain`` configuration under the ``authc`` section similar to the following:

   .. code-block:: yaml
      :emphasize-lines: 7,10,22,23,25,26,27,28,29

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
                    metadata_file: '/etc/wazuh-indexer/opensearch-security/idp.metadata.xml'
                    entity_id: 'http://192.168.XX.XX:8080/realms/Wazuh'
                  sp:
                    entity_id: wazuh-saml
                    metadata_file: '/etc/wazuh-indexer/opensearch-security/sp.metadata.xml'
                  kibana_url: https://<WAZUH_DASHBOARD_ADDRESS>
                  roles_key: Roles
                  exchange_key: 'MIICajCCAdOgAwIBAgIBAD.........'
              authentication_backend:
                type: noop
      

   Ensure to change the following parameters to their corresponding value:

   - ``idp.metadata_file``  
   - ``idp.entity_id``
   - ``sp.entity_id``
   - ``sp.metadata_file``
   - ``kibana_url``
   - ``roles_key``
   - ``exchange_key``

#. Run the ``securityadmin`` script to load the configuration changes made in the ``config.yml`` file.

   .. code-block:: console

      # export JAVA_HOME=/usr/share/wazuh-indexer/jdk/ && bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -f /etc/wazuh-indexer/opensearch-security/config.yml -icl -key /etc/wazuh-indexer/certs/admin-key.pem -cert /etc/wazuh-indexer/certs/admin.pem -cacert /etc/wazuh-indexer/certs/root-ca.pem -h 127.0.0.1 -nhnv

   The ``-h`` flag specifies the hostname or the IP address of the Wazuh indexer node. Note that this command uses 127.0.0.1, set your Wazuh indexer address if necessary.

   The command output must be similar to the following:

   .. code-block:: console
      :class: output

      Security Admin v7
      Will connect to 127.0.0.1:9200 ... done
      Connected as "CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US"
      OpenSearch Version: 2.10.0
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

Wazuh dashboard configuration
-----------------------------

#. Create a new role mapping for the backend role. Follow these steps to create a new role mapping, and grant read-only permissions to the backend role.

   #. Log into the Wazuh dashboard as administrator.
   #. Click the upper-left menu icon **☰** to open the options, go to **Indexer/dashboard management** > **Security**, and then **Roles** to open the roles page.
   #. Click **Create role**, complete the empty fields with the following parameters, and then click **Create** to complete the task.

      -  **Name**: Assign a name to the role.
      -  **Cluster permissions**: ``cluster_composite_ops_ro``
      -  **Index**: ``*``
      -  **Index permissions**: ``read``
      -  **Tenant permissions**: Select ``global_tenant`` and the ``Read only`` option.
   #. Select the newly created role.
   #. Select the **Mapped users** tab and click **Manage mapping**.
   #. Under **Backend roles**, add the value of the **Role name** attribute in Keycloak configuration and click **Map** to confirm the action. In our case, the backend role is ``wazuh-readonly``.
#. Check the value of ``run_as`` in the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` configuration file. If ``run_as`` is set to ``false``, proceed to the next step.

   .. code-block:: yaml
      :emphasize-lines: 7

      hosts:
        - default:
            url: https://127.0.0.1
            port: 55000
            username: wazuh-wui
            password: "<wazuh-wui-password>"
            run_as: false

   If ``run_as`` is set to ``true``, you need to add a role mapping on the Wazuh dashboard. To map the backend role to Wazuh, follow these steps:

   #. Click **☰** to open the menu on the Wazuh dashboard, go to **Server management** > **Security**, and then **Roles mapping** to open the page.

      .. thumbnail:: /images/single-sign-on/Wazuh-role-mapping.gif
         :title: Wazuh role mapping
         :alt: Wazuh role mapping 
         :align: center
         :width: 80%

   #. Click **Create Role mapping** and complete the empty fields with the following parameters:

      - **Role mapping name**: Assign a name to the role mapping.
      - **Roles**: Select ``readonly``.
      - **Custom rules**: Click **Add new rule** to expand this field.
      - **User field**: ``backend_roles``
      - **Search operation**: ``FIND``
      - **Value**: Assign the value of the realm role in Keycloak configuration. In our case, this is ``wazuh-readonly``.  

      .. thumbnail:: /images/single-sign-on/keycloak/read-only/Wazuh-role-mapping-RO.png
         :title: Create Wazuh role mapping
         :alt: Create Wazuh role mapping 
         :align: center
         :width: 80%

   #. Click **Save role mapping** to save and map the backend role with Wazuh as *read-only*.


#. Edit the Wazuh dashboard configuration file. Add these configurations to ``/etc/wazuh-dashboard/opensearch_dashboards.yml``. We recommend that you back up these files before you carry out the configuration.

   .. code-block:: console  

      opensearch_security.auth.type: "saml"
      server.xsrf.allowlist: ["/_opendistro/_security/saml/acs", "/_opendistro/_security/saml/logout", "/_opendistro/_security/saml/acs/idpinitiated"]
      opensearch_security.session.keepalive: false

#. Restart the Wazuh dashboard service using this command:

   .. include:: /_templates/common/restart_dashboard.rst

#. Test the configuration. Go to your Wazuh dashboard URL and log in with your Keycloak account. 
