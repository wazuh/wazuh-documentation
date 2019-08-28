.. Copyright (C) 2019 Wazuh, Inc.

.. _configure_elasticsearch_cluster:

Configure Elasticsearch cluster
===============================

.. note:: All the commands described below need to be executed with root user privileges.


With the Elasticsearch's cluster assignment feature we can configure a group of server nodes working together so that in case of any of them fails, the rest of them will recover its information by 
the replicas and will add it to the index, so no information will be lost and a higher availability service will be reached. 


Steps
-----

.. note:: In this example, we are configuring a three-nodes Elasticsearch cluster from scratch, but any dimension can be configured with **at least two nodes running**. However, if a node is down, the entire cluster will be down, so we recommend to have three nodes or more.

.. warning:: Remember to configure first all Elasticsearch nodes as previously done at `Elastic Stack installation guide <https://documentation.wazuh.com/current/installation-guide/installing-elastic-stack/>`_

1. Once all Elasticsearch machines are up and running, it is important to configure the cluster on each of them at ``/etc/elasticsearch/elasticsearch.yml``:

   .. code-block:: yaml

         cluster.name: elastic-cluster
	 node.name: "elastic-node-0x"
	 path.data: /var/lib/elasticsearch
	 path.logs: /var/logs/elasticsearch
	 network.host: <ELASTIC_NODE_x_SERVER_IP>
	 discovery.seed_hosts:
	  - <ELASTIC_NODE_1_SERVER_IP>
	  - <ELASTIC_NODE_2_SERVER_IP>
	  - <ELASTIC_NODE_3_SERVER_IP>
	 cluster.initial_master_nodes:
	  - <1ST_MASTER-ELIGIBLE_NODE.NAME>
	  - <2ND_MASTER-ELIGIBLE_NODE.NAME>
	  - <3RD_MASTER-ELIGIBLE_NODE.NAME>
	 
   
   .. warning:: It is highly recommended to use at least **two eligible master nodes** at ``cluster.initial_master_nodes`` to avoid the nodes do not know where in shards the searched data is in case the original master in charge of bringing that information is down, what is called split-brain. 


  You must then restart Elasticsearch service on all nodes:
  
  .. code-block:: console
  
	# systemctl restart elasticsearch.service
   

2. After that, we need to modify Filebeat configuration file located at ``/etc/filebeat/filebeat.yml`` in the Wazuh manager machine or machines in case we have a Wazuh manager cluster:

  .. code-block:: yaml
  
	output.elasticsearch:
		hosts: ['http://<ELASTIC_NODE_1_SERVER_IP>:9200','http://<ELASTIC_NODE_2_SERVER_IP>:9200','http://<ELASTIC_NODE_3_SERVER_IP>:9200']
		loadbalance: true
  
  Now, it is time to restart Filebeat service:
  
  .. code-block:: console
  
	# systemctl restart filebeat.service
	

3. Then, it is recommended to load the Filebeat template. Run the following command where Filebeat was installed (Wazuh manager server or the entire cluster):

  .. code-block:: console

    # filebeat setup --index-management -E setup.template.json.enabled=false


4. Finally, set the list of Elasticsearch nodes in Kibana at ``/etc/kibana/kibana.yml``:

  .. code-block:: yaml
	
	elasticsearch.hosts: ["http://<ELASTIC_NODE_1_SERVER_IP>:9200","http://<ELASTIC_NODE_2_SERVER_IP>:9200","http://<ELASTIC_NODE_3_SERVER_IP>:9200"]
	
  Then, restart Kibana service as below:
  
  .. code-block:: console
  
	# systemctl restart kibana.service
	
	
Next steps
----------

Once the Elastic Stack servers are configured for clustering, you can try first shutting Elasticsearch nodes down with at least two of them running and check the changes of the elected master node. You can also use Kibana in order to check all the information can be searched.

