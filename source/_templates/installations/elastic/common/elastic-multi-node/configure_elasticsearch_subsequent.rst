.. Copyright (C) 2022 Wazuh, Inc.

#. Download the ``/etc/elasticsearch/elasticsearch.yml`` file.

    .. code-block:: console 

      # curl -so /etc/elasticsearch/elasticsearch.yml https://s3.us-west-1.amazonaws.com/packages-dev.wazuh.com/resources/4.2/config/opendistro/elasticsearch/elasticsearch_cluster_subsequent_nodes.yml

#. Edit the file ``/etc/elasticsearch/elasticsearch.yml``. The preconfigured template includes 3 nodes by default, but you can add or remove lines according to the number of nodes in your cluster.

    .. code-block:: yaml

      network.host: <elasticsearch_ip>
      node.name: <node_name>
      cluster.name: <elastic_cluster>
      cluster.initial_master_nodes:
              - node-1
              - node-2
              - node-3
      discovery.seed_hosts:
              - <elasticsearch_ip_node1>
              - <elasticsearch_ip_node2>
              - <elasticsearch_ip_node3>


    The ``cluster.initial_master_nodes`` and the ``discovery.seed_hosts`` are lists of all the master-eligible nodes in the cluster. The parameter ``node.master: false`` must be included in every Elasticsearch node that will not be configured as master. 

    Values to be replaced:

    - ``<elasticsearch_ip>``: the host's IP; for example, ``10.0.0.2``. 
    - ``<node_name>``: the node name; for example, ``node-2``.
    - ``<elastic_cluster>``: Elasticsearch cluster name; for example, ``elastic-cluster-production``.
    - ``<elasticsearch_ip_nodeX>`` Elasticsearch cluster master-eligible nodes IP; for example, ``10.0.0.3``.
    - ``opendistro_security.nodes_dn``: value used to specify each node certificate. Make sure to use the same names to create the certificates. You can use the following structure:
      ``CN=<common_name>,OU=<operational_unit>,O=<organization_name>,L=<locality>,C=<country_code>``
  
        .. code-block:: yaml

            opendistro_security.nodes_dn:
                - CN=node-1,OU=Docu,O=Wazuh,L=California,C=US
                - CN=node-2,OU=Docu,O=Wazuh,L=California,C=US
                - CN=node-3,OU=Docu,O=Wazuh,L=California,C=US
                

.. End of include file
