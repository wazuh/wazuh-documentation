.. _ossec_wazuh_elasticsearch:

Elasticsearch
=============

In this guide we will describe how to install Elasticsearch, version 1.7, as a single-node cluster (with no shard replicas). This is usally enough to process OSSEC alerts data. For very large deployments we recommend to actually use a multi-node cluster, which provides load balancing and data replication. 

.. topic:: Single-host vs distributed deployments

		As a reminder, for a single-host OSSEC integration with ELK Stack, we run all components in the same server, which also behaves as a single-node Elasticsearch cluster. On the other hand, for distributed deployments, we recommend to run Elasticsearch engine and the OSSEC manager in different systems. Please go to :ref:`components and architecture documentation <ossec_wazuh_architecture>` for more information.

Elasticsearch installation on Debian
------------------------------------

To install Elasticsearch version 1.7 Debian package, using official repositories run the following commands: ::

 $ wget -qO - https://packages.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
 $ echo "deb http://packages.elastic.co/elasticsearch/1.7/debian stable main" | sudo tee -a /etc/apt/sources.list.d/elasticsearch-1.7.list
 $ sudo apt-get update && sudo apt-get install elasticsearch
 $ sudo update-rc.d elasticsearch defaults 95 10

Elasticsearch installation on CentOS
------------------------------------

To install Elasticsearch version 1.7 RPM package. Lets start importing the repository GPG key: ::

 $ sudo rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch

Then we create ``/etc/yum.repos.d/elasticsearch.repo`` file with the following content: ::

 [elasticsearch-1.7]
 name=Elasticsearch repository for 1.7.x packages
 baseurl=http://packages.elastic.co/elasticsearch/1.7/centos
 gpgcheck=1
 gpgkey=http://packages.elastic.co/GPG-KEY-elasticsearch
 enabled=1

And we can now install the RPM package with yum: ::

 $ sudo yum install elasticsearch

Finally configure Elasticsearch to automatically start during bootup:

- If your distribution is using SysV init, then you will need to run: ::

   $ sudo chkconfig --add elasticsearch
 
- If your distribution is using Systemd: ::

   $ sudo /bin/systemctl daemon-reload
   $ sudo /bin/systemctl enable elasticsearch.service

Configuration and tuning
------------------------

Once the installation is completed, we can now configure some basic settings modifiying ``/etc/elasticsearch/elasticsearch.yml``. Open this file and look for the following varialbles, uncommenting the lines and assigning them the right values (substitute ``elasticsearch_server_ip`` by your server IP address): ::

 cluster.name: ossec
 node.name: ossec_node1

 network.bind_host: 0.0.0.0

 network.public_host: elasticsearch_server_ip

 network.host: elasticsearch_server_ip

 host.port: 9200

 discovery.zen.ping.multicast.enabled: false
 discovery.zen.ping.timeout: 15s

 index.number_of_shards: 1
 index.number_of_replicas: 0

 bootstrap.mlockall: true

Now, in order to increase Elasticsearch engine performance, we add the following lines at the end of ``/etc/security/limits.conf`` file: ::

 elasticsearch - nofile  65535    
 elasticsearch - memlock unlimited

As well, open your Elasticsearch service default configuration file (``/etc/default/elasticsearch`` on Debian, and ``/etc/sysconfig/elasticsearch`` on CentOS) and edit the following settings (please notice that ``ES_HEAP_SIZE`` should be set to half your server memory): ::

 # ES_HEAP_SIZE - Set it to half your system RAM memory
 ES_HEAP_SIZE=8g

 MAX_LOCKED_MEMORY=unlimited 

 MAX_OPEN_FILES=65535

If your server uses Systemd, edit ``/usr/lib/systemd/system/elasticsearch.service`` and uncomment the followign line: ::

 LimitMEMLOCK=infinity

Now we are done with Elasticsearch configuration and tuning, and we can restart the service to apply changes: ::

 $ sudo /etc/init.d/elasticsearch start


.. topic:: Elasticsearch multi-node cluster

 		Elasticsearch uses port 9200/tcp (by default) for API queries and ports in the range 9300-9400/tcp to communicate with other cluster nodes. Remember to open this ports in your firewall for this type of deployments. 

 		On the other hand, for multi-node clusters, it is recommended to have as many number of shards per index (``index.number_of_shards``) as nodes you have in your cluster. And it is also a good practice to use at least one replica (``index.number_of_replicas``).

Cluster health
--------------

To be sure our single-node cluster is working properly, lets first check if Elasticsearch is running: ::

  $ curl -XGET localhost:9200

Expected result: ::

  {
    "status" : 200,
    "name" : "ossec_node1",
    "cluster_name" : "ossec",
    "version" : {
      "number" : "1.7.2",
      "build_hash" : "e43676b1385b8125d647f593f7202acbd816e8ec",
      "build_timestamp" : "2015-09-14T09:49:53Z",
      "build_snapshot" : false,
      "lucene_version" : "4.10.4"
    },
    "tagline" : "You Know, for Search"
  }

Elasticsearch cluster health status: ::

  $ curl -XGET 'http://localhost:9200/_cluster/health?pretty=true'

Expected result: ::

  {
    "cluster_name" : "ossec",
    "status" : "green",
    "timed_out" : false,
    "number_of_nodes" : 2,
    "number_of_data_nodes" : 1,
    "active_primary_shards" : 0,
    "active_shards" : 0,
    "relocating_shards" : 0,
    "initializing_shards" : 0,
    "unassigned_shards" : 0,
    "delayed_unassigned_shards" : 0,
    "number_of_pending_tasks" : 0,
    "number_of_in_flight_fetch" : 0
  }

OSSEC alerts template
---------------------

It's time to integrate OSSEC Wazuh custom mapping. It's an Elasticsearch template that has already mapped all posible OSSEC alert fields, as they are generated by :ref:`OSSEC Wazuh fork <ossec_wazuh_manager>` JSON Output. This way the indexer will automatically know how to process the data, which will be displayed with user-friendly names on your Kibana interface.

Add the template by a *CURL* request to Elastic API: ::

 $ cd ~/ossec_tmp/ossec-wazuh/extensions/elasticsearch/ && curl -XPUT "http://localhost:9200/_template/ossec/" -d "@elastic-ossec-template.json"
      
If everything was okey, the API response should be: ::

 {"acknowledged":true}

To make sure it has actually been added successfully, you can check the template using Elasticsearch API: ::

 $ curl -XGET http://localhost:9200/_template/ossec?pretty

Next steps
----------

Once you have Elasticsearch installed and configured you can move forward with Kibana:

* :ref:`Kibana <ossec_wazuh_kibana>`
* :ref:`OSSEC RESTful API <ossec_wazuh_api>`
* :ref:`OSSEC rule set <ossec_rule_set>`