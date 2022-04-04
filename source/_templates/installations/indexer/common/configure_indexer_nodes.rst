.. Copyright (C) 2015-2022 Wazuh, Inc.


#. Edit ``/etc/wazuh-indexer/opensearch.yml`` and replace the following values: 

    
  - ``network.host:`` Set the address of this Wazuh indexer node, which can be either an IP address or a hostname. The node will bind to this address and will also use it as its publish address.

  - ``node.name``: Set your Wazuh indexer node name as defined in the ``config.yml`` file.

  - ``cluster.initial_master_nodes``: List the names of the Wazuh indexer initial master nodes. The names should be the same defined in the ``config.yml``. 
  
    If you are configuring a Wazuh indexer multi-node cluster, you can add more master-eligible indexer nodes to this list. Uncomment the ``node-2`` and ``node-3`` lines and add more lines if necessary. 

  - ``discovery.seed_hosts:`` Provide a list of the addresses of the master-eligible nodes in the cluster. Each address can be either an IP address or a hostname. If you are configuring a Wazuh indexer multi-node cluster, uncomment this setting and add your master node addresses. 

      .. code-block:: yaml

       discovery.seed_hosts:
         - "10.0.0.1"
         - "10.0.0.2"
         - "10.0.0.3"
  
  - ``plugins.security.nodes_dn``: Include all the Wazuh indexer nodes in your cluster. If necessary, uncomment the lines for ``node-2`` and ``node-3`` and add more lines. If you are using custom nodes names, replace the common name (CN) with your node names as defined in ``config.yml``

      .. code-block:: yaml
        :emphasize-lines: 2

        plugins.security.nodes_dn:
        - "CN=node-1,OU=Wazuh,O=Wazuh,L=California,C=US"
        - "CN=node-2,OU=Wazuh,O=Wazuh,L=California,C=US"
        - "CN=node-3,OU=Wazuh,O=Wazuh,L=California,C=US"


.. End of include file
