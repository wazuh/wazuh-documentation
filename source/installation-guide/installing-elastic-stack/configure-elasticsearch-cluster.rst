.. Copyright (C) 2020 Wazuh, Inc.

.. _configure_elasticsearch_cluster:

Configure Elasticsearch cluster
===============================

.. note:: All the commands described below need to be executed with root user privileges.


Elasticsearch's cluster feature allows configuring a group of server nodes working together to grant a higher availability service and a data loss prevention mechanism. In case any of the nodes fails, the rest will recover its information.


Configuration
-------------

In this example, a cluster of three nodes will be configured, which is the minimum number of nodes recommended.

First of all, it is necessary to configure all Elasticsearch nodes as previously done at `Elastic Stack installation guide <https://documentation.wazuh.com/current/installation-guide/installing-elastic-stack/>`_.

1. Once all Elasticsearch machines are up and running, the following configuration is required on each of them by editing ``/etc/elasticsearch/elasticsearch.yml`` to set up the cluster:

   .. code-block:: yaml

        cluster.name: elastic-cluster
	node.name: <node_name>
	network.host: <elasticsearch_ip>
	discovery.seed_hosts:
	 - <elasticsearch_ip_node1>
	 - <elasticsearch_ip_node2>
	 - <elasticsearch_ip_node3>
	cluster.initial_master_nodes:
	 - <master_node_1>
	 - <master_node_2>
 	 - <master_node_3>


  To apply the changes, restart Elasticsearch:

  a. For systemd:

  .. code-block:: console

	# systemctl restart elasticsearch.service

  b. For SysV Init:

  .. code-block:: console

   	# service elasticsearch.service restart


2. It is necessary to modify the Filebeat configuration file located at ``/etc/filebeat/filebeat.yml`` where Filebeat was installed.

  .. code-block:: yaml

	output.elasticsearch:
		hosts: ['http://<elasticsearch_ip_node1>:9200','http://<elasticsearch_ip_node2>:9200','http://<elasticsearch_ip_node3>:9200']
		loadbalance: true

  Restart the Filebeat service:

  a. For systemd:

  .. code-block:: console

	# systemctl restart filebeat.service

  b. For SysV Init:

  .. code-block:: console

   	# service filebeat.service restart

3. Once the Elasticsearch cluster is working, it is recommended to load the Filebeat template. Run the following command where Filebeat was installed:

  .. code-block:: console

    # filebeat setup --index-management -E setup.template.json.enabled=false


4. Configure the URLs of the Elasticsearch instances to use for all your queries. By editing the file ``/etc/kibana/kibana.yml``:

  .. code-block:: yaml

	elasticsearch.hosts: ["http://<elasticsearch_ip_node1>:9200","http://<elasticsearch_ip_node2>:9200","http://<elasticsearch_ip_node3>:9200"]

  All nodes listed here must be on the same cluster.

  Restart the Kibana service:

  a. For systemd:

  .. code-block:: console

	# systemctl restart kibana.service

  b. For SysV Init:

  .. code-block:: console

   	# service kibana.service restart


Next steps
----------

Once the Wazuh and Elastic Stack servers are installed and connected, you can install and connect Wazuh agents. Follow :ref:`this guide <installation_agents>` and read the instructions for your specific environment.

