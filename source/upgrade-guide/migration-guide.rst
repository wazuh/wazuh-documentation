.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Check out how to migrate your Wazuh cluster.  
  
.. _migration_guide_indexer_dashboard:

Migrating to Wazuh indexer 
==========================

Follow this guide to migrate from Open Distro for Elasticsearch 1.13.2 to Wazuh indexer. 

.. note:: Root user privileges are required to execute all the commands described below.

#. Disable shard allocation: during upgrade we do not want any shard movement as the cluster will be taken down.

   .. code-block:: console

     curl -X PUT "https://127.0.0.1:9200/_cluster/settings"  -u admin:admin -k -H 'Content-Type: application/json' -d'
     {
       "persistent": {
         "cluster.routing.allocation.enable": "primaries"
       }
     }
     '

#. Stop indexing, and perform a flush: as the cluster will be taken down, indexing/searching should be stopped and _flush can be used to permanently store information into the index which will prevent any data loss during upgrade.

   .. code-block:: console

     curl -X POST "https://127.0.0.1:9200/_flush/synced" -u admin:admin -k

#. Shutdown all the nodes.

   .. code-block:: console

     # systemctl stop elasticsearch filebeat kibana

#. Add Wazuh repository. (dev)

    .. tabs::


      .. group-tab:: Yum


        .. include:: /_templates/installations/common/yum/add-repository.rst



      .. group-tab:: APT


        .. include:: /_templates/installations/common/deb/add-repository.rst




#. Install Wazuh indexer. 

    .. tabs::

      .. group-tab:: Yum

          .. code-block:: console

            # yum install -y wazuh-indexer



      .. group-tab:: APT

          .. code-block:: console

            # apt install wazuh-indexer


#. Remove demo certificates, copy your old certificates to the new location and give them the right ownership and permissions.   

   .. code-block:: console

       rm -f /etc/wazuh-indexer/certs/*
       cp /etc/elasticsearch/certs/elasticsearch-key.pem /etc/wazuh-indexer/certs/wazuh-indexer-key.pem
       cp /etc/elasticsearch/certs/elasticsearch.pem /etc/wazuh-indexer/certs/wazuh-indexer.pem
       cp /etc/elasticsearch/certs/admin.pem /etc/wazuh-indexer/certs/admin.pem
       cp /etc/elasticsearch/certs/admin-key.pem /etc/wazuh-indexer/certs/admin-key.pem
       cp /etc/elasticsearch/certs/root-ca.pem /etc/wazuh-indexer/certs/root-ca.pem
       chown wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs/*
       chmod 0600  /etc/wazuh-indexer/certs/* 


#. Move your data. 

   .. code-block:: console

      rmdir /var/lib/wazuh-indexer/ /var/log/wazuh-indexer/
      mv /var/lib/elasticsearch/ /var/lib/wazuh-indexer/
      mv /var/log/elasticsearch/ /var/log/wazuh-indexer/
      chown wazuh-indexer:wazuh-indexer -R /var/log/wazuh-indexer/
      chown wazuh-indexer:wazuh-indexer -R /var/lib/wazuh-indexer/

#. Edit ``/etc/wazuh-indexer/opensearch.yml``      

   .. code-block:: yaml
      :emphasize-lines: 2,4,19,20,22,23,31,35

       network.host: "0.0.0.0"
       node.name: "node-1"
       cluster.initial_master_nodes:
       - "node-1"
       #- "node-2"
       #- "node-3"
       cluster.name: "wazuh-cluster"
       #discovery.seed_hosts:
       #  - "node-1-ip"
       #  - "node-2-ip"
       #  - "node-3-ip"
       http.port: 9700-9799
       transport.tcp.port: 9800-9899
       node.max_local_storage_nodes: "3"
       path.data: /var/lib/wazuh-indexer
       path.logs: /var/log/wazuh-indexer
       
       
       plugins.security.ssl.http.pemcert_filepath: /etc/wazuh-indexer/certs/wazuh-indexer.pem
       plugins.security.ssl.http.pemkey_filepath: /etc/wazuh-indexer/certs/wazuh-indexer-key.pem
       plugins.security.ssl.http.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
       plugins.security.ssl.transport.pemcert_filepath: /etc/wazuh-indexer/certs/wazuh-indexer.pem
       plugins.security.ssl.transport.pemkey_filepath: /etc/wazuh-indexer/certs/wazuh-indexer-key.pem
       plugins.security.ssl.transport.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
       plugins.security.ssl.http.enabled: true
       plugins.security.ssl.transport.enforce_hostname_verification: false
       plugins.security.ssl.transport.resolve_hostname: false
       
       plugins.security.audit.type: internal_opensearch
       plugins.security.authcz.admin_dn:
       - "CN=admin,OU=Docu,O=Wazuh,L=California,C=US"
       plugins.security.check_snapshot_restore_write_privileges: true
       plugins.security.enable_snapshot_restore_privilege: true
       plugins.security.nodes_dn:
       - "CN=node-1,OU=Docu,O=Wazuh,L=California,C=US"
       #- "CN=node-2,OU=Docu,O=Wazuh,L=California,C=US"
       #- "CN=node-3,OU=Docu,O=Wazuh,L=California,C=US"
       plugins.security.restapi.roles_enabled:
       - "all_access"
       - "security_rest_api_access"
       
       plugins.security.system_indices.enabled: true
       plugins.security.system_indices.indices: [".opendistro-alerting-config", ".opendistro-alerting-alert*", ".opendistro-anomaly-results*", ".opendistro-anomaly-detector*", ".opendistro-anomaly-checkpoints", ".opendistro-anomaly-detection-state", ".opendistro-reports-*", ".opendistro-notifications-*", ".opendistro-notebooks", ".opensearch-observability", ".opendistro-asynchronous-search-response*", ".replication-metadata-store"]
       
       ### Option to allow Filebeat-oss 7.10.2 to work ###
       compatibility.override_main_response_version: true

#. Start and enable the Wazuh indexer.

   .. include:: /_templates/installations/indexer/common/enable_indexer.rst

#. Edit filebeat configuration ``/etc/filebeat/filebeat.yml`` to point to the new Wazuh indexer node (port 9700).    

   .. code-block:: yaml
      :emphasize-lines: 3
      
      # Wazuh - Filebeat configuration file
      output.elasticsearch.hosts:
              - 127.0.0.1:9700
      #        - <elasticsearch_ip_node_2>:9700 
      #        - <elasticsearch_ip_node_3>:9700
      
      output.elasticsearch:
        protocol: https
        username: wazuh
        password: 8UIHLfIY4iGlQNy_zOEvnzzvIq7B17TS
        ssl.certificate_authorities:
          - /etc/filebeat/certs/root-ca.pem
        ssl.certificate: "/etc/filebeat/certs/filebeat.pem"
        ssl.key: "/etc/filebeat/certs/filebeat-key.pem"
      setup.template.json.enabled: true
      setup.template.json.path: '/etc/filebeat/wazuh-template.json'
      setup.template.json.name: 'wazuh'
      setup.ilm.overwrite: true
      setup.ilm.enabled: false
      
      filebeat.modules:
        - module: wazuh
          alerts:
            enabled: true
          archives:
            enabled: false
      
      
#. Run the following command to verify that Filebeat is successfully configured.

     .. code-block:: console

        # filebeat test output
     
     .. code-block:: none
          :class: output
     
          elasticsearch: https://127.0.0.1:9700...
            parse url... OK
            connection...
              parse host... OK
              dns lookup... OK
              addresses: 127.0.0.1
              dial up... OK
            TLS...
              security: server's certificate chain verification is enabled
              handshake... OK
              TLS version: TLSv1.3
              dial up... OK
            talk to server... OK
            version: 7.10.2

#. Restart Filebeat.   

   .. tabs::
   
    .. group-tab:: Systemd
   
     .. code-block:: console
   
      # systemctl restart filebeat
   
    .. group-tab:: SysV init
   
     .. code-block:: console
   
      # service filebeat restart  



#. Install the Wazuh dashboard package.

      .. tabs::

          .. group-tab:: Yum


              .. include:: /_templates/installations/dashboard/yum/install_dashboard.rst



          .. group-tab:: APT


              .. include:: /_templates/installations/dashboard/apt/install_dashboard.rst



#. Remove demo certificates and copy your old certificates. 

   .. code-block:: console

     rm -f /etc/wazuh-dashboard/certs/*
     cp /etc/kibana/certs/kibana.pem /etc/wazuh-dashboard/certs/wazuh-dashboard.pem
     cp /etc/kibana/certs/kibana-key.pem /etc/wazuh-dashboard/certs/wazuh-dashboard-key.pem
     cp /etc/kibana/certs/root-ca.pem /etc/wazuh-dashboard/certs/root-ca.pem
     chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs/*

#. Edit the ``/etc/wazuh-dashboard/dashboard.yml`` file.

    .. code-block:: yaml
      :emphasize-lines: 1,3

          server.host: 0.0.0.0
          server.port: 443
          opensearch.hosts: https://localhost:9700
          opensearch.ssl.verificationMode: certificate
          #opensearch.username: 
          #opensearch.password: 
          opensearch.requestHeadersWhitelist: ["securitytenant","Authorization"]
          opensearch_security.multitenancy.enabled: true
          opensearch_security.readonly_mode.roles: ["kibana_read_only"]
          server.ssl.enabled: true
          server.ssl.key: "/etc/wazuh-dashboard/certs/wazuh-dashboard-key.pem"
          server.ssl.certificate: "/etc/wazuh-dashboard/certs/wazuh-dashboard.pem"
          opensearch.ssl.certificateAuthorities: ["/etc/wazuh-dashboard/certs/root-ca.pem"]
          logging.dest: "/var/log/wazuh-dashboard/wazuh-dashboard.log"
          uiSettings.overrides.defaultRoute: /app/wazuh?security_tenant=global

#. Add your password for the kibanaserver user in the Wazuh dashboard keystore. You may find your old password in ``/etc/kibana/kibana.yml``. 

    .. code-block:: console

      /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore --allow-root add opensearch.password    

#. Enable and start the Wazuh dashboard service.

      .. include:: /_templates/installations/dashboard/enable_dashboard.rst            

#. Edit the file ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` with your Wazuh manager information.  

    .. code-block:: yaml

      hosts:
        - default:
          url: https://localhost
          port: 55000
          username: wazuh-wui
          password: wazuh-wui
          run_as: false

#. Verify that the existing cluster is still green and healthy.

#. Start each upgraded node: if the cluster has dedicated master nodes, start them first, and make sure the master is elected before data nodes are started. You can monitor the health of the cluster as follows.

   .. code-block:: console

     curl -X GET "https://127.0.0.1:9700/_cluster/health" -u admin:admin -k

#. Re-enable shard allocation:

   .. code-block:: console

      curl -X PUT "https://127.0.0.1:9700/_cluster/settings"  -u admin:admin -k -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": null
        }
      }
      '

#. Verify that the indexed data in Open Distro is now searchable and indexable in Wazuh indexer.


#. Uninstall Open Distro for Elasticsearch.


   .. tabs::
   
   
     .. group-tab:: Yum
   
   
       .. include:: /_templates/installations/elastic/yum/uninstall_elasticsearch.rst
   
   
   
     .. group-tab:: APT
   
   
       .. include:: /_templates/installations/elastic/deb/uninstall_elasticsearch.rst




#. Uninstall Kibana.

    .. tabs::
    
    
      .. group-tab:: Yum
    
    
        .. include:: /_templates/installations/elastic/yum/uninstall_kibana.rst
    
    
    
      .. group-tab:: APT
    
    
        .. include:: /_templates/installations/elastic/deb/uninstall_kibana.rst



You did it! Your cluster is now upgraded via a Restart Upgrade.


