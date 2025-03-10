.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: PingOne is a platform that enables enterprises to give their users federated access to applications. Learn more about it and the read-only role in this section of our documentation.

PingOne
=======

`PingOne for Enterprise <https://www.pingidentity.com/>`_ is an identity-as-a-service (IDaaS) and single sign-on (SSO) platform. It allows enterprises to give their users federated access to applications. In this guide, we integrate the PingOne IdP to authenticate users into the Wazuh platform.

There are three stages in the single sign-on integration.

#. `PingOne Configuration`_
#. `Wazuh indexer configuration`_
#. `Wazuh dashboard configuration`_

PingOne Configuration
---------------------

#. Create an account in Ping Identity. Request a free trial if you don't have a paid license.
#. Go to `PingOne <https://admin.pingone.com/>`_ and sign in with your Ping Identity account.
#. Create an application in **Connections**.

   #. Navigate to **Connections** > **Applications** > **Add Application** and give it a name. In our case, the name is ``wazuh-sso``.

   #. Proceed to the **Choose Application Type** section, and select  **SAML Application** > **Configure**.

      .. thumbnail:: /images/single-sign-on/pingone/read-only/01-proceed-to-the-choose-application-type-section-RO.png
          :title: Proceed to the Choose Application Type section
          :align: center
          :width: 80%

   #. Select **Manually Enter** on the **Provide App Metadata** section and add the following configuration, replacing ``<WAZUH_DASHBOARD_URL>`` with the corresponding value:

      - ACS URLs: ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs``
      - Entity ID: ``wazuh-saml``

      .. thumbnail:: /images/single-sign-on/pingone/read-only/02-select-manually-enter-on-the-provide-app-metadata-RO.png
          :title: Select Manually Enter on the Provide App Metadata
          :align: center
          :width: 80%

   #. On the **Configuration** tab, click on the edit icon and add the following information:

      - SLO ENDPOINT: ``https://<WAZUH_DASHBOARD_URL>/``
      - SLO BINDING: ``HTTP Redirect``
      - ASSERTION VALIDITY DURATION: ``3600`` (for one hour token validity)
      - VERIFICATION CERTIFICATE (OPTIONAL): Load a PUBLIC CERTIFICATE that corresponds to the PRIVATE KEY that is going to be used on the ``sp.signature_private_key_filepath`` of the ``config.yml`` configuration file on the Wazuh indexer instance. This is necessary as all the logout requests must be signed.

      .. thumbnail:: /images/single-sign-on/pingone/read-only/03-on-the-configuration-tab-RO.png
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
 
   #. Navigate to **Identities** > **Groups**, and click on the **+** sign. Select the name of the **Group**, in this case, ``wazuh-readonly``.

      .. thumbnail:: /images/single-sign-on/pingone/read-only/05-navigate-to-identities-groups-RO.png
          :title: Navigate to Identities > Groups
          :align: center
          :width: 80%

   #. To assign users, open the created **Group**, go to the **Users** tab and select **Add Individually**. Add all the members that must log in to the Wazuh dashboard, and click on **Save** when done.

      .. thumbnail:: /images/single-sign-on/pingone/read-only/06-assign-users-RO.png
          :title: Assign users
          :align: center
          :width: 80%

      .. thumbnail:: /images/single-sign-on/pingone/read-only/07-assign-users-RO.png
          :title: Assign users
          :align: center
          :width: 80%

#. Activate the application and note the necessary parameters.

   #. Navigate to **Connections**, select **Applications**, and enable the application.

      .. thumbnail:: /images/single-sign-on/pingone/read-only/08-navigate-to-connections-RO.png
          :title: Navigate to Connections
          :align: center
          :width: 80%

   #. Take note of the following parameters from the configuration page of the application. This information will be used in the next step. 

      -  **ISSUER ID**: It'll be in the form \https://auth.pingone.com/...
      -  **IDP METADATA URL**: It’ll be in the form \https://auth.pingone.com/...

      .. thumbnail:: /images/single-sign-on/pingone/read-only/09-take-note-of-parameters-RO.png
         :title: Take note of parameters from the configuration page
         :align: center
         :width: 80%

Wazuh indexer configuration
---------------------------

Edit the Wazuh indexer security configuration files. We recommend that you back up these files before you carry out the configuration.

#. Generate a 64-character long random key using the following command.

   .. code-block:: console

      openssl rand -hex 32

   The output will be used as the ``exchange_key`` in the ``/etc/wazuh-indexer/opensearch-security/config.yml`` file.

#. Place the private key file within the ``/etc/wazuh-indexer/opensearch-security/`` directory. Set the file ownership to ``wazuh-indexer`` using the following command:

   .. code-block:: console

      # chown wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/opensearch-security/securityconfig/PRIVATE_KEY

#. Edit the ``/etc/wazuh-indexer/opensearch-security/config.yml`` file and change the following values:

   - Set the ``order`` in ``basic_internal_auth_domain`` to ``0`` and the ``challenge`` flag to ``false``. 

   - Include a ``saml_auth_domain`` configuration under the ``authc`` section similar to the following:

   .. code-block:: yaml
      :emphasize-lines: 7,10,22,23,25,26,27,28,29,30

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
                    metadata_url: IDP METADATA URL
                    entity_id: ISSUER ID
                  sp:
                    entity_id: wazuh-saml
                    signature_private_key_filepath: /etc/wazuh-indexer/opensearch-security/PRIVATE_KEY
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
   - ``sp.signature_private_key_filepath``
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
   #. Under **Backend roles**, add the name of the group you created in PingOne and click **Map** to confirm the action. In our case, the backend role is ``wazuh-readonly``.

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
      - **Value**: Assign the name you gave to your group in PingOne configuration, in our case, this is ``wazuh-readonly``.

      .. thumbnail:: /images/single-sign-on/pingone/read-only/Wazuh-role-mapping-RO.png
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

#. Test the configuration. Go to your Wazuh dashboard URL and log in with your Ping One account. 
