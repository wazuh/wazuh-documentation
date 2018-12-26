.. Copyright (C) 2018 Wazuh, Inc.

.. _searchguard:

Search Guard
============

Search Guard gives you a robust security solution for your Elasticsearch integration. It covers from Filebeat/Logstash to Elasticsearch itself. 

This plugin has a great role base access system such X-Pack security does. Reading this guide you will learn how to secure all the connections between the Elastic stack components, creating users, defining roles and how to make the Wazuh app work fine with all this stuff.

Disable X-Pack security
^^^^^^^^^^^^^^^^^^^^^^^

Currently, it's not supported to use both integrations at the same time. If your environment is currently using any X-Pack security feature, you must disable it before continue reading this guide.

For Elasticsearch you need to edit the file */etc/elasticsearch/elasticsearch.yml* in all your nodes and add the next line:

.. code-block:: console
    
    xpack.security.enabled: false 

Now restart Elasticsearch service:

.. code-block:: console

    # systemctl restart elasticsearch

For Kibana you need to edit the file */etc/kibana/kibana.yml* and add the next line:

.. code-block:: console

    xpack.security.enabled: false 

Now restart Kibana service:

.. code-block:: console

    # systemctl restart kibana

Setting up Search Guard for Logstash
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Our default configuration is not using authentication for Logstash so we need to configure it properly. Edit your Logstash configuration file (located at /etc/logstash/conf.d/01-wazuh.conf):

1. Stop Logstash service:

.. code-block:: console

    # systemctl stop logstash

2. Look for the output section and replace it with the following content:

.. code-block:: console

    output {
        elasticsearch {
            hosts => ["ELASTICSEARCH_HOST:9200"]
            index => "wazuh-alerts-3.x-%{+YYYY.MM.dd}"
            document_type => "wazuh"
            user => logstash
            password => logstash
            ssl => true
            ssl_certificate_verification => false
        }
    }

3. Restart Logstash.

.. code-block:: console

    # systemctl restart logstash

.. warning::

    This configuration must be applied for all your Logstash configurations, replace specific fields such as hosts or index depending on your Logstash location and requirements.

Setting up Search Guard for Elasticsearch
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Search Guard must fit the Elasticsearch version like any other component from the Elastic stack. Versioning is a bit different for Search Guard, please check your version at https://docs.search-guard.com/latest/search-guard-versions.

The versioning syntaxis for Search Guard is as follow:

.. code-block:: console

    com.floragunn:search-guard-6:<elastic_version>-<searchguard_version>

This documentation is designed for our latest supported version, it's 6.5.4 so our right version is:

.. code-block:: console

    com.floragunn:search-guard-6:6.5.4-24.0

Since Search Guard is a plugin, we must install it such other Elasticsearch plugins:

.. code-block:: console

    sudo -u elasticsearch \
    /usr/share/elasticsearch/bin/elasticsearch-plugin install \
    -b com.floragunn:search-guard-6:6.5.4-24.0

Search Guard comes with a demo configuration and it's useful as starting point so let's install the demo configuration:

.. code-block:: console

    $ cd /usr/share/elasticsearch/plugins/search-guard-6/tools/
    $ chmod a+x install_demo_configuration.sh
    # ./install_demo_configuration.sh
    Install demo certificates? [y/N] y
    Initialize Search Guard? [y/N] y
    Enable cluster mode? [y/N] y

Restart Elasticsearch service:

.. code-block:: console

    # systemctl restart elasticsearch

You can check if it's working as expected using the next request (Search Guard needs about two minutes to create its internal indices so be patient):

.. code-block:: console

    $ curl -k -u admin:admin https://<ELASTICSEARCH_HOST>:9200/_searchguard/authinfo?pretty
    {
    "user" : "User [name=admin, roles=[admin], requestedTenant=null]",
    "user_name" : "admin",
    "user_requested_tenant" : null,
    "remote_address" : "10.0.0.4:46378",
    "backend_roles" : [
        "admin"
    ],
    "custom_attribute_names" : [
        "attr.internal.attribute1",
        "attr.internal.attribute2",
        "attr.internal.attribute3"
    ],
    "sg_roles" : [
        "sg_all_access",
        "sg_own_index"
    ],
    "sg_tenants" : {
        "admin_tenant" : true,
        "admin" : true
    },
    "principal" : null,
    "peer_certificates" : "0",
    "sso_logout_url" : null
    }

Setting up Search Guard roles
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Search Guard works using core roles. Core roles are used by Search Guard user roles. Finally, user roles are used by Search Guard users. 

- Roles file
    - Core roles used under the hood by Search Guard
    - /usr/share/elasticsearch/plugins/search-guard-6/sgconfig/sg_roles.yml
- Role mapping 
    - Roles used by the Search Guard users. These roles can group multiple core roles.
    - /usr/share/elasticsearch/plugins/search-guard-6/sgconfig/sg_roles_mapping.yml
- Internal users
    - /usr/share/elasticsearch/plugins/search-guard-6/sgconfig/sg_internal_users.yml
    - These are the users that all the components will use. Each component uses a different user with its own roles. 

Logstash role
^^^^^^^^^^^^^

Logstash has its own predefined user and its own predefined role. Since Wazuh creates custom Elasticsearch indices using the *wazuh-alerts-3.x-\** prefix you must add that index prefix to the Logstash role.

1. Edit the Logstash role, located at /usr/share/elasticsearch/plugins/search-guard-6/sgconfig/sg_roles.yml

.. code-block:: console

    sg_logstash:
        cluster:
            - CLUSTER_MONITOR
            - CLUSTER_COMPOSITE_OPS
            - indices:admin/template/get
            - indices:admin/template/put
        indices:
            'logstash-*':
                '*':
                    - CRUD
                    - CREATE_INDEX
            '*beat*': 
                '*':
                    - CRUD
                    - CREATE_INDEX
            'wazuh-alerts-3?x-*':
                '*':
                    - CRUD
                    - CREATE_INDEX

.. note::
    Dots are replaced by ``?`` for Search Guard roles, so ``3?x`` actually means ``3.x``.

2. Apply the changes:

.. code-block:: console

    # /usr/share/elasticsearch/plugins/search-guard-6/tools/sgadmin.sh \ 
    -cd /usr/share/elasticsearch/plugins/search-guard-6/sgconfig -icl -key \
    /etc/elasticsearch/kirk-key.pem -cert /etc/elasticsearch/kirk.pem -cacert \
    /etc/elasticsearch/root-ca.pem -h <ELASTICSEARCH_HOST> -nhnv

.. warning::

    In production environments flag `-nhnv` is not recommended because it ignores certificate issues.

3. Restart Elasticsearch and Logstash services:

.. code-block:: console

    # systemctl restart elasticsearch
    # systemctl restart logstash

At this point you have your Elasticsearch cluster secured using `user:password` authentication and encrypted communication. This means any Logstash pointing to some Elasticsearch node must be authenticated. Also, any request to the Elasticsearch API must use `https` plus `user:password` authentication.

See https://docs.search-guard.com/latest/roles-permissions for details.

Setting up Search Guard for Kibana
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Kibana needs the Search Guard plugin too. Plugin versioning works like Elasticsearch plugins versioning, this means you must fit exactly your Kibana version. 

1. Install the plugin as usual:

.. code-block:: console

    $ sudo -u kibana NODE_OPTIONS="--max-old-space-size=3072" /usr/share/kibana/bin/kibana-plugin install https://search.maven.org/remotecontent?filepath=com/floragunn/search-guard-kibana-plugin/6.5.4-17/search-guard-kibana-plugin-6.5.4-17.zip

2. Edit the Kibana configuration file, it's located at */etc/kibana/kibana.yml*, add the following lines:

.. code-block:: console

    # Elasticsearch URL
    elasticsearch.url: "https://<ELASTICSEARCH_HOST>:9200" 

    # Credentials
    elasticsearch.username: "admin" 
    elasticsearch.password: "admin"

    # Disable SSL verification because we use self-signed demo certificates
    elasticsearch.ssl.verificationMode: none 

    # Whitelist the Search Guard Multi Tenancy Header
    elasticsearch.requestHeadersWhitelist: [ "Authorization" , "sgtenant" ]

Now you can access your Kibana UI as usual and it will prompt for a login. You can access it using the already existing one user named `admin`. 

Next steps we'll learn how to define new Kibana UI users and how to define specific roles for all of them depending on their needs.

See https://search.maven.org/search?q=g:com.floragunn%20AND%20a:search-guard-kibana-plugin for details.

Kibana UI and the Wazuh app
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh app needs to manage `.wazuh` and `.wazuh-version` indices in order to work properly. The index `.wazuh-version` is used by the server side. The index `.wazuh` stores Wazuh API entries.

.. warning::

    Follow the next steps at only one master node from your Elasticsearch cluster. 

**Wazuh app user**

1. Create a new Search Guard core role in */usr/share/elasticsearch/plugins/search-guard-6/sgconfig/sg_roles.yml*

.. code-block:: console

  sg_wazuh_admin:
    cluster:
      - indices:data/read/mget
      - indices:data/read/msearch
      - indices:data/read/search
      - indices:data/read/field_caps
      - CLUSTER_COMPOSITE_OPS
    indices:
      '?kiban*':
        '*':
          - MANAGE
          - INDEX
          - READ
          - DELETE
      '?wazuh':
        '*':
          - MANAGE
          - INDEX
          - READ
          - DELETE      
      '?wazuh-version':
        '*':
          - MANAGE
          - INDEX
          - READ
          - DELETE

      'wazuh-alerts-3?x-*':
        '*':
          - indices:admin/mappings/fields/get
          - indices:admin/validate/query
          - indices:data/read/search
          - indices:data/read/msearch
          - indices:data/read/field_stats
          - indices:data/read/field_caps
          - READ
          - SEARCH            
      
      'wazuh-monitoring*':
        '*':
          - indices:admin/mappings/fields/get
          - indices:admin/validate/query
          - indices:data/read/search
          - indices:data/read/msearch
          - indices:data/read/field_stats
          - indices:data/read/field_caps
          - READ
          - SEARCH

2. Create a hash for your password

.. code-block:: console

  bash /usr/share/elasticsearch/plugins/search-guard-6/tools/hash.sh -p yourpassword

3. Create a new user in */usr/share/elasticsearch/plugins/search-guard-6/sgconfig/sg_internal_users.yml* using the hash from step 2.

.. code-block:: console

  wazuhadmin:
    hash: $2a$12$VcCDgh2NDk07JGN0rjGbM.Ad41qVR/YFJcgHp0UGns5JDymv..TOG
    roles:
      - wazuhadmin_role

4. Set the role mapping for Search Guard roles in */usr/share/elasticsearch/plugins/search-guard-6/sgconfig/sg_roles_mapping.yml*

.. code-block:: console

  sg_wazuh_admin:
    backendroles:
      - wazuhadmin_role

5. Apply the changes:

.. code-block:: console

    # /usr/share/elasticsearch/plugins/search-guard-6/tools/sgadmin.sh \ 
    -cd /usr/share/elasticsearch/plugins/search-guard-6/sgconfig -icl -key \
    /etc/elasticsearch/kirk-key.pem -cert /etc/elasticsearch/kirk.pem -cacert \
    /etc/elasticsearch/root-ca.pem -h <ELASTICSEARCH_HOST> -nhnv 

**Brief summary for Kibana**

Now you have two Kibana users:

- The Kibana server uses the predefined `admin` user from Search Guard (/etc/kibana/kibana.yml).
- The Kibana UI `wazuhadmin` user can see all and modify `.wazuh` index.

How it goes in the Wazuh app?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The main difference is that you now must log in before entering Kibana. Also keep in mind that if the user is not allowed for certain indices, it can't use them on Kibana.

.. thumbnail:: ../../images/kibana-app/searchguard/searchguard-01.png
    :align: center
    :width: 100%

Reference
^^^^^^^^^

- https://docs.search-guard.com
- https://github.com/floragunncom/search-guard
