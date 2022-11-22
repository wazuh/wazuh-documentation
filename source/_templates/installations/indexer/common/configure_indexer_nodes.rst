.. Copyright (C) 2015, Wazuh, Inc.


#. Edit the ``/etc/wazuh-indexer/opensearch.yml`` configuration file and replace the following values: 

    
   #. ``network.host``:  Sets the address of this node for both HTTP and transport traffic. The node will bind to this address and use it as its publish address. Accepts an IP address or a hostname. 
   
      Use the same node address set in ``config.yml`` to create the SSL certificates. 

   #. ``node.name``: Name of the Wazuh indexer node as defined in the ``config.yml`` file. For example, ``node-1``.

   #. ``cluster.initial_master_nodes``: List of the names of the master-eligible nodes. These names are defined in the ``config.yml`` file. Uncomment the ``node-2`` and ``node-3`` lines, change the names, or add more lines, according to your ``config.yml`` definitions.

      .. code-block:: yaml

        cluster.initial_master_nodes:
        - "node-1"
        - "node-2"
        - "node-3"

   #. ``discovery.seed_hosts:`` List of the addresses of the master-eligible nodes. Each element can be either an IP address or a hostname. You may leave this setting commented if you are configuring the Wazuh indexer as a single node. For multi-node configurations, uncomment this setting and set the IP addresses of each master-eligible node. 

       .. code-block:: yaml

        discovery.seed_hosts:
          - "10.0.0.1"
          - "10.0.0.2"
          - "10.0.0.3"
  
   #. ``plugins.security.nodes_dn``: List of the Distinguished Names of the certificates of all the Wazuh indexer cluster nodes. Uncomment the lines for ``node-2`` and ``node-3`` and change the common names (CN) and values according to your settings and your ``config.yml`` definitions.

      .. code-block:: yaml

        plugins.security.nodes_dn:
        - "CN=node-1,OU=Wazuh,O=Wazuh,L=California,C=US"
        - "CN=node-2,OU=Wazuh,O=Wazuh,L=California,C=US"
        - "CN=node-3,OU=Wazuh,O=Wazuh,L=California,C=US"


.. End of include file
