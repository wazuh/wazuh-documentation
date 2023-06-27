.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Jumpcloud is a Unified Device and Identity Access Management platform. Learn more about it in this section of the Wazuh documentation.

.. _jumpcloud:

Jumpcloud
=========

`Jumpcloud <https://jumpcloud.com/>`__, is a Unified Device and Identity Access Management platform that provides services such as Multi-Factor Authentication (MFA), Single Sign-On, password management, and cloud directory. In this guide, we integrate the Jumpcloud SSO to authenticate users into the Wazuh platform.

There are three stages in the single sign-on integration.

#. Jumpcloud Configuration
#. Wazuh indexer configuration
#. Wazuh dashboard configuration

Jumpcloud Configuration
-----------------------

#. Create an account in Jumpcloud. Request a free trial if you don't have a paid license.
#. Create a new user. This step can be skipped if you are just testing, you can use your Jumpcloud ``admin`` user for example.

   #. Go to **User Management**, click on **Users** > **(+)** >  **Manual user entry**. Fill in the user information, activate the user and click on **save user**. 

      .. thumbnail:: /images/single-sign-on/jumpcloud/01-go-to-user-management-and-click-on-users.png
          :title: Go to User Management and click on Users
          :align: center
          :width: 80%

#. Create a new group and assign the user.

   #. Go to **User Management** > **User Groups** > **(+)** and give a name to the group. In our case, this is ``Wazuh admins``.

      .. thumbnail:: /images/single-sign-on/jumpcloud/02-go-to-user-management-user-groups.png
          :title: Go to User Management - User Groups
          :align: center
          :width: 80%

      The name you give to your group will be used in the configuration. It will be our ``backend_roles`` in ``roles_mapping.yml``.

   #. In the selected **User Groups**,  go to the **Users** tab, select the newly created user and Save the changes.

      .. thumbnail:: /images/single-sign-on/jumpcloud/03-go-to-users-tab.png
          :title: Go to the Users tab and select the newly created user 
          :align: center
          :width: 80%

#. Create a new app. Configure the SAML settings while you create the app.

   #. Under the User Authentication section, go to **SSO**, select **(+)**, click on **Custom SAML App** and add a **Display Label**.

      .. thumbnail:: /images/single-sign-on/jumpcloud/05-click-on-custom-saml.png
          :title: Click on Custom SAML App and add a Display Label
          :align: center
          :width: 80%    

      .. thumbnail:: /images/single-sign-on/jumpcloud/04-go-to-SSO.png
          :title: Under the User Authentication section, go to SSO 
          :align: center
          :width: 80%    

   #. Complete the SSO tab with the appropriate information.

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

      .. thumbnail:: /images/single-sign-on/jumpcloud/07-complete-the-sso-tab.png      
          :title: Complete the SSO tab
          :align: center
          :width: 80%    

      .. thumbnail:: /images/single-sign-on/jumpcloud/08-complete-the-sso-tab.png
          :title: Complete the SSO tab
          :align: center
          :width: 80%    

   #. On the **User Groups** tab, select the **Group** created previously and click **save**.

      .. thumbnail:: /images/single-sign-on/jumpcloud/09-on-the-user-groups-tab.png
          :title: On the User Groups tab, select the Group created previously
          :align: center
          :width: 80% 

#. Note the necessary parameters from the SAML settings of the new app.

   #. Open the recently created application, go to the **SSO** tab and select **Export Metadata**. This will be our ``metadata_file``. Place the metadata file in the configuration directory of the Wazuh indexer. The path to the directory is ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/``.

   #. Extract the ``exchange_key`` from the ``metadata_file`` under the ``ds:X509Certificate`` tag.

      .. thumbnail:: /images/single-sign-on/jumpcloud/10-go-to-the-sso-tab.png
          :title: Go to the SSO tab and select Export Metadata
          :align: center
          :width: 80% 


Wazuh indexer configuration
---------------------------

Edit the Wazuh indexer security configuration files. We recommend that you back up these files before you carry out the configuration.

#. Place the ``metadata_jumpcloud.xml`` file within the ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/`` directory. Set the file ownership to ``wazuh-indexer`` using the following command:

   .. code-block:: console

      # chown wazuh-indexer:wazuh-indexer /usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/metadata_jumpcloud.xml

#. Edit the ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/config.yml`` file and change the following values:

   - Set the ``order`` in ``basic_internal_auth_domain`` to ``0`` and the ``challenge`` flag to ``false``. 

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
              transport_enabled: true
              order: 1
              http_authenticator:
                type: saml
                challenge: true
                config:
                  idp:
                    metadata_file: “/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/metadata_jumpcloud.xml”
                    entity_id: wazuh
                  sp:
                    entity_id: wazuh-saml
                    forceAuthn: true
                  kibana_url: https://<WAZUH_DASHBOARD_ADDRESS>
                  roles_key: Roles
                  exchange_key: 'MIIBkTCB+wIBADBSMQs......'
              authentication_backend:
                type: noop

   Ensure to change the following parameters to their corresponding value:

      - ``idp.metadata_file``
      - ``idp.entity_id``
      - ``sp.entity_id``
      - ``kibana_url``
      - ``roles_key``
      - ``exchange_key``

#. Run the ``securityadmin`` script to load the configuration changes made in the ``config.yml`` file. 

   .. code-block:: console

      # export JAVA_HOME=/usr/share/wazuh-indexer/jdk/ && bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -f /usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/config.yml -icl -key /etc/wazuh-indexer/certs/admin-key.pem -cert /etc/wazuh-indexer/certs/admin.pem -cacert /etc/wazuh-indexer/certs/root-ca.pem -h localhost -nhnv
      
   The ``-h`` flag specifies the hostname or the IP address of the Wazuh indexer node. Note that this command uses localhost, set your Wazuh indexer address if necessary.

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
   
#. Edit the ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/roles_mapping.yml`` file and change the following values:

   Configure the ``roles_mapping.yml`` file to map the Jumpcloud user group to the appropriate Wazuh indexer role. In our case, we map the ``Wazuh admins`` group to the ``all_access`` role:

   .. code-block:: console
      :emphasize-lines: 6

      all_access:
        reserved: false
        hidden: false
        backend_roles:
        - "admin"
        - "Wazuh admins"
        description: "Maps admin to all_access"

#. Run the ``securityadmin`` script to load the configuration changes made in the ``roles_mapping.yml`` file. 

   .. code-block:: console

      # export JAVA_HOME=/usr/share/wazuh-indexer/jdk/ && bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -f /usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/roles_mapping.yml -icl -key /etc/wazuh-indexer/certs/admin-key.pem -cert /etc/wazuh-indexer/certs/admin.pem -cacert /etc/wazuh-indexer/certs/root-ca.pem -h localhost -nhnv      

   The ``-h`` flag specifies the hostname or the IP address of the Wazuh indexer node. Note that this command uses localhost, set your Wazuh indexer address if necessary.
      
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

#. Check the value of ``run_as`` in the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` configuration file. If ``run_as`` is set to ``false``, proceed to the next step.

   .. code-block:: yaml
      :emphasize-lines: 7

      hosts:
        - default:
            url: https://localhost
            port: 55000
            username: wazuh-wui
            password: "<wazuh-wui-password>"
            run_as: false

   If ``run_as`` is set to ``true``, you need to add a role mapping on the Wazuh dashboard. To map the backend role to Wazuh, follow these steps:

   #. Click **Wazuh** to open the Wazuh dashboard menu, select **Security**, and then **Roles mapping** to open the page.

      .. thumbnail:: /images/single-sign-on/Wazuh-role-mapping.gif
         :title: Wazuh role mapping
         :alt: Wazuh role mapping 
         :align: center
         :width: 80%

   #. Click **Create Role mapping** and complete the empty fields with the following parameters:

      -  **Role mapping name**: Assign a name to the role mapping.
      -  **Roles**: Select ``administrator``.
      -  **Custom rules**: Click **Add new rule** to expand this field.
      -  **User field**: ``backend_roles``
      -  **Search operation**: ``FIND``
      -  **Value**: Assign the value of the Department field in OneLogin configuration. In our case, this is ``Wazuh admins``.  

      .. thumbnail:: /images/single-sign-on/jumpcloud/Wazuh-role-mapping.png
         :title: Create Wazuh role mapping
         :alt: Create Wazuh role mapping 
         :align: center
         :width: 80%      

   #. Click **Save role mapping** to save and map the backend role with Wazuh as administrator.

#. Edit the Wazuh dashboard configuration file. Add these configurations to ``/etc/wazuh-dashboard/opensearch_dashboards.yml``. We recommend that you back up these files before you carry out the configuration.

   .. code-block:: console  

      opensearch_security.auth.type: "saml"
      server.xsrf.whitelist: ["/_opendistro/_security/saml/acs", "/_opendistro/_security/saml/logout", "/_opendistro/_security/saml/acs/idpinitiated"]

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

#. Test the configuration. Go to your Wazuh dashboard URL and log in with your Jumpcloud account. 



