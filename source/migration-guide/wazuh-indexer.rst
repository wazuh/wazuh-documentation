.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Check out how to migrate your Wazuh cluster.  
  
.. _migration_guide_indexer:

Migrating to Wazuh indexer 
==========================

Follow this guide to migrate from Open Distro for Elasticsearch 1.13.2 to Wazuh indexer. 

.. note:: Root user privileges are required to execute all the commands described below.

#. Disable shard allocation: during upgrade we do not want any shard movement as the cluster will be taken down. In the commands below ``127.0.0.1`` IP address is used. If Elasticsearch is bound to a specific IP address, replace ``127.0.0.1`` with your Elasticsearch IP address. Replace ``<username>:<password>`` with your Elasticsearch username and password. 

   .. code-block:: console

     curl -X PUT "https://127.0.0.1:9200/_cluster/settings"  -u <username>:<password> -k -H 'Content-Type: application/json' -d'
     {
       "persistent": {
         "cluster.routing.allocation.enable": "primaries"
       }
     }
     '

#. Stop indexing, and perform a flush: as the cluster will be taken down, indexing/searching should be stopped and _flush can be used to permanently store information into the index which will prevent any data loss during upgrade.

   .. code-block:: console

     curl -X POST "https://127.0.0.1:9200/_flush/synced" -u <username>:<password> -k

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
       chmod 0600 /etc/wazuh-indexer/certs/* 


#. Move your data. 

   .. code-block:: console

      rm -rf /var/lib/wazuh-indexer/ /var/log/wazuh-indexer/
      mv /var/lib/elasticsearch/ /var/lib/wazuh-indexer/
      mv /var/log/elasticsearch/ /var/log/wazuh-indexer/
      chown wazuh-indexer:wazuh-indexer -R /var/log/wazuh-indexer/
      chown wazuh-indexer:wazuh-indexer -R /var/lib/wazuh-indexer/

#. Port your settings from ``/etc/elasticsearch/elasticsearch.yml`` to ``/etc/wazuh-indexer/opensearch.yml``. Most settings use the same names. At a minimum, specify ``cluster.name``, ``node.name``, ``discovery.seed_hosts``, and ``cluster.initial_master_nodes``.

    #. Replace the certificates names ``demo-indexer.pem`` and ``demo-indexer-key.pem`` with ``wazuh-indexer.pem`` and ``wazuh-indexer-key.pem`` respectively.

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

    #. Edit the certificate information. If you are using the default Wazuh certificates, change the Organizational Unit (OU) from ``Wazuh`` to ``Docu``.  
      
       .. code-block:: yaml
         :emphasize-lines: 2
 
          plugins.security.nodes_dn:
          - "CN=node-1,OU=Docu,O=Wazuh,L=California,C=US"
          #- "CN=node-2,OU=Wazuh,O=Wazuh,L=California,C=US"
          #- "CN=node-3,OU=Wazuh,O=Wazuh,L=California,C=US"      
   
#. Start and enable the Wazuh indexer.

   .. include:: /_templates/installations/indexer/common/enable_indexer.rst

#. Restart Filebeat.   

   .. tabs::
   
    .. group-tab:: Systemd
   
     .. code-block:: console
   
      # systemctl restart filebeat
   
    .. group-tab:: SysV init
   
     .. code-block:: console
   
      # service filebeat restart  


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


#. Verify that the existing cluster is still green and healthy.

#. Start each upgraded node: if the cluster has dedicated master nodes, start them first, and make sure the master is elected before data nodes are started. You can monitor the health of the cluster as follows.

   .. code-block:: console

     curl -X GET "https://127.0.0.1:9200/_cluster/health" -u <username>:<password> -k

#. Re-enable shard allocation:

   .. code-block:: console

      curl -X PUT "https://127.0.0.1:9200/_cluster/settings"  -u <username>:<password> -k -H 'Content-Type: application/json' -d'
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



Your cluster is now upgraded via a Restart Upgrade. If you want to migrate to Wazuh dashboard, see the :doc:`wazuh-indexer` section.


