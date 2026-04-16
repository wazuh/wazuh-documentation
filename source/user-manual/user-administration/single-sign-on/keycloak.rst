.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Keycloak is an open source identity and access management tool. Learn more about it and the administrator role in this section of the Wazuh documentation.

Keycloak
========

`Keycloak <https://www.keycloak.org/>`__ is an open source identity and access management tool. It provides user federation, strong authentication, user management, and fine-grained authorization for modern applications and services. In this guide, we integrate the Keycloak IdP to authenticate users into the Wazuh platform.

Learn how to create administrator and read-only roles on Keycloak and map them with Wazuh in the sections below.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Setup Keycloak single sign-on with administrator role
------------------------------------------------------

Follow these steps to integrate Keycloak IdP with Wazuh for single sign-on and grant administrator role to the authenticated Keycloak users on the Wazuh platform:

#. :ref:`configuration_keycloak_admin`
#. :ref:`indexer_configuration_keycloak_admin`
#. :ref:`dashboard_configuration_keycloak_admin`

.. _configuration_keycloak_admin:

Keycloak Configuration
^^^^^^^^^^^^^^^^^^^^^^

#. Create a new realm. Log in to the Keycloak admin console, click on **Manage** **realms** > **Create realm**. Input a name in the **Realm name** field; in our case, this is named ``Wazuh``. Click on **Create** to apply this configuration.

   .. thumbnail:: /images/single-sign-on/keycloak/01-create-a-new-realm.png
      :title: Create a new realm
      :align: center
      :width: 80%

#. Create a new client. In the newly created realm, navigate to **Clients** > **Create client** and  modify the following parameters:

      - **Client type**: select ``SAML`` from the drop-down menu.
      - **Client ID**: input ``wazuh-saml``. This is the ``SP Entity ID`` value which will be used later in the Wazuh indexer configuration.

   You can leave the rest of the values as default. Click **Next** and **Save** to apply the configuration.

   .. thumbnail:: /images/single-sign-on/keycloak/02-create-a-new-client.png
      :title: Create a new client
      :align: center
      :width: 80%

#. Configure client settings.

   #. Navigate to **Clients** > **Settings** and ensure the **Enabled** button is turned on. Complete the section with these parameters:

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

      .. thumbnail:: /images/single-sign-on/keycloak/05-configure-client-settings.png
         :title: Configure client settings
         :align: center
         :width: 80%

      .. thumbnail:: /images/single-sign-on/keycloak/06-configure-client-settings.png
         :title: Configure client settings
         :align: center
         :width: 80%

      You can leave the rest of the values as default. Click **Save** to apply the configuration.

   #. Navigate to **Clients** > **Keys** and complete the section with these parameters:

      - **Client signature required**: ``Off``

      .. thumbnail:: /images/single-sign-on/keycloak/07-client-signature-required.png
         :title: Client signature required
         :align: center
         :width: 80%

   #. Navigate to **Clients** > **Advanced** > **Fine Grain SAML Endpoint Configuration** and complete the section with these parameters:

      - **Assertion Consumer Service POST Binding URL**: ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs/idpinitiated``
      - **Logout Service Redirect Binding URL**: ``https://<WAZUH_DASHBOARD_URL>``

      .. thumbnail:: /images/single-sign-on/keycloak/08-fine-grain-saml-endpoint-configuration.png
         :title: Fine Grain SAML Endpoint Configuration
         :align: center
         :width: 80%

      You can leave the rest of the values as default. Click **Save** to apply the configuration.

#. Create a new role. Navigate to **Realm roles** > **Create role** and complete the section with these parameters:

   - **Role name**: Input ``wazuh-admins``. This will be our backend role in the Wazuh indexer configuration.

      .. thumbnail:: /images/single-sign-on/keycloak/09-create-a-new-role.png
         :title: Create a new role
         :align: center
         :width: 80%

   Click on **Save** to apply the configuration.

#. Create a new user.

   #. Navigate to **Users** > **Add user** and fill in the required information.

      .. thumbnail:: /images/single-sign-on/keycloak/10-create-a-new-user.png
         :title: Create a new user
         :align: center
         :width: 80%

      Click on **Create** to apply the configuration.

   #. Navigate to **Users** > **Credentials** > **Set password** and input a password for the newly created user. You will use these credentials to log in to the Wazuh dashboard.

      .. thumbnail:: /images/single-sign-on/keycloak/11-set-password.png
         :title: Set password
         :align: center
         :width: 80%

      Click on **Save** to apply the configuration.

#. Create a new group and assign the user.

   #. Go to **Groups** > **Create group** and assign a name to the group. In our case, this is **Wazuh-admins**.

      .. thumbnail:: /images/single-sign-on/keycloak/12-create-a-new-group.png
         :title: Create a new group
         :align: center
         :width: 80%

   #. Click on the newly created group, navigate to **Members** > **Add member** and select the user created in the previous step. Click on **Add** to add it to the group.

      .. thumbnail:: /images/single-sign-on/keycloak/13-add-member.png
         :title: Add member
         :align: center
         :width: 80%

   #. In the newly created group details, go to **Role Mapping** > **Assign role** > **Realm roles** and select the ``wazuh-admins`` role created in step 4. Click on **Assign** to apply the configuration.

      .. thumbnail:: /images/single-sign-on/keycloak/14-assign-role.png
         :title: Assign role
         :align: center
         :width: 80%

#. Configure protocol mapper.

   #. Navigate to **Client scopes** > **role_list** > **Mappers** > **Add mapper** > **By configuration**.

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
      - **Role attribute name**: ``Roles``. This will be the ``roles_key`` on the Wazuh indexer configuration.
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
      - ``backend_roles``: ``wazuh-admins``

   #. To obtain the remaining parameters:

      #. Navigate to **Clients** and select the name of your client. In our case, this is **wazuh-saml**.
      #. Navigate to **Action** > **Download adaptor config**, and ensure the Format option is **mod-auth-mellon**.
      #. Click on **Download** to download the remaining files.

      .. thumbnail:: /images/single-sign-on/keycloak/18-download-adapter-config.png
         :title: Download adaptor config
         :align: center
         :width: 80%

   #. The downloaded files contain the ``idp-metadata.xml`` file and the ``sp-metadata.xml`` file.

      -  The ``idp.entityID`` parameter is in the ``idp-metadata.xml`` file.

      .. thumbnail:: /images/single-sign-on/keycloak/19-the-exchange_key-parameter.png
         :title: The exchange_key parameter
         :align: center
         :width: 80%

.. _indexer_configuration_keycloak_admin:

Wazuh indexer configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Edit the Wazuh indexer security configuration files. We recommend that you back up these files before you carry out the configuration.

#. Backup the existing Wazuh indexer security configuration files:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh --options "-backup /etc/wazuh-indexer/opensearch-security -icl -nhnv"

#. Generate a 64-character long random key using the following command.

   .. code-block:: console

      openssl rand -hex 32

   The output will be used as the ``exchange_key`` in the ``/etc/wazuh-indexer/opensearch-security/config.yml`` file.

#. Place the ``idp-metadata.xml`` and ``sp-metadata.xml`` files within the ``/etc/wazuh-indexer/opensearch-security/`` directory. Set the file ownership to wazuh-indexer using the following command:

   .. code-block:: console

      # chown wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/opensearch-security/idp-metadata.xml
      # chown wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/opensearch-security/sp-metadata.xml

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
                    metadata_file: '/etc/wazuh-indexer/opensearch-security/idp-metadata.xml'
                    entity_id: 'http://<KEYCLOAK_URL>:<KEYCLOAK_PORT>/realms/Wazuh'
                  sp:
                    entity_id: wazuh-saml
                    metadata_file: '/etc/wazuh-indexer/opensearch-security/sp-metadata.xml'
                  kibana_url: https://<WAZUH_DASHBOARD_ADDRESS>
                  roles_key: Roles
                  exchange_key: 'b1d6dd32753374557dcf92e241.......'
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

      # export JAVA_HOME=/usr/share/wazuh-indexer/jdk/ && bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -f /etc/wazuh-indexer/opensearch-security/config.yml -icl -key /etc/wazuh-indexer/certs/admin-key.pem -cert /etc/wazuh-indexer/certs/admin.pem -cacert /etc/wazuh-indexer/certs/root-ca.pem -h localhost -nhnv

   The ``-h`` flag specifies the hostname or the IP address of the Wazuh indexer node. Note that this command uses localhost, set your Wazuh indexer address if necessary.

   The command output must be similar to the following:

   .. code-block:: console
      :class: output

      Security Admin v7
      Will connect to localhost:9200 ... done
      Connected as "CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US"
      OpenSearch Version: 2.19.4
      Contacting opensearch cluster 'opensearch' and wait for YELLOW clusterstate ...
      Clustername: wazuh-cluster
      Clusterstate: GREEN
      Number of nodes: 1
      Number of data nodes: 1
      .opendistro_security index already exists, so we do not need to create one.
      Populate config from /home/wazuh-user
      Will update '/config' with /etc/wazuh-indexer/opensearch-security/config.yml
         SUCC: Configuration for 'config' created or updated
      SUCC: Expected 1 config types for node {"updated_config_types":["config"],"updated_config_size":1,"message":null} is 1 (["config"]) due to: null
      Done with success

#. Edit the ``/etc/wazuh-indexer/opensearch-security/roles_mapping.yml`` file and change the following values:

   Configure the ``roles_mapping.yml`` file to map the realm role in Keycloak to the appropriate Wazuh indexer role. In our case, we map this to the ``all_access`` role:

   .. code-block:: console
      :emphasize-lines: 5

      all_access:
        reserved: false
        hidden: false
        backend_roles:
        - "wazuh-admins"


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
      OpenSearch Version: 2.19.4
      Contacting opensearch cluster 'opensearch' and wait for YELLOW clusterstate ...
      Clustername: wazuh-cluster
      Clusterstate: GREEN
      Number of nodes: 1
      Number of data nodes: 1
      .opendistro_security index already exists, so we do not need to create one.
      Populate config from /home/wazuh-user
      Will update '/rolesmapping' with /etc/wazuh-indexer/opensearch-security/roles_mapping.yml
         SUCC: Configuration for 'rolesmapping' created or updated
      SUCC: Expected 1 config types for node {"updated_config_types":["rolesmapping"],"updated_config_size":1,"message":null} is 1 (["rolesmapping"]) due to: null
      Done with success

.. _dashboard_configuration_keycloak_admin:

Wazuh dashboard configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Verify that ``run_as`` is set to ``true`` in the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` configuration file. This is required to create a role mapping in the Wazuh dashboard, ensuring the backend role provided by the IdP is correctly mapped to the corresponding Wazuh role.

   .. code-block:: yaml
      :emphasize-lines: 7

      hosts:
        - default:
            url: https://localhost
            port: 55000
            username: wazuh-wui
            password: "<WAZUH_WUI_PASSWORD>"
            run_as: true

   #. Click **☰** to open the menu on the Wazuh dashboard, go to **Server management** > **Security**, and then **Roles mapping** to open the page.

      .. thumbnail:: /images/single-sign-on/Wazuh-role-mapping.gif
         :title: Wazuh role mapping
         :alt: Wazuh role mapping
         :align: center
         :width: 80%

   #. Click **Create Role mapping** and complete the empty fields with the following parameters:

      - **Role mapping name**: Assign a name to the role mapping.
      - **Roles**: Select ``administrator``.
      - **Custom rules**: Click **Add new rule** to expand this field.
      - **User field**: ``backend_roles``
      - **Search operation**: ``FIND``
      - **Value**: Assign the value of the realm role in Keycloak configuration. In our case, this is ``wazuh-admins``.
      - Click **Save role mapping** to save and map the backend role with Wazuh as *administrator*.

      .. thumbnail:: /images/single-sign-on/keycloak/Wazuh-role-mapping.png
         :title: Create Wazuh role mapping
         :alt: Create Wazuh role mapping
         :align: center
         :width: 80%

#. Edit the Wazuh dashboard configuration file. Add these configurations to ``/etc/wazuh-dashboard/opensearch_dashboards.yml``. We recommend that you back up these files before you carry out the configuration.

   .. code-block:: console

      opensearch_security.auth.multiple_auth_enabled: true
      opensearch_security.auth.type: ["basicauth","saml"]
      server.xsrf.allowlist: ["/_opendistro/_security/saml/acs", "/_opendistro/_security/saml/logout", "/_opendistro/_security/saml/acs/idpinitiated"]

#. Restart the Wazuh dashboard service using this command.

   .. code-block:: console

      # systemctl restart wazuh-dashboard

#. Test the configuration. To test the configuration, go to your Wazuh dashboard URL and log in with your Keycloak account.

Setup Keycloak single sign-on with read-only role
-------------------------------------------------

Follow these steps to integrate Keycloak IdP with Wazuh for single sign-on and grant read-only role to the authenticated Keycloak users on the Wazuh platform:

#. :ref:`configuration_keycloak_ro`
#. :ref:`indexer_configuration_keycloak_ro`
#. :ref:`dashboard_configuration_keycloak_ro`

.. _configuration_keycloak_ro:

Keycloak Configuration
^^^^^^^^^^^^^^^^^^^^^^

#. Create a new realm. Log in to the Keycloak admin console, click on **Manage** **realms** > **Create realm**. Input a name in the **Realm name** field; in our case, this is named ``Wazuh``. Click on **Create** to apply this configuration.

   .. thumbnail:: /images/single-sign-on/keycloak/01-create-a-new-realm.png
      :title: Create a new realm
      :align: center
      :width: 80%

#. Create a new client. In the newly created realm, navigate to **Clients** > **Create client** and  modify the following parameters:

      - **Client type**: select ``SAML`` from the drop-down menu.
      - **Client ID**: input ``wazuh-saml``. This is the ``SP Entity ID`` value which will be used later in the Wazuh indexer configuration.

   You can leave the rest of the values as default. Click **Next** and **Save** to apply the configuration.

   .. thumbnail:: /images/single-sign-on/keycloak/02-create-a-new-client.png
      :title: Create a new client
      :align: center
      :width: 80%

#. Configure client settings.

   #. Navigate to **Clients** > **Settings** and ensure the **Enabled** button is turned on. Complete the section with these parameters:

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

      .. thumbnail:: /images/single-sign-on/keycloak/05-configure-client-settings.png
         :title: Configure client settings
         :align: center
         :width: 80%

      .. thumbnail:: /images/single-sign-on/keycloak/06-configure-client-settings.png
         :title: Configure client settings
         :align: center
         :width: 80%

      You can leave the rest of the values as default. Click **Save** to apply the configuration.

   #. Navigate to **Clients** > **Keys** and complete the section with these parameters:

      - **Client signature required**: ``Off``

      .. thumbnail:: /images/single-sign-on/keycloak/07-client-signature-required.png
         :title: Client signature required
         :align: center
         :width: 80%

   #. Navigate to **Clients** > **Advanced** > **Fine Grain SAML Endpoint Configuration** and complete the section with these parameters:

      - **Assertion Consumer Service POST Binding URL**: ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs/idpinitiated``
      - **Logout Service Redirect Binding URL**: ``https://<WAZUH_DASHBOARD_URL>``

      .. thumbnail:: /images/single-sign-on/keycloak/08-fine-grain-saml-endpoint-configuration.png
         :title: Fine Grain SAML Endpoint Configuration
         :align: center
         :width: 80%

      You can leave the rest of the values as default. Click **Save** to apply the configuration.

#. Create a new role. Navigate to **Realm roles** > **Create role** and complete the section with these parameters:

   - **Role name**: Input ``wazuh-readonly``. This will be our backend role in the Wazuh indexer configuration.

      .. thumbnail:: /images/single-sign-on/keycloak/09-create-a-new-role-RO.png
         :title: Create a new role
         :align: center
         :width: 80%

   Click on **Save** to apply the configuration.

#. Create a new user.

   #. Navigate to **Users** > **Add user** and fill in the required information.

      .. thumbnail:: /images/single-sign-on/keycloak/10-create-a-new-user.png
         :title: Create a new user
         :align: center
         :width: 80%

      Click on **Create** to apply the configuration.

   #. Navigate to **Users** > **Credentials** > **Set password** and input a password for the newly created user. You will use these credentials to log in to the Wazuh dashboard.

      .. thumbnail:: /images/single-sign-on/keycloak/11-set-password.png
         :title: Set password
         :align: center
         :width: 80%

      Click on **Save** to apply the configuration.

#. Create a new group and assign the user.

   #. Go to **Groups** > **Create group** and assign a name to the group. In our case, this is **Wazuh read only**.

      .. thumbnail:: /images/single-sign-on/keycloak/12-create-a-new-group-RO.png
         :title: Create a new group
         :align: center
         :width: 80%

   #. Click on the newly created group, navigate to **Members** > **Add member** and select the user created in the previous step. Click on **Add** to add it to the group.

      .. thumbnail:: /images/single-sign-on/keycloak/13-add-member-RO.png
         :title: Add member
         :align: center
         :width: 80%

   #. In the newly created group details, go to **Role Mapping** > **Assign role** > **Realm roles** and select the ``wazuh-readonly`` role created in step 4. Click on **Assign** to apply the configuration.

      .. thumbnail:: /images/single-sign-on/keycloak/14-assign-role-RO.png
         :title: Assign role
         :align: center
         :width: 80%

#. Configure protocol mapper.

   #. Navigate to **Client scopes** > **role_list** > **Mappers** > **Add mapper** > **By configuration**.

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
      - **Role attribute name**: ``Roles``. This will be the ``roles_key`` on the Wazuh indexer configuration.
      - **SAML Attribute NameFormat**: ``Basic``
      - **Single Role Attribute**: ``On``

      .. thumbnail:: /images/single-sign-on/keycloak/17-complete-the-add-mapper-section.png
         :title: Complete the Add mapper section
         :align: center
         :width: 80%

   Click on **Save** to apply the configuration.

#. Note the necessary parameters from the SAML settings of Keycloak.

   #. The parameters already obtained during the integration are:

      -  ``sp.entity_id``: ``wazuh-saml``
      -  ``roles_key``: ``Roles``
      -  ``kibana_url``: ``https://<WAZUH_DASHBOARD_URL>``
      -  ``backend_roles``: ``wazuh-readonly``

   #. To obtain the remaining parameters.

      #. Navigate to **Clients** and select the name of your client. In our case, this is **wazuh-saml**.
      #. Navigate to **Action** > **Download adaptor config**, and ensure the Format option is **mod-auth-mellon**.
      #. Click on **Download** to download the remaining files.

      .. thumbnail:: /images/single-sign-on/keycloak/18-download-adapter-config.png
         :title: Download adaptor config
         :align: center
         :width: 80%

   #. The downloaded files contain the ``idp-metadata.xml`` file and the ``sp-metadata.xml`` file.

      -  The ``idp.entityID`` parameter is in the ``idp-metadata.xml`` file.

      .. thumbnail:: /images/single-sign-on/keycloak/19-the-exchange_key-parameter.png
         :title: The exchange_key parameter
         :align: center
         :width: 80%

.. _indexer_configuration_keycloak_ro:

Wazuh indexer configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Edit the Wazuh indexer security configuration files. We recommend that you back up these files before you carry out the configuration.

#. Backup the existing Wazuh indexer security configuration files:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh --options "-backup /etc/wazuh-indexer/opensearch-security -icl -nhnv"

#. Generate a 64-character long random key using the following command.

   .. code-block:: console

      openssl rand -hex 32

   The output will be used as the ``exchange_key`` in the ``/etc/wazuh-indexer/opensearch-security/config.yml`` file.

#. Place the ``idp-metadata.xml`` and ``sp-metadata.xml`` files within the ``/etc/wazuh-indexer/opensearch-security/`` directory. Set the file ownership to ``wazuh-indexer`` using the following command:

   .. code-block:: console

      # chown wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/opensearch-security/idp-metadata.xml
      # chown wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/opensearch-security/sp-metadata.xml

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
                    metadata_file: '/etc/wazuh-indexer/opensearch-security/idp-metadata.xml'
                    entity_id: 'http://<KEYCLOAK_URL>:<KEYCLOAK_PORT>/realms/Wazuh'
                  sp:
                    entity_id: wazuh-saml
                    metadata_file: '/etc/wazuh-indexer/opensearch-security/sp-metadata.xml'
                  kibana_url: https://<WAZUH_DASHBOARD_ADDRESS>
                  roles_key: Roles
                  exchange_key: 'b1d6dd32753374557dcf92e241.......'
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

      # export JAVA_HOME=/usr/share/wazuh-indexer/jdk/ && bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -f /etc/wazuh-indexer/opensearch-security/config.yml -icl -key /etc/wazuh-indexer/certs/admin-key.pem -cert /etc/wazuh-indexer/certs/admin.pem -cacert /etc/wazuh-indexer/certs/root-ca.pem -h localhost -nhnv

   The ``-h`` flag specifies the hostname or the IP address of the Wazuh indexer node. Note that this command uses localhost, set your Wazuh indexer address if necessary.

   The command output must be similar to the following:

   .. code-block:: console
      :class: output

      Security Admin v7
      Will connect to localhost:9200 ... done
      Connected as "CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US"
      OpenSearch Version: 2.19.4
      Contacting opensearch cluster 'opensearch' and wait for YELLOW clusterstate ...
      Clustername: wazuh-cluster
      Clusterstate: GREEN
      Number of nodes: 1
      Number of data nodes: 1
      .opendistro_security index already exists, so we do not need to create one.
      Populate config from /home/wazuh-user
      Will update '/config' with /etc/wazuh-indexer/opensearch-security/config.yml
         SUCC: Configuration for 'config' created or updated
      SUCC: Expected 1 config types for node {"updated_config_types":["config"],"updated_config_size":1,"message":null} is 1 (["config"]) due to: null
      Done with success

.. _dashboard_configuration_keycloak_ro:

Wazuh dashboard configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Create a new role mapping for the backend role. Follow these steps to create a new role mapping, and grant read-only permissions to the backend role.

   #. Log into the Wazuh dashboard as administrator.
   #. Click the upper-left menu icon **☰** to open the options, go to **Indexer management** > **Security**, and then **Roles** to open the roles page.
   #. Click **Create role**, complete the empty fields with the following parameters, and then click **Create** to complete the task.

      -  **Name**: Assign a name to the role.
      -  **Cluster permissions**: ``cluster_composite_ops_ro``
      -  **Index**: ``*``
      -  **Index permissions**: ``read``
      -  **Tenant permissions**: ``global_tenant`` and select the ``Read only`` option.
   #. Select the newly created role.
   #. Select the **Mapped users** tab and click **Manage mapping**.
   #. Under **Backend roles**, add the value of the **Role name** attribute in Keycloak configuration and click **Map** to confirm the action. In our case, the backend role is ``wazuh-readonly``.
#. Verify that ``run_as`` is set to ``true`` in the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` configuration file. This is required to create a role mapping in the Wazuh dashboard, ensuring the backend role provided by the IdP is correctly mapped to the corresponding Wazuh role.

   .. code-block:: yaml
      :emphasize-lines: 7

      hosts:
        - default:
            url: https://localhost
            port: 55000
            username: wazuh-wui
            password: "<WAZUH_WUI_PASSWORD>"
            run_as: true

   #. Click **☰** to open the menu on the Wazuh dashboard, go to **Server management** > **Security**, and then **Roles mapping** to open the page.

      .. thumbnail:: /images/single-sign-on/Wazuh-role-mapping.gif
         :title: Wazuh role mapping
         :alt: Wazuh role mapping
         :align: center
         :width: 80%

   #. Click **Create Role mapping** and complete the empty fields with the following parameters:

      -  **Role mapping name**: Assign a name to the role mapping.
      -  **Roles**: Select ``readonly``.
      -  **Custom rules**: Click **Add new rule** to expand this field.
      -  **User field**: ``backend_roles``
      -  **Search operation**: ``FIND``
      -  **Value**: Assign the value of the **Role name** field in Keycloak configuration. In our case, the backend role is ``wazuh-readonly``.
      -  Click **Save role mapping** to save and map the backend role with Wazuh as *read-only*.

      .. thumbnail:: /images/single-sign-on/Wazuh-role-mapping-RO.png
         :title: Create Wazuh role mapping
         :alt: Create Wazuh role mapping
         :align: center
         :width: 80%

#. Edit the Wazuh dashboard configuration file. Add these configurations to ``/etc/wazuh-dashboard/opensearch_dashboards.yml``. We recommend that you back up these files before you carry out the configuration.

   .. code-block:: console

      opensearch_security.auth.multiple_auth_enabled: true
      opensearch_security.auth.type: ["basicauth","saml"]
      server.xsrf.allowlist: ["/_opendistro/_security/saml/acs", "/_opendistro/_security/saml/logout", "/_opendistro/_security/saml/acs/idpinitiated"]

#. Restart the Wazuh dashboard service using this command.

   .. code-block:: console

      # systemctl restart wazuh-dashboard

#. Test the configuration. To test the configuration, go to your Wazuh dashboard URL and log in with your Keycloak account.
