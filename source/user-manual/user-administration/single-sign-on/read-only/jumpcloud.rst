.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Jumpcloud is a Unified Device and Identity Access Management platform. Learn more about it and the read-only role in this section of the Wazuh documentation.

Jumpcloud
=========

`Jumpcloud <https://jumpcloud.com/>`__, is a Unified Device and Identity Access Management platform that provides services such as Multi-Factor Authentication (MFA), Single Sign-On, password management, and cloud directory. In this guide, we integrate the Jumpcloud SSO to authenticate users into the Wazuh platform.

There are three stages in the single sign-on integration.

#. `Jumpcloud Configuration`_
#. `Wazuh indexer configuration`_
#. `Wazuh dashboard configuration`_

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

   #. Go to **User Management** > **User Groups** > **(+)** and give a name to the group. In our case, this is ``wazuh-readonly``.

      .. thumbnail:: /images/single-sign-on/jumpcloud/read-only/02-go-to-user-management-user-groups-RO.png
          :title: Go to User Management - User Groups
          :align: center
          :width: 80%

      The name you give to your group will be used in the configuration. It will be our ``backend_roles`` in ``roles_mapping.yml``.

   #. In the selected **User Groups**,  go to the **Users** tab, select the newly created user and Save the changes.

      .. thumbnail:: /images/single-sign-on/jumpcloud/read-only/03-go-to-users-tab-RO.png
          :title: Go to the Users tab and select the newly created user 
          :align: center
          :width: 80%

#. Create a new app. Configure the SAML settings while you create the app.

   #. Under the User Authentication section, go to **SSO Applications**, click **+ Add New Application**, and select **Custom Application**.

      .. thumbnail:: /images/single-sign-on/jumpcloud/04-go-to-SSO.png
          :title: Add new SSO application
          :align: center
          :width: 80%    

      .. thumbnail:: /images/single-sign-on/jumpcloud/05-select-custom-app.png
          :title: Select custom application
          :align: center
          :width: 80%    

   #. Complete the **Create New Application Integration** page with the appropriate information.

      #. Click **Next** on the **Select Application** page.
      #. Check the **Manage Single Sign-On (SSO)** and **Configure SSO with SAML** options on the **Select Options** page. Click **Next** to proceed to the next step.
      #. Assign a **Display Label** to the application, and click the **Show this application in User Portal** checkbox on the **Enter General Info** page. Click **Save Application** to apply the settings. 
      #. Click **Configure Application** on the **Review page**.

      .. thumbnail:: /images/single-sign-on/jumpcloud/06-select-application.png
          :title: Custom application selected
          :alt: Custom application selected
          :align: center
          :width: 80%    

      .. thumbnail:: /images/single-sign-on/jumpcloud/07-select-manage-sso.png
          :title: Configure SSO options
          :alt: Configure SSO options
          :align: center
          :width: 80%    

      .. thumbnail:: /images/single-sign-on/jumpcloud/08-enter-general-info.png
          :title: Enter general info
          :alt: Enter general info
          :align: center
          :width: 80%    

      .. thumbnail:: /images/single-sign-on/jumpcloud/09-go-to-review.png
          :title: Confirm new application integration
          :alt: Confirm new application integration
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

      .. thumbnail:: /images/single-sign-on/jumpcloud/10-complete-the-sso-tab.png
          :title: Complete the SSO tab
          :align: center
          :width: 80%   

      .. thumbnail:: /images/single-sign-on/jumpcloud/11-complete-the-sso-tab.png      
          :title: Complete the SSO tab
          :align: center
          :width: 80%    

      .. thumbnail:: /images/single-sign-on/jumpcloud/12-complete-the-sso-tab.png
          :title: Complete the SSO tab
          :align: center
          :width: 80%    

      .. thumbnail:: /images/single-sign-on/jumpcloud/13-complete-the-sso-tab.png
          :title: Complete the SSO tab
          :align: center
          :width: 80%    

   #. On the **User Groups** tab, select the **Group** created previously and click **save**.

      .. thumbnail:: /images/single-sign-on/jumpcloud/read-only/09-on-the-user-groups-tab-RO.png
          :title: On the User Groups tab, select the Group created previously
          :align: center
          :width: 80% 

#. Note the necessary parameters from the SAML settings of the new app.

   Open the recently created application and go to the **SSO** tab, select **Export Metadata**. This will be our ``metadata_file``. Place the metadata file in the configuration directory of the Wazuh indexer. The path to the directory is ``/etc/wazuh-indexer/opensearch-security/``.

   .. thumbnail:: /images/single-sign-on/jumpcloud/15-go-to-the-sso-tab.png
      :title: Go to the SSO tab and select Export Metadata
      :align: center
      :width: 80%

Wazuh indexer configuration
---------------------------

Edit the Wazuh indexer security configuration files. We recommend that you back up these files before you carry out the configuration.

#. Generate a 64-character long random key using the following command.

   .. code-block:: console

      openssl rand -hex 32

   The output will be used as the ``exchange_key`` in the ``/etc/wazuh-indexer/opensearch-security/config.yml`` file.

#. Place the ``metadata_jumpcloud.xml`` file within the ``/etc/wazuh-indexer/opensearch-security/`` directory. Set the file ownership to ``wazuh-indexer`` using the following command:

   .. code-block:: console

      # chown wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/opensearch-security/metadata_jumpcloud.xml

#. Edit the ``/etc/wazuh-indexer/opensearch-security/config.yml`` file and change the following values:

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
                    metadata_file: '/etc/wazuh-indexer/opensearch-security/metadata_jumpcloud.xml'
                    entity_id: wazuh
                  sp:
                    entity_id: wazuh-saml
                    forceAuthn: true
                  kibana_url: https://<WAZUH_DASHBOARD_URL>
                  roles_key: Roles
                  exchange_key: 'b1d6dd32753374557dcf92e241.......'
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
   #. Click the upper-left menu icon **☰** to open the options, go to **Indexer management** > **Security**, and then **Roles** to open the roles page.
   #. Click **Create role**, complete the empty fields with the following parameters, and then click **Create** to complete the task.

      -  **Name**: Assign a name to the role.
      -  **Cluster permissions**: ``cluster_composite_ops_ro``
      -  **Index**: ``*``
      -  **Index permissions**: ``read``
      -  **Tenant permissions**: Select ``global_tenant`` and the ``Read only`` option.
   #. Select the newly created role.
   #. Select the **Mapped users** tab and click **Manage mapping**.
   #. Under **Backend roles**, add the name of the group you created in JumpCloud  and click **Map** to confirm the action. In our case, the backend role is ``wazuh-readonly``.

#. Check the value of ``run_as`` in the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` configuration file. If ``run_as`` is set to ``false``, proceed to the next step.

   .. code-block:: yaml
      :emphasize-lines: 7

      hosts:
        - default:
            url: https://127.0.0.1
            port: 55000
            username: wazuh-wui
            password: "<WAZUH_WUI_PASSWORD>"
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
      - **Value**: Assign the name of the group you created in JumpCloud. In our case, the backend role is ``wazuh-readonly``.

      .. thumbnail:: /images/single-sign-on/jumpcloud/read-only/Wazuh-role-mapping-RO.png
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

#. Restart the Wazuh dashboard service.

   .. include:: /_templates/common/restart_dashboard.rst

#. Test the configuration. Go to your Wazuh dashboard URL and log in with your Jumpcloud account. 



