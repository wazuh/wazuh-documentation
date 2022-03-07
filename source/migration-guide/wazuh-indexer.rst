.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Check out how to migrate your Wazuh cluster.  
  
.. _migration_guide_indexer:

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

     # systemctl stop elasticsearch filebeat

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

      
#. Run the following command to verify that Filebeat is successfully configured.

     .. code-block:: console

        # filebeat test output
     
     .. code-block:: none
          :class: output
     
          elasticsearch: https://127.0.0.1:9200...
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


#. Verify that the existing cluster is still green and healthy.

#. Start each upgraded node: if the cluster has dedicated master nodes, start them first, and make sure the master is elected before data nodes are started. You can monitor the health of the cluster as follows.

   .. code-block:: console

     curl -X GET "https://127.0.0.1:9200/_cluster/health" -u admin:admin -k

#. Re-enable shard allocation:

   .. code-block:: console

      curl -X PUT "https://127.0.0.1:9200/_cluster/settings"  -u admin:admin -k -H 'Content-Type: application/json' -d'
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



You did it! Your cluster is now upgraded via a Restart Upgrade. 


