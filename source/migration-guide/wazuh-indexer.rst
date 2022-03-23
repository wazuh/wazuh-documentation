.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Check out how to migrate your Wazuh cluster.  
  
.. _migration_guide_indexer:

Migrating to Wazuh indexer 
==========================

Follow this guide to migrate from Open Distro for Elasticsearch 1.13 to Wazuh indexer. 

.. note:: Root user privileges are required to execute all the commands described below.

#. Disable shard allocation to prevent Elasticsearch from replicating shards as you shut down nodes.

   .. code-block:: console

     curl -X PUT "https://<elasticsearch_IP>:9200/_cluster/settings"  -u <username>:<password> -k -H 'Content-Type: application/json' -d'
     {
       "persistent": {
         "cluster.routing.allocation.enable": "primaries"
       }
     }
     '

#. Stop indexing, and perform a flush: indexing/searching should be stopped and _flush can be used to permanently store information into the index which will prevent any data loss during upgrade.

   .. tabs::
   
    .. group-tab:: Systemd
   
     .. code-block:: console
   
      # systemctl stop filebeat
   
    .. group-tab:: SysV init
   
     .. code-block:: console
   
      # service filebeat stop  


   .. code-block:: console

        curl -X POST "https://<elasticsearch_IP>:9200/_flush/synced" -u <username>:<password> -k

#. Shutdown a single node: first data nodes and later master nodes.

   .. tabs::
   
    .. group-tab:: Systemd
   
     .. code-block:: console
   
      # systemctl stop elasticsearch
   
    .. group-tab:: SysV init
   
     .. code-block:: console
   
      # service elasticsearch stop 

#. Add the Wazuh repository.

    .. tabs::


      .. group-tab:: Yum


        .. include:: /_templates/installations/common/yum/add-repository.rst



      .. group-tab:: APT


        .. include:: /_templates/installations/common/deb/add-repository.rst




#. Install the Wazuh indexer. 

    .. tabs::

      .. group-tab:: Yum

          .. code-block:: console

            # yum install wazuh-indexer -y



      .. group-tab:: APT

          .. code-block:: console

            # apt install wazuh-indexer -y


#. Remove the demo certificates, copy your old certificates to the new location and give them the right ownership and permissions.   

   .. code-block:: console

       rm -f /etc/wazuh-indexer/certs/*
       cp /etc/elasticsearch/certs/elasticsearch-key.pem /etc/wazuh-indexer/certs/wazuh-indexer-key.pem
       cp /etc/elasticsearch/certs/elasticsearch.pem /etc/wazuh-indexer/certs/wazuh-indexer.pem
       cp /etc/elasticsearch/certs/admin.pem /etc/wazuh-indexer/certs/admin.pem
       cp /etc/elasticsearch/certs/admin-key.pem /etc/wazuh-indexer/certs/admin-key.pem
       cp /etc/elasticsearch/certs/root-ca.pem /etc/wazuh-indexer/certs/root-ca.pem
       chown wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs/*
       chmod 0600 /etc/wazuh-indexer/certs/* 


#. Move or copy your data to the new directories and give them the right ownership and permissions. 

   .. code-block:: console

      rm -rf /var/lib/wazuh-indexer/ /var/log/wazuh-indexer/
      mv /var/lib/elasticsearch/ /var/lib/wazuh-indexer/
      mv /var/log/elasticsearch/ /var/log/wazuh-indexer/
      chown wazuh-indexer:wazuh-indexer -R /var/log/wazuh-indexer/
      chown wazuh-indexer:wazuh-indexer -R /var/lib/wazuh-indexer/

#. Port your settings from ``/etc/elasticsearch/elasticsearch.yml`` to ``/etc/wazuh-indexer/opensearch.yml``. Most settings use the same names. At a minimum, specify ``cluster.name``, ``node.name``, ``discovery.seed_hosts``, and ``cluster.initial_master_nodes``.

    a. Replace the certificates names ``demo-indexer.pem`` and ``demo-indexer-key.pem`` with ``wazuh-indexer.pem`` and ``wazuh-indexer-key.pem`` respectively.

       .. code-block:: yaml
         :emphasize-lines: 1,2,4,5
         
          plugins.security.ssl.http.pemcert_filepath: /etc/wazuh-indexer/certs/wazuh-indexer.pem
          plugins.security.ssl.http.pemkey_filepath: /etc/wazuh-indexer/certs/wazuh-indexer-key.pem
          plugins.security.ssl.http.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
          plugins.security.ssl.transport.pemcert_filepath: /etc/wazuh-indexer/certs/wazuh-indexer.pem
          plugins.security.ssl.transport.pemkey_filepath: /etc/wazuh-indexer/certs/wazuh-indexer-key.pem
          plugins.security.ssl.transport.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
          plugins.security.ssl.http.enabled: true
          plugins.security.ssl.transport.enforce_hostname_verification: false
          plugins.security.ssl.transport.resolve_hostname: false

    b. Edit the certificate information. If you are using the default Wazuh certificates, change the Organizational Unit (OU) from ``Wazuh`` to ``Docu``.  
      
       .. code-block:: yaml
         :emphasize-lines: 2,6
 
         plugins.security.authcz.admin_dn:
         - "CN=admin,OU=Docu,O=Wazuh,L=California,C=US"
         plugins.security.check_snapshot_restore_write_privileges: true
         plugins.security.enable_snapshot_restore_privilege: true
         plugins.security.nodes_dn:
         - "CN=node-1,OU=Docu,O=Wazuh,L=California,C=US"
         #- "CN=node-2,OU=Wazuh,O=Wazuh,L=California,C=US"
         #- "CN=node-3,OU=Wazuh,O=Wazuh,L=California,C=US"      
            
#. Enable and start the Wazuh indexer.

   .. include:: /_templates/installations/indexer/common/enable_indexer.rst

#. Repeat steps 3-9 until all the nodes are upgraded (data nodes first and then master nodes). 

#. After all nodes are updated, restart Filebeat.   

   .. tabs::
   
    .. group-tab:: Systemd
   
     .. code-block:: console
   
      # systemctl restart filebeat
   
    .. group-tab:: SysV init
   
     .. code-block:: console
   
      # service filebeat restart  


#. Run the following command to verify that the communication between Filebeat and the Wazuh indexer nodes is working as expected. 

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

#. You can monitor the health of the cluster as follows.

   .. code-block:: console

     curl -X GET "https://<elasticsearch_IP>:9200/_cluster/health" -u <username>:<password> -k

#. Re-enable shard allocation.

   .. code-block:: console

      curl -X PUT "https://<elasticsearch_IP>:9200/_cluster/settings"  -u <username>:<password> -k -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": null
        }
      }
      '

#. Verify that the indexed data in Open Distro is now searchable and indexable in Wazuh indexer.


#. Uninstall Open Distro for Elasticsearch on all nodes.


   .. tabs::
   
   
     .. group-tab:: Yum
   
   
       .. include:: /_templates/installations/elastic/yum/uninstall_elasticsearch.rst
   
   
   
     .. group-tab:: APT
   
   
       .. include:: /_templates/installations/elastic/deb/uninstall_elasticsearch.rst



Your cluster is now updated. If you want to migrate to Wazuh dashboard, see the :doc:`wazuh-dashboard` section.


