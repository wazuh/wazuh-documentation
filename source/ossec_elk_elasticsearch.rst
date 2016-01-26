.. _ossec_elk_elasticsearch:

Elasticsearch
=============

In this guide we will describe how to install Elasticsearch, version 1.7, as a single-node cluster (with no shard replicas). This is usally enough to process OSSEC alerts data. For very large deployments we recommend to actually use a multi-node cluster, which provides load balancing and data replication. 

.. topic:: Single-host vs distributed deployments

		As a reminder, for a single-host OSSEC integration with ELK Stack, we run all components in the same server, which also act as an Elasticsearch single-node cluster. On the other hand, for distributed deployments, we recommend to run the Elasticsearch engine and the OSSEC manager in different systems. Please go to :ref:`components and architecture documentation <ossec_elk_architecture>` for more information.

Elasticsearch installation on Debian
------------------------------------

To install the Elasticsearch version 2.x Debian package, using official repositories run the following commands: ::

 $ wget -qO - https://packages.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
 $ echo "deb http://packages.elastic.co/elasticsearch/2.x/debian stable main" | sudo tee -a /etc/apt/sources.list.d/elasticsearch-2.x.list
 $ sudo apt-get update && sudo apt-get install elasticsearch
 $ sudo update-rc.d elasticsearch defaults 95 10

If you have any doubt, visit the `official installation guide <https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-repositories.html>`

Elasticsearch installation on CentOS
------------------------------------

To install Elasticsearch version 2.x RPM package. Lets start importing the repository GPG key: ::

 $ sudo rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch

Then we create ``/etc/yum.repos.d/elasticsearch.repo`` file with the following content: ::

 [elasticsearch-2.x]
 name=Elasticsearch repository for 2.x packages
 baseurl=http://packages.elastic.co/elasticsearch/2.x/centos
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

If you have any doubt, visit the `official installation guide <https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-repositories.html>`
   
Configuration and tuning
------------------------

Once the installation is completed, we can now configure some basic settings modifiying in ``/etc/elasticsearch/elasticsearch.yml``. Open this file and look for the following variables, uncommenting the lines and assigning them the right values: ::

 cluster.name: ossec
 node.name: ossec_node1
 
Elasticsearch server by default is bound to loopback address *127.0.0.1* , remember to modify it if it is necessary ::

 network.host: elasticsearch_server_ip or 0.0.0.0 if single-node architecture.

Shards default number is 5 and Replicas default number is 1, if you are deploying a single-node Elastic cluster, in order to have a Green status you have to set to 1/0 shards and replicas ::
 index.number_of_shards: 1
 index.number_of_replicas: 0

Elasticsearch perform poorly with memory swaps, in order to disable memory swappping and lock some memory to Elastic, set true the *mlockall* option and follow the next steps ::

 bootstrap.mlockall: true

Add the following lines at the end of ``/etc/security/limits.conf`` file: ::

 elasticsearch - nofile  65535    
 elasticsearch - memlock unlimited

As well, open your Elasticsearch service default configuration file (``/etc/default/elasticsearch`` on Debian, and ``/etc/sysconfig/elasticsearch`` on CentOS) and edit the following settings (please notice that ``ES_HEAP_SIZE`` should be set to half your server memory): ::

 # ES_HEAP_SIZE - Set it to half your system RAM memory
 ES_HEAP_SIZE=8g

 MAX_LOCKED_MEMORY=unlimited 

 MAX_OPEN_FILES=65535

If your server uses Systemd, edit ``/usr/lib/systemd/system/elasticsearch.service`` and uncomment the following line: ::

 LimitMEMLOCK=infinity

Now we are done with Elasticsearch configuration and tuning, and **we must start the service** to apply changes and Elastic will be up and running: ::

 $ sudo /etc/init.d/elasticsearch start


.. topic:: Elasticsearch multi-node cluster

 		Elasticsearch uses port 9200/tcp (by default) for API queries and ports in the range 9300-9400/tcp to communicate with other cluster nodes. Remember to open those ports in your firewall for this type of deployments. 

 		On the other hand, for multi-node clusters, it is recommended to have as many number of shards per index (``index.number_of_shards``) as nodes you have in your cluster. And it is also a good practice to use at least one replica (``index.number_of_replicas``).

Cluster health
--------------

To be sure our single-node cluster is working properly, wait a couple of minutes and check if Elasticsearch is running: ::

  $ curl -XGET localhost:9200

Expected result: ::

 {
   "name": "node1",
   "cluster_name": "ossec",
   "version": {
     "number": "2.1.1",
     "build_hash": "40e2c53a6b6c2972b3d13846e450e66f4375bd71",
     "build_timestamp": "2015-12-15T13:05:55Z",
     "build_snapshot": false,
     "lucene_version": "5.3.1"
   },
   "tagline": "You Know, for Search"
 }

Elasticsearch cluster health status: ::

  $ curl -XGET 'http://localhost:9200/_cluster/health?pretty=true'

Expected result: ::

 {
   "cluster_name": "ossec",
   "status": "green",
   "timed_out": false,
   "number_of_nodes": 2,
   "number_of_data_nodes": 2,
   "active_primary_shards": 281,
   "active_shards": 562,
   "relocating_shards": 0,
   "initializing_shards": 0,
   "unassigned_shards": 0,
   "delayed_unassigned_shards": 0,
   "number_of_pending_tasks": 0,
   "number_of_in_flight_fetch": 0,
   "task_max_waiting_in_queue_millis": 0,
   "active_shards_percent_as_number": 100
 }

OSSEC alerts template
---------------------

It's time to integrate the OSSEC Wazuh custom mapping. It's an Elasticsearch template that has already pre-mapped all possible OSSEC alert fields, as they are generated by :ref:`OSSEC Wazuh fork <ossec_wazuh>` JSON Output. This way the indexer will automatically know how to process the data, which will be displayed with user-friendly names on your Kibana interface.

Add the template by a *CURL* request to the Elastic API: ::

 $ cd ~/ossec_tmp/ossec-wazuh/extensions/elasticsearch/ && curl -XPUT "http://localhost:9200/_template/ossec/" -d "@elastic-ossec-template.json"
      
If everything was okay, the API response should be: ::

 {"acknowledged":true}

To make sure it has actually been added successfully, you can check the template using the Elasticsearch API: ::

 $ curl -XGET http://localhost:9200/_template/ossec?pretty

What's next
-----------

Once you have Elasticsearch installed and configured you can move forward with Kibana:

* :ref:`Kibana <ossec_elk_kibana>`
* :ref:`OSSEC Wazuh RESTful API <ossec_api>`
* :ref:`OSSEC Wazuh Ruleset <ossec_ruleset>`
