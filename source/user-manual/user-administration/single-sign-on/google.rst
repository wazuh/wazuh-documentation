.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Google Workspace is a collection of cloud computing, productivity and collaboration tools. Learn more about it in this section of the Wazuh documentation.

.. _google:

Google
======

`Google Workspace <https://workspace.google.com/>`_, developed and marketed by Google, is a collection of cloud computing, productivity, and collaboration tools.  In this guide, we integrate Google IdP to authenticate users into the Wazuh platform. 

There are three stages in the single sign-on integration.

#. Google Configuration
#. Wazuh indexer configuration
#. Wazuh dashboard configuration

Google Configuration
--------------------

#. Create an account in Google Workspace. A Google Workspace account is required for this configuration. Request a free trial if you don't have a paid license.

#. Go to https://admin.google.com/ac/apps/unified and sign in with your Google Admin account.
#. Create an app with **Add custom SAML app**.

   #. Go to **Apps** > **Website and mobile apps** > **Add App**, then **Add custom SAML app**. Enter an **App name** and click **CONTINUE**.

      .. thumbnail:: /images/single-sign-on/google/01-go-to-apps.png
         :title: Go to Apps > Website and mobile apps
         :align: center
         :width: 80%

   #. Take note of the following parameters, as they will be used during the Wazuh indexer configuration:

      - **Entity ID**: This will be used later as the ``idp.entity_id``
      - Select **DOWNLOAD METADATA** and place the metadata file in the ``configuration`` directory of the Wazuh indexer. The path to the directory is ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/``.

      .. thumbnail:: /images/single-sign-on/google/02-take-note-of-the-parameters.png
         :title: Take note of the parameters
         :align: center
         :width: 80%
   
   #. Select **CONTINUE** and configure the following:

      - **ACS URL**: ``https://<WAZUH_DASHBOARD_URL>/_opendistro/_security/saml/acs``. Replace the Wazuh dashboard URL field with the appropriate URL or IP address.
      - **Entity ID**: Use any name here. This will be the ``sp.entity_id`` in the Wazuh indexer configuration file. In our case, the value is ``wazuh-saml``.
      - **Certificate**: Copy the blob of the certificate excluding the ``-----BEGIN CERTIFICATE-----`` and ``-----END CERTIFICATE-----`` lines. This will be our ``exchange_key`` in the Wazuh indexer configuration file.

      .. thumbnail:: /images/single-sign-on/google/03-select-continue-and-configure.png
         :title: Select CONTINUE and configure
         :align: center
         :width: 80%

   #. Leave the remaining parameters with their default values, then select **CONTINUE**.

   #. Click on **ADD MAPPING**, under Employee details, choose **Department**, under App attributes, type **Roles**, and select **FINISH**. 

      Google doesn't support sending the Group membership attribute as part of the SAML Assertion (as the other Identity Providers do). So in this example, we are going to use **Department** as the attribute whose value will be used as our ``roles_key`` in the Wazuh indexer configuration. In this case, the value for the **Department** attribute will be stored as ``Roles``.

      .. thumbnail:: /images/single-sign-on/google/04-click-on-add-mapping.png
         :title: Click on ADD MAPPING under Employee details
         :align: center
         :width: 80%

#. Turn ON access for everyone.

   #. Select the recently created app and click on **User access**.

      .. thumbnail:: /images/single-sign-on/google/05-turn-on-access-for-everyone.png
         :title: Turn ON access for everyone
         :align: center
         :width: 80%

   #. Select **ON for everyone** and click **SAVE**.

      .. thumbnail:: /images/single-sign-on/google/06-select-on-for-everyone.png
         :title: Select ON for everyone and click SAVE
         :align: center
         :width: 80%

#. Define the attribute for users.

   #. Go to **Directory** then **Users**.

      .. thumbnail:: /images/single-sign-on/google/07-define-the-attribute-for-users.png
         :title: Define the attribute for users
         :align: center
         :width: 80%

   #. Select a user,  go to **User information**, then edit **Employee information**.

      .. thumbnail:: /images/single-sign-on/google/08-select-a-user.png
         :title: Select a user
         :align: center
         :width: 80%

      .. thumbnail:: /images/single-sign-on/google/09-edit-employee-information.png
         :title: Edit Employee information
         :align: center
         :width: 80%

   #. Add a value to the **Department** field, in this example, we add ``Wazuh_access``, click on **SAVE**. This value will be used in the ``role_mapping`` file configuration.

      .. thumbnail:: /images/single-sign-on/google/10-add-a-value-to-the-department-field.png
        :title:  Add a value to the Department field
        :align: center
        :width: 80%


Wazuh indexer configuration
---------------------------

Edit the Wazuh indexer security configuration files. We recommend that you back up these files before you carry out the configuration.

#. Place the ``Google_Metadata.xml`` file within the ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/`` directory. Set the file ownership to ``wazuh-indexer`` using the following command:

   .. code-block:: console

      # chown wazuh-indexer:wazuh-indexer /usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/Google_Metadata.xml

#. Edit the ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/config.yml`` file and change the following values:
   
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
                    metadata_file: “/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/Google_Metadata.xml”
                    entity_id: “https://accounts.google.com/o/saml2?idpid=C02…”
                  sp:
                    entity_id: wazuh-saml
                  kibana_url: https://<WAZUH_DASHBOARD_ADDRESS>
                  roles_key: Roles
                  exchange_key: 'MIICajCCAdOgAwIBAgIBAD.........'
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
   
   Map the ``Department`` field value that was obtained in Google IdP to the ``all_access`` role in the Wazuh indexer:

   .. code-block:: console
      :emphasize-lines: 6

      all_access:
        reserved: false
        hidden: false
        backend_roles:
        - "admin"
        - "Wazuh_access"
        description: "Maps admin and Wazuh_access to all_access"

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

#. Ensure that ``run_as`` is set to false in the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` configuration file.

   .. code-block:: yaml
      :emphasize-lines: 7

      hosts:
        - default:
            url: https://localhost
            port: 55000
            username: wazuh-wui
            password: "<wazuh-wui-password>"
            run_as: false

#. Restart the Wazuh dashboard service using this command:

   .. include:: /_templates/common/restart_dashboard.rst

#. Test the configuration. Go to your Wazuh dashboard URL and log in with your Google Workspace account. 
